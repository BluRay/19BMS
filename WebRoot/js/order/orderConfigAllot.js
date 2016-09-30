$(document).ready(function () {	
	initPage();
	function initPage(){
		cur_year = new Date().getFullYear();
		$("#search_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
		getFactorySelect();
		getOrderNoSelect("#search_order_no","#orderId");
		ajaxQuery();
	};
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#btnReviewConfirm").click (function () {
		ajaxReviewConfirm();
		return false;
	});
	
	$("#btnConfigConfirm").click (function () {		
		ajaxConfigConfirm();
	});
	
	
	
	function ajaxReviewConfirm (argument){
		//数据验证
		if(($("#Review_deliery_date").val() == '')||($("#Review_assembly_online_date").val() == '')){
			alert('请输入完整评审数据！');
			return false;
		}
		
		$.ajax({
			type: "get",
			dataType: "json",
			url: "order!reviewOrder.action",
		    data: {
		    	"id":$("#Review_id").val(),
				"factory_order_id":$("#Review_factory_order_id").val(),
				"deliery_date":$("#Review_deliery_date").val(),
				"assembly_online_date":$("#Review_assembly_online_date").val(),
				
				"risk_point_technics":$("#risk_point_technics").val(),
				"solutions_technics":$("#solutions_technics").val(),
				"meet_requirements_flag_technics": $('input[name="meet_requirements_flag_technics"]:checked').val(),
				
				"risk_point_production":$("#risk_point_production").val(),
				"solutions_production":$("#solutions_production").val(),
				"meet_requirements_flag_production": $('input[name="meet_requirements_flag_production"]:checked').val(),
				
				"risk_point_materiel":$("#risk_point_materiel").val(),
				"solutions_materiel":$("#solutions_materiel").val(),
				"meet_requirements_flag_materiel": $('input[name="meet_requirements_flag_materiel"]:checked').val(),
				
				"risk_point_device":$("#risk_point_device").val(),
				"solutions_device":$("#solutions_device").val(),
				"meet_requirements_flag_device": $('input[name="meet_requirements_flag_device"]:checked').val(),
				
				"risk_point_plan":$("#risk_point_plan").val(),
				"solutions_plan":$("#solutions_plan").val(),
				"meet_requirements_flag_plan": $('input[name="meet_requirements_flag_plan"]:checked').val(),
				
			},
			async: false,
		    success:function (response) {
		    	if (response.success) {
		    		$('#editModal').modal('hide');
		    		ajaxQuery();
		    	} else {
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
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
			}
		});
	}
	
});

function ajaxConfigConfirm (argument){	
	var countQty = 0;
	var configStr = "";
	var sequence=new Array();
	var editOrderConfig_parameters=$("#editOrderConfig_parameters").find("tr");
	$.each(editOrderConfig_parameters,function(index,param){
		var tds=$(param).children("td");
		if(tds.is(":visible")){
			configStr += $(tds[1]).find("input").val() + "," + $(tds[3]).find("input").val() + "," + $(tds[4]).find("input").val() + ";";
			countQty += parseInt($(tds[4]).find("input").val());
		}
		sequence[index] = $(tds[3]).find("input").val();
	});
	//判断排序是否连续
	for (i=0;i<sequence.length;i++){
		if (!(sequence.in_array((i+1)))){
			alert("生产排序从1开始且必须连续！");
			return false;
		}
	}
	//判断总生产数量必需等于工厂生产数量
	if (countQty != $("#ConfigOrderfactoryQty").val()){
		alert("配置总生产数量必需等于工厂生产数量！");
		return false;
	}
	
	var table_parameters=$("#editOrderConfig_parameters").find("tr");
	$.each(table_parameters,function(index,param){
		var tds=$(param).children("td");
		//alert($(tds[4]).find("input").val());
		if(Number($(tds[4]).find("input").val()) < Number($(tds[5]).find("input").val())){
			alert("生产数量不能小于已上线数！");
			return false;
		}
	})
	
	$("#configStr").val(configStr);
	
	$.ajax({
		type: "get",
		dataType: "json",
		url: "order!orderConfigAllot.action",
	    data: {
	    	"order_id":$("#order_id").val(),
	    	"factory_id":$("#factory_id").val(),
	    	"configStr":$("#configStr").val(),			
		},
		async: false,
	    success:function (response) {
	    	if (response.success) {
	    		$('#editModal').modal('hide');
	    		ajaxQuery();
	    	} else {
	    		alert(response.message);
	    	}
	    },
	    error:function(){alertError();}
	});
	
	return false;

}

//判断js数组包是否包含某个元素
Array.prototype.in_array = function(e) {  
	for(i=0;i<this.length && this[i]!=e;i++);  
	return !(i==this.length);  
}  

function ajaxEdit(order_id,factory_name,factory_id,production_qty){
	//alert("factory_name = " + factory_name);
	//查询订单信息
	var CheckOrder = true;
	$("#configStr").val("");
	$.ajax({
		//url: "order!showOrderReviewList.action",
		url: "order!showOrderConfigList.action",
		dataType: "json",
		data: {"order_id" : order_id,
			"factory_id" : factory_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$("#editOrderConfig_parameters").html("");
				//先判断订单是否存在配置
				$.each(response.data,function(index,value){
					if(index == 0){
						if(value.order_config_name == ""){
							alert("该订单还没有配置信息，请先进行配置！");
							CheckOrder = false;
						}else{
							//填充订单基本信息
							$("#ConfigOrderNo").val(value.order_no);
							$("#ConfigOrderfactory").val(factory_name);
							$("#ConfigOrderfactoryQty").val(production_qty);
							$("#ConfigOrderDescriptive").val(value.order_name + value.bus_type + " " + value.order_qty + "台");	
							$("#order_id").val(value.o_id);
							$("#factory_id").val(factory_id);
						}						
					}
					//填充配置项
					var paramHtml="<tr height=\"40px\">" +
							"<td width=\"40px\"></td>" +
							"<td width=\"80px\"><input type=\"text\" disabled=\"disabled\" class=\"input-small revise\" placeholder=\"配置编号...\" value=\""+value.id+"\" id=\"order_config_id_"+value.id+"\"/></td>" +
							"<td width=\"100px\"><input type=\"text\" disabled=\"disabled\" class=\"input-medium revise\" placeholder=\"配置简称...\" value=\""+value.order_config_name+"\" id=\"order_config_name_"+value.id+"\"/></td>" +
							"<td width=\"80px\"><input type=\"text\" class=\"input-small revise\" value=\""+ (index+1) +"\" id=\"config_qty_0\" /></td>" +
							"<td width=\"80px\"><input type=\"text\" class=\"input-small revise\" onclick=\"javascript:$(this).select();\" value=\""+value.allot_qty+"\" id=\"config_qty_0\" /></td>" +
							"<td width=\"80px\"><input type=\"text\" class=\"input-small revise\" onclick=\"javascript:$(this).select();\" disabled = \"disabled\" value=\""+value.online_count+"\" id=\"config_qty_0\" /></td>" +
							"</tr>";
					$(paramHtml).appendTo("#editOrderConfig_parameters");
				})
				
				if(CheckOrder) $("#editModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

function ajaxQuery(targetPage){
	$.ajax({
	    url: "order!showOrderConfigAllotList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"search_order_no": $('#search_order_no').val(),
	    	"search_order_name": $('#search_order_name').val(),
	    	"search_productive_year": $('#search_productive_year').val(),
	    	"search_factory": $('#search_factory').val(),
	    	"pager.pageSize":20,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableOrder tbody").html("");
    		
    		var _columns = [
			{name:'order_no',idMerge:true},
			{name:'order_name',idMerge:true},
			{name:'delivery_date',idMerge:true},
			{name:'factory_name',idMerge:true},
			{name:'production_qty',idMerge:true},
			{name:'order_config_name'},
			{name:'product_qty',hidGrid:true},
			{name:'sequence'},
			{name:'customer'}
			];
    		var list = response.data;
    		/*for(var i = 0; i < list.length; i++){
    			if(list[i]['product_qty']=='0'){
    				//
    			}
    		}*/
    		_table = document.getElementById("tableOrder");
    		_table.border = "0px";
    		
    		var currMergeTds = [];
    		for(var i = 0; i < list.length; i++){
    			//if(list[i]['product_qty']!='0'){
    			var row = document.createElement("tr");
    			for(var colIdx = 0; colIdx < _columns.length; colIdx++){
    				var col = _columns[colIdx];
    				/*if(col['hidGrid']){
    					
    					if(list[i][col['name']]=='0'){
    						//row.style.display = "none";
    						
    					}
    					//continue;
    				}*/
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
    			
    			//_table.appendChild(row);
    			//document.body.appendChild(_table);
    			var cell = document.createElement("TD");
				cell.innerHTML = "<button onclick = 'ajaxEdit(\"" + list[i]['order_id']+ "\",\"" + list[i]['factory_name']+ "\",\"" + list[i]['factory_id']+ "\",\"" + list[i]['production_qty']+ "\");' class='btn-link'>编辑</>";
				//$("<button onclick = 'ajaxEdit(" + value.o_id + ");' />").addClass("btn-link").html("编辑").prependTo(cell);
				row.appendChild(cell);
    			$("#tableOrder tbody").append(row);
    	//	}
    		}
    		
    		/*$("#tableOrder tbody").find('tr').find('td').each(function () {                
                if($(this).text()==0){
                	$(this).parents('tr').find('td').each(function(){
                		var r = $(this).attr("rowspan");
                		if(r==null){$(this).html("");}
                	});
                }
            });*/
    		
    		
    		
			$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();	    			
	    	
    		
	    }
	});
}