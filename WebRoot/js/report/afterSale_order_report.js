$(document).ready(function () {	
	initPage();
	function initPage(){
		getOrderNoSelect("#order");
		getAuthorityFactorySelect("#factory_id");
		getBusTypeSelect("#bus_type_id", '', '');
		ajaxQuery();
	}
	$("#btnQuery").live("click",function () {
		ajaxQuery();
	});
});
function ajaxQuery(){
	$("#tableChartContainer tbody").html('');
	$.ajax({
	    url: "afterSaleReport!orderAfterSaleProblemsReport.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	'order':$("#order").val(),
	    	'bus_type':$("#bus_type_id  option:selected").text(),
	    	'customer_name':$("#customer_name").val(),
	    	'factory_id':$("#factory_id").val(),
	    	'start_date':$("#start_date").val(),
	    	'end_date': $("#end_date").val()
	    },
	    success:function(response){	
			var title = "订单售后问题 ";
			var subtitle = "";
	        var yAxis = {
	        		min: 0,
	                title: {
	                    text: '问题数'
	                },
	                plotLines: [{
	                    value: 0,
	                    width: 1,
	                    color: '#808080'
	                }],
	                labels: {
	                    formatter: function () {
	                        return this.value + '个';
	                    }
	                }
	        };
			var categories = ['S类问题','A类问题','B类问题','C类问题'];
			if(response.data.length<=0){
				alert('没有查询到数据！');
			}
			//var series = [{name:"长沙工厂",data:[0,8.65,0,5.59,3.73,1.83]},{name:"南京工厂",data:[0,0.00,0,0.00,0.00,0.00]}];
			var series = [];
			$.each(response.data,function(index, value) {
				var allFalut = value.allFalut.split(',');
				var S = 0, A = 0, B = 0,C = 0;
				for(var i=0;i<allFalut.length;i++){
					var faultStr = allFalut[i];
					if(faultStr.indexOf('S')>=0){
						S = faultStr.substring(faultStr.indexOf(':')+1);
					}
					if(faultStr.indexOf('A')>=0){
						A = faultStr.substring(faultStr.indexOf(':')+1);
					}
					if(faultStr.indexOf('B')>=0){
						B = faultStr.substring(faultStr.indexOf(':')+1);
					}
					if(faultStr.indexOf('C')>=0){
						C = faultStr.substring(faultStr.indexOf(':')+1);
					}
				}
				var xx = {};
				xx.name = value.order_describe+'-'+value.factory_name;
				var data = [];
				data.push(Number(S));
				data.push(Number(A));
				data.push(Number(B));
				data.push(Number(C));
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
	                	return this.y;
	                }
	            }
				series.push(xx);
				
				var tr=$("<tr />");
				$("<td />").html(index+1).appendTo(tr);
				$("<td />").html(value.order_describe).appendTo(tr);
				$("<td />").html(value.factory_name).appendTo(tr);
				if(Number(S)>0){
					$("<td />").html(Number(S)).appendTo(tr);
				}else{
					$("<td />").html('').appendTo(tr);
				}
				if(Number(A)>0){
					$("<td />").html(Number(A)).appendTo(tr);
				}else{
					$("<td />").html('').appendTo(tr);
				}
				if(Number(B)>0){
					$("<td />").html(Number(B)).appendTo(tr);
				}else{
					$("<td />").html('').appendTo(tr);
				}
				if(Number(C)>0){
					$("<td />").html(Number(C)).appendTo(tr);
				}else{
					$("<td />").html('').appendTo(tr);
				}
				//$("<td />").html(Number(A)).appendTo(tr);
				//$("<td />").html(Number(B)).appendTo(tr);
				//$("<td />").html(Number(C)).appendTo(tr);
				$("#tableChartContainer tbody").append(tr);
				
			});
		    var tooltip = {
		            valueSuffix: '个'
		        }
			drawChart("#containerReport",'line',title,subtitle,tooltip,categories,yAxis,series);
	    }
	});
	
}
