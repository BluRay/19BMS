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
    $table.bootstrapTable({
        height: getHeight(),
        columns: [
        [
            {
            	field: 'id',title: '月份',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '工号',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '姓名',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '车间',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '班组',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '小班组',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '岗位',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '在职',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '出勤<br/>天数',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '出勤<br/>小时数',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '计件<br/>产量',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '补贴车',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '纯计件<br/>工资',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '技改<br/>工时',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '技改<br/>工资',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '额外<br/>工时',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '额外<br/>工资',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '等待<br/>工时',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '等待<br/>工资',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '计件<br/>工资',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '考核<br/>扣款',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '实发计<br/>件工资',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '平均<br/>日薪',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '状态',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '操作人',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: false,footerFormatter: totalTextFormatter
            },{
            	field: 'id',title: '操作时间',width:'60px',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: false,footerFormatter: totalTextFormatter
            }
        ]
    ]
    });
    // sometimes footer render error.
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