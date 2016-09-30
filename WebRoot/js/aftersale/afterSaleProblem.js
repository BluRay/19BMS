$(document).ready(function () {	
	initPage();
	//getAllFactorySelect();
	function initPage(){
		getAuthorityFactorySelect("#seach_factory");
		ajaxQuery(0);
	};
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#faultPhoto").change(function(){
		var objUrl = getObjectURL(this.files[0]) ;
		if (objUrl) {
			$("#fault_photo").attr("src",objUrl);
		}
	});
	
	$("#modifyFaultPhoto").change(function(){
		var objUrl = getObjectURL(this.files[0]) ;
		if (objUrl) {
			$("#modify_fault_photo").attr("src",objUrl);
		}
	});
	
	// 点击新增
	$("#btnAdd").click(function(argument) {
		document.getElementById("addAfterSaleProblem").reset();
		$("#newModal").modal("show");
		//getNewFactorySelect();
		getAuthorityFactorySelect("#new_factory",null,'empty');
		getFaultType($("#fault_type"));
		getKeysSelect('AFTERSALE_FAULT_LEVEL',null,$("#new_fault_level_id"));
		$("#new_factory").focus();
	});
	// 确定新增
	$("#btnAddConfirm").click(function() {
		//组合故障类型字符串
		var ids = "";
		var faultName ="";
	    $.each($("#fault_type").children(), function(index, element) {
	    	if(element.checked){
	    		ids += element.value+";";
	    		faultName += element.id+";";
	    	}
	    });
		$("#fault_type_ids").val(ids);
		$("#fault_type_name").val(faultName);
		if ($("#new_factory").val() == '') {
			alert('工厂不能为空');
			return false;
		}
		if ($("#new_customer_name").val() == '') {
			alert('客户不能为空');
			return false;
		}
		if ($("#new_vin").val() == '' && $("#new_bus_number").val() == '') {
			alert('VIN号和车号不能都为空，必须填写一个值');
			return false;
		}
		if ($("#new_license_number").val() == '') {
			alert('车牌号不能为空');
			return false;
		}
		if ($("#fault_type_ids").val() == '') {
			alert('故障类型至少需要选择一类');
			return false;
		}
		if ($("#new_fault_level_id").val() == '') {
			alert('故障级别不能为空');
			return false;
		}
		if ($("#new_fault_date").val() == '') {
			alert('故障日期不能为空');
			return false;
		}
		if ($("#new_fault_mils").val() == '') {
			alert('故障里程不能为空');
			return false;
		}
		if ($("#new_fault_components").val() == '') {
			alert('故障零部件不能为空');
			return false;
		}		
		if ($("#new_fault_phenomenon").val() == '') {
			alert('故障现象不能为空');
			return false;
		}
		if ($("#new_fault_reason").val() == '') {
			alert('故障原因不能为空');
			return false;
		}
		$("#addAfterSaleProblem").ajaxSubmit({
			url:"afterSale!addAfterSaleProblem.action",
			type: "post",
			dataType:"json",
			success:function(response){
				alert(response.message);
				if(response.success){
					$("#newModal").modal("hide");
					ajaxQuery(0);
				}						
			}			
		});
		return false;
	});
	
	// 确定修改
	$("#btnModifyConfirm").click(function() {
		//组合故障类型字符串
		var ids = "";
		var faultName ="";
	    $.each($("#modify_fault_type").children(), function(index, element) {
	    	if(element.checked){
	    		ids += element.value+";";
	    		faultName += element.id+";";
	    	}
	    });
		$("#modify_fault_type_ids").val(ids);
		$("#modify_fault_type_name").val(faultName);
		if ($("#modify_factory").val() == '') {
			alert('工厂不能为空');
			return false;
		}
		if ($("#modify_customer_name").val() == '') {
			alert('客户不能为空');
			return false;
		}
		if ($("#modify_vin").val() == '' && $("#modify_bus_number").val() == '') {
			alert('VIN号和车号不能都为空，必须填写一个值');
			return false;
		}
		if ($("#modify_license_number").val() == '') {
			alert('车牌号不能为空');
			return false;
		}
		if ($("#modify_fault_type_ids").val() == '') {
			alert('故障类型至少需要选择一类');
			return false;
		}
		if ($("#modify_fault_level_id").val() == '') {
			alert('故障级别不能为空');
			return false;
		}
		if ($("#modify_fault_date").val() == '') {
			alert('故障日期不能为空');
			return false;
		}
		if ($("#modify_fault_mils").val() == '') {
			alert('故障里程不能为空');
			return false;
		}
		if ($("#modify_fault_components").val() == '') {
			alert('故障零部件不能为空');
			return false;
		}		
		if ($("#modify_fault_phenomenon").val() == '') {
			alert('故障现象不能为空');
			return false;
		}
		if ($("#modify_fault_reason").val() == '') {
			alert('故障原因不能为空');
			return false;
		}
		$("#modifyAfterSaleProblem").ajaxSubmit({
			url:"afterSale!modifyAfterSaleProblem.action",
			type: "post",
			dataType:"json",
			success:function(response){
				alert(response.message);
				if(response.success){
					$("#modifyModal").modal("hide");
					ajaxQuery(0);
				}						
			}			
		});
		return false;
	});
	
	// 点击预览
	$("#tableAfterSaleProblems").live(
			"click",
			function(e) {
				//alert($(e.target).html());
				if ($(e.target).attr("name") === "view") {
					getFactorySelect("#view_factory");
					ajaxView($(e.target).closest("tr").data("id"));
				}
				if ($(e.target).attr("name") === "modify") {
					document.getElementById("modifyAfterSaleProblem").reset();
					getFactorySelect("#modify_factory");
					ajaxModify($(e.target).closest("tr").data("id"));
				}
	});
	
	$("#new_vin").live("blur",function(e){
		var key = e.which; //e.which是按键的值 
		if($("#new_vin").val().trim()!=''){
			$.ajax({
				url : "afterSale!getBusInformation.action",
				dataType : "json",
				data : {
					"vin":$("#new_vin").val(),
					"busNumber":$("#new_bus_number").val(),
					"factory_id":$("#new_factory").val()
				},
				async : false,
				error : function(response) {
					alert(response.message);
				},
				success : function(response) {
					if(response.success == true && response.data.length==1){
						var dispatch_date = typeof(response.data[0].dispatch_date)== "undefined"?'':response.data[0].dispatch_date;// 
						var orderId,order_name,bus_type_code,order_qty,customer_number,bus_number;
						orderId = response.data[0].orderId;
						order_name = response.data[0].order_name;
						bus_type_code = response.data[0].bus_type_code;
						order_qty = response.data[0].order_qty;
						customer_number = typeof(response.data[0].customer_number)== "undefined"?'':response.data[0].customer_number;
						bus_number = typeof(response.data[0].bus_number)== "undefined"?'':response.data[0].bus_number;
						$("new_factory_date").val(dispatch_date);
						var orderDesc = bus_type_code+order_name+ order_qty;
						$("#new_order").html(orderDesc);
						$("#new_order_desc").val(orderDesc);
						$("#new_customer_bus_number").val(customer_number);
						$("#new_bus_number").val(bus_number);
						$("#new_order_id").val(orderId);
					}else{
						alert("未查询到VIN在工厂下维护的车辆信息，请检查输入的VIN号是否有误!");
						$("#new_vin").val('');
						$("#new_bus_number").val('');
					}
				}
			});
		}else{
			$("#new_vin").val('');
			$("#new_order").html('');
			$("#new_order_desc").val('');
			$("#new_customer_bus_number").val('');
			$("#new_bus_number").val('');
			$("#new_order_id").val('');
			$("#new_order_desc").val('');
			$("#fault_type_ids").val('');
			$("#fault_type_name").val('');
			$("#new_fault_photo").val();
		}
		return false;

	});
	
	$("#new_bus_number").live("blur",function(e){
		var key = e.which; //e.which是按键的值 
		if($("#new_bus_number").val().trim()!=''){
			$.ajax({
				url : "afterSale!getBusInformation.action",
				dataType : "json",
				data : {
					"vin":$("#new_vin").val(),
					"busNumber":$("#new_bus_number").val(),
					"factory_id":$("#new_factory").val()
				},
				async : false,
				error : function(response) {
					alert(response.message);
				},
				success : function(response) {
					if(response.success == true && response.data.length==1){
						var dispatch_date = typeof(response.data[0].dispatch_date)== "undefined"?'':response.data[0].dispatch_date;// 
						var orderId,order_name,bus_type_code,order_qty,customer_number,vin;
						orderId = response.data[0].orderId;
						order_name = response.data[0].order_name;
						bus_type_code = response.data[0].bus_type_code;
						order_qty = response.data[0].order_qty;
						customer_number = typeof(response.data[0].customer_number)== "undefined"?'':response.data[0].customer_number;
						vin = typeof(response.data[0].vin)== "undefined"?'':response.data[0].vin;
						$("new_factory_date").val(dispatch_date);
						var orderDesc = bus_type_code+order_name+ order_qty;
						$("#new_order").html(orderDesc);
						$("#new_order_desc").val(orderDesc);
						$("#new_customer_bus_number").val(customer_number);
						$("#new_vin").val(vin);
						$("#new_order_id").val(orderId);
					}else{
						alert("未查询到车号在工厂下维护的车辆信息，请检查输入的车号是否有误!");
						$("#new_vin").val('');
						$("#new_bus_number").val('');
					}
				}
			});
		}else{
			$("#new_vin").val('');
			$("#new_order").html('');
			$("#new_order_desc").val('');
			$("#new_customer_bus_number").val('');
			$("#new_bus_number").val('');
			$("#new_order_id").val('');
		}
		return false;

	});
	
});

function ajaxView(id){
	//查询订单信息
	$.ajax({
		url: "afterSale!getAfterSaleProblems.action",
		dataType: "json",
		data: {"id" : id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.data.length ==1){
				var problem = response.data[0];
				var ids = problem.fault_type_ids;
				var idArr = ids.split(";");
				getFaultType($("#view_fault_type"),ids,'disabled');
				getKeysSelect('AFTERSALE_FAULT_LEVEL',problem.fault_level_id,$("#view_fault_level_id"));
				$("#view_factory").val(problem.factory_id);
				$("#view_customer_name").val(problem.customer_name);
				$("#view_vin").val(problem.vin);
				$("#view_bus_number").val(problem.bus_number);
				$("#view_factory_date").val(problem.factory_date);
				$("#view_order").html(problem.order_describe);
				$("#view_customer_bus_number").val(problem.customer_bus_number);
				$("#view_license_number").val(problem.license_number);
				$("#view_fault_date").val(problem.fault_date);
				$("#view_fault_mils").val(problem.fault_mils);
				$("#view_fault_components").val(problem.fault_components);
				$("#view_fault_phenomenon").val(problem.fault_phenomenon);
			//	$("#view_fault_photo").src =val.fault_photo;
				if(problem.fault_photo !=null && problem.fault_photo!=''){
					$("#view_fault_photo").attr("src","images/upload/aftersaleproblem/"+problem.fault_photo);
				}
				$("#view_fault_reason").val(problem.fault_reason);
				$("#view_memo").val(problem.memo);
				
				$("#viewModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

function ajaxModify(id){
	//查询订单信息
	$.ajax({
		url: "afterSale!getAfterSaleProblems.action",
		dataType: "json",
		data: {"id" : id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.data.length ==1){
				var problem = response.data[0];
				var ids = problem.fault_type_ids;
				var idArr = ids.split(";");
				getFaultType($("#modify_fault_type"),ids);
				getKeysSelect('AFTERSALE_FAULT_LEVEL',problem.fault_level_id,$("#modify_fault_level_id"));
				$("#modify_factory").val(problem.factory_id);
				$("#modify_customer_name").val(problem.customer_name);
				$("#modify_vin").val(problem.vin);
				$("#modify_bus_number").val(problem.bus_number);
				$("#modify_factory_date").val(problem.factory_date);
				$("#modify_order_id").val(problem.order_id);
				$("#modify_order_desc").val(problem.order_describe);
				$("#modify_order").html(problem.order_describe);
				$("#modify_customer_bus_number").val(problem.customer_bus_number);
				$("#modify_license_number").val(problem.license_number);
				$("#modify_fault_date").val(problem.fault_date);
				$("#modify_fault_mils").val(problem.fault_mils);
				$("#modify_fault_components").val(problem.fault_components);
				$("#modify_fault_phenomenon").val(problem.fault_phenomenon);
				//$("#modify_fault_photo").src = "images/upload/aftersaleproblem/"+problem.fault_photo;
				if(problem.fault_photo !=null && problem.fault_photo!=''){
					$("#modify_fault_photo").attr("src","images/upload/aftersaleproblem/"+problem.fault_photo);
				}
				$("#modify_fault_reason").val(problem.fault_reason);
				$("#modify_memo").val(problem.memo);
				$("#modify_saleProblem_id").val(id);
				$("#modifyModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

function getFaultType(element,checkedValues,disabled){
	$.ajax({
		url : "common!getKeysSelect.action",
		dataType : "json",
		data : {
				keyCode:'AFTERSALE_FAULT_TYPE'
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var strs = "";
		    $(element).html("");
		    $.each(response.data, function(index, value) {
		    	var tt = value.id;
		    	if(checkedValues != undefined && checkedValues.indexOf(tt)>=0){
		    		if(disabled!= undefined){
			    	    strs += "<input style='magin-right:2px;' type='checkbox' disabled='disabled' checked='checked' id="+value.key_name+" value=" + value.id + ">" + value.key_name + "</input>";
		    		}else{
			    	    strs += "<input style='magin-right:2px;' type='checkbox' checked='checked' id="+value.key_name+" value=" + value.id + ">" + value.key_name + "</input>";
		    		}
		    	}else{
		    		if(disabled!= undefined){
		    			strs += "<input style='magin-right:2px;' type='checkbox' disabled='disabled' id="+value.key_name+" value=" + value.id + ">" + value.key_name + "</input>";
		    		}else{
			    	    strs += "<input style='magin-right:2px;' type='checkbox' id="+value.key_name+" value=" + value.id + ">" + value.key_name + "</input>";
		    		}
		    	}
		    });
		    $(element).html(strs); 
		}
	});
}

function ajaxQuery(targetPage,status){
	$.ajax({
	    url: "afterSale!getAfterSaleProblems.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"seach_factory": $('#seach_factory').val(),
	    	"search_fault_phenomenon": $('#search_fault_phenomenon').val(),
	    	"startDate": $('#startDate').val(),
	    	"endDate": $('#endDate').val(),
	    	"status": status || 'null',
	    	"pager.pageSize":pageSize,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableAfterSaleProblems tbody").html("");
			var i=1;
			$.each(response.data, function(problem, value) {
				var tr = $("<tr />");
				$("<td />").html(i++).appendTo(tr);
				$("<td />").html(value.factory_name).appendTo(tr);
				$("<td />").html(value.vin).appendTo(tr);
				$("<td />").html(value.bus_number).appendTo(tr);
				$("<td />").html(value.order_describe).appendTo(tr);
				$("<td />").html(value.customer_name).appendTo(tr);
			//	$("<td />").html(value.license_number).appendTo(tr);
			//	$("<td />").html(value.customer_bus_number).appendTo(tr);
				$("<td />").html(value.factory_date).appendTo(tr);
				$("<td />").html(value.fault_type_name).appendTo(tr);
				$("<td />").html(value.faultLevelName).appendTo(tr);
				$("<td />").html(value.fault_date).appendTo(tr);
				$("<td />").html(value.fault_mils).appendTo(tr);
				$("<td />").html(value.fault_components).appendTo(tr);
				$("<td />").html(value.fault_phenomenon).appendTo(tr);
//				if(value.status==0){
//					$("<td />").html("未处理").appendTo(tr);
//				}else if(value.status==1){
//					$("<td />").html("处理中").appendTo(tr);
//				}else{
//					$("<td />").html("已处理").appendTo(tr);
//				}
				//$("<td />").html(value.editor).appendTo(tr);
				//$("<td />").html(value.edit_date).appendTo(tr);
				/*var editTd = $("<td />").html("");
				$("<button />").addClass("btn-link").html("编辑").prependTo(
						editTd);*/
				var editTd = $("<td />").html("<i name='view' class=\"fa fa-search\" style=\"cursor: pointer\"></i>");
				// $("<button
				// />").addClass("btn-link").html("删除").appendTo(editTd);
				editTd.appendTo(tr);
				var viewTd = $("<td />").html("<i name='modify' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>");
				// $("<button
				// />").addClass("btn-link").html("删除").appendTo(editTd);
				viewTd.appendTo(tr);
				tr.data("id", value.id);
				tr.data("factory_id", value.factory_id);
				$("#tableAfterSaleProblems tbody").append(tr);
			});	
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();
	    	
	    }
	});
}
//建立一個可存取到該file的url
function getObjectURL(file) {
	var url = null ; 
	if (window.createObjectURL!=undefined) { // basic
		url = window.createObjectURL(file) ;
	} else if (window.URL!=undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file) ;
	} else if (window.webkitURL!=undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file) ;
	}
	return url ;
}