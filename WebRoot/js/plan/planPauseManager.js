var orderlist=[];
var orderDescList=[];
$(document).ready(function () {
	initPage();
	
	function initPage(){
		getFactorySelect();
		getReasonTypeSelect();
		getBusType();
		getOrderNoSelect("#search_order_no","#orderId");
		
	/*	getOrderNoSelect("#order_no_list","#orderId",function(obj){
			var order_li="<li class=\"search-choice\"><span>"+
			obj.orderNo+"</span><button type=\"button\" class=\"close rmorder\" title=\"删除\" style=\"font-size: 16px;\" aria-label=\"Close\">"+
			"<span aria-hidden=\"true\">×</span></button></li>";
			
			$("#order_area ul").append(order_li);
			$("#order_no_list").hide();
			$("#order_area").show();
			orderlist.push(obj.orderNo);
			orderDescList.push(obj.orderNo+" "+obj.name + " " + obj.busType +" "+ obj.orderQty+"台 ");
		},$("#newPause_bus_type :selected").text(),newPause_factory,"area");*/
		
	}
	$("#order_no_list").typeahead({
		source : function(input, process) {
			var bustype=$("#newPause_bus_type :selected").text();
			var factory=$("#newPause_factory :selected").text()=="请选择"?"":$("#newPause_factory :selected").text();
			
			var data={
					"conditionMap.busType":bustype,
					"conditionMap.orderNo":input,
					"conditionMap.factory":factory
			};		
			return $.ajax({
				url:"common!getOrderFuzzySelect.action",
				dataType : "json",
				type : "get",
				data : data,
				success: function (data) { 
					order_list = data;
					var results = new Array();
					$.each(data, function(index, value) {
						results.push(value.orderNo);
					})
					return process(results);
				}
			});
		},
		items : 30,
		highlighter : function(item) {
			var order_name = "";
			var bus_type = "";
			var order_qty = "";
			$.each(order_list, function(index, value) {
				if (value.orderNo == item) {
					order_name = value.name;
					bus_type = value.busType;
					order_qty = value.orderQty + "台";
				}
			})
			return item + "  " + order_name + " " + bus_type + order_qty;
		},
		matcher : function(item) {
			return true;
		},
		updater : function(item) {
			$.each(order_list, function(index, value) {
				if (value.orderNo == item) {
					selectId = value.id;
					var order_li="<li class=\"search-choice\"><span>"+
					value.orderNo+"</span><button type=\"button\" class=\"close rmorder\" title=\"删除\" style=\"font-size: 16px;\" aria-label=\"Close\">"+
					"<span aria-hidden=\"true\">×</span></button></li>";
					
					$("#order_area ul").append(order_li);
					$("#order_no_list").hide();
					$("#order_area").show();
					orderlist.push(obj.orderNo);
					orderDescList.push(value.orderNo+" "+value.name + " " + value.busType +" "+ value.orderQty+"台 ");
				}
			})
			// alert(submitId);
			$(elementId).attr("order_id", selectId);
			$(submitId).val(selectId);
			return item;
		}	
	});
	
	$("#btnAdd").click (function () {
		orderlist=[];
		orderDescList=[];
		$("#order_area ul").html("");
		getReasonTypeSelect_new();
		$("#line_str").val('');
		lineStr = "";
		$("#newPauseModal").modal("show");
		$("#newPause_factory").val("");
		$("#newPause_workshop").val("");
		$("#line_check").html("请先选择车间");
		return false;
	});
	$('#newPause_factory').change(function(){ 
		getNewPauseWorkshopSelect();
		getPauseDepartmentSelect($('#newPause_factory').val());
	})
	$("#newPause_workshop").change(function(){
		$("#newPause_line").empty();
		if($("#newPause_workshop").val() !=''){
			getNewPauseAllLineSelect();
		}
	});
	//订单范围点击显示订单模糊查询输入框
	$("#order_area").live("click",function(e){
		var c=$(e.target).attr("class")

		if(c!="close rmorder"){
			$(this).hide();
			$("#order_no_list").val("");
			$("#order_no_list").show();
			$("#order_no_list").focus();
		}	
	});
	
	//订单范围删除订单
	$(".rmorder").live("click",function(){
		var orderNo=$(this).parent("li").find("span").eq(0).html();
		var index=orderlist.indexOf(orderNo);
		orderlist.splice(index,1);
		orderDescList.splice(index,1);
		$(this).parent("li").remove();
	});
	
	$("#order_no_list").live("blur",function(){
		$(this).hide();
		$("#order_area").show();
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
		var pauseTime=getPauseMin($("#newPause_date_start").val(),$("#newPause_pfinish_time").val(),'H');
		if(pauseTime<$("#new_ppause_time").val()){
			alert("输入的停线时长不能超出预计停线时长！");
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
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#btnManageConfirm").click (function () {
		if($("#manage_date_end").val()==""){
			alert("请选择停线实际结束时间");
			return false;
		}
		if($("#manage_date_start").val()==""){
			alert("请选择停线开始时间");
			return false;
		}
		if($("#manage_close_date").val()==""){
			alert("请选择处理时间");
			return false;
		}
		if(isNaN(parseFloat($("#capacityLoss").val()))){
			alert("损失产能必须为数字！");
			return false;
		}
		var pauseTime=getPauseMin($("#manage_date_start").val(),$("#manage_date_end").val(),'H');
		if(pauseTime<$("#manage_pause_time").val()){
			alert("输入的停线时长不能超出实际停线时长！");
			return false;
		}
		
		if($("#manage_date_end").val()<=$("#manage_date_start").val()){
			alert("停线实际结束时间不能小于开始时间！");
			return false;
		}
		if($("#manage_close_date").val()<=$("#manage_date_start").val()){
			alert("处理时间不能小于开始时间！");
			return false;
		}
		if($("#manage_close_date").val()>=$("#manage_date_end").val()){
			alert("处理时间不能大于结束时间！");
			return false;
		}
		
		ajaxManageConfirm();
		return false;
	});
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect();
	})
	$("#search_workshop").change(function(){
		$("#search_line").empty();
		if($("#search_workshop").val() !=''){
			getAllLineSelect();
		}
	});
	
	$("#btnExport").click (function () {
		window.open("plan!exportPause.action?factory_id="+$('#search_factory').val()+"&workshop_id="+$('#search_workshop').val()+"&line_id="+$('#search_line').val()
		+"&bus_number=&severity_level=&measures=&status=&date_start="+$('#date_start').val()
		+"&date_end="+$('#date_end').val()+"&exception_type=1&reason_type_id="+$('#search_reason_type').val()
		+"&order_no="+$('#search_order_no').val()+"&date_start2="+$('#date_start2').val()+"&date_end2="+$('#date_end2').val());
		return false;
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
			"order":orderlist.join(","),
			"orderDesc":orderDescList.join("<br />"),
			"p_pause_time":$("#new_ppause_time").val()
			},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				alert("增加成功");
				$("#newPauseModal").modal("hide");
				ajaxQuery();
				
				var mailTo=$("#new_pause_email_send").val();
				var cc=$("#new_pause_email_cc").val();
				var title="第十九事业部"+$('#newPause_factory :selected').text()+$('#newPause_workshop :selected').text()+"车间停线通报";
				var user= $("#userName").val();
				var thead="订单,停线时间,预计恢复时间,预计累计停线时间（H）,停线原因,发出人,停线车间,停线类型,责任部门,损失人数,损失工时（H）,产能损失,备注";
				//alert(user);
				var pauseTime=getPauseMin($('#newPause_date_start').val(),$('#newPause_pfinish_time').val(),'H');
				var tbdatalist="[{'订单':'"+orderDescList.join("<br/>")+"',";
				tbdatalist+="'停线时间':'"+$('#newPause_date_start').val()+"',";
				tbdatalist+="'预计恢复时间':'"+$('#newPause_pfinish_time').val()+"',";
				tbdatalist+="'预计累计停线时间（H）':'"+"',";
				tbdatalist+="'停线原因':'"+$('#new_pause_detailed_reasons').val()+"',";
				tbdatalist+="'发出人':'"+user+"',";
				tbdatalist+="'停线车间':'"+$('#newPause_workshop :selected').text()+"',";
				tbdatalist+="'停线类型':'"+$('#newPause_reason_type :selected').text()+"',";
				tbdatalist+="'责任部门':'"+$('#newPause_department :selected').text()+"',";
				tbdatalist+="'损失人数':'"+$("#new_pause_waste_num").val()+"',";
				tbdatalist+="'损失工时（H）':'"+"',";
				tbdatalist+="'产能损失':'"+"',";
				tbdatalist+="'备注':'"+$("#new_pause_memo").val()+"'}]";
				sendEmail(mailTo,cc,title,thead,tbdatalist);
				
			} else {
				alert(response.message);
			}
		}
	})
}

function ajaxQuery(targetPage){
	$.ajax({
	    url: "plan!getExceptionList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"workshop_id": $('#search_workshop').val(),
	    	"line_id": $('#search_line').val(),
	    	"bus_number": '',
	    	"severity_level": '',
	    	"measures": '',
	    	"status": '',	    	
	    	"date_start":$('#date_start').val(),
	    	"date_end":$('#date_end').val(),
	    	"exception_type" : "1",
	    	"reason_type_id" : $('#search_reason_type').val(),
	    	"order_no" : $('#search_order_no').val(), 	
	    	"date_start2": $('#date_start2').val(),
	    	"date_end2": $('#date_end2').val(),
	    	"pager.pageSize":10,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableException tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr height='30px' id= '"+value.id+"'/>");
    			/*$("<td style=\"text-align:center;padding:3px\" />").html(index+1).appendTo(tr);*/
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.workshop_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.line).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.order_list).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.start_time).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.pfinish_time).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.finish_time).appendTo(tr);
    			//$("<td style=\"text-align:center;padding:0px\" />").html(getPauseMin_T(value.start_time,value.finish_time) + "分钟").appendTo(tr);
    			if(value.pause_time){
    				$("<td style=\"text-align:center;padding:3px\" />").html(value.pause_time).appendTo(tr);
    			}else{
    				$("<td style=\"text-align:center;padding:3px\" />").html(value.p_pause_time).appendTo(tr);
    			}
    			/*$("<td style=\"text-align:center;padding:0px\" />").html((value.severity_level=="0")?"不影响":((value.severity_level=="1")?"普通":"严重")).appendTo(tr);*/
/*    			$("<td style=\"text-align:center;padding:3px\" />").html(value.process_code).appendTo(tr);*/
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.reson_type).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.detailed_reasons).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.department).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.waste_num).appendTo(tr);
    			if(value.pause_time){
    				$("<td style=\"text-align:center;padding:3px\" />").html(value.pause_time*value.waste_num).appendTo(tr);
    			}else if(value.p_pause_time){
    				$("<td style=\"text-align:center;padding:3px\" />").html(value.p_pause_time*value.waste_num).appendTo(tr);
    			}else{
    				$("<td style=\"text-align:center;padding:3px\" />").html("").appendTo(tr);
    			}
    			
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.capacity_loss).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html((value.finish_time==undefined)?"停线中":"已恢复").appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html(value.display_name).appendTo(tr);
    			$("<td style=\"text-align:center;padding:3px\" />").html("<button onclick = 'ajaxEdit(" + value.id + ");' class='btn-link'>编辑</>").appendTo(tr);
    			$("#tableException tbody").append(tr);
    		});
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();
	    }
	});
}

function ajaxEdit(exception_id){
	//$("#edit_severity_level").html("");
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
						$("#manage_id").val(value.id);
						$("#manage_exception_type").val(value.exception_type);
						(value.bus_number != null)?$("#manage_bus_number").val(value.bus_number):$("#manage_bus_number").val("停线");
						(value.solution != null)?$("#manage_solution").val(value.solution):$("#manage_solution").val("");
						(value.close_date != null)?$("#manage_close_date").val(value.close_date):$("#manage_close_date").val("");
						$("#manage_order").val(value.order_list);
						$("#manage_order").data("order_desc",value.order_desc);
						getManagerDepartmentSelect();
						$("#manage_department").val(value.duty_department_id);
						$("#is_new").val('0');
						$("#manage_waste_num").val(value.waste_num);
						getReasonTypeSelect();
						$("#manage_reason_type").val(value.reason_type_id);
						$("#manage_date_start").val(value.start_time);						
						$("#manage_pfinish_time").val(value.pfinish_time);				
						$("#manage_date_end").val(value.finish_time);
						$("#manage_close_date").val(value.close_date);
						$("#manage_detailed_reasons").val(value.detailed_reasons);
						$("#manage_memo").val(value.memo);
						$("#manage_email_send").val(value.email_send);
						$("#manage_bus_type").val(value.bus_type_id);
						$("#manage_pause_time").val(value.pause_time==undefined?"":value.pause_time);
						$("#capacityLoss").val(value.capacity_loss==undefined?"":value.capacity_loss);
						$("#manageModal").data("factory",value.factory_name);
						$("#manageModal").data("workshop",value.workshop_name);
					}
				})								
						
				$("#manageModal").modal("show");
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
			"capacityLoss":$("#capacityLoss").val(),
			"exception_type" : $("#manage_exception_type").val(),
			"duty_department_id" : $('#manage_department').val(),
			"solution" : $('#manage_solution').val(),	
			"close_date" : $('#manage_close_date').val(),
			"start_time" : $('#manage_date_start').val(),
			"pfinish_time" : $('#manage_pfinish_time').val(),
			"finish_time" : $('#manage_date_end').val(),
			"detailed_reasons" : $('#manage_detailed_reasons').val(),
			"memo" : $('#manage_memo').val(),
			"email_id" : email_id,
			"email_send" : $('#manage_email_send').val(),
			"bus_type" : $('#manage_bus_type').val(),
			"waste_num" : $('#manage_waste_num').val(),			
			"pause_time":$("#manage_pause_time").val()
			},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				alert("处理成功");
				$("#manageModal").modal("hide");
				ajaxQuery();
				
				var mailTo=$("#manage_email_send").val();
				var cc=$("#manage_email_cc").val();
				var title="第十九事业部"+$("#manageModal").data("factory")+$("#manageModal").data("workshop")+"车间停线恢复通报";
				var user= $("#userName").val();
				var thead="订单,停线时间,恢复时间,累计停线时间（H）,停线原因,发出人,停线车间,停线类型,责任部门,损失人数,损失工时（H）,产能损失,备注";
				//alert(user);
				var pauseTime=$("#manage_pause_time").val();
				var tbdatalist="[{'订单':'"+($("#manage_order").data("order_desc")==undefined?"":$("#manage_order").data("order_desc"))+"',";
				tbdatalist+="'停线时间':'"+$('#manage_date_start').val()+"',";
				tbdatalist+="'恢复时间':'"+$('#manage_date_end').val()+"',";
				tbdatalist+="'累计停线时间（H）':'"+pauseTime+"',";
				tbdatalist+="'停线原因':'"+$('#manage_detailed_reasons').val()+"',";
				tbdatalist+="'发出人':'"+user+"',";
				tbdatalist+="'停线车间':'"+$("#manageModal").data("workshop")+"',";
				tbdatalist+="'停线类型':'"+$('#manage_reason_type :selected').text()+"',";
				tbdatalist+="'责任部门':'"+$('#manage_department :selected').text()+"',";
				tbdatalist+="'损失人数':'"+$("#manage_waste_num").val()+"',";
				tbdatalist+="'损失工时（H）':'"+(pauseTime*parseFloat($("#manage_waste_num").val()))+"',";
				tbdatalist+="'产能损失':'"+$("#capacityLoss").val()+"',";
				tbdatalist+="'备注':'"+$("#manage_memo").val()+"'}]";
				sendEmail(mailTo,cc,title,thead,tbdatalist);
			} else {
				alert(response.message);
			}
		}
	})
}


function getManagerDepartmentSelect(){
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

function getPauseMin_T(start_time,end_time){
	if((start_time == "")||(start_time == null)) return 0;
	var data2;
	var date3;
	if((end_time == "")||(end_time == null)){
		date2=new Date();
	}else{
		date2=new Date(end_time.replace("-","/").replace("-","/") + ":00");
	}
	var date1=new Date(start_time.replace("-","/").replace("-","/") + ":00");
	
	date3=date2.getTime()-date1.getTime();
	
	if(date3/1000/60 >60){
		return Div(date3/1000/60,60) + "小时" + Math.round(date3/1000/60%60)
	}else{
		return (date3/1000/60).toFixed(2);
	}
}
function getPauseMin(start_time,end_time,unit){
	if((start_time == "")||(start_time == null)) return 0;
	var data2;
	if((end_time == "")||(end_time == null)){
		date2=new Date();
	}else{
		date2=new Date(end_time.replace("-","/").replace("-","/") + ":00");
	}
	var date1=new Date(start_time.replace("-","/").replace("-","/") + ":00");
	//var date2=new Date(end_time.replace("-","/").replace("-","/") + ":00");
	var date3=date2.getTime()-date1.getTime();
	if(unit=='H'){
		return (date3/1000/3600).toFixed(2) ;
	}
	if(unit=='Min'){
		return (date3/1000/60).toFixed(2) ;
	}
}
//整除
function Div(exp1, exp2)
{
    var n1 = Math.round(exp1); //四舍五入
    var n2 = Math.round(exp2); //四舍五入    
    var rslt = n1 / n2; //除   
    if (rslt >= 0)
    {
        rslt = Math.floor(rslt); //返回值为小于等于其数值参数的最大整数值。
    }
    else
    {
        rslt = Math.ceil(rslt); //返回值为大于等于其数字参数的最小整数。
    }    
    return rslt;
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
			getSelects_empty(response, "", "#newPause_factory");
			getWorkshopSelect();
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
function getReasonTypeSelect() {
	$("#search_reason_type").empty();
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
		    $("#search_reason_type").html("<option value=''>全部</option>");
		    $("#manage_reason_type").html("<option value=''>全部</option>");
		    $.each(response.data, function(index, value) {
		    	strs += "<option value=" + value.ID + ">" + value.key_name + "</option>";
		    });
		    $("#search_reason_type").append(strs);
		    $("#manage_reason_type").append(strs);
		}
	});
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
function getReasonTypeSelect_new() {
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
