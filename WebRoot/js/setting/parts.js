var pageSize = 10;
$(document).ready(
		function() {
			initPage();
			$("#btnQuery").live("click", function() {
				ajaxQuery(1);
			});
			// 点击新增
			$("#btnAdd").click(function(argument) {
				getKeysSelect("PARTS_TYPE", "", "#new_parts_type_id");
				getKeysSelect("WORKSHOP", "", "#new_workshop");
				$("#newModal").modal("show");
				$("#new_parts_type_id").focus();
			});
			// 确定新增
			$("#btnAddConfirm").click(function() {
				if ($("#new_parts_type_id").val() == '') {
					alert('零部件类型不能为空');
					return false;
				}
				if ($("#new_parts_name").val() == '') {
					alert('零部件名称不能为空');
					return false;
				}
				ajaxAdd();
				return false;
			});
			// 删除
			$("#btnDelete").live("click", function() {
				if (confirm("是否确定删除！")) {
					ajaxDelete();
				}
			})
			// 弹出编辑框
			$("#tableProcess").live(
					"click",
					function(e) {
						//alert($(e.target).html());
						clear();
						if ($(e.target).attr("name") === "edit") {
							//alert("编辑");
							var siblings = $(e.target).parent("td").siblings();
							getKeysSelect("PARTS_TYPE", $(e.target).closest("tr").data("parts_type"), "#edit_parts_type_id");
							getKeysSelect("WORKSHOP", "", "#edit_workshop");
							$("#edit_parts_name").val($(e.target).closest("tr").data("parts_name"));
							$("#edit_parts_code").val($(e.target).closest("tr").data("parts_code"));
							if($(e.target).closest("tr").data("quality_flag")==1){
								$("#edit_quality_flag").attr("checked",true);
							}else{
								$("#edit_quality_flag").attr("checked",false);
							}
							if($(e.target).closest("tr").data("status")==1){
								$("#edit_delete_flag").attr("checked",true);
							}else{
								$("#edit_delete_flag").attr("checked",false);
							}
							var workshop_id = $(e.target).closest("tr").data("workshop_id");
							if(workshop_id!=''){
								$("#edit_workshop").val(workshop_id);
							}
							
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
				if ($("#edit_parts_type_id").val() == '') {
					alert('零部件类型不能为空');
					return false;
				}
				if ($("#edit_parts_name").val() == '') {
					alert('零部件名称不能为空');
					return false;
				}
				ajaxEdit($("#editModal").data("id"));
			});

			// 全选、反选
			$("#checkall").live("click", function() {
				// alert($("#checkall").attr("checked"));
				if ($("#checkall").attr("checked") == "checked") {
					check_All_unAll("#tableProcess", true);
				} else {
					check_All_unAll("#tableProcess", false);
				}

			});
			$("#btnImport").click (function () {
				$("#divBulkAdd").show();
			});
		})
// 查询车间列表
function ajaxQuery(targetPage) {
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "parts!showPartsList.action",
		data : {
			"seach_parts_type_id" : $('#seach_parts_type_id').find("option:selected").text(),
			"seach_workshop" : $('#seach_workshop').val(),
			"seach_parts_name" : $('#seach_parts_name').val(),
			"input_quality_flag" : $('#input_quality_flag').is(':checked')?1:0,
			"pager.pageSize" : pageSize,
			"pager.curPage" : targetPage || 1
		},
		success : function(response) {
			$("#tableProcess tbody").html("");
			var i =1;
			$.each(response.partsList, function(process, value) {
				var tr = $("<tr />");
				$("<td />").html(i++).appendTo(tr);
				$("<td />").html(value.partsTypeName).appendTo(tr);
				$("<td />").html(value.parts_name).appendTo(tr);
				$("<td />").html(value.workshop_name).appendTo(tr);
				if(value.quality_flag ==1){
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
				tr.data("parts_type", value.parts_type);
				tr.data("partsTypeName", value.partsTypeName);
				tr.data("parts_name", value.parts_name);
				tr.data("parts_code", value.parts_code);
				tr.data("quality_flag", value.quality_flag);
				tr.data("workshop_id", value.workshop_id);
				tr.data("workshop_name", value.workshop_name);
				tr.data("status", value.status);
				$("#tableProcess tbody").append(tr);
			});
			$("#tableProcess").show();
			$("#total").html(response.pager.totalCount);
			$("#total").attr("total", response.pager.totalCount);
			$("#cur").attr("page", response.pager.curPage);
			$("#cur").html("<a href=\"#\">" + response.pager.curPage + "</a>");
			$("#pagination").show();
			$("#divBulkAdd").hide();
			$("#checkall").attr("checked",false);
		}
	});
}
function clear(){
	$("#edit_parts_type_id").val();
	$("#edit_parts_name").val();
	$("#edit_parts_code").val();
	$("#edit_workshop").val();
	$("#edit_delete_flag").attr('checked',false);
}
function initPage() {
	getKeysSelect_Q("PARTS_TYPE", "", "#seach_parts_type_id");
	getKeysSelect_Q("WORKSHOP", "", "#seach_workshop");
	$("#input_parts_name").addClass("active");
	ajaxQuery(1);
}

// 新增工序 ajax方法
function ajaxAdd() {
	$.ajax({
		type : "get",
		dataType : "json",
		url : "parts!addParts.action",
		data : {
			//"parts_type_id" : $("#new_parts_type_id").val(),
			"parts_type" : $("#new_parts_type_id").find("option:selected").text(),
			"parts_name" : $("#new_parts_name").val(),
			"parts_code" : $("#new_parts_code").val(),
			"workshop_id" : $("#new_workshop").val()==''?0:$("#new_workshop").val(),
			"workshop_name" : $("#new_workshop").find("option:selected").text(),
			"quality_flag" : $("#new_quality_flag").is(':checked')?1:0
		},
		success : function(response) {
			alert(response.message);
			if(response.success){
				$("#newModal").modal("hide");
				ajaxQuery(1);
			}
		},
		error : function() {
			alert(response.message);
		}
	})
}
// 函数：编辑操作

function ajaxEdit(id) {
	// alert($("#textEditAddr").val());
	$.ajax({
		type : "get",
		dataType : "json",
		url : "parts!editParts.action",
		data : {
			"id":id,
			//"parts_type_id" : $("#edit_parts_type_id").val(),
			"parts_type" : $("#edit_parts_type_id").find("option:selected").text(),
			"parts_name" : $("#edit_parts_name").val(),
			"parts_code" : $("#edit_parts_code").val(),
			"workshop_id" : $("#edit_workshop").val()==''?0:$("#edit_workshop").val(),
			"workshop_name" : $("#edit_workshop").find("option:selected").text(),
			"quality_flag" : $("#edit_quality_flag").is(':checked')?1:0,
			"status" : $("#edit_delete_flag").is(':checked')?1:0
		},
		success : function(response) {
			alert(response.message);
			if(response.success){
				$("#editModal").modal("hide");
				ajaxQuery($(".curPage").attr("page"));
			}
		},
		error : function() {
			alert(response.message);
		}
	})
}
// 函数：删除操作
function ajaxDelete() {
	var idlist="";
	var cboxlist=$("#tableProcess tbody :checked");
	//alert(cboxlist.length);
	$.each(cboxlist,function(index,cbox){
		idlist+=$(cbox).closest("tr").data("id")+",";		
	});
	idlist=idlist.substring(0,idlist.length-1);
	//alert(idlist);
	$.ajax({
		type : "get",
		dataType : "json",
		url : "process!deleteProcess.action",
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
function LimitAttach(form, file) {
	if ($("#file").val() == "") {
		alert("请选择文件！");
		return false;
	}
	allowSubmit = false;
	if (!file)
		return;
	while (file.indexOf("\\") != -1)
		file = file.slice(file.indexOf("\\") + 1);
	ext = file.slice(file.indexOf(".")).toLowerCase();
	for (var i = 0; i < extArray.length; i++) {
		if (extArray[i] == ext) {
			allowSubmit = true;
			break;
		}
	}
	if (allowSubmit) {
		form.submit();
		//$('#btn_upload').val("上传中...");
		//$('#btn_upload').attr('disabled', "true");
	} else {
		alert("对不起，只能上传csv格式的文件!\n请重新选择符合条件的文件再上传.");
		return false;
	}
}


