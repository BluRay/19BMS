$(document).ready(function() {
	var factory_self = $("#factory_self").val();
	var factory_id_self = $("#factory_id_self").val();
	getFactorySelect("#c_factory", factory_self, "noall");
	var cDate = getCurDate();
	var cfirst_date = getFirstDayOfMonth(cDate);
	//alert(cDate);
	$("#q_date_start").val(cfirst_date);
	$("#q_date_end").val(cDate);

	ajaxQuery(factory_id_self, cfirst_date, cDate);
	
	$("#btnChartQuery").live("click",function(){
		var factoryId=$("#c_factory").val();
		var startDate=$("#q_date_start").val();
		var endDate=$("#q_date_end").val();
		if(endDate.trim().length==0){
			endDate=getCurDate();
		}
		if(factoryId.trim().length==0){
			alert("请选择工厂！");
		}else if(startDate.trim().length==0){
			alert("请输入开始日期！");
		}else{
			ajaxQuery(factoryId, startDate, endDate);
		}
	});
})
// ajax 查询报表数据
function ajaxQuery(factoryId, queryStartDate, queryEndDate) {
	var conditions = "{factoryId:'" + factoryId + "',startDate:'"
			+ queryStartDate + "',endDate:'" + queryEndDate + "'}";
	$.ajax({
		url : "productionReport!getPauseReportData.action",
		type : "post",
		dataType : "json",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			generateChartColumn(response.pauseTypeList, response.itemList,
					response.reportList);
			generateChartPie(response.pauseTypeList, response.pieList);
			generateTable(response.pauseTypeList, response.itemList,
					response.reportList,response.pieList);
		}
	});
}
// 生成柱状图
function generateChartColumn(pauseTypeList, itemList, reportList) {
	var title = "停线分布图";
	// categories
	var categories = [ '自制件', '部件', '焊装', '涂装', '底盘', '总装', '检测线' ];
	var fn_formatter = null;
	var xAxis = {
		categories : categories,
		labels : {
			autoRotationLimit : 80
		}
	};
	var yAxis = {
		title : {
			text : ''
		},
		labels : {
			format : '{value}'
		}
	};
	var tooltip = {
		formatter : function() {
			return '<b>' + this.x + '</b><br/>' + this.series.name + ': '
					+ this.y + '<br/>' + 'Total: ' + this.point.stackTotal;
		}
	};
	var plotOptions = {
		column : {
			stacking : 'normal',
			dataLabels : {
				enabled : true,
				color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
						|| '#000000'
			}
		}
	};
	/*
	 * $.each(itemList,function(index,value){ categories.push(value); });
	 */

	// 初始化series
	var series = new Array();
	$.each(pauseTypeList, function(index, value) {

		series[index] = {
			type : 'column',
			name : value,
			data : [ 0, 0, 0, 0, 0, 0, 0 ]
		};
	});

	// 填充series数据
	$.each(reportList, function(index, value) {
		var count_self = 0;// 自制件
		var count_parts = 0;// 部件
		var count_welding = 0;// 焊装
		var count_painting = 0;// 涂装
		var count_bottom = 0;// 底盘
		var count_assembly = 0;// 总装
		var count_check = 0;// 检测线
		var pause_detail = value.pause_group_info;
		$.each(pause_detail.split(","), function(i, b) {
			var workshop = b.split(":")[0];
			var count = isNaN(parseFloat(b.split(":")[1])) ? 0 : parseFloat(b
					.split(":")[1]);
			if (workshop == '自制件') {
				count_self = count;
			}
			if (workshop == '部件') {
				count_parts = count;
			}
			if (workshop == '焊装') {
				count_welding = count;
			}
			if (workshop == '涂装') {
				count_painting = count;
			}
			if (workshop == '底盘') {
				count_bottom = count;
			}
			if (workshop == '总装') {
				count_assembly = count;
			}
			if (workshop == '检测线') {
				count_check = count;
			}
		});
		var series_data = [ count_self, count_parts, count_welding,
				count_painting, count_bottom, count_assembly, count_check ];
		var index_pause = pauseTypeList.indexOf(value.reason_type);
		series[index_pause].data = series_data;
	});

	drowCharts("#chartContainer1", title, xAxis, fn_formatter, series, yAxis,
			tooltip, plotOptions);

}
// 生成饼图
function generateChartPie(pauseTypeList, pieList) {
	var title = "停线占比图";
	var xAxis = {};
	var yAxis = {};
	var tooltip = {
		pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
	}
	var fn_formatter = null;
	var plotOptions = {
		pie : {
			allowPointSelect : true,
			cursor : 'pointer',
			dataLabels : {
				enabled : true,				
				format : '<b>{point.name}</b>: {point.percentage:.1f} %'
			}
		}
	};
	var series = new Array();
	var pie_obj = {
		type : 'pie',
		name : '停线占比',
		data : [ ]
	};
	$.each(pieList,function(index,value){
		var data=[index,value];
		pie_obj.data.push(data);
	});
	series.push(pie_obj);
	drowCharts("#chartContainer2", title, xAxis, fn_formatter, series, yAxis,
			tooltip, plotOptions);
}

// 生成表格
function generateTable(pauseTypeList, itemList, reportList,pieList) {
	$("#tableChartContainer thead").html("");
	var tr=$("<tr />");
	$("<td />").html("单位H").appendTo(tr);
	var categories = [ '自制件', '部件', '焊装', '涂装', '底盘', '总装', '检测线' ];
	var total_workshop=new Array();
	$.each(categories,function(index,category){
		$("<td />").html(category).appendTo(tr);
		total_workshop[index]=0;
	});
	$("<td />").html("累计占比").appendTo(tr);
	$("#tableChartContainer thead").append(tr);
	
	$("#tableChartContainer tbody").html("");
	
	$.each(reportList,function(index,value){
		var tr=$("<tr />");
		var reason_type=value.reason_type;
		$("<td />").html(reason_type).appendTo(tr);
		var pause_info="{\""+value.pause_group_info.replace(new RegExp(":","gm"),"\":\"").replace(new RegExp(",","gm"),"\",\"")+"\"}";
		$.each(categories,function(index,category){
			var i=pause_info.indexOf(category);//车间名称index
			//alert(pause_info);
			var json_pause=JSON.parse(pause_info);
			if(i>0){
				var count=eval('json_pause.'+category);	
				total_workshop[index]+=Number(count);
				//alert(rate);
				$("<td />").html(count).appendTo(tr);
			}else{
				$("<td />").html("0").appendTo(tr);
			}

		});		
		$.each(pieList,function(index,value){
			var rate=Number(value).toFixed(2)+"%";
			//alert(reason_type);
			if(index==reason_type){
				$("<td />").html(rate).appendTo(tr);
			}
		});
		
		$("#tableChartContainer tbody").append(tr);
	});
	//汇总行
	var tr_total=$("<tr />");
	$("<td />").html("累计停线").appendTo(tr_total);
	//alert(total_workshop.length);
	for(var i=0;i<total_workshop.length;i++){
		
		$("<td />").html(total_workshop[i]).appendTo(tr_total);
	}

	$("<td />").html("").appendTo(tr_total);
	$("#tableChartContainer tbody").append(tr_total);
}