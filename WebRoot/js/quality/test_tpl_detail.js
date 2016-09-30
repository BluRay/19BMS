var detaillist;
var maxProcessNo=0;
var maxItemNo=0;
$(document).ready(
		function() {
			$("#qc_tmpl_in").addClass("in");
			getDetail();
			/*
			 * $("#tableResult tbody").mouseover(function(e){ var xx =
			 * e.originalEvent.x || e.originalEvent.layerX || 0; var yy =
			 * e.originalEvent.y || e.originalEvent.layerY || 0;
			 * //alert(e.pageX); $("#edit_hover").css("display","block");
			 * $("#edit_hover").css("left", (e.pageX -5) + "px" );
			 * $("#edit_hover").css("top", (e.pageY-10)+"px"); });
			 * $("#tableResult tbody").mouseout(function(e){
			 * $("#edit_hover").css("display","none"); });
			 */
			$("#tableResult tbody").live("click", function(e) {
				$("#edit_content").val($(e.target).html());
				// alert($(e.target).attr("id"));
				$("#editModal").data("id", $(e.target).attr("id"));
				$("#editModal").modal("show");
			});			
			function generateTable(dataList) {
				$("#tableResult tbody").html("");
				var last_processNo = null;
				var last_itemNo = null;

				$.each(dataList,
						function(index, value) {
							var tr = $("<tr />");
							var process_id="#process_" + value.processNo;
							var item_id="#item_" + value.testItemNo;
							//工序合并
							if (value.processNo == last_processNo) {

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
										.html(value.processName).appendTo(tr);
							}
							//检测项目合并
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
												html(value.testItemName).appendTo(tr);
							}

							$("<td />").attr("id", "std_" + index).attr("recordid",index)
									.attr("item_no",value.testItemNo)
									.attr("process_no",value.processNo)
									.html(value.testStdName).appendTo(tr);
							$("<td />").attr("id", "freq_" + index).attr("recordid",index)
									.attr("item_no",item_id)
									.attr("process_no",value.processNo)
									.html(value.frequency).appendTo(tr);
							$("<td />").attr("id", "tools_" + index).attr("recordid",index)
									.attr("item_no",item_id)
									.attr("process_no",value.processNo)
									.html(value.testTools).appendTo(tr);

							last_processNo = value.processNo;
							last_itemNo = value.testItemNo;
							tr.appendTo("#tableResult tbody");
							if(parseInt(value.processNo)>maxProcessNo){
								maxProcessNo=parseInt(value.processNo);
							}
							if(parseInt(value.testItemNo)>maxItemNo){
								maxItemNo=parseInt(value.testItemNo);
							}
						});
			}
			function getDetail() {
				$.ajax({
					type : "get",// 使用get方法访问后台
					dataType : "json",// 返回json格式的数据
					url : "testTpl!showTestTplDetail.action",
					data : {
						"testTplHeader.id" : $('#tplHeaderId').val()
					},
					success : function(response) {
						var tplarray = response.dataList;
						detaillist = tplarray;
						generateTable(tplarray);

					}
				});
			}
		})