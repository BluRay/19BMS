$(document).ready(function () {
	initPage();
	function initPage(){
		//getFactorySelect();
		getAuthorityFactorySelect("#search_factory", "", "noall");
		getOrderNoSelect("#new_order_no","#orderId");
		getOrderNoSelect("#search_order_no","#orderId");
		getOrderNoSelect("#edit_order_no","#orderId");
		getPartsSelect("#search_parts","#partsId");
		getPartsSelect("#new_parts","#partsId");
		getPartsSelect("#edit_parts","#partsId");
		ajaxQuery();
	}
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect();
	});
	
	$('#new_factory').change(function(){ 
		getNewWorkshopSelect();
		
	});
	
	$("#btnAdd").click( function (argument) {	
		getAuthorityFactorySelect("#new_factory", "", "noall");
		$("#new_parts").val("");
		$("#new_order_no").val("");
		$("#new_online_real_qty").val("");
		$(".prodinfo").hide();
		$("#newModal").modal("show");
		
	});
	
	$("#btnEditConfirm").click( function (argument) {
		ajaxEditConfirm();
		return false;
	});

	
	$("#btnAddConfirm").click( function (argument) {
		ajaxAdd();
		return false;
	});
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#new_online_real_qty,#new_offline_real_qty").click(function(){
		var factory=$("#new_factory").val();
		var parts_id=$("#new_parts").attr("parts_id");
		var order_no=$("#new_order_no").val();
		if(factory&&parts_id&&order_no!=''){
			$.ajax({
				type:"post",
				dataType:"json",
				url: "production!getPartsFinishCount.action",
				data:{
					"factory_id":factory,
					"parts_id":parts_id,
					"order_no":order_no,
				},
				success:function (response) {
			    	if (response.success) {
			    		var data=response.data;
			    		$("#new_online_real_qty").next("span").html("累计上线数："+data[0].online_total+"；工厂订单数："+data[0].production_qty);
			    		$("#new_online_real_qty").data("left_qty",data[0].production_qty-data[0].online_total);
			    		$("#new_offline_real_qty").next("span").html("累计下线数："+data[0].offline_total+"；工厂订单数："+data[0].production_qty);
			    		$("#new_offline_real_qty").data("left_qty",data[0].production_qty-data[0].offline_total);
			    	} else {
			    		alert(response.message);
			    	}
			    }			
			})	
			$(this).next("span").show();		
		}
		
	});
	
	$("#edit_online_real_qty,#edit_offline_real_qty").click(function(){
		var factory=$("#edit_factory").val();
		var parts_id=$("#edit_parts").attr("parts_id");
		var order_no=$("#edit_order_no").val();
		if(factory&&parts_id&&order_no!=''){
			$.ajax({
				type:"post",
				dataType:"json",
				url: "production!getPartsFinishCount.action",
				data:{
					"factory_id":factory,
					"parts_id":parts_id,
					"order_no":order_no,
				},
				success:function (response) {
			    	if (response.success) {
			    		var data=response.data;
			    		$("#edit_online_real_qty").next("span").html("累计上线数："+data[0].online_total+"；工厂订单数："+data[0].production_qty);
			    		$("#edit_online_real_qty").data("left_qty",data[0].production_qty-data[0].online_total);
			    		$("#edit_offline_real_qty").next("span").html("累计下线数："+data[0].offline_total+"；工厂订单数："+data[0].production_qty);
			    		$("#edit_offline_real_qty").data("left_qty",data[0].production_qty-data[0].offline_total);
			    	} else {
			    		alert(response.message);
			    	}
			    }			
			})	
			$(this).next("span").show();		
		}
		
	});
	
})

function ajaxAdd (argument) {
		//数据验证
		if(($("#new_factory").val() == '')||($("#new_parts").val() == '')||($("#new_order_no").val() == '')||($("#new_date").val() == '')){
			alert('请输入完整上下线数据！');
			return false;
		}else if(isNaN(parseFloat($("#new_online_real_qty").val()))){
			alert('上线数量须为数字！');
			return false;
		}else if(isNaN(parseFloat($("#new_offline_real_qty").val()))){
			alert('下线数量须为数字！');
			return false;
		}else if($("#new_online_real_qty").val()>$("#new_online_real_qty").data("left_qty")){
			alert("上线不能超出工厂订单数！");
			return false;
		}
		else if($("#new_offline_real_qty").val()>$("#new_offline_real_qty").data("left_qty")){
			alert("下线不能超出工厂订单数！");
			return false;
		}
		if(!checkParts($('#new_parts').val())){
			return false;
		}
		$.ajax({
			type: "get",
			dataType: "json",
			url: "production!addPartsFinish.action",
		    data: {
				"factory_id":$("#new_factory").val(),
				"order_no":$("#new_order_no").val(),
				"parts_name":$("#new_parts").val(),
				"date":$("#new_date").val(),
				"online_real_qty":$("#new_online_real_qty").val(),
				"offline_real_qty":$("#new_offline_real_qty").val(),
			},
			async: false,
		    success:function (response) {
		    	if (response.success) {
		    		$('#newModal').modal('hide');
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
	    url: "production!getPartsFinishList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"order_no": $('#search_order_no').val(),
	    	"parts_name": $('#search_parts').val(),
	    	"date_start":$('#date_start').val(),
	    	"date_end":$('#date_end').val(),
	    	"pager.pageSize":10,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableWorkshopSupply tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr id= '"+value.id+"'/>");
    			$("<td style=\"text-align:center;padding:3px\" />").html(index+1).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_no+'辆').appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.parts_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.date).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.online_plan_qty).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.online_real_qty).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.online_total).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.offline_plan_qty).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.offline_real_qty).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.offline_total).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html("<button onclick = 'ajaxEdit(" + value.id + ");' class='btn-link'>编辑</>").appendTo(tr);
    			$("#tableWorkshopSupply tbody").append(tr);	    			
    		});
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();
	    }
	});
}

function ajaxEditConfirm(){
	//数据验证
	if(($("#edit_factory").val() == '')||($("#edit_parts").val() == '')||($("#edit_order_no").val() == '')||($("#edit_date").val() == '')){
		alert('请输入完整上下线数据！');
		return false;
	}else if(isNaN(parseFloat($("#edit_online_real_qty").val()))){
		alert('上线数量须为数字！');
		return false;
	}else if(isNaN(parseFloat($("#edit_offline_real_qty").val()))){
		alert('下线数量须为数字！');
		return false;
	}else if($("#edit_online_real_qty").val()>$("#edit_online_real_qty").data("old_value")+$("#edit_online_real_qty").data("left_qty")){
		alert("上线不能超出工厂订单数！");
		return false;
	}
	else if($("#edit_offline_real_qty").val()>$("#edit_offline_real_qty").data("old_value")+$("#edit_offline_real_qty").data("left_qty")){
		alert("下线不能超出工厂订单数！");
		return false;
	}
	if(!checkParts($('#edit_parts').val())){
		return false;
	}
	
	$.ajax({
		url: "production!editPartsFinishInfo.action",
		dataType: "json",
		data: {"id" : $('#edit_id').val(),
			"factory_id" : $('#edit_factory').val(),
			"order_no" : $('#edit_order_no').val(),
			"parts_name" : $('#edit_parts').val(),
			"date" : $('#edit_date').val(),
			"online_real_qty" : $('#edit_online_real_qty').val(),
			"offline_real_qty" : $('#edit_offline_real_qty').val(),
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

function ajaxEdit(partsFinish_id){
	$(".prodinfo").hide();
	$.ajax({
		url: "production!getPartsFinishInfo.action",
		dataType: "json",
		data: {"partsFinish_id" : partsFinish_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$.each(response.data,function(index,value){
					if(index == 0){
						getAuthorityFactorySelect("#edit_factory", value.factory_id, "noall");
						//$("#edit_factory").val(value.factory_id);
						$("#edit_order_no").val(value.order_no);
						$("#edit_parts").val(value.parts_name);
						$("#edit_parts").attr("parts_id",value.parts_id);
						$("#edit_online_real_qty").val(value.online_real_qty);
						$("#edit_online_real_qty").data("old_value",value.online_real_qty);
						$("#edit_offline_real_qty").val(value.offline_real_qty);
						$("#edit_offline_real_qty").data("old_value",value.offline_real_qty);
						$("#edit_date").val(value.date);
						$("#edit_id").val(value.id);
					}
				})
				$("#editModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
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
			getSelects_noall(response, "", "#edit_factory");
			getWorkshopSelect();
			getNewWorkshopSelect();
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

function getNewWorkshopSelect() {
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {"factoryId": $('#new_factory').val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_noall(response, "", "#new_workshop");
			getSelects_noall(response, "", "#edit_workshop");
			//getSelects_noall(response, "", "#new_receiveworkshop");
			$.each(response,function (index,value) {
				if(value.name == '焊装'){
					$("#new_receiveworkshop").append("<option value='"+value.id+"'>"+value.name+"</option>");
					$("#edit_receiveworkshop").append("<option value='"+value.id+"'>"+value.name+"</option>");
				}
			})
			
			
		}
	});
}

function checkParts(parts_name) {
	var result = true;
	$.ajax({
		url : "common!checkParts.action",
		dataType : "json",
		data : {"parts_name": parts_name},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			if(!response.success){
				result = false;
				alert(response.message);
			}
			
			
		}
	});
	
	return result;
}

