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
			url : "ocIn!getTplDetail.action",
			data : {
				"conditions":conditions
			},
			success:function(response){
				$("#order_info").html(response.tplHeader.order);
				$("#busType_info").html(response.tplHeader.busType);
				$("#config_info").html(response.tplHeader.orderConfig);
				if (response.tplDetails.length <= 0) {
					alert("未查询到匹配模板！");
					$("#td_info").css("display", "none");
				}else{
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
									$("<td />").html(value.parts).appendTo(
											tr);
									$("<td />").html(value.partsNo).appendTo(
											tr);
									$("<td />").html(value.vendor).appendTo(
											tr);
									$("<td />").html("<label class='radio'><input type='radio' name='ocList["+index+"].matchResult' value='OK' checked/>OK</label>&nbsp;<label class='radio'><input type='radio' name='ocList["+index+"].matchResult' value='NG'/>NG</label>")
											.appendTo(tr);
									$("<td />").html("<input style='border:0;width:97%;' name='ocList["+index+"].memo' />")
									.appendTo(tr);
									$("<td style='display:none'/>").html("<input  style='border:0;' name='ocList["+index+"].partsId' value='"+value.partsId+ "'/>")
									.appendTo(tr);
									$("<td style='display:none'/>").html("<input  style='border:0;' name='ocList["+index+"].partsNo' value='"+value.partsNo+ "'/>")
									.appendTo(tr);
									$("<td style='display:none'/>").html("<input  style='border:0;' name='ocList["+index+"].vendor' value='"+value.vendor+ "'/>")
									.appendTo(tr);
									$("<td style='display:none'/>").html("<input  style='border:0;' name='ocList["+index+"].busNo' value='"+busNo+ "'/>")
									.appendTo(tr);
									$("<td style='display:none'/>").html("<input style='border:0;' name='ocList["+index+"].workshopId' value='"+workshopId+ "'/>")
									.appendTo(tr);
									$("<td style='display:none'/>").html("<input  style='border:0;' name='ocList["+index+"].factoryId' value='"+factoryId+ "'/>")
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
		$("#saveForm").ajaxSubmit({
			url:"ocIn!addRecord.action",
			type: "post",
			dataType:"json",
			success:function(response){
				alert(response.message);
				if(response.success){
					window.open("ocIn!index.action","_self");
				}						
			}			
		});
	});
})
function initPage(){
	getFactorySelect("#input_factory","","");
	$("#qc_record_in").addClass("in");
}