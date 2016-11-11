var pageSize = 20;
var timeConfigCount = 0;
$(document).ready(function () {	
	initPage();
	function initPage(){
		$("#taskFollow").show();
		$("#carFollow").hide();
		//getFactorySelect();
		getAuthorityFactorySelect("#search_factory", "", "noall");
		getWorkshopSelect_Auth("#search_workshop", null, $("#search_factory :selected").text(), "")
		//getWorkshopSelect_Key("#search_workshop", "");
		getOrderNoSelect("#order_no","#orderId");
		//$("#taskstatus").val("0");
		ajaxQuery(1);
	};
	// 工厂切换事件
	$("#search_factory").change(function() {
		var selectFactory = $("#search_factory :selected").text();
		getWorkshopSelect_Auth("#search_workshop", null, selectFactory, "");
	});
	
	$("#taskFollowing").live("click",function () {
		$("#taskFollow").show();
		$("#carFollow").hide();
		return false;
	});
	
	$("#carFollowing").live("click",function () {
		$("#taskFollow").hide();
		$("#carFollow").show();
		return false;
	});
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	$("#btnQuerySingleTask").click (function () {
		if($("#busno").val()==""){
			alert("请输入完整的车号信息！");
			return false;
		}
		singlebusnoQuery();
		return false;
	});
	
	//单任务跟进页面车号查询按钮
	$("#btn_single_bus_num_query").click (function () {
		var order_id = $("#selectBusNumber_orderId").val();
		var factory_id = $("#selectBusNumber_factoryId").val();
		var workshop = $("#selectBusNumber_workshop").val();
		var task_id = $("#selectBusNumber_taskId").val();
		var bus_num_s = $("#bus_num_start").val();
		var bus_num_e = $("#bus_num_end").val();
		var switch_mode = $("#selectBusNumber_switch_mode").val();
		var ecn_number = $("#selectBusNumber_ecnNumber").val();
		var status = $("#selectBusNumber_status").val();
		var ecn_id = $("#selectBusNumber_ecn_id").val();
		updatecarstate(ecn_id,order_id,factory_id,task_id,switch_mode,ecn_number,bus_num_s,bus_num_e,null,workshop);
	});
	
	//车辆技改信息查询
	$("#btn_single_bus_num_query_view").click (function () {
		var order_id = $("#selectBusNumber_orderId_view").val();
		var factory_id = $("#selectBusNumber_factoryId_view").val();
		var workshop=$("#selectBusNumber_workshop_view").val();
		var task_id = $("#selectBusNumber_taskId_view").val();
		var bus_num_s = $("#bus_num_start_view").val();
		var bus_num_e = $("#bus_num_end_view").val();
		var switch_mode = $("#selectBusNumber_switch_mode_view").val();
		var ecn_number = $("#selectBusNumber_ecnNumber_view").val();
		var status = $("#selectBusNumber_status_view").val();
		viewcarstate(order_id,factory_id,task_id,switch_mode,ecn_number,status,bus_num_s,bus_num_e,workshop);
	});
	
	//单任务跟进，结果提交
	$("#btn_selectBusNumberModal").click (function () {
		//提交表单
		updateDetailState();
		return false;
	});
	
	//单车跟进，结果提交
	$("#btnAddSingleTask").click (function () {
		updatetaskdetailForSingleFollow();
		return false;
	});
	
	
	$("#taskPicbtnAddConfirm").click (function () {
		//图片上传保存
		if($("#file0").val()==""){
			alert("原效果图不能为空！");
			return false;
		}
		
		if($("#file1").val()==""){
			alert("整改后效果图不能为空！");
			return false;
		}
		$("#picuploadform").ajaxSubmit({
			url:"ecnDocumentTask!imgload.action",
			type: "post",
			dataType:"json",
			success:function(response){
				var targetPage=$("#cur").attr("page");
				//alert(targetPage);
				$("#taskPicUpLoadModal").modal("hide");
				alert(response.message);
				ajaxQuery(targetPage);
			}			
		});
	});
	
	
	$("#file0").change(function(){
		var val= $("#file0").val();
		var k = val.substr(val.indexOf("."));
		if(k!=".BMP" && k!=".bmp" && k!=".JPG" && k!=".jpg" && k!=".JPEG" && k!=".jpeg" &&   k!=".GIF" && k!= ".gif" &&   k!=".png" && k!= ".PNG")   {
			alert("您上传的不是图片格式的文件!");
			$("#file0").val("");
			$("#img0").attr("src", "") ;
			return false;
		}
		var objUrl = getObjectURL(this.files[0]) ;
		//console.log("objUrl = "+objUrl) ;
		if (objUrl) {
			$("#img0").attr("src", objUrl) ;
		}
	}) ;
	
	
	
	$("#file1").change(function(){
		var val= $("#file1").val();
		var k = val.substr(val.indexOf("."));
		if(k!=".BMP" && k!=".bmp" && k!=".JPG" && k!=".jpg" && k!=".JPEG" && k!=".jpeg" &&   k!=".GIF" && k!= ".gif" &&   k!=".png" && k!= ".PNG")   {
			alert("您上传的不是图片格式的文件!");
			$("#file1").val("");
			$("#img1").attr("src", "") ;
			return false;
		}
		var objUrl = getObjectURL(this.files[0]) ;
		//console.log("objUrl = "+objUrl) ;
		if (objUrl) {
			$("#img1").attr("src", objUrl) ;
		}
	}) ;
	
	
	//全选、反选
    $("#checkall").live("click",function(){
    	if($("#checkall").attr("checked")=="checked"){
    		check_All_unAll("#dphtable",true);
    	}else{
    		check_All_unAll("#dphtable",false);
    	}    	
    });

	//全选、反选
	$("#checkallsinglecar").live("click",function(){
		if($("#checkallsinglecar").attr("checked")=="checked"){
			check_All_unAll("#singledphFollow",true);
		}else{
			check_All_unAll("#singledphFollow",false);
		}    	
	});
	
	/*
	 * thw 选择车号model页面的全选、反选事件
	 */
	$("#selectBusNumber_checkall").live("click",function(){
		if($("#selectBusNumber_checkall").attr("checked")=="checked"){
			check_All_unAll("#selectBusNumber_table",true);
		}else{
			check_All_unAll("#selectBusNumber_table",false);
		}    	
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
 *  单任务跟进首页查询
 */
function ajaxQuery(targetPage){
	var workshopAll="";
	$("#search_workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
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
	    	"start_date":$('#startDate').val(),
	    	"end_date":$('#endDate').val(),
	    	"pager.pageSize":pageSize||20,
			"pager.curPage":targetPage || 1
	    },
	    error : function(response) {
			alert(response.message)
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
    		
    		var ecn_file_id="";
    		
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
				// 下单日期、技改单附件
				if (value.ecn_id == last_ecn_id) {
					var noderowspan = parseInt($(ecn_document_date_id).attr(
							"rowspan"));
					$(ecn_document_date_id).attr("rowspan", noderowspan + 1);
					$(ecn_file_id).attr("rowspan", noderowspan + 1)
				} else {
					$(
						"<td id='ecn_document_date_" + ecn_document_date_id_index
									+ "' rowspan='1' " + "/>").html(
							value.ecn_document_date).appendTo(tr);
					var file_url=value.ecn_document_file==undefined?"":"<a href='file/upload/ecn/"+value.ecn_document_file+"'>查看</a>";
					$(
							"<td id='ecn_document_file_" + ecn_document_date_id_index
										+ "' rowspan='1' " + "/>").html(file_url).appendTo(tr);
					
					ecn_document_date_id = "#ecn_document_date_" + ecn_document_date_id_index;
					ecn_file_id="#ecn_document_file_" + ecn_document_date_id_index;
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

    			$("<td />").html(value.factory_name).appendTo(tr);
    			$("<td />").html(value.key_name).appendTo(tr);
    			$("<td />").html(value.ecn_number).appendTo(tr);
    		/*	$("<td />").html(value.dispatch_number).appendTo(tr);*/
    			$("<td />").html(value.already).appendTo(tr);
    			$("<td />").html(value.noalready).appendTo(tr);
    			if(value.taskstatus=='0'){
    				$("<td />").html("<i name='edit' class=\"fa fa-pencil\" style=\"cursor: pointer;text-align: center;\" onclick=\"updatecarstate('"+value.ecn_id+"','"+value.order_id+"','"+value.factory_id+"','"+value.ecn_task_id+"','"+value.switch_mode+"','"+value.ecn_number+"',null,null,'"+value.noalready+"','"+value.key_name+"')\"></i>").appendTo(tr);
    			}else if(value.taskstatus=='1'){
    				$("<td />").html("&nbsp;").appendTo(tr);
    			}
    			$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='viewcarstate("+value.order_id+","+value.factory_id+","+value.ecn_task_id+","+'1'+","+value.ecn_number+","+'1,'+"null,null,\""+value.key_name+"\")'></i>").appendTo(tr);
    			if(value.photo=='0'){
    				$("<td />").html("<i name='edit' class=\"fa fa-pencil\" style=\"cursor: pointer;text-align: center;\" onclick='picupload("+value.ecn_task_id+")'></i>").appendTo(tr);
    			}else if(value.photo=='1'){
    				$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='picupquery("+value.ecn_task_id+")'></i>").appendTo(tr);
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
 * thw
 * 单任务跟进查询-车辆状态更新页面
 * @param order_id
 * @param factory_id
 * @param task_id
 * @param switch_mode 切换方式
 * @param bus_num_s
 * @param bus_num_e
 */
function updatecarstate(ecn_id,order_id,factory_id,task_id,switch_mode,ecn_number,bus_num_s,bus_num_e,noalredy_num,workshop){
	$("#selectBusNumber_orderId").val(order_id);
	$("#selectBusNumber_factoryId").val(factory_id);
	$("#selectBusNumber_workshop").val(workshop);
	$("#selectBusNumber_taskId").val(task_id);
	$("#selectBusNumber_switch_mode").val(switch_mode);
	$("#selectBusNumber_ecnNumber").val(ecn_number);
	$("#selectBusNumber_status").val(status);
	$("#selectBusNumber_ecn_id").val(ecn_id);

	/*if(switch_mode=='0'){*/
		//全部切换
		getBusNumberByOrder(order_id,factory_id,task_id,switch_mode,ecn_number,bus_num_s,bus_num_e,noalredy_num,workshop);
	/*}else{
		//立即切换
		$.ajax({
			url: "ecnDocumentTask!querydphlist.action",
		    dataType: "json",
			type: "post",
		    data: {
		    	"factory_id":factory_id,
		    	"ecn_task_id":task_id,
		    	"order_id":order_id,
		    	"ecn_switch_mode":switch_mode,
				"bus_num_start" : bus_num_s,
				"bus_num_end" : bus_num_e
		    },
			error : function(response) {
				alert(response.message)
			},
		    success:function(response){
		    	$("#selectBusNumber_table tbody").html("");
		    	$.each(response.data,function(index, value){
	    			var tr = $("<tr />");
	    			tr.data("ecn_task_detail_id", value.id);
	    			if(value.status ==1){
	    				$("<td />").html("<input checked='checked' type=\"checkbox\">").appendTo(tr);
	    			}else{
	    				$("<td />").html("<input type=\"checkbox\">").appendTo(tr);
	    			}
	    			$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.process_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.user_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.confirmor_date).appendTo(tr);
	    			tr.data("bus_number", value.bus_number);
	    			$("#selectBusNumber_table tbody").append(tr);
				});
		    	$("#selectBusNumberModal").modal("show");
		    }
		});
	}*/
}
/**
 * 技改车辆查询
 * @param order_id
 * @param factory_id
 * @param task_id
 * @param switch_mode
 * @param ecn_number
 * @param status
 * @param bus_num_s
 * @param bus_num_e
 */
function viewcarstate(order_id,factory_id,task_id,switch_mode,ecn_number,status,bus_num_s,bus_num_e,workshop){
	$("#selectBusNumber_orderId_view").val(order_id);
	$("#selectBusNumber_factoryId_view").val(factory_id);
	$("#selectBusNumber_workshop_view").val(workshop);
	$("#selectBusNumber_taskId_view").val(task_id);
	$("#selectBusNumber_switch_mode_view").val(switch_mode);
	$("#selectBusNumber_ecnNumber_view").val(ecn_number);
	$("#selectBusNumber_status_view").val(status);
	if(status!=null && status!=''){
		status = status;
	}else{
		status = 0;
	}
	$.ajax({
		url: "ecnDocumentTask!querydphlist.action",
	    dataType: "json",
		type: "post",
	    data: {
	    	"factory_id":factory_id,
	    	"workshop":workshop,
	    	"ecn_task_id":task_id,
	    	"order_id":order_id,
	    	"ecn_switch_mode":switch_mode,
			"bus_num_start" : bus_num_s,
			"bus_num_end" : bus_num_e,
			"status":status
	    },
		error : function(response) {
			alert(response.message)
		},
	    success:function(response){
	    	$("#selectBusNumber_table_view tbody").html("");
	    	$.each(response.data,function(index, value){
    			var tr = $("<tr />");
    			tr.data("ecn_task_detail_id", value.id);
    			$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.process_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.user_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.confirmor_date).appendTo(tr);
    			tr.data("bus_number", value.bus_number);
    			$("#selectBusNumber_table_view tbody").append(tr);
			});
	    	$("#selectBusNumberModal_view").modal("show");
	    }
	});
}

/**
 * thw
 * 当切换方式为全部切换时，跳转到单任务跟进页面，车号查询方法
 * @param order_id
 * @param factory_id
 * @param task_id
 * @param switch_mode
 * @param bus_num_s
 * @param bus_num_e
 */
function getBusNumberByOrder(order_id,factory_id,task_id,switch_mode,ecn_number,bus_num_s,bus_num_e,noalready_num,workshop){
	$.ajax({
		url: "ecnDocumentTask!getEcnTaskBusNumber.action",
		dataType: "json",
		data: {"order_id" : order_id,
			   "ecn_task_id" : task_id,
			   "task_detail_status" :'0',
			   "factory_id":factory_id,
			   "workshop":workshop,
			   "bus_num_start" : bus_num_s,
			   "bus_num_end" : bus_num_e
		},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				var allList = response.data;
				$("#selectBusNumber_table tbody").html("");
		  		$.each(allList,function (index,value) {
	    			var tr = $("<tr />");
	    			if(value.status ==1){
	    				$("<td />").html("").appendTo(tr);
	    			}else
	    			$("<td />").html("<input type=\"checkbox\">").appendTo(tr);
	    			
	    			$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.process_name).appendTo(tr);
	       			$("<td style=\"text-align:center;\" />").html(value.user_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.confirmor_date).appendTo(tr);
	    			tr.data("bus_number", value.bus_number);
	    			
	    			$("#selectBusNumber_table tbody").append(tr);
	    			
	    		});
		  		$("#selectBusNumberModal").data("noalready_num",noalready_num);
				$("#selectBusNumberModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

/**
 * thw
 * 单任务跟进，提交已确认车辆
 */
function updateDetailState(){
	var factory_id = $("#selectBusNumber_factoryId").val();
	var workshop=$("#selectBusNumber_workshop").val();
	var task_id = $("#selectBusNumber_taskId").val();
	var ecn_number = $("#selectBusNumber_ecnNumber").val();
	var order_id = $("#selectBusNumber_orderId").val();
	var ecn_id = $("#selectBusNumber_ecn_id").val();
	//获取已选择车号
	var bus_number_list=[];
	var delete_bus_number_list = [];
	var cboxlist=$("#selectBusNumber_table tbody :checked");
	var allcboxlist = $("#selectBusNumber_table tbody :checkbox");
	//alert($("#selectBusNumberModal").data("noalready_num"));
	var noalready_num=parseInt($("#selectBusNumberModal").data("noalready_num"));
	if(cboxlist.length>noalready_num){
		alert("选取的车辆数不能大于未完成车辆数！");
	}
	else if(confirm("是否保存？")){
		$.each(cboxlist,function(index,cbox){
			var task_detail_id = $(cbox).closest("tr").data("ecn_task_detail_id");
			var ss = {};
			if(task_detail_id == null){
				ss.bus_number = $(cbox).closest("tr").data("bus_number");
				ss.task_detail_id = 0;
				bus_number_list.push(ss);
			}else{
				ss.bus_number = $(cbox).closest("tr").data("bus_number");
				ss.task_detail_id = task_detail_id;
				bus_number_list.push(ss);
			}
		});
		$.each(allcboxlist,function(index,cbox){
			var task_detail_id = $(cbox).closest("tr").data("task_detail_id");
			if(task_detail_id != null && $(cbox).is(':checked')==false){
				delete_bus_number_list.push($(cbox).closest("tr").data("task_detail_id"));
			}
		});
		$.ajax({
			type : "post",
			dataType : "json",
			url : "ecnDocumentTask!updatetaskdetailstate.action",
			data : {
				"ecn_id":ecn_id,
				"task_id":task_id,
				"factory_id":factory_id,
				"workshop":workshop,
				"order_id":order_id,
				"ecn_number":ecn_number,
				"bus_number_list" : JSON.stringify(bus_number_list),
				"delete_bus_number_list" : JSON.stringify(delete_bus_number_list)
			},
			success : function(response) {
				$("#selectBusNumberModal").modal("hide");
				alert(response.message);
				ajaxQuery($(".curPage").attr("page"));
			},
			error : function() {
				alertError();
			}

		});
	}else{
		return;
	}
	
}

//上传技改任务图片
function picupload(taskid){
	$("#file0").val("");
	$("#img0").attr("src","");
	$("#file1").val("");
	$("#img1").attr("src","");
	$("#taskPicUpLoadModal").modal("show");
	$("#pictaskid").val(taskid);
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


//查找车号明细显示页面
function querydphdetail(ecn_task_id,order_no,factory_id,taskstatus){
	var configStr="";
	timeConfigCount=0;
	$("#taskid").val(ecn_task_id);
	$.ajax({
	    url: "ecnDocumentTask!queryBusNumberList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"ecn_task_id":ecn_task_id,
	    	"order_no":order_no,
	    	"factory_id":factory_id,
	    	"taskstate":taskstatus
	    },
	    success:function(response){
    		$("#dphtable tbody").html("");
    		$("#dphtablequery tbody").html("");
    		$.each(response.data,function(index,value){
    			timeConfigCount++;
    			var tr=$("<tr />");
    			if(taskstatus=='0'){
    					$("<td />").html("<input type=\"checkbox\" id=\"dphdetailcheck"+index+"\"><input type='hidden'  id='dphdetailid"+index+"'  value='"+value.id+"'>").appendTo(tr);
    					$("<td />").html(value.bus_number).appendTo(tr);
    					$("<td />").html(value.process_name).appendTo(tr);
    					$("<td />").html("<select class='input-small carType' id=\"detailstatus"+index+"\"><option value='0'  selected='true'>NG</option><option value='1'>OK</option></select>").appendTo(tr);
    			}else if(taskstatus=='1'){
    				$("<td />").html("").appendTo(tr);
					$("<td />").html(value.bus_number).appendTo(tr);
					$("<td />").html(value.process_name).appendTo(tr);
					$("<td />").html("OK").appendTo(tr);
					$("<td />").html(value.username).appendTo(tr);
					$("<td />").html(value.confirmor_date).appendTo(tr);
    			}
    			if(taskstatus=='0'){
    				$("#dphtable tbody").append(tr);
    			}else if(taskstatus=='1'){
    				$("#dphtablequery tbody").append(tr);
    			}
    		});	
	    }
	});
}

//单车跟进时，提交车辆完成情况
function updatetaskdetailForSingleFollow(){
	var bus_number = $("#busno").val();
	var cboxlist=$("#singledphFollow tbody :checked");
	if(bus_number.trim()=='' || cboxlist.length==0){
		alert("您没有勾选任何一行数据信息!");
		return false;
	}else{
		var bus_number_list=[];
		if(confirm("是否保存？")){
			$.each(cboxlist,function(index,cbox){
				var task_detail_id = $(cbox).closest("tr").data("task_detail_id");
				var ss = {};
				if(task_detail_id == null){
					ss.factory_id = $(cbox).closest("tr").data("factory_id");
					ss.task_id = $(cbox).closest("tr").data("task_id");
					ss.order_id = $(cbox).closest("tr").data("order_id");
					ss.ecn_number = $(cbox).closest("tr").data("ecn_number");
					ss.task_detail_id = 0;
					bus_number_list.push(ss);
				}else{
					ss.factory_id = $(cbox).closest("tr").data("factory_id");
					ss.task_id = $(cbox).closest("tr").data("task_id");
					ss.order_id = $(cbox).closest("tr").data("order_id");
					ss.ecn_number = $(cbox).closest("tr").data("ecn_number");
					ss.task_detail_id = task_detail_id;
					bus_number_list.push(ss);
				}
			});
			$.ajax({
				type : "post",
				dataType : "json",
				url : "ecnDocumentTask!singleCarFollowSubmit.action",
				data : {
					"bus_number":bus_number,
					"bus_number_list" : JSON.stringify(bus_number_list)
				},
				success : function(response) {
					alert(response.message);
					singlebusnoQuery();
				},
				error : function() {
					alertError();
				}
	
			});
		}else{
			return false;
		}
	}
}

//建立一個可存取到該file的url
function getObjectURL(file) {
	var url = null ; 
	if (window.createObjectURL!=undefined) { // basic
		url = window.createObjectURL(file) ;
	} else if (window.URL!=undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file) ;
	} else if (window.webkitURL!=undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file) ;
	}
	return url ;
}

/**
 * 单车跟进，根据输入的车号查询出此车号下所有技改任务信息
 */
function singlebusnoQuery(){
	$("#checkallsinglecar").attr("checked",false);
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
    			if(value.bus_status == '1'){
    				$("<td />").html("").appendTo(tr);
    			}else{
    				$("<td />").html("<input type=\"checkbox\" >").appendTo(tr);
    			}
    			if(value.bus_status == '1'){
    				$("<td />").html("OK").appendTo(tr);
    			}else{
    				$("<td />").html("NG").appendTo(tr);
    			}
    			$("<td />").html(value.task_content).appendTo(tr);
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
    			$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='viewcarstate("+value.ecn_order_id+","+value.ecn_factory_id+","+value.id+","+"1"+","+value.ecn_number+","+"1"+",null,null,\""+value.workshop+"\")'></i>").appendTo(tr);
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

function picuploadremind(){
	alert("任务图片维护请在单任务跟进模块进行!");
	return false;
}
