var initflag=0;

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
	
}

function zTreeOnClick(event, treeId, treeNode) {
	ajaxQuery();
};

$(document).ready(function () {
	initPage();
	function initPage(){
		//获取系统时间 
		var LSTR_ndate=new Date(); 
		var LSTR_MM=LSTR_ndate.getMonth()+1;
		var LSTR_DD=LSTR_ndate.getDate(); 
		LSTR_MM=LSTR_MM >= 10?LSTR_MM:("0"+LSTR_MM);
		$("#staff_date").val(getPreMonth(LSTR_ndate.getFullYear() + "-" + LSTR_MM + "-01"));
		
		var jobType = $("#job_type").val();
		getJobGradeSelect($("#job_grade"), '', '', jobType);
		$("#hrPlan").find(".treemenu").addClass("collapsed");
		$("#hr_pecie").addClass("in");
		//ajaxTree();
		getOrgAuthTree($("#staffTree"),"1,2,3,4",'1');
		ajaxQuery();
		
		$("#new_add").val('0');
		$("#new_deduct").val('0');
		$("#btnAddConfirm").removeAttr("disabled");
		
		getFactorySelect("#new_staff_Factory","","empty","");
	}

	/**
	 * 查询按钮
	 */
	$("#btnQuery").live("click",function(e){
		ajaxQuery();
	});
	
	$("#new_staff_Factory").change(function(){
		//getDepartSelect("#new_staff_Workshop","",$(this).val(),"empty");
		getWorkshopSelect("#new_staff_Workshop", "", $(this).val(), "empty","")
	});
	
	$("#btnAdd").click( function (argument) {
		$("#newModal").modal("show");
		$("#new_staff_number").val("")
		$("#new_staff_name").val("")
		$("#new_staff_number").focus();
	});
	
	$("#job_type").live("change",function(e){
		var jobType = $("#job_type").val();
		getJobGradeSelect($("#job_grade"), '', '', jobType);
	});
	
	//保存
	$("#btnSave").live("click",function(e){
		saveData();
	});
	
	$("#btnAddConfirm").click (function () {
		ajaxAdd();
		return false;
	});
	
	$("#btnBulkAdd").click (function () {
		$("#divBulkAdd").show();
		$("#tableDiv").hide();
	});
	//导出员工信息
	$("#downloadStaffInfo").live("click",function(e){
		downloadStaffInfo();
	});
	
	$("#new_staff_number").blur(function(){
		$.ajax({
			url: "common!getStaffNameByNumber.action",
		    dataType: "json",
		    async: false,
		    type: "get",
		    data: {
		    	"staff_number":$("#new_staff_number").val(),
		    },
		    success:function(response){
		    	if(response.success) {
		    		$("#new_staff_name").val(response.message);
		    	} 
		    }
		});
	});
});

/**
 * 通过org_id查询所有员工信息
 * @param id
 */
function ajaxQuery(targetPage){
	$("#divBulkAdd").hide();
	$("#tableDiv").show();
	$(".divLoading").addClass("fade in").show();
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	var strArr = [];
	str = '奖惩：';
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
	$("#staffListTitle").html(str);
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
	
	var org_id = nodes[0].id;
	var orgType = nodes[0].org_type;
	var staff_number = $("#staff_number").val();
	
	$.ajax({
		url: "hr!getRewardsList.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	"org_id":org_id,
	    	"orgType":orgType,
	    	"staff_number":staff_number,
	    	"staff_date":$("#staff_date").val(),
	    	"orgStr":orgStr,
	       	"pager.pageSize":pageSize,
			"pager.curPage":targetPage || 1
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
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.rewards_factory).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.rewards_workshop).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.rewards_date).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.reasons).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.add).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.deduct).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.group_leader).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.gaffer).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.proposer).appendTo(tr);
    				var btn_del = "";
    				if(staff.status == '0'){
    					btn_del = "<button onclick = 'ajaxDelReward(" + staff.id + ");' class='btn-link'>删除</>";
    				}else{
    					btn_del = "<button disabled='disabled' class='btn-link'>锁定</>";
    				}
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(btn_del).appendTo(tr);
    				tr.data("id", staff.id==staff?"":staff.id);
    				reward_count++;
    				$("#attendanceTable tbody").append(tr);
                });
                //$("#staffTable").dataTable();
        		$("#total").html(response.pager.totalCount);
        		$("#total").attr("total",response.pager.totalCount);
        		$("#cur").attr("page",response.pager.curPage);
        		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
        		$("#pagination").show();
            } 
	    }
	});
	$(".divLoading").hide();
}

function ajaxDelReward(reward_id){
	var gnl=confirm("确定要删除吗?"); 
	if (gnl==true){ 
		$.ajax({
			url: "hr!delRewardsByID.action",
		    dataType: "json",
		    async: false,
		    type: "get",
		    data: {
		    	"reward_id":reward_id,
		    },
		    success:function(response){
		    	if (response.success) {
		    		alert("删除成功！");
		    		ajaxQuery();
		    	} else {
		    		alert(response.message);
		    	}
		    }
		});		
	}
}

function ajaxAdd (argument) {
	//数据验证deduct
	if(($("#new_staff_number").val() == '')||($("#new_rewards_date").val() == '')||($("#new_reasons").val() == '')||($("#new_group_leader").val() == '')){
		alert('请输入完整奖惩数据！');
		$("#btnAddConfirm").removeAttr("disabled");
		return false;
	}else if ($("#new_staff_name").val() == ''){
		alert('请输入正确的员工工号！');
		$("#btnAddConfirm").removeAttr("disabled");
		$("#new_staff_number").focus();
		return false;
	}else if(isNaN($("#new_add").val())||isNaN($("#new_deduct").val())){
		alert('奖惩扣分必须为数字！');
		$("#btnAddConfirm").removeAttr("disabled");
		return false;
	}else if ($("#new_staff_Factory").val()==''){
		alert('请选择工厂！');
		$("#btnAddConfirm").removeAttr("disabled");
		return false;
	}else if ($("#new_staff_Workshop").val()==''){
		alert('请选择车间！');
		$("#btnAddConfirm").removeAttr("disabled");
		return false;
	}
	$("#btnAddConfirm").attr("disabled","disabled");
	$.ajax({
		url: "hr!addRewards.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	"staff_number":$("#new_staff_number").val(),
	    	"rewards_factory":$("#new_staff_Factory").find("option:selected").text(),
	    	"rewards_workshop":$("#new_staff_Workshop").find("option:selected").text(),
	    	"rewards_date":$("#new_rewards_date").val(),
	    	"reasons":$("#new_reasons").val(),
	    	"deduct":$("#new_deduct").val(),
	    	"add":$("#new_add").val(),
	    	"group_leader":$("#new_group_leader").val(),
	    	"gaffer":$("#new_gaffer").val(),
	    	"proposer":$("#new_proposer").val(),
	    },
	    success:function(response){
	    	if (response.success) {
	    		$('#newModal').modal('hide');
	    		$("#btnAddConfirm").removeAttr("disabled");
	    		$("#staff_date").val($("#new_rewards_date").val().substr(0,7));
	    		ajaxQuery();
	    	} else {
	    		alert(response.message);
	    	}
	    }
	});
	
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

extArray = new Array(".xlsx");
function LimitAttach(form, file) {
	if ($("#file").val() == "") {
		alert("请选择文件！");
		return false;
	}
	allowSubmit = false;
	if (!file)
		return;
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
		$("#rewardUploadForm").ajaxSubmit({
			url:"hr!uploadRewards.action",
			type: "post",
			dataType:"json",
			success:function(response){
				alert(response.message);				
			}			
		});
		//$('#btn_upload').val("上传中...");
		//$('#btn_upload').attr('disabled', "true");
	} else {
		alert("对不起，只能上传xlsx格式的文件!\n请重新选择符合条件的文件再上传.");
		return false;
	}
	return false;
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