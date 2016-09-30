var orderQty;//订单数量
$(document).ready(function(){
	//initPage();
	$("#querydisBtn").attr("disabled",true);
	var orderNo=GetQueryString("orderNo");
	if(orderNo==null||orderNo.trim().length>0){
		$("#orderNo").val(orderNo);
		ajaxQueryOrderTool($("#orderNo").val());
	}
	getOrderNoSelect("#orderNo","",function(obj){
		$("#orderName").html(obj.name);
		$("#busType").html(obj.busType);
		$("#orderQty").html(obj.orderQty+"辆");
		orderQty=obj.orderQty;
		$("#queryBtn").attr("disabled",false);
		$("#dispatchDetail tbody").html("");
		$("#dipatchRecord tbody").html("");
	},"");
	//点击查询，查询订单附件信息
	$("#queryBtn").click(function(){
		ajaxQueryOrderTool($("#orderNo").val());
		$("#querydisBtn").attr("disabled",false);
	});
	
	$("#querydisBtn").click(function(){
		ajaxQueryOrderTool($("#orderNo").val());
	});
	
	//点击“+”符号，往附件表格新增一行
	$(".fa-plus").live("click",function(){
		var trIndex=$("#dispatchDetail tbody").find("tr").length;
		var tr=$("<tr />");
		var toolName_input="<input id='toolName_"+trIndex+"' style='border:0;width:100%;height:100%' class='tool_name' name='otDispatchRecordList["+trIndex+"].tool_name'>";
		//alert(toolName_input);
		$("<td />").html("<i class='fa fa-times' style='cursor: pointer;color:red'></i>").appendTo(tr);
		$("<td />").html(toolName_input).appendTo(tr);
		$("<td />").html("<input id='singleUse_"+trIndex+"'style='border:0;width:100%;height:100%' class='singleUse' name='otDispatchRecordList["+trIndex+"].single_use_qty'>").appendTo(tr);
		$("<td />").html("<input id='unit_"+trIndex+"'style='border:0;width:100%;height:100%' name='otDispatchRecordList["+trIndex+"].unit'>").appendTo(tr);
		$("<td id='orderQty_"+trIndex+"'/>").html("").appendTo(tr);
		$("<td id='dispatchQty_"+trIndex+"'/>").html("0").appendTo(tr);
		$("<td />").html("<input style='border:0;width:100%;height:100%' class='quantity' name='otDispatchRecordList["+trIndex+"].quantity'>").appendTo(tr);
		$("<input type='hidden' name='otDispatchRecordList["+trIndex+"].order_no' value='"+$("#orderNo").val()+"'>").appendTo(tr);
		$("<input type='hidden' name='otDispatchRecordList["+trIndex+"].receiver' class='receiver'>").appendTo(tr);
		$("<input type='hidden' name='otDispatchRecordList["+trIndex+"].workcardid' class='workcardid'>").appendTo(tr);
		$("<input type='hidden' name='otDispatchRecordList["+trIndex+"].department' class='department'>").appendTo(tr);
		$("#dispatchDetail tbody").append(tr);
	})
	
	//点击“x”符号，删除一行
	$(".fa-times").live("click",function(){
		$(this).parent().parent().remove();
	});
	//填写完单车数量计算出订单合计
	$(".singleUse").live("change",function(){
		//alert($(this).val());
		var tds=$(this).parent("td").siblings();
		if(isNaN(parseInt($(this).val()))||parseInt($(this).val())==0){
			alert("单车数量只能是大于0的数字！");
			$(this).val(1);
		}	
		$(tds[3]).html(orderQty*$(this).val());	
		
	});
	//填写完交接数量检查是否超出剩余数量
	$(".quantity").live("change",function(){
		var tds=$(this).parent().siblings();		
		var quantity_left=parseInt($(tds[4]).html())-parseInt($(tds[5]).html());
		var quantity=isNaN(parseInt($(this).val()))?0:parseInt($(this).val());
		if(quantity>quantity_left){
			alert("发车数量不能大于剩余数量！");
			$(this).val("");
			$(this).focus();
		}
	});
	//点击确认交接
	$("#dispatchBtn").click(function(){
		var show_flag=true;
		var trs=$("#dispatchDetail tbody").find("tr");
		$(trs).each(function(index,tr){
			var tool_name=$("#toolName_"+index).val();
			var single_use=$("#singleUse_"+index).val();
			var unit=$("#unit_"+index).val();
			var quanity=$(tr).find(".quantity")[0];
			if(tool_name.trim().length==0){
				alert("随车附件名称不能为空！");
				show_flag=false;
				return false;
			}
			if(single_use.trim().length==0){
				alert("单车数量不能为空！");
				show_flag=false;
				return false;
			}
			if(unit.trim().length==0){
				alert("单位不能为空！");
				show_flag=false;
				return false;
			}
			if(isNaN(parseInt($(quanity).val()))){
				$(quanity).val(0);
			}
					
		});
		
		
/*		$(".quantity").each(function(){
			if(isNaN(parseInt($(this).val()))){
				$(this).val(0);
			}		
		});
		$(".tool_name").each(function(){
			if($(this).val().trim().length==0){
				alert("随车附件名称不能为空！");
				show_flag=false;
			}
		});*/

		if(show_flag){
			$("#dispatchModal").modal("show");
			$("#workcardid").val("");
			$("#workcardid").focus();
		}	
		
	})
	//刷厂牌
	$("#workcardid").bind('keydown', function(event) {
		var cardId=$(this).val();
		//cardId=0;
		if (event.keyCode == "13") {
			var user=getUserInfoByCard(cardId);
			if(user==null){
				alert("不是该系统用户，请联系系统管理员！");
			}else{
				$("#workcardid").val(user.card_number);
				$("#receiver").val(user.username);
				$("#department").val(user.department);
			}
			return false;
		}
	});
	//交接
	$("#btnDispatchConfirm").click(function(){
		
		if(confirm("确认交接？")){
			var cardNumber=$("#workcardid").val();
			var username=$("#receiver").val();
			var department=$("#department").val();
			$(".workcardid").val(cardNumber);
			$(".receiver").val(username);
			$(".department").val(department);
			
			$("#dispatchForm").ajaxSubmit({
				url:"busDispatch!saveOrderDispatchRecord.action",
				type: "post",
				dataType:"json",
				data:{
				},
				success:function(response){
					alert(response.message);
					if(response.success){
						window.open("busDispatch!orderDispatch.action","_self");
					}						
				}			
			});
		}
	})
	
});
//页面初始化，绑定订单编号模糊查询功能
function initPage(){
	getOrderNoSelect("#orderNo","","","");
}
//ajax 查询订单附件信息
function ajaxQueryOrderTool(orderNo){
	$("#dipatchRecord tbody").html("");
	var conditions="{'orderNo':'"+orderNo+"','dis_name':'"+$("#dis_name").val()+"'" +
			",'dis_receiver':'"+$("#dis_receiver").val()+"'" +
			",'dis_date_start':'"+$("#dis_date_start").val()+"','dis_date_end':'"+$("#dis_date_end").val()+"'}";
	$.ajax({
		url:"busDispatch!getQueryOrderTool.action",
		dataType:"json",
		data:{
			"conditions":conditions
		},
		success:function(response){
			if(response.recordList.length>0){
				$("#queryBtn").attr("disabled",true);
			}
			generateRecordTable(response.recordList);
			generateListTabel(response.recordList);
		}
	})
	
	$("#dispatchForm").css("display","");
}
//动态生成附件交接表
function generateListTabel(recordList){
	$("#dispatchDetail tbody").html("");
	var last_tool_name;
	var i=0;
	$.each(recordList,function(index,value){
		if(last_tool_name==value.tool_name){
			var tds=$("#dispatchDetail tbody tr:last").children();
			//alert(tds.length);
			var quantityinput=$(tds[5]);
			var last_quantity=isNaN(parseInt($(tds[5]).html()))?0:parseInt($(tds[5]).html());
			$(quantityinput).html(value.quantity+last_quantity);
		}else{
			var tr=$("<tr />");
			var toolName_input="<input id='toolName_"+i
							+"' style='border:0;width:100%;height:100%' class='tool_name' name='otDispatchRecordList["+i+"].tool_name'"
							+"value='"+value.tool_name+"' readonly>";
			var singleUse_input="<input id='singleUse_"+i
							+"'style='border:0;width:100%;height:100%' class='singleUse' name='otDispatchRecordList["+i+"].single_use_qty'"
							+" value="+value.single_use_qty+" readonly >";
			var unit_input="<input id='unit_"+i+"' style='border:0;width:100%;height:100%' name='otDispatchRecordList["+i+"].unit'"
							+" value='"+value.unit+"' readonly>";
			var quantity_input="<input style='border:0;width:100%;height:100%' class='quantity' name='otDispatchRecordList["+i+"].quantity'>";
			//alert(toolName_input);
			$("<td />").html("<i class='fa fa-times' style='cursor: pointer;color:red'></i>").appendTo(tr);
			$("<td />").html(toolName_input).appendTo(tr);
			$("<td />").html(singleUse_input).appendTo(tr);
			$("<td />").html(unit_input).appendTo(tr);
			$("<td id='orderQty_"+i+"'/>").html(value.order_total).appendTo(tr);
			$("<td id='dispatchQty_"+i+"'/>").html(value.quantity).appendTo(tr);
			$("<td />").html(quantity_input).appendTo(tr);
			$("<input type='hidden' name='otDispatchRecordList["+i+"].order_no' value='"+$("#orderNo").val()+"'>").appendTo(tr);
			$("<input type='hidden' name='otDispatchRecordList["+i+"].receiver' class='receiver'>").appendTo(tr);
			$("<input type='hidden' name='otDispatchRecordList["+i+"].workcardid' class='workcardid'>").appendTo(tr);
			$("<input type='hidden' name='otDispatchRecordList["+i+"].department' class='department'>").appendTo(tr);
			$("#dispatchDetail tbody").append(tr);
			i++;
		}	
		last_tool_name=value.tool_name;
	});
}

//动态生成交接记录表
function generateRecordTable(recordList){
	$.each(recordList,function(index,value){
		var tr=$("<tr />");
		//alert(toolName_input);
		$("<td />").html(value.tool_name).appendTo(tr);
		$("<td />").html(value.single_use_qty).appendTo(tr);
		$("<td />").html(value.unit).appendTo(tr);
		$("<td />").html(value.quantity).appendTo(tr);
		$("<td />").html(value.editor).appendTo(tr);
		$("<td />").html(value.receiver).appendTo(tr);
		$("<td />").html(value.edit_date).appendTo(tr);
		$("#dipatchRecord tbody").append(tr);
	});
}