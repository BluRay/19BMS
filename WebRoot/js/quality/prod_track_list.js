$(document).ready(function() {
	initPage();
	$("#btnQuery").click(function(){
		ajaxQuery(1);
	});
	$("#btnAdd").live("click",function(e){
		var headerId=$(e.target).parent("td").parent("tr").data("id");
		window.open("prodTrackIn!recordAddPage.action","_self");
	});
	$(".fa-pencil").live("click",function(e){
		var tr=$(e.target).parent("td").parent("tr");
		var workshop=$(tr).find("td").eq(1).html();
		var factoryId=$(tr).data("factoryId");
		var busNo=$(tr).data("busNo");
		window.open("prodTrackIn!recordUpdatePage.action?trackHeader.factoryId="+factoryId+"&trackHeader.busNo="+busNo+"&workshop="+workshop,"_self");
	});
	$(".fa-search").live("click",function(e){
		var tr=$(e.target).parent("td").parent("tr");
		var workshop=$(tr).find("td").eq(1).html();
		var factoryId=$(e.target).parent("td").parent("tr").data("factoryId");
		var busNo=$(e.target).parent("td").parent("tr").data("busNo");
		window.open("prodTrackIn!recordDetailPage.action?trackHeader.factoryId="+factoryId+"&trackHeader.busNo="+busNo+"&workshop="+workshop,"_self");
	});
	$("#input_factory").change(
			function(e) {
				var eleId=$(e.target).attr("id");
				var selectFactory = $("#"+eleId+" :selected").text();
				var workshopEleId="#input_workshop";
				getWorkshopSelect_Auth(workshopEleId, null,
						selectFactory, "");
			});

})
function initPage(){
	pageSize=20;
	//getFactorySelect("#input_factory","","");
	getAuthorityFactorySelect("#input_factory", "", "noall");
	getWorkshopSelect_Auth("#input_workshop", "", $("#input_factory :selected").text(), "");
	getOrderNoSelect("#input_order","#orderId");
	$("#qc_record_in").addClass("in");
}
//查询列表
function ajaxQuery(targetPage) {
	var workshopAll="";
	$("#input_workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	var workshop=$("#input_workshop :selected").text()=="全部"?workshopAll:$("#input_workshop :selected").text();
	var factoryId=isNaN(parseInt($("#input_factory").val()))?0:parseInt($("#input_factory").val());
	var conditions="{";
	conditions+="factoryId:"+factoryId+",orderName:'"+$("#input_order").val()+
		"',workshop:'"+workshop+"',busNo:'"+$("#input_bus_no").val()+"'}";
	//alert(conditions);	
	$
			.ajax({
				type : "get",// 使用get方法访问后台
				dataType : "json",// 返回json格式的数据
				url : "prodTrackIn!showRecordList.action",
				data : {
					"conditions":conditions,
					"pager.pageSize" : 20,
					"pager.curPage" : targetPage || 1
				},
				success : function(response) {
					$("#tableResult tbody").html("");
					$
							.each(
									response.dataList,
									function(index, value) {
										// alert(value.id);
										var tr = $("<tr />");
										$("<td />").html(value.factory)
												.appendTo(tr);
										$("<td />").html(value.workshop)
										.appendTo(tr);
										$("<td />").html(value.order).appendTo(
												tr);
										$("<td />").html(value.busNo)
												.appendTo(tr);
										$("<td />").html(value.busType)
										.appendTo(tr);
										$("<td />").html(value.orderConfig)
										.appendTo(tr);
										$("<td />").html(value.editor)
										.appendTo(tr);
										$("<td />").html(value.editDate)
										.appendTo(tr);
										var editTd = $("<td />")
												.html(
													"<i name='search' rel=\"tooltip\" title='查看'  class=\"fa fa-search\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\" title='编辑' style=\"cursor: pointer\"></i>");
										editTd.appendTo(tr);
										tr.data("factoryId", value.factoryId);
										tr.data("orderId", value.orderId);
										tr.data("busNo", value.busNo);
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