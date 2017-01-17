var pageSize = 20;
var timeConfigCount = 0;
var ready_hour = 0;
var edit_list = [];
var re_f = /^[0-9]+[0-9]*\.?[0|5]?$/;// 浮点数正则表达式
var ECN_CHANGE_TYPE = [];
$(document).ready(function() {
	initPage();

	// 复选框全选、反选
	$(".checkall").click(function() {
		if ($(this).attr("checked") == "checked") {
			$(".cbox").attr("checked", "checked");
		} else {
			$(".cbox").removeAttr("checked");
		}
	});
	// Enter键移动输入光标
	$(".work_hour").live("keydown", function(event) {
		if (event.keyCode == "13") {
			$(this).parent().parent().next().find("input").focus();
		}
	});

	// 删除
	$(".close").live("click", function(e) {
		$(e.target).closest("tr").remove();
	});

	function initPage() {
		getAuthorityFactorySelect("#factory", "", "noall");
		getWorkshopSelect_Auth("#workshop", null, $("#factory :selected").text(), "noall");
		getOrderNoSelect("#order_no", "#orderId");
		generatekeys("ECN_CHANGE_TYPE", ECN_CHANGE_TYPE);
		ajaxQuery(1);
	}

	// 技改信息查询
	$("#btnQuery").click(function() {
		ajaxQuery();
		return false;
	});

	$("#btn_single_bus_num_query").click(function() {
		ajaxQueryDetail($("#selectBusNumber_table_tbody"), $('#select_factory').val(), $('#select_workshop').val(), $('#select_order_no').val(), $('#select_tech_task_id').val(), null);
		return false;
	});
	$("#btn_single_bus_num_query_view").click(function() {
		ajaxQueryDetail($("#selectBusNumber_table_tbody_view"), $('#select_factory_view').val(), $('#select_workshop_view').val(), $('#select_order_no_view').val(), $('#select_tech_task_id_view').val(), "view");
		return false;
	});

	$("#btn_selectBusNumberModal").click(function() {
		ajaxEdit();
		return false;
	});

	$("#btn_follow_num_confirm").click(function() {
		ajaxEdit1();
		return false;
	});

	$('#selectBusNumberModal1').on('hide.bs.modal', function() {
		// $('#selectBusNumberModal1').modal('hide');
		ajaxQuery();
		// return false;
	});
	
	$('#factory').on('change', function() {
		getWorkshopSelect_Auth("#workshop", null, $("#factory :selected").text(), "noall");
	});
	// end
});

/**
 * 查询 mod by 吴潇
 */
function ajaxQuery(targetPage) {
	$.ajax({
		url : "techTask!getFollowingUpList.action",
		dataType : "json",
		type : "post",
		data : {
			"factory" : $('#factory').find("option:selected").text(),
			"workshop" : $('#workshop').find("option:selected").text(),
			"order_no" : $('#order_no').val(),

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
				$("<td />").html(getKeys(ECN_CHANGE_TYPE, value.tech_order_type)).appendTo(tr);
				$("<td />").html(value.tech_order_no).appendTo(tr);
				// $("<td />").html("<a href='#'
				// onclick='window.open(\""+value.tech_order_file+"\")'>"+(value.tech_order_file==""?"":"查看")+"</a>").appendTo(tr);
				$("<td />").html(value.tech_date).appendTo(tr);
				$("<td />").html(value.switch_mode).appendTo(tr);
				$("<td />").html(value.switch_node).appendTo(tr);
				// $("<td
				// />").html(getKeys("ECN_DUTY_UNIT",value.duty_unit)).appendTo(tr);
				$("<td />").html(value.order_no).appendTo(tr);
				$("<td />").html(value.factory).appendTo(tr);
				$("<td />").html(value.ws).appendTo(tr);
				$("<td />").html(value.total).appendTo(tr);
				$("<td />").html(value.complete).appendTo(tr);
				// $("<td />").html("<a href='#'
				// onclick='window.open(\""+value.custom_change_file+"\")'>"+(value.custom_change_file==""?"":"查看")+"</a>").appendTo(tr);
				// $("<td />").html(value.single_time_total).appendTo(tr);
				// $("<td
				// />").html(getKeys("ECN_TYPE",value.tech_type)).appendTo(tr);
				if (parseInt(value.total) - parseInt(value.complete) <= 0) {
					$("<td />").html("").appendTo(tr);
				} else {
					if (value.ws == "自制件" || value.ws == "部件") {
						$("<td />").html("<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\"  title='修改'style=\"cursor: pointer;text-align: center;\" onclick='showSelectBusNumberModal1(\"" + value.factory + "\",\"" + value.ws + "\",\"" + value.order_no + "\"," + value.tech_task_id + "," + value.total + "," + value.task_detail_id + ");' ></i>").appendTo(tr);
					} else {
						$("<td />").html("<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\"  title='修改'style=\"cursor: pointer;text-align: center;\" onclick='showSelectBusNumberModal(\"" + value.factory + "\",\"" + value.ws + "\",\"" + value.order_no + "\"," + value.tech_task_id + ");' ></i>").appendTo(tr);
					}
				}
				if (parseInt(value.complete) <= 0) {
					$("<td />").html("").appendTo(tr);
				} else {
					if (value.ws == "自制件" || value.ws == "部件") {
						$("<td />").html("<i name='edit' class=\"fa fa-search\" rel=\"tooltip\"  title='查看'style=\"cursor: pointer;text-align: center;\" onclick='showSelectBusNumberModal_view1(\"" + value.factory + "\",\"" + value.ws + "\",\"" + value.order_no + "\"," + value.tech_task_id + ");' ></i>").appendTo(tr);
					} else {
						$("<td />").html("<i name='edit' class=\"fa fa-search\" rel=\"tooltip\"  title='查看'style=\"cursor: pointer;text-align: center;\" onclick='showSelectBusNumberModal_view(\"" + value.factory + "\",\"" + value.ws + "\",\"" + value.order_no + "\"," + value.tech_task_id + ");' ></i>").appendTo(tr);
					}
				}
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

function ajaxQueryDetail(tbody, factory, workshop, order_no, tech_task_id, view) {
	$.ajax({
		url : "techTask!getFollowingUpDetailList.action",
		dataType : "json",
		type : "post",
		data : {
			"factory" : factory,
			"workshop" : workshop,
			"order_no" : order_no,

			"tech_task_id" : tech_task_id,
			"bus_num_start" : "view" != view ? $('#bus_num_start').val() : $('#bus_num_start_view').val(),
			"bus_num_end" : "view" != view ? $('#bus_num_end').val() : $('#bus_num_end_view').val(),
			"view" : view
		},
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			tbody.html("");

			$.each(response.data, function(index, value) {
				var tr = $("<tr />");
				if ("view" != view) {
					if (!value.confirmor) {
						$("<td />").html("<input type='checkbox' class='cbox' >").appendTo(tr);
					} else {
						$("<td />").html("").appendTo(tr);
					}
				}
				$("<td />").html(index + 1).appendTo(tr);
				$("<td />").html(value.bus_number).appendTo(tr);
				$("<td />").html(value.factory).appendTo(tr);
				$("<td />").html(value.process_name).appendTo(tr);
				$("<td />").html(value.confirmor).appendTo(tr);
				$("<td />").html(value.confirmor_date).appendTo(tr);

				$(tr).data("id", value.id);
				tbody.append(tr);
			});
			/*
			 * $("#total").html(response.pager.totalCount);
			 * $("#total").attr("total", response.pager.totalCount);
			 * $("#cur").attr("page", response.pager.curPage); $("#cur").html("<a
			 * href=\"#\">" + response.pager.curPage + "</a>");
			 * $("#pagination").show();
			 */
		}
	});
}

function ajaxQueryDetail1(tbody, factory, workshop, order_no, tech_task_id) {
	$.ajax({
		url : "techTask!getFollowingUpDetailList1.action",
		dataType : "json",
		type : "post",
		data : {
			"factory" : factory,
			"workshop" : workshop,
			"order_no" : order_no,

			"tech_task_id" : tech_task_id
		},
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			tbody.html("");

			var year = "";
			var month = "";

			var count = 0;

			$.each(response.data, function(index, value) {
				if (year != "") {
					if (value.confirmor_date.split("-")[0] == year && value.confirmor_date.split("-")[1] == month) {
						count += parseInt(value.follow_num);
					} else {
						var counttr = $("<tr />");
						$("<td colspan='3' />").html(year + "-" + month + " 合计:" + count).appendTo(counttr);
						tbody.append(counttr);
						count = 0;
						count += parseInt(value.follow_num);
					}
				}else{
					count += parseInt(value.follow_num);
				}
				year = value.confirmor_date.split("-")[0];
				month = value.confirmor_date.split("-")[1];
				
				var tr = $("<tr />");
				/*
				 * if ("view" != view) { if (!value.confirmor) { $("<td />").html("<input
				 * type='checkbox' class='cbox' >").appendTo(tr); } else { $("<td />").html("").appendTo(tr); } }
				 * $("<td />").html(index + 1).appendTo(tr);
				 */
				$("<td />").html(value.follow_num).appendTo(tr);
				$("<td />").html(value.confirmor).appendTo(tr);
				$("<td />").html(value.confirmor_date).appendTo(tr);

				$(tr).data("id", value.id);
				tbody.append(tr);
				
				if(index==(response.data.length-1)){
					var counttr = $("<tr />");
					$("<td colspan='3' />").html(year + "-" + month + " 合计:" + count).appendTo(counttr);
					tbody.append(counttr);
					count = 0;
				}
			});
			/*
			 * $("#total").html(response.pager.totalCount);
			 * $("#total").attr("total", response.pager.totalCount);
			 * $("#cur").attr("page", response.pager.curPage); $("#cur").html("<a
			 * href=\"#\">" + response.pager.curPage + "</a>");
			 * $("#pagination").show();
			 */
		}
	});
}

function showSelectBusNumberModal(factory, workshop, order_no, tech_task_id) {
	$('#select_tech_task_id').val(tech_task_id);
	$('#select_factory').val(factory);
	$('#select_workshop').val(workshop);
	$('#select_order_no').val(order_no);
	$('#bus_num_start').val("");
	$('#bus_num_end').val("");
	$(".checkall").removeAttr("checked");
	ajaxQueryDetail($("#selectBusNumber_table_tbody"), factory, workshop, order_no, tech_task_id, null);

	$("#selectBusNumberModal").modal("show");
}

function showSelectBusNumberModal1(factory, workshop, order_no, tech_task_id, total_num, task_detail_id) {
	$('#select_tech_task_id1').val(tech_task_id);
	$('#select_factory1').val(factory);
	$('#select_workshop1').val(workshop);
	$('#select_order_no1').val(order_no);
	$('#total_num1').val(total_num);
	$('#follow_num').val("");
	$('#task_detail_id1').val(task_detail_id);
	ajaxQueryDetail1($("#selectBusNumber_table_tbody1"), factory, workshop, order_no, tech_task_id);

	$("#selectBusNumberModal1").modal("show");
}

function showSelectBusNumberModal_view(factory, workshop, order_no, tech_task_id) {
	$('#select_tech_task_id_view').val(tech_task_id);
	$('#select_factory_view').val(factory);
	$('#select_workshop_view').val(workshop);
	$('#select_order_no_view').val(order_no);
	$('#bus_num_start_view').val("");
	$('#bus_num_end_view').val("");
	ajaxQueryDetail($("#selectBusNumber_table_tbody_view"), factory, workshop, order_no, tech_task_id, "view");

	$("#selectBusNumberModal_view").modal("show");
}

function showSelectBusNumberModal_view1(factory, workshop, order_no, tech_task_id) {
	$('#select_tech_task_id_view1').val(tech_task_id);
	$('#select_factory_view1').val(factory);
	$('#select_workshop_view1').val(workshop);
	$('#select_order_no_view1').val(order_no);

	ajaxQueryDetail1($("#selectBusNumber_table_tbody_view1"), factory, workshop, order_no, tech_task_id);

	$("#selectBusNumberModal_view1").modal("show");
}

// add by wuxiao start
function ajaxEdit() {
	var ids = [];
	$('.cbox').each(function(e) {
		if ($(this).attr("checked") == "checked") {
			ids.push($(this).closest("tr").data('id'));
		}
	});
	if (ids.length == 0) {
		alert('至少勾选一个项！');
		return false;
	}
	$.ajax({
		url : "techTask!editFollowingUp.action",
		dataType : "json",
		type : "post",
		data : {
			"ids" : JSON.stringify(ids)
		},
		success : function(response) {
			if (response.success) {
				$("#selectBusNumberModal").modal("hide");
				alert(response.message);
				ajaxQuery();
			} else {
				alert(response.message);
			}
		}
	});
}

function ajaxEdit1() {
	if ($('#follow_num').val() == "" || $('#follow_num').val() == "0") {
		alert("产量必须大于0！");
		$('#follow_num').focus();
		return false;
	}
	var total_num = parseInt($('#total_num1').val());
	var follow_num = parseInt($('#follow_num').val());
	var complete_num = 0;
	$("#selectBusNumber_table_tbody1 tr").each(function(e) {
		if(!($(this).find("td").eq(0).attr("colspan"))){
			complete_num += parseInt($(this).find("td").eq(0).html());
		}
	});
	if (complete_num + follow_num > total_num) {
		alert("产量不能超过技改总台数与已完成台数的差！");
		$('#follow_num').focus();
		return false;
	}
	$.ajax({
		url : "techTask!editFollowingUp1.action",
		dataType : "json",
		type : "post",
		data : {
			"factory" : $('#select_factory1').val(),
			"workshop" : $('#select_workshop1').val(),
			"order_no" : $('#select_order_no1').val(),
			"tech_task_id" : $('#select_tech_task_id1').val(),
			"follow_num" : $('#follow_num').val(),
			"task_detail_id" : $('#task_detail_id1').val()
		},
		success : function(response) {
			if (response.success) {
				alert(response.message);
				ajaxQueryDetail1($("#selectBusNumber_table_tbody1"), $('#select_factory1').val(), $('#select_workshop1').val(), $('#select_order_no1').val(), $('#select_tech_task_id1').val());
			} else {
				alert(response.message);
			}
		}
	});
}

// 格局化日期：yyyy-MM-dd
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
	for (var i = 1; i < trs.length; i++) { // 第二行开始为数据
		var obj = new Object();
		var objTr = trs[i];
		var tdArray = objTr.childNodes;

		if (tdArray[0].innerHTML == "" && tdArray[0].children.length == 0) {
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
					if (childTag[0].checked == false) { // 判断为没有选中的数据行直接跳出不做处理
						break;
					}
					continue;
				}
				if ((inputType == "INPUT" && inputName == "hidden") || (inputType == "INPUT" && inputName == "text") || inputType == "SELECT") {
					propertyValue = childTag[0].value;
				} else if (inputType === "A") {
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

function isEmptyObject(obj) {
	for ( var n in obj) {
		return false;
	}
	return true;
}

function getKeys(keys, input) {
	var returnValue = "";

	$.each(keys, function(index, value) {
		if (input == value.id) {
			returnValue = value.key_name;
		}
	});

	return returnValue;
}

function generatekeys(keyCode, list) {
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
				/*
				 * if (input == value.id) { returnValue = value.key_name }
				 */
				var obj = {
					"id" : value.id,
					"key_name" : value.key_name
				};
				list.push(obj);
			});
		}
	});
}

function getWorkshopOrg(factory) {
	var result = [];
	$.ajax({
		url : "common!getWorkshopSelectOrg.action",
		dataType : "json",
		data : {
			"conditionMap.factory" : factory
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			$.each(response, function(index, value) {
				result.push(value.name);
			});
		}
	});
	return result;
}

function gaga(obj) { // 值允许输入一个小数点和数字
	obj.value = obj.value.replace(/[^\d.]/g, ""); // 先把非数字的都替换掉，除了数字和.
	obj.value = obj.value.replace(/^\./g, ""); // 必须保证第一个为数字而不是.
	obj.value = obj.value.replace(/\.{2,}/g, "."); // 保证只有出现一个.而没有多个.
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); // 保证.只出现一次，而不能出现两次以上
}