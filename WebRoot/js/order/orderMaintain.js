var select_str = "";
var select_str1 = "";
var select_str2 = "";
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		cur_year = new Date().getFullYear();
		$("#search_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
		$("#productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
		$("#edit_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
		getOrderNoSelect("#search_order_no","#orderId");
		getFactorySelect();
		getBusType();
		ajaxQuery();
	};
	
	$("#btnAdd").click( function (argument) {
		$("#newModal").modal("show");
		$("#newPlanAmount").focus();
	});
	
	$("#btnTest").click( function (argument) {
		var factoryOrder_parameters=$("#factoryOrder_parameters").find("tr");
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			//$(tds[1]).find("select");
			alert($(tds[2]).find("input").val());
		});
	});

	$("#editFactoryOrder").click( function (argument) {
		//alert("123");
		var paramHtml="<tr><td><button type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
		//"<td>" + select_str1 + "<option value='"+ value.factory_id + "'> "+ value.factory_name + "</option>" + select_str2 + "</td>" +
		"<td>" + select_str + "</td>" +
		"<td><input type='text' style='width:40px' class='input-small orderNum' value='0' id='production_qty2'/></td>" +
		"<td><input type='text' style='width:40px' disabled='disabled' class='input-small' placeholder='0' id='busnum_start2'/></td>" +
		"<td><input type='text' style='width:40px' disabled='disabled' class='input-small' placeholder='0' id='busnum_end2'/></td>" +
		"</tr>";
		$(paramHtml).appendTo("#edit_factoryOrder_parameters");
		
		return false;
	});
	
	$("#addFactoryOrder").click( function (argument) {
		var paramHtml="<tr><td><button type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
		"<td>" + select_str + "</td>" +
		"<td><input type='text' style='width:40px' class='input-small orderNum' value='0' id='production_qty1'/></td>" +
		"<td><input type='text' style='width:40px' disabled='disabled' class='input-small' placeholder='0' id='busnum_start1'/></td>" +
		"<td><input type='text' style='width:40px' disabled='disabled' class='input-small' placeholder='0' id='busnum_end1'/></td>" +
		"</tr>";
		$(paramHtml).appendTo("#factoryOrder_parameters");
		
		return false;
	});
	$(".close").live("click",function(e){
		$(e.target).closest("tr").remove();		
		var factoryOrder_parameters=$("#factoryOrder_parameters").find("tr");
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			$(tds[2]).find("input").val(0);
		});
		var factoryOrder_parameters=$("#edit_factoryOrder_parameters").find("tr");
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			$(tds[2]).find("input").val(0);
		});
	});
	$(".orderNum").live("keyup",function(e){
		//alert($(e.target).val());
		//更新流水号
		var maxOrderNo = 1;
		
		var factoryOrder_parameters=$("#factoryOrder_parameters").find("tr");
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			//$(tds[1]).find("select");
			//alert($(tds[2]).find("input").val());
			//maxOrderNo = $(tds[2]).find("input").val();
			$(tds[3]).find("input").val(maxOrderNo);
			$(tds[4]).find("input").val(Number(maxOrderNo) + Number($(tds[2]).find("input").val()) - 1);
			maxOrderNo = Number(maxOrderNo) + Number($(tds[2]).find("input").val());
		});
		//alert(maxOrderNo);
		var edit_factoryOrder_parameters=$("#edit_factoryOrder_parameters").find("tr");
		$.each(edit_factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			//$(tds[1]).find("select");
			//alert($(tds[2]).find("input").val());
			//maxOrderNo = $(tds[2]).find("input").val();
			$(tds[3]).find("input").val(maxOrderNo);
			$(tds[4]).find("input").val(Number(maxOrderNo) + Number($(tds[2]).find("input").val()) - 1);
			maxOrderNo = Number(maxOrderNo) + Number($(tds[2]).find("input").val());
		});
	});
	
	$("#btnAddConfirm").click (function () {
		ajaxAdd();
		return false;
	});
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#btnEditConfirm").click (function () {
		ajaxEditConfirm();
		return false;
	});
	
	function ajaxEditConfirm (argument){
		//数据验证
		var factoryOrder_parameters=$("#edit_factoryOrder_parameters").find("tr");
		var totleNum = $("#edit_order_qty").val();
		var factoryNum = 0;
		var factoryOrderNum = "";
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			//$(tds[1]).find("select");
			factoryOrderNum += $(tds[1]).find("select").val() + ":" + $(tds[2]).find("input").val() + ",";
			factoryNum += Number($(tds[2]).find("input").val());
		});
		if (factoryNum != totleNum){
			alert("产地分配数量之和与订单总数量不相等！");
			return false;
		}
		
		$.ajax({
			type: "get",
			dataType: "json",
			url: "order!editOrder.action",
		    data: {
				"data_order_id":$("#editOrderID").val(),
				"color":$("#edit_color").val(),
				"seats":$("#edit_seats").val(),
				"delivery_date":$("#edit_delivery_date").val(),
				"memo":$("#edit_memo").val(),
				"factoryOrderNum":factoryOrderNum,
				"productive_year":$("#edit_productive_year").val(),
			},
			async: false,
		    success:function (response) {
		    	if (response.success) {
		    		alert("订单数据编辑成功，请重新发布该订单今天及以后的计划！");
		    		$('#editModal').modal('hide');
		    		ajaxQuery();
		    	} else {
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
		
		
	}
	
	function ajaxAdd (argument) {
		//数据验证
		if(($("#order_name").val() == '')||($("#order_code").val() == '')||($("#order_qty").val() == '')||($("#delivery_date").val() == '')){
			alert('请输入完整订单数据！');
			return false;
		}else if(isNaN($("#order_qty").val())){
			alert('订单数量须为数字！');
			return false;
		}

		$("#btnAddConfirm").attr("disabled","disabled");
		var factoryOrder_parameters=$("#factoryOrder_parameters").find("tr");
		var totleNum = $("#order_qty").val();
		var factoryNum = 0;
		var factoryOrderNum = "";
		$.each(factoryOrder_parameters,function(index,param){
			var tds=$(param).children("td");
			//$(tds[1]).find("select");
			factoryOrderNum += $(tds[1]).find("select").val() + ":" + $(tds[2]).find("input").val() + ",";
			factoryNum += Number($(tds[2]).find("input").val());
		});
		if (factoryNum != totleNum){
			alert("产地分配数量之和与订单总数量不相等！");
			return false;
		}
		
		$.ajax({
			type: "get",
			dataType: "json",
			url: "order!addOrder.action",
		    data: {
				"data_order_name":$("#order_name").val(),
				"data_order_code":$("#order_code").val().toUpperCase(),
				"data_bus_type_id":$("#busType").val(),
				"data_order_qty":$("#order_qty").val(),
				"data_productive_year":$("#productive_year").val(),
				"color":$("#color").val(),
				"seats":$("#seats").val(),
				"delivery_date":$("#delivery_date").val(),
				"status":"0",
				"memo":$("#memo").val(),
				"factoryOrderNum":factoryOrderNum,
			},
			async: false,
		    success:function (response) {
		    	$("#btnAddConfirm").removeAttr("disabled");
		    	if (response.success) {
		    		$('#newModal').modal('hide');
		    		$("#btnAddConfirm").removeAttr("disabled");
		    		ajaxQuery();
		    	} else {
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
		
	}
	
	function getBusType(){
		$.ajax({
			url: "common!getBusType.action",
			dataType: "json",
			data: {},
			async: false,
			error: function () {alertError();},
			success: function (response) {
				if(response.success){
					options = $.templates("#tmplBusTypeSelect").render(response.data);
					$(".busType").append(options);
					
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
				getSelects_noall(response, "", "#factory_id1");
				
				select_str = "<select name='' id='factory_id1' class='input-small'>";
				select_str1 = "<select name='' id='factory_id2' class='input-small'>";
				$.each(response, function(index, value){
					select_str += "<option value=" + value.id + ">" + value.name + "</option>";
					select_str2 += "<option value=" + value.id + ">" + value.name + "</option>";
				});
				select_str += "</select>";
				select_str2 += "</select>";
				
				var paramHtml="<tr><td><button disabled=\"disabled\" type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
				"<td>" + select_str + "</td>" +
				"<td><input type='text' style='width:40px' class='input-small orderNum' value='0' id='production_qty1'/></td>" +
				"<td><input type='text' style='width:40px' disabled='disabled' class='input-small' placeholder='0' id='busnum_start1'/></td>" +
				"<td><input type='text' style='width:40px' disabled='disabled' class='input-small' placeholder='0' id='busnum_end1'/></td>" +
				"</tr>";
				$(paramHtml).appendTo("#factoryOrder_parameters");
			}
		});
	}
	
	//全选、反选
    $("#checkall").live("click",function(){
    	//alert($("#checkall").attr("checked"));
    	if($("#checkall").attr("checked")=="checked"){
    		check_All_unAll("#tableOrder",true);
    	}else{
    		check_All_unAll("#tableOrder",false);
    	}    	
    });
	
});

function ajaxQuery(targetPage){
	$.ajax({
	    url: "order!showOrderList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"search_order_no": $('#search_order_no').val(),
	    	"search_order_name": $('#search_order_name').val(),
	    	"search_productive_year": $('#search_productive_year').val(),
	    	"search_factory": $('#search_factory').val(),
	    	"pager.pageSize":10,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableOrder tbody").html("");
    		
    		var _columns = [
			{name:'order_no',idMerge:true},
			{name:'order_name',idMerge:true},
			{name:'bus_type'},
			{name:'production_qty'},
			{name:'productive_year'},
			{name:'delivery_date'},
			{name:'color'},
			{name:'seats'},
			{name:'area'},
			{name:'production_qty'},
			{name:'car_num'},
			{name:'memo'},
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
    					if(i > 0 && list[i][col['name']] === currMergeTds[colIdx]['value']){
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
    					if(col['name'] == 'car_num') cell.innerHTML = "<button onclick = 'ajaxShowBusNumber(" + list[i]['id']+ ");' class='btn-link'>车号详情</>";
    					row.appendChild(cell);
    				}
    			}
    			var cell = document.createElement("TD");
				cell.innerHTML = "<button onclick = 'ajaxEdit(" + list[i]['id'] + ',' + list[i]['issed_qty']+ ");' class='btn-link'>编辑</>";
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

function ajaxShowBusNumber(order_id){
	$.ajax({
		url: "order!showBusNumber.action",
		dataType: "json",
		data: {"order_id" : order_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$("#tableBusNumber tbody").html("");
	    		$.each(response.data,function (index,value) {
	    			var tr = $("<tr />");
	    			$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.process_name).appendTo(tr);
	    			$("#tableBusNumber tbody").append(tr);
	    			
	    		});
				$("#busNumberModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

function ajaxEdit(order_id,issed_qty){
	if(issed_qty >0){
		//alert("已发布的订单不能编辑");
		$('#btnEditConfirm').attr("disabled","disabled");
		$('#btnEditConfirm').attr("title","已发布的订单不能编辑");
	}else{

		$('#btnEditConfirm').attr("title","编辑");
		$('#btnEditConfirm').removeAttr("disabled");
	}
	//查询订单信息
	$.ajax({
		url: "order!showOrderList.action",
		dataType: "json",
		data: {"order_id" : order_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$("#edit_factoryOrder_parameters").html("");
				$.each(response.data,function(index,value){
					if(index == 0){
						//填充订单基本信息
						$("#editOrderID").val(value.id);
						$("#editOrderNo").val(value.order_no);
						$("#editOrderName").val(value.order_name);
						$("#editOrderCode").val(value.order_code);
						$("#editBusType").val(value.bus_type_id);
						$("#edit_order_qty").val(value.order_qty);
						$("#edit_order_descriptive").val(value.order_name + value.bus_type + " " + value.order_qty + "台");
						$("#edit_productive_year").val(value.productive_year);
						$("#edit_color").val(value.color);
						$("#edit_seats").val(value.seats);
						$("#edit_delivery_date").val(value.delivery_date);
						$("#edit_memo").val(value.memo);
					}
					//填充生产工厂信息
					var paramHtml="<tr><td><button type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
					//"<td>" + select_str + "</td>" +
					"<td>" + select_str1 + "<option value='"+ value.factory_id + "'> "+ value.factory_name + "</option>" + select_str2 + "</td>" +
					"<td><input type='text' style='width:40px' class='input-small orderNum' value='"+value.production_qty+"' id='production_qty2'/></td>" +
					"<td><input type='text' style='width:40px' disabled='disabled' class='input-small' placeholder='"+value.busnum_start+"' id='busnum_start2'/></td>" +
					"<td><input type='text' style='width:40px' disabled='disabled' class='input-small' placeholder='"+value.busnum_end+"' id='busnum_end2'/></td>" +
					"</tr>";
					$(paramHtml).appendTo("#edit_factoryOrder_parameters");
				})
				$("#editModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}