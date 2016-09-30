var detaillist;
$(document).ready(
		function() {
			$("#qc_tmpl_in").addClass("in");
			getDetail();
			$("#tableResult tbody").live("click", function(e) {
				$("#edit_content").val($(e.target).html());
				$("#editModal").data("id", $(e.target).attr("id"));
				$("#editModal").modal("show");
			});			
			function generateTable(dataList) {
				$("#tableResult tbody").html("");
				var last_processNo = null;
				var last_itemNo = null;
				var last_node=null;
				var last_qc_point=null;				
				var node_index=0;
				var node_id="";
				var qc_point_index=0;
				var qc_point_id="";
				$.each(dataList,
						function(index, value) {
							var tr = $("<tr />");
							var process_id="#process_" + value.processNo;
							var item_id="#item_" + value.testItemNo;
							//节点 合并单元格
							if (value.qualityNode == last_node) {
								var noderowspan = parseInt($(node_id).attr(
										"rowspan"));
								var recordid=$(node_id).attr("recordid")+","+index;
								
								$(node_id).attr(
										"rowspan", noderowspan + 1).attr("recordid",recordid);
								if((value.qualityNode).trim().length>0){
									$(node_id).html(value.qualityNode);
								}
							} else {
								$(										
										"<td id='node_" + node_index
												+ "' rowspan='1' " + "/>").attr("recordid",index)
										.html(value.qualityNode).appendTo(tr);
								node_id="#node_"+node_index;
								node_index+=1;
							}
							//工序 合并单元格
							if (value.processNo == last_processNo&&value.qualityNode == last_node) {

								var prorowspan = parseInt($(process_id).attr(
										"rowspan"));
								var recordid=$(process_id).attr("recordid")+","+index;
								
								$(process_id).attr(
										"rowspan", prorowspan + 1).attr("recordid",recordid);
								if((value.processName).trim().length>0){
									$(process_id).html(value.processName);
								}
							} else {
								$(
										"<td id='process_" + value.processNo
												+ "' rowspan='1' " + "/>").attr("recordid",index)
												.attr("node",value.qualityNode)
										.html(value.processName).appendTo(tr);
							}
							//检测内容 合并单元格
							if (value.testItemNo == last_itemNo&&value.processNo == last_processNo) {
								var itemrowspan = parseInt($(item_id).attr(
										"rowspan"));
								var recordid=$(item_id).attr("recordid")+","+index;
								$(item_id).attr("rowspan",
										itemrowspan + 1).attr("recordid",recordid);
								if((value.testItemName).trim().length>0){
									$(item_id).html(value.testItemName);
								}
							} else {
								$("<td id='item_" + value.testItemNo
												+ "' rowspan='1'"												
												+ "/>").attr("recordid",index).
												attr("process_no",value.processNo).
												attr("node",value.qualityNode).
												html(value.testItemName).appendTo(tr);
							}
							//质控点 合并单元格
							if (value.qualityPointFlag == last_qc_point&&value.testItemNo == last_itemNo) {
								var pointrowspan = parseInt($(qc_point_id).attr(
										"rowspan"));
								var recordid=$(qc_point_id).attr("recordid")+","+index;
								$(qc_point_id).attr("rowspan",
										pointrowspan + 1).attr("recordid",recordid);
								if((value.qualityPointFlag).trim().length>0){
									$(qc_point_id).html(value.qualityPointFlag);
								}
							} else {
								qc_point_id="#qcpoint_"+qc_point_index;
								$("<td id='qcpoint_" + qc_point_index
												+ "' rowspan='1'"												
												+ "/>").attr("recordid",index).
												attr("process_no",value.processNo).
												attr("node",value.qualityNode).
												attr("item_no",value.testItemNo).
												html(value.qualityPointFlag).appendTo(tr);
								qc_point_index+=1;
			
							}
							
							$("<td />").attr("id", "std_" + index).attr("recordid",index)
									.attr("node",value.qualityNode)
									.attr("item_no",value.testItemNo)
									.attr("process_no",value.processNo)
									.attr("qcpoint",value.qualityPointFlag)
									.html(value.testStdName).appendTo(tr);
							$("<td />").attr("id", "freq_" + index).attr("recordid",index)
									.attr("node",value.qualityNode)
									.attr("item_no",value.testItemNo)
									.attr("process_no",value.processNo)
									.attr("qcpoint",value.qualityPointFlag)
									.html(value.frequency).appendTo(tr);
							$("<td />").attr("id", "tools_" + index).attr("recordid",index)
									.attr("node",value.qualityNode)
									.attr("item_no",value.testItemNo)
									.attr("process_no",value.processNo)
									.attr("qcpoint",value.qualityPointFlag)
									.html(value.testTools).appendTo(tr);

							last_processNo = value.processNo;
							last_itemNo = value.testItemNo;
							last_node= value.qualityNode;
							last_qc_point=value.qualityPointFlag;
							tr.appendTo("#tableResult tbody");							
						});
			}
			function getDetail() {
				$.ajax({
					type : "get",// 使用get方法访问后台
					dataType : "json",// 返回json格式的数据
					url : "testFlowTpl!showTplDetail.action",
					data : {
						"tplHeader.id" : $('#tplHeaderId').val()
					},
					success : function(response) {
						var tplarray = response.dataList;
						detaillist = tplarray;
						generateTable(tplarray);

					}
				});
			}
		})