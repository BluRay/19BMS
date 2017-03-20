var buslist=[];
$(document).ready(function () {
	initPage();
	function initPage(){
		getFactorySelect();
		getUserFactory();		//获取当前用户所属工厂
		$("#search_factory").attr("disabled","disabled");
		getOrderNoSelect("#search_order_no","#orderId");
	}
	
	$("#btnQuery").click (function () {
		//alert($("#search_bus_number").val().trim().length);
		if(($("#search_order_no").val()=='')&&($("#search_bus_number").val().trim().length==0)){
			alert("请输入查询条件！");
			return false;
		}
		ajaxQuery();
		return false;
	});
	
	$("#btnBuslist").click(function(){
		$("#busSelectModal").modal("show");
	});
	
	$("#btnMtaSave").click(function(){
		if(($("#search_order_no").val()=='')&&($("#search_bus_number").val().trim().length==0)){
			alert("请输入查询条件！");
			return false;
		}
		ajaxQuery();
		$("#search_bus_number").val("");
		$("#busSelectModal").modal("hide");
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
	
	$("#btnImport").click(function(){
		var datalist=getCheckedBus();
		$.ajax({
		    url: "production!certificatePrint.action",
		    dataType: "json",
			type: "post",
		    data: {
		    	"conditions":JSON.stringify(datalist)
		    },
		    success:function(){
		    	alert("传输成功！");
		    },
		    error:function(){
		    	alert("系统异常！");
		    }
		    })
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
	    	buslist=response.data;
    		$("#tableCertification tbody").html("");
    		$.each(response.data,function (index,value) {
    			if (index==0)$("#cer_chassis_date").val(value.dp_production_date);
    			var tr = $("<tr id= '"+value.bus_number+"'/>");
    			if((value.productive_date == null)||(value.vin == null)||(value.productive_date == "")||(value.vin == "")){
    				$("<td style=\"text-align:center;\" />").html("<input id=\"check_"+value.bus_number+"\" disabled=\"disabled\" type=\"checkbox\">").appendTo(tr);
            	}else{
            		$("<td style=\"text-align:center;\" />").html("<input id=\"check_"+value.bus_number+"\" type=\"checkbox\">").appendTo(tr);
        		}
    			/*$("<td style=\"text-align:center;padding:3px\" />").html(index+1).appendTo(tr);*/
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html(value.vin).appendTo(tr);
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html(value.chassis_model).appendTo(tr);
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html(value.vehicle_model).appendTo(tr);
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html(value.motor_model).appendTo(tr);
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html((!value.dp_production_date)?"<a href='production!productionDate.action'>请维护底盘生产日期</a>":value.dp_production_date).appendTo(tr);
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html((!value.productive_date)?"<a href='production!productionDate.action'>请维护整车生产日期</a>":value.productive_date).appendTo(tr);
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html(value.motor_number).appendTo(tr);
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html(value.bus_color).appendTo(tr);
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html(value.tire_type).appendTo(tr);
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html(value.bus_seats).appendTo(tr);
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html(value.passengers).appendTo(tr);
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html(value.spring_num).appendTo(tr);
    			
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html("<input style='border:0;width:100%' class='note'>").appendTo(tr);
    			var zzd_dp="<select style='border:0;width:100%' class='zzd_dp'><option value='比亚迪深圳'>比亚迪深圳</option>" +
    					"<option value='比亚迪西安'>比亚迪西安</option>" +"<option value='比亚迪长沙'>比亚迪长沙</option>"+
    					"</select>";
    			var zzd_zc="<select style='border:0;width:100%' class='zzd_zc'><option value='比亚迪深圳'>比亚迪深圳</option>" +
				"<option value='比亚迪西安'>比亚迪西安</option>" +"<option value='比亚迪长沙'>比亚迪长沙</option>"+
				"<option value='比亚迪南京'>比亚迪南京</option>" +"<option value='比亚迪杭州'>比亚迪杭州</option>"+
				"</select>";
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html(zzd_zc).appendTo(tr);
    			$("<td style=\"text-align:center;padding-left: 0px;\" />").html(zzd_dp).appendTo(tr);
    			
    			$(tr).data("bus_obj",value);
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

function getCheckedBus(){
	var arrChk=$("#tableCertification tbody input[type='checkbox']:checked");
	//alert(arrChk.length)
	var checked_buslist=[];
    $(arrChk).each(function(){
    	var tr=$(this).parent("td").parent("tr");
    	var bus_obj=$(tr).data("bus_obj");
    	bus_obj['note']=$(tr).find(".note").val();
    	bus_obj['scd_zc']=$(tr).find(".zzd_zc").val();
    	bus_obj['scd_dp']=$(tr).find(".zzd_dp").val();
    	checked_buslist.push(bus_obj); 
    	
    }); 
    return checked_buslist;
}
