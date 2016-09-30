var detaillist;
var maxProcessNo=0;
var maxItemNo=0;
$(document).ready(
		function() {
			initPage();
			$("#input_busType").change(function(){
				getOrderSelect("#input_order",$("#input_busType").val(),"");
			});
			$("#input_order").change(function(){
				var orderNo=($("#input_order option:selected").text().split(" "))[0];
				//alert(orderNo);
				getOrderConfigSelect("#input_config","","noall",orderNo);
			});
			$("#tableResult tbody").live("click", function(e) {
		/*		$("#edit_content").val($(e.target).html());
				$("#editModal").data("id", $(e.target).attr("id"));
				$("#editModal").modal("show");*/
				var targetId=$(e.target).attr("id");
				//alert(targetId.indexOf("freq_"));
				$("#editModal").data("id", targetId);
				if(targetId.indexOf("freq_")>=0){					
					//getFrequencySelect("#edit_select",$(e.target).html());
					getKeysSelect("TESTING_FREQUENCY",$(e.target).html(),"#edit_select");
					$("#text_input").css("display","none");
					$("#select_input").css("display","");
				}/*else if(targetId.indexOf("tools_")>=0){
					getTestToolsSelect("#edit_select",$(e.target).html());
					$("#text_input").css("display","");
					$("#select_input").css("display","none");
				}*/else{
					$("#edit_content").val($(e.target).html());
					$("#text_input").css("display","");
					$("#select_input").css("display","none");
				}
				$("#editModal").modal("show");
			});	
			//编辑框点击保存，更新detaillist数据
			$("#btnSave").live("click", function() {
				var eleId = $("#editModal").data("id");
				var recordid=$("#"+eleId).attr("recordid");
				var idarray=recordid.split(",");
				var changedVal="";
				if(eleId.indexOf("freq_")>=0){
					changedVal=$("#edit_select").val();
					$("#" + eleId).html($("#edit_select :selected").html());
				}else{
					changedVal=$("#edit_content").val();
					$("#" + eleId).html($("#edit_content").val());
				}
				
				//更新detaillist中的属性值
				idarray.forEach(function(i){
					if(eleId.indexOf("node_")>=0){
						detaillist[i].qualityNode=changedVal;
					}
					if(eleId.indexOf("process_")>=0){
						detaillist[i].processName=changedVal;
					}
					if(eleId.indexOf("item_")>=0){
						detaillist[i].testItemName=changedVal;
					}
					if(eleId.indexOf("qcpoint_")>=0){
						detaillist[i].qualityPointFlag=changedVal;
					}
					if(eleId.indexOf("std_")>=0){
						detaillist[i].testStdName=changedVal;
					}
					if(eleId.indexOf("freq_")>=0){
						detaillist[i].frequencyId=parseInt(changedVal);
						detaillist[i].frequency=$("#edit_select :selected").html();
					}
					if(eleId.indexOf("tools_")>=0){
						//detaillist[i].testToolsId=parseInt(changedVal);
						detaillist[i].testTools=changedVal;
					}
					
				});
				emptyModal();
			});
			//删除一行
			$("#btnDelete").live(
					"click",
					function() {
						var eleId = $("#editModal").data("id");
						var evalue = $("#" + eleId).attr("id");

						var recordid=$("#"+eleId).attr("recordid");
						var idarray=recordid.split(",");
						//倒序删除，否则index最大的元素将无法删除
						for(var i=idarray[idarray.length-1];i>=idarray[0];i--){
							detaillist.splice(i, 1);
						}
						//alert(detaillist.length)
						generateTable(detaillist);
						emptyModal();
						
					});
			//添加一行
			$("#btnAdd").live(
					"click",
					function() {
						var eleId = $("#editModal").data("id");
						var evalue = $("#" + eleId).attr("id");
						var old_recordid=$("#"+eleId).attr("recordid");
						var insert_recordid="";
			
						var indexlist=old_recordid.split(",");
						insert_recordid=parseInt(indexlist[indexlist.length-1])+1;
						
						var contentVal=$("#edit_content").val();
						/*
						 * 获取processNo，itemNo
						 */
						//alert(typeof($("#" + eleId).attr("process_no")));
						var qualityNode=typeof($("#" + eleId).attr("node"))=='undefined'?"":$("#" + eleId).attr("node");
						var qcPoint=typeof($("#" + eleId).attr("qcpoint"))=='undefined'?"":$("#" + eleId).attr("qcpoint");
						var processNo=typeof($("#" + eleId).attr("process_no"))=='undefined'?maxProcessNo+1:$("#" + eleId).attr("process_no");
						var itemNo=typeof($("#" + eleId).attr("item_no"))=='undefined'?maxItemNo+1:$("#" + eleId).attr("item_no");
						//alert("process:"+processNo+"/maxItemNo:"+maxItemNo);
						var insertData={
								frequency:"",
								processName:"",
								processNo:parseInt(processNo),
								qualityPointFlag:qcPoint,
								qualityNode:qualityNode,
								testItemName:"",
								testItemNo:parseInt(itemNo),
								testStdName:"",
								testTools:""
						};
						//alert(insert_recordid);		
						detaillist.splice(insert_recordid,0,insertData);
						generateTable(detaillist);
						emptyModal();
						
					});
			//模板保存
			$("#btnSaveTplDetail").live("click",function(){
				var orderId=isNaN(parseInt($("#input_order").val()))?0:parseInt($("#input_order").val());
				var busTypeId=isNaN(parseInt($("#input_busType").val()))?0:parseInt($("#input_busType").val());
				var configId=isNaN(parseInt($("#input_config").val()))?0:parseInt($("#input_config").val());
				//configId=$("#input_config").val()==undefined?0:parseInt($("#input_config").val());
				var workshopId=isNaN(parseInt($("#input_workshop").val()))?0:parseInt($("#input_workshop").val());
				var isDraft=$("#isDraft").is(':checked')?"0":"1";
				var flag=true;
				if(busTypeId==0){
					alert("必须选择车型！");
					flag=false;
				}
				if(workshopId==0){
					alert("必须选择车间！");
					flag=false;
				}
				//alert(configId)
				if(flag){
					$.ajax({
						url: "testFlowTpl!addTplDetailCopy.action",
						type:"post",
						dataType: "json",
						data: {
							"detailList":JSON.stringify(detaillist),
							"tplHeader.busTypeId":busTypeId,
							"tplHeader.orderId":orderId,
							"tplHeader.configId":configId,
							"tplHeader.workshopId":workshopId,
							"tplHeader.isDraft":isDraft,
							"tplHeader.memo":$("#input_memo").val()
						},
						async: false,
						error: function () {alertError();},
						success: function (response) {	
							alert(response.message);
								if(response.success){
									window.open("testFlowTpl!index.action","_self");
								}
						}
					})
				}
				
			});
			//动态生成表格			
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
							if(parseInt(value.processNo)>maxProcessNo){
								maxProcessNo=parseInt(value.processNo);
							}
							if(parseInt(value.testItemNo)>maxItemNo){
								maxItemNo=parseInt(value.testItemNo);
							}
						});
			}
			//获取模板明细数据
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
			function emptyModal() {
				$("#edit_content").val("");
				$("#edit_select").val("");
				$("#editModal").modal("hide");
			}
			// 页面初始化
			function initPage() {
				getDetail();
				getBusTypeSelect("#input_busType","","");
				//getOrderConfigSelect("#input_config","");
				//getOrderSelect("#input_order","");
				getWorkshopSelect_Key("#input_workshop","");
				//modalMove("#editModal");
				$("#qc_tmpl_in").addClass("in");
			}
		})