$(document).ready(function(){
	initPage();
	
	//等待原因为‘停线’时弹出停线原因查询层
	$("#waitReason").change(function(){
		if($(this).val()=='停线'){
			$("#reason_detail").val("");
			$("#reason_detail").attr("disabled",true);
			$("#waitReasonModal").modal("show");
		}else{
			$("#reason_detail").val("");
			$("#reason_detail").attr("disabled",false);
		}
	});
	$(".work_hour").live("keydown",function(event){
		if (event.keyCode == "13") {								
			$(this).parent().parent().next().find(".work_hour").focus();
		}
	})
	
	// 新增额外工时
	$(".addWorkhour").live("click", function() {
		if($("#mta_wdate").val().trim()==""){
			alert("请选择等待日期！");
		}else{
			addWorkHourItem();
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
							$(cardNumInput).attr("staffId",staff.id);
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
							$(tr).data("skill_parameter",skillParameter);
						}
					});
	// 工时删除
	$(".close").live("click", function(e) {
		$(e.target).closest("tr").remove();
	});
	//参与度验证是否数字
	$(".work_hour") .live("change",function(e){		
			var tr=$(e.target).closest("tr");
			var workHour=$(this).val();
			var staffNum=$(tr).find(".card_num").val();										
			/*var conditions="{staffNum:'"+staffNum+"',workDate:'"+
				$("#mta_wdate").val()+"'}";
			var sfwlist=ajaxGetStaffWorkHours(conditions);
			if($("#mta_wdate").val().trim().length>0&&sfwlist.length>0){
				alert("不能重复维护工时！");
				$(tr).remove();
			}else*/ if(!const_float_validate.test(workHour)){
				alert("等待工时只能是数字！");
				$(this).val("");
			}else if(!const_float_validate_one.test(workHour)){
				alert("等待工时只能保留一位小数！");
				$(this).val("");
			}else if(workHour<0||workHour>8){
				alert("等待工时只能位于0到8之间！");
				$(this).val("");
			}else if(workHour*10%5!=0){
				alert("等待工时录入以半小时为单位，例如：1.0,1.5,2.0！");
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
	//停线原因查询
	$("#btnQueryReason").click(function(){
		ajaxQueryReason();
	});
	//选择停线原因，并填入具体原因框，置灰
	$("#btnConfirm").click(function(){
		var radio=$('input:radio[name="exp_radio"]:checked');
		var reason=$(radio).val()=='undefined'?'':$(radio).val();
		//alert(reason);
		var tr=$(radio).parent().parent();
		var start_time=$(tr).data("start_time")==undefined?"":$(tr).data("start_time");
		var finish_time=$(tr).data("finish_time")==undefined?"":$(tr).data("finish_time");
		if(reason==undefined){
			alert("请选择停线原因！");
		}else{
			$("#waitReasonModal").modal("hide");
			$("#tableException tbody").html("");
			$("#reason_detail").val(reason);
			$("#reason_detail").data("start_time",start_time);
			$("#reason_detail").data("finish_time",finish_time);
			$("#reason_detail").attr("disabled",true);
		}
		
	});
	//保存
	$("#btnSave").click(function(){
		var inputlist = $("#table_workhour input[class='input-small card_num']");
		var org ="";
		var factory="";
		var dept="";
		var workshop ="";	
		var workgroup="";
		var team="";
		var total_distribution=0;
		var staffNumlist="";
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
		var busNumber=$("#bus_number").val();
		var workDate=$("#mta_wdate").val();
		var stafflist = [];
		var saveFlag=true;
		var start_time=$("#reason_detail").data("start_time");
		var finish_time=$("#reason_detail").data("finish_time");
		var reasonDetail=$("#reason_detail").val();
		var curDate=getCurDate();
		if(finish_time==undefined||finish_time==""){
			finish_time=curDate;
		}else{
			finish_time=finish_time.substring(0,10);
		}
		if(start_time==undefined||start_time==""){
			start_time=curDate;			
		}else{
			start_time=start_time.substring(0,10);
		}
		if(org==""){
			alert("请选择小班组！");
		}else if($("#waitReason").val().trim().length==0){
			alert("请选择等待原因！");
		}else if(workDate.trim().length==0){
			alert("请填写等待日期！");
		}else if($("#waitReason").val()=='停线'&&(compareTime(workDate,start_time)==-1||compareTime(workDate,finish_time)==1)){
			alert("等待日期必须在‘"+start_time+"’与 ‘"+finish_time+"’之间！");
		}else if(reasonDetail.trim().length==0){
			alert("请填写具体原因！");
		}
		else{
			$.each(inputlist,
					function(index, input) {						
						var tr = $(input).closest( "tr");
						var staffId=$(input).attr("staffId");											
						var workHour=$(tr).find(".work_hour").val();
						var distribution=$(tr).find(".distribution").val();
						var tds = $(tr).children("td");
						var whereabouts=$(tr).find(".whereabouts").val();
						total_distribution+=Number(distribution);
						//var workshop=$(tds[7]).html();
						//alert(workshop);
						if(staffId !=undefined &&staffId.trim().length>0&&workHour!=0){
							var staff = {};
							staff.factory=factory;
							staff.dept=dept;
							staff.workshop = workshop;
							staff.workgroup=workgroup;
							staff.team=team;
							staff.workDate=workDate;
							staff.staffId=staffId;
							staff.subgroupId=org;
							staff.workHour=workHour;
							staff.waitReason=$("#waitReason").val();
							staff.detailReason=reasonDetail;
							staff.whereabouts=whereabouts;
							staff.distribution=distribution;
							if(!isContain(staff,stafflist)){
								stafflist.push(staff);
							}else{
								saveFlag=false;
								alert("不能重复维护工时！");
								return false;
							}			
						}
						if(workHour==''||workHour.trim().length==0){
							saveFlag=false;
							alert("等待工时不能为空！");
							return false;
						}
						if(whereabouts==''||whereabouts.trim().length==0){
							saveFlag=false;
							alert("人员去向不能为空！");
							return false;
						}
					var staffNum=$(input).val();
					staffNumlist+=staffNum+","
					/*var conditions="{staffNum:'"+staffNum+"',workDate:'"+ $("#mta_wdate").val()+"'}";
					var sfwlist=ajaxGetStaffWorkHours(conditions);
					if(sfwlist.length>0){														
							//$(tr).remove();
							saveFlag=false;
							alert("不能重复维护工时！");
							return false;
						}	*/
				});
			var conditions = "{staffNum:'"+ staffNumlist + "',workDate:'"+ $("#mta_wdate").val()+ "'}";	
			var sfwlist = ajaxGetStaffWorkHours(conditions);
			if (sfwlist.length > 0) {
				//$(tr).remove();
				saveFlag = false;
				alert("不能重复维护工时！");
				return false;
			}
			
			if(!saveFlag){
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
			if(saveFlag&&stafflist.length>0){
				ajaxSave(JSON.stringify(stafflist));
			}else{
				alert("无数据保存！");
			}
		}
	});
});

function initPage(){
	getOrgAuthTree($("#workGroupTree"),"1,2,3,4,5,6",'1');
	getOrderNoSelect("#search_order_no","#orderId");
	getReasonTypeSelect();
	/*getAuthorityFactorySelect("#factory", "", "noall");
	getOrderNoSelect("#search_order_no","#orderId");
	getReasonTypeSelect();
	$("#reason_detail").val("");
	$("#reason_detail").attr("disabled",false);
	$("#waitReason").val("");
	$("#reason_detail").val("");
	var selectFactory = $("#factory :selected").text();
	var defaultWorkshop=$("#d_workshop").val();
	var defaultWorkgourp=$("#d_workgroup").val();
	var defaultTeam=$("#d_team").val();
	getWorkshopSelect_Org("#workshop", defaultWorkshop, selectFactory, "empty");
	//$("#workshop").attr("disabled",true);
	var workshop = $("#workshop").val();
	getChildOrgSelect("#group", workshop, defaultWorkgourp, "empty");
	var group = $("#group").val();
	getChildOrgSelect("#subgroup", group, defaultTeam, "empty");
	ajaxGetStaffList();*/
	// 展开侧边栏
	$("#waitWorkTime").find(".treemenu").addClass("collapsed");
	$("#wait_work").addClass("in");
	var span=$("#waitWorkTime").find(".pull-right.fa");
	if($(span).hasClass("fa-angle-down")){
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}
}

function getReasonTypeSelect() {
	$.ajax({
		url : "common!getReasonTypeSelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var strs = "";
		    $("#search_reason_type").html("");
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.ID + ">" + value.key_name + "</option>";
		    });
		    $("#search_reason_type").append(strs);
		}
	});
}

function addWorkHourItem(staffId,cardNo, staffName, staffPost, workHour, subgroup,
		group, workshop, factory,distribution) {
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
							+ cardNo + "' staffId='"+staffId+"' " + cardNoDisabled + ">").appendTo(tr);
	$("<td class='staff_name' />").html(staffName).appendTo(tr);
	$("<td class='staff_post' />").html(staffPost).appendTo(tr);
	$("<td />")
			.html(
					"<input class='input-small work_hour' style='text-align:center;width:50px;margin-bottom: 0px;' type='text' value="
							+ workHour + " >H").appendTo(tr);
	$("<td />")
	.html(
			"<input class='input-small distribution' id='dist_"+staffId+"' style='text-align:center;width:50px;margin-bottom: 0px;' type='text' value="
					+ distribution + " >").appendTo(tr);
	$("<td  />").html("<input class='whereabouts' style='text-align:center;width:100%;margin-bottom: 0px;' type='text' >").appendTo(tr);
	$("<td class='staff_subgroup' />").html(subgroup).appendTo(tr);
	$("<td class='staff_group' />").html(group).appendTo(tr);
	$("<td class='staff_workshop' />").html(workshop).appendTo(tr);
	$("<td class='staff_factory' />").html(factory).appendTo(tr);
	$("#tb_workhour").append(tr);
}

function ajaxSave(conditions) {
	$("#btnSave").attr("disabled",true);
	$(".divLoading").addClass("fade in").show();
	$.ajax({
		url : "waitWorkTime!saveWorkHourInfo.action",
		dataType : "json",
		type : "post",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			if (response.success) {				
				$(".divLoading").hide();
				alert(response.message);
				$("#btnSave").attr("disabled",false);
				//location.reload(true);
			} else {
				alert(response.message);
			}

		}
	});
}

function ajaxGetStaffWorkHours(conditions) {
	var swhlist;
	$.ajax({
		url : "waitWorkTime!getStaffWorkHours.action",
		dataType : "json",
		async:false,
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

function ajaxGetStaffList(){
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
		async : false,
		url : "common!getStaffInfo.action",
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
function ajaxQueryReason(){
	var factory = "";
	var workshop = "";
	var workgroup = "";
	var subgroup = "";
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	while (treeNode!=null){
		if(treeNode.org_type == '2'){
			factory = treeNode.displayName;
		}
		if(treeNode.org_type == '4'){
			workshop = treeNode.displayName;
		}
		treeNode = treeNode.getParentNode();
	}
	$.ajax({
	    url: "plan!getExceptionList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_name": factory,
	    	"workshop_name": workshop,
	    	"bus_number": '',
	    	"line_id":'',
	    	"severity_level": '',
	    	"measures": '',
	    	"status": '',	    	
	    	"date_start":$('#pause_date_start').val(),//停线开始时间
	    	"date_end":$('#pause_date_end').val(),//停线结束时间
	    	"exception_type" : "1",
	    	"reason_type_id" : $('#search_reason_type').val(),
	    	"order_no" : $('#search_order_no').val(), 	
	    	"date_start2": $('#ok_date_start').val(),//恢复开始时间
	    	"date_end2": $('#ok_date_end').val(),//恢复结束时间
	    	"pager.pageSize":100,
			"pager.curPage":1
	    },
	    success:function(response){		    		
    		$("#tableException tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr height='30px' id= '"+value.id+"'/>");
    			var radio="<input type='radio' name='exp_radio' value='"+value.detailed_reasons+"'/>";
    			$("<td style=\"text-align:center;padding:3px\" />").html(radio).appendTo(tr);  			
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_no).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.start_time).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.pfinish_time).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.finish_time).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html((value.severity_level=="0")?"不影响":((value.severity_level=="1")?"普通":"严重")).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.reson_type).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.detailed_reasons).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.department).appendTo(tr);
    			$(tr).data("start_time",value.start_time);
    			$(tr).data("finish_time",value.finish_time);
    		
    			$("#tableException tbody").append(tr);
    		});
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();
	    }
	});
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
	if(treeNode.org_type != '6'){
		alert("请选择小班组！");
		return false;
	}else{
		var list=ajaxGetStaffList();
		$("#tb_workhour").html("");
		$.each(list, function(index, staff) {
			//alert(staff.id);
			addWorkHourItem(staff.id,staff.staff_number,
					staff.name, staff.job, "",
					staff.team_org,
					staff.workgroup_org,
					staff.workshop_org,
					staff.plant_org,staff.distribution)
		});
	}
};
