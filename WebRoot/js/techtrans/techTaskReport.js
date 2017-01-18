var tab_index = 1;
var data_url = "techTask!checkTaskReport.action?";

$(document).ready(function(){
	$(".container").width(getWidth());
    //eachSeries(scripts, getScript, initTable);
    initPage();
    // 工厂切换事件
	$("#factory").change(
		function() {
			var selectFactory = $("#factory :selected").text();
			getWorkshopSelect_Auth("#workshop", null,selectFactory, "");
		});
	// 车间切换事件
	$("#workshop").change(
		function() {
			var workshop = $("#workshop").val();
			getChildOrgSelect("#group", workshop, "","");
			$("#subgroup").html("<option value=''>全部</option>");
		});
	
	$("#btnQuery").click(function () {
		$("#btnQuery").attr("disabled","disabled");
		ajaxQuery();
    });
	
});
//----------START bootstrap initTable ----------
function initTable() {
    $table.bootstrapTable({
        height: getHeight()-30,
        url:data_url,
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        fixedColumns: false,			//冻结列
        fixedNumber: 0,					//冻结列数
        queryParams:function(params) {        	
        	params["task_content"] = $("#task_content").val();
        	params["tech_order_no"] = $("#tech_order_no").val();
        	params["order_no"] = $("#order_no").val();
        	params["status"] = $("#status").val();
        	params["factory"] = $("#factory").val();
        	params["workshop"] = $("#workshop").val();
        	params["tech_date_start"] = $("#tech_date_start").val();
        	params["tech_date_end"] = $("#tech_date_end").val();   
        	params["tab_index"] = tab_index;	     	
        	return params;
        },
        columns: [
        [
            {
            	field: 'FACTORY',title: '工厂',width:'80',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            },{
            	field: 'TECH_DATE',title: '技改单日期',width:'100',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'ORDER_NO',title: '车型订单',width:'80',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'TECH_ORDER_NO',title: '技改单号',width:'150',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'DUTY_UNIT',title: '责任单位',width:'100',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'TASK_CONTENT',title: '技改任务',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'TECH_LIST',title: '技改台数',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'TIME_LIST',title: '技改工时（H）',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            },{
            	field: 'ID',title: '技改总工时',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	},
	        	formatter:function(value,row,index){
        			var total_hours = 0
	        		if(row.TECH_LIST==''||row.TIME_LIST==''){
	        			return '-';
	        		}else{
		        		tech_str = row.TECH_LIST.replace(/:/g,'":"');
	                    tech_str = tech_str.replace(/,/g,'","');
		        		tech_str = '{"' + tech_str + '"}';
		        		var tech_obj = JSON.parse(tech_str);
		        		time_str = row.TIME_LIST.replace(/:/g,'":"');
		        		time_str = time_str.replace(/,/g,'","');
		        		time_str = '{"' + time_str + '"}';
		        		var time_obj = JSON.parse(time_str);
		        		//自制件
		        		if(typeof(tech_obj.自制件) == "undefined" || typeof(time_obj.自制件) == "undefined"){
		        			total_hours += 0;
		        		}else{
		        			total_hours += tech_obj.自制件*time_obj.自制件;
		        		}
		        		//部件
		        		if(typeof(tech_obj.部件) == "undefined" || typeof(time_obj.部件) == "undefined"){
		        			total_hours += 0;
		        		}else{
		        			total_hours += tech_obj.部件*time_obj.部件;
		        		}
		        		//焊装
		        		if(typeof(tech_obj.焊装) == "undefined" || typeof(time_obj.焊装) == "undefined"){
		        			total_hours += 0;
		        		}else{
		        			total_hours += tech_obj.焊装*time_obj.焊装;
		        		}
		        		//玻璃钢
		        		if(typeof(tech_obj.玻璃钢) == "undefined" || typeof(time_obj.玻璃钢) == "undefined"){
		        			total_hours += 0;
		        		}else{
		        			total_hours += tech_obj.玻璃钢*time_obj.玻璃钢;
		        		}
		        		//涂装
		        		if(typeof(tech_obj.涂装) == "undefined" || typeof(time_obj.涂装) == "undefined"){
		        			total_hours += 0;
		        		}else{
		        			total_hours += tech_obj.涂装*time_obj.涂装;
		        		}
		        		//底盘
		        		if(typeof(tech_obj.底盘) == "undefined" || typeof(time_obj.底盘) == "undefined"){
		        			total_hours += 0;
		        		}else{
		        			total_hours += tech_obj.底盘*time_obj.底盘;
		        		}
		        		//总装
		        		if(typeof(tech_obj.总装) == "undefined" || typeof(time_obj.总装) == "undefined"){
		        			total_hours += 0;
		        		}else{
		        			total_hours += tech_obj.总装*time_obj.总装;
		        		}
		        		//检测线
		        		if(typeof(tech_obj.检测线) == "undefined" || typeof(time_obj.检测线) == "undefined"){
		        			total_hours += 0;
		        		}else{
		        			total_hours += tech_obj.检测线*time_obj.检测线;
		        		}
	        		}
	        		return total_hours + "H";
	        	}
            },{
            	field: 'TECH_SINGLE_PRICE',title: '工时单价',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
    	        	return {css: {"padding-left": "2px", "padding-right": "2px","font-size":"13px"}};
    	        	}
            }
        ]
    ]
    });
    $table.on('load-success.bs.table',function(){
    	$("#btnQuery").removeAttr("disabled");
    });
    $table.on('page-change.bs.table',function(){
    	$("#btnQuery").attr("disabled","disabled");
    });
    $(window).resize(function () {
        $table.bootstrapTable('resetView', {height: getHeight()-30});
    });
}
function initTable2() {
    $table2.bootstrapTable({
        height: getHeight()-30,
        url:data_url,
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        fixedColumns: false,			//冻结列
        fixedNumber: 0,					//冻结列数
        queryParams:function(params) {        	
        	params["task_content"] = $("#task_content").val();
        	params["tech_order_no"] = $("#tech_order_no").val();
        	params["order_no"] = $("#order_no").val();
        	params["status"] = $("#status").val();
        	params["factory"] = $("#factory").val();
        	params["workshop"] = $("#workshop").val();
        	params["tech_date_start"] = $("#tech_date_start").val();
        	params["tech_date_end"] = $("#tech_date_end").val();        
        	params["tab_index"] = tab_index;	
        	return params;
        },
        columns: [
        [
            {
            	field: 'FACTORY',title: '工厂',width:'80',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px","font-size":"13px"}};
	        	}
            }
        ]
    ]
    });
    $table2.on('load-success.bs.table',function(){
    	$("#btnQuery").removeAttr("disabled");
    });
    $table2.on('page-change.bs.table',function(){
    	$("#btnQuery").attr("disabled","disabled");
    });
    $(window).resize(function () {
        $table2.bootstrapTable('resetView', {height: getHeight()-30});
    });
}
//----------END bootstrap initTable ----------

function initPage(){
	getAuthorityFactorySelect("#factory", "", "noall");
	var selectFactory = $("#factory :selected").text();
	var defaultWorkshop=$("#d_workshop").val();
	var defaultWorkgourp=$("#d_workgroup").val();
	getWorkshopSelect_Auth("#workshop", defaultWorkshop, selectFactory, "");
	var workshop = $("#workshop").val();
	getChildOrgSelect("#group", workshop, defaultWorkgourp, "");

	// 展开侧边栏
	//$("#hrPiece").find(".treemenu").addClass("collapsed");
	//$("#hr_pecie").addClass("in");
	var span=$("#hrPiece").find(".pull-right.fa");
	if($(span).hasClass("fa-angle-down")){
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}
}

function ajaxQuery(){
	if(tab_index==1){
		eachSeries(scripts, getScript, initTable);
	}
	if(tab_index==2){
		eachSeries(scripts, getScript, initTable2);
	}
	$table.bootstrapTable('refresh', {url: data_url});
	$table2.bootstrapTable('refresh', {url: data_url});
}

function change_tab(index){
	tab_index = index;
	if(index===1){
		$("#tab_1").show();
		$("#tab_2").hide();
	}
	if(index===2){
		$("#tab_2").show();
		$("#tab_1").hide();
	}
	ajaxQuery();
}