$(document).ready(function(){
	getOrderNoSelect("#input_order","#orderId");
	pageSize=20;
	$("#btnQuery").click(function(){
		ajaxQuery(1);
	});
	//点击"放大镜"查看发车详情
	$(".fa-search").live("click",function(){
		var tds=$(this).parent("td").siblings();
		var orderNo=$(tds[0]).html();
		var conditions="{orderNo:'"+orderNo+"'}";
		window.open("busDispatch!busDispatchDesc.action?conditions="+conditions);
	});
});
function ajaxQuery(targetPage){
	var order=$("#input_order").val();
	var dispatchStart=$("#dispatch_start").val();
	var dispatchEnd=$("#dispatch_end").val();
	var conditions="{";
		conditions+="order:'"+order+"',";
		conditions+="dispatchStart:'"+dispatchStart+"',";
		conditions+="dispatchEnd:'"+dispatchEnd+"'}";
	$
	.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "busDispatch!busDispatchQuery.action",
		data : {
			"conditions" : conditions,
			"pager.pageSize" : 20,
			"pager.curPage" : targetPage || 1
		},
		success : function(response) {
			$("#tableResult tbody").html("");
			$.each(
							response.dataList,
							function(index, value) {
								// alert(value.id);
								var tr = $("<tr />");
								$("<td />").html(value.order_no).appendTo(tr);
								$("<td />").html(value.order_desc).appendTo(tr);
								$("<td />").html(value.order_qty).appendTo(tr);
								$("<td />").html(value.order_dispatch).appendTo(tr);
								$("<td />").html(value.order_done_qty).appendTo(tr);
								$("<td />").html(value.order_left).appendTo(tr);
								var editTd = $("<td />").html("<i name='edit' class=\"fa fa-search\" rel=\"tooltip\" title='查看'  style=\"cursor: pointer;color:blue\"></i>");editTd.appendTo(tr);
								tr.data("id", value.id);
								tr.data("parts", value.parts);
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