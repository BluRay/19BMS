var pageSize = 20;
$(document).ready(function ()
		{
			initPage();
			function initPage(){
				var d = new Date();
				var vYear = d.getFullYear();
				var vMon = d.getMonth() + 1;
				var vMonBefore= d.getMonth();
				var vDay = d.getDate();
				var h = d.getHours(); 
				var m = d.getMinutes(); 
				var se = d.getSeconds(); 
				s1=vYear+"-"+(vMon<10 ? "0" + vMonBefore : vMonBefore)+"-"+(vDay<10 ? "0"+ vDay : vDay);
				s=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay);
				$("#startDate").val(s1);
				$("#endDate").val(s);
				//获得工厂集合
				getAllFactorySelect();
				$("#selectFactory").addClass("active");
				//获得车间集合
				getAllWorkshopSelect();
				
				getCheckValue();
				
			};
			function getAllFactorySelect() {
				$.ajax({
					url : "common!getFactorySelect.action",
					dataType : "json",
					data : {},
					async : false,
					error : function(response) {
						alert(response.message);
					},
					success : function(response) {
						getSelects(response, "", "#selectFactory");
					}
				});
			}
			
			$("#selectFactory").change(function(){
				$("#selectWorkShop").empty();
				if($("#selectFactory").val() !=''){
					getAllWorkshopSelect();
				}else{
					$("#selectWorkShop").append("<option value=''>全部</option>");
				}
			});
			//查询
			$("#btnQuery").click (function () {
				ajaxQuery();
				return false;
			});
			//车辆技改信息查询
			$("#btn_single_bus_num_query_view").click (function () {
				var order_id = $("#selectBusNumber_orderId_view").val();
				var factory_id = $("#selectBusNumber_factoryId_view").val();
				var task_id = $("#selectBusNumber_taskId_view").val();
				var bus_num_s = $("#bus_num_start_view").val();
				var bus_num_e = $("#bus_num_end_view").val();
				var switch_mode = $("#selectBusNumber_switch_mode_view").val();
				var ecn_number = $("#selectBusNumber_ecnNumber_view").val();
				var status = $("#selectBusNumber_status_view").val();
				getTaskAllSelectedBusNum(order_id,factory_id,task_id,switch_mode,status,bus_num_s,bus_num_e);
			});
		}

		);

function getAllWorkshopSelect() {
	$("#selectWorkShop").empty();
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {
				factoryId:$("#selectFactory").val()
			},
		async : false,
		error : function(response) {
			alert(response.message);
		},
		success : function(response) {
			getSelects(response, "", "#selectWorkShop");
		}
	});
}
function getCheckValue()
{
	var list=document.getElementsByName("isChecks");
	for(var i=0;i<list.length;i++){
		if(list[i].checked){
			$.each($("#tableTechTransList tbody tr"),function(index,value){
				$(this).find('td').eq(i).show();
			});
			$.each($("#tableTechTransList thead tr"),function(index,value){
				$(this).find('th').eq(i).show();
			});
			//$("#tableTechTransList").find('tbody').find('tr').find('td').eq(i).show();
			//$("#tableTechTransList").find('thead').find('tr').find('th').eq(i).show();
			//$("#tableTechTransList").find('tr').find("." + list[i].value ).show();
		}else{
			$.each($("#tableTechTransList tbody tr"),function(index,value){
				$(this).find('td').eq(i).hide();
			});
			$.each($("#tableTechTransList thead tr"),function(index,value){
				$(this).find('th').eq(i).hide();
			});
			//$("#tableTechTransList").find('tbody').find('tr').find('td').eq(i).hide();
			//$("#tableTechTransList").find('thead').find('tr').find('th').eq(i).hide();
			//$("#tableTechTransList").find('tr').find("." + list[i].value ).hide();
		}
	}
}
//查询页面赋值
function ajaxQuery(targetPage){
	
	$.ajax({
	    url: "swrNotice!getTechTransList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"search_task_content": $('#search_task_content').val(),
	    	"search_order_name": $('#search_order_name').val(),
	    	"selectFactory": $('#selectFactory').val(),
	    	"selectWorkShop": $('#selectWorkShop').val(),
	    	"startDate": $('#startDate').val(),
	    	"endDate": $('#endDate').val(),
	    	"status": $('#taskstatus').val(),
	    	"pager.pageSize":pageSize||20,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){	
    		$("#tableTechTransList tbody").html("");
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
    			//$("<td />").html(value.ecn_document_number).appendTo(tr);
    			
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
    			
    			$("<td />").html(value.ecn_number).appendTo(tr);
    			$("<td />").html(value.already).appendTo(tr);
    			$("<td />").html(value.total_hours).appendTo(tr);
    			$("<td />").html(value.task_total_hours).appendTo(tr);
    			$("<td />").html(value.workshop_name).appendTo(tr);
    			$("<td />").html(value.unit_time).appendTo(tr);
    			$("<td />").html(value.workshop_total_hours).appendTo(tr);
    			if(value.noalready==0)
    				$("<td />").html("已完成").appendTo(tr);
    			else
    				$("<td />").html("未完成").appendTo(tr);
    			if(value.photo=='0'){
    				$("<td />").html("未上传").appendTo(tr);
    			}else if(value.photo=='1'){
    				$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='picupquery("+value.ecn_task_id+")'></i>").appendTo(tr);
    			}
    			
    			$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='getTaskAllSelectedBusNum("+value.order_id+","+value.factory_id+","+value.ecn_task_id+","+value.switch_mode+")'></i>").appendTo(tr);
    			
    			tr.data("id", value.ecn_task_id);
    			tr.data("factory_id", value.factory_id);
	    		$("#tableTechTransList tbody").append(tr);
	    		
	    		last_ecn_id = value.ecn_id;
	    		last_ecn_task_id = value.ecn_task_id;
	    		last_order_id = value.order_id;
	    		last_task_number_id = value.task_number;
    		});	
    		getCheckValue();
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();
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
 * 查看技改任务所有已分配车号信息
 * @param order_id
 * @param factoryid
 * @param taskid
 * @param switch_mode
 * @param bus_num_start
 * @param bus_num_end
 */
function getTaskAllSelectedBusNum(order_id,factoryid,taskid,switch_mode,bus_num_start,bus_num_end){
	$("#selectBusNumber_orderId_view").val(order_id);
	$("#selectBusNumber_factoryId_view").val(factoryid);
	$("#selectBusNumber_taskId_view").val(taskid);
	$("#selectBusNumber_switch_mode_view").val(switch_mode);
	var bus_num_start = $("#bus_num_start_view").val()||'';
	var bus_num_end = $("#bus_num_end_view").val()||'';
	if(switch_mode=='0'){
		ajaxShowBusNumber(factoryid,order_id,taskid,bus_num_start,bus_num_end);
	}else{
		querydph(factoryid,taskid,order_id,switch_mode,bus_num_start,bus_num_end);
	}
}
/**
 * 根据订单查询车号信息
 * @param order_id
 * @param ecn_task_id
 * @param bus_num_s
 * @param bus_num_e
 */
function ajaxShowBusNumber(factoryid,order_id,ecn_task_id,bus_num_s,bus_num_e){
	$.ajax({
		url: "ecnDocumentTask!getEcnTaskBusNumber.action",
		dataType: "json",
		type: "get",
		data: {
				"factory_id":factoryid,
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
function querydph(factoryid,taskid,order_id,switch_mode,bus_num_start,bus_num_end){
	$.ajax({
		url: "ecnDocumentTask!querydphlist.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id":factoryid,
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