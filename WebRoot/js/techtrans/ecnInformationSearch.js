var pageSize =20;
var timeConfigCount = 0;
$(document).ready(function () {	
	initPage();
	function initPage(){
		$("#taskFollow").show();
		$("#carFollow").hide();
		//getFactorySelect();
		getAuthorityFactorySelect("#search_factory", "", "");
		getWorkshopSelect_Auth("#search_workshop", null, $("#search_factory :selected").text(), "")
		//getWorkshopSelect_Key("#search_workshop", "");
		//$("#taskstatus").val("0");
		getOrderNoSelect("#order_no","#orderId");
		ajaxQuery();
	};
	
	// 工厂切换事件
	$("#search_factory").change(function() {
		var selectFactory = $("#search_factory :selected").text();
		getWorkshopSelect_Auth("#search_workshop", null, selectFactory, "");
	});
	
	/**
	 * tab选项卡切换
	 */
	$("#taskFollowing").live("click",function () {
		$("#taskFollow").show();
		$("#carFollow").hide();
		return false;
	});
	/**
	 * tab选项卡切换
	 */
	$("#carFollowing").live("click",function () {
		$("#taskFollow").hide();
		$("#carFollow").show();
		return false;
	});
	
	//技改信息查询
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	//车辆技改信息查询
	$("#btnQuerySingleTask").click (function () {
		if($("#busno").val()==""){
			alert("请输入完整的车号信息！");
			return false;
		}
		singlebusnoQuery();
		return false;
	});
	
	//车辆技改信息查询
	$("#btn_single_bus_num_query_view").click (function () {
		var order_id = $("#selectBusNumber_orderId_view").val();
		var factory_id = $("#selectBusNumber_factoryId_view").val();
		var workshop = $("#selectBusNumber_workshop_view").val();
		var task_id = $("#selectBusNumber_taskId_view").val();
		var bus_num_s = $("#bus_num_start_view").val();
		var bus_num_e = $("#bus_num_end_view").val();
		var switch_mode = $("#selectBusNumber_switch_mode_view").val();
		var ecn_number = $("#selectBusNumber_ecnNumber_view").val();
		var status = $("#selectBusNumber_status_view").val();
		getTaskAllSelectedBusNum(order_id,factory_id,task_id,switch_mode,status,bus_num_s,bus_num_e);
	});
	
});

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
 *  thw
 *  技改任务信息查询
 */
function ajaxQuery(targetPage){
	var factoryAll="";
	$("#search_factory option").each(function(){
		factoryAll+=$(this).val()+",";
	});
	factoryAll=factoryAll.substr(0,factoryAll.length-1);
	var factory=$("#search_factory :selected").val()==""?factoryAll:$("#search_factory :selected").val();
	
	var workshopAll="";
	$("#search_workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	workshopAll=workshopAll.substr(0,workshopAll.length-1);
	//alert(workshopAll);
	var workshop=$("#search_workshop :selected").text()=="全部"?workshopAll:$("#search_workshop :selected").text();
	
	$.ajax({
	    url: "ecnDocumentTask!querySingleTasklist.action",
	    dataType: "json",
		type: "post",
	    data: {
	    	"task_content": $('#task_content').val(),
	    	"ecnnumber": $('#ecnnumber').val(),
	    	"order_no": $('#order_no').val(),
	    	"search_factory": $('#search_factory').val(),
	    	"search_workshop": workshop,
	    	"taskstatus": $('#taskstatus').val(),
	    	"pager.pageSize":pageSize||20,
			"pager.curPage":targetPage || 1
	    },
	    error : function(response) {
		/*	alert(response.message)*/
		},
	    success:function(response){
    		$("#tableTaskFollow tbody").html("");
    		var last_ecn_id = "";//最近技改单ID
    		var ecn_id = "";
    		var ecn_index = 0;
    		
    		var ecn_document_date_id = "";
    		var ecn_document_date_id_index = 0;
    		
    		var last_ecn_task_id = ""; //最近技改任务ID
    		var last_task_number_id = "";
      		var ecn_task_id = "";
    		var ecn_task_id_index = 0;
    		
    		var task_content_id ="";
    		var task_content_id_index = 0;
    		
    		var last_order_id = ""; //最近订单ID
    		var order_id = "";
    		var order_id_index = 0;
    		
    		var switch_mode_id = "";
    		var switch_mode_id_index = 0;
    		$.each(response.data,function(index,value){
    			var tr=$("<tr />");
    			
				// 技改单
				if (value.ecn_id == last_ecn_id) {
					var noderowspan = parseInt($(ecn_id).attr(
							"rowspan"));
					$(ecn_id).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='ecn_" + ecn_index
									+ "' rowspan='1' " + "/>").html(
							value.ecn_document_number).appendTo(tr);
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
				if (value.ecn_id == last_ecn_id && value.task_number == last_task_number_id) {
					var noderowspan = parseInt($(ecn_task_id).attr(
							"rowspan"));
					$(ecn_task_id).attr("rowspan", noderowspan + 1);
				} else {
					var url="ecnDocumentTask!ecnWorkTimeInfoPage.action?taskid="+value.ecn_task_id+
					"&configStr="+value.already+"&configStr1="+value.total_hours+"";
					$("<td id='ecn_task_" + ecn_task_id_index + "' rowspan='1' " + "/>")
						.html("<a href=\"javascript:void(window.open('"+url+"','newwindow','width=700;height=600;top=150,left=280'))\" " +
						"style='cusor:pointer'>"+"任务："+
							value.task_number+"</a>").appendTo(tr);
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
    			
    			$("<td />").html(value.factory_name).appendTo(tr);
    			$("<td />").html(value.key_name).appendTo(tr);
    			$("<td />").html(value.unit_time).appendTo(tr);
    			$("<td />").html(value.ecn_number).appendTo(tr);
    			/*$("<td />").html(value.dispatch_number).appendTo(tr);*/
    			$("<td />").html(value.already).appendTo(tr);
    			$("<td />").html(value.noalready).appendTo(tr);
    			$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='getTaskAllSelectedBusNum("+value.order_id+","+value.factory_id+","+value.ecn_task_id+","+value.switch_mode+",null,null,\""+value.key_name+"\")'></i>").appendTo(tr);
    			if(value.photo=='0'){
    				$("<td />").html("未上传").appendTo(tr);
    			}else if(value.photo=='1'){
    				$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='picupquery("+value.ecn_task_id+")'></i>").appendTo(tr);
    			}
      			if(value.taskstatus=='0'){
    				$("<td />").html("未完成").appendTo(tr);
    			}else if(value.taskstatus=='1'){
    				$("<td />").html("已完成").appendTo(tr);
    			}
    			$("#tableTaskFollow tbody").append(tr);
    			
	    		last_ecn_id = value.ecn_id;
	    		last_ecn_task_id = value.ecn_task_id;
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
 * 查看技改任务所有已分配车号信息
 * @param order_id
 * @param factoryid
 * @param taskid
 * @param switch_mode
 * @param bus_num_start
 * @param bus_num_end
 */
function getTaskAllSelectedBusNum(order_id,factoryid,taskid,switch_mode,bus_num_start,bus_num_end,workshop){
	$("#selectBusNumber_orderId_view").val(order_id);
	$("#selectBusNumber_factoryId_view").val(factoryid);
	$("#selectBusNumber_workshop_view").val(workshop);
	$("#selectBusNumber_taskId_view").val(taskid);
	$("#selectBusNumber_switch_mode_view").val(switch_mode);
	var bus_num_start = $("#bus_num_start_view").val()||'';
	var bus_num_end = $("#bus_num_end_view").val()||'';
	if(switch_mode=='0'){
		ajaxShowBusNumber(factoryid,order_id,taskid,bus_num_start,bus_num_end,workshop);
	}else{
		querydph(factoryid,taskid,order_id,switch_mode,bus_num_start,bus_num_end,workshop);
	}
}

/**
 * 根据订单查询车号信息
 * @param order_id
 * @param ecn_task_id
 * @param bus_num_s
 * @param bus_num_e
 * @param workshop
 */
function ajaxShowBusNumber(factoryid,order_id,ecn_task_id,bus_num_s,bus_num_e,workshop){
	$.ajax({
		url: "ecnDocumentTask!getEcnTaskBusNumber.action",
		dataType: "json",
		type: "get",
		data: {
				"factory_id":factoryid,
				"workshop":workshop,
				"order_id" : order_id,
				"ecn_task_id" : ecn_task_id,
				"bus_num_start" : bus_num_s||'',
				"bus_num_end" : bus_num_e||''
		},
		async: false,
		error: function () {alert(response.message);},
		success: function (response) {
			if(response.success){
				$("#selectBusNumber_table_view tbody").html("");
	    		$.each(response.data,function (index,value) {
	    			var tr = $("<tr />");
	    			$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.process_name).appendTo(tr);
	       			$("<td style=\"text-align:center;\" />").html(value.user_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.confirmor_date).appendTo(tr);
	    			$("#selectBusNumber_table_view tbody").append(tr);
	    			
	    		});
				$("#selectBusNumberModal_view").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}
/**
 * 查询立即切换已分配车号详情
 * @param factoryid
 * @param taskid
 * @param switch_mode
 * @param bus_num_start
 * @param bus_num_end
 */
function querydph(factoryid,taskid,order_id,switch_mode,bus_num_start,bus_num_end,workshop){
	$.ajax({
		url: "ecnDocumentTask!querydphlist.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id":factoryid,
	    	"workshop":workshop,
	    	"ecn_task_id":taskid,
	    	"order_id":order_id,
	    	"ecn_switch_mode":switch_mode,
			"bus_num_start" : bus_num_start,
			"bus_num_end" : bus_num_end,
			"status":status
	    },
		error : function(response) {
			alert(response.message)
		},
	    success:function(response){
	    	$("#selectBusNumber_table_view tbody").html("");
	    	$.each(response.data,function(index, value){
	    		var tr=$("<tr />");
	    		$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.process_name).appendTo(tr);
       			$("<td style=\"text-align:center;\" />").html(value.user_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.confirmor_date).appendTo(tr);
    			$("#selectBusNumber_table_view tbody").append(tr);
			});
    		$("#selectBusNumberModal_view").modal("show");
	    }
	});
}

//查询技改任务图片
function picupquery(taskid){
	$.ajax({
	    url: "ecnDocumentTask!queryTaskPicView.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"taskid":taskid,
	    },
	    success:function(response){
    		$.each(response.data,function(index,value){
    			$("#img4").attr("src",value.old_photo) ;
    			$("#img5").attr("src",value.new_photo) ;
    		});	
    		$("#taskPicUpLoadQueryModal").modal("show");
	    }
	});
}

/**
 * 单车跟进，根据输入的车号查询出此车号下所有技改任务信息
 */
function singlebusnoQuery(){
	$.ajax({
	    url: "ecnDocumentTask!querySingleCarNolist.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"busno": $('#busno').val(),
	    },
	    error : function(response) {
			alert(response.message)
		},
	    success:function(response){
    		$("#singledphFollow tbody").html("");
    		$.each(response.data,function(index,value){
    			var tr=$("<tr />");
    			$("<td />").html(index+1).appendTo(tr);
    			$("<td />").html(value.task_content).appendTo(tr);
    			if(value.bus_status == '1'){
    				$("<td />").html("OK").appendTo(tr);
    			}else{
    				$("<td />").html("NG").appendTo(tr);
    			}
    			$("<td />").html(value.username).appendTo(tr);
    			$("<td />").html(value.confirmor_date).appendTo(tr);
    			$("<td />").html(value.ecn_document_number).appendTo(tr);
    			$("<td />").html(value.factory_name).appendTo(tr);
    			$("<td />").html(value.workshop).appendTo(tr);
    			if(value.switch_mode == '0'){
    				$("<td />").html("全部切换").appendTo(tr);
    			}else{
    				$("<td />").html("立即切换").appendTo(tr);
    			}
    			
    			$("<td />").html(value.ecn_number).appendTo(tr);
/*    			var already = 0;
    			if(value.already !=null){
    				already = value.already;
    			}
    			$("<td />").html(already).appendTo(tr);
    			$("<td />").html(value.ecn_number-already).appendTo(tr);*/
    			$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='getBusNum("+value.ecn_order_id+","+value.ecn_factory_id+","+value.id+","+value.switch_mode+",\""+value.workshop+"\")'></i>").appendTo(tr);
    			$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='picupquery("+value.id+")'></i>").appendTo(tr);
    			tr.data("factory_id",value.ecn_factory_id);
    			tr.data("task_id",value.id);
    			tr.data("order_id",value.ecn_order_id);
    			tr.data("ecn_number",value.ecn_number);
    			tr.data("task_detail_id",value.task_detail_id);
    			$("#singledphFollow tbody").append(tr);
    		});	
	    }
	});
}

/**
 * 查看技改任务所有已分配车号信息
 * @param order_id
 * @param factoryid
 * @param taskid
 * @param switch_mode
 * @param bus_num_start
 * @param bus_num_end
 */
function getBusNum(order_id,factoryid,taskid,switch_mode,workshop){
	$("#selectBusNumber_orderId_view").val(order_id);
	$("#selectBusNumber_factoryId_view").val(factoryid);
	$("#selectBusNumber_workshop_view").val(workshop);
	$("#selectBusNumber_taskId_view").val(taskid);
	$("#selectBusNumber_switch_mode_view").val(switch_mode);
	var bus_num_start = $("#bus_num_start_view").val()||'';
	var bus_num_end = $("#bus_num_end_view").val()||'';
	if(switch_mode=='0'){
		ajaxShowBusNumber(factoryid,order_id,taskid,bus_num_start,bus_num_end,workshop);
	}else{
		querydph(factoryid,taskid,order_id,switch_mode,bus_num_start,bus_num_end,workshop);
	}
}

