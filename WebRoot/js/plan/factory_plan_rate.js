$(document).ready(function () {	
	initPage();
	function initPage(){
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
	$.ajax({
	    url: "plan!getPlanRate.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	'start_date':$("#start_date").val(),
	    	'end_date': $("#end_date").val()
	    },
	    success:function(response){	
			var title = "工厂计划达成率 | <a href='order!ordersearch.action' target='_blank'>订单查询</a>";
			var subtitle = $("#start_date").val()+"至"+$("#end_date").val()+"达成率";
	        var yAxis = {
	                title: {
	                    text: '达成率百分比'
	                },
	                plotLines: [{
	                    value: 0,
	                    width: 1,
	                    color: '#808080'
	                }],
	                labels: {
	                    formatter: function () {
	                        return this.value + '%';
	                    }
	                }
	        };
			var categories = ['部件','焊装','涂装','底盘','总装','入库'];
			if(response.data.length<=0){
				alert('没有查询到数据！');
			}
			//var series = [{name:"长沙工厂",data:[0,8.65,0,5.59,3.73,1.83]},{name:"南京工厂",data:[0,0.00,0,0.00,0.00,0.00]}];
			var series = response.data;
/*			$.each(response.data,function(index, value) {
				var xx = {};
				xx.name = value.name;
				xx.data = value.data;
				alert(value.data.length);
				series.push(xx);
			});*/
			drawChart("#containerReport",'line',title,subtitle,categories,yAxis,series);
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