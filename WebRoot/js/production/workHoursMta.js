var status_arr = {
	"0" : "已创建",
	"2" : "已分配",
	"3" : "已评估",
	"5" : "已完成",
	"6" : "已驳回"
};
var wh_status_arr={'0':'已维护','1':'已审批','2':'已驳回','3':'已锁定'}
var edit_list = [];
var ready_hour = 0;
var re_f = /^[0-9]+[0-9]*\.?[0|5]?$/;//浮点数正则表达式
$(document)
		.ready(
				function() {
					initPage();

					// Enter键移动输入光标
					$(".work_hour").live(
							"keydown",
							function(event) {
								if (event.keyCode == "13") {
									$(this).parent().parent().next().find(
											"input").focus();
								}
							})
					// 复选框全选、反选
					$("#checkall").click(function() {
						if ($(this).attr("checked") == "checked") {
							check_All_unAll("#workhour_tb", true);
						} else
							check_All_unAll("#workhour_tb", false);
					});
					// 点击查询
					$("#btnQuery").live("click", function() {
						var targetPage = $("#cur").attr("page") || 1;
						ajaxQuery(1);
					});
					$(".fa-pencil")
							.live(
									"click",
									function(e) {
										var tr = $(e.target).closest("tr");
										var tds = $(tr).children("td");
										var type = $(e.target).attr(
												"data-original-title");
										var orderNo = $(tr).data("orderNo");
										var reason = $(tds[2]).html();
										var totalQty = $(tds[3]).html();
										var readyQty = $(tr).data("readyQty");
										var workshop=$(tr).data("workshop");
										edit_list = [];
										ready_hour = 0;
										var conditions = "{tempOrderId:'"
												+ $(tr).data("id") + "'}";
										var response = ajaxGetStaffWorkHours(conditions)
										var swhlist = response.dataList;
										var scheduleList = response.tempScheduleList;
										generateWorkhourTb(swhlist, true);
										$(".read_hours").html(
												"已分配工时：" + ready_hour);
										if (type == "工时维护") {
											if ($(tds[1]).html().trim().length == 0) {
												alert("请先分配工单号！");
												return false;
											}
											var selectFactory = $("#factory :selected").text();
											getWorkshopSelect_Auth("#workshop", workshop, selectFactory, "noall");
											$("#workshop").attr("disabled",true);
											var workshop = $("#workshop").val();
											getChildOrgSelect("#group", workshop, "", "empty");
											var group = $("#group").val();
											getChildOrgSelect("#subgroup", group, "", "empty");
											
											$("#tb_workhour").html("");
											$("#orderNo").html(orderNo);
											$("#reason").html(reason);
											$("#mtaModal").data("orderId",
													$(tr).data("id"));
											$("#mtaModal").data("totalHour",
													$(tr).data("totalHour"));
											$("#mtaModal").modal("show");
										}
										if (type == "工时修改") {
											$("#edit_orderNo").html(orderNo);
											$("#edit_reason").html(reason);
											$("#editModal").data("orderId",
													$(tr).data("id"));
											$("#editModal").data("totalHour",
													$(tr).data("totalHour"));
											$("#editModal").modal("show");
										}
										if (type == "临时派工单进度维护") {

											$("#tempOrderNo").html(orderNo);
											$("#reasonContent").html(reason);
											$("#progressModal").data("orderId",
													$(tr).data("id"));
											$("#progressModal").data(
													"readyQty", readyQty);
											$("#progressModal").data(
													"totalQty", totalQty);
											$("#totalQty").html(totalQty);
											$("#readyQty").html(readyQty);
											$("#productQty").val("");
											$("#progressModal").modal("show");
										}
									});

					// 新增额外工时
					$(".addWorkhour").live("click", function() {
						if ($("#mta_wdate").val().trim() == "") {
							alert("请选择操作日期！");
						} else {
							addWorkHourItem();
						}

					});
					// 工时删除
					$(".close").live("click", function(e) {
						$(e.target).closest("tr").remove();
					});
					$("#btnSwhQuery")
							.live(
									"click",
									function() {
										var staffNum = $("#edit_cardNumber")
												.val();
										var workDate = $("#edit_workDate")
												.val();
										var tmpOrderId = $("#editModal").data(
												"orderId");
										var conditions = "{staffNum:'"
												+ staffNum + "',workDate:'"
												+ workDate + "',tempOrderId:"
												+ tmpOrderId + "'}";
										var swhlist = ajaxGetStaffWorkHours(conditions).dataList;
										generateWorkhourTb(swhlist);
									});
					// 保存工时信息
					$("#btnMtaSave")
							.click(
									function() {
										var inputlist = $("#table_workhour input[class='input-small card_num']");
										// alert(inputlist.length);
										var saveFlag = true;
										var stafflist = [];
										var factory = $(
												"#factory option:selected")
												.text();
										var dept = "生产部";
										var workshop = $(
												"#workshop option:selected")
												.text();
										var workgroup = $(
												"#group option:selected")
												.text() == "请选择" ? "" : $(
												"#group option:selected")
												.text();
										var team = $(
												"#subgroup option:selected")
												.text() == "请选择" ? "" : $(
												"#subgroup option:selected")
												.text();
										var subgroupId = $("#subgroup").val() == '' ? '0'
												: $("#subgroup").val();
										var groupId = $("#group").val() == '' ? '0'
												: $("#group").val();
										var workshopId = $("#workshop").val() == '' ? '0'
												: $("#workshop").val();
										var workDate = $("#mta_wdate").val();
										if (workshopId == '0') {
											alert("请选择车间");
										} else if (workDate == null
												|| workDate.trim().length == 0) {
											alert("请输入操作日期");
										} else {
											$
													.each(
															inputlist,
															function(index,
																	input) {
																var tr = $(
																		input)
																		.closest(
																				"tr");
																var staffId = $(
																		input)
																		.attr(
																				"staffId");
																var workHour = $(
																		tr)
																		.find(
																				".work_hour")
																		.val();
																var skillParameter = $(
																		tr)
																		.data(
																				"skill_parameter");
																if (staffId != undefined
																		&& staffId
																				.trim().length > 0) {
																	var staff = {};
																	staff.orderId = $(
																			tr)
																			.data(
																					"id");
																	staff.tempOrderId = $(
																			"#mtaModal")
																			.data(
																					"orderId");
																	staff.workDate = workDate;
																	staff.staff_id = staffId;
																	if (workshopId != '0') {
																		staff.subgroupId = workshopId
																	}
																	if (groupId != '0') {
																		staff.subgroupId = groupId
																	}
																	if (subgroupId != '0') {
																		staff.subgroupId = subgroupId
																	}
																	staff.factory = factory;
																	staff.dept = dept;
																	staff.workshop = workshop;
																	staff.workgroup = workgroup;
																	staff.team = team;
																	staff.workHour = workHour;
																	staff.skillParameter = skillParameter;
																	if (!isContain(
																			staff,
																			stafflist)) {
																		stafflist
																				.push(staff);
																	} else {
																		saveFlag = false;
																		alert("不能重复维护工时！");
																		return false;
																	}
																}
																if (workHour == ''
																		|| workHour
																				.trim().length == 0) {
																	saveFlag = false;
																	alert("额外工时不能为空！");
																	return false;
																}
																var staffNum = $(
																		input)
																		.val();
																if (staffNum
																		.trim().length == 0) {
																	alert("工号不能为空！");
																	saveFlag = false;
																	return false;
																}
																var conditions = "{staffNum:'"
																		+ staffNum
																		+ "',workDate:'"
																		+ $(
																				"#mta_wdate")
																				.val()
																		+ "',tempOrderId:"
																		+ $(
																				"#mtaModal")
																				.data(
																						"orderId")
																		+ "}";
																var sfwlist = ajaxGetStaffWorkHours(conditions).dataList;
																if (sfwlist.length > 0) {
																	// $(tr).remove();
																	saveFlag = false;
																	alert("不能重复维护工时！");
																	return false;
																}

															});
											if (saveFlag
													&& stafflist.length > 0) {
												ajaxSave(JSON
														.stringify(stafflist));
												// $("#mtaModal").modal("hide");
												/*var selectFactory = $(
														"#factory :selected")
														.text();
												getWorkshopSelect_Org(
														"#workshop", workshop,
														selectFactory, "empty");
												$("#group")
														.html(
																"<option value=''>请选择</option>");
												$("#subgroup")
														.html(
																"<option value=''>请选择</option>");*/
											}

										}

									});
					// 为工号输入框添加change事件
					$(".card_num")
							.live(
									"change",
									function(e) {
										var cardNumInput = $(e.target);
										var tr = $(cardNumInput).closest("tr");
										$(tr).find(".staff_name").html("");
										$(tr).find(".staff_post").html("");
										$(tr).find(".staff_subgroup").html("");
										$(tr).find(".staff_group").html("");
										$(tr).find(".staff_workshop").html("");
										$(tr).find(".staff_factory").html("");
										var staff = getStaffInfo($(cardNumInput)
												.val());
										if (staff == undefined || staff == null) {
											alert("请输入有效员工号！");
											$(cardNumInput).val("");
										} else {
											$(cardNumInput).attr("staffId",
													staff.id);
											$(tr).find(".staff_name").html(
													staff.name);
											$(tr).find(".staff_post").html(
													staff.job);
											$(tr).find(".staff_subgroup").html(
													staff.team_org);
											$(tr).find(".staff_group").html(
													staff.workgroup_org);
											$(tr).find(".staff_workshop").html(
													staff.workshop_org);
											$(tr).find(".staff_factory").html(
													staff.plant_org);
											$(tr).data("skill_parameter",
													skillParameter);
										}
									});
					// 工时输入验证
					$(".work_hour")
							.live(
									"input",
									function(e) {
										var total_hour = 0;
										var hour = $(e.target).val();
										var tr = $(e.target).closest("tr");
										var limit_total_hour = isNaN(parseFloat($(
												"#mtaModal").data("totalHour"))) ? 0
												: parseFloat($("#mtaModal")
														.data("totalHour"));
										var hour_inputs = $("#tb_workhour")
												.find(".work_hour");
										// alert(parseFloat(hour));
										$
												.each(
														hour_inputs,
														function(index, hinput) {
															var single_hour = isNaN(parseFloat($(
																	hinput)
																	.val())) ? 0
																	: parseFloat($(
																			hinput)
																			.val());
															total_hour += single_hour;
														});

										// alert((total_hour+ready_hour));
										var staffNum = $(tr).find(".card_num")
												.val();
										/*
										 * var
										 * conditions="{staffNum:'"+staffNum+"',workDate:'"+
										 * $("#mta_wdate").val()+"',tempOrderId:"+$("#mtaModal").data("orderId")+"}";
										 * var
										 * sfwlist=ajaxGetStaffWorkHours(conditions);
										 * if($("#mta_wdate").val().trim().length>0&&sfwlist.length>0){
										 * alert("不能重复维护工时！"); //$(tr).remove();
										 * }else
										 */
										/*if (!const_float_validate
												.test(hour)) {
											alert("工时只能是数字！");
										}
											 * else
											 * if((parseFloat(total_hour)+parseFloat(ready_hour)) -
											 * limit_total_hour > 0) {
											 * 
											 * alert("总工时不能超过" +
											 * limit_total_hour + "H!");
											 * $(this).val(""); }
											 */
										if (!re_f.test(hour)&&hour!="") {
											$(this).val("");
											alert("工时只能是数字,且只能以半小时为单位，例如：1.0,1.5,2.0！");							
										}
									});
					// 选定小班组查询人员列表
					$("#subgroup").live(
							"change",
							function() {
								var factory = $("#factory").find(
										"option:selected").text();
								var workshop = $("#workshop").find(
										"option:selected").text();
								var workgroup = $("#group").find(
										"option:selected").text();
								var subgroup = $(this).find("option:selected")
										.text();
								/* if($("#tb_workhour").html().length==0){ */
								$.ajax({
									type : "get",// 使用get方法访问后台
									dataType : "json",// 返回json格式的数据
									async : false,
									url : "common!getStaffInfo.action",
									data : {
										"factory" : factory,
										"workshop" : workshop,
										"workgroup" : workgroup,
										"subgroup" : subgroup
									},
									success : function(response) {
										$("#tb_workhour").html("");
										var list = response;
										$.each(list, function(index, staff) {
											// alert(staff.id);
											addWorkHourItem(staff.id,
													staff.staff_number,
													staff.name, staff.job, "",
													staff.team_org,
													staff.workgroup_org,
													staff.workshop_org,
													staff.plant_org,
													staff.skill_parameter)
										});
									}
								})
								/* } */

							});

					// 工厂切换事件
					$("#factory").change(
							function() {
								var selectFactory = $("#factory :selected")
										.text();
								getWorkshopSelect_Org("#workshop", null,
										selectFactory, "empty");
								$("#group").html(
										"<option value=''>请选择</option>");
								$("#subgroup").html(
										"<option value=''>请选择</option>");
							});
					// 车间切换事件
					$("#workshop").change(function() {
						var workshop = $("#workshop").val();
						getChildOrgSelect("#group", workshop, "", "empty");
						$("#subgroup").html("<option value=''>请选择</option>");
					});
					// 班组切换事件
					$("#group").change(function() {
						var group = $("#group").val();
						getChildOrgSelect("#subgroup", group, "", "empty");
					});
					// 产量输入框change事件
					$("#productQty").live(
							"change",
							function() {
								var productQty = $("#productQty").val();
								var readyQty = parseInt($("#progressModal")
										.data("readyQty"));
								var total = 0;
								if (!const_int_validate.test(productQty)) {
									alert("产量只能为整数");
									$("#productQty").val("");
									return;
								} else
									total = readyQty + parseInt(productQty);
								// alert($("#progressModal").data("readyQty"));
								if (total > parseInt($("#progressModal").data(
										"totalQty"))) {
									alert("已完成数量不能大于总数量！");
								} else {
									$("#readyQty").html(total);
								}
							});
					// 产量维护
					$("#btnProcConfirm").click(
							function() {
								var conditions = "{finishedQty:'"
										+ $("#readyQty").html()
										+ "',productQty:'"
										+ $("#productQty").val()
										+ "',orderId:'"
										+ $("#progressModal").data("orderId")
										+ "'}";
								$.ajax({
									url : "tempOrder!updateOrderProcedure.action",
									dataType : "json",
									type : "get",
									data : {
										"conditions" : conditions
									},
									success : function(response) {
										if (response.success) {
											alert(response.message);
											ajaxQuery(1);
											$("#progressModal").modal("hide");
										} else {
											alert(response.message);
										}

									}
								});
							});
					// 工时修改页面工时change事件，有效修改数据保存到edit_list
					$(".edit_work_hour").live(
							"input",
							function(e) {
								var pre_submit_val = isNaN(parseFloat($(
										e.target).attr("old_value"))) ? 0
										: parseFloat($(e.target).attr(
												"old_value"));
								var submit_val = parseFloat($(e.target).val());
								var limit_total_hour = isNaN(parseFloat($(
										"#editModal").data("totalHour"))) ? 0
										: parseFloat($("#editModal").data(
												"totalHour"));
								// alert("ready_hour:"+ready_hour);
								/*if (isNaN(submit_val)) {
									alert("工时必须为数字！");
									$(e.target).val(pre_submit_val);
								}
									 * else
									 * if((submit_val-pre_submit_val)>(limit_total_hour-ready_hour)){
									 * alert("总工时不能超过" + limit_total_hour +
									 * "H!"); $(e.target).val(pre_submit_val); }
									 */
								if (!re_f.test($(e.target).val())&&$(e.target).val()!="") {
									$(this).val(pre_submit_val);
									alert("技改工时只能是数字,且只能以半小时为单位，例如：1.0,1.5,2.0！");							
								}
								else {
									var edit_obj = {};
									edit_obj.id = $(e.target).closest("tr")
											.data("id");
									edit_obj.workHour = submit_val;
									edit_list.push(edit_obj);
								}

							});

					// 保存工时修改
					$("#btnEditSave").click(function() {
						if (edit_list.length > 0) {
							ajaxUpdate(JSON.stringify(edit_list));
						} else {
							alert("无数据更改！");
							$("#editModal").modal("hide");
						}
					});
					/**
					 * 产量输入校验
					 */
					/*
					 * $(".productQty").live("input",function(e){ var
					 * tr=$(e.target).parent("td").parent("tr"); var
					 * totalQty=$(tr).children("td").eq(3).html(); var
					 * readyQty=$(tr).children("td").eq(4).html(); var
					 * productQty=$(e.target).val()==""?0:$(e.target).val();
					 * 
					 * 
					 * });
					 */
					$(".productQty")
							.live(
									"change",
									function(e) {
										var tr = $(e.target).parent("td")
												.parent("tr");
										var totalQty = $(tr).children("td").eq(
												3).html();
										var readyQty = $(tr).children("td").eq(
												4).html();
										var productQty = $(e.target).val() == "" ? 0
												: $(e.target).val();
										var orderNo = $(tr).data("orderNo");
										if (!const_int_validate
												.test(productQty)) {
											alert("产量只能为整数");
											$(this).val("");
											var qtyinput = $(tr).children("td")
													.eq(5).find("input");
											document.getElementById(
													"prdqty_" + orderNo)
													.focus();
											return false;
										} else if (parseInt(totalQty) < parseInt(readyQty)
												+ parseInt(productQty)) {
											alert("已完成数量不能超过总数量！");
											$(this).val("");
											document.getElementById(
													"prdqty_" + orderNo)
													.focus();
											return false;
										} else if (productQty != 0
												&& confirm("是否保存输入的产量？")) {
											$(this).val("");
											var order = {};
											order.finishedQty = parseInt(readyQty)+parseInt(productQty);
											order.productQty = productQty;
											order.orderId = $(tr).data("id");
											// 已完成数量等于总数量时更新工单状态为‘已完成’
											if (parseInt(totalQty) == parseInt(readyQty)
													+ parseInt(productQty)) {
												order.status = "5";
											}
											var conditions = JSON
													.stringify(order);
											$
													.ajax({
														url : "tempOrder!updateOrderProcedure.action",
														dataType : "json",
														type : "get",
														data : {
															"conditions" : conditions
														},
														success : function(response) {
															if (response.success) {
																alert(response.message);
																$(tr)
																		.children(
																				"td")
																		.eq(4)
																		.html(
																				parseInt(readyQty)
																						+ parseInt(productQty))
																ajaxQuery(1);
															} else {
																alert(response.message);
															}

														}
													});
										}
									});

					$("#q_factory").change(
							function(e) {
								var eleId = $(e.target).attr("id");
								var selectFactory = $(
										"#" + eleId + " :selected").text();
								var workshopEleId = "#q_workshop";
								getWorkshopSelect_Auth(workshopEleId, null,
										selectFactory, "");
							});
			//工时修改删除功能
			$("#btnSwhDelete").click(function(){
				var boxList=$("#workhour_list :checked");
				var swhList=[];
				var deltrlist=[];
				$.each(boxList,function(index,box){
					var obj={};
					var tr=$(box).closest("tr");
					var swhid=$(tr).data("id");
					obj.id=swhid;
					swhList.push(obj);
					deltrlist.push(tr);
				});
				
				if(swhList.length==0){
					alert("请选择需要删除的工时信息！");
				}else{
					$.ajax({
						url : "tempOrder!deleteWorkHourInfo.action",
						dataType : "json",
						type : "get",
						data : {
							"conditions" : JSON.stringify(swhList)
						},
						success:function(response){
							alert(response.message);
							$.each(deltrlist,function(index,tr){
								$(tr).remove();
								var workhour_input=$(tr).find("input").eq(1);
								var cur_hour=$(workhour_input).attr("old_value");	
								ready_hour=(ready_hour-parseFloat(cur_hour)).toFixed(2);
							});
							$(".read_hours").html(
									"已分配工时：" + ready_hour);
						},
						error:function(response){
							var conditions = "{tempOrderId:'"
								+ $("#mtaModal").data("orderId")+ "'}";
							var response = ajaxGetStaffWorkHours(conditions)
							var swhlist = response.dataList;
							generateWorkhourTb(swhlist, true);
						}
					});
				}
			});
					
					
});

function initPage() {
	// 默认已评估
	$("#status").val("3");
	// alert($("#tempOrder").find(".treemenu").html());
	getAuthorityFactorySelect("#factory,#q_factory", "", "noall");
	getWorkshopSelect_Auth("#q_workshop", "", $("#q_factory :selected").text(),
			"");
	/* var selectFactory=$("#factory").find("option:selected").text(); */

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
	var factory = $("#q_factory :selected").text();
	var workshopAll = "";
	$("#q_workshop option").each(function() {
		workshopAll += $(this).text() + ",";
	});
	// alert(workshopAll);
	var workshop = $("#q_workshop :selected").text() == "全部" ? workshopAll : $(
			"#q_workshop :selected").text();
	var conditions = "{orderNo:'" + orderNo + "',applyDateStart:'"
			+ applyDateStart + "',applyDateEnd:'" + applyDateEnd + "',status:'"
			+ status + "',factory:'" + factory + "',workshop:'" + workshop
			+ "'}";
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
										var tmpOrderNum=value.tmp_order_no == undefined ? ""
												: value.tmp_order_no;
										var orderSerialNo= value.order_serial_no == undefined ? ""
												: value.order_serial_no;
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
										var totalHour = parseFloat(value.single_hour)*parseFloat(value.total_qty);
										var status = value.status == undefined ? ""
												: status_arr[value.status];
										var applyDate = value.apply_date == undefined ? ""
												: value.apply_date;
										var approver = value.approver == undefined ? ""
												: value.approver;
										var approverCardNo = value.card_number == undefined ? ""
												: value.card_number;
										var approverId = value.approve_id == undefined ? ""
												: value.approve_id;
										var approveDate = value.approve_date == undefined ? ""
												: value.approve_date;
										var readyQty = value.finished_qty == undefined ? 0
												: value.finished_qty;
										var workhourTotal=value.workhour_total==undefined?0:value.workhour_total;
										var tr = $("<tr />");
										$("<td />")
												.html(
														"<a href=\"javascript:void(window.open('tempOrder!tempOrderInfoPage.action?tempOrderId="
																+ value.id
																+ "','newwindow','width=700,height=600,toolbar= no, menubar=no,scrollbars=no,resizable=no,location=no,status=no,top=150,left=280'))\" style='cusor:pointer'>"
																+ orderSerialNo
																+ "</a>")
												.appendTo(tr);
										$("<td />").html(sapOrder).appendTo(tr)
										$("<td width='300px' style=\"table-layout:fixed;word-break:break-all;width:300px\"/>").html(reasonContent)
												.appendTo(tr);
										$("<td />").html(totalQty).appendTo(tr);
										$("<td />").html(readyQty).appendTo(tr);
										if (totalQty!=readyQty&&(status =='已驳回' ||status=='已评估')){
											$("<td />")
													.html(
															"<input class='productQty' id=\"prdqty_"
																	+ tmpOrderNum
																	+ "\" style=\"border:1;width:30px;text-align:center;font-size: 12px\" />")
													.appendTo(tr);
										} else {
											$("<td />").html("").appendTo(tr);
										}

										$("<td />").html(singleHour).appendTo(
												tr);
										$("<td />").html(labors).appendTo(tr);
										$("<td />").html(totalHour.toFixed(2))
												.appendTo(tr);
										$("<td />").html(workhourTotal.toFixed(2)).appendTo(tr);
										$("<td />").html(value.applier)
												.appendTo(tr);
										$("<td />").html(applyDate)
												.appendTo(tr);
										/*
										 * $("<td />").html(approver).appendTo(tr);
										 * $("<td />").html(approveDate).appendTo(
										 * tr)
										 */
										$("<td />").html(status).appendTo(tr);
										/*if (stauts != '已创建' && status != '已完成')*/ 
										if(status=='已评估'|| status == '已完成'||status =='已驳回' ||status=='已分配'){
											$("<td />")
													.html(
															"<i name='edit' rel=\"tooltip\" title='工时维护' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>")
													.appendTo(tr);
											$("<td />")
													.html(
															"<i name='edit' rel=\"tooltip\" title='工时修改' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>")
													.appendTo(tr);
											/*
											 * $("<td />") .html( "<i
											 * name='edit' rel=\"tooltip\"
											 * title='临时派工单进度维护' class=\"fa
											 * fa-pencil\" style=\"cursor:
											 * pointer\"></i>") .appendTo(tr);
											 */
										} else {
											$("<td />").html("").appendTo(tr);
											$("<td />").html("").appendTo(tr);
										/*	$("<td />").html("").appendTo(tr);*/
										}

										$("#tableResult tbody").append(tr);
										$(tr).data("id", value.id);
										$(tr).data("totalHour", totalHour);
										$(tr).data("readyQty", readyQty);
										$(tr).data("orderNo", tmpOrderNum);
										$(tr).data("sapOrder", sapOrder);
										$(tr).data("approverCardNo",
												approverCardNo);
										$(tr).data("approverId", approverId);
										$(tr).data("approver", approver);
										$(tr).data("workshop",value.workshop);
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

function ajaxSave(conditions) {
	$("#btnSave").attr("disabled", true);
	var targetPage = $("#cur").attr("page") || 1;
	$.ajax({
		url : "tempOrder!saveWorkHourInfo.action",
		dataType : "json",
		type : "post",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			if (response.success) {
				alert(response.message);
				$("#btnSave").attr("disabled", false);
				ajaxQuery(targetPage);
			} else {
				alert(response.message);
			}

		}
	});
}

function ajaxUpdate(conditions) {
	var targetPage = $("#cur").attr("page") || 1;
	$.ajax({
		url : "tempOrder!updateWorkHourInfo.action",
		dataType : "json",
		type : "get",
		data : {
			"conditions" : conditions,
			"whflag" : 'update'
		},
		success : function(response) {
			if (response.success) {
				alert(response.message);
				ajaxQuery(targetPage);
			} else {
				alert(response.message);
			}

		}
	});
}

function addWorkHourItem(staffId, cardNo, staffName, staffPost, workHour,
		subgroup, group, workshop, factory, skillParameter) {
	cardNo = cardNo || "";
	cardNoDisabled = "";
	if (cardNo.trim().length > 0) {
		cardNoDisabled = "disabled";
	}
	workHour = workHour || "";
	var tr = $("<tr style='padding:5px'/>");
	$("<td />")
			.html(
					"<button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>")
			.appendTo(tr);
	$("<td />")
			.html(
					"<input class='input-small card_num' style='text-align:center;margin-bottom: 0px;' type='text' value='"
							+ cardNo
							+ "' staffId='"
							+ staffId
							+ "' "
							+ cardNoDisabled + ">").appendTo(tr);
	$("<td class='staff_name' />").html(staffName).appendTo(tr);
	$("<td class='staff_post' />").html(staffPost).appendTo(tr);
	$("<td />")
			.html(
					"<input class='input-small work_hour' style='text-align:center;margin-bottom: 0px;' type='text' value="
							+ workHour + " >").appendTo(tr);
	$("<td class='staff_subgroup' />").html(subgroup).appendTo(tr);
	$("<td class='staff_group' />").html(group).appendTo(tr);
	$("<td class='staff_workshop' />").html(workshop).appendTo(tr);
	$("<td class='staff_factory' />").html(factory).appendTo(tr);
	$(tr).data("skill_parameter", skillParameter);
	$("#tb_workhour").append(tr);
}

function ajaxGetStaffWorkHours(conditions) {
	var data;
	$.ajax({
		url : "tempOrder!getStaffWorkHours.action",
		dataType : "json",
		async : false,
		type : "get",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			data = response;
		}
	});
	return data;
}
/*
 * caculate: true 计算已分配工时合计
 */
function generateWorkhourTb(swhlist, caculate) {
	$("#checkall").attr("checked", false);
	caculate = caculate || false;
	var ready = 0;
	$("#workhour_list").html("");
	$
			.each(
					swhlist,
					function(index, swh) {
						var tr = $("<tr style='padding:5px'/>");
						var workhour = swh.work_hour == undefined ? ""
								: swh.work_hour;
						if (wh_status_arr[swh.status] == "已驳回") {
							$("<td />").html("<input type='checkbox' >")
									.appendTo(tr);
						} else {
							$("<td />").html("").appendTo(tr);
						}
						$("<td />").html(swh.staff_number).appendTo(tr);
						$("<td />").html(swh.staff_name).appendTo(tr);
						$("<td />").html(swh.job).appendTo(tr);
						var disabled = (wh_status_arr[swh.status] != '已驳回') ? 'disabled'
								: "";
					
						$("<td />")
								.html(
										"<input class='input-small edit_work_hour' "
												+ disabled
												+ " style='text-align:center;margin-bottom: 0px;' type='text' value='"
												+ workhour + "' old_value='"
												+ workhour + "'>").appendTo(tr);
						$("<td />").html(swh.team_org).appendTo(tr);
						$("<td />").html(swh.workgroup_org).appendTo(tr);
						$("<td />").html(swh.workshop_org).appendTo(tr);
						$("<td />").html(swh.plant_org).appendTo(tr);
						$("<td />").html(wh_status_arr[swh.status]).appendTo(tr);
						$("<td />").html(swh.work_date).appendTo(tr);
						$("#workhour_list").append(tr);
						$(tr).data("id", swh.id);
						if (caculate) {
							var h = isNaN(parseFloat(swh.work_hour)) ? 0
									: parseFloat(swh.work_hour);
							ready += h;
						}

					});
	ready_hour = ready.toFixed(2);
}
