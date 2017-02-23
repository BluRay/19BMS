var data_url = "techTask!searchTaskList.action?";
$(document).ready(function(){
	$(".container").width(getWidth());
	initPage();
	// 工厂切换事件
	$("#search_factory").change(function() {
		var selectFactory = $("#search_factory :selected").text();
		getWorkshopSelect_Auth("#search_workshop", null, selectFactory, "");
	});
	
	$("#btnQuery").click(function () {
		//$("#btnQuery").attr("disabled","disabled");
		$("#btnSave").attr("disabled","disabled");
		eachSeries(scripts, getScript, initTable);
		ajaxQuery();
    });
	
})
	function initPage(){	
		getAuthorityFactorySelect("#search_factory", "", "noall");
		getWorkshopSelect_Auth("#search_workshop", null, $("#search_factory :selected").text(), "");
		getOrderNoSelect("#order_no","#orderId");

		ajaxQuery();
	};
	
	function ajaxQuery(){
	
		$table.bootstrapTable('refresh', {url: data_url});
	}
	
	//----------START bootstrap initTable ----------
	function initTable() {
		//alert(getHeight());
		
	    $table.bootstrapTable({
	        height: '470',
	        url:data_url,
	        striped:true,
	        sidePagination : "client",
	        responseHandler: function(res){
	             return res.rows;
	        },
	        paginationVAlign:'bottom',
	        searchOnEnterKey:true,
	        fixedColumns: false,			//冻结列
	        fixedNumber: 0,					//冻结列数
	        queryParams:function(params) {
	        	var workshopAll="";
	        	$("#search_workshop option").each(function(){
	        		workshopAll+=$(this).text()+",";
	        	});
	        	var workshop=$("#search_workshop :selected").text()=="全部"?workshopAll:$("#search_workshop :selected").text();
	        	var conditions={};
	        	conditions.task_content=$("#task_content").val();
	        	conditions.tech_order_no=$("#tech_order_no").val();
	        	conditions.order_no=$("#order_no").val();
	        	conditions.factory=$("#search_factory :selected").text();
	        	conditions.workshop_list=workshop;
	        	conditions.tech_date_start=$("#startDate").val();
	        	conditions.tech_date_end=$("#endDate").val();
	        	conditions.workshop_status=$("#taskstatus").val();
	        	
	        	params["conditions"] = JSON.stringify(conditions); 
	        	return params;
	        },
	        columns: [
	        [
	            {
	            	field: 'task_content',title: '技改任务',align: 'center',width:'250',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
		        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"12px"}};
		        	}
	            },{
	            	field: 'tech_order_type',title: '变更单<br/>类型',align: 'center',width:'60',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'tech_order_no',title: '技改单号',align: 'center',width:'180',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'tech_order_file',title: '变更单<br/>附件',align: 'center',width:'60',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
	    	        formatter:function(value,row,index){
	    	        	if(value!=''&&value!=null){
    	        			return "<a href=\""+value+"\" target='_blank'>"+"查看"+"</a>";
    	        			}	
		                }
	            },{
	            	field: 'tech_date',title: '技改单日期',align: 'center',width:'80',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'duty_unit',title: '责任单位',align: 'center',width:'100',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'major_change',title: '重大<br/>变更',align: 'center',width:'50',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'custom_change',title: '顾客<br/>变更',align: 'center',width:'50',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter
	            },{
	            	field: 'custom_change_file',title: '顾客变更<br/>单附件',width:'70',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
	    	        formatter:function(value,row,index){
	    	        		if(value!=''&&value!=null){
	    	        			return "<a href=\""+value+"\" target='_blank'>"+"查看"+"</a>";
	    	        		}	                    	
	                    }	
	            },{
	            	field: 'repeat_change',title: '重复<br/>变更',align: 'center',width:'50',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'tech_type',title: '技改类型',align: 'center',width:'100',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'switch_mode',title: '切换方式',align: 'center',width:'80',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'switch_node',title: '切换<br/>节点',align: 'center',width:'60',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'order_desc',title: '订单',align: 'center',width:'150',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
	    	      
	            },{
	            	field: 'factory',title: '技改<br/>工厂',align: 'center',width:'80',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'workshop',title: '车间',align: 'center',width:'60',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'tech_time',title: '分配<br/>工时',align: 'center',width:'50',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'tech_num',title: '技改<br/>台数',align: 'center',width:'50',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'follow_num',title: '完成<br/>台数',align: 'center',width:'60',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'ready_hour',title: '已录入<br/>工时',align: 'center',width:'60',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{            	
	            	field: '',title: '车号<br/>信息',align: 'center',width:'60',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
	    	        	formatter:function(value,row,index){
	                    	return "<i name=\"edit\" class=\"fa fa-search\" style=\"cursor: pointer;text-align: center;\" onclick=\"getTaskAllSelectedBusNum('"
	                    	+row.order_no+"','"+row.factory+"','"+row.id+"',null,null,'"+row.workshop+"')\">";
	                    }
	            },{
	            	field: '',title: '成本是否<br/>可转移',align: 'center',width:'70',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
	                formatter:function(value,row,index){
	                    	return row.tech_order_type=='ECN'?'否':'是';
	                    }
	            }
	        ]
	    ]
	    });
	    $table.on('load-success.bs.table',function(){
	    	//$("#btnQuery").removeAttr("disabled");
			$("#btnSave").removeAttr("disabled");
	    });
	    $table.on('page-change.bs.table',function(){
	    	//$("#btnQuery").attr("disabled","disabled");
			$("#btnSave").attr("disabled","disabled");
	    });
	    $(window).resize(function () {
	        $table.bootstrapTable('resetView', {height: '470',});
	    });
	}
	//----------END bootstrap initTable ----------
	
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
					"workshop":workshop,
					"bus_status":"all"
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