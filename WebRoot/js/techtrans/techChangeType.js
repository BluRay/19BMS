var data_url="techTask!getChangeTypeReportData.action";
$(document).ready(function(){
	initPage();
	
	$("#btnQuery").click(function () {
		//$("#btnQuery").attr("disabled","disabled");
		$("#btnSave").attr("disabled","disabled");
		ajaxQuery();
    });
	
	$("a[role='tab']").live('click',function(e){
		ajaxQuery();
	});
	
});

function initPage(){
	getAuthorityFactorySelect("#factory", "", "");
	getOrderNoSelect("#order_number","#orderId");
	//ajaxQuery();
}

function ajaxQuery(){
	/*initTable();*/
	$table.bootstrapTable('destroy'); 
	initTable();
	//$table.bootstrapTable('refresh', {url: data_url});
}

//----------START bootstrap initTable ----------
function initTable() {
	var report_demt=$("ul.nav.nav-pills").find("li.active").find("a").html();
	//alert(report_demt);
	var columns=[];
	if(report_demt=="工厂维度"){
		columns=[
		         [
		            {
		            	field: 'task_content',title: '技改任务',align: 'center',width:'250',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
			        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"12px"}};
			        	}
		            },{
		            	field: 'tech_order_no',title: '技改单号',align: 'center',width:'150',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'tech_date',title: '技改单日期',align: 'center',width:'100',valign: 'middle',align: 'center',
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
		            	field: 'factory',title: '技改<br/>工厂',align: 'center',width:'100',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'time_list',title: '分配<br/>工时',align: 'center',width:'250',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'tech_list',title: '技改<br/>台数',align: 'center',width:'250',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'total_time',title: '工厂总<br/>计改工时',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'custom_change_no',title: '顾客变更<br/>单号',align: 'center',width:'80',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            }
		        ]
		    ];
	}else{
		columns=[
		         [
		            {
		            	field: 'task_content',title: '技改任务',align: 'center',width:'250',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
			        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"12px"}};
			        	}
		            },{
		            	field: 'tech_order_no',title: '技改单号',align: 'center',width:'180',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'tech_date',title: '技改单日期',align: 'center',width:'80',valign: 'middle',align: 'center',
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
		            	field: 'total_time',title: '订单总<br/>计改工时',align: 'center',width:'70',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            },{
		            	field: 'custom_change_no',title: '顾客变更<br/>单号',align: 'center',width:'70',valign: 'middle',align: 'center',
		                sortable: false,visible: true,footerFormatter: totalTextFormatter,
		                cellStyle:function cellStyle(value, row, index, field) {
		    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
		    	        	}
		            }
		        ]
		    ];
	}
	
	//alert(getHeight());
    $table.bootstrapTable({
        height: '450',
        url:data_url,
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        fixedColumns: false,			//冻结列
        fixedNumber: 0,				//冻结列数
        sidePagination : "client",
        responseHandler: function(res){
             return res.rows;
        },
        queryParams:function(params) {
        	
        	var conditions={};
        	conditions.change_type=$("#change_type").val();
        	conditions.order_no=$("#order_number").val();
        	conditions.factory=$("#factory :selected").text();
        	conditions.tech_date_start=$("#startDate").val();
        	conditions.tech_date_end=$("#endDate").val();
        	conditions.group_by_flg=report_demt;
        	params["conditions"] = JSON.stringify(conditions); 
        	return params;
        },
        columns: columns
    });

    $(window).resize(function () {
        $table.bootstrapTable('resetView', {height: '450'});
    });
}
//----------END bootstrap initTable ----------