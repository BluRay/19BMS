var busNoArray = new Array();
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		//alert(location.href.substr(location.href.indexOf("action?")+7,location.href.length));
		$('#rightlink').attr('href','production!execution.action?' + location.href.substr(location.href.indexOf("action?")+7,location.href.length)); 
		getKeysSelect("REASON_TYPE", "", "#reason_type"); 
		getKeysSelect("LACK_REASON", "", "#lack_reason"); 
		$('#TodayWaxPlanTable2 tr').find('th:eq(1)').hide();
		if($("#exec_type").children('option:selected').val() == "正常"){
			$("#exec_onoff").hide();
		}else{
			$("#exec_onoff").show();
		}		
		//getFactorySelect();
		getAuthorityFactorySelect("#exec_factory", "", "noall");
		getWorkshopSelect_Auth2("#exec_workshop", "", $("#exec_factory :selected").text(), "noall","");
		getAllLineSelect();
		//$("#exec_line").val(Request("line_id"));
		getAllProcessSelect();
		//$("#exec_process").val(Request("process_id"));
		getProcessInfo($("#exec_process").val());
	};
	
	function resetPage () {
        $("#vinText").removeAttr("disabled");
        $("#vinText").attr("value","");
        $("#vinText").focus();
        toggleVinHint(true);
        $("#btnSubmit").attr("disabled","disabled");
        $("#dispatchDetail tbody").html("");
        busNoArray.length = 0;
    }
	
	function ajaxEnter(){	
		//数据验证
		if($('#reason_type').val() == ""){
			alert("请选择异常类别！");
			$("#btnSubmit").removeAttr("disabled");
			return false;
		}
		if(($('#reason_type').val() == "40") && ($('#lack_reason').val() == "")){
			alert("请选择缺料原因！");
			$("#btnSubmit").removeAttr("disabled");
			return false;
		}
		
		var busNoStr = busNoArray.join("|");;
		var trs=$("#dispatchDetail tbody").find("tr");
		var busList=[];
		//var orderDescList=[];
		$.each(trs,function(index,tr){
			var bus={};
			bus.bus_number=$(tr).data("busNo");
			bus.order_no=$(tr).data("orderNo");
			bus.order_desc=$(tr).data("orderDesc");
			busList.push(bus);

		});
		//alert(busNoStr);
		
        $.ajax({
            type: "get",
            dataType: "json",
            url : "production!enterException.action",
            data: {
            	"factory_id" : $('#exec_factory').val(),
            	"workshop_id" : $('#exec_workshop').val(),
            	"line_id" : $('#exec_line').val(),
            	"process_id" : $('#exec_process').val(),
                //"bus_number":busNoStr,					//$('#vinText').val(),
                "bus_list":JSON.stringify(busList),
                "reason_type_id":$('#reason_type').val(),
                "lack_reason_id":$('#lack_reason').val(),
                "start_time":$('#start_time').val(),
                "severity_level":$('#severity_level').val(),
                "detailed_reasons":$('#detailed_reasons').val(),                
                "editor_id":$('#exec_user').val(),
            },
            success: function(response){
                resetPage();
                if(response.success){ 
                    fadeMessageAlert(response.message,"alert-success");
                    resetPage();
                }
                else{
                    fadeMessageAlert(response.message,"alert-error");
                }

                setTimeout(function() {
                    $("#vinHint").hide().html("未输入车号");
                    toggleVinHint(true);
                },60000);
            },
            error:function(){alertError();}
        });
        
    }
	
	function ajaxValidate (){
		$.ajax({
            type: "get",
            dataType: "json",
            url : "production!validateBusInfo.action",
            data: {
                "bus_number": $('#vinText').attr("value"),
                "factory_id":$("#exec_factory").val(),
            },
            success: function(response){
                if(response.success){
                    //$("#vinText").attr("disabled","disabled");
                    //show car infomation
                    if(response.data == ""){
                    	fadeMessageAlert("没有对应车号的车辆信息！","alert-error");
                    }else{
                    	toggleVinHint(false);
                    	var bus = response.data[0];
                    	$("#infoColor").html(bus.bus_color);
                    	$("#infoSeats").html(bus.bus_seats);
                    	$("#infoWorkShop").html(bus.workshop_name);
                    	$("#infoProcess").html(bus.process_name);
                    	$("#infoOrder").html(bus.order_name + bus.bus_type_code + " " + bus.order_qty + "台");
                    	$("#infoSeats").html((bus.status=="0")?"正常":"冻结");
                        $("#btnSubmit").removeAttr("disabled");
                        
                        //alert($('#vinText').attr("value"));
                        if(busNoArray.indexOf($('#vinText').attr("value")) < 0){
	                        var trindex=$("#dispatchDetail").find("tr").length-1;
	                        var tr = $("<tr />");
							var busNumberInput = "<input style='border:0;width:130px;background-color:white;' " +
									"name='dispatchRecordList["+trindex+"].bus_number' value='"
									+ $('#vinText').attr("value") + "' readonly/>";
							$("<td style='width:150px' />").html(busNumberInput).appendTo(tr);
							$("<td />").html("<i name='edit' class=\"fa fa-times\" style=\"cursor: pointer\" ></i>").appendTo(tr);
							$(tr).data("busNo",$('#vinText').attr("value"));
							$(tr).data("orderNo",bus.order_no);
							$(tr).data("orderDesc",bus.order_no+" "+bus.order_name+bus.bus_type_code+" "+bus.order_qty+"台");
							$("#dispatchDetail tbody").append(tr);
							busNoArray.push($('#vinText').attr("value"));
                        }else{
            				//alert("此车已经录入！");
            				setTimeout(function(){
            					 alert("此车已经录入！");
            					 $("#busNo").focus();
            			        },0);
            				return false;
            			}
                    }

                }
                else{
                    resetPage();
                    fadeMessageAlert(response.message,"alert-error");
                }
            },
            error:function(){alertError();}
       });
	}
	Array.prototype.remove = function(val) {  
	    var index = this.indexOf(val);  
	    if (index > -1) {  
	        this.splice(index, 1);  
	    }  
	}; 
	$(".fa-times").live("click", function() {
		busNoArray.remove($(this).parent().parent().data("busNo"));
		$(this).parent().parent().remove();
	});
	
	//输入回车，发ajax进行校验；成功则显示并更新车辆信息
    $('#vinText').bind('keydown', function(event) {
        //if vinText disable,stop propogation
        if($(this).attr("disabled") == "disabled")
            return false;
        if (event.keyCode == "13"){
            if(jQuery.trim($('#vinText').val()) != ""){
                ajaxValidate();
            }
            return false;
        }
    });
    
    $("#btnSubmit").click(function() {
        if(!($("#btnSubmit").hasClass("disabled"))){
            $("#btnSubmit").attr("disabled","disabled");
            ajaxEnter();
        }
        return false;
    });
    
    $("#reset").click(function() {
        resetPage();
        return false;
    });
    
    $("#reason_type").change(function(){
		if($(this).children('option:selected').val() == "40"){
			$('#TodayWaxPlanTable2 tr').find('th:eq(1)').show();
		}else{
			$('#TodayWaxPlanTable2 tr').find('th:eq(1)').hide();
			$("#lack_reason").val("");
		}
	});
	
	$("#exec_type").change(function(){
		if($(this).children('option:selected').val() == "正常"){
			$("#exec_onoff").hide();
		}else{
			$("#exec_onoff").show();
		}
	});
	
	$("#exec_factory").change(function(){
		$("#exec_workshop").empty();
		if($("#exec_factory").val() !=''){
			getAllWorkshopSelect();
			getAllLineSelect();
			getAllProcessSelect();
			getProcessInfo($("#exec_process").val());
		}
	});
	
	$("#exec_workshop").change(function(){
		$("#exec_line").empty();
		if($("#exec_workshop").val() !=''){
			getAllLineSelect();
			getAllProcessSelect();
			getProcessInfo($("#exec_process").val());
		}
	});
	
	$("#exec_line").change(function(){
		$("#exec_process").empty();
		if($("#exec_line").val() !=''){
			getAllProcessSelect();
			getProcessInfo($("#exec_process").val());
		}
	});
	
	$("#exec_process").change(function(){
		$("#exec_processname").val('');
		if($("#exec_line").val() !=''){
			getProcessInfo($("#exec_process").val());
		}
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
				getSelects_noall(response, "", "#exec_factory");
				$("#exec_factory").val(Request("factory_id"));
				getAllWorkshopSelect();
				$("#exec_workshop").val(Request("workshop_id"));
				getAllLineSelect();
				$("#exec_line").val(Request("line_id"));
				getAllProcessSelect();
				$("#exec_process").val(Request("process_id"));
				getProcessInfo($("#exec_process").val());
			}
		});
	}
	
	   
	
})

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

function getAllWorkshopSelect() {
	$("#exec_workshop").empty();
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {
				factoryId:$("#exec_factory").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_noall(response, "", "#exec_workshop");
		}
	});
}

function getAllLineSelect() {
	$("#exec_line").empty();
	$.ajax({
		url : "common!getLineSelect.action",
		dataType : "json",
		data : {
				workshopId:$("#exec_workshop").val()
			},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_noall(response, "", "#exec_line"); 
		}
	});
}

function getAllProcessSelect() {
	$("#exec_process").empty();
	$.ajax({
		url : "common!getProcessExceptMonitorSelect.action",
		dataType : "json",
		data : {lineId:$("#exec_line").val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			//getSelects_noall(response, "", "#exec_process"); 
			var strs = "";
		    $("#exec_process").html("");
		    $.each(response, function(index, value) {
		    	if (index == 0) $("#exec_processname").val(value.PROCESS_NAME);
		    	strs += "<option value=" + value.ID + ">" + value.NAME + "</option>";
		    });
		    $("#exec_process").append(strs);
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
			$("#exec_processname").val(list[0].process_name);
		}
	});
}

function toggleVinHint (showVinHint) {
    if(showVinHint){
        $("#carInfo").hide();
        $("#vinHint").fadeIn(1000);

    }else{
        $("#vinHint").hide();
        $("#carInfo").fadeIn(1000);
    }
}
