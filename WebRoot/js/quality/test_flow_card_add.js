$(document)
		.ready(
				function() {
					initPage();
					$("#qc_record_in").addClass("in");
					// 车号失去焦点查询工厂信息
					$("#q_busno")
							.bind(
									"blur",
									function(event) {
										var conditions = "{busNo:'"
												+ $("#q_busno").val() + "'}";
										$
												.ajax({
													type : "get",// 使用get方法访问后台
													dataType : "json",// 返回json格式的数据
													url : "prodTrackIn!getFactoryByBusNo.action",
													data : {
														"conditions" : conditions
													},
													success : function(response) {
														getFactorySelect(
																"#q_factory",
																response.factoryInfo.factory_id,
																"");
														getWorkshopSelect(
																"#q_workshop",
																"",
																$("#q_factory")
																		.val(),
																"");
													}
												})
									});
					// 点击确定显示记录明细表格
					$("#btnShowDetail").click(function() {
						var workshop = $("#q_workshop").val();

						var busNo = $("#q_busno").val();
						var factory = $("#q_factory").val();
						if (factory.trim().length == 0) {
							alert("请选择工厂！");
							return false;
						} else if (workshop.trim().length == 0) {
							alert("请选择车间！");
							return false;
						} else if (busNo.trim().length == 0) {
							alert("请输入车号！");
							return false;
						} else {
							$("#busNo").val(busNo);
							$("#disp_busNo").val(busNo);
							$("#factoryId").val(factory);
							$("#workshopId").val(workshop);
							ajaxGetDetail();
						}
					});

					// 点击保存，提交明细数据
					$("#btnAddTplDetail")
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

										/*
										 * if (typeof (result) == 'undefined' ||
										 * result.trim().length == 0) {
										 * alert("请选择检验结论！"); flag= false;
										 * return false; }
										 */
										if (flag) {
											$("#saveForm")
													.ajaxSubmit(
															{
																url : "testFlowCardIn!addRecord.action",
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
					// 切换车间获取班组下拉列表
					$(".workshop").live(
							"change",
							function() {
								// alert($(this).val());
								var index = $(this).attr("id").split("_")[1];
								getWorkgroupSelect("#workgroup_" + index, "",
										$(this).val(), "empty");
							});
					// 切换工厂获取车间下拉列表
					$("#q_factory").live(
							"change",
							function() {
								var factoryId = $(this).val();
								getWorkshopSelect("#q_workshop", "", factoryId,
										"empty");
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
function initPage() {
	getFactorySelect("#q_factory", "", "empty")

}
function ajaxGetDetail() {
	var busNo = $("#q_busno").val();
	var workshopName = $("#q_workshop").find("option:selected").text();
	var workshopId = isNaN(parseInt($("#q_workshop").val())) ? 0 : parseInt($(
			"#q_workshop").val());
	// alert(workshopName);
	var conditions = "{";
	conditions += "busNo:'" + busNo + "',workshop:'" + workshopName
			+ "',workshopId:" + workshopId + "}";
	// alert(conditions);
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "testFlowCardIn!getRecordTplDetail.action",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			var tplarray = response.dataList;
			if (!response.success) {
				alert(response.message);
			} else if (typeof (response.dataList) == 'undefined'
					|| response.dataList.length <= 0) {
				alert("未查询到匹配模板！");
				$("#saveForm").css("display", "none");
			} else {
				var flowHeader = response.header;
				$("#busTypeId").val(flowHeader.busTypeId);
				$("#orderId").val(flowHeader.orderId);
				$("#orderConfigId").val(flowHeader.configId);
				$("#order-info")
						.html(
								"订单：" + flowHeader.order + "  车型："
										+ flowHeader.busType);
				$("#btnShowDetail").attr("disabled", true);
				generateTable(tplarray);// 动态生成表格
				var factoryId = $("#q_factory").val();
				var workshopId = $("#q_workshop").val();
				getWorkshopSelect(".workshop", workshopId, factoryId, "empty");
				var workshopId = $(".workshop :eq(0)").val();
				// alert(workshopId);
				getWorkgroupSelect(".workgroup", "", workshopId, "empty");
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
						var process_id = "#process_" + value.processNo;
						var item_id = "#item_" + value.testItemNo;
						// 节点 合并单元格
						if (value.qualityNode == last_node) {
							var noderowspan = parseInt($(node_id).attr(
									"rowspan"));
							var recordid = $(node_id).attr("recordid") + ","
									+ index;

							$(node_id).attr("rowspan", noderowspan + 1).attr(
									"recordid", recordid);
							if ((value.qualityNode).trim().length > 0) {
								$(node_id).html(value.qualityNode);
							}
						} else {
							$(
									"<td id='node_" + node_index
											+ "' rowspan='1' " + "/>").html(
									value.qualityNode).appendTo(tr);
							node_id = "#node_" + node_index;
							node_index += 1;
						}
						// 工序 合并单元格
						if (value.processNo == last_processNo
								&& value.qualityNode == last_node) {

							var prorowspan = parseInt($(process_id).attr(
									"rowspan"));
							var recordid = $(process_id).attr("recordid") + ","
									+ index;

							$(process_id).attr("rowspan", prorowspan + 1).attr(
									"recordid", recordid);
							if ((value.processName).trim().length > 0) {
								$(process_id).html(value.processName);
							}
						} else {
							$(
									"<td id='process_" + value.processNo
											+ "' rowspan='1' " + "/>").attr(
									"recordid", index).html(value.processName)
									.appendTo(tr);
						}
						// 检测内容 合并单元格
						if (value.testItemNo == last_itemNo
								&& value.processNo == last_processNo) {
							var itemrowspan = parseInt($(item_id).attr(
									"rowspan"));
							var recordid = $(item_id).attr("recordid") + ","
									+ index;
							$(item_id).attr("rowspan", itemrowspan + 1).attr(
									"recordid", recordid);
							if ((value.testItemName).trim().length > 0) {
								$(item_id).html(value.testItemName);
							}
						} else {
							$(
									"<td id='item_" + value.testItemNo
											+ "' rowspan='1'" + "/>").attr(
									"recordid", index).html(value.testItemName)
									.appendTo(tr);
						}
						// 质控点 合并单元格
						if (value.qcPoint == last_qc_point
								&& value.testItemNo == last_itemNo) {
							var pointrowspan = parseInt($(qc_point_id).attr(
									"rowspan"));
							var recordid = $(qc_point_id).attr("recordid")
									+ "," + index;
							$(qc_point_id).attr("rowspan", pointrowspan + 1)
									.attr("recordid", recordid);
							if ((value.qualityPointFlag).trim().length > 0) {
								$(qc_point_id).html(value.qualityPointFlag);
							}
						} else {
							qc_point_id = "#qcpoint_" + qc_point_index;
							$(
									"<td id='qcpoint_" + qc_point_index
											+ "' rowspan='1'" + "/>").attr(
									"recordid", index).html(
									value.qualityPointFlag).appendTo(tr);
							qc_point_index += 1;
						}

						$("<td />").attr("id", "std_" + index).html(
								value.testStdName).appendTo(tr);
						$("<td />").attr("id", "freq_" + index).html(
								value.frequency).appendTo(tr);
						$("<td />").attr("id", "tools_" + index).html(
								value.testTools).appendTo(tr);

						$("<td width='120px' />")
								.html(
										"<input id='testResult_"
												+ index
												+ "' class='testResult' style='width:120px' >")
								.appendTo(tr);
						$("<td />")
								.html(
										"<select name='detailList["
												+ index
												+ "].result_judge' style='width:80px'>"
												+ "<option value='合格'>合格</option><option value='不合格'>不合格</option></select>")
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
												+ "<option value='0'>请选择</option></select>")
								.appendTo(tr);
						$("<td />")
								.html(
										"<select id='workgroup_"
												+ index
												+ "' class='workgroup' name='detailList["
												+ index
												+ "].workgroup_id' style='width:100px'>"
												+ "<option value='0'>请选择</option></select>")
								.appendTo(tr);
						$("<td />").html(
								"<input  name='detailList[" + index
										+ "].memo' style='width:80px'>")
								.appendTo(tr);
						$(
								"<input id='testResultId_" + index
										+ "' type='hidden' name='detailList["
										+ index + "].test_result' >").appendTo(
								tr);
						$(
								"<input type='hidden' name='detailList["
										+ index
										+ "].test_card_template_detail_id' value='"
										+ value.id + "' style='width:80px'>")
								.appendTo(tr);

						last_processNo = value.processNo;
						last_itemNo = value.testItemNo;
						last_node = value.qualityNode;
						last_qc_point = value.qualityPointFlag;
						tr.appendTo("#tableResult tbody");

					});
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