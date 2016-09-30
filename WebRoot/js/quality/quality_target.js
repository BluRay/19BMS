$(document).ready(function() {
	initPage();
	//查询
	$("#btnQuery").click(function() {
		ajaxQuery(1);
	});
	//点击新增按钮，弹出新增窗口
	$("#btnAdd").click(function() {
		getKeysSelect("QUALITY_TARGET_PARAM", "", "#new_targetType");
		getFactorySelect("#new_factory", "","empty");
		$("#newModal").modal("show");
	});
	$("#btnAddConfirm").click(function(){
		var factory=$("#new_factory").val();
		var workshop=$("#new_workshop").val();
		var paramType=$("#new_targetType").val();
		var targetVal=$("#new_targetVal").val();
		var effectDate=$("#new_effec_end").val();
		if(factory.trim().length==0){
			alert("请选择工厂！");
		}
		if(workshop.trim().length==0){
			alert("请选择车间！");
		} 
		if(paramType.trim().length==0){
			alert("请选择参数类别！");
		} 
		if(targetVal.trim().length==0){
			alert("请输入目标值！");
		}
		if(effectDate.trim().length==0){
			alert("请输入有效日期！");
		}else{
			$("#newRecordForm").ajaxSubmit({
				url:"qaTargert!addParamRecord.action",
				type: "post",
				dataType:"json",
				success:function(response){
					alert(response.message);
					if(response.success){
						window.open("qaTargert!index.action","_self");
					}						
				}			
			});
		}		
		
	});
	//切换工厂，获取车间下拉列表
	$("#input_factory,#new_factory,#edit_factory").live("change", function(e) {		
		if($(e.target).attr("id")=='input_factory'){
			getWorkshopSelect("#input_workshop", "", $("#input_factory").val(),"");
		}if($(e.target).attr("id")=='new_factory'){
			getWorkshopSelect("#new_workshop", "", $("#new_factory").val(),"empty");
		}else{
			getWorkshopSelect("#edit_workshop", "", $("#edit_factory").val(),"empty");
		}
				
	});
	//弹出编辑窗口
	$(".fa-pencil").live("click", function(e) {
		var tr=$(e.target).parent("td").parent(tr);
		var tds=$(e.target).parent("td").siblings();
		//alert($(tr).data("factoryId"));
		//$("#edit_factory").val($(tr).data("factoryId"));
		//$("#edit_workshop").val($(tr).data("workshopId"));
		//$("#edit_targetType").val($(tr).data("targetTypeId"));
		getKeysSelect("QUALITY_TARGET_PARAM", $(tr).data("targetTypeId"), "#edit_targetType");
		getFactorySelect("#edit_factory", $(tr).data("factoryId"),"empty");
		getWorkshopSelect("#edit_workshop", $(tr).data("workshopId"), $(tr).data("factoryId"),"empty");
		//alert($(tr).data("status"));
		$("#edit_id").val($(tr).data("id"))
		if($(tr).data("status")=='0'){
			$("#check_status").attr("checked",false);
			$("#edit_status").val("0");
			//alert($("#edit_status").val());
		}else{
			$("#check_status").attr("checked",true);
			$("#edit_status").val("1");
		}
		$("#edit_targetVal").val($(tds[3]).html());
		$("#edit_effec_start").val($(tds[4]).html());
		$("#edit_effec_end").val($(tds[5]).html());
		$("#editModal").modal("show");
	});
	//编辑保存
	$("#btnEditConfirm").click(function(){
		var factory=$("#edit_factory").val();
		var workshop=$("#edit_workshop").val();
		var paramType=$("#edit_targetType").val();
		var targetVal=$("#edit_targetVal").val();
		var effectDate=$("#edit_effec_end").val();
		if(factory.trim().length==0){
			alert("请选择工厂！");
		}else if(workshop.trim().length==0){
			alert("请选择车间！");
		} else if(paramType.trim().length==0){
			alert("请选择参数类别！");
		} else if(targetVal.trim().length==0){
			alert("请输入目标值！");
		}else if(effectDate.trim().length==0){
			alert("请输入有效日期！");
		}else{
			$("#editRecordForm").ajaxSubmit({
				url:"qaTargert!updateParamRecord.action",
				type: "post",
				dataType:"json",
				success:function(response){
					alert(response.message);
					if(response.success){
						window.open("qaTargert!index.action","_self");
					}							
				}			
			});
		}
		});

});
function initPage() {
	pageSize=20;
	getKeysSelect_Q("QUALITY_TARGET_PARAM", "", "#input_targetType");
	getFactorySelect("#input_factory", "","");
}
function changeStatus(){
	if($("#check_status").is(":checked")){
		//alert("1");
		$("#edit_status").val("1");
	}else{
		$("#edit_status").val("0");
		//alert($("#edit_status").val());
	}
}

function ajaxQuery(targetPage) {
	var factoryId=isNaN(parseInt($("#input_factory").val()))?0:parseInt($("#input_factory").val());
	var workshopId=isNaN(parseInt($("#input_workshop").val()))?0:parseInt($("#input_workshop").val());
	var targetTypeId=isNaN(parseInt($("#input_targetType").val()))?0:parseInt($("#input_targetType").val());
	var conditions="{factoryId:"+factoryId+",workshopId:"+workshopId+",targetTypeId:"+targetTypeId+
		",effecDateStart:'"+$("#input_effec_start").val()+"',effecDateEnd:'"+$("#input_effec_end").val()+"'}";
	$
			.ajax({
				type : "get",// 使用get方法访问后台
				dataType : "json",// 返回json格式的数据
				url : "qaTargert!getParamRecordList.action",
				data : {
					"conditions":conditions,
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
										$("<td />").html(value.targetType)
												.appendTo(tr);
										$("<td />").html(value.targetVal)
												.appendTo(tr);
										$("<td />").html(value.effecDateStart)
												.appendTo(tr);
										$("<td />").html(value.effecDateEnd)
												.appendTo(tr);
										$("<td />").html(value.editor)
												.appendTo(tr);
										$("<td />").html(value.editDate)
												.appendTo(tr);
										var editTd = $("<td />")
												.html(
														"<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\" title='编辑' style=\"cursor: pointer\"></i>");
										editTd.appendTo(tr);
										tr.data("id", value.id);
										tr.data("factoryId", value.factoryId);
										tr.data("workshopId", value.workshopId);
										tr.data("targetTypeId", value.targetTypeId);
										tr.data("status",value.status);
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