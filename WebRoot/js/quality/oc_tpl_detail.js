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
				.html(value.parts).appendTo(tr);
				$("<td />").attr("recordId",index)
				.html(value.partsNo).appendTo(tr);
				$("<td />").attr("recordId",index)
				.html(value.vendor).appendTo(tr);
				tr.appendTo(tableId+" tbody");
			}
				
		});
	}
	function getDetail() {
		$.ajax({
			type : "get",// 使用get方法访问后台
			dataType : "json",// 返回json格式的数据
			url : "ocTpl!getTplDetail.action",
			data : {
				"tplHeader.id" : $('#tplHeaderId').val()
			},
			success : function(response) {
				var tplarray = response.dataList;
				detaillist = tplarray;
				generateTable("焊装");

			}
		});
	}