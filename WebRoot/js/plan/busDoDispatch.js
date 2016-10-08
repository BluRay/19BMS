var toolList;
var planLeft;
var busNoArray = new Array();

$(document).ready(function() {
	pageSize=20;
	ajaxQuery();

	// 点击发车按钮，显示发车页面
	$(".fa-bus").live("click", function() {
		$(this).parent("td").parent("tr").siblings().css("background-color","");
		$(this).parent("td").parent("tr").css("background-color","#f1f6fb");
		var tds=$(this).parent("td").siblings();
		planLeft=parseInt($(tds[8]).html());
		//alert(planLeft);
		var planId = $(this).parent().parent().data("plan_id");
		var orderId= $(this).parent().parent().data("order_id");
		
		//查询订单信息
		$.ajax({
			url: "order!showOrderDetailList.action",
			dataType: "json",
			data: {"order_id" : orderId},
			async: false,
			error: function () {alertError();},
			success: function (response) {
				if(response.success){
					$("#edit_factoryOrder_parameters").html("");
					$.each(response.data,function(index,value){
						if(index == 0){
							if(value.order_type=='KD件'){
								$("#busNoForm").css("display", "none");
								$("#kdForm").css("display", "");
								//$("#dispatchCustomerBtn").attr("disabled","disabled");
								$("#kdForm").data("plan_id", planId);
								$("#kdForm").data("order_id", orderId);
								$("#kdForm").data("customer_number",$(tds[9]).html());
								//$("#kdForm").data("left_count",$(tds[8]).html());
								$("#kdForm").data("factory",$(tds[2]).html());
								$("#customerType").val(value.bus_type);
								$("#customerCode").val(value.order_code);
							}else{
								$("#kdForm").css("display", "none");
								$("#busNoForm").css("display", "");
								$("#dispatchBtn").attr("disabled","disabled");
								$("#busNoForm").data("plan_id", planId);
								$("#busNoForm").data("order_id", orderId);
								$("#busNoForm").data("customer_number",$(tds[9]).html());
								$("#busNoForm").data("factory",$(tds[2]).html());
							}
							/*//填充订单基本信息
							$("#editOrderID").val(value.id);
							$("#editOrderNo").val(value.order_no);
							$("#editOrderName").val(value.order_name);
							$("#editOrderCode").val(value.order_code);
							$("#editOrderType").val(value.order_type);
							$("#editBusType").val(value.bus_type_id);
							$("#edit_order_qty").val(value.order_qty);
							$("#edit_order_descriptive").val(value.order_name + value.bus_type + " " + value.order_qty + "台");
							$("#edit_productive_year").val(value.productive_year);
							$("#edit_color").val(value.color);
							$("#edit_seats").val(value.seats);
							$("#edit_delivery_date").val(value.delivery_date);
							$("#edit_memo").val(value.memo);*/
						}
						/*//填充生产工厂信息
						var close_btn = "";
						if(value.minbusnum == 0) close_btn = "<button type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button>";
						var paramHtml="<tr><td>"+close_btn+"</td>" +
						//"<td>" + select_str + "</td>" +
						"<td>" + select_str1 + "<option value='"+ value.factory_id + "'> "+ value.factory_name + "</option>" + select_str2 + "</td>" +
						"<td><input type='text' style='width:40px' disabled='disabled' class='input-small orderNum' value='"+value.production_qty+"' id='production_qty2'/></td>" +
						"<td><input type='text' style='width:40px' class='input-small busNum' value='"+value.busnum_start+"' id='busnum_start2'/></td>" +
						"<td><input type='text' style='width:40px' class='input-small busNum' value='"+value.busnum_end+"' id='busnum_end2'/></td>" +
						"<td><input type='text' style='width:40px;display:none' class='input-small' value='"+value.minbusnum+"' id='minbusnum'/></td>" +
						"<td><input type='text' style='width:40px;display:none' class='input-small' value='"+value.maxbusnum+"' id='maxbusnum'/></td>" +
						"</tr>";
						$(paramHtml).appendTo("#edit_factoryOrder_parameters");
						
						original += value.factory_id + ":" + value.production_qty + "_" + value.busnum_start + "|" + value.busnum_end + "," ;
						*/
					});
					/*$("#editModal").modal("show");*/
				} else {
					alert(response.message);
				}
			}
		});
		
		/*$("#busNoForm").css("display", "");
		$("#dispatchBtn").attr("disabled","disabled");
		$("#busNoForm").data("plan_id", planId);
		$("#busNoForm").data("order_id", orderId);
		$("#busNoForm").data("customer_number",$(tds[9]).html());*/
	});
	// 点击清空，清除车号输入框信息
	$("#reset").click(function() {
		$("#busNo").val("");
	});
	// 扫描输入车号
	$('#busNo').bind('keydown', function(event) {
		var busDispatchQty=$("#dispatchDetail tbody").find("tr").length;
		//alert(busDispatchQty);
		var errorFlag=false;
		if (event.keyCode == "13") {
			//alert(busNoArray.indexOf($("#busNo").val()));
			
			if(busNoArray.indexOf($("#busNo").val()) < 0){
				if(busDispatchQty==planLeft){
					errorFlag=true;
				}else if (jQuery.trim($('#busNo').val()) != "") {
					$("#dispatchForm").css("display", "");
					ajaxGetBusInfo();// 获取车辆信息					
				}
				if(errorFlag){
					 setTimeout(function(){
						 alert("发车数量不能大于计划剩余数量！");
						 $("#busNo").val("").focus();
				        },0);
				}
				return false;
			}else{
				//alert("此车已经录入！");
				setTimeout(function(){
					 alert("此车已经录入！");
					 $("#busNo").focus();
			        },0);
				return false;
			}
			
		}
	});
	// 点击随车附件框弹出附件选项
	$(".batchDesc").live("click", function() {
		generateCheckList(toolList);
		var busno=$(this).parent().parent().data("busNo");
		var batchid = $(this).attr("id");
		$("#patchModal").data("batchid", batchid);
		$("#patchModal").data("busno", busno);
		$('#patchModal').modal("show");

	});
	// 删除一行交接数据
	Array.prototype.remove = function(val) {  
	    var index = this.indexOf(val);  
	    if (index > -1) {  
	        this.splice(index, 1);  
	    }  
	}; 
	$(".fa-times").live("click", function() {
		busNoArray.remove($(this).parent().parent().data("busNo"));
		$(this).parent().parent().remove();
	});
	// 选定随车附件
	$("#btnConfirm").click(function() {
		var batchid = $("#patchModal").data("batchid");
		var busno=$("#patchModal").data("busno");
		var toolListStr = "";
		var flag3c = '0';
		$('input[name="tool_checkbox"]:checked').each(function() {
			var toolNameEle=$(this).next();
			var toolname;
			
			if($(toolNameEle).is('span')){
				toolname = $(toolNameEle).html();
			}else{
				toolname = $(toolNameEle).val();
			}
			//alert(toolname);
			var index = ($(this).attr("id").split("_"))[1];
			// alert(index);
			
			var toolqty = $("#toolqty_" + index).val();
			var unit=$("#toolqty_" + index).next().html();
			if(toolname!=''||toolname.trim().length>0){
				toolListStr += toolname + ":" + toolqty + unit+",";
			}			
			if (toolname == '3C认证标贴') {
				flag3c = '1';
			}
		});
		toolListStr = toolListStr.substring(0, toolListStr.length - 1);
		// alert(toolListStr);
		$("#" + batchid).val(toolListStr);//设置附件明细
		$("#flag3c_"+busno).val(flag3c);//设置3C认证标贴flag
		$('#patchModal').modal("hide");

	});
	
	//点击确认交接
	$("#dispatchBtn").click(function(){			
		$("#workcardid").val("");
		$("#receiver").val("");
		$("#department").val("");
		$("#workcardid").focus();
		var doDispatch=true;
		var trs=$("#dispatchDetail tbody tr");
		$.each(trs,function(index,tr){
			var number3c=$(tr).find("td").eq("4").find("input").val();
			//alert($(tr).find("td").eq("4").html());
			if(number3c.trim().length==0){
				alert("请输入3C编号！");
				doDispatch=false;
				return false;
			}
		})
		if(doDispatch){
			$("#dispatchModal").modal("show");
		}
		
		
	})
	//刷厂牌
	$("#workcardid").bind('keydown', function(event) {
		var cardId=$(this).val();
		//cardId=0;
		if (event.keyCode == "13") {
			var user=getUserInfoByCard(cardId);
			//alert(u.username);
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
	//add by wuxiao 2016/5/26
	$("#workcardidKD").bind('keydown', function(event) {
		var cardId=$(this).val();
		//cardId=0;
		if (event.keyCode == "13") {
			var user=getUserInfoByCard(cardId);
			//alert(u.username);
			if(user==null){
				alert("不是该系统用户，请联系系统管理员！");
			}else{
				$("#workcardidKD").val(user.card_number);
				$("#receiverKD").val(user.username);
				$("#departmentKD").val(user.department);
			}
			return false;
		}
	});
	$("#dispatchCustomerBtn").click(function(){
		if($("#customerNoStart").val()==null || $("#customerNoStart").val()==''){
			alert('起始流水号不能为空！');
			return;
		}
		if($("#customerNoEnd").val()==null || $("#customerNoEnd").val()==''){
			alert('结束流水号不能为空！');
			return;
		}
		var start = parseInt($("#customerNoStart").val());
		var end = parseInt($("#customerNoEnd").val());
		if(start>end){
			alert('起始流水号不能大于结束流水号！');
			return;
		}
		var count = end-start+1;
		//var left = parseInt($("#kdForm").data("left_count"));
		
		if(planLeft<count){
			alert('交接数量不能大于计划剩余数量 ！');
			return;
		}
		$("#kdForm").data("qtys",count);
		var KDNo = $("#customerType").val()+"-"+$("#customerCode").val()+"_"+$("#customerNoStart").val()+"_"+$("#customerNoEnd").val();
		$("#kdForm").data("bus_number",KDNo);
		$("#dispatchKDModal").modal("show");
	});
	$("#btnDispatchKDConfirm").click(function(){
		//var busDispatchQty=$("#dispatchDetail tbody").find("tr").length;
		var qtys = parseInt($("#kdForm").data("qtys"));
		var plan_status="1";//发车中
		if(qtys==planLeft){
			plan_status="2";//已完成
		}
		if(confirm("确认交接？")){
			var cardNumber=$("#workcardidKD").val();
			var username=$("#receiverKD").val();
			var department=$("#departmentKD").val();
			/*$(".workcardid").val(cardNumber);
			$(".receiver").val(username);
			$(".department").val(department);*/
			
			$.ajax({
				url:"busDispatch!saveDispatchRecordKD.action",
				type: "post",
				dataType:"json",
				data:{
					"plan.id":$("#kdForm").data("plan_id"),
					"plan.status":plan_status,
					"cardNumber":cardNumber,
					"username":username,
					'department':department,
					'qtys':qtys||1,
					'bus_number':$("#kdForm").data("bus_number"),
				},
				success:function(response){
					alert(response.message);
					if(response.success){
						window.open("busDispatch!busDoDispatch.action","_self");
					}						
				}			
			});
		}
	});
	//add by wuxiao end
	//交接
	$("#btnDispatchConfirm").click(function(){
		var busDispatchQty=$("#dispatchDetail tbody").find("tr").length;
		var plan_status="1";//发车中
		if(busDispatchQty==planLeft){
			plan_status="2";//已完成
		}
		if(confirm("确认交接？")){
			var cardNumber=$("#workcardid").val();
			var username=$("#receiver").val();
			var department=$("#department").val();
			$(".workcardid").val(cardNumber);
			$(".receiver").val(username);
			$(".department").val(department);
			
			$("#dispatchForm").ajaxSubmit({
				url:"busDispatch!saveDispatchRecord.action",
				type: "post",
				dataType:"json",
				data:{"plan.id":$("#busNoForm").data("plan_id"),
					"plan.status":plan_status
				},
				success:function(response){
					alert(response.message);
					if(response.success){
						window.open("busDispatch!busDoDispatch.action","_self");
					}						
				}			
			});
		}
	})
	
	//变更附件数量，toolList记录变更后的数量
	$(".toolqty").live("change",function(){
		//alert($(this).val());
		var eleid=$(this).attr("id");
		var index=(eleid.split("_"))[1];
		toolList[index].quantity=$(this).val();
	});
	//点击附件modal"+"符号，新增一个附件复选组件
	$(".fa-plus").live("click",function(){
		var toolListSize=toolList.length;
		var tds=$('#toollist tr:last').find('td');
		var tdsize=tds.length;
		//alert(tdsize);
		var lableStr="<label class='checkbox'><input id='toolname_";
		lableStr+=toolListSize+"' name=\"tool_checkbox\" type=\"checkbox\" ";
		lableStr+=" onclick=\"checkTools("+toolListSize+")\"";
		lableStr+=" checked";		
		lableStr+=" >"+"<input style='border:0;width:97%'>" + "</label>";
		
		var qtyStr="<input id='toolqty_"
			+ toolListSize
			+ "' style=\"width:30px;height:25px;text-align:center\" value=1 class='toolqty'"+ "><span>pcs</span>";
		if(tdsize==6){
			var tr=$("<tr />");
			var td1="<td style='width:150px'/>";
			var td2="<td />";
			
			$(td1).html(lableStr).appendTo(tr);
			$(td2).html(qtyStr).appendTo(tr);
			$("#toollist tbody").append(tr);
			
		}else{
			var tr=$('#toollist tr:last');
			var td1="<td style='width:150px'/>";
			var td2="<td />";
			$(td1).html(lableStr).appendTo(tr);
			$(td2).html(qtyStr).appendTo(tr);
			//$("#toollist").append(tr);
		}
	});
});
// ajaxQuery 获取发车计划列表
function ajaxQuery(targetPage) {
	var conditions = "{status:'未完成'}";
	$
			.ajax({
				type : "get",// 使用get方法访问后台
				dataType : "json",// 返回json格式的数据
				url : "busDispatch!getDispatchPlanList.action",
				data : {
					"conditions" : conditions,
					"pager.pageSize" : 20
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
										$("<td />")
												.html(
														value.order_name
																+ " "
																+ value.bus_type
																+ value.order_qty
																+ "辆")
												.appendTo(tr);
										$("<td />").html(value.factory_name)
												.appendTo(tr);
										$("<td />").html(value.bus_type)
												.appendTo(tr);
										$("<td />").html(value.order_qty)
												.appendTo(tr);
										$("<td />").html(
												value.plan_dispatch_qty)
												.appendTo(tr);
										$("<td />").html(value.dispatch_date)
												.appendTo(tr);
										$("<td />").html(value.plan_done_qty)
												.appendTo(tr);
										$("<td />").html(
												value.plan_dispatch_qty
														- value.plan_done_qty)
												.appendTo(tr);
										$("<td />")
												.html(
														value.customer_number_flag == "0" ? "无自编号"
																: "有自编号")
												.appendTo(tr);
										var status = (value.status == "1" ? '发车中'
												: (value.status == "2" ? '已完成'
														: '已计划'));
										$("<td />").html(status).appendTo(tr);
										var editTd = $("<td />")
												.html(
														"<i name='edit' class=\"fa fa-bus\" style=\"cursor: pointer;color:blue\" rel=\"tooltip\" title=\"发车\"></i>");
										editTd.appendTo(tr);
										tr.data("plan_id", value.id);
										tr.data("order_name", value.order_name);
										tr.data("order_id", value.order_id);
										tr
												.data("mail_addrs",
														value.email_addrs);
										tr.data("custom_flag",
												value.customer_number_flag);
										$("#tableResult tbody").append(tr);
									});
					$("#tableResult").show();
				}
			});
}
// ajax 查询车辆信息
function ajaxGetBusInfo() {
	var busDispatchQty=$("#dispatchDetail tbody").find("tr").length;
	
	var busNo = $("#busNo").val();
	var orderId=$("#busNoForm").data("order_id");
	var conditions = "{busNo:'" + busNo +"',orderId:"+orderId+"'}";
	$.ajax({
				type : "get",// 使用get方法访问后台
				dataType : "json",// 返回json格式的数据
				url : "busDispatch!getBusInfo.action",
				data : {
					"conditions" : conditions
				},
				success : function(response) {
					var bus = response.busInfo;
					var trindex=$("#dispatchDetail").find("tr").length-1;
					toolList = response.toolList;
					if(bus==null){
						alert("此车辆不属于该计划对应订单！");						
					}else if(bus.factory_name!=$("#busNoForm").data("factory")){
						alert("此车辆不属于"+$("#busNoForm").data("factory")+"!");	
					}else if(bus.warehousing_date==undefined){
						alert("此车辆尚未入库！");	
					}else if(bus.dispatch_date!=null){
						alert("此车辆已于"+bus.dispatch_date+"发车！");	
					}else if($("#busNoForm").data("customer_number")=="有自编号"&&(
							bus.customer_number==null||bus.customer_number.trim().length==0
					)){
						alert("请完善该车辆客户自编号！");
					}
					else{
						$("#dispatchBtn").removeAttr("disabled");//激活"确认交接"按钮
						var tr = $("<tr />");
						var busNumberInput = "<input style='border:0;width:100%;background-color:white;' name='dispatchRecordList["+trindex+"].bus_number' value='"
								+ bus.bus_number + "' readonly/>";
						// alert(busNumberInput);
						$("<td style='width:150px' />").html(busNumberInput)
								.appendTo(tr);
						$("<td />").html(bus.vin).appendTo(tr);
						$("<td />").html(
								bus.left_motor_number + "/"
										+ bus.right_motor_number).appendTo(tr);
						$("<td />").html(bus.customer_number).appendTo(tr);
						$("<td />").html("<input style='border:0;width:100%;background-color:white;' class='3c_number' name='dispatchRecordList["+trindex+"].number_3c' />").appendTo(tr);
						$("<td />")
								.html(
										"<textarea rows=1 id='batch_"
												+ bus.bus_number
												+ "'style='border:0;width:100%;' name='dispatchRecordList["+trindex+"].batch_desc' class='batchDesc'>")
								.appendTo(tr);
						$("<td />")
								.html(
										"<i name='edit' class=\"fa fa-times\" style=\"cursor: pointer\" ></i>")
								.appendTo(tr);
						$(
								"<input type='hidden' name='dispatchRecordList["+trindex+"].dispatch_plan_id' value='"
										+ $("#busNoForm").data("plan_id") + "'>")
								.appendTo(tr);
						$(
								"<input type='hidden' name='dispatchRecordList["+trindex+"].flag_3c' id='flag3c_"
										+ bus.bus_number + "'>").appendTo(tr);
						$(
								"<input type='hidden' name='dispatchRecordList["+trindex+"].qtys' value='1'>").appendTo(tr);
						$(
								"<input type='hidden' name='dispatchRecordList["+trindex+"].receiver' class='receiver'>").appendTo(tr);
						$(
						"<input type='hidden' name='dispatchRecordList["+trindex+"].workcardid' class='workcardid'>").appendTo(tr);
						$(
						"<input type='hidden' name='dispatchRecordList["+trindex+"].department' class='department'>").appendTo(tr);
						
						$(tr).data("busNo",bus.bus_number);
						$("#dispatchDetail tbody").append(tr);
						busNoArray.push($("#busNo").val());
						$("#busNo").val("");
					}				
				}
			})
}
// 生成随车附件选项表格
function generateCheckList(toolList) {
	$("#toollist").html("");
	var i = 0;
	var tr;
	$
			.each(
					toolList,
					function(index, value) {
						var tool = value;
						var checked="true";
						if(tool.checked=='false'){
							checked="false";
						}
						// alert(tool.name);
						if (i % 3 == 0) {
							tr = $("<tr />");
						}
						var lableStr="<label class='checkbox'><input id='toolname_";
						lableStr+=i+"' name=\"tool_checkbox\" type=\"checkbox\" ";
						lableStr+=" onclick=\"checkTools("+i+")\"";
						if(tool.checked!='false'){
							lableStr+=" checked="+checked;
						}
						
						lableStr+=" ><span>"+tool.name + "</span></label>";
						//alert(lableStr);
						$("<td style='width:150px'/>")
								.html(
										lableStr)
								.appendTo(tr);
						
						$("<td />")
								.html(
										"<input id='toolqty_"
												+ i
												+ "' style=\"width:30px;height:25px;text-align:center\" class='toolqty' value='"
												+ tool.quantity + "'><span>"+tool.unit+"</span>")
								.appendTo(tr);
						i++;
						$("#toollist").append(tr);
					});
				
}
function checkTools(toolIndex){
	//alert($("#toolname_"+toolIndex).attr("checked"));
	
	if($("#toolname_"+toolIndex).attr("checked")=='undefined'||$("#toolname_"+toolIndex).attr("checked")){
		toolList[toolIndex].checked='true';
	}else{
		//alert(toolIndex)
		toolList[toolIndex].checked='false';
	}
}
