var swhlist=[];
var swhupdatelist=[];
var status_arr={'0':'已维护','1':'已审批','2':'已驳回','3':'已锁定'}
var select_workshop="";
$(document).ready(function(){
	initPage();
	// 工时删除
	$(".close").live("click", function(e) {
		var tr=$(e.target).closest("tr");
		var index=parseInt($(e.target).attr("swhlist_index"));
		var swhid=$(tr).data("swhid");
		if(confirm("确认删除该条数据？")){
			ajaxDelete(swhid);
			swhlist.splice(index,1);
			generateTb(swhlist);
		}

	});
	
	// 查询事件
	$("#btnQuery").click(function(){
		ajaxQuery(1);
	});
	//参与度验证是否数字
	$(".work_hour") .live( "change",function(e){
		var tr=$(e.target).closest("tr");
		var workHour=$(this).val();
		var index=parseInt($(tr).data("swhlist_index"));
		var old_value=$(this).attr("old_value");
		 if(!const_float_validate.test(workHour)){
			alert("等待工时只能是数字！");
			$(this).val(old_value);
		}else if(old_value!=workHour){
			swhlist[index].workHour=workHour;
			var staff = {};
			staff.id=swhlist[index].id;
			staff.workHour=swhlist[index].workHour;
			swhupdatelist.push(staff);
		}
	});
	//复选框全选、反选
	$("#checkall").click(function(){
		if($(this).attr("checked")=="checked"){
			check_All_unAll("#table_workhour", true) ;
		}else
		check_All_unAll("#table_workhour", false) ;		
	});
	
	// 批准
	$("#btnVerify").click(function() {
		var edit_list=getSelectList();
		if(!edit_list){
			return false;
		}
		if(edit_list.length>0){
			ajaxUpdate(JSON.stringify(edit_list),"verify");			
		}
		
	});
	// 驳回
	$("#btnReject").click(function() {
		
		$("#reasonModal").modal("show");
		
		
	});
	//输入驳回原因确认后驳回
	$("#btnMtaSave").live("click",function(){
		var edit_list=getSelectList();	
		if(!edit_list){
			return false;
		}
		var rejectReason=$("#reject_reason").val();
		if(rejectReason){
			if(edit_list.length>0){
				ajaxUpdate(JSON.stringify(edit_list),"reject",rejectReason);
				$("#reasonModal").modal("hide");
			}			
		}else{
			alert("请输入驳回原因！");
		}
	});
});

function initPage(){
	getOrgAuthTree($("#workGroupTree"),"1,2,3,4,5,6",'1');
/*	getAuthorityFactorySelect("#factory", "", "noall");
	$("#waitReason").val("");
	var selectFactory = $("#factory :selected").text();
	var defaultWorkshop=$("#d_workshop").val();
	var defaultWorkgourp=$("#d_workgroup").val();
	var defaultTeam=$("#d_team").val();
	getWorkshopSelect_Org("#workshop", defaultWorkshop, selectFactory, "noall");
	var workshop = $("#workshop").val();
	getChildOrgSelect("#group", workshop, defaultWorkgourp, "noall");
	var group = $("#group").val();
	getChildOrgSelect("#subgroup", group, defaultTeam, "noall");*/
	$("#checkall").attr("checked", false);

	var d = new Date();
	var eYear = d.getFullYear();
	var eMon = d.getMonth() + 1;
	var eDay = d.getDate();
	d.setDate(eDay-7);
	endDate=(eYear)+"-"+(eMon<10?"0"+eMon:eMon)+"-"+(eDay<10 ? "0"+ eDay : eDay);
	var sYear=d.getFullYear();
	var sMon = d.getMonth() + 1;
	var sDay = d.getDate();
	startDate=(sYear)+"-"+(sMon<10?"0"+sMon:sMon)+"-"+(sDay<10 ? "0"+ sDay : sDay);
	$("#wdate_end").val(endDate);
	$("#wdate_start").val(startDate);
	
	/*ajaxQuery(1);*/
	// 展开侧边栏
	$("#waitWorkTime").find(".treemenu").addClass("collapsed");
	$("#wait_work").addClass("in");
	var span=$("#waitWorkTime").find(".pull-right.fa");
	if($(span).hasClass("fa-angle-down")){
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}
}

function ajaxQuery(targetPage){

	var factory = "";
	var workshop = "";
	var workgroup = "";
	var subgroup = "";
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	
	if(treeNode.name!='无数据权限'||treeNode.id!='0'){
		if(treeNode.org_type == '1'||treeNode.org_type == '2'){
			factory = treeNode.displayName;
			var childrenNodes=treeNode.children[0].children;
			$.each(childrenNodes,function(index,childrenNode){
				workshop+=childrenNode.displayName+",";
			});
			
		}
		if(treeNode.org_type == '3'){
			var childrenNodes=treeNode.children;
			$.each(childrenNodes,function(index,childrenNode){
				workshop+=childrenNode.displayName+",";
			});
		}
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
				subgroup = treeNode.id;
			}
			treeNode = treeNode.getParentNode();
		}

		if(select_workshop==""){
			alert("请选择车间！");
			return false;
		}
		$(".divLoading").addClass("fade in").show();
		var conditions="{orgId:'"+subgroup+"',status:'"+$("#hour_status").val()+
		"',wdateStart:'"+ $("#wdate_start").val()+"',wdateEnd:'"+$("#wdate_end").val()+"',waitReason:'"+
		$("#waitReason").val()+ "',workgroup:'"+workgroup+"',workshop:'"+workshop+
		"',factory:'"+factory+ "'}";
		//alert(conditions);
		$.ajax({
			url : "waitWorkTime!getStaffWorkHours.action",
			dataType : "json",
			async:false,
			type : "get",
			data : {
				"conditions" : conditions/*,
				"pager.pageSize" : 20,
				"pager.curPage" : targetPage || 1*/
			},
			success : function(response) {
				swhlist = response.dataList;
				generateTb(swhlist);
				$(".divLoading").hide();
	/*			$("#total").html(response.pager.totalCount);
				$("#total").attr("total", response.pager.totalCount);
				$("#cur").attr("page", response.pager.curPage);
				$("#cur").html(
						"<a href=\"#\">" + response.pager.curPage + "</a>");
				$("#pagination").show();*/
			}
		});
	}
	
}

function generateTb(swhlist){
	$("#tb_workhour").html("");
	var last_workdate="";
	var last_detail_reason="";
	var last_wait_reason="";
	var workdateId="";
	var waitReasonId="";
	var detailReasonId="";
	var dutyUnitId="";
	var checkboxId="";
	var swhids="";
	
	$.each(swhlist,function(index,swh){
		var tr=$("<tr />");	
		//操作日期合并单元格
		if(swh.work_date==last_workdate){
			var rowspan=parseInt($(workdateId).attr("rowspan"));
			$(workdateId).attr("rowspan",rowspan+1);
			$(checkboxId).attr("rowspan",rowspan+1);
			swhids+=index+",";
			$(checkboxId).attr("swhids",swhids);
		}else{
			workdateId="#wd_"+index;
			checkboxId="#chk_"+index;
			swhids=index+",";
			
			if(status_arr[swh.status]=='已审批'||status_arr[swh.status]=='已维护'){
				$("<td id='chk_"+index+"' rowspan=1 swhids="+swhids+"/>").html("<input type='checkbox' >").appendTo(tr);
			}
			else{
				$("<td id='chk_"+index+"' rowspan=1 swhids="+swhids+"/>").html("").appendTo(tr);
			}
			$("<td id='wd_"+index+"' rowspan=1/>").html(swh.work_date).appendTo(tr);
		}
		//等待原因合并单元格
		if(swh.work_date==last_workdate&&swh.wait_reason==last_wait_reason){
			var rowspan=parseInt($(waitReasonId).attr("rowspan"));
			$(waitReasonId).attr("rowspan",rowspan+1);
			
		}else{
			waitReasonId="#rs_"+index;
			$("<td id='rs_"+index+"' rowspan=1/>").html(swh.wait_reason).appendTo(tr);
		}
		//详细原因合并单元格
		if(swh.work_date==last_workdate&&swh.wait_reason==last_wait_reason&&swh.detail_reason==last_detail_reason){
			var rowspan=parseInt($(detailReasonId).attr("rowspan"));
			$(detailReasonId).attr("rowspan",rowspan+1);
			$(dutyUnitId).attr("rowspan",rowspan+1);
		}else{
			detailReasonId="#drs_"+index;
			dutyUnitId="#du_"+index;
			$("<td id='drs_"+index+"' rowspan=1/>").html(swh.detail_reason).appendTo(tr);
			$("<td id='du_"+index+"' rowspan=1/>").html(swh.duty_unit).appendTo(tr);
		}
		
		$("<td />").html(swh.staff_number).appendTo(tr);
		$("<td />").html(swh.staff_name).appendTo(tr);
		$("<td />").html(swh.job).appendTo(tr);
		$("<td />").html(swh.work_hour).appendTo(tr);
		$("<td />").html(swh.whereabouts).appendTo(tr);
		/*$("<td />").html(swh.distribution).appendTo(tr);*/
		$("<td />").html(swh.team_org).appendTo(tr);
		$("<td />").html(swh.workgroup_org).appendTo(tr);
		$("<td />").html(status_arr[swh.status]).appendTo(tr);
		/*$("<td />").html(swh.approver).appendTo(tr);
		$("<td />").html(swh.approve_date).appendTo(tr);*/
		$("#tb_workhour").append(tr);
		$(tr).data("swhid",swh.id);
		$(tr).data("swhlist_index",index);
		$(tr).data("workdateId",workdateId);
		last_workdate=swh.work_date;
		last_wait_reason=swh.wait_reason;
		last_detail_reason=swh.detail_reason;
		
	});
}

//批准、驳回
function ajaxUpdate(swhlist,whflag,rejectReason) {
	var month_start=$("#wdate_start").val().substring(0,7);
	var month_end=$("#wdate_end").val().substring(0,7);
	//alert(month_start);
/*	if(month_start!=month_end){
		alert("起始日期和结束日期只能处于同一月份！");
		return false;
	}
	*/
	var conditions={};
	var factory = "";
	var workshop = "";
	var nodes = zTreeObj.getSelectedNodes();	
	var treeNode = nodes[0];
	
	//alert(conditions);
	if(treeNode.name!='无数据权限'||treeNode.id!='0'){
		if(treeNode.org_type == '1'||treeNode.org_type == '2'){
			factory = treeNode.displayName;
			var childrenNodes=treeNode.children[0].children;
			$.each(childrenNodes,function(index,childrenNode){
				workshop+=childrenNode.displayName+",";
			});
			
		}
		if(treeNode.org_type == '3'){
			var childrenNodes=treeNode.children;
			$.each(childrenNodes,function(index,childrenNode){
				workshop+=childrenNode.displayName+",";
			});
		}
		while (treeNode!=null){
			if(treeNode.org_type == '1'||treeNode.org_type == '2'){
				factory = treeNode.displayName;			
			}
			if(treeNode.org_type == '4'){
				workshop = treeNode.displayName;
			}
			treeNode = treeNode.getParentNode();
		}
		
	}
	
	conditions.factory=factory;
	conditions.workshop=workshop;
	//conditions.workMonth=month_start;
	
	var targetPage = $("#cur").attr("page") || 1;
	$.ajax({
		url : "waitWorkTime!updateWorkHourInfo.action",
		dataType : "json",
		async:false,
		type : "post",
		data : {
			"conditions" : swhlist,
			"whflag":whflag
		},
		success : function(response) {
			if (response.success) {
				//ajaxCaculateSalary(JSON.stringify(conditions));
				alert(response.message);
				if(whflag=='reject'){
					var emaillist=[];
					var datalist=JSON.parse(swhlist);
					$.each(datalist,function(i,swh){
						var obj={};
						obj['等待日期']=swh.work_date;
						obj['等待原因']=swh.wait_reason;
						obj['详细原因']=swh.detail_reason==null?"":swh.detail_reason;
						obj['工号']=swh.staff_number;
						obj['姓名']=swh.staff_name;
						obj['岗位']=swh.job;
						obj['等待工时']=swh.work_hour;
						obj['人员去向']=swh.whereabouts==null?"":swh.whereabouts;
						emaillist.push(obj);
					})
					//alert(JSON.stringify(emaillist))
					sendEmail(datalist[0].email,'',factory+workshop+'车间等待工时信息驳回','等待日期,等待原因,详细原因,工号,姓名,岗位,等待工时,人员去向',JSON.stringify(emaillist),rejectReason)
				}			
				ajaxQuery(targetPage);
				$("#checkall").attr("checked",false);
			} else {
				alert(response.message);
			}
		}
	});
}

//批准、驳回时重新计算计件工资
function ajaxCaculateSalary(conditions) {
	$.ajax({
		url : "waitWorkTime!caculateSalary.action",
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


//获取选中的checkbox
function getSelectList(){
	var boxList=$("#tb_workhour :checked");
	var swhList=[];
	if(boxList.length==0){
		alert("请选择至少一个车号");
		return false;
	}
	$.each(boxList,function(index,box){
		
		var swhids=$(box).parent().attr("swhids");
		//alert(swhids);
		swhids=swhids.substring(0,swhids.length-1);
		var swhidlist=swhids.split(",");
		$.each(swhidlist,function(index,swhlist_index){
			var obj=swhlist[swhlist_index];
			//obj.id=swhid;
			swhList.push(obj);
		});
		
	});
	return swhList;
}
function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	select_workshop="";
	if(treeNode.org_type == '4'){
		select_workshop=treeNode.displayName;
	}
	if(treeNode.org_type == '5'){
		select_workshop=treeNode.getParentNode().displayName;
	}
	if(treeNode.org_type == '6'){
		select_workshop=treeNode.getParentNode().getParentNode().displayName;
	}
	if(treeNode.name!='无数据权限'||treeNode.id!='0'){
		ajaxQuery(1);
	}
};