var swhlist = [];
var swhupdatelist = [];

$(document)
		.ready(
				function() {
					initPage();
					// 工时删除
					$(".close")
							.live(
									"click",
									function(e) {
										var delflag = $(e.target).attr("del");
										var tr = $(e.target).closest("tr");
										if (delflag == 'all') {
											// 工时按车号批量删除
											/*
											 * var nodes =
											 * zTreeObj.getSelectedNodes(); var
											 * treeNode = nodes[0];
											 * if(treeNode.org_type != '6'){
											 * alert("请选择小班组！"); return false;
											 * }else{ var orgId=treeNode.id; var
											 * bus_number=$(tr).data("bus_number");
											 * var
											 * work_date=$(tr).find("td").eq(3).text();
											 * //alert(work_date); var
											 * conditions={"busNumber":bus_number,"workDate":work_date,"orgId":orgId};
											 * if (confirm("确认删除该车辆的工时数据？")) {
											 * ajaxDelete(JSON.stringify(conditions));
											 * ajaxQuery($("#cur").attr("page"));
											 * //generateTb(swhlist); } }
											 */
											var orgId = $(this).attr("orgId");
											var bus_number = $(this).attr(
													"bus_number");
											var work_date = $(this)
													.parent("td").next("td")
													.html();
											// alert(work_date);
											var conditions = {
												"busNumber" : bus_number,
												"workDate" : work_date,
												"orgId" : orgId
											};
											if (confirm("确认删除该车辆的工时数据？")) {
												ajaxDelete(JSON
														.stringify(conditions));
												ajaxQuery($("#cur")
														.attr("page"));
												// generateTb(swhlist);
											}
										} else {
											// 删除单条数据
											var index = parseInt($(e.target)
													.attr("swhlist_index"));
											var swhid = $(tr).data("swhid");
											var swh_obj = {
												'swhid' : swhid
											};
											if (confirm("确认删除该条数据？")) {
												ajaxDelete(JSON
														.stringify(swh_obj));
												swhlist.splice(index, 1);
												ajaxQuery($("#cur")
														.attr("page"));
												// generateTb(swhlist);
											}
										}
									})

					// Enter键移动输入光标
					$(".work_hour").live(
							"keydown",
							function(event) {
								if (event.keyCode == "13") {
									$(this).parent().parent().next().find(
											"input").focus();
								}
							})
					// 补贴车输入值校验
					$(".bonus")
							.live(
									"change",
									function(e) {
										var bonus_num = $(this).val();
										var bus_number = $(this).attr(
												"bus_number");

										bonus_num = isNaN(parseFloat(bonus_num)) ? 0
												: parseFloat(bonus_num);
										var ids = $(this).attr("ids");

										var conditions = "{bus_number:'"
												+ bus_number + "',bonus:'"
												+ bonus_num + "',ids:'" + ids
												+ "'}";
										if (!const_float_validate.test(bonus_num)) {
											alert("请输入数字！");
											$(this).val("");
										} else if (confirm("确认修改？")) {
											$
													.ajax({
														url : "pieceWorkTime!updateBonus.action",
														dataType : "json",
														async : false,
														type : "get",
														data : {
															"conditions" : conditions
														},
														success : function(
																response) {
															alert(response.message);
														}
													})
										}
									});
					// 查询事件
					$("#btnQuery").click(function() {
						/*
						 * if($("#work_date").val().trim().length==0){
						 * alert("请选择操作日期!"); }else
						 */
						ajaxQuery(1);
					});
					// 参与度验证是否数字
					$(".work_hour")
							.live(
									"change",
									function(e) {
										var tr = $(e.target).closest("tr");
										var participation = $(this).val();
										var index = parseInt($(tr).data(
												"swhlist_index"));
										var old_value = $(this).attr(
												"old_value");
										var const_par_validate = /^0(\.[0-9])?$|^1(\.[0-5])?$/;// 浮点数正则表达式
										var workshop = "";
										var nodes = zTreeObj.getSelectedNodes();
										var treeNode = nodes[0];
										if (treeNode.org_type == '4') {
											workshop = treeNode.displayName;
										}
										if (treeNode.org_type == '5') {
											workshop = treeNode.getParentNode().displayName;
										}
										if (treeNode.org_type == '6') {
											workshop = treeNode.getParentNode()
													.getParentNode().displayName;
										}
										if (!const_par_validate
												.test(participation)
												&& workshop != '自制件') {
											alert("参与度必须是介于0到1.5之间的数字，且最多只能保留一位小数！");
											$(this).val(old_value);
										} else if (!const_float_validate
												.test(participation)) {
											alert("参与度只能是数字！");
											$(this).val(old_value);
										} else if (old_value != participation) {
											swhlist[index].participation = participation;
											var staff = {};
											staff.id = swhlist[index].id;
											staff.participation = swhlist[index].participation;											
											swhupdatelist.push(staff);
										}
									});
					// 参与度验证是否数字
					$(".distribution")
							.live(
									"change",
									function(e) {
										var tr = $(e.target).closest("tr");
										var distribution = $(this).val();
										var index = parseInt($(tr).data(
												"swhlist_index"));
										var old_value = $(this).attr(
												"old_value");
										var const_par_validate = /^0(\.[0-9]*)?$|^1(\.[0]*)?$/;// 浮点数正则表达式
										
										if (!const_par_validate
												.test(distribution)) {
											alert("参与度必须是介于0到1之间的数字！");
											$(this).val(old_value);
										} else if (old_value != distribution) {
											swhlist[index].distribution = distribution;
											var staff = {};
											staff.id = swhlist[index].id;
											staff.distribution = swhlist[index].distribution;											
											swhupdatelist.push(staff);
										}
									});
					// 复选框全选、反选
					$("#checkall").click(function() {
						if ($(this).attr("checked") == "checked") {
							check_All_unAll("#table_workhour", true);
						} else
							check_All_unAll("#table_workhour", false);
					});
					// 保存修改
					$("#btnSave").click(function() {
						// alert(JSON.stringify(swhupdatelist));
						if (swhupdatelist.length > 0) {
							ajaxSave(JSON.stringify(swhupdatelist));
						}

					});
				});

function initPage() {
	getOrgAuthTree($("#workGroupTree"), "1,2,3,4,5,6", '1');
	getBusNumberSelect('#bus_number');
	/*
	 * getAuthorityFactorySelect("#factory", "", "noall"); var selectFactory =
	 * $("#factory :selected").text(); var
	 * defaultWorkshop=$("#d_workshop").val(); var
	 * defaultWorkgourp=$("#d_workgroup").val(); var
	 * defaultTeam=$("#d_team").val(); getWorkshopSelect_Org("#workshop",
	 * defaultWorkshop, selectFactory, "noall"); var workshop =
	 * $("#workshop").val(); getChildOrgSelect("#group", workshop,
	 * defaultWorkgourp, "noall"); var group = $("#group").val();
	 * getChildOrgSelect("#subgroup", group, defaultTeam, "noall");
	 */
	$("#checkall").attr("checked", false);
	/*
	 * var d = new Date(); var eYear = d.getFullYear(); var eMon = d.getMonth() +
	 * 1; var eDay = d.getDate(); d.setDate(eDay-7); endDate=(eYear)+"-"+(eMon<10?"0"+eMon:eMon)+"-"+(eDay<10 ?
	 * "0"+ eDay : eDay); var sYear=d.getFullYear(); var sMon = d.getMonth() +
	 * 1; var sDay = d.getDate(); startDate=(sYear)+"-"+(sMon<10?"0"+sMon:sMon)+"-"+(sDay<10 ?
	 * "0"+ sDay : sDay); $("#wdate_end").val(endDate);
	 * $("#wdate_start").val(startDate);
	 */
	/*
	 * var d = new Date(); var eYear = d.getFullYear(); var eMon = d.getMonth() +
	 * 1; var eDay = d.getDate(); wDate = (eYear) + "-" + (eMon < 10 ? "0" +
	 * eMon : eMon) + "-" + (eDay < 10 ? "0" + eDay : eDay);
	 * $("#work_date").val(wDate);
	 */

	var d = new Date();
	var eYear = d.getFullYear();
	var eMon = d.getMonth() + 1;
	var eDay = d.getDate();
	d.setDate(eDay - 7);
	endDate = (eYear) + "-" + (eMon < 10 ? "0" + eMon : eMon) + "-"
			+ (eDay < 10 ? "0" + eDay : eDay);
	var sYear = d.getFullYear();
	var sMon = d.getMonth() + 1;
	var sDay = d.getDate();
	startDate = (sYear) + "-" + (sMon < 10 ? "0" + sMon : sMon) + "-"
			+ (sDay < 10 ? "0" + sDay : sDay);
	$("#wdate_end").val(endDate);
	$("#wdate_start").val(startDate);

	pageSize = 20;
	/* ajaxQuery(1); */
	// 展开侧边栏
	$("#pieceWorkTime").find(".treemenu").addClass("collapsed");
	$("#piece_work").addClass("in");
	var span = $("#pieceWorkTime").find(".pull-right.fa");
	if ($(span).hasClass("fa-angle-down")) {
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}
}

function ajaxQuery(targetPage) {	
	var factory = "";
	var workshop = "";
	var workgroup = "";
	var subgroup = "";
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];

	if (treeNode.name != '无数据权限' || treeNode.id != '0') {
		if (treeNode.org_type == '1' || treeNode.org_type == '2') {
			factory = treeNode.displayName;
			var childrenNodes = treeNode.children[0].children;
			$.each(childrenNodes, function(index, childrenNode) {
				workshop += childrenNode.displayName + ",";
			});

		}
		if (treeNode.org_type == '3') {
			var childrenNodes = treeNode.children;
			$.each(childrenNodes, function(index, childrenNode) {
				workshop += childrenNode.displayName + ",";
			});
		}
		while (treeNode != null) {
			if (treeNode.org_type == '1' || treeNode.org_type == '2') {
				factory = treeNode.displayName;
			}
			if (treeNode.org_type == '4') {
				workshop = treeNode.displayName;
			}
			if (treeNode.org_type == '5') {
				workgroup = treeNode.displayName;
			}
			if (treeNode.org_type == '6') {
				subgroup = treeNode.id;
			}
			treeNode = treeNode.getParentNode();
		}
		$(".divLoading").addClass("fade in").show();
		var conditions = "{orgId:'" + subgroup + /*
													 * "',workDate:'" +
													 * $("#work_date").val()
													 */"',wdateStart:'" + $("#wdate_start").val()
				+ "',wdateEnd:'" + $("#wdate_end").val() + "',workgroup:'"
				+ workgroup + "',workshop:'" + workshop + "',factory:'"
				+ factory +"',status:'"+$("#hour_status").val()+ "',busNumber:'" + $("#bus_number").val() + "'}";
		// alert(conditions);
		$.ajax({
			url : "pieceWorkTime!getStaffWorkHours.action",
			dataType : "json",
			async : false,
			type : "get",
			data : {
				"conditions" : conditions,
				"pager.pageSize" : 20,
				"pager.curPage" : targetPage || 1
			},
			success : function(response) {
				swhlist = response.dataList;
				generateTb(swhlist);
				$(".divLoading").hide();
				$("#total").html(response.pager.totalCount);
				$("#total").attr("total", response.pager.totalCount);
				$("#cur").attr("page", response.pager.curPage);
				$("#cur").html(
						"<a href=\"#\">" + response.pager.curPage + "</a>");
				$("#pagination").show();
			}
		});
	}

}

function generateTb(swhlist) {
	$("#tb_workhour").html("");
	var last_bus_number = "";
	var last_workorg = "";
	var last_workdate = "";
	var busNumberId = "";
	var checkboxId = "";
	var workorgId = "";
	var workdateId = "";
	var bonusInputId = "";
	var busDelId = "";
	var mergecount1 = 0;
	var mergecount2 = 0;
	$
			.each(
					swhlist,
					function(index, swh) {
						var disabled = (swh.status == '已锁定' || swh.status == '已审批') ? 'disabled'
								: "";
						// alert(disabled);
						var tr = $("<tr />");
						// alert(workdateId);
						var workorg = swh.workgroup + "-" + swh.team;

						// 车号合并单元格
						if (swh.bus_number == last_bus_number) {
							var rowspan = parseInt($(busNumberId).attr(
									"rowspan"));
							var checkboxId = "#chk_" + swh.bus_number;
							$(busNumberId).attr("rowspan", rowspan + 1);
						} else {
							busNumberId = "#bus_" + swh.bus_number;
							$("<td id='bus_" + swh.bus_number + "' rowspan=1/>")
									.html(swh.bus_number).appendTo(tr);

						}

						// 操作班组合并单元格
						if (swh.bus_number == last_bus_number
								&& workorg == last_workorg) {
							var rowspan = parseInt($(workorgId).attr("rowspan"));
							$(workorgId).attr("rowspan", rowspan + 1);
						} else {
							$(
									"<td id='workorg_" + mergecount1
											+ "' rowspan=1/>").html(workorg)
									.appendTo(tr);
							workorgId = "#workorg_" + mergecount1;
							mergecount1++;

						}
						// 操作日期合并单元格
						if (swh.bus_number == last_bus_number
								&& workorg == last_workorg
								&& swh.work_date == last_workdate) {

							var ids = $(bonusInputId).find(".bonus")
									.attr("ids");
							ids += "," + swh.id;

							var rowspan = parseInt($(workdateId)
									.attr("rowspan"));
							$(workdateId).attr("rowspan", rowspan + 1);
							$(busDelId).attr("rowspan", rowspan + 1);
							$(bonusInputId).attr("rowspan", rowspan + 1);
							$(bonusInputId).find(".bonus").attr("ids", ids);
						} else {
							workdateId = "#wd_" + mergecount2;
							busDelId = "#wdel_" + mergecount2;
							bonusInputId = "#bonus_" + mergecount2;
							var bonus_num = parseFloat(swh.bonus);

							if (disabled == 'disabled') {
								$(
										"<td id='wdel_" + mergecount2
												+ "' rowspan=1/>").html("")
										.appendTo(tr);
							} else {
								$(
										"<td id='wdel_" + mergecount2
												+ "' rowspan=1/>")
										.html(
												"<button type=\"button\" orgId='"
														+ swh.org_id
														+ "' bus_number='"
														+ swh.bus_number
														+ "' class=\"close\" aria-label=\"Close\" del='all' rel=\"tooltip\" title='删除' ><span aria-hidden=\"true\">×</span></button>")
										.appendTo(tr);
							}
							$("<td id='wd_" + mergecount2 + "' rowspan=1/>")
									.html(swh.work_date).appendTo(tr);

							var input_html = "<input class='bonus' type='text'"
									+ disabled
									+ " value='"
									+ bonus_num
									+ "' ids='"
									+ swh.id
									+ "' bus_number='"
									+ swh.bus_number
									+ "' style='border:1;width:50px;text-align:center;font-size: 12px'>";
							// alert(input_html);
							$("<td id='bonus_" + mergecount2 + "' rowspan=1/>")
									.html(input_html).appendTo(tr);
							mergecount2++;
						}

						$("<td />").html(swh.staff_number).appendTo(tr);
						$("<td />").html(swh.staff_name).appendTo(tr);
						$("<td />").html(swh.job).appendTo(tr);
						$("<td />")
								.html(
										"<input class=\"work_hour\" type='text' style=\"border:1;width:50px;text-align:center;font-size: 12px\" "
												+ disabled
												+ " value='"
												+ swh.participation
												+ "' old_value='"
												+ swh.participation + "'>")
								.appendTo(tr);
						$("<td />")
						.html(
								"<input class=\"distribution\" type='text' style=\"border:1;width:50px;text-align:center;font-size: 12px\" "
										+ disabled
										+ " value='"
										+ (swh.distribution==undefined?"":swh.distribution)
										+ "' old_value='"
										+ (swh.distribution==undefined?"":swh.distribution) + "'>")
						.appendTo(tr);
						/*$("<td />")
						.html(swh.distribution==undefined?"":swh.distribution)
						.appendTo(tr);*/
						$("<td />")
								.html(swh.team_org + "-" + swh.workgroup_org)
								.appendTo(tr);
						$("<td />").html(swh.status).appendTo(tr);
						$("<td />").html(swh.approver).appendTo(tr);
						$("<td />").html(swh.approve_date).appendTo(tr);
						if (disabled == 'disabled') {
							$("<td />").html("").appendTo(tr);
						} else
							$("<td />")
									.html(
											"<button type=\"button\" class=\"close\" aria-label=\"Close\"  rel=\"tooltip\" title='删除' swhlist_index='"
													+ index
													+ "'><span aria-hidden=\"true\">×</span></button>")
									.appendTo(tr);
						$("#tb_workhour").append(tr);
						$(tr).data("swhid", swh.id);
						$(tr).data("swhlist_index", index);
						$(tr).data("bus_number", swh.bus_number);
						last_bus_number = swh.bus_number;
						last_workdate = swh.work_date;
						last_workorg = workorg;
					});
}
// 删除
function ajaxDelete(conditions) {
	// var conditions = "{swhid:'" + swhid + "'}";
	$.ajax({
		url : "pieceWorkTime!deleteWorkHourInfo.action",
		dataType : "json",
		async : false,
		type : "get",
		data : {
			"conditions" : conditions
		/*
		 * , "pager.pageSize" : 20, "pager.curPage" : targetPage || 1
		 */
		},
		success : function(response) {
			alert(response.message);
		}
	})
}
// 保存
function ajaxSave(conditions) {

	$.ajax({
		url : "pieceWorkTime!updateWorkHourInfo.action",
		dataType : "json",
		type : "post",
		data : {
			"conditions" : conditions,
			"whflag" : "update"
		},
		success : function(response) {
			if (response.success) {
				alert(response.message);
				ajaxQuery(1);
			} else {
				alert(response.message);
			}

		}
	});
}
function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	if (treeNode.name != '无数据权限' || treeNode.id != '0') {
		ajaxQuery(1);
	}

};