var table_tr_num = 0;
var process_str="";
$(document).ready(function () {
	initPage();
	function initPage(){
		getFactorySelect();
	}
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect();
	})
	
	$('#edit_factory').change(function(){ 
		getEditWorkshopSelect();
	})
	
	$('#new_factory').change(function(){ 
		getNewWorkshopSelect();
	})
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#btnEditConfirm").click( function (argument) {
		ajaxEditConfirm();
		return false;
	});
	
	$('#new_workshop').change(function(){ 
		getAllProcessSelect();
	})
	
	$('#edit_workshop').change(function(){ 
		getEditAllProcessSelect();
	})
	
	$("#btnAddNormalConfirm").click (function () {
		ajaxAddNormal();
		return false;
	});
	
	$("#btnAdd").click( function (argument) {
		$("#productionHours_parameters").html("");
		var paramHtml="<tr><td><button disabled=\"disabled\" type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
		"<td><input type='text' style='width:140px' class='new_order_no input-medium' id='order_no'/></td>" +
		"<td><input type='text' style='width:60px' class='working_hours input-small' value='0' id='employees'/></td>" +
		"<td><input type='text' style='width:60px' class='working_hours input-small' value='0' id='arrivals_qty'/></td>" +
		"<td><input type='text' style='width:60px' class='working_hours input-small' value='0' id='working_hours'/> H </td>" +
		"</tr>";
		$(paramHtml).appendTo("#productionHours_parameters");
		
		$("#productionHours_parameters_wait").html("");
		var paramHtml="<tr><td></td>" +
		"<td><input type='text' style='width:90px' disabled=\"disabled\" class='wait_order_no input-medium' id='wait_order_no'/></td>" +
		"<td><input type='text' style='width:40px' class='wait_hours input-small' value='0' id='wait_employees'/></td>" +
		"<td><input type='text' style='width:40px' class='wait_hours input-small' value='0' id='wait_hours'/> H </td>" +
		"<td><select style='width:70px' name='exec_process' id='exec_process' class='exec_process input-small'><option value=''>-</option></select></td>" +
		"<td><input type='text' style='width:80px' class='wait_hours input-small' id='wait_reason'/></td>" +
		"<td><input type='text' style='width:60px' class='wait_hours input-small' id='wait_department'/></td>" +
		"<td><input type='text' style='width:60px' class='wait_hours input-small' value='0' id='wait_user'/></td>" +
		"</tr>";
		$(paramHtml).appendTo("#productionHours_parameters_wait");
		
		$("#productionHours_parameters_pause").html("");
		var paramHtml="<tr><td></td>" +
		"<td><input type='text' style='width:90px' disabled=\"disabled\" class='pause_order_no input-medium' id='pause_order_no'/></td>" +
		"<td><input type='text' style='width:40px' class='pause_hours input-small' value='0' id='pause_employees'/></td>" +
		"<td><input type='text' style='width:40px' class='pause_hours input-small' value='0' id='pause_hours'/> H </td>" +
		"<td><input type='text' style='width:80px' class='pause_hours input-small' id='pause_reason'/></td>" +
		"<td><input type='text' style='width:60px' class='pause_hours input-small' id='pause_department'/></td>" +
		"<td><input type='text' style='width:60px' class='pause_hours input-small' value='0' id='pause_user'/></td>" +
		"</tr>";
		$(paramHtml).appendTo("#productionHours_parameters_pause");
		
		if($("#new_workshop").val()!=null)getAllProcessSelect();
		//alert($("#new_workshop").val());
		
		getOrderNoSelect(".new_order_no","#orderId");
		$("#newModal").modal("show");
	});
	
	$("#btn_addProductionHours").click( function (argument) {
		table_tr_num++;
		var paramHtml="<tr id= "+table_tr_num+"><td><button id= 'close_"+table_tr_num+"' type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
		"<td><input type='text' style='width:140px' class='new_order_no input-medium' id='order_no'/></td>" +
		"<td><input type='text' style='width:60px' class='working_hours input-small' value='0' id='employees'/></td>" +
		"<td><input type='text' style='width:60px' class='working_hours input-small' value='0' id='arrivals_qty'/></td>" +
		"<td><input type='text' style='width:60px' class='working_hours input-small' value='0' id='working_hours'/> H </td>" +
		"</tr>";
		$(paramHtml).appendTo("#productionHours_parameters");
		
		var paramHtml="<tr id= 'wait_"+table_tr_num+"'><td></td>" +
		"<td><input type='text' style='width:90px' disabled=\"disabled\" class='wait_order_no input-medium' id='wait_order_no'/></td>" +
		"<td><input type='text' style='width:40px' class='wait_hours input-small' value='0' id='wait_employees'/></td>" +
		"<td><input type='text' style='width:40px' class='wait_hours input-small' value='0' id='wait_hours'/> H </td>" +
		"<td><select style='width:70px' name='exec_process' id='exec_process' class='exec_process input-small'>"+process_str+"</select></td>" +
		"<td><input type='text' style='width:80px' class='wait_hours input-small' id='wait_reason'/></td>" +
		"<td><input type='text' style='width:60px' class='wait_hours input-small' id='wait_department'/></td>" +
		"<td><input type='text' style='width:60px' class='wait_hours input-small' value='0' id='wait_user'/></td>" +
		"</tr>";
		$(paramHtml).appendTo("#productionHours_parameters_wait");
		
		var paramHtml="<tr id= 'pause_"+table_tr_num+"'><td></td>" +
		"<td><input type='text' style='width:90px' disabled=\"disabled\" class='pause_order_no input-medium' id='pause_order_no'/></td>" +
		"<td><input type='text' style='width:40px' class='pause_hours input-small' value='0' id='pause_employees'/></td>" +
		"<td><input type='text' style='width:40px' class='pause_hours input-small' value='0' id='pause_hours'/> H </td>" +
		"<td><input type='text' style='width:80px' class='pause_hours input-small' id='pause_reason'/></td>" +
		"<td><input type='text' style='width:60px' class='pause_hours input-small' id='pause_department'/></td>" +
		"<td><input type='text' style='width:60px' class='pause_hours input-small' value='0' id='pause_user'/></td>" +
		"</tr>";
		$(paramHtml).appendTo("#productionHours_parameters_pause");
		
		getOrderNoSelect(".new_order_no","#orderId");
		return false;
	});
	
	$(".close").live("click",function(e){	
		$("#"+$(e.target).attr('id').replace("close_","")).remove();
		$("#wait_"+$(e.target).attr('id').replace("close_","")).remove();
		$("#pause_"+$(e.target).attr('id').replace("close_","")).remove();
	});
	
})

function getPauseOrder(){
	var productionHours_parameters=$("#productionHours_parameters").find("tr");
	var order_arr=new Array();
	$.each(productionHours_parameters,function(index,param){
		var tds=$(param).children("td");
		order_arr[index] = $(tds[1]).find("input").val();
	});

	var productionHours_parameters_pause=$("#productionHours_parameters_pause").find("tr");
	$.each(productionHours_parameters_pause,function(index,param){
		var tds=$(param).children("td");
		$(tds[1]).find("input").val(order_arr[index]);
	});
}

function getWaitOrder(){
	var productionHours_parameters=$("#productionHours_parameters").find("tr");
	var order_arr=new Array();
	$.each(productionHours_parameters,function(index,param){
		var tds=$(param).children("td");
		order_arr[index] = $(tds[1]).find("input").val();
	});

	var productionHours_parameters_wait=$("#productionHours_parameters_wait").find("tr");
	$.each(productionHours_parameters_wait,function(index,param){
		var tds=$(param).children("td");
		$(tds[1]).find("input").val(order_arr[index]);
	});
}

function ajaxEditConfirm(){
	//数据验证
	if(($("#edit_factory").val() == '')||($("#edit_date").val() == '')||($("#edit_workshop").val() == '')||($("#edit_employees").val() == '')||($("#edit_arrivals_qty").val() == '')){
		alert('请输入完整数据！');
		return false;
	}else if(isNaN($(".working_hours").val())){
		alert('工时须为数字！');
		return false;
	}
	
	var edit_productionHours_parameters=$("#edit_productionHours_parameters").find("tr");
	var edit_productionHours_parameters_wait=$("#edit_productionHours_parameters_wait").find("tr");
	var edit_productionHours_parameters_pause=$("#edit_productionHours_parameters_pause").find("tr");
	
	var tds = $(edit_productionHours_parameters[0]).children("td");
	var tds2 = $(edit_productionHours_parameters_wait[0]).children("td");
	var tds3 = $(edit_productionHours_parameters_pause[0]).children("td");
	
	var order_hours = "";
	//alert($(tds[2]).find("input").val());
	order_hours += $(tds[1]).find("input").val() + "," + $(tds[2]).find("input").val() + "," 
	+ $(tds[3]).find("input").val() + "," + $(tds[4]).find("input").val() + "," 
	+ $(tds2[2]).find("input").val() + "," + $(tds2[3]).find("input").val() + "," + $(tds2[4]).find("select").val() + "," + $(tds2[5]).find("input").val() + "," + $(tds2[6]).find("input").val() + "," + $(tds2[7]).find("input").val() + "," 
	+ $(tds3[2]).find("input").val() + "," + $(tds3[3]).find("input").val() + "," + $(tds3[4]).find("input").val() + "," + $(tds3[5]).find("input").val() + "," + $(tds3[6]).find("input").val() + "," + $("#edit_id").val() + ";" ;			
	
	//alert(order_hours);
	$.ajax({
		type: "get",
		dataType: "json",
		url: "production!editProductionHours.action",
	    data: {
			"order_hours":order_hours,
		},
		async: false,
	    success:function (response) {
	    	if (response.success) {
	    		alert("修改人员工时成功");
	    		$('#editModal').modal('hide');
	    		ajaxQuery();
	    	} else {
	    		alert(response.message);
	    	}
	    },
	    error:function(){alertError();}
	});
	
}

function ajaxAddNormal (argument) {
		
		//数据验证
		if(($("#new_factory").val() == '')||($("#new_date").val() == '')||($("#new_workshop").val() == '')||($("#employees").val() == '')||($("#arrivals_qty").val() == '')){
			alert('请输入完整数据！');
			return false;
		}else if(isNaN($(".working_hours").val())){
			alert('工时须为数字！');
			return false;
		}
		
		var productionHours_parameters=$("#productionHours_parameters").find("tr");
		var productionHours_parameters_wait=$("#productionHours_parameters_wait").find("tr");
		var productionHours_parameters_pause=$("#productionHours_parameters_pause").find("tr");

		var order_hours = "";
		var order_arr=new Array();
		var check_para = true;
		$.each(productionHours_parameters,function(index,param){
			var tds=$(param).children("td");
			var tds2 = $(productionHours_parameters_wait[index]).children("td");
			var tds3 = $(productionHours_parameters_pause[index]).children("td");
			if($(tds2[4]).find("select").val() == null){
				alert("请选择车间或工序！");
				check_para = false;
				return false;
			}
			order_hours += $(tds[1]).find("input").val() + "," + $(tds[2]).find("input").val() + "," 
			+ $(tds[3]).find("input").val() + "," + $(tds[4]).find("input").val() + "," 
			+ $(tds2[2]).find("input").val() + "," + $(tds2[3]).find("input").val() + "," + $(tds2[4]).find("select").val() + "," + $(tds2[5]).find("input").val() + "," + $(tds2[6]).find("input").val() + "," + $(tds2[7]).find("input").val() + "," 
			+ $(tds3[2]).find("input").val() + "," + $(tds3[3]).find("input").val() + "," + $(tds3[4]).find("input").val() + "," + $(tds3[5]).find("input").val() + "," + $(tds3[6]).find("input").val() + ";" ;			
			order_arr[index] = $(tds[1]).find("input").val();
		});
		if(isRepeat(order_arr)){
			alert("订单号不能重复！");
			return false;
		}
		
		//if(check_para) alert(order_hours);
		if(check_para){
			$.ajax({
				type: "get",
				dataType: "json",
				url: "production!addProductionHours.action",
			    data: {
					"factory_id":$("#new_factory").val(),
					"workshop_id":$("#new_workshop").val(),
					"date":$("#new_date").val(),
					"order_hours":order_hours,
				},
				async: false,
			    success:function (response) {
			    	if (response.success) {
			    		alert("新增人员工时成功");
			    		$('#newModal').modal('hide');
			    		ajaxQuery();
			    	} else {
			    		alert(response.message);
			    	}
			    },
			    error:function(){alertError();}
			});
		}	
		
	}

function isRepeat(arr) {
	var hash = {};
	for ( var i in arr) {
		if (hash[arr[i]])
			return true;
		hash[arr[i]] = true;
	}
	return false;
}

function getAllProcessSelect() {
	$("#exec_process").empty();
	$.ajax({
		url : "common!getProcessSelectByWorkshopId.action",
		dataType : "json",
		data : {workshopId:$("#new_workshop").val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			//getSelects_noall(response, "", "#exec_process"); 
			var strs = "";process_str=""
		    $(".exec_process").html("");
		    $.each(response, function(index, value) {
		    	if (index == 0) $("#exec_processname").val(value.PROCESS_NAME);
		    	strs += "<option value=" + value.ID + ">" + value.NAME + "</option>";
		    	process_str += "<option value=" + value.ID + ">" + value.NAME + "</option>";
		    });
		    $(".exec_process").append(strs);
		}
	});
}

function getEditAllProcessSelect() {
	$("#exec_process").empty();
	$.ajax({
		url : "common!getProcessSelectByWorkshopId.action",
		dataType : "json",
		data : {workshopId:$("#edit_workshop").val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			//getSelects_noall(response, "", "#exec_process"); 
			var strs = "";process_str=""
		    $(".edit_exec_process").html("");
		    $.each(response, function(index, value) {
		    	if (index == 0) $("#exec_processname").val(value.PROCESS_NAME);
		    	strs += "<option value=" + value.ID + ">" + value.NAME + "</option>";
		    	process_str += "<option value=" + value.ID + ">" + value.NAME + "</option>";
		    });
		    $(".edit_exec_process").append(strs);
		}
	});
}

function ajaxQuery(targetPage){
	$.ajax({
	    url: "production!getProductionHoursList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"workshop_id": $('#search_workshop').val(),
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
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_no+'辆').appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.date).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.employees).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.arrivals_qty).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.working_hours).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.wait_hours).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.pause_hours).appendTo(tr);
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

function ajaxEdit(hours_id){
	$("#edit_productionHours_parameters").html("");
	var paramHtml="<tr><td></td>" +
	"<td><input type='text' style='width:140px' disabled=\"disabled\" class='edit_order_no input-medium' id='edit_order_no'/></td>" +
	"<td><input type='text' style='width:60px' class='working_hours input-small' value='0' id='edit_employees'/></td>" +
	"<td><input type='text' style='width:60px' class='working_hours input-small' value='0' id='edit_arrivals_qty'/></td>" +
	"<td><input type='text' style='width:60px' class='working_hours input-small' value='0' id='edit_working_hours'/> H </td>" +
	"</tr>";
	$(paramHtml).appendTo("#edit_productionHours_parameters");
	
	$("#edit_productionHours_parameters_wait").html("");
	var paramHtml="<tr><td></td>" +
	"<td><input type='text' style='width:90px' disabled=\"disabled\" class='edit_order_no input-medium' id='wait_order_no'/></td>" +
	"<td><input type='text' style='width:40px' class='wait_hours input-small' value='0' id='edit_wait_employees'/></td>" +
	"<td><input type='text' style='width:40px' class='wait_hours input-small' value='0' id='edit_wait_hours'/> H </td>" +
	"<td><select style='width:70px' name='exec_process' id='edit_exec_process' class='edit_exec_process input-small'><option value=''></option></select></td>" +
	"<td><input type='text' style='width:80px' class='wait_hours input-small' id='edit_wait_reason'/></td>" +
	"<td><input type='text' style='width:60px' class='wait_hours input-small' id='edit_wait_department'/></td>" +
	"<td><input type='text' style='width:60px' class='wait_hours input-small' value='0' id='edit_wait_user'/></td>" +
	"</tr>";
	$(paramHtml).appendTo("#edit_productionHours_parameters_wait");
	
	$("#edit_productionHours_parameters_pause").html("");
	var paramHtml="<tr><td></td>" +
	"<td><input type='text' style='width:90px' disabled=\"disabled\" class='edit_order_no input-medium' id='pause_order_no'/></td>" +
	"<td><input type='text' style='width:40px' class='pause_hours input-small' value='0' id='edit_pause_employees'/></td>" +
	"<td><input type='text' style='width:40px' class='pause_hours input-small' value='0' id='edit_pause_hours'/> H </td>" +
	"<td><input type='text' style='width:80px' class='pause_hours input-small' id='edit_pause_reason'/></td>" +
	"<td><input type='text' style='width:60px' class='pause_hours input-small' id='edit_pause_department'/></td>" +
	"<td><input type='text' style='width:60px' class='pause_hours input-small' value='0' id='edit_pause_user'/></td>" +
	"</tr>";
	$(paramHtml).appendTo("#edit_productionHours_parameters_pause");
	
	$.ajax({
		url: "production!getProductionHoursInfo.action",
		dataType: "json",
		data: {"hours_id" : hours_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$.each(response.data,function(index,value){
					if(index == 0){
						$("#edit_factory").val(value.factory_id);
						getEditWorkshopSelect();
						$("#edit_workshop").val(value.workshop_id);
						//$("#edit_workshop").append("<option value='"+value.workshop_id+"'>"+value.workshop_name+"</option>");
						$("#edit_date").val(value.date);
						$(".edit_order_no").val(value.order_no);
						//$("#edit_exec_process").append("<option value='"+value.workshop_id+"'>"+value.workshop_name+"</option>");
						$("#edit_employees").val(value.employees);
						$("#edit_arrivals_qty").val(value.arrivals_qty);
						$("#edit_working_hours").val(value.working_hours);
						$("#edit_wait_employees").val(value.wait_employees);
						$("#edit_wait_hours").val(value.wait_hours);						
						getEditAllProcessSelect();
						$("#edit_exec_process").val(value.wait_process_id);
						$("#edit_wait_reason").val(value.wait_reason);
						$("#edit_wait_department").val(value.wait_department);
						$("#edit_wait_user").val(value.wait_user);
						$("#edit_pause_employees").val(value.pause_employees);
						$("#edit_pause_hours").val(value.pause_hours);
						$("#edit_pause_reason").val(value.pause_reason);
						$("#edit_pause_department").val(value.pause_department);
						$("#edit_pause_user").val(value.pause_user);
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
			getSelects_empty(response, "", "#edit_factory");
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

function getEditWorkshopSelect() {
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {"factoryId": $('#edit_factory').val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response, "", "#edit_workshop");
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
			getSelects_empty(response, "", "#new_workshop");
		}
	});
}

