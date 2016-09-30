$(document)
		.ready(
				function() {
					initPage();

					// 新增额外工时
					$(".addWorkhour").live("click", function() {
						if ($("#mta_wdate").val().trim() == "") {
							alert("请选择操作日期！");
						} else {
							addWorkHourItem();
						}
					});
					$(".work_hour").live("keydown",function(event){
						if (event.keyCode == "13") {								
							$(this).parent().parent().next().find(".work_hour").focus();
						}
					})
					
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
											$(tr).data("skill_parameter",staff.skill_parameter);
										}
									});
					// 工时删除
					$(".close").live("click", function(e) {
						$(e.target).closest("tr").remove();
					});
					// 参与度验证是否数字
					$(".work_hour").live( "change",
									function(e) {
											var tr = $(e.target).closest("tr");
											var participation = $(this).val();
											var staffNum = $(tr).find(".card_num")
													.val();
											var const_par_validate= /^0(\.[0-9])?$|^1(\.[0-5])?$/;//浮点数正则表达式
											/*var conditions = "{staffNum:'"
													+ staffNum + "',workDate:'"
													+ $("#mta_wdate").val()
													+ "',busNumber:'"
													+ $("#bus_number").val() + "'}";
											var sfwlist = ajaxGetStaffWorkHours(conditions);*/
											
											var workshop ="";
											var nodes = zTreeObj.getSelectedNodes();
											var treeNode = nodes[0];
											if(treeNode.org_type == '4'){
												workshop=treeNode.displayName;
											}
											if(treeNode.org_type == '5'){
												workshop=treeNode.getParentNode().displayName;
											}
											if(treeNode.org_type == '6'){
												workshop=treeNode.getParentNode().getParentNode().displayName;
											}
											//alert(workshop);
											/*if ($("#mta_wdate").val().trim().length > 0
													&& sfwlist.length > 0) {
												alert("不能重复维护工时！");
												//$(tr).remove();
											} else*/ if (!const_par_validate
													.test(participation)&&workshop!='自制件') {
												alert("参与度必须是介于0到1.5之间的数字，且最多只能保留一位小数！");
												$(this).val("");
											}else if(workshop=='自制件'&&!const_float_validate
													.test(participation)){
												alert("工时只能是数字");
												$(this).val("");
											}							
									
									});
					// 分配比例检验是否数字
					$(".distribution").live( "input",
									function(e) {
											var tr = $(e.target).closest("tr");
											var distribution = $(this).val();
											var staffNum = $(tr).find(".card_num")
													.val();
											var const_par_validate= /^0(\.[0-9]*)?$|^1(\.[0]*)?$/;//浮点数正则表达式
											
											if (!const_par_validate.test(distribution)) {
												alert("分配比例必须是介于0到1之间的数字！");
												$(this).val("");
											}							
									
									});
					//补贴车输入值校验
					$("#bonus_num").live( "keyup", function(e) {
								var bonus_num=$("#bonus_num").val();
								if(!const_float_validate.test(bonus_num)){
									alert("请输入数字！");
									$(this).val("");
								}
							});
					
					// 保存
					$("#btnSave")
							.click(
									function() {
										var inputlist = $("#table_workhour input[class='input-small card_num']");
										var org ="";
										var factory="";
										var dept="";
										var workshop ="";	
										var workgroup="";
										var team="";
										var nodes = zTreeObj.getSelectedNodes();
										var treeNode = nodes[0];
										if(treeNode.org_type == '6'){
											org = treeNode.id;
											workshop=treeNode.getParentNode().getParentNode().displayName;
											factory=treeNode.getParentNode().getParentNode().getParentNode().getParentNode().displayName;
											dept=treeNode.getParentNode().getParentNode().getParentNode().displayName;
											workgroup=treeNode.getParentNode().displayName;
											team=treeNode.displayName;
										}
										var isCustomer=treeNode.is_customer;
										var bonus_num=isNaN(parseFloat($("#bonus_num").val()))?0:parseFloat($("#bonus_num").val());
										//alert(workshop);
										var busNumber = $("#bus_number").val();
										var busCount=1;
										var bus_start;
										var bus_end;
										if(workshop=='自制件'){
											var area=busNumber.split("_");
											if(area.length<=1){
												alert("输入格式不正确，自编号格式为：车型-订单_起始号-结束号！");
												return false;
											}
											if(area[1].split("-").length>1){
												bus_start=area[1].split("-")[0];
												bus_end=area[1].split("-")[1];
												if(isNaN(parseInt(bus_start))||isNaN(parseInt(bus_end))){
													alert("起始号和结束号必须为数字！");
													return false;
												}else{
													busCount=parseInt(bus_end,0)-parseInt(bus_start,0)+1;
												}
											}
											
										}
										
										var total_distribution=0;
										
										//alert(busCount);
									/*	workshop = $("#workshop").find(
												"option:selected").text();*/
										var workDate = $("#mta_wdate").val();
										var stafflist = [];
										var saveFlag = true;
										if (org == "") {
											alert("请选择小班组！");
										} else if (busNumber.trim().length == 0) {
											alert("请填写车号！");
										}else if(busCount<0){
											alert("结束号必须大于起始号");
										} else if (workDate.trim().length == 0) {
											alert("请填写操作日期");
										} else {
											var staffNumlist="";
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
																var participation = $(
																		tr)
																		.find(
																				".work_hour")
																		.val();
																var distribution=$(tr).find(".distribution").val();
																total_distribution+=Number(distribution)
																if (staffId != undefined
																		&& staffId
																				.trim().length > 0/*&&participation !=0*/) {
																	var staff = {};
																	staff.factory=factory;
																	staff.dept=dept;
																	staff.workshop = workshop;
																	staff.workgroup=workgroup;
																	staff.team=team;
																	staff.busNumber = busNumber.trim();
																	staff.workDate = workDate;
																	staff.staffId = staffId;
																	staff.subgroupId = org;
																	staff.isCustomer=isCustomer;
																	staff.participation = participation;
																	staff.distribution=distribution;
																	staff.skillParameter=$(tr).data("skill_parameter");
																	staff.bonus=bonus_num;
																	staff.busCount=busCount;
																	if(!isContain(staff,stafflist)){
																		stafflist.push(staff);
																	}else{
																		saveFlag=false;
																		alert("不能重复维护工时！");
																		return false;
																	}			
																}
																if (participation == ''
																		|| participation
																				.trim().length == 0) {
																	saveFlag = false;
																	alert("参与度不能为空！");
																	return false;
																}
																var staffNum = $(
																		input)
																		.val();	
																staffNumlist+=staffNum+","
															});
											var conditions = "{staffNum:'"
												+ staffNumlist
												+ "',workDate:'"
												+ $(
														"#mta_wdate")
														.val()
												+ "',busNumber:'"
												+ $(
														"#bus_number")
														.val()
												+ "'}";	
											var sfwlist = ajaxGetStaffWorkHours(conditions);
											if (sfwlist.length > 0) {
												//$(tr).remove();
												saveFlag = false;
												alert("不能重复维护工时！");
												return false;
											}
											/*
											 * 判断分配比例之和是否等于1
											 */
											if(total_distribution.toFixed(3)!=1){
												saveFlag = false;
												alert("分配比例之和必须等于1！");
												return false;
											}
											
											if (saveFlag ) {
												if(stafflist.length > 0){
													ajaxSave(JSON.stringify(stafflist));
												}else{
													alert("无数据保存！");
												}
												
											}
										}
										
									});
				});

function initPage() {
	getOrgAuthTree($("#workGroupTree"),"1,2,3,4,5,6",'1');
	getBusNumberSelect('#bus_number');
/*	getAuthorityFactorySelect("#factory", "", "noall");
	var selectFactory = $("#factory :selected").text();
	var defaultWorkshop = $("#d_workshop").val();
	var defaultWorkgourp = $("#d_workgroup").val();
	var defaultTeam = $("#d_team").val();
	getWorkshopSelect_Org("#workshop", defaultWorkshop, selectFactory, "empty");
	// $("#workshop").attr("disabled",true);
	var workshop = $("#workshop").val();
	getChildOrgSelect("#group", workshop, defaultWorkgourp, "empty");
	var group = $("#group").val();
	getChildOrgSelect("#subgroup", group, defaultTeam, "empty");*/
	//ajaxGetStaffList();
	// 展开侧边栏
	$("#pieceWorkTime").find(".treemenu").addClass("collapsed");
	$("#piece_work").addClass("in");
	var span = $("#pieceWorkTime").find(".pull-right.fa");
	if ($(span).hasClass("fa-angle-down")) {
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}
}

function addWorkHourItem(staffId, cardNo, staffName, staffPost, workHour,
		subgroup, group, workshop, factory,skillParameter,distribution) {
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
	$("<td />")
	.html(
			"<input class='input-small distribution' id='dist_"+staffId+"' style='text-align:center;margin-bottom: 0px;' type='text' value="
					+distribution+  " >").appendTo(tr);
	$("<td class='staff_subgroup' />").html(subgroup).appendTo(tr);
	$("<td class='staff_group' />").html(group).appendTo(tr);
	$("<td class='staff_workshop' />").html(workshop).appendTo(tr);
	$("<td class='staff_factory' />").html(factory).appendTo(tr);
	$(tr).data("skill_parameter",skillParameter)
	$("#tb_workhour").append(tr);
}

function ajaxSave(conditions) {
	$(".divLoading").addClass("fade in").show();
	$('#btnSave').attr("disabled",true);
	$.ajax({
		url : "pieceWorkTime!saveWorkHourInfo.action",
		dataType : "json",
		async:false,
		type : "post",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			$(".divLoading").hide();
			alert(response.message);
			$('#btnSave').attr("disabled",false);
		}
	});
}

function ajaxGetStaffWorkHours(conditions) {
	var swhlist;
	$.ajax({
		url : "pieceWorkTime!getStaffWorkHours.action",
		dataType : "json",
		async : false,
		type : "get",
		data : {
			"conditions" : conditions,
			"pager.pageSize":20,
			"pager.curPage":1
		},
		success : function(response) {
			swhlist = response.dataList;
		}
	});
	return swhlist;
}

function ajaxGetStaffList() {
/*	var factory = $("#factory").find("option:selected").text();
	var workshop = $("#workshop").find("option:selected").text();
	var workgroup = $("#group").find("option:selected").text();
	var subgroup = $("#subgroup").find("option:selected").text();*/
	var stafflist;
	var workDate=$("#mta_wdate").val();
	var factory = "";
	var workshop = "";
	var workgroup = "";
	var subgroup = "";
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	while (treeNode!=null){
		if(treeNode.org_type == '1'||treeNode.org_type == '2'){
			factory = treeNode.displayName;
		}
		if(treeNode.org_type == '4'){
			workshop = treeNode.displayName;
		}
		if(treeNode.org_type == '5'){
			workgroup = treeNode.displayName;
		}
		if(treeNode.org_type == '6'){
			subgroup = treeNode.displayName;
		}
		treeNode = treeNode.getParentNode();
	}
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "common!getStaffInfo.action",
		async :false,
		data : {
			"factory" : factory,
			"workshop" : workshop,
			"workgroup" : workgroup,
			"subgroup" : subgroup,
			"workDate":workDate
		},
		success : function(response) {
			stafflist = response;
		}
	})
	return stafflist;
}

//改变操作日期更新分配比例
function ajaxGetDist(){
	var stafflist=ajaxGetStaffList();
	$.each(stafflist, function(index, staff) {
		$("#dist_"+staff.id).val(staff.distribution);
	});
}

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	var workshop="";
	if(treeNode.org_type == '4'){
		workshop=treeNode.displayName;
	}
	if(treeNode.org_type == '5'){
		workshop=treeNode.getParentNode().displayName;
	}
	if(treeNode.org_type == '6'){
		workshop=treeNode.getParentNode().getParentNode().displayName;
	}
	//alert(workshop);
	//alert(treeNode.is_customer);
	if(workshop=="自制件"){
		$("#bus_label").html("自编号：");
		$("#bus_number").attr("placeholder","如：K7-CS_0001-0010");
		$("#td_part").html("工时");
	}else if(workshop=="部件"){
		$("#bus_label").html("自编号：");
		$("#bus_number").attr("placeholder","");
		$("#td_part").html("参与度");
	}else{
		$("#bus_number").attr("placeholder","");
		if(treeNode.is_customer=='1'){
			$("#bus_label").html("自编号：");			
		}else{
			$("#bus_label").html("车号：");
		}
		$("#td_part").html("参与度");
	}
	if(treeNode.org_type != '6'){
		alert("请选择小班组！");
		return false;
	}else{
		var list=ajaxGetStaffList();
		$("#tb_workhour").html("");
		$.each(list, function(index, staff) {
			// alert(staff.id);
		addWorkHourItem(staff.id, staff.staff_number, staff.name,
					staff.job, "", staff.team_org, staff.workgroup_org,
					staff.workshop_org, staff.plant_org,staff.skill_parameter,staff.distribution)
		});
	}
	
};