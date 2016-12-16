var swhlist = [];
var updateCond={};
var select_workshop="";
var select_factory="";
var status_arr={'1':'已审批','2':'已驳回','3':'已锁定'}
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
											//var orgId = $(this).attr("orgId");
											var factory=$(tr).data("factory");
											var workshop=$(tr).data("workshop");
											var workgroup=$(tr).data("workgroup");
											var team=$(tr).data("team");
											var bus_number = $(this).attr(
													"bus_number");
											var work_date = $(this)
													.parent("td").next("td")
													.html();
											// alert(work_date);
											var conditions = {
												"busNumber" : bus_number,
												"workDate" : work_date,
												"factory" : factory,
												"workshop":workshop,
												"workgroup":workgroup,
												"team":team
												
											};
											if (confirm("确认删除该车辆的工时数据？")) {
												ajaxDelete(JSON.stringify(conditions));
												ajaxQuery($("#cur").attr("page"));
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
												//ajaxDelete(JSON.stringify(swh_obj));
												swhlist.splice(index, 1);
					
												//ajaxQuery($("#cur").attr("page"));
												generateTb(swhlist,select_workshop);
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
					$(".bonus").live( "change", function(e) {
										var tr = $(e.target).closest("tr");
										var bus_number=$(tr).data("bus_number");
										var rows=$("#bus_"+bus_number).attr("rowspan");
										var first_tr=$("#bus_"+bus_number).parent("tr");
										var first_index=parseInt($(first_tr).data("swhlist_index"));
										var bonus_num = $(this).val();
										var bus_number = $(this).attr("bus_number");

										bonus_num = isNaN(parseFloat(bonus_num)) ? 0
												: parseFloat(bonus_num);
										var ids = $(this).attr("ids");
										var index = parseInt($(tr).data("swhlist_index"));
										var conditions = "{bus_number:'"
												+ bus_number + "',bonus:'"
												+ bonus_num + "',ids:'" + ids
												+"',workshop:'"+select_workshop
												+ "'}";
										if (!const_float_validate.test(bonus_num)) {
											alert("请输入数字！");
											$(this).val("");
										} else{
											for(var i=first_index;i<(first_index+rows);i++){
												swhlist[i].bonus = bonus_num;
												swhlist[i].status='1';
												}	
											}
											
									});
					// 查询事件
					$("#btnQuery").click(function() {
						ajaxQuery(1);
					});
					// 参与度验证是否数字
					$(".work_hour")
							.live(
									"change",
									function(e) {
										var tr = $(e.target).closest("tr");
										var bus_number=$(tr).data("bus_number");
										var rows=$("#bus_"+bus_number).attr("rowspan");
										var first_tr=$("#bus_"+bus_number).parent("tr");
										var first_index=parseInt($(first_tr).data("swhlist_index"));
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
											for(var i=first_index;i<(first_index+rows);i++){
												swhlist[i].status='1';
												
												}	
										}
									});
					//修改分配金额
					$(".distribution")
							.live(
									"change",
									function(e) {
										var tr = $(e.target).closest("tr");
										var bus_number=$(tr).data("bus_number");
										var rows=$("#bus_"+bus_number).attr("rowspan");
										var first_tr=$("#bus_"+bus_number).parent("tr");
										var first_index=parseInt($(first_tr).data("swhlist_index"));
										var distribution = $(this).val();
										var index = parseInt($(tr).data(
												"swhlist_index"));
										var old_value = $(this).attr(
												"old_value");
										//var const_par_validate = /^0(\.[0-9]*)?$|^1(\.[0]*)?$/;// 浮点数正则表达式
										
										if (!const_float_validate
												.test(distribution)) {
											alert("分配金额必须是数字！");
											$(this).val(old_value);
										} else if (old_value != distribution) {
											swhlist[index].distribution = distribution;	
											for(var i=first_index;i<=(first_index+rows);i++){
												swhlist[i].status='1';
												}
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
						var flag=validateDistribution();
						if(!flag){
							alert("分配金额之和必须等于班组承包单价！");
						}else{							
							ajaxSave(JSON.stringify(swhlist),"",JSON.stringify(updateCond));
							ajaxQuery(1);
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
	var team="";
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	if(treeNode.org_type != '6'){
		alert("请选择小班组！");
		return false;
	}

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
				team=treeNode.displayName;
			}
			treeNode = treeNode.getParentNode();
		}
		updateCond.factory=factory;
		updateCond.workshop=workshop;
		updateCond.workgroup=workgroup;
		updateCond.team=team;
		updateCond.busNumber=$("#bus_number").val();
		updateCond.startDate=$("#wdate_start").val();
		updateCond.endDate=$("#wdate_end").val();
		
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
				"conditions" : conditions/*,
				"pager.pageSize" : 20,
				"pager.curPage" : targetPage || 1*/
			},
			success : function(response) {
				swhlist = response.dataList;
				generateTb(swhlist,workshop);
				$(".divLoading").hide();
			/*	$("#total").html(response.pager.totalCount);
				$("#total").attr("total", response.pager.totalCount);
				$("#cur").attr("page", response.pager.curPage);
				$("#cur").html(
						"<a href=\"#\">" + response.pager.curPage + "</a>");
				$("#pagination").show();*/
			}
		});
	}

}

function generateTb(swhlist,workshop) {
	if(workshop=='自制件'){
		$("#lable_workhour").css("display","");
	}else{
		$("#lable_workhour").css("display","none");
	}
	$("#tb_workhour").html("");
	var last_bus_number = "";
	var last_order_id="";
	var last_workorg = "";
	var last_workdate = "";
	var busNumberId = "";
	var checkboxId = "";
	var workorgId = "";
	var priceId="";
	var workdateId = "";
	var bonusInputId = "";
	var busDelId = "";
	var mergecount1 = 0;
	var mergecount2 = 0;
	$
			.each(
					swhlist,
					function(index, swh) {
						var disabled = (swh.STATUS == '3' ||swh.STATUS == '1') ? 'disabled'
								: "";
						// alert(disabled);
						var tr = $("<tr />");
						// alert(workdateId);
						var workorg = swh.workgroup + "-" + swh.team;

						// 车号合并单元格
						if (swh.bus_number == last_bus_number&&swh.order_id==last_order_id) {
							var rowspan = parseInt($(busNumberId).attr(
									"rowspan"));
							var checkboxId = "#chk_" + swh.bus_number+"_"+swh.order_id;
							$(busNumberId).attr("rowspan", rowspan + 1);
						} else {
							busNumberId = "#bus_" + swh.bus_number+"_"+swh.order_id;;
							$("<td id='bus_" + swh.bus_number +"_"+swh.order_id+ "' rowspan=1/>")
									.html(swh.bus_number).appendTo(tr);

						}

						// 操作班组合并单元格
						if (swh.bus_number == last_bus_number&&swh.order_id==last_order_id
								&& workorg == last_workorg) {
							var rowspan = parseInt($(workorgId).attr("rowspan"));
							$(workorgId).attr("rowspan", rowspan + 1);
							$(priceId).attr("rowspan", rowspan + 1);
						} else {
							$(
									"<td id='workorg_" + mergecount1
											+ "' rowspan=1/>").html(workorg)
									.appendTo(tr);
							$(
									"<td id='price_" + mergecount1
											+ "' rowspan=1/>").html(swh.standard_price)
									.appendTo(tr);
							workorgId = "#workorg_" + mergecount1;
							priceId="#price_"+mergecount1;
							mergecount1++;

						}
						// 操作日期合并单元格
						if (swh.bus_number == last_bus_number&&swh.order_id==last_order_id
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
												"<button type=\"button\" "
														+ " bus_number='"
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
						if(workshop=='自制件'){
							$("<td />")
							.html(
									"<input class=\"work_hour\" type='text' style=\"border:1;width:50px;text-align:center;font-size: 12px\" "
											+ disabled
											+ " value='"
											+ swh.participation
											+ "' old_value='"
											+ swh.participation + "'>")
							.appendTo(tr);
						}
						
						$("<td />")
						.html(
								"<input class=\"distribution\" type='text' style=\"border:1;width:50px;text-align:center;font-size: 12px\" "
										+ disabled
										+ " value='"
										+ (swh.distribution==undefined?"":swh.distribution)
										+ "' old_value='"
										+ (swh.distribution==undefined?"":swh.distribution) + "'>")
						.appendTo(tr);
						
					/*	$("<td />").html(swh.ppay||"").appendTo(tr);
						*/
						/*$("<td />")
						.html(swh.distribution==undefined?"":swh.distribution)
						.appendTo(tr);*/
						$("<td />")
								.html(swh.team_org + "-" + swh.workgroup_org)
								.appendTo(tr);
						$("<td />").html(status_arr[swh.status]).appendTo(tr);
						/*$("<td />").html(swh.approver).appendTo(tr);
						$("<td />").html(swh.approve_date).appendTo(tr);*/
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
						$(tr).data("factory", swh.factory);
						$(tr).data("workshop", swh.workshop);
						$(tr).data("workgroup", swh.workgroup);
						$(tr).data("team", swh.team);
						last_bus_number = swh.bus_number;
						last_order_id=swh.order_id;
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
function ajaxSave(conditions,whflag,updateCond) {

	$.ajax({
		url : "pieceWorkTime!updateWorkHourInfo.action",
		dataType : "json",
		type : "post",
		async:false,
		data : {
			"conditions" : conditions,
			"whflag" : whflag,
			"updateCond":updateCond
		},
		success : function(response) {
			if (response.success) {
				alert(response.message);
				
				var emaillist=[];
				var datalist=JSON.parse(conditions);						
				$.each(datalist,function(i,swh){
					var obj={};
					obj['车号']=swh.bus_number;
					obj['操作班组']=swh.workgroup+"-"+swh.team;
					obj['承包单价']=swh.standard_price||'0';
					obj['操作日期']=swh.work_date;
					obj['补贴车']=swh.bonus||'0';
					obj['工号']=swh.staff_number;
					obj['姓名']=swh.staff_name;
					obj['岗位']=swh.job;
					obj['分配金额']=swh.distribution||'0';
					obj['工时']=swh.participation||'0';
					obj['计件工资']=swh.ppay||'0';
					obj['班组']=swh.workgroup_org+"-"+swh.team_org;
					
					emaillist.push(obj);
				})
				var tbhead='车号,操作班组,承包单价,操作日期,补贴车,工号,姓名,岗位,分配金额,班组';
				if(select_workshop=='自制件'){
					tbhead='车号,操作班组,承包单价,操作日期,补贴车,工号,姓名,岗位,工时,分配金额,班组';
				}
				sendEmail(datalist[0].email,'',select_factory+select_workshop+"车间"+'计件工时信息已修改',tbhead,JSON.stringify(emaillist),'')				
				
			} else {
				alert(response.message);
			}

		}
	});
}
function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	if(treeNode.org_type == '4'){
		select_workshop=treeNode.displayName;
	}
	if(treeNode.org_type == '5'){
		select_workshop=treeNode.getParentNode().displayName;
	}
	if(treeNode.org_type == '6'){
		select_factory=treeNode.getParentNode().getParentNode().getParentNode().getParentNode().displayName;
		select_workshop=treeNode.getParentNode().getParentNode().displayName;
	}
	if (treeNode.name != '无数据权限' || treeNode.id != '0') {
		ajaxQuery(1);
	}

};

/**
 * 校验每一台车每天所有人的分配金额之和是否等于班组承包单价
 */
function validateDistribution(){
	var flag=true;
	var standar_price_arr={};
	var total_distribution_arr={};
	var last_bus_number="";
	var last_order_id="";
	var last_work_date="";
	var arr_count=0;
 
	for(var i in swhlist){
		
		if(swhlist[i].bus_number!=last_bus_number||swhlist[i].work_date!=last_work_date||swhlist[i].order_id!=last_order_id){
			standar_price_arr[arr_count]=parseFloat(swhlist[i].standard_price);
			total_distribution_arr[arr_count]=parseFloat(swhlist[i].distribution);
			arr_count++;
		}else{
			total_distribution_arr[arr_count-1]=numAdd(total_distribution_arr[arr_count-1],parseFloat(swhlist[i].distribution));
		}
		last_bus_number=swhlist[i].bus_number;
		last_order_id=swhlist[i].order_id;
		last_work_date=swhlist[i].work_date;		
	}
	
	for(var j in standar_price_arr){
		if(standar_price_arr[j]!=total_distribution_arr[j]){
			flag=false;
			return false;
		}
	}
	return flag;
}
