var initflag=0;
var factoryName = null;
var workshopName = null;
var saveFlag = false;

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
	if(saveFlag){
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
    }
}

function zTreeOnClick(event, treeId, treeNode) {
	var str = '标准工时/单价：';
	var strArr = [];
	var orgStr = "";
	strArr.push(treeNode.name);
	var parentNode = treeNode.getParentNode();
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
	if(treeNode.org_type == '5' && treeNode.org_kind =='1'){
    	ajaxQuery();
    }else{
    	alert('请在左侧组织结构树中选择班组！');
    	return false;
    }
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
	function initPage(){
		getBusTypeSelect("#bus_type_id", '', 'empty');
		$("#hrPlan").find(".treemenu").addClass("collapsed");
		$("#hr_plan").addClass("in");
		getOrgAuthTree($("#workGroupTree"),"1,2,3,4,5,6",'1');
		getMonth(); 
	}

	/**
	 * 查询按钮
	 */
	$("#btnQuery").live("click",function(e){
		ajaxQuery();
	});
	
	/**
	 * 车型
	 */
	$("#bus_type_id").live("change",function(e){
		ajaxQuery();
	});
	
	/**
	 * 车型
	 */
	$("#month").live("change",function(e){
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
	if(!(nodes[0].org_type == '5' && nodes[0].org_kind =='1')){
		return;
	}
	var org_id = nodes[0].id;
	var bus_type_id = $("#bus_type_id :selected").text();
	var month = $("#month").val();
	if(org_id==null || org_id == '0'){
		alert('请在左侧组织结构树中选择班组！');
		return;
	}
	if(undefined == bus_type_id || bus_type_id==null || bus_type_id == '请选择'){
		alert('请选择车型！');
		return;
	}
	if(undefined == month || month==null || month.trim() == ''){
		alert('请选择月份！');
		return;
	}
	$.ajax({
		url: "standardTimeAndPrice!getStandardTimeAndPriceList.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	'org_id':org_id,
	    	'bus_type_id':bus_type_id,
	    	'month':month
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
	    		
                $.each(response.data, function (index, time) {
                	//if(undefined != time.smallGroupId){
	    				var tr = $("<tr />");
	    				if (time.groupCode == last_groupCode) {
	    					var noderowspan = parseInt($(groupCode).attr(
	    							"rowspan"));
	    					$(groupCode).attr("rowspan", noderowspan + 1);
	    				} else {
	    					$(
	    						"<td id='groupCode_" + groupCode_index
	    									+ "' rowspan='1' " + "/>").html(
	    							time.groupCode).appendTo(tr);
	    					groupCode = "#groupCode_" + groupCode_index;
	    					groupCode_index += 1;
	    				}
	    	    		
	    				if (time.groupName == last_groupName) {
	    					var noderowspan = parseInt($(groupName).attr(
	    							"rowspan"));
	    					$(groupName).attr("rowspan", noderowspan + 1);
	    				} else {
	    					$(
	    						"<td id='groupName_" + groupName_index
	    									+ "' rowspan='1' " + "/>").html(
	    							time.groupName).appendTo(tr);
	    					groupName = "#groupName_" + groupName_index;
	    					groupName_index += 1;
	    				}
	    				//$("<td />").html(time.groupName).appendTo(tr);
	    				$("<td />").html(time.smallGroupCode).appendTo(tr);
	    				$("<td />").html(time.smallGroupName).appendTo(tr);
	    				var standardHourTd = $("<td />").html('<input style="border:1;width:100%" class="process time" value="'+(time.standard_hour==undefined?"":time.standard_hour)+'" >');
	    				standardHourTd.appendTo(tr);	
	    				var standardPriceTd = $("<td />").html('<input style="border:1;width:100%" class="process price" value="'+(time.standard_price==undefined?"":time.standard_price)+'" >');
	    				standardPriceTd.appendTo(tr);
	    				
	    				tr.data("groupId", time.groupId);
	    				tr.data("workgroupName", time.groupName==undefined?"":time.groupName);
	    				tr.data("smallGroupId", time.smallGroupId==undefined?"":time.smallGroupId);
	    				tr.data("smallGroupName", time.smallGroupName==undefined?"":time.smallGroupName);
	    				tr.data("id", time.id==undefined?"":time.id);
	    				tr.data("valueChanged", '0');
	    				$("#workgroupTable tbody").append(tr);
	    				last_groupCode = time.groupCode;
	    				last_groupName = time.groupName;
                	//}
                });
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
	if (allowSubmit) {
		$("#uploadForm").ajaxSubmit({
			url:"standardTimeAndPrice!uploadStandardTimeAndPrice.action",
			type: "post",
			dataType:"json",
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