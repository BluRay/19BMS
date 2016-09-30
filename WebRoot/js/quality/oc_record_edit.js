var detaillist;
var hasTap=false;//记录是否已经添加tab ，是则设置为true ，默认为false
$(document).ready(function(){
	$("#qc_record_in").addClass("in");
	getDetail();
	//保存数据
	$("#btnSave").click(function(){
		$("#saveForm").ajaxSubmit({
			url:"ocIn!updateRecord.action",
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
				$("<td />").html(value.parts).appendTo(tr);
				$("<td />").html(value.partsNo).appendTo(tr);
				$("<td />").html(value.vendor).appendTo(tr);
				var ok_checked=value.matchResult=='OK'?"checked":"";
				var ng_checked=value.matchResult=='NG'?'checked':'';
				//alert(ok_checked);
				
				var td_matchResult="<label class='radio'><input type='radio' name='ocList["+index+"].matchResult' value='OK' "+ok_checked+"/>OK</label>"+
						"&nbsp;<label class='radio'><input type='radio' name='ocList["+index+"].matchResult' value='NG' "+ng_checked+"/>NG</label>";
				//alert(td_matchResult);
				$("<td />").html(td_matchResult).appendTo(tr);
				$("<td />").html("<input style='border:0;width:97%;' name='ocList["+index+"].memo' value='"+value.memo+"'/>").appendTo(tr);
				$("<td style='display:none'/>").html("<input style='border:0;width:97%;' name='ocList["+index+"].id' value='"+value.id+"'/>").appendTo(tr);
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
			url : "ocIn!showRecordDetail.action",
			data : {
				"conditions" : conditions
			},
			success : function(response) {
				var tplarray = response.detailList;
				detaillist = tplarray;
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