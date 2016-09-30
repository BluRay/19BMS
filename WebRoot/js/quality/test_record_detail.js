$(document).ready(function() {
	ajaxGetDetail();
})
function ajaxGetDetail() {
	//alert($("#headerId").val());
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "testRecordIn!getRecordDetail.action",
		data : {
			"header.id" : $("#headerId").val()
		},
		success : function(response) {
			var tplarray = response.dataList;
			detaillist = tplarray;			
			generateTable(tplarray);//动态生成表格
		}
	});
}
function generateTable(dataList) {
	$("#tableResult tbody").html("");
	var last_processNo = null;
	var last_itemNo = null;

	$.each(dataList, function(index, value) {
		var tr = $("<tr />");
		$(tr).data("tplDetailId", value.id);
		var process_id = "#process_" + value.processNo;
		var item_id = "#item_" + value.testItemNo;
		//工序合并
		if (value.processNo == last_processNo) {
			var prorowspan = parseInt($(process_id).attr("rowspan"));
			$(process_id).attr("rowspan", prorowspan + 1);
			if((value.process).trim().length>0){
				$(process_id).html(value.process);
			}
		} else {
			$("<td id='process_" + value.processNo + "' rowspan='1' " + "/>")
					.html(value.process).appendTo(tr);
		}
		//检测项目合并
		if (value.testItemNo == last_itemNo&&value.processNo == last_processNo) {
			var itemrowspan = parseInt($(item_id).attr("rowspan"));
			var recordid = $(item_id).attr("recordid") + "," + index;
			$(item_id).attr("rowspan", itemrowspan + 1);
			if((value.testItem).trim().length>0){
				$(item_id).html(value.testItem);
			}
		} else {
			$("<td id='item_" + value.testItemNo + "' rowspan='1'" + "/>")
					.html(value.testItem).appendTo(tr);
		}

		$("<td />").attr("id", "std_" + index).attr("recordid", index).attr(
				"item_no", value.testItemNo)
				.attr("process_no", value.processNo).html(value.standard)
				.appendTo(tr);
		$("<td />").attr("id", "freq_" + index).attr("recordid", index).attr(
				"item_no", item_id).attr("process_no", value.processNo).html(
				value.frequency).appendTo(tr);
		$("<td />").attr("id", "tools_" + index).attr("recordid", index).attr(
				"item_no", item_id).attr("process_no", value.processNo).html(
				value.testTools).appendTo(tr);
		$("<td width='120px' />").html(value.result==null?"":value.result).appendTo(tr);
		$("<td />").html(value.resultJudge).appendTo(tr);
		$("<td />").html(value.reworkResult==null?"":value.reworkResult).appendTo(tr);
		$("<td />").html(value.workshop).appendTo(tr);
		$("<td />").html(value.workgroup).appendTo(tr);
		$("<td />").html(value.memo==null?"":value.memo).appendTo(tr);
		last_processNo = value.processNo;
		last_itemNo = value.testItemNo;
		tr.appendTo("#tableResult tbody");
		$("#tableResult").css("display","");
		
	});
}