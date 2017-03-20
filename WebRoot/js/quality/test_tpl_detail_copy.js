var detaillist;
var maxProcessNo=0;
var maxItemNo=0;
var partsId=0;
var busType='';
var tplType='';
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
			//弹出表格编辑框
			$("#tableResult tbody").live("click", function(e) {
				var targetId=$(e.target).attr("id");
				//alert(targetId.indexOf("freq_"));
				$("#editModal").data("id", targetId);
				if(targetId.indexOf("freq_")>=0){					
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
			});
			$("#btnSave").live("click", function() {
				var eleId = $("#editModal").data("id");
				var recordid=$("#"+eleId).attr("recordid");
				var idarray=recordid.split(",");
				var changedVal="";
				if(eleId.indexOf("freq_")>=0/*||eleId.indexOf("tools_")>=0*/){
					changedVal=$("#edit_select").val();
					$("#" + eleId).html($("#edit_select :selected").html());
				}else{
					changedVal=$("#edit_content").val();
					$("#" + eleId).html($("#edit_content").val());
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
						detaillist[i].frequency=$("#edit_select :selected").html();
					}
					if(eleId.indexOf("tools_")>=0){
						//detaillist[i].testToolsId=parseInt(changedVal);
						//detaillist[i].testTools=$("#edit_select :selected").html();
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
						var processNo=typeof($("#" + eleId).attr("process_no"))=='undefined'?maxProcessNo+1:$("#" + eleId).attr("process_no");
						var itemNo=typeof($("#" + eleId).attr("item_no"))=='undefined'?maxItemNo+1:$("#" + eleId).attr("item_no");
						//alert("process:"+processNo+"/maxItemNo:"+maxItemNo);
						var insertData={
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
						generateTable(detaillist);
						emptyModal();
						
					});
			$("#btnSaveTplDetail").live("click",function(){
				var orderId=isNaN(parseInt($("#input_order").val()))?0:parseInt($("#input_order").val());
				var busTypeId=isNaN(parseInt($("#input_busType").val()))?0:parseInt($("#input_busType").val());
				var configId=isNaN(parseInt($("#input_config").val()))?0:parseInt($("#input_config").val());
				var partsId=isNaN(parseInt($("#input_parts").attr("parts_id")))?0:parseInt($("#input_parts").attr("parts_id"));
				var isDraft=$("#isDraft").is(':checked')?"0":"1";
				var flag=true;
				if(busTypeId==0){
					alert("必须选择车型！");
					flag=false;
				}
				if(partsId==0){
					alert("必须输入正确零部件！");
					flag=false;
				}
				if(flag){
					$.ajax({
						url: "testTpl!addTestTplDetailCopy.action",
						type:"post",
						dataType: "json",
						data: {
							"detailList":JSON.stringify(detaillist),
							"testTplHeader.busTypeId":busTypeId,
							"testTplHeader.orderId":orderId,
							"testTplHeader.configId":configId,
							"testTplHeader.partsId":partsId,
							"testTplHeader.isDraft":isDraft,
							"testTplHeader.memo":$("#input_memo").val()
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
				}
				
			});
			
			function emptyModal() {
				$("#edit_content").val("");
				$("#edit_select").val("");
				$("#editModal").modal("hide");
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
				partsId=getQueryString("testTplHeader.partsId")||"";
				parts=getQueryString("testTplHeader.parts")||"";
				busType=getQueryString("testTplHeader.busType")||"";
				tplType=getQueryString("testTplHeader.tplType")||"";
				getDetail();
				getBusTypeSelect("#input_busType",busType,"");
				//getOrderConfigSelect("#input_config","");
				//getOrderSelect("#input_order","");
				if(tplType=='车型'){
					$("#input_config").parent("td").hide();
					$("#input_order").parent("td").hide();
					$("#th_order").hide();
					$("#th_config").hide();
				}else{
					$("#input_busType").attr("disabled",true);
					getOrderSelect("#input_order",$("#input_busType").val(),"");
					$("#input_parts").attr("disabled",true);
				}
				getPartsSelect("#input_parts");
				$("#input_parts").val(parts).attr("parts_id",partsId);
				//modalMove("#editModal");
				$("#qc_tmpl_in").addClass("in");
			}
		})