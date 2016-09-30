$(document).ready(function () {
	initPage();
	function initPage(){
		getFactorySelect();
		getOrderNoSelect("#search_order_no","#orderId");
		getOrderNoSelect("#new_order_no","#orderId");
		getBusTypeSelect("#search_bus_type", "", "empty");
		$("#bus_info").addClass("in");
	}
	
	$("#btnQuery").click (function () {
		if($("#search_order_no").val()==""){
			alert("请输入订单编号");
			$("#search_order_no").focus();
			return false;
		}
		ajaxQuery();
		return false;
	});
	
	$("#btnEditConfirm").click( function (argument) {
		ajaxEditConfirm();
		return false;
	});

	$("#btnAdd").click( function (argument) {
		if($("#new_all_bus").attr("checked")==true){
			$("#new_bus_number").attr("disabled",true); 
		}
		$("#newModal").modal("show");		
	});
	
	$("#btnAddConfirm").click( function (argument) {
		ajaxAdd();
		return false;
	});
	
	$("#new_all_bus").live("click",function(){
    	//alert($("#checkall").attr("checked"));
    	if($("#new_all_bus").attr("checked")=="checked"){
    		$("#new_bus_number").attr("disabled",true); 
    	}else{
    		$("#new_bus_number").attr("disabled",false); 
    	}    	
    });
	
})

function ajaxEditConfirm(){
	if($("#edit_bus_ccczs_date").val() == '' || $("#edit_bus_dpgg_date").val() == '' || $("#edit_bus_zcgg_date").val() == ''){
		alert('请输入完整数据！');
		return false;
	}
	$.ajax({
		url: "production!addBusCCC.action",
		dataType: "json",
		data: {
			"factory_id":$("#edit_factory").val(),
			"order_no":$("#edit_order_no").val(),
			"new_all_bus":0,
			"new_bus_number":$("#edit_bus_number").val(),
			"new_bus_ccczs_date":$("#edit_bus_ccczs_date").val(),
			"new_bus_dpgg_date":$("#edit_bus_dpgg_date").val(),
			"new_bus_zcgg_date":$("#edit_bus_zcgg_date").val(),
			},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				alert("修改成功");
				$("#editModal").modal("hide");
				ajaxQuery();
			} else {
				alert(response.message);
			}
		}
	})
}

function ajaxEdit(factory_id,bus_number,order_no,ccczs_date,dpgg_date,zcgg_date){
	//alert("-->" + bus_number + order_no);
	$("#edit_factory").val(factory_id);
	$("#edit_order_no").val(order_no);
	$("#edit_bus_number").val(bus_number);
	$("#edit_bus_ccczs_date").val(ccczs_date=="undefined"?"":ccczs_date);
	$("#edit_bus_dpgg_date").val(dpgg_date=="undefined"?"":dpgg_date);
	$("#edit_bus_zcgg_date").val(zcgg_date=="undefined"?"":zcgg_date);
	$("#editModal").modal("show");
}

function ajaxAdd (argument) {
		//数据验证
		if($("#new_factory").val() == '' || $("#new_order_no").val() == '' || $("#new_bus_zcgg_date").val() == '' || $("#new_bus_ccczs_date").val() == '' || $("#new_bus_dpgg_date").val() == ''){
			alert('请输入完整数据！');
			return false;
		}
		var new_all_bus = "0";
		if($("#new_all_bus").attr("checked")=="checked"){
			new_all_bus = "1";
		}else{
			new_all_bus = "0";
		}
		
		$.ajax({
			type: "get",
			dataType: "json",
			url: "production!addBusCCC.action",
		    data: {
				"factory_id":$("#new_factory").val(),
				"order_no":$("#new_order_no").val(),
				"new_all_bus":new_all_bus,
				"new_bus_number":$("#new_bus_number").val(),
				"new_bus_ccczs_date":$("#new_bus_ccczs_date").val(),
				"new_bus_dpgg_date":$("#new_bus_dpgg_date").val(),
				"new_bus_zcgg_date":$("#new_bus_zcgg_date").val(),
			},
			async: false,
		    success:function (response) {
		    	if (response.success) {
		    		$('#newModal').modal('hide');
		    		$("#search_factory").val($("#new_factory").val());
		    		$("#search_order_no").val($("#new_order_no").val());
		    		ajaxQuery();
		    	} else {
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
		
	}

function ajaxQuery(targetPage){
	$.ajax({
	    url: "production!getBusCCCList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"order_no": $('#search_order_no').val(),
	    	"bus_type_id": $('#search_bus_type').val(),
	    	"bus_number": $('#search_bus_number').val(),
	    	"pager.pageSize":10,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableBusCCC tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr id= '"+value.id+"'/>");
    			$("<td style=\"text-align:center;padding:3px\" />").html(index+1).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_no+'辆').appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_type_code).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.ccczs_date).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.dpgg_date).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.zcgg_date).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html("<button onclick = 'ajaxEdit(\"" + value.factory_id + "\",\"" + value.bus_number + "\",\"" + value.order_no.split("\n")[0] + "\",\"" + value.ccczs_date + "\",\"" + value.dpgg_date + "\",\"" + value.zcgg_date + "\");' class='btn-link'>编辑</>").appendTo(tr);
    			$("#tableBusCCC tbody").append(tr);	    			
    		});
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();
	    }
	});
}

function getFactorySelect() {
	$.ajax({
		url : "common!getFactorySelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response, "", "#search_factory");
			getSelects_empty(response, "", "#new_factory");
			getSelects_empty(response, "", "#edit_factory");
		}
	});
}
