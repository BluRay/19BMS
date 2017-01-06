var switch_node_arr="焊装,玻璃钢,涂装,底盘,总装,检测线";
pageSize = 100;
$(document).ready(function () {	
	initPage();
	//点击查询，技改任务列表查询
	$("#btnQuery").live("click",function(){
		ajaxQuery(1);
	});
	//点击技改任务分配
	$(".fa-pencil").live("click",function(e){
		$("#task_assess").clearForm();
		$("[name=switch_mode]").removeAttr("disabled");
		$("#new_accordion").html("");// 清空之前的div
		var tr=$(e.target).closest("tr");
		var task_id=$(tr).data("task_id");
		var tds=$(e.target).parent("td").siblings();
		var task_content=$(tds[0]).html();
		var tech_order_no=$(tds[1]).html();
		var switch_mode=$(tds[3]).html();
		var tech_date=$(tds[2]).html();
		//var order_desc=$(tds[4]).html();
		//var factory=$(tds[5]).html();
		//alert(order_desc.substring(0,index));
		var allTaskDiv = $("#new_accordion").children('div');
		allTaskDiv.each(function(index){
			if(index>0){
				$(this).remove();
			}
		});

		$("#new_tab").html("<li><i id=\"add_tech_detail\" class=\"fa fa-plus\" style=\"cursor: pointer; padding-top: 12px; color: blue;\"></i></li>");
		var is_follow=false;
		var tech_list=getTechList(task_id);
		$.each(tech_list,function(i,tech_detail){
			var order_desc=tech_detail.order_desc;
			var tech_detail_list=tech_detail.tech_detail_list;
			var follow_detail=tech_detail.follow_detail;
			addTechDetail(order_desc,tech_detail_list,follow_detail);
			$.each(follow_detail.split(";"),function(i,follow){
				//alert(follow.split("||")[1]);
				if(follow.split("||")[1]>0){
					is_follow=true;
					return false;
				}
			})
		});		
		var mode_index=0;
		if(switch_mode=='节点前切换'){
			mode_index=1;
		}
		if(switch_mode=='节点间切换'){
			mode_index=2;
		}
		$("[name=switch_mode]").eq(mode_index).attr('checked',true);
		if(is_follow){
			$("[name=switch_mode]").attr("disabled",true);
		}
		$("#v_task_content").html(task_content);
		$("#v_tech_order_no").html(tech_order_no);
		$("#assessModal").data("tech_date",tech_date);
		$("#assessModal").data("tech_task_id",task_id);
		$("#assessModal").modal("show");
	});
	//点击+号新增技改范围
	$("#add_tech_detail").live("click",function(){
		addTechDetail();
	});
	//选择切换方式为‘节点前切换’和‘节点间切换’展示切换节点
	$('input:radio[name="switch_mode"]').change(function(){
		//alert($(this).val());
		if($(this).val()=='全部切换'){
			$("#div_switch_node").hide();
		}else{
			$("#div_switch_node").show();
		}
	});
	
	/**
	 * 订单编号输入
	 */	
	$(".assess_order_no").live("input",function(e){
		$(e.target).parent("div").find(".order_desc").html("");//清空订单描述
		var taskNum=$(e.target).attr("id").split("_")[1];
		$("#tech_factory_"+taskNum).remove();//清除工厂技改分配明细		
		
	});

	/**
	 * 选中工厂复选框，查询该订单工厂的技改车辆信息
	 */
	$("input[name='new_tecn_flag']").live("click",function(e){
		var tb=$(e.target).parent("div").next("table");
		var tr_body=$(tb).find("tr").eq(1);
		if($(this).attr("checked")){
			//alert("选中:"+$(this).data("tech_detail"));
			var order_no=$(e.target).parent("div").parent("div").parent("div").find(".assess_order_no").val();
			var factory=$(e.target).parent("div").find("span").html();
			var tech_date=$("#assessModal").data("tech_date");
			var switch_mode=$("input[name='switch_mode']:checked").val();
			var switch_node=$("#switch_node").val()||"";
			var node_list="";
			var node_index=switch_node_arr.indexOf(switch_node);
			if(switch_mode=='节点前切换'){
				node_list=switch_node_arr.substring(0,node_index-1)
			}
			if(switch_mode=='节点间切换'){				
				node_list=switch_node_arr.substring(node_index,switch_node_arr.length)
			}
			//alert(order_no);
			var datalist=getTechBusNum(order_no,factory,tech_date,switch_mode,switch_node,node_list);
			//alert($(tr_body).html());
			var tech_info=JSON.parse(datalist[0].tech_bus_info);
			$(tr_body).html("<td>"+(tech_info['自制件']||'')+"</td><td>"+(tech_info['部件']||'')+"</td><td>"+
					(tech_info['焊装']||'')+"</td><td>"+(tech_info['玻璃钢']||'')+"</td><td>"+(tech_info['涂装']||'')+"</td><td>"+
					(tech_info['底盘']||'')+"</td><td>"+(tech_info['总装']||'')+"</td><td>"+(tech_info['检测线']||'')+"</td>");
			
		}else{
			$(tr_body).html("<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>");
		}
	});
	/**
	 * 变更切换方式，将所有工厂技改明细清空，提示“切换方式已更改，请重新勾选技改实施范围！”
	 */
	$("input[name='switch_mode']").live("change",function(e){
		$("input[name='new_tecn_flag']").removeAttr("checked");
		var tbs=$(".tech_factory").find("table");
		$.each(tbs,function(i,tb){
			var tr_body=$(tb).find("tr").eq(1);
			$(tr_body).html("<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>");
		})
	alert("切换方式已更改，请重新勾选技改实施范围！")
	});
	/**
	 * 变更切换节点，将所有工厂技改明细清空，提示“切换节点已更改，请重新勾选技改实施范围！”
	 */
	$("#switch_node").live("change",function(e){
		$("input[name='new_tecn_flag']").removeAttr("checked");
		var tbs=$(".tech_factory").find("table");
		$.each(tbs,function(i,tb){
			var tr_body=$(tb).find("tr").eq(1);
			$(tr_body).html("<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>");
		})
	alert("切换节点已更改，请重新勾选技改实施范围！")
	});
	
	$("#btnEditConfirm").live("click",function(){
		asessTechTask();
	});
	
})

function initPage(){
	var d = new Date();
	var vYear = d.getFullYear();
	var vMon = d.getMonth() + 1;
	var vMonBefore= d.getMonth();
	var vDay = d.getDate();
	var h = d.getHours(); 
	var m = d.getMinutes(); 
	var se = d.getSeconds(); 
	s1=(vYear-1)+"-"+(12)+"-"+"01";	
	s=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay);
	$("#startDate").val(s1);
	$("#endDate").val(s);
	
	getAuthorityFactorySelect("#search_factory", "", "noall");
	getOrderNoSelect("#order_no","#orderId");
	
	
	ajaxQuery(1);
}

/**
 * 技改任务分配，首页查询
 */
function ajaxQuery(targetPage){
	var conditions={};
	conditions.task_content=$("#tech_task_content").val();
	conditions.tech_order_no=$("#tech_order_no").val();
	conditions.order_no=$("#order_no").val();
	conditions.factory=$("#factory :selected").text();
	conditions.tech_date_start=$("#startDate").val();
	conditions.tech_date_end=$("#endDate").val();
	conditions.status=$("#status").val();
	
	$.ajax({
		url:"techTask!getTaskList.action",
		dataType:"json",
		type:"post",
		data:{
			"conditions":JSON.stringify(conditions),
			"pager.pageSize":pageSize||20,
			"pager.curPage":targetPage || 1
		},
		success:function(response){
			$("#techTaskList tbody").html("");
			$.each(response.dataList,function(i,data){
				var tr=$("<tr />");
				$("<td />").html(data.task_content).appendTo(tr);
				$("<td />").html(data.tech_order_no).appendTo(tr);
				$("<td />").html(data.tech_date).appendTo(tr);
				$("<td />").html(data.switch_mode).appendTo(tr);
				$("<td />").html(data.order_desc||"").appendTo(tr);
				$("<td />").html(data.factory||"").appendTo(tr);
				$("<td />").html(data.switch_node||"").appendTo(tr);
				$("<td />").html(data.tech_list||"").appendTo(tr);
				$("<td />").html("<i name='edit' class=\"fa fa-pencil\" title=\"分配\" style=\"cursor: pointer;text-align: center;\" onclick='ajaxEdit(" + data.id + ")'></i>").appendTo(tr);
				$("#techTaskList tbody").append(tr);
				$(tr).data("task_id",data.id);
			});
			
			$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();
		}
	})
}
/**
 * 新增技改范围
 */
function addTechDetail(order_desc,tech_detail_list,follow_detail){
	follow_detail=follow_detail||"";
	var is_follow=false;
	$.each(follow_detail.split(";"),function(i,follow){
		var factory=follow.split("||")[0];
		var follow_num=follow.split("||")[1];
		//alert(follow_num);
		if(follow.split("||")[1]>0){
			is_follow=true;
			return false;
		}
	})
	var order_disabled="";
	if(is_follow){
		order_disabled="disabled";
	}
	
	order_desc=order_desc||"";
	//factory=factory||"";
	tech_detail_list=tech_detail_list||"";
	var i=order_desc.indexOf("<br>");
	var order_no=order_desc.substring(0,i);
	var order_detail=order_desc.substring(i+4,order_desc.length);
	var tasklist=($("#new_tab").find("li"));
	var taskNum=tasklist.length;
	var index=taskNum-1;
	
	$("#new_tab").find("li").removeClass("active");
	$("#new_accordion").find("div").removeClass("active");
	
	var tabli="<li class='active'><a href='#new_task"+taskNum+"' data-toggle='tab' style='font-size: 14px; color: #333;display:inline-block'><span>订单"+taskNum+"</span>"
	+"&nbsp;&nbsp;"+(order_disabled==""?"<i class='fa fa-remove' style='cursor: pointer;color: rgb(218, 208, 208);display:inline-block' onclick='javascript:{if (confirm(\"确认删除？\"))removeTechDetail(this)}'></i>":"")
	+"</a></li>";
	
	$("#new_tab li:eq("+index+")").before(tabli);
	
	var tabContent="<div class=\"tab-pane active\" role=\"tabpanel\" id=\"new_task"+taskNum+"\">";
	tabContent+="<div class=\"panel panel-default\"><div class=\"panel-collapse in\" role=\"tabpanel\">";
	tabContent+="<div class=\"panel-body\"><div><span>订单：</span><input type=\"text\" data-provide=\"typeahead\" class=\"assess_order_no\" id=\"order_"+taskNum+"\" class=\"input-medium\"" +order_disabled+" value=\""+order_no+"\"><span class=\"order_desc\">"+order_detail+"</span></div>";
	tabContent+="</div></div></div>";
	
	$(tabContent).appendTo($("#new_accordion"));
	addTechFactoryDetail(taskNum,tech_detail_list,follow_detail);
	getFuzzyOrder("#order_"+taskNum);
}

/**
 * 
 * @param p
 */
function addTechFactoryDetail(taskNum,tech_detail_list,follow_detail){
	var factory_disable_obj={};
	follow_detail=follow_detail||"";
	$.each(follow_detail.split(";"),function(i,follow){
		var factory=follow.split("||")[0];
		var follow_num=Number(follow.split("||")[1]);
		//alert(follow_num);
		factory_disable_obj[factory]="";
		if(follow_num>0){
			factory_disable_obj[factory]="disabled";
			return false;
		}
	})
	
	
	taskElement="#new_task"+taskNum;
	tech_detail_list=tech_detail_list||"";
	if(tech_detail_list.trim().length>0){
		var tech_detail_arr=tech_detail_list.split(";");
		var content=$("<div id=\"tech_factory_"+taskNum+"\" class=\"tech_factory\"/>");
		$.each(tech_detail_arr,function(i,tech_detail){
			var factory=tech_detail.split("||")[0];
			var tech_info=tech_detail.split("||")[1];
			var tech_obj=new Array();
			$.each(tech_info.split(","),function(i,data){
				var workshop=data.split(":")[0];
				var tech_num=data.split(":")[1];
				tech_obj[workshop]=tech_num;
			})
			var checked="";
			if(tech_info.trim().length>0){
				checked="checked";
			}
			var facotory_div=$("<div><span>"+factory+"</span></div>");
			var ckbox=$("<input style=\"height:30px\" name=\"new_tecn_flag\""+
					" class=\"input-medium\" type=\"checkbox\""+checked+" "+factory_disable_obj[factory]+">");
			var tech_table=$("<table class=\"table table-bordered table-striped\" style=\"margin-bottom: 0px;\"></table>");
			var tr_head=$("<tr><td>自制件</td><td>部件</td><td>焊装</td><td>玻璃钢</td><td>涂装</td><td>底盘</td><td>总装</td><td>检测线</td></tr>");
			var tr_body=$("<tr height='31px'><td>"+(tech_obj['自制件']||'')+"</td><td>"+(tech_obj['部件']||'')+"</td><td>"+
					(tech_obj['焊装']||'')+"</td><td>"+(tech_obj['玻璃钢']||'')+"</td><td>"+(tech_obj['涂装']||'')+"</td><td>"+
					(tech_obj['底盘']||'')+"</td><td>"+(tech_obj['总装']||'')+"</td><td>"+(tech_obj['检测线']||'')+"</td></tr>");
			$(tech_table).append(tr_head).append(tr_body);						
			$(facotory_div).append(ckbox);
			$(ckbox).data("tech_detail",tech_detail);			
			$(content).append(facotory_div);
			$(content).append(tech_table);
	
		})
		$(taskElement).append(content);
		
	}	
}

/*
 * 删除技改任务
 */
function removeTechDetail(p){
	var task_div_id=$(p).parent().attr("href");
	
	var task_pre="new_task";
	// alert(task_div_id);
	var allTabLi = $(p).parent().parent().siblings();	
	$(p).parent().parent().remove();// 删除该tabLi
	$(task_div_id).remove();// 删除对应tab content
	var allTabDiv = $("#new_accordion").find(".tab-pane");
	// 技改任务tab栏重新排序
	var actived=false;
	allTabLi.each(function(index,li){
		if(index>=0){
			var span = $(li).children('a');
			// alert($(span).attr("href"));
			$(span).attr('href',"#"+task_pre+(index+1));
			$(span).find("span").html("订单"+(index+1));
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

//根据技改任务ID查询技改实施范围信息
function getTechList(task_id){
	var conditions="{'task_id':"+task_id+"}";
	var tech_list=[];
	$.ajax({
		url:"techTask!getTechList.action",
		dataType:"json",
		type:"post",
		async:false,
		data:{
			"conditions":conditions
			},
		success:function(response){
			tech_list=response.dataList;
			}
		});
		return tech_list;
}

//输入订单编号，查询工厂订单列表
function getFactoryOrderList(order_no){
	var conditions="{'order_no':'"+order_no+"'}";
	var order_list=[];
	$.ajax({
		url:"techTask!getOrderList.action",
		dataType:"json",
		type:"post",
		async:false,
		data:{
			"conditions":conditions
			},
		success:function(response){
			order_list=response.dataList;
			}
		});
		return order_list;
}

function getFuzzyOrder(elmentId){
	var orderList=new Array();
	$(elmentId).typeahead({
		source : function(input,process){
			var data={
					"conditionMap.orderNo":input
			};		
			return $.ajax({
				url:"common!getOrderFuzzySelect.action",
				dataType : "json",
				type : "get",
				data : data,
				success: function (data) { 
					orderList = data;
					var results = new Array();
					$.each(data, function(index, value) {
						results.push(value.orderNo);
					})
					
					return process(results);
				}
			});
		},
		items : 30,
		highlighter : function(item) {
			var order_name = "";
			var bus_type = "";
			var order_qty = "";
			$.each( orderList, function(index, value) {
				//alert(value.orderNo);
				if (value.orderNo == item) {
					order_name = value.name;
					bus_type = value.busType;
					order_qty = value.orderQty + "台";
				}
			})
			return item + "  " + order_name + " " + bus_type + order_qty;
		},
		matcher : function(item) {
			return true;
		},
		updater : function(item) {
			var order_name = "";
			var bus_type = "";
			var order_qty = "";
			$.each(orderList, function(index, value) {
				if (value.orderNo == item) {
					order_name = value.name;
					bus_type = value.busType;
					order_qty = value.orderQty + "台";
				}
			})
			//alert($(elmentId).closest(".order_desc").html());
			$(elmentId).parent("div").find(".order_desc").html(item + "  " + order_name + " " + bus_type + order_qty);
			var order_list=getFactoryOrderList(item);
			var taskNum=$(".tab-pane.active").attr("id").replace("new_task","");
			$("#tech_factory_"+taskNum).remove();
			
			//alert(taskNum);
			$.each(order_list,function(i,order_detail){
				var order_desc=order_detail.order_desc;
				var tech_detail_list=order_detail.tech_detail_list;
				addTechFactoryDetail(taskNum,tech_detail_list);
			});
			var order_inputs=$(".assess_order_no");
			var return_order=item;
			var tech_factoryId="";
			$.each(order_inputs,function(i,order_input){
				if($(order_input).val()==item&&elmentId!=("#"+$(order_input).attr("id"))){
					//$(elmentId).val("");
					alert("该订单技改范围已经存在，不能重复维护！");
					return_order=null;
					tech_factoryId="#tech_factory_"+elmentId.replace("#order_","");
					$(tech_factoryId).remove();
					$(elmentId).parent("div").find(".order_desc").html("");
					return null;
				}
			})
			
			return return_order;
		}
	});
}

function getTechBusNum(order_no,factory,tech_date,switch_mode,switch_node,node_list){
	var conditions={};
	conditions.order_no=order_no;
	conditions.factory_list=factory;
	conditions.tech_date=tech_date;
	conditions.switch_mode=switch_mode;
	conditions.switch_node=switch_node||"";
	conditions.node_list=node_list||"";
	var data_list=[];
	$.ajax({
		url:"techTask!getTechBusNum.action",
		dataType:"json",
		type:"post",
		async:false,
		data:{
			"conditions":JSON.stringify(conditions)
			},
		success:function(response){
			data_list=response.dataList;
			}
		});
		return data_list;
}

function asessTechTask(){
	var factory_cboxs=$("input[name='new_tecn_flag']");
	var tech_task_id=$("#assessModal").data("tech_task_id");
	var switch_mode=$("input[name='switch_mode']:checked").val();
	var tech_date=$("#assessModal").data("tech_date");
	var switch_node=$("#switch_node").val()||"";
	var node_list="";
	var node_index=switch_node_arr.indexOf(switch_node);
	if(switch_mode=='节点前切换'){
		node_list=switch_node_arr.substring(0,node_index-1)
	}
	if(switch_mode=='节点间切换'){				
		node_list=switch_node_arr.substring(node_index,switch_node_arr.length)
	}
	var conditions=new Array();

	$.each(factory_cboxs,function(i,cbox){
		var factory=$(cbox).parent("div").find("span").html();
		var order_no=$(cbox).parent("div").parent("div").parent("div").find(".assess_order_no").val();
		//alert($(cbox).attr("checked"));
		if($(cbox).attr("checked")=="checked"&& !$(cbox).attr("disabled")){
			var tech_detail_list=[];
			var tb=$(cbox).parent("div").parent("div").find("table");
			var tr_body=$(tb).find("tr").eq(1);
			var tr_head=$(tb).find("tr").eq(0);
			$.each(tr_body.children("td"),function(i,td){
				if(Number($(td).html())>0){
					var detail="";
					var workshop=$(tr_head).find("td").eq(i).html();
					alert(workshop);
					detail=workshop+":"+$(td).html();
					tech_detail_list.push(detail);
				}
			});
			//alert(factory);			
			var obj={};
			obj.tech_task_id=tech_task_id;
			obj.factory_list=factory;
			obj.order_no=order_no;
			obj.switch_mode=switch_mode;
			obj.switch_node=switch_node;
			obj.tech_date=tech_date;
			obj.tech_list=tech_detail_list.toString();
			obj.node_list=node_list;
			conditions.push(obj);
		}
	});
	$.ajax({
		url:"techTask!asessTechTask.action",
		dataType:"json",
		type:"post",
		async:false,
		data:{
			"conditions":JSON.stringify(conditions)
			},
		success:function(response){
			if(response.success){
				alert(response.message);
			   }else{
				   alert("系统异常，分配失败！");
			   }
		    }
		});
	
	
	
}