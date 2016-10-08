var pageSize = 20;
/*
 * var add_taskNo =2; var add_taskNum = 2; var edit_taskNo =1; var edit_taskNum
 * =1;
 */
var deleteTaskId = [];
$(document).ready(function () {	
	initPage();
	function initPage(){
		var d = new Date();
		var vYear = d.getFullYear();
		var vMon = d.getMonth() + 1;
		var vMonBefore= d.getMonth();
		var vDay = d.getDate();
		var h = d.getHours(); 
		var m = d.getMinutes(); 
		var se = d.getSeconds(); 
		if(vMonBefore==0){
			s1=(vYear-1)+"-"+(12)+"-"+(vDay<10 ? "0"+ vDay : vDay);
		}else{
			s1=vYear+"-"+(vMon<10 ? "0" + vMonBefore : vMonBefore)+"-"+(vDay<10 ? "0"+ vDay : vDay);
		}		
		s=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay);
		$("#startDate").val(s1);
		$("#endDate").val(s);
		
		cur_year = new Date().getFullYear();
		$("#search_productive_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'
				+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'
				+(cur_year+2)+'</option>');	
		//getWorkshopTimeInfo(null);//初始化车间工时表格
		
		ajaxQuery(1);
	};
	
    // 获取技改类型
	$("#techflagselect").click (function () {
		if($("#techflagselect").attr("checked")=="checked"){
			$("#tecn_flag").val("1");
		}else{
			$("#tecn_flag").val("");
		}
	});
	
	$("#btnQuery").click (function () {
		ajaxQuery();
	});
	// 新增
	$("#btnAdd").click( function (argument) {
		document.getElementById("addECN").reset();
		// 获取所有任务内容，并组织成json
		var allTaskDiv = $("#add_accordion").children('div');
		allTaskDiv.each(function(index){
			if(index>0){
				$(this).remove();
			}
		});
/*
 * add_taskNo =2; add_taskNum = 2;
 */
		$("#new_allEcnTask").val('');
		$("#new_tecn_flagValue").val(0);
		$("#new_tecn_flag").attr("checked",false);
		
		getKeysSelect("ECN_TYPE", "", "#new_ecn_type");
		var mydate = new Date().format("yyyy-MM-dd");
		$("#new_ecn_document_date").val(mydate);
		
		$("#new_accordion").html("");// 清空之前的div
		$("#new_tab").html("<li><i id=\"new_addTask\" class=\"fa fa-plus\" style=\"cursor: pointer; padding-top: 12px; color: blue;\"></i></li>");
		
		var workshop_time_html=getWorkshopTimeInfo("");
		//alert(workshop_time_html);
		addTask("#new_accordion",'new',null,workshop_time_html);
		$("#newModal").modal("show");
    });
	// 给所有的删除按纽添加删除功能
	$(".close").live("click",function(e){
		var orderInput = $(e.target).closest("tr").children('td').eq(1).children('input');
		if($(orderInput).attr('task_id')!=null){
			deleteTaskId.push($(orderInput).attr('task_id'));
		} 
		$(e.target).closest("tr").remove();		
	});
	
	// 新增技改任务
	$("#new_addTask").live('click', function (argument) {
		// addTask();
		var workshop_time_html=getWorkshopTimeInfo("");
		addTask("#new_accordion",'new',null,workshop_time_html);
	/*
	 * add_taskNo++; add_taskNum++;
	 */
	});
	// 新增技改任务
	$("#edit_addTask").live('click', function (argument) {
		// addTask();
		var workshop_time_html=getWorkshopTimeInfo("");
		addTask("#edit_accordion",'edit',null,workshop_time_html);
	/*
	 * edit_taskNo++; edit_taskNum++;
	 */
	});
	// 切换技改工厂
	$(".ecn_factory").live('change',function (e) {
		var tb=$(e.target).parent().parent().parent().parent().parent().parent().parent();
		// alert($(e.target).parent().parent().parent().parent().parent().parent().parent().find('tr').eq(1).html());
		var radioVal=$(e.target).parent().parent().parent().parent().parent().parent().parent().find('tr').eq(1).find("input:checked");
		// alert($(radioVal).val());
		var orderInput = $(e.target).parent().parent().children('td').eq(1).children('input');
		var taskNumberInput = $(e.target).parent().parent().children('td').eq(3).children('input');
		var order_id = $(orderInput).attr("order_id");
		var factory_id = $(e.target).val();
		if(factory_id!=null&& factory_id.trim()!=''&&$(radioVal).val()==0){
			$.ajax({
			    url: "ecnDocument!getFactoryOrderQty.action",
			    dataType: "json",
				type: "get",
			    data: {
			    	"order_id": order_id,
			    	"factory_id": factory_id
			    },
			    success:function(response){
			    	// alert(response.data[0].production_qty);
					// 给技改数量赋值
			    	$(orderInput).attr("orderQty",response.data[0].production_qty);
					$(taskNumberInput).val(response.data[0].production_qty);
			    	// $.each(response.data,function(index,value){
			    }
			});
		}else{
	    	$(orderInput).attr("orderQty",'');
			$(taskNumberInput).val('');
		}
	});
	// 删除技改任务
	$(".add_deleteTask").live("click",function (e) {
		var div = $(e.target).parent().parent().parent();
		div.remove();
	/* add_taskNo = add_taskNo-1; */
		var allTaskDiv = $("#add_accordion").children('div');
		allTaskDiv.each(function(index){
			if(index>0){
				var span = $(this).children('div').eq(0).children().eq(0).children('a').children();
				$(span).html((index+1));
			}
		});
	});
	$(".edit_deleteTask").live("click",function (e) {
		var div = $(e.target).parent().parent().parent();
		// 取得技改范围tbody
		var taskAreaTbody = $(div).children('div').eq(1).children('div').eq(0).children('table').eq(0).children('tbody').eq(0).children('tr').eq(3).children('td').eq(1).children('table').children('tbody');
		var trs = $(taskAreaTbody).children('tr');
		// 记录删除的task ID
		trs.each(function(index){
			var orderInput = $(trs).eq(index).children('td').eq(1).children('input');
			if($(orderInput).attr('task_id')!=null){
				deleteTaskId.push($(orderInput).attr('task_id'));
			}
		});
		div.remove();
/* edit_taskNo = edit_taskNo-1; */
		var allTaskDiv = $("#edit_accordion").children('div');
		allTaskDiv.each(function(index){
			var span = $(this).children('div').eq(0).children().eq(0).children('a').children();
			$(span).html((index+1));
		});
	});
	//选择技改类型，当技改类型为DCN设计变更时，单车总工时输入框可输入，否则为disabled
	$("#new_ecn_type,#edit_ecn_type").change(function(e){
		//alert($(e.target).find("option:selected").text());
		if($(e.target).find("option:selected").text()!="DCN设计变更"){
			$(".total_hour").attr("disabled",false);
		}else{
			$(".total_hour").attr("disabled",true);
		}
	});
	
	// 新增技改实施范围
	$(".addFactoryOrder").live('click',function (e) {
		// 取得事件table的tbody
		var tbody = $(e.target).parent().parent().parent().parent().find('tbody');
		addFactoryOrder(tbody);
	});
	// 当订单清空后，清除工厂select
	$(".order").live('blur',function (e) {
		// 取得select
		var x = $(e.target).val();
		if(x.trim()==''){
			var select = $(e.target).parent().parent().find('td').eq(2).children('select');
			select.empty();
			var strs = "<option value=''>请选择</option>";
			select.append(strs);
		}
	});
	// 当切换技改方式后更新技改数量Input内容
	$(".changeRadio").live('click',function (e) {
	
		// 取得事件radio
		var switchModeRadio = $(e.target).parent().find('input:checked');
		 //alert($(e.target).parent().parent().parent().children('tr').eq(4).html());
		var tbody = $(e.target).parent().parent().parent().children('tr').eq(4).children('td').eq(1).find('tbody');
		var trs = $(tbody).find("tr");
		$.each(trs,function(index,value){
			var orderInput = $(trs).eq(index).children('td').eq(1).children('input');
			var orderIdInput = $(trs).eq(index).children('td').eq(4).children('input');
			var factionSelect = $(trs).eq(index).children('td').eq(2).children('select');
			var taskNumberInput = $(trs).eq(index).children('td').eq(3).children('input');
			if($(switchModeRadio).val() != null && $(switchModeRadio).val() == 0){
				// 给技改数量赋值
				if(!orderInput.attr('orderQty')){
					$.ajax({
					    url: "ecnDocument!getFactoryOrderQty.action",
					    dataType: "json",
						type: "get",
					    data: {
					    	"order_id": $(orderInput).attr("order_id"),
					    	"factory_id": $(factionSelect).val()
					    },
					    success:function(response){
					    	// alert(response.data[0].production_qty);
							// 给技改数量赋值
					    	$(orderInput).attr("orderQty",response.data[0].production_qty);
							$(taskNumberInput).val(response.data[0].production_qty);
					    	// $.each(response.data,function(index,value){
					    }
					});
				}else
				$(taskNumberInput).val(orderInput.attr('orderQty'));
				$(taskNumberInput).attr("disabled",true);
			}else{
				// $(taskNumberInput).val('');
				$(taskNumberInput).attr("disabled",true);
				$(taskNumberInput).val('');
			}
		});

	});
	// 确定新增
	$("#btnAddConfirm").live("click",function(){		
		var new_ecn_type=$("#new_ecn_type").val();
		var new_subject=$("#new_subject").val();
		var new_ecn_document_number=$("#new_ecn_document_number").val();
		var flag=true;
		if(new_ecn_type==null||new_ecn_type.trim().length==0){
			alert("请选择技改类型!");
			flag=false;
		}		
		if(new_subject==null|| new_subject.trim().length==0){
			alert("请输入主题!");
			flag=false;
			return false;
		}
		if(new_ecn_document_number==null|| new_ecn_document_number.trim().length==0){
			alert("请输入技改编号!");
			flag=false;
			return false;
		}
		// 组织技改范围 json字符串
		var rtnObj = getAllTask('new');
		if(rtnObj.flag == false){
			flag=false;
			return false;
		}
		$("#new_allEcnTask").val(rtnObj.allTaskJson);
		if($("#new_tecn_flag").is(':checked')){
			$("#new_tecn_flagValue").val(1);
		}else{
			$("#new_tecn_flagValue").val(0);
		}
		if(flag){
			$("#btnAddConfirm").attr("disabled",true);
			$(".divLoading").addClass("fade in").show();
			$("#addECN").ajaxSubmit({
				url:"ecnDocument!addECN.action",
				type: "post",
				dataType:"json",
				success:function(response){
					alert(response.message);
					if(response.success){
						var targetPage=$("#cur").attr("page");
						// alert(targetPage);
						$(".divLoading").hide();
						$("#btnAddConfirm").attr("disabled",false);
						$("#newModal").modal("hide");
						ajaxQuery(targetPage);
					}						
				}			
			});
		}
		
	});
	// 确定编辑
	$("#btnEditConfirm").live("click",function(){
		var edit_ecn_type=$("#edit_ecn_type").val();
		var edit_subject=$("#edit_subject").val();
		var edit_ecn_document_number=$("#edit_ecn_document_number").val();
		var flag=true;
		if(edit_ecn_type==null||edit_ecn_type.trim().length==0){
			alert("请选择技改类型!");
			flag=false;
		}		
		if(edit_subject==null|| edit_subject.trim().length==0){
			alert("请输入主题!");
			flag=false;
			return false;
		}
		if(edit_ecn_document_number==null|| edit_ecn_document_number.trim().length==0){
			alert("请输入技改编号!");
			flag=false;
			return false;
		}
		// 组织技改范围 json字符串
		var rtnObj = getAllTask('edit');
		if(rtnObj.flag == false){
			flag=false;
			return false;
		}
		$("#edit_allEcnTask").val(rtnObj.allTaskJson);
		if($("#edit_tecn_flag").is(':checked')){
			$("#edit_tecn_flagValue").val(1);
		}else{
			$("#edit_tecn_flagValue").val(0);
		}
		var deleteTaskIdJson = JSON.stringify(deleteTaskId);
		$("#edit_deleteTaskId").val(deleteTaskIdJson);
		if(flag){
			$("#editECN").ajaxSubmit({
				url:"ecnDocument!editECN.action",
				type: "post",
				dataType:"json",
				success:function(response){
					alert(response.message);
					if(response.success){
						var targetPage=$("#cur").attr("page");
						// alert(targetPage);
						$("#editModal").modal("hide");
						ajaxQuery(targetPage);
					}						
				}			
			});
		}
		
	});
	
	/**
	 * 变更点数 校验
	 */
	$("#new_changed_point").live("input",function(e){
		if(!const_float_validate.test($(e.target).val())&&$(e.target).val()!=""){
			alert("变更点数只能为数字！");
			$(e.target).val("")
		}
	});
	$("#edit_changed_point").live("input",function(e){
		if(!const_float_validate.test($(e.target).val())&&$(e.target).val()!=""){
			alert("变更点数只能为数字！");
			$(e.target).val("")
		}
	});
	
	/**
	 * 车间工时change事件绑定
	 */
	$(".ecn_workshop_time").live("change",function(e){
		if(!const_float_validate.test($(this).val())){
			alert("请输入有效数字！");
			$(this).val("");
		}
		var ecn_time_table=$(e.target).parent().parent().parent().find("input");
		var total_time=0;

		$.each(ecn_time_table,function(index,input){		
			var ecn_time=(isNaN(parseFloat($(input).val()))?0:parseFloat($(input).val()));
			total_time=(parseFloat(total_time)+parseFloat(ecn_time)).toFixed(2);
		});
		//alert(ecn_time);
		var total_hour_input=$(e.target).parent().parent().parent().parent().parent().parent().parent().children("tr").eq(2).find("input");
		//alert($(e.target).parent().parent().parent().parent().parent().parent().html());
		$(total_hour_input).val(total_time);
	});
	
});
// 获取所有技改任务信息JSON字符串
function getAllTask(type){
	var flag = true ;
	var allTaskJson = [];
	// 获取所有任务内容，并组织成json
	var allTaskDiv = $("#"+type+"_accordion").children('div');
	if(type == "new" && allTaskDiv.length<1){
		flag = false;
		alert("未维护技改任务信息，请至少维护一个技改任务!");
	}else{
		allTaskDiv.each(function(index){
			var taskJson = {};
			var taskTable = $(this).children('div').eq(0).children('div').eq(0).children('div').eq(0).children('table').children();
			var trs = $(taskTable).children('tr');
						
			// 技改项内容
			var taskTextarea = $(trs).eq(0).children('td').eq(1).children();
			if($(taskTextarea).val().trim() == ''){
				flag = false;
				alert("技改任务"+(index+1)+"的技改项内容为空，请输入技改项内容!");
			}else{
				taskJson.task_content = $(taskTextarea).val().trim();
			}
			// 切换方式
			var switchModeRadio = $(trs).eq(1).children('td').eq(1).children('input:checked');
			if($(switchModeRadio).val() == null){
				flag = false;
				alert("技改任务"+(index+1)+"的切换方式为空，请选择切换方式!");
			}else{
				taskJson.switch_mode = $(switchModeRadio).val();
			}
			//变更类型
			var changeTypeChx=$(trs).eq(2).children('td').eq(1).children('input:checked');
			var changeType="";
			$.each(changeTypeChx,function(index,chx){
				changeType+=$(chx).val()+",";
			});
			var changeOrderNo=$(trs).eq(2).children('td').eq(1).children("input").eq(2).val();
			if(changeType.indexOf("顾客变更")>=0){
			
				if(changeOrderNo.trim().length==0){
					alert("技改任务"+(index+1)+"未填写变更单号！");
					flag = false;
					return false;
				}
			}
			taskJson.change_type=changeType;
			taskJson.change_order_no=changeOrderNo||"";
			//alert(changeType);
			// 总工时
			var total_hoursInput = $(trs).eq(3).children('td').eq(1).children('input');
			if($(total_hoursInput).val().trim() != ''&&$("#"+type+"_ecn_type :selected").text()!="DCN设计变更"){				
				taskJson.total_hours = $(total_hoursInput).val();
			}else if($(total_hoursInput).val().trim() == ''&&$("#"+type+"_ecn_type :selected").text()!="DCN设计变更"){				
				flag = false;
				alert("技改任务"+(index+1)+"的单车总工时为空，请输入单车总工时!");
				return false;
			}else{
				taskJson.total_hours = "";
			}
			
			//技改车间/工时
	/*		var task_timeTable_tbody=$(trs).eq(3).children('td').eq(1).children('table').children('tbody').children('tr');
			var task_time =[];
			task_timeTable_tbody.each(function(index){
				var unit_time_input=$(this).children('td').eq(1).children('input');//单车工时输入框
				var workshop_id=$(unit_time_input).attr("workshop_id");
				var ecn_time_id=$(unit_time_input).attr("ecn_time_id");
				var ecn_task_id=$(unit_time_input).attr("task_id");
				var unit_time=$(unit_time_input).val();
				var unit=$(this).children('td').eq(2).text();
				//alert(unit);
				var ecn_time_obj={};
				ecn_time_obj.id=ecn_time_id;
				ecn_time_obj.workshop_id=workshop_id;
				ecn_time_obj.ecn_task_id=ecn_task_id;
				ecn_time_obj.unit_time=unit_time;
				ecn_time_obj.unit=unit;
				if(unit_time.trim()!=''||ecn_time_id!="0"){
					task_time.push(ecn_time_obj);
				}
			});
			taskJson.ecn_time=task_time;*/
			
			// 技改范围
			var taskAreaTable_tbody = $(trs).eq(4).children('td').eq(1).children('table').children('tbody').children('tr');
			var task_area = [];
			if(taskAreaTable_tbody.length<1){
				flag = false;
				alert("技改任务"+(index+1)+"未维护技改范围信息，请完善!");
			}else{
				taskAreaTable_tbody.each(function(x){
					
					var order = $(this).children('td').eq(1).children('input');
					var factory = $(this).children('td').eq(2).children('select');
					var num = $(this).children('td').eq(3).children('input');
					if($(order).val().trim() == '' || $(factory).val() =="" /*
																			 * ||
																			 * $(num).val().trim() == ''
																			 */){
						flag = false;
						alert("技改任务"+(index+1)+"的第"+(x+1)+"条技改范围数据维护不完整，请维护完整!");
					}else{
						var areaStr={};
						areaStr.ecn_task_id = $(order).attr('task_id');
						areaStr.ecn_task_number = (index+1);
						areaStr.ecn_order_id = $(order).attr('order_id');
						areaStr.ecn_factory_id = $(factory).val();
						areaStr.ecn_number = $(num).val();
						task_area.push(areaStr);
					}
					
				}); 
				taskJson.task_area = task_area;
				allTaskJson.push(taskJson);
			}
		}); 
		allTaskJson = JSON.stringify(allTaskJson);
	}
	var rtnObj ={};
	rtnObj.flag = flag;
	rtnObj.allTaskJson = allTaskJson;
	return rtnObj;
}

function ajaxQuery(targetPage){
	
	$.ajax({
	    url: "ecnDocument!showEchTransList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"ecn_document_number": $('#ecn_document_number').val(),
	    	"subject": $('#subject').val(),
	    	"status": $('#status').val(),
	    	"tecn_flag": $('#tecn_flag').val(),
	    	"startDate": $('#startDate').val(),
	    	"endDate": $('#endDate').val(),
	    	"pager.pageSize":pageSize||20,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){
    		$("#tableEcnDocument tbody").html("");
    		$.each(response.data,function(index,value){
    			var tr=$("<tr />");
    			$("<td />").html(value.typeName).appendTo(tr);
    			$("<td />").html(value.ecn_document_number).appendTo(tr);
    			$("<td />").html(value.subject).appendTo(tr);
    			$("<td />").html(value.ecn_document_date).appendTo(tr);
    			$("<td />").html(value.responsible_organization).appendTo(tr);
    			if(value.ecn_document_file!=null && value.ecn_document_file!=''){
    				$("<td />").html('<a href="file/upload/ecn/'+value.ecn_document_file+'" target="_blank">查看</a>').appendTo(tr);
    			}else{
    				$("<td />").html("&nbsp;").appendTo(tr);
    			}
    			if(value.changed_bom!=null && value.changed_bom!=''){
    				$("<td />").html('<a href="file/upload/ecn/'+value.changed_bom+'" target="_blank">查看</a>').appendTo(tr);
    			}else{
    				$("<td />").html("&nbsp;").appendTo(tr);
    			}
    			$("<td />").html(value.gcy_contacts).appendTo(tr);
    			$("<td />").html(value.gy_contacts).appendTo(tr);
    			if(value.tecn_flag=='1'){
    				$("<td />").html("是").appendTo(tr);
    			}else if(value.tecn_flag=='0'){
    				$("<td />").html("否").appendTo(tr);
    			}
    			if(value.status=='0'){
    				$("<td />").html("未完成").appendTo(tr);
    			}else if(value.status=='1'){
    				$("<td />").html("已完成").appendTo(tr);
    			}else if(value.status=='2'){
    				$("<td />").html("已删除").appendTo(tr);
    			}
    			if(value.status=='0'){
    				$("<td align='center'/>").html("<i name='edit' class=\"fa fa-pencil\" style=\"cursor: pointer;text-align: center;\" onclick='ajaxEdit(" + value.id + ")'></i>").appendTo(tr);
    			}else{
    				$("<td align='center'/>").html("<i name='edit' class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick='ajaxView(" + value.id + ")'></i>").appendTo(tr);
    			}
    			
    			$("#tableEcnDocument tbody").append(tr);
    		});	
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();	
	    }
	});
}

function ajaxEdit(ecnId){
	$("#edit_accordion").html('');
	$("#edit_tab").html("<li><i id=\"edit_addTask\" class=\"fa fa-plus\" style=\"cursor: pointer; padding-top: 12px; color: blue;\"></i></li>");
	deleteTaskId = [];
	$("#edit_id").val();
	$("#edit_allEcnTask").val();
	$("#edit_tecn_flagValue").val();
	$("#edit_deleteTaskId").val();
	// 查询订单信息
	$.ajax({
		url: "ecnDocument!getEcnDocumentAndEcnTask.action",
		dataType: "json",
		data: {"ecn_id" : ecnId},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.data.length ==1){
				var ecnDocument = response.data[0];
				getKeysSelect("ECN_TYPE",ecnDocument.ecn_type, "#edit_ecn_type");
				$("#edit_id").val(ecnDocument.id);
				$("#edit_subject").val(ecnDocument.subject);
				$("#edit_responsible_organization").val(ecnDocument.responsible_organization);
				$("#edit_ecn_document_number").val(ecnDocument.ecn_document_number);
				$("#edit_ecn_document_date").val(ecnDocument.ecn_document_date);
				$("#edit_gcy_contacts").val(ecnDocument.gcy_contacts);
				$("#edit_gy_contacts").val(ecnDocument.gy_contacts);
				$("#edit_changed_point").val(ecnDocument.changed_point);
				if(ecnDocument.tecn_flag == 1){
					$("#edit_tecn_flag").attr('checked',true);
				}else{
					$("#edit_tecn_flag").attr('checked',false);
				}
				if(ecnDocument.ecn_document_file !=null && ecnDocument.ecn_document_file!=''){
					$("#editecndocumentfile").attr("href","file/upload/ecn/"+ecnDocument.ecn_document_file);
					$("#editecndocumentfile").text('查看');
				}
				if(ecnDocument.changed_bom !=null && ecnDocument.changed_bom!=''){
					$("#editchangedbom").attr("href","file/upload/ecn/"+ecnDocument.changed_bom);
					$("#editchangedbom").text('查看');
				}
				var ecn_task_list = ecnDocument.ecn_task_list;
				var last_task_number = 0;
			
				$.each(ecn_task_list,function(index,ecnTask){
					if(ecnTask.task_number!=last_task_number){
						var workshop_time_html=getWorkshopTimeInfo(ecnTask.id);
						addTask("#edit_accordion",'edit',ecnTask,workshop_time_html);
						var x = '#factoryOrder_edit'+ecnTask.task_number;
						addFactoryOrder($(x),ecnTask);
					}else{
						var x = '#factoryOrder_edit'+ecnTask.task_number;
						addFactoryOrder($(x),ecnTask);
					}
					last_task_number = ecnTask.task_number;
				});
				$("#editModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}

function ajaxView(ecnId){
	$("#view_accordion").html('');
	$("#view_tab").html("<li></li>");
	// 查询订单信息
	$.ajax({
		url: "ecnDocument!getEcnDocumentAndEcnTask.action",
		dataType: "json",
		data: {"ecn_id" : ecnId},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.data.length ==1){
				var ecnDocument = response.data[0];
				getKeysSelect("ECN_TYPE",ecnDocument.ecn_type, "#view_ecn_type");
				$("#view_subject").val(ecnDocument.subject);
				$("#view_responsible_organization").val(ecnDocument.responsible_organization);
				$("#view_ecn_document_number").val(ecnDocument.ecn_document_number);
				$("#view_ecn_document_date").val(ecnDocument.ecn_document_date);
				$("#view_gcy_contacts").val(ecnDocument.gcy_contacts);
				$("#view_gy_contacts").val(ecnDocument.gy_contacts);
				if(ecnDocument.tecn_flag == 1){
					$("#view_tecn_flag").attr('checked',true);
				}else{
					$("#view_tecn_flag").attr('checked',false);
				}
				if(ecnDocument.ecn_document_file !=null && ecnDocument.ecn_document_file!=''){
					$("#viewecndocumentfile").attr("href","file/upload/ecn/"+ecnDocument.ecn_document_file);
					$("#viewecndocumentfile").text(ecnDocument.ecn_document_file);
				}
				if(ecnDocument.changed_bom !=null && ecnDocument.changed_bom!=''){
					$("#viewchangedbom").attr("href","file/upload/ecn/"+ecnDocument.changed_bom);
					$("#viewchangedbom").text(ecnDocument.changed_bom);
				}
				var ecn_task_list = ecnDocument.ecn_task_list;
				var last_task_number = 0;				
				$.each(ecn_task_list,function(index,ecnTask){
					if(ecnTask.task_number!=last_task_number){
						var workshop_time_html=getWorkshopTimeInfo(ecnTask.id);
						addTask("#view_accordion",'view',ecnTask,workshop_time_html);
						var x = '#factoryOrder_view'+ecnTask.task_number;
						addFactoryOrder($(x),ecnTask);
					}else{
						var x = '#factoryOrder_view'+ecnTask.task_number;
						addFactoryOrder($(x),ecnTask);
					}
					last_task_number = ecnTask.task_number;
				});
				$("#viewModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	})
}


// 新增技改任务
function addTask(fDiv,type,ecnTask,workshop_time_html){
	ecnTask = ecnTask || {};
	var tasklist=($("#"+type+"_tab").find("li"));
	var ecnType=$("#"+type+"_ecn_type :selected").text();
	var totalHourDisable=ecnType=="DCN设计变更"?"disabled":"";
	var taskNum=tasklist.length;
	var index=taskNum-1;
	var active_flag="active";
	var cbox1_checked="";
	var cbox2_checked="";	
	if(ecnTask.change_type&&ecnTask.change_type.indexOf("顾客变更")>=0){
		cbox2_checked="checked";
	}
	if(ecnTask.change_type&&ecnTask.change_type.indexOf("重大变更")>=0){
		cbox1_checked="checked";
	}
	$("#"+type+"_tab").find("li").removeClass("active");
	$(fDiv).find("div").removeClass("active");
/*	if(taskNum==1){
		active_flag="active"
	}*/
	workshop_time_html=workshop_time_html||"";
	//alert(workshop_time_html);
	// alert(type);
	// alert(taskNum);
	
	var tabli="<li role='presentation' class='"+active_flag+"'><a href='#"+type+"_task"+taskNum+"' data-toggle='tab' style='font-size: 14px; color: #333;display:inline-block'><span>任务"+taskNum+"</span>"
			+"&nbsp;&nbsp;<i class='fa fa-remove' style='cursor: pointer;color: rgb(218, 208, 208);display:inline-block' onclick='javascript:{if (confirm(\"确认删除该任务？\"))removeTask(this,\""+type+"\")}'></i></a></li>";
	if(type=='view'){
		var tabli="<li role='presentation' class='"+active_flag+"'><a href='#"+type+"_task"+taskNum+"' data-toggle='tab' style='font-size: 14px; color: #333;display:inline-block'><span>任务"+taskNum+"</span>"
		+"&nbsp;&nbsp;</a></li>";
	}
	// alert(tabli);
	$("#"+type+"_tab li:eq("+index+")").before(tabli);

	var paramHtml='<div class=\"tab-pane '+active_flag+'\" id=\"'+type+'_task'+taskNum+'\" ><div class="panel panel-default">'+
				    '<div id="collapseTask'+type+taskNum+ '" class="panel-collapse collapse in" role="tabpanel" style="overflow-y:scroll" aria-labelledby="headingTask'+type+taskNum+'">'+
				      '<div class="panel-body">'+
							'<table style="width: 100%;margin-left: 20px;"><tbody>'+
						    	'<tr>'+
						    		'<td style="width: 120px;"><label class="control-label" for="">*&nbsp;&nbsp;技改项内容</label> </td>'+
						    		'<td> <textarea style="width: 88%;"  class="input-small" placeholder="请输入技改任务..." rows=1>'+(ecnTask.task_content||'')+'</textarea> </td>'+
						    	'</tr>'+
						    	'<tr>'+
						    		'<td style="width: 120px;"> <label class="control-label" for="">*&nbsp;&nbsp;切换方式</label> </td>';
						    		if(ecnTask.switch_mode == 0){
						    			paramHtml+= '<td> <input checked="checked" value="0" style=\"margin: 0px 0 0\" class="radio changeRadio" type="radio"  name="radio'+type+taskNum+'" title="全部切换"/><span>全部切换</span><input value="1" style=\"margin: 0px 0 0\" class="radio changeRadio" type="radio" name="radio'+type+taskNum+'" title="立即切换"/><span>立即切换</span> </td>';
						    		}else if(ecnTask.switch_mode == 1){
						    			paramHtml+= '<td> <input value="0" style=\"margin: 0px 0 0\" class="radio changeRadio" type="radio" name="radio'+type+taskNum+'" title="全部切换"/><span>全部切换</span> <input checked="checked" value="1" style=\"margin: 0px 0 0\" class="radio changeRadio" type="radio" name="radio'+type+taskNum+'" title="立即切换"/><span>立即切换</span> </td>';
						    		}else{
						    			paramHtml+= '<td> <input value="0" style=\"margin: 0px 0 0\" class="radio changeRadio" type="radio" name="radio'+type+taskNum+'" title="全部切换"/><span>全部切换 </span><input value="1" style=\"margin: 0px 0 0\" class="radio changeRadio" type="radio" name="radio'+type+taskNum+'" title="立即切换"/><span>立即切换</span> </td>';
						    		}
						    		paramHtml+='</tr>'+
						    		'<tr><td style=\"width: 120px;\"><label class=\"control-label\">*&nbsp;&nbsp;变更类型</label></td>'+
									'<td><input value=\"重大变更\" style=\"margin: 0px 0 0\" class=\"radio\"  type=\"checkbox\"'+cbox1_checked+' name=\"'+type+'_change_type'+taskNum+'\" />重大变更 '+
									'<input value=\"顾客变更\"  style=\"margin: 0px 0 0\" class=\"radio\"  type=\"checkbox\"'+cbox2_checked+' name=\"'+type+'_change_type'+taskNum+'\" />顾客变更&nbsp;&nbsp;&nbsp;&nbsp;<input class=\"input-medium\" type=\"text\" placeholder="请输入变更单号" value=\"'+(ecnTask.change_order_no||'')+'\"></td></tr>'+					    		
							    '<tr><td style="width: 120px;"> <label class="control-label" for="">&nbsp;&nbsp;单车总工时</label> </td>'+
						    		'<td><input type="text" class="total_hour" style="width: 80px;" value="'+(ecnTask.total_hours||'')+'"'+totalHourDisable+'/>&nbsp;&nbsp;小时</td></tr>'+
						    	/*'<tr><td style=\"vertical-align: top; padding-top: 10px; width: 120px;\">技改车间/工时(H)</td>'+
						    	'<td><table style=\"margin-left: 0px;margin-top:5px; width: 60%;\" class=\"table table-condensed\">'+
								'<thead><tr><th class=\"col-sm-2\">车间</th><th class=\"col-sm-7\">单车工时</th><th></th></tr>'+
								'</thead><tbody class="exp-table">'+workshop_time_html+'</tbody>workshop_time_html+'</table></td></tr>'+
*/						    	'<tr><td style="vertical-align: top;width: 120px;">技改实施范围</td>'+
						    		'<td>'+
						    			'<table style="margin-left:0px;margin-top:-5px;width: 80%;" class="exp-table table">'+
									         '<thead>'+
									            '<tr>'+
									              '<th style="width: 30px;"><i  class="fa fa-plus addFactoryOrder" style="cursor: pointer;color: blue;"></i></th>'+
									              '<th class="col-sm-5">订单</th>'+
									              '<th style="width: 120px;" class="col-sm-7">技改工厂</th>'+
									              '<th style="width: 80px;" class="col-sm-7">技改台数</th>'+
									            '</tr>'+
									         '</thead>'+
									         '<tbody class="exp-table" id="factoryOrder_'+type+taskNum+ '">'+
									         '</tbody>'+
								        '</table>'+
						    		'</td>'+  
						    	'</tr>'+
						   '</tbody></table>'+
				      '</div>'+
				    '</div>'+
				  '</div></div>';
	// alert(paramHtml);
	// alert(fDiv);
	// $(fDiv).after(paramHtml);
/* $(".tab-pane:eq("+index+")").after(paramHtml); */
	$(paramHtml).appendTo(fDiv);
}
/*
 * 删除技改任务
 */
function removeTask(p,type){
	var task_div_id=$(p).parent().attr("href");
	
	// 编辑时，当task id 存在时，删除需要记录task id
	// 取得技改范围tbody
	var taskAreaTbody = $(task_div_id).children('div').eq(0).children('div').eq(0).children('div').eq(0).children('table').eq(0).children('tbody').eq(0).children('tr').eq(4).children('td').eq(1).children('table').children('tbody');
	// alert($(taskAreaTbody).html());
	var trs = $(taskAreaTbody).children('tr');
	// 记录删除的task ID
	trs.each(function(index){
		var orderInput = $(trs).eq(index).children('td').eq(1).children('input');
		if($(orderInput).attr('task_id')!=null&&type=='edit'){
			deleteTaskId.push($(orderInput).attr('task_id'));
		}
	});
	
	var task_pre=type+"_task";
	// alert(task_div_id);
	var allTabLi = $(p).parent().parent().siblings();	
	$(p).parent().parent().remove();// 删除该tabLi
	$(task_div_id).remove();// 删除对应tab content
	var allTabDiv = $("#"+type+"_accordion").find(".tab-pane");
	// 技改任务tab栏重新排序
	var actived=false;
	allTabLi.each(function(index,li){
		if(index>=0){
			var span = $(li).children('a');
			// alert($(span).attr("href"));
			$(span).attr('href',"#"+task_pre+(index+1));
			$(span).find("span").html("任务"+(index+1));
			if($(li).hasClass("active")){actived=true}
		}
	});
	// 技改任务DIV id重排
	allTabDiv.each(function(index,div){
		if(index>0){
			var pre_id = $(div).attr('id');
			$("#"+pre_id).attr("id",""+task_pre+(index+1));
		}
	});
	if(!actived){
		$(allTabLi[0]).addClass("active");
		$(allTabDiv[0]).addClass("active");
	}
	
}
// 新增技改范围
function addFactoryOrder(tbody,ecnTask){
	var paramHtml="<tr><td><button type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
	"<td><input type='text' style='width:100%;z-index:7777' class='input-small order' /></td>" +
	"<td><select style='width:120px;' class='ecn_factory'><option value=''>请选择</option></select></td>" +
	"<td><input type='text' style='width:60px' class='input-small' /></td>" +
	"<td><input type='hidden' disabled='disabled' class='input-small' /></td>" +
	"</tr>";
	$(paramHtml).appendTo(tbody);
	var orderInput = $(tbody).find("tr:last").children('td').eq(1).children('input');
	var orderIdInput = $(tbody).find("tr:last").children('td').eq(4).children('input');
	var factionSelect = $(tbody).find("tr:last").children('td').eq(2).children('select');
	var taskNumberInput = $(tbody).find("tr:last").children('td').eq(3).children('input');
	getOrderNoSelect(orderInput,orderIdInput,function(obj){
		// 使用订单ID查询工厂订单表找到订单所有生产工厂
		getOrderFactorySelect(factionSelect,obj.id,'','empty');
		$(factionSelect).addClass("ecn_factory");
		// $(orderInput).attr("orderQty",obj.orderQty);
		$(orderInput).attr("order_id",obj.id);
		// 取得切换方式
		var switchModeRadio = $(orderInput).parent().parent().parent().parent().parent().parent().parent().find('tr').eq(1).children('td').eq(1).children('input:checked');
		// 给技改数量赋值
		// $(taskNumberInput).val(obj.orderQty);
		// alert($(taskNumberInput).html());
		$(taskNumberInput).attr("disabled",true);
		/*
		 * if($(switchModeRadio).val() != null && $(switchModeRadio).val() ==
		 * 0){ $(taskNumberInput).attr("disabled",true); }
		 */
	});
	
	if(ecnTask != null){
		$(orderInput).val(ecnTask.order_no);
		$(orderInput).attr("orderQty",ecnTask.order_qty);
		$(orderInput).attr("task_id",ecnTask.id);
		$(orderInput).attr("order_id",ecnTask.ecn_order_id);
		$(orderIdInput).val(ecnTask.ecn_order_id);
		getOrderFactorySelect(factionSelect,ecnTask.ecn_order_id,ecnTask.ecn_factory_id,'empty');
		$(taskNumberInput).val(ecnTask.ecn_number);	
		// 取得切换方式
		var switchModeRadio = $(orderInput).parent().parent().parent().parent().parent().parent().parent().find('tr').eq(1).children('td').eq(1).children('input[checked]');
		// 给技改数量赋值
		$(taskNumberInput).attr("disabled",true);
		/*
		 * if($(switchModeRadio).val() != null && $(switchModeRadio).val() ==
		 * 0){ $(taskNumberInput).attr("disabled",true); }
		 */
	}else{
		$(orderInput).attr("task_id",0);
	}
}
function getWorkshopTimeInfo(taskid,type){
	type=type||"add";
	var html="";
	$.ajax({
		url : "ecnDocumentTask!workshoptimeinfo.action",
		dataType : "json",
		data : {
			taskid : taskid
		},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			var tr_h="<thead><tr>";
			var tr_b="<tbody><tr>";
			$.each(response.data, function(index, value) {
				/*var tr="<tr ><td style='height:30px'>"+value.workshop_name+"</td><td><input class='ecn_workshop_time' type='text' workshop_id='"+value.workshopid+
						"' value='"+value.unit_time+"' task_id='"+value.ecn_task_id+"' ecn_time_id='"+value.id+"'><td>H</td></tr>";*/
				/*if(type="view"){
					tr="<tr ><td style='height:30px'>"+value.workshop_name+"</td><td><input class='workshop' type='text' workshop_id='"+value.id+
					"' value='"+value.unit_time+"' task_id='"+value.ecn_task_id+"' disabled><td>H</td></tr>";
				}*/
				tr_h+="<td class=\"col-sm-2\">"+value.workshop_name+"</td>"
				tr_b+="<td style='height:30px'><input class='ecn_workshop_time' style='width:50px;text-align:center' type='text' workshop_id='"+value.workshopid+
					"' value='"+value.unit_time+"' task_id='"+value.ecn_task_id+"' ecn_time_id='"+value.id+"'>";
			})			
			tr_h+="</tr></thead>";
			tr_b+="</tr></tbody>";
			html=tr_h+tr_b;
		}	
	})
	return html;
}

Date.prototype.format = function(format){ 
	var o = { 
		"M+" : this.getMonth()+1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth()+3)/3), // quarter
		"S" : this.getMilliseconds() // millisecond
	} 

	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 
	for(var k in o) { 
	if(new RegExp("("+ k +")").test(format)) { 
	format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
	} 
	} 
	return format; 
}