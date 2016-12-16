var cur_tab = "01";
var test_card_infos=new Array();
var prod_track_infos=new Array();
var oc_infos=new Array();
$(document).ready(function () {
	getBusNumberSelect('#search_busnumber');
	initPage();
	$("#tb04_workshop").change(function(){
		var workshop=$(this).find("option:selected").text();
		$.each(test_card_infos,function(index,value){
			if(value.workshop==workshop){
				var testResult="";
				if(value.test_result=='0'){
					testResult='一次交检合格'
				}
				if(value.test_result=='1'){
					testResult='返工/返修合格'
				}
				if(value.test_result=='2'){
					testResult='让步放行'
				}
				$("#tb04_result").html(testResult);
				$("#tb04_tester").html(value.tester);
				$("#tb04_qe").html(value.qe);
				queryTestCardInfo(value.id);
			}
		})
	});
	$("#tb05_workshop").change(function(){
		var workshop=$(this).find("option:selected").text();
		generateProdTrackTable(workshop);
	});
	$("#tb06_workshop").change(function(){
		var workshop=$(this).find("option:selected").text();
		generateOCTable(workshop);
	});
	function initPage(){
		$("#production_search").addClass("in");
		cur_tab = "01";
		$("#tab01div").show();$("#tab02div").hide();
		$("#tab03div").hide();$("#tab04div").hide();
		$("#tab05div").hide();$("#tab06div").hide();
		$("#tab07div").hide();$("#tab08div").hide();
		$("#tab09div").hide();$("#tab10div").hide();
		$("#tab11div").hide();
		
		if(Request("bus_number")!=""){
			$("#search_busnumber").val(Request("bus_number"));
			ajaxQuery();
		}
	}
	
	$("li").live('click',function(e){
		if(this.id == "tab01"){
			ajaxQuery();
			$("#tab01div").show();$("#tab02div").hide();
			$("#tab03div").hide();$("#tab04div").hide();
			$("#tab05div").hide();$("#tab06div").hide();
			$("#tab07div").hide();$("#tab08div").hide();
			$("#tab09div").hide();$("#tab10div").hide();
			$("#tab11div").hide();
			cur_tab = "01";
		}else if(this.id == "tab02"){
			$("#tab01div").hide();$("#tab02div").show();
			$("#tab03div").hide();$("#tab04div").hide();
			$("#tab05div").hide();$("#tab06div").hide();
			$("#tab07div").hide();$("#tab08div").hide();
			$("#tab09div").hide();$("#tab10div").hide();
			$("#tab11div").hide();
			cur_tab = "02";
		}else if(this.id == "tab03"){
			ajaxQueryTab03();
			$("#tab01div").hide();$("#tab02div").hide();
			$("#tab03div").show();$("#tab04div").hide();
			$("#tab05div").hide();$("#tab06div").hide();
			$("#tab07div").hide();$("#tab08div").hide();
			$("#tab09div").hide();$("#tab10div").hide();
			$("#tab11div").hide();
			cur_tab = "03";
		}else if(this.id == "tab04"){
			if($("#search_busnumber").val().trim().length==0){
				alert("必须输入车号查询！");
			}else{
				ajaxQueryTab04();		
			}
			$("#tab01div").hide();$("#tab02div").hide();
			$("#tab03div").hide();$("#tab04div").show();
			$("#tab05div").hide();$("#tab06div").hide();
			$("#tab07div").hide();$("#tab08div").hide();
			$("#tab09div").hide();$("#tab10div").hide();
			$("#tab11div").hide();
			cur_tab = "04";
		}else if(this.id == "tab05"){
			if($("#search_busnumber").val().trim().length==0){
				alert("必须输入车号查询！");
			}else{
				ajaxQueryTab05();		
			}
			$("#tab01div").hide();$("#tab02div").hide();
			$("#tab03div").hide();$("#tab04div").hide();
			$("#tab05div").show();$("#tab06div").hide();
			$("#tab07div").hide();$("#tab08div").hide();
			$("#tab09div").hide();$("#tab10div").hide();
			$("#tab11div").hide();
			cur_tab = "05";
		}else if(this.id == "tab06"){
			if($("#search_busnumber").val().trim().length==0){
				alert("必须输入车号查询！");
			}else{
				ajaxQueryTab06();		
			}
			$("#tab01div").hide();$("#tab02div").hide();
			$("#tab03div").hide();$("#tab04div").hide();
			$("#tab05div").hide();$("#tab06div").show();
			$("#tab07div").hide();$("#tab08div").hide();
			$("#tab09div").hide();$("#tab10div").hide();
			$("#tab11div").hide();
			cur_tab = "06";
		}else if(this.id == "tab07"){
			if($("#search_busnumber").val().trim().length==0){
				alert("必须输入车号查询！");
			}else{
				ajaxQueryTab07();		
			}
			$("#tab01div").hide();$("#tab02div").hide();
			$("#tab03div").hide();$("#tab04div").hide();
			$("#tab05div").hide();$("#tab06div").hide();
			$("#tab07div").show();$("#tab08div").hide();
			$("#tab09div").hide();$("#tab10div").hide();
			$("#tab11div").hide();
			cur_tab = "07";
		}else if(this.id == "tab08"){
			if($("#search_busnumber").val().trim().length==0){
				alert("必须输入车号查询！");
			}else{
				ajaxQueryTab8();		
			}
			$("#tab01div").hide();$("#tab02div").hide();
			$("#tab03div").hide();$("#tab04div").hide();
			$("#tab05div").hide();$("#tab06div").hide();
			$("#tab07div").hide();$("#tab08div").show();
			$("#tab09div").hide();$("#tab10div").hide();
			$("#tab11div").hide();
			cur_tab = "08";
		}else if(this.id == "tab09"){
			ajaxQueryTab09();
			$("#tab01div").hide();$("#tab02div").hide();
			$("#tab03div").hide();$("#tab04div").hide();
			$("#tab05div").hide();$("#tab06div").hide();
			$("#tab07div").hide();$("#tab08div").hide();
			$("#tab09div").show();$("#tab10div").hide();
			$("#tab11div").hide();
			cur_tab = "09";
		}else if(this.id == "tab10"){
			ajaxQueryTab10();
			$("#tab01div").hide();$("#tab02div").hide();
			$("#tab03div").hide();$("#tab04div").hide();
			$("#tab05div").hide();$("#tab06div").hide();
			$("#tab07div").hide();$("#tab08div").hide();
			$("#tab09div").hide();$("#tab10div").show();
			$("#tab11div").hide();
			cur_tab = "10";
		}else if(this.id == "tab11"){
			if($("#search_busnumber").val().trim().length==0){
				alert("必须输入车号查询！");
			}else{
				ajaxQueryTab11();		
			}
			$("#tab01div").hide();$("#tab02div").hide();
			$("#tab03div").hide();$("#tab04div").hide();
			$("#tab05div").hide();$("#tab06div").hide();
			$("#tab07div").hide();$("#tab08div").hide();
			$("#tab09div").hide();$("#tab10div").hide();
			$("#tab11div").show();
			cur_tab = "10";
		}
		
			
	});
	
	$("#btnQuery").click (function () {
		if($("#search_busnumber").val()==""){
			alert("请输入车号或VIN号！");
			return false;
		}
		if(cur_tab == "01")ajaxQuery();
		if(cur_tab == "03")ajaxQueryTab03();
		if(cur_tab == "04")ajaxQueryTab04();
		if(cur_tab == "05")ajaxQueryTab05();
		if(cur_tab == "06")ajaxQueryTab06();
		if(cur_tab == "09")ajaxQueryTab09();
		return false;
	});
	
});


function clear_baseinfo(){
	$("#tab01_order_no").html("");
	$("#tab01_bus_number").html("");
	$("#tab01_vin").html("");
	$("#tab01_factory_name").html("");
	$("#tab01_order_config_name").html("");
	$("#tab01_customer").html("");
	$("#tab01_productive_date").html("");
	$("#tab01_left_motor_number").html("");
	$("#tab01_right_motor_number").html("");
	$("#tab01_bus_color").html("");
	$("#tab01_bus_seats").html("");
	$("#tab01_production_status").html("");
	$("#tab01_dispatch_date").html("");
	$("#tab01_customer_number").html("");
	$("#tab01_welding_online_date").html("");
	$("#tab01_welding_offline_date").html("");
	$("#tab01_fiberglass_offline_date").html("");
	$("#tab01_painting_online_date").html("");
	$("#tab01_painting_offline_date").html("");
	$("#tab01_chassis_online_date").html("");
	$("#tab01_chassis_offline_date").html("");
	$("#tab01_assembly_online_date").html("");
	$("#tab01_assembly_offline_date").html("");
	$("#tab01_debugarea_online_date").html("");
	$("#tab01_debugarea_offline_date").html("");
	$("#tab01_testline_online_date").html("");
	$("#tab01_testline_offline_date").html("");
	$("#tab01_warehousing_date").html("");	    			
	$("#tab01_config_file").html("");
}
//基本信息查询
function ajaxQuery(targetPage){
	clear_baseinfo();
	$.ajax({
	    url: "production!getProductionSearchBusInfo.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"bus_number": $('#search_busnumber').val(),
	    },
	    success:function(response){
	    	$.each(response.data,function (index,value) {
	    		$("#tab01_order_no").html(value.order_no + " " + value.order_name + value.bus_type_code + value.order_qty + "辆");
	    		$("#tab01_bus_number").html(value.bus_number);
	    		$("#tab01_vin").html(value.vin);
	    		$("#tab01_factory_name").html(value.factory_name);
	    		$("#tab01_order_config_name").html(value.order_config_name);
	    		$("#tab01_customer").html(value.customer);
	    		$("#tab01_productive_date").html(value.productive_date);
	    		$("#tab01_left_motor_number").html(value.left_motor_number);
	    		$("#tab01_right_motor_number").html(value.right_motor_number);
	    		$("#tab01_bus_color").html(value.bus_color);
	    		$("#tab01_bus_seats").html(value.bus_seats);
	    		var production_status = "正常";
	    		if(value.production_status == '1')production_status = "返修";
		    	if(value.production_status == '2')production_status = "技改";
	    		$("#tab01_production_status").html(production_status);
	    		$("#tab01_dispatch_date").html(value.dispatch_date);
	    		$("#tab01_customer_number").html(value.customer_number);
	    		$("#tab01_welding_online_date").html(value.welding_online_date);
	    		$("#tab01_welding_offline_date").html(value.welding_offline_date);
	    		$("#tab01_fiberglass_offline_date").html(value.fiberglass_offline_date);
	    		$("#tab01_painting_online_date").html(value.painting_online_date);
	    		$("#tab01_painting_offline_date").html(value.painting_offline_date);
	    		$("#tab01_chassis_online_date").html(value.chassis_online_date);
	    		$("#tab01_chassis_offline_date").html(value.chassis_offline_date);
	    		$("#tab01_assembly_online_date").html(value.assembly_online_date);
	    		$("#tab01_assembly_offline_date").html(value.assembly_offline_date);
	    		$("#tab01_debugarea_online_date").html(value.debugarea_online_date);
	    		$("#tab01_debugarea_offline_date").html(value.debugarea_offline_date);
	    		$("#tab01_testline_online_date").html(value.testline_online_date);
	    		$("#tab01_testline_offline_date").html(value.testline_offline_date);
	    		$("#tab01_warehousing_date").html(value.warehousing_date);	    		
	    		
	    		$("#tab01_config_file").html('<a target="blank" href="images/upload/orderConfig/'+value.config_file+'">查看</a>');
	    	})
    		
	    }
	});
}
//生产信息
function ajaxQueryTab03(targetPage){
	$.ajax({
	    url: "production!getProductionSearchScan.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"bus_number": $('#search_busnumber').val(),
	    },
	    success:function(response){
    		$("#table03 tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr height='30px' id= '"+value.id+"'/>");
    			$("<td style=\"text-align:center;padding:3px\" />").html(index + 1).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.workshop_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.line_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.process_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.scan_time).appendTo(tr);
    			var status = "正常";
    			if (value.repair == "1")status = "返修";
    			if (value.ecn == "1")status = "技改";
    			if (value.onlineflag == "1")status += "返修";
    			if (value.offlineflag == "1")status += "技改";
    			$("<td style=\"text-align:center;padding:3px\" />").html(status).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.display_name).appendTo(tr);
    			$("#table03 tbody").append(tr);
    		});	
	    }
	});	
}
//铭牌信息
function ajaxQueryTab07(targetPage){
	$.ajax({
	    url: "production!getNamePlateInfo.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"bus_number": $('#search_busnumber').val(),
	    },
	    success:function(response){
    		//$("#table07 tbody").html("");
    		$.each(response.data,function (index,value) {
    			$("#tab07_VIN").html(value.vin);
    			$("#tab07_vehicle_model").html(value.vehicle_model);
	    		$("#tab07_brand").html(value.brand);
	    		$("#tab07_motor_model").html(value.motor_model);
	    		$("#tab07_chassis_model").html(value.chassis_model);
	    		$("#tab07_passenger").html(value.passenger_num);
	    		$("#tab07_motor_power").html(value.motor_power+' KW');
	    		$("#tab07_max_weight").html(value.max_weight+' KG');
	    		$("#tab07_battery_model").html(value.battery_model);
	    		$("#tab07_sequence").html(value.bus_number);
	    		$("#tab07_battery_capacity").html(value.battery_capacity+' AH');
	    		$("#tab07_productive_date").html(value.productive_date);
	    		$("#tab07_rated_voltage").html(value.rated_voltage+' V');
	    		$("#tab07_max_speed").html(value.max_speed+' km/h');
	    		$("#tab07_light_downdip").html(value.light_downdip);
    		});	
	    }
	});	
}
//铭牌信息
function ajaxQueryTab11(targetPage){
	$.ajax({
	    url: "production!getNamePlateInfo.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"bus_number": $('#search_busnumber').val(),
	    },
	    success:function(response){
    		//$("#table07 tbody").html("");
    		$.each(response.data,function (index,value) {
    			$("#tab11_VIN").html(value.vin);
    			$("#tab11_vehicle_model").html(value.vehicle_model);
	    		$("#tab11_brand").html(value.brand);
	    		$("#tab11_motor_model").html(value.motor_model);
	    		$("#tab11_chassis_model").html(value.chassis_model);
	    		$("#tab11_motor_power").html(value.motor_power+' KW');
	    		$("#tab11_max_weight").html(value.max_weight+' KG');
	    		$("#tab11_battery_model").html(value.battery_model);
	    		$("#tab11_sequence").html(value.bus_number);
	    		$("#tab11_battery_capacity").html(value.battery_capacity+' AH');
	    		$("#tab11_productive_date").html(value.zc_production_date);
	    		$("#tab11_rated_voltage").html(value.rated_voltage+' V');
	    		$("#tab11_max_speed").html(value.max_speed+'km/h ');
	    		$("#tab11_light_downdip").html(value.light_downdip);
	    		$("#tab11_passenger").html(value.passenger_num);
    		});	
	    }
	});	
}

//合格证信息
function ajaxQueryTab8(targetPage){
	$.ajax({
	    url: "production!getCertificationInfo.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"bus_number": $('#search_busnumber').val(),
	    },
	    success:function(response){
    		$.each(response.data,function (index,value) {
    			$("#tab08_bus_number").html(value.bus_number);
    			$("#tab08_vin").html(value.vin);
    			$("#tab08_chassis_model").html(value.chassis_model);
    			$("#tab08_vehicle_model").html(value.vehicle_model);
	    		$("#tab08_motor_model").html(value.motor_model);
	    		$("#tab08_motor_number").html(value.motor_number);
	    		$("#tab08_bus_color").html(value.bus_color);
	    		$("#tab08_bus_seats").html(value.bus_seats);
	    		$("#tab08_battery_model").html(value.battery_model);
	    		$("#tab08_passengers").html(value.passengers);
	    		$("#tab08_productive_date").html(value.productive_date);
	    		$("#tab08_plates").html(value.spring_num);
	    		$("#tab08_tire_type").html(value.tire_type);
	    		$("#tab08_chassis_notice_date").html(value.dpgg_date);
	    		$("#tab08_ccc_date").html(value.ccczs_date);
	    		$("#tab08_production_notice_date").html(value.zcgg_date);
	    		$("#tab08_chassis_date").html(value.dp_production_date);
	    		$("#tab08_production_date").html(value.zc_production_date);
	    		
    		});	
	    }
	});	
}

//异常信息
function ajaxQueryTab09(targetPage){
	$.ajax({
	    url: "production!getProductionSearchException.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"bus_number": $('#search_busnumber').val(),
	    },
	    success:function(response){
    		$("#table09 tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr height='30px' id= '"+value.id+"'/>");
    			$("<td style=\"text-align:center;padding:3px\" />").html(index + 1).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.workshop_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.line).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.process_name).appendTo(tr);
    			//severity_level 0:不影响;1:普通;2:严重
    			var severity_level = "不影响";
    			if(value.severity_level == "1")severity_level = "普通";
    			if(value.severity_level == "2")severity_level = "严重";
    			$("<td style=\"text-align:center;padding:3px\" />").html(severity_level).appendTo(tr);
    			var measures = "忽略";
    			//处理措施measures  0忽略、1异常、2停线
    			if(value.measures == "1")measures = "异常";
    			if(value.measures == "2")measures = "停线";
    			$("<td style=\"text-align:center;padding:3px\" />").html(measures).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.process_code).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.reason_type).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.duty_department).appendTo(tr);
    			var status = "处理中";
    			if(value.status == "1")status = "处理完成";
    			$("<td style=\"text-align:center;padding:3px\" />").html(status).appendTo(tr);
    			$("#table09 tbody").append(tr);
    		});	
	    }
	});	
}

/**
 * 根据输入的车号查询出此车号下所有技改任务信息
 */
function ajaxQueryTab10(targetPage){
	$.ajax({
	    url: "ecnDocumentTask!querySingleCarNolist.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"busno": $('#search_busnumber').val(),
	    	"flag":1
	    },
	    error : function(response) {
			alert(response.message)
		},
	    success:function(response){
    		$("#table10 tbody").html("");
    		$.each(response.data,function(index,value){
    			var tr=$("<tr />");
    			$("<td />").html(index+1).appendTo(tr);
    			$("<td />").html(value.task_content).appendTo(tr);
    			$("<td />").html(value.ecn_document_number).appendTo(tr);
    			$("<td />").html(value.factory_name).appendTo(tr);
/*    			if(value.switch_mode == '0'){
    				$("<td />").html("全部切换").appendTo(tr);
    			}else{
    				$("<td />").html("立即切换").appendTo(tr);
    			}
    			
    			$("<td />").html(value.ecn_number).appendTo(tr);*/
/*    			var already = 0;
    			if(value.already !=null){
    				already = value.already;
    			}
    			$("<td />").html(already).appendTo(tr);
    			$("<td />").html(value.ecn_number-already).appendTo(tr);*/
    		//	$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='getBusNum("+value.ecn_order_id+","+value.ecn_factory_id+","+value.id+","+value.switch_mode+")'></i>").appendTo(tr);
    			$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='picupquery("+value.id+")'></i>").appendTo(tr);
    			if(value.bus_status == '1'){
    				$("<td />").html("OK").appendTo(tr);
    			}else{
    				$("<td />").html("NG").appendTo(tr);
    			}
    			$("<td />").html(value.username).appendTo(tr);
    			$("<td />").html(value.confirmor_date).appendTo(tr);
    			$("#table10 tbody").append(tr);
    		});	
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

function Request(strName){  
	var strHref = location.href; 
	var intPos = strHref.indexOf("?");  
	var strRight = strHref.substr(intPos + 1);  
	var arrTmp = strRight.split("&");  
	for(var i = 0; i < arrTmp.length; i++) {  
		var arrTemp = arrTmp[i].split("=");  
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];  
	}  
	return "";  
} 
//检验流程卡车间等信息查询
function ajaxQueryTab04(){
	var busNo = $("#search_busnumber").val();
	var conditions = {
			'busNo' : busNo
		};
	$
	.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "testFlowCardIn!getRecordList.action",
		data : {
			"conditions" : JSON.stringify(conditions),
			"pager.pageSize" : 20,
			"pager.curPage" : 1
		},
		success : function(response) {
			var strs = "";
			$("#tb04_workshop").html("");
			$("#tb04_result").html("");
			$("#tb04_tester").html("");
			$("#tb04_qe").html("");
			$("#table04Result").find("tbody").html("");
			$.each(response.dataList, function(index, value) {
				strs += "<option value=" + value.id + ">" + value.workshop
							+ "</option>";
			});
			$("#tb04_workshop").append(strs);
			test_card_infos=response.dataList;
			if(response.dataList.length>0){
				queryTestCardInfo(response.dataList[0].id);
				var testResult="";
				if(response.dataList[0].test_result=='0'){
					testResult='一次交检合格'
				}
				if(response.dataList[0].test_result=='1'){
					testResult='返工/返修合格'
				}
				if(response.dataList[0].test_result=='2'){
					testResult='让步放行'
				}
				$("#tb04_result").html(testResult);
				$("#tb04_tester").html(response.dataList[0].tester);
				$("#tb04_qe").html(response.dataList[0].qe);
			}
			
		}		
	});	

}
//根据车间查询检验流程卡信息
function queryTestCardInfo(headerId){
		$.ajax({
			type : "get",// 使用get方法访问后台
			dataType : "json",// 返回json格式的数据
			url : "testFlowCardIn!getRecordDetail.action",
			data : {
				"header.id" : headerId
			},
			success : function(response) {
				var tplarray = response.dataList;
				if (tplarray.length <= 0) {
					alert("未查询到匹配模板！");
					$("#saveForm").css("display", "none");
				} else {
					generateTestCardTable(tplarray);// 动态生成表格
					$("#saveForm").css("display", "");
				}
			}
		});
}
function generateTestCardTable(dataList) {
	$("#table04Result tbody").html("");
	var last_processNo = null;
	var last_itemNo = null;
	var last_node = null;
	var last_qc_point = null;
	var node_index = 0;
	var node_id = "";
	var qc_point_index = 0;
	var qc_point_id = "";

	$
			.each(dataList,
					function(index, value) {
						var tr = $("<tr />");
						$(tr).data("tplDetailId", value.id);
						var process_id = "#process_" + value.process_no;
						var item_id = "#item_" + value.test_item_no;
						// 节点 合并单元格
						if (value.quality_node == last_node) {
							var noderowspan = parseInt($(node_id).attr(
									"rowspan"));
							var recordid = $(node_id).attr("recordid") + ","
									+ index;

							$(node_id).attr("rowspan", noderowspan + 1).attr(
									"recordid", recordid);
							if((value.quality_node).trim().length>0){
								$(node_id).html(value.quality_node);
							}
						} else {
							$(
									"<td id='node_" + node_index
											+ "' rowspan='1' " + "/>").html(
									value.quality_node).appendTo(tr);
							node_id = "#node_" + node_index;
							node_index += 1;
						}
						// 工序 合并单元格
						if (value.process_no == last_processNo&&value.quality_node == last_node) {

							var prorowspan = parseInt($(process_id).attr(
									"rowspan"));
							var recordid = $(process_id).attr("recordid") + ","
									+ index;

							$(process_id).attr("rowspan", prorowspan + 1).attr(
									"recordid", recordid);
							if((value.process_name).trim().length>0){
								$(process_id).html(value.process_name);
							}
						} else {
							$(
									"<td id='process_" + value.process_no
											+ "' rowspan='1' " + "/>").attr(
									"recordid", index).html(value.process_name)
									.appendTo(tr);
						}
						// 检测内容 合并单元格
						if (value.test_item_no == last_itemNo&&value.process_no == last_processNo) {
							var itemrowspan = parseInt($(item_id).attr(
									"rowspan"));
							var recordid = $(item_id).attr("recordid") + ","
									+ index;
							$(item_id).attr("rowspan", itemrowspan + 1).attr(
									"recordid", recordid);
							if((value.test_item).trim().length>0){
								$(item_id).html(value.test_item);
							}
						} else {
							$(
									"<td id='item_" + value.test_item_no
											+ "' rowspan='1'" + "/>").attr(
									"recordid", index).html(value.test_item)
									.appendTo(tr);
						}
						// 质控点 合并单元格
						if (value.quality_point_flag == last_qc_point&&value.test_item_no == last_itemNo) {
							var pointrowspan = parseInt($(qc_point_id).attr(
									"rowspan"));
							var recordid = $(qc_point_id).attr("recordid")
									+ "," + index;
							$(qc_point_id).attr("rowspan", pointrowspan + 1)
									.attr("recordid", recordid);
							if((value.quality_point_flag).trim().length>0){
								$(qc_point_id).html(value.quality_point_flag);
							}
						} else {
							qc_point_id = "#qcpoint_" + qc_point_index;
							$(
									"<td id='qcpoint_" + qc_point_index
											+ "' rowspan='1'" + "/>").attr(
									"recordid", index).html(
									value.quality_point_flag).appendTo(tr);
							qc_point_index += 1;
						}

						$("<td />").attr("id", "std_" + index).html(
								value.test_standard).appendTo(tr);
						$("<td />").attr("id", "freq_" + index).html(
								value.frequency).appendTo(tr);
						$("<td />").attr("id", "tools_" + index).html(
								value.test_tools).appendTo(tr);

						$("<td width='120px' />").html(value.test_result_name)
								.appendTo(tr);
						$("<td />").html(value.result_judge).appendTo(tr);
						$("<td />").html(value.rework).appendTo(tr);
						$("<td width='80px' />").html(value.workshop).appendTo(
								tr);
						$("<td />").html(value.workgroup).appendTo(tr);
						$("<td />").html(value.memo).appendTo(tr);

						last_processNo = value.process_no;
						last_itemNo = value.test_item_no;
						last_node = value.quality_node;
						last_qc_point = value.quality_point_flag;
						tr.appendTo("#table04Result tbody");

					});
}
//关键零部件信息查询
function ajaxQueryTab05(){
	var busNo=$("#search_busnumber").val();
	var conditions="{busNo:'"+busNo+"'}";
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "prodTrackIn!showRecordDetail.action",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			var detaillist = response.detailList;
			//循环detaillist获取车间下拉列表
			var strs = "";
			var last_workshop="";
			$("#tb05_workshop").html("");
			$("#tb05_bustype").html("");
			$("#tb05_order").html("");
			$("#tb05_config").html("");
			var tableId="#table05Result";
			$(tableId+" tbody").html("");
			$.each(detaillist, function(index, value) {
				if(last_workshop.indexOf(value.workshop)==-1){
					strs += "<option value=" + value.workshop + ">" + value.workshop
					+ "</option>";
				}
				last_workshop+=value.workshop;
				
			});
			$("#tb05_workshop").append(strs);
			if(detaillist.length>0){
				$("#tb05_bustype").html(detaillist[0].busType);
				$("#tb05_order").html(detaillist[0].order);
				$("#tb05_config").html(detaillist[0].orderConfig);
				prod_track_infos=detaillist;
				var workshop="";
				if(detaillist.length>0){
					workshop=detaillist[0].workshop;
				}
				generateProdTrackTable(workshop);
			}
			

		}
	});
}
function generateProdTrackTable(workshop){
	var tableId="#table05Result";
	$(tableId+" tbody").html("");
	var i=1;
	$.each(prod_track_infos,function(index,value){
		if(value.workshop.indexOf(workshop)>=0){
			var tr = $("<tr />");
			$("<td />").html(i).appendTo(tr);
			$("<td />").html(value.processNo).appendTo(tr);
			$("<td />").html(value.processName).appendTo(tr);
			$("<td />").html(value.parts).appendTo(tr);
			$("<td />").html(value.partsNo).appendTo(tr);
			$("<td />").html(value.batch).appendTo(tr);
			$("<td />").html(value.editor).appendTo(tr);
			$("<td />").html(value.editDate).appendTo(tr);
			tr.appendTo(tableId+" tbody");
			i++;
		}
			
	});
}
//订单配置与一致性信息查询
function ajaxQueryTab06(){
	var busNo=$("#search_busnumber").val();
	var conditions="{busNo:'"+busNo+"'}";
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "ocIn!showRecordDetail.action",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			var detaillist = response.detailList;
			//循环detaillist获取车间下拉列表
			var strs = "";
			var last_workshop="";
			$("#tb06_workshop").html("");
			$("#tb06_bustype").html("");
			$("#tb06_order").html("");
			$("#tb06_config").html("");
			var tableId="#table06Result";
			$(tableId+" tbody").html("");
			$.each(detaillist, function(index, value) {
				if(value.workshop!=last_workshop){
					strs += "<option value=" + value.workshop + ">" + value.workshop
					+ "</option>";
				}
				last_workshop=value.workshop;
				
			});
			$("#tb06_workshop").append(strs);
			
			$("#tb06_bustype").html(detaillist[0].busType);
			$("#tb06_order").html(detaillist[0].order);
			$("#tb06_config").html(detaillist[0].orderConfig);
			oc_infos=detaillist;
			var workshop="";
			if(detaillist.length>0){
				workshop=detaillist[0].workshop;
			}
			generateOCTable(workshop);
		}
	});
}
function generateOCTable(workshop){
	var tableId="#table06Result";
	$(tableId+" tbody").html("");
	var i=1;
	$.each(oc_infos,function(index,value){
		if(value.workshop.indexOf(workshop)>=0){
			var tr = $("<tr />");
			$("<td />").html(i).appendTo(tr);
			$("<td />").html(value.parts).appendTo(tr);
			$("<td />").html(value.partsNo).appendTo(tr);
			$("<td />").html(value.vendor).appendTo(tr);
			$("<td />").html(value.matchResult).appendTo(tr);
			$("<td />").html(value.memo).appendTo(tr);
			$("<td />").html(value.editor).appendTo(tr);
			$("<td />").html(value.editDate).appendTo(tr);
			tr.appendTo(tableId+" tbody");
			i++;
		}
			
	});
}