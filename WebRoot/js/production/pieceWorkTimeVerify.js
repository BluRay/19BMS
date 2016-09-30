var swhlist=[];
var swhupdatelist=[];
$(document).ready(function(){
	initPage();
	
	// 查询事件
	$("#btnQuery").click(function(){
		ajaxQuery(1);
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
		var month_start=$("#wdate_start").val().substring(0,7);
		var month_end=$("#wdate_end").val().substring(0,7);
		//alert(month_start);
		if(month_start!=month_end){
			alert("起始日期和结束日期只能处于同一月份！");
			return false;
		}
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
		conditions.month=month_start;
		var edit_list=getSelectList();
		if(edit_list.length>0){
			ajaxUpdate(JSON.stringify(edit_list),JSON.stringify(conditions),"verify");
		}
			
	});
	// 驳回
	$("#btnReject").click(function() {
		var month_start=$("#wdate_start").val().substring(0,7);
		var month_end=$("#wdate_end").val().substring(0,7);
		//alert(month_start);
		if(month_start!=month_end){
			alert("起始日期和结束日期只能处于同一月份！");
			return false;
		}
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
		conditions.month=month_start;
		var edit_list=getSelectList();
		if(edit_list.length>0){
			ajaxUpdate(JSON.stringify(edit_list),JSON.stringify(conditions),"reject");
		}
		
	});
});

function initPage(){
	getOrgAuthTree($("#workGroupTree"),"1,2,3,4,5,6",'1');
	getBusNumberSelect('#bus_number');
	/*getAuthorityFactorySelect("#factory", "", "noall");
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
	pageSize=1000;
	//ajaxQuery(1);
	// 展开侧边栏
	$("#pieceWorkTime").find(".treemenu").addClass("collapsed");
	$("#piece_work").addClass("in");
	var span=$("#pieceWorkTime").find(".pull-right.fa");
	if($(span).hasClass("fa-angle-down")){
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}
}
//获取选中的checkbox
function getSelectList(){
	var boxList=$("#tb_workhour :checked");
	var swhList=[];
	if(boxList.length==0){
		alert("请选择至少一个车号");
	}
	$.each(boxList,function(index,box){
		
		var swhids=$(box).parent().attr("swhids");
		//alert(swhids);
		swhids=swhids.substring(0,swhids.length-1);
		var swhidlist=swhids.split(",");
		$.each(swhidlist,function(index,swhid){
			var obj={};
			obj.id=swhid;
			swhList.push(obj);
		});
		
	});
	return swhList;
}

function ajaxQuery(targetPage){
	var factory = "";
	var workshop = "";
	var workgroup = "";
	var subgroup = "";
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
			if(treeNode.org_type == '5'){
				workgroup = treeNode.displayName;
			}
			if(treeNode.org_type == '6'){
				subgroup = treeNode.id;
			}
			treeNode = treeNode.getParentNode();
		}
		var conditions="{orgId:'"+subgroup+ "',wdateStart:'"+ $("#wdate_start").val()
		+"',wdateEnd:'"+ $("#wdate_end").val()+"',workgroup:'"+workgroup+"',workshop:'"+workshop+
		"',factory:'"+factory+"',status:'"+$("#hour_status").val()+ "',busNumber:'"+$("#bus_number").val()+"'}";
		$(".divLoading").addClass("fade in").show();
		$.ajax({
			url : "pieceWorkTime!getStaffWorkHours.action",
			dataType : "json",
			async:false,
			type : "get",
			data : {
				"conditions" : conditions,
				"pager.pageSize" : 1000,
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

function generateTb(swhlist){
	$("#tb_workhour").html("");	
	var last_bus_number = "";
	var last_workorg="";
	var last_workdate = "";
	var swhids="";
	var busNumberId = "";
	var checkboxId = "";
	var workorgId="";
	var workdateId = "";
	var bonusInputId = "";
	var mergecount1=0;
	var mergecount2=0;
	
	$.each(swhlist,function(index,swh){
		var tr=$("<tr />");
		var workorg=swh.workgroup+"-"+swh.team;
		//车号合并单元格
		if(swh.bus_number==last_bus_number){
			var rowspan=parseInt($(busNumberId).attr("rowspan"));
			$(busNumberId).attr("rowspan",rowspan+1);
			$(checkboxId).attr("rowspan",rowspan+1);
			swhids+=swh.id+",";
			$(checkboxId).attr("swhids",swhids);
		}else{
			busNumberId="#bus_"+swh.bus_number;
			checkboxId="#chk_"+swh.bus_number;
			var bonus_num = parseFloat(swh.bonus);
			swhids=swh.id+",";
			$("<td id='chk_"+swh.bus_number+"' rowspan=1 swhids="+swhids+"/>").html("<input type='checkbox' >").appendTo(tr);
			$("<td id='bus_" + swh.bus_number + "' rowspan=1/>").html(swh.bus_number).appendTo(tr);
							
		}
		
		//操作班组合并单元格
		if(swh.bus_number == last_bus_number&&workorg==last_workorg){
			var rowspan = parseInt($(workorgId).attr(
			"rowspan"));
			$(workorgId).attr("rowspan", rowspan + 1);
		}else{
			$("<td id='workorg_" + mergecount1 + "' rowspan=1/>")
			.html(workorg).appendTo(tr);
			workorgId="#workorg_"+mergecount1;
			mergecount1++;				
		}	
		
		// 操作日期合并单元格
		if (swh.bus_number==last_bus_number&&workorg == last_workorg
				&& swh.work_date == last_workdate) {
			
			var ids=$(bonusInputId).find(".bonus").attr("ids");
			ids+=","+swh.id;
			
			var rowspan = parseInt($(workdateId).attr("rowspan"));
			$(workdateId).attr("rowspan", rowspan + 1);
			$(bonusInputId).attr("rowspan", rowspan + 1);							
			$(bonusInputId).find(".bonus").attr("ids",ids);
		} else {
			workdateId = "#wd_" + mergecount2;
			bonusInputId="#bonus_"+mergecount2;
			var bonus_num = parseFloat(swh.bonus);
			
			$("<td id='wd_" + mergecount2 + "' rowspan=1/>").html(
					swh.work_date).appendTo(tr);
			
			var input_html=bonus_num;
			//alert(input_html);
			$("<td id='bonus_" + mergecount2+ "' rowspan=1/>").html(input_html).appendTo(tr);
			mergecount2++;
		}
		
		$("<td />").html(swh.staff_number).appendTo(tr);
		$("<td />").html(swh.staff_name).appendTo(tr);
		$("<td />").html(swh.job).appendTo(tr);
		$("<td />").html(swh.participation).appendTo(tr);
		$("<td />").html(swh.distribution==undefined?"":swh.distribution).appendTo(tr);
		$("<td />").html(swh.workgroup_org+"-"+swh.team_org).appendTo(tr);
		$("<td />").html(swh.status).appendTo(tr);
		$("<td />").html(swh.approver).appendTo(tr);
		$("<td />").html(swh.approve_date).appendTo(tr);
		$("#tb_workhour").append(tr);
		$(tr).data("swhid",swh.id);
		$(tr).data("swhlist_index",index);
		last_bus_number=swh.bus_number;
		last_workdate=swh.work_date;
		last_workorg=workorg;
	});
}
//批准、驳回
function ajaxUpdate(swhlist,conditions,whflag) {
	var targetPage = $("#cur").attr("page") || 1;
	$.ajax({
		url : "pieceWorkTime!updateWorkHourInfo.action",
		dataType : "json",
		type : "post",
		async : false,
		data : {
			"conditions" : swhlist,
			"whflag":whflag
		},
		success : function(response) {
			if (response.success) {
				ajaxCaculateSalary(conditions);
				alert(response.message);
				ajaxQuery(targetPage);
				$("#checkall").attr("checked",false);
				check_All_unAll("#table_workhour", false) ;
			} else {
				alert(response.message);
			}

		}
	});
}
//批准、驳回时重新计算计件工资
function ajaxCaculateSalary(conditions) {
	$.ajax({
		url : "pieceWorkTime!caculateSalary.action",
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

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	if(treeNode.name!='无数据权限'||treeNode.id!='0'){
		ajaxQuery(1);
	}
	
	
	
};