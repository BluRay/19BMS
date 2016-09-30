var status_arr = {
	"0" : "已创建",
	/*"1" : "已审批",*/
	"2" : "已分配",
	"3" : "已评估",
/*	"4" : "已验收",*/
	"5" : "已完成",
	"6" : "已驳回"
};
$(document).ready(function() {
	initPage();

	// 点击查询
	$("#btnQuery").live("click", function() {
		var targetPage = $("#cur").attr("page") || 1;
		ajaxQuery(targetPage);
	});
	// 点击新增
	$("#btnAdd").live("click", function() {
		emptyModal();
		$("#newModal").modal("show");
	});
	// 确认新增
	$("#btnConfirm").live("click", function() {
		var applyId = $("#applierId").val();
		var reason = $("#reason").val();
		var totalQty = $("#totalQty").val();
		var assignerId= $("#assignerCardNo").attr("assignerId");
		var dutyUnit= $('#duty_unit').val();
		dutyUnit=dutyUnit==null?"":dutyUnit;
		//alert(dutyUnit);
		var factory=$("#new_factory :selected").text();
		var workshop=$("#new_workshop :selected").text();
		 //alert(duty_unit);
		if (reason.trim().length == 0) {
			alert("作业原因/内容不能为空！");
		} else if (totalQty.trim().length == 0) {
			alert("总数量不能为空！");
		} else if (!const_int_validate.test(totalQty)) {
			alert("总数量只能是整数！");
		} else if(assignerId==undefined){
			alert("请输入工单分配人！");
		}else if (assignerId != undefined && assignerId.trim().length == 0) {
			alert("请输入有效的工单分配人！");
		}/* else if (assignerId == $("#applierId").val()) {
			alert("工单分配人和申请人不能为同一人！");
		}*/ else if(factory=='请选择'){
			alert("制作工厂不能为空！");
		}else if(workshop=='请选择'){
			alert("制作车间不能为空！");
		}/*else if(!dutyUnit){
			alert("责任单位不能为空！");
		}*/else
			ajaxAdd(applyId, reason, totalQty, assignerId,factory,workshop,dutyUnit==null?"":dutyUnit);
	});
	// 编辑
	$(".fa-pencil").live("click", function(e) {
		var tr = $(e.target).parent("td").parent("tr");
		var tds = $(e.target).parent("td").siblings();
		var id = $(tr).data("id");
		var assignerCardNo = $(tr).data("assignerCardNo");
		var assignerId = $(tr).data("assignerId");
		var assigner = $(tr).data("assigner");
		var duty_list=[];
		if($(tr).data("dutyUnit")!=undefined){
			duty_list=$(tr).data("dutyUnit").split(",");
		}		
		$("#editModal").data("id", id);
		$("#edit_reason").val($(tds[1]).html()); 
		$("#edit_totalQty").val($(tds[3]).html());
		$("#edit_assignerCardNo").val(assignerCardNo);
		$("#edit_assignerCardNo").attr("assignerId", assignerId);
		$("#edit_assigner").html(assigner);
		getFactorySelect("#edit_factory",$(tds[7]).html(), "empty","");
		getWorkshopSelect("#edit_workshop", $(tds[8]).html(), $("#edit_factory").val(), "empty");
		$('#edit_duty_unit').multiselect('deselectAll');
		$('#edit_duty_unit').multiselect('select', duty_list);
		$("#editModal").modal("show");
	})
	$(".fa-times").live("click", function(e) {
		var tr = $(e.target).parent("td").parent("tr");
		var tds = $(e.target).parent("td").siblings();
		var id = $(tr).data("id");

		if (confirm("确认删除该临时工单？")) {
			$.ajax({
				url : "tempOrder!deleteOrder.action",
				dataType : "json",
				type : "post",
				data : {
					"tempOrderId" : id
				},
				success : function() {
					$(tr).remove();
				}
			})

		}
	});
	// 确认编辑
	$("#btnEditConfirm").live("click", function(e) {
		var orderId = $("#editModal").data("id");
		var assignerId = $("#edit_assignerCardNo").attr("assignerId");
		var reason = $("#edit_reason").val();
		var totalQty = $("#edit_totalQty").val();
		var dutyUnit= $('#edit_duty_unit').val();
		dutyUnit=dutyUnit==null?"":dutyUnit;
		var factory=$("#edit_factory :selected").text();
		var workshop=$("#edit_workshop :selected").text();
		if (reason.trim().length == 0) {
			alert("作业原因/内容不能为空！");
		} else if (totalQty.trim().length == 0) {
			alert("总数量不能为空！");
		} else if (!const_int_validate.test(totalQty)) {
			alert("总数量只能整数！");
		} else if (assignerId != undefined && assignerId.trim().length == 0) {
			alert("请输入有效的工单分配人！");
		} /*else if (assignerId == $("#edit_applierId").val()) {
			alert("工单分配人和申请人不能为同一人！");
		}*/else if(factory=='请选择'){
			alert("制作工厂不能为空！");
		}else if(workshop=='请选择'){
			alert("制作车间不能为空！");
		}/*else if(!dutyUnit){
			alert("责任单位不能为空！");
		}*/ else
			ajaxEdit(orderId, reason, totalQty, assignerId,factory,workshop,dutyUnit);
	});
	// 输入审批人工号带出审批人信息
	$("#edit_assignerCardNo,#assignerCardNo").change(function(e) {
		var span = $(e.target).next("span");
		$(span).html("");
		$(e.target).attr("assignerId", "");
		var cardNo = $(e.target).val();
		var user = getUserInfoByCardNumber(cardNo);
		if (user == null) {
			alert("请输入有效工号！");
		} else {
			// var span="<span
			// style='line-height:30px'>"+user.username+"</span>";
			// $(e.target).after(span);
			$(span).html(user.username);
			$(e.target).attr("assignerId", user.id);
		}

	});
	
	$("#new_factory,#edit_factory").change(
			function(e) {
				var eleId=$(e.target).attr("id");
				var selectFactory = $("#"+eleId+" :selected").text();
				var workshopEleId="";
				if(eleId.indexOf("new")==0){
					workshopEleId="#new_workshop";
				}
				if(eleId.indexOf("edit")==0){
					workshopEleId="#edit_workshop";
				}
				getWorkshopSelect_Auth(workshopEleId, null,
						selectFactory, "empty");
			});

});
function initPage() {
	getKeysSelect("DUTY_UNIT_TEMP_ORDER", "", "#duty_unit,#edit_duty_unit","noall","keyName");
	
	$('#duty_unit,#edit_duty_unit').multiselect({
		/* buttonWidth : '350px', */
		/* numberDisplayed : 3, */
		buttonText : function(options, select) {
			if (options.length === 0) {
				return '请选择 <b class="caret"></b>';
			}else{
				var labels = [];
                options.each(function() {
                    if ($(this).attr('label') !== undefined) {
                        labels.push($(this).attr('label'));
                    }
                    else {
                        labels.push($(this).html());
                    }
                });
                return labels.join(', ') + ' <b class="caret"></b>';
			}
		},
		buttonClass:'btn btn-link',
		buttonTitle:function(){
			return "请选择责任单位";
		},
		dropUp: true,
		maxHeight:200
	});
	getAuthorityFactorySelect("#new_factory", "", "empty","");
	getWorkshopSelect_Auth("#new_workshop", "", $("#new_factory :selected").text(), "empty");
	// alert($("#tempOrder").find(".treemenu").html());
	$("#tempOrder").find(".treemenu").addClass("collapsed");
	$("#tmp_order").addClass("in");
	var span = $("#tempOrder").find(".pull-right.fa");
	if ($(span).hasClass("fa-angle-down")) {
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}
	ajaxQuery(1);
}

function ajaxQuery(targetPage) {
	var orderNo = $('#tmp_order_no').val();
	var applyDateStart = $('#create_start').val();
	var applyDateEnd = $('#create_end').val();
	var status = $('#status').val();
	var conditions = "{orderNo:'" + orderNo + "',applyDateStart:'"
			+ applyDateStart + "',actionType:'create" + "',applyDateEnd:'"
			+ applyDateEnd + "',status:'" + status + "'}";
	$
			.ajax({
				url : "tempOrder!orderList.action",
				dataType : "json",
				type : "get",
				data : {
					"conditions" : conditions,
					"pager.pageSize" : 10,
					"pager.curPage" : targetPage || 1
				},
				success : function(response) {
					$("#tableResult tbody").html("");
					$
							.each(
									response.dataList,
									function(index, value) {
										var tmpOrderNum = value.tmp_order_num == undefined ? ""
												: value.tmp_order_num;
										var reasonContent = value.reason_content == undefined ? ""
												: value.reason_content;
										var sapOrder = value.sap_order == undefined ? ""
												: value.sap_order;
										var totalQty = value.total_qty == undefined ? ""
												: value.total_qty;
										var singleHour = value.single_hour == undefined ? ""
												: value.single_hour;
										var labors = value.labors == undefined ? ""
												: value.labors;
										var totalHour = value.total_hours == undefined ? ""
												: value.total_hours;
										var stauts = value.status == undefined ? ""
												: status_arr[value.status];
										var applyDate = value.apply_date == undefined ? ""
												: value.apply_date;
										var assigner = value.assigner == undefined ? ""
												: value.assigner;
										var assignerCardNo = value.card_number == undefined ? ""
												: value.card_number;
										var assignerId = value.assigner_id == undefined ? ""
												: value.assigner_id;

										var tr = $("<tr />");
										$("<td />")
												.html(
														"<a href=\"javascript:void(window.open('tempOrder!tempOrderInfoPage.action?tempOrderId="
																+ value.id
																+ "','newwindow','width=700,height=600,toolbar= no,menubar=no,scrollbars=no,resizable=no,location=no,status=no,top=150,left=280'))\" style='cusor:pointer'>"
																+ tmpOrderNum
																+ "</a>")
												.appendTo(tr);
										$("<td />").html(reasonContent)
												.appendTo(tr);
										$("<td />").html(sapOrder).appendTo(tr);
										$("<td />").html(totalQty).appendTo(tr);
										$("<td />").html(singleHour).appendTo(
												tr);
										$("<td />").html(labors).appendTo(tr);
										$("<td />").html(totalHour)
												.appendTo(tr);
										$("<td />").html(value.factory)
										.appendTo(tr);
										$("<td />").html(value.workshop)
										.appendTo(tr);
										$("<td />").html(value.duty_unit==undefined?"":value.duty_unit)
										.appendTo(tr);
										$("<td />").html(value.applier)
												.appendTo(tr);
										$("<td />").html(applyDate)
												.appendTo(tr);
										$("<td />").html(stauts).appendTo(tr);
										if (stauts == '已创建') {
											$("<td />")
													.html(
															"<i name='edit' rel=\"tooltip\" title='编辑' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;<i name='edit' rel=\"tooltip\" title='删除' class=\"fa fa-times\" style=\"cursor: pointer\"></i>")
													.appendTo(tr);
										} else {
											$("<td />").html("").appendTo(tr);
										}
										
										//<i name='edit' rel=\"tooltip\" title='删除' class=\"fa fa-times\" style=\"cursor: pointer\"></i>
									/*	$("<td />")
										.html(
												"<i name='edit' rel=\"tooltip\" title='编辑' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;")
										.appendTo(tr);*/
										$("#tableResult tbody").append(tr);
										$(tr).data("id", value.id);
										$(tr).data("assignerCardNo",
												assignerCardNo);
										$(tr).data("assignerId", assignerId);
										$(tr).data("assigner", assigner);
										$(tr).data("dutyUnit",value.duty_unit==undefined?"":value.duty_unit)
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

function ajaxAdd(applyId, reason, totalQty, assignerId,factory,workshop,dutyUnit) {
	var reason_fixed = reason.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");
	var targetPage = $("#cur").attr("page") || 1;

	var conditions = "{applyId:'" + applyId + "',reason:'" + reason_fixed
			+ "',totalQty:'" + totalQty + "',assignerId:'" + assignerId +
			"',factory:'"+factory+"',workshop:'"+workshop+"',dutyUnit:'"+dutyUnit+"'}";
	$.ajax({
		url : "tempOrder!createOrder.action",
		dataType : "json",
		type : "post",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			ajaxQuery(targetPage);
			emptyModal();
			$("#newModal").modal("hide")
		}
	});
}

function ajaxEdit(orderId, reason, totalQty, assignerId,factory,workshop,dutyUnit) {
	var reason_fixed = reason.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");
	var targetPage = $("#cur").attr("page") || 1;
	var conditions = "{orderId:" + orderId + ",reason:'" + reason_fixed
			+ "',totalQty:'" + totalQty + "',assignerId:" + assignerId+
			",factory:'"+factory+"',workshop:'"+workshop+"',dutyUnit:'"+dutyUnit + "'}";
	$.ajax({
		url : "tempOrder!updateOrder.action",
		dataType : "json",
		type : "post",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			if (response.success) {
				alert("修改成功");
				ajaxQuery(targetPage);
				$("#editModal").modal("hide")
			} else {
				alert(response.message);
			}

		}
	});
}

function emptyModal() {
	$("#reason").val("");
	$("#totalQty").val("");
	$("#assignerCardNo").val("");
}