$(document).ready(function(){
	ajaxQuery(1);
	$("#btnQuery").click(function(){
		ajaxQuery(1);
	});

});
function ajaxQuery(targetPage){

	var orderNo=$("#input_order_no").val();

	var dispatchStart=$("#dispatch_start").val();
	var dispatchEnd=$("#dispatch_end").val();
	var busNoVin=$("#input_bus_no").val();
	var conditions="{";
		conditions+="orderNo:'"+orderNo+"',";
		conditions+="busNoVin:'"+busNoVin+"',";
		conditions+="dispatchStart:'"+dispatchStart+"',";
		conditions+="dispatchEnd:'"+dispatchEnd+"'}";
	$
	.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "busDispatch!busDispatchDescQuery.action",
		data : {
			"conditions" : conditions,
			"pager.pageSize" : 10,
			"pager.curPage" : targetPage || 1
		},
		success : function(response) {
			$("#tableResult tbody").html("");
			$.each(
							response.dataList,
							function(index, value) {
								var tr = $("<tr />");
								$("<td />").html(value.bus_number)
										.appendTo(tr);
								$("<td />").html(value.vin).appendTo(
										tr);
								$("<td />").html(value.motor_number)
										.appendTo(tr);
								$("<td />").html(value.flag_3c)
										.appendTo(tr);
								$("<td />").html(value.batch_desc).appendTo(
										tr);
										
								$("<td />").html(value.customer_number).appendTo(
										tr);
								$("<td />").html(value.dispatcher).appendTo(
										tr);
								$("<td />").html(value.receiver).appendTo(
										tr);
								$("<td />").html(value.dispatch_date.substr(0,10)).appendTo(
										tr);		
								$("#tableResult tbody").append(tr);
							});
			$("#tableResult").show();
			$("#total").html(response.pager.totalCount);
			$("#total").attr("total", response.pager.totalCount);
			$("#cur").attr("page", response.pager.curPage);
			$("#cur").html(
					"<a href=\"#\">" + response.pager.curPage + "</a>");
			$("#pagination").show();
		}
	});
}