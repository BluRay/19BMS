var status_arr={"0":"已创建","2":"已分配","3":"已评估","5":"已完成","6":"已驳回"};
$(document).ready(function() {
	initPage();
	//点击查询
	$("#btnQuery").live("click",function(){
		var targetPage=$("#cur").attr("page")||1;
		ajaxQuery(targetPage);
	});
	
	$("#q_factory").change(
			function(e) {
				var eleId=$(e.target).attr("id");
				var selectFactory = $("#"+eleId+" :selected").text();
				var workshopEleId="#q_workshop";
				getWorkshopSelect_Auth(workshopEleId, null,
						selectFactory, "");
	});
})	
function initPage(){
	getAuthorityFactorySelect("#q_factory", "", "noall");
	getWorkshopSelect_Auth("#q_workshop", "", $("#q_factory :selected").text(), "");
	//alert($("#tempOrder").find(".treemenu").html());
	//默认已创建
	$("#status").val("3");
	$("#tempOrder").find(".treemenu").addClass("collapsed");
	$("#tmp_order").addClass("in");
	var span=$("#tempOrder").find(".pull-right.fa");
	if($(span).hasClass("fa-angle-down")){
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}
	ajaxQuery(1);
}

function ajaxQuery(targetPage){
	var orderNo=$('#tmp_order_no').val();
	var reason_content=$('#tmp_reason_content').val();
	var applyDateStart=$('#create_start').val();
	var applyDateEnd=$('#create_end').val();
	var status=$('#status').val();
	var factory=$("#q_factory :selected").text();
	var workshopAll="";
	$("#q_workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	//alert(workshopAll);
	var workshop=$("#q_workshop :selected").text()=="全部"?workshopAll:$("#q_workshop :selected").text();
	var conditions = "{orderNo:'" + orderNo+"',applyDateStart:'"+applyDateStart+
					"',applyDateEnd:'"+applyDateEnd+"',status:'"+status+
					"',factory:'"+factory+"',workshop:'"+workshop+"',reason_content:'"+reason_content+"'}";
	$.ajax({
		url: "tempOrder!orderList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"conditions": conditions,
	    	"pager.pageSize":10,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){
	    	$("#tableResult tbody").html("");
	    	$.each(response.dataList,function(index,value){
	    		var tmpOrderNum=value.tmp_order_num==undefined?"":value.tmp_order_num;
	    		var orderSerialNo=value.order_serial_no==undefined?"":value.order_serial_no;
	    		var reasonContent=value.reason_content==undefined?"":value.reason_content;
	    		var sapOrder=value.sap_order==undefined?"":value.sap_order;
	    		var totalQty=value.total_qty==undefined?"":value.total_qty;
	    		var singleHour=value.single_hour==undefined?"":value.single_hour;
	    		var labors=value.labors==undefined?"":value.labors;
	    		var totalHour=parseFloat(totalQty)*parseFloat(singleHour);
	    		var stauts=value.status==undefined?"":status_arr[value.status];
	    		var applyDate=value.apply_date==undefined?"":value.apply_date;
	    		var approver=value.applier==undefined?"":value.applier;
	    		var approverCardNo=value.card_number==undefined?"":value.card_number;
	    		var approverId=value.approve_id==undefined?"":value.approve_id;
	    		
	    		var tr = $("<tr />");
		
	    		$("<td />").html("<a href=\"javascript:void(window.open('tempOrder!tempOrderInfoPage.action?tempOrderId="+value.id+
						"','newwindow','width=700,height=600,toolbar= no,menubar=no,scrollbars=no,resizable=no,location=no,status=no,top=150,left=280'))\" style='cusor:pointer'>"+orderSerialNo+"</a>").appendTo(tr);
				$("<td />").html(reasonContent).appendTo(tr);
				$("<td />").html(sapOrder).appendTo(tr);
				$("<td />").html(totalQty).appendTo(tr);
				$("<td />").html(value.finished_qty==undefined?"0":value.finished_qty).appendTo(tr);
				$("<td />").html(singleHour).appendTo(tr);
				$("<td />").html(labors).appendTo(tr);
				$("<td />").html(totalHour.toFixed(2)).appendTo(tr);
				$("<td />").html(value.factory).appendTo(tr);
				$("<td />").html(value.workshop).appendTo(tr);
				$("<td />").html(value.duty_unit).appendTo(tr);
				$("<td />").html(stauts).appendTo(tr);
				$("#tableResult tbody").append(tr);
				 $(tr).data("id",value.id);
				 $(tr).data("approverCardNo",approverCardNo);
				 $(tr).data("approverId",approverId);
				 $(tr).data("approver",approver);
	    	});	
	    	$("#tableResult").show();
	    	$("#total").html(response.pager.totalCount);
			$("#total").attr("total", response.pager.totalCount);
			$("#cur").attr("page", response.pager.curPage);
			$("#cur").html(
					"<a href=\"#\">" + response.pager.curPage + "</a>");
			$("#pagination").show();
		
			$("#checkall").attr("checked", false);
			
	    }
	    
	});
}
