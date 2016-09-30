var modal_type="";
$(document).ready(function(){
	initPage();
	//查询
	$("#btnQuery").click(function(){
		ajaxQuery(1);
	});
	//新增
	$("#btnAdd").click(function(){
		modal_type="new";
		getFactorySelect("#new_factory","","empty");
		getOrderNoSelect("#new_orderNo","#new_orderId",orderNoBack);
		$("#div_order_dispatch").css("display","none");
		$("#newModal").modal("show");
	});
	//编辑
	$(".fa-pencil").live("click",function(e){
		modal_type="edit";
		var tds=$(e.target).parent("td").siblings();	
		var tr=$(e.target).parent("td").parent("tr");
		var factory=$(tds[2]).html();
		var orderNo=$(tds[0]).html();
		var planNum=$(tds[5]).html();
		var planDispatched=$(tds[7]).html();
		var status=($(tds[10]).html()=="发车中"?'1':($(tds[10]).html()=="已完成"?'2':'0'));
		var planDate=$(tds[6]).html();
		var mailAddrs=$(tr).data("mail_addrs");
		s_orderName=$(tr).data("order_name");
		s_busType=$(tds[3]).html();
		s_orderQty=$(tds[4]).html();
		s_orderId=$(tr).data("order_id");
		var obj={};
		obj.name=s_orderName;
		obj.busType=s_busType;
		obj.orderQty=s_orderQty;
		obj.id=s_orderId;
		getFactorySelect("#edit_factory",factory,"empty");	
		$("#edit_orderNo").val(orderNo);
		$("#edit_plan_num").val(planNum);
		$("#edit_plan_date").val(planDate);
		$("#edit_email_addrs").val(mailAddrs);
		$("#edit_orderId").val(s_orderId);
		if($(tr).data("custom_flag")=="0"){
			$("#editModal input[type=radio][value=0]").attr("checked","checked");
		}
		if($(tr).data("custom_flag")=="1"){
			$("#editModal input[type=radio][value=1]").attr("checked","checked");
		}
		$("#plan_id").val($(tr).data("plan_id"));
		
		orderNoBack(obj);
		getOrderNoSelect("#edit_orderNo","#edit_orderId",orderNoBack,"");
		$("#edit_order_dispatch").css("display","");
		$("#editModal").data("planDispatched",planDispatched);
		$("#editModal").data("planStatus",status);
		$("#editModal").modal("show");
	});
	//确定新增
	$("#btnAddConfirm").live("click",function(){
		var factory=$("#new_factory").val();
		var orderNo=$("#new_orderNo").val();
		var planNum=$("#new_plan_num").val();
		var dispatchDate=$("#new_plan_date").val();
		var emailAddrs=$("#new_email_addrs").val();
		var flag=true;
		if(factory==null||factory.trim().length==0){
			alert("请选择工厂!");
			flag=false;
		}		
		if(orderNo==null|| orderNo.trim().length==0){
			alert("请输入订单编号!");
			flag=false;
			return false;
		}
		if(planNum==null|| planNum.trim().length==0){
			alert("请输入发车数量!");
			flag=false;
			return false;
		}
		if(emailAddrs==null || emailAddrs.trim().length==0){
			alert("请输入邮箱地址!");
			flag=false;
			return false;
		}
		if(dispatchDate==null|| dispatchDate.trim().length==0){
			alert("请输入发车时间!");
			flag=false;
			return false;
		}
		if($("#new_orderId").val()==""){
			alert("请输入有效订单编号");
			flag=false;
			return false;
		}
		var plan_left_qty=$("#new_plan_left_qty").html();
		plan_left_qty=plan_left_qty.substring(0,plan_left_qty.length-1);
		//alert(plan_left_qty);
		if(parseInt(planNum)>parseInt(plan_left_qty)){
			alert("计划发车数量不能大于剩余数量");
			flag=false;
			return false;
		}
		if(flag){
			$("#newPlanForm").ajaxSubmit({
				url:"busDispatch!addPlan.action",
				type: "post",
				dataType:"json",
				success:function(response){
					alert(response.message);
					if(response.success){
						var targetPage=$("#cur").attr("page");
						//alert(targetPage);
						emptyModal();
						ajaxQuery(targetPage);
					}						
				}			
			});
		}
		
	});
	//确定编辑
	$("#btnEditConfirm").live("click",function(){
		var factory=$("#edit_factory").val();
		var orderNo=$("#edit_orderNo").val();
		var planNum=$("#edit_plan_num").val();
		var dispatchDate=$("#edit_plan_date").val();
		var emailAddrs=$("#edit_email_addrs").val();
		var flag=true;
		if(factory==null||factory.trim().length==0){
			alert("请选择工厂!");
			flag=false;
		}		
		if(orderNo==null|| orderNo.trim().length==0){
			alert("请输入订单编号!");
			flag=false;
			return false;
		}
		if(planNum==null|| planNum.trim().length==0){
			alert("请输入发车数量!");
			flag=false;
			return false;
		}
		if(emailAddrs==null || emailAddrs.trim().length==0){
			alert("请输入邮箱地址!");
			flag=false;
			return false;
		}
		if(dispatchDate==null|| dispatchDate.trim().length==0){
			alert("请输入发车时间!");
			flag=false;
			return false;
		}
		if($("#edit_orderId").val()==""){
			alert("请输入有效订单编号");
			flag=false;
			return false;
		}
		var plan_left_qty=$("#edit_plan_left_qty").html();
		plan_left_qty=plan_left_qty.substring(0,plan_left_qty.length-1);
		//alert(plan_left_qty);
		if(parseInt(planNum)>parseInt(plan_left_qty)){
			alert("计划发车数量不能大于剩余数量");
			flag=false;
			return false;
		}
		var status=planNum==$("#editModal").data("planDispatched")?"2":$("#editModal").data("planStatus");
		//alert(status);
		if(flag){
			$("#editPlanForm").ajaxSubmit({
				url:"busDispatch!updatePlan.action",
				type: "post",
				data:{"plan.status":status},
				dataType:"json",
				success:function(response){
					alert(response.message);
					if(response.success){
						var targetPage=$("#cur").attr("page");
						//alert(targetPage);
						emptyEditModal();
						ajaxQuery(targetPage);
					}						
				}			
			});
		}
		
	});
});
function initPage(){
	pageSize=20;
	getFactorySelect("#search_factory","","");
	getBusTypeSelect("#search_bus_type","","");
	getOrderNoSelect("#search_order_no");
	getOrderNoSelect("#search_order","#orderId");
}
//清空 modal
function emptyModal(){
	$("#new_factory").val("");
	$("#new_orderNo").val("");
	$("#new_ordeDesc").val("");
	$("#new_orderId").val("");
	$("#new_order_dispatch").css("display","none");
	$("#new_plan_num").val("");
	$("#new_plan_date").val("");
	$("#new_email_addrs").val("");
	$("#newModal").modal("hide");
}
//清空 modal
function emptyEditModal(){
	$("#edit_factory").val("");
	$("#edit_orderNo").val("");
	$("#edit_ordeDesc").val("");
	$("#edit_orderId").val("");
	$("#edit_order_dispatch").css("display","none");
	$("#edit_plan_num").val("");
	$("#edit_plan_date").val("");
	$("#edit_email_addrs").val("");
	$("#editModal").modal("hide");
}
//订单编号选中回调函数
function orderNoBack(obj){
	s_orderName=obj.name;
	s_busType=obj.busType;
	s_orderQty=obj.orderQty;
	s_orderId=obj.id;
	//alert(s_orderId);
	$("#"+modal_type+"_ordeDesc").html(s_orderName+" "+s_busType+s_orderQty+"辆");
	var conditions="{orderId:"+s_orderId+"}";
	$.ajax({
		url:"busDispatch!getOrderDispatchQty.action",
		dataType: "json",
		data:{
			"conditions":conditions
		},
		async: false,
		error: function () {alert(response.message)},
		success: function (response) {	
			var info="订单数量："+s_orderQty+"辆";
			info+="  已计划发车数量："+response.order_dispatch_qty+"辆";
			info+="  剩余数量："+(s_orderQty-response.order_dispatch_qty)+"辆";
			//alert(info);
			$("#"+modal_type+"_order_qty").html(s_orderQty+"辆");
			$("#"+modal_type+"_plan_done_qty").html(response.order_dispatch_qty+"辆");
			$("#"+modal_type+"_plan_left_qty").html((s_orderQty-response.order_dispatch_qty)+"辆");
			$("#"+modal_type+"_order_dispatch").css("display","");
		}
	})
}
//ajaxQuery
function ajaxQuery(targetPage){
	factoryId=isNaN(parseInt($("#search_factory").val()))?0:parseInt($("#search_factory").val());
	busTypeId=isNaN(parseInt($("#search_bus_type").val()))?0:parseInt($("#search_bus_type").val());
	var conditions="{";
	conditions+="factoryId:"+factoryId+",";
	conditions+="busTypeId:"+busTypeId+",";
	conditions+="order:'"+$("#search_order").val()+"',";
	conditions+="diapatchDateStart:'"+$("#dispatch_date_start").val()+"',";
	conditions+="diapatchDateEnd:'"+$("#dispatch_date_end").val()+"'}";
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "busDispatch!getDispatchPlanList.action",
		data : {
			"conditions":conditions,
			"pager.pageSize" : 20,
			"pager.curPage" : targetPage || 1
		},
		success : function(response) {
			$("#tableResult tbody").html("");
			$
					.each(
							response.dataList,
							function(index, value) {
								// alert(value.id);
								var tr = $("<tr />");
								$("<td />").html(value.order_no)
										.appendTo(tr);
								$("<td />").html(value.order_name+" "+value.bus_type+value.order_qty+"辆").appendTo(
										tr);
								$("<td />").html(value.factory_name)
										.appendTo(tr);
								$("<td />").html(value.bus_type)
										.appendTo(tr);
								$("<td />").html(value.order_qty).appendTo(
										tr);
								$("<td />").html(value.plan_dispatch_qty)
										.appendTo(tr);
								$("<td />").html(value.dispatch_date)
										.appendTo(tr);
								$("<td />").html(value.plan_done_qty)
								.appendTo(tr);
								$("<td />").html(value.plan_dispatch_qty-value.plan_done_qty)
								.appendTo(tr);
								$("<td />").html(value.customer_number_flag=="0"?"无自编号":"有自编号")
								.appendTo(tr);
								var status=(value.status=="1"?'发车中':(value.status=="2"?'已完成':'已计划'));
								$("<td />").html(status)
								.appendTo(tr);
								var editTd=$("<td />").html("");
								if(value.status!="2"){
									editTd = $("<td />")
									.html(
										"<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\" title='编辑' style=\"cursor: pointer\"></i>");
								}
								
								editTd.appendTo(tr);
								tr.data("plan_id", value.id);
								tr.data("order_name",value.order_name);
								tr.data("order_id",value.order_id);
								tr.data("mail_addrs",value.email_addrs);
								tr.data("custom_flag",value.customer_number_flag);
								$("#tableResult tbody").append(tr);
							});
			$("#tableResult").show();
			$("#total").html(response.pager.totalCount);
			$("#total").attr("total", response.pager.totalCount);
			$("#cur").attr("page", response.pager.curPage);
			$("#cur").html(
					"<a href=\"#\">" + response.pager.curPage + "</a>");
			$("#pagination").show();
		}
	});
}