var pageSize =10;
$(document).ready(function () {	
	initPage();
	function initPage(){
		getAuthorityFactorySelect("#seach_factory");
		ajaxQuery(0);
	};
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	// 确定新增
	$("#btnAddConfirm").click(function() {
		if ($("#new_fault_level_id").val() == '') {
			alert('严重等级不能为空');
			return false;
		}
		$("#new_severity_level").val($("#new_fault_level_id").find("option:selected").text());
		$("#editImproveSalesProblems").ajaxSubmit({
			url:"afterSale!editImproveSalesProblems.action",
			type: "post",
			dataType:"json",
			success:function(response){
				alert(response.message);
				if(response.success){
					$("#newModal").modal("hide");
					clearNew();
					ajaxQuery(0);
				}						
			}			
		});
		return false;
	});
	$("#btnAddClose").click (function () {
		clearNew();
	});
	
	$("#btnProblemClose").click (function () {
		clearProblem();
	});
	
	$("#beforePhoto").change(function(){
		var objUrl = getObjectURL(this.files[0]) ;
		if (objUrl) {
			$("#view_before_photo").attr("src",objUrl);
		}
	});
	
	$("#afterPhoto").change(function(){
		var objUrl = getObjectURL(this.files[0]) ;
		if (objUrl) {
			$("#view_after_photo").attr("src",objUrl);
		}
	});
	
	// 点击预览
	$("#tableAfterSaleProblems").live(
			"click",
			function(e) {
				//alert($(e.target).html());
				if ($(e.target).attr("name") === "view") {
					clearProblem();
					getViewFactorySelect();
					ajaxView($(e.target).closest("tr").data("id"));
				}else if($(e.target).attr("name") === "edit"){
					clearNew();
					ajaxEdit($(e.target).closest("tr").data("id"));
				}
	});

});

function ajaxQuery(targetPage,status){
	$.ajax({
	    url: "afterSale!getAfterSaleProblems.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"seach_factory": $('#seach_factory').val(),
	    	"search_customer_name": $('#search_customer_name').val(),
	    	"search_fault_phenomenon": $('#search_fault_phenomenon').val(),
	    	"startDate": $('#startDate').val(),
	    	"endDate": $('#endDate').val(),
	    	"status": status || $('#status').val(),
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
			//	$("<td />").html(value.fault_mils).appendTo(tr);
				$("<td />").html(value.fault_components).appendTo(tr);
				$("<td />").html(value.fault_phenomenon).appendTo(tr);
				var editTd = $("<td />").html("<i name='view' class=\"fa fa-search\" style=\"cursor: pointer\"></i>");
				editTd.appendTo(tr);
				if(value.status==0){
					$("<td />").html("<a name='edit'  style=\"cursor: pointer\">未编写</a>").appendTo(tr);
				}else if(value.status==1){
					$("<td />").html("<a name='edit'  style=\"cursor: pointer\">编辑</a>").appendTo(tr);
				}else{
					$("<td />").html("<a name='edit'  style=\"cursor: pointer\">编辑</a>").appendTo(tr);
				}
				//$("<td />").html(value.editor).appendTo(tr);
				//$("<td />").html(value.edit_date).appendTo(tr);
				/*var editTd = $("<td />").html("");
				$("<button />").addClass("btn-link").html("编辑").prependTo(
						editTd);*/
				// $("<button
				// />").addClass("btn-link").html("删除").appendTo(editTd);
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

function ajaxEdit(problem_id){
	getKeysSelect('AFTERSALE_FAULT_LEVEL',null,$("#new_fault_level_id"));
	//查询订单信息
	$.ajax({
		url: "afterSale!getAfterSaleProblemReport.action",
		dataType: "json",
		data: {"problem_id" : problem_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.data.length ==1){
				var problem = response.data[0];
				$("#new_id").val(problem.id);
				$("#new_problem_id").val(problem.problem_id);
				$("#new_fault_phenomenon").val(problem.fault_phenomenon);
				if(problem.severity_level!=null&&problem.severity_level!=''){
					$("#new_fault_level_id option").each(function(){
					   if($(this).text() === problem.severity_level){
					      $(this).attr('selected', 'selected');
					   }
					});
				}else{
					$("#new_fault_level_id").val(problem.fault_level_id);
				}
				$("#new_provisional_measures").val(problem.provisional_measures);
				$("#new_reason").val(problem.reason);
				$("#new_improved_measure").val(problem.improved_measure);
				$("#new_verify").html(problem.verify);
				$("#new_standard").val(problem.standard);
				if(problem.before_photo!=''){
					$("#view_before_photo").attr("src","images/upload/aftersaleproblem/report/"+problem.before_photo);
				}
				if(problem.after_photo!=''){
					$("#view_after_photo").attr("src","images/upload/aftersaleproblem/report/"+problem.after_photo);
				}
				if(problem.attachment!=''){
					$("#view_attachment").attr("href","images/upload/aftersaleproblem/report/"+problem.attachment);
					$("#view_attachment").text('查看');
				}
				
				$("#newModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

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

function getViewFactorySelect() {
	$.ajax({
		url : "common!getFactorySelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_empty(response, "", "#view_factory");
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

function clearNew(){
	$("#new_id").val();
	$("#new_problem_id").val();
	$("#new_fault_phenomenon").val();
	$("#new_fault_level_id").val();
	$("#new_severity_level").val();
	$("#new_provisional_measures").val();
	$("#new_reason").val();
	$("#new_improved_measure").val();
	$("#new_verify").html('');
	$("#new_standard").val();
	$("#view_before_photo").attr("src","");
	$("#view_after_photo").attr("src","");
}
function clearProblem(){
	$("#view_factory").val();
	$("#view_customer_name").val();
	$("#view_vin").val();
	$("#view_factory_date").val();
	$("#view_order").html();
	$("#view_customer_bus_number").val();
	$("#view_license_number").val();
	$("#view_fault_date").val();
	$("#view_fault_mils").val();
	$("#view_fault_components").val();
	$("#view_fault_phenomenon").val();
//	$("#view_fault_photo").src =val.fault_photo;
	$("#view_fault_photo").attr("src",'');
	$("#view_fault_reason").val();
	$("#view_memo").val();
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