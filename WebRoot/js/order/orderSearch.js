var curTab = "1";
$(document).ready(function () {	
	initPage();	

	function initPage(){
		cur_year = new Date().getFullYear();
		$("#search_productive_year").html('<option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+cur_year+'" selected>'+cur_year+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
		var order_no=getQueryString("order_no");
		var prod_year="";
		if(order_no){
			$("#search_order_no").val(order_no);
			prod_year=order_no.substring(1,5);
			$("#search_productive_year").val(prod_year);
		}	
		getOrderNoSelect("#search_order_no","#orderId");
		getFactorySelect();
		//getAuthorityFactorySelect("#search_factory", "", "noall");
		ajaxQuery();
		
	}
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("li").live('click',function(e){
		if(this.id == "order_info"){
			curTab = "2";
			$("#order_info_div").show();
			$("#order_progress_div").hide();
			ajaxQuery();
		}else if(this.id == "order_progress"){
			/**/
			curTab = "1";
			$("#order_info_div").hide();
			$("#order_progress_div").show();
			ajaxQuery();
		}
	});
	
	$("#btn_single_bus_num_query").click(function(){
		var search_bus=$("#bus_num").val();
		//alert(search_bus);
		var trs=$("#tablebusdetail tbody").find("tr");
		$.each(trs,function(index,tr){
			var busnum=$(tr).find("td").eq(1).html();
			//alert(busnum.indexOf(search_bus));
			if(busnum.indexOf("-"+search_bus)>=0||busnum==search_bus){
				$(tr).show();
			}else{
				$(tr).hide();
			}
		});
	});
	$("#btn_bus_num_query").click(function(){
		var search_bus=$("#bus_num_modal").val();
		//alert(search_bus);
		var trs=$("#tableBusNumber tbody").find("tr");
		$.each(trs,function(index,tr){
			var busnum=$(tr).find("td").eq(1).html();
			//alert(busnum.indexOf(search_bus));
			if(busnum.indexOf("-"+search_bus)>=0||busnum==search_bus){
				$(tr).show();
			}else{
				$(tr).hide();
			}
		});
	});
})

function ajaxQuery(targetPage){
	if(curTab == "2"){
		$.ajax({
		    url: "order!showOrderConfigAllotList.action",
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
				/*{name:'bus_type'},
				{name:'order_qty'},*/
				{name:'delivery_date',idMerge:true},
				{name:'factory_name',idMerge:true},
				{name:'production_qty'},
				{name:'order_config_name'},
				{name:'product_qty'},
				{name:'seats'},
				{name:'color'},
				{name:'customer'},
				{name:'sequence'},
				{name:'car_num'},
				];
				var list = response.data;
				_table = document.getElementById("tableOrder");
				_table.border = "0px";
				
				var currMergeTds = [];
	    		for(var i = 0; i < list.length; i++){
	    			//if(list[i]['product_qty']!='0'){
	    			var row = document.createElement("tr");
	    			for(var colIdx = 0; colIdx < _columns.length; colIdx++){
	    				var col = _columns[colIdx];
	    				if(col['hidGrid']){
	    					continue;
	    				}
	    				if(col['idMerge']){
	    					if(i > 0 && typeof(currMergeTds[colIdx])!='undefined'&& list[i][col['name']] === currMergeTds[colIdx]['value'] && list[i]['order_no'] == list[i-1]['order_no']){
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
	    					if(col['name'] == 'car_num') cell.innerHTML = "<button onclick = 'ajaxShowBusNumber(" + list[i]['order_id'] + "," + list[i]['factory_id'] + ");' class='btn-link'>详情</>";
	    					row.appendChild(cell);
	    				}
	    			}
	    			var cell = document.createElement("TD");
					cell.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<button onclick = 'ajaxEdit(" + list[i]['id']+ ");' class='btn-link'>详情</>";
					row.appendChild(cell);
					
					var cell2 = document.createElement("TD");
					cell2.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<button onclick = 'showReview(" + list[i]['o_id']+ ");' class='btn-link'>查看</>";
					row.appendChild(cell2);

					var cell3 = document.createElement("TD");
					cell3.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<a target = 'blank' href = 'images/upload/orderConfig/" + list[i]['config_file']+ "'>下载</a>";
					row.appendChild(cell3);
					
	    			$("#tableOrder tbody").append(row);
	    		//}
	    		}
	    		$("#total").html(response.pager.totalCount);
	    		$("#total").attr("total",response.pager.totalCount);
	    		$("#cur").attr("page",response.pager.curPage);
	    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
	    		$("#pagination").show();
		    	
		    }
		});
	}else{
		$.ajax({
		    url: "order!getOrderProgress.action",
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
		    	$("#tableProgress tbody").html("");
		    	var last_order_no = "";var order_no = "";
		    	var zzj_offline_count = 0;
		    	var parts_online_count = 0;			var parts_offline_count = 0;
		    	var welding_online_count = 0;		var welding_offline_count = 0;
		    	var fiberglass_offline_count = 0;
		    	var painting_online_count = 0;		var painting_offline_count = 0;
		    	var chassis_online_count = 0;		var chassis_offline_count = 0;
		    	var assembly_online_count = 0;		var assembly_offline_count = 0;
		    	var warehousing_count = 0;			var dispatch_count = 0;
		    	var production_qty_count = 0;
		    	$.each(response.data,function (index,value) {
	    			var tr = $("<tr id= '"+value.id+"'/>");
	    			order_no = value.order_no;
	    			if((order_no != last_order_no)&&(index>0)){
	    				var tr2 = $("<tr id= '"+value.id+"'/>");
	    				$("<td style=\"text-align:center;\" />").html("总计").appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html("").appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html("").appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(production_qty_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(zzj_offline_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(parts_online_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(parts_offline_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(welding_online_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(welding_offline_count).appendTo(tr2);
	    				//$("<td style=\"text-align:center;\" />").html(fiberglass_offline_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(painting_online_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(painting_offline_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(chassis_online_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(chassis_offline_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(assembly_online_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(assembly_offline_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(warehousing_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html(dispatch_count).appendTo(tr2);
	    				$("<td style=\"text-align:center;\" />").html("").appendTo(tr2);
	    				$("#tableProgress tbody").append(tr2);
	    				zzj_offline_count = 0;
	    				parts_online_count = 0; 		parts_offline_count = 0;
	    				welding_online_count=0;			welding_offline_count=0;
	    				fiberglass_offline_count = 0;
	    				painting_online_count = 0;		painting_offline_count = 0;
	    				chassis_online_count = 0;		chassis_offline_count = 0;
	    				assembly_online_count = 0;		assembly_offline_count = 0;
	    				warehousing_count = 0;			dispatch_count = 0;
	    				production_qty_count = 0;
	    			}
	    			zzj_offline_count += parseInt((value.zzj_offline_count==null)?"0":value.zzj_offline_count);
	    			parts_online_count += parseInt((value.parts_online_count==null)?"0":value.parts_online_count);
	    			parts_offline_count += parseInt((value.parts_offline_count==null)?"0":value.parts_offline_count);
	    			welding_online_count += value.welding_online_count;welding_offline_count += value.welding_offline_count;
	    			//fiberglass_offline_count += value.fiberglass_offline_count;
	    			painting_online_count += value.painting_online_count;painting_offline_count += value.painting_offline_count;
	    			chassis_online_count += value.chassis_online_count;chassis_offline_count += value.chassis_offline_count;
	    			assembly_online_count += value.assembly_online_count;assembly_offline_count += value.assembly_offline_count;
	    			warehousing_count += value.warehousing_count;
	    			dispatch_count += value.dispatch_count;
	    			production_qty_count += value.production_qty;
	    			
	    			last_order_no = value.order_no;
	    			$("<td style=\"text-align:center;\" />").html(value.order_no).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.order_name+value.bus_type_code+" "+value.order_qty+"台").appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.area).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.production_qty).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html((value.zzj_offline_count==null)?"0":value.zzj_offline_count).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html((value.parts_online_count==null)?"0":value.parts_online_count).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html((value.parts_offline_count==null)?"0":value.parts_offline_count).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.welding_online_count).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.welding_offline_count).appendTo(tr);
	    			//$("<td style=\"text-align:center;\" />").html(value.fiberglass_offline_count).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.painting_online_count).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.painting_offline_count).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.chassis_online_count).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.chassis_offline_count).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.assembly_online_count).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.assembly_offline_count).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.warehousing_count).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.dispatch_count).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html("<button onclick = 'ajaxDetail(" + value.order_id +","+value.factory_id+ ");' class='btn-link'>详情</>").appendTo(tr);
	    			$("#tableProgress tbody").append(tr);
		    	})
		    	var tr2 = $("<tr/>");
				$("<td style=\"text-align:center;\" />").html("总计").appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html("").appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html("").appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(production_qty_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(zzj_offline_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(parts_online_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(parts_offline_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(welding_online_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(welding_offline_count).appendTo(tr2);
				//$("<td style=\"text-align:center;\" />").html(fiberglass_offline_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(painting_online_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(painting_offline_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(chassis_online_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(chassis_offline_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(assembly_online_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(assembly_offline_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(warehousing_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html(dispatch_count).appendTo(tr2);
				$("<td style=\"text-align:center;\" />").html("").appendTo(tr2);
				$("#tableProgress tbody").append(tr2);
				
		    	$("#total").html(response.pager.totalCount);
	    		$("#total").attr("total",response.pager.totalCount);
	    		$("#cur").attr("page",response.pager.curPage);
	    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
	    		$("#pagination").show();
			}
		})
	}
	
}

function ajaxDetail(order_id,factory_id){
	$.ajax({
		url: "order!showOrderBusDetail.action",
		dataType: "json",
		data: {"order_id" : order_id,"factory_id":factory_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$("#tablebusdetail tbody").html("");
	    		$.each(response.data,function (index,value) {
	    			var tr = $("<tr />");
	    			$("<td width=\"51px\" style=\"text-align:center;\" />").html(index+1).appendTo(tr);
	    			$("<td width=\"92px\" style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
	    			$("<td width=\"93px\" style=\"text-align:center;\" />").html(value.welding_online_date).appendTo(tr);
	    			$("<td width=\"93px\" style=\"text-align:center;\" />").html(value.welding_offline_date).appendTo(tr);
	    			$("<td width=\"93px\" style=\"text-align:center;\" />").html(value.fiberglass_offline_date).appendTo(tr);
	    			$("<td width=\"93px\" style=\"text-align:center;\" />").html(value.painting_online_date).appendTo(tr);
	    			$("<td width=\"93px\" style=\"text-align:center;\" />").html(value.painting_offline_date).appendTo(tr);
	    			$("<td width=\"93px\" style=\"text-align:center;\" />").html(value.chassis_online_date).appendTo(tr);
	    			$("<td width=\"93px\" style=\"text-align:center;\" />").html(value.chassis_offline_date).appendTo(tr);
	    			$("<td width=\"93px\" style=\"text-align:center;\" />").html(value.assembly_online_date).appendTo(tr);
	    			$("<td width=\"93px\" style=\"text-align:center;\" />").html(value.assembly_offline_date).appendTo(tr);
	    			$("<td width=\"93px\" style=\"text-align:center;\" />").html(value.warehousing_date).appendTo(tr);
	    			$("<td width=\"90px\" style=\"text-align:center;\" />").html(value.dispatch_date).appendTo(tr);
	    			$("#tablebusdetail tbody").append(tr);
	    			
	    		});
				$("#busdetailModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

function ajaxShowBusNumber(order_id , factory_id){
	$.ajax({
		url: "order!showBusNumber.action",
		dataType: "json",
		data: {"order_id" : order_id , "factory_id" : factory_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$("#tableBusNumber tbody").html("");
	    		$.each(response.data,function (index,value) {
	    			var tr = $("<tr />");
	    			$("<td style=\"text-align:center;width:50px\" />").html(index+1).appendTo(tr);
	    			$("<td style=\"text-align:center;width:150px\" />").html(value.bus_number).appendTo(tr);
	    			$("<td style=\"text-align:center;width:150px\" />").html(value.vin).appendTo(tr);
	    			$("<td style=\"text-align:center;width:70px\" />").html(value.factory_name).appendTo(tr);
	    			$("<td style=\"text-align:center;width:200px\" />").html(value.process_name).appendTo(tr);
	    			$("#tableBusNumber tbody").append(tr);
	    			
	    		});
				$("#busNumberModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

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