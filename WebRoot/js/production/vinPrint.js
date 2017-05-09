var vinList;
var buslist=[];
$(document).ready(function(){
	initPage();
	window.onafterprint=function(){
		 ajaxUpdatePrint(vinList);
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
	
	$(".vin,.leftMotor,.rightMotor").live("focus",function(event){
		var tds=$(this).parent("td").siblings();
		var className=$(this).attr("class");
		var classHide="."+className+"Hide";
		//alert(classHide);
		var placeHolder=className=="vin"?"请扫描VIN编码！":(className=='leftMotor'?"请扫描做电机号！":"请扫描右电机号！");
		
		$(this).parent("td").find(classHide).val("");
		if(!$(this).attr("readonly")){
			$(this).val("");
			$(this).css("border","1px solid").attr("placeHolder",placeHolder);
		}
		$(this).blur();
		$(this).parent("td").find(classHide).focus();
		
	});
	
	$(".vinHide,.leftMotorHide,.rightMotorHide").live("keydown",function(event){
		var classHide=$(this).attr("class");
		//alert(classHide);
		var className="."+classHide.substring(0,classHide.indexOf('Hide'));
		
		if (event.keyCode == "13") {
			if(className==".vin"){
				if($(this).val().trim().length==17){
					$(this).parent("td").find(className).css("border","0px").val($(this).val());	
				}else{
					$(this).parent("td").find(className).css("border","0px").val("");
					alert("请扫描VIN编码！");	
				}				
				
			}else{
				if($(this).val().trim().length>9){
					$(this).parent("td").find(className).css("border","0px").val($(this).val().substr(-9));	
				}else{
					$(this).parent("td").find(className).css("border","0px").val("");
					alert("请扫描电机号！");	
				}				
				
			}
				
		}
		
	});
	
	//左右电机号扫描后光标自动移动到另外一个电机号输入框
	$(".leftMotor,.rightMotor").live("keydown",function(event){
		if (event.keyCode == "13") {
			var index=($(this).attr("id").split("_"))[1];
			if($(this).attr("class")=='leftMotor'){
				$("#rightMotor_"+index).focus();
			}
			if($(this).attr("class")=='rightMotor'){
				$("#leftMotor_"+index).focus();
			}
			return false;
		}
	});
	//vin码扫描后跳入左电机号输入框
	$(".vin").live("keydown",function(event){
		var tr=$(this).parent("td").parent("tr");
		var leftMotorInput=$(tr).find(".leftMotor").eq(0);
		if (event.keyCode == "13") {
			//alert($(leftMotorInput).val());
			$(leftMotorInput).focus();
		}
		
	});
	//vin输入框change事件
	$(".vin").live("change",function(e){
		var vin=$(e.target).val();
		var busNumber=$(e.target).parent("td").parent("tr").find(".busNumber").val();
		var leftMotorNumber=$(e.target).parent("td").parent("tr").find(".leftMotor").val();
		var rightMotorNumber=$(e.target).parent("td").parent("tr").find(".rightMotor").val();
		var busList=ajaxValidateBusVin(vin,busNumber);
		//alert(busNumber);
		if(vin.trim().length>0&&!ajaxValidateVin(vin)){
			alert("请输入有效VIN码！");
			$(e.target).val("");
			$(e.target).focus();
		}else if(busList.length>0){
			if(busList[0].bus_number!=busNumber){
				alert("该VIN码已经绑定了一个车号，不能重复绑定！");
				$(e.target).val("");
				$(e.target).focus();
			}				
		}else if(isContain(vin,buslist)&&vin.trim().length>0){
			alert("VIN码不能重复绑定！");
			$(e.target).focus();
		}/*else if(vin.trim().length>0&&leftMotorNumber.trim().length>0&&rightMotorNumber.trim().length>0){
			var obj={};
			obj.bus_number=busNumber;
			obj.vin=vin;
			obj.left_motor_number=leftMotorNumber;
			obj.right_motor_number=rightMotorNumber;
			buslist.push(obj);
		}*/
	});
	
	
	$("#btnSave").click(function(){
		var trs=$("#tableResult tbody").find("tr");
		var msg="确认保存？";
		$.each(trs,function(i,tr){
			var busNumber=$(tr).find(".busNumber").val();
			var vin=$(tr).find(".vin").val();
			var leftMotorNumber=$(tr).find(".leftMotor").val();
			var rightMotorNumber=$(tr).find(".rightMotor").val();
			if(vin.trim().length==0/*||leftMotorNumber.trim().length==0||rightMotorNumber.trim().length==0*/){
				msg="VIN码未填写的无法保存,是否确认保存？"
			}else{
				var obj={};
				obj.bus_number=busNumber;
				obj.vin=vin;
				obj.left_motor_number=leftMotorNumber;
				obj.right_motor_number=rightMotorNumber;
				buslist.push(obj);
			}
		});
		if(confirm(msg)){
			/*$("#busForm").ajaxSubmit*/
			if(buslist.length>0){
				$.ajax({
					url:"production!saveMotorNumber.action",
					type: "post",
					dataType:"json",
					data:{"conditions":JSON.stringify(buslist)},
					success:function(response){
						alert(response.message);					
					}		
				});
			}else{
				alert("没有填写需要绑定的VIN码和左右电机号！");
			}
			
		}
	});
	
	//打印
	$(".btnPrint").live("click",function(e){
		$("#printarea").html("");
		var printFlag=true;
		vinList="";//获取要打印的车号列表
		var tr=$(e.target).parent("td").parent("tr");
		/*var cboxlist=$("#tableResult tbody :checked");
		var printhtml="<div class=\"printConfigure printable toPrint\" style=\"line-height:20px;width:700px\" >";
		printhtml+="<table border=0><tr><th style=\"text-align:center;width:50%\">车号</th>";
		printhtml+="<th style=\"text-align:center;;width:50%\">VIN</th></tr>";
		
		if(cboxlist.length==0){
			alert("请至少选中一行！");
			printFlag=false;
		}
		$.each(cboxlist,function(index,cbox){
			var tr=$(cbox).closest("tr");
			vinList+=$(tr).data("vin")+",";			
			var tbhtml="<tr><td>"+$(tr).data("busNo")+"</td>"
        			+"<td>"+$(tr).data("vin")+"</td></tr>"
        	printhtml+=tbhtml;
			if($(tr).data("vin").trim().length==0){
				printFlag=false;
				return false;
			}
		});
		printhtml+="</table></div>";*/
		var printhtml="<div class=\"printConfigure printable toPrint\" style=\"padding-top:10px;padding-bottom:10px;line-height:40px;\" ><table border=0><tr ><td style=\"text-align:right; font-size:26px;font-weight:bold; height:35px; padding-left:0px\">订单：</td>"
			+"<td style=\"text-align:left; font-size:26px;font-weight:bold; width:270px;height:35px \">"+$(tr).data("orderCodeDesc")+"</td></tr>"+
			"<tr><td style=\"text-align:right; font-size:26px; font-weight:bold;height:35px; padding-left:0px;\">车号：</td>"
			+"<td style=\"text-align:left; font-size:26px; font-weight:bold;width:270px;height:35px;\">"+$(tr).data("busNo")+"</td></tr>"+
			"<tr><td style=\"text-align:right; font-size:26px;font-weight:bold;height:35px;padding-left:0px\">VIN：</td>"
			+"<td style=\"text-align:left; font-size:26px;font-weight:bold ;width:270px;height:35px; \">"+$(tr).data("vin")+"</td></tr></table>"
			+"<div id=\"bcTarget"+"\" style=\"width:300px; height:70px;margin-left:10px;margin-top:10px\"></div></div>";
		$("#printarea").append(printhtml);
		$("#bcTarget").barcode($(tr).data("vin"), "code128",{barWidth:2, barHeight:70,showHRI:false});
		//alert(printhtml);
		/*vinList=vinList.substring(0,vinList.length-1);*/
		if($(tr).data("vin").trim().length==0){
			printFlag=false;
		}else
		vinList=$(tr).data("vin");
		//alert(busNoList);		
		//$(".printConfigure").show();
		//$(".printConfigure").addClass("toPrint");
		 setTimeout(function (){
			 if(printFlag){
				 window.print();
			 }else{
				 alert("VIN为空，请先绑定车号和VIN!");
			 }
						       				
			},0);
	});
});
//初始化页面
function initPage(){
	getOrderNoSelect("#input_order_no","","","");
	ajaxQuery(1);
	pageSize=20;//设置每一页显示行数
	$("#checkall").attr("checked",false);
	var buslist=[];
}

//ajax 查询
function ajaxQuery(targetPage){
	$("#checkall").attr("checked",false);
	var orderNo=$("#input_order_no").val();
	var busNo=$("#input_bus_no").val();
	var conditions="{";
		conditions+="orderNo:'"+orderNo+"',";
		conditions+="busNo:'"+busNo+"'}";
	$
	.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "production!getVinPrintList.action",
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
								/*$("<td />").html("<input type='checkbox' >").appendTo(tr);*/
								$("<td />").html(value.order_desc)
										.appendTo(tr);
								var busNo=value.bus_number==undefined?'':value.bus_number;
								var vin=value.vin==undefined?'':value.vin;
							
								var leftmotor=value.left_motor_number==undefined?'':value.left_motor_number;
								var rightmotor=value.right_motor_number==undefined?'':value.right_motor_number;
								var busNoInput="<input style='border:0;width:100%;text-align:center;background-color:white;' class='busNumber' name='buslist["+index+"].bus_number' value='"
								+busNo+"' readonly>";
								var vinInput="<input style='border:0;width:100%;text-align:center;background-color:white;' class='vin' name='buslist["+index+"].vin' value='"
								+vin+"' ><input class='vinHide' style='width:0px;position:absolute;margin-top:-1000px' />";
								if(vin!=''){
									vinInput="<input style='border:0;width:100%;text-align:center;background-color:white;' class='vin' name='buslist["+index+"].vin' value='"
									+vin+"' readonly='true'>";
								}
								
								var leftmotorinput="<input id='leftMotor_"+index+"' old_val='"+leftmotor+"' class='leftMotor' style='border:0;width:100%;text-align:center;background-color:white;' name='buslist["+index+"].left_motor_number' value='"
								+leftmotor+"'><input class='leftMotorHide' style='width:0px;position:absolute;margin-top:-1000px' />";
								var rightmotorinput="<input id='rightMotor_"+index+"' old_val='"+rightmotor+"' class='rightMotor' style='border:0;width:100%;text-align:center;background-color:white;' name='buslist["+index+"].right_motor_number' value='"
								+rightmotor+"'><input class='rightMotorHide' style='width:0px;position:absolute;margin-top:-1000px' />";
								//alert(busNoInput);
								$("<td />").html(busNoInput).appendTo(tr);					
								$("<td />").html(vinInput).appendTo(tr);															
								$("<td />").html(leftmotorinput).appendTo(tr);						
								$("<td />").html(rightmotorinput).appendTo(tr);
								$("<td />").html(value.print_sign).appendTo(tr);
								$("<td />").html(value.printer).appendTo( tr);
								$("<td />").html(value.print_date).appendTo( tr);
								$("<td />").html(value.print_times).appendTo( tr);
								$("<td />").html("<input type=\"button\" class=\"btn btn-success btnPrint\" value=\"打印\" style=\"margin-left: 2px;\"></input>").appendTo(tr);
								$(tr).data("busNo",busNo);
								$(tr).data("vin",vin);
								$(tr).data("orderCodeDesc",value.order_code_desc);
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
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "production!afterVinPrint.action",
		data : {
			"conditions" : vinList
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
//检查vin码是否绑定了车号
function ajaxValidateBusVin(vin,busNumber){
	var busList;
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		async : false,
		url : "common!getBusNumberByVin.action",
		data : {
			"conditionMap.vin" : vin
		},
		success:function(response){		
			busList=response;	
		}
	});

	return busList;
}
//检查vin码是否有效
function ajaxValidateVin(vin){
	var flag=false;
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		async : false,
		url : "common!validateVin.action",
		data : {
			"conditionMap.vin" : vin
		},
		success:function(response){	
			if(response.length>0){
				flag=true;	
			}
			
		}
	});
	return flag;
}
function isContain(vin,vinList){
	var flag=false;
	$.each(vinList,function(index,obj){
		if(vin==obj.vin){
			flag=true;
			return;
		}
	})
	return flag;
}
