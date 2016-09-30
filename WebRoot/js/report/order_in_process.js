$(document).ready(function () {	
	initPage();
	function initPage(){
		ajaxQuery();
	}
	
});
function ajaxQuery(){
	$.ajax({
	    url: "orderReport!orderInProcessReport.action",
	    dataType: "json",
		type: "get",
	    data: {
	    },
	    success:function(response){	
			var title = "在制订单进度 | <a href='order!ordersearch.action' target='_blank'>订单查询</a>";
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
	                formatter: function() {                                       
	                    var s;                                                    
	                    if (this.point != null && this.point.name!=null) { // the pie chart                   
	                        s = ''+                                               
	                            this.point.name +': '+ this.y +' %';         
	                    } else {                                                  
	                        s =  '<b>'+ this.x +'</b><br>'+                                      
	                        this.series.name+': '+ this.y+'台';                            
	                    }                                                         
	                    return s;                                                 
	                }
			};
	        
			var categories = [];
			var series = [];
			var order_qty = [];
			var productionNum = [];
			var warehousingNum = [];
			var dispatchNum = [];
			var length = 0;
			
			$.each(response.data, function(index, value) {
				categories.push(value.order_desc);
				
				order_qty.push(value.order_qty-value.productionNum-value.warehousingNum);
				productionNum.push(value.productionNum);
				warehousingNum.push(value.warehousingNum);
				dispatchNum.push(value.dispatchNum);
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
			if(response.data.length>1){
		        tooltip = {
		                headerFormat: '<span style="font-size:12px;padding-bottom: 10px;">订单：{point.key}</span><table>',
		                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: &nbsp;&nbsp;</td>' +
		                    '<td style="padding:0"><b>{point.y} 台</b></td></tr>',
		                footerFormat: '</table>',
		                shared: true,
		                useHTML: true
		            };
				series = [
				          {name:'在制',data:productionNum,dataLabels:dataLabels},
				          {name:'入库',data:warehousingNum,dataLabels:dataLabels},
				          {name:'发车',data:dispatchNum,dataLabels:dataLabels},
				          {name:'待制',data:order_qty,dataLabels:dataLabels}];
				
				var plotOptions = {	
                    	column: {
							stacking : 'normal',
							dataLabels : {
								enabled : true,
								color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
										|| 'white'
							}
                    	}
	                };
					if(categories.length<=10){
						plotOptions = {
		                    	column: {
		                    			groupPadding: 0.2,
		            	                borderWidth: 0,
		            	                pointWidth:40,
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
			}else{
				var categories = ['在制','入库','发车','待制'];
				var production_rate = 0;
				var warehousing_rate = 0;
				var dispatch_rate = 0;
				var order_rate = 0;
				var order_desc = response.data[0].order_desc;
				
				production_rate = response.data[0].production_rate;
				warehousing_rate = response.data[0].warehousing_rate;
				dispatch_rate = response.data[0].dispatch_rate;
				order_rate = response.data[0].order_rate;
				
				productionNum = parseFloat(productionNum);
				warehousingNum = parseFloat(warehousingNum);
				dispatchNum = parseFloat(dispatchNum);
				order_qty = parseFloat(order_qty);
				
				/*var pNum = productionNum/(productionNum+warehousingNum+order_qty);
				var wNum = warehousingNum/(productionNum+warehousingNum+order_qty);
				var dNum = dispatchNum/(productionNum+warehousingNum+order_qty);
				var oNum = order_qty/(productionNum+warehousingNum+order_qty);
				pNum = parseFloat(pNum.toFixed(4));
				wNum = parseFloat(wNum.toFixed(10,4));
				dNum = parseFloat(dNum.toFixed(10,4));
				oNum = parseFloat(oNum.toFixed(10,4));*/
			    series = [{                                                        
				            type: 'column',                                               
				            name: order_desc+'台',    
				            lineWidth:1,
				            data: [productionNum, warehousingNum, dispatchNum, order_qty]
				        },{
			            type: 'pie',
			            name: '订单进度',
			            data: [
				                {
				                    name: '在制',
				                    y: production_rate,
				                    sliced: true,
				                    selected: true,
				                    color: Highcharts.getOptions().colors[0]
				                },
				                {	name:'入库', 
				                	y: warehousing_rate,
				                	color: Highcharts.getOptions().colors[1]
				                },
				                {   name:'发车', 
				                	y: dispatch_rate,
				                	color: Highcharts.getOptions().colors[3]
				                },
				                {	name:'待制', 
				                 	y: order_rate,
				                 	color: Highcharts.getOptions().colors[8]
				                }
			            ],
			            center: [30, 30],                                            
			            size: 100                                                 
			    }];
                var plotOptions = {
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
			    drawChart("#containerReport",'pie',title,subtitle,tooltip,categories,yAxis,series,plotOptions);
			}

	    }
	});
	
}
