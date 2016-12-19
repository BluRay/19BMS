$(document).ready(function () {	
	initPage();
	function initPage(){
		$("#transferIndiv").show();
		$("#transferOutdiv").hide();
		$("#transferHisdiv").hide();
		$("#btn_transfer_out").attr("disabled","disabled");
		$("#btn_transfer_in").attr("disabled","disabled");
		//$("#transfer_in_factory2").attr("disabled","disabled");
		getFactorySelect();
		//获取当前用户所属工厂，填充导入工厂值
		getUserFactory();
	};
	
	$("#btn_transfer_in").click (function () {
		var bus_numbers = "";
		$('#tableBusInfoIn tr').each(function(e){
			var id = $(this).attr("id");
			if(id != "0"){
				if($('#check_' + id).is(':checked')==true){
					bus_numbers+=$(this).attr("id")+",";
				}
			}			
		});
		$("#bus_tra_in_str").val(bus_numbers);
		if(bus_numbers == ""){
			alert("请选择车号！");
			return false;
		}
		$.ajax({
			url : "plan!busTransferIn.action",
			dataType : "json",
			data : {
		    	"bus_number": bus_numbers,
		    	"transfer_in_factory": $('#transfer_in_factory2').val(),
			},
			async : false,
			error : function(response) {
				alert(response.message)
			},
			success : function(response) {
				alert(response.message)	
				ajaxQueryIn();
			}
		});
		
	})
	
	$("#btn_transfer_out").click (function () {
		var bus_numbers = "";
		$('#tableBusInfo tr').each(function(e){
			var id = $(this).attr("id");
			if(id != "0"){
				if($('#check_' + id).is(':checked')==true){
					bus_numbers+=$(this).attr("id")+",";
				}
			}
			
		});
		$("#bus_tra_out_str").val(bus_numbers);
		if(bus_numbers == ""){
			alert("请选择车号！");
			return false;
		}
		
		$.ajax({
			url : "plan!busTransferOut.action",
			dataType : "json",
			data : {
		    	"bus_number": bus_numbers,
		    	"transfer_out_factory": $('#transfer_out_factory').val(),
			},
			async : false,
			error : function(response) {
				alert(response.message)
			},
			success : function(response) {
				alert(response.message)	
				ajaxQueryOut();
			}
		});
		
		
	});
	
	$("#btn_transfer_his").click (function () {		
		ajaxQueryHis();
	})
	
	$("#btn_transfer_in_query").click (function () {		
		ajaxQueryIn();
	})
	
	$("#btn_transfer_query").click (function () {
		if($("#transfer_out_busnumber").val() == ""){
			alert("请输入车号！");
			$("#transfer_out_busnumber").focus();
			return false;
		}
		ajaxQueryOut();
	});
	
	
	$("li").live('click',function(e){
		if(this.id == "transferIn"){
			$("#transferIndiv").show();
			$("#transferOutdiv").hide();
			$("#transferHisdiv").hide();
		}else if(this.id == "transferOut"){
			$("#transferIndiv").hide();
			$("#transferOutdiv").show();
			$("#transferHisdiv").hide();
			$("#btn_transfer_out").attr("disabled","disabled"); 
			$("#transfer_out_busnumber").focus();
		}else if(this.id == "transferHis"){
			$("#transferIndiv").hide();
			$("#transferOutdiv").hide();
			$("#transferHisdiv").show();			
		}	
	});
	
	// 全选、反选
	$("#checkall").live("click", function() {
		if ($("#checkall").attr("checked") == "checked") {
			check_All_unAll("#tableBusInfo", true);
		} else {
			check_All_unAll("#tableBusInfo", false);
		}

	});
	$("#checkall_in").live("click", function() {
		if ($("#checkall_in").attr("checked") == "checked") {
			check_All_unAll("#tableBusInfoIn", true);
		} else {
			check_All_unAll("#tableBusInfoIn", false);
		}

	});
	
});

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
			getSelects_noall(response, "", "#transfer_out_factory");	
			getSelects(response, "", "#transfer_his_out_factory");
			getSelects(response, "", "#transfer_in_factory");
			getSelects_noall(response, "", "#transfer_in_factory2");
			getSelects(response, "", "#transfer_his_in_factory");
		}
	});
}

function ajaxQueryHis(targetPage){
	//alert("ajaxQueryHis");
	
	$.ajax({
		url : "plan!busTransferHisQuery.action",
		dataType : "json",
		data : {
			"transfer_his_busnumber": $('#transfer_his_busnumber').val(),
			"transfer_his_vin": $('#transfer_his_vin').val(),
			"transfer_his_orderno": $('#transfer_his_orderno').val(),
			
			"transfer_his_out_factory": $('#transfer_his_out_factory').val(),
			"transfer_his_out_date_start": $('#transfer_his_out_date_start').val(),
			"transfer_his_out_date_end": $('#transfer_his_out_date_end').val(),
			
			"transfer_his_in_factory": $('#transfer_his_in_factory').val(),
			"transfer_his_in_date_start": $('#transfer_his_in_date_start').val(),
			"transfer_his_in_date_end": $('#transfer_his_in_date_end').val(),			
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {	
			$("#tableBusHisInfo tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = "";
				tr = $("<tr id =\""+value.bus_number+"\" />");				
    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.ORDER_NAME).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.bus_number.substr(0,value.bus_number.indexOf("-"))).appendTo(tr);
    			var bus_numberstr = value.bus_number.substr(value.bus_number.indexOf("-")+1,value.bus_number.length);
    			var bus_numberstr2 = bus_numberstr.substr(bus_numberstr.indexOf("-")+1,bus_numberstr.length);
    			$("<td style=\"text-align:center;\" />").html(bus_numberstr2.substr(0,4)).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.customer).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.order_config_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.vin).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.factory_name_out).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.factory_name_in).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.tfrom_date).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.name_out).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.tto_date).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.name_in).appendTo(tr);
    			/*$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);*/
    			$("#tableBusHisInfo tbody").append(tr);
    			
    		});
		}
	});
	$("#transfer_out_busnumber").focus();
	return false;
}

function ajaxQueryIn(targetPage){
	$.ajax({
		url : "plan!busTransferInQuery.action",
		dataType : "json",
		data : {
			"factory_id": $('#transfer_in_factory').val(),
			"factory_id_in": $('#transfer_in_factory2').val(),
	    	"bus_number": $('#transfer_in_busnumber').val(),
		},
		async : false,
		error : function(XMLHttpRequest,textStatus) {
			alert(XMLHttpRequest.readyState)
		},
		success : function(response) {
			//alert(response.message)
			$("#btn_transfer_in").removeAttr("disabled");	
			$("#tableBusInfoIn tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = "";
				tr = $("<tr id =\""+value.bus_number+"\" />");
				$("<td style=\"text-align:center;\" />").html("<input id=\"check_"+value.bus_number+"\" type=\"checkbox\">").appendTo(tr);

    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.ORDER_NAME).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.bus_number.substr(0,value.bus_number.indexOf("-"))).appendTo(tr);
    			var bus_numberstr = value.bus_number.substr(value.bus_number.indexOf("-")+1,value.bus_number.length);
    			var bus_numberstr2 = bus_numberstr.substr(bus_numberstr.indexOf("-")+1,bus_numberstr.length);
    			$("<td style=\"text-align:center;\" />").html(bus_numberstr2.substr(0,4)).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.customer).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.order_config_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.vin).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html("").appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html((value.status==0)?"正常":"冻结").appendTo(tr);
    			/*$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);*/
    			$("#tableBusInfoIn tbody").append(tr);
    			
    		});
		}
	});
	$("#transfer_out_busnumber").focus();
	return false;
}

function ajaxQueryOut(targetPage){
	$.ajax({
		url : "plan!busTransferQuery.action",
		dataType : "json",
		data : {
			"factory_id": $('#transfer_out_factory').val(),
	    	"bus_number": $('#transfer_out_busnumber').val(),
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			//alert(response.message)
			$("#btn_transfer_out").removeAttr("disabled");	
			$("#tableBusInfo tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = "";
    			if((value.status==0)){
    				tr = $("<tr id =\""+value.bus_number+"\" />");
    				$("<td style=\"text-align:center;\" />").html("<input id=\"check_"+value.bus_number+"\" type=\"checkbox\">").appendTo(tr);
    			}else{
    				tr = $("<tr id =\"0\" />");
    				$("<td style=\"text-align:center;\" />").html("<input disabled=\"disabled\" type=\"checkbox\">").appendTo(tr);
    			}
    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.ORDER_NAME).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.bus_number.substr(0,value.bus_number.indexOf("-"))).appendTo(tr);
    			var bus_numberstr = value.bus_number.substr(value.bus_number.indexOf("-")+1,value.bus_number.length);
    			var bus_numberstr2 = bus_numberstr.substr(bus_numberstr.indexOf("-")+1,bus_numberstr.length);
    			$("<td style=\"text-align:center;\" />").html(bus_numberstr2.substr(0,4)).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.customer).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.order_config_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.vin).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html("").appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html((value.status==0)?"正常":"冻结").appendTo(tr);
    			/*$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);*/
    			$("#tableBusInfo tbody").append(tr);
    			
    		});
		}
	});
	$("#transfer_out_busnumber").focus();
	return false;
}

function getUserFactory(){
	$.ajax({
		url : "common!getFactoryInfoByUserId.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$.each(response.data,function (index,value) {
				$("#transfer_in_factory2").val(value.FACTORY_ID)
			})
			
		}
	});
	
}

