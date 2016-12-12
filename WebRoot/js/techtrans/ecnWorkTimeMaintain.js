var pageSize =20;
var timeConfigCount = 0;
var ready_hour=0;
var edit_list=[];
var re_f = /^[0-9]+[0-9]*\.?[0|5]?$/;//浮点数正则表达式
$(document).ready(function () {	
	initPage();
	// 工厂切换事件
	$("#search_factory").change(function() {
		var selectFactory = $("#search_factory :selected").text();
		getWorkshopSelect_Auth("#search_workshop", null, selectFactory, "");
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
	
	$(".fa-pencil").live(
			"click",
			function(e) {
				var tr = $(e.target).closest("tr");
				var tds = $(tr).children("td");
				var type = $(e.target).attr(
						"data-original-title");
				var orderNo = $(tr).data("orderNo");
				var task = $(tr).data("task");
				
				edit_list=[];
				ready_hour=0;
				var factory=$(tr).data("factory");
	    		var workshop=$(tr).data("workshop");
				var conditions="{ecnTaskId:'"+$(tr).data("ecnTaskId")+"',factory:'"+factory+"',workshop:'"+workshop+"'}";
				var swhlist=ajaxGetStaffWorkHours(conditions);
				generateWorkhourTb(swhlist,true);
				$(".read_hours").html("已分配工时："+ready_hour);
				if (type == "工时维护") {									
					$("#tb_workhour").html("");
					$("#orderNo").html(orderNo);
					$("#task").html(task);
					getWorkshopSelect_Auth("#workshop", workshop,
							factory, "noall");
					$("#workshop").attr("disabled",true);
					getChildOrgSelect("#group", $("#workshop").val(), "",
					"empty");
					$("#mtaModal").data("ecnTaskId",
							$(tr).data("ecnTaskId"));
					$("#mtaModal").data("totalHour",
							$(tr).data("totalHour"));
					$("#mtaModal").modal("show");
				}
				if (type == "工时修改") {
					$("#edit_orderNo").html(orderNo);
					$("#edit_task").html(task);
					$("#editModal").data("ecnTaskId",
							$(tr).data("ecnTaskId"));
					$("#editModal").data("totalHour",
							$(tr).data("totalHour"));
					$("#editModal").data("factory",
							$(tr).data("factory"));
					$("#editModal").data("workshop",
							$(tr).data("workshop"));
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
								//$("#mtaModal").modal("hide");
						/*		var selectFactory = $("#factory :selected").text();
								getWorkshopSelect_Org("#workshop", null,
										selectFactory, "empty");
								$("#group").html(
										"<option value=''>请选择</option>");
								$("#subgroup").html(
										"<option value=''>请选择</option>");*/
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
						/*var conditions="{staffNum:'"+staffNum+"',workDate:'"+
							$("#mta_wdate").val()+"',ecnTaskId:"+$("#mtaModal").data("ecnTaskId")+"}";
						var sfwlist=ajaxGetStaffWorkHours(conditions);
						if($("#mta_wdate").val().trim().length>0&&sfwlist.length>0){
							alert("不能重复维护工时！");
							//$(tr).remove();
						}else*/ if (!re_f.test(hour)&&hour!="") {
							$(this).val("");
							alert("技改工时只能是数字,且只能以半小时为单位，例如：1.0,1.5,2.0！");							
						}/*else if(!const_float_validate_one.test(hour)){
							alert("技改工时只能保留一位小数！");
							$(this).val("");
						}*/
			
						/*else if((parseFloat(total_hour)+parseFloat(ready_hour)) - limit_total_hour > 0) {
							
							alert("总工时不能超过" + limit_total_hour
									+ "H!");
							$(this).val("");											
						}*/
						
						
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
		var limit_total_hour = parseFloat($(
		"#editModal").data("totalHour"));
		//alert("ready_hour:"+ready_hour);
		/*if(isNaN(submit_val)){
			alert("工时必须为数字！");
			$(e.target).val(pre_submit_val);
		}else if((submit_val-pre_submit_val)>(limit_total_hour-ready_hour)){
			alert("总工时不能超过" + limit_total_hour
					+ "H!");
			$(e.target).val(pre_submit_val);
		}*/
		//alert($(e.target).val());
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
		getWorkshopSelect_Auth("#search_workshop", null, $("#search_factory :selected").text(), "");
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
	$.ajax({
	    url: "ecnDocumentTask!querySingleTasklist.action",
	    dataType: "json",
		type: "post",
	    data: {
	    	"task_content": $('#task_content').val(),
	    	"ecnnumber": $('#ecnnumber').val(),
	    	"order_no": $('#order_no').val(),
	    	"search_factory": $('#search_factory').val(),
	    	"search_workshop": workshop,
	    	"taskstatus": $('#taskstatus').val(),
	    	"start_date":$('#startDate').val(),
	    	"end_date":$('#endDate').val(),
	    	"pager.pageSize":pageSize||20,
			"pager.curPage":targetPage || 1
	    },
	    error : function(response) {
			alert(response.message)
		},
	    success:function(response){
    		$("#tableTaskFollow tbody").html("");
    		var last_ecn_id = "";//最近技改单ID
    		var last_ecn_document_number="";
    		var ecn_id = "";
    		var ecn_index = 0;
    		
    		var ecn_document_date_id = "";
    		var ecn_document_date_id_index = 0;
    		
    		var last_ecn_task_id = ""; //最近技改任务ID
    		var last_task_number_id = "";
      		var ecn_task_id = "";
    		var ecn_task_id_index = 0;
    		
    		var task_content_id ="";
    		var task_content_id_index = 0;
    		
    		var last_order_id = ""; //最近订单ID
    		var order_id = "";
    		var order_id_index = 0;
    		
    		var switch_mode_id = "";
    		var switch_mode_id_index = 0;
    		$.each(response.data,function(index,value){
    			var tr=$("<tr />");
    			
				// 技改单
				if (value.ecn_document_number == last_ecn_document_number&&value.ecn_id==last_ecn_id) {
					var noderowspan = parseInt($(ecn_id).attr(
							"rowspan"));
					$(ecn_id).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='ecn_" + ecn_index
									+ "' rowspan='1' " + "/>").html(
							value.ecn_document_number).appendTo(tr);
					ecn_id = "#ecn_" + ecn_index;
					ecn_index += 1;
				}
				// 下单日期
				if (value.ecn_document_number == last_ecn_document_number&&value.ecn_id==last_ecn_id) {
					var noderowspan = parseInt($(ecn_document_date_id).attr(
							"rowspan"));
					$(ecn_document_date_id).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='ecn_document_date_" + ecn_document_date_id_index
									+ "' rowspan='1' " + "/>").html(
							value.ecn_document_date).appendTo(tr);
					ecn_document_date_id = "#ecn_document_date_" + ecn_document_date_id_index;
					ecn_document_date_id_index += 1;
				}
    			//$("<td />").html(value.ecn_document_date).appendTo(tr);
				//技改任务号
				if (value.ecn_document_number == last_ecn_document_number&&value.ecn_id==last_ecn_id && value.task_number == last_task_number_id) {
					var noderowspan = parseInt($(ecn_task_id).attr(
							"rowspan"));
					$(ecn_task_id).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='ecn_task_" + ecn_task_id_index
									+ "' rowspan='1' " + "/>").html("任务："+
							value.task_number).appendTo(tr);
					ecn_task_id = "#ecn_task_" + ecn_task_id_index;
					ecn_task_id_index += 1;
				}
    			//$("<td />").html("任务："+value.task_number).appendTo(tr);
    			
				//技改内容
				if (value.ecn_document_number == last_ecn_document_number &&value.ecn_id==last_ecn_id&& value.task_number == last_task_number_id) {
					var noderowspan = parseInt($(task_content_id).attr(
							"rowspan"));
					$(task_content_id).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='task_content_" + task_content_id_index
									+ "' rowspan='1' " + "/>").html(
							value.task_content).appendTo(tr);
					task_content_id = "#task_content_" + task_content_id_index;
					task_content_id_index += 1;
				}
				// $("<td />").html(value.task_content).appendTo(tr);
				
				//订单
				if (value.ecn_task_id === last_ecn_task_id && value.order_id === last_order_id) {
					var noderowspan = parseInt($(order_id).attr(
							"rowspan"));
					$(order_id).attr("rowspan", noderowspan + 1);
				} else {
					$(
						"<td id='order_" + order_id_index
									+ "' rowspan='1' " + "/>").html(
							value.order_desc).appendTo(tr);
					order_id = "#order_" + order_id_index;
					order_id_index += 1;
				}
    			//$("<td />").html(value.order_desc).appendTo(tr);
    			
				//切换方式
				if (value.ecn_task_id === last_ecn_task_id ) {
					var noderowspan = parseInt($(switch_mode_id).attr(
							"rowspan"));
					$(switch_mode_id).attr("rowspan", noderowspan + 1);
				} else {
			    		if(value.switch_mode==0)
			    			$("<td id='switch_mode_" + switch_mode_id_index
							+ "' rowspan='1' " + "/>").html("全部切换").appendTo(tr);
			    				//$("<td />").html("全部切换").appendTo(tr);
			    			else
			    				$("<td id='switch_mode_" + switch_mode_id_index
								+ "' rowspan='1' " + "/>").html("立即切换").appendTo(tr);
			    				//$("<td />").html("立即切换").appendTo(tr);
					switch_mode_id = "#switch_mode_" + switch_mode_id_index;
					switch_mode_id_index += 1;
				}
    			
    			$("<td />").html(value.factory_name).appendTo(tr);
    			$("<td />").html(value.key_name).appendTo(tr);
    			$("<td />").html(value.unit_time).appendTo(tr);
    			$("<td />").html(value.ecn_number).appendTo(tr);
    			/*$("<td />").html(value.dispatch_number).appendTo(tr);*/
    			$("<td />").html(value.already).appendTo(tr);
    			$("<td />").html(value.ready_hour_total).appendTo(tr);
    			/*$("<td />").html(value.noalready).appendTo(tr);*/
    			$("<td  align='center'/>").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" id='imgquery' onclick='ajaxquery("+value.factory_id+","+value.ecn_task_id+")'></i>").appendTo(tr);
    			$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='getTaskAllSelectedBusNum("+value.order_id+","+value.factory_id+","+value.ecn_task_id+","+value.switch_mode+",null,null,\""+value.key_name+"\")'></i>").appendTo(tr);
    			/*if(value.photo=='0'){
    				$("<td />").html("未上传").appendTo(tr);
    			}else if(value.photo=='1'){
    				$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='picupquery("+value.ecn_task_id+")'></i>").appendTo(tr);
    			}*/
      			if(value.taskstatus=='0'){
    				$("<td />").html("未完成").appendTo(tr);
    			}else if(value.taskstatus=='1'){
    				$("<td />").html("已完成").appendTo(tr);
    			}
      			$("<td />").html("<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\" title='工时维护' style=\"cursor: pointer;text-align: center;\" ></i>").appendTo(tr);
      			$("<td />").html("<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\"  title='工时修改'style=\"cursor: pointer;text-align: center;\" ></i>").appendTo(tr);
    			$("#tableTaskFollow tbody").append(tr);
    			
	    		last_ecn_id = value.ecn_id;
	    		last_ecn_task_id = value.ecn_task_id;
	    		last_order_id = value.order_id;
	    		last_task_number_id = value.task_number;
	    		last_ecn_document_number=value.ecn_document_number;
	    		$(tr).data("totalHour",value.ecn_number*value.unit_time);
	    		$(tr).data("orderNo",value.ecn_document_number);
	    		$(tr).data("task","任务"+
						value.task_number+"-"+value.task_content);
	    		$(tr).data("ecnTaskId",value.ecn_task_id);
	    		$(tr).data("factory",value.factory_name);
	    		$(tr).data("workshop",value.key_name);
	    	
    		});
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
function getTaskAllSelectedBusNum(order_id,factoryid,taskid,switch_mode,bus_num_start,bus_num_end,workshop){
	$("#selectBusNumber_orderId_view").val(order_id);
	$("#selectBusNumber_factoryId_view").val(factoryid);
	$("#selectBusNumber_workshop_view").val(workshop);
	$("#selectBusNumber_taskId_view").val(taskid);
	$("#selectBusNumber_switch_mode_view").val(switch_mode);
	var bus_num_start = $("#bus_num_start_view").val()||'';
	var bus_num_end = $("#bus_num_end_view").val()||'';
	if(switch_mode=='0'){
		ajaxShowBusNumber(order_id,taskid,bus_num_start,bus_num_end,factoryid,workshop);
	}else{
		querydph(factoryid,taskid,order_id,switch_mode,bus_num_start,bus_num_end,workshop);
	}
}

/**
 * 根据订单查询车号信息
 * @param order_id
 * @param ecn_task_id
 * @param bus_num_s
 * @param bus_num_e
 */
function ajaxShowBusNumber(order_id,ecn_task_id,bus_num_s,bus_num_e,factory_id,workshop){
	$.ajax({
		url: "ecnDocumentTask!getEcnTaskBusNumber.action",
		dataType: "json",
		type: "get",
		data: {
				"order_id" : order_id,
				"factory_id":factory_id,
				"ecn_task_id" : ecn_task_id,
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
	       			$("<td style=\"text-align:center;\" />").html(value.user_name).appendTo(tr);
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
/**
 * 查询立即切换已分配车号详情
 * @param factoryid
 * @param taskid
 * @param switch_mode
 * @param bus_num_start
 * @param bus_num_end
 */
function querydph(factoryid,taskid,order_id,switch_mode,bus_num_start,bus_num_end,workshop){
	$.ajax({
		url: "ecnDocumentTask!querydphlist.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id":factoryid,
	    	"ecn_task_id":taskid,
	    	"order_id":order_id,
	    	"ecn_switch_mode":switch_mode,
			"bus_num_start" : bus_num_start,
			"bus_num_end" : bus_num_end,
			"workshop":workshop,
			"status":status
	    },
		error : function(response) {
			alert(response.message)
		},
	    success:function(response){
	    	$("#selectBusNumber_table_view tbody").html("");
	    	$.each(response.data,function(index, value){
	    		var tr=$("<tr />");
	    		$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.factory_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.process_name).appendTo(tr);
       			$("<td style=\"text-align:center;\" />").html(value.user_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.confirmor_date).appendTo(tr);
    			$("#selectBusNumber_table_view tbody").append(tr);
			});
    		$("#selectBusNumberModal_view").modal("show");
	    }
	});
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
 * 单车跟进，根据输入的车号查询出此车号下所有技改任务信息
 */
function singlebusnoQuery(){
	$.ajax({
	    url: "ecnDocumentTask!querySingleCarNolist.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"busno": $('#busno').val(),
	    },
	    error : function(response) {
			alert(response.message)
		},
	    success:function(response){
    		$("#singledphFollow tbody").html("");
    		$.each(response.data,function(index,value){
    			var tr=$("<tr />");
    			$("<td />").html(index+1).appendTo(tr);
    			$("<td />").html(value.task_content).appendTo(tr);
    			if(value.bus_status == '1'){
    				$("<td />").html("OK").appendTo(tr);
    			}else{
    				$("<td />").html("NG").appendTo(tr);
    			}
    			$("<td />").html(value.username).appendTo(tr);
    			$("<td />").html(value.confirmor_date).appendTo(tr);
    			$("<td />").html(value.ecn_document_number).appendTo(tr);
    			$("<td />").html(value.factory_name).appendTo(tr);
    			if(value.switch_mode == '0'){
    				$("<td />").html("全部切换").appendTo(tr);
    			}else{
    				$("<td />").html("立即切换").appendTo(tr);
    			}
    			
    			$("<td />").html(value.ecn_number).appendTo(tr);
/*    			var already = 0;
    			if(value.already !=null){
    				already = value.already;
    			}
    			$("<td />").html(already).appendTo(tr);
    			$("<td />").html(value.ecn_number-already).appendTo(tr);*/
    			$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='getBusNum("+value.ecn_order_id+","+value.ecn_factory_id+","+value.id+","+value.switch_mode+")'></i>").appendTo(tr);
    			$("<td />").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='picupquery("+value.id+")'></i>").appendTo(tr);
    			tr.data("factory_id",value.ecn_factory_id);
    			tr.data("task_id",value.id);
    			tr.data("order_id",value.ecn_order_id);
    			tr.data("ecn_number",value.ecn_number);
    			tr.data("task_detail_id",value.task_detail_id);
    			$("#singledphFollow tbody").append(tr);
    		});	
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
function getBusNum(order_id,factoryid,taskid,switch_mode,workshop){
	$("#selectBusNumber_orderId_view").val(order_id);
	$("#selectBusNumber_factoryId_view").val(factoryid);
	$("#selectBusNumber_taskId_view").val(taskid);
	$("#selectBusNumber_workshop_view").val(workshop);
	$("#selectBusNumber_switch_mode_view").val(switch_mode);
	var bus_num_start = $("#bus_num_start_view").val()||'';
	var bus_num_end = $("#bus_num_end_view").val()||'';
	if(switch_mode=='0'){
		ajaxShowBusNumber(order_id,taskid,bus_num_start,bus_num_end,factoryid,workshop);
	}else{
		querydph(factoryid,taskid,order_id,switch_mode,bus_num_start,bus_num_end,workshop);
	}
}

/**
 * 查看已分配技改工时信息
 */
function ajaxquery(factoryid,taskid){
	$.ajax({
		url: "ecnDocumentTask!workshoptimeinfo.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factoryId":factoryid,
	    	"taskid":taskid
	    },
		error : function(response) {
			alert(response.message)
		},
	    success:function(response){
	    	$("#tableDepartmentquery tbody").html("");
	    	$.each(response.data, function(index, value){
	    		var tr=$("<tr />");
	    		/*$("<td />").html(value.factory_name).appendTo(tr);*/
    			$("<td />").html(value.workshop_name).appendTo(tr);
    			$("<td />").html(value.unit_time).appendTo(tr);
    			$("<td />").html(value.unit).appendTo(tr);
    			$("#tableDepartmentquery tbody").append(tr);
			});
    		$("#timeQueryModal").modal("show");
	    }
	});
}

function ajaxGetStaffWorkHours(conditions) {
	var swhlist;
	$.ajax({
		url : "ecnDocumentTask!getStaffWorkHours.action",
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
		url : "ecnDocumentTask!saveWorkHourInfo.action",
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
		url : "ecnDocumentTask!updateWorkHourInfo.action",
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
