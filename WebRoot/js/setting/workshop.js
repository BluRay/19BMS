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
				getNewFactorySelect();
				$("#new_factory").focus();
			});
			// 确定新增
			$("#btnAddConfirm").click(function() {
				if ($("#new_factory").val() == '') {
					alert('工厂不能为空');
					return false;
				}
				if ($("#new_workshopName").val() == '') {
					alert('车间名称不能为空');
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
			$("#tableWorkshop").live(
					"click",
					function(e) {
						//alert($(e.target).html());
						if ($(e.target).attr("name") === "edit") {
							getEditFactorySelect();
							//alert("编辑");
							var siblings = $(e.target).parent("td").siblings();
							$("#edit_factory").val($(e.target).closest("tr").data("factoryId"));
							$("#edit_workshopName").val(siblings[1].innerHTML);
							$("#edit_workshopCode").val(siblings[2].innerHTML);
							$("#edit_memo").val(
									siblings[4].innerHTML);
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
							
							getWorkshopSelect($("#edit_pre_workshopId"), $(e.target).closest("tr").data("preposing_workshop_id"), $(e.target).closest("tr").data("factoryId"), 'empty');
							
							$("#editModal").modal("show");
						}
					}
				);
			// 编辑
			$("#btnEditConfirm").live("click", function() {
				ajaxEdit($("#editModal").data("id"));
			});

			// 全选、反选
			$("#checkall").live("click", function() {
				// alert($("#checkall").attr("checked"));
				if ($("#checkall").attr("checked") == "checked") {
					check_All_unAll("#tableWorkshop", true);
				} else {
					check_All_unAll("#tableWorkshop", false);
				}

			});

		})
// 查询车间列表
function ajaxQuery(targetPage) {
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "workshop!showWorkshopList.action",
		data : {
			"seach_factory" : $('#seach_factory').val(),
			"input_workshopName" : $('#input_workshopName').val(),
			"input_deleteFlag" : $('#input_deleteFlag').val(),
			"pager.pageSize" : 10,
			"pager.curPage" : targetPage || 1
		},
		success : function(response) {
			$("#tableWorkshop tbody").html("");
			$.each(response.workshopList, function(workshop, value) {
				var tr = $("<tr />");
				$("<td />").html("<input type=\"checkbox\">").appendTo(tr);
				$("<td />").html(value.workshopName).appendTo(tr);
				$("<td />").html(value.workshopCode).appendTo(tr);
				$("<td />").html(value.factoryName).appendTo(tr);
				$("<td />").html(value.memo).appendTo(tr);
				if(value.deleteFlag !=0){
					$("<td />").html('Y').appendTo(tr);
					}else{
						$("<td />").html('&nbsp;').appendTo(tr);
					}
				
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
				tr.data("preposing_workshop_id", value.preposing_workshop_id);
				tr.data("factoryId", value.factoryId);
				$("#tableWorkshop tbody").append(tr);
			});
			$("#tableWorkshop").show();
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
	getAllFactorySelect();
	$("#seach_factory").addClass("active");
}

// 新增车间 ajax方法
function ajaxAdd() {
	$.ajax({
		type : "get",
		dataType : "json",
		url : "workshop!addWorkshop.action",
		data : {
			"factoryId" : $("#new_factory").val(),
			"workshopName" : $("#new_workshopName").val(),
			"workshopCode" : $("#new_workshopCode").val(),
			"memo" : $("#new_memo").val()
		},
		success : function(response) {
				ajaxQuery(1);
				emptyNewModal();
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
		url : "workshop!editWorkshop.action",
		data : {
			"id":id,
			"factoryId" : $("#edit_factory").val(),
			"workshopName" : $("#edit_workshopName").val(),
			"workshopCode" : $("#edit_workshopCode").val(),
			"preposing_workshop_id" : $("#edit_pre_workshopId").val(),
			"memo" : $("#edit_memo").val()
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
	var cboxlist=$("#tableWorkshop tbody :checked");
	//alert(cboxlist.length);
	$.each(cboxlist,function(index,cbox){
		idlist+=$(cbox).closest("tr").data("id")+",";		
	});
	idlist=idlist.substring(0,idlist.length-1);
	//alert(idlist);
	$.ajax({
		type : "get",
		dataType : "json",
		url : "workshop!deleteWorkshop.action",
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
	var cboxlist=$("#tableWorkshop tbody :checked");
	//alert(cboxlist.length);
	$.each(cboxlist,function(index,cbox){
		idlist+=$(cbox).closest("tr").data("id")+",";		
	});
	idlist=idlist.substring(0,idlist.length-1);
	//alert(idlist);
	$.ajax({
		type : "get",
		dataType : "json",
		url : "workshop!checkDeleteWorkshop.action",
		data : {
			"idlist" : idlist
		},
		success : function(response) {
			if(response > 0){
				alert("要删除的车间下包含未删除的线别信息，无法直接删除车间，请先删除车间下已维护的线别信息！");
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

function emptyNewModal() {
	$("#new_factory").val("");
	$("#new_workshopName").val("");
	$("#new_workshopCode").val("");
	$("#new_memo").val("");
	$("#newModal").modal("hide");
}
function emptyEditModel(){
	$("#edit_factory").val("");
	$("#edit_workshopName").val("");
	$("#edit_workshopCode").val("");
	$("#edit_memo").val("");
	$("#editModal").modal("hide");
}
function getAllFactorySelect() {
	$.ajax({
		url : "common!getFactorySelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response, "", "#seach_factory");
		}
	});
}
function getNewFactorySelect() {
	$.ajax({
		url : "common!getFactorySelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_empty(response, "", "#new_factory");
		}
	});
}

function getEditFactorySelect() {
	$.ajax({
		url : "common!getFactorySelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_noall(response, "", "#edit_factory");
		}
	});
}