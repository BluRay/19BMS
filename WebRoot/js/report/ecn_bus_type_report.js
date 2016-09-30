$(document).ready(function () {	
	initPage();
	function initPage(){
		getAuthorityFactorySelect("#factory_id");
		getBusTypeSelect("#bus_type_id", '', '');
		
		var curDate = getCurDate();
		curDate = curDate.substr(0,7);
		$("#start_date").val(curDate);
		$("#end_date").val(curDate);
		ajaxQuery();
	}
	$("#btnQuery").live("click",function () {
		$("input[name='xx']").attr('checked',false);
		ajaxQuery();
	});
});
function ajaxQuery(){
	$("#tableChartContainer tbody").html('');
	$.ajax({
	    url: "ecnReport!ecnBusTypeReport.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	'bus_type_id':$("#bus_type_id").val(),
	    	'factory_id':$("#factory_id").val(),
	    	'start_date':$("#start_date").val(),
	    	'end_date': $("#end_date").val()
	    },
	    success:function(response){	
			var title = "车型技改分析";
			var subtitle = "";
	        var yAxis = {
	            min: 0,
	            title: {
	                text: '技改项数'
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
			}
				$.each(response.data, function(index, value) {
					categories.push(value.order_desc);
					var xx={};
					xx.color = Highcharts.getOptions().colors[index];
					xx.y = value.ecns;
					times.push(xx);
					
					var tr=$("<tr />");
					$("<td />").html(index+1).appendTo(tr);
					$("<td />").html(value.order_no).appendTo(tr);
					$("<td />").html(value.order_desc).appendTo(tr);
					$("<td />").html(value.ecns).appendTo(tr);
					$("#tableChartContainer tbody").append(tr);
					
				});	
				
				var ecn_time = {};
				ecn_time.name = '技改项数';
				ecn_time.data = times;
				ecn_time.dataLabels = {
			                enabled: true,
			                color: '#black',
			                align: 'center',
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
                            format: '{point.y} (个)'
                        }
                    }
                };
				if(categories.length<=10){
	                plotOptions = {
	                    	column: {
	            	                pointPadding: 0.2,
	            	                borderWidth: 0,
	            	                pointWidth:40
	            	        },	
	                        series: {
	                            borderWidth: 0,
	                            dataLabels: {
	                                enabled: true,
	                                format: '{point.y} (个)'
	                            }
	                        }
	                    };
				}

    			var tooltip = {
    	                formatter: function() {                                       
    	                 	return '<b>'+ this.x +'</b><br/>'+
    	                	this.series.name +': '+ this.y +' 个<br/>';                                               
    	                }
    			};
				drawChart("#containerReport",'column',title,subtitle,tooltip,categories,yAxis,series,plotOptions);
				
	    }
	});
	
}


