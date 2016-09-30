$(document).ready(function() {
	initPage();
	// 切换工厂获取车间
	$("#q_factory").change(function() {
		getWorkshopSelect("#q_workshop", "", $(this).val(), "noall")
	});
	// 查询
	$("#btnQuery").click(function() {
		 ajaxQuery();
	});
})
function initPage() {
	pageSize=20;
	var factory_self = $("#factory_self").val();
	var department_self = $("#department_self").val()==""?"焊装":$("#department_self").val();
	var factory_id_self = $("#factory_id_self").val();
	getAuthorityFactorySelect("#q_factory", factory_self, "noall");
	getWorkshopSelect("#q_workshop", department_self, factory_id_self, "noall");
	var cdate=getCurDate();
	var cfirst_date=getFirstDayOfMonth(cdate);
	$("#q_date_start").val(cfirst_date);
	$("#q_date_end").val(cdate);
	ajaxQuery();
}
function ajaxQuery() {
	var factory=$("#q_factory").val();
	var workshop=$("#q_workshop").val();
	var workshopName=$("#q_workshop").find("option:selected").text();
	var startDate=$("#q_date_start").val();
	var endDate=$("#q_date_end").val();
	if(endDate.trim().length==0){
		endDate=getCurDate();
	}
	if(factory.trim().length==0){
		alert("请选择工厂！");
	}else if(workshop.trim().length==0){
		alert("请选择车间！");
	}else if(startDate.trim().length==0){
		alert("请输入开始日期！");
	}else{
	var conditions = "{factoryId:'" + factory + "',workshopId:'" + workshop+"',workshopName:'"+
		workshopName+"',startDate:'" + startDate + "',endDate:'"+endDate+ "'}";
	$.ajax({
		url : "qualityReport!getQCScoreCompareData	.action",
		type : "post",
		dataType : "json",
		data : {
			"conditions" : conditions

		},
		success : function(response) {
			generateChart(response.chartList,response.itemList);
		}/*,
		error : function(response) {
			alert("系统异常！");
		}*/
	});
	}
}
function generateChart(chartList,itemList){
	var title_column  = "车间班组品质评比得分";	
	var fn_formatter_column = function(obj) {
		var s = "";
		s = obj.series.name + obj.x + ": " + obj.y;
		return s;
	};
	var categories=new Array();	
	$.each(chartList[0],function(c,data){
		categories.push(c);
	});
	var series_column = new Array();
	$.each(itemList,function(i,item){
		series_column[i] = {
				type : 'column',
				name : '第'+item+'周',
				data : [],
				dataLabels : {
					enabled : true,
					rotation : 0,
					color : '#606060',
					style : {
						fontSize : '10px'
					}
				}
			};
	});
	$.each(chartList,function(index,data){
		var series_data=new Array();
		$.each(chartList[index],function(c,data){
			var fixed_data=parseFloat(data).toFixed(2);
			//alert(parseFloat(data).toFixed(2));
			series_data.push(Number(fixed_data));
		});
		series_column[index].data=series_data;
	});
	var xAxis_column = {
			categories : categories,
			labels: {
                autoRotationLimit: 80
            }
		};
	var yAxis_column = {
			title : {
				text : '评比得分'
			},
			labels : {
				format : '{value}'
			}
		};
	var tooltip = {
            headerFormat: '<span style="font-size:12px;padding-bottom: 10px;">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: &nbsp;&nbsp;</td>' +
                '<td style="padding:0"><b>{point.y} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        };
	drowCharts("#chartsContainer", title_column, xAxis_column,
			fn_formatter_column, series_column, yAxis_column,tooltip);
}
