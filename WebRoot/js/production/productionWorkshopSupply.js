var cDate;
$(document).ready(function () {
	initPage();
	function initPage(){
		
		//getFactorySelect();
		getAuthorityFactorySelect("#search_factory", "", "noall");
		getWorkshopSelect_Auth("#search_workshop", "", $("#search_factory :selected").text(), "noall");
		getWorkshopSelect('#search_factory','#search_receiveworkshop');
		getOrderNoSelect("#new_order_no","#orderId");
		getOrderNoSelect("#search_order_no","#orderId");
		getOrderNoSelect("#edit_order_no","#orderId");
		ajaxQuery();
	}
	
	$('#search_factory').change(function(){ 
		//getWorkshopSelect();
		getWorkshopSelect_Auth("#search_workshop", "", $("#search_factory :selected").text(), "noall");
		getWorkshopSelect('#search_factory','#search_receiveworkshop');
	})
	
	$('#new_factory').change(function(){ 
		getWorkshopSelect_Auth("#new_workshop", "", $("#new_factory :selected").text(), "noall");
		getWorkshopSelect('#new_factory','#new_receiveworkshop',"","empty");		
	})
	
	$('#edit_factory').change(function(){ 
		getWorkshopSelect_Auth("#edit_workshop", "", $("#edit_factory :selected").text(), "noall");
		getWorkshopSelect('#edit_factory','#edit_receiveworkshop',"","empty");		
	})
	
	$("#btnAdd").click( function (argument) {
		$("#new_quantity").val("");
		$(".prodinfo").hide();
		var d = new Date();
		var eYear = d.getFullYear();
		var eMon = d.getMonth() + 1;
		var eDay = d.getDate();
		cDate = (eYear) + "-" + (eMon < 10 ? "0" + eMon : eMon) + "-"
				+ (eDay < 10 ? "0" + eDay : eDay);
		$("#new_supply_date").val(cDate);
		getAuthorityFactorySelect("#new_factory", "", "noall");
		getWorkshopSelect_Auth("#new_workshop", "", $("#new_factory :selected").text(), "noall");
		getWorkshopSelect('#new_factory','#new_receiveworkshop',"","empty");
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
	
	$("#new_quantity").click(function(){
		var factory=$("#new_factory").val();
		var workshop=$("#new_workshop :selected").text();
		var acptworkshop=$("#new_receiveworkshop :selected").text();
		var order_no=$("#new_order_no").val();
		if(factory&&workshop!=''&&acptworkshop!='请选择'&&order_no!=''){
			$.ajax({
				type:"post",
				dataType:"json",
				url: "production!getSupplyTotalCount.action",
				data:{
					"factory_id":$("#new_factory").val(),
					"workshop":$("#new_workshop :selected").text(),
					"acptworkshop":$("#new_receiveworkshop :selected").text(),
					"order_no":$("#new_order_no").val(),
				},
				success:function (response) {
			    	if (response.success) {
			    		var data=response.data;
			    		$("#new_quantity").next("span").html("已供应："+data[0].supply_total+"；可供应："+data[0].left_qty);
			    		$("#new_quantity").data("left_qty",data[0].left_qty);
			    	} else {
			    		alert(response.message);
			    	}
			    }			
			})	
			$(this).next("span").show();
			
		}
		
	});
	$("#edit_quantity").click(function(){
		$.ajax({
			type:"post",
			dataType:"json",
			url: "production!getSupplyTotalCount.action",
			async:false,
			data:{
				"factory_id":$("#edit_factory").val(),
				"workshop":$("#edit_workshop :selected").text(),
				"acptworkshop":$("#edit_receiveworkshop :selected").text(),
				"order_no":$("#edit_order_no").val(),
			},
			success:function (response) {
		    	if (response.success) {
		    		var data=response.data;
		    		//alert($("#edit_quantity").next("span").html());
		    		$("#edit_quantity").next("span").html("已供应："+data[0].supply_total+"；可供应："+data[0].left_qty);
		    		$("#edit_quantity").data("left_qty",data[0].left_qty);
		    	} else {
		    		alert(response.message);
		    	}
		    }
		})
		
		
		$(this).next("span").show();
	});
	
})

function ajaxAdd (argument) {
		//alert($("#new_quantity").data("left_qty"));
		//数据验证
		if(($("#new_factory").val() == '')||($("#new_workshop").val() == '')||$("#new_quantity").val()==''||($("#new_receiveworkshop").val() == '')||($("#new_order_no").val() == '')||($("#new_supply_date").val() == '')){
			alert('请输入完整交焊装数据！');
			return false;
		}else if(isNaN($("#new_quantity").val())){
			alert('交焊装数量须为数字！');
			return false;
		}else if($("#new_quantity").val()>$("#new_quantity").data("left_qty")){
			alert("可供应数量不够！");
			return false;
		}
		
		$.ajax({
			type: "post",
			dataType: "json",
			url: "production!addWorkshopSupply.action",
		    data: {
				"factory_id":$("#new_factory").val(),
				"workshop":$("#new_workshop :selected").text(),
				"receiveworkshop":$("#new_receiveworkshop :selected").text(),
				"order_no":$("#new_order_no").val(),
				"quantity":$("#new_quantity").val(),
				"supply_date":$("#new_supply_date").val(),
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
	var workshopAll="";
	$("#search_workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	//alert(workshopAll);
	var workshop=$("#search_workshop :selected").text()=="全部"?workshopAll:$("#search_workshop :selected").text();
	$.ajax({
	    url: "production!getWorkShopSupplyList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"order_no": $('#search_order_no').val(),
	    	"workshop": workshop,
	    	"acptworkshop": $('#search_receiveworkshop :selected').text(),
	    	"date_start":$('#date_start').val(),
	    	"date_end":$('#date_end').val(),
	    	"pager.pageSize":10,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableWorkshopSupply tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr id= '"+value.id+"'/>");
    			/*$("<td style=\"text-align:center;\" />").html("<input id=\"check_"+value.id+"\" type=\"checkbox\">").appendTo(tr);*/
    			$("<td style=\"text-align:center;padding:3px\" />").html(index+1).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.workshop_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.receive_workshop).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_no+'辆').appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.quantity).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.supply_total).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.supply_date).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.editor).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.edit_date).appendTo(tr);
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
	if(($("#edit_factory").val() == '')||($("#edit_workshop").val() == '')||$("#edit_quantity").val()==''||($("#edit_receiveworkshop").val() == '')||($("#edit_order_no").val() == '')||($("#edit_supply_date").val() == '')){
		alert('请输入完整交焊装数据！');
		return false;
	}else if(isNaN($("#edit_quantity").val())){
		alert('交焊装数量须为数字！');
		return false;
	}else if($("#edit_quantity").val()>$("#edit_quantity").data("old_value")+$("#edit_quantity").data("left_qty")){
		alert("可供应数量不够！");
		return false;
	}
	$.ajax({
		url: "production!editWorkShopSupplyInfo.action",
		dataType: "json",
		data: {"id" : $('#edit_id').val(),
			"factory_id" : $('#edit_factory').val(),
			"order_no" : $('#edit_order_no').val(),
			"supply_workshop" : $('#edit_workshop :selected').text(),
			"receive_workshop" : $('#edit_receiveworkshop :selected').text(),
			"quantity" : $('#edit_quantity').val(),
			"supply_date" : $('#edit_supply_date').val(),
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

function ajaxEdit(workshopSupply_id){
	$(".prodinfo").hide();
	
	$.ajax({
		url: "production!getWorkShopSupplyInfo.action",
		dataType: "json",
		data: {"workshopSupply_id" : workshopSupply_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				var supply_workshop_id = "";
				$.each(response.data,function(index,value){
					if(index == 0){
						getAuthorityFactorySelect("#edit_factory", "", "noall");
						getWorkshopSelect_Auth("#edit_workshop", value.workshop_name, $("#edit_factory :selected").text(), "");
						getWorkshopSelect('#edit_factory','#edit_receiveworkshop',value.receive_workshop,"empty");
						$("#edit_factory").val(value.factory_id);
						$("#edit_order_no").val(value.order_no);
						$("#edit_quantity").val(value.quantity);
						$("#edit_quantity").data("old_value",value.quantity);
						$("#edit_supply_date").val(value.supply_date);
						$("#edit_id").val(value.id);
					}
				})
				//getEditWorkshopSelect(supply_workshop_id);
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
			getSelects_noall(response, "", "#new_factory");
			getSelects_noall(response, "", "#edit_factory");
			getSelects_noall(response, "", "#new_receiveworkshop");
			getSelects_noall(response, "", "#edit_receiveworkshop");
			getWorkshopSelect();
			getNewWorkshopSelect();
		}
	});
}

function getWorkshopSelect(fac_element,wok_element,selectVal,selecttype) {
	selectVal=selectVal||"";
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {"factoryId": $(fac_element).val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			if(selecttype=='noall'){
				getSelects_noall(response, selectVal, wok_element);
			}else if(selecttype=='empty'){
				getSelects_empty(response, selectVal, wok_element);
			}else{
				getSelects(response, selectVal, wok_element);
			}
			
			//getSelects(response, "", "#search_workshop");	
			
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
			getSelects_noall(response, "", "#new_receiveworkshop");
			getSelects_noall(response, "", "#edit_workshop");
			getSelects_noall(response, "", "#edit_receiveworkshop");
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

function getEditWorkshopSelect(supply_workshop_id) {
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {"factoryId": $('#edit_factory').val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_noall(response, "", "#new_workshop");
			getSelects_noall(response, "", "#edit_workshop");
			getSelects_noall(response, "", "#new_receiveworkshop");
			getSelects_noall(response, "", "#edit_receiveworkshop");
			//getSelects_noall(response, "", "#new_receiveworkshop");
			$.each(response,function (index,value) {
				if(value.name == '焊装'){
					$("#new_receiveworkshop").append("<option value='"+value.id+"'>"+value.name+"</option>");
					$("#edit_receiveworkshop").append("<option value='"+value.id+"'>"+value.name+"</option>");
				}
			})
			
			$("#edit_workshop").val(supply_workshop_id);
		}
	});
}

/*$("#checkall").live("click", function() {
	if ($("#checkall").attr("checked") == "checked") {
		check_All_unAll("#tableWorkshopSupply", true);
	} else {
		check_All_unAll("#tableWorkshopSupply", false);
	}

});*/

