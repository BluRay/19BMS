$(document).ready(function () {	
	initPage();
	function initPage(){
		getAuthorityFactorySelect("#factory_id");
		getPlanRateDate();
		ajaxQuery();
	}
	$("input[type='radio']").change(function(){
		getPlanRateDate();
		ajaxQuery();
	});
	$("#btnQuery").live("click",function () {
		$("input[name='xx']").attr('checked',false);
		ajaxQuery();
	});
});
function ajaxQuery(){
	$("#containerReport").html('');
	var start = $("#start_date").val();
	var end = $("#end_date").val();
	if(start.trim()==''){
		alert('必须输入起始日期！');
		return;
	}
	if(end.trim()==''){
		alert('必须输入结束日期！');
		return;
	}
	$.ajax({
	    url: "planReport!workshopRateReport.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	'factory_id':$("#factory_id").val(),
	    	'start_date':$("#start_date").val(),
	    	'end_date': $("#end_date").val()
	    },
	    success:function(response){	
			var title = "车间计划达成率 ";
			var subtitle = $("#start_date").val()+"至"+$("#end_date").val()+"达成率";
	        var yAxis = [
	        { // Primary yAxis
	        	min: 0,
	            labels: {
	                format: '{value} %',
	                style: {
	                    color: Highcharts.getOptions().colors[2]
	                }
	            },
	            title: {
	                text: '百分比',
	                style: {
	                    color: Highcharts.getOptions().colors[2]
	                }
	            }
	        }, { // Secondary yAxis
	        	min: 0,
	            title: {
	                text: '车辆数',
	                style: {
	                    color: Highcharts.getOptions().colors[0]
	                }
	            },
	            labels: {
	                format: '{value} 台数',
	                style: {
	                    color: Highcharts.getOptions().colors[0]
	                }
	            },
	            opposite: true
	        }];
	        var categories = ['自制件','部件','焊装','涂装','底盘','总装','入库'];
	        var plotOptions = {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
	        };
	        var tooltip = {
	                headerFormat: '<span style="font-size:12px;padding-bottom: 10px;">{point.key}</span><table>',
	                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: &nbsp;&nbsp;</td>' +
	                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
	                footerFormat: '</table>',
	                shared: true,
	                useHTML: true
	            };
			var series = [];
			var dataLabels = {
	                enabled: true,
	                rotation: 0,
	                color: '#black',
	                align: 'center',
	                x: 0,
	                y: 0,
	                style: {
	                    fontSize: '13px',
	                    fontFamily: 'Verdana, Microsoft YaHei'
	                    //textShadow: '0 0 3px black'
	                }
	            };
			
			var plan_qty_array = [0,0,0,0,0,0,0];
			var real_qty_array = [0,0,0,0,0,0,0];
			var rate_array = [null,null,null,null,null,null,null];
			$.each(response.data, function(index, value) {
				var workshop = value.key_name;
				if(workshop!='入库') workshop = workshop.substring(0,workshop.length-2);
				plan_qty_array[categories.indexOf(workshop)] = Number(value.plan_qty);
				real_qty_array[categories.indexOf(workshop)] = Number(value.real_qty);
				rate_array[categories.indexOf(workshop)] = Number(value.rate);
/*				plan_qty_array.push(value.plan_qty);
				real_qty_array.push(value.real_qty);
				rate_array.push(value.rate);*/
			});	
			var planData = {};
			planData.name = '计划数';
			planData.type = 'column';
			planData.yAxis = 1;
			planData.data = plan_qty_array;
			planData.tooltip = { valueSuffix: ' 台'};
			planData.dataLabels = dataLabels;
			series.push(planData);
			
			var realData = {};
			realData.color = 'red';
			realData.name = '完成数';
			realData.type = 'column';
			realData.yAxis = 1;
			realData.data = real_qty_array;
			realData.tooltip = { valueSuffix: ' 台'};
			realData.dataLabels = dataLabels;
			series.push(realData);
			
			var rateData = {};
			rateData.name = '达成率';
			rateData.color = 'green';
			rateData.type = 'spline';
			rateData.data = rate_array;
			rateData.tooltip = { valueSuffix: ' %'};
			rateData.dataLabels = {
	                enabled: true,
	                rotation: 0,
	                color: '#black',
	                align: 'center',
	                x: 0,
	                y: 0,
	                style: {
	                    fontSize: '13px',
	                    fontFamily: 'Verdana, Microsoft YaHei'
	                    //textShadow: '0 0 3px black'
	                },
                    formatter: function () {
                        return this.y + '%';
                    }
	            };
			rateData.marker = {
	                lineWidth: 2,
	                lineColor: Highcharts.getOptions().colors[3],
	                fillColor: 'white'
	            };
			series.push(rateData);
			
			drawChart("#containerReport",null,title,subtitle,tooltip,categories,yAxis,series,plotOptions);

	    }
	});
	
}
function getPlanRateDate(){
	var type = $("input[type='radio']:checked").val();
	if(type == 'W'){
		//周
		//当前周日期
		var weekStartDate = getWeekStartDate();
		var weekEndDate = getWeekEndDate();
		
        $("#start_date").val(weekStartDate);
        $("#end_date").val(weekEndDate);
	}else if(type == 'M'){
		//当前月日期
		var weekStartDate = getMonthStartDate();
		var weekEndDate = getMonthEndDate();
		
        $("#start_date").val(weekStartDate);
        $("#end_date").val(weekEndDate);
	}else if(type == 'Y'){
		var now = new Date(); //当前日期 
		var nowYear = now.getYear(); //当前年 
		var myyear = now.getFullYear(); 
        $("#start_date").val(myyear+"-01-01");
        $("#end_date").val(myyear+"-12-31");
	}
}

//格局化日期：yyyy-MM-dd 
function formatDate(date) { 
	var myyear = date.getFullYear(); 
	var mymonth = date.getMonth()+1; 
	var myweekday = date.getDate();

	if(mymonth < 10){ 
		mymonth = "0" + mymonth; 
	} 
	if(myweekday < 10){ 
		myweekday = "0" + myweekday; 
	} 
	return (myyear+"-"+mymonth + "-" + myweekday); 
}

//获得本周的开端日期 
function getWeekStartDate() { 
	var now = new Date(); //当前日期 
	var nowDayOfWeek = now.getDay(); //今天本周的第几天 
	var nowDay = now.getDate(); //当前日 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek); 
	return formatDate(weekStartDate); 
}

//获得本周的停止日期 
function getWeekEndDate() { 
	var now = new Date(); //当前日期 
	var nowDayOfWeek = now.getDay(); //今天本周的第几天 
	var nowDay = now.getDate(); //当前日 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)); 
	return formatDate(weekEndDate); 
}

//获得本月的开端日期 
function getMonthStartDate(){
	var now = new Date(); //当前日期 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var monthStartDate = new Date(nowYear, nowMonth, 1); 
	return formatDate(monthStartDate); 
}

//获得本月的停止日期 
function getMonthEndDate(){ 
	var now = new Date(); //当前日期 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth)); 
	return formatDate(monthEndDate); 
}
//获得某月的天数 
function getMonthDays(myMonth){
	var now = new Date(); //当前日期 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var monthStartDate = new Date(nowYear, myMonth, 1); 
	var monthEndDate = new Date(nowYear, myMonth + 1, 1); 
	var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24); 
	return days; 
}