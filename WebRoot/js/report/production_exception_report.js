$(document).ready(function(){
	initPage();
	// 查询
	$("#btnQuery").click(function() {
		 ajaxQuery();
	});
});
function initPage() {
	pageSize=20;
	var factory_self = $("#factory_self").val();
	var factory_id_self = $("#factory_id_self").val();
	getAuthorityFactorySelect("#q_factory", factory_self, "noall");
	var cdate=getCurDate();
	var cfirst_date=getFirstDayOfMonth(cdate);
	$("#q_date_start").val(cfirst_date);
	$("#q_date_end").val(cdate);
	ajaxQuery();
}
//ajax 查询报表数据
function ajaxQuery(){
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
		url : "productionReport!getExceptionReportData.action",
		type : "post",
		dataType : "json",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			if(response.reportList.length==0){
				alert("未查询到数据！");
			}
			generateChart(response.reportList,response.itemList);
		}
	});
	}
}
function generateChart(reportList,itemList){	
	var title = "生产异常趋势图";	
	var xAxis = {
			categories : itemList,
			labels: {
                autoRotationLimit: 80
            }
		};
	var fn_formatter = function(obj) {
		var s = "";
		s = obj.x + ": " + obj.y ;
		return s;
	}
	var yAxis = {
			title : {
				text : ''
			},
			labels:{
				format: '{value} '
			}
		};
	
	var series=new Array();	
	$.each(reportList,function(index,value){
		//初始化series data
		var series_data=new Array();
		$.each(itemList,function(index,item){
			series_data.push(0);
		});
		
		$.each(value.exception_info.split(","),function(i,v){
			var dd=(v.split(":"))[0];
			var cc=isNaN(parseInt((v.split(":"))[1]))?0:parseInt((v.split(":"))[1]);
			var index_item=itemList.indexOf(dd);//获取日期在itemList中的下标			
			series_data[index_item]=cc;//更新series_data 对应下标的值
		});
		
		var l_obj = {
				type : 'line',
				name : value.workshop_name,
				data : series_data,
				marker : {
					lineWidth : 2,
					lineColor : Highcharts.getOptions().colors[index],
					fillColor : 'white'
				},
				dataLabels : {
					enabled : true,
					formatter : function(obj) {
						return this.y ;
					},
					color : '#606060',
					style : {
						fontSize : '10px'
					}
				}
			};
		series.push(l_obj);
	});
	var tooltip = {
            headerFormat: '<span style="font-size:12px;padding-bottom: 10px;">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: &nbsp;&nbsp;</td>' +
                '<td style="padding:0"><b>{point.y} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        };
	
	drowCharts("#chartsContainer", title, xAxis,
			fn_formatter, series, yAxis,tooltip);
}