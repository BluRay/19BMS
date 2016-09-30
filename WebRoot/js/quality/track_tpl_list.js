$(document).ready(function() {
	$("#btnQuery").live("click", function() {
		ajaxQuery(1);
	});
	initPage();
	$(".fa-search").live("click",function(e){
		var headerId=$(e.target).parent("td").parent("tr").data("id")
		//alert(headerId);
		window.open("trackTpl!showTplDetailPage.action?tplHeader.id="+headerId,"_self");
	})
	$(".fa-files-o").live("click",function(e){
		var headerId=$(e.target).parent("td").parent("tr").data("id");
		window.open("trackTpl!showTplDetailCopyPage.action?tplHeader.id="+headerId,"_self");
	});
	$(".fa-pencil").live("click",function(e){
		var headerId=$(e.target).parent("td").parent("tr").data("id");
		window.open("trackTpl!showTplDetailEditPage.action?tplHeader.id="+headerId,"_self");
	});
})
function initPage(){
	getBusTypeSelect("#input_busType","","");
/*	getOrderSelect("#input_order","");*/
	getOrderConfigSelect("#input_config","");
	pageSize=20;
	$("#qc_tmpl_in").addClass("in");
}
// 查询模板列表
function ajaxQuery(targetPage) {
	$
			.ajax({
				type : "get",// 使用get方法访问后台
				dataType : "json",// 返回json格式的数据
				url : "trackTpl!showTplList.action",
				data : {
					"tplHeader.busType" : $('#input_busType').val(),
					"tplHeader.order" : $('#input_order').val(),
					"tplHeader.config" : $('#input_config').val(),
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
										editTd.appendTo(tr);
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
