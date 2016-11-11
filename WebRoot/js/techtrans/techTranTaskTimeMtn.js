var pageSize = 20;
$(document).ready(function () {	
	initPage();
	function initPage(){
		//alert(accAdd(Number("0.7"),Number("0.2")));
		//$("#status").val("0");
		getKeysSelect("ECN_TYPE", 'DCN设计变更', "#search_ecn_type","noall");
		//getFactorySelect();
		getAuthorityFactorySelect("#search_factory", "", "noall");
		//getWorkshopSelect_Auth("#search_workshop", null, $("#search_factory :selected").text(), "")
		//getWorkshopSelect_Key("#search_workshop", "");
		getOrderNoSelect("#order_no","#orderId");
		
		ajaxQuery(1);
	};

	/**
	 * 工时分配输入框校验，工时汇总
	 */
	$(".unit_time").live("input",function(){
		if(!const_float_validate.test($(this).val())){		
			alert("单车工时只能为数字！");
			$(this).val("");
		}else{
			var total_hours=0;
			var techTimeConfig_parameters=$("#techTimeConfig_parameters").find("tr");
			$.each(techTimeConfig_parameters,function(index,param){
				var unit_time = $(param).children("td").eq(1).find("input").val();
				total_hours=numAdd(total_hours,Number(unit_time))
			})
			$("#config_totalhour").html(total_hours+"H");
		}
	});
	// 工厂切换事件
/*	$("#search_factory").change(function() {
		var selectFactory = $("#search_factory :selected").text();
		getWorkshopSelect_Auth("#search_workshop", null, selectFactory, "");
	});*/
	
	/**
	 * 技改任务分配，首页查询
	 */
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	/**
	 * 技改工时分配，保存
	 */
	$("#btnConfigConfirm").click (function () {
		
		 techTimeConfig();
		 return false;
	});
    
	
	//车号选择页面，车号查询按钮
	$("#btn_select_bus_num_query").click (function () {
		var factory_id = $("#selectBusNumber_factoryId").val();
		var task_id = $("#selectBusNumber_taskId").val();
		var ecn_number = $("#selectBusNumber_ecnNumber").val();
		var order_id = $("#selectBusNumber_orderId").val();
		var bus_num_s = $("#bus_num_start").val();
		var bus_num_e = $("#bus_num_end").val();
		ajaxSelectBusNumber(order_id,factory_id,task_id,ecn_number,bus_num_s,bus_num_e);
	});
	
	//切换方式为立即切换，已分配车号页面
	$("#btn_dph_bus_num_query").click (function () {
		var factoryid = $("#dphBusNumber_factoryId").val();
		var taskid = $("#dphBusNumber_taskId").val();
		var switch_mode = $("#dphBusNumber_switch_mode").val();
		var bus_num_s = $("#dph_bus_num_start").val();
		var bus_num_e = $("#dph_bus_num_end").val();
		querydph(factoryid,taskid,switch_mode,bus_num_s,bus_num_e);
	});
	//切换方式为全部切换，已分配车号页面
	$("#btn_order_bus_num_query").click (function () {
		var order_id = $("#orderBusNumber_order_id").val();
		var bus_num_s = $("#order_bus_num_start").val();
		var bus_num_e = $("#order_bus_num_end").val();
		var task_id = $("#orderBusNumber_task_id").val();
		ajaxShowBusNumber(order_id,task_id,bus_num_s,bus_num_e);
	});

});

/**
 * 首页查询工厂查询条件，下拉框值初始化
 */
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
			select_str = "<select name='' id='factory_id1' class='input-small'>";
			$.each(response, function(index, value){
				select_str += "<option value=" + value.id + ">" + value.name + "</option>";
			});
			select_str += "</select>";
		}
	});
}

/**
 * 技改任务分配，首页查询
 */
function ajaxQuery(targetPage){
	$.ajax({
	    url: "ecnDocumentTask!showEchTaskList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"ecn_document_number": $('#ecn_document_number').val(),
	    	"order_no": $('#order_no').val(),
	    	"search_factory": $('#search_factory').val(),
	    	"status": $('#status').val(),
	    	"ecn_type":$("#search_ecn_type").val(),
	    	/*"search_workshop": $('#search_workshop :selected').text(),*/
	    	"start_date":$('#startDate').val(),
	    	"end_date":$('#endDate').val(),
	    	"pager.pageSize":pageSize||10,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){
    		$("#tableEcnDocument tbody").html("");
    		
    		var last_ecn_id = "";//最近技改单ID
    		var ecn_id = "";
    		var ecn_index = 0;
    		
    		var ecn_document_date_id = "";
    		var ecn_document_date_id_index = 0;
    		
    		var last_ecn_task_id = ""; //最近技改任务ID
      		var ecn_task_id = "";
    		var ecn_task_id_index = 0;
    		
    		var task_content_id ="";
    		var task_content_id_index = 0;
    		
    		var last_order_id = ""; //最近订单ID
    		var order_id = "";
    		var order_id_index = 0;
    		
    		var last_task_number_id = ""; //最近订单ID
    		
    		var switch_mode_id = "";
    		var switch_mode_id_index = 0;
    		
    		$.each(response.data,function(index,value){
    			var tr=$("<tr />");
    			
    			// 技改单  $("<td />").html(value.ecn_document_number).appendTo(tr);
				if (value.ecn_id == last_ecn_id) {
					var noderowspan = parseInt($(ecn_id).attr(
							"rowspan"));
					$(ecn_id).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='ecn_" + ecn_index
									+ "' rowspan='1' " + "/>").html(
							value.ECN_Document_Number).appendTo(tr);
					ecn_id = "#ecn_" + ecn_index;
					ecn_index += 1;
				}
				// 下单日期
				if (value.ecn_id == last_ecn_id) {
					var noderowspan = parseInt($(ecn_document_date_id).attr(
							"rowspan"));
					$(ecn_document_date_id).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='ecn_document_date_" + ecn_document_date_id_index
									+ "' rowspan='1' " + "/>").html(
							value.ecn_document_date).appendTo(tr);
					ecn_document_date_id = "#ecn_document_date_" + ecn_document_date_id_index;
					ecn_document_date_id_index += 1;
				}
    			//$("<td />").html(value.ecn_document_date).appendTo(tr);
				//技改任务号
				//alert("上ecnid"+last_ecn_id+"  任务号："+last_task_number_id);
				if (value.ecn_id == last_ecn_id && value.task_number == last_task_number_id) {
					var noderowspan = parseInt($(ecn_task_id).attr(
							"rowspan"));
					$(ecn_task_id).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='ecn_task_" + ecn_task_id_index
									+ "' rowspan='1' " + "/>").html("任务："+
							value.task_number).appendTo(tr);
					ecn_task_id = "#ecn_task_" + ecn_task_id_index;
					ecn_task_id_index += 1;
				}
    			//$("<td />").html("任务："+value.task_number).appendTo(tr);
    			
				//技改内容
				if (value.ecn_id == last_ecn_id && value.task_number == last_task_number_id) {
					var noderowspan = parseInt($(task_content_id).attr(
							"rowspan"));
					$(task_content_id).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='task_content_" + task_content_id_index
									+ "' rowspan='1' " + "/>").html(
							value.task_content).appendTo(tr);
					task_content_id = "#task_content_" + task_content_id_index;
					task_content_id_index += 1;
				}
				// $("<td />").html(value.task_content).appendTo(tr);
				
				//订单
				if (value.ecn_task_id === last_ecn_task_id && value.order_id === last_order_id) {
					var noderowspan = parseInt($(order_id).attr(
							"rowspan"));
					$(order_id).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='order_" + order_id_index
									+ "' rowspan='1' " + "/>").html(
							value.order_desc).appendTo(tr);
					order_id = "#order_" + order_id_index;
					order_id_index += 1;
				}
    			//$("<td />").html(value.order_desc).appendTo(tr);
    			
				//切换方式
				if (value.ecn_task_id === last_ecn_task_id ) {
					var noderowspan = parseInt($(switch_mode_id).attr(
							"rowspan"));
					$(switch_mode_id).attr("rowspan", noderowspan + 1);
				} else {
			    		if(value.switch_mode==0)
			    			$("<td id='switch_mode_" + switch_mode_id_index
							+ "' rowspan='1' " + "/>").html("全部切换").appendTo(tr);
			    				//$("<td />").html("全部切换").appendTo(tr);
			    			else
			    				$("<td id='switch_mode_" + switch_mode_id_index
								+ "' rowspan='1' " + "/>").html("立即切换").appendTo(tr);
			    				//$("<td />").html("立即切换").appendTo(tr);
					switch_mode_id = "#switch_mode_" + switch_mode_id_index;
					switch_mode_id_index += 1;
				}
    			
    			//$("<td />").html(value.task_number).appendTo(tr);
    			
    			$("<td />").html(value.factory_name).appendTo(tr);
    			/*$("<td />").html(value.key_name).appendTo(tr);*/
    			$("<td />").html(value.production_qty).appendTo(tr);
    			$("<td />").html(value.ecn_number).appendTo(tr);
    			
    		/*	$("<td />").html(value.countbusnum).appendTo(tr);*/
    			/*if(value.switch_mode=='0'){
    				$("<td />").html("&nbsp;").appendTo(tr);
    			}else{
    				//车号分配
    				$("<td />").html("<i name='edit' class=\"fa fa-pencil\" style=\"cursor: pointer;text-align: center;\" onclick='ajaxSelectBusNumber("+value.order_id+","+value.factoryid+","+value.taskid+","+value.ecn_number+")'></i>").appendTo(tr);
    			}
    			if(value.switch_mode=='0'){
    				$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='ajaxShowBusNumber("+value.order_id+","+value.taskid+")'></i>").appendTo(tr);
    			}else{
    				$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='querydph("+value.factoryid+","+value.taskid+","+value.switch_mode+")'></i>").appendTo(tr);
    			}*/
    			$("<td />").html(value.total_hours).appendTo(tr);
    			if(value.status!='1'){
    				$("<td  align='center'/>").html("<i name='edit' class=\"fa fa-pencil\" style=\"cursor: pointer;text-align: center;\" id='imgadd' onclick='ajaxconfig("+value.factoryid+","+value.taskid+","+(value.total_hours||0)+",\""+value.ecn_type+"\")'></i>").appendTo(tr);
    			}else{
    				$("<td />").html("&nbsp;").appendTo(tr);
    			}
    			/*    			if(value.isConfig>0){
    				$("<td  align='center'/>").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" id='imgquery' onclick='ajaxquery("+value.factoryid+","+value.taskid+")'></i>").appendTo(tr);
    			}else{
    				$("<td />").html("&nbsp;").appendTo(tr);
    			}*/
    			if(value.status=='3'){
    				$("<td />").html("已分配").appendTo(tr);
    			}else{
    				$("<td />").html("").appendTo(tr);
    			}
    			$("#tableEcnDocument tbody").append(tr);
    	 		last_ecn_id = value.ecn_id;
	    		last_ecn_task_id = value.taskid;
	    		last_order_id = value.order_id;
	    		last_task_number_id = value.task_number;
    		});	
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();	
	    }
	});
}
/**
 * 显示技改工时分配页面
 */
function ajaxconfig(factoryid,taskid,total_time,ecn_type){
	$("#time_taskid").val(taskid);
	$("#configModal").data("totalHour",total_time);
	$("#configModal").data("ecn_type",ecn_type)
	$.ajax({
		url: "ecnDocumentTask!workshoptimeinfo.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factoryId":factoryid,
	    	"taskid":taskid
	    },
		error : function(response) {
			alert(response.message)
		},
	    success:function(response){
	    	//$("#tableDepartment").after("<input type=\"hidden\" id='factoryid' value='"+factoryid+"'><input type=\"hidden\" id='taskid' value='"+taskid+"'>");
	    	//$("#tableDepartment tbody").html("<input type=\"hidden\" id='factoryid' value='"+factoryid+"'><input type=\"hidden\" id='taskid' value='"+taskid+"'>");
	    	$("#tableDepartment tbody").html("");
	    	$.each(response.data, function(index, value){
	    		var tr=$("<tr />");
	    		/*$("<td />").html(value.factory_name).appendTo(tr);*/
    			$("<td />").html(value.workshop_name).appendTo(tr);
    			var unitTimeInput=$("<input type=\"text\" class=\"unit_time\" style=\"text-align: center;\"value='"+value.unit_time+"'>");
    			$(unitTimeInput).data("unit_time",value.unit_time||0);
    			$("<td >").append(unitTimeInput).appendTo(tr);
    			$("<td />").html(value.unit).appendTo(tr);
    			tr.data("ecn_time_id", value.id);
    			tr.data("time_taskid", taskid);
    			tr.data("workshopid", value.workshopid);
    			$("#tableDepartment tbody").append(tr);
			});
	    	$("#config_totalhour").html($("#configModal").data("totalHour")+"H");
    		$("#configModal").modal("show");
	    }
	});
}
/**
 * 查看已分配技改工时信息
 */
function ajaxquery(factoryid,taskid){
	$.ajax({
		url: "ecnDocumentTask!workshoptimeinfo.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factoryId":factoryid,
	    	"taskid":taskid
	    },
		error : function(response) {
			alert(response.message)
		},
	    success:function(response){
	    	$("#tableDepartmentquery tbody").html("");
	    	$.each(response.data, function(index, value){
	    		var tr=$("<tr />");
	    		$("<td />").html(value.factory_name).appendTo(tr);
    			$("<td />").html(value.workshop_name).appendTo(tr);
    			$("<td />").html(value.unit_time).appendTo(tr);
    			$("<td />").html(value.unit).appendTo(tr);
    			$("#tableDepartmentquery tbody").append(tr);
			});
    		$("#queryModal").modal("show");
	    }
	});
}

/**
 * 技改工时分配，保存
 */
function techTimeConfig (){
	//总工时
	var time_total_time = $("#configModal").data("totalHour");
	var ecn_type=$("#configModal").data("ecn_type");
	var all_unit_time = 0;
	var time_taskid=0;
	//获取已选择车号
	var addList=[];
	var deleteList = [];
	//alert(timeConfigCount);
	var techTimeConfig_parameters=$("#techTimeConfig_parameters").find("tr");
	$.each(techTimeConfig_parameters,function(index,param){
		var unit_time = $(param).children("td").eq(1).find("input").val();
		if(unit_time.trim()!='' && unit_time != 0){
			var ecn_time_id = $(param).data('ecn_time_id');
			time_taskid= $(param).data('time_taskid');
			if(ecn_time_id!=null){
				ecn_time_id = $(param).data('ecn_time_id');
			}else{
				ecn_time_id = 0;
			}
			var time = {};
			time.ecn_time_id = ecn_time_id;
			time.time_taskid = time_taskid;
			time.workshopid = $(param).data('workshopid');
			time.unit = 'H';
			time.unit_time = unit_time;
			//all_unit_time = Number(all_unit_time)+Number(unit_time);
			all_unit_time = numAdd(Number(all_unit_time),Number(unit_time));
			addList.push(time);
		}else{
			var ecn_time_id = $(param).data('ecn_time_id');
			if(ecn_time_id!=null && ecn_time_id != 0){
				deleteList.push($(param).data('ecn_time_id'));
			}
		}
	});
	if(Number(time_total_time) !=all_unit_time&&ecn_type!="DCN设计变更"){
		alert("分配的车间技改单车总工时为："+all_unit_time+"，不等于技改任务单车总工时："+time_total_time+"！");
		return;
	}
	$.ajax({
		url: "ecnDocumentTask!taskTimeSave.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"addList":JSON.stringify(addList),
	    	"deleteList":JSON.stringify(deleteList),
	    	"unit_time_total":all_unit_time,
	    	"ecn_task_id":time_taskid
	    },
		error : function(response) {
			alert(response.message)
		},
	    success:function(response){
			$("#configModal").modal("hide");
			ajaxQuery($(".curPage").attr("page"));
			alert(response.message);
	    }
	});
}

//查询立即切换已分配车号详情
function querydph(factoryid,taskid,switch_mode,bus_num_start,bus_num_end){
	$("#dphBusNumber_factoryId").val(factoryid);
	$("#dphBusNumber_taskId").val(taskid);
	$("#dphBusNumber_switch_mode").val(switch_mode);
	$.ajax({
		url: "ecnDocumentTask!querydphlist.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id":factoryid,
	    	"ecn_task_id":taskid,
	    	"ecn_switch_mode":switch_mode,
	    	"bus_num_start":bus_num_start||'',
	    	"bus_num_end":bus_num_end||''
	    },
		error : function(response) {
			alert(response.message)
		},
	    success:function(response){
	    	$("#dphquery tbody").html("");
	    	$.each(response.data,function(index, value){
	    		var tr=$("<tr />");
	    		$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.process_name).appendTo(tr);
    			$("#dphquery tbody").append(tr);
			});
    		$("#dphModal").modal("show");
	    }
	});
}
//订单车号查询
function ajaxShowBusNumber(order_id,task_id,bus_num_s,bus_num_e){
	$("#orderBusNumber_order_id").val(order_id);
	$("#orderBusNumber_task_id").val(task_id);
	$.ajax({
		url: "ecnDocumentTask!getEcnTaskBusNumber.action",
		dataType: "json",
		data: {"order_id" : order_id,
			   "ecn_task_id" : task_id,
			   "bus_num_start" : bus_num_s||'',
			   "bus_num_end" : bus_num_e||''
		},
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
//车号选择
function ajaxSelectBusNumber(order_id,factory_id,task_id,ecn_number,bus_num_s,bus_num_e){
	$.ajax({
		url: "ecnDocumentTask!getEcnTaskBusNumber.action",
		dataType: "json",
		data: {"order_id" : order_id,
			   "ecn_task_id" : task_id,
			   "bus_num_start" : bus_num_s||'',
			   "bus_num_end" : bus_num_e||''
		},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				var allList = response.data;
				$("#selectBusNumber_factoryId").val(factory_id);
				$("#selectBusNumber_taskId").val(task_id);
				$("#selectBusNumber_ecnNumber").val(ecn_number);
				$("#selectBusNumber_orderId").val(order_id);
				$("#selectBusNumber_table tbody").html("");
				var checkedList = new Array();
				//获取已选择车号List
				$.ajax({
					url: "ecnDocumentTask!querydphlist.action",
				    dataType: "json",
					type: "get",
				    data: {
				    	"factory_id":factory_id,
				    	"ecn_task_id":task_id,
				    	"ecn_switch_mode":''
				    },
					error : function(response) {
						alert(response.message)
					},
				    success:function(response){
				    	$.each(response.data,function(index, value){
				    		checkedList[value.id] = value.bus_number;
						});
				    	var selectBusNumber_selected_number = 0;
				  		$.each(allList,function (index,value) {
			    			var tr = $("<tr />");
			    			if($.inArray(value.bus_number,checkedList)>=0){
			    				tr.data("task_detail_id", $.inArray(value.bus_number, checkedList));
			    				//$("<td />").html("已分配").appendTo(tr);
			    				//selectBusNumber_selected_number++;
			    				$("<td />").html("<input checked='checked' type=\"checkbox\">").appendTo(tr);
			    			}else{
			    				$("<td />").html("<input type=\"checkbox\">").appendTo(tr);
			    			}
			    			$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
			    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
			    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
			    			$("<td style=\"text-align:center;\" />").html(value.process_name).appendTo(tr);
			    			tr.data("bus_number", value.bus_number);
			    			
			    			$("#selectBusNumber_table tbody").append(tr);
			    			
			    		});
				  		$("#selectBusNumber_selected_number").val(selectBusNumber_selected_number);
						$("#selectBusNumberModal").modal("show");
				    	
				    }
				});
			} else {
				alert(response.message);
			}
		}
	})
}
/**
 * 车号选择保存
 */
function btn_selectBusNumberSubmit(){
	var factory_id = $("#selectBusNumber_factoryId").val();
	var task_id = $("#selectBusNumber_taskId").val();
	var ecn_number = $("#selectBusNumber_ecnNumber").val();
	var order_id = $("#selectBusNumber_orderId").val();
	var selectBusNumber_selected_number = $("#selectBusNumber_selected_number").val();
	//获取已选择车号
	var bus_number_list=[];
	var delete_bus_number_list = [];
	var cboxlist=$("#selectBusNumber_table tbody :checked");
	var allcboxlist = $("#selectBusNumber_table tbody :checkbox");
	if((Number(cboxlist.length)+Number(selectBusNumber_selected_number))<=ecn_number){
		if(confirm("此技改任务总技改台数："+ecn_number+"，已选择车号总数："+(Number(cboxlist.length)+Number(selectBusNumber_selected_number))+"，是否保存？")){
			$.each(cboxlist,function(index,cbox){
				var task_detail_id = $(cbox).closest("tr").data("task_detail_id");
				if(task_detail_id == null){
					bus_number_list.push($(cbox).closest("tr").data("bus_number"));
				}
			});
			$.each(allcboxlist,function(index,cbox){
				var task_detail_id = $(cbox).closest("tr").data("task_detail_id");
				if(task_detail_id != null && $(cbox).is(':checked')==false){
					delete_bus_number_list.push($(cbox).closest("tr").data("task_detail_id"));
				}
			});
			$.ajax({
				type : "get",
				dataType : "json",
				url : "ecnDocumentTask!taskAllotBusNumberSave.action",
				data : {
					"task_id":task_id,
					"factory_id":factory_id,
					"order_id":order_id,
					"bus_number_list" : JSON.stringify(bus_number_list),
					"delete_bus_number_list" : JSON.stringify(delete_bus_number_list)
				},
				success : function(response) {
					alert(response.message);
					ajaxQuery($(".curPage").attr("page"));
					$("#selectBusNumberModal").modal("hide");
				},
				error : function() {
					alertError();
				}

			});
		}else{
			return;
		}
	}else{
		alert("已选择车号总数："+(Number(cboxlist.length)+Number(selectBusNumber_selected_number))+"，大于此技改任务总技改台数："+ecn_number+"，无法保存！");
	}
}

//解决JS浮点数(小数)运算出现Bug的方法(http://jingyan.baidu.com/article/48b37f8d09988c1a646488e5.html)
function accAdd(arg1,arg2){
	var r1,r2,m;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	m=Math.pow(10,Math.max(r1,r2))
	return (arg1*m+arg2*m)/m
};
