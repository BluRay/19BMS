$(document).ready(function () {
	initPage();
	function initPage(){
		getFactorySelect();
		getUserFactory();		//获取当前用户所属工厂
		$("#search_factory").attr("disabled","disabled");
		getOrderNoSelect("#search_order_no","#orderId");
	}
	
	$("#btnQuery").click (function () {
		if(($("#search_order_no").val()=='')&&($("#search_bus_number").val()=='')){
			alert("请输入查询条件！");
			return false;
		}
		ajaxQuery();
		return false;
	});
	
	$("#btnExport").click (function () {
		if($("#cer_chassis_date").val()==''){
			alert("请输入底盘上线日期！");
			return false;
		}
		var bus_numbers = "";
		$('#tableCertification tr').each(function(e){
			var id = $(this).attr("id");
			if(id != "0"){
				if($('#check_' + id).is(':checked')==true){
					bus_numbers+=$(this).attr("id")+",";
				}
			}			
		});
		$("#bus_number_str").val(bus_numbers);
		if(bus_numbers==''){
			alert("请选择要导出的数据！");
			return false;
		}
		window.open("production!exportCertification.action?factory_id=" + $('#search_factory').val() + "&cer_chassis_date=" + $('#cer_chassis_date').val() + "&order_no=" + $('#search_order_no').val() + "&bus_number=" + bus_numbers);
		return false;
	});
	
	// 全选、反选
	$("#checkall").live("click", function() {
		if ($("#checkall").attr("checked") == "checked") {
			check_All_unAll("#tableCertification", true);
		} else {
			check_All_unAll("#tableCertification", false);
		}
	});
	
	
	
})

function ajaxQuery(targetPage){
	$.ajax({
	    url: "production!getCertificationList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"order_no": $('#search_order_no').val(),
	    	"bus_number":$('#search_bus_number').val(),
	    	"pager.pageSize":10,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableCertification tbody").html("");
    		$.each(response.data,function (index,value) {
    			if (index==0)$("#cer_chassis_date").val(value.chassis_productive_date);
    			var tr = $("<tr id= '"+value.bus_number+"'/>");
    			if((value.productive_date == null)||(value.vin == null)||(value.productive_date == "")||(value.vin == "")){
    				$("<td style=\"text-align:center;\" />").html("<input id=\"check_"+value.bus_number+"\" disabled=\"disabled\" type=\"checkbox\">").appendTo(tr);
            	}else{
            		$("<td style=\"text-align:center;\" />").html("<input id=\"check_"+value.bus_number+"\" type=\"checkbox\">").appendTo(tr);
        		}
    			/*$("<td style=\"text-align:center;padding:3px\" />").html(index+1).appendTo(tr);*/
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.vin).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.chassis_model).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.vehicle_model).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.motor_model).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html((value.productive_date == null)?"<a href='production!showNameplatePrint.action'>请维护生产日期</a>":value.productive_date).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_color).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_seats).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.left_motor_number + "/" + value.right_motor_number).appendTo(tr);
    			$("#tableCertification tbody").append(tr);	    			
    		});
    		/*$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();*/
    		$("#btnExport").removeAttr("disabled");
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
			getSelects_empty(response, "", "#search_factory");
			getWorkshopSelect();
		}
	});
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
				$("#search_factory").val(value.FACTORY_ID)
			})
			
		}
	});
}
