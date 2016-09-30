var status_arr={"0":"已创建","2":"已分配","3":"已评估","5":"已完成","6":"已驳回"};
$(document).ready(function(){
	initPage();
	
	//点击查询
	$("#btnQuery").live("click",function(){
		var targetPage=$("#cur").attr("page")||1;
		ajaxQuery(targetPage);
	});

	//复选框全选、反选
	$("#checkall").click(function(){
		if($(this).attr("checked")=="checked"){
			check_All_unAll("#tableResult", true) ;
		}else
		check_All_unAll("#tableResult", false) ;		
	});
	//分配
	$("#btnSave").click(function(){
		var inputlist=$("#tableResult input[class='sapOrder submitOrder']");
		//alert(inputlist.length);
		var orderlist=[];
		$.each(inputlist,function(index,input){
			var tr=$(input).closest("tr");
			var obj={};
			obj.orderId=$(tr).data("id");
			obj.sapOrder=$(input).val();
			var tds=$(input).parent("td").siblings();
			var dutyUnitSelect=$(input).parent("td").parent("tr").find("select");			
			var dutyUnit=$(dutyUnitSelect).val();
		
			var reasonContent=$(tds[1]).find("input").val();
			var totalQty=$(tds[2]).find("input").val();
			obj.dutyUnit=dutyUnit==null?'':dutyUnit.toString();
			obj.reasonContent=reasonContent;
			obj.totalQty=totalQty;
			//alert(dutyUnit);
			if(obj.sapOrder.trim().length>0&&(obj.dutyUnit!=''||obj.reasonContent.trim().length>0 ||obj.totalQty.trim().length>0)){
				orderlist.push(obj);
			}			
		});
		if(orderlist.length>0){
			ajaxEdit(JSON.stringify(orderlist));
		}else{
			alert("无需要保存的数据！");
		}
				
		
	});
	//为工单输入框添加change事件
	$(".sapOrder").live("change",function(e){
		var old_value=$(e.target).closest("tr").data("sapOrder");
		//alert(old_value);
		if(old_value!=$(e.target).val()){
			$(e.target).addClass("submitOrder");
		}	
	});
	//为责任单元下拉框添加change事件
	$(".dutyUnit").live("change",function(e){
		var old_value=$(e.target).closest("tr").data("dutyUnit");
		var sapOrderInput=$(e.target).parent("td").parent("tr").find("input.sapOrder");
		//alert(old_value);
		if(old_value!=$(e.target).val()){
			$(sapOrderInput).removeClass("submitOrder");
			$(sapOrderInput).addClass("submitOrder");
		}	
	});
	//为责任单元下拉框添加change事件
	$(".reason").live("change",function(e){
		var old_value=$(e.target).closest("tr").data("reasonContent");
		var sapOrderInput=$(e.target).parent("td").parent("tr").find("input.sapOrder");
		//alert(old_value);
		if(old_value!=$(e.target).val()){
			$(sapOrderInput).removeClass("submitOrder");
			$(sapOrderInput).addClass("submitOrder");
		}	
	});
	//为责任单元下拉框添加change事件
	$(".totalqty").live("change",function(e){
		var old_value=$(e.target).closest("tr").data("totalQty");
		var sapOrderInput=$(e.target).parent("td").parent("tr").find("input.sapOrder");
		//alert(old_value);
		if(old_value!=$(e.target).val()){
			$(sapOrderInput).removeClass("submitOrder");
			$(sapOrderInput).addClass("submitOrder");
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
	getKeysSelect("DUTY_UNIT_TEMP_ORDER", "", "#duty_unit","noall","keyName");
	getAuthorityFactorySelect("#q_factory", "", "noall");
	//alert($("#tempOrder").find(".treemenu").html());
	getWorkshopSelect_Auth("#q_workshop", "", $("#q_factory :selected").text(), "");
	//默认已创建
	$("#status").val("0");
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
					"',applyDateEnd:'"+applyDateEnd+"',actionType:'assign"+"',status:'"+status+
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
	    		var stauts=value.status==undefined?"":status_arr[value.status];
	    		var applier=value.applier==undefined?"":value.applier;
	    		var applyDate=value.apply_date==undefined?"":value.apply_date;
	    		var approver=value.approver==undefined?"":value.approver;
	    		var approverCardNo=value.card_number==undefined?"":value.card_number;
	    		var approverId=value.approve_id==undefined?"":value.approve_id;
	    		var approveDate=value.approve_date==undefined?"":value.approve_date;
	    		var duty_list=[];
	    		if(value.duty_unit!=undefined){
	    			duty_list=value.duty_unit.split(",");
	    		}	
	    		var tr = $("<tr />");    		
	    		$("<td />").html("<a href=\"javascript:void(window.open('tempOrder!tempOrderInfoPage.action?tempOrderId="+value.id+
						"','newwindow','width=700,height=600,toolbar= no,menubar=no,scrollbars=no,resizable=no,location=no,status=no,top=150,left=280'))\" style='cusor:pointer'>"+tmpOrderNum+"</a>").appendTo(tr);
				$("<td />").html("<input class='sapOrder' style=\"border:1;width:90px;font-size: 12px\" value="+sapOrder+">").appendTo(tr)
				$("<td width='300px'/>").html("<input class='reason' style=\"border:1;width:100%;font-size: 12px\" value="+reasonContent+">").appendTo(tr);
				if(stauts=='已创建'){
					$("<td />").html("<input class='totalqty' style=\"border:1;width:30px;font-size: 12px\" value="+totalQty+">").appendTo(tr);
				}else
					$("<td />").html(totalQty).appendTo(tr);
				$("<td />").html(singleHour).appendTo(tr);
				$("<td />").html(labors).appendTo(tr);
				$("<td />").html(totalHour).appendTo(tr);
				$("<td />").html(value.factory).appendTo(tr);
				$("<td />").html(value.workshop).appendTo(tr);
				$("<td />").html("<select style=\"display: none;\" id=\"duty_unit_"+index+"\" class=\"form-control dutyUnit\" multiple=\"multiple\">"+$("#duty_unit").html()+"</select>").appendTo(tr);				
				$("<td />").html(applier).appendTo(tr);
				$("<td />").html(applyDate).appendTo(tr);
	/*			$("<td />").html(approver).appendTo(tr);
				$("<td />").html(approveDate).appendTo(tr);*/
				$("<td />").html(stauts).appendTo(tr);
				$("#tableResult tbody").append(tr);	
				$('#duty_unit_'+index).multiselect({
					buttonText : function(options, select) {
						if (options.length === 0) {
							return '请选择 <b class="caret"></b>';
						}else{
							var labels = [];
			                options.each(function() {
			                    if ($(this).attr('label') !== undefined) {
			                        labels.push($(this).attr('label'));
			                    }
			                    else {
			                        labels.push($(this).html());
			                    }
			                });
			                return labels.join(', ') + ' <b class="caret"></b>';
						}
					},
					buttonClass:'btn btn-link',
					buttonTitle:function(){
						return "请选择责任单位";
					},
					dropUp: true,
					maxHeight:250
				});
				$('#duty_unit_'+index).multiselect('select', duty_list);
				 $(tr).data("id",value.id);
				 $(tr).data("sapOrder",sapOrder);
				 $(tr).data("dutyUnit",value.duty_unit);
				 $(tr).data("reasonContent",value.reason_content);
				 $(tr).data("totalQty",value.total_qty);
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


function ajaxEdit(conditions){	
	var targetPage=$("#cur").attr("page")||1;
	$.ajax({
		url: "tempOrder!assignOrder.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"conditions": conditions
	    },
	    success:function(response){
	    	if(response.success){
	    		alert(response.message);
		    	ajaxQuery(targetPage);
	    	}else{
	    		alert(response.message);
	    	}
	    	
	    }
	}); 	
}
