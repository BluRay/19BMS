$(document).ready(function() {
	//alert("检验记录模板");
	$("#btnQuery").live("click", function() {
		ajaxQuery(1);
	});
	initPage();
	$(".fa-search").live("click",function(e){
		var headerId=$(e.target).parent("td").parent("tr").data("id")
		//alert(headerId);
		window.open("testTpl!showTestTplDetailPage.action?testTplHeader.id="+headerId,"_self");
	})
	$(".fa-files-o").live("click",function(e){
		var headerId=$(e.target).parent("td").parent("tr").data("id");
		var parts=$(e.target).parent("td").parent("tr").data("parts");
		var partsId=$(e.target).parent("td").parent("tr").data("partsId");
		var parts=$(e.target).parent("td").parent("tr").data("parts");
		var busType=$(e.target).parent("td").parent("tr").find("td").eq(0).html();
		window.open("testTpl!showTestTplDetailCopyPage.action?testTplHeader.id="+headerId+
				"&testTplHeader.busType="+busType+"&testTplHeader.partsId="+partsId+
				"&testTplHeader.parts="+parts+"&testTplHeader.tplType=订单","_self");
	});
	$(".fa-pencil").live("click",function(e){
		var headerId=$(e.target).parent("td").parent("tr").data("id");
		window.open("testTpl!showTestTplDetailEditPage.action?testTplHeader.id="+headerId,"_self");
	});
})
function initPage(){
	pageSize=20;
	getBusTypeSelect("#input_busType","");
	getOrderConfigSelect("#input_config","");
	$("#qc_tmpl_in").addClass("in");
}
// 查询模板列表
function ajaxQuery(targetPage) {
	$
			.ajax({
				type : "get",// 使用get方法访问后台
				dataType : "json",// 返回json格式的数据
				url : "testTpl!showTestTplList.action",
				data : {
					"testTplHeader.busType" : $('#input_busType').val(),
					"testTplHeader.order" : $('#input_order').val(),
					"testTplHeader.config" : $('#input_config').val(),
					"testTplHeader.parts" : $('#input_parts').val(),
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
										$("<td />").html(value.busType)
												.appendTo(tr);
										$("<td />").html(value.order).appendTo(
												tr);
										$("<td />").html(value.config)
												.appendTo(tr);
										$("<td />").html(value.parts).appendTo(
												tr);
										$("<td />").html(value.version)
												.appendTo(tr);
										$("<td />").html(value.memo).appendTo(
												tr);
										$("<td />").html(value.editor)
												.appendTo(tr);
										$("<td />").html(value.editDate)
												.appendTo(tr);
										var editTd = $("<td />")
										.html(
											"<i name='edit' class=\"fa fa-search\" rel=\"tooltip\" title='查看' style=\"cursor: pointer\"></i>&nbsp;&nbsp;<i name='edit' rel=\"tooltip\" title='编辑' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;<i name='edit' rel=\"tooltip\" title='复制' class=\"fa fa-files-o\" style=\"cursor: pointer\"></i>");
										if(value.order==null||value.order.trim().length==0){
											editTd = $("<td />")
											.html(
												"<i name='edit' class=\"fa fa-search\" rel=\"tooltip\" title='查看' style=\"cursor: pointer\"></i>&nbsp;&nbsp;<i name='edit' rel=\"tooltip\" title='复制' class=\"fa fa-files-o\" style=\"cursor: pointer\"></i>");
										}
										
										editTd.appendTo(tr);
										tr.data("id", value.id);
										tr.data("parts", value.parts);
										tr.data("partsId", value.partsId);
										$("#tableResult tbody").append(tr);
									});
					$("#tableResult").show();
					$("#total").html(response.pager.totalCount);
					$("#total").attr("total", response.pager.totalCount);
					$("#cur").attr("page", response.pager.curPage);
					$("#cur").html(
							"<a href=\"#\">" + response.pager.curPage + "</a>");
					$("#pagination").show();
					$("#checkall").attr("checked", false);
				}
			});
}
