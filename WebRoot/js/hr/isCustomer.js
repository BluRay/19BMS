var initflag=0;
var factoryName = null;
var workshopName = null;
var thmonths = null;
var pageSize = 10;

$.fn.bootstrapSwitch.defaults.size = 'mini';
$.fn.bootstrapSwitch.defaults.onColor = 'success';

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	ajaxQuery();
    //alert(treeNode.id + ", "+ treeNode.id + "，" + treeNode.name);
/*    if(treeNode.org_type == '5'){
    	ajaxQuery();
    }else{
    	return false;
    }*/
};

$(document).ready(function () {
	initPage();
	function initPage(){
		
		
		
		getBusTypeSelect("#bus_type_id", '', '');
		$("#hrPlan").find(".treemenu").addClass("collapsed");
		$("#hr_plan").addClass("in");
		getOrgAuthTree($("#workGroupTree"),"1,2,3,4,5",'1');
		//默认取当前年1-12月
		var myDate = new Date();
		var year = myDate.getFullYear();
		$("#month_s").val(year+'-01');
		$("#month_e").val(year+'-12');
		ajaxQuery();
	}

	/**
	 * 查询按钮
	 */
	$("#btnQuery").live("click",function(e){
		ajaxQuery();
	});
	/**
	 * 自编按钮
	 */
	$("#btnSubmit").live("click",function(e){
		$('input[name="my-checkbox"]').each(function(){
			if($(this).bootstrapSwitch('state')){
				//do nothing
			}else{
				$(this).bootstrapSwitch('state', true, true);
			}
		});
	});
	/**
	 * 车型
	 */
	$("#bus_type_id").live("change",function(e){
		ajaxQuery();
	});
	
	//导出员工信息
	/*$("#downloadStandardPrice").live("click",function(e){
		downloadStandardPrice();
	});*/
	
});

/**
 * 通过org_id查询所有直接子节点
 * @param id
 */
function ajaxQuery(targetPage){
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	var str = '自编号维护：';
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
	if(org_type=='0'){
		var childrenNodes = treeNode.children;
        for (var x = 0; x < childrenNodes.length; x++) {
        	orgStr += ',' + childrenNodes[x].name;
        }
	}
	if(treeNode.org_type == '1'||treeNode.org_type == '2'){
		factory = treeNode.displayName;
		var childrenNodes=treeNode.children[0].children;
		$.each(childrenNodes,function(index,childrenNode){
			orgStr+=","+childrenNode.displayName;
		});
		
	}
	if(treeNode.org_type == '3'){
		var childrenNodes=treeNode.children;
		$.each(childrenNodes,function(index,childrenNode){
			orgStr+=","+childrenNode.displayName;
		});
	}
	
	$("#workgroupTitle").html(str);
	
/*	if(nodes[0].org_type != '5'){
		return;
	}*/
	var org_id = nodes[0].id;
	var org_type = nodes[0].org_type;
	var bus_type_id = $("#bus_type_id :selected").text();
	var month_s = $("#month_s").val();
	var month_e = $("#month_e").val();
	if(org_id==null || org_id == '0'){
		alert('请在左侧组织结构树中选择班组！');
		return;
	}
	/*if(undefined == month_s || null==month_s || month_s.trim() == ''){
		alert('必须选择起始月份！');
		return;
	}*/
	
	//清空表头添加内容
	$("#workgroupTable thead").html('<tr>'+
		'<th style="min-width: 70px;">'+
			'车间'+
		'</th>'+
		'<th style="min-width: 130px;">'+
			'班组'+
		'</th>'+
		'<th style="min-width: 150px;">'+
			'小班组'+
		'</th>'+
		
		'<th style="min-width: 70px;">自编</th>'+
	'</tr>');
	
	$.ajax({
		url: "orgData!queryIsCustomer.action",
	    dataType: "json",
	    async: true,
	    type: "get",
	    data: {
	    	'org_id':org_id,
	    	'orgType':org_type,
	    	'orgStr':orgStr,
	    	'bus_type':bus_type_id,
	    	'month_s':month_s,
	    	'month_e':month_e,
	    	'is_customer':$("#is_Customer").val(),
	       	"pager.pageSize":pageSize,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){
	    	if(response.success) {
	    		/*thmonths = setTh();*/
	    		$("#workgroupTable tbody").html("");
	    		
	     		var last_workshop = "";//最近groupName
	    		var workshop = "";
	    		var workshop_index = 0;
	    		
		 		var last_workgroup = "";//最近groupCode
	    		var workgroup = "";
	    		var workgroup_index = 0;
	    		
                $.each(response.data, function (index, time) {
                	//if(undefined != time.smallGroupId){
	    				var tr = $("<tr />");
	    				if (time.workshop == last_workshop) {
	    					var noderowspan = parseInt($(workshop).attr(
	    							"rowspan"));
	    					$(workshop).attr("rowspan", noderowspan + 1);
	    				} else {
	    					$(
	    						"<td id='workshop_" + workshop_index
	    									+ "' rowspan='1' " + "/>").html(
	    							time.workshop).appendTo(tr);
	    					workshop = "#workshop_" + workshop_index;
	    					workshop_index += 1;
	    				}
	    				if (time.workgroup == last_workgroup) {
	    					var noderowspan = parseInt($(workgroup).attr(
	    							"rowspan"));
	    					$(workgroup).attr("rowspan", noderowspan + 1);
	    				} else {
	    					$(
	    						"<td id='workgroup_" + workgroup_index
	    									+ "' rowspan='1' " + "/>").html(
	    							time.workgroup).appendTo(tr);
	    					workgroup = "#workgroup_" + workgroup_index;
	    					workgroup_index += 1;
	    				}
	    				//$("<td />").html(time.groupName).appendTo(tr);
	    				//$("<td />").html(time.workgroup).appendTo(tr);
	    				$("<td />").html(time.small_workgroup).appendTo(tr);
	    				$("<td />").html(time.is_customer==1?"<input type='checkbox' onchange='test(this,\""+time.org_id+"\");' name='my-checkbox' checked>":"<input type='checkbox' onchange='test(this,\""+time.org_id+"\");' name='my-checkbox'>").appendTo(tr);
	    				/**
	    				 * 根据月份设置表头
	    				 */
	    				/*for(var i=0;i<thmonths.length;i++){
	    					var xx = thmonths[i]+'';
	    					$("<td />").html(time[xx]).appendTo(tr);
	    				}*/
	    				
	    				$("#workgroupTable tbody").append(tr);
	    				last_workshop = time.workshop;
	    				last_workgroup = time.workgroup;
                	//}
                });
                
                $("[name='my-checkbox']").bootstrapSwitch();
                $("[name='my-checkbox']").bootstrapSwitch('onText','是');
                $("[name='my-checkbox']").bootstrapSwitch('offText','否');
                
        		$("#total").html(response.pager.totalCount);
        		$("#total").attr("total",response.pager.totalCount);
        		$("#cur").attr("page",response.pager.curPage);
        		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
        		$("#pagination").show();
        		
            } 
	    }
	});
}

function test(target,org_id){
	//alert(target.checked);
	$.ajax({
        url: 'orgData!updateIsCustomer.action',
        dataType: 'json',
        data: {
            'org_id' : org_id,
            'is_customer' : target.checked?1:0,
        },
        error: function () {
            // common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	//success
            } else {
                alert(response.message);
            }
        }
    });
}

/**
 * 根据用户选择的月份区间设置表头，并返回月份区间长度
 */
function setTh(){
	var rtn = new Array();
	var month_s = $("#month_s").val();
	var month_e = $("#month_e").val();
	var s_arr = new Array();
	var e_arr = new Array();
	s_arr = month_s.split('-');
	var startYear = parseInt(s_arr[0]);
	var startMonth = parseInt(s_arr[1]);
	var endYear = startYear;
	var endMonth = 12;
	//alert('startYear:'+startYear+',startMonth:'+startMonth+',endYear:'+endYear+',endMonth:'+endYear);
	if(null != month_e && 'undefined' != typeof(month_e) && month_e.trim()!=''){
		e_arr = month_e.split('-');
		endYear = parseInt(e_arr[0]);
		endMonth = parseInt(e_arr[1]);
	}
	//获取表TH
	var tr = $("#workgroupTable thead").children("tr").eq(0);
	if(startYear == endYear){
		for(startMonth;startMonth<=endMonth;startMonth++){
			var mstr;
			if(startMonth>=10){
				mstr = startYear+"-"+startMonth;
			}else{
				mstr = startYear+"-"+new Array(2).join('0').concat(startMonth);
			}
			$("<th style='min-width: 80px;' />").html(mstr).appendTo(tr);
			rtn.push(mstr);
		}
	}else{
		for(startMonth;startMonth<=12;startMonth++){
			var mstr;
			if(startMonth>=10){
				mstr = startYear+"-"+startMonth;
			}else{
				mstr = startYear+"-"+new Array(2).join('0').concat(startMonth);
			}
			$("<th style='min-width: 80px;' />").html(mstr).appendTo(tr);
			rtn.push(mstr);
		}
		for(var i=1;i<=endMonth;i++){
			var mstr;
			if(i>=10){
				mstr = endYear+"-"+i;
			}else{
				mstr = endYear+"-"+new Array(2).join('0').concat(i);
			}
			$("<th style='min-width: 80px;' />").html(mstr).appendTo(tr);
			rtn.push(mstr);
		}
	}
	return rtn;
}

/**
 * 导出标准价格信息
 */
function downloadStandardPrice(){
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	var str = '标准单价查询：';
	var strArr = [];
	var orgStr = "";
	var org_type = nodes[0].org_type;
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
	if(org_type=='0'){
		var childrenNodes = treeNode.children;
        for (var x = 0; x < childrenNodes.length; x++) {
        	orgStr += ',' + childrenNodes[x].name;
        }
	}
	if(treeNode.org_type == '1'||treeNode.org_type == '2'){
		factory = treeNode.displayName;
		var childrenNodes=treeNode.children[0].children;
		$.each(childrenNodes,function(index,childrenNode){
			orgStr+=","+childrenNode.displayName;
		});
		
	}
	if(treeNode.org_type == '3'){
		var childrenNodes=treeNode.children;
		$.each(childrenNodes,function(index,childrenNode){
			orgStr+=","+childrenNode.displayName;
		});
	}
	
	
	var nodes = zTreeObj.getSelectedNodes();
	var org_id = nodes[0].id;
	var orgType = nodes[0].org_type;
	var bus_type_id = $("#bus_type_id :selected").text();
	var month_s = $("#month_s").val();
	var month_e = $("#month_e").val();
	if(org_id==null || org_id == '0'){
		alert('请在左侧组织结构树中选择班组！');
		return;
	}
	if(undefined == month_s || null==month_s || month_s.trim() == ''){
		alert('必须选择起始月份！');
		return;
	}

	window.open("standardTimeAndPrice!downloadStandardPrice.action?org_id=" + org_id
			+ "&orgType="+orgType
			+ "&bus_type=" + bus_type_id+ "&month_s=" + month_s
			+ "&month_e=" + month_e
			+ "&orgStr=" + orgStr);
	return false;
}