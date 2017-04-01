var detaillist;
$(document).ready(function(){
	$("#qc_tmpl_in").addClass("in");
	getDetail();
	
})
function generateTable(workshop){
		var tableId="";
		if(workshop.indexOf("焊装")>=0){
			tableId="#welding";
		}
		if(workshop.indexOf("涂装")>=0){
			tableId="#painting";
		}
		if(workshop.indexOf("底盘")>=0){
			tableId="#bottom";
		}
		if(workshop.indexOf("总装")>=0){
			tableId="#assembly";
		}
		$(tableId+" tbody").html("");
		$.each(detaillist,function(index,value){
			if(value.workshop.indexOf(workshop)>=0){
				var tr = $("<tr />");
				$("<td />").attr("recordId",index)
				.html(value.sequence).appendTo(tr);
				$("<td />").attr("recordId",index)
				.html(value.processName==null?"":value.processName).appendTo(tr);
				/*$("<td />").attr("recordId",index)
				.html(value.processNo==null?"":value.processNo).appendTo(tr);*/
				$("<td />").attr("recordId",index)
				.html(value.parts==null?"":value.parts).appendTo(tr);
				$("<td />").attr("recordId",index)
				.html(value.keyParts==null?"否":value.keyParts).appendTo(tr);
				tr.appendTo(tableId+" tbody");
			}
				
		});
		$(tableId+"_tab").addClass("active").css("display","");
		$(tableId).addClass("active");
	}
	function getDetail() {
		$.ajax({
			type : "get",// 使用get方法访问后台
			dataType : "json",// 返回json格式的数据
			url : "trackTpl!getTplDetail.action",
			data : {
				"tplHeader.id" : $('#tplHeaderId').val(),
				"tplHeader.workshop" : getQueryString("tplHeader.workshop")
			},
			success : function(response) {
				var tplarray = response.dataList;
				detaillist = tplarray;
				generateTable(getQueryString("tplHeader.workshop"));

			}
		});
	}