var initflag=0;
var str ;
var orgStr ;

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
}

function zTreeOnClick(event, treeId, treeNode) {
	ajaxQuery();
};

$(document).ready(function () {
	initPage();
	function initPage(){
		var jobType = $("#job_type").val();
		getJobGradeSelect($("#job_grade"), '', '', jobType);
		$("#hrPlan").find(".treemenu").addClass("collapsed");
		$("#hr_plan").addClass("in");
		getOrgAuthTree($("#staffTree"));
		
        var nodes = zTreeObj.getNodes();
        if (nodes.length>0) {
        	if(nodes[0].name !='无数据权限'){
                zNodes.push(
                		{id:1,pId:null,name:'第十九事业部',org_type:0,org_kind:0,displayName:'第十九事业部'}
                );
                zTreeObj = $.fn.zTree.init($("#staffTree"), zTreeObj.setting, zNodes);
                nodes = zTreeObj.getNodes();
                zTreeObj.selectNode(nodes[0]);
                expandLevel(zTreeObj,nodes[0],1);
        	}
        }
		//ajaxTree();
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
	var nodes = zTreeObj.getSelectedNodes();
	var treeNode = nodes[0];
	var org_type = treeNode.org_type;
	var strArr = [];
	str = '员工库：';
	orgStr = "";
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
	if(org_type=='0'){
		var childrenNodes = treeNode.children;
        for (var x = 0; x < childrenNodes.length; x++) {
        	orgStr += ',' + childrenNodes[x].name;
        }
	}
	$("#staffListTitle").html(str);
	
	var org_id = nodes[0].id;
	var orgType = nodes[0].org_type;
	var staff_number = $("#staff_number").val();
	var staff_level = $("#staff_level").val();
	var salary_type = $("#salary_type").val();
	var job_type = $("#job_type").val();
	var job_grade = $("#job_grade").val();
	var job = $("#job").val();
	var workplace = $("#workplace").val();
	var status = $("input[name='status']:checked").val(); //在职状态
	$.ajax({
		url: "staff!getStaffList.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	"org_id":org_id,
	    	"orgType":orgType,
	    	"staff_number":staff_number,
	    	"staff_level":staff_level,
	    	"salary_type":salary_type,
	    	"job_type":job_type,
	    	"job_grade":job_grade,
	    	"job":job,
	    	"workplace":workplace,
	    	"status":status,
	    	"orgStr":orgStr,
	       	"pager.pageSize":pageSize,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){
	    	if(response.success) {
	    		$("#staffTable tbody").html("");
                $.each(response.data, function (index, staff) {
                	//if(undefined != time.smallGroupId){
	    				var tr = $("<tr />");
	    				$("<td />").html(staff.staff_number).appendTo(tr);
	    				$("<td />").html(staff.name).appendTo(tr);
	    				$("<td />").html(staff.sex).appendTo(tr);
	    				$("<td />").html(staff.birthday).appendTo(tr);
	    				$("<td />").html(staff.age).appendTo(tr);
	    				//最高学历  1 小学 2 初中 3 高中 4中专 5大专 6本科 7硕士 8博士
	    				$("<td />").html(staff.highest_education).appendTo(tr);
	    				$("<td />").html(staff.fresh_student).appendTo(tr);
	    				$("<td />").html(staff.political_status).appendTo(tr);
	    				$("<td />").html(staff.identity_card).appendTo(tr);
	    				$("<td />").html(staff.factory_incoming_date).appendTo(tr);
	    				$("<td />").html(staff.staff_level).appendTo(tr);
	    				$("<td />").html(staff.skill_parameter).appendTo(tr);
	    				$("<td />").html(staff.salary_type).appendTo(tr);
	    				$("<td />").html(staff.plant_org).appendTo(tr);
	    				$("<td />").html(staff.dept_org).appendTo(tr);
	    				$("<td />").html(staff.workshop_org).appendTo(tr);
	    				$("<td />").html(staff.workgroup_org).appendTo(tr);
	    				$("<td />").html(staff.team_org).appendTo(tr);
	    				$("<td />").html(staff.job).appendTo(tr);
	    				$("<td />").html(staff.status).appendTo(tr);
	    				//入职渠道 0 内招 1 内部推荐 2 网络 3 人才市场 4 学校职介 5 门口
	    				$("<td />").html(staff.join_channel).appendTo(tr);
	    				//离职方式 0 员工提出解除 1 自离 2 公司提出解除 3未到车间报到 4 其他
	    				$("<td />").html(staff.leave_way).appendTo(tr);
	    				$("<td />").html(staff.leave_date).appendTo(tr); 
	    				//离职原因 0 薪酬待遇 1 个人发展 2 家庭原因 3自离 4 住宿条件 5工作环境 6 劳动强度 7 公司提出解除 8 未到车间报到
	    				$("<td />").html(staff.leave_reason).appendTo(tr); 
	    				$("<td />").html(staff.last_company).appendTo(tr); 
	    				$("<td />").html(staff.last_leave_reason).appendTo(tr); 
	    				$("<td />").html(staff.phone).appendTo(tr); 
	    				var family_address = staff.family_address;
	    				if(staff.family_address!=undefined){
	    					if(staff.family_address.length>12){family_address = staff.family_address.substring(0,12) + '...'};
	    				}
	        			
	    				$("<td title='"+staff.family_address+"'/>").html(family_address).appendTo(tr); 
	    				$("<td />").html(staff.nation).appendTo(tr);
	    				$("<td />").html(staff.corporation).appendTo(tr);
	    				$("<td />").html(staff.workplace).appendTo(tr);
	    				
	    				tr.data("id", staff.id==staff?"":staff.id);
	    				$("#staffTable tbody").append(tr);
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
						bus_type_id = $("#bus_type_id").val(); 
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
 * 导出员工信息
 */
function downloadStaffInfo(){
	var nodes = zTreeObj.getSelectedNodes();
	var org_id = nodes[0].id;
	var orgType = nodes[0].org_type;
	var staff_number = $("#staff_number").val();
	var staff_level = $("#staff_level").val();
	var salary_type = $("#salary_type").val();
	var job_type = $("#job_type").val();
	var job_grade = $("#job_grade").val();
	var job = $("#job").val();
	var workplace = $("#workplace").val();
	var status = $("input[name='status']:checked").val(); //在职状态
	window.open("staff!downloadStaffInfo.action?org_id=" + org_id + "&staff_number=" + staff_number
			+ "&orgType="+orgType
			+ "&staff_level=" + staff_level+ "&salary_type=" + salary_type
			+ "&job_type=" + job_type+ "&job_grade=" + job_grade
			+ "&job=" + job
			+ "&workplace="+workplace
			+ "&orgStr=" + orgStr 
			+ "&status=" + status);
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
		$("#staffUploadForm").ajaxSubmit({
			url:"staff!uploadStaff.action",
			type: "post",
			dataType:"json",
	        beforeSend:function(XMLHttpRequest){
	            //alert('远程调用开始...');
	            $("#loading").html("<img src='images/loading.gif' />");
	            $("#loading").show();
	        },
			success:function(response){
	           $("#loading").empty();
	           $("#loading").hide();
				alert(response.message);
				if(response.success){
					ajaxQuery();
					//window.open("materialAbnormal!index.action","_self");
				}else{
					
				}						
			},
			complete:function(XMLHttpRequest,textStatus){
	            // alert('远程调用成功，状态文本值：'+textStatus);
	           $("#loading").empty();
	           $("#loading").hide();
	        },
	        error:function(XMLHttpRequest,textStatus,errorThrown){
	           $("#loading").empty();
	           $("#loading").hide();
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