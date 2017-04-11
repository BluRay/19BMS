var detaillist;
var hasTap=false;//记录是否已经添加tab ，是则设置为true ，默认为false
$(document).ready(function(){
	$("#qc_record_in").addClass("in");
	getDetail();
	
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
				/*$("<td />").html(value.processNo).appendTo(tr);*/
				$("<td />").html(value.processName).appendTo(tr);
				$("<td />").html(value.parts).appendTo(tr);
				$("<td />").html(value.partsNo).appendTo(tr);
				$("<td />").html(value.batch).appendTo(tr);
				$("<td />").html((value.keyParts=='null'?'否':value.keyParts)).appendTo(tr);
				$("<td />").html(value.editor).appendTo(tr);
				$("<td />").html(value.editDate).appendTo(tr);
				tr.appendTo(tableId+" tbody");
				i++;
			}
				
		});
		$(tableId+"_tab").addClass("active").css("display","");
		$(tableId).addClass("active");
	}
	function getDetail() {
		var factoryId=$("#q_factoryId").val();
		var busNo=$("#q_busNo").val();
		var workshop=getQueryString("workshop");
		var conditions="{factoryId:"+factoryId+",busNo:'"+busNo+"',workshop:'"+workshop+"'}";
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
				var workshop=detaillist[0].workshop;
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
				generateTable(workshop);
				/*generateTable("涂装");
				generateTable("底盘");
				generateTable("总装");*/

			}
		});
	}