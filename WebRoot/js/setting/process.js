var pageSize = 10;
$(document).ready(
		function() {
			initPage();
			$("#btnQuery").live("click", function() {
				ajaxQuery(1);
			});
			// 点击新增
			$("#btnAdd").click(function(argument) {
				$("#newModal").modal("show");
				getNewFactorySelect();
				getNewPlanCodeSelect();
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
				if ($("#new_process_code").val() == '') {
					alert('线别不能为空');
					return false;
				}
				if ($("#new_process_name").val() == '') {
					alert('线别不能为空');
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
						if ($(e.target).attr("name") === "edit") {
							getEditFactorySelect();
							//alert("编辑");
							var siblings = $(e.target).parent("td").siblings();
							$("#edit_factory").val($(e.target).closest("tr").data("factoryId"));
							getEditWorkshopSelect();
							$("#edit_workshop").val($(e.target).closest("tr").data("workshopId"));
							getEditLineSelect();
							$("#edit_line").val($(e.target).closest("tr").data("lineId"));
							$("#edit_process_code").val(siblings[4].innerHTML);
							$("#edit_process_name").val(siblings[5].innerHTML);
							getEditPlanCodeSelect();
							$("#edit_plan_node").val($(e.target).closest("tr").data("planNodeId"));
							if($(e.target).closest("tr").data("monitoryPointFlag")==1){
								$("#edit_monitory_point_flag").attr("checked",true);
							}else{
								$("#edit_monitory_point_flag").attr("checked",false);
							}
							if($(e.target).closest("tr").data("keyProcessFlag")==1){
								$("#edit_key_process_flag").attr("checked",true);
							}else{
								$("#edit_key_process_flag").attr("checked",false);
							}
							$("#edit_memo").val(siblings[9].innerHTML);
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
					check_All_unAll("#tableProcess", true);
				} else {
					check_All_unAll("#tableProcess", false);
				}

			});
			$("#seach_factory").change(function(){
				$("#seach_workshop").empty();
				$("#seach_line").empty();
				if($("#seach_factory").val()!=''){
					getAllWorkshopSelect();
					$("#seach_line").append("<option value=''>全部</option>");
				}else{
					$("#seach_workshop").append("<option value=''>全部</option>");
					$("#seach_line").append("<option value=''>全部</option>");
				}
			});
			$("#seach_workshop").change(function(){
				$("#seach_line").empty();
				if($("#seach_workshop").val()!=''){
					getAllLineSelect();
				}else{
					$("#seach_line").append("<option value=''>全部</option>");
				}
			});			
			$("#new_factory").change(function(){ 
				$("#new_workshop").empty();
				$("#new_line").empty();
				if($("#new_factory").val()!=''){
					getNewWorkshopSelect();
				}
			});
			$("#new_workshop").change(function(){ 
				$("#new_line").empty();
				if($("#new_workshop").val()!=''){
					getNewLineSelect();
				}
			});

		})
// 查询车间列表
function ajaxQuery(targetPage) {
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "process!showProcessList.action",
		data : {
			"seach_factory" : $('#seach_factory').val(),
			"seach_workshop" : $('#seach_workshop').val(),
			"seach_line" : $('#seach_line').val(),
			"input_processName" : $('#input_processName').val(),
			"input_monitoryPointFlag" : $('#input_monitoryPointFlag').is(':checked')?1:0,
			"input_keyProcessFlag" : $('#input_keyProcessFlag').is(':checked')?1:0,
			"input_onlineFlag" : $('#input_onlineFlag').is(':checked')?1:0,
			"input_offlineFlag" : $('#input_offlineFlag').is(':checked')?1:0,
			"input_deleteFlag" : $('#input_deleteFlag').val(),
			"pager.pageSize" : pageSize,
			"pager.curPage" : targetPage || 1
		},
		success : function(response) {
			$("#tableProcess tbody").html("");
			$.each(response.processList, function(process, value) {
				var tr = $("<tr />");
				$("<td />").html("<input type=\"checkbox\">").appendTo(tr);
				$("<td />").html(value.factoryName).appendTo(tr);
				$("<td />").html(value.workshopName).appendTo(tr);
				$("<td />").html(value.lineName).appendTo(tr);
				$("<td />").html(value.processCode).appendTo(tr);
				$("<td />").html(value.processName).appendTo(tr);
				if(value.monitoryPointFlag ==1){
					$("<td />").html('Y').appendTo(tr);
					}else{
						$("<td />").html('&nbsp;').appendTo(tr);
					}
				if(value.keyProcessFlag ==1){
					$("<td />").html('Y').appendTo(tr);
					}else{
						$("<td />").html('&nbsp;').appendTo(tr);
					}
				$("<td />").html(value.planNodeName).appendTo(tr);
				$("<td />").html(value.memo).appendTo(tr);
				if(value.deleteFlag ==1){
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
				tr.data("lineId", value.lineId);
				tr.data("planNodeId", value.planNodeId);
				tr.data("monitoryPointFlag", value.monitoryPointFlag);
				tr.data("keyProcessFlag", value.keyProcessFlag);
				$("#tableProcess tbody").append(tr);
			});
			$("#tableProcess").show();
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

// 新增工序 ajax方法
function ajaxAdd() {
	$.ajax({
		type : "get",
		dataType : "json",
		url : "process!addProcess.action",
		data : {
			"factoryId" : $("#new_factory").val(),
			"workshopId" : $("#new_workshop").val(),
			"lineId" : $("#new_line").val(),
			"processCode" : $("#new_process_code").val(),
			"processName" : $("#new_process_name").val(),
			"planNodeId" : $("#new_plan_node").val(),
			"monitoryPointFlag" : $("#new_monitory_point_flag").is(':checked')?1:0,
			"keyProcessFlag" : $("#new_key_process_flag").is(':checked')?1:0,
			"memo" : $("#new_memo").val()
		},
		success : function(response) {			
				ajaxQuery(1);
				emptyNewModal();
				$("#newModal").modal("hide");
		},
		error : function() {
			//alertError();
			alert("系统已存在【"+$("#new_process_name").val()+"】维护了计划节点【"+$("#new_plan_node").find("option:selected").text()+"】，一个工厂下不能有超过一道工序关联相同的计划节点");
		}
	})
}
// 函数：编辑操作

function ajaxEdit(id) {
	// alert($("#textEditAddr").val());
	$.ajax({
		type : "get",
		dataType : "json",
		url : "process!editProcess.action",
		data : {
			"id":id,
			"lineId":$("#edit_line").val(),
			"processCode" : $("#edit_process_code").val(),
			"processName" : $("#edit_process_name").val(),
			"planNodeId" : $("#edit_plan_node").val(),
			"monitoryPointFlag" : $("#edit_monitory_point_flag").is(':checked')?1:0,
			"keyProcessFlag" : $("#edit_key_process_flag").is(':checked')?1:0,		
			"memo" : $("#edit_memo").val()
		},
		success : function(response) {
			if(!response.success){
				alert("系统已存在【"+$("#edit_process_name").val()+"】维护了计划节点【"+$("#edit_plan_node").find("option:selected").text()+"】，一个工厂下不能有超过一道工序关联相同的计划节点");
			}else{
				ajaxQuery($(".curPage").attr("page"));
				emptyEditModel();
			}
			
		},
		error : function() {
			//alertError();
			$("#newModal").modal("show");
			alert("系统已存在【"+$("#edit_process_name").val()+"】维护了计划节点【"+$("#edit_plan_node").find("option:selected").text()+"】，一个工厂下不能有超过一道工序关联相同的计划节点");
			
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

function emptyNewModal() {
	$("#new_factory").val("");
	$("#new_workshop").val("");
	$("#new_line").val("");
	$("#new_process_code").val("");
	$("#new_process_name").val("");
	$("#new_plan_node").val("");
	$("#new_monitory_point_flag").val("");
	$("#new_key_process_flag").val("");
	$("#new_memo").val("");
	$("#newModal").modal("hide");
}
function emptyEditModel(){
	$("#edit_factory").val("");
	$("#edit_workshop").val("");
	$("#edit_line").val("");
	$("#edit_process_code").val("");
	$("#edit_process_name").val("");
	$("#edit_plan_node").val("");
	$("#edit_monitory_point_flag").val("");
	$("#edit_key_process_flag").val("");
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
function getAllLineSelect() {
	$("#seach_line").empty();
	$.ajax({
		url : "common!getLineSelect.action",
		dataType : "json",
		data : {
				workshopId:$("#seach_workshop").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response, "", "#seach_line"); 
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
function getNewLineSelect() {
	$("#new_line").empty();
	$.ajax({
		url : "common!getLineSelect.action",
		dataType : "json",
		data : {
				workshopId:$("#new_workshop").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_empty(response, "", "#new_line"); 
		}
	});
}
function getNewPlanCodeSelect(){
	getKeysSelect("PLAN_CODE", "", "#new_plan_node"); 
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
function getEditLineSelect() {
	$("#eidt_line").empty();
	$.ajax({
		url : "common!getLineSelect.action",
		dataType : "json",
		data : {
				workshopId:$("#edit_workshop").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_noall(response, "", "#edit_line");
		}
	});
}
function getEditPlanCodeSelect(){
	$("#edit_plan_node").empty();
	getKeysSelect("PLAN_CODE", "", "#edit_plan_node");
}