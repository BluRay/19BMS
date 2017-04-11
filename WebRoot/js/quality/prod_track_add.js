var busInfo={};
$(document).ready(function() {
	initPage();
/*	//切换工厂，获取车间下拉列表
	$("#input_factory").change(function(){
		getWorkshopSelect("#input_workshop","",$("#input_factory").val(),"");
	});*/
	//车号失去焦点查询工厂信息
	$("#input_bus_no").blur(function(){
		var conditions="{busNo:'"+$("#input_bus_no").val()+"'}";
		$.ajax({
			type : "get",// 使用get方法访问后台
			dataType : "json",// 返回json格式的数据
			url : "prodTrackIn!getFactoryByBusNo.action",
			data : {
				"conditions":conditions
			},
			success:function(response){
				
				getFactorySelect("#input_factory",response.factoryInfo.factory_id,"");
				getWorkshopSelect("#input_workshop","",$("#input_factory").val(),"");
			}
		})
	});
	//点击确定按钮查询模板以及车型，订单信息
	$("#btnQuery").click(function(){
		
		var busNo=$("#input_bus_no").val();
		var workshopId=isNaN(parseInt($("#input_workshop").val()))?0:parseInt($("#input_workshop").val());
		var workshopName=$("#input_workshop :selected").text();
		//alert(workshopName);
		var factoryId=isNaN(parseInt($("#input_factory").val()))?0:parseInt($("#input_factory").val());
		if(busNo.trim().length==0){
			alert("必须输入车号!");
			return false;
		}
		/*if(factoryId==0){
			alert("必须输入工厂!");
			return false;
		}*/
		if(workshopId==0){
			alert("必须选择车间!");
			return false;
		}
		
		var conditions="{busNo:'"+busNo+"',workshop:'"+workshopName+"'}";
		$.ajax({
			type : "get",// 使用get方法访问后台
			dataType : "json",// 返回json格式的数据
			url : "prodTrackIn!getTplDetail.action",
			data : {
				"conditions":conditions
			},
			success:function(response){
				$("#order_info").html(response.tplHeader.order);
				$("#busType_info").html(response.tplHeader.busType);
				$("#config_info").html(response.tplHeader.config);
				busInfo=response.busInfo;
				if (response.tplDetails.length <= 0) {
					alert("未查询到匹配模板！");
					$("#td_info").css("display", "none");
					return false;
				}/*else if(!response.busInfo.vin&&workshopName=='底盘'){
					alert("未绑定VIN编码！");
					$("#btnSave").attr("disabled",true);
					return false;
				}else if(!response.busInfo.left_motor_number&&workshopName=='底盘'){
					alert("未绑定左电机号！");
					$("#btnSave").attr("disabled",true);
					return false;
				}else if(!response.busInfo.right_motor_number&&workshopName=='底盘'){
					alert("未绑定右电机号！");
					$("#btnSave").attr("disabled",true);
					return false;
				}*/else{
					$("#td_info").css("display","");
					$("#btnQuery").attr("disabled",true);
				}	
				//动态生成表格
				$("#tableResult tbody").html("");
				$
						.each(
								response.tplDetails,
								function(index, value) {
									// alert(value.id);
									var tr = $("<tr />");
									$("<td />").html(value.sequence)
											.appendTo(tr);
									/*$("<td />").html(value.processNo).appendTo(
											tr);*/
									$("<td />").html(value.processName).appendTo(
											tr);
									$("<td />").html(value.parts).appendTo(
											tr);	
									if(value.parts=='VIN编码'||value.parts=='左电机号'||value.parts=='右电机号'){
										$("<td />").html("<input style='border:0;width:97%;' name='prodTrackList["+index+"].partsNo' partName='"+value.parts+"' class='required'/>")
										.appendTo(tr);
									}else
										$("<td />").html("<input style='border:0;width:97%;' name='prodTrackList["+index+"].partsNo' />")
											.appendTo(tr);					
									
									$("<td />").html("<input style='border:0;width:97%;' name='prodTrackList["+index+"].batch' />")
									.appendTo(tr);
									$("<td />").html(value.keyParts).appendTo(tr);
									$("<td style='display:none'/>").html("<input  style='border:0;' name='prodTrackList["+index+"].processNo' value='"+value.processNo+ "'/>")
									.appendTo(tr);
									$("<td style='display:none'/>").html("<input  style='border:0;' name='prodTrackList["+index+"].processName' value='"+value.processName+ "'/>")
									.appendTo(tr);
									$("<td style='display:none'/>").html("<input  style='border:0;' name='prodTrackList["+index+"].partsId' value='"+value.partsId+ "'/>")
									.appendTo(tr);
									$("<td style='display:none'/>").html("<input  style='border:0;' name='prodTrackList["+index+"].busNo' value='"+busNo+ "'/>")
									.appendTo(tr);
									$("<td style='display:none'/>").html("<input style='border:0;' name='prodTrackList["+index+"].workshopId' value='"+workshopId+ "'/>")
									.appendTo(tr);
									$("<td style='display:none'/>").html("<input  style='border:0;' name='prodTrackList["+index+"].factoryId' value='"+factoryId+ "'/>")
									.appendTo(tr);
									$("<td style='display:none'/>").html("<input  style='border:0;' name='prodTrackList["+index+"].keyParts' value='"+value.keyParts+ "'/>")
									.appendTo(tr);
									$("#tableResult tbody").append(tr);
								});
				$("#tableResult").show();
			},
			error:function(response){
				alert(response.message);
			}
		})
	});
	//保存数据
	$("#btnSave").click(function(){
		var requiredInputs=$("#saveForm").find(".required");
		var workshopName=$("#input_workshop :selected").text();
		var submitFlag=true;
		$.each(requiredInputs,function(index,input){
			if($(input).attr("partName")=='VIN编码'&&workshopName=='底盘'){			
				if($(input).val().trim().length==0){
					alert("请输入VIN编码!");
					submitFlag=false;
					return false;
				}
				if(busInfo.vin!=$(input).val()&&workshopName=='底盘'){
					alert("输入的VIN编码与绑定的VIN编码不一致！");
					submitFlag=false;
					return false;
				}	
			}
			if($(input).attr("partName")=='左电机号'&&workshopName=='底盘'){			
				if($(input).val().trim().length==0){
					alert("请输入左电机号!");
					submitFlag=false;
					return false;
				}
				if(busInfo.left_motor_number!=$(input).val()&&workshopName=='底盘'){
					alert("输入的左电机号与绑定的左电机号不一致！");
					submitFlag=false;
					return false;
				}
			}
			if($(input).attr("partName")=='右电机号'&&workshopName=='底盘'){			
				if($(input).val().trim().length==0){
					alert("请输入右电机号!");
					submitFlag=false;
					return false;
				}
				if(busInfo.right_motor_number!=$(input).val()&&workshopName=='底盘'){
					alert("输入的右电机号与绑定的右电机号不一致！");
					submitFlag=false;
					return false;
				}
			}
		})
		if(submitFlag){
			$("#saveForm").ajaxSubmit({
				url:"prodTrackIn!addRecord.action",
				type: "post",
				dataType:"json",
				success:function(response){
					alert(response.message);
					if(response.success){
						window.open("prodTrackIn!index.action","_self");
					}						
				}			
			});
		}
		
	});
})
function initPage(){
	$("#qc_record_in").addClass("in");	
	//getFactorySelect("#input_factory","","");
}