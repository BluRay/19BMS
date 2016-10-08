var status_arr = {
	"0" : "已创建",
	/*"1" : "已审批",*/
	"2" : "已分配",
	"3" : "已评估",
/*	"4" : "已验收",*/
	"5" : "已完成",
	"6" : "已驳回"
};
var unit_arr={'工装制作类':'计划科','工位器具类':'计划科','计划类':'计划科',
		'工艺类':'工艺科','品质类':'品质科','设备制作类':'设备科','综合类':'综合科','售后类':'售后科'
};
$(document).ready(function() {

	initPage();

	// 点击查询
	$("#btnQuery").live("click", function() {
		var targetPage = $("#cur").attr("page") || 1;
		ajaxQuery(targetPage);
	});
	
	$("#new_order_type").change(function(){
		if($(this).val()=='其他类型'){
			$("#new_duty_unit").attr("readonly",false);
		}else{
			$("#new_duty_unit").val(unit_arr[$(this).val()]).attr("readonly",true);
		}
	});
	$("#edit_order_type").change(function(){
		if($(this).val()=='其他类型'){
			$("#edit_duty_unit").attr("readonly",false);
		}else{
			$("#edit_duty_unit").val(unit_arr[$(this).val()]).attr("readonly",true);
		}
	});
	
	// 点击新增
	$("#btnAdd").live("click", function() {
		emptyModal();
		$("#newRecordForm")[0].reset();
		$("#newModal").modal("show");
	});
	// 确认新增
	$("#btnConfirm").live("click", function() {
	/*	var validate=$("#newRecordForm").validate();
		alert(validate);
		if(!validate){
			return false;
		}*/
		var applyId = $("#applierId").val();
		var launcher=$("#launcher").val();
		var factory=$("#new_factory :selected").text();
		var workshop=$("#new_workshop").val();
		var reason = $("#reason").val();
		var totalQty = $("#totalQty").val();
		var orderType= $("#new_order_type :selected").text();
		var dutyUnit= $('#new_duty_unit').val();		
		dutyUnit=dutyUnit==null?"":dutyUnit;
		var head_launch=$("#new_head_launch").val();
		var acceptor=$("#new_acceptor").val();
		var acceptorSign=$("#new_acceptor_sign").val();
		//alert(dutyUnit);
		var factory=$("#new_factory :selected").text();
		var workshop=$("#new_workshop :selected").text();
		
		if(acceptor!=acceptorSign){
			alert("验收人和验收人签字不一致！");
			return false;
		}else		
			//$("#newRecordForm").submit();
			
		$("#newRecordForm").ajaxSubmit({
			type:'post',
			url:'tempOrder!createOrder.action',
			dataType:'json',
			data:{
			},
			beforeSubmit:function(){
				return 	$("#newRecordForm").valid();
			},
			success:function(response){
				alert(response.message);
				ajaxQuery();
			}		
		});
			
		 //alert(duty_unit);
		/*if (reason.trim().length == 0) {
			alert("作业原因/内容不能为空！");
		} else if (totalQty.trim().length == 0) {
			alert("总数量不能为空！");
		} else if (!const_int_validate.test(totalQty)) {
			alert("总数量只能是整数！");
		}  else if(factory=='请选择'){
			alert("制作工厂不能为空！");
		}else if(workshop=='请选择'){
			alert("制作车间不能为空！");
		}else if(!dutyUnit){
			alert("责任单位不能为空！");
		}else
			ajaxAdd(applyId, reason, totalQty, assignerId,factory,workshop,dutyUnit==null?"":dutyUnit);*/
	});
	// 编辑
	$(".fa-pencil").live("click", function(e) {
		var tr = $(e.target).parent("td").parent("tr");
		var tmpOrder=$(tr).data("tempOrder");
		$("#editModal").data("id", tmpOrder.id);
		$("#orderId").val(tmpOrder.id);
		$("#edit_launcher").val(tmpOrder.order_launcher);
		$("#edit_reason").val(tmpOrder.reason_content);
		$("#edit_totalQty").val(tmpOrder.total_qty);
		getFactorySelect("#edit_factory",tmpOrder.factory, "empty","","name");
		getWorkshopSelect("#edit_workshop", tmpOrder.workshop, $("#edit_factory").val(), "empty","name");
		
		$("#edit_factory").val(tmpOrder.factory).attr("readonly",true);
		$("#edit_workshop").val(tmpOrder.workshop);
		$('#edit_order_type').val(tmpOrder.order_type);
		$("#edit_duty_unit").val(tmpOrder.duty_unit);
		$("#edit_head_launch").val(tmpOrder.head_launch_unit);
		$("#edit_acceptor").val(tmpOrder.acceptor);
		$("#edit_labor").val(tmpOrder.labors);
		$("#edit_singlehour").val(tmpOrder.single_hour);
		$("#edit_assesor").val(tmpOrder.assesor);
		$("#edit_assessVerifier").val(tmpOrder.assess_verifier);
		$("#edit_cost_transfer").val(tmpOrder.is_cost_transfer);
		//$('#edit_duty_unit').multiselect('select', duty_list);
		$("#edit_cost_signer").val(tmpOrder.cost_unit_signer);
		$("#edit_sap_order").val(tmpOrder.sap_order);
		$("#edit_order_serial").val(tmpOrder.order_serial_no);
		$("#edit_acceptor_sign").val(tmpOrder.acceptor);
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
		var acceptor=$("#edit_acceptor").val();
		var acceptorSign=$("#edit_acceptor_sign").val();
		if(acceptor!=acceptorSign){
			alert("验收人和验收人签字不一致！");
			return false;
		}
		var flag=$("#editRecordForm").valid();
		if(flag){
			ajaxEdit();
		}
			
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
						selectFactory, "empty","name");
			});

});
function initPage() {
	getKeysSelect("DUTY_UNIT_TEMP_ORDER", "", "#duty_unit,#edit_duty_unit","noall","keyName");
	
/*	$('#duty_unit,#edit_duty_unit').multiselect({
		 buttonWidth : '350px', 
		 numberDisplayed : 3, 
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
	});*/
	getAuthorityFactorySelect("#new_factory", "", "empty","","name");
	getWorkshopSelect_Auth("#new_workshop", "", $("#new_factory :selected").text(), "empty","name");
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
										var totalHour = parseFloat(value.total_qty)*parseFloat(value.single_hour) 
										var stauts = value.status == undefined ? ""
												: status_arr[value.status];
										var applyDate = value.apply_date == undefined ? ""
												: value.apply_date;
									

										var tr = $("<tr />");
										$("<td />")
												.html(
														"<a href=\"javascript:void(window.open('tempOrder!tempOrderInfoPage.action?tempOrderId="
																+ value.id
																+ "','newwindow','width=700,height=600,toolbar= no,menubar=no,scrollbars=no,resizable=no,location=no,status=no,top=150,left=280'))\" style='cusor:pointer'>"
																+ value.order_serial_no
																+ "</a>")
												.appendTo(tr);
										$("<td />").html(value.factory).appendTo(tr);
										$("<td />").html(value.workshop).appendTo(tr);
										$("<td />").html(value.order_launcher).appendTo(tr);
										$("<td />").html(value.sap_order).appendTo(tr);
										$("<td />").html(reasonContent).appendTo(tr);
										$("<td />").html(value.total_qty).appendTo(tr);
										$("<td />").html(value.single_hour).appendTo(tr);
										$("<td />").html(value.labors).appendTo(tr);
										$("<td />").html(totalHour.toFixed(2)).appendTo(tr);
										$("<td />").html(value.assesor).appendTo(tr);
										$("<td />").html(value.assess_verifier).appendTo(tr);
										$("<td />").html(value.acceptor).appendTo(tr);
										$("<td />").html(value.order_type).appendTo(tr);
										$("<td />").html(value.duty_unit).appendTo(tr);
										if (stauts == '已评估'&&!value.workhour_total) {
											$("<td />")
													.html(
															"<i name='edit' rel=\"tooltip\" title='编辑' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;<i name='edit' rel=\"tooltip\" title='删除' class=\"fa fa-times\" style=\"cursor: pointer\"></i>")
													.appendTo(tr);
										} else if(stauts == '已驳回'){
											$("<td />")
											.html(
													"<i name='edit' rel=\"tooltip\" title='编辑' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;")
											.appendTo(tr);
										}
										else {
											$("<td />").html("").appendTo(tr);
										}
										
										//<i name='edit' rel=\"tooltip\" title='删除' class=\"fa fa-times\" style=\"cursor: pointer\"></i>
									/*	$("<td />")
										.html(
												"<i name='edit' rel=\"tooltip\" title='编辑' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;")
										.appendTo(tr);*/
										$("#tableResult tbody").append(tr);
										$(tr).data("id", value.id);								
										$(tr).data("tempOrder",value);	
										
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

function ajaxEdit() {
	/*var reason_fixed = reason.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");*/
	var targetPage = $("#cur").attr("page") || 1;
	/*var conditions = "{orderId:" + orderId + ",reason:'" + reason_fixed
			+ "',totalQty:'" + totalQty + "',assignerId:" + assignerId+
			",factory:'"+factory+"',workshop:'"+workshop+"',dutyUnit:'"+dutyUnit + "'}";*/
	$("#editRecordForm").ajaxSubmit({
		url : "tempOrder!updateOrder.action",
		dataType : "json",
		type : "post",
		data : {
			
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