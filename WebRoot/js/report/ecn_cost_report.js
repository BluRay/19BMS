$(document).ready(function () {	
	initPage();
	function initPage(){
		getAuthorityFactorySelect("#factory_id");
		$("#factory_id option").each(function(){
			if($(this).text() == '全部'){
				$(this).remove();
			}
		});
		getPlanRateDate();
		ajaxQuery();
	}
	$("#btnQuery").click(function(){
		ajaxQuery();
	});
	$("#start_date").change(function(){
		ajaxQuery();
	});
});
function ajaxQuery(){
	$("#containerReport").html('');
	$("#tableChartContainer tbody").html('');
	if($("#start_date").val().trim()==''){
		alert('必须选择月份！');
		return;
	}
	
	$.ajax({
	    url: "costReport!ecnCostReport.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	'factory_id':$("#factory_id").val(),
	    	'start_date':$("#start_date").val()
	    },
	    success:function(response){	
	        var yAxis = {
	            min: 0,
	            title: {
	                text: '月费用（¥）'
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
			var costs = [];
			var hourCost = 0;
			if(response.data.length<=0){
				alert('没有查询到数据！');
			}else{
				$.each(response.data, function(index, value) {
					categories.push(value.workshop_name);
					var xx={};
					//xx.color = Highcharts.getOptions().colors[index];
					xx.y = value.all_ecn_time;
					times.push(xx);
					
					var yy={};
					yy.y = value.ecnCost;
					//yy.color = Highcharts.getOptions().colors[12];
					costs.push(yy);
					
					hourCost = value.hourCost;
				});	
				
				var ecn_time = {};
				ecn_time.name = '月技改工时（H）';
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
				
				var ecn_cost = {};
				ecn_cost.name = '月技改费用（RMB）';
				ecn_cost.data = costs;
				ecn_cost.dataLabels = {
			                enabled: true,
			                color: '#black',
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                    //textShadow: '0 0 3px black'
			                }
			            };
				series.push(ecn_cost);
				
                var plotOptions = {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.2f}'
                        }
                    }
                };
/*    			var tooltip = {
    	                formatter: function() {                                       
    	                 	return '<b>'+ this.x +'</b><br/>'+
    	                	this.series.name +': '+ this.y +' RMB<br/>';                                               
    	                }
    			};*/
    	        var tooltip = {
    	                headerFormat: '<span style="font-size:12px;padding-bottom: 10px;">{point.key}</span><table>',
    	                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: &nbsp;&nbsp;</td>' +
    	                    '<td style="padding:0"><b>{point.y} </b></td></tr>',
    	                footerFormat: '</table>',
    	                shared: true,
    	                useHTML: true
    	            };
    			var title = "<b>车间月技改成本费用（¥）</b>";
    			var subtitle = "每小时"+hourCost+" RMB";
				drawChart("#containerReport",'column',title,subtitle,tooltip,categories,yAxis,series,plotOptions);
				
				var tr=$("<tr />");
				var times_0=Number(times[0].y)==0?0:Number(Number(times[0].y).toFixed(2));
				var times_1=Number(times[1].y)==0?0:Number(Number(times[1].y).toFixed(2));
				var times_2=Number(times[2].y)==0?0:Number(Number(times[2].y).toFixed(2));
				var times_3=Number(times[3].y)==0?0:Number(Number(times[3].y).toFixed(2));
				var times_4=Number(times[4].y)==0?0:Number(Number(times[4].y).toFixed(2));
				var times_5=Number(times[5].y)==0?0:Number(Number(times[5].y).toFixed(2));
				var times_6=Number(times[6].y)==0?0:Number(Number(times[6].y).toFixed(2));
				$("<td />").html('').appendTo(tr);
				$("<td />").html('投入总工时(H)').appendTo(tr);
				$("<td />").html(times_0).appendTo(tr);
				$("<td />").html(times_1).appendTo(tr);
				$("<td />").html(times_2).appendTo(tr);
				$("<td />").html(times_3).appendTo(tr);
				$("<td />").html(times_4).appendTo(tr);
				$("<td />").html(times_5).appendTo(tr);
				$("<td />").html(times_6).appendTo(tr);
				$("<td />").html((times_0+times_1+times_2+times_3+times_4+times_5+times_6)+" H").appendTo(tr);
				$("#tableChartContainer tbody").append(tr);
				var tr1=$("<tr />");
				var costs_0=Number(costs[0].y)==0?0:Number(Number(costs[0].y).toFixed(2));
				var costs_1=Number(costs[1].y)==0?0:Number(Number(costs[1].y).toFixed(2));
				var costs_2=Number(costs[2].y)==0?0:Number(Number(costs[2].y).toFixed(2));
				var costs_3=Number(costs[3].y)==0?0:Number(Number(costs[3].y).toFixed(2));
				var costs_4=Number(costs[4].y)==0?0:Number(Number(costs[4].y).toFixed(2));
				var costs_5=Number(costs[5].y)==0?0:Number(Number(costs[5].y).toFixed(2));
				var costs_6=Number(costs[6].y)==0?0:Number(Number(costs[6].y).toFixed(2));
				$("<td />").html(hourCost+'(RMB)').appendTo(tr1);
				$("<td />").html('投入总费用(RMB)').appendTo(tr1);
				$("<td />").html(costs_0).appendTo(tr1);
				$("<td />").html(costs_1).appendTo(tr1);
				$("<td />").html(costs_2).appendTo(tr1);
				$("<td />").html(costs_3).appendTo(tr1);
				$("<td />").html(costs_4).appendTo(tr1);
				$("<td />").html(costs_5).appendTo(tr1);
				$("<td />").html(costs_6).appendTo(tr1);
				$("<td />").html((costs_0+costs_1+costs_2+costs_3+costs_4+costs_5+costs_6)+" RMB").appendTo(tr1);
				
				$("#tableChartContainer tbody").append(tr1);
			}

	    }
	});
	
}
function getPlanRateDate(){
	var nowMonth = formatDate(); //当前月 
	$("#start_date").val(nowMonth);
}

//格局化日期：yyyy-MM-dd 
function formatDate() { 
	var now = new Date(); //当前日期 
	var nowMonth = now.getMonth(); //当前月 
	nowMonth = nowMonth+1;
	var nowYear = now.getFullYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	
	if(nowMonth < 10){ 
		nowMonth = "0" + nowMonth; 
	} 
	return (nowYear+"-"+nowMonth); 
}


