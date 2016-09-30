$(document).ready(function () {	
	initPage();
	function initPage(){
		getOrderNoSelect("#order");
		getAuthorityFactorySelect("#factory_id");
		getBusTypeSelect("#bus_type_id", '', '');
		
/*		var curDate = getCurDate();
		$("#start_date").val(curDate);
		$("#end_date").val(curDate);*/
		ajaxQuery();
	}
	$("#btnQuery").live("click",function () {
		ajaxQuery();
	});
});
function ajaxQuery(){
	$("#tableChartContainer tbody").html('');
	$.ajax({
	    url: "afterSaleReport!allAfterSaleProblemsReport.action",
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
			if(response.data.length<=0){
				alert('没有查询到数据！');
			}
    		var last_bus_type = "";//最近技改单ID
    		var bus_type = "";
    		var bus_type_index = 0;
    		
    		var last_order_describe = "";//最近技改单ID
    		var order_describe = "";
    		var order_describe_index = 0;
    		
    		var last_customer_name = "";//最近技改单ID
    		var customer_name = "";
    		var customer_name_index = 0;
    		
			$.each(response.data, function(index, value) {
				var allFalut = value.allFalut.split(',');
				var S = '', A = '', B = '',C = '';
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
				
				var tr=$("<tr />");
				//$("<td />").html(index+1).appendTo(tr);
				
				if (value.bus_type == last_bus_type) {
					var noderowspan = parseInt($(bus_type).attr(
							"rowspan"));
					$(bus_type).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='bus_type_" + bus_type_index
									+ "' rowspan='1' " + "/>").html(
							value.bus_type).appendTo(tr);
					bus_type = "#bus_type_" + bus_type_index;
					bus_type_index += 1;
				}
				//$("<td />").html(value.bus_type).appendTo(tr);
				if (value.order_describe == last_order_describe) {
					var noderowspan = parseInt($(order_describe).attr(
							"rowspan"));
					$(order_describe).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='order_describe_" + order_describe_index
									+ "' rowspan='1' " + "/>").html(
							value.order_describe).appendTo(tr);
					order_describe = "#order_describe_" + order_describe_index;
					order_describe_index += 1;
				}
				//$("<td />").html(value.order_describe).appendTo(tr);
				if (value.order_describe == last_order_describe && value.customer_name == last_customer_name) {
					var noderowspan = parseInt($(customer_name).attr(
							"rowspan"));
					$(customer_name).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='customer_name_" + customer_name_index
									+ "' rowspan='1' " + "/>").html(
							value.customer_name).appendTo(tr);
					customer_name = "#customer_name_" + customer_name_index;
					customer_name_index += 1;
				}
				//$("<td />").html(value.customer_name).appendTo(tr);
				$("<td />").html(value.factory_name).appendTo(tr);
				$("<td />").html(value.production_qty).appendTo(tr);
				$("<td />").html(S).appendTo(tr);
				$("<td />").html(A).appendTo(tr);
				$("<td />").html(B).appendTo(tr);
				$("<td />").html(C).appendTo(tr);
				
				$("#tableChartContainer tbody").append(tr);
				
				last_bus_type = value.bus_type;
				last_order_describe = value.order_describe;
				last_customer_name = value.customer_name;
			});	
				
	    }
	});
	
}


