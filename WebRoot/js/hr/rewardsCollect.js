var initflag=0;
var data_url = "hr!getRewardsCollectList.action?";

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
	
}

function zTreeOnClick(event, treeId, treeNode) {
	ajaxQuery();
};

$(document).ready(function () {
	//$(".container").width(getWidth1());
    eachSeries(scripts, getScript, initTable);
    
	initPage();
	function initPage(){
		var factory_param=getQueryString("factory")||"";
		var staff_param=getQueryString("staff");
		var month_param=getQueryString("month");
		if(staff_param!=undefined && staff_param.trim().length>0){
			$("#staff_number").val(staff_param);
		}
		if(month_param!=undefined && month_param.trim().length>0){
			$("#staff_date").val(month_param);
		}else{
			//获取系统时间 
			var LSTR_ndate=new Date(); 
			var LSTR_MM=LSTR_ndate.getMonth()+1;
			var LSTR_DD=LSTR_ndate.getDate(); 
			LSTR_MM=LSTR_MM >= 10?LSTR_MM:("0"+LSTR_MM);
			$("#staff_date").val(getPreMonth(LSTR_ndate.getFullYear() + "-" + LSTR_MM + "-01"));
		}
	
		
		var jobType = $("#job_type").val();
		getJobGradeSelect($("#job_grade"), '', '', jobType);
		$("#hrPlan").find(".treemenu").addClass("collapsed");
		$("#hr_pecie").addClass("in");
		//ajaxTree();
		getOrgAuthTree($("#staffTree"),"1,2,3,4",'1',null,factory_param);
		ajaxQuery();
	}

	/**
	 * 查询按钮
	 */
	$("#btnQuery").live("click",function(e){
		ajaxQuery();
	});
	
	$("#job_type").live("change",function(e){
		var jobType = $("#job_type").val();
		getJobGradeSelect($("#job_grade"), '', '', jobType);
	});
	
	//导出员工信息
	$("#downloadStaffInfo").live("click",function(e){
		downloadStaffInfo();
	});
});

/**
 * 通过org_id查询所有员工信息
 * @param id
 */
function ajaxQuery_(targetPage){
	$("#divBulkAdd").hide();
	$("#tableDiv").show();
	$(".divLoading").addClass("fade in").show();
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	var strArr = [];
	str = '奖惩汇总：';
	orgStr = '';
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
	if(treeNode.org_type=='0'){
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
	
	$("#staffListTitle").html(str);
	
	var org_id = nodes[0].id;
	var orgType = nodes[0].org_type;
	var staff_number = $("#staff_number").val();
	
	$.ajax({
		url: "hr!getRewardsCollectList.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	"org_id":org_id,
	    	"orgType":orgType,
	    	"staff_number":staff_number,
	    	"staff_date":$("#staff_date").val(),
	    	"orgStr":orgStr/*,
	       	"pager.pageSize":pageSize,
			"pager.curPage":targetPage || 1*/
	    },
	    success:function(response){
	    	if(response.success) {
	    		$("#attendanceTable tbody").html("");
	    		var reward_count = 1;
                $.each(response.data, function (index, staff) {
                	//if(undefined != time.smallGroupId){
    				var tr = $("<tr />");
    				$("<td style=\"padding-left:0px;padding-right:0px\"/>").html(reward_count).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\"/>").html(staff.staff_number).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.name).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.workgroup_org).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.team_org).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.rewards_factory).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.rewards_workshop).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.fullmark).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.add).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.deduct).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.mark).appendTo(tr);
    				//$("<td style=\"padding-left:0px;padding-right:0px\" />").html("<button onclick = 'ajaxQueryDetail(\"" + staff.staff_number + "\",\"" + staff.rewards_factory + "\",\"" + staff.rewards_workshop + "\");' class='btn-link' style='font-size: 12px;'>明细</>").appendTo(tr);
    				
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.rewards_date).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.reasons).appendTo(tr);
    				
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.add_).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.deduct_).appendTo(tr);
    				
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.group_leader).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.gaffer).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.proposer).appendTo(tr);
    				
    				tr.data("id", staff.id==staff?"":staff.id);
    				reward_count++;
    				$("#attendanceTable tbody").append(tr);
                });
                //$("#staffTable").dataTable();
        	/*	$("#total").html(response.pager.totalCount);
        		$("#total").attr("total",response.pager.totalCount);
        		$("#cur").attr("page",response.pager.curPage);
        		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
        		$("#pagination").show();*/
            } 
	    }
	});
	$(".divLoading").hide();
}

function ajaxQueryDetail(staff_number,rewards_factory,rewards_workshop){
	var staff_date = $("#staff_date").val();
	//alert(staff_number + staff_date);	
	$.ajax({
		url: "hr!getRewardsList.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	"orgType":0,
	    	"staff_number":staff_number,
	    	"rewards_factory":rewards_factory,
	    	"rewards_workshop":rewards_workshop,
	    	"staff_date":staff_date,
	    },
	    success:function(response){
	    	if (response.success) {
	    		$("#attendanceDetailTable tbody").html("");
	    		var reward_count = 1;
                $.each(response.data, function (index, staff) {
                	//if(undefined != time.smallGroupId){
    				var tr = $("<tr />");
    				$("<td style=\"padding-left:0px;padding-right:0px\"/>").html(reward_count).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\"/>").html(staff.staff_number).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.name).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.rewards_date).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.reasons).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.add).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.deduct).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.group_leader).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.gaffer).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.proposer).appendTo(tr);
    				tr.data("id", staff.id==staff?"":staff.id);
    				reward_count++;
    				$("#attendanceDetailTable tbody").append(tr);
                });
                $('#detailModal').modal('show');
	    	} else {
	    		alert(response.message);
	    	}
	    }
	});
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

/**
 * 获取上一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    //var t2 = year2 + '-' + month2 + '-' + day2;
    var t2 = year2 + '-' + month2;
    return t2;
}

//----------START bootstrap initTable ----------
function initTable() {
    $table.bootstrapTable({
        height: getHeight1(),
        url:data_url,
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        fixedColumns: false,			//冻结列
        fixedNumber: 0,					//冻结列数
        queryParams:function(params) {
        	var nodes = zTreeObj.getSelectedNodes();
        	var treeNode = nodes[0];
        	var strArr = [];
        	str = '奖惩汇总：';
        	orgStr = '';
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
        	if(treeNode.org_type=='0'){
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
        	
        	$("#staffListTitle").html(str);
        	
        	var org_id = nodes[0].id;
        	var orgType = nodes[0].org_type;
        	var staff_number = $("#staff_number").val();
        	
        	var conditions="{org_id:'"+org_id+"',orgType:'"+orgType
        		+"',staff_number:'"+staff_number+"',staff_date:'"+$("#staff_date").val()+
        		"',orgStr:'"+orgStr+"'}";
        	params["conditions"] = conditions; 
        	return params;
        },
        columns: [
        [
            {
            	field: 'staff_number',title: '&nbsp;&nbsp;&nbsp;工号&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'name',title: '&nbsp;&nbsp;姓名&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'workgroup_org',title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;班组&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'team_org',title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小班组&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'rewards_factory',title: '&nbsp;&nbsp;奖惩工厂&nbsp;&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'rewards_workshop',title: '&nbsp;&nbsp;奖惩车间&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'fullmark',title: '&nbsp;&nbsp;正常考<br>核分数',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'add',title: '&nbsp;&nbsp;加分',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'deduct',title: '扣分',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'mark',title: '本月车间<br>考核分数',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'rewards_date',title: '日期',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'reasons',title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;事由&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'add_',title: '奖励',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'deduct_',title: '减分',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'group_leader',title: '班组长',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'gaffer',title: '领班',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}/*,
    	        formatter:function(value,row,index){
                    	return "<a href=\"hrReport!ecnReport.action?staff="+row.staff_number+"&factory="+$("#factory :selected").text()+
        	        	"&month="+$("#month_start").val()+"\" target='_blank'>"+value.toFixed(2)+"</a>";
                    }*/
            },{
            	field: 'proposer',title: '处罚建议人',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            }
        ]
    ]
    });    
    $(window).resize(function () {
        $table.bootstrapTable('resetView', {height: getHeight1()});
    });
}
//----------END bootstrap initTable ----------

function ajaxQuery(){
	/*var workshopAll="";
	$("#workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});*/
	$table.bootstrapTable('refresh', {url: data_url});
}

function getHeight1() {return $(window).height() - 160;}
function getWidth1() {return $(window).width()-460;}