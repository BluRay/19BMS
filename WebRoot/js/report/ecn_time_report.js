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
	$("#tableChartContainer tbody").html('');
	$("#tableChartContainer thead").html('');
	$.ajax({
	    url: "ecnReport!ecnTimeReport.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	'factory_id':$("#factory_id").val(),
	    	'start_date':$("#start_date").val(),
	    	'end_date': $("#end_date").val()
	    },
	    success:function(response){	
			var title = "月技改总工时（H） | <a href='swrNotice!showTechTransList.action' target='_blank'>技改工时查询</a>";
			var subtitle = "";
	        var yAxis = {
	            min: 0,
	            title: {
	                text: '小时（H）'
	            }
	        };
	        
	        var categories = [];
	        var plotOptions = {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
	        };
	        
			var series = [];
			var times = [];
			
			if(response.data.length<=0){
				alert('没有查询到数据！');
			}else{
				$.each(response.data, function(index, value) {
					categories.push(value.workshop_name);
					var xx={};
					xx.color = Highcharts.getOptions().colors[index];
					xx.y = value.all_ecn_time;
					times.push(xx);
					
				});	
				
				var ecn_time = {};
				ecn_time.name = '技改工时';
				ecn_time.data = times;
				ecn_time.dataLabels = {
			                enabled: true,
			                color: '#black',
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                    //textShadow: '0 0 3px black'
			                }
			            };
				series.push(ecn_time);
                var plotOptions = {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.2f} H'
                        }
                    }
                };
    			var tooltip = {
    	                formatter: function() {                                       
    	                 	return '<b>'+ this.x +'</b><br/>'+
    	                	this.series.name +': '+ this.y +' H<br/>';                                               
    	                }
    			};
				drawChart("#containerReport",'column',title,subtitle,tooltip,categories,yAxis,series,plotOptions);
					
				var th=$("<tr />");
				$("<th />").html('车间').appendTo(th);
				$.each(categories, function(index, value) {
					$("<th />").html(value).appendTo(th);
				});	
				$("<th />").html('合计').appendTo(th);
				$("#tableChartContainer thead").append(th);
				var tr=$("<tr />");
				var tt = 0;
				$("<td />").html('投入总工时(H)').appendTo(tr);
				$.each(times, function(index, value) {
					$("<th />").html(value.y).appendTo(tr);
					tt += Number(value.y)
				});	
				$("<td />").html(tt).appendTo(tr);
				$("#tableChartContainer tbody").append(tr);
			}

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