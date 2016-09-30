$(document).ready(function() {
	/*
	 * getFactorySelect("#q_factory","","noall");
	 * getFactorySelect("#c_factory","","noall");
	 */
/*	var factory_self = $("#factory_self").val();
	var department_self = $("#department_self").val();
	department_self=department_self==""?"焊装":department_self;
	var factory_id_self = $("#factory_id_self").val();
	getFactorySelect("#c_factory", factory_self, "noall");
	getFactorySelect("#q_factory", factory_self, "noall");
	getWorkshopSelect("#q_workshop", department_self, factory_id_self, "noall");*/
	
	var factory_self = $("#factory_self").val();
	var department_self = $("#department_self").val()==""?"焊装":$("#department_self").val();

	//获取用户权限工厂下拉列表
	getAuthorityFactorySelect("#q_factory", factory_self, "noall");
	getAuthorityFactorySelect("#c_factory", factory_self, "noall");
	var factory_id_self = $("#q_factory").val();
	//alert(factory_id_self);
	//获取用户权限车间下拉列表
	getWorkshopSelect("#q_workshop", department_self, factory_id_self, "noall");

	var cDate = getCurDate();
	// alert(cDate);
	$("#c_date").val(cDate);
	$("#q_date").val(cDate);
	ajaxQueryDailyChart(factory_self, cDate);
	ajaxQueryDaily(factory_self, department_self, cDate);

	// 切换工厂获取车间
	$("#q_factory").change(function() {
		getWorkshopSelect("#q_workshop", "", $(this).val(), "noall")
	});
	// 查询日报表
	$("#btnDailyQuery").click(function() {
		var factory = $("#q_factory option:selected").text();
		var workshop = $("#q_workshop option:selected").text();
		var queryDate = $("#q_date").val();
		// alert(factory);
		if (factory.trim().length == 0) {
			alert("请选择工厂");
		} else if (workshop.trim().length == 0) {
			alert("请选择车间");
		} else if (queryDate.trim().length == 0) {
			alert("请输入日期");
		} else {
			ajaxQueryDaily(factory, workshop, queryDate);
		}
	});
	// 查询图形报表
	$("#btnChartQuery").click(function() {
		var factory = $("#c_factory option:selected").text();
		var queryDate = $("#c_date").val();
		if (factory.trim().length == 0) {
			alert("请选择工厂");
		} else if (queryDate.trim().length == 0) {
			alert("请输入日期");
		} else {
			ajaxQueryDailyChart(factory, queryDate);
		}
	});
});
// ajax 查询日报表数据
function ajaxQueryDaily(factory, workshop, queryDate) {
	var conditions = "{factoryName:'" + factory + "',workshopName:'" + workshop
			+ "',queryDate:'" + queryDate + "'}";
	$.ajax({
		url : "productionReport!getDailyReportData.action",
		type : "post",
		dataType : "json",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			generateDailyTable(response.reportList);
		}/*,
		error : function(response) {
			alert("系统异常！");
		}*/
	});
}
// 生成日报表表格
function generateDailyTable(dataList) {
	$("#tableContainer tbody").html("");
	var lastOrder = null;
	var lastWorkshop = null;
	var onlineTotal = 0;// 车间维度上线总数
	var offlineTotal = 0;// 车间维度下线总数
	if (dataList.length > 0) {
		$("#tableContainer").css("display", "");
	} else {
		$("#tableContainer").css("display", "none");
		// alert("未查询到数据！");
	}
	$.each(dataList, function(index, data) {
		var employees = isNaN(parseInt(data.employees)) ? 0
				: parseInt(data.employees);
		var arrivals_qty = isNaN(parseInt(data.arrivals_qty)) ? 0
				: parseInt(data.arrivals_qty);
		var online_num = isNaN(parseInt(data.online_num)) ? 0
				: parseInt(data.online_num);
		var offline_num = isNaN(parseInt(data.offline_num)) ? 0
				: parseInt(data.offline_num);
		var repair_online_num = isNaN(parseInt(data.repair_online_num)) ? 0
				: parseInt(data.repair_online_num);
		var repair_offline_num = isNaN(parseInt(data.repair_offline_num)) ? 0
				: parseInt(data.repair_offline_num);
		var working_hours = isNaN(parseInt(data.working_hours)) ? 0
				: parseInt(data.working_hours);
		var plan_qty = isNaN(parseInt(data.plan_qty)) ? 0
				: parseInt(data.plan_qty);
		var exception_flag = data.exception_flag == undefined ? ''
				: data.exception_flag;
		var order_no = data.order_no == undefined ? '' : data.order_no;
		var line_name = data.line_name == undefined ? '' : data.line_name;
		var workshop_name = isNaN(parseInt(data.workshop_name)) ? ""
				: parseInt(data.workshop_name);
		var plan_qty = isNaN(parseInt(data.plan_qty)) ? 0
				: parseInt(data.plan_qty);
		onlineTotal += online_num;
		offlineTotal += offline_num;

		var tr = $("<tr />");
		if (workshop_name == lastWorkshop) {
			var span = index + 1;
			$(".workshop").attr("rowspan", span + 1);
			$("#total_online").html(onlineTotal);
			$("#total_offline").html(offlineTotal);
			if (plan_qty == '0') {
				$("#plan_rate").html("");
			} else
				$("#plan_rate").html(
						(offlineTotal / plan_qty * 100).toFixed(2) + "%");
		} else {
			$("<td class='workshop' rowspan=1/>").html(employees).appendTo(tr);
			$("<td class='workshop' rowspan=1/>").html(arrivals_qty).appendTo(
					tr);
			$("<td class='workshop' id='total_online' rowspan=1/>").html(
					online_num).appendTo(tr);
			$("<td class='workshop' id='total_offline' rowspan=1/>").html(
					offline_num).appendTo(tr);
			if (plan_qty == '0') {
				$("<td class='workshop' id='plan_rate' rowspan=1/>").html( "").appendTo(
						tr);
			} else
				$("<td class='workshop' id='plan_rate' rowspan=1/>").html(
						(offlineTotal / plan_qty * 100).toFixed(2) + "%").appendTo(
						tr);
			
			$("<td class='workshop' rowspan=1/>").html(working_hours).appendTo(
					tr);
			$("<td class='workshop' rowspan=1/>").html(exception_flag)
					.appendTo(tr);
		}
		if (order_no == lastOrder) {
			var span = parseInt($("#orderNo_" + (index - 1)).attr("rowspan"));
			$("#orderNo_" + (index - 1)).attr("rowspan", span + 1);
			$("#order_online_" + (index - 1)).attr("rowspan", span + 1);
			$("#order_offline_" + (index - 1)).attr("rowspan", span + 1);
			$("#order_repair_" + (index - 1)).attr("rowspan", span + 1);
			var order_online = parseInt($("#order_online_" + (index - 1))
					.html());
			var order_offline = parseInt($("#order_offline_" + (index - 1))
					.html());
			var order_repair = parseInt($("#order_repair_" + (index - 1))
					.html());
			$("#order_online_" + (index - 1)).html(order_online + online_num);
			$("#order_offline_" + (index - 1))
					.html(order_offline + offline_num);
			$("#order_repair_" + (index - 1)).html(
					order_repair + repair_offline_num);
		} else {
			$("<td class='order' id='orderNo_" + index + "' rowspan=1/>").html(
					order_no).appendTo(tr);
			$("<td class='order' id='order_online_" + index + "' rowspan=1/>")
					.html(online_num).appendTo(tr);
			$("<td class='order' id='order_offline_" + index + "' rowspan=1/>")
					.html(offline_num).appendTo(tr);
			$("<td class='order' id='order_repair_" + index + "' rowspan=1/>")
					.html(repair_offline_num).appendTo(tr);
		}
		$("<td />").html(line_name).appendTo(tr);
		$("<td />").html(online_num).appendTo(tr);
		$("<td />").html(offline_num).appendTo(tr);
		$("<td />").html(repair_online_num).appendTo(tr);
		$("<td />").html(repair_offline_num).appendTo(tr);
		$("#tableContainer tbody").append(tr);
		lastWorkshop = workshop_name;
		lastOrder = order_no;
	});
}
// 查询图形报表数据
function ajaxQueryDailyChart(factory, queryDate) {
	var conditions = "{factoryName:'" + factory + "',queryDate:'" + queryDate
			+ "'}";
	$.ajax({
		url : "productionReport!getDailyChartData.action",
		type : "post",
		dataType : "json",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			generateDailyChart(response.reportList);
		}/*,
		error : function(response) {
			alert("系统异常！");
		}*/
	});
}
// 生成图形报表
function generateDailyChart(dataList) {
	/**
	 * 生成图形报表
	 */
	var title_column = "生产日报表";
	var title_line = "计划达成率";
	var xAxis_column = {
		categories : [ '上线数', '下线数', '返修上线数', '返修下线数' ],
		labels : {
			rotation : -45
		}
	};
	var xAxis_line = {
		categories : [ '焊装', '玻璃钢', '涂装', '底盘', '总装' ],
		labels : {
			rotation : -45
		}
	};
	var fn_formatter_column = function(obj) {
		var s = "";
		s = obj.series.name + obj.x + ": " + obj.y;
		return s;
	}
	var fn_formatter_line = function(obj) {
		var s = "";
		s = obj.x + ": " + obj.y + "%";
		return s;
	}
	var yAxis_column = {
		title : {
			text : ''
		},
		labels : {
			format : '{value} '
		}
	};
	var yAxis_line = {
		title : {
			text : ''
		},
		labels : {
			format : '{value} %'
		}
	};
	var series_column = new Array();
	series_column[0] = {
		type : 'column',
		name : '焊装',
		data : [ 0, 0, 0,0 ],
		dataLabels : {
			enabled : true,
			rotation : 0,
			color : '#606060',
			style : {
				fontSize : '10px'
			}
		}
	};
	series_column[1] = {
			type : 'column',
			name : '玻璃钢',
			data : [ 0, 0, 0,0 ],
			dataLabels : {
				enabled : true,
				rotation : 0,
				color : '#606060',
				style : {
					fontSize : '10px'
				}
			}
		};
	series_column[2] = {
			type : 'column',
			name : '涂装',
			data : [ 0, 0, 0,0 ],
			dataLabels : {
				enabled : true,
				rotation : 0,
				color : '#606060',
				style : {
					fontSize : '10px'
				}
			}
		};
	series_column[3] = {
			type : 'column',
			name : '底盘',
			data : [ 0, 0, 0,0 ],
			dataLabels : {
				enabled : true,
				rotation : 0,
				color : '#606060',
				style : {
					fontSize : '10px'
				}
			}
		};
	series_column[4] = {
			type : 'column',
			name : '总装',
			data : [ 0, 0, 0,0 ],
			dataLabels : {
				enabled : true,
				rotation : 0,
				color : '#606060',
				style : {
					fontSize : '10px'
				}
			}
		};
	var series_line = [];
	var plan_rate = {'焊装':null,'玻璃钢':null,'涂装':null,'底盘':null,'总装':null};
	$("#tableChartContainer").css("display", "none");
	$("#tableChartContainer tbody").html("");// 清空表格

	$.each(dataList, function(index, data) {
		var online_total = data.online_total == undefined ? 0
				: data.online_total;
		var offline_total = data.offline_total == undefined ? 0
				: data.offline_total;
		var repair_online_num = data.repair_online_num == undefined ? 0
				: data.repair_online_num;
		var repair_offline_num = data.repair_offline_num == undefined ? 0
				: data.repair_offline_num;
		var c_obj = {
			type : 'column',
			name : data.workshop_name,
			data : [ online_total, offline_total, repair_online_num,
					repair_offline_num ],
			dataLabels : {
				enabled : true,
				rotation : 0,
				color : '#606060',
				style : {
					fontSize : '10px'
				}
			}
		};
		if (data.workshop_name == '焊装') {
			series_column[0] = c_obj;
		}
		if (data.workshop_name == '玻璃钢') {
			series_column[1] = c_obj;
		}
		if (data.workshop_name == '涂装') {
			series_column[2] = c_obj;
		}
		if (data.workshop_name == '底盘') {
			series_column[3] = c_obj;
		}
		if (data.workshop_name == '总装') {
			series_column[4] = c_obj;
		}
		// series_column.push(c_obj);
		plan_rate[data.workshop_name] = isNaN(Number(data.plan_rate))? null
				: data.plan_rate;
		/**
		 * 生成表格
		 */
		var tr = $("<tr />");
		$("<td />").html(data.workshop_name).appendTo(tr);
		$("<td />").html(online_total).appendTo(tr);
		$("<td />").html(offline_total).appendTo(tr);
		$("<td />").html(
				data.plan_rate == undefined ? "" : data.plan_rate + "%")
				.appendTo(tr);
		$("<td />").html(repair_online_num).appendTo(tr);
		$("<td />").html(repair_offline_num).appendTo(tr);
		$("#tableChartContainer tbody").append(tr);
		$("#tableChartContainer").css("display", "");
	});
	var l_obj = {
		type : 'line',
		name : '计划达成率',
		data : [ plan_rate['焊装'], plan_rate['玻璃钢'], plan_rate['涂装'],
				plan_rate['底盘'], plan_rate['总装'] ],
		marker : {
			lineWidth : 2,
			lineColor : Highcharts.getOptions().colors[3],
			fillColor : 'white'
		},
		dataLabels : {
			enabled : true,
			formatter : function(obj) {
				return this.y + "%";
			},
			color : '#606060',
			style : {
				fontSize : '10px'
			}
		}
	};
	series_line.push(l_obj);
	/*
	 * var series_column=[{type: 'column',name: 'Jane',data: [3, 2, 1,3]},
	 * {type: 'column',name: 'Michle',data: [5, 3, 6,2]}, {type: 'column',name:
	 * 'Jhson',data: [8, 3, 4,6]}, {type: 'column',name: 'Aris',data: [8, 3,
	 * 4,6]}, {type: 'column',name: 'Lisa',data: [8, 3, 4,6]}];
	 */
	/*
	 * var series_line=[{ type: 'line', name: '计划达成率', data: [3, 2.67,
	 * 3,2.6,3.2], marker: { lineWidth: 2, lineColor:
	 * Highcharts.getOptions().colors[3], fillColor: 'white' } }] ;
	 */
	if (dataList == null || dataList.length == 0) {
		// alert("未查询到数据！");
		$("#chartContainer1").css("display", "none");
		$("#chartContainer2").css("display", "none");
	} else {
		drowCharts("#chartContainer1", title_column, xAxis_column,
				fn_formatter_column, series_column, yAxis_column);
		drowCharts("#chartContainer2", title_line, xAxis_line,
				fn_formatter_line, series_line, yAxis_line);
		$("#chartContainer1").css("display", "");
		$("#chartContainer2").css("display", "");
	}

}