$(document).ready(function () {
	initPage();
	function initPage(){
		getFactorySelect();
		getOrderNoSelect("#search_order_no","#orderId");
		getOrderNoSelect("#new_order_no","#orderId");
		$("#bus_info").addClass("in");
		//alert(GetQueryString("order_no")); 
		if(GetQueryString("order_no") != ""){
			$('#search_order_no').val(GetQueryString("order_no"));
			ajaxQuery();
		}
	}
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect();
	})
	
	$("#btnAdd").click( function (argument) {		
		$("#newModal").modal("show");
	});
	
	$("#btnAddConfirm").click( function (argument) {
		ajaxAdd();
		return false;
	});
	
	$("#btnAddContinue").click( function (argument) {
		ajaxAddContinue();
		return false;
	});
	
	$("#btnQuery").click (function () {
		if(($("#search_order_no").val() == '')){
			alert('请输入订单编号！');
			return false;
		}
		ajaxQuery();
		return false;
	});
	
	$("#btnEditConfirm").click( function (argument) {
		ajaxEditConfirm();
		return false;
	});
	
	$("#btnBulkAdd").click (function () {
		$("#divBulkAdd").show();
	});
	
})


function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function ajaxQuery(targetPage){
	$.ajax({
	    url: "production!getBusCustomNumberList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"order_no": $('#search_order_no').val(),
	    	"bus_number": $('#search_bus_number').val(),
	    	"customer_number": $('#search_customer_number').val(),
	    	"pager.pageSize":10,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableCustomerNumber tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr id= '"+value.id+"'/>");
    			$("<td style=\"text-align:center;padding:3px\" />").html(index+1).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html($('#search_order_no').val()).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.customer_number).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html("<button onclick = 'ajaxEdit(" + value.id + ");' class='btn-link'>编辑</>").appendTo(tr);
    			$("#tableCustomerNumber tbody").append(tr);	    			
    		});
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();
	    }
	});
}

function ajaxEdit(bus_id){
	$.ajax({
		url: "production!getBusCustomerNumberInfo.action",
		dataType: "json",
		data: {"bus_id" : bus_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$.each(response.data,function(index,value){
					if(index == 0){
						$("#edit_order_no").val($('#search_order_no').val());
						$("#edit_BusNumber").val(value.bus_number);
						$("#edit_CustomerNumber").val(value.customer_number);
					}
				})
				$("#editModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

function ajaxEditConfirm(){
	if(($("#edit_order_no").val() == '')||($("#edit_BusNumber").val() == '')||($("#edit_CustomerNumber").val() == '')){
		alert('请输入完整自编号数据！');
		return false;
	}
	$.ajax({
		url: "production!editBusCustomerNumber.action",
		dataType: "json",
		data: {
			"order_no":$("#edit_order_no").val(),
			"busNumber":$("#edit_BusNumber").val(),
			"customerNumber":$("#edit_CustomerNumber").val(),
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

function ajaxAdd (argument) {
		//数据验证
		if(($("#new_order_no").val() == '')||($("#new_BusNumber").val() == '')||($("#new_CustomerNumber").val() == '')){
			alert('请输入完整自编号数据！');
			return false;
		}		
		$.ajax({
			type: "get",
			dataType: "json",
			url: "production!editBusCustomerNumber.action",
		    data: {
				"order_no":$("#new_order_no").val(),
				"busNumber":$("#new_BusNumber").val(),
				"customerNumber":$("#new_CustomerNumber").val(),
			},
			async: false,
		    success:function (response) {
		    	if (response.success) {
		    		alert(response.message);
		    		$('#newModal').modal('hide');
		    		ajaxQuery();
		    	} else {
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
		
	}

function ajaxAddContinue (argument) {
	//数据验证
	if(($("#new_order_no").val() == '')||($("#new_BusNumber").val() == '')||($("#new_CustomerNumber").val() == '')){
		alert('请输入完整自编号数据！');
		return false;
	}		
	$.ajax({
		type: "get",
		dataType: "json",
		url: "production!editBusCustomerNumber.action",
	    data: {
			"order_no":$("#new_order_no").val(),
			"busNumber":$("#new_BusNumber").val(),
			"customerNumber":$("#new_CustomerNumber").val(),
		},
		async: false,
	    success:function (response) {
	    	if (response.success) {
	    		alert(response.message);
	    		$("#new_BusNumber").focus();
	    		//$('#newModal').modal('hide');
	    		//ajaxQuery();
	    	} else {
	    		alert(response.message);
	    	}
	    },
	    error:function(){alertError();}
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
		}
	});
}

function getWorkshopSelect() {
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {"factoryId": $('#search_factory').val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response, "", "#search_workshop");			
		}
	});
}

