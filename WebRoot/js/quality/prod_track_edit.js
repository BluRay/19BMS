var detaillist;
var busInfo={};
var hasTap=false;//记录是否已经添加tab ，是则设置为true ，默认为false
var workshopSelected="";
$(document).ready(function(){
	$("#qc_record_in").addClass("in");
	getDetail();
	//保存数据
	$("#btnSave").click(function(){
		var requiredInputs=$("#saveForm").find(".required");
		var submitFlag=true;
		workshopSelected=$(".nav .active").find("a").html();
		//alert(workshopSelected);
		$.each(requiredInputs,function(index,input){
			if($(input).attr("partName")=='VIN编码'&&workshopSelected=='底盘'){			
				if($(input).val().trim().length==0){
					alert("请输入VIN编码!");
					submitFlag=false;
					return false;
				}
				if(busInfo.vin!=$(input).val()&&workshopSelected=='底盘'){
					alert("输入的VIN编码与绑定的VIN编码不一致！");
					submitFlag=false;
					return false;
				}	
			}
			if($(input).attr("partName")=='左电机号'&&workshopSelected=='底盘'){			
				if($(input).val().trim().length==0){
					alert("请输入左电机号!");
					submitFlag=false;
					return false;
				}
				if(busInfo.left_motor_number!=$(input).val()&&workshopSelected=='底盘'){
					alert("输入的左电机号与绑定的左电机号不一致！");
					submitFlag=false;
					return false;
				}
			}
			if($(input).attr("partName")=='右电机号'&&workshopSelected=='底盘'){			
				if($(input).val().trim().length==0){
					alert("请输入右电机号!");
					submitFlag=false;
					return false;
				}
				if(busInfo.right_motor_number!=$(input).val()&&workshopSelected=='底盘'){
					alert("输入的右电机号与绑定的右电机号不一致！");
					submitFlag=false;
					return false;
				}
			}
		})
		if(submitFlag){
			$("#saveForm").ajaxSubmit({
				url:"prodTrackIn!updateRecord.action",
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
function generateTable(workshop){

		var tableId="";
		var liId="";
		if(workshop.indexOf("焊装")>=0){
			tableId="#welding";
			liId="#welding_li";
		}
		if(workshop.indexOf("涂装")>=0){
			tableId="#painting";
			liId="#painting_li";
		}
		if(workshop.indexOf("底盘")>=0){
			tableId="#bottom";
			liId="#bottom_li";
		}
		if(workshop.indexOf("总装")>=0){
			tableId="#assembly";
			liId="#assembly_li";
		}
		$(tableId+" tbody").html("");
		var i=1;
		$.each(detaillist,function(index,value){
			
			if(value.workshop.indexOf(workshop)>=0){
				if(!hasTap){
					$(tableId).addClass("active");
					$(liId).addClass("active");
				}				
				$(liId).css("display","");
				hasTap=true;
				var tr = $("<tr />");
				$("<td />").html(i).appendTo(tr);
				$("<td />").html(value.processNo).appendTo(
						tr);
				$("<td />").html(value.processName).appendTo(
						tr);
				$("<td />").html(value.parts).appendTo(tr);
				if(value.parts=='VIN编码'||value.parts=='左电机号'||value.parts=='右电机号'){
					$("<td />").html("<input style='border:0;width:97%;' name='prodTrackList["+index+"].partsNo' value='"+(value.partsNo||"")+"' partName='"+value.parts+"' class='required'/>")
					.appendTo(tr);
				}else
					$("<td />").html("<input style='border:0;width:97%;' name='prodTrackList["+index+"].partsNo' value='"+(value.partsNo||"")+"'/>")
						.appendTo(tr);
				$("<td />").html("<input style='border:0;width:97%;' name='prodTrackList["+index+"].batch' value='"+(value.batch||"")+"'/>").appendTo(tr);
				$("<td style='display:none'/>").html("<input style='border:0;width:97%;' name='prodTrackList["+index+"].id' value='"+value.id+"'/>").appendTo(tr);
				tr.appendTo(tableId+" tbody");
				i++;
			}
				
		});
	}
	function getDetail() {
		var factoryId=$("#q_factoryId").val();
		var busNo=$("#q_busNo").val();
		var conditions="{factoryId:"+factoryId+",busNo:'"+busNo+"'}";
		$.ajax({
			type : "get",// 使用get方法访问后台
			dataType : "json",// 返回json格式的数据
			url : "prodTrackIn!showRecordDetail.action",
			data : {
				"conditions" : conditions
			},
			success : function(response) {
				var tplarray = response.detailList;
				detaillist = tplarray;
				busInfo=response.busInfo;
				//var workshop=detaillist[0].workshop;
				//alert(workshop);
				$("#busNo").html(detaillist[0].busNo);
				$("#factory").html(detaillist[0].factory);
				$("#busType").html(detaillist[0].busType);
				$("#order").html(detaillist[0].order);
				$("#orderConfig").html(detaillist[0].orderConfig);
				$("#welding_li").css("display","none");
				$("#painting_li").css("display","none");
				$("#bottom_li").css("display","none");
				$("#assembly_li").css("display","none");
				generateTable("焊装");
				generateTable("涂装");
				generateTable("底盘");
				generateTable("总装");

			}
		});
	}