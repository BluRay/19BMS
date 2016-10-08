var detaillist;
var maxProcessNo=0;
var maxItemNo=0;
$(document).ready(
		function() {
			$("#qc_tmpl_in").addClass("in");
			//modalMove("#editModal");
			getDetail();
			//弹出编辑框
			$("#tableResult tbody").live("click", function(e) {
				var targetId=$(e.target).attr("id");
				//alert(targetId.indexOf("freq_"));
				var editModalId="#editModal";
				var editSelectId="#edit_select";
				var textInputId="#text_input";
				var selectInputId="#select_input";
				var editContentId="#edit_content";
				
				if($("#isDraft").is(':checked')){
					editModalId="#editDraftModal";
					editSelectId="#edit_draft_select";
					textInputId="#text_draft_input";
					selectInputId="#select_draft_input";
					editContentId="#edit_draft_content";
				}
				$(editModalId).data("id", targetId);
				if(targetId.indexOf("freq_")>=0){					
					//getFrequencySelect("#edit_select",$(e.target).html());
					getKeysSelect("TESTING_FREQUENCY",$(e.target).html(),editSelectId);
					$(textInputId).css("display","none");
					$(selectInputId).css("display","");
				}/*else if(targetId.indexOf("tools_")>=0){
					getTestToolsSelect("#edit_select",$(e.target).html());
					$("#text_input").css("display","none");
					$("#select_input").css("display","");
				}*/else{
					$(editContentId).val($(e.target).html());
					$(textInputId).css("display","");
					$(selectInputId).css("display","none");
				}
				$(editModalId).modal("show");
			});	
			//删除一行
			$("#btnDraftDelete").live(
					"click",
					function() {
						var eleId = $("#editDraftModal").data("id");
						var evalue = $("#" + eleId).attr("id");

						var recordid=$("#"+eleId).attr("recordid");
						//alert(recordid)
						var idarray=recordid.split(",");
						//倒序删除，否则index最大的元素将无法删除
						var del_detaillist=new Array();
						if(idarray.length==1){
							del_detaillist.push(detaillist[recordid]);
							detaillist.splice(recordid, 1);
						}else
						for(var i=idarray[idarray.length-1];i>=idarray[0];i--){
							del_detaillist.push(detaillist[i]);
							detaillist.splice(i, 1);
						}
						//alert(detaillist.length)
						//generateTable(detaillist);
						$.ajax({
							url: "testFlowTpl!deleteTplDetail.action",
							type:"post",
							dataType: "json",
							data: {
								"detailList":JSON.stringify(del_detaillist)
							},
							async: false,
							error: function () {alertError();},
							success: function (response) {	
								getDetail();
							}
						});
						emptyModal("draft");
						
					});
			//添加一行
			$("#btnDraftAdd").live(
					"click",
					function() {
						var eleId = $("#editDraftModal").data("id");
						var evalue = $("#" + eleId).attr("id");
						var old_recordid=$("#"+eleId).attr("recordid");
						var insert_recordid="";
			
						var indexlist=old_recordid.split(",");
						insert_recordid=parseInt(indexlist[indexlist.length-1])+1;
						
						var contentVal=$("#edit_draft_content").val();
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
								tplRecordId:$("#tplHeaderId").val(),
								frequency:"",
								processName:"",
								processNo:parseInt(processNo),
								qualityPointFlag:qcPoint,
								qualityNode:qualityNode,
								testItemName:"",
								testItemNo:parseInt(itemNo),
								testStdName:contentVal,
								testTools:""
						};
						//alert(insert_recordid);		
						detaillist.splice(insert_recordid,0,insertData);
						//generateTable(detaillist);
						var add_detaillist=new Array();
						add_detaillist.push(insertData);
						$.ajax({
							url: "testFlowTpl!insertTplDetail.action",
							type:"post",
							dataType: "json",
							data: {
								"detailList":JSON.stringify(add_detaillist)
							},
							async: false,
							error: function () {alertError();},
							success: function (response) {	
								getDetail();
							}
						});
						
						emptyModal("draft");
						
					});
			
			//编辑框点击保存，更新detaillist数据
			$("#btnSave,#btnDraftSave").live("click", function() {
				var isDraft=$(this).attr("id")=="btnDraftSave"?"draft":"";
				var modalId=isDraft?"#editDraftModal":"#editModal";
				var editSelectId=isDraft?"#edit_draft_select":"#edit_select";
				var editContentId=isDraft?"#edit_draft_content":"#edit_content";
				
				var eleId = $(modalId).data("id");
				var recordid=$("#"+eleId).attr("recordid");
				var idarray=recordid.split(",");
				var changedVal="";
				if(eleId.indexOf("freq_")>=0){
					changedVal=$(editSelectId).val();
					$("#" + eleId).html($(editSelectId+" :selected").html());
				}else{
					changedVal=$(editContentId).val();
					$("#" + eleId).html($(editContentId).val());
				}
				var updatelist=[];
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
						detaillist[i].frequency=$(editSelectId+" :selected").html();
					}
					if(eleId.indexOf("tools_")>=0){
						//detaillist[i].testToolsId=parseInt(changedVal);
						detaillist[i].testTools=changedVal;
					}
					updatelist.push(detaillist[i]);
				});
				$.ajax({
					url: "testFlowTpl!updateTplDetail.action",
					type:"post",
					dataType: "json",
					data: {
						"detailList":JSON.stringify(updatelist)
					},
					async: false,
					error: function () {alertError();},
					success: function (response) {	
						getDetail();
					}
				})
				emptyModal(isDraft);//清空编辑框
			});
			//保存模板更改
			$("#btnSaveTplDetail").live("click",function(){
				var isDraft=$("#isDraft").is(':checked')?"0":"1";
				$.ajax({
					url: "testFlowTpl!updateTplDetail.action",
					type:"post",
					dataType: "json",
					data: {
						"detailList":JSON.stringify(detaillist),
						"tplHeader.id":$("#tplHeaderId").val(),
						"tplHeader.isDraft":isDraft
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
							if(parseInt(value.processNo)>maxProcessNo){
								maxProcessNo=parseInt(value.processNo);
							}
							if(parseInt(value.testItemNo)>maxItemNo){
								maxItemNo=parseInt(value.testItemNo);
							}
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
			function emptyModal(modal) {
				if(modal=='draft'){
					$("#edit_draft_content").val("");
					$("#edit_draft_select").val("");
					$("#editDraftModal").modal("hide");
				}else{
					$("#edit_content").val("");
					$("#edit_select").val("");
					$("#editModal").modal("hide");
				}
			}
		})