var initflag=0;
var thmonths = null;
var pageSize = 10;
var endDateLimit="";
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
		getOrgAuthTree($("#workGroupTree"),"1,2,3,4,5,6",'1');
		//默认取当前年1-当月
		var myDate = new Date();
		var year = myDate.getFullYear();
		$("#month_s").val(year+'-01');
		var month=myDate.getMonth()+1;
		month=month<10?'0'+month:month;
		$("#month_e").val(year+'-'+month);
		ajaxQuery();
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
	
	$("#export").click(function(){
		ajaxQuery(0,"all");
		htmlToExcel("workgroupTable-hidden", "", "","员工技能系数","员工技能系数");
		return false;
	});
	
});

/**
 * 通过org_id查询所有直接子节点
 * @param id
 */
function ajaxQuery(targetPage,queryAll){
	$(".divLoading").addClass("fade in").show();
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	var str = '员工技能系数查询：';
	var strArr = [];
	var orgStr = "";
	strArr.push(treeNode.name);
	var parentNode = treeNode.getParentNode();
	while (parentNode!=null){
		strArr.push(parentNode.name);
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
	/*if(org_type=='0'){
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
	}*/
	var factory = "";
	var dept="";
	var workshop = "";
	var workgroup = "";
	var team = "";
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	while (treeNode != null) {
		if (treeNode.org_type == '1'||treeNode.org_type == '2') {
			factory = treeNode.displayName;
		}
		if (treeNode.org_type == '3') {
			dept = treeNode.displayName;
		}
		if (treeNode.org_type == '4') {
			workshop = treeNode.displayName;
		}
		if (treeNode.org_type == '5') {
			workgroup = treeNode.displayName;
		}
		if (treeNode.org_type == '6') {
			team = treeNode.displayName;
		}
		treeNode = treeNode.getParentNode();
	}
	
	$("#workgroupTitle").html(str);
	var org_id = nodes[0].id;
	var org_type = nodes[0].org_type;
	var staff_number = $("#staff_number").val();
	var month_s = $("#month_s").val();
	var month_e = $("#month_e").val();
	if(undefined == month_s || null==month_s || month_s.trim() == ''){
		alert('必须选择起始月份！');
		return;
	}
	var tableThead,tableTbody,data;
	if(queryAll=="all"){
	    data={
			  'org_id':org_id,
			  'orgType':org_type,
			  'factory':factory,
			  'dept':dept,
			  'workshop':workshop,
			  'workgroup':workgroup,
			  'team':team,
			  'staff':staff_number,
			  'month_s':month_s,
			  'month_e':month_e,
			  "pager":null
	    }	
	    tableThead=$("#workgroupTable-hidden thead");
	    tableTbody=$("#workgroupTable-hidden tbody");
	}else{
		data={
		      'org_id':org_id,
		      'orgType':org_type,
		      'factory':factory,
			  'dept':dept,
			  'workshop':workshop,
			  'workgroup':workgroup,
			  'team':team,
		      'staff':staff_number,
		      'month_s':month_s,
		      'month_e':month_e,
			  "pager.pageSize" : pageSize,
			  "pager.curPage" : targetPage || 1	
		}
	    tableThead=$("#workgroupTable thead");
	    tableTbody=$("#workgroupTable tbody");
	}
	$.ajax({
		url: "staff!queryStaffSkillParameter.action",
	    dataType: "json",
	    async: false,
	    type: "post",
	    data: data,
	    success:function(response){
	    	if(response.success) {
	    		//清空表头添加内容
	    		$(tableThead).html('<tr>'+
	    			'<th style="min-width: 70px;">工号</th>'+
	    			'<th style="min-width: 80px;">姓名</th>'+
	    			'<th style="min-width: 120px;">'+
	    				'小班组'+
	    			'</th>'+
	    			'<th style="min-width: 120px;">'+
	    				'班组'+
	    			'</th>'+		
	    			'<th style="min-width: 60px;">'+
	    				'车间'+
	    			'</th>'+
	    			'<th style="min-width: 80px;">工厂</th>'+
	    		'</tr>');
	    		thmonths = setTh(tableThead);
	    		$(tableTbody).html("");
                $.each(response.data, function (index, time) {
                	//if(undefined != time.smallGroupId){
	    				var tr = $("<tr />");
	    				$("<td />").html(time.staff_number).appendTo(tr);
	    				$("<td />").html(time.name).appendTo(tr);
	    				$("<td />").html(time.team_org).appendTo(tr);
	    				$("<td />").html(time.workgroup_org).appendTo(tr);
	    				$("<td />").html(time.workshop_org).appendTo(tr);
	    				$("<td />").html(time.plant_org).appendTo(tr);
	    				/**
	    				 * 根据月份设置表头
	    				 */
	    				var lastMonthValue = null;
	    				for(var i=0;i<thmonths.length;i++){
	    					var xx = thmonths[i]+'';
	    					if(lastMonthValue == time[xx]){
	    						$("<td />").html(time[xx]).appendTo(tr);
	    					}else{
	    						$("<td style='color: red;' />").html(time[xx]).appendTo(tr);
	    					}
	    					lastMonthValue = time[xx];
	    				}
	    				
	    				$(tableTbody).append(tr);
                	//}
                });
                if(queryAll!="all"){
	        		$("#total").html(response.pager.totalCount);
	        		$("#total").attr("total",response.pager.totalCount);
	        		$("#cur").attr("page",response.pager.curPage);
	        		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
	        		$("#pagination").show();
                }
            } 
	    }
	});
	$(".divLoading").hide();
}
/**
 * 根据用户选择的月份区间设置表头，并返回月份区间长度
 */
function setTh(tableThead){
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
	var tr = $(tableThead).children("tr").eq(0);
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

function changeMonth(){
	var startDate=$("#month_s").val();
	var year= parseInt((startDate.split("-"))[0]);
	var month=parseInt((startDate.split("-"))[1]);
	var year_limit;
	var month_limit;
	var cDate=new Date();
	var cMonth=cDate.getMonth()+1;
	var cYear=cDate.getFullYear();
	if(month==1){
		year_limit=year;
		if(year_limit==cYear){
			month_limit=cMonth;
		}else
			month_limit=12;
	}else{
		if(year==cYear){
			year_limit=year;
			month_limit=cMonth;
		}else{
			year_limit=year+1;
			month_limit=12-(12-month)-1;
		}	
		
		if(month_limit>cMonth){
			month_limit=cMonth;
		}
	}	
	if(month_limit<10){
		month_limit="0"+month_limit;
	}
	//alert(year_limit+"-"+month_limit);
	var dateLimit=year_limit+"-"+month_limit;
	
	$("#month_e").val(dateLimit);
	$("#month_e").attr("onclick","WdatePicker({'dateFmt':'yyyy-MM','maxDate':'" +
			""+dateLimit+"','el':'month_e'});");
	//alert(startDate)
}
