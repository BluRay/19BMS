var pageSize = 20;
var timeConfigCount = 0;
var ready_hour = 0;
var edit_list = [];
var re_f = /^[0-9]+[0-9]*\.?[0|5]?$/;// 浮点数正则表达式
$(document).ready(function() {
	initPage();
	
	// 复选框全选、反选
	$("#checkall").click(function() {
		if ($(this).attr("checked") == "checked") {
			check_All_unAll("#workhour_tb", true);
		} else
			check_All_unAll("#workhour_tb", false);
	});
	// Enter键移动输入光标
	$(".work_hour").live("keydown", function(event) {
		if (event.keyCode == "13") {
			$(this).parent().parent().next().find("input").focus();
		}
	});
	
	// 删除
	$(".close").live("click", function(e) {
		$(e.target).closest("tr").remove();
	});

	function initPage() {
		//getAuthorityFactorySelect("#factory", "", "noall");
		getFactorySelect("#factory", "", "");
		getOrderNoSelect("#order_no","#orderId");
		ajaxQuery(1);
	}
	
	// 技改信息查询
	$("#btnQuery").click(function() {
		ajaxQuery();
		return false;
	});
	
	$("#btnConfigConfirm").click(function() {
		ajaxConfig();
		return false;
	});
	//end
});

/**
 * 查询 mod by 吴潇
 */
function ajaxQuery(targetPage) {
	$.ajax({
		url : "techTask!getWorkHourEstimateList.action",
		dataType : "json",
		type : "post",
		data : {
			"factory" : $('#factory').find("option:selected").text(),
			"order_no" : $('#order_no').val(),
			
			"task_content" : $('#task_content').val(),
			"tech_order_no" : $('#tech_order_no').val(),

			"status" : $('#status').val(),
			"tech_date_start" : $('#tech_date_start').val(),
			"tech_date_end" : $('#tech_date_end').val(),
			"pager.pageSize" : pageSize || 20,
			"pager.curPage" : targetPage || 1
		},
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$("#tableTaskFollow tbody").html("");

			$.each(response.data, function(index, value) {
				var tr = $("<tr />");
				$("<td />").html(value.task_content).appendTo(tr);
				$("<td />").html(getKeys("ECN_CHANGE_TYPE",value.tech_order_type)).appendTo(tr);
				$("<td />").html(value.tech_order_no).appendTo(tr);
				//$("<td />").html("<a href='#' onclick='window.open(\""+value.tech_order_file+"\")'>"+(value.tech_order_file==""?"":"查看")+"</a>").appendTo(tr);
				$("<td />").html(value.tech_date).appendTo(tr);
				//$("<td />").html(getKeys("ECN_DUTY_UNIT",value.duty_unit)).appendTo(tr);
				$("<td />").html(value.order_no).appendTo(tr);
				$("<td />").html(value.factory).appendTo(tr);
				//$("<td />").html("<a href='#' onclick='window.open(\""+value.custom_change_file+"\")'>"+(value.custom_change_file==""?"":"查看")+"</a>").appendTo(tr);
				$("<td />").html(value.single_time_total).appendTo(tr);
				//$("<td />").html(getKeys("ECN_TYPE",value.tech_type)).appendTo(tr);
				if(value.finish_date!="" || (value.edit_date !='' && value.assign_date =='' && value.assess_date =='' && value.finish_date =='') ){
					$("<td />").html("").appendTo(tr);
				}else{
					$("<td />").html("<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\"  title='修改'style=\"cursor: pointer;text-align: center;\" onclick='showConfigModal("+value.id+","+value.tech_task_id+",\""+value.factory+"\",\""+value.time_list+"\",\""+value.tech_list+"\")' ></i>").appendTo(tr);
				}
				$("#tableTaskFollow tbody").append(tr);

				$(tr).data("id", value.id);

			});
			$("#total").html(response.pager.totalCount);
			$("#total").attr("total", response.pager.totalCount);
			$("#cur").attr("page", response.pager.curPage);
			$("#cur").html("<a href=\"#\">" + response.pager.curPage + "</a>");
			$("#pagination").show();
		}
	});
}

function showConfigModal(id,tech_task_id,factory,time_list,tech_list){
	re1 = new RegExp(":","g"); //定义正则表达式//第一个参数是要替换掉的内容，第二个参数"g"表示替换全部（global）。
	re2 = new RegExp(",","g");
	var jsonobj;
	if(time_list && time_list!=''){
		str = "{\""+time_list.replace(re1,"\":").replace(re2,",\"")+"}";
		jsonobj = JSON.parse(str);
	}
	
	$("#tableDepartment tbody").html("");
	$.each(getWorkshopOrg(factory), function(index, value){
		var tr=$("<tr />");
		/*$("<td />").html(value.factory_name).appendTo(tr);*/
		$("<td />").html(value).appendTo(tr);
		var unitTimeInput=$("<input type=\"text\" class=\"unit_time\" style=\"text-align: center;ime-mode: disabled;\" onkeyup=\"gaga(this);\" onpaste=\"return false;\" >");
		//$(unitTimeInput).data("unit_time",value.unit_time||0);
		if(jsonobj){
			for (key in jsonobj) {
				if(key==value){
					unitTimeInput.val(jsonobj[key]);
					break;
				}
			}
		}
		$("<td />").append(unitTimeInput).appendTo(tr);
		$("<td />").html("H").appendTo(tr);
		//tr.data("ecn_time_id", value.id);
		//tr.data("time_taskid", taskid);
		//tr.data("workshopid", value.workshopid);
		$("#tableDepartment tbody").append(tr);
	});
	//$("#config_totalhour").html($("#configModal").data("totalHour")+"H");
	
	var total_hour = 0;
	$(".unit_time").each(function(index, value){
		total_hour += Number($(this).val());
	});
	$("#config_totalhour").html(total_hour);
	
	$(".unit_time").live("blur", function(e) {
		total_hour = 0;
		$(".unit_time").each(function(index, value){
			total_hour += Number($(this).val());
		});
		$("#config_totalhour").html(total_hour);
	});
	
	$("#tech_task_id").val(tech_task_id);
	$("#tech_list").val(tech_list);
	$("#id").val(id);
	
	$("#configModal").modal("show");
}

//add by wuxiao start
function ajaxConfig() {
	var time_list="";
	$("#tableDepartment tbody tr").each(function(e){
		var workshop = $(this).find("td").eq(0).html();
		var workhour = $(this).find("td").eq(1).find("input").eq(0).val();
		if(workhour==''){
			// do nothing!
		}else{
			time_list += workshop + ":" + workhour + ",";
		}
	});
	
	var total_hour = 0;
	var tech_list = $('#tech_list').val();
	var jsonobj;
	if(tech_list && tech_list!=''){
		str = "{\""+tech_list.replace(re1,"\":").replace(re2,",\"")+"}";
		jsonobj = JSON.parse(str);
	}
	
	if(time_list==""){
		//回滚
		$.ajax({
			url : "techTask!editTechWorkHourEstimate.action",
			dataType : "json",
			type : "post",
			data : {
				"time_list": "",
				"single_time_total": "",
				"id": $("#id").val(),
				"tech_task_id": $("#tech_task_id").val(),
				"total_hour" : "",
				"flg": 1
			},
			success : function(response) {
				if (response.success) {
					//$(".divLoading").hide();
					//$("#btnMtaSave").attr("disabled", false);
					$("#configModal").modal("hide");
					alert(response.message);
					ajaxQuery();
				} else {
					alert(response.message);
				}
			}
		});
	}else{
		//修改
		time_list = time_list.substring(0,time_list.length-1);
		var jsonobj1;
		if(time_list && time_list!=''){
			str = "{\""+time_list.replace(re1,"\":").replace(re2,",\"")+"}";
			jsonobj1 = JSON.parse(str);
		}
		if(jsonobj){
			for (key in jsonobj) {
				for (key1 in jsonobj1) {
					if(key==key1){
						total_hour += parseFloat(jsonobj1[key1]) * parseFloat(jsonobj[key]);
						//break;
					}
				}
			}
		}
		$.ajax({
			url : "techTask!editTechWorkHourEstimate.action",
			dataType : "json",
			type : "post",
			data : {
				"time_list": time_list,
				"single_time_total": $("#config_totalhour").html(),
				"id": $("#id").val(),
				"tech_task_id": $("#tech_task_id").val(),
				"total_hour" : total_hour,
				"flg": 0
			},
			success : function(response) {
				if (response.success) {
					//$(".divLoading").hide();
					//$("#btnMtaSave").attr("disabled", false);
					$("#configModal").modal("hide");
					alert(response.message);
					ajaxQuery();
				} else {
					alert(response.message);
				}
			}
		});
	}
}

//格局化日期：yyyy-MM-dd
function formatDate(date) {
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();

	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return (myyear + "-" + mymonth + "-" + myweekday);
}

function getSelectRowDatas(tableID) {
    var trs = $("#" + tableID).find("tr");
    var propertyValue;
    var selectData = new Array();
    for (var i = 1; i < trs.length; i++) { //第二行开始为数据
        var obj = new Object();
        var objTr = trs[i];
        var tdArray = objTr.childNodes;
        
        if(tdArray[0].innerHTML == "" && tdArray[0].children.length == 0){
          continue;
        }
        
        for (var j = 0; j < tdArray.length; j++) {
            var propertyName = tdArray[j].id;
            propertyValue = tdArray[j].innerHTML;
            var childTag = tdArray[j].children;
            if (childTag.length > 0) {
                var inputType = childTag[0].tagName;
                var inputName = childTag[0].type;
                if (inputName == "checkbox") {
                    if (childTag[0].checked == false) { //判断为没有选中的数据行直接跳出不做处理
                        break;
                    }
                    continue;
                }
                if ((inputType == "INPUT" && inputName == "hidden") || (inputType == "INPUT" && inputName == "text") || inputType == "SELECT") {
                    propertyValue = childTag[0].value;
                }else if(inputType==="A"){
                    propertyValue = childTag[0].innerHTML;
                }
            }
            obj[propertyName] = propertyValue;
        }
        if (!isEmptyObject(obj)) {
            selectData.push(obj);
        }

    }
    return selectData;
}

function isEmptyObject(obj){
    for(var n in obj){
        return false;
    }
    return true;
}

function getKeys(keyCode,input) {
	var returnValue="";
	$.ajax({
		url : "common!getKeysSelect.action",
		dataType : "json",
		data : {
			keyCode : keyCode
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$.each(response.data, function(index, value) {
				if (input == value.id) {
					returnValue = value.key_name
				}
			});
		}
	});
	return returnValue;
}

function getWorkshopOrg(factory) {
	var result = [];
	$.ajax({
		url : "common!getWorkshopSelect_Key.action",
		dataType : "json",
		data : {
			"conditionMap.factory" : factory
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			$.each(response, function(index, value) {
				result.push(value.name);
			});
		}
	});
	return result;
}

function gaga(obj) { // 值允许输入一个小数点和数字
    obj.value = obj.value.replace(/[^\d.]/g, ""); //先把非数字的都替换掉，除了数字和.
    obj.value = obj.value.replace(/^\./g, ""); //必须保证第一个为数字而不是.
    obj.value = obj.value.replace(/\.{2,}/g, "."); //保证只有出现一个.而没有多个.
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); //保证.只出现一次，而不能出现两次以上
}