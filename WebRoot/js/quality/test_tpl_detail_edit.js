var detaillist;
var maxProcessNo=0;
var maxItemNo=0;
var tplType='';
$(document).ready(
		function() {			
			initPage();
			//弹出编辑框，草稿可以增删
			$("#tableResult tbody").live("click", function(e) {
				var targetId=$(e.target).attr("id");
				//alert(targetId.indexOf("freq_"));
				
				if($("#isDraft").is(':checked')){
					$("#editDraftModal").data("id", targetId);
					if(targetId.indexOf("freq_")>=0){					
						//getFrequencySelect("#edit_select",$(e.target).html());
						getKeysSelect("TESTING_FREQUENCY",$(e.target).html(),"#edit_draft_select");
						$("#text_draft_input").css("display","none");
						$("#select_draft_input").css("display","");
					}/*else if(targetId.indexOf("tools_")>=0){
						getTestToolsSelect("#edit_select",$(e.target).html());
						$("#text_input").css("display","none");
						$("#select_input").css("display","");
					}*/else{
						$("#edit_draft_content").val($(e.target).html());
						$("#text_draft_input").css("display","");
						$("#select_draft_input").css("display","none");
					}
					$("#editDraftModal").modal("show");
				}else{
					$("#editModal").data("id", targetId);
					if(targetId.indexOf("freq_")>=0){					
						//getFrequencySelect("#edit_select",$(e.target).html());
						getKeysSelect("TESTING_FREQUENCY",$(e.target).html(),"#edit_select");
						$("#text_input").css("display","none");
						$("#select_input").css("display","");
					}/*else if(targetId.indexOf("tools_")>=0){
						getTestToolsSelect("#edit_select",$(e.target).html());
						$("#text_input").css("display","none");
						$("#select_input").css("display","");
					}*/else{
						$("#edit_content").val($(e.target).html());
						$("#text_input").css("display","");
						$("#select_input").css("display","none");
					}
					$("#editModal").modal("show");
				}
					
			});
			
			//删除一行
			$("#btnDraftDelete").live(
					"click",
					function() {
						var eleId = $("#editDraftModal").data("id");
						var evalue = $("#" + eleId).attr("id");

						var recordid=$("#"+eleId).attr("recordid");
						var idarray=recordid.split(",");
						//倒序删除，否则index最大的元素将无法删除
						var del_detaillist=new Array();
						for(var i=idarray[idarray.length-1];i>=idarray[0];i--){
							del_detaillist.push(detaillist[i]);
							detaillist.splice(i, 1);							
						}
						//alert(detaillist.length)
						//generateTable(detaillist);
						$.ajax({
							url: "testTpl!deleteTestTplDetail.action",
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
						emptyModal(true);
						
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
						var processNo=typeof($("#" + eleId).attr("process_no"))=='undefined'?maxProcessNo+1:$("#" + eleId).attr("process_no");
						var itemNo=typeof($("#" + eleId).attr("item_no"))=='undefined'?maxItemNo+1:$("#" + eleId).attr("item_no");
						//alert("process:"+processNo+"/maxItemNo:"+maxItemNo);
						var insertData={
								tplRecordId:$('#tplHeaderId').val(),
								frequency:"",
								processName:"",
								processNo:parseInt(processNo),
								testItemName:"",
								testItemNo:parseInt(itemNo),
								testStdName:"",
								testTools:""
						};
						//alert(insert_recordid);		
						detaillist.splice(insert_recordid,0,insertData);
						//generateTable(detaillist);
						var add_detaillist=new Array();
						add_detaillist.push(insertData);
						$.ajax({
							url: "testTpl!insertTestTplDetail.action",
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
						emptyModal(true);
						
					});
			
			$("#btnSave,#btnDraftSave").live("click", function() {
				var isDraft=$(this).attr("id")=="btnDraftSave"?true:false;
				var modalId=isDraft?"#editDraftModal":"#editModal";
				var editSelectId=isDraft?"#edit_draft_select":"#edit_select";
				var editContentId=isDraft?"#edit_draft_content":"#edit_content";
				
				var eleId = $(modalId).data("id");
				var recordid=$("#"+eleId).attr("recordid");
				var idarray=recordid.split(",");
				var changedVal="";
				if(eleId.indexOf("freq_")>=0/*||eleId.indexOf("tools_")>=0*/){
					changedVal=$(editSelectId).val();
					$("#" + eleId).html($(editSelectId+" :selected").html());
				}else{
					changedVal=$(editContentId).val();
					$("#" + eleId).html($(editContentId).val());
				}
				
				//更新detaillist中的属性值
				idarray.forEach(function(i){
					if(eleId.indexOf("process_")>=0){
						detaillist[i].processName=changedVal;
					}
					if(eleId.indexOf("item_")>=0){
						detaillist[i].testItemName=changedVal;
					}
					if(eleId.indexOf("std_")>=0){
						detaillist[i].testStdName=changedVal;
					}
					if(eleId.indexOf("freq_")>=0){
						detaillist[i].frequencyId=parseInt(changedVal);
						detaillist[i].frequency=$(editSelectId+" :selected").html();
					}
					if(eleId.indexOf("tools_")>=0){
						/*detaillist[i].testToolsId=parseInt(changedVal);
						detaillist[i].testTools=$("#edit_select :selected").html();*/
						detaillist[i].testTools=changedVal;
					}
					
				});
				emptyModal(isDraft);
			});

			$("#btnSaveTplDetail").live("click",function(){
/*				var orderId=$("#input_order").val()==''?null:parseInt($("#input_order").val());
				var busTypeId=$("#input_busType").val()==''?null:parseInt($("#input_busType").val());
				var configId=$("#input_config").val()==''?null:parseInt($("#input_config").val());
				var partsId=$("#input_parts").attr("parts_id")==''?null:parseInt($("#input_parts").attr("parts_id"));*/
				
				var orderId=isNaN(parseInt($("#input_order").val()))?0:parseInt($("#input_order").val());
				var busTypeId=isNaN(parseInt($("#input_busType").val()))?0:parseInt($("#input_busType").val());
				var configId=isNaN(parseInt($("#input_config").val()))?0:parseInt($("#input_config").val());
				var partsId=isNaN(parseInt($("#input_parts").attr("parts_id")))?0:parseInt($("#input_parts").attr("parts_id"));
				var isDraft=$("#isDraft").is(':checked')?"0":"1";
				$.ajax({
					url: "testTpl!updateTestTplDetail.action",
					type:"post",
					dataType: "json",
					data: {
						"detailList":JSON.stringify(detaillist),
						"testTplHeader.isDraft":isDraft,
						"testTplHeader.id":$('#tplHeaderId').val()
					},
					async: false,
					error: function () {alertError();},
					success: function (response) {	
						alert(response.message);
							if(response.success){
								if(tplType=='车型'){
									window.open("testTpl!carType.action","_self");
								}else
									window.open("testTpl!index.action","_self");
							}
					}
				})
			});
			
			function emptyModal(isDraft) {				
				if(isDraft){
					$("#edit_draft_content").val("");
					$("#edit_draft_select").val("");
					$("#editDraftModal").modal("hide");
				}else{
					$("#edit_content").val("");
					$("#edit_select").val("");
					$("#editModal").modal("hide");
				}
				
			}
			//根据数据动态绘制表格
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
									.attr("item_no",value.testItemNo)
									.attr("process_no",value.processNo)
									.html(value.frequency).appendTo(tr);
							$("<td />").attr("id", "tools_" + index).attr("recordid",index)
									.attr("item_no",value.testItemNo)
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
			//查询模板明细
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
			// 页面初始化
			function initPage() {
				tplType=getQueryString("testTplHeader.tplType")||"";
				getDetail();
				$("#qc_tmpl_in").addClass("in");
				//modalMove("#editModal");
		/*		getBusTypeSelect("#input_busType","");
				getOrderConfigSelect("#input_config","");
				getOrderSelect("#input_order","");
				getPartsSelect("#input_parts");*/
			}
		})