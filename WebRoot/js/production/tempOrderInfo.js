var whList=[];
var baseInfo={};
var assignList=[];
var prodList=[];
$(document).ready(function(){
	var tempOrderId=$("#tempOrderId").val();
	getBaseInfo(tempOrderId);
	generateBaseInfoTb();
	
	$(".assing_hour").live("mouseover",function(e){
		
	});
})

function getBaseInfo(tempOrderId){
	$.ajax({
		type: "get",
		dataType: "json",
		url: "tempOrder!getTempOrderInfo.action",
		async:false,
	    data: {
			"tempOrderId":tempOrderId
		},
	    success:function (response) {
	    	baseInfo=response.baseInfo;
	    	assignList=response.assignList;
	    	whList=response.whList;
	    	prodList=response.prodList;
	    },
	    error:function(){alertError();}
	});
}

function generateBaseInfoTb(){
	$("#launcher").html(baseInfo.order_launcher);
	$("#order_type").html(baseInfo.order_type);
	$("#totalQty").html(baseInfo.total_qty);
	$("#head_launch").html(baseInfo.head_launch_unit);
	$("#single_hour").html(baseInfo.single_hour);
	$("#labors").html(baseInfo.labors);
	$("#acceptor").html(baseInfo.acceptor);
	/*$("#ready_workhour").html(baseInfo.total_hours);*/
	$("#reason").html(baseInfo.reason_content);
	$("#singlehour").html(baseInfo.single_hour);
	$("#assesor").html(baseInfo.assesor);
	$("#assessVerifier").html(baseInfo.assess_verifier);
	$("#cost_transfer").html(baseInfo.is_cost_transfer);
	$("#cost_signer").html(baseInfo.cost_unit_signer);
	$("#sap_order").html(baseInfo.sap_order);
	$("#order_serial").html(baseInfo.order_serial_no);
	$("#acceptor_sign").html(baseInfo.acceptor);
	$("#auditor").html(baseInfo.workhour_auditor);
	$("#audit_date").html(baseInfo.workhour_auditor_date);	
	$("#factory").html(baseInfo.factory);
	$("#workshop").html(baseInfo.workshop);
	$("#duty_unit").html(baseInfo.duty_unit);
}

function generateProdDetailTb(){
	$("#prodtable tbody").html("");
	var month_next="";
	var total_output={};
	$.each(prodList,function(index,workhour){
		count_month=workhour.record_date.substring(0,7);
		month_next=index==prodList.length-1?"":prodList[index+1].record_date.substring(0,7);
		//alert(month_next)
		var tr=$("<tr />");
		$("<td />").html(workhour.output).appendTo(tr);
		$("<td />").html(workhour.recorder==undefined?"":workhour.recorder).appendTo(tr);
		$("<td />").html(workhour.record_date).appendTo(tr);	
		$("#prodtable tbody").append(tr);
		if(total_output[count_month]){
			total_output[count_month]+=parseFloat(workhour.output);
		}else{
			total_output[count_month]=parseFloat(workhour.output);
		}
		
		//按月合计

		if(month_next!=count_month){
			var tr_count=$("<tr />");
			$("<td id='m_"+count_month+"' colspan=3 style='font-weight:bold'/>").html(count_month+"&nbsp;&nbsp;合计："+total_output[count_month]).appendTo(tr_count);
			$("#prodtable tbody").append(tr_count);
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
		var assign_hour=workhour.total_hour*workhour.skill_parameter;
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
		$("<td />").html(parseFloat(workhour.total_hour).toFixed(2)).appendTo(tr);
		//$("<td />").html(workhour.skill_parameter).appendTo(tr);
		var assign_hour=workhour.total_hour*workhour.skill_parameter;
		var finished_qty=baseInfo.finished_qty==undefined?0:parseFloat(baseInfo.finished_qty);
		var single_hour=baseInfo.single_hour==undefined?0:parseFloat(baseInfo.single_hour);
		var real_hour=parseFloat(workhour.total_real_hour).toFixed(2);
		real_hour=isNaN(real_hour)?0:real_hour;
		var ass_html="<i rel=\"tooltip\" style='color:blue' >"+
		real_hour+"</i>";
		
		$("<td class='assing_hour'/>").html(ass_html).appendTo(tr);
		$("#assigntable tbody").append(tr);
		total_real_hour=parseFloat(total_real_hour)+parseFloat(real_hour);
		total_real_hour=isNaN(total_real_hour)?0:total_real_hour.toFixed(2);
	});
	var tr = $("<tr style='padding:5px'/>");
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("合计：").appendTo(tr);
	$("<td />").html(total_hours).appendTo(tr);
/*	$("<td />").html("").appendTo(tr);*/
	$("<td style='color:blue' />").html(total_real_hour).appendTo(tr);	
	$("#assigntable tbody").append(tr);
	
}	