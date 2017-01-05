var whList=[];
var baseInfo={};
var assignList=[];
$(document).ready(function(){
	var ecnTaskId=$("#ecnTaskId").val();
	var ecnNumber=$("#ecnNumber").val();
	var singleHour=$("#singleHour").val();
	//getBaseInfo(ecnTaskId,singleHour,ecnNumber);
	generateWhDetailTb();
	$(".assing_hour").live("mouseover",function(e){
		
	});
})
function getBaseInfo(ecnTaskId,singleHour,ecnNumber){
	$.ajax({
		type: "get",
		dataType: "json",
		url: "ecnDocumentTask!getEcnWorkTimeInfo.action",
		async:false,
	    data: {
			"taskid":ecnTaskId,
			"configStr":singleHour,
			"configStr1":ecnNumber
		},
	    success:function (response) {
	    	baseInfo=response.baseInfo;
	    	assignList=response.assignList;
	    	whList=response.whList;
	    },
	    error:function(){alertError();}
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