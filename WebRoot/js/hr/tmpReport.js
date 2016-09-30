var curTab='临时派工单维度';
$(document).ready(function() {
	initPage();
	// 工厂切换事件
	$("#factory").change(function() {
		var selectFactory = $("#factory :selected").text();
		getWorkshopSelect_Auth("#workshop", null, selectFactory, "");
		getChildOrgSelect("#group", workshop, "", "");
		$("#subgroup").html("<option value=''>全部</option>");
	});
	// 车间切换事件
	$("#workshop").change(function() {
		var workshop = $("#workshop").val();
		getChildOrgSelect("#group", workshop, "", "");
		$("#subgroup").html("<option value=''>全部</option>");
	});
	// 班组切换事件
	$("#group").change(function() {
		var group = $("#group").val();
		getChildOrgSelect("#subgroup", group, "", "");
	});

	$("#btnQuery").click(function() {
		if ($('#peopleDimensionDiv').css('display') == 'none') {
			ajaxQuery();
		} else {
			ajaxQuery1();
		}

	});
	/*
	 * $("#export").click(function(){ ajaxQuery(0,"all")
	 * htmlToExcel("tableResultAll", "", "","计件工资明细","计件工资明细"); return false;
	 * });
	 */

	$("#new_tab li").click(function() {
		if ($(this).hasClass("active")) {
			//
		} else {
			/*
			 * $("#humanDetailTable tbody").html(''); $("#countTable
			 * tbody").html(''); //alert($(this).text());
			 * $(this).parent().find('li').removeClass('active');
			 * $(this).addClass('active');
			 * //ajaxQueryStandardHumans(zTreeObj.getSelectedNodes()[0].id,$(this).text().replace(/[^\d]/g,''),$("#busTypeTab
			 * .active").find('a').eq(0).attr('bus_id'));
			 * if(zTreeObj.getSelectedNodes()[0].org_kind==0){
			 * ajaxQueryStandardHumans1(zTreeObj.getSelectedNodes()[0].id,$(this).text().replace(/[^\d]/g,''));
			 * }else if(zTreeObj.getSelectedNodes()[0].org_kind==1){
			 * ajaxQueryStandardHumans(zTreeObj.getSelectedNodes()[0].id,$(this).text().replace(/[^\d]/g,''),$("#busTypeTab
			 * .active").find('a').eq(0).attr('bus_id')); }
			 */
			// alert($(this).text());
			curTab=$(this).text();
			if ($(this).text() == '临时派工单维度') {
				$('#peopleDimensionDiv').css('display', 'none');
				$('#workDimensionDiv').css('display', '');
				$("#export").css("style","none");
				ajaxQuery();
			} else if ($(this).text() == '人员维度') {
				$('#workDimensionDiv').css('display', 'none');
				$('#peopleDimensionDiv').css('display', '');
				$("#export").css("style","");
				ajaxQuery1();
			}
		}
	});
	
$("#export").click(function(){ 
		if(curTab=='临时派工单维度'){
			htmlToExcel("workDimensionTable", "", "","额外工时统计","额外工时统计"); 
		}else
			htmlToExcel("peopleDimensionTable", "", "","额外工时统计","额外工时统计"); 
		return false;
	});
})

function initPage() {
	$("#export").hide();
	pageSize = 20;
	getAuthorityFactorySelect("#factory", "", "noall");
	var selectFactory = $("#factory :selected").text();
	var defaultWorkshop = $("#d_workshop").val();
	var defaultWorkgourp = $("#d_workgroup").val();
	var defaultTeam = $("#d_team").val();
	getWorkshopSelect_Auth("#workshop", defaultWorkshop, selectFactory, "");
	// $("#workshop").attr("disabled",true);
	var workshop = $("#workshop").val();
	getChildOrgSelect("#group", workshop, defaultWorkgourp, "");
	var group = $("#group").val();
	getChildOrgSelect("#subgroup", group, defaultTeam, "");

	var d = new Date();
	/*
	 * var eYear = d.getFullYear(); var eMon = d.getMonth(); if(eMon==0){
	 * wDate=(eYear-1)+"-"+(12); }else wDate=(eYear)+"-"+(eMon<10?"0"+eMon:eMon);
	 * $("#month_start").val(wDate); $("#month_end").val(wDate);
	 */
	$("#date_start").val(formatDate(d));
	$("#date_end").val(formatDate(d));
	// 展开侧边栏
	$("#hrPiece").find(".treemenu").addClass("collapsed");
	$("#hr_pecie").addClass("in");
	var span = $("#hrPiece").find(".pull-right.fa");
	if ($(span).hasClass("fa-angle-down")) {
		$(span).removeClass("fa-angle-down").addClass("fa-angle-up");
	}

	ajaxQuery();
	getStaffInfoFuzzySelect();
}

function ajaxQuery() {
	$(".divLoading").addClass("fade in").show();
	var workshopAll="";
	$("#workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	var conditions = "{factory:'"
			+ $("#factory").find("option:selected").text()
			+ "',workshop:'"
			+ ($("#workshop").find("option:selected").text() == '全部' ? workshopAll : $(
					"#workshop").find("option:selected").text())
			+ "',workgroup:'"
			+ ($("#group").find("option:selected").text() == '全部' ? '' : $(
					"#group").find("option:selected").text())
			+ "',team:'"
			+ ($("#subgroup").find("option:selected").text() == '全部' ? '' : $(
					"#subgroup").find("option:selected").text())
			+ "',dateStart:'" + $("#date_start").val() + "',dateEnd:'"
			+ $("#date_end").val() + "',staff:'" + $("#staff").val()
			+ "',reason_content:'" + $("#reason_content").val()
			+ "'}";

	/*
	 * if(queryAll=="all"){ data={ "conditions" : conditions, "pager":null }
	 * table=$("#tableResultAll tbody"); }else{ data={ "conditions" :
	 * conditions, "pager.pageSize" : 20, "pager.curPage" : targetPage || 1 }
	 * table=$("#tableResult tbody"); }
	 */
	data = {
		"conditions" : conditions
	}
	table = $("#workDimensionTable tbody");
	$(table).html("");
	$.ajax({
		url : "hrReport!getTmpReportData.action",
		dataType : "json",
		async : true,
		type : "get",
		data : data,
		success : function(response) {
			
			var flg=null;
			var hourscount=0;
			var salarycount=0;
			var realhourscount=0;
			var count=0;
			$.each(response.tmpReportData, function(index, salary) {
				var tr = $("<tr />");
				$("<td style = 'vertical-align:top'/>").html(salary.tmp_order_num + "：" + salary.reason_content).appendTo(tr);
				$("<td />").html(parseFloat(salary.totalhours).toFixed(2)).appendTo(tr);
				$("<td />").html(parseFloat(salary.totalprice).toFixed(2)).appendTo(tr);
				$("<td />").html(salary.work_date).appendTo(tr);
				$("<td />").html(salary.staff_number).appendTo(tr);
				$("<td nowrap='nowrap' />").html(salary.staff_name).appendTo(tr);
				$("<td nowrap='nowrap' />").html(salary.job).appendTo(tr);
				$("<td nowrap='nowrap' />").html(salary.plant_org).appendTo(tr);
				$("<td nowrap='nowrap' />").html(salary.workshop_org).appendTo(tr);
				$("<td nowrap='nowrap' />").html(salary.workgroup_org).appendTo(tr);
				$("<td nowrap='nowrap' />").html(salary.team_org).appendTo(tr);
				$("<td />").html(salary.real_work_hour).appendTo(tr);
				$("<td />").html(salary.work_hour).appendTo(tr);
				$("<td />").html(salary.salary).appendTo(tr);
				count++;
				$(table).append(tr);
				
				if(flg==null){
					flg=salary.tmp_order_num;
					hourscount += parseFloat(salary.work_hour==null?0:salary.work_hour);
					salarycount += parseFloat(salary.salary==null?0:salary.salary);
					realhourscount += parseFloat(salary.real_work_hour==null?0:salary.real_work_hour);
				}else{
					if(flg==salary.tmp_order_num){
						//
					}else{
						var tr1 = $("<tr />");
						$("<td />").html('合计').appendTo(tr1);
						$("<td colspan='10'/>").html('').appendTo(tr1);
						$("<td />").html("<b>"+realhourscount.toFixed(2)+"</b>").appendTo(tr1);
						$("<td />").html("<b>"+hourscount.toFixed(2)+"</b>").appendTo(tr1);
						$("<td />").html("<b>"+salarycount.toFixed(2)+"</b>").appendTo(tr1);
						tr.before(tr1);
						flg=salary.tmp_order_num;
						hourscount=0;
						salarycount=0;
						realhourscount=0;
					}
					hourscount += parseFloat(salary.work_hour==null?0:salary.work_hour);
					salarycount += parseFloat(salary.salary==null?0:salary.salary);
					realhourscount += parseFloat(salary.real_work_hour==null?0:salary.real_work_hour);
				}
			});
			
			var tr1 = $("<tr />");
			$("<td />").html('合计').appendTo(tr1);
			$("<td colspan='10'/>").html('').appendTo(tr1);
			$("<td />").html("<b>"+realhourscount.toFixed(2)+"</b>").appendTo(tr1);
			$("<td />").html("<b>"+hourscount.toFixed(2)+"</b>").appendTo(tr1);
			$("<td />").html("<b>"+salarycount.toFixed(2)+"</b>").appendTo(tr1);
			$(table).append(tr1);
			/*
			 * if(queryAll!="all"){ $("#total").html(response.pager.totalCount);
			 * $("#total").attr("total", response.pager.totalCount);
			 * $("#cur").attr("page", response.pager.curPage); $("#cur").html( "<a
			 * href=\"#\">" + response.pager.curPage + "</a>");
			 * $("#pagination").show(); }
			 */

			/*
			 * $('#workDimensionTable').dataTable({ "order" : false, "paging" :
			 * false, "searching" : false, "language" : { "sProcessing" :
			 * "处理中...", "sLengthMenu" : "显示 _MENU_ 项结果", "sZeroRecords" :
			 * "没有匹配结果", "sInfo" : "显示第_START_ 至 _END_ 项结果，共 _TOTAL_ 项",
			 * "sInfoEmpty" : "显示第 0 至 0 项结果，共0 项", "sInfoFiltered" : "(由 _MAX_
			 * 项结果过滤)", "sInfoPostFix" : "", "sSearch" : "搜索:", "sUrl" : "",
			 * "sEmptyTable" : "表中数据为空", "sLoadingRecords" : "载入中...",
			 * "sInfoThousands" : ",", "oPaginate" : { "sFirst" : "首页",
			 * "sPrevious" : "上页", "sNext" : "下页", "sLast" : "末页" }, "oAria" : {
			 * "sSortAscending" : ": 以升序排列此列", "sSortDescending" : ": 以降序排列此列" } }
			 * });
			 */
			/*
			 * $('#workDimensionTable').rowspan(0);
			 * $('#workDimensionTable').rowspan(1);
			 * $('#workDimensionTable').rowspan(2);
			 * $('#workDimensionTable').rowspan(3);
			 * $('#workDimensionTable').rowspan(4);
			 */
			/*
			 * $('#workDimensionTable').on( 'draw.dt', function () {
			 * //$('#workDimensionTable').RevertTable();
			 * mc('workDimensionTable',0,0,0); } );
			 */

			/*_w_table_rowspan('#workDimensionTable', 1);
			_w_table_rowspan('#workDimensionTable', 2);
			_w_table_rowspan('#workDimensionTable', 3);
			_w_table_rowspan('#workDimensionTable', 4);
			_w_table_rowspan('#workDimensionTable', 5);*/
			
			try { 
				mc('workDimensionTable',0,0,0);
			} catch (ex){
				//alert("Too much recursion!");
			}
			//added by xjw 160510 导出excel
			/*$("#export").hide();*/
			//added by xjw 160510 导出excel
			$("#total").html(count);
			$("#export").show();
			//分页
			pagination('workDimensionTable',5);
			$(".divLoading").hide();
		}
	});
}

function ajaxQuery1() {
	$(".divLoading").addClass("fade in").show();
	var workshopAll="";
	$("#workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	var conditions = "{factory:'"
		+ $("#factory").find("option:selected").text()
		+ "',workshop:'"
		+ ($("#workshop").find("option:selected").text() == '全部' ? workshopAll : $(
				"#workshop").find("option:selected").text())
		+ "',workgroup:'"
		+ ($("#group").find("option:selected").text() == '全部' ? '' : $(
				"#group").find("option:selected").text())
		+ "',team:'"
		+ ($("#subgroup").find("option:selected").text() == '全部' ? '' : $(
				"#subgroup").find("option:selected").text())
		+ "',dateStart:'" + $("#date_start").val() + "',dateEnd:'"
		+ $("#date_end").val() + "',staff:'" + $("#staff").val()
		+ "',reason_content:'" + $("#reason_content").val()
		+ "'}";

	/*
	 * if(queryAll=="all"){ data={ "conditions" : conditions, "pager":null }
	 * table=$("#tableResultAll tbody"); }else{ data={ "conditions" :
	 * conditions, "pager.pageSize" : 20, "pager.curPage" : targetPage || 1 }
	 * table=$("#tableResult tbody"); }
	 */
	data = {
		"conditions" : conditions
	}
	table = $("#peopleDimensionTable tbody");
	$(table).html("");
	$.ajax({
		url : "hrReport!getTmpReportData1.action",
		dataType : "json",
		async : true,
		type : "get",
		data : data,
		success : function(response) {
			var count=1;
			var flg=null;
			var hourscount=0;
			var salarycount=0;
			var realhourscount=0;
			$.each(response.tmpReportData, function(index, salary) {
				var tr = $("<tr />");
				$("<td />").html(salary.staff_number).appendTo(tr);
				$("<td nowrap='nowrap' />").html(salary.staff_name).appendTo(tr);
				$("<td nowrap='nowrap' />").html(salary.job).appendTo(tr);
				$("<td nowrap='nowrap' />").html(salary.team_org).appendTo(tr);
				$("<td nowrap='nowrap' />").html(salary.workgroup_org).appendTo(tr);
				$("<td nowrap='nowrap' />").html(salary.workshop_org).appendTo(tr);
				$("<td nowrap='nowrap' />").html(salary.plant_org).appendTo(tr);
				/*$("<td />").html(salary.skill_parameter).appendTo(tr);*/
				$("<td />").html(salary.work_date).appendTo(tr);
				$("<td />").html(salary.tmp_order_num).appendTo(tr);
				$("<td />").html(salary.totalhours).appendTo(tr);
				$("<td />").html(salary.real_work_hour).appendTo(tr);
				$("<td />").html(salary.work_hour).appendTo(tr);
				$("<td />").html(salary.salary).appendTo(tr);

				$(table).append(tr);
				
				if(flg==null){
					flg=salary.staff_number;
					hourscount += parseFloat(salary.work_hour==null?0:salary.work_hour);
					salarycount += parseFloat(salary.salary==null?0:salary.salary);
					realhourscount += parseFloat(salary.real_work_hour==null?0:salary.real_work_hour);
				}else{
					if(flg==salary.staff_number){
						//
					}else{
						var tr1 = $("<tr />");
						$("<td />").html('合计').appendTo(tr1);
						$("<td colspan='9'/>").html('').appendTo(tr1);
						$("<td />").html("<b>"+realhourscount.toFixed(2)+"</b>").appendTo(tr1);
						$("<td />").html("<b>"+hourscount.toFixed(2)+"</b>").appendTo(tr1);
						$("<td />").html("<b>"+salarycount.toFixed(2)+"</b>").appendTo(tr1);
						tr.before(tr1);
						flg=salary.staff_number;
						hourscount=0;
						salarycount=0;
						realhourscount=0;
						count++
					}
					hourscount += parseFloat(salary.work_hour==null?0:salary.work_hour);
					salarycount += parseFloat(salary.salary==null?0:salary.salary);
					realhourscount += parseFloat(salary.real_work_hour==null?0:salary.real_work_hour);
				}
				//alert(index)
			});
			var tr1 = $("<tr />");
			$("<td />").html('合计').appendTo(tr1);
			$("<td colspan='9'/>").html('').appendTo(tr1);
			$("<td />").html("<b>"+realhourscount.toFixed(2)+"</b>").appendTo(tr1);
			$("<td />").html("<b>"+hourscount.toFixed(2)+"</b>").appendTo(tr1);
			$("<td />").html("<b>"+salarycount.toFixed(2)+"</b>").appendTo(tr1);
			$(table).append(tr1);
			
			/*
			 * if(queryAll!="all"){ $("#total").html(response.pager.totalCount);
			 * $("#total").attr("total", response.pager.totalCount);
			 * $("#cur").attr("page", response.pager.curPage); $("#cur").html( "<a
			 * href=\"#\">" + response.pager.curPage + "</a>");
			 * $("#pagination").show(); }
			 */

			/*
			 * $('#workDimensionTable').dataTable({ "order" : false, "paging" :
			 * false, "searching" : false, "language" : { "sProcessing" :
			 * "处理中...", "sLengthMenu" : "显示 _MENU_ 项结果", "sZeroRecords" :
			 * "没有匹配结果", "sInfo" : "显示第_START_ 至 _END_ 项结果，共 _TOTAL_ 项",
			 * "sInfoEmpty" : "显示第 0 至 0 项结果，共0 项", "sInfoFiltered" : "(由 _MAX_
			 * 项结果过滤)", "sInfoPostFix" : "", "sSearch" : "搜索:", "sUrl" : "",
			 * "sEmptyTable" : "表中数据为空", "sLoadingRecords" : "载入中...",
			 * "sInfoThousands" : ",", "oPaginate" : { "sFirst" : "首页",
			 * "sPrevious" : "上页", "sNext" : "下页", "sLast" : "末页" }, "oAria" : {
			 * "sSortAscending" : ": 以升序排列此列", "sSortDescending" : ": 以降序排列此列" } }
			 * });
			 */
			/*
			 * $('#workDimensionTable').rowspan(0);
			 * $('#workDimensionTable').rowspan(1);
			 * $('#workDimensionTable').rowspan(2);
			 * $('#workDimensionTable').rowspan(3);
			 * $('#workDimensionTable').rowspan(4);
			 */
			/*
			 * $('#workDimensionTable').on( 'draw.dt', function () {
			 * //$('#workDimensionTable').RevertTable();
			 * mc('workDimensionTable',0,0,0); } );
			 */

			/*_w_table_rowspan('#peopleDimensionTable', 1);
			_w_table_rowspan('#peopleDimensionTable', 2);
			_w_table_rowspan('#peopleDimensionTable', 3);
			_w_table_rowspan('#peopleDimensionTable', 4);
			_w_table_rowspan('#peopleDimensionTable', 5);
			_w_table_rowspan('#peopleDimensionTable', 6);*/
			
			try { 
				mc('peopleDimensionTable',0,0,0);
			} catch (ex){
				//alert("Too much recursion!");
			}
			//added by xjw 160510 导出excel
			$("#total").html(count);
			$("#export").show();
			//分页
			pagination('peopleDimensionTable',5);
			$(".divLoading").hide();
		}
	});
}

//分页方法
function pagination(table,pageSize){
	$('#'+table+' tbody tr').css({'display':'none'})/*.hide()*/;
	//var pageSize=5;
	var allCount=0;
	var colSize = $('#'+table+' thead tr').eq(0).find('td').length;
	$('#'+table+' tbody tr').each(function(){
		if($(this).find('td').length==colSize){
			allCount++;
		}
		$(this).prop('rownumber',allCount);
		if(parseInt($(this).prop('rownumber'))>(1*pageSize-pageSize) && parseInt($(this).prop('rownumber'))<=(1*pageSize)){
			$(this).css({'display':''})/*.show()*/;
		}
	});
	//alert(count);
	
	$(".tcdPageCode").createPage({
		pageCount:parseInt((allCount-1)/pageSize)+1,
		current:1,
		backFn:function(p){
			$('#'+table+' tbody tr').css({'display':'none'})/*.hide()*/;
			//console.log(p);
			$('#'+table+' tbody tr').each(function(){
				if(parseInt($(this).prop('rownumber'))>(p*pageSize-pageSize) && parseInt($(this).prop('rownumber'))<=(p*pageSize)){
					$(this).css({'display':''})/*.show()*/;
				}
				//$(this).show();
			});
		}
	});
}

// 格局化日期：yyyy-MM-dd
function formatDate(date) {
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();

	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return (myyear + "-" + mymonth + "-" + myweekday);
}

jQuery.fn.rowspan = function(colIdx) {
	return this.each(function() {
		var that;
		$('tr', this).each(function(row) {
			$('td:eq(' + colIdx + ')', this).each(function(col) {
				if ($(this).html() == $(that).html()) {
					rowspan = $(that).attr("rowSpan");
					if (rowspan == undefined) {
						$(that).attr("rowSpan", 1);
						rowspan = $(that).attr("rowSpan");
					}
					rowspan = Number(rowspan) + 1;
					$(that).attr("rowSpan", rowspan); // do your action for
					// the colspan cell here
					$(this).hide(); // .remove(); // do your action for the old
					// cell here
				} else {
					that = this;
				}
				that = (that == null) ? this : that; // set the that if not
				// already set
			});
		});
	});
}

function _w_table_rowspan(_w_table_id, _w_table_colnum) {
	_w_table_firsttd = "";
	_w_table_currenttd = "";
	_w_table_SpanNum = 0;
	_w_table_Obj = $(_w_table_id + " tr td:nth-child(" + _w_table_colnum + ")");
	_w_table_Obj.each(function(i) {
		if (i == 0) {
			_w_table_firsttd = $(this);
			_w_table_SpanNum = 1;
		} else {
			_w_table_currenttd = $(this);
			if (_w_table_firsttd.text() == _w_table_currenttd.text()) {
				_w_table_SpanNum++;
				_w_table_currenttd.hide(); // remove();
				_w_table_firsttd.attr("rowSpan", _w_table_SpanNum);
			} else {
				_w_table_firsttd = $(this);
				_w_table_SpanNum = 1;
			}
		}
	});
}

function mc(tableId, startRow, endRow, col) {
	var tb = document.getElementById(tableId);
	if (col >= tb.rows[0].cells.length) {
		return;
	}
	if (col == 0) {
		endRow = tb.rows.length - 1;
	}
	for (var i = startRow; i < endRow; i++) {
		if (tb.rows[startRow].cells[col].innerHTML == tb.rows[i + 1].cells[0].innerHTML) {
			tb.rows[i + 1].removeChild(tb.rows[i + 1].cells[0]);
			tb.rows[startRow].cells[col].rowSpan = (tb.rows[startRow].cells[col].rowSpan | 0) + 1;
			if (i == endRow - 1 && startRow != endRow) {
				mc(tableId, startRow, endRow, col + 1);
			}
		} else {
			mc(tableId, startRow, i + 0, col + 1);
			/**modify by wuxiao start**/
			//startRow = i + 1;
			mc(tableId, i + 1, endRow, 0);
			break;
			/**modify by wuxiao end**/
		}
	}
}

/*function mc1(tableId, startRow, endRow, col) {
	//获得table
	var tb = document.getElementById(tableId);
	//超出界限则退出当前迭代层
	if (typeof(tb.rows[startRow]) == "undefined"){
		return;
	}
	if (typeof(tb.rows[startRow].cells[col]) == "undefined"){
		return;
	}
	if (col == 0) {
		endRow = tb.rows.length - 1;
	}
	for (var i = startRow; i < endRow; i++) {
		if (typeof(tb.rows[i + 1]) == "undefined"){
			mc1(tableId, startRow, endRow, col + 1);
			break;
		}
		if (tb.rows[startRow].cells[col].innerHTML == tb.rows[i + 1].cells[0].innerHTML) {
			tb.rows[i + 1].removeChild(tb.rows[i + 1].cells[0]);
			tb.rows[startRow].cells[col].rowSpan = (tb.rows[startRow].cells[col].rowSpan | 0) + 1;
			if (i == endRow - 1 && startRow != endRow) {
				mc(tableId, startRow, endRow, col + 1);
			}
		} else {
			//横向迭代
			mc1(tableId, startRow, i+1, col + 1);
			startRow = i + 1;
			//纵向迭代
			mc1(tableId, i+1, endRow, 0);
			break;
		}
	}
}*/

/*
 * 员工姓名、工号模糊查询、弹出下拉列表
 */
function getStaffInfoFuzzySelect() {
	var slist;
    $(".sequence").typeahead({
        source: function(input, process) {
            $.get('hrReport!getStaffInfoFuzzySelect.action', {
                "staff": input,
            }, function(data) {
                //alert(data.data.job_no);
            	slist = data.data;
            	var results = new Array();
            	$.each(data.data, function(index, value) {
					results.push(value.staff_number+" "+value.staff_name);
				});
                return process(results);
            }, 'json');
        },
        /*matcher : function(item) {
			// alert(this.query);
			return true;
		},*/
		items : 10,
		updater : function(item) {
			$.each(slist, function(index, value) {
				/*if (value.job_no == item) {
					$('#job_no').attr('av', value.id);
					addStandardPosition($('#positionModal').data('org_id'),$('#job_no').attr('av'));
				}*/
			})
			return item.split(' ')[0];
		}
    });
}