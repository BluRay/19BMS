$(document).ready(function () {	
	initPage();
	function initPage(){
		getOrderNoSelect("#order");
		getAuthorityFactorySelect("#factory_id");
		ajaxQuery();
	}
	$("#btnQuery").click(function(){
		ajaxQuery();
	});
});
function ajaxQuery(){
	$("#tableChartContainer tbody").html('');
	$.ajax({
	    url: "ecnReport!ecnOrderScheduleReport.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	'order':$("#order").val(),
	    	'factory_id':$("#factory_id").val()
	    },
	    success:function(response){	
	    	if(response.data.length<=0){
	    		alert('没有查询到技改数据信息！');
	    	}
			var title = "订单技改进度 | <a href='ecnDocumentTask!showEcnInformationList.action' target='_blank'>技改信息查询</a>";
			var subtitle = "";
	        var yAxis = {
	                min: 0,
	                title: {
	                    text: '台数'
	                },
	                stackLabels: {
	                    //enabled: true,
	                    style: {
	                    	color: '#black',
	                        fontSize: '13px',
	                        fontFamily: 'Verdana, Microsoft YaHei',
	                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                    },
	                    formatter:function() {
	                    	return this.y+' 台';
	                    }
	                }
	        };
	        var tooltip = {
	                headerFormat: '<span style="font-size:12px;padding-bottom: 10px;">问题点：{point.key}</span><table>',
	                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: &nbsp;&nbsp;</td>' +
	                    '<td style="padding:0"><b>{point.y} 台</b></td></tr>',
	                footerFormat: '</table>',
	                shared: true,
	                useHTML: true
	            };
/*			var tooltip = {
	                formatter: function() {                                       
	                    var s;                                                    
	                    s =  '<b>'+ this.x +'</b><br>'+                                      
	                        this.series.name+': '+ this.y+'台';                            
	                    return s;                                                 
	                }
			};*/
	        
			var categories = [];
			var series = [];
			
			var ecn_number = [];
			var finishedNum = [];
			var notFinishedNum = [];
			
			$.each(response.data, function(index, value) {
				if(value.ecn_number >0){
					categories.push(value.task_content);
					ecn_number.push(value.ecn_number);
					finishedNum.push(value.finishedNum);
					notFinishedNum.push(value.notFinishedNum);
				}
			});	
			var dataLabels = {
	                //enabled: true,
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
			
			series = [
			          {name:'已技改数',data:finishedNum,dataLabels:dataLabels},
			          {name:'未技改数',data:notFinishedNum,dataLabels:dataLabels}
			          ];
			var plotOptions = null;
			if(categories.length<=10){
	            plotOptions = {
	                	column: {
	                			groupPadding: 0.2,
	        	                borderWidth: 0,
	        	                pointWidth:30,
								stacking : 'normal',
								dataLabels : {
									enabled : true,
									color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
											|| 'white'
								}
	        	        }
	                };
			}

			drawChart("#containerReport",'column',title,subtitle,tooltip,categories,yAxis,series,plotOptions);
			
			$.each(response.data, function(index, value) {
				var tr=$("<tr />");
				
				$("<td />").html(value.task_content).appendTo(tr);
				$("<td />").html(value.ecn_number).appendTo(tr);
				$("<td />").html(value.finishedNum).appendTo(tr);
				$("<td />").html(value.notFinishedNum).appendTo(tr);
				
				$("#tableChartContainer tbody").append(tr);
			});	
			
	    }
	});
	
}
