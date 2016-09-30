var workgrouplist = "";
var factoryId;
var workshopId;
$(document)
		.ready(
				function() {
					factoryId = $("#factoryId").val();
					workshopId = $("#workshopId").val();
					getWorkgroupList(workshopId);// 获取车间下拉列表
					$("#qc_record_in").addClass("in");

					ajaxGetDetail();

					// 点击保存，提交明细数据
					$("#btnUpdateTplDetail")
							.click(
									function() {
										// alert($("#parts_id").val());
										var flag = true;
										var result = $(
												"input[name='header.test_result']:checked")
												.val();
										/*
										 * $(".testResult").each(function() {
										 * var result = $(this).val(); if
										 * (result.trim().length == 0) {
										 * alert("请填写检验结果！"); $(this).focus();
										 * flag= false; return false; } });
										 */
										/*
										 * $(".workshop").each(function(){ var
										 * result=$(this).val();
										 * if(result.trim().length==0){
										 * alert("请选择责任车间！"); $(this).focus();
										 * return false; } });
										 */
										if (result == undefined
												|| result.trim().length == 0) {
											alert("请选择检验结论！");
											flag = false;
											return false;
										}
										$(".workgroup")
												.each(
														function() {
															var result = $(this)
																	.val();
															var tds = $(this)
																	.parent(
																			"td")
																	.siblings();
															var judgeResult = $(
																	tds).find(
																	"select")
																	.eq(0)
																	.val();
															// alert(judgeResult);

															if (result.trim().length == 0
																	&& judgeResult == '不合格') {
																alert("请选择责任班组！");
																flag = false;
																return false;
															}
														});

										if (flag) {
											$("#saveForm")
													.ajaxSubmit(
															{
																url : "testFlowCardIn!updateRecord.action",
																type : "post",
																dataType : "json",
																success : function(
																		response) {
																	alert(response.message);
																	if (response.success) {
																		window
																				.open(
																						"testFlowCardIn!index.action",
																						"_self");
																	}
																}
															});
										}

									});

					// 检验结果点击事件绑定
					$('.testResult').live(
							"click",
							function() {
								var testResultEleId = $(this).attr("id");
								getPartsSelect("#input_parts", "#partsId");
								emptyModal();
								$("#faultLibQuery").data("testResultId",
										testResultEleId);
								$("#faultLibQuery").modal("show");
							});
					// 标准故障库查询
					$("#btnLibQuery")
							.click(
									function() {
										var conditions = "{'parts':'"
												+ $("#input_parts").val()
												+ "',bugType:'"
												+ $("#input_bug_type").val()
												+ "','bug':'"
												+ $("#input_bug").val()
												+ "','seriousLevel':'"
												+ $("#input_faultLevel").val()
												+ "'}";
										$
												.get(
														"stdFaultlib!getFaultLibFuzzyList.action",
														{
															"conditions" : conditions
														},
														function(data) {
															var resultList = data.dataList;
															$(
																	"#faultLibResult tbody")
																	.html("");
															$
																	.each(
																			resultList,
																			function(
																					index,
																					value) {
																				var tr = $("<tr />");
																				$(
																						"<td />")
																						.html(
																								"<input type='checkbox' name='libFlag'>")
																						.appendTo(
																								tr);
																				$(
																						"<td />")
																						.html(
																								value.parts)
																						.appendTo(
																								tr);
																				$(
																						"<td />")
																						.html(
																								value.bugType)
																						.appendTo(
																								tr);
																				$(
																						"<td />")
																						.html(
																								value.bug)
																						.appendTo(
																								tr);
																				$(
																						"<td />")
																						.html(
																								value.faultLevel)
																						.appendTo(
																								tr);
																				$(
																						"<td />")
																						.html(
																								value.faultType == '0' ? '非尺寸'
																										: '尺寸')
																						.appendTo(
																								tr);
																				tr
																						.data(
																								"libId",
																								value.id);
																				tr
																						.appendTo("#faultLibResult tbody");
																			})
														}, 'json');
										$("#faultLibResult").css("display", "");
									});

					// 确认选择故障
					$("#btnLibConfirm")
							.click(
									function() {
										var selectLibIds = "";
										var selectBugs = "";
										var testResultEleId = $(
												"#faultLibQuery").data(
												"testResultId");
										var i = testResultEleId.split("_")[1];
										var checkeles = $("#faultLibResult tbody :checkbox");
										$
												.each(
														checkeles,
														function(index, value) {
															// alert($(checkeles[index]).parent("td").parent("tr").data("libId"));
															var libId = $(
																	checkeles[index])
																	.parent(
																			"td")
																	.parent(
																			"tr")
																	.data(
																			"libId");
															var tds = $(
																	checkeles[index])
																	.parent(
																			"td")
																	.siblings();
															var bug = $(tds[2])
																	.html();
															// alert(bug);
															if ($(
																	checkeles[index])
																	.attr(
																			"checked") == "checked") {
																selectLibIds += libId
																		+ ",";
																selectBugs += bug
																		+ ",";
															}
														});
										selectLibIds = selectLibIds.substring(
												0, selectLibIds.length - 1);
										selectBugs = selectBugs.substring(0,
												selectBugs.length - 1);
										// alert(selectBugs);
										/*
										 * if (selectLibIds.trim().length == 0) {
										 * alert("请至少选中一个故障！"); return false; }
										 * else { $("#" + testResultEleId).val(
										 * selectBugs); $("#testResultId_" +
										 * i).val( selectLibIds);
										 * $("#faultLibQuery").modal("hide"); }
										 */
										$("#" + testResultEleId)
												.val(selectBugs);
										$("#testResultId_" + i).val(
												selectLibIds);
										$("#faultLibQuery").modal("hide");
									});

				})

function ajaxGetDetail() {
	var headerId = $("#headerId").val();
	/*
	 * var conditions = "{"; conditions += "header.id:" + headerId + "}";
	 */
	// alert(conditions);
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "testFlowCardIn!getRecordDetail.action",
		data : {
			"header.id" : headerId
		},
		success : function(response) {
			var tplarray = response.dataList;
			/*
			 * var flowHeader = response.header;
			 * $("#busTypeId").val(flowHeader.busTypeId);
			 * $("#orderId").val(flowHeader.orderId);
			 * $("#orderConfigId").val(flowHeader.configId);
			 * $("#order-info").html( "订单：" + flowHeader.order + " 车型：" +
			 * flowHeader.busType);
			 */
			if (tplarray.length <= 0) {
				alert("未查询到匹配模板！");
				$("#saveForm").css("display", "none");
			} else {
				generateTable(tplarray);// 动态生成表格

				getWorkshopSelect(".workshop", workshopId, factoryId, "empty");
				// alert(workshopId);
				$("#saveForm").css("display", "");
			}

			// 检验结果模糊查询事件绑定
			/*
			 * $.each(detaillist,function(index,value){
			 * getTestResult("#testResult_"+index);
			 * 
			 * });
			 */

		}
	});
}
/*
 * 查询班组下拉列表
 */
function getWorkgroupList(selectWorkshop) {
	$.ajax({
		url : "common!getWorkgroupSelect.action",
		dataType : "json",
		data : {
			"conditionMap.workshop" : selectWorkshop
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			workgrouplist = response;
		}
	})
}
/*
 * 动态生成表格
 */
function generateTable(dataList) {
	$("#tableResult tbody").html("");
	var last_processNo = null;
	var last_itemNo = null;
	var last_node = null;
	var last_qc_point = null;
	var node_index = 0;
	var node_id = "";
	var qc_point_index = 0;
	var qc_point_id = "";

	$
			.each(
					dataList,
					function(index, value) {
						var tr = $("<tr />");
						$(tr).data("tplDetailId", value.id);
						var process_id = "#process_" + value.process_no;
						var item_id = "#item_" + value.test_item_no;
						var ok_checked = value.result_judge == "合格" ? "selected"
								: "";
						var ng_checked = value.result_judge == "不合格" ? "selected"
								: "";
						var test_result=value.test_result_name==null?"":value.test_result_name;
						// 节点 合并单元格
						if (value.quality_node == last_node) {
							var noderowspan = parseInt($(node_id).attr(
									"rowspan"));
							var recordid = $(node_id).attr("recordid") + ","
									+ index;

							$(node_id).attr("rowspan", noderowspan + 1).attr(
									"recordid", recordid);
							if ((value.quality_node).trim().length > 0) {
								$(node_id).html(value.quality_node);
							}
						} else {
							$(
									"<td id='node_" + node_index
											+ "' rowspan='1' " + "/>").html(
									value.quality_node).appendTo(tr);
							node_id = "#node_" + node_index;
							node_index += 1;
						}
						// 工序 合并单元格
						if (value.process_no == last_processNo
								&& value.quality_node == last_node) {

							var prorowspan = parseInt($(process_id).attr(
									"rowspan"));
							var recordid = $(process_id).attr("recordid") + ","
									+ index;

							$(process_id).attr("rowspan", prorowspan + 1).attr(
									"recordid", recordid);
							if ((value.process_name).trim().length > 0) {
								$(process_id).html(value.process_name);
							}
						} else {
							$(
									"<td id='process_" + value.process_no
											+ "' rowspan='1' " + "/>").attr(
									"recordid", index).html(value.process_name)
									.appendTo(tr);
						}
						// 检测内容 合并单元格
						if (value.test_item_no == last_itemNo
								&& value.process_no == last_processNo) {
							var itemrowspan = parseInt($(item_id).attr(
									"rowspan"));
							var recordid = $(item_id).attr("recordid") + ","
									+ index;
							$(item_id).attr("rowspan", itemrowspan + 1).attr(
									"recordid", recordid);
							if ((value.test_item).trim().length > 0) {
								$(item_id).html(value.test_item);
							}
						} else {
							$(
									"<td id='item_" + value.test_item_no
											+ "' rowspan='1'" + "/>").attr(
									"recordid", index).html(value.test_item)
									.appendTo(tr);
						}
						// 质控点 合并单元格
						if (value.quality_point_flag == last_qc_point
								&& value.test_item_no == last_itemNo) {
							var pointrowspan = parseInt($(qc_point_id).attr(
									"rowspan"));
							var recordid = $(qc_point_id).attr("recordid")
									+ "," + index;
							$(qc_point_id).attr("rowspan", pointrowspan + 1)
									.attr("recordid", recordid);
							if ((value.quality_point_flag).trim().length > 0) {
								$(qc_point_id).html(value.quality_point_flag);
							}
						} else {
							qc_point_id = "#qcpoint_" + qc_point_index;
							$(
									"<td id='qcpoint_" + qc_point_index
											+ "' rowspan='1'" + "/>").attr(
									"recordid", index).html(
									value.quality_point_flag).appendTo(tr);
							qc_point_index += 1;
						}

						$("<td />").attr("id", "std_" + index).html(
								value.test_standard).appendTo(tr);
						$("<td />").attr("id", "freq_" + index).html(
								value.frequency).appendTo(tr);
						$("<td />").attr("id", "tools_" + index).html(
								value.test_tools).appendTo(tr);

						$("<td width='120px' />")
								.html(
										"<input id='testResult_"
												+ index
												+ "' class='testResult' style='width:120px' value="
												+ test_result+ ">")
								.appendTo(tr);
						$("<td />").html(
								"<select name='detailList[" + index
										+ "].result_judge' style='width:80px'>"
										+ "<option value='合格'" + ok_checked
										+ ">合格</option>"
										+ "<option value='不合格'" + ng_checked
										+ ">不合格</option></select>")
								.appendTo(tr);
						$("<td />").html(
								"<input class='reworkResult' name='detailList["
										+ index
										+ "].rework' style='width:80px'>")
								.appendTo(tr);
						$("<td width='80px' />")
								.html(
										"<select id='workshop_"
												+ index
												+ "' class='workshop' name='detailList["
												+ index
												+ "].workshop_id' readonly style='width:80px'>"
												+ "<option value='0' selected>请选择</option></select>")
								.appendTo(tr);
						$("<td />")
								.html(
										"<select id='workgroup_"
												+ index
												+ "' class='workgroup' name='detailList["
												+ index
												+ "].workgroup_id' style='width:100px'>"
												+ "<option value='0' selected>请选择</option></select>")
								.appendTo(tr);
						$("<td />").html(
								"<input  name='detailList[" + index
										+ "].memo' style='width:80px' value='"
										+ value.memo + "'>").appendTo(tr);
						$(
								"<input id='testResultId_" + index
										+ "' type='hidden' name='detailList["
										+ index + "].test_result' value='"
										+ value.test_result + "'>")
								.appendTo(tr);
						$(
								"<input type='hidden' name='detailList["
										+ index + "].id' value='" + value.id
										+ "' style='width:80px'>").appendTo(tr);

						last_processNo = value.process_no;
						last_itemNo = value.test_item_no;
						last_node = value.quality_node;
						last_qc_point = value.quality_point_flag;
						tr.appendTo("#tableResult tbody");
						// alert(workgrouplist.length);
						getSelects_empty(workgrouplist, value.workgroup,
								"#workgroup_" + index,"0");
					});
}
function getSelects_empty(data, selectval, element) {
	var strs = "<option value='0'>请选择</option>";
	$(element).html("");
	$.each(data, function(index, value) {
		if (selectval == value.id || selectval == value.name) {
			strs += "<option value=" + value.id + " selected='selected'>"
					+ value.name + "</option>";
		} else {
			strs += "<option value=" + value.id + ">" + value.name
					+ "</option>";
		}
	});
	$(element).append(strs);
}
// 清空标准故障库查询窗口
function emptyModal() {
	$("#faultLibResult").css("display", "none");
	$("#faultLibResult tbody").html("");
	$("#input_parts").val();
	$("#input_faultLevel").val();
	$("#input_bug").val();
}
// 检验结果模糊查询
function getTestResult(element) {
	// alert($(element).attr("id"));
	var index = $(element).attr("id").split("_")[1];
	var workshopId = "#workshop_" + index;
	var workgroupId = "#workgroup_" + index;
	var faultLevelId = "#seriousLevel_" + index;
	var resultList;
	$(element)
			.typeahead(
					{
						source : function(input, process) {
							var conditions = "{'parts':'" + $("#q_parts").val()
									+ "','bug':'" + input + "'}";
							$.get("stdFaultlib!getFaultLibFuzzyList.action", {
								"conditions" : conditions
							}, function(data) {
								resultList = data.dataList;
								var results = new Array();
								$.each(resultList, function(index, value) {
									results.push(value.bug);
								})
								return process(results);
							}, 'json');
						},
						highlighter : function(item) {
							var workshop = "";
							var workgroup = "";
							var faultLevel = "";
							$.each(resultList, function(index, value) {
								if (value.bug == item) {
									workshop = value.workshop;
									workgroup = value.workgroup;
									faultLevel = value.faultLevel;
								}
							})
							return item + "  " + faultLevel + "  " + workshop
									+ "  " + workgroup;
						},
						updater : function(item) {
							var workshop = "";
							var workgroup = "";
							var faultLevel = "";
							$.each(resultList, function(index, value) {
								if (value.bug == item) {
									workshop = value.workshop;
									workgroup = value.workgroup;
									faultLevel = value.faultLevel;
								}
							})
							// $(elementId).attr("parts_id",selectId);
							var factoryId = $("#q_factory").val();
							getWorkshopSelect(workshopId, workshop, factoryId,
									"empty");
							getWorkgroupSelect(workgroupId, workgroup, $(
									".workshop :eq(0)").val(), "empty");
							$(faultLevelId).val(faultLevel);
							return item;
						}
					});
}