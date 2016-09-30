$(document).ready(function() {
	$("#qc_record_in").addClass("in");
	ajaxGetDetail();

})

function ajaxGetDetail() {
	var headerId = $("#headerId").val();
/*	var conditions = "{";
	conditions += "header.id:" + headerId + "}";*/
	// alert(conditions);
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "testFlowCardIn!getRecordDetail.action",
		data : {
			"header.id" : headerId
		},
		success : function(response) {
			var tplarray = response.dataList;
			//var flowHeader = response.header;
/*			$("#busTypeId").val(flowHeader.busTypeId);
			$("#orderId").val(flowHeader.orderId);
			$("#orderConfigId").val(flowHeader.configId);
			$("#order-info").html(
					"订单：" + flowHeader.order + "  车型：" + flowHeader.busType);*/
			if (tplarray.length <= 0) {
				alert("未查询到匹配模板！");
				$("#saveForm").css("display", "none");
			} else {
				generateTable(tplarray);// 动态生成表格
				$("#saveForm").css("display", "");
			}
		}
	});
}
function generateTable(dataList) {
	$("#tableResult tbody").html("");
	var last_processNo = null;
	var last_itemNo = null;
	var last_node = null;
	var last_qc_point = null;
	var node_index = 0;
	var node_id = "";
	var qc_point_index = 0;
	var qc_point_id = "";

	$
			.each(dataList,
					function(index, value) {
						var tr = $("<tr />");
						$(tr).data("tplDetailId", value.id);
						var process_id = "#process_" + value.process_no;
						var item_id = "#item_" + value.test_item_no;
						// 节点 合并单元格
						if (value.quality_node == last_node) {
							var noderowspan = parseInt($(node_id).attr(
									"rowspan"));
							var recordid = $(node_id).attr("recordid") + ","
									+ index;

							$(node_id).attr("rowspan", noderowspan + 1).attr(
									"recordid", recordid);
							if((value.quality_node).trim().length>0){
								$(node_id).html(value.quality_node);
							}
						} else {
							$(
									"<td id='node_" + node_index
											+ "' rowspan='1' " + "/>").html(
									value.quality_node).appendTo(tr);
							node_id = "#node_" + node_index;
							node_index += 1;
						}
						// 工序 合并单元格
						if (value.process_no == last_processNo&&value.quality_node == last_node) {

							var prorowspan = parseInt($(process_id).attr(
									"rowspan"));
							var recordid = $(process_id).attr("recordid") + ","
									+ index;

							$(process_id).attr("rowspan", prorowspan + 1).attr(
									"recordid", recordid);
							if((value.process_name).trim().length>0){
								$(process_id).html(value.process_name);
							}
						} else {
							$(
									"<td id='process_" + value.process_no
											+ "' rowspan='1' " + "/>").attr(
									"recordid", index).html(value.process_name)
									.appendTo(tr);
						}
						// 检测内容 合并单元格
						if (value.test_item_no == last_itemNo&&value.process_no == last_processNo) {
							var itemrowspan = parseInt($(item_id).attr(
									"rowspan"));
							var recordid = $(item_id).attr("recordid") + ","
									+ index;
							$(item_id).attr("rowspan", itemrowspan + 1).attr(
									"recordid", recordid);
							if((value.test_item).trim().length>0){
								$(item_id).html(value.test_item);
							}
						} else {
							$(
									"<td id='item_" + value.test_item_no
											+ "' rowspan='1'" + "/>").attr(
									"recordid", index).html(value.test_item)
									.appendTo(tr);
						}
						// 质控点 合并单元格
						if (value.quality_point_flag == last_qc_point&&value.test_item_no == last_itemNo) {
							var pointrowspan = parseInt($(qc_point_id).attr(
									"rowspan"));
							var recordid = $(qc_point_id).attr("recordid")
									+ "," + index;
							$(qc_point_id).attr("rowspan", pointrowspan + 1)
									.attr("recordid", recordid);
							if((value.quality_point_flag).trim().length>0){
								$(qc_point_id).html(value.quality_point_flag);
							}
						} else {
							qc_point_id = "#qcpoint_" + qc_point_index;
							$(
									"<td id='qcpoint_" + qc_point_index
											+ "' rowspan='1'" + "/>").attr(
									"recordid", index).html(
									value.quality_point_flag).appendTo(tr);
							qc_point_index += 1;
						}

						$("<td />").attr("id", "std_" + index).html(
								value.test_standard).appendTo(tr);
						$("<td />").attr("id", "freq_" + index).html(
								value.frequency).appendTo(tr);
						$("<td />").attr("id", "tools_" + index).html(
								value.test_tools).appendTo(tr);

						$("<td width='120px' />").html(value.test_result_name)
								.appendTo(tr);
						$("<td />").html(value.result_judge).appendTo(tr);
						$("<td />").html(value.rework).appendTo(tr);
						$("<td width='80px' />").html(value.workshop).appendTo(
								tr);
						$("<td />").html(value.workgroup).appendTo(tr);
						$("<td />").html(value.memo).appendTo(tr);

						last_processNo = value.process_no;
						last_itemNo = value.test_item_no;
						last_node = value.quality_node;
						last_qc_point = value.quality_point_flag;
						tr.appendTo("#tableResult tbody");

					});
}
