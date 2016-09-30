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
	if($("#edit_dp_production_date").val() == '' || $("#edit_zc_production_date").val() == ''){
		alert('请输入完整数据！');
		return false;
	}
	if($("#edit_dpgg_date").val()==""){
		alert("在维护底盘生产日期之前必须先维护底盘公告生效日期！\n");
		return false;
	}
	if($("#edit_zcgg_date").val()==""){
		alert("在维护整车生产日期之前必须先维护整车公告生效日期！\n");
		return false;
	}
	if($("#edit_ccczs_date").val()==""){
		alert("在维护整车生产日期之前必须先维护CCC证书签发日期！\n");
		return false;
	}
	if(compareTime($("#edit_dpgg_date").val(),$("#edit_dp_production_date").val())>=0){
		alert("底盘生产日期必须在底盘公告生效日期之后！\n");
		return false;
	}
	
	if(compareTime($("#edit_zcgg_date").val(),$("#edit_zc_production_date").val())>=0){
		alert("整车生产日期必须在整车公告生效日期之后！\n");
		return false;
	}
	if(compareTime($("#edit_ccczs_date").val(),$("#edit_zc_production_date").val())>=0){
		alert("整车生产日期必须在CCC证书签发日期之后！\n");
		return false;
	}
	$.ajax({
		url: "production!addProductionDate.action",
		dataType: "json",
		data: {
			"factory_id":$("#edit_factory").val(),
			"order_no":$("#edit_order_no").val(),
			"new_all_bus":0,
			"new_bus_number":$("#edit_bus_number").val(),
			"new_dp_production_date":$("#edit_dp_production_date").val(),
			"new_zc_production_date":$("#edit_zc_production_date").val(),
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

function ajaxEdit(factory_id,bus_number,order_no,dp_production_date,zc_production_date,dpgg_date,zcgg_date,ccczs_date){
	//alert("-->" + bus_number + order_no);
	$("#edit_factory").val(factory_id);
	$("#edit_order_no").val(order_no);
	$("#edit_bus_number").val(bus_number);
	$("#edit_dp_production_date").val(dp_production_date=="undefined"?"":dp_production_date);
	$("#edit_zc_production_date").val(zc_production_date=="undefined"?"":zc_production_date);
	$("#edit_dpgg_date").val(dpgg_date=="undefined"?"":dpgg_date);
	$("#edit_zcgg_date").val(zcgg_date=="undefined"?"":zcgg_date);
	$("#edit_ccczs_date").val(ccczs_date=="undefined"?"":ccczs_date);
	$("#editModal").modal("show");
}

function ajaxAdd (argument) {
		//数据验证
		if($("#new_factory").val() == '' || $("#new_order_no").val() == '' || $("#new_dp_production_date").val() == '' || $("#new_zc_production_date").val() == ''){
			alert('请输入完整数据！');
			return false;
		}
		var new_all_bus = "0";
		if($("#new_all_bus").attr("checked")=="checked"){
			new_all_bus = "1";
		}else{
			new_all_bus = "0";
		}
		
		var validmsg="";
		var max_dpgg_date="";
		var max_zcgg_date="";
		var max_ccczs_date="";
		
		$.ajax({
		    url: "production!getBusCCCList.action",
		    dataType: "json",
			type: "get",
			async : false,
		    data: {
		    	"factory_id": $('#new_factory').val(),
		    	"order_no": $('#new_order_no').val(),
		    	"bus_type_id": '',
		    	"bus_number": new_all_bus=="1"?"":$('#new_bus_number').val(),
		    	/*"pager.pageSize":10,
				"pager.curPage":targetPage || 1*/
		    },
		    success:function(response){
	    		$.each(response.data,function (index,value) {
	    			/*var tr = $("<tr id= '"+value.id+"'/>");
	    			$("<td style=\"text-align:center;padding:3px\" />").html(index+1).appendTo(tr);
	    			$("<td style=\"text-align:center;padding:3px\" />").html(value.factory_name).appendTo(tr);
	    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_no+'辆').appendTo(tr);
	    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_type_code).appendTo(tr);
	    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_number).appendTo(tr);
	    			$("<td style=\"text-align:center;padding:3px\" />").html(value.ccczs_date).appendTo(tr);
	    			$("<td style=\"text-align:center;padding:3px\" />").html(value.dpgg_date).appendTo(tr);
	    			$("<td style=\"text-align:center;padding:3px\" />").html(value.zcgg_date).appendTo(tr);
	    			$("<td style=\"text-align:center;padding:3px\" />").html("<button onclick = 'ajaxEdit(\"" + value.factory_id + "\",\"" + value.bus_number + "\",\"" + value.order_no.split("\n")[0] + "\",\"" + value.ccczs_date + "\",\"" + value.dpgg_date + "\",\"" + value.zcgg_date + "\");' class='btn-link'>编辑</>").appendTo(tr);
	    			$("#tableBusCCC tbody").append(tr);	 */   
	    			if(value.dpgg_date==null||value.dpgg_date==""){
	    				validmsg+="车号"+value.bus_number+"的底盘公告日期为空！\n";
	    				return false;
	    			}
	    			if(value.zcgg_date==null||value.zcgg_date==""){
	    				validmsg+="车号"+value.bus_number+"的整车公告日期为空！\n";
	    				return false;
	    			}
	    			if(max_dpgg_date==""){
	    				max_dpgg_date=value.dpgg_date;
	    			}else{
	    				if(compareTime(max_dpgg_date,value.dpgg_date)==-1){
	    					max_dpgg_date=value.dpgg_date;
	    				}
	    			}
	    			if(max_zcgg_date==""){
	    				max_zcgg_date=value.zcgg_date;
	    			}else{
	    				if(compareTime(max_zcgg_date,value.zcgg_date)==-1){
	    					max_zcgg_date=value.zcgg_date;
	    				}
	    			}
	    			if(max_ccczs_date==""){
	    				max_ccczs_date=value.ccczs_date;
	    			}else{
	    				if(compareTime(max_ccczs_date,value.ccczs_date)==-1){
	    					max_ccczs_date=value.ccczs_date;
	    				}
	    			}
	    		});
		    }
		});
		
		if(max_dpgg_date!=""&&compareTime(max_dpgg_date,$("#new_dp_production_date").val())>=0){
			validmsg+="底盘生产日期必须在底盘公告日期之后！\n";
		}
		
		if(max_zcgg_date!=""&&compareTime(max_zcgg_date,$("#new_zc_production_date").val())>=0){
			validmsg+="整车生产日期必须在整车公告日期之后！\n";
		}
		
		if(max_ccczs_date!=""&&compareTime(max_ccczs_date,$("#new_zc_production_date").val())>=0){
			validmsg+="整车生产日期必须在CCC证书签发日期之后！\n";
		}
		
		if(validmsg!=""){
			alert(validmsg);
			return false;
		}
		
		$.ajax({
			type: "get",
			dataType: "json",
			url: "production!addProductionDate.action",
		    data: {
				"factory_id":$("#new_factory").val(),
				"order_no":$("#new_order_no").val(),
				"new_all_bus":new_all_bus,
				"new_bus_number":$("#new_bus_number").val(),
				"new_dp_production_date":$("#new_dp_production_date").val(),
				"new_zc_production_date":$("#new_zc_production_date").val(),
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
	    url: "production!getProductionDateList.action",
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
    		$("#tableProductionDate tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr id= '"+value.id+"'/>");
    			$("<td style=\"text-align:center;padding:3px\" />").html(index+1).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_no+'辆').appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_type_code).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.dp_production_date).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.zc_production_date).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html("<button onclick = 'ajaxEdit(\"" + value.factory_id + "\",\"" + value.bus_number + "\",\"" + value.order_no.split("\n")[0] + "\",\"" + value.dp_production_date + "\",\"" + value.zc_production_date + "\",\"" + value.dpgg_date +"\",\"" + value.zcgg_date +"\",\"" + value.ccczs_date + "\");' class='btn-link'>编辑</>").appendTo(tr);
    			$("#tableProductionDate tbody").append(tr);	    			
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
