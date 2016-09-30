$(document).ready(function(){
	initPage();
	//切换工厂，获取车间下拉列表
	$("#input_factory,#new_factory,#edit_factory").live("change", function(e) {		
		if($(e.target).attr("id")=='input_factory'){
			getWorkshopSelect("#input_workshop", "", $("#input_factory").val(),"empty");
		}if($(e.target).attr("id")=='new_factory'){
			getWorkshopSelect("#new_workshop", "", $("#new_factory").val(),"empty");
		}else{
			getWorkshopSelect("#edit_workshop", "", $("#edit_factory").val(),"empty");
		}				
	});
	//查询列表
	$("#btnQuery").click(function(){
		ajaxQuery(1);
	});
	//点击新增按钮，弹出新增窗口
	$("#btnAdd").click(function() {
		getFactorySelect("#new_factory","","empty");
		getBusTypeSelect("#new_bus_type","","empty");
		getOrderNoSelect("#new_order","#new_orderno");
		$("#newModal").modal("show");
	});
	//确认新增
	$("#btnAddConfirm").click(function(){
		if($("#new_occur_date").val()==''||($("#new_occur_date").val().trim()).length==0){
			alert("发生日期不能为空！");
			return false;
		}
		if($("#new_material").val()==''||($("#new_material").val().trim()).length==0){
			alert("物料名称不能为空！");
			return false;
		}
		if($("#new_factory").val()==''||($("#new_factory").val().trim()).length==0){
			alert("工厂不能为空！");
			return false;
		}
		if($("#new_workshop").val()=='0'||($("#new_workshop").val().trim()).length==0){
			alert("车间不能为空！");
			return false;
		}
		
		if($("#new_bus_type").val()==''||($("#new_bus_type").val().trim()).length==0){
			alert("车型不能为空！");
			return false;
		}
		//alert($("#new_orderno").val());
		if($("#new_orderId").val()==''||($("#new_orderId").val().trim()).length==0){
			alert("请输入正确订单编号！");
			return false;
		}
		if($("#new_desc").val()==''||($("#new_desc").val().trim()).length==0){
			alert("异常描述不能为空！");
			return false;
		}
		if($("#new_tmp_measures").val()==''||($("#new_tmp_measures").val().trim()).length==0){
			alert("临时措施不能为空！");
			return false;
		}
		if($("#new_reson").val()==''||($("#new_reson").val().trim()).length==0){
			alert("原因分析不能为空！");
			return false;
		}
		if($("#new_imp_measures").val()==''||($("#new_imp_measures").val().trim()).length==0){
			alert("改善/预防措施不能为空！");
			return false;
		}
		$("#newRecordForm").ajaxSubmit({
			url:"materialAbnormal!saveRecord.action",
			type: "post",
			dataType:"json",
			success:function(response){
				alert(response.message);
				if(response.success){
					window.open("materialAbnormal!index.action","_self");
				}						
			}			
		});
	});
	//预览
	$(".fa-search").live("click",function(e){
		var tds=$(e.target).parent("td").siblings();
		var tr=$(e.target).parent("td").parent("tr");
		var recordId=tr.data("id");
		//alert(recordId);
		$("#occur_date").html($(tds[11]).html());
		$("#material").html($(tds[4]).html());
		$("#factory").html($(tds[0]).html());
		$("#workshop").html($(tds[1]).html());
		$("#bus_type").html($(tds[2]).html());
		$("#order").html($(tds[3]).html());
		$("#bug_desc").html($(tr).data("bugDesc"));
		$("#bug_photo").attr("src",$(tr).data("bugPhotoPath"));
		$("#tmp_measures").html($(tr).data("tmpMeasure"));		
		$("#reason").html($(tr).data("faultReason"));
		$("#imp_measures").html($(tr).data("impMeasure"));
		$("#bug_level").html($(tds[5]).html());
		$("#finish_time").html($(tds[8]).html());
		
		$("#resp_unit").html($(tds[6]).html());		
		$("#resp_person").html($(tds[7]).html());
		$("#verify_result").html($(tds[9]).html());
		$("#verifier").html($(tds[10]).html());
		$("#imp_photo").attr("src",$(tr).data("imPhotoPath"));
		$("#memo").html($(tr).data("memo"));
		$("#showModal").modal("show");
	});
	//弹出编辑框
	$(".fa-pencil").live("click",function(e){
		var tds=$(e.target).parent("td").siblings();
		var tr=$(e.target).parent("td").parent("tr");
		var recordId=tr.data("id");
		$("#record_id").val(recordId);
		//alert($(tds[0]).html());
		getFactorySelect("#edit_factory",$(tds[0]).html(),"empty");
		getBusTypeSelect("#edit_bus_type",$(tds[2]).html(),"empty");
		getWorkshopSelect("#edit_workshop", $(tds[1]).html(), $("#edit_factory").val(),"empty");
		$("#edit_occur_date").val($(tds[11]).html());
		$("#edit_material").val($(tds[4]).html());
		//$("#edit_factory").val($(tds[0]).html());
		//$("#edit_workshop").val($(tds[1]).html());
		//$("#edit_bus_type").val($(tds[2]).html());
		getOrderNoSelect("#edit_order","#edit_orderId");
		//alert($(tr).data("orderNo"));
		$("#edit_order").val($(tr).data("orderNo"));
		$("#edit_orderId").val($(tr).data("orderId"));
		$("#edit_bug_desc").val($(tr).data("bugDesc"));
		$("#bug_photo_path").val($(tr).data("bugPhotoPath"));
		$("#edit_tmp_measures").val($(tr).data("tmpMeasure"));		
		$("#edit_reson").val($(tr).data("faultReason"));
		$("#edit_imp_measures").val($(tr).data("impMeasure"));
		$("#edit_bug_level").val($(tds[5]).html());
		$("#edit_finish_time").val($(tds[8]).html());
		
		$("#edit_resp_unit").val($(tds[6]).html());		
		$("#edit_resp_person").val($(tds[7]).html());
		$("#edit_result").val($(tds[9]).html());
		$("#edit_verifier").val($(tds[10]).html());
		$("#imphoto_path").val($(tr).data("imPhotoPath"));
		$("#edit_memo").val($(tr).data("memo"));
		$("#editModal").modal("show");
	});
	//确认编辑
	$("#btnEditConfirm").click(function(){
		if($("#edit_occur_date").val()==''||($("#edit_occur_date").val().trim()).length==0){
			alert("发生日期不能为空！");
			return false;
		}
		if($("#edit_material").val()==''||($("#edit_material").val().trim()).length==0){
			alert("物料名称不能为空！");
			return false;
		}
		if($("#edit_factory").val()==''||($("#edit_factory").val().trim()).length==0){
			alert("工厂不能为空！");
			return false;
		}
		if($("#edit_workshop").val()==''||($("#edit_workshop").val().trim()).length==0){
			alert("车间不能为空！");
			return false;
		}
		
		if($("#edit_bus_type").val()==''||($("#edit_bus_type").val().trim()).length==0){
			alert("车型不能为空！");
			return false;
		}
		//alert($("#edit_orderno").val());
		if($("#edit_orderId").val()==''||($("#edit_orderId").val().trim()).length==0){
			alert("请输入正确订单编号！");
			return false;
		}
		if($("#edit_bug_desc").val()==''||($("#edit_bug_desc").val().trim()).length==0){
			alert("异常描述不能为空！");
			return false;
		}
		if($("#edit_tmp_measures").val()==''||($("#edit_tmp_measures").val().trim()).length==0){
			alert("临时措施不能为空！");
			return false;
		}
		if($("#edit_reson").val()==''||($("#edit_reson").val().trim()).length==0){
			alert("原因分析不能为空！");
			return false;
		}
		if($("#edit_imp_measures").val()==''||($("#edit_imp_measures").val().trim()).length==0){
			alert("改善/预防措施不能为空！");
			return false;
		}
		$("#editRecordForm").ajaxSubmit({
			url:"materialAbnormal!saveRecord.action",
			type: "post",
			dataType:"json",
			success:function(response){
				alert(response.message);
				if(response.success){
					window.open("materialAbnormal!index.action","_self");
				}						
			}			
		});
	});
});
function initPage(){
	getFactorySelect("#input_factory","","");
	getBusTypeSelect("#input_bustype","");
	getOrderNoSelect("#new_order","#new_orderId");
	pageSize=20;
}
function ajaxQuery(targetPage) {
	var factoryId=isNaN(parseInt($("#input_factory").val()))?0:parseInt($("#input_factory").val());
	var workshopId=isNaN(parseInt($("#input_workshop").val()))?0:parseInt($("#input_workshop").val());
	var busTypeId=isNaN(parseInt($("#input_bustype").val()))?0:parseInt($("#input_bustype").val());
	var occurDateStart=$("#occur_start").val();
	var occurDateEnd=$("#occur_end").val();
	var material=$("#input_material").val();
	var order=$("#input_order").val();
	var bugLevel=[];
	$('input[name="buglevel"]:checked').each(function(){
		bugLevel.push($(this).val());
		});
	
	var conditions={"factoryId":factoryId,"workshopId":workshopId,"busTypeId":busTypeId,"material":material,
			"order":order,"bugLevel":bugLevel,"occurDateStart":occurDateStart,"occurDateEnd":occurDateEnd};
	$
			.ajax({
				type : "get",// 使用get方法访问后台
				dataType : "json",// 返回json格式的数据
				url : "materialAbnormal!showRecordList.action",
				data : {
					"conditions":JSON.stringify(conditions),
					"pager.pageSize" : 20,
					"pager.curPage" : targetPage || 1
				},
				success : function(response) {
					$("#tableResult tbody").html("");
					$
							.each(
									response.dataList,
									function(index, value) {
										// alert(value.id);
										var tr = $("<tr />");
										$("<td />").html(value.factory)
												.appendTo(tr);
										$("<td />").html(value.workshop)
												.appendTo(tr);
										$("<td />").html(value.busType)
												.appendTo(tr);
										$("<td />").html(value.order)
										.appendTo(tr);
										$("<td />").html(value.material)
												.appendTo(tr);
										$("<td />").html(value.bugLevel)
												.appendTo(tr);
										$("<td />").html(value.respUnit)
												.appendTo(tr);
										$("<td />").html(value.respPerson)
												.appendTo(tr);
										$("<td />").html(value.expcFinishDate)
										.appendTo(tr);
										$("<td />").html(value.verifyResult)
												.appendTo(tr);
										$("<td />").html(value.verifier)
												.appendTo(tr);
										$("<td />").html(value.occurDate)
										.appendTo(tr);
										var editTd = $("<td />")
												.html(
														"<i name='edit' rel=\"tooltip\" title='查看' class=\"fa fa-search\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\" title='编辑' style=\"cursor: pointer\"></i>");
										editTd.appendTo(tr);
										tr.data("id", value.id);
										tr.data("bugDesc", value.bugDesc);
										tr.data("orderId", value.orderId);
										tr.data("orderNo", value.orderNo);
										tr.data("bugPhotoPath", value.bugPhotoPath);
										tr.data("imPhotoPath", value.imPhotoPath);
										tr.data("tmpMeasure",value.tmpMeasure);					
										tr.data("faultReason", value.faultReason);
										tr.data("impMeasure", value.impMeasure);
										tr.data("memo",value.memo);
										$("#tableResult tbody").append(tr);
									});
					$("#tableResult").show();
					$("#total").html(response.pager.totalCount);
					$("#total").attr("total", response.pager.totalCount);
					$("#cur").attr("page", response.pager.curPage);
					$("#cur").html(
							"<a href=\"#\">" + response.pager.curPage + "</a>");
					$("#pagination").show();
				}
			})
}