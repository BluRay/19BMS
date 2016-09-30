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
	$("#cost_month").change(function(){
		ajaxQuery();
	});
});
function ajaxQuery(){
	$("#containerReport").html('');
	//$("#tableChartContainer tbody").html('');
	if($("#cost_month").val().trim()==''){
		alert('必须选择月份！');
		return;
	}
	
	$.ajax({
	    url: "costReport!singleBusManufacturingCost.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	'factory_id':$("#factory_id").val(),
	    	'cost_month':$("#cost_month").val()
	    },
	    success:function(response){	
	        var yAxis = {
	            min: 0,
	            title: {
	                text: '月费用（¥）'
	            }
	        };
	        
	        var categories = [];
	        
			var series = [];
			//var times = [];
			//var costs = [];
			//var hourCost = 0;
			var machine_costs = [];
			var other_materials_costs = [];
			var other_costs = [];
			var tooling_costs = [];
			var fuel_power_costs = [];
			var labor_costs = [];
			
			if(response.data.length<=0){
				//$("#tableContainer").css("display", "none");
				$("#tableContainer tbody").html("");
				alert('没有查询到数据！');
				
			}else{
				$.each(response.data, function(index, value) {
					categories.push(value.key_name);
					
					var machinecost={};
					//xx.color = Highcharts.getOptions().colors[index];
					machinecost.y = Number(value.machine_cost);
					machine_costs.push(machinecost);
					
					var othermaterialscost={};
					//xx.color = Highcharts.getOptions().colors[index];
					othermaterialscost.y = Number(value.other_materials_cost);
					other_materials_costs.push(othermaterialscost);
					
					var othercost={};
					//xx.color = Highcharts.getOptions().colors[index];
					othercost.y = Number(value.other_cost);
					other_costs.push(othercost);
					
					var toolingcost={};
					//xx.color = Highcharts.getOptions().colors[index];
					toolingcost.y = Number(value.tooling_cost);
					tooling_costs.push(toolingcost);
					
					var fuelpowercost={};
					//xx.color = Highcharts.getOptions().colors[index];
					fuelpowercost.y = Number(value.fuel_power_cost);
					fuel_power_costs.push(fuelpowercost);
					
					var laborcost={};
					//xx.color = Highcharts.getOptions().colors[index];
					laborcost.y = Number(value.labor_cost);
					labor_costs.push(laborcost);
				});	
				
				var series_machine_costs = {};
				series_machine_costs.name = '机器费用';
				series_machine_costs.data = machine_costs;
				series_machine_costs.dataLabels = {
			                enabled: true,
			                color: '#black',
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                    //textShadow: '0 0 3px black'
			                }
			            };
				series.push(series_machine_costs);
				
				var series_other_materials_costs = {};
				series_other_materials_costs.name = '其他材料消耗';
				series_other_materials_costs.data = other_materials_costs;
				series_other_materials_costs.dataLabels = {
			                enabled: true,
			                color: '#black',
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                    //textShadow: '0 0 3px black'
			                }
			            };
				series.push(series_other_materials_costs);
				
				var series_other_costs = {};
				series_other_costs.name = '其他费用';
				series_other_costs.data = other_costs;
				series_other_costs.dataLabels = {
			                enabled: true,
			                color: '#black',
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                    //textShadow: '0 0 3px black'
			                }
			            };
				series.push(series_other_costs);
				
				var series_tooling_costs = {};
				series_tooling_costs.name = '模具费用';
				series_tooling_costs.data = tooling_costs;
				series_tooling_costs.dataLabels = {
			                enabled: true,
			                color: '#black',
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                    //textShadow: '0 0 3px black'
			                }
			            };
				series.push(series_tooling_costs);
				
				var series_fuel_power_costs = {};
				series_fuel_power_costs.name = '燃料动力';
				series_fuel_power_costs.data = fuel_power_costs;
				series_fuel_power_costs.dataLabels = {
			                enabled: true,
			                color: '#black',
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                    //textShadow: '0 0 3px black'
			                }
			            };
				series.push(series_fuel_power_costs);
				
				var series_labor_costs = {};
				series_labor_costs.name = '人工费用';
				series_labor_costs.data = labor_costs;
				series_labor_costs.dataLabels = {
			                enabled: true,
			                color: '#black',
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                    //textShadow: '0 0 3px black'
			                }
			            };
				series.push(series_labor_costs);
				
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
    			var title = "<b>各车间单车制造费用</b>";
    			var subtitle = "";
				drawChart("#containerReport",'column',title,subtitle,tooltip,categories,yAxis,series,plotOptions);
				
				//$("#tableContainer").css("display", "none");
				$("#tableContainer tbody").html("");// 清空表格
				$.each(response.data,function(index,value){
					var tr=$("<tr />");
					$("<td />").html(Math.round(value.machine_cost*100)/100).appendTo(tr);
					$("<td />").html(Math.round(value.other_materials_cost*100)/100).appendTo(tr);
					$("<td />").html(Math.round(value.other_cost*100)/100).appendTo(tr);
					$("<td />").html(Math.round(value.tooling_cost*100)/100).appendTo(tr);
					$("<td />").html(Math.round(value.fuel_power_cost*100)/100).appendTo(tr);
					$("<td />").html(Math.round(value.labor_cost*100)/100).appendTo(tr);
					$("<td />").html(value.key_name).appendTo(tr);
					$("#tableContainer tbody").append(tr);
					$("#tableContainer").css("display", "");
				});
				$('#tableContainer').DataTable();
			}

	    }
	});
	
}
function getPlanRateDate(){
	var nowMonth = formatDate(); //当前月 
	$("#cost_month").val(nowMonth);
}

//格局化日期：yyyy-MM-dd 
function formatDate() { 
	var now = new Date(); //当前日期 
	var nowMonth = now.getMonth(); //当前月 
	nowMonth=((nowMonth==0)?(12):(nowMonth));
	var nowYear = now.getFullYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	nowYear = ((nowMonth==12)?(nowYear-1):(nowYear));
	
	if(nowMonth < 10){ 
		nowMonth = "0" + nowMonth; 
	} 
	return (nowYear+"-"+nowMonth); 
}


