var pageSize =10;
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
				if ($("#new_workshop").val() == '') {
					alert('车间不能为空');
					return false;
				}
				if ($("#new_lineName").val() == '') {
					alert('线别不能为空');
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
			$("#tableLine").live(
					"click",
					function(e) {
						//alert($(e.target).html());
						if ($(e.target).attr("name") === "edit") {
							getEditFactorySelect();
							//alert("编辑");
							var siblings = $(e.target).parent("td").siblings();
							$("#edit_factory").val($(e.target).closest("tr").data("factoryId"));
							getEditWorkshopSelect();
							$("#edit_workshop").val($(e.target).closest("tr").data("workshopId"));
							$("#edit_lineName").val(siblings[3].innerHTML);
							$("#edit_memo").val(siblings[4].innerHTML);
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
					check_All_unAll("#tableLine", true);
				} else {
					check_All_unAll("#tableLine", false);
				}

			});
			$("#seach_factory").change(function(){
				$("#seach_workshop").empty();
				if($("#seach_factory").val() !=''){
					getAllWorkshopSelect();
				}else{
					$("#seach_workshop").append("<option value=''>全部</option>");
				}
			});
			$("#new_factory").change(function(){ 
				$("#new_workshop").empty();
				if($("#new_factory").val() !=''){
					getNewWorkshopSelect();
				}
			});

		})
// 查询车间列表
function ajaxQuery(targetPage) {
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "line!showLineList.action",
		data : {
			"seach_factory" : $('#seach_factory').val(),
			"seach_workshop" : $('#seach_workshop').val(),
			"input_lineName" : $('#input_lineName').val(),
			"input_deleteFlag" : $('#input_deleteFlag').val(),
			"pager.pageSize" : pageSize,
			"pager.curPage" : targetPage || 1
		},
		success : function(response) {
			$("#tableLine tbody").html("");
			$.each(response.lineList, function(line, value) {
				var tr = $("<tr />");
				$("<td />").html("<input type=\"checkbox\">").appendTo(tr);
				$("<td />").html(value.factoryName).appendTo(tr);
				$("<td />").html(value.workshopName).appendTo(tr);
				$("<td />").html(value.lineName).appendTo(tr);
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
				tr.data("factoryId", value.factoryId);
				tr.data("workshopId", value.workshopId);
				$("#tableLine tbody").append(tr);
			});
			$("#tableLine").show();
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
		url : "line!addLine.action",
		data : {
			"factoryId" : $("#new_factory").val(),
			"workshopId" : $("#new_workshop").val(),
			"lineName" : $("#new_lineName").val(),
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
		url : "line!editLine.action",
		data : {
			"id":id,
			"lineName" : $("#edit_lineName").val(),
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
	var cboxlist=$("#tableLine tbody :checked");
	//alert(cboxlist.length);
	$.each(cboxlist,function(index,cbox){
		idlist+=$(cbox).closest("tr").data("id")+",";		
	});
	idlist=idlist.substring(0,idlist.length-1);
	//alert(idlist);
	$.ajax({
		type : "get",
		dataType : "json",
		url : "line!deleteLine.action",
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
	var cboxlist=$("#tableLine tbody :checked");
	//alert(cboxlist.length);
	$.each(cboxlist,function(index,cbox){
		idlist+=$(cbox).closest("tr").data("id")+",";		
	});
	idlist=idlist.substring(0,idlist.length-1);
	//alert(idlist);
	$.ajax({
		type : "get",
		dataType : "json",
		url : "line!checkDeleteLine.action",
		data : {
			"idlist" : idlist
		},
		success : function(response) {
			if(response > 0){
				alert("要删除的线别下包含未删除的工序信息，无法直接删除线别，请先删除线别下已维护的工序信息！");
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
	$("#new_workshop").val("");
	$("#new_lineName").val("");
	$("#new_memo").val("");
	$("#newModal").modal("hide");
}
function emptyEditModel(){
	$("#new_factory").val("");
	$("#new_workshop").val("");
	$("#new_lineName").val("");
	$("#new_memo").val("");
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
function getAllWorkshopSelect() {
	$("#seach_workshop").empty();
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {
				factoryId:$("#seach_factory").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response, "", "#seach_workshop");
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

function getNewWorkshopSelect() {
	$("#new_workshop").empty();
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {
				factoryId:$("#new_factory").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_empty(response, "", "#new_workshop");
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

function getEditWorkshopSelect() {
	$("#eidt_workshop").empty();
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {
				factoryId:$("#edit_factory").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_noall(response, "", "#edit_workshop");
		}
	});
}

