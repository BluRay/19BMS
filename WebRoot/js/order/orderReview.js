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
	
	function ajaxQuery(targetPage){
		$.ajax({
		    url: "order!showOrderReviewList.action",
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
    			{name:'delivery_date'},
    			{name:'factory_name'},
    			{name:'production_qty'},
    			{name:'assembly_online_date'},
    			{name:'deliery_date'},
    			{name:'display_name'},
    			{name:'edit_date'},
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
        					//if(col['name'] == 'o_id') cell.innerHTML = "车号详情";
        					row.appendChild(cell);
        				}
        			}
        			/*var cell = document.createElement("TD");
    				cell.innerHTML = "<button onclick = 'ajaxEdit(" + list[i]['id']+ ");' class='btn-link'>编辑</>";
    				row.appendChild(cell);*/
        			if(list[i]['display_name'] == ''){
        				var cell = document.createElement("TD");
        				cell.innerHTML = " ";
        				row.appendChild(cell);
        				
        			}else{
        				var cell = document.createElement("TD");
        				cell.innerHTML = "<button onclick = 'showReview(" + list[i]['o_id']+ ");' class='btn-link'>查看</>";
        				row.appendChild(cell);
        			}
        			if(list[i]['status'] == '0'){
        				var cell = document.createElement("TD");
        				cell.innerHTML = "<button onclick = 'ajaxEdit(" + list[i]['o_id']+ ");' class='btn-link'>编辑</>";
        				row.appendChild(cell);
        			}
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

function showReview(order_id){
	//查询订单信息
	$.ajax({
		url: "order!showOrderReviewList.action",
		dataType: "json",
		data: {"order_id" : order_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				
				$.each(response.data,function(index,value){
					if(index == 0){
						//填充订单基本信息
						$("#ReviewOrderNo").val(value.order_no);
						$("#ReviewOrderDescriptive").val(value.order_name + value.bus_type + " " + value.order_qty + "台");
						$("#ReviewOrderFactory").val(value.factory_name);
						$("#ReviewOrderQty").val(value.production_qty);
						$("#Review_deliery_date").val(value.deliery_date);
						$("#Review_assembly_online_date").val(value.assembly_online_date);
						
						$("#risk_point_technics").val(value.risk_point_technics);
						$("#solutions_technics").val(value.solutions_technics);
						$(":radio[name='meet_requirements_flag_technics'][value='"+value.meet_requirements_flag_technics+"']").attr("checked","true");
						
						$("#risk_point_production").val(value.risk_point_production);
						$("#solutions_production").val(value.solutions_production);
						$(":radio[name='meet_requirements_flag__production'][value='"+value.meet_requirements_flag__production+"']").attr("checked","true");
						
						$("#risk_point_materiel").val(value.risk_point_materiel);
						$("#solutions_materiel").val(value.solutions_materiel);
						$(":radio[name='meet_requirements_flag_materiel'][value='"+value.meet_requirements_flag_materiel+"']").attr("checked","true");
						
						$("#risk_point_device").val(value.risk_point_device);
						$("#solutions_device").val(value.solutions_device);
						$(":radio[name='meet_requirements_flag_device'][value='"+value.meet_requirements_flag_device+"']").attr("checked","true");
						
						$("#risk_point_plan").val(value.risk_point_plan);
						$("#solutions_plan").val(value.solutions_plan);
						$(":radio[name='meet_requirements_flag_plan'][value='"+value.meet_requirements_flag_plan+"']").attr("checked","true");
						
						$("#Review_factory_order_id").val(value.o_id);
						$("#Review_id").val(value.id);
					}
				})
				
				$("#editModal_title").html("订单评审结果");
				$("#Review_deliery_date").attr("disabled",true); 
				$("#Review_assembly_online_date").attr("disabled",true); 				
				$("#risk_point_technics").attr("disabled",true); 
				$("#solutions_technics").attr("disabled",true); 				
				$("#risk_point_production").attr("disabled",true); 
				$("#solutions_production").attr("disabled",true); 				
				$("#risk_point_materiel").attr("disabled",true); 
				$("#solutions_materiel").attr("disabled",true); 				
				$("#risk_point_device").attr("disabled",true); 
				$("#solutions_device").attr("disabled",true); 				
				$("#risk_point_plan").attr("disabled",true); 
				$("#solutions_plan").attr("disabled",true); 				
				$("#btnReviewConfirm").hide();
				$("#editModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

function ajaxEdit(order_id){
	//查询订单信息
	$.ajax({
		url: "order!showOrderReviewList.action",
		dataType: "json",
		data: {"order_id" : order_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				
				$.each(response.data,function(index,value){
					if(index == 0){
						//填充订单基本信息
						$("#ReviewOrderNo").val(value.order_no);
						$("#ReviewOrderDescriptive").val(value.order_name + value.bus_type + " " + value.order_qty + "台");
						$("#ReviewOrderFactory").val(value.factory_name);
						$("#ReviewOrderQty").val(value.production_qty);
						$("#Review_deliery_date").val(value.deliery_date);
						$("#Review_assembly_online_date").val(value.assembly_online_date);
						
						$("#risk_point_technics").val(value.risk_point_technics);
						$("#solutions_technics").val(value.solutions_technics);
						$(":radio[name='meet_requirements_flag_technics'][value='"+value.meet_requirements_flag_technics+"']").attr("checked","true");
						
						$("#risk_point_production").val(value.risk_point_production);
						$("#solutions_production").val(value.solutions_production);
						$(":radio[name='meet_requirements_flag__production'][value='"+value.meet_requirements_flag__production+"']").attr("checked","true");
						
						$("#risk_point_materiel").val(value.risk_point_materiel);
						$("#solutions_materiel").val(value.solutions_materiel);
						$(":radio[name='meet_requirements_flag_materiel'][value='"+value.meet_requirements_flag_materiel+"']").attr("checked","true");
						
						$("#risk_point_device").val(value.risk_point_device);
						$("#solutions_device").val(value.solutions_device);
						$(":radio[name='meet_requirements_flag_device'][value='"+value.meet_requirements_flag_device+"']").attr("checked","true");
						
						$("#risk_point_plan").val(value.risk_point_plan);
						$("#solutions_plan").val(value.solutions_plan);
						$(":radio[name='meet_requirements_flag_plan'][value='"+value.meet_requirements_flag_plan+"']").attr("checked","true");
						
						$("#Review_factory_order_id").val(value.o_id);
						$("#Review_id").val(value.id);
					}
				})
				
				$("#editModal_title").html("订单评审");
				$("#Review_deliery_date").attr("disabled",false); 
				$("#Review_assembly_online_date").attr("disabled",false); 				
				$("#risk_point_technics").attr("disabled",false); 
				$("#solutions_technics").attr("disabled",false); 				
				$("#risk_point_production").attr("disabled",false); 
				$("#solutions_production").attr("disabled",false); 				
				$("#risk_point_materiel").attr("disabled",false); 
				$("#solutions_materiel").attr("disabled",false); 				
				$("#risk_point_device").attr("disabled",false); 
				$("#solutions_device").attr("disabled",false); 				
				$("#risk_point_plan").attr("disabled",false); 
				$("#solutions_plan").attr("disabled",false); 				
				$("#btnReviewConfirm").show();
				$("#editModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}