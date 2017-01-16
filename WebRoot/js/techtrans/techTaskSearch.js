var data_url = "techTask!searchTaskList.action?";

$(document).ready(function(){
	$(".container").width(getWidth());
	initPage();
	// 工厂切换事件
	$("#search_factory").change(function() {
		var selectFactory = $("#search_factory :selected").text();
		getWorkshopSelect_Auth("#search_workshop", null, selectFactory, "noall");
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
	    $table.bootstrapTable({
	        height: getHeight(),
	        url:data_url,
	        striped:true,
	        paginationVAlign:'bottom',
	        searchOnEnterKey:true,
	        fixedColumns: false,			//冻结列
	        fixedNumber: 0,					//冻结列数
	        queryParams:function(params) {
	        	var workshopAll="";
	        	$("#workshop option").each(function(){
	        		workshopAll+=$(this).text()+",";
	        	});
	        	var workshop=$("#search_workshop :selected").text()=="全部"?workshopAll:$("#search_workshop :selected").text();
	        	var conditions={};
	        	conditions.task_content=$("#tech_task_content").val();
	        	conditions.tech_order_no=$("#tech_order_no").val();
	        	conditions.order_no=$("#order_no").val();
	        	conditions.factory=$("#search_factory :selected").text();
	        	conditions.workshop=workshopAll;
	        	conditions.tech_date_start=$("#startDate").val();
	        	conditions.tech_date_end=$("#endDate").val();
	        	conditions.status=$("#taskstatus").val();
	        	
	        	params["conditions"] = JSON.stringify(conditions); 
	        	return params;
	        },
	        columns: [
	        [
	            {
	            	field: 'TASK_CONTENT',title: '技改任务',align: 'center',width:'100px',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
		        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"12px"}};
		        	}
	            },{
	            	field: 'TECH_ORDER_TYPE',title: '变更单<br/>类型',width:'40px',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'TECH_ORDER_NO',title: '技改单号',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'TECH_ORDER_FILE',title: '变更单<br/>附件',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
	    	        formatter:function(value,row,index){
		                    	return "<a href=\""+value+"\" target='_blank'>"+"查看"+"</a>";
		                    }
	            },{
	            	field: 'TECH_DATE',title: '技改单日期',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'DUTY_UNIT',title: '责任单位',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'MAJOR_CHANGE',title: '重大<br/>变更',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'CUSTOM_CHANGE',title: '顾客<br/>变更',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter
	            },{
	            	field: 'CUSTOM_CHANGE_FILE',title: '顾客变更<br/>单附件',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
	    	        formatter:function(value,row,index){
	                    	return "<a href=\""+value+"\" target='_blank'>"+"查看"+"</a>";
	                    }	
	            },{
	            	field: 'REPEAT_CHANGE',title: '重复<br/>变更',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'TECH_TYPE',title: '技改类型',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'SWITCH_MODE',title: '切换方式',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'SWITCH_NODE',title: '切换节点',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'ORDER_DESC',title: '订单',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
	    	      
	            },{
	            	field: 'ECNWH_TOTAL',title: '技改<br/>工厂',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'ECN_PAY_TOTAL',title: '车间',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
	    	        formatter:function(value,row,index){
	                    	return "<a href=\"hrReport!ecnReport.action?staff="+row.staff_number+"&factory="+$("#factory :selected").text()+
	        	        	"&month="+$("#month_start").val()+"\" target='_blank'>"+value.toFixed(2)+"</a>";
	                    }
	            },{
	            	field: 'TMPWH_TOTAL',title: '额外<br/>工时',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'TMP_PAY_TOTAL',title: '额外<br/>工资',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
	    	        formatter:function(value,row,index){
	        	        	return "<a href=\"hrReport!tmpReport.action?staff="+row.staff_number+"&factory="+$("#factory").val()+
	        	        	"&month="+$("#month_start").val()+"\" target='_blank'>"+value.toFixed(2)+"</a>";
	        	        }
	            },{
	            	field: 'WWH_TOTAL',title: '等待<br/>工时',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	field: 'WAIT_PAY_TOTAL',title: '等待<br/>工资',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	}
	            },{
	            	//var piece_salary=parseFloat(piece_pay_total)+parseFloat(ecn_pay_total)+parseFloat(tmp_pay_total)+parseFloat(wait_pay_total);				
	            	field: 'id',title: '计件<br/>工资',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
		        	formatter:function(value, row, index){
	                	var piece_pay_total=row.piece_pay_total==undefined?0:parseFloat(row.piece_pay_total);
	                	var ecn_pay_total=row.ecn_pay_total==undefined?0:parseFloat(row.ecn_pay_total);
	                	var tmp_pay_total=row.tmp_pay_total==undefined?0:parseFloat(row.tmp_pay_total);
	                	var wait_pay_total=row.wait_pay_total==undefined?0:parseFloat(row.wait_pay_total);
	                	var deduct_pay_total=row.deduct_pay_total==undefined?0:parseFloat(row.deduct_pay_total);               	
	                	var piece_salary=parseFloat(piece_pay_total)+parseFloat(ecn_pay_total)+parseFloat(tmp_pay_total)+parseFloat(wait_pay_total);				
	                	return (parseFloat(piece_salary)).toFixed(2);
	                }
	            },{
	            	field: 'DEDUCT_PAY_TOTAL',title: '考核<br/>扣款',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
	                formatter:function(value,row,index){
	                    	return "<a href=\"hr!rewardsCollect.action?staff="+row.staff_number+"&factory="+$("#factory :selected").text()+
	        	        	"&month="+$("#month_start").val()+"\" target='_blank'>"+value.toFixed(2)+"</a>";
	                    }
	            },{
	            	field: 'id',title: '实发计<br/>件工资',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
	                formatter:function(value, row, index){
	                	var piece_pay_total=row.piece_pay_total==undefined?0:parseFloat(row.piece_pay_total);
	                	var ecn_pay_total=row.ecn_pay_total==undefined?0:parseFloat(row.ecn_pay_total);
	                	var tmp_pay_total=row.tmp_pay_total==undefined?0:parseFloat(row.tmp_pay_total);
	                	var wait_pay_total=row.wait_pay_total==undefined?0:parseFloat(row.wait_pay_total);
	                	var deduct_pay_total=row.deduct_pay_total==undefined?0:parseFloat(row.deduct_pay_total);               	
	                	var piece_salary=parseFloat(piece_pay_total)+parseFloat(ecn_pay_total)+parseFloat(tmp_pay_total)+parseFloat(wait_pay_total);				
	                	return (parseFloat(piece_salary)+parseFloat(deduct_pay_total)).toFixed(2);
	                }
	            },{
	            	field: 'id',title: '&nbsp;&nbsp;平均&nbsp;&nbsp;<br/>&nbsp;&nbsp;工资&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
	                sortable: false,visible: true,footerFormatter: totalTextFormatter,
	                cellStyle:function cellStyle(value, row, index, field) {
	    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
	    	        	},
	                formatter:function(value, row, index){
	                	var piece_pay_total=row.piece_pay_total==undefined?0:parseFloat(row.piece_pay_total);
	                	var ecn_pay_total=row.ecn_pay_total==undefined?0:parseFloat(row.ecn_pay_total);
	                	var tmp_pay_total=row.tmp_pay_total==undefined?0:parseFloat(row.tmp_pay_total);
	                	var wait_pay_total=row.wait_pay_total==undefined?0:parseFloat(row.wait_pay_total);
	                	var deduct_pay_total=row.deduct_pay_total==undefined?0:parseFloat(row.deduct_pay_total);               	
	                	var piece_salary=parseFloat(piece_pay_total)+parseFloat(ecn_pay_total)+parseFloat(tmp_pay_total)+parseFloat(wait_pay_total);				
	                	return ((parseFloat(piece_salary)+parseFloat(deduct_pay_total))/row.ATTENDANCE_DAYS).toFixed(2);
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
	        $table.bootstrapTable('resetView', {height: getHeight()});
	    });
	}
	//----------END bootstrap initTable ----------