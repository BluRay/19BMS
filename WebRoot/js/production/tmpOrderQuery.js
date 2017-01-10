var data_url = "tempOrder!orderList.action?";

$(document).ready(function() {
	$(".container").width(getWidth());
	eachSeries(scripts, getScript, initTable);
	initPage();
	
	$("#btnQuery").click(function () {
		ajaxQuery();
    });
	
	$("#q_factory").change(function(e) {
		var eleId = $(e.target).attr("id");
		var selectFactory = $("#" + eleId + " :selected").text();
		var workshopEleId = "#q_workshop";
		getWorkshopSelect_Auth(workshopEleId, null, selectFactory, "");
	});
	
});

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
        	
        	var orderNo=$('#tmp_order_no').val();
        	var reason_content=$('#tmp_reason_content').val();
        	var applyDateStart=$('#create_start').val();
        	var applyDateEnd=$('#create_end').val();
        	var status=$('#status').val();
        	var factory=$("#q_factory :selected").text();
        	var workshopAll="";
        	$("#q_workshop option").each(function(){
        		workshopAll+=$(this).text()+",";
        	});
        	var workshop=$("#q_workshop :selected").text()=="全部"?workshopAll:$("#q_workshop :selected").text();
        	var conditions = "{orderNo:'" + orderNo+"',applyDateStart:'"+applyDateStart+
        					"',applyDateEnd:'"+applyDateEnd+"',status:'"+status+
        					"',factory:'"+factory+"',workshop:'"+workshop+"',reason_content:'"+reason_content+"'}";
        	
        	params["conditions"] = conditions; 
        	return params;
        },
        columns: [
        [
            {
            	field: 'ORDER_SERIAL_NO',title: '派工流水号',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"12px"}};
	        	},
	        	formatter:function(value, row, index){
	        		return "<a href=\"javascript:void(window.open('tempOrder!tempOrderInfoPage.action?tempOrderId="+row.id+
						"','newwindow','width=700,height=600,toolbar= no,menubar=no,scrollbars=no,resizable=no,location=no,status=no,top=150,left=280'))\" style='cusor:pointer'>"+value+"</a>";
	        	}
            },{
            	field: 'REASON_CONTENT',title: '作业原因/内容',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'SAP_ORDER',title: '&nbsp;&nbsp;工单号&nbsp;&nbsp;<br/>',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'TOTAL_QTY',title: '&nbsp;&nbsp;总数量&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'FINISHED_QTY',title: '&nbsp;&nbsp;已完成&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'SINGLE_HOUR',title: '&nbsp;&nbsp;工时&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'LABORS',title: '所需人力',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'TOTAL_HOURS',title: '总工时',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'FACTORY',title: '制作工厂',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	}
            },{
            	field: 'WORKSHOP',title: '制作车间',align: 'center',valign: 'middle',align: 'center',
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
            	field: 'STATUS',title: '状态',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"12px"}};
    	        	},
	        	formatter:function(value, row, index){
	        		var status_arr={"0":"已创建","2":"已分配","3":"已评估","5":"已完成","6":"已驳回"};
	        		var stauts=row.status==undefined?"":status_arr[row.status];
	        		return stauts;
	        	}
            }
        ]
    ]
    });    
    $(window).resize(function () {
        $table.bootstrapTable('resetView', {height: getHeight()});
    });
}
//----------END bootstrap initTable ----------

function initPage(){
	getAuthorityFactorySelect("#q_factory", "", "noall");
	getWorkshopSelect_Auth("#q_workshop", "", $("#q_factory :selected").text(), "");
	$("#status").val("3");
	$("#tempOrder").find(".treemenu").addClass("collapsed");
	$("#tmp_order").addClass("in");
	var span=$("#tempOrder").find(".pull-right.fa");
	if($(span).hasClass("fa-angle-down")){
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}
};

function ajaxQuery(){
	var workshopAll="";
	$("#workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	$table.bootstrapTable('refresh', {url: data_url});
};