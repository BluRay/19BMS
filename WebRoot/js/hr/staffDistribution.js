var factoryName = null;
var workshop =null;
$(document) .ready(function() {
	initPage();
	
	//弹出导入界面，导出模板页面
	$("#btnBulkAdd").click (function () {
		$("#divBulkAdd").show();
		$("#tableDiv").hide();
	});
	//点击查询
	$("#btnQuery").click(function(){
		var order_id=$("#q_order").attr("order_id");
		ajaxQuery();		
	});
	
	$("#q_order").live("input",function(){
		//alert($(this).val());
		$("#q_order").attr("order_id","");
	});
	$("#q_order").typeahead({
		source : function(input,process){
			//alert($(this).val());
			var data={
					"conditionMap.busType":"",
					"conditionMap.orderNo":input,
					"conditionMap.factory":factoryName
			};		
			return $.ajax({
				url:"common!getOrderFuzzySelect.action",
				dataType : "json",
				type : "get",
				data : data,
				success: function (data) { 
					orderList = data;
					var results = new Array();
					$.each(data, function(index, value) {
						results.push(value.orderNo);
					})
					return process(results);
				}
			});
		},
		items : 30,
		highlighter : function(item) {
			var order_name = "";
			var bus_type = "";
			var order_qty = "";
			$.each( orderList, function(index, value) {
				//alert(value.orderNo);
				if (value.orderNo == item) {
					order_name = value.name;
					bus_type = value.busType;
					order_qty = value.orderQty + "台";
				}
			})
			return item + "  " + order_name + " " + bus_type + order_qty;
		},
		matcher : function(item) {
			// alert(this.query);
			return true;
		},
		updater : function(item) {
			$.each(orderList, function(index, value) {
				if (value.orderNo == item) {
					selectId = value.id;
				}
			})
			// alert(submitId);
			$("#q_order").attr("order_id", selectId);
			return item;
		}
	});
})

function initPage() {
	$("#q_order").val("");
	pageSize=100;
	getOrgAuthTree($("#workGroupTree"),"1,2,3,4,5,6",'1');
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	while (treeNode!=null){
		if(treeNode.org_type == '1'||treeNode.org_type == '2'){
			factoryName = treeNode.displayName;
		}			
		treeNode = treeNode.getParentNode();
	}
	var d = new Date();
	var eYear = d.getFullYear();
	var eMon = d.getMonth() + 1;
	var eDay = d.getDate();

	$("#effective_date").val((eYear)+"-"+(eMon<10?"0"+eMon:eMon)+"-"+(eDay<10 ? "0"+ eDay : eDay))
	/*$("#q_effective_date_start").val((eYear)+"-"+(eMon<10?"0"+eMon:eMon)+"-01");
	$("#q_effective_date_end").val((eYear)+"-"+(eMon<10?"0"+eMon:eMon)+"-"+(eDay<10 ? "0"+ eDay : eDay));*/
	// 展开侧边栏
	$("#hrPlan").find(".treemenu").addClass("collapsed");
	$("#hr_plan").addClass("in");
	var span = $("#hrPlan").find(".pull-right.fa");
	if ($(span).hasClass("fa-angle-down")) {
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}
}	
function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}
function zTreeOnClick(event, treeId, treeNode) {
	while (treeNode!=null){
		if(treeNode.org_type == '1'||treeNode.org_type == '2'){
			factoryName = treeNode.displayName;
		}			
		treeNode = treeNode.getParentNode();
	}
	//alert(factoryName);
	ajaxQuery();
}

function ajaxQuery(targetPage){
	var factory = "";
	var workshop = "";
	var workgroup = "";
	var subgroup = "";
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	while (treeNode!=null){
		if(treeNode.org_type == '1'||treeNode.org_type == '2'){
			factory = treeNode.displayName;
		}
		if(treeNode.org_type == '4'){
			workshop = treeNode.displayName;
		}
		if(treeNode.org_type == '5'){
			workgroup = treeNode.displayName;
		}
		if(treeNode.org_type == '6'){
			subgroup = treeNode.displayName;
		}
		treeNode = treeNode.getParentNode();
	}
	var conditions={};
	conditions.factory=factory;
	conditions.workshop=workshop;
	conditions.workgroup=workgroup;
	conditions.team=subgroup;
	conditions.order_id=$("#q_order").attr("order_id");
	conditions.staff=$("#q_staff").val();
	conditions.effctiveDateStart=$("#q_effective_date_start").val();
	conditions.effctiveDateEnd=$("#q_effective_date_end").val();
	
	$.ajax({
		url : "staff!getStaffDistribution.action",
		dataType : "json",
		type : "get",
		data : {
			"conditions" : JSON.stringify(conditions),
			"pager.pageSize":100,
			"pager.curPage":targetPage || 1	
		},
		success : function(response) {
			$("#staffTable tbody").html("");
			var last_staff="";
			var staffNoTd_id="";
			var staffNmTd_id="";
			var last_workshop="";
			var last_workgroup="";
			var workshopTd="";
			var workgroupTd="";
			var factoryTd="";
			var orderTd="";
			var last_order="";
			var workgroupTdCount=0;
			var workshopTdCount=0;
			var orderTdCount=0;
			$.each(response.data,function(index,value){
				var tr=$("<tr />");

				/*if(last_workshop==value.workshop){
					var rowspan=parseInt($(workshopTd).attr("rowspan"));
					$(workshopTd).attr("rowspan",rowspan+1);
					$(factoryTd).attr("rowspan",rowspan+1);
				}else{
					workshopTdCount++;
					$("<td id='fa_"+workshopTdCount+"' rowspan=1/>").html(value.factory).appendTo(tr);	
					$("<td id='ws_"+workshopTdCount+"' rowspan=1/>").html(value.workshop).appendTo(tr);	
					workshopTd="#ws_"+workshopTdCount;
					factoryTd="#fa_"+workshopTdCount;
				}
				if(last_workshop==value.workshop&&last_workgroup==(value.workgroup+"—"+value.team)){
					var rowspan=parseInt($(workgroupTd).attr("rowspan"));
					$(workgroupTd).attr("rowspan",rowspan+1);
				}else{
					workgroupTdCount++;
					$("<td id='wg_"+workgroupTdCount+"' rowspan=1/>").html(value.workgroup+"—"+value.team).appendTo(tr);
					workgroupTd="#wg_"+workgroupTdCount;
				}
				if(last_workshop==value.workshop&&last_workgroup==(value.workgroup+"—"+value.team)&&last_order==value.order_desc){
					var rowspan=parseInt($(orderTd).attr("rowspan"));
					$(orderTd).attr("rowspan",rowspan+1);
				}else{
					orderTdCount++;
					$("<td id='eff_"+orderTdCount+"' rowspan=1/>").html(value.order_desc).appendTo(tr);
					orderTd="#eff_"+orderTdCount;
				}*/
				$("<td id='fa_"+workshopTdCount+"' rowspan=1/>").html(value.factory).appendTo(tr);	
				$("<td id='ws_"+workshopTdCount+"' rowspan=1/>").html(value.workshop).appendTo(tr);	
				$("<td id='wg_"+workgroupTdCount+"' rowspan=1/>").html(value.workgroup+"—"+value.team).appendTo(tr);
				$("<td id='eff_"+orderTdCount+"' rowspan=1/>").html(value.order_desc).appendTo(tr);
				$("<td />").html(value.staff_number).appendTo(tr);
				$("<td />").html(value.staff_name).appendTo(tr);
				$("<td />").html(value.distribution).appendTo(tr);
				$("<td />").html(value.effective_date).appendTo(tr);
				$("<td />").html(value.editor).appendTo(tr);
				$("<td />").html(value.edit_date).appendTo(tr);
								
				last_workshop=value.workshop;
				last_workgroup=value.workgroup+"—"+value.team;
				last_order=value.order_desc;
				$("#staffTable tbody").append(tr);
			})
			$("#staffTable").show();
			$("#total").html(response.pager.totalCount);
			$("#total").attr("total", response.pager.totalCount);
			$("#cur").attr("page", response.pager.curPage);
			$("#cur").html(
					"<a href=\"#\">" + response.pager.curPage + "</a>");
			$("#pagination").show();
		}
	})
}

extArray = new Array(".xlsx");
function LimitAttach(form, file) {
	var orderId=$("#q_order").attr("order_id");
	var effectiveDate=$("#effective_date").val();
	if(orderId==undefined||orderId.trim().length==0){
		alert("请输入有效订单编号！");
		return false;
	}
	if(effectiveDate==undefined||effectiveDate.trim().length==0){
		alert("请输入有效日期！");
		return false;
	}
	if ($("#file").val() == "") {
		alert("请选择文件！");
		return false;
	}
	allowSubmit = false;
	if (!file)
		return;
	while (file.indexOf("\\") != -1)
		file = file.slice(file.indexOf("\\") + 1);
	ext = file.slice(file.indexOf(".")).toLowerCase();
	for (var i = 0; i < extArray.length; i++) {
		if (extArray[i] == ext) {
			allowSubmit = true;
			break;
		}
	}
	var conditions="{'orderId':'"+$("#q_order").attr("order_id")+"','effectiveDate':'"+effectiveDate+"'}";
	if (allowSubmit) {
		$("#staffUploadForm").ajaxSubmit({
			url:"staff!uploadDistribution.action",
			type: "post",
			dataType:"json",
			data:{
				"conditions":conditions
			},
	        beforeSend:function(XMLHttpRequest){
	            //alert('远程调用开始...');
	            $("#loading").html("<img src='images/loading.gif' />");
	            $("#loading").show();
	        },
			success:function(response){
	           $("#loading").empty();
	           $("#loading").hide();
				alert(response.message);
				if(response.success){
					ajaxQuery();
					$("#divBulkAdd").hide();
					$("#tableDiv").show();
					//window.open("materialAbnormal!index.action","_self");
				}else{
					
				}						
			},
			complete:function(XMLHttpRequest,textStatus){
	            // alert('远程调用成功，状态文本值：'+textStatus);
	           $("#loading").empty();
	           $("#loading").hide();
	        },
	        error:function(XMLHttpRequest,textStatus,errorThrown){
	           $("#loading").empty();
	           $("#loading").hide();
	        }
		});
		//$('#btn_upload').val("上传中...");
		//$('#btn_upload').attr('disabled', "true");
	} else {
		alert("对不起，只能上传xlsx格式的文件!\n请重新选择符合条件的文件再上传.");
		return false;
	}
	return false;
}
