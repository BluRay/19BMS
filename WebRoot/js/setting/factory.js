$(document).ready(
		function() {
			// alert("工厂维护");
			initPage();
			$("#btnQuery").live("click", function() {
				ajaxQuery(1);
			});
			// 点击新增
			$("#btnAdd").click(function(argument) {
				$("#newModal").modal("show");
				$("#new_factoryCode").focus();
			});
			// 确定新增
			$("#btnAddConfirm").click(function() {
				if ($("#new_factoryCode").val() == '') {
					alert('工厂简称不能为空');
					return false;
				}
				if ($("#new_factoryCode").val() == '') {
					alert('工厂简称不能为空');
					return false;
				}
				if ($("#new_factoryCode").val() == '') {
					alert('工厂简称不能为空');
					return false;
				}
				ajaxAdd();
				$("#newModal").modal("hide");
				return false;
			});
			// 删除
			$("#btnDelete").live("click", function() {
				if (confirm("是否确定删除！")) {
					ajaxCanDeleted();
				}
			})
			// 弹出编辑框
			$("#tableFactory").live(
					"click",
					function(e) {
						//alert($(e.target).html());
						if ($(e.target).attr("name") === "edit") {
							//alert("编辑");
							var siblings = $(e.target).parent("td").siblings();
							$("#edit_factoryCode").val(siblings[1].innerHTML);
							$("#edit_factory").val(siblings[2].innerHTML);
							$("#edit_assembCode").val(siblings[3].innerHTML);
							$("#edit_area").val(
									$(e.target).closest("tr").data("area"));
							$("#edit_memo").val(
									$(e.target).closest("tr").data("memo"));
							$("#editModal").data("id",
									$(e.target).closest("tr").data("id"));
							if ($("#editModal").data(
									"using"
											+ $(e.target).closest("tr").data(
													"id")) == 1) {
								$('#checkboxEditStartUsing').attr("checked",
										"checked");
								// console.log($("#editModal").data("using"+$(e.target).closest("tr").data("id")));
							} else {
								$('#checkboxEditStartUsing').attr("checked",
										false);
							}
							$("#editModal").modal("show");

						}
					});
			// 编辑
			$("#btnEditConfirm").live("click", function() {
				ajaxEdit($("#editModal").data("id"));
			});

			// 全选、反选
			$("#checkall").live("click", function() {
				// alert($("#checkall").attr("checked"));
				if ($("#checkall").attr("checked") == "checked") {
					check_All_unAll("#tableFactory", true);
				} else {
					check_All_unAll("#tableFactory", false);
				}

			});

		})
// 查询factory列表
function ajaxQuery(targetPage) {
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "baseData!showFactoryList.action",
		data : {
			"input_factory" : $('#input_factory').val(),
			"input_assembcode" : $('#batchNo').val(),
			"pager.pageSize" : 20,
			"pager.curPage" : targetPage || 1
		},
		success : function(response) {
			$("#tableFactory tbody").html("");
			$.each(response.factoryList, function(index, value) {
				// alert(value.id);
				var tr = $("<tr />");
				$("<td />").html("<input type=\"checkbox\">").appendTo(tr);
				$("<td />").html(value.factoryCode).appendTo(tr);
				$("<td />").html(value.factoryName).appendTo(tr);
				$("<td />").html(value.assemblyCode).appendTo(tr);
				$("<td />").html(value.editor).appendTo(tr);
				$("<td />").html(value.editDate).appendTo(tr);
				/*var editTd = $("<td />").html("");
				$("<button />").addClass("btn-link").html("编辑").prependTo(
						editTd);*/
				var editTd = $("<td />").html("<i name='edit' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>");
				// $("<button
				// />").addClass("btn-link").html("删除").appendTo(editTd);
				editTd.appendTo(tr);
				tr.data("id", value.id);
				tr.data("area", value.area);
				tr.data("memo", value.memo);
				$("#tableFactory tbody").append(tr);
			});
			$("#tableFactory").show();
			$("#total").html(response.pager.totalCount);
			$("#total").attr("total", response.pager.totalCount);
			$("#cur").attr("page", response.pager.curPage);
			$("#cur").html("<a href=\"#\">" + response.pager.curPage + "</a>");
			$("#pagination").show();
			$("#checkall").attr("checked",false);
		}
	});
}
function initPage() {
	// getFactorySelect();
	$("#setting_factory").addClass("active");
}

// 新增工厂 ajax方法
function ajaxAdd() {
	$.ajax({
		type : "get",
		dataType : "json",
		url : "baseData!addFactory.action",
		data : {
			"factoryCode" : $("#new_factoryCode").val(),
			"factoryName" : $("#new_factory").val(),
			"assemblyCode" : $("#new_assembCode").val(),
			"memo" : $("#new_memo").val(),
			"area" : $("#new_area").val()
		},
		success : function(response) {
			if (response.success) {
				ajaxQuery(1);
				emptyNewModal();
			} else {
				alert(response.message);
			}
		},
		error : function() {
			alertError();
		}
	})
}
// 函数：编辑操作

function ajaxEdit(id) {
	// alert($("#textEditAddr").val());
	$.ajax({
		type : "get",
		dataType : "json",
		url : "baseData!updateFactory.action",
		data : {
			"id":id,
			"factoryCode" : $("#edit_factoryCode").val(),
			"factoryName" : $("#edit_factory").val(),
			"assemblyCode" : $("#edit_assembCode").val(),
			"memo" : $("#edit_memo").val(),
			"area" : $("#edit_area").val()
		},
		success : function(response) {
			ajaxQuery($(".curPage").attr("page"));
			emptyEditModel();
		},
		error : function() {
			alertError();
		}
	})
}
// 函数：删除操作
function ajaxDelete() {
	var idlist="";
	var cboxlist=$("#tableFactory tbody :checked");
	//alert(cboxlist.length);
	$.each(cboxlist,function(index,cbox){
		idlist+=$(cbox).closest("tr").data("id")+",";		
	});
	idlist=idlist.substring(0,idlist.length-1);
	//alert(idlist);
	$.ajax({
		type : "get",
		dataType : "json",
		url : "baseData!deleteFactory.action",
		data : {
			"idlist" : idlist
		},
		success : function(response) {
			ajaxQuery($(".curPage").attr("page"));
		},
		error : function() {
			alertError();
		}

	});
}

//函数：判定是否能删除，当工厂下有未删除的车间信息时提示不能删除
function ajaxCanDeleted() {
	var idlist="";
	var cboxlist=$("#tableFactory tbody :checked");
	//alert(cboxlist.length);
	$.each(cboxlist,function(index,cbox){
		idlist+=$(cbox).closest("tr").data("id")+",";		
	});
	idlist=idlist.substring(0,idlist.length-1);
	//alert(idlist);
	$.ajax({
		type : "get",
		dataType : "json",
		url : "baseData!checkDeleteFactory.action",
		data : {
			"idlist" : idlist
		},
		success : function(response) {
			if(response > 0){
				alert("要删除的工厂下包含未删除的车间信息，无法直接删除工厂，请先删除工厂下已维护的线别信息！");
			}else{
				//删除工厂
				ajaxDelete();
			}
		},
		error : function() {
			alertError();
		}

	});
}

/*function getFactorySelect() {
	$.ajax({
		url : "common!getFactorySelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response, "", "#factory");
		}
	});
}*/
function emptyNewModal() {
	$("#new_factoryCode").val("");
	$("#new_factory").val("");
	$("#new_assembCode").val("");
	$("#new_area").val("");
	$("#new_memo").val("");
	$("#newModal").modal("hide");
}
function emptyEditModel(){
	$("#edit_factoryCode").val("");
	$("#edit_factory").val("");
	$("#edit_assembCode").val("");
	$("#edit_area").val("");
	$("#edit_memo").val("");
	$("#editModal").modal("hide");
}