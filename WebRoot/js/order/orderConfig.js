var orderConfigCount = 1;
$(document).ready(function () {	
	initPage();
	function initPage(){
		cur_year = new Date().getFullYear();
		var options='<option value="'+(cur_year-3)+'">'+(cur_year-3)+'</option><option value="'+(cur_year-2)+'">'+(cur_year-2)+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option selected value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>';
		$("#search_productive_year").html(options);	
		getOrderNoSelect("#search_order_no","#orderId");
		ajaxQuery();
		$("#btnConfigConfirm").removeAttr("disabled");
	};
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#btnConfigConfirm").click (function () {		
		ajaxConfigConfirm();
	});
	
	$(".config").live("click",function(e){
		
		$(e.target).closest("tr").remove();	
		orderConfigCount -- ;
		return false;

	});
	
	$("#addOrderConfigForm").click( function (argument) {
		var vehicleTypeList=$("#editModal").data("vehicleTypeList");
		//alert(orderConfigCount);
		var paramHtml="<tr height=\"40px\">" +
				"<td width=\"40px\"><button data-original-title=\"删除\" type=\"button\" class=\"config close\" aria-label=\"Close\" rel=\"tooltip\" title=\"删除\" ><span aria-hidden=\"true\">×</span></button></td>" +
				"<td width=\"45px\"><input type=\"text\" disabled=\"disabled\" style=\"width:45px;\" class=\"input-small revise\" id=\"order_config_id_"+orderConfigCount+"\" value='0' name=\"order_config_id_"+orderConfigCount+"\" /></td>" +
				"<td width=\"100px\"><input type=\"text\" style=\"width:100px;\"  class=\"input-medium revise\" placeholder=\"配置简称...\" id=\"order_config_name_"+orderConfigCount+"\" /></td>" +
				"<td width=\"80px\"><input type=\"text\" class=\"input-small revise\" value=\"0\" id=\"config_qty_"+orderConfigCount+"\" /></td>" +
				"<td width=\"200px\"><input type=\"text\" class=\"input-medium revise\" placeholder=\"客户名称...\" id=\"customer_"+orderConfigCount+"\" /></td>" +
				"<td width=\"70px\"><input type=\"text\" class=\"input-medium revise\" placeholder=\"轮胎规格...\" id=\"tire_type_"+orderConfigCount+"\" /></td>" +
				"<td width='150px'><select id='bus_vehicle_type_"+orderConfigCount+ "' class='input-medium revise'></select></td>"+
				"<td width=\"180px\"><input type=\"file\" name=\"upload\" id=\"config_file_"+orderConfigCount+"\" style=\"height: 30px;width:180px\"></td>" +
				/*"<td width=\"80px\"><button style=\"height:24px;width:50px;line-height:14px;padding-left:8px\" class=\"btn btn-success btn-xs\" id=\"delOrderConfigForm\">删除</button></td>" +*/
				"</tr>";
		$(paramHtml).appendTo("#editOrderConfig_parameters");
		getSelects_empty(vehicleTypeList, "", "#bus_vehicle_type_"+orderConfigCount)
		orderConfigCount ++ ;
		return false;
	});
	
	
});

function ajaxConfigConfirm (argument){
	var sum_qty=0;
	//数据验证
    for (i=0; i<orderConfigCount; i++) {
    	if(($("#order_config_name_" + i).val() =="")||($("#config_qty_" + i).val() =="")||($("#customer_" + i).val() =="")){
	    	alert("必须填写完整配置信息！");
	    	return false;
	    }
    }  
    
    var x = document.getElementsByName("upload");
    for (i=0; i<x.length; i++) {
    	if ((x[i].value == "")&&(i<=orderConfigCount)&&($("#order_config_id_"+i).val() =="0")){
    		alert("新增配置必须上传配置文件！")
    		return false;
    	}
    }
    
    $("#btnConfigConfirm").attr("disabled","disabled");
    var uploadfile = "1";
    if(x[0].value == ""){
		uploadfile = "0";
	}
    //alert(uploadfile);
    
	var configStr = $("#order_config_id_0").val() + "," + $("#order_config_name_0").val() + "," + $("#config_qty_0").val() + "," + $("#customer_0").val() + "," + uploadfile + "," 
	+ $("#tire_type_0").val() + ","+ ($("#bus_vehicle_type_0 option:selected").text()=="请选择"?"未指定":$("#bus_vehicle_type_0 option:selected").text())+ ";";
	sum_qty += parseInt($("#config_qty_0").val());
	var editOrderConfig_parameters=$("#editOrderConfig_parameters").find("tr");
	$.each(editOrderConfig_parameters,function(index,param){
		var tds=$(param).children("td");

		var uploadfile = "1";
		if(x[index+1].value == ""){
			uploadfile = "0";
		}
		//alert(uploadfile);

		if(tds.is(":visible")&&(index<orderConfigCount)){
			configStr += $(tds[1]).find("input").val() + "," + $(tds[2]).find("input").val() + "," + $(tds[3]).find("input").val() + "," + $(tds[4]).find("input").val() + "," + uploadfile + "," 
			+ $(tds[5]).find("input").val() +","+( $(tds[6]).find("select option:selected").text()=="请选择"?"未指定":$(tds[6]).find("select option:selected").text())+ ";";
			sum_qty += parseInt($(tds[3]).find("input").val());
		}
		
	});
	if(sum_qty > parseInt($("#order_qty").val())){
		alert("订单配置总数不能大于订单生产数！");
		$("#btnConfigConfirm").removeAttr("disabled");
		return false;
	}
	
	$("#configStr").val(configStr);
	//$("#configForm").submit();
	
	$("#configForm").ajaxSubmit({
		url:"OrderConfig.action",
		type: "post",
		dataType:"json",
		error : function(response) {
			//alert(response.message);
		},
		success:function(response){
			if(response.success){
				alert(response.message);
				var targetPage=$("#cur").attr("page");
				//alert(targetPage);
				$("#editModal").modal("hide");
				ajaxQuery(targetPage);
			}else{
				alert(response.message);
				$("#btnConfigConfirm").removeAttr("disabled");
			}
			$("#btnConfigConfirm").removeAttr("disabled");
		}			
	});
	
	return false;

}

function ajaxEdit(order_id,issed_qty,bus_type){
	/*if(issed_qty >0){
		//alert("已发布的订单不能编辑");
		$('#btnConfigConfirm').attr("disabled","disabled");
		$('#btnConfigConfirm').attr("title","已发布的订单不能编辑");
	}else{
		$('#btnConfigConfirm').attr("title","编辑");
		$('#btnConfigConfirm').removeAttr("disabled");
	}*/
	var vehicleTypeList=getBusVehicleTypeSelect(bus_type);
	//查询订单信息
	$.ajax({
		url: "order!showOrderConfigList.action",
		dataType: "json",
		data: {"order_id" : order_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$("#editOrderConfig_parameters").html("");
				$("#ConfigOrderNo").val("");
				$("#ConfigOrderDescriptive").val("");
				$("#order_config_name_0").val("");
				$("#config_qty_0").val("");
				$("#customer_0").val("");
				$.each(response.data,function(index,value){
					if(index == 0){
						//填充订单基本信息
						$("#order_qty").val(value.order_qty);
						$("#ConfigOrderNo").val(value.order_no);
						$("#ConfigOrderDescriptive").val(value.order_name + value.bus_type + " " + value.order_qty + "台");	
						if(value.id != "0"){
							$("#order_config_id_0").val(value.id);
							$("#order_config_name_0").val(value.order_config_name);
							$("#config_qty_0").val(value.config_qty);
							$("#customer_0").val(value.customer);
							$("#tire_type_0").val(value.tire_type);
							getSelects_empty(vehicleTypeList, value.bus_vehicle_type, "#bus_vehicle_type_0")
						}else{
							$("#order_config_id_0").val("0");
							$("#order_config_name_0").val("");
							$("#config_qty_0").val("");
							$("#customer_0").val("");
							$("#tire_type_0").val("");
							getSelects_empty(vehicleTypeList, "", "#bus_vehicle_type_0")
						}
							
					}else{
						if(value.id != "0"){
							var paramHtml="<tr height=\"40px\">" +
							"<td width=\"40px\"><button data-original-title=\"删除\" type=\"button\" class=\"close\" aria-label=\"Close\" rel=\"tooltip\" title=\"删除\" ><span aria-hidden=\"true\">×</span></button></td>" +
							"<td>" +
							"<input type=\"text\" style=\"width:45px;\" disabled=\"disabled\" class=\"input-small revise\" id=\"order_config_id_"+orderConfigCount+"\" value=\""+value.id+"\" name=\"order_config_id_"+orderConfigCount+"\" /></td>" +
							"<td><input type=\"text\" style=\"width:100px;\" class=\"input-medium revise\" placeholder=\"配置简称...\" value=\""+value.order_config_name+"\" id=\"order_config_name_"+orderConfigCount+"\" name=\"order_config_name_"+orderConfigCount+"\" /></td>" +
							"<td width=\"80px\"><input type=\"text\" class=\"input-small revise\" value=\""+value.config_qty+"\" id=\"config_qty_"+orderConfigCount+"\" name=\"config_qty_"+orderConfigCount+"\" /></td>" +
							"<td width=\"200px\"><input type=\"text\" class=\"input-medium revise\" placeholder=\"客户名称...\" value=\""+value.customer+"\" id=\"customer_"+orderConfigCount+"\" name=\"customer_"+orderConfigCount+"\" /></td>" +
							"<td width=\"70px\"><input type=\"text\" class=\"input-medium revise\" placeholder=\"轮胎规格...\" value=\""+value.tire_type+"\" id=\"tire_type_"+orderConfigCount+"\" /></td>"+
							"<td width='150px'><select id='bus_vehicle_type_"+orderConfigCount+ "' class='input-medium revise'></select></td>"+
							"<td width=\"180px\"><input type=\"file\" name=\"upload\" id=\"config_file_"+orderConfigCount+"\" style=\"height: 30px;width:180px\"></td>" +
							//"<td width=\"80px\"><button disabled=\"disabled\" style=\"height:24px;width:50px;line-height:14px;padding-left:8px\" class=\"btn btn-success btn-xs\" id=\"delOrderConfigForm\">删除</button></td>" +
							"</tr>";
							$(paramHtml).appendTo("#editOrderConfig_parameters");
							getSelects_empty(vehicleTypeList, value.bus_vehicle_type, "#bus_vehicle_type_"+orderConfigCount)
							
							orderConfigCount ++ ;
						}
					}
						
				})
				$("#editModal").data("vehicleTypeList",vehicleTypeList);
				$("#editModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
	
}

function ajaxQuery(targetPage){
	$.ajax({
	    url: "order!showOrderConfigList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"search_order_no": $('#search_order_no').val(),
	    	"search_order_name": $('#search_order_name').val(),
	    	"search_productive_year": $('#search_productive_year').val(),
	    	//"search_factory": $('#search_factory').val(),
	    	"pager.pageSize":20,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableOrder tbody").html("");
    		var _columns = [
			{name:'order_no',idMerge:true},
			{name:'order_name',idMerge:true},
			{name:'order_config_name'},
			{name:'config_qty'},
			{name:'customer'},
			{name:'tire_type'},		//160428 增加轮胎规格
			{name:'bus_vehicle_type'} //160506 增加车辆型号 by xjw
			];
			var list = response.data;
			_table = document.getElementById("tableOrder");
			_table.border = "0px";
			
			var currMergeTds = [];
    		for(var i = 0; i < list.length; i++){
    			var row = document.createElement("tr");
    			for(var colIdx = 0; colIdx < _columns.length; colIdx++){
    				var col = _columns[colIdx];
    				if(col['hidGrid']){
    					continue;
    				}
    				if(col['idMerge']){
    					if(i > 0 && typeof(currMergeTds[colIdx])!='undefined'&&list[i][col['name']] === currMergeTds[colIdx]['value'] && list[i]['order_no'] == list[i-1]['order_no']){
    						currMergeTds[colIdx]['cell'].setAttribute('rowspan', ++currMergeTds[colIdx]['cell_count']);
    					}else{
    						var cell = document.createElement("TD");
    						cell.setAttribute('rowspan',1);
    						cell.innerHTML = list[i][col['name']];
    						if(col['name'] == 'order_name') cell.innerHTML += list[i]["bus_type"] +" " + list[i]["order_qty"] + '台';
    						var mergeTd = {};
    						mergeTd['value'] = list[i][col['name']];
    						mergeTd['cell'] = cell;
    						mergeTd['cell_count'] = 1;
    						currMergeTds[colIdx] = mergeTd;
    						row.appendChild(cell);
    					}
    				}else{
    					var cell = document.createElement("TD");
    					cell.innerHTML = list[i][col['name']];
    					row.appendChild(cell);
    				}
    			}
    			if(list[i]['config_file'] == ''){
    				var cell = document.createElement("TD");
    				cell.innerHTML = " ";
    				row.appendChild(cell);
    			}else{
    				var cell = document.createElement("TD");
    				cell.innerHTML = "<a target = 'blank' href = 'images/upload/orderConfig/" + list[i]['config_file']+ "'>查看</a>";
    				row.appendChild(cell);
    			}
    			var cell = document.createElement("TD");
				cell.innerHTML = "<button onclick =\"ajaxEdit(" + list[i]['o_id'] + "," + list[i]['issed_qty']+",'"+list[i]['bus_type']+ "');\" class='btn-link'>编辑</>";
				row.appendChild(cell);
    			
    			$("#tableOrder tbody").append(row);
    		}	    		
    		
    		
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();
	    	
	    }
	});
}