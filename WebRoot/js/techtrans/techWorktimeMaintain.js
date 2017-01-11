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
			check_All_unAll("#workhour_tb", true);
		} else
			check_All_unAll("#workhour_tb", false);
	});
	//Enter键移动输入光标
	$(".work_hour").live("keydown",function(event){
		if (event.keyCode == "13") {								
			$(this).parent().parent().next().find("input").focus();
		}
	})
	
	$(".fa-pencil").live("click",
			function(e) {
				var tr = $(e.target).closest("tr");
				var tds = $(tr).children("td");
				var type = $(e.target).attr("data-original-title");
				var tech_order_no = $(tr).data("tech_order_no");
				var task = $(tr).data("task");
				
				edit_list=[];
				ready_hour=0;
				var factory=$(tr).data("factory");
	    		var workshop=$(tr).data("workshop");
				var conditions="{ecnTaskId:'"+$(tr).data("tech_task_id")+"',factory:'"+factory+"',workshop:'"+workshop+"'}";
				var swhlist=ajaxGetStaffWorkHours(conditions);
				generateWorkhourTb(swhlist,true);
				$(".read_hours").html("已分配工时："+ready_hour);
				if (type == "工时维护") {									
					$("#tb_workhour").html("");
					$("#orderNo").html(tech_order_no);
					$("#task").html(task);
					getWorkshopSelect_Auth("#workshop", workshop,factory, "noall");
					$("#workshop").attr("disabled",true);
					getChildOrgSelect("#group", $("#workshop").val(), "","empty");
					$("#mtaModal").data("ecnTaskId",$(tr).data("tech_task_id"));
					$("#mtaModal").data("totalHour",$(tr).data("totalHour"));
					$("#mtaModal").modal("show");
				}
				if (type == "工时修改") {
					$("#edit_orderNo").html(tech_order_no);
					$("#edit_task").html(task);
					$("#editModal").data("ecnTaskId",$(tr).data("tech_task_id"));
					$("#editModal").data("totalHour",$(tr).data("totalHour"));
					$("#editModal").data("factory",$(tr).data("factory"));
					$("#editModal").data("workshop",$(tr).data("workshop"));
					$("#editModal").modal("show");
				}
			});
	
	// 新增额外工时
	$(".addWorkhour").live("click", function() {
		if($("#mta_wdate").val().trim()==""){
			alert("请选择操作日期！");
		}else{
			addWorkHourItem();
		}
		
	});
	// 工时删除
	$(".close").live("click", function(e) {
		$(e.target).closest("tr").remove();
	});
	$("#btnSwhQuery").live("click",function(){
		var staffNum=$("#edit_cardNumber").val();
		var workDate=$("#edit_workDate").val();
		var ecnTaskId=$("#editModal").data("ecnTaskId");
		var factory=$("#editModal").data("factory");
		var workshop=$("#editModal").data("workshop");
		var conditions="{staffNum:'"+staffNum+"',workDate:'"+workDate+"',ecnTaskId:'"+ecnTaskId
		+"',factory:'"+factory+"',workshop:'"+workshop+"'}";
		var swhlist=ajaxGetStaffWorkHours(conditions);
		generateWorkhourTb(swhlist);
	});
	// 保存工时信息
	$("#btnMtaSave")
			.click(
					function() {
						var inputlist = $("#table_workhour input[class='input-small card_num']");
						 //alert(inputlist.length);
						var saveFlag=true;
						var stafflist = [];
						var factory=$("#factory option:selected").text();
						var dept="生产部";
						var workshop=$("#workshop option:selected").text();
						var workgroup=$("#group option:selected").text()=="请选择"?"":$("#group option:selected").text();
						var team=$("#subgroup option:selected").text()=="请选择"?"":$("#subgroup option:selected").text();
						
						var subgroupId=$("#subgroup").val()==''?'0':$("#subgroup").val();
						var groupId=$("#group").val()==''?'0':$("#group").val();
						var workshopId=$("#workshop").val()==''?'0':$("#workshop").val();
						var workDate=$("#mta_wdate").val();						
						if(workshopId=='0'){
							alert("请选择车间！");
						}else if(workDate==null||workDate.trim().length==0){
							alert("请输入操作日期！");
						}else{
							if(checkSalarySubmit(factory,workshop,workDate.substring(0,7))=='true'){
								alert("车间工资已提交/结算，不允许再维护工时信息！");
								return false;
							}
							var staffNumlist="";
							$.each(inputlist,
									function(index, input) {
										var tr = $(input).closest(
												"tr");
										var staffId=$(input).attr("staffId");											
										var workHour=$(tr).find(".work_hour").val();
										var skillParameter=$(tr).data("skill_parameter");
										if(staffId !=undefined &&staffId.trim().length>0){
											var staff = {};
											staff.orderId = $(tr).data(
													"id");
											staff.ecnTaskId = $("#mtaModal").data("ecnTaskId");
											staff.workDate=workDate;
											staff.staff_id=staffId;
											if(workshopId!='0'){
												staff.subgroupId=workshopId
											}
											if(groupId!='0'){
												staff.subgroupId=groupId
											}
											if(subgroupId!='0'){
												staff.subgroupId=subgroupId
											}
											staff.factory=factory;
											staff.dept=dept;
											staff.workshop=workshop;
											staff.workgroup=workgroup;
											staff.team=team;
											staff.workHour=workHour;
											staff.skillParameter=skillParameter;
											if(!isContain(staff,stafflist)){
												stafflist.push(staff);
											}else{
												saveFlag=false;
												alert("不能重复维护工时！");
												return false;
											}			
										}
										if(workHour==''||workHour.trim().length==0){
											saveFlag=false;
											alert("技改工时不能为空！");
											return false;
										}
										var staffNum=$(input).val();
										if(staffNum.trim().length==0){
											alert("工号不能为空！");
											saveFlag=false;
											return false;
										}
										var staffNum = $(input).val();	
										staffNumlist+=staffNum+","																														
									});
							var conditions="{staffNum:'"+staffNumlist+"',workDate:'"+
							$("#mta_wdate").val()+"',ecnTaskId:"+$("#mtaModal").data("ecnTaskId")+"}";
							var sfwlist=ajaxGetStaffWorkHours(conditions);
							if(sfwlist.length>0){														
									//$(tr).remove();
									saveFlag=false;
									alert("不能重复维护工时！");
									return false;
								}
							if(saveFlag&&stafflist.length>0){
								$('#btnMtaSave').attr("disabled",true);
								ajaxSave(JSON.stringify(stafflist));
						
							}
							
						}
						
		
					});
	// 为工号输入框添加change事件
	$(".card_num")
			.live(
					"change",
					function(e) {
						var cardNumInput = $(e.target);
						var tr = $(cardNumInput).closest("tr");
						$(tr).find(".staff_name").html("");
						$(tr).find(".staff_post").html("");
						$(tr).find(".staff_subgroup").html("");
						$(tr).find(".staff_group").html("");
						$(tr).find(".staff_workshop").html("");
						$(tr).find(".staff_factory").html("");
						var staff = getStaffInfo($(cardNumInput)
								.val());
						if (staff == undefined || staff == null) {
							alert("请输入有效员工号！");
							$(cardNumInput).val("");
						} else {
							$(cardNumInput).attr("staffId",staff.id);
							$(tr).find(".staff_name").html(
									staff.name);
							$(tr).find(".staff_post").html(
									staff.job);
							$(tr).find(".staff_subgroup").html(
									staff.team_org);
							$(tr).find(".staff_group").html(
									staff.workgroup_org);
							$(tr).find(".staff_workshop").html(
									staff.workshop_org);
							$(tr).find(".staff_factory").html(
									staff.plant_org);
							$(tr).data("skill_parameter",staff.skill_parameter)
						}
					});
	// 工时输入验证
	$(".work_hour")
			.live(
					"input",
					function(e) {
						var total_hour=0;
						var hour = $(e.target).val();
						var tr=$(e.target).closest("tr");
						var limit_total_hour = parseFloat($(
								"#mtaModal").data("totalHour"));
						var hour_inputs=$("#tb_workhour").find(".work_hour");
						// alert(parseFloat(hour));
						$.each(hour_inputs,function(index,hinput){
							var single_hour=isNaN(parseFloat($(hinput).val()))?0:parseFloat($(hinput).val());
							total_hour += single_hour;
						});
						
						//alert(ready_hour);
						var staffNum=$(tr).find(".card_num").val();
						 if (!re_f.test(hour)&&hour!="") {
							$(this).val("");
							alert("技改工时只能是数字,且只能以半小时为单位，例如：1.0,1.5,2.0！");							
						}
						
						
					});
	// 选定小班组查询人员列表
	$("#subgroup").live("change",
			function() {
				var factory = $("#factory").find(
						"option:selected").text();
				var workshop = $("#workshop").find(
						"option:selected").text();
				var workgroup = $("#group").find(
						"option:selected").text();
				var subgroup = $(this).find("option:selected")
						.text();
				/*if($("#tb_workhour").html().length==0){*/
					$.ajax({
						type : "get",// 使用get方法访问后台
						dataType : "json",// 返回json格式的数据
						async : false,
						url : "common!getStaffInfo.action",
						data : {
							"factory" : factory,
							"workshop" : workshop,
							"workgroup" : workgroup,
							"subgroup" : subgroup
						},
						success : function(response) {
							var list = response;
							$("#tb_workhour").html("");
							$.each(list, function(index, staff) {
								//alert(staff.id);								
								addWorkHourItem(staff.id,staff.staff_number,
										staff.name, staff.job, "",
										staff.team_org,
										staff.workgroup_org,
										staff.workshop_org,
										staff.plant_org,staff.skill_parameter)
							});
						}
					})
				/*}*/
				
			});

	// 工厂切换事件
	$("#factory").change(
			function() {
				var selectFactory = $("#factory :selected").text();
				/*getWorkshopSelect_Org("#workshop", null,
						selectFactory, "empty");*/
				getWorkshopSelect_Auth("#workshop", null,
						selectFactory, "noall");
				$("#group").html(
						"<option value=''>请选择</option>");
				$("#subgroup").html(
						"<option value=''>请选择</option>");
			});
	// 车间切换事件
	$("#workshop").change(
			function() {
				var workshop = $("#workshop").val();
				getChildOrgSelect("#group", workshop, "",
						"empty");
				$("#subgroup").html(
						"<option value=''>请选择</option>");
			});
	// 班组切换事件
	$("#group").change(function() {
		var group = $("#group").val();
		getChildOrgSelect("#subgroup", group, "", "empty");
	});
	//工时修改页面工时change事件，有效修改数据保存到edit_list
	$(".edit_work_hour").live("input",function(e){
		var pre_submit_val=isNaN(parseFloat($(e.target).attr("old_value")))?0:parseFloat($(e.target).attr("old_value"));
		var submit_val=parseFloat($(e.target).val());
		var limit_total_hour = parseFloat($("#editModal").data("totalHour"));
		if (!re_f.test($(e.target).val())&&$(e.target).val()!="") {
			$(e.target).val(pre_submit_val);
			alert("技改工时只能是数字,且只能以半小时为单位，例如：1.0,1.5,2.0！");							
		}else{
			var edit_obj={};
			edit_obj.id=$(e.target).closest("tr").data("id");
			edit_obj.workHour=submit_val;
			edit_list.push(edit_obj);
		}
		
	});
	
	//保存工时修改
	$("#btnEditSave").click(function(){		
		if(edit_list.length>0){
			ajaxUpdate(JSON.stringify(edit_list));
		}else{
			alert("无数据更改！");
			$("#editModal").modal("hide");
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
		var order_id = $("#selectBusNumber_orderId_view").val();
		var factory_id = $("#selectBusNumber_factoryId_view").val();
		var workshop = $("#selectBusNumber_workshop_view").val();
		var task_id = $("#selectBusNumber_taskId_view").val();
		var bus_num_s = $("#bus_num_start_view").val();
		var bus_num_e = $("#bus_num_end_view").val();
		var switch_mode = $("#selectBusNumber_switch_mode_view").val();
		var ecn_number = $("#selectBusNumber_ecnNumber_view").val();
		var status = $("#selectBusNumber_status_view").val();
		getTaskAllSelectedBusNum(order_id,factory_id,task_id,switch_mode,status,bus_num_s,bus_num_e);
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
	conditions.status=$("#status").val();
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
    					$("<td />").html("<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\" title='工时维护' style=\"cursor: pointer;text-align: center;\" ></i>").appendTo(tr);
        	  			$("<td />").html("<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\"  title='工时修改'style=\"cursor: pointer;text-align: center;\" ></i>").appendTo(tr);
        	  			$("#tableTaskFollow tbody").append(tr);
        	  			$(tr).data("totalHour",assign_num*assign_time);
                		$(tr).data("tech_order_no",value.tech_order_no);
                		$(tr).data("task",value.task_content);
                		$(tr).data("tech_task_id",value.id);
                		$(tr).data("factory",value.factory);
                		$(tr).data("workshop",workshop);
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
/*
 * caculate: true 计算已分配工时合计
 */
function generateWorkhourTb(swhlist,caculate){
	caculate=caculate||false;
	var ready=0;
	$("#workhour_list").html("");
	$.each(swhlist,function(index,swh){
		var tr = $("<tr style='padding:5px'/>");
		var workhour=swh.work_hour==undefined?"":swh.work_hour;
		if(swh.status=='已驳回'){
			$("<td />").html("<input type='checkbox' >").appendTo(tr);
		}else{
			$("<td />").html("").appendTo(tr);
		}
		$("<td />").html(swh.staff_number).appendTo(tr);
		$("<td />").html(swh.staff_name).appendTo(tr);
		$("<td />").html(swh.job).appendTo(tr);
		var disabled = (swh.status!='已驳回') ? 'disabled' : "";
		$("<td />").html("<input class='input-small edit_work_hour'"+disabled+" style='text-align:center;margin-bottom: 0px;' type='text' value='"+workhour+"' old_value='"+workhour+"'>").appendTo(tr);
		$("<td />").html(swh.team_org).appendTo(tr);
		$("<td />").html(swh.workgroup_org).appendTo(tr);
		$("<td />").html(swh.workshop_org).appendTo(tr);
		$("<td />").html(swh.plant_org).appendTo(tr);
		$("<td />").html(swh.status).appendTo(tr);
		$("<td />").html(swh.work_date).appendTo(tr);
		$("#workhour_list").append(tr);
		$(tr).data("id",swh.id);
		if(caculate){
			var h=isNaN(parseFloat(swh.work_hour))?0:parseFloat(swh.work_hour);
			ready+=h;
		}
		
	});
	ready_hour=ready.toFixed(2);
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

function ajaxUpdate(conditions){
	var targetPage = $("#cur").attr("page") || 1;
	$.ajax({
		url : "techTask!updateWorkHourInfo.action",
		dataType : "json",
		type : "get",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			if (response.success) {
				alert(response.message);
				ajaxQuery(targetPage);
			} else {
				alert(response.message);
			}

		}
	});
}

function addWorkHourItem(staffId,cardNo, staffName, staffPost, workHour, subgroup,
		group, workshop, factory,skillParameter) {
	cardNo = cardNo || "";
	cardNoDisabled = "";
	if (cardNo.trim().length > 0) {
		cardNoDisabled = "disabled";
	}
	workHour = workHour || "";
	var tr = $("<tr style='padding:5px'/>");
	$("<td />")
			.html(
					"<button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>")
			.appendTo(tr);
	$("<td />")
			.html(
					"<input class='input-small card_num' style='text-align:center;margin-bottom: 0px;' type='text' value='"
							+ cardNo + "' staffId='"+staffId+"' " + cardNoDisabled + ">").appendTo(tr);
	$("<td class='staff_name' />").html(staffName).appendTo(tr);
	$("<td class='staff_post' />").html(staffPost).appendTo(tr);
	$("<td />")
			.html(
					"<input class='input-small work_hour' style='text-align:center;margin-bottom: 0px;' type='text' value="
							+ workHour + " >").appendTo(tr);
	$("<td class='staff_subgroup' />").html(subgroup).appendTo(tr);
	$("<td class='staff_group' />").html(group).appendTo(tr);
	$("<td class='staff_workshop' />").html(workshop).appendTo(tr);
	$("<td class='staff_factory' />").html(factory).appendTo(tr);
	$(tr).data("skill_parameter",skillParameter)
	$("#tb_workhour").append(tr);
}
