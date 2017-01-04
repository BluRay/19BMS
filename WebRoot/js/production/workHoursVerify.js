var status_arr = {
	"0" : "已创建",
	"2" : "已分配",
	"3" : "已评估",
	"5" : "已完成",
	"6" : "已驳回"
};
var wh_status_arr={'1':'已审批','2':'已驳回','3':'已锁定'}
var edit_list = [];
var workhour_list=[];
var ready_hour = 0;
$(document).ready(function() {
	initPage();

	// 点击查询
	$("#btnQuery").live("click", function() {
		var targetPage = $("#cur").attr("page") || 1;
		ajaxQuery(targetPage);
	});
	$(".fa-pencil").live("click", function(e) {
		var d = new Date();
		var eYear = d.getFullYear();
		var eMon = d.getMonth() + 1;
		var workMonth=eYear+"-"+(eMon<10?"0"+eMon:eMon);
		var tr = $(e.target).closest("tr");
		var tds = $(tr).children("td");
		var type = $(e.target).attr("data-original-title");
		var orderNo = $(tr).data("orderNo");
		var reason = $(tds[2]).html();
		var totalQty=$(tds[3]).html();
		var singleHour=$(tds[5]).html();
		var labors=$(tds[6]).html();
		var totalHour=$(tr).data("totalHour");
		edit_list = [];
		ready_hour = 0;
		var conditions = "{tempOrderId:'" + $(tr).data("id") +"',workMonth:'"+workMonth+ "'}";
		workhour_list = ajaxGetStaffWorkHours(conditions);
		generateWorkhourTb(workhour_list,true);
		$("#edit_workDate").val(workMonth);
		$("#edit_orderNo").html(orderNo);
		$("#edit_reason").html(reason);
		$("#edit_totalQty").html(totalQty);
		$("#edit_singleHour").html(singleHour);
		$("#edit_labors").html(labors);
		$("#edit_totalHour").html(totalHour);
		$("#editModal").data("orderId", $(tr).data("id"));
		$("#editModal").data("totalHour", $(tr).data("totalHour"));
		$("#editModal").data("factory", $(tr).data("factory"));
		$("#editModal").data("workshop", $(tr).data("workshop"));

		if(workhour_list.length==0){
			$("#btnVerify").attr("disabled",true);
			$("#btnReject").attr("disabled",true);
		}else{
			$("#btnVerify").attr("disabled",false);
			$("#btnReject").attr("disabled",false);
		}
		$("#editModal").modal("show");

	});
	$("#btnSwhQuery").live("click",function(){
		var staffNum=$("#edit_cardNumber").val();
		var workDate=$("#edit_workDate").val();
		var tempOrderId=$("#editModal").data("orderId");
		var conditions="{staffNum:'"+staffNum+"',workMonth:'"+workDate+"',tempOrderId:"+tempOrderId+"'}";
		if(workDate==''||workDate==null){
			alert("请选择操作月份！");
			return false;
		}
		workhour_list=ajaxGetStaffWorkHours(conditions);
		if(workhour_list.length==0){
			$("#btnVerify").attr("disabled",true);
			$("#btnReject").attr("disabled",true);
		}else{
			$("#btnVerify").attr("disabled",false);
			$("#btnReject").attr("disabled",false);
		}
		generateWorkhourTb(workhour_list,true);
	});
	//复选框全选、反选
	$("#checkall").click(function(){
		if($(this).attr("checked")=="checked"){
			check_All_unAll("#work_hour_tb", true) ;
		}else
		check_All_unAll("#work_hour_tb", false) ;		
	});
	// 批准
	$("#btnVerify").click(function() {
		var edit_list=getSelectList();
		var orderStaus="verify";
		var trs=$("#workhour_list").children("tr");
		var workDate=$("#edit_workDate").val();
		var conditions={};
		conditions.factory=$("#editModal").data("factory");
		conditions.workshop=$("#editModal").data("workshop");
		conditions.workMonth=workDate;
		$.each(trs,function(index,tr){
			var c_checkbox=$(tr).find('input[type=checkbox]');
			var status=$(tr).data("status");
			var ischecked=$(c_checkbox).is(":checked");
			if(status=='已驳回'&&!ischecked){
				orderStaus="reject";
			}
		});
		if(workDate==''||workDate==null){
			alert("请选择操作月份！");
			return false;
		}
		if(edit_list.length>0){
			ajaxUpdate(JSON.stringify(edit_list),JSON.stringify(conditions),"verify",$("#editModal").data("orderId"),orderStaus);
		}else{
			alert("请选择工时信息！");
		}	
		$("#editModal").modal("hide");
	});
	// 驳回
	$("#btnReject").click(function() {
		$("#reasonModal").modal("show");
		
	});
	//输入驳回原因确认后驳回
	$("#btnMtaSave").live("click",function(){
		var workDate=$("#edit_workDate").val();
		var conditions={};
		conditions.factory=$("#editModal").data("factory");
		conditions.workshop=$("#editModal").data("workshop");
		conditions.workMonth=workDate;
		var edit_list=getSelectList();
		if(workDate==''||workDate==null){
			alert("请选择操作月份！");
			return false;
		}
		var rejectReason=$("#reject_reason").val();
		if(rejectReason){
			if(edit_list.length>0){
				ajaxUpdate(JSON.stringify(edit_list),JSON.stringify(conditions),"reject",$("#editModal").data("orderId"),"reject",rejectReason);
				$("#editModal").modal("hide");
			}			
		}else{
			alert("请输入驳回原因！");
			
		}		
	});
	
	$("#q_factory").change(
			function(e) {
				var eleId=$(e.target).attr("id");
				var selectFactory = $("#"+eleId+" :selected").text();
				var workshopEleId="#q_workshop";
				getWorkshopSelect_Auth(workshopEleId, null,
						selectFactory, "");
			});
});

function initPage() {
	getAuthorityFactorySelect("#q_factory", "", "noall");
	getWorkshopSelect_Auth("#q_workshop", "", $("#q_factory :selected").text(), "");
	// 默认已创建
	$("#status").val("4");
	$("#tempOrder").find(".treemenu").addClass("collapsed");
	$("#tmp_order").addClass("in");
	var span=$("#tempOrder").find(".pull-right.fa");
	if($(span).hasClass("fa-angle-down")){
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}
	/*ajaxQuery(1);*/
}

function ajaxQuery(targetPage) {
	var orderNo = $('#tmp_order_no').val();
	var applyDateStart = $('#create_start').val();
	var applyDateEnd = $('#create_end').val();
	var status = $('#status').val();
	var factory=$("#q_factory :selected").text();
	var workshopAll="";
	$("#q_workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	//alert(workshopAll);
	var workshop=$("#q_workshop :selected").text()=="全部"?workshopAll:$("#q_workshop :selected").text();
	var conditions = "{orderNo:'" + orderNo + "',applyDateStart:'"
			+ applyDateStart + "',applyDateEnd:'" + applyDateEnd + "',hourstatus:'"
			+ status +"',actionType:'hourVerify"+ "',factory:'"+factory+"',workshop:'"+workshop+"'}";
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
									response.rows,
									function(index, value) {
										var tmpOrderNum = value.tmp_order_no == undefined ? ""
												: value.tmp_order_no;
										var tmpOrderSerial = value.order_serial_no;
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
										var totalHour = parseFloat(totalQty)*parseFloat(singleHour);
										var stauts = value.status == undefined ? ""
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
										var readyQty=value.finished_qty==undefined?0:value.finished_qty;
										var workhourTotal=value.workhour_total==undefined?0:value.workhour_total;
						
										var tr = $("<tr />");
										$("<td />").html("<a href=\"javascript:void(window.open('tempOrder!tempOrderInfoPage.action?tempOrderId="+value.id+
												"','newwindow','width=700,height=600,toolbar= no,menubar=no,scrollbars=no,resizable=no,location=no,status=no,top=150,left=280'))\" style='cusor:pointer'>"+tmpOrderSerial+"</a>").appendTo(tr);
										$("<td />").html(sapOrder).appendTo(tr)
										$("<td />").html(reasonContent)
												.appendTo(tr);
										$("<td />").html(totalQty).appendTo(tr);
										$("<td />").html(readyQty).appendTo(tr);
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
									/*	$("<td />").html(approver).appendTo(tr);
										$("<td />").html(approveDate).appendTo(
												tr)*/
										/*$("<td />").html(stauts).appendTo(tr);*/
										if(singleHour.trim().length==0){
											$("<td />") .html("").appendTo(tr);		
										}else{
											$("<td />") .html(
											"<i name='edit' rel=\"tooltip\" title='工时审核' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>")
									.appendTo(tr);
										}
										
										
										$("#tableResult tbody").append(tr);
										$(tr).data("id", value.id);
										$(tr).data("totalHour", totalHour);
										$(tr).data("orderNo", tmpOrderSerial);
										$(tr).data("sapOrder", sapOrder);
										$(tr).data("factory", value.factory);
										$(tr).data("workshop", value.workshop);
										$(tr).data("approverCardNo",
												approverCardNo);
										$(tr).data("approverId", approverId);
										$(tr).data("approver", approver);
									});
					$("#tableResult").show();
					$("#total").html(response.toal);
					$("#total").attr("total", response.total);
					$("#cur").attr("page", response.curPage);
					$("#cur").html(
							"<a href=\"#\">" + response.curPage + "</a>");
					$("#pagination").show();

					$("#checkall").attr("checked", false);

				}

			});
}
function ajaxGetStaffWorkHours(conditions) {
	var swhlist;
	$.ajax({
		url : "tempOrder!getStaffWorkHours.action",
		dataType : "json",
		async : false,
		type : "get",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			swhlist = response.dataList;
		}
	});
	return swhlist;
}

function getSelectList(){
	var boxList=$("#workhour_list :checked");
	var swhList=[];
	$.each(boxList,function(index,box){
		var obj={};
		var tr=$(box).closest("tr");
		var listindex=parseInt($(tr).data("swhlist_index"));
		alert(workhour_list[listindex].staff_name);
		var swhid=$(tr).data("id");
		obj=workhour_list[listindex];
		/*obj.id=swhid;
		obj.email=$(tr).data("email");*/
		swhList.push(obj);
	});
	return swhList;
}

function ajaxUpdate(swhlist,conditions,whflag,tempOrderId,orderStatus,rejectReason) {
	var targetPage = $("#cur").attr("page") || 1;
	$.ajax({
		url : "tempOrder!updateWorkHourInfo.action",
		dataType : "json",
		async:false,
		type : "post",
		data : {
			"conditions" : swhlist,
			"whflag":whflag,
			"tempOrderId":tempOrderId,
			"tempOrderStaus":orderStatus
		},
		success : function(response) {
			if (response.success) {
				ajaxCaculateSalary(conditions);
				alert(response.message);
				if(whflag=='reject'){
					var emaillist=[];
					var datalist=JSON.parse(swhlist);
					$.each(datalist,function(i,swh){
						var obj={};
						obj['工号']=swh.staff_number;
						obj['姓名']=swh.staff_name;
						obj['岗位']=swh.job;
						obj['额外工时']=swh.work_hour;
						obj['小班组']=swh.team_org;
						obj['班组']=swh.workgroup_org;
						obj['车间']=swh.workshop_org;
						obj['工厂']=swh.plant_org==null?"":swh.plant_org;
						obj['操作日期']=swh.work_date;
						emaillist.push(obj);
					})
					//alert(JSON.stringify(emaillist))
					sendEmail(datalist[0].email,'',"派工流水号"+$("#edit_orderNo").html()+'额外工时信息驳回','工号,姓名,岗位,额外工时,小班组,班组,车间,工厂,操作日期',JSON.stringify(emaillist),rejectReason)
					$("#reasonModal").modal("hide");
				}
				ajaxQuery(targetPage);
			} else {
				alert(response.message);
			}

		}
	});
}
//批准、驳回时重新计算临时派工单工资
function ajaxCaculateSalary(conditions) {
	$.ajax({
		url : "tempOrder!caculateSalary.action",
		dataType : "json",
		type : "post",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			if (response.success) {
				
			} else {
				alert(response.message);
			}

		}
	});
}
/*
 * caculate: true 计算已分配工时合计
 */
function generateWorkhourTb(swhlist,caculate) {
	ready_hour=0;
	caculate=caculate||false;
	$("#workhour_list").html("");
	$.each(swhlist, function(index, swh) {
		var tr = $("<tr style='padding:5px'/>");
		if (wh_status_arr[swh.status] == "已锁定") {
			$("<td />").html(wh_status_arr[swh.status]).appendTo(tr);
		} else {
			$("<td />").html("<input type='checkbox' >").appendTo(tr);
		}
		$("<td />").html(swh.staff_number).appendTo(tr);
		$("<td />").html(swh.staff_name).appendTo(tr);
		$("<td />").html(swh.job).appendTo(tr);
		$("<td />").html(swh.work_hour).appendTo(tr);
		$("<td />").html(swh.team_org).appendTo(tr);
		$("<td />").html(swh.workgroup_org).appendTo(tr);
		$("<td />").html(swh.workshop_org).appendTo(tr);
		$("<td />").html(swh.plant_org).appendTo(tr);
		$("<td />").html(wh_status_arr[swh.status]).appendTo(tr);
		$("<td />").html(swh.work_date).appendTo(tr);
		$("#workhour_list").append(tr);
		$(tr).data("id", swh.id);
		$(tr).data("swhlist_index", index);
		$(tr).data("email", swh.email);
		$(tr).data("status", swh.status);
		if(caculate){
			ready_hour += parseFloat(swh.work_hour);
		}
		
	});
	var tr = $("<tr style='padding:5px'/>");
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td colspan=2 style='text-align:right'/>").html("合计工时：").appendTo(tr);
	$("<td />").html(ready_hour.toFixed(2)).appendTo(tr);
	$("#workhour_list").append(tr);
}
