$(document).ready(function () {
	initPage();
	function initPage(){
		pageSize=10;
		getFactorySelect();
		var busType=$("#search_bus_type :selected").text()=="请选择"?"":$("#search_bus_type :selected").text();
		var factoryId=$("#search_factory").val();
		//getOrderNoSelect("#search_order_no","#orderId", null,busType,factoryId);
		//getOrderNoSelect("#new_order_no","#orderId",null,null,$("#new_factory").val());
		getBusTypeSelect("#search_bus_type", "", "empty");
		$("#bus_info").addClass("in");
	}
	$("#search_factory,#search_bus_type").live("change",function(){
		/*$("#search_order_no").parent("td").find("ul").remove();*/
		$("#search_order_no").val("");
		var busType=$("#search_bus_type :selected").text()=="请选择"?"":$("#search_bus_type :selected").text();
		var factory=$("#search_factory :selected").text()=="全部"?"":$("#search_factory :selected").text();
		var orderList=new Array();
		$.ajax({
			url: "common!getOrderFuzzySelect.action",
			dataType: "json",
			async:false,
			data: {
				"conditionMap.busType" : busType,
				"conditionMap.orderNo" : $("#search_order_no").val(),
				"conditionMap.factory":factory
				},
			async: false,
			error: function () {alertError();},
			success: function (response) {
				orderList=response;
			}
		});
		
		$("#search_order_no").attr("data-source",JSON.stringify(orderList));		
	});
	$("#new_factory").live("change",function(){
		/*$("#search_order_no").parent("td").find("ul").remove();*/
		$("#new_order_no").val("");
		
		var factory=$("#new_factory :selected").text()=="全部"?"":$("#new_factory :selected").text();
		var orderList=new Array();
		$.ajax({
			url: "common!getOrderFuzzySelect.action",
			dataType: "json",
			async:false,
			data: {
				"conditionMap.busType" : "",
				"conditionMap.orderNo" : $("#search_order_no").val(),
				"conditionMap.factory":factory
				},
			async: false,
			error: function () {alertError();},
			success: function (response) {
				orderList=response;
			}
		});
		
		$("#new_order_no").attr("data-source",JSON.stringify(orderList));		
	});
	
	$("#search_order_no").typeahead({
		source : function(input,process){
			//alert($("#search_order_no").attr("data-source"));
			var results = new Array();
			$.each(JSON.parse($("#search_order_no").attr("data-source")), function(index, value) {
				results.push(value.orderNo);
			})
			return results;
		},
		items : 30,
		highlighter : function(item) {
			var order_name = "";
			var bus_type = "";
			var order_qty = "";
			$.each( JSON.parse($("#search_order_no").attr("data-source")), function(index, value) {
				//alert(value.orderNo);
				if (value.orderNo == item) {
					order_name = value.name;
					bus_type = value.busType;
					order_qty = value.orderQty + "台";
				}
			})
			return item + "  " + order_name + " " + bus_type + order_qty;
		},
		matcher : function(item) {
			// alert(this.query);
			return true;
		},
		updater : function(item) {
			$.each(JSON.parse($("#search_order_no").attr("data-source")), function(index, value) {
				if (value.orderNo == item) {
					selectId = value.id;
				}
			})
			// alert(submitId);
			$("#search_order_no").attr("order_id", selectId);
			return item;
		}
	});
	$("#new_order_no").typeahead({
		source : function(input,process){
			//alert($("#new_order_no").attr("data-source"));
			var results = new Array();
			$.each(JSON.parse($("#new_order_no").attr("data-source")), function(index, value) {
				results.push(value.orderNo);
			})
			return results;
		},
		items : 30,
		highlighter : function(item) {
			var order_name = "";
			var bus_type = "";
			var order_qty = "";
			$.each( JSON.parse($("#new_order_no").attr("data-source")), function(index, value) {
				//alert(value.orderNo);
				if (value.orderNo == item) {
					order_name = value.name;
					bus_type = value.busType;
					order_qty = value.orderQty + "台";
				}
			})
			return item + "  " + order_name + " " + bus_type + order_qty;
		},
		matcher : function(item) {
			// alert(this.query);
			return true;
		},
		updater : function(item) {
			$.each(JSON.parse($("#new_order_no").attr("data-source")), function(index, value) {
				if (value.orderNo == item) {
					selectId = value.id;
				}
			})
			// alert(submitId);
			$("#new_order_no").attr("order_id", selectId);
			return item;
		}
	});
	
	$("#btnQuery").click (function () {
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
	if($("#edit_batteryCapacity").val().trim().length==0){
		alert('请输入电池容量！');
		return false;
	}else if(isNaN(parseFloat($("#edit_batteryCapacity").val()))){
		alert('电池容量只能为数字！');
		return false;
	}
	var conditions={};
	conditions.factory_id=$("#edit_factory").val(),
	conditions.order_no=$("#edit_order_no").val(),
	conditions.all_bus="0",
	conditions.bus_number=$("#edit_bus_number").val(),
	conditions.battery_capacity=$("#edit_batteryCapacity").val()
	$.ajax({
		url: "production!editBusInfo.action",
		dataType: "json",
		data: {
			"conditions":JSON.stringify(conditions)
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

function ajaxEdit(factory_id,bus_number,order_no,battery_capacity){
	//alert("-->" + bus_number + order_no);
	$("#edit_factory").val(factory_id);
	$("#edit_order_no").val(order_no);
	$("#edit_bus_number").val(bus_number);
	$("#edit_batteryCapacity").val(battery_capacity=="undefined"?"":battery_capacity);
	$("#editModal").modal("show");
}

function ajaxAdd (argument) {
		//数据验证
		if($("#new_factory").val() == '' || $("#new_order_no").val() == '' || $("#new_batteryCapacity").val() == ''){
			alert('请输入完整数据！');
			return false;
		}
		var new_all_bus = "0";
		if($("#new_all_bus").attr("checked")=="checked"){
			new_all_bus = "1";
		}else{
			new_all_bus = "0";
		}
		var conditions={};
		conditions.factory_id=$("#new_factory").val(),
		conditions.order_no=$("#new_order_no").val(),
		conditions.all_bus=new_all_bus,
		conditions.bus_number=$("#new_bus_number").val(),
		conditions.battery_capacity=$("#new_batteryCapacity").val()
		$.ajax({
			type: "get",
			dataType: "json",
			url: "production!editBusInfo.action",
		    data: {
				"conditions":JSON.stringify(conditions)
			},
			async: false,
		    success:function (response) {
		    	if (response.success) {
		    		alert("操作成功！");
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
	    url: "production!getBusList.action",
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
    		$("#tableBus tbody").html("");
    		$.each(response.dataList,function (index,value) {
    			var tr = $("<tr id= '"+value.id+"'/>");
    		/*	$("<td style=\"text-align:center;padding:3px\" />").html(index+1).appendTo(tr);*/
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_no+'辆').appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_type_code).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.battery_capacity).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html("<button onclick = 'ajaxEdit(\"" + value.factory_id +
    					"\",\"" + value.bus_number + "\",\"" + value.order_no.split("\n")[0] + "\",\"" +
    					value.battery_capacity + "\");' class='btn-link'>编辑</>").appendTo(tr);
    			$("#tableBus tbody").append(tr);	    			
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
