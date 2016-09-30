var busNoList;
$(document).ready(function(){
	initPage();
	window.onafterprint=function(){
		 ajaxUpdatePrint(busNoList);
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
/*	$("#btnSave").click(function(){
		if(confirm("确认保存左右电机号？")){
			$("#busForm").ajaxSubmit({
				url:"production!saveMotorNumber.action",
				type: "post",
				dataType:"json",
				data:{},
				success:function(response){
					alert(response.message);					
				}		
			});
		}
	});*/
	
	//打印
	$("#btnPrint").click(function(){
		var printFlag=true;
		$("#printarea").html("");		
		busNoList="";//获取要打印的车号列表
		var cboxlist=$("#tableResult tbody :checked");
		var printhtml="<tr><td>车身号</td><td>VIN</td><td>品牌</td><td>电机型号</td>"+
					"<td>底盘型号</td><td>电机最大功率</td><td>最大允许总质量</td>"+
					"<td>电池型号</td><td>电池容量</td><td>额定电压</td><td>整车生产日期</td></tr>";
		/*var productDate=$("#input_product_date").val();*/
		if(cboxlist.length==0){
			alert("请至少选中一行！");
			printFlag=false;
		}
		$.each(cboxlist,function(index,cbox){
			var tr=$(cbox).closest("tr");
			var tds=$(cbox).parent("td").siblings();
			busNoList+=$(tr).data("busNo")+",";	
			var prod_date=$(tds[10]).html();
			/*			if(prod_date.trim().length==0){
				prod_date=productDate;
				$(tds[10]).html(prod_date)
			}
			if(prod_date.trim().length==0){
				printFlag=false;
				$("#input_product_date").focus();
				alert("请输入生产日期")
				return false;
			}else{*/
				var tbhtml="<tr><td>"+$(tr).data("busNo")+"</td>"
				+"<td>"+$(tr).data("vin")+"</td>"+"<td>"+$(tds[2]).html()+"</td>"
				+"<td>"+$(tds[3]).html()+"</td>"+"<td>"+$(tds[4]).html()+"</td>"
				+"<td>"+$(tds[5]).html()+"</td>"+"<td>"+$(tds[6]).html()+"</td>"
				+"<td>"+$(tds[7]).html()+"</td>"+"<td>"+$(tds[8]).html()+"</td>"
				+"<td>"+$(tds[9]).html()+"</td>"+"<td>"+prod_date+"</td></tr>"
				printhtml+=tbhtml;
/*			}*/
		});
		//alert(printhtml);
		$("#printarea").append(printhtml);
		busNoList=busNoList.substring(0,busNoList.length-1);
		//alert(busNoList);		
		//$(".printConfigure").show();
		//$(".printConfigure").addClass("toPrint");
		 setTimeout(function (){
			 if(printFlag){
				 window.print();	
			 }				 			       				
			},500);
	});
});
//初始化页面
function initPage(){
	getOrderNoSelect("#input_order_no","","","");
	ajaxQuery(1);
	pageSize=20;//设置每一页显示行数
	$("#checkall").attr("checked",false);
}

//ajax 查询
function ajaxQuery(targetPage){
	$("#checkall").attr("checked",false);
	var orderNo=$("#input_order_no").val();
	var busNoStart=$("#input_busno_start").val();
	var busNoEnd=$("#input_busno_end").val();
	var conditions="{";
		conditions+="orderNo:'"+orderNo+"',";
		conditions+="busNoStart:'"+busNoStart+"',";
		conditions+="busNoEnd:'"+busNoEnd+"'}";
	$
	.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "production!getNameplatePrintList.action",
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
								$("<td />").html("<input type='checkbox' >")
								.appendTo(tr);
								var bus_number=value.bus_number==undefined?'':value.bus_number;
								var vin=value.vin==undefined?'':value.vin;
								var brand=value.brand==undefined?'':value.brand;
								var motor_model=value.motor_model==undefined?'':value.motor_model;
								var chassis_model=value.chassis_model==undefined?'':value.chassis_model;
								var motor_power=value.motor_power==undefined?'':value.motor_power;
								var max_weight=value.max_weight==undefined?'':value.max_weight;
								var battery_model=value.battery_model==undefined?'':value.battery_model;
								var battery_capacity=value.battery_capacity==undefined?'':value.battery_capacity;
								var rated_voltage=value.rated_voltage==undefined?'':value.rated_voltage;
								var productive_date=value.productive_date==undefined?'':value.productive_date;
								var printer=value.printer==undefined?'':value.printer;
								var print_date=value.print_date==undefined?'':value.print_date;
								var print_flag=value.print_flag;
								//alert(busNoInput);
								$("<td />").html(bus_number).appendTo(tr);					
								$("<td />").html(vin).appendTo(tr);
								$("<td />").html(brand).appendTo(tr);							
								$("<td />").html(motor_model).appendTo(tr);						
								$("<td />").html(chassis_model).appendTo(tr);
								$("<td />").html(motor_power).appendTo(tr);
								$("<td />").html(max_weight).appendTo(tr);
								$("<td />").html(battery_model).appendTo(tr);							
								$("<td />").html(battery_capacity).appendTo(tr);
								$("<td />").html(rated_voltage).appendTo(tr);
								$("<td />").html(productive_date).appendTo(tr);
								$("<td />").html(printer).appendTo(tr);
								$("<td />").html(print_date).appendTo(tr);
								$("<td />").html(print_flag).appendTo(tr);
								$(tr).data("busNo",bus_number);
								$(tr).data("vin",vin);
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
//打印后更新打印信息
function ajaxUpdatePrint(busNoList){
	/*var conditions="{'busNoList':'"+busNoList+"','productDate':'"+$("#input_product_date").val()+"'}";*/
	var conditions="{'busNoList':'"+busNoList+"'}";
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "production!afterNameplatePrint.action",
		data : {
			"conditions" : conditions
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