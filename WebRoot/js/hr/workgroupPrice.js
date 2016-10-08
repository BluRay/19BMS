var initflag=0;
var factoryName = null;
var workshopName = null;
var saveFlag = false;

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
/*	if(saveFlag){
		//数据有变动提示用户保存
	    if (confirm("是否保存当前修改的标准工时/单价信息？")) {
	    	saveData();
	    	saveFlag = false;
	    	return false;
	    }
	}
	saveFlag = false;
    if(treeNode.org_type == '5' && treeNode.org_kind =='1'){
    	ajaxQuery();
    }else{
    	alert('请在左侧组织结构树中选择班组！');
    	return false;
    }*/
}

function zTreeOnClick(event, treeId, treeNode) {
	factoryName=null;
	workshopName=null;
	
	var str = '班组承包单价：';
	var strArr = [];
	var orgStr = "";
	strArr.push(treeNode.name);
	var parentNode = treeNode.getParentNode();
	if(treeNode.org_type=='1'){
		factoryName=treeNode.displayName;
	}
	while (parentNode!=null){
		strArr.push(parentNode.name);
		if(parentNode.org_type == '1'){
			factoryName = parentNode.displayName;
		}
		if(parentNode.org_type == '4'){
			workshopName = parentNode.displayName;
		}
		parentNode = parentNode.getParentNode();
	}
	strArr.reverse();
	for(var i=0;i<strArr.length;i++){
		if(i==0){
			str += strArr[i];
			orgStr += strArr[i];
		}else{
			str += '->'+strArr[i];
			orgStr += ','+strArr[i];
		}
	}
	$("#workgroupTitle").html(str);
	$("#orgStr").val(orgStr);
    //alert(treeNode.id + ", "+ treeNode.id + "，" + treeNode.name);
	ajaxQuery();
	/*if(treeNode.org_type == '5' && treeNode.org_kind =='1'){
    	ajaxQuery();
    }else{
    	alert('请在左侧组织结构树中选择班组！');
    	return false;
    }*/
};

$(document).ready(function () {
	initPage();
	//Enter键移动输入光标
	$(".time").live("keydown",function(event){
		if (event.keyCode == "13") {
			$(this).parent().next().find("input").focus();
		}
	})
	$(".price").live("keydown",function(event){
		if (event.keyCode == "13") {
			$(this).parent().parent().next().find(".time").focus();
		}
	})
		var orderList=new Array();
	$("#q_order").live("input",function(){
		//alert($(this).val());
		$("#q_order").attr("order_id","");
	});
	$("#q_order").typeahead({
		source : function(input,process){
			//alert($(this).val());
			var data={
					"conditionMap.busType":"",
					"conditionMap.orderNo":input,
					"conditionMap.factory":factoryName
			};		
			return $.ajax({
				url:"common!getOrderFuzzySelect.action",
				dataType : "json",
				type : "get",
				data : data,
				success: function (data) { 
					orderList = data;
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
			$.each( orderList, function(index, value) {
				//alert(value.orderNo);
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
			return true;
		},
		updater : function(item) {
			$.each(orderList, function(index, value) {
				if (value.orderNo == item) {
					selectId = value.id;
				}
			})
			// alert(submitId);
			$("#q_order").attr("order_id", selectId);
			return item;
		}
	});
	/*$("#q_order").live("input",function(){
		getOrderNoSelect("#q_order", "", "", "",factoryName);
		});*/
	
	function initPage(){	
		pageSize=20;
		//getBusTypeSelect("#bus_type_id", '', 'empty');
		$("#hrPlan").find(".treemenu").addClass("collapsed");
		$("#hr_plan").addClass("in");
		getOrgAuthTree($("#workGroupTree"),"1,2,3,4,5",'1');
		//getMonth(); 
		var nodes = zTreeObj.getSelectedNodes();
		var treeNode = nodes[0];
		while (treeNode!=null){
			if(treeNode.org_type == '1'||treeNode.org_type == '2'){
				factoryName = treeNode.displayName;
			}			
			treeNode = treeNode.getParentNode();
		}
	}

	/**
	 * 查询按钮
	 */
	$("#btnQuery").live("click",function(e){
		ajaxQuery();
	});
	

	$(".process").live("change",function(e){
		if(!const_float_validate.test($(this).val())){
			alert('请输入数字！');
			$(this).val('');
		}
		var tr = $(e.target).closest("tr");
		tr.data("valueChanged",'1');
		saveFlag = true;
	});
	
	//保存
	$("#btnSave").live("click",function(e){
		saveData();
	});
	
	$("#btnBulkAdd").click (function () {
		$("#divBulkAdd").show();
	});
	
});

/**
 * 通过org_id查询所有直接子节点
 * @param id
 */
function ajaxQuery(){
	$("#divBulkAdd").hide();
	var nodes = zTreeObj.getSelectedNodes();
	/*if(!(nodes[0].org_type == '5' && nodes[0].org_kind =='1')){
		return;
	}

	if(org_id==null || org_id == '0'){
		alert('请在左侧组织结构树中选择班组！');
		return;
	}*/
	var factory = "";
	var workshop = "";
	var workgroup = "";
	var subgroup = "";
	var treeNode = nodes[0];
	while (treeNode!=null){
		if(treeNode.org_type == '1'||treeNode.org_type == '2'){
			factory = treeNode.displayName;
		}
		if(treeNode.org_type == '4'){
			workshop = treeNode.displayName;
		}
		if(treeNode.org_type == '5'){
			workgroup = treeNode.displayName;
		}
		if(treeNode.org_type == '6'){
			subgroup = treeNode.displayName;
		}
		treeNode = treeNode.getParentNode();
	}
	var conditions={};
	conditions.factory=factory;
	conditions.workshop=workshop;
	conditions.workgroup=workgroup;
	conditions.team=subgroup;
	conditions.orderId=$("#q_order").attr("order_id");
	conditions.effctiveDateStart=$("#q_effective_date_start").val();
	conditions.effctiveDateEnd=$("#q_effective_date_end").val();
	
	$.ajax({
		url: "hr!getWorkgroupPriceList.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	'conditions':JSON.stringify(conditions),
	    	"pager.pageSize":20,
			"pager.curPage":1	
	    },
	    success:function(response){
	    	if(response.success) {
	    		$("#workgroupTable tbody").html("");
		 		var last_groupCode = "";//最近groupCode
	    		var groupCode = "";
	    		var groupCode_index = 0;
	    		
	     		var last_groupName = "";//最近groupName
	    		var groupName = "";
	    		var groupName_index = 0;
	    		
                $.each(response.data, function (index, value) {
                	var tr=$("<tr />");
                	$("<td />").html(value.factory).appendTo(tr);
                	$("<td />").html(value.workshop).appendTo(tr);
                	$("<td />").html(value.workgroup).appendTo(tr);
                	$("<td />").html(value.team).appendTo(tr);
                	$("<td />").html(value.order_desc).appendTo(tr);
                	$("<td />").html(value.stand_price).appendTo(tr);
                	$("<td />").html(value.effective_date).appendTo(tr);
                	$("<td />").html(value.editor).appendTo(tr);
                	$("<td />").html(value.edit_date).appendTo(tr);
                	$("#workgroupTable tbody").append(tr);
                });
                $("#total").html(response.pager.totalCount);
    			$("#total").attr("total", response.pager.totalCount);
    			$("#cur").attr("page", response.pager.curPage);
    			$("#cur").html(
    					"<a href=\"#\">" + response.pager.curPage + "</a>");
    			$("#pagination").show();
            } 
	    }
	});
}
/**
 * 保存
 */
function saveData(){
	var flag = true;
	var updateDataArr = [];
	var addDataArr = [];
	//数据校验
	var workgroupTable_tbody = $("#workgroupTable tbody").find("tr");
	if(workgroupTable_tbody.length<1){
		flag = false;
		alert("没有修改任何数据，无需保存!");
		return;
	}else{
		var valueChanged = 0;
		workgroupTable_tbody.each(function(x){
			var tr = $(this);
			var standard_hour = $(this).find('input').eq(0).val();
			var standard_price = $(this).find('input').eq(1).val();
			var smallGroupId = tr.data("smallGroupId");
			var workgroup = tr.data("workgroupName");
			var small_workgroup = tr.data("smallGroupName");
			var org_id ;
			if(undefined == smallGroupId || smallGroupId==''){
				org_id = tr.data("groupId");
			}else{
				org_id = tr.data("smallGroupId");
			}
			if(standard_hour=='' || standard_price==''){
				flag = false;
				alert("第"+(x+1)+"行数据，标准工时和标准单价不能为空!");
			}else{
				var xx = tr.data("valueChanged");
				if(xx != undefined && xx=='1'){
					valueChanged = valueChanged + 1;
					//已改变的数据
					var timeAndPrice = tr.data("id")+'';
					if( timeAndPrice != 'undefined' && timeAndPrice !=null && timeAndPrice.trim().length >0){
						//已维护的数据
						var data={'id':tr.data("id"),'standard_hour':standard_hour,'standard_price':standard_price};
						updateDataArr.push(data);
					}else{
						//新增数据
						var bus_type_id,month;
						bus_type_id = $("#bus_type_id :selected").text();
						month = $("#month").val();
						var data={'org_id':org_id,'factory':factoryName,'workshop':workshopName,'workgroup':workgroup,'small_workgroup':small_workgroup,'bus_type_id':bus_type_id,'month':month,'standard_hour':standard_hour,'standard_price':standard_price};
						addDataArr.push(data);
					}
				}
			}
		});
		if(flag==true && valueChanged <=0){
			alert("没有修改任何数据，无需保存!");
			return;
		}
		if(flag){
			updateHourAndPrice(addDataArr,updateDataArr);
		}
	}
}

/**
 * 新增标准工时/单价
 * @param addDataArr
 * @param updateDataArr
 */
function updateHourAndPrice(addDataArr,updateDataArr){
	$.ajax({
	    url: "standardTimeAndPrice!updateTimeAndPrice.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	'addDataArr':JSON.stringify(addDataArr),
	    	'updateDataArr':JSON.stringify(updateDataArr)
	    },
	    success:function(response){
	    	saveFlag = false;
	    	if(response.success) {
	    		alert(response.message);
	    		ajaxQuery();
            }else{
            	alert(response.message);
            }
	    }
	});
}

extArray = new Array(".xlsx");
function LimitAttach(form, file) {
	var effectiveDate=$("#effective_date").val();
	if ($("#q_order").attr("order_id") == ""||$("#q_order").attr("order_id") ==undefined) {
		alert("请输入有效订单！");
		return false;
	}
	if(effectiveDate==undefined||effectiveDate.trim().length==0){
		alert("请输入有效日期！");
		return false;
	}
	if ($("#file").val() == "") {
		alert("请选择文件！");
		return false;
	}
	
	allowSubmit = false;
	if (!file){
		return false;
	}
	while (file.indexOf("\\") != -1)
		file = file.slice(file.indexOf("\\") + 1);
	ext = file.slice(file.indexOf(".")).toLowerCase();
	for (var i = 0; i < extArray.length; i++) {
		if (extArray[i] == ext) {
			allowSubmit = true;
			break;
		}
	}
	var conditions="{'orderId':'"+$("#q_order").attr("order_id")+"','effective_date':'"+effectiveDate+"'}";
	if (allowSubmit) {
		$("#uploadForm").ajaxSubmit({
			url:"hr!uploadWorkgroupPrice.action",
			type: "post",
			dataType:"json",
			data:{
				"conditions":conditions
			},
	        beforeSend:function(XMLHttpRequest){
	            //alert('远程调用开始...');
	            $("#loading").html("<img src='images/loading.gif' />");
	            $("#loading").show();
	            $("#tableDiv").hide();
	        },
			success:function(response){
	           $("#loading").empty();
	           $("#loading").hide();
				alert(response.message);
				if(response.success){
					//window.open("materialAbnormal!index.action","_self");
					$("#divBulkAdd").hide();
					ajaxQuery();
				}else{
					
				}						
			},
			complete:function(XMLHttpRequest,textStatus){
	            // alert('远程调用成功，状态文本值：'+textStatus);
	           $("#loading").empty();
	           $("#loading").hide();
	           $("#tableDiv").show();
	        },
	        error:function(XMLHttpRequest,textStatus,errorThrown){
	           $("#loading").empty();
	           $("#loading").hide();
	           $("#tableDiv").show();
	        }
		});
	} else {
		alert("对不起，只能上传xlsx格式的文件!\n请重新选择符合条件的文件再上传.");
		return false;
	}
	return false;
}


function getMonth(){
	var nowMonth = formatDate(); //当前月 
	$("#month").val(nowMonth);
}

//格局化日期：yyyy-MM-dd 
function formatDate() { 
	var now = new Date(); //当前日期 
	var nowMonth = now.getMonth(); //当前月 
	nowMonth += 2;
	var nowYear = now.getFullYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	nowYear = ((nowMonth==13)?(nowYear+1):(nowYear));
	nowMonth=((nowMonth==13)?(1):(nowMonth));
	if(nowMonth < 10){ 
		nowMonth = "0" + nowMonth; 
	} 
	return (nowYear+"-"+nowMonth); 
}