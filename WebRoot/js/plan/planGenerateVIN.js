$(document).ready(function () {	
	initPage();
	function initPage(){
		$("#btnExport").attr("disabled","disabled"); 
		$("#btnImport").attr("disabled","disabled"); 
		$("#divBulkAdd").hide();
		getOrderNoSelect("#search_order_no","#orderId");
		getFactorySelect();
	};
	
	$('#search_factory').change(function(){ 
		$('#vin_factory').val($('#search_factory').val());
	})
	
	$("#btnQuery").click (function () {
		$("#divBulkAdd").hide();
		ajaxQuery();
		return false;
	});
	
	$("#btnExport").click (function () {
		$("#divBulkAdd").hide();
		if($("#search_order_no").val()==""){
			alert("请先输入订单编号！");
			return false;
		}
		window.open("plan!exportVin.action?factory_id=" + $('#search_factory').val() + "&order_no=" + $('#search_order_no').val());
/*		ajaxQuery(0,"all");
		htmlToExcel("tableResultAll", "", "","VIN明细","VIN明细");*/	
		return false;
	});
	
	$("#btnPrint").click(function(){
		if(validateUrlAuth("/plan!printVin.action")){
			ajaxQuery(0,"all");
			window.print();
		}
		
	});
	
	$("#btnImport").click (function () {
		$("#divBulkAdd").show();
	});
	
	$("#btnGenVin").click (function () {
		$("#divBulkAdd").hide();
		if($("#search_factory").val()==""){
			alert("请选择工厂！");
			return false;
		}else if($("#search_order_no").val()==""){
			alert("生成VIN号请先输入订单编号！");
			return false;
		}
		$("#new_order_no").val($('#search_order_no').val());
		$("#newModal").modal("show");
	})
	
	$("#btnAddConfirm").click (function () {
		if(!validateUrlAuth("/plan!getGenerateVin.action")){
			alert("抱歉，您没有“生成VIN号”的权限！");
			return false;
		}
		
		$("#divBulkAdd").hide();
		if($("#vin_factory").val()==""){
			alert('请选择VIN号生成工厂！');
			return false;
		}
		if(isNaN($("#new_vinCount").val())){
			alert('生成数量须为数字！');
			return false;
		}
		$("#btnAddConfirm").attr("disabled","disabled");
		$.ajax({
			url : "plan!getGenerateVin.action",
			dataType : "json",
			data : {"factory_id": $('#search_factory').val(),
		    		"order_no": $('#search_order_no').val(),
		    		"vinCount": $('#new_vinCount').val(),
		    		"vin_factory_id": $('#vin_factory').val(),
		    },
			async : false,
			error : function(response) {
				alert(response.message);
				$("#btnGenVin").removeAttr("disabled");
			},
			success : function(response) {
				alert(response.message);
				$("#btnAddConfirm").removeAttr("disabled");
				$("#newModal").modal("hide");
				ajaxQuery();
			}
		});
		return false;
	});
	
	
	$(".bus_number").live("change",function(e){
		if(confirm("是否确定修改？")){
			var tr=$(e.target).parent("td").parent("tr");
			var bus_number=$(tr).find("td").eq(5).find("input").attr("old_val");
			var update_val=$(this).val();
			ajaxUpdateVinMotor(bus_number,update_val,"vin",e);
		}else{
			$(this).val($(this).attr("old_val"))
		}
	})
	
	$(".left_motor").live("change",function(e){
		if(confirm("是否确定修改？")){
			var tr=$(e.target).parent("td").parent("tr");
			var bus_number=$(tr).find("td").eq(5).find("input").attr("old_val");
			var update_val=$(this).val();
			ajaxUpdateVinMotor(bus_number,update_val,"left_motor",e);
		}else{
			$(this).val($(this).attr("old_val"))
		}
	})
	
	$(".right_motor").live("change",function(e){
		if(confirm("是否确定修改？")){
			var tr=$(e.target).parent("td").parent("tr");
			var bus_number=$(tr).find("td").eq(5).find("input").attr("old_val");
			var update_val=$(this).val();
			ajaxUpdateVinMotor(bus_number,update_val,"right_motor",e);
		}else{
			$(this).val($(this).attr("old_val"))
		}
	})
	
});

function ajaxUpdateVinMotor(bus_number,update_val,update_flg,e){
	var e_id=$(e.target).attr("id");
	$.ajax({
		url : "plan!updateVinMotor.action",
		dataType : "json",
		data : {
			"vin":$(e.target).closest("tr").find("td").eq(2).html(),
			"bus_number":bus_number,
			"update_val":update_val,
			"update_flg":update_flg
		},
		async : false,
		error : function(response) {
			//alert(response.responseText.indexOf("没有权限"))
			if(response.responseText.indexOf("没有权限")>=0){								
				//$("#search_bus_vin").focus();
				alert("抱歉，您没有修改权限！");
			}
		},
		success : function(response) {
			if(response.success){
				ajaxQuery()
			}else{
				//$("#search_bus_vin").focus();
				alert(response.message);
				$("#"+e_id).val($("#"+e_id).attr("old_val"));
			}
			
		}
	});
}

function ajaxQuery(targetPage,queryAll){
	$(".divLoading").addClass("fade in").show();
	
	if(queryAll=="all"){
	    data={
	    		"factory_id": $('#search_factory').val(),
		    	"order_no": $('#search_order_no').val(),
		    	"bus_number": $('#search_bus_number').val(),
		    	"bus_vin": $('#search_bus_vin').val(),
		    	"pager":null
	    }	
	    table=$("#tableResultAll tbody");
	}else{
		data={
				"factory_id": $('#search_factory').val(),
		    	"order_no": $('#search_order_no').val(),
		    	"bus_number": $('#search_bus_number').val(),
		    	"bus_vin": $('#search_bus_vin').val(),
		    	"pager.pageSize":10,
				"pager.curPage":targetPage || 1		
		}
		table=$("#tableVIN tbody");
	}
	
	$.ajax({
	    url: "plan!showPlanVinList.action",
	    dataType: "json",
	    async:false,
		type: "get",
	    data: data,
	    success:function(response){		    		
    		$(table).html("");
    		if(queryAll!='all'){
    			$.each(response.data,function (index,value) {
        			var tr = $("<tr />");
        			/*$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);*/
        			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
        			$("<td style=\"text-align:center;\" />").html(value.order_no+" "+value.order_name+value.bus_type_code+" "+value.order_qty+"台").appendTo(tr);
        			$("<td style=\"text-align:center;\" />").html(value.vin).appendTo(tr);
        			$("<td style=\"text-align:center;\" />").html("<input id='left_motor_"+index+"' class='left_motor' style='font-size: 12px;color: #333333;border:0;width:100%' value='"+value.left_motor_number+"' old_val='"+value.left_motor_number+"'>").appendTo(tr);
        			$("<td style=\"text-align:center;\" />").html("<input id='right_motor_"+index+"' class='right_motor' style='font-size: 12px;color: #333333;border:0;width:100%' value='"+value.right_motor_number+"' old_val='"+value.right_motor_number+"'>").appendTo(tr);
        			$("<td style=\"text-align:center;\" />").html("<input id='bus_"+index+"' class='bus_number' style='font-size: 12px;color: #333333;border:0;width:100%' value='"+value.bus_number+"' old_val='"+value.bus_number+"'>").appendTo(tr);
        			/*$("<td style=\"text-align:center;\" />").html(value.productive_date).appendTo(tr);*/
        			$("<td style=\"text-align:center;\" />").html(value.creator_name).appendTo(tr);
        			$("<td style=\"text-align:center;\" />").html(value.creat_date).appendTo(tr);
        			$("<td style=\"text-align:center;\" />").html((value.print_sign==1)?"已打印":"未打印").appendTo(tr);
        			/*$("<td style=\"text-align:center;\" />").html(value.print_date).appendTo(tr);
        			$("<td style=\"text-align:center;\" />").html(value.print_name).appendTo(tr);*/
        			$(table).append(tr);	    			
        		});	 
        		
        		$("#total").html(response.pager.totalCount);
        		$("#total").attr("total",response.pager.totalCount);
        		$("#cur").attr("page",response.pager.curPage);
        		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
        		$("#pagination").show();
    		}else{
    			$.each(response.data,function (index,value) {
        			/*var tr = $("<tr />");
        			$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
        			$("<td style=\"text-align:center;\" />").html(value.vin).appendTo(tr);
        			$("<td style=\"text-align:center;\" />").html(value.left_motor_number).appendTo(tr);
        			$("<td style=\"text-align:center;\" />").html(value.right_motor_number).appendTo(tr);
        			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
        			$("<td style=\"text-align:center;\" />").html(value.productive_date).appendTo(tr);
        			var vinBarcode="<div id=\"bcTarget_"+index+"\" style=\"width:400px; height:30px;margin-left:10px;margin-top:10px\"></div>";
        			$("<td />").html(vinBarcode).appendTo(tr);
        			var bctargetId="#bcTarget_"+index;
        			//alert(bctargetId);
        			$(table).append(tr);
        			$(bctargetId).barcode(value.vin, "code128",{barWidth:1.5, barHeight:30,showHRI:false});*/
        				    		
    				//change to 打印vin码标签
    				var printhtml="<div class=\"printConfigure printable toPrint\" style=\"padding-top:10px;padding-bottom:10px;line-height:40px;\" ><table border=0><tr ><td style=\"text-align:right; font-size:26px;font-weight:bold; height:35px; padding-left:0px\">订单：</td>"
    					+"<td style=\"text-align:left; font-size:26px;font-weight:bold; width:270px;height:35px \">"+value.bus_type_code+"-"+value.order_code+"-"+value.order_qty+"</td></tr>"+
    					"<tr><td style=\"text-align:right; font-size:26px; font-weight:bold;height:35px; padding-left:0px;\"></td>"
    					+"<td style=\"text-align:left; font-size:26px; font-weight:bold;width:270px;height:35px;\">"+"</td></tr>"+
    					"<tr><td style=\"text-align:right; font-size:26px;font-weight:bold;height:35px;padding-left:0px\">VIN：</td>"
    					+"<td style=\"text-align:left; font-size:26px;font-weight:bold ;width:270px;height:35px; \">"+value.vin+"</td></tr></table>"
    					+"<div id=\"bcTarget_"+index+"\" style=\"width:300px; height:70px;margin-left:10px;margin-top:10px\"></div></div>";
    				$("#printarea").append(printhtml);
    				$("#bcTarget_"+index).barcode(value.vin, "code128",{barWidth:2, barHeight:70,showHRI:false});
    				if(index<response.data.length-1){
    	              	$(".printConfigure").css("page-break-after","always");
    	              }
        		});	 
    			   			
    			$("#pagination").hide();
    		}
    		$(".divLoading").hide();
			$("#btnExport").removeAttr("disabled");
			$("#btnImport").removeAttr("disabled");
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
			getSelects_empty(response, "", "#vin_factory");
		}
	});
}