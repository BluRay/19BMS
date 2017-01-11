var pageSize = 20;
var timeConfigCount = 0;
var ready_hour = 0;
var edit_list = [];
var re_f = /^[0-9]+[0-9]*\.?[0|5]?$/;// 浮点数正则表达式
$(document).ready(function() {
	initPage();
	function initPage() {
		ajaxQuery(1);
	}
	// 技改信息查询
	$("#btnQuery").click(function() {
		ajaxQuery();
		return false;
	});
});

/**
 * 查询 mod by 吴潇
 */
function ajaxQuery(targetPage) {
	$.ajax({
		url : "techTask!getTaskMaintainList.action",
		dataType : "json",
		type : "post",
		data : {
			"task_content" : $('#task_content').val(),
			"tech_order_no" : $('#tech_order_no').val(),

			"status" : $('#status').val(),
			"tech_date_start" : $('#tech_date_start').val(),
			"tech_date_end" : $('#tech_date_end').val(),
			"pager.pageSize" : pageSize || 20,
			"pager.curPage" : targetPage || 1
		},
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$("#tableTaskFollow tbody").html("");

			$.each(response.data, function(index, value) {
				var tr = $("<tr />");
				$("<td />").html(value.task_content).appendTo(tr);
				$("<td />").html(getKeys("ECN_CHANGE_TYPE",value.tech_order_type)).appendTo(tr);
				$("<td />").html(value.tech_order_no).appendTo(tr);
				$("<td />").html("<a href='#' onclick='window.open(\""+value.tech_order_file+"\")'>"+(value.tech_order_file==""?"":"查看")+"</a>").appendTo(tr);
				$("<td />").html(value.tech_date).appendTo(tr);
				$("<td />").html(getKeys("ECN_DUTY_UNIT",value.duty_unit)).appendTo(tr);
				$("<td />").html(value.major_change).appendTo(tr);
				$("<td />").html(value.custom_change).appendTo(tr);
				$("<td />").html("<a href='#' onclick='window.open(\""+value.custom_change_file+"\")'>"+(value.custom_change_file==""?"":"查看")+"</a>").appendTo(tr);
				$("<td />").html(value.repeat_change).appendTo(tr);
				$("<td />").html(getKeys("ECN_TYPE",value.tech_type)).appendTo(tr);

				$("<td />").html(value.finish_date==""?"<a onclick='window.open(\"/19bms/techTask!techTaskMaterialCheckPage.action?taskid=1\")' onclick=''>确认</a>":"").appendTo(tr);
				$("#tableTaskFollow tbody").append(tr);

				$(tr).data("id", value.id);

			});
			$("#total").html(response.pager.totalCount);
			$("#total").attr("total", response.pager.totalCount);
			$("#cur").attr("page", response.pager.curPage);
			$("#cur").html("<a href=\"#\">" + response.pager.curPage + "</a>");
			$("#pagination").show();
		}
	});
}


function showEditModal(id){
	$('#editForm').resetForm();
	getKeysSelect("ECN_TYPE", "", "#edit_tech_type");
	getKeysSelect("ECN_CHANGE_TYPE", "", "#edit_tech_order_type");
	getKeysSelect("ECN_DUTY_UNIT", "", "#edit_duty_unit");
	$("#table2 tbody").html("");
	$("#edit_tech_order_file").next("a").remove();
	$("#edit_custom_change_file").next("a").remove();
	
	ajaxSingleQuery(id);
	ajaxQueryChangedMaterialList(id);
	
	$("#tech_task_id").val(id);
	$("#editModal").modal("show");
}

function ajaxSingleQuery(id) {
	$.ajax({
		url : "techTask!getSingleTaskMaintain.action",
		dataType : "json",
		type : "post",
		data : {
			"id" : id
		},
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$.each(response.data, function(index, value) {
				$("#edit_task_content").val(value.task_content);
				$("#edit_tech_order_type").val(value.tech_order_type);
				$("#edit_tech_order_no").val(value.tech_order_no);
				
				//$("#edit_tech_order_file").val("<a href='"+value.tech_order_file+"'>"+(value.tech_order_file==""?"":"查看")+"</a>").appendTo(tr);
				$("#edit_tech_order_file").after("<a href='#' onclick='window.open(\""+value.tech_order_file+"\")'>"+(value.tech_order_file==""?"":"查看")+"</a>");
				$("#edit_tech_date").val(value.tech_date);
				$("#edit_duty_unit").val(value.duty_unit);
				value.major_change=="Y"?$("#edit_major_change").attr('checked',true):$("#edit_major_change").removeAttr('checked');
				value.custom_change=="Y"?$("#edit_custom_change").attr('checked',true):$("#edit_custom_change").removeAttr('checked');
				value.repeat_change=="Y"?$("#edit_repeat_change").attr('checked',true):$("#edit_repeat_change").removeAttr('checked');
				
				//$("#edit_custom_change_file").val("<a href='"+value.custom_change_file+"'>"+(value.custom_change_file==""?"":"查看")+"</a>").appendTo(tr);
				$("#edit_custom_change_file").after("<a href='#' onclick='window.open(\""+value.custom_change_file+"\")'>"+(value.custom_change_file==""?"":"查看")+"</a>");
				$("#edit_tech_type").val(value.tech_type);
				
				$("#edit_tech_point_num").val(value.tech_point_num);
				$("#edit_custom_change_no").val(value.custom_change_no);
			});
		}
	});
}

//add by wuxiao start
function ajaxAdd() {
	if ($("#new_task_content").val().trim() == "") {
		alert("技改任务 值不能为空！");
		$("#new_task_content").focus();
		return false;
	} 
	if ($("#new_tech_order_no").val().trim() == "") {
		alert("技改单号 值不能为空！");
		$("#new_tech_order_no").focus();
		return false;
	}
	if ($("#new_tech_point_num").val().trim() == "") {
		alert("技改点数 值不能为空！");
		$("#new_tech_point_num").focus();
		return false;
	}
	if ($("#new_tech_order_type").val().trim() == "") {
		alert("变更单类型 值不能为空！");
		$("#new_tech_order_type").focus();
		return false;
	}
	if ($("#new_tech_type").val().trim() == "") {
		alert("技改类型 值不能为空！");
		$("#new_tech_type").focus();
		return false;
	}
	if ($("#new_tech_date").val().trim() == "") {
		alert("技改单日期 值不能为空！");
		$("#new_tech_date").focus();
		return false;
	}
	if ($("#new_duty_unit").val().trim() == "") {
		alert("责任单位 值不能为空！");
		$("#new_duty_unit").focus();
		return false;
	}
	if ($("#new_tech_order_file").val().trim() == "") {
		alert("技改单附件 值不能为空！");
		$("#new_tech_order_file").focus();
		return false;
	}
	var trs = getSelectRowDatas("table1");
	$('#addForm').ajaxSubmit({
		url : "techTask!addTechTaskMaintain.action",
		dataType : "json",
		type : "post",
		data : {
			"selectedrows": JSON.stringify(trs)
		},
		success : function(response) {
			if (response.success) {
				//$(".divLoading").hide();
				//$("#btnMtaSave").attr("disabled", false);
				$("#newModal").modal("hide");
				alert(response.message);
				ajaxQuery();
			} else {
				alert(response.message);
			}
		}
	});
}

function ajaxEdit() {
	if ($("#edit_task_content").val().trim() == "") {
		alert("技改任务 值不能为空！");
		$("#edit_task_content").focus();
		return false;
	} 
	if ($("#edit_tech_order_no").val().trim() == "") {
		alert("技改单号 值不能为空！");
		$("#edit_tech_order_no").focus();
		return false;
	}
	if ($("#edit_tech_point_num").val().trim() == "") {
		alert("技改点数 值不能为空！");
		$("#edit_tech_point_num").focus();
		return false;
	}
	if ($("#edit_tech_order_type").val().trim() == "") {
		alert("变更单类型 值不能为空！");
		$("#edit_tech_order_type").focus();
		return false;
	}
	if ($("#edit_tech_type").val().trim() == "") {
		alert("技改类型 值不能为空！");
		$("#new_tech_type").focus();
		return false;
	}
	if ($("#edit_tech_date").val().trim() == "") {
		alert("技改单日期 值不能为空！");
		$("#edit_tech_date").focus();
		return false;
	}
	if ($("#edit_duty_unit").val().trim() == "") {
		alert("责任单位 值不能为空！");
		$("#edit_duty_unit").focus();
		return false;
	}
	/*if ($("#edit_tech_order_file").val().trim() == "") {
		alert("技改单附件 值不能为空！");
		$("#edit_tech_order_file").focus();
		return false;
	}*/
	var trs = getSelectRowDatas("table2");
	$('#editForm').ajaxSubmit({
		url : "techTask!editTechTaskMaintain.action",
		dataType : "json",
		type : "post",
		data : {
			"selectedrows": JSON.stringify(trs)
		},
		success : function(response) {
			if (response.success) {
				//$(".divLoading").hide();
				//$("#btnMtaSave").attr("disabled", false);
				$("#editModal").modal("hide");
				alert(response.message);
				ajaxQuery();
			} else {
				alert(response.message);
			}
		}
	});
}

extArray = new Array(".xlsx");
function LimitAttach(form, file) {
	if (file == "") {
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
		// form.submit();
		// $('#btn_upload').val("上传中...");
		// $('#btn_upload').attr('disabled', "true");
		//$(".divLoading").addClass("fade in").show();
		$('#uploadForm').ajaxSubmit({
			dataType : "json",
			type : 'post', // 提交方式 get/post
			url : 'techTask!uploadChangedMaterialList.action', // 需要提交的 url
			data : {

			},
			success : function(response) { // data 保存提交后返回的数据，一般为 json 数据
				// 此处可对 data 作相关处理
				// alert('提交成功！');

				$("#table1 tbody").html("");
				//alert(response);
				if (response.success) {
					$.each(response.data, function(index, value) {
						var tr = $("<tr />");
						$("<td id=\"\" />").html('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>').appendTo(tr);
						$("<td id=\"sap_no\" contentEditable=\"true\"/>").html(value.sap_no).appendTo(tr);
						$("<td id=\"material_desc\" contentEditable=\"true\"/>").html(value.material_desc).appendTo(tr);
						$("<td id=\"material_type\" contentEditable=\"true\"/>").html(value.material_type).appendTo(tr);
						$("<td id=\"material_spec\" contentEditable=\"true\"/>").html(value.material_spec).appendTo(tr);
						$("<td id=\"unit\" contentEditable=\"true\"/>").html(value.unit).appendTo(tr);
						$("<td id=\"supplier_code\" contentEditable=\"true\"/>").html(value.supplier_code).appendTo(tr);
						$("<td id=\"single_loss\" contentEditable=\"true\"/>").html(value.single_loss).appendTo(tr);
						$("<td id=\"level_usage\" contentEditable=\"true\"/>").html(value.level_usage).appendTo(tr);
						$("<td id=\"single_weight\" contentEditable=\"true\"/>").html(value.single_weight).appendTo(tr);
						$("<td id=\"single_usage\" contentEditable=\"true\"/>").html(value.single_usage).appendTo(tr);
						$("<td id=\"workshop\" contentEditable=\"true\"/>").html(value.workshop).appendTo(tr);
						$("<td id=\"process\" contentEditable=\"true\"/>").html(value.process).appendTo(tr);
						$("<td id=\"assemb_site\" contentEditable=\"true\"/>").html(value.assemb_site).appendTo(tr);
						$("<td id=\"remark\" contentEditable=\"true\"/>").html(value.remark).appendTo(tr);

						//$("<td />").html("<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\"  title='修改'style=\"cursor: pointer;text-align: center;\" ></i>").appendTo(tr);
						$("#table1 tbody").append(tr);

						//$(tr).data("id", value.id);

					});

					$('#uploadForm').resetForm(); // 提交后重置表单
					//$(".divLoading").hide();
				}
			}
		});
		return false; // 阻止表单自动提交事件
	} else {
		alert("对不起，只能上传xlsx格式的文件!\n请重新选择符合条件的文件再上传.");
		return false;
	}
}
function LimitAttach2(form, file) {
	if (file == "") {
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
		// form.submit();
		// $('#btn_upload').val("上传中...");
		// $('#btn_upload').attr('disabled', "true");
		//$(".divLoading").addClass("fade in").show();
		$('#uploadForm2').ajaxSubmit({
			dataType : "json",
			type : 'post', // 提交方式 get/post
			url : 'techTask!uploadChangedMaterialList.action', // 需要提交的 url
			data : {

			},
			success : function(response) { // data 保存提交后返回的数据，一般为 json 数据
				// 此处可对 data 作相关处理
				// alert('提交成功！');

				$("#table2 tbody").html("");
				//alert(response);
				if (response.success) {
					$.each(response.data, function(index, value) {
						var tr = $("<tr />");
						$("<td id=\"\" />").html('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>').appendTo(tr);
						$("<td id=\"sap_no\" contentEditable=\"true\"/>").html(value.sap_no).appendTo(tr);
						$("<td id=\"material_desc\" contentEditable=\"true\"/>").html(value.material_desc).appendTo(tr);
						$("<td id=\"material_type\" contentEditable=\"true\"/>").html(value.material_type).appendTo(tr);
						$("<td id=\"material_spec\" contentEditable=\"true\"/>").html(value.material_spec).appendTo(tr);
						$("<td id=\"unit\" contentEditable=\"true\"/>").html(value.unit).appendTo(tr);
						$("<td id=\"supplier_code\" contentEditable=\"true\"/>").html(value.supplier_code).appendTo(tr);
						$("<td id=\"single_loss\" contentEditable=\"true\"/>").html(value.single_loss).appendTo(tr);
						$("<td id=\"level_usage\" contentEditable=\"true\"/>").html(value.level_usage).appendTo(tr);
						$("<td id=\"single_weight\" contentEditable=\"true\"/>").html(value.single_weight).appendTo(tr);
						$("<td id=\"single_usage\" contentEditable=\"true\"/>").html(value.single_usage).appendTo(tr);
						$("<td id=\"workshop\" contentEditable=\"true\"/>").html(value.workshop).appendTo(tr);
						$("<td id=\"process\" contentEditable=\"true\"/>").html(value.process).appendTo(tr);
						$("<td id=\"assemb_site\" contentEditable=\"true\"/>").html(value.assemb_site).appendTo(tr);
						$("<td id=\"remark\" contentEditable=\"true\"/>").html(value.remark).appendTo(tr);

						//$("<td />").html("<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\"  title='修改'style=\"cursor: pointer;text-align: center;\" ></i>").appendTo(tr);
						$("#table2 tbody").append(tr);

						//$(tr).data("id", value.id);

					});

					$('#uploadForm2').resetForm(); // 提交后重置表单
					//$(".divLoading").hide();
				}
			}
		});
		return false; // 阻止表单自动提交事件
	} else {
		alert("对不起，只能上传xlsx格式的文件!\n请重新选择符合条件的文件再上传.");
		return false;
	}
}

//格局化日期：yyyy-MM-dd
function formatDate(date) {
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();

	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return (myyear + "-" + mymonth + "-" + myweekday);
}

function getSelectRowDatas(tableID) {
    var trs = $("#" + tableID).find("tr");
    var propertyValue;
    var selectData = new Array();
    for (var i = 1; i < trs.length; i++) { //第二行开始为数据
        var obj = new Object();
        var objTr = trs[i];
        var tdArray = objTr.childNodes;
        
        if(tdArray[0].innerHTML == "" && tdArray[0].children.length == 0){
          continue;
        }
        
        for (var j = 0; j < tdArray.length; j++) {
            var propertyName = tdArray[j].id;
            propertyValue = tdArray[j].innerHTML;
            var childTag = tdArray[j].children;
            if (childTag.length > 0) {
                var inputType = childTag[0].tagName;
                var inputName = childTag[0].type;
                if (inputName == "checkbox") {
                    if (childTag[0].checked == false) { //判断为没有选中的数据行直接跳出不做处理
                        break;
                    }
                    continue;
                }
                if ((inputType == "INPUT" && inputName == "hidden") || (inputType == "INPUT" && inputName == "text") || inputType == "SELECT") {
                    propertyValue = childTag[0].value;
                }else if(inputType==="A"){
                    propertyValue = childTag[0].innerHTML;
                }
            }
            obj[propertyName] = propertyValue;
        }
        if (!isEmptyObject(obj)) {
            selectData.push(obj);
        }

    }
    return selectData;
}

function isEmptyObject(obj){
    for(var n in obj){
        return false;
    }
    return true;
}

function getKeys(keyCode,input) {
	var returnValue="";
	$.ajax({
		url : "common!getKeysSelect.action",
		dataType : "json",
		data : {
			keyCode : keyCode
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$.each(response.data, function(index, value) {
				if (input == value.id) {
					returnValue = value.key_name
				}
			});
		}
	});
	return returnValue;
}