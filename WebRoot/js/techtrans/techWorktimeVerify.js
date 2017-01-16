var pageSize =10;
var timeConfigCount = 0;
var ready_hour=0;
var edit_list=[];
var re_f = /^[0-9]+[0-9]*\.?[0|5]?$/;//浮点数正则表达式
$(document).ready(function () {	
	initPage();
	// 工厂切换事件
	$("#search_factory").change(function() {
		var selectFactory = $("#search_factory :selected").text();
		getWorkshopSelect_Auth("#search_workshop", null, selectFactory, "noall");
	});
	// 复选框全选、反选
	$("#checkall").click(function() {
		if ($(this).attr("checked") == "checked") {
			check_All_unAll("#work_hour_tb", true);
		} else
			check_All_unAll("#work_hour_tb", false);
	});
	
	$(".fa-pencil").live("click",function(e) {
		var d = new Date();
		var eYear = d.getFullYear();
		var eMon = d.getMonth() + 1;
		var workMonth=eYear+"-"+(eMon<10?"0"+eMon:eMon);
		$("#edit_workDate").val(workMonth);
		
		var tr = $(e.target).closest("tr");
		var tds = $(tr).children("td");
		var type = $(e.target).attr("data-original-title");
		var tech_order_no = $(tr).data("tech_order_no");
		var task = $(tr).data("task");
		var totalQty=$(tr).data("tech_num");
		var singleHour=$(tr).data("single_hour");

		edit_list = [];
		ready_hour = 0;
		var factory=$(tr).data("factory");
		var workshop=$(tr).data("workshop");
		//var conditions = "{ecnTaskId:'" + $(tr).data("ecnTaskId") + "'}";
		var conditions="{ecnTaskId:'"+$(tr).data("tech_task_id")+"',workMonth:'"+workMonth+"',factory:'"+factory+"',workshop:'"+workshop+"'}";
		swhlist = ajaxGetStaffWorkHours(conditions);
		generateWorkhourTb(swhlist,true);
		$("#checkall").attr("checked",false);
		$("#edit_orderNo").html(tech_order_no);
		$("#edit_task").html(task);
		$("#edit_ecnNumber").html(totalQty);
		$("#edit_singleHour").html(singleHour);
		$("#edit_singlePrice").find("input").val("")
		$("#editModal").data("factory",$(tr).data("factory"));
		$("#editModal").data("workshop",$(tr).data("workshop"))
		$("#editModal").data("tech_task_id", $(tr).data("tech_task_id"));
		$("#editModal").data("totalHour", $(tr).data("totalHour"));
		$("#editModal").modal("show");
			});
	
	$("#btnSwhQuery").click(function(){
		var factory=$("#editModal").data("factory");
		var workshop=$("#editModal").data("workshop");
		//var conditions = "{ecnTaskId:'" + $(tr).data("ecnTaskId") + "'}";
		var conditions="{ecnTaskId:'"+$("#editModal").data("tech_task_id")+"',workMonth:'"+$("#edit_workDate").val()+
		"',factory:'"+factory+"',workshop:'"+workshop+"',staffNum='"+$("#edit_cardNumber").val()+"'}";
		swhlist = ajaxGetStaffWorkHours(conditions);
		generateWorkhourTb(swhlist,true);
	});

	// 批准
	$("#btnVerify").click(function() {
		var workDate=$("#edit_workDate").val();
		var tech_single_price=$("#edit_singlePrice").find("input").val();
		if(!const_float_validate.test(tech_single_price)){
			alert("请输入有效工时单价！");
			return false;
		}
		var conditions={};
		conditions.factory=$("#editModal").data("factory");
		conditions.workshop=$("#editModal").data("workshop");
		conditions.workMonth=workDate;
		edit_list=getSelectList();
		var orderStaus="verify";
		var trs=$("#workhour_list").children("tr");
		$.each(trs,function(index,tr){
			var cbx=$(tr).find("td").find("input").attr("type");
			//alert(cbx)
			if(cbx!=undefined){
				var obj=edit_list[index];
				//alert(obj.staff_number)
				edit_list[index].techSinglePrice=tech_single_price;
				var c_checkbox=$(tr).find('input[type=checkbox]');
				var status=$(tr).data("status");
				var ischecked=$(c_checkbox).is(":checked");
				if(status=='已驳回'&&!ischecked){
					orderStaus="reject";
				}	
			}
			
		});
		if(edit_list.length>0)
		ajaxUpdate(JSON.stringify(edit_list),JSON.stringify(conditions),"verify",$("#editModal").data("tech_task_id"),orderStaus);
		$("#editModal").modal("hide");
	});
	// 驳回
	$("#btnReject").click(function() {
		
		$("#reasonModal").modal("show");		
	});
	//输入驳回原因确认后驳回
	$("#btnMtaSave").click(function() {
		var workDate=$("#edit_workDate").val();
		var conditions={};
		conditions.factory=$("#editModal").data("factory");
		conditions.workshop=$("#editModal").data("workshop");
		conditions.workMonth=workDate;
		edit_list=getSelectList();
		if(!edit_list){
			return false;
		}
		var rejectReason=$("#reject_reason").val();
		if(rejectReason){
			if(edit_list.length>0){
				ajaxUpdate(JSON.stringify(edit_list),JSON.stringify(conditions),"reject",$("#editModal").data("tech_task_id"),"reject",rejectReason);
				$("#editModal").modal("hide");
			}			
		}else{
			alert("请输入驳回原因！");
		}
		
	});

	
	function initPage(){
		getAuthorityFactorySelect("#factory", "", "noall");
		//getWorkshopSelect_Key("#search_workshop", "");		
		var selectFactory = $("#factory :selected").text();
		//getWorkshopSelect_Org("#workshop", null, selectFactory, "empty");
		/*getWorkshopSelect_Auth("#workshop", null,selectFactory, "noall");
		var workshop = $("#workshop").val();
		getChildOrgSelect("#group", workshop, "", "empty");
		var group = $("#group").val();
		getChildOrgSelect("#subgroup", group, "", "empty");*/
		
		$("#taskFollow").show();
		$("#carFollow").hide();
		//getFactorySelect();
		getAuthorityFactorySelect("#search_factory", "", "noall");
		getWorkshopSelect_Auth("#search_workshop", null, $("#search_factory :selected").text(), "noall");
		getOrderNoSelect("#order_no","#orderId");
		//$("#taskstatus").val("0");
		ajaxQuery(1);
	};
	
	//技改信息查询
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	//车辆技改信息查询
	$("#btnQuerySingleTask").click (function () {
		if($("#busno").val()==""){
			alert("请输入完整的车号信息！");
			return false;
		}
		singlebusnoQuery();
		return false;
	});
	
	//车辆技改信息查询
	$("#btn_single_bus_num_query_view").click (function () {
		var order_no = $("#selectBusNumber_orderId_view").val();
		var factory = $("#selectBusNumber_factoryId_view").val();
		var workshop = $("#selectBusNumber_workshop_view").val();
		var task_id = $("#selectBusNumber_taskId_view").val();
		var bus_num_s = $("#bus_num_start_view").val();
		var bus_num_e = $("#bus_num_end_view").val();
		var switch_mode = $("#selectBusNumber_switch_mode_view").val();
		var ecn_number = $("#selectBusNumber_ecnNumber_view").val();
		var status = $("#selectBusNumber_status_view").val();
		getTaskAllSelectedBusNum(order_no,factory,task_id,bus_num_s,bus_num_e,workshop);
	});
	
	//工时修改删除功能
	$("#btnSwhDelete").click(function(){
		var boxList=$("#workhour_list :checked");
		var swhList=[];
		var deltrlist=[];
		$.each(boxList,function(index,box){
			var obj={};
			var tr=$(box).closest("tr");
			var swhid=$(tr).data("id");
			obj.id=swhid;
			swhList.push(obj);
			deltrlist.push(tr);
		});
		
		if(swhList.length==0){
			alert("请选择需要删除的工时信息！");
		}else{
			$.ajax({
				url : "ecnDocumentTask!deleteWorkHourInfo.action",
				dataType : "json",
				type : "post",
				data : {
					"conditions" : JSON.stringify(swhList)
				},
				success:function(response){
					alert(response.message);
					$.each(deltrlist,function(index,tr){
						$(tr).remove();
						var workhour_input=$(tr).find("input").eq(1);
						var cur_hour=$(workhour_input).attr("old_value");	
						ready_hour=(ready_hour-parseFloat(cur_hour)).toFixed(2);
					});
					$(".read_hours").html("已分配工时："+ready_hour);
				}
			});
		}
	});
	
});

function getFactorySelect() {
	$.ajax({
		url : "common!getFactorySelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response, "", "#search_factory");
			select_str = "<select name='' id='factory_id1' class='input-small'>";
			$.each(response, function(index, value){
				select_str += "<option value=" + value.id + ">" + value.name + "</option>";
			});
			select_str += "</select>";
		}
	});
}

/**
 *  thw
 *  技改任务信息查询
 */
function ajaxQuery(targetPage){
	var workshopAll="";
	$("#search_workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	//alert(workshopAll);
	var workshop=$("#search_workshop :selected").text()=="全部"?workshopAll:$("#search_workshop :selected").text();
	var conditions={};
	conditions.task_content=$("#tech_task_content").val();
	conditions.tech_order_no=$("#tech_order_no").val();
	conditions.order_no=$("#order_no").val();
	conditions.factory=$("#search_factory :selected").text();
	conditions.workshop=$("#search_workshop :selected").text();
	conditions.tech_date_start=$("#startDate").val();
	conditions.tech_date_end=$("#endDate").val();
	conditions.status=$("#taskstatus").val();
	$.ajax({
	    url: "techTask!getTaskList.action",
	    dataType: "json",
		type: "post",
	    data: {
	    	"conditions":JSON.stringify(conditions),
	    	"pager.pageSize":pageSize||20,
			"pager.curPage":targetPage || 1
	    },
	    error : function(response) {
			alert(response.message)
		},
	    success:function(response){
    		$("#tableTaskFollow tbody").html("");
    		
    		$.each(response.dataList,function(i,value){   			
    			var tech_list=value.tech_list||"";
    			var follow_list=value.follow_list||"";
    			var ready_hour_list=value.ready_hour_list||"";
    			var time_list=value.time_list||"";
    			var rowspan=1
    			if($("#search_workshop :selected").text()=="全部"){
    				rowspan=tech_list.split(",").length;
    			}
    			var follow_obj={};
    			if(follow_list.trim().length>0){
    				follow_list=follow_list.replace(new RegExp(":","gm"),"\":").replace(new RegExp(",","gm"),",\"");
        			follow_list="{\""+follow_list+"}";
        			follow_obj=JSON.parse(follow_list)
    			}
    			var time_obj={};
    			if(time_list.trim().length>0){
    				time_list=time_list.replace(new RegExp(":","gm"),"\":").replace(new RegExp(",","gm"),",\"");
    				time_list="{\""+time_list+"}";
    				time_obj=JSON.parse(time_list)
    			}
    			var ready_obj={};
    			if(ready_hour_list.trim().length>0){
    				ready_hour_list=ready_hour_list.replace(new RegExp(":","gm"),"\":").replace(new RegExp(",","gm"),",\"");
    				ready_hour_list="{\""+ready_hour_list+"}";
    				ready_obj=JSON.parse(ready_hour_list)
    			}   			
    			
    			var tr=$("<tr >");
    			$("<td />").attr("rowspan",rowspan).html(value.task_content).appendTo(tr);
    			$("<td />").attr("rowspan",rowspan).html(value.tech_order_type).appendTo(tr);
    			$("<td />").attr("rowspan",rowspan).html(value.tech_order_no).appendTo(tr);
    			$("<td />").attr("rowspan",rowspan).html(value.tech_date).appendTo(tr);
    			$("<td />").attr("rowspan",rowspan).html(value.tech_order_type).appendTo(tr);
    			$("<td />").attr("rowspan",rowspan).html(value.switch_mode).appendTo(tr);
    			$("<td />").attr("rowspan",rowspan).html(value.switch_node||"-").appendTo(tr);
    			$("<td />").attr("rowspan",rowspan).html(value.order_desc).appendTo(tr);
    			$("<td />").attr("rowspan",rowspan).html(value.factory).appendTo(tr);
    			$.each(tech_list.split(","),function(index,tech){
    				var workshop=tech.split(":")[0];
    				var assign_num=tech.split(":")[1];
    				var assign_time=time_obj[workshop]||"";
    				var ready_hour=ready_obj[workshop]||"";
    				var ready_num=follow_obj[workshop]||"";
    				if($("#search_workshop :selected").text()==workshop){
    					$("<td />").html(workshop).appendTo(tr);
    					$("<td  align='center'/>").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" id='imgquery' onclick='showAssignTime(\""+value.time_list+"\")'></i>").appendTo(tr);			
    					$("<td />").html(assign_time).appendTo(tr);
    					$("<td />").html(assign_num).appendTo(tr);
    					$("<td />").html(ready_num).appendTo(tr);   
    					if(workshop=='自制件'||workshop=='部件'){
    						$("<td  align='center'/>").html("").appendTo(tr);
    					}else{
    						$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='getTaskAllSelectedBusNum(\""+value.order_no+"\",\""+value.factory+"\","+value.id+",null,null,\""+workshop+"\")'></i>").appendTo(tr);
    					}
    					
    					$("<td />").html(ready_hour).appendTo(tr);
    					if(ready_num==assign_num){
    						$("<td />").html("已完成").appendTo(tr);
    					}else{
    						$("<td />").html("未完成").appendTo(tr);
    					}  					
    					//$("<td />").html("<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\" title='工时维护' style=\"cursor: pointer;text-align: center;\" ></i>").appendTo(tr);
        	  			$("<td />").html("<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\"  title='工时审核'style=\"cursor: pointer;text-align: center;\" ></i>").appendTo(tr);
        	  			$("#tableTaskFollow tbody").append(tr);
        	  			$(tr).data("totalHour",assign_num*assign_time);
                		$(tr).data("tech_order_no",value.tech_order_no);
                		$(tr).data("task",value.task_content);
                		$(tr).data("tech_task_id",value.task_detail_id);
                		$(tr).data("factory",value.factory);
                		$(tr).data("workshop",workshop);
                		$(tr).data("tech_num",assign_num);
                		$(tr).data("single_hour",assign_time);
    				}/*else{
    					var tr_c=$("<tr >")
    					$("<td />").html(workshop).appendTo(tr_c);   					
    					$("<td  align='center'/>").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" id='imgquery' onclick='showAssignTime(\""+value.time_list+"\")'></i>").appendTo(tr_c);   					
    					$("<td />").html(assign_time).appendTo(tr_c);
    					$("<td />").html(assign_num).appendTo(tr_c);
    					$("<td />").html(ready_num).appendTo(tr_c);    					
    					if(workshop=='自制件'||workshop=='部件'){
    						$("<td  align='center'/>").html("").appendTo(tr_c);
    					}else{
    						$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='getTaskAllSelectedBusNum("+value.order_id+","+value.factory_id+","+value.id+",\""+value.switch_mode+"\",null,null,\""+workshop+"\")'></i>").appendTo(tr_c);
    					}

    					$("<td />").html(ready_hour).appendTo(tr_c);
    					if(ready_num==assign_num){
    						$("<td />").html("已完成").appendTo(tr_c);
    					}else{
    						$("<td />").html("未完成").appendTo(tr_c);
    					}  	
        				$("<td />").html("<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\" title='工时维护' style=\"cursor: pointer;text-align: center;\" ></i>").appendTo(tr_c);
        	  			$("<td />").html("<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\"  title='工时修改'style=\"cursor: pointer;text-align: center;\" ></i>").appendTo(tr_c);
        	  			$("#tableTaskFollow tbody").append(tr_c);
        	  			$(tr_c).data("totalHour",assign_num*assign_time);
                		$(tr_c).data("tech_order_no",value.tech_order_no);
                		$(tr_c).data("task",value.task_content);
                		$(tr_c).data("tech_task_id",value.id);
                		$(tr_c).data("factory",value.factory);
                		$(tr_c).data("workshop",workshop);
    				}*/
    				
    			});
    		})	
				
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();	
	    }
	});
}
/**
 * 查看技改任务所有已分配车号信息
 * @param order_id
 * @param factoryid
 * @param taskid
 * @param switch_mode
 * @param bus_num_start
 * @param bus_num_end
 */
function getTaskAllSelectedBusNum(order_no,factory,taskid,bus_num_start,bus_num_end,workshop){
	$("#selectBusNumber_orderId_view").val(order_no);
	$("#selectBusNumber_factoryId_view").val(factory);
	$("#selectBusNumber_workshop_view").val(workshop);
	$("#selectBusNumber_taskId_view").val(taskid);
	var bus_num_start = $("#bus_num_start_view").val()||'';
	var bus_num_end = $("#bus_num_end_view").val()||'';
	
	ajaxShowBusNumber(order_no,taskid,bus_num_start,bus_num_end,factory,workshop);
}

/**
 * 根据订单查询车号信息
 * @param order_id
 * @param ecn_task_id
 * @param bus_num_s
 * @param bus_num_e
 */
function ajaxShowBusNumber(order_no,tech_task_id,bus_num_s,bus_num_e,factory,workshop){
	$.ajax({
		url: "techTask!getTaskBusNumber.action",
		dataType: "json",
		type: "get",
		data: {
				"order_no" : order_no,
				"factory":factory,
				"tech_task_id" : tech_task_id,
				"bus_num_start" : bus_num_s||'',
				"bus_num_end" : bus_num_e||'',
				"workshop":workshop
		},
		async: false,
		error: function () {alert(response.message);},
		success: function (response) {
			if(response.success){
				$("#selectBusNumber_table_view tbody").html("");
	    		$.each(response.data,function (index,value) {
	    			var tr = $("<tr />");
	    			$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.process_name).appendTo(tr);
	       			$("<td style=\"text-align:center;\" />").html(value.confirmor).appendTo(tr);
	    			$("<td style=\"text-align:center;\" />").html(value.confirmor_date).appendTo(tr);
	    			$("#selectBusNumber_table_view tbody").append(tr);
	    			
	    		});
				$("#selectBusNumberModal_view").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}


//查询技改任务图片
function picupquery(taskid){
	$.ajax({
	    url: "ecnDocumentTask!queryTaskPicView.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"taskid":taskid,
	    },
	    success:function(response){
    		$.each(response.data,function(index,value){
    			$("#img4").attr("src",value.old_photo) ;
    			$("#img5").attr("src",value.new_photo) ;
    		});	
    		$("#taskPicUpLoadQueryModal").modal("show");
	    }
	});
}

/**
 * 查看已分配技改工时信息
 */
function showAssignTime(time_list){
	$("#tableDepartmentquery tbody").html("");
	var timelist=[];
	if(time_list.length>0){
		timelist=time_list.split(",");
	}
	
	$.each(timelist, function(index, value){
		var tr=$("<tr />");
		var workshop=value.split(":")[0];
		var unit_time=value.split(":")[1];
		//$("<td />").html(value.factory_name).appendTo(tr);
		$("<td />").html(workshop).appendTo(tr);
		$("<td />").html(unit_time).appendTo(tr);
		$("<td />").html("H").appendTo(tr);
		$("#tableDepartmentquery tbody").append(tr);
	});
	$("#timeQueryModal").modal("show");
}
/*function ajaxquery(factory,order_no,taskid){
	$.ajax({
		url: "techTask!workshoptimeinfo.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory":factory,
	    	"order_no":order_no,
	    	"tech_task_id":taskid
	    },
		error : function(response) {
			alert(response.message)
		},
	    success:function(response){
	    	$("#tableDepartmentquery tbody").html("");
	    	var timelist=[];
	    	if(response.data.length>0){
	    		timelist=response.data[0].time_list.split(",");
	    	}
	    	
	    	$.each(timelist, function(index, value){
	    		var tr=$("<tr />");
	    		var workshop=value.split(":")[0];
	    		var unit_time=value.split(":")[1];
	    		$("<td />").html(value.factory_name).appendTo(tr);
    			$("<td />").html(workshop).appendTo(tr);
    			$("<td />").html(unit_time).appendTo(tr);
    			$("<td />").html("H").appendTo(tr);
    			$("#tableDepartmentquery tbody").append(tr);
			});
    		$("#timeQueryModal").modal("show");
	    }
	});
}*/

function ajaxGetStaffWorkHours(conditions) {
	var swhlist;
	$.ajax({
		url : "techTask!getStaffWorkHours.action",
		dataType : "json",
		async:false,
		type : "get",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			swhlist = response.data;
		}
	});
	return swhlist;
}

function ajaxSave(conditions) {
	$(".divLoading").addClass("fade in").show();
	$("#btnMtaSave").attr("disabled",true);
	var targetPage = $("#cur").attr("page") || 1;
	$.ajax({
		url : "techTask!saveWorkHourInfo.action",
		dataType : "json",
		type : "post",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			if (response.success) {
				$(".divLoading").hide();
				$("#btnMtaSave").attr("disabled",false);
				alert(response.message);
				ajaxQuery(targetPage);
			} else {
				alert(response.message);
			}

		}
	});
}

function ajaxUpdate(datalist,conditions,whflag,ecnTaskId,taskStaus,rejectReason) {
	var targetPage = $("#cur").attr("page") || 1;
	$.ajax({
		url : "techTask!updateWorkHourInfo.action",
		dataType : "json",
		async:false,
		type : "post",
		data : {
			"conditions" : datalist,
			"whflag":whflag
		},
		success : function(response) {
			if (response.success) {
				if(whflag=='reject'){
					var emaillist=[];
					var dlist=JSON.parse(datalist);
					$.each(dlist,function(i,swh){
						var obj={};
						obj['工号']=swh.staff_number;
						obj['姓名']=swh.staff_name;
						obj['岗位']=swh.job;
						obj['额外工时']=swh.work_hour;
						obj['小班组']=swh.team_org;
						obj['班组']=swh.workgroup_org;
						obj['车间']=swh.workshop_org;
						obj['工厂']=swh.plant_org;
						obj['操作日期']=swh.work_date;
						emaillist.push(obj);
					})
					var tbhead='工号,姓名,岗位,额外工时,小班组,班组,车间,工厂,操作日期';
					//alert(JSON.stringify(emaillist))
					sendEmail(dlist[0].email,'',"技改单"+$("#edit_orderNo").html()+$("#editModal").data("factory")+$("#editModal").data("workshop")+'车间技改工时信息驳回',tbhead,JSON.stringify(emaillist),rejectReason)
					$("#reasonModal").modal("hide");
				}	
				
				ajaxCaculateSalary(conditions);
				alert(response.message);
				ajaxQuery(targetPage);
			} else {
				alert(response.message);
			}

		}
	});
}
//批准、驳回时重新计算技改工资
function ajaxCaculateSalary(conditions) {
	$.ajax({
		url : "techTask!caculateSalary.action",
		dataType : "json",
		type : "post",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			if (response.success) {
				
			} else {
				alert(response.message);
			}

		}
	});
}
/*
 * caculate: true 计算已分配工时合计
 */
function generateWorkhourTb(swhlist,caculate) {
	caculate=caculate||false;
	$("#workhour_list").html("");
	$.each(swhlist, function(index, swh) {
		var tr = $("<tr style='padding:5px'/>");
		if (swh.status=="已锁定") {
			$("<td />").html(swh.status).appendTo(tr);
		} else {
			$("<td />").html("<input type='checkbox' >").appendTo(tr);
		}
		$("<td />").html(swh.staff_number).appendTo(tr);
		$("<td />").html(swh.staff_name).appendTo(tr);
		$("<td />").html(swh.job).appendTo(tr);
		$("<td />").html(swh.work_hour).appendTo(tr);
		$("<td />").html(swh.team_org).appendTo(tr);
		$("<td />").html(swh.workgroup_org).appendTo(tr);
		$("<td />").html(swh.workshop_org).appendTo(tr);
		$("<td />").html(swh.plant_org).appendTo(tr);
		$("<td />").html(swh.work_date).appendTo(tr);
		$("<td />").html(swh.status).appendTo(tr);
		$("#workhour_list").append(tr);
		$(tr).data("id", swh.id);
		$(tr).data("swhindex", index);
		$(tr).data("status", swh.status);
		if(caculate){
			ready_hour += parseFloat(swh.work_hour);
		}
		
	});
	var tr = $("<tr style='padding:5px'/>");
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("").appendTo(tr);
	$("<td />").html("合计工时：").appendTo(tr);
	$("<td />").html(ready_hour.toFixed(2)).appendTo(tr);
	
	$("#workhour_list").append(tr);
}

function getSelectList(){
	var boxList=$("#workhour_list :checked");
	var swhList=[];
	$.each(boxList,function(index,box){
		var obj={};
		var tr=$(box).closest("tr");
		//var swhid=$(tr).data("id");
		//obj.id=swhid;
		var swhindex=$(tr).data("swhindex");
		obj=swhlist[swhindex];
		swhList.push(obj);
	});
	return swhList;
}
