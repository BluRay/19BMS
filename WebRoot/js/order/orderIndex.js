$(document).ready(function () {	
	initPage();
	function initPage(){
		ajaxQuery();
	}
	
});
function ajaxQuery(){
	$.ajax({
	    url: "order!getOrderSchedule.action",
	    dataType: "json",
		type: "get",
	    data: {
	    },
	    success:function(response){	
			var title = "在制订单进度 | <a href='order!ordersearch.action' target='_blank'>订单查询</a>";
			var subtitle = "所有订单进度报表";
	        var yAxis = {
	                min: 100,
	                title: {
	                    text: '台数'
	                },
	                stackLabels: {
	                    enabled: true,
	                    style: {
	                        fontWeight: 'bold',
	                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                    }
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
			if(response.data.length>1){
				series = [
				          {name:'在制',data:productionNum},
				          {name:'入库',data:warehousingNum},
				          {name:'发车',data:dispatchNum},
				          {name:'待制',data:order_qty}];

				drawChart("#containerReport",'column',title,subtitle,categories,yAxis,series);
			}else{
			    series = [{
			            type: 'pie',
			            name: '订单进度',
			            data: [
				                {
				                    name: '在制',
				                    y: productionNum,
				                    sliced: true,
				                    selected: true
				                },
				                ['入库',  warehousingNum],
				                ['发车',  dispatchNum],
				                ['待制',  order_qty]
			            ]
			    }];
			    drawChart("#containerReport",'pie',title,subtitle,categories,yAxis,series);
			}

	    }
	});
	
}
