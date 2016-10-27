var pageSize;
var const_float_validate= /^[0-9]+[0-9]*\.?[0-9]*$/;//浮点数正则表达式
var const_float_validate_one= /^\d*\.?\d?$/;//一位浮点数正则表达式
var const_int_validate = /^[0-9]+[0-9]*$/;//整数正则表达式
/* ztree树对象变量 */
var zNodes=[];
var zTreeObj={};

$(function() {
	pageSize = pageSize == null ? 10 : pageSize;
	// 分页按钮事件绑定
	$("#pre").on("click", function() {
		 //alert("前一页");
		if (parseInt($("#cur").attr("page")) > 1) { 
			ajaxQuery(parseInt($("#cur").attr("page")) - 1);
		}
	});

	$("#next").on(
			"click",
			function() {
				// alert(parseInt($("#cur").attr("page")));
				if (parseInt($("#cur").attr("page")) * pageSize < parseInt($(
						"#total").attr("total"))) {
					ajaxQuery(parseInt($("#cur").attr("page")) + 1);
				}
			});

	$("#first").on("click", function() {
		if (parseInt($("#cur").attr("page")) > 1) {
			ajaxQuery(parseInt(1));
		}
	});

	$("#last")
			.on(
					"click",
					function() {
						if (parseInt($("#cur").attr("page")) * pageSize < parseInt($(
								"#total").attr("total"))) {
							totalPage = parseInt($("#total").attr("total"))
									% pageSize === 0 ? parseInt($("#total")
									.attr("total"))
									/ pageSize : parseInt($("#total").attr(
									"total"))
									/ pageSize + 1;
							ajaxQuery(parseInt(totalPage));
						}
					});
})
function autoScroll(obj, tr_bz) {
	$(obj).find(tr_bz).animate({
		marginTop : "-1px"
	}, 'slow', function() {
		$(this).css({
			marginTop : "0px"
		}).find("tr:first").appendTo(this);
	});
}

/*
 * 填充下拉列表 with id=>value;包括全部选项
 */
function getSelects(data, selectval, element,defaultVal,valName) {
	defaultVal=defaultVal||"";	
	var strs = "<option value="+defaultVal+">全部</option>";
	$(element).html("");
	$.each(data, function(index, value) {
		if(valName=="name"){
			if (selectval == value.id || selectval == value.name) {
				strs += "<option value=" + value.name + " selected='selected'" + ">"
						+ value.name + "</option>";
			} else {
				strs += "<option value=" + value.name + ">" + value.name
						+ "</option>";
			}
		}else{
			if (selectval == value.id || selectval == value.name) {
				strs += "<option value=" + value.id + " selected='selected'" + ">"
						+ value.name + "</option>";
			} else {
				strs += "<option value=" + value.id + ">" + value.name
						+ "</option>";
			}
		}
	});
	$(element).append(strs);
}
/*
 * 填充下拉列表 with id=>value;不包括全部选项
 */
function getSelects_noall(data, selectval, element,defaultVal,valName) {
	//defaultVal=defaultVal||"";
	var strs ="";
	if(defaultVal!=undefined){
		 strs = "<option value="+defaultVal+"></option>";
	}
	
	$(element).html("");
	$.each(data, function(index, value) {
		if(valName=="name"){
			if (selectval == value.id || selectval == value.name) {
				strs += "<option value=" + value.name + " selected='selected'" + ">"
						+ value.name + "</option>";
			} else {
				strs += "<option value=" + value.name + ">" + value.name
						+ "</option>";
			}
		}else{
			if (selectval == value.id || selectval == value.name) {
				strs += "<option value=" + value.id + " selected='selected'" + ">"
						+ value.name + "</option>";
			} else {
				strs += "<option value=" + value.id + ">" + value.name
						+ "</option>";
			}
		}
	});
	$(element).append(strs);
}
/*
 * 填充下拉列表 with id=>value;不包括全部选项
 */
function getSelects_empty(data, selectval, element,defaultVal,valName) {
	//var strs = "<option value=''>请选择</option>";
	defaultVal=defaultVal||"";	
	var strs = "<option value="+defaultVal+">请选择</option>";
	$(element).html("");
	$.each(data, function(index, value) {
		if(valName=="name"){
			if (selectval == value.id || selectval == value.name) {
				strs += "<option value=" + value.name + " selected='selected'" + ">"
						+ value.name + "</option>";
			} else {
				strs += "<option value=" + value.name + ">" + value.name
						+ "</option>";
			}
		}else{
			if (selectval == value.id || selectval == value.name) {
				strs += "<option value=" + value.id + " selected='selected'" + ">"
						+ value.name + "</option>";
			} else {
				strs += "<option value=" + value.id + ">" + value.name
						+ "</option>";
			}
		}
	});
	$(element).append(strs);
}

// 表格下复选框全选、反选;checkall:true全选、false反选
function check_All_unAll(tableId, checkall) {
	if (checkall) {
		$(tableId + " tbody :checkbox").attr("checked", true);
		$(tableId + " tbody :disabled").attr("checked", false);
	} else {
		$(tableId + " tbody :checkbox").attr("checked", false);
	}
}
/*
 * 车型下拉列表 selectType:noall,empty,''
 */
function getBusTypeSelect(elementId, selectVal, selectType) {
	$.ajax({
		url : "common!getBusTypeSelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			if (selectType == 'noall') {
				getSelects_noall(response, selectVal, elementId);
			} else if (selectType == 'empty') {
				getSelects_empty(response, selectVal, elementId);
			} else {
				getSelects(response, selectVal, elementId);
			}
		}
	})
}
/*
 * 工厂下拉列表 selectType:noall,empty,''
 */
function getFactorySelect(elementId, selectVal, selectType,defaultVal,valName) {
	$.ajax({
		url : "common!getFactorySelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			if (selectType == 'noall') {
				getSelects_noall(response, selectVal, elementId,defaultVal,valName);
			} else if (selectType == 'empty') {
				getSelects_empty(response, selectVal, elementId,defaultVal,valName);
			} else {
				getSelects(response, selectVal, elementId,defaultVal,valName);
			}
		}
	})
}

/*
 * 工厂下拉列表 selectType:noall,empty,''
 */
function getAuthorityFactorySelect(elementId, selectVal, selectType,defaultVal,valName) {
	var href = window.location.href;
	var url = href.substring(href.lastIndexOf('/'), href.length);
	var ii = url.indexOf('?');
	if (ii > 0) {
		url = url.substring(0, ii);
	}
	var is= url.indexOf('#');
	if (is > 0) {
		url = url.substring(0, is);
	}
	$.ajax({
		url : "common!getAuthorityFactorySelect.action",
		dataType : "json",
		data : {
			"url" : url
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			if (selectType == 'empty') {
				getSelects_empty(response, selectVal, elementId,defaultVal,valName);
			} else if (selectType == 'noall') {
				getSelects_noall(response, selectVal, elementId,defaultVal,valName);
			} else {
				var strs = '';
				$(elementId).html("");
				var allIds = '';
				$.each(response, function(index, value) {
					if(valName=="name"){
						allIds += value.name + ",";
						if (selectVal == value.id || selectVal == value.name) {
							strs += "<option value=" + value.name
									+ " selected='selected'" + ">" + value.name
									+ "</option>";
						} else {
							strs += "<option value=" + value.name + ">" + value.name
									+ "</option>";
						}
					}else{
						allIds += value.id + ",";
						if (selectVal == value.id || selectVal == value.name) {
							strs += "<option value=" + value.id
									+ " selected='selected'" + ">" + value.name
									+ "</option>";
						} else {
							strs += "<option value=" + value.id + ">" + value.name
									+ "</option>";
						}
					}
					
				});
				strs = "<option value='" + allIds + "'>全部</option>" + strs;
				$(elementId).append(strs);
			}
		}
	})
}

/*
 * 订单工厂下拉列表 selectType:noall,empty,''
 */
function getOrderFactorySelect(elementId, orderId, selectVal, selectType,defaultVal) {
	$.ajax({
		url : "common!getOrderFactorySelect.action",
		dataType : "json",
		data : {
			'orderId' : orderId
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			if (selectType == 'noall') {
				getSelects_noall(response, selectVal, elementId,defaultVal);
			} else if (selectType == 'empty') {
				getSelects_empty(response, selectVal, elementId,defaultVal);
			} else {
				getSelects(response, selectVal, elementId,defaultVal);
			}
		}
	})
}

/**
 * 
 * @param elementId
 * @param selectVal
 * @param selectType
 * @param orderNo
 */
function getOrderConfigSelect(elementId, selectVal, selectType, orderNo) {
	if (!orderNo) {
		orderNo = ""
	}
	$.ajax({
		url : "common!getOrderConfigSelect.action",
		dataType : "json",
		data : {
			'conditionMap.orderNo' : orderNo
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			if (selectType == 'noall') {
				getSelects_noall(response, selectVal, elementId);
			} else if (selectType == 'empty') {
				getSelects_empty(response, selectVal, elementId);
			} else {
				getSelects(response, selectVal, elementId);
			}
		}
	})
}
/*
 * 订单下拉列表
 */
function getOrderSelect(elementId, busTypeId, selectVal) {
	$.ajax({
		url : "common!getOrderSelect.action",
		dataType : "json",
		data : {
			'conditionMap.busTypeId' : busTypeId
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			var strs = "<option value=''></option>";
			$(elementId).html("");
			$.each(response, function(index, value) {
				if (selectVal == value.id || selectVal == value.name) {
					strs += "<option value=" + value.id
							+ " selected='selected'" + ">" + value.orderNo
							+ " " + value.name + value.busType + value.orderQty
							+ "辆" + "</option>";
				} else {
					strs += "<option value=" + value.id + ">" + value.orderNo
							+ " " + value.name + value.busType + value.orderQty
							+ "辆" + "</option>";
				}
			});
			$(elementId).append(strs);
		}
	})
}
/**
 * 根据工厂、订单编号查询订单配置
 * 
 * @param parts
 * @returns {String}
 */
function getOrderConfigSelect_2(elementId, factoryId, orderNo, selectVal) {
	$.ajax({
		url : "common!showOrderConfigList.action",
		dataType : "json",
		data : {
			'search_order_no' : orderNo,
			'factory_id' : factoryId
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			var strs = "";
			$(elementId).html("");
			$.each(response.data, function(index, value) {
				if (selectVal == value.id
						|| selectVal == value.order_config_name) {
					strs += "<option value=" + value.id
							+ " selected='selected'" + " config_qty="
							+ value.allot_qty + ">" + value.order_config_name
							+ "</option>";
				} else {
					strs += "<option value=" + value.id + " config_qty="
							+ value.allot_qty + ">" + value.order_config_name
							+ "</option>";
				}
			});
			$(elementId).append(strs);
		}
	})
}
/*
 * 根据零部件输入值获取零部件ID
 */
function getPartsId(parts) {
	var partsId = "0";
	$.ajax({
		url : "common!getPartsSelectByParts.action",
		dataType : "json",
		data : {
			"conditionMap.parts" : parts
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			if (response.length > 0) {
				partsId = response[0].id;
			}
		}
	})
	return partsId;
}
/*
 * 零部件模糊查询,submitId： 用于提交的元素的id
 */
function getPartsSelect(elementId, submitId, fn_backcall) {
	var partslist;
	$(elementId).typeahead({
		source : function(input, process) {
			$.get("common!getPartsSelect.action", {
				"conditionMap.parts" : input
			}, function(data) {
				partslist = data;
				var results = new Array();
				$.each(data, function(index, value) {
					results.push(value.name);
				})
				return process(results);
			}, 'json');
		},
		matcher : function(item) {
			//alert(item)
			var selectId = "";
			$.each(partslist, function(index, value) {
				if (value.name == item) {
					selectId = value.id;
					if (typeof (fn_backcall) == "function") {
						fn_backcall(value);
					}
				}
			})

			// alert(selectId);
			$(elementId).attr("parts_id", selectId);
			$(submitId).val(selectId);
			return true;
			
		},
		items : 30,
		updater : function(item) {
			var selectId = "";
			$.each(partslist, function(index, value) {
				if (value.name == item) {
					selectId = value.id;
					if (typeof (fn_backcall) == "function") {
						fn_backcall(value);
					}
				}
			})

			// alert(selectId);
			$(elementId).attr("parts_id", selectId);
			$(submitId).val(selectId);
			return item;
		}
	});
}
/*
 * 订单编号模糊查询 submitId： 用于提交的元素的id
 */
function getOrderNoSelect(elementId, submitId, fn_backcall, bustype,factory) {
	if (!bustype) {
		bustype = "";
	}
	if(!factory){
		factory="";
	}
	var orderlist;
	//alert($(elementId).next().html())
	//alert(factory);
	$(elementId).typeahead({		
		source : function(input, process) {
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
					orderlist = data;
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
			$.each(orderlist, function(index, value) {
				if (value.orderNo == item) {
					order_name = value.name;
					bus_type = value.busType;
					order_qty = value.orderQty + "台";
				}
			})
			return item + "  " + order_name + " " + bus_type + order_qty;
		},
		matcher : function(item) {
			// alert(this.query);
			$.each(orderlist, function(index, value) {
				if (value.orderNo == item) {
					selectId = value.id;
					if (typeof (fn_backcall) == "function") {
						fn_backcall(value);
					}
				}
			})
			// alert(submitId);
			$(elementId).attr("order_id", selectId);
			$(submitId).val(selectId);
			return true;
		},
		updater : function(item) {
			$.each(orderlist, function(index, value) {
				if (value.orderNo == item) {
					selectId = value.id;
					if (typeof (fn_backcall) == "function") {
						fn_backcall(value);
					}
				}
			})
			// alert(submitId);
			$(elementId).attr("order_id", selectId);
			$(submitId).val(selectId);
			return item;
		}
	});
}


/*
 * 查号模糊查询 submitId： 用于提交的元素的id
 */
function getBusNumberSelect(elementId, submitId, fn_backcall) {
	var busNumberlist;
	$(elementId).typeahead({
		source : function(input, process) {
			$.get("common!getBusNumberFuzzySelect.action", {
				"conditionMap.bus_input" : input
			}, function(data) {
				busNumberlist = data;
				var results = new Array();
				$.each(data, function(index, value) {
					results.push(value.bus_number);
				})
				return process(results);
			}, 'json');
		},
		items : 30,
		matcher : function(item) {
			// alert(this.query);
			return true;
		},
		updater : function(item) {
			$.each(busNumberlist, function(index, value) {
				if (value.bus_number == item) {
					selectId = value.order_id;
					if (typeof (fn_backcall) == "function") {
						fn_backcall(value);
					}
				}
			})
			// alert(submitId);
			$(elementId).attr("order_id", selectId);
			//$(submitId).val(selectId);
			return item;
		}
	});
}

/*
 * 工序模糊查询，fn_backcall：回调函数
 */
function getProcessSelect(elementId, workshop, fn_backcall) {
	var processlist;
	$(elementId).typeahead({
		source : function(input, process) {
			$.get("common!getProcessSelect.action", {
				"conditionMap.workshop" : workshop,
				"conditionMap.processName" : input
			}, function(data) {
				processlist = data;
				var results = new Array();
				$.each(data, function(index, value) {
					results.push(value.process_name);
				})
				return process(results);
			}, 'json');
		},
		matcher : function(item) {
			var selectId = "";
			$.each(processlist, function(index, value) {
				if (value.process_name == item) {
					selectId = value.id;
					if (typeof (fn_backcall) == "function") {
						fn_backcall(value);
					}
				}
			})
			return true;
		},
		items : 30,
		updater : function(item) {
			var selectId = "";
			$.each(processlist, function(index, value) {
				if (value.process_name == item) {
					selectId = value.id;
					if (typeof (fn_backcall) == "function") {
						fn_backcall(value);
					}
				}
			})
			return item;
		}
	});
}
/*
 * 检测频率下拉列表
 */
function getFrequencySelect(elementId, selectVal) {
	$.ajax({
		url : "common!getFrequencySelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			getSelects_noall(response, selectVal, elementId);
		}
	})
}
/*
 * 检测工具下拉列表
 */
function getTestToolsSelect(elementId, selectVal) {
	$.ajax({
		url : "common!getTestToolsSelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			getSelects_noall(response, selectVal, elementId);
		}
	})
}
/*
 * 弹性键车间下拉列表
 */
function getWorkshopSelect_Key(elementId, selectVal) {
	$.ajax({
		url : "common!getWorkshopSelect_Key.action",
		dataType : "json",
		data : {},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			getSelects(response, selectVal, elementId);
		}
	})
}
/*
 * 车间下拉列表 selectType:'',noall,empty
 */
function getWorkshopSelect(elementId, selectVal, selectFactory, selectType,valName) {
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {
			"factoryId" : selectFactory
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			if (selectType == 'noall') {
				getSelects_noall(response, selectVal, elementId,"0",valName);
			} else if (selectType == 'empty') {
				getSelects_empty(response, selectVal, elementId,"0",valName);
			} else {
				getSelects(response, selectVal, elementId,"0",valName);
			}
		}
	})
}
/*
 * 车间下拉列表 selectType:'',noall,empty
 */
function getWorkshopSelect_Org(elementId, selectVal, selectFactory, selectType) {
	$.ajax({
		url : "common!getWorkshopSelectOrg.action",
		dataType : "json",
		data : {
			"conditionMap.factory" : selectFactory
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			if (selectType == 'noall') {
				getSelects_noall(response, selectVal, elementId,"0");
			} else if (selectType == 'empty') {
				getSelects_empty(response, selectVal, elementId,"0");
			} else {
				getSelects(response, selectVal, elementId,"0");
			}
		}
	})
}
function getWorkshopSelect_Auth(elementId, selectVal, selectFactory, selectType,valName){
	var href = window.location.href;
	var url = href.substring(href.lastIndexOf('/'), href.length);
	var ii = url.indexOf('?');
	if (ii > 0) {
		url = url.substring(0, ii);
	}
	var is= url.indexOf('#');
	if (is > 0) {
		url = url.substring(0, is);
	}
	$.ajax({
		url : "common!getWorkshopSelectOrgAuth.action",
		dataType : "json",
		data : {
			"factory" : selectFactory,
			"url":url
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			if (selectType == 'noall') {
				getSelects_noall(response, selectVal, elementId,null,valName);
			} else if (selectType == 'empty') {
				getSelects_empty(response, selectVal, elementId,null,valName);
			} else {
				getSelects(response, selectVal, elementId,null,valName);
			}
		}
	})
}
/*
 * 班组下拉列表
 */
function getWorkgroupSelect(elementId, selectVal, selectWorkshop, selectType) {
	$.ajax({
		url : "common!getWorkgroupSelect.action",
		dataType : "json",
		data : {
			"conditionMap.workshop" : selectWorkshop
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			if (selectType == 'noall') {
				getSelects_noall(response, selectVal, elementId,"0");
			} else if (selectType == 'empty') {
				getSelects_empty(response, selectVal, elementId,"0");
			} else {
				getSelects(response, selectVal, elementId,"0");
			}
		}
	})
}
/*
 * 根据父节点名称查找下一级组织列表
 * added by xjw 20151224
 */
function getChildOrgSelect(elementId,parentId,selectVal,selectType){
	$.ajax({
		url : "common!getChildOrgList.action",
		dataType : "json",
		data : {
			"conditionMap.orgId" : parentId
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			if (selectType == 'noall') {
				getSelects_noall(response, selectVal, elementId,"");
			} else if (selectType == 'empty') {
				getSelects_empty(response, selectVal, elementId,"");
			} else {
				getSelects(response, selectVal, elementId,"");
			}
		}
	})
}
/*
 * 从计件工时表中查找历史班组/小班组
 * added by wuxiao 2016/4/15
 */
function getChildGroupSelect(elementId,parentId,selectVal,selectType,start_date,end_date,factory,workshop,workgroup){
	$.ajax({
		url : "common!getChildGroupList.action",
		dataType : "json",
		data : {
			"start_date" : start_date,
			"end_date" : end_date,
			"factory" : factory,
			"workshop" : workshop,
			"workgroup" : workgroup,
		},
		error : function() {
			alertError();
		},
		success : function(response) {
			if (selectType == 'noall') {
				getSelects_noall(response, selectVal, elementId,"");
			} else if (selectType == 'empty') {
				getSelects_empty(response, selectVal, elementId,"");
			} else {
				getSelects(response, selectVal, elementId,"");
			}
		}
	})
}
/*
 * 根据员工工号查询员工信息
 * added by xjw 20151225
 */
function getStaffInfo(staffNum){
	var staff;
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		async : false,
		url : "common!getStaffInfo.action",
		data : {
			"staffNum" : staffNum
		},
		success : function(response) {
			var list = response;
			if (list.length > 0) {
				staff = list[0];
			}
		}
	})
	return staff;
}
/*
 * 根据用户信息查询员工信息
 * added by wuxiao 2016/4/22
 */
function getStaffInfo1(){
	var staff;
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		async : false,
		url : "common!getStaffInfo1.action",
		data : {
			'url':'/production!execution.action'
		},
		success : function(response) {
			var list = response;
			if (list.length > 0) {
				staff = list[0];
			}
		}
	})
	return staff;
}
/*
 * 员工列表查询
 */

/*
 * 弹性建下拉选项
 */
function getKeysSelect(keyCode, selectval, element,selectType,valueItem) {
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
			var strs ;
			if (selectType == 'noall') {
				strs="";
			}else
				strs="<option value=''>请选择</option>";
			$(element).html("");
			$.each(response.data, function(index, value) {
				if (selectval == value.id || selectval == value.key_name) {
					if(valueItem=='keyName'){
						strs += "<option value=" + value.key_name + " keyValue="
						+ value.value + " selected='selected'>"
						+ value.key_name + "</option>";
					}else
					strs += "<option value=" + value.id + " keyValue="
							+ value.value + " selected='selected'>"
							+ value.key_name + "</option>";
				} else {
					if(valueItem=='keyName'){
						strs += "<option value=" + value.key_name + " keyValue="
						+ value.value + ">" + value.key_name + "</option>";
					}else
					strs += "<option value=" + value.id + " keyValue="
							+ value.value + ">" + value.key_name + "</option>";
				}
			});
			$(element).append(strs);
		}
	})
}

/**
 * 获取岗位等级信息
 * @param elementId
 * @param selectVal
 * @param selectType
 * @param orderNo
 * add by thw 2016/01/13
 */
function getJobGradeSelect(elementId, selectVal, selectType, jobType) {
	if (!jobType) {
		jobType = ""
	}
	$.ajax({
		url : "common!getJobGradeList.action",
		dataType : "json",
		data : {
			'jobType' : jobType
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			if (selectType == 'noall') {
				getSelects_noall(response, selectVal, elementId);
			} else if (selectType == 'empty') {
				getSelects_empty(response, selectVal, elementId);
			} else {
				getSelects(response, selectVal, elementId);
			}
		}
	})
}

/*
 * 弹性建下拉选项 --查询条件
 */
function getKeysSelect_Q(keyCode, selectval, element) {
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
			var strs = "<option value=''>全部</option>";
			$(element).html("");
			$.each(response.data, function(index, value) {
				if (selectval == value.id || selectval == value.id) {
					strs += "<option value=" + value.id + " keyValue="
							+ value.value + " selected='selected'>"
							+ value.key_name + "</option>";
				} else {
					strs += "<option value=" + value.id + " keyValue="
							+ value.value + ">" + value.key_name + "</option>";
				}
			});
			$(element).append(strs);
		}
	})
}
/*
 * 弹出框悬浮移动
 */
function modalMove(modal) {
	$(modal).mousedown(function(event) {
		var isMove = true;
		$(document).mousemove(function(event) {
			if (isMove) {
				var obj = $(modal);
				obj.css({
					'left' : event.pageX,
					'top' : event.pageY
				});
			}
		}).mouseup(function() {
			isMove = false;
		});
	});
}

// 自动隐藏的信息提示框
function fadeMessageAlert(message, alertClass) {
	$("#messageAlert").removeClass("alert-error alert-success").addClass(
			alertClass);
	$("#messageAlert").html(message);
	$("#messageAlert").show(500, function() {
		setTimeout(function() {
			$("#messageAlert").hide(1000);
		}, 5000);
	});
}

/*
 * highcharts 图形报表公用方法 title: 标题字符串 xAxis:{categories: ['Apples', 'Oranges',
 * 'Pears', 'Bananas', 'Plums'],labels:{ rotation: -90 }}
 * fn_formatter:function(point) { } 显示提示格式的方法 series:[{type: 'column',name:
 * 'Jane',data: [3, 2, 1, 3, 4]}] [{type: 'spline', name: 'Average',data: [3,
 * 2.67, 3, 6.33, 3.33], marker: { lineWidth: 2, lineColor:
 * Highcharts.getOptions().colors[3],fillColor: 'white'} }] [ { type: 'pie',
 * name: 'Total consumption', data: [ {name:'Jane',y:13},
 * {name:'John',y:23},{name:'Joe', y:19}], center: [500, 80], size: 100,
 * showInLegend: true, dataLabels: { enabled: false }, allowPointSelect: true }]
 */
function drowCharts(container, title, xAxis, fn_formatter, series, yAxis,tooltip,plotOptions) {
	$(container).highcharts({
		chart : {
			shadow : false,// 是否设置阴影
			zoomType : 'xy'// 拖动鼠标放大图表的方向
		},
		colors : [  '#90ed7d', '#f7a35c',
					'#8085e9', '#f15c80', '#e4d354', '#8085e8',
					'#8d4653', '#91e8e1','#7cb5ec' ],
		// 图表版权信息。默认情况下，highcharts图表的右下方会放置一个包含链接的版权信息。
		credits : {
			enabled : false
		},
		title : {
			text : title
		},
		xAxis : xAxis,
		yAxis : yAxis,
		tooltip : tooltip||{
			formatter : function() {
				var s;
				s = fn_formatter(this);
				return s;
			}
		},
		plotOptions:plotOptions||{},
		labels : {},
		series : series
	});
}

/**
 * var title = "在制订单进度 | <a href='order!getOrderProgress.action'
 * target='_blank'>订单查询</a>"; var subtitle = "所有订单进度报表"; var yAxis = { min:
 * 100, title: { text: '台数' }, stackLabels: { enabled: true, style: {
 * fontWeight: 'bold', color: (Highcharts.theme && Highcharts.theme.textColor) ||
 * 'gray' } } }; series = [ {name:'在制',data:productionNum},
 * {name:'入库',data:warehousingNum}, {name:'发车',data:dispatchNum},
 * {name:'待制',data:order_qty}];
 * 
 * @param container
 * @param type
 * @param title
 * @param subtitle
 * @param categories
 *            x轴
 * @param yAxis
 * @param series
 */
function drawChart(container, type, title, subtitle, tooltip, categories,
		yAxis, series, plotOptions) {
	$(container)
			.highcharts(
					{
						// HighCharts中chart属性配置
						chart : {
							type : type || 'line',// 图表类型

							/** ****************以下chart配置可选***************** */
							backgroundColor : null,// "#EAF7FF"图表背景色
							borderWidth : 0,// 图表边框宽度
							borderRadius : 15,// 图表边框圆角角度
							plotBackgroundColor : null,// "#6DBFBB"主图表区背景颜色
							plotBorderColor : "#d0e0ec",// 主图表边框颜色
							plotBorderWidth : 1,// 主图表边框宽度
							shadow : true,// 是否设置阴影
							zoomType : 'xy'// 拖动鼠标放大图表的方向
						},
						// 图表标题
						title : {
							text : title,
							useHTML : true
						},
						// 图表标题
						subtitle : {
							text : subtitle,
							useHTML : true
						},
						// 图表版权信息。默认情况下，highcharts图表的右下方会放置一个包含链接的版权信息。
						credits : {
							enabled : true,// 不显示highCharts版权信息,默认就为true,可以不配置
							// ，如果想要去除版权（也就是不显示），只需要设置enable:false即可
							text : '', // 文字
							href : '',// 链接地址
							position : { // 文字的位置
								x : -30,
								y : -30
							},
							style : { // 文字的样式
								color : 'red',
								fontWeight : 'bold'
							}
						},
						/*******************************************************
						 * *Colors-颜色属性为可选配置 *通过配置配置colors，可以轻松的设置数据列的颜色
						 * 1、颜色代码可以是十六进制，也可以是英文单词， 还可以是RGB，如同css
						 * 2、默认是从第一个数据列起调用第一个颜色代码， 有多少个数据列调用相应数量的颜色
						 * 3、当数据列大于默认颜色数量时，重复从第一个 颜色看是调用
						 ******************************************************/
						colors : [ '#7cb5ec', '#ff33cc', '#90ed7d', '#f7a35c',
								'#8085e9', '#f15c80', '#e4d354', '#8085e8',
								'#8d4653', '#91e8e1' ],
						// 导出配置
						/*
						 * exporting: {
						 * enabled:true,//默认为可用，当设置为false时，图表的打印及导出功能失效
						 * buttons:{ //配置按钮选项 printButton:{ //配置打印按钮 width:50,
						 * symbolSize:20, borderWidth:2, borderRadius:0,
						 * hoverBorderColor:'red', height:30, symbolX:25,
						 * symbolY:15, x:-100, y:20 }, exportButton:{ //配置导出按钮
						 * width:50, symbolSize:20, borderWidth:2,
						 * borderRadius:0, hoverBorderColor:'red', height:30,
						 * symbolX:25, symbolY:15, x:-150, y:20 } },
						 * filename:'download',//导出的文件名
						 * type:'image/png',//导出的文件类型 width:800 //导出的文件宽度 },
						 */
						// 配置可以放置在图表中任意位置的Html标签。
						labels : {
							/*
							 * items:[{ //标签代码（html代码） html:'<p style="font-size:20">Copyright ©
							 * 2015 </p><a href=" "
							 * style="font-size:20;text-decoration:
							 * underline;">BMS</a>', style:{ //设置标签位置
							 * left:'100px', top:'50px' } }],
							 */
							style : { // 设置标签颜色
								color : 'rgb(0,0,255)'
							}
						},
						// 图例说明 包含图表中数列标志和名称的容器。
						legend : {
							layout : 'vertical',
							align : 'right',
							verticalAlign : 'middle',
							borderWidth : 0
						},
						// 数据提示框。当鼠标悬停在某点上时，以框的形式提示该点的数据，比如该点的值，数据单位等。数据提示框内提示的信息完全可以通过格式化函数动态指定。
						tooltip : tooltip
								|| {
									formatter : function() {
										if (type == 'column') {
											return '<b>' + this.x + '</b><br/>'
													+ this.series.name + ': '
													+ this.y + '<br/>'
													+ 'Total: '
													+ this.point.stackTotal;
										} else if (type == 'line') {
											return '<b>' + this.series.name
													+ '</b><br/>' + this.x
													+ ': ' + this.y + '%<br/>';
										} else {
											var s;
											if (this.series.type == 'pie') { // the
												// pie
												// chart
												s = '' + this.point.name + ': '
														+ '<b>'
														+ this.point.percentage
														+ '%</b>';
											} else if (this.series.type == 'spline') {
												s = '' + this.x + ': ' + this.y
														+ '%<br/>';
											} else {
												s = '' + this.x + ': ' + this.y
														+ '<br/>';
											}
											return s;
										}
									},
									backgroundColor : {
										linearGradient : [ 0, 0, 0, 60 ],
										stops : [ [ 0, '#FFFFFF' ],
												[ 1, '#E0E0E0' ] ]
									},
									borderWidth : 1,
									borderColor : '#AAA',
									pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
								},
						plotOptions : plotOptions
								|| {
									column : {
										stacking : 'normal',
										dataLabels : {
											enabled : true,
											color : (Highcharts.theme && Highcharts.theme.dataLabelsColor)
													|| 'white'
										}
									},
									pie : {
										allowPointSelect : true,
										cursor : 'pointer',
										dataLabels : {
											enabled : true,
											color : '#000000',
											connectorColor : '#000000',
											formatter : function() {
												return '<b>' + this.point.name
														+ '</b>: '
														+ this.percentage
														+ ' %';
											}
										}
									}
								},
						xAxis : {
							categories : categories,
							lineWidth : 1,
							labels : {
								autoRotationLimit:40
							}
						},
						yAxis : yAxis,
						series : series
					});

}

// 刷厂牌获取用户信息
function getUserInfoByCard(cardId) {
	var user;
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		async : false,
		url : "common!getUserInfoByCard.action",
		data : {
			"conditionMap.cardId" : cardId
		},
		success : function(response) {
			var list = response;
			if (list.length > 0) {
				user = list[0];
			}
		}
	})
	return user;
}

//刷厂牌获取用户信息
function getUserInfoByCardNumber(cardNumber) {
	var user;
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		async : false,
		url : "common!getUserInfoByCardNumber.action",
		data : {
			"conditionMap.cardNumber" : cardNumber
		},
		success : function(response) {
			var list = response;
			if (list.length > 0) {
				user = list[0];
			}
		}
	})
	return user;
}
// 根据工厂获取部门的下拉列表
function getDepartSelect(elementId, selectVal, selectFactory, selectType) {
	$.ajax({
		url : "common!getDepartmentSelect.action",
		dataType : "json",
		data : {
			"factoryId" : selectFactory
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			$(elementId).html("");
			var strs = "";
			if (selectType == 'noall') {
				strs = "<option value=''></option>";

			} else if (selectType == 'empty') {
				strs = "<option value=''>请选择</option>";
			} else {
				strs = "<option value=''>全部</option>"
			}
			$.each(response.data, function(index, value) {
				if (selectVal == value.id || selectVal == value.department) {
					strs += "<option value=" + value.id
							+ " selected='selected'>" + value.department
							+ "</option>";
				} else {
					strs += "<option value=" + value.id + ">"
							+ value.department + "</option>";
				}
			});
			// alert(strs)
			$(elementId).append(strs);
		}
	})
}

/**
 * 获取组织结构权限树树
 * treeId: ulid   <ul id="treeId" class="ztree"></ul>
 * level:设置第几层展开
 * orgType  组织结构类型
 * orgKind  
 */
function getOrgAuthTree(treeId,orgType,orgKind,level){
	/*  ztree 配置信息 */
	// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
	var setting = {
		data: {
			simpleData: {   // 简单的数据源，一般开发中都是从数据库里读取，API有介绍，这里只是本地的
			    enable: true,  
			    idKey: "id",  // id和pid，这里不用多说了吧，树的目录级别
			    pIdKey: "pId",  
			    rootPId: 0   // 根节点
			}
		},
		view: {
			fontCss : {
			}
		},
		callback: {
			beforeClick: zTreeBeforeClick,
			onClick: zTreeOnClick
		}
	};
	/*  ztree 配置信息 */
	if(!treeId){
		return null;
	}
	
	var href = window.location.href;
	var url = href.substring(href.lastIndexOf('/')+1, href.length);
	var ii = url.indexOf('?');
	if (ii > 0) {
		url = url.substring(0, ii);
	}
	var gg = url.indexOf('#');
	if (gg > 0) {
		url = url.substring(0, gg);
	}
	level = level || 1;
	orgType = orgType||"1,2,3,4,5,6";
	orgKind = orgKind||"0,1";
	
	zNodes=[];
	zTreeObj=null;
	$.ajax({
		url: "common!getOrgAuthTree.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	"orgType":orgType,
	    	"orgKind":orgKind,
	    	"url":url
	    },
	    success:function(response){
	    	if(response.success) {
	    		//zNodes.push({id:1,pId:null,name:'第十九事业部'});
	    		if(response.data.length>0){
	    		    $.each(response.data, function (index, dept) {
	                    zNodes.push(
	                    		{id:dept.id,pId:dept.parent_id,name:dept.name,is_customer:dept.is_customer,org_type:dept.org_type,org_kind:dept.org_kind,displayName:dept.name}
	                    );
	                });
	                zTreeObj = $.fn.zTree.init(treeId, setting, zNodes);
	                var nodes = zTreeObj.getNodes();
	                if (nodes.length>0) {
	                	zTreeObj.selectNode(nodes[0]);
	                }
	                //zTreeObj.expandNode(nodes[0], true, false, true);
	                //zTreeObj.expandAll(true);
	                //ajaxQuery(nodes[0].id);
	                expandLevel(zTreeObj,nodes[0],level); 
	    		}else{
	    		      zNodes.push(
	                    		{id:0,pId:0,name:'无数据权限'}
	                    );
	    		      zTreeObj = $.fn.zTree.init(treeId, setting, zNodes);
	                  var nodes = zTreeObj.getNodes();
		                if (nodes.length>0) {
		                	zTreeObj.selectNode(nodes[0]);
		                }
	    		}
            
            } 
	    }
	});
}
/**
 * 设置展开树的按层次展开节点的方法
 * @param treeObj 树对象
 * @param node 树的跟节点
 * @param level 需要展开的层级
 */
function expandLevel(treeObj,node,level){  
    var childrenNodes = node.children;  
    for(var i=0;i<childrenNodes.length;i++)  
    {  
        treeObj.expandNode(childrenNodes[i], true, false, false);  
        level=level-1;  
        if(level>0)  
        {  
            expandLevel(treeObj,childrenNodes[i],level);  
        }  
    }  
}

/*
 * 获取request参数
 */
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
/*
 * 取当前日期 YYYY-MM-DD
 */
function getCurDate() {
	var now = new Date()
	y = now.getFullYear()
	m = now.getMonth() + 1
	d = now.getDate()
	m = m < 10 ? "0" + m : m
	d = d < 10 ? "0" + d : d
	return y + "-" + m + "-" + d
}
/*
 * 取当前日期 YYYY-MM-DD H:i:s
 */
function getCurDateTime() {
	var now = new Date()
	y = now.getFullYear()
	m = now.getMonth() + 1
	d = now.getDate()
	h= now.getHours();       //获取当前小时数(0-23)
	i=now.getMinutes();     //获取当前分钟数(0-59)
	s=now.getSeconds();  
	m = m < 10 ? "0" + m : m
	d = d < 10 ? "0" + d : d
	h = h < 10 ? "0" + h : h
	i = i < 10 ? "0" + i : i
	s = s < 10 ? "0" + s : s
	return y + "-" + m + "-" + d+" "+h+":"+i+":"+s
}

function getFirstDayOfMonth(cdate) {
	var date = new Date(cdate);
	date.setDate(1);
	y = date.getFullYear()
	m = date.getMonth() + 1
	d = date.getDate()
	m = m < 10 ? "0" + m : m
	d = d < 10 ? "0" + d : d
	return y + "-" + m + "-" + d
}

function compareTime(beginTime,endTime){  
	
    var startDateTemp = beginTime.split(" ");  
    var endDateTemp = endTime.split(" ");  
    var arrStartDate = startDateTemp[0].split("-");  
    var arrEndDate = endDateTemp[0].split("-");  
    arrStartTime=[0,0,0];
    arrEndTime=[0,0,0];
    if(startDateTemp[1]!=undefined){
    	var timearr=startDateTemp[1].split(":");
    	arrStartTime[0] = timearr[0]==undefined?0:timearr[0];  
    	arrStartTime[1] = timearr[1]==undefined?0:timearr[1]; 
    	arrStartTime[2] = timearr[2]==undefined?0:timearr[2]; 
    }
    if(endDateTemp[1]!=undefined){
    	var timearr=endDateTemp[1].split(":");
    	arrEndTime[0] = timearr[0]==undefined?0:timearr[0];  
    	arrEndTime[1] = timearr[1]==undefined?0:timearr[1]; 
    	arrEndTime[2] = timearr[2]==undefined?0:timearr[2]; 
    }

    var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);  
    var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);   
 
    if (allStartDate.getTime() > allEndDate.getTime()) {    
        return 1;  
    } else if(allStartDate.getTime() == allEndDate.getTime()){  
    	return 0;
    } else {   
    	return -1;  
      }   
} 
/**
 * 判断staff是否已经在staff列表中存在 for ：工时维护时判断使用
 */
function isContain(staff,staffarr){
	var flag=false;
	$.each(staffarr,function(index,obj){
		if(obj.staff_id==staff.staff_id){
			flag=true;
			return;
		}
	})
	return flag;
}
/**
 * 判断user是否有访问权限，没有则跳到无权限页面
*/
function validateUrlAuth(url){
	var flag=false;
	$.ajax({
		url: "common!validateUrlAuth.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	"conditionMap.url":url
	    },
	    success:function(response){
	    	if(response.length>0){
	    		flag=true;		
	    	}else{
	    		window.location.href="authError.jsp";
	    	}	    	
	    }
	})
	return flag;
}

function getBusVehicleTypeSelect(busType){
	var data;
	$.ajax({
		url : "common!getBusVehicleTypeSelect.action",
		dataType : "json",
		data : {
			"conditionMap.busType" : busType
		},
		async : false,
		error : function() {
			alertError();
		},
		success : function(response) {
			data=response;
		}
	})
	return data;
}

function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
	} 

function numAdd(num1, num2) {
	var baseNum, baseNum1, baseNum2;
	try {
	baseNum1 = num1.toString().split(".")[1].length;
	} catch (e) {
	baseNum1 = 0;
	}
	try {
	baseNum2 = num2.toString().split(".")[1].length;
	} catch (e) {
	baseNum2 = 0;
	}
	baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
	
	//alert((num1 * baseNum +"+"+ num2 * baseNum));
	return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(2);
	}; 

//使用公用邮箱发送邮件	
function sendEmail(mailTo,cc,title,thead,tbdatalist,content){
		$.ajax({
			url : "common!sendEmail.action",
			dataType : "json",
			data : {
				"mailTo":mailTo,
				"cc":cc,
				"title":title,
				"thead":thead,
				"tbdatalist":tbdatalist,
				"content":content
			},
			type:"post",
			error : function(response) {
				//alert(response.message)
			},
			success : function(response) {
				
			}
		})
	}