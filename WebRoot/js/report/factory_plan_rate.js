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
		//getPlanRateDate();
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
	    url: "planReport!factoryRateReport.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	'start_date':$("#start_date").val(),
	    	'end_date': $("#end_date").val()
	    },
	    success:function(response){	
			var title = "工厂计划达成率 | <a href='plan!plansearch.action' target='_blank'>计划达成情况</a>";
			var subtitle = $("#start_date").val()+"至"+$("#end_date").val()+"达成率";
	        var yAxis = {
	        		min: 0,
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
			var categories = ['自制件','部件','焊装','涂装','底盘','总装','入库'];
			if(response.data.length<=0){
				alert('没有查询到数据！');
			}
			var series = [];
			//var series = response.data;
			$.each(response.data,function(index, value) {
				var rates = value.data;
				var data = [null,null,null,null,null,null,null];
				for(var i=0;i<rates.length;i++){
					var workshop = rates[i].workshop;
					data[categories.indexOf(workshop)] = Number(rates[i].plan_rate);
				}
				
				var xx = {};
				xx.name = value.factory_name;
				xx.data = data;
				xx.dataLabels = {
		                enabled: true,
		                rotation: 0,
		                color: '#black',
		                align: 'right',
		                x: 0,
		                y: 0,
		                style: {
		                    fontSize: '13px',
		                    fontFamily: 'Verdana, Microsoft YaHei'
		                    //textShadow: '0 0 3px black'
		                },
		                formatter:function(){
		                	return this.y+' %';
		                }
		            }
				series.push(xx);
			});
			drawChart("#containerReport",'line',title,subtitle,null,categories,yAxis,series);
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