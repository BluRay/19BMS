var cDate="";//当前月份
var wDate="";//上一月份
var llDate="";//上上个月份
var month_start= null;
var month_end = null;
var email_list=new Array();
var data_url = "hrReport!getSubmitSalaryList.action?";

$(document).ready(function(){
	
	$(".container").width(getWidth());
    var scripts = [
            location.search.substring(1) || 'js/bootstrap-table.js',
            'js/bootstrap-table-export.js','js/tableExport.js',
            'js/bootstrap-table-editable.js','js/bootstrap-editable.js'
        ],
        eachSeries = function (arr, iterator, callback) {
            callback = callback || function () {};
            if (!arr.length) {return callback();}
            var completed = 0;
            var iterate = function () {
                iterator(arr[completed], function (err) {
                    if (err) {callback(err);callback = function () {};}
                    else {completed += 1;if (completed >= arr.length) {callback(null);}else {iterate();}}
                });
            };
            iterate();
        };
    eachSeries(scripts, getScript, initTable);
    
    initPage();
    // 工厂切换事件
	$("#factory").change(
		function() {
			var selectFactory = $("#factory :selected").text();
			getWorkshopSelect_Auth("#workshop", null,selectFactory, "");
			getChildOrgSelect("#group", workshop, "","");
			$("#subgroup").html("<option value=''>全部</option>");
		});
	// 车间切换事件
	$("#workshop").change(
		function() {
			var workshop = $("#workshop").val();
			getChildOrgSelect("#group", workshop, "","");
			$("#subgroup").html("<option value=''>全部</option>");
		});
	// 班组切换事件
	$("#group").change(function() {
		var group = $("#group").val();
		getChildOrgSelect("#subgroup", group, "", "noall");
	});
	
	$("#btnQuery").click(function () {
		ajaxQuery();
    });
});
function getScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = url;
    var done = false;
    script.onload = script.onreadystatechange = function() {
        if (!done && (!this.readyState ||this.readyState == 'loaded' || this.readyState == 'complete')) {
            done = true;
            if (callback)
            	callback();
            	script.onload = script.onreadystatechange = null;
        }
    };
    head.appendChild(script);
    return undefined;
}
function initTable() {
	console.log("---->data_url = " + data_url);
    $table.bootstrapTable({
        height: getHeight(),
        url:data_url,
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        queryParams:function(params) {
        	var workshopAll="";
        	$("#workshop option").each(function(){
        		workshopAll+=$(this).text()+",";
        	});
        	var workshop=$("#workshop :selected").text()=="全部"?workshopAll:$("#workshop :selected").text();
        	var workgroup=$("#group :selected").text()=="全部"?"":$("#group :selected").text();
        	var team=$("#subgroup :selected").text()=="全部"?"":$("#subgroup :selected").text();
        	var conditions="{factory:'"+$("#factory :selected").text()+"',workshop:'"+workshop
        		+"',workgroup:'"+workgroup+"',staff:'"+$("#staff").val()+
        		"',team:'"+team+ "',monthStart:'"+$("#month_start").val()+"',monthEnd:'"+$("#month_end").val()+"'}";
        	params["conditions"] = conditions; 
        	return params;
        },
        columns: [
        [
            {
            	field: 'MONTH',title: '月份',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'STAFF_NUMBER',title: '工号',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'STAFF_NAME',title: '&nbsp;&nbsp;姓名&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'WORKSHOP_ORG',title: '车间',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'WORKGROUP_ORG',title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;班组&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'TEAM_ORG',title: '&nbsp;&nbsp;&nbsp;小班组&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'JOB',title: '岗位',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'STAFF_STATUS',title: '在职',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'ATTENDANCE_DAYS',title: '出勤<br/>天数',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'ATTENDANCE_HOURS',title: '出勤<br/>小时数',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'PIECE_TOTAL',title: '计件<br/>产量',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'BONUS_TOTAL',title: '补贴车',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'PIECE_PAY_TOTAL',title: '纯计件<br/>工资',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'ECNWH_TOTAL',title: '技改<br/>工时',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'ECN_PAY_TOTAL',title: '技改<br/>工资',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'TMPWH_TOTAL',title: '额外<br/>工时',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'TMP_PAY_TOTAL',title: '额外<br/>工资',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'WWH_TOTAL',title: '等待<br/>工时',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'WAIT_PAY_TOTAL',title: '等待<br/>工资',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'PIECE_SALARY',title: '计件<br/>工资',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'DEDUCT_PAY_TOTAL',title: '考核<br/>扣款',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '实发计<br/>件工资',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter,
                formatter:function(value, row, index){
                	var data = $table.bootstrapTable('getData');
                	console.log("---->data : id = " + row.id);
                	return value;
                }
            },{
            	field: 'id',title: '平均<br/>日薪',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '状态',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '操作人',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: false,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '操作时间',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: false,footerFormatter: totalTextFormatter
            }
        ]
    ]
    });
    setTimeout(function () {$table.bootstrapTable('resetView');}, 200);
    $table.on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table', function () {
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
        selections = getIdSelections();
    });
    $table.on('expand-row.bs.table', function (e, index, row, $detail) {
        if (index % 2 == 1) {
            $detail.html('正在查询...');
            $.get('LICENSE', function (res) {$detail.html(res.replace(/\n/g, '<br>'));});
        }
    });
    $table.on('all.bs.table', function (e, name, args) {console.log(name, args);});
    $remove.click(function () {
        var ids = getIdSelections();
        $table.bootstrapTable('remove', {field: 'id',values: ids});
        $remove.prop('disabled', true);
    });
    $(window).resize(function () {
        $table.bootstrapTable('resetView', {height: getHeight()});
    });
}
function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {return row.id});
}
function responseHandler(res) {
    $.each(res.rows, function (i, row) {row.state = $.inArray(row.id, selections) !== -1;});return res;
}
function detailFormatter(index, row) {
    var html = [];
    $.each(row, function (key, value) {html.push('<p><b>' + key + ':</b> ' + value + '</p>');});
    return html.join('');
}
function operateFormatter(value, row, index) {
    return ['<a class="remove" href="javascript:void(0)" title="Remove">','<i class="glyphicon glyphicon-remove"></i>','</a>'].join('');
}
window.operateEvents = {
    'click .like': function (e, value, row, index) {alert('You click like action, row: ' + JSON.stringify(row));},
    'click .remove': function (e, value, row, index) {ajaxDel(row.id);}
};
function totalTextFormatter(data) {return 'Total';}
function totalNameFormatter(data) {return data.length;}
function totalPriceFormatter(data) {
    var total = 0;
    $.each(data, function (i, row) {total += +(row.price.substring(1));});
    return '$' + total;
}
function getHeight() {return $(window).height() - 220;}
function getWidth() {return $(window).width()-220;}
//----------END bootstrap Table ----------

function initPage(){
	getAuthorityFactorySelect("#factory", "", "noall");
	var selectFactory = $("#factory :selected").text();
	var defaultWorkshop=$("#d_workshop").val();
	var defaultWorkgourp=$("#d_workgroup").val();
	var defaultTeam=$("#d_team").val();
	getWorkshopSelect_Auth("#workshop", defaultWorkshop, selectFactory, "");
	var workshop = $("#workshop").val();
	getChildOrgSelect("#group", workshop, defaultWorkgourp, "");
	var group = $("#group").val();
	getChildOrgSelect("#subgroup", group, defaultTeam, "");
	var d = new Date();
	var eYear = d.getFullYear();
	var eMon = d.getMonth();
	var llMon= d.getMonth()-1;
	var ceMon= d.getMonth()+1;
	if(eMon==0){
		wDate=(eYear-1)+"-"+(12);
	}else
	wDate=(eYear)+"-"+(eMon<10?"0"+eMon:eMon);
	cDate=(eYear)+"-"+(ceMon<10?"0"+ceMon:ceMon);
	if(llMon==-1){
		llDate=(eYear-1)+"-"+(11);
	}else if(llMon==0){
		llDate=(eYear-1)+"-"+(12);
	}else
	llDate=(eYear)+"-"+(llMon<10?"0"+llMon:llMon);
	
	$("#month_start").val(wDate);
	$("#month_end").val(wDate).attr("disabled",true);
	// 展开侧边栏
	$("#hrPiece").find(".treemenu").addClass("collapsed");
	$("#hr_pecie").addClass("in");
	var span=$("#hrPiece").find(".pull-right.fa");
	if($(span).hasClass("fa-angle-down")){
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}
}

function changeMonth(){
	if($(month_start).val()==wDate ){
		$("#month_end").val(wDate).attr("disabled",true);
	}else if($(month_start).val()==cDate ){
		$("#month_end").val(cDate).attr("disabled",true);
	}else{
		WdatePicker({'dateFmt':'yyyy-MM','maxDate':llDate,'el':'month_end'});
		$("#month_end").val(llDate);
		$("#month_end").attr("disabled",false);
	}	
	if($("#month_start").val()!=wDate&&$("#month_start").val()!=cDate){
		$("#btnReject").css("display","none");
		$("#btnSave").css("display","none");
	}else{
		$("#btnReject").css("display","");
		$("#btnSave").css("display","");
	}	
}

function ajaxQuery(){
	var workshopAll="";
	$("#workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	$table.bootstrapTable('refresh', {url: data_url});
}
