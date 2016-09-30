var busNoList;
var changed_config_id;
$(document).ready(function(){
	initPage();
	window.onafterprint=function(){
		//alert(changed_config_id);
		 ajaxUpdatePrint(busNoList,changed_config_id);
	}
	$("#btnQuery").click(function(){
		ajaxQuery(1);
	});
	// 全选、反选
	$("#checkall").live("click", function() {
		// alert($("#checkall").attr("checked"));
		if ($("#checkall").attr("checked") == "checked") {
			check_All_unAll("#tableResult", true);
		} else {
			check_All_unAll("#tableResult", false);
		}

	});
	
	//打印
	/*$(".btnPrint").click(function(){
		$("#printarea").html("");
		busNoList="";//获取要打印的车号列表
		var cboxlist=$("#tableResult tbody :checked");
		//alert(cboxlist.length);
		var printhtml="";
		$.each(cboxlist,function(index,cbox){
			var tr=$(cbox).closest("tr");
			busNoList+=$(tr).data("busNo")+",";	
			
			  var tbhtml="<div class=\"printConfigure printable toPrint\" style=\"padding-top:10px;padding-bottom:10px;line-height:40px;\" ><table border=0><tr ><td style=\"text-align:right; font-size:26px;font-weight:bold; height:35px; padding-left:0px\">订单：</td>"
        			+"<td style=\"text-align:left; font-size:26px;font-weight:bold; width:270px;height:35px \">"+$(tr).data("busType")+"-"+$(tr).data("orderCode")+"-"+$(tr).data("orderQty")+"</td></tr>"+
        			"<tr><td style=\"text-align:right; font-size:26px; font-weight:bold;height:35px; padding-left:0px;\">客户名称：</td>"
        			+"<td style=\"text-align:left; font-size:26px; font-weight:bold;width:270px;height:35px;\">"+$(tr).data("customer")+"-"+$(tr).data("orderConfig")+"</td></tr>"+
        			"<tr><td style=\"text-align:right; font-size:26px;font-weight:bold;height:35px;padding-left:0px\">车号：</td>"
        			+"<td style=\"text-align:left; font-size:26px;font-weight:bold ;width:270px;height:35px; \">"+$(tr).data("busNo")+"</td></tr></table>"
        			+"<div id=\"bcTarget_"+index+"\" style=\"width:300px; height:70px;margin-left:10px;margin-top:10px\"></div></div>";
			  $("#printarea").append(tbhtml);
			  $("#bcTarget_"+index).barcode($(tr).data("busNo"), "code128",{barWidth:2, barHeight:70,showHRI:false});
			  if(index<cboxlist.length-1){
              	$(".printConfigure").css("page-break-after","always");
              }
		});
		busNoList=busNoList.substring(0,busNoList.length-1);
		//alert(busNoList);		
		//$(".printConfigure").show();
		//$(".printConfigure").addClass("toPrint");
		 setTimeout(function (){
			 if(cboxlist.length==0){
				 alert("请至少选中一行！");
			 }else
				 window.print();			       				
			},500);
	});*/
	$(".btn-success").live("click",function(){
		$("#printarea").html("");
		busNoList="";//获取要打印的车号列表
		var tr=$(this).closest("tr");
		var configSelect=$(tr).find("select")[0];
		var configId=$(configSelect).val();
	
		var config_qty=$(configSelect).find("option:selected").attr("config_qty");
		var config_selected=$(configSelect).find("option:selected").text();
		var config_done_qty=0;
		//查询订单配置是否超过当前配置的分配总数
		var conditions="{factoryId:"+$(tr).data("factoryId")+",orderId:"+$(tr).data("orderId")+",configId:"+configId+"}";
		$.ajax({
			url:"production!getOrderConfigDoneQty.action",
			type:"post",
			async:false,
			dataType:"json",
			data:{
				"conditions":conditions				
			},
			success:function(response){
				//alert(response.configDoneQty);
				config_done_qty=response.configDoneQty
			}
		})
		
		if(parseInt(config_done_qty)<=parseInt(config_qty)){
			var tbhtml="<div class=\"printConfigure printable toPrint\" style=\"padding-top:10px;padding-bottom:10px;line-height:40px;\" ><table border=0><tr ><td style=\"text-align:right; font-size:26px;font-weight:bold; height:35px; padding-left:0px\">订单：</td>"
    			+"<td style=\"text-align:left; font-size:26px;font-weight:bold; width:270px;height:35px \">"+$(tr).data("busType")+"-"+$(tr).data("orderCode")+"-"+$(tr).data("orderQty")+"</td></tr>"+
    			"<tr><td style=\"text-align:right; font-size:26px; font-weight:bold;height:35px; padding-left:0px;\">客户名称：</td>"
    			+"<td style=\"text-align:left; font-size:26px; font-weight:bold;width:270px;height:35px;\">"+$(tr).data("customer")+"-"+config_selected+"</td></tr>"+
    			"<tr><td style=\"text-align:right; font-size:26px;font-weight:bold;height:35px;padding-left:0px\">车号：</td>"
    			+"<td style=\"text-align:left; font-size:26px;font-weight:bold ;width:270px;height:35px; \">"+$(tr).data("busNo")+"</td></tr></table>"
    			+"<div id=\"bcTarget"+"\" style=\"width:300px; height:70px;margin-left:10px;margin-top:10px\"></div></div>";
			$("#printarea").append(tbhtml);
			$("#bcTarget").barcode($(tr).data("busNo"), "code128",{barWidth:2, barHeight:70,showHRI:false});
			busNoList=$(tr).data("busNo");
			changed_config_id=configId;
			window.print();
			
	
		}else{
			alert("配置 "+$(tr).data("orderConfig")+"分配车号数不能大于该配置计划总数！");
		}
		
		
	});
	
});
//初始化页面
function initPage(){
	getBusNumberSelect("#bus_no");
	getOrderNoSelect("#input_order_no","","","");
	ajaxQuery(1);
	pageSize=20;//设置每一页显示行数
	$("#checkall").attr("checked",false);
}

//ajax 查询
function ajaxQuery(targetPage){
	$("#checkall").attr("checked",false);
	var busNo=$("#bus_no").val();
	var orderNo=$("#input_order_no").val();
	var executeStart=$("#execute_start").val();
	var executeEnd=$("#execute_end").val();
	var conditions="{";
		conditions+="busNo:'"+busNo+"',";
		conditions+="orderNo:'"+orderNo+"',";
		conditions+="executeStart:'"+executeStart+"',";
		conditions+="executeEnd:'"+executeEnd+"'}";
	$
	.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "production!busNoPrint.action",
		data : {
			"conditions" : conditions,
			"pager.pageSize" : 20,
			"pager.curPage" : targetPage || 1
		},
		success : function(response) {
			$("#tableResult tbody").html("");
			$.each(
							response.dataList,
							function(index, value) {
								var tr = $("<tr />");
								/*$("<td />").html("<input type='checkbox' >")
								.appendTo(tr);*/
								$("<td />").html(value.bus_number)
										.appendTo(tr);
								$("<td />").html(value.order_no).appendTo(
										tr);
								$("<td />").html(value.order_name)
										.appendTo(tr);
								var factoryId=isNaN(value.factory_id)?0:value.factory_id;
								var configInput="<select id='config_select_"+index+"' class='input-medium'></select>"
								$("<td />").html(configInput)
								.appendTo(tr);
								$("<td />").html(value.order_qty)
										.appendTo(tr);
								$("<td />").html(value.plan_date).appendTo(
										tr);
										
								$("<td />").html(value.print_sign).appendTo(
										tr);
								var print_again="";
								if(value.print_sign=="是"){
									print_again="<i class=\"fa fa-print\" rel=\"tooltip\" title='打印' style='color:blue'></i>";
								}
								$("<td />").html(value.printer).appendTo(
										tr);
								$("<td />").html(value.print_date).appendTo(
										tr);
								$("<td />").html(value.print_times).appendTo(
										tr);
								$("<td />").html("	<input type=\"button\" class=\"btn btn-success\""+ "class=\"btnPrint\" value=\"打印\" style=\"margin-left: 2px;\"></input>"	).appendTo(tr);
								$(tr).data("busNo",value.bus_number);
								$(tr).data("busType",value.bus_type_code);
								$(tr).data("orderCode",value.order_code);
								$(tr).data("orderQty",value.order_qty);
								$(tr).data("customer",value.customer);
								$(tr).data("orderConfig",value.order_config_name);
								$(tr).data("factoryId",value.factory_id);
								$(tr).data("orderId",value.order_id);
								$("#tableResult tbody").append(tr);
								getOrderConfigSelect_2('#config_select_'+index,value.factory_id,value.order_no,value.order_config_name);
								if(value.print_sign=="是"){
									$('#config_select_'+index).attr("disabled","disabled");
								}
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
//打印后更新打印信息
function ajaxUpdatePrint(busNoList,changedConfigId){
	var conditioins="{busNoList:'"+busNoList+"',changedConfigId:'"+changedConfigId+"'}";
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "production!afterBusNoPrint.action",
		data : {
			"conditions" : conditioins
		},
		success:function(response){
			if(response.success){
				//alert("打印成功！");
				 setTimeout(function (){
					 ajaxQuery($("#cur").attr("page"));				
					},1000);
			}
		}
	});
}