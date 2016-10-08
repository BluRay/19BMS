var swhlist=[];
var swhupdatelist=[];
var swhdelids="";
var status_arr={'0':'已维护','1':'已审批','2':'已驳回','3':'已锁定'}
$(document).ready(function(){
	initPage();
	// 工时删除
	$(".close").live("click", function(e) {
		var tr=$(e.target).closest("tr");
		var index=parseInt($(e.target).attr("swhlist_index"));
		var swhid=$(tr).data("swhid");
		var ids=$(this).attr("ids");
		var workdateId="";
		var conditions={};
		if(swhid && !ids){
			conditions.swhid=swhid;		
			workdateId=$(tr).data("workdateId");
			swhdelids+=swhid+",";
		}
		if(confirm("确认删除该条数据？")){
			if(ids){
				conditions.ids=ids;
				ajaxDelete(JSON.stringify(conditions));
				ajaxQuery(1);
			}else{
				swhlist.splice(index,1);
				generateTb(swhlist);
				if(workdateId!=""){
					var rows=$(workdateId).attr("rowspan");
					var first_tr=$(workdateId).parent("tr");
					var first_index=parseInt($(first_tr).data("swhlist_index"));
					for(var i=first_index;i<(first_index+rows);i++){
						swhlist[i].status='0';
					}	
				}
			}
		
		}

	});
	
	//Enter键移动输入光标
	$(".work_hour").live("keydown",function(event){
		if (event.keyCode == "13") {
			$(this).parent().parent().next().find("input").focus();
		}
	})
	
	// 查询事件
	$("#btnQuery").click(function(){
	/*	if($("#work_date").val().trim().length==0){
			alert("请选择操作日期!");
		}else*/
		ajaxQuery(1);
	});
	//参与度验证是否数字
	$(".work_hour").live( "change",function(e){
		var tr=$(e.target).closest("tr");
		var workHour=$(this).val();
		var workdateId=$(tr).data("workdateId");
		var index=parseInt($(tr).data("swhlist_index"));
		var old_value=$(this).attr("old_value");
		 if(!const_float_validate.test(workHour)){
			alert("等待工时只能是数字！");
			$(this).val(old_value);
		}else if(old_value!=workHour){
			swhlist[index].work_hour=workHour;
			swhlist[index].wpay=parseFloat(workHour)*parseFloat(swhlist[index].price);
			if(workdateId!=""){
				var rows=$(workdateId).attr("rowspan");
				var first_tr=$(workdateId).parent("tr");
				var first_index=parseInt($(first_tr).data("swhlist_index"));
				for(var i=first_index;i<(first_index+rows);i++){
					swhlist[i].status='0';
				}	
			}
		/*	
			var staff = {};
			staff.id=swhlist[index].id;
			staff.work_hour=swhlist[index].workHour;
			staff.status='1';
			swhupdatelist.push(staff);*/
		}
	});
	//修改人员去向
	$(".whereabouts") .live( "change",function(e){
		var tr=$(e.target).closest("tr");
		var whereabouts=$(this).val();
		var workdateId=$(tr).data("workdateId");
		var index=parseInt($(tr).data("swhlist_index"));
		var old_value=$(this).attr("old_value");
		if(old_value!=whereabouts){
			swhlist[index].whereabouts=whereabouts;
			if(workdateId!=""){
				var rows=$(workdateId).attr("rowspan");
				var first_tr=$(workdateId).parent("tr");
				var first_index=parseInt($(first_tr).data("swhlist_index"));
				for(var i=first_index;i<(first_index+rows);i++){
					swhlist[i].status='0';
				}	
			}
			
	/*		var staff = {};
			staff.id=swhlist[index].id;
			staff.whereabouts=swhlist[index].whereabouts;
			staff.status='1';
			swhupdatelist.push(staff);*/
		}
	});
	
	//复选框全选、反选
	$("#checkall").click(function(){
		if($(this).attr("checked")=="checked"){
			check_All_unAll("#table_workhour", true) ;
		}else
		check_All_unAll("#table_workhour", false) ;		
	});
	//保存修改
	$("#btnSave").click(function(){
		//alert(JSON.stringify(swhupdatelist));
		if(swhlist.length>0){
			ajaxSave(JSON.stringify(swhlist));
		}
		if(swhdelids!=""){
			var conditions={};
			conditions.ids=swhdelids;
			ajaxDelete(JSON.stringify(conditions));
		}
		
	});
});

function initPage(){
	getOrgAuthTree($("#workGroupTree"),"1,2,3,4,5,6",'1');
	/*getAuthorityFactorySelect("#factory", "", "noall");
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

/*	var d = new Date();
	var eYear = d.getFullYear();
	var eMon = d.getMonth() + 1;
	var eDay = d.getDate();
	wDate=(eYear)+"-"+(eMon<10?"0"+eMon:eMon)+"-"+(eDay<10 ? "0"+ eDay : eDay);
	$("#work_date").val(wDate);*/
	
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
	swhlist=[];
	swhupdatelist=[];
	swhdelids="";
	
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
		$(".divLoading").addClass("fade in").show();
		var conditions="{orgId:'"+subgroup+"',workDate:'"+/*$("#work_date").val()+*/
		"',wdateStart:'"+ $("#wdate_start").val()+"',wdateEnd:'"+
		$("#wdate_end").val()+"',status:'"+$("#hour_status").val()+
		"',waitReason:'"+$("#waitReason").val()+ "',workgroup:'"+workgroup+"',workshop:'"+workshop+
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
	var delTdId="";
	var delbuttonId="";
	var waitReasonId="";
	var detailReasonId="";

	$.each(swhlist,function(index,swh){
		var disabled = (status_arr[swh.STATUS] != '已驳回') ? 'disabled' : "";
		
		var tr=$("<tr />");	
		//操作日期合并单元格
		if(swh.work_date==last_workdate){
			var rowspan=parseInt($(workdateId).attr("rowspan"));
			$(workdateId).attr("rowspan",rowspan+1);			
			$(delTdId).attr("rowspan",rowspan+1);
			var ids=$(delbuttonId).attr("ids");
			ids+=","+swh.id;
			$(delbuttonId).attr("ids",ids);
		}else{
			 workdateId="#wd_"+index;
			 delbuttonId="#del_"+index;
			 delTdId="#delTd_"+index;
			if(disabled!='disabled'){
					$("<td id='delTd_"+index+"' rowspan=1/>").html("<button id='del_"+index+"' type=\"button\" class=\"close\" aria-label=\"Close\"  rel=\"tooltip\" title='删除该日期下工时信息' ids='"+swh.id+"'><span aria-hidden=\"true\">×</span></button>").appendTo(tr);
				}
			else{
				$("<td id='delTd_"+index+"' rowspan=1/>").html("").appendTo(tr);
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
		}else{
			detailReasonId="#drs_"+index;
			$("<td id='drs_"+index+"' rowspan=1/>").html(swh.detail_reason).appendTo(tr);
		}
		
		$("<td />").html(swh.staff_number).appendTo(tr);
		$("<td />").html(swh.staff_name).appendTo(tr);
		$("<td />").html(swh.job).appendTo(tr);
		$("<td />").html("<input class=\"work_hour\""+disabled+" type='text' style=\"border:1;width:50px;text-align:center;font-size: 12px\" value='"+swh.work_hour+
						"' old_value='"+swh.work_hour+"'>").appendTo(tr);
		/*$("<td />").html(swh.distribution).appendTo(tr);*/
		$("<td />").html("<input class=\"whereabouts\""+disabled+" type='text' style=\"border:1;width:100px;text-align:center;font-size: 12px\" value='"+swh.whereabouts+
				"' old_value='"+swh.whereabouts+"'>").appendTo(tr);
		//$("<td />").html(swh.whereabouts).appendTo(tr);
		$("<td />").html(swh.team_org).appendTo(tr);
		$("<td />").html(swh.workgroup_org).appendTo(tr);
		$("<td />").html(status_arr[swh.STATUS]).appendTo(tr);
		$("<td />").html(swh.approver).appendTo(tr);
		$("<td />").html(swh.approve_date).appendTo(tr);
		if(disabled=='disabled'){
			$("<td />").html("").appendTo(tr);
		}else
		$("<td />").html("<button type=\"button\" class=\"close\" aria-label=\"Close\"  rel=\"tooltip\" title='删除' swhlist_index='"+index+"'><span aria-hidden=\"true\">×</span></button>").appendTo(tr);
		$("#tb_workhour").append(tr);
		$(tr).data("swhid",swh.id);
		$(tr).data("swhlist_index",index);
		$(tr).data("workdateId",workdateId);
		last_workdate=swh.work_date;
		last_wait_reason=swh.wait_reason;
		last_detail_reason=swh.detail_reason;
		
	});
}
//删除
function ajaxDelete(conditions){
	//var conditions="{swhid:'"+swhid+"'}";
	$.ajax({
		url : "waitWorkTime!deleteWorkHourInfo.action",
		dataType : "json",
		async:false,
		type : "get",
		data : {
			"conditions" : conditions/*,
			"pager.pageSize" : 20,
			"pager.curPage" : targetPage || 1*/
		},
		success : function(response) {
			//alert(response.message);
		},
		error:function(response){
			alert(response.message);
		}
	})	
}
//保存
function ajaxSave(conditions) {
	$.ajax({
		url : "waitWorkTime!updateWorkHourInfo.action",
		dataType : "json",
		type : "post",
		data : {
			"conditions" : conditions
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
	if(treeNode.name!='无数据权限'||treeNode.id!='0'){
		ajaxQuery(1);
	}
};