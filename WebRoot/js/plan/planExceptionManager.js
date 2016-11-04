var lineStr = "";
$(document).ready(function () {
	initPage();
	
	function initPage(){
		getFactorySelect();
		setSelects();
		getBusType();
		getUserFactory();
		getWorkshopSelect();
	}
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#btnAddException").click (function () {
		getReasonTypeSelect();
		$("#newExcepModal").modal("show");
		return false;
	});
	
	$("#btnAddPause").click (function () {
		getReasonTypeSelect();
		$("#line_str").val('');
		lineStr = "";
		$("#newPauseModal").modal("show");
		$("#newPause_factory").val("");
		$("#newPause_workshop").val("");
		$("#line_check").html("请先选择车间");
		return false;
	});
	
	$("#btnEditConfirm").click (function () {
		if($("#edit_factory").val()==""){
			alert("请选择工厂");
			return false;
		}
		if($("#edit_workshop").val()==""){
			alert("请选择车间");
			return false;
		}
		if($("#edit_line").val()==""){
			alert("请选择产线");
			return false;
		}
		if($("#edit_process").val()==""){
			alert("请选择工序");
			return false;
		}
		
		//异常处理措施选择为停线时 增加一条停线记录
		/*if($("#edit_measures").val()=="2"){
			$("#manage_exception_type").val('1');
			ajaxManage($("#edit_id").val());
			$("#is_new").val('1');
			$("#manage_id").val($("#edit_id").val());
			$("#manage_bus_number").val($("#edit_bus_number").val());
			$("#manage_solution").val($("#edit_solution").val());
			$("#editModal").modal("hide");
			$("#is_new").val('1');
			
			getManagerDepartmentSelect($("#edit_factory").val());
			$("#manage_department").val($("#edit_department").val());
			$("#manage_reason_type").val($("#edit_reason_type").val());
			$("#manageModal").modal("show");
		}else{
			ajaxEditConfirm();	
		}*/
		ajaxEditConfirm();
		return false;
	});
	
	$("#btnNewPauseConfirm").click (function () {
		if($("#line_str").val()==""){
			alert("请选择线别！");
			return false;
		}
		if($("#newPause_date_start").val()==""){
			alert("请选择开始时间");
			return false;
		}
		if($("#newPause_pfinish_time").val()==""){
			alert("请选择结束时间");
			return false;
		}
		if(isNaN($("#new_pause_waste_num").val())){
			alert("浪费人数必需为数字！");
			$("#new_pause_waste_num").focus();
			return false;
		}
		ajaxNewPauseConfirm();
		return false;
	});
	
	$("#btnManageConfirm").click (function () {
		if($("#manage_close_date").val()==""){
			alert("请选择结束时间");
			return false;
		}
		if($("#is_new").val()=="1"){
			ajaxEditConfirm();	//保存上一窗口数据
		}
		ajaxManageConfirm();
		return false;
	});
	
	$("#btnNewExcepConfirm").click (function () {
		if(($("#new_process").val()==null)||($("#new_process").val()=="")){
			alert("请选择异常工序！");
			return false;
		}
		if($("#new_bus_number").val()==""){
			alert("请输入车号！");
			return false;
		}
		if($("#new_department").val()=="0"){
			alert("请选择责任部门！");
			return false;
		}
		
		ajaxNewExcepConfirm();
		return false;
	});
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect();
	})
	$('#edit_factory').change(function(){ 
		getEditWorkshopSelect();
		getDepartmentSelect();
	})
	$('#new_factory').change(function(){ 
		getNewWorkshopSelect();
		getNewDepartmentSelect();
	})
	$('#newPause_factory').change(function(){ 
		getNewPauseWorkshopSelect();
		getPauseDepartmentSelect($('#newPause_factory').val());
	})
	
	$("#search_workshop").change(function(){
		$("#search_line").empty();
		if($("#search_workshop").val() !=''){
			getAllLineSelect();
		}
	});
	$("#edit_workshop").change(function(){
		$("#edit_line").empty();
		if($("#edit_workshop").val() !=''){
			getEditAllLineSelect();
		}
	});
	$("#new_workshop").change(function(){
		$("#new_line").empty();
		if($("#new_workshop").val() !=''){
			getNewAllLineSelect();
		}
	});
	$("#newPause_workshop").change(function(){
		$("#newPause_line").empty();
		if($("#newPause_workshop").val() !=''){
			getNewPauseAllLineSelect();
		}
	});

	//导出
	$("#export").click(function(){
		ajaxQuery(1,'all');
		htmlToExcel("tableExceptionAll", "", "","异常信息","异常信息");
	});
	
	
	$("#edit_line").change(function(){
		$("#edit_process").empty();
		if($("#edit_line").val() !=''){
			getAllProcessSelect();
		}
	});
	$("#new_line").change(function(){
		$("#new_process").empty();
		if($("#new_line").val() !=''){
			getNewProcessSelect();
		}
	});
	$("#edit_process").change(function(){
		$("#edit_processname").val('');
		if($("#edit_line").val() !=''){
			getProcessInfo($("#edit_process").val());
		}
	});
	$("#new_process").change(function(){
		$("#new_processname").val('');
		if($("#new_line").val() !=''){
			getNewProcessInfo($("#new_process").val());
		}
	});
	
	
})

function ajaxNewPauseConfirm(){
	var email_id = "0";
	if($('#new_pause_email_id').is(':checked')) {
		email_id = "1";
	}
	$.ajax({
		url: "plan!addPause.action",
		dataType: "json",
		data: {
			"factory_id" : $('#newPause_factory').val(),
			"workshop_id" : $('#newPause_workshop').val(),
			"line_id" : $('#newPause_line').val(),
			"lines" : $('#line_str').val(),
			"pause_date_start" : $('#newPause_date_start').val(),
			"pfinish_time" : $('#newPause_pfinish_time').val(),
			"detailed_reasons" : $('#new_pause_detailed_reasons').val(),
			"reason_type_id":$('#newPause_reason_type').val(),
			"email_id" : email_id,
			"bus_type_id" : $("#newPause_bus_type").val(),
			"duty_department_id" : $("#newPause_department").val(),
			"waste_num" : $("#new_pause_waste_num").val(),
			"memo" : $("#new_pause_memo").val(),
			"email_send" : $("#new_pause_email_send").val(),
			},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				alert("增加成功");
				$("#newPauseModal").modal("hide");
				ajaxQuery();
			} else {
				alert(response.message);
			}
		}
	})
}

function ajaxNewExcepConfirm(){
	$.ajax({
		url: "plan!addException.action",
		dataType: "json",
		data: {
			"factory_id" : $('#new_factory').val(),
			"workshop_id" : $('#new_workshop').val(),
			"line_id" : $('#new_line').val(),
			"bus_number" : $('#new_bus_number').val(),
			"process_id" : $('#new_process').val(),
			"reason_type_id" : $('#new_reason_type').val(),
			"detailed_reasons" : $('#new_detailed_reasons').val(),
			"severity_level" : $('#new_severity_level').val(),
			"duty_department_id" : $('#new_department').val(),
			"measures" : $('#new_measures').val(),

			},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				alert("增加成功");
				$("#newExcepModal").modal("hide");
				ajaxQuery();
			} else {
				alert(response.message);
			}
		}
	})
	
}

function ajaxManageConfirm(){
	var email_id = "0";
	if($('#manage_email_id').is(':checked')) {
		email_id = "1";
	}
	var exception_type = $("#manage_exception_type").val();
	if ($("#is_new").val()=="1") exception_type =1;
	$.ajax({
		url: "plan!editExceptionInfo.action",
		dataType: "json",
		data: {
			"id" : $('#manage_id').val(),
			"factory_id" : "",
			"workshop_id" : "",
			"line_id" : "",
			"bus_number" : "",
			"process_id" : "",
			"reason_type_id" : "",
			"detailed_reasons" : "",
			"severity_level" : "",
			"duty_department_id" : "",
			"measures" : "",	

			"exception_type" : exception_type,
			"duty_department_id" : $('#manage_department').val(),
			"solution" : $('#manage_solution').val(),	
			"close_date" : $('#manage_close_date').val(),
			"start_time" : $('#manage_date_start').val(),
			"finish_time" : $('#manage_close_date').val(),
			"pfinish_time" : $('#manage_pfinish_time').val(),
			"detailed_reasons" : $('#manage_detailed_reasons').val(),
			"memo" : $('#manage_memo').val(),
			"email_id" : email_id,
			"email_send" : $('#manage_email_send').val(),
			"bus_type" : $('#manage_bus_type').val(),
			"waste_num" : $('#manage_waste_num').val(),			
			
			},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				alert("处理成功");
				$("#manageModal").modal("hide");
				ajaxQuery();
			} else {
				alert(response.message);
			}
		}
	})
}

function ajaxEditConfirm(){
	var edit_measures = $('#edit_measures').val();
	var exception_type = $("#edit_exception_type").val();
	//if(edit_measures == "2")exception_type="1";
	$.ajax({
		url: "plan!editExceptionInfo.action",
		dataType: "json",
		data: {
			"id" : $('#edit_id').val(),
			"factory_id" : $('#edit_factory').val(),
			"workshop_id" : $('#edit_workshop').val(),
			"line_id" : $('#edit_line').val(),
			"bus_number" : $('#edit_bus_number').val(),
			"process_id" : $('#edit_process').val(),
			"reason_type_id" : $('#edit_reason_type').val(),
			"detailed_reasons" : $('#edit_detailed_reasons').val(),
			"severity_level" : $('#edit_severity_level').val(),
			"duty_department_id" : $('#edit_department').val(),
			"measures" : $('#edit_measures').val(),	
			"exception_type":exception_type,
			"solution" : "",		
			"close_date" :"",
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

function ajaxQuery(targetPage,queryAll){
	var data={};
	if(queryAll){
		data={
	    	"factory_id": $('#search_factory').val(),
	    	"workshop_id": $('#search_workshop').val(),
	    	"line_id": $('#search_line').val(),
	    	"bus_number": $('#search_busnumber').val(),
	    	"severity_level": $('#search_severity_level').val(),
	    	"measures": $('#search_measures').val(),
	    	"status": $('#search_status').val(),	    	
	    	"date_start":$('#date_start').val(),
	    	"date_end":$('#date_end').val(),
	    	"exception_type" : "0",
	    	"reason_type_id" : "",
	    	"order_no" : "",    	
	    	"date_start2": "",  
	    	"date_end2": ""
	    }
	}else{
		data={
	    	"factory_id": $('#search_factory').val(),
	    	"workshop_id": $('#search_workshop').val(),
	    	"line_id": $('#search_line').val(),
	    	"bus_number": $('#search_busnumber').val(),
	    	"severity_level": $('#search_severity_level').val(),
	    	"measures": $('#search_measures').val(),
	    	"status": $('#search_status').val(),	    	
	    	"date_start":$('#date_start').val(),
	    	"date_end":$('#date_end').val(),
	    	"exception_type" : "0",
	    	"reason_type_id" : "",
	    	"order_no" : "",    	
	    	"date_start2": "",  
	    	"date_end2": "",  
	    	"pager.pageSize":10,
			"pager.curPage":targetPage || 1
	    }
	}
	$.ajax({
	    url: "plan!getExceptionList.action",
	    dataType: "json",
		type: "get",
	    data: data,
	    async:false,
	    success:function(response){		
	    	var tablebody;
    		if(queryAll=='all'){
    			tablebody=$("#tableExceptionAll tbody");
    		}else{
    			tablebody=$("#tableException tbody");
    		}
    		$(tablebody).html("");
    		
    		var warp = document.createDocumentFragment();//创建文档碎片节点,最后渲染该碎片节点，减少浏览器渲染消耗的资源
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr id= '"+value.id+"'/>");
    			/*$("<td style=\"text-align:center;padding:3px\" />").html(index+1).appendTo(tr);*/
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.workshop_name).appendTo(tr);
    			
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.cur_process_code).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html((value.severity_level=="0")?"不影响":((value.severity_level=="1")?"普通":"严重")).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.process_code).appendTo(tr);
    			$("<td title='"+value.detailed_reasons+"' style=\"text-align:center;padding:3px\" />").html(value.reson_type).appendTo(tr);
    			var detailed_reasons = value.detailed_reasons;
    			if(value.detailed_reasons.length>15&&queryAll!='all'){detailed_reasons = value.detailed_reasons.substring(0,12) + '...'};
    			$("<td title='"+value.detailed_reasons+"' style=\"text-align:center;padding:3px\" />").html(detailed_reasons).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html((value.measures=="0")?"忽略":(value.measures=="1"?"异常":"停线")).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.department).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.display_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.start_time).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.finish_time).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html((value.status=="0")?"处理中":"处理完成").appendTo(tr);
    			//$("<td style=\"text-align:center;padding:3px\" />").html("<button onclick = 'ajaxEdit(" + value.id + ");' class='btn-link'>编辑</>  <button onclick = 'ajaxManage(\"" +value.id + "\");' class='btn-link'>处理</>").appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html("<i onclick = 'ajaxEdit(" + value.id + ");' data-original-title='编辑' name='edit' class='fa fa-pencil' rel='tooltip' style='cursor: pointer;'></i>  <i onclick = 'ajaxManage(\"" +value.id + "\");' data-original-title='处理' name='edit' class='fa fa-wrench' rel='tooltip' style='cursor: pointer'></i>").appendTo(tr);

    			
    			$(tablebody).append(tr);
    		});
    		
    		if(queryAll!='all'){
    			$("#total").html(response.pager.totalCount);
        		$("#total").attr("total",response.pager.totalCount);
        		$("#cur").attr("page",response.pager.curPage);
        		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
        		$("#pagination").show();
    		}
    		
	    }
	});
}

function ajaxManage(exception_id){
	/*$("#manage_id").val(exception_id);
	$("#manage_exception_type").val(exception_type);
	(bus_number !="undefined")?$("#manage_bus_number").val(bus_number):$("#manage_bus_number").val("停线");
	(solution !="undefined")?$("#manage_solution").val(solution):$("#manage_solution").val("");
	(close_date !="undefined")?$("#manage_close_date").val(close_date):$("#manage_close_date").val("");
	getManagerDepartmentSelect(factory_id);
	$("#manage_department").val(duty_department_id);
	$("#is_new").val('0');
	$("#manage_waste_num").val(waste_num);
	$("#manage_reason_type").val(reason_type_id);
	getReasonTypeSelect();*/
	$.ajax({
		url: "plan!getExceptionList.action",
		dataType: "json",
		data: {"exception_id" : exception_id,
			"factory_id": '',
	    	"workshop_id": '',
	    	"line_id": '',
	    	"bus_number": '',
	    	"severity_level":'',
	    	"measures": '',
	    	"status": '',    	
	    	"date_start":'',
	    	"date_end":'',
	    	"exception_type" : "",
	    	"reason_type_id" : "",
	    	"order_no" : "",    	
	    	"date_start2": "",  
	    	"date_end2": "",  },
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$.each(response.data,function(index,value){
					if(index == 0){
						/*if($("#manage_exception_type").val() == "0"){
							$("#newPause_date").hide();
							$("#manage_waste_num").attr("disabled","disabled")
							$("#div_memo").hide();
							$("#div_mail_id").hide();
							$("#div_email_send").hide();
						}else{
							$("#newPause_date").show();
							$("#manage_waste_num").removeAttr("disabled");
							$("#div_memo").show();
							$("#div_mail_id").show();
							$("#div_email_send").show();
						}*/
						$("#newPause_date").hide();
						$("#manage_waste_num").attr("disabled","disabled")
						$("#div_memo").hide();
						$("#div_mail_id").hide();
						$("#div_email_send").hide();
						
						$("#manage_id").val(value.id);
						$("#manage_exception_type").val(value.exception_type);
						(value.bus_number != null)?$("#manage_bus_number").val(value.bus_number):$("#manage_bus_number").val("停线");
						(value.solution != null)?$("#manage_solution").val(value.solution):$("#manage_solution").val("");
						(value.close_date != null)?$("#manage_close_date").val(value.close_date):$("#manage_close_date").val("");
						//alert(value.bus_number.substring(0,value.bus_number.indexOf("-")));
						var bus_type = value.bus_number.substring(0,value.bus_number.indexOf("-"));
						var count = $("#manage_bus_type").get(0).options.length;
						for (var i = 0; i < count; i++) {
							if ($("#manage_bus_type").get(0).options[i].text == bus_type) {
								$("#manage_bus_type").get(0).options[i].selected = true;
								break;
							}
						}
						
						getManagerDepartmentSelect(value.factory_id);
						$("#manage_department").val(value.duty_department_id);
						$("#is_new").val('0');
						$("#manage_waste_num").val(value.waste_num);
						getReasonTypeSelect();
						$("#manage_reason_type").val(value.reason_type_id);
						$("#manage_date_start").val(value.start_time);
						$("#manage_date_end").val(value.finish_time);
						$("#manage_pfinish_time").val(value.pfinish_time);
						$("#manage_close_date").val(value.close_date);
						$("#manage_detailed_reasons").val(value.detailed_reasons);
						$("#manage_memo").val(value.memo);
						$("#manage_email_send").val(value.email_send);										
						//$("#edit_close_date").val(value.close_date);
					}
				})								
				
				$("#editModal").modal("hide");			
				$("#manageModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})

}

function ajaxEdit(exception_id){
	$("#edit_severity_level").html("");
	$.ajax({
		url: "plan!getExceptionList.action",
		dataType: "json",
		data: {"exception_id" : exception_id,
			"factory_id": '',
	    	"workshop_id": '',
	    	"line_id": '',
	    	"bus_number": '',
	    	"severity_level":'',
	    	"measures": '',
	    	"status": '',    	
	    	"date_start":'',
	    	"date_end":'',
	    	"exception_type" : "",
	    	"reason_type_id" : "",
	    	"order_no" : "",    	
	    	"date_start2": "",  
	    	"date_end2": "",
	    	"query_type":"edit",
		},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$.each(response.data,function(index,value){
					if(index == 0){
						//alert(value.factory_id);
						$("#edit_id").val(value.id);
						$("#edit_factory").val(value.factory_id);
						getEditWorkshopSelect();
						$("#edit_workshop").val(value.workshop_id);
						getEditAllLineSelect();
						$("#edit_line").val(value.line_id);
						getAllProcessSelect();
						$("#edit_bus_number").val(value.bus_number);
						getReasonTypeSelect();
						$("#edit_reason_type").val(value.reason_type_id);
						$("#edit_detailed_reasons").val(value.detailed_reasons);
						$("#edit_severity_level").append("<option value=''>全部</option><option value='0'>不影响</option><option value='1'>普通</option><option value='2'>严重</option>");
						$("#edit_severity_level").val(value.severity_level);
						$("#edit_measures").val(value.measures);
						getDepartmentSelect();
						$("#edit_department").val(value.duty_department_id);
						$("#edit_solution").val(value.solution);
						$("#edit_close_date").val(value.close_date);
						$("#edit_exception_type").val(value.exception_type);
					}
				})
				
				$("#editModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

function setSelects(){
	$("#search_status").append("<option value=''>全部</option><option value='0'>处理中</option><option value='1'>处理完成</option>");
	$("#search_measures").append("<option value=''>全部</option><option value='0'>忽略</option><option value='1'>异常</option><option value='2'>停线</option>");
	$("#edit_measures").append("<option value='0'>忽略</option><option value='1'>异常</option><option value='2'>停线</option>");
	$("#search_severity_level").append("<option value=''>全部</option><option value='0'>不影响</option><option value='1'>普通</option><option value='2'>严重</option>");
	$("#new_measures").append("<option value='0'>忽略</option><option value='1'>异常</option><option value='2'>停线</option>");
	$("#new_severity_level").append("<option value='0'>不影响</option><option value='1'>普通</option><option value='2'>严重</option>");
}

function getAllProcessSelect() {
	$("#edit_process").empty();
	$.ajax({
		url : "common!getProcessMonitorSelect.action",
		dataType : "json",
		data : {lineId:$("#edit_line").val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			//getSelects_noall(response, "", "#exec_process"); 
			var strs = "";
		    $("#edit_process").html("");
		    $.each(response, function(index, value) {
		    	if (index == 0) $("#edit_processname").val(value.PROCESS_NAME);
		    	strs += "<option value=" + value.ID + ">" + value.NAME + "</option>";
		    });
		    $("#edit_process").append(strs);
		}
	});
}
function getNewProcessSelect() {
	$("#new_process").empty();
	$.ajax({
		url : "common!getProcessMonitorSelect.action",
		dataType : "json",
		data : {lineId:$("#new_line").val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			//getSelects_noall(response, "", "#exec_process"); 
			var strs = "";
		    $("#new_process").html("");$("#new_processname").val("");
		    $.each(response, function(index, value) {
		    	if (index == 0) $("#new_processname").val(value.PROCESS_NAME);
		    	strs += "<option value=" + value.ID + ">" + value.NAME + "</option>";
		    });
		    $("#new_process").append(strs);
		}
	});
}

function getReasonTypeSelect() {
	$("#edit_reason_type").empty();
	$.ajax({
		url : "common!getReasonTypeSelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var strs = "";
		    $("#edit_reason_type").html("");$("#new_reason_type").html("");
		    $("#newPause_reason_type").html("");$("#manage_reason_type").html("");
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.ID + ">" + value.key_name + "</option>";
		    });
		    $("#edit_reason_type").append(strs);
		    $("#new_reason_type").append(strs);
		    $("#newPause_reason_type").append(strs);
		    $("#manage_reason_type").append(strs);
		}
	});
}

function getProcessInfo(processID){
	$.ajax({
		url : "common!getProcessInfo.action",
		dataType : "json",
		data : {processID:processID},
		async : false,
		error : function(response) {
			alert(response.message);
		},
		success : function(response) {
			var list = response.data;
			//alert(list[0].process_name);
			$("#edit_processname").val(list[0].process_name);
			cur_key_name = list[0].cur_key_name;
		}
	});
}
function getNewProcessInfo(processID){
	$.ajax({
		url : "common!getProcessInfo.action",
		dataType : "json",
		data : {processID:processID},
		async : false,
		error : function(response) {
			alert(response.message);
		},
		success : function(response) {
			var list = response.data;
			//alert(list[0].process_name);
			$("#new_processname").val(list[0].process_name);
			//cur_key_name = list[0].cur_key_name;
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
			getSelects(response, "", "#edit_factory");
			getSelects_empty(response, "", "#new_factory");
			getSelects_empty(response, "", "#newPause_factory");
			getWorkshopSelect();
		}
	});
}

function getDepartmentSelect(){
	$("#edit_department").html("");
	$.ajax({
		url : "common!getExceptionDepartmentSelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			//getSelects(response.data, "", "#edit_department");	
			var strs = "";
		    $("#edit_department").html("");
		    strs += "<option value='0'>请选择</option>";
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.ID + ">" + value.key_name + "</option>";
		    });
		    $("#edit_department").append(strs);
		}
	});
}
function getNewDepartmentSelect(){
	 $("#new_department").html("");
	$.ajax({
		url : "common!getExceptionDepartmentSelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			//getSelects(response.data, "", "#edit_department");	
			var strs = "";
		    $("#new_department").html("");
		    strs += "<option value='0'>请选择</option>";
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.ID + ">" + value.key_name + "</option>";
		    });
		    $("#new_department").append(strs);
		}
	});
}

function getManagerDepartmentSelect(factory_id){
	 $("#manage_department").html("");
	$.ajax({
		url : "common!getExceptionDepartmentSelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			//getSelects(response.data, "", "#edit_department");	
			var strs = "";
		    $("#manage_department").html("");
		    strs += "<option value='0'>请选择</option>";
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.ID + ">" + value.key_name + "</option>";
		    });
		    $("#manage_department").append(strs);
		}
	});
}

function getPauseDepartmentSelect(factory_id){
	 $("#newPause_department").html("");
	$.ajax({
		url : "common!getExceptionDepartmentSelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			//getSelects(response.data, "", "#edit_department");	
			var strs = "";
		    $("#newPause_department").html("");
		    strs += "<option value='0'>请选择</option>";
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.ID + ">" + value.key_name + "</option>";
		    });
		    $("#newPause_department").append(strs);
		}
	});
}

function getWorkshopSelect() {
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {"factoryId": $('#search_factory').val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response, "", "#search_workshop");	
		}
	});
}
function getEditWorkshopSelect() {
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {"factoryId": $('#edit_factory').val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response, "", "#edit_workshop");	
		}
	});
}
function getNewWorkshopSelect() {
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {"factoryId": $('#new_factory').val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_empty(response, "", "#new_workshop");	
		}
	});
}
function getNewPauseWorkshopSelect() {
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {"factoryId": $('#newPause_factory').val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_empty(response, "", "#newPause_workshop");	
		}
	});
}

function getAllLineSelect() {
	$("#search_line").empty();
	$.ajax({
		url : "common!getLineSelect.action",
		dataType : "json",
		data : {
				workshopId:$("#search_workshop").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_empty(response, "", "#search_line"); 
		}
	});
}
function getEditAllLineSelect() {
	$("#exec_line").empty();
	$.ajax({
		url : "common!getLineSelect.action",
		dataType : "json",
		data : {
				workshopId:$("#edit_workshop").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_empty(response, "", "#edit_line"); 
		}
	});
}
function getNewAllLineSelect() {
	$("#new_line").empty();
	$.ajax({
		url : "common!getLineSelect.action",
		dataType : "json",
		data : {
				workshopId:$("#new_workshop").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_empty(response, "", "#new_line"); 
		}
	});
}
function getNewPauseAllLineSelect() {
	$("#newPause_line").empty();
	$.ajax({
		url : "common!getLineSelect.action",
		dataType : "json",
		data : {
				workshopId:$("#newPause_workshop").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			//getSelects_empty(response, "", "#newPause_line"); 
			var line_check = "";
			$.each(response,function (index,value) {
				line_check += value.name + " : <input id='"+value.id+"' onclick='checkLine(this)' type='checkbox'> ";
			})
			$("#line_check").html(line_check);
		}
	});
}

function getUserFactory(){
	$.ajax({
		url : "common!getFactoryInfoByUserId.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$.each(response.data,function (index,value) {
				$("#search_factory").val(value.FACTORY_ID)
			})
			
		}
	});
	
}

function checkLine(t){
	if($(t).prop("checked")){
		//alert($(t).attr('id'));
		lineStr += $(t).attr('id') + ',' ;
		//line_str += $(t).attr('id');
	}else{
		var uncheck = $(t).attr('id') + ',';
		lineStr = lineStr.replace(uncheck,'');
	}
	$('#line_str').val(lineStr);
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

