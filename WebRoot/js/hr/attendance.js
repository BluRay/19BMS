var initflag=0;
var model=window.location.search.substring(7);
function zTreeBeforeClick(treeId, treeNode, clickFlag) {
	//ajaxQuery();
}

function zTreeOnClick(event, treeId, treeNode) {
	ajaxQuery();
};

$(document).ready(function () {
	//alert(model);
	initPage();
	function initPage(){
		//获取系统时间 
		var LSTR_ndate=new Date(); 
		var LSTR_MM=LSTR_ndate.getMonth()+1;
		LSTR_MM=LSTR_MM > 10?LSTR_MM:("0"+LSTR_MM);
		$("#staff_month").val(LSTR_ndate.getFullYear() + "-" + LSTR_MM);
		
		var jobType = $("#job_type").val();
		getJobGradeSelect($("#job_grade"), '', '', jobType);
		$("#hrPlan").find(".treemenu").addClass("collapsed");
		$("#hr_pecie").addClass("in");
		//ajaxTree();
		getOrgAuthTree($("#staffTree"),"1,2,3,4,5,6",'1');
		//ajaxQuery();
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
	
	//保存
	$("#btnSave").live("click",function(e){
		saveData();
	});
	
	$("#btnBulkAdd").click (function () {
		$("#divBulkAdd").show();
		$("#tableDiv").hide();
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
function ajaxQuery(targetPage){
	$("#divBulkAdd").hide();
	$("#tableDiv").show();
	$(".divLoading_s").addClass("fade in").show();
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	var strArr = [];
	var factory;var dept;var workshop;var workgroup;var team;
	str = '考勤：';
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
		if(i==0) factory = strArr[i];
		if(i==1) dept = strArr[i];
		if(i==2) workshop = strArr[i];
		if(i==3) workgroup = strArr[i];
		if(i==4) team = strArr[i];
	}
	for(var i=0;i<=31;i++){
		$("#D"+(i+1)).css('background-color','');
	}
	
	$("#staffListTitle").html(str);
	
	var org_id = nodes[0].id;
	var org_type = nodes[0].org_type;
	var staff_number = $("#staff_number").val();
	
	$.ajax({
		url: "hr!getAttendanceList.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	"org_id":org_id,
	    	"orgType":org_type,
	    	"factory":factory,
	    	"dept":dept,
	    	"workshop":workshop,
	    	"workgroup":workgroup,
	    	"team":team,
	    	"staff_number":staff_number,
	    	"month":$("#staff_month").val(),
	    	"orgStr":orgStr,
	    	"model":model,
	       	"pager.pageSize":pageSize,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){
	    	if(response.success) {
	    		$("#attendanceTable tbody").html("");
	    		var date= new Date(Date.parse($("#staff_month").val() + "-01"));      //转换成Data();
                $.each(response.data, function (index, staff) {
                	//if(undefined != time.smallGroupId){
	    				var tr = $("<tr />");
	    				var i = 0; var fday = date.getDay();
	    				$("<td style=\"padding-left:0px;padding-right:0px\"/>").html(staff.staff_number).appendTo(tr);
	    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.name).appendTo(tr);
	    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.attendance_days).appendTo(tr);
	    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.attendance_hours).appendTo(tr);
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D1).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D1).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D2).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D2).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D3).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D3).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D4).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D4).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D5).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D5).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D6).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D6).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D7).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D7).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D8).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D8).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D9).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D9).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D10).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D10).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D11).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D11).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D12).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D12).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D13).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D13).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D14).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D14).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D15).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D15).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D16).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D16).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D17).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D17).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D18).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D18).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D19).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D19).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D20).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D20).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D21).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D21).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D22).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D22).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D23).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D23).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D24).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D24).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D25).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D25).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D26).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D26).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D27).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D27).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D28).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D28).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D29).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D29).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D30).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D30).appendTo(tr);
	    				}
	    				i++;
	    				if(((date.getDay()+i%7)%7 ==6)||(date.getDay()+i%7)%7 ==0){
	    					$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(staff.D31).appendTo(tr);
	    					$("#D"+(i+1)).css('background-color','LightGreen');
	    				}else{
	    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(staff.D31).appendTo(tr);
	    				}
	    				
	    				tr.data("id", staff.id==staff?"":staff.id);
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
	$(".divLoading_s").hide();
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
		$(".divLoading").addClass("fade in").show();
		$("#attendanceUploadForm").ajaxSubmit({
			url:"hr!uploadAttendance.action",
			type: "post",
			dataType:"json",
			success:function(response){
				alert(response.message);
				if(response.success){					
					//window.open("materialAbnormal!index.action","_self");
				}else{
					
				}
				$(".divLoading").hide();
				ajaxQuery();
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