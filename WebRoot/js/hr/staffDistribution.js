$(document) .ready(function() {
	initPage();
	
	//弹出导入界面，导出模板页面
	$("#btnBulkAdd").click (function () {
		$("#divBulkAdd").show();
		$("#tableDiv").hide();
	});
	//点击查询
	$("#btnQuery").click(function(){
		ajaxQuery();
	});
})

function initPage() {
	pageSize=100;
	getOrgAuthTree($("#workGroupTree"),"1,2,3,4,5,6",'1');
	var d = new Date();
	var eYear = d.getFullYear();
	var eMon = d.getMonth() + 1;
	var eDay = d.getDate();

	$("#effective_date").val((eYear)+"-"+(eMon<10?"0"+eMon:eMon)+"-"+(eDay<10 ? "0"+ eDay : eDay))
	$("#q_effective_date_start").val((eYear)+"-"+(eMon<10?"0"+eMon:eMon)+"-01");
	$("#q_effective_date_end").val((eYear)+"-"+(eMon<10?"0"+eMon:eMon)+"-"+(eDay<10 ? "0"+ eDay : eDay));
	// 展开侧边栏
	$("#hrPlan").find(".treemenu").addClass("collapsed");
	$("#hr_plan").addClass("in");
	var span = $("#hrPlan").find(".pull-right.fa");
	if ($(span).hasClass("fa-angle-down")) {
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}
}	
function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}
function zTreeOnClick(event, treeId, treeNode) {
	ajaxQuery();
}

function ajaxQuery(targetPage){
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
	var conditions={};
	conditions.factory=factory;
	conditions.workshop=workshop;
	conditions.workgroup=workgroup;
	conditions.team=subgroup;
	conditions.staff=$("#q_staff").val();
	conditions.effctiveDateStart=$("#q_effective_date_start").val();
	conditions.effctiveDateEnd=$("#q_effective_date_end").val();
	
	$.ajax({
		url : "staff!getStaffDistribution.action",
		dataType : "json",
		type : "get",
		data : {
			"conditions" : JSON.stringify(conditions),
			"pager.pageSize":100,
			"pager.curPage":targetPage || 1	
		},
		success : function(response) {
			$("#staffTable tbody").html("");
			var last_staff="";
			var staffNoTd_id="";
			var staffNmTd_id="";
			var last_workshop="";
			var last_workgroup="";
			var workshopTd="";
			var workgroupTd="";
			var effDateTd="";
			var last_effDate="";
			var workgroupTdCount=0;
			var workshopTdCount=0;
			var effDateTdCount=0;
			$.each(response.data,function(index,value){
				var tr=$("<tr />");

				if(last_workshop==value.workshop){
					var rowspan=parseInt($(workshopTd).attr("rowspan"));
					$(workshopTd).attr("rowspan",rowspan+1);
				}else{
					workshopTdCount++;
					$("<td id='ws_"+workshopTdCount+"' rowspan=1/>").html(value.workshop).appendTo(tr);	
					workshopTd="#ws_"+workshopTdCount;
				}
				if(last_workshop==value.workshop&&last_workgroup==(value.workgroup+"—"+value.team)){
					var rowspan=parseInt($(workgroupTd).attr("rowspan"));
					$(workgroupTd).attr("rowspan",rowspan+1);
				}else{
					workgroupTdCount++;
					$("<td id='wg_"+workgroupTdCount+"' rowspan=1/>").html(value.workgroup+"—"+value.team).appendTo(tr);
					workgroupTd="#wg_"+workgroupTdCount;
				}
				if(last_workshop==value.workshop&&last_workgroup==(value.workgroup+"—"+value.team)&&last_effDate==value.effective_date){
					var rowspan=parseInt($(effDateTd).attr("rowspan"));
					$(effDateTd).attr("rowspan",rowspan+1);
				}else{
					effDateTdCount++;
					$("<td id='eff_"+effDateTdCount+"' rowspan=1/>").html(value.effective_date).appendTo(tr);
					effDateTd="#eff_"+effDateTdCount;
				}
				
				$("<td />").html(value.staff_number).appendTo(tr);
				$("<td />").html(value.staff_name).appendTo(tr);
				$("<td />").html(value.distribution).appendTo(tr);
				$("<td />").html(value.editor).appendTo(tr);
				$("<td />").html(value.edit_date).appendTo(tr);
								
				last_workshop=value.workshop;
				last_workgroup=value.workgroup+"—"+value.team;
				last_effDate=value.effective_date;
				$("#staffTable tbody").append(tr);
			})
			$("#staffTable").show();
			$("#total").html(response.pager.totalCount);
			$("#total").attr("total", response.pager.totalCount);
			$("#cur").attr("page", response.pager.curPage);
			$("#cur").html(
					"<a href=\"#\">" + response.pager.curPage + "</a>");
			$("#pagination").show();
		}
	})
}

extArray = new Array(".xlsx");
function LimitAttach(form, file) {
	var effectiveDate=$("#effective_date").val();
	if(effectiveDate.trim().length==0){
		alert("请输入生效日期！");
		return false;
	}
	if ($("#file").val() == "") {
		alert("请选择文件！");
		return false;
	}
	allowSubmit = false;
	if (!file)
		return;
	while (file.indexOf("\\") != -1)
		file = file.slice(file.indexOf("\\") + 1);
	ext = file.slice(file.indexOf(".")).toLowerCase();
	for (var i = 0; i < extArray.length; i++) {
		if (extArray[i] == ext) {
			allowSubmit = true;
			break;
		}
	}
	var conditions="{'effectiveDate':'"+$("#effective_date").val()+"'}";
	if (allowSubmit) {
		$("#staffUploadForm").ajaxSubmit({
			url:"staff!uploadDistribution.action",
			type: "post",
			dataType:"json",
			data:{
				"conditions":conditions
			},
	        beforeSend:function(XMLHttpRequest){
	            //alert('远程调用开始...');
	            $("#loading").html("<img src='images/loading.gif' />");
	            $("#loading").show();
	        },
			success:function(response){
	           $("#loading").empty();
	           $("#loading").hide();
				alert(response.message);
				if(response.success){
					ajaxQuery();
					$("#divBulkAdd").hide();
					$("#tableDiv").show();
					//window.open("materialAbnormal!index.action","_self");
				}else{
					
				}						
			},
			complete:function(XMLHttpRequest,textStatus){
	            // alert('远程调用成功，状态文本值：'+textStatus);
	           $("#loading").empty();
	           $("#loading").hide();
	        },
	        error:function(XMLHttpRequest,textStatus,errorThrown){
	           $("#loading").empty();
	           $("#loading").hide();
	        }
		});
		//$('#btn_upload').val("上传中...");
		//$('#btn_upload').attr('disabled', "true");
	} else {
		alert("对不起，只能上传xlsx格式的文件!\n请重新选择符合条件的文件再上传.");
		return false;
	}
	return false;
}
