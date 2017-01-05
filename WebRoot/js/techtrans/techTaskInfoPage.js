var whList=[];
var baseInfo={};
var assignList=[];
$(document).ready(function(){
	var ecnTaskId = GetQueryString('taskid');
	getBaseInfo(ecnTaskId);
	//generateWhDetailTb();
	
})

function getBaseInfo(ecnTaskId){
	$.ajax({
        url: "techTask!getTaskInfo.action",
        dataType: "json",
        type: "get",
        data: {
        	"taskid":ecnTaskId
        },
        success: function(response) {
        	$.each(response.dataBaseInfo, function(index, value){
        		$("#task_content").val(value.TASK_CONTENT);
        		$("#tech_order_no").val(value.TECH_ORDER_NO);
        		$("#tech_point_num").val(value.TECH_POINT_NUM);
        		$("#tech_order_type").val(value.TECH_ORDER_TYPE);
        		$("#tech_type").val(value.TECH_TYPE);
        		$("#tech_date").val(value.TECH_DATE);
        		$("#duty_unit").val(value.DUTY_UNIT);
        		(value.MAJOR_CHANGE=="Y")?$("#major_change").attr("checked", true):$("#major_change").attr("checked", false);
        		(value.REPEAT_CHANGE=="Y")?$("#repeat_change").attr("checked", true):$("#repeat_change").attr("checked", false);
        		(value.CUSTOM_CHANGE=="Y")?$("#custom_change").attr("checked", true):$("#custom_change").attr("checked", false);
        		$("#custom_change_no").val(value.CUSTOM_CHANGE_NO);
        		$("#tech_date").val(value.TECH_DATE);
        		$("#assign_date").val(value.ASSIGN_DATE);
        		$("#material_check_date").val(value.MATERIAL_CHECK_DATE);
        		$("#assess_date").val(value.ASSESS_DATE);
        		$("#preassigner_id").val(value.PREASSIGNER_ID);
        		$("#preassign_date").val(value.PREASSIGN_DATE);
        		$("#finish_date").val(value.FINISH_DATE);
        	});
        	$.each(response.dataMaterielInfo,function (index,value) {
        		var tr = $("<tr id= '"+value.ID+"'/>");
        		$("<td />").html(value.SAP_NO).appendTo(tr);
        		$("<td />").html(value.MATERIAL_DESC).appendTo(tr);
        		$("<td />").html(value.MATERIAL_TYPE).appendTo(tr);
        		$("<td />").html(value.MATERIAL_SPEC).appendTo(tr);
        		$("<td />").html(value.UNIT).appendTo(tr);
        		$("<td />").html(value.SUPPLIER_CODE).appendTo(tr);
        		$("<td />").html(value.SINGLE_LOSS).appendTo(tr);
        		$("<td />").html(value.LEVEL_USAGE).appendTo(tr);
        		$("<td />").html(value.SINGLE_WEIGHT).appendTo(tr);
        		$("<td />").html(value.SINGLE_USAGE).appendTo(tr);
        		$("<td />").html(value.WORKSHOP).appendTo(tr);
        		$("<td />").html(value.PROCESS).appendTo(tr);
        		$("<td />").html(value.ASSEMB_SITE).appendTo(tr);
        		$("<td />").html(value.REMARK).appendTo(tr);
        		$("<td />").html("-").appendTo(tr);
        		$("<td />").html("-").appendTo(tr);
        		
        		$("#MaterielInfoTable tbody").append(tr);	
        	});
        }
	});
}

function generateWhDetailTb(){
	$("#whtable tbody").html("");
	var date_id="";
	var last_work_date="";
	$.each(whList,function(index,workhour){
		var tr=$("<tr />");

		var rowspan=parseInt($(date_id).attr("rowspan"));
		if(workhour.work_date==last_work_date){
			$(date_id).attr("rowspan",rowspan+1);
		}else{
			date_id="#date_"+index;
			$("<td id='date_"+index+"' rowspan='1' />").html(workhour.work_date).appendTo(tr);
		}
		last_work_date=workhour.work_date;
		$("<td />").html(workhour.staff_number).appendTo(tr);
		$("<td />").html(workhour.staff_name).appendTo(tr);
		$("<td />").html(workhour.job).appendTo(tr);
		$("<td />").html(workhour.work_hour).appendTo(tr);
		$("<td />").html(workhour.editor).appendTo(tr);
		$("<td />").html(workhour.edit_date).appendTo(tr);
		$("<td />").html(workhour.approver).appendTo(tr);
		$("<td />").html(workhour.approve_date).appendTo(tr);		
		$("#whtable tbody").append(tr);
	});
	
}

function generateAssignDetailTb(){
	$("#assigntable tbody").html("");
	var total_assign=0;
	var total_hours=0;
	var total_real_hour=0;
	$.each(assignList,function(index,workhour){
		var assign_hour=parseFloat(workhour.total_hour)*parseFloat(workhour.skill_parameter);
		total_assign+=assign_hour;
		total_hours+=workhour.total_hour;
	});
	$.each(assignList,function(index,workhour){
		var tr=$("<tr />");
		$("<td />").html(workhour.staff_number).appendTo(tr);
		$("<td />").html(workhour.staff_name).appendTo(tr);
		$("<td />").html(workhour.workshop_org).appendTo(tr);
		$("<td />").html(workhour.workgroup_org).appendTo(tr);
		$("<td />").html(workhour.job).appendTo(tr);
		$("<td />").html(workhour.total_hour).appendTo(tr);
		$("<td />").html(workhour.skill_parameter).appendTo(tr);
		var assign_hour=parseFloat(workhour.total_hour)*parseFloat(workhour.skill_parameter);
		var real_hour="";
		var singleHour=parseFloat(baseInfo.single_hour);
		var ecnNumber=parseFloat(baseInfo.ecn_number);
		if(!isNaN(singleHour)&&!isNaN(ecnNumber)){
			real_hour=(assign_hour/total_assign*(ecnNumber*singleHour)).toFixed(2);
		}
		var ass_html="<i rel=\"tooltip\" style='color:blue' data-original-title=\"个人总工时*技能系数*订单总工时/SUM(个人总工时*技能系数)\">"+
		real_hour+"</i>";
		
		$("<td class='assing_hour'/>").html(ass_html).appendTo(tr);
		$("#assigntable tbody").append(tr);
		total_real_hour+=parseFloat(real_hour);
	});
	var tr = $("<tr style='padding:5px'/>");
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("合计：").appendTo(tr);
	$("<td />").html(total_hours.toFixed(2)).appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td style='color:blue' />").html(total_real_hour.toFixed(2)).appendTo(tr);	
	$("#assigntable tbody").append(tr);
	
}
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
