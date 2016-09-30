$(document).ready(function() {
	initPage();
	// 查询
	$("#btnQuery").click(function() {
		 ajaxQuery(1);
	});
})
function initPage() {
	pageSize=20;
	var factory_self = $("#factory_self").val();
	var factory_id_self = $("#factory_id_self").val();
	getAuthorityFactorySelect("#q_factory", factory_self, "noall");
	var cdate=getCurDate();
	var cfirst_date=getFirstDayOfMonth(cdate);
	$("#q_date_start").val(cfirst_date);
	$("#q_date_end").val(cdate);
	ajaxQuery(1);
}
function ajaxQuery(targetPage) {
	var factory=$("#q_factory").val();
	var startDate=$("#q_date_start").val();
	var endDate=$("#q_date_end").val();
	if(endDate.trim().length==0){
		endDate=getCurDate();
	}
	if(factory.trim().length==0){
		alert("请选择工厂！");
	}else if(startDate.trim().length==0){
		alert("请输入开始日期！");
	}else{
	var conditions = "{factoryId:'" + factory + "',startDate:'" + startDate + "',endDate:'"+endDate+ "'}";
	$.ajax({
		url : "qualityReport!getProcessProblemReportData.action",
		type : "post",
		dataType : "json",
		data : {
			"conditions" : conditions,
			"pager.pageSize" : 20,
			"pager.curPage" : targetPage || 1
		},
		success : function(response) {
			generateChart(response.chartList);
			generateTable(response.detailList,response.pager);
		}/*,
		error : function(response) {
			alert("系统异常！");
		}*/
	});
	}
}
//生成图形报表
function generateChart(chartList){
	
	var title_column  = "制程问题严重等级分布图";	
	var fn_formatter_column = function(obj) {
		var s = "";
		s = obj.series.name + obj.x + ": " + obj.y;
		return s;
	};
	var xAxis_column = {
			categories : [ '部件', '焊装', '玻璃钢', '涂装','底盘','总装' ],
			labels: {
                autoRotationLimit: 40
            }
		};
	var series_column = new Array();
	series_column[0] = {
		type : 'column',
		name : 'S',
		data : [0,0,0,0,0,0],
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
			name : 'A',
			data : [0,0,0,0,0,0],
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
			name : 'B',
			data : [0,0,0,0,0,0],
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
			name : 'C',
			data : [0,0,0,0,0,0],
			dataLabels : {
				enabled : true,
				rotation : 0,
				color : '#606060',
				style : {
					fontSize : '10px'
				}
			}
		};
	var yAxis_column = {
			title : {
				text : '问题数量'
			},
			labels : {
				format : '{value} 个'
			}
		};
	$.each(chartList,function(index,data){
		var count_parts=0;
		var count_welding=0;
		var count_glass=0;
		var count_painting=0;
		var count_bottom=0;
		var count_assembly=0;
		var bug_detail=data.bug_desc;
		$.each(bug_detail.split(","),function(i,b){
			var workshop=b.split(":")[0];
			var count=isNaN(parseInt(b.split(":")[1]))?0:parseInt(b.split(":")[1]);
			if(workshop=='部件'){
				count_parts=count;
			}
			if(workshop=='焊装'){
				count_welding=count;
			}
			if(workshop=='玻璃钢'){
				count_glass=count;
			}
			if(workshop=='涂装'){
				count_painting=count;
			}
			if(workshop=='底盘'){
				count_bottom=count;
			}
			if(workshop=='总装'){
				count_assembly=count;
			}
		});
		var series_data=[count_parts,count_welding,count_glass,count_painting,count_bottom,count_assembly];
		if (data.serious_level == 'S') {
			series_column[0].data = series_data;
		}
		if (data.serious_level == 'A') {
			series_column[1].data = series_data;
		}
		if (data.serious_level == 'B') {
			series_column[2].data = series_data;
		}
		if (data.serious_level == 'C') {
			series_column[3].data = series_data;
		}
	});
	 var tooltip = {
             headerFormat: '<span style="font-size:12px;padding-bottom: 10px;">{point.key}</span><table>',
             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: &nbsp;&nbsp;</td>' +
                 '<td style="padding:0"><b>{point.y} 个</b></td></tr>',
             footerFormat: '</table>',
             shared: true,
             useHTML: true
         }; 
	drowCharts("#chartsContainer", title_column, xAxis_column,
			fn_formatter_column, series_column, yAxis_column,tooltip);
}
function generateTable(detailList,pager){
	$("#tableContainer").css("display", "none");
	$("#tableContainer tbody").html("");// 清空表格
	$("#pagination").hide();
	$.each(detailList,function(index,value){
		var tr=$("<tr />");
		$("<td />").html(value.workshop_name).appendTo(tr);
		$("<td />").html(value.workgroup_name).appendTo(tr);
		$("<td />").html(value.serious_level).appendTo(tr);
		$("<td />").html(value.bug).appendTo(tr);
		$("<td />").html(value.bug_count).appendTo(tr);
		$("#tableContainer tbody").append(tr);
		$("#tableContainer").css("display", "");
		$("#total").html(pager.totalCount);
		$("#total").attr("total", pager.totalCount);
		$("#cur").attr("page", pager.curPage);
		$("#cur").html(
				"<a href=\"#\">" + pager.curPage + "</a>");
		$("#pagination").show();
	});
}