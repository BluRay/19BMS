$(document).ready(function () {	
	initPage();
	function initPage(){
		getAuthorityFactorySelect("#factory_id");
		$("#factory_id option").each(function(){
			if($(this).text() == '全部'){
				$(this).remove();
			}
		});
		
		getKeysSelect("COST_DEPARTMENT","自制件车间","#q_workshop");
		
		getPlanRateDate();
		ajaxQuery();
	}
	$("#btnQuery").click(function(){
		ajaxQuery();
	});
	/*$("#cost_month").change(function(){
		ajaxQuery();
	});*/
});
function ajaxQuery(){
	$("#containerReport").html('');
	//$("#tableChartContainer tbody").html('');
	if($("#factory_id").val().trim().length==0){
		alert("请选择工厂！");
		return;
	}else if($("#q_workshop").val().trim().length==0){
		alert("请选择车间！");
		return;
	}else if($("#cost_month").val().trim()==''){
		alert('必须选择月份！');
		return;
	}
	
	$.ajax({
	    url: "costReport!classificationCost.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	'factory_id':$("#factory_id").val(),
	    	'cost_month':$("#cost_month").val(),
	    	'cost_department_id':$("#q_workshop").val()
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
			var data = [];
			
			if(response.data.length<=0){
				alert('没有查询到数据！');
				
			}else{
				$.each(response.data, function(index, value) {
					categories.push(value.key_name);
					
					data.push(["机器费用",Number(value.machine_cost)]);
					data.push(["其他材料消耗",Number(value.other_materials_cost)]);
					data.push(["其他费用",Number(value.other_cost)]);
					data.push(["模具费用",Number(value.tooling_cost)]);
					data.push(["燃料动力",Number(value.fuel_power_cost)]);
					data.push(["人工费用",Number(value.labor_cost)]);
					
				});	
				
				var series_costs = {};
				series_costs.name = '（¥）';
				series_costs.data = data;
				series_costs.dataLabels = {
			                enabled: true,
			                color: '#black',
			                align: 'right',
			                style: {
			                    fontSize: '13px',
			                    fontFamily: 'Verdana, sans-serif'
			                    //textShadow: '0 0 3px black'
			                }
			            };
				series.push(series_costs);
				
                var plotOptions = {
                	pie: {
                		allowPointSelect: true,
                		cursor: 'pointer',
                		dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
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
    			var title = "<b>各车间月制造费用比例图</b>";
    			var subtitle = "";
				drawChart("#containerReport",'pie',title,subtitle,tooltip,categories,yAxis,series,plotOptions);
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


