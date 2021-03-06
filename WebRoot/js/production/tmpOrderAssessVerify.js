var status_arr={"0":"已创建","2":"已分配","3":"已评估","5":"已完成","6":"已驳回"};
$(document).ready(function(){
	initPage();
	
	//点击查询
	$("#btnQuery").live("click",function(){
		//var targetPage=$("#cur").attr("page")||1;
		ajaxQuery(1);
	});

	//复选框全选、反选
	$("#checkall").click(function(){
		if($(this).attr("checked")=="checked"){
			check_All_unAll("#tableResult", true) ;
		}else
		check_All_unAll("#tableResult", false) ;		
	});
	
	//批准
	$("#btnVerify").click(function(){
		//校验用户是否有评估工时审核权限
		if(!validateUrlAuth("/tempOrder!assessOrderVerify.action")){
			return false;
		}
		var chcklist=$("#tableResult tbody :checked");
		var orderlist=[];
		var saveFlag=true;
		$.each(chcklist,function(index,cbox){
			if($(cbox).attr("id")!="checkall"){
				var tr=$(cbox).parent("td").parent("tr");
				var order={};
				order.orderId=$(tr).data("id");
				orderlist.push(order);													
			}				
		});
		if(orderlist.length==0){
			if(saveFlag){
				alert("无有效数据保存！")
			}
			
		}else{
			//orderIdlist=orderIdlist.substr(0,orderIdlist.length-1);		
			ajaxBatchAssess(orderlist);
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
function initPage(){
	getAuthorityFactorySelect("#q_factory", "", "noall");
	getWorkshopSelect_Auth("#q_workshop", "", $("#q_factory :selected").text(), "");
	$("#status").val("2");
	//alert($("#tempOrder").find(".treemenu").html());
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
					"',applyDateEnd:'"+applyDateEnd+"',status:'"+status+"',actionType:'assessVerify"+
					"',factory:'"+factory+"',workshop:'"+workshop+"'}";
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
	    		var reasonContent=value.reason_content==undefined?"":value.reason_content;
	    		var sapOrder=value.sap_order==undefined?"":value.sap_order;
	    		var totalQty=value.total_qty==undefined?"":value.total_qty;
	    		var singleHour=value.single_hour==undefined?"":value.single_hour;
	    		var labors=value.labors==undefined?"":value.labors;
	    		var totalHour=value.total_hours==undefined?"":value.total_hours;
	    		var status=value.status==undefined?"":status_arr[value.status];
	    		var applyDate=value.apply_date==undefined?"":value.apply_date;
	    		var approver=value.applier==undefined?"":value.applier;
	    		var approverCardNo=value.card_number==undefined?"":value.card_number;
	    		var approverId=value.approve_id==undefined?"":value.approve_id;
	    		
	    		var tr = $("<tr />");
	    		if(status=='已分配'){
	    			$("<td />").html("<input type='checkbox'>").appendTo(tr);
	    		}else{
	    			$("<td />").html("").appendTo(tr);
	    		}
	    		$("<td />").html("<a href=\"javascript:void(window.open('tempOrder!tempOrderInfoPage.action?tempOrderId="+value.id+
						"','newwindow','width=700,height=600,toolbar= no,menubar=no,scrollbars=no,resizable=no,location=no,status=no,top=150,left=280'))\" style='cusor:pointer'>"+tmpOrderNum+"</a>").appendTo(tr);
				$("<td width='300px'/>").html(reasonContent).appendTo(tr);
				$("<td />").html(sapOrder).appendTo(tr);
				$("<td />").html(totalQty).appendTo(tr);
				$("<td />").html(singleHour).appendTo(tr);
				$("<td />").html(labors).appendTo(tr);
				
				$("<td />").html(totalHour).appendTo(tr);
				$("<td />").html(value.factory).appendTo(tr);
				$("<td />").html(value.workshop).appendTo(tr);
				$("<td />").html(value.duty_unit).appendTo(tr);	
				$("<td />").html(value.applier).appendTo(tr);
				$("<td />").html(applyDate).appendTo(tr);
				$("<td />").html(status).appendTo(tr);
				/*$("<td />").html("<i name='edit' rel=\"tooltip\" title='工时评估' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>").appendTo(tr);*/
				$("#tableResult tbody").append(tr);
				 $(tr).data("id",value.id);
				 $(tr).data("applier",value.applier);
				 $(tr).data("singleHour",singleHour);
				 $(tr).data("labors",labors);
	    	});	
	    	$("#tableResult").show();
	    	/*if(response.pager.totalCount>response.pager.pageSize){
	    		
	    	}*/
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

//评估工时审核
function ajaxBatchAssess(orderlist){
	var targetPage=$("#cur").attr("page")||1;
	var conditions=JSON.stringify(orderlist);
	$.ajax({
		url: "tempOrder!assessOrderVerify.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"conditions": conditions
	    },
	    success:function(response){
	    	if(response.success){
	    		alert("保存成功");
		    	ajaxQuery(targetPage);
		    	$("#editModal").modal("hide")
	    	}else{
	    		alert(response.message);
	    	}
	    	
	    }
	}); 	
}
