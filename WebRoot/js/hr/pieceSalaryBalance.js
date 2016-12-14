var cDate="";//当前月份
var wDate="";//上一月份
var llDate="";//上上个月份
var month_start= null;
var month_end = null;
var email_list=new Array();
var data_url = "hrReport!getSubmitSalaryList.action?";

$(document).ready(function(){
	$(".container").width(getWidth());
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
	
	//驳回工资
	$("#btnReject").click(function(){	
		$("#reasonModal").modal("show");
	});
	
	//结算工资
	$("#btnSave").click(function(){	
		ajaxUpdateSalaryHistory("结算");	
	});
	
	//输入驳回原因确认后驳回
	$("#btnMtaSave").click(function() {
		var rejectReason=$("#reject_reason").val();
		if(!rejectReason){
			alert("请输入驳回原因！");
			return false;		
		}else{
			ajaxUpdateSalaryHistory("驳回");
			$("#reasonModal").modal("hide");
			$.each(email_list,function(i,email_addr){
				var tblobj=new Array();
				var obj={};
				obj['月份']=$("#month_start").val();
				obj['驳回原因']=rejectReason;
				obj['驳回人']=$("#login_user").html();
				tblobj.push(obj)				
				if(email_addr!=undefined &&email_addr!=""){
					sendEmail(email_addr,'','计件工资驳回','月份,驳回原因,驳回人',JSON.stringify(tblobj),'')	
				}				
			})
		}
	});
	
	$("#btnQuery").click(function () {
		ajaxQuery();
    });
	
	function ajaxUpdateSalaryHistory(actionType){
		$(".divLoading").addClass("fade in").show();
		var workshopAll="";
		$("#workshop option").each(function(){
			workshopAll+=$(this).text()+",";
		});
		var workshop=$("#workshop :selected").text()=="全部"?workshopAll:$("#workshop :selected").text();
		var workgroup=$("#group :selected").text()=="全部"?"":$("#group :selected").text();
		var team=$("#subgroup :selected").text()=="全部"?"":$("#subgroup :selected").text();
		var staff=$("#staff").val();
		var staffId='';
		if(staff.trim().length>0){
			var trs=$("#tableResult tbody").find("tr");
			staffId=$(trs[0]).data("staff_id");
		}		
		var conditions="{factory:'"+$("#factory :selected").text()+"',workshop:'"+
		workshop+"',workgroup:'"+workgroup+ "',team:'"+team+"',staff:'"+staff+"',staffId:'"+staffId+
		"',monthStart:'"+$("#month_start").val()+"',monthEnd:'"+$("#month_end").val()+"'}";
		
		var url="";
		if(actionType=='驳回'){
			url="hrReport!rejectPieceSalary.action"
		}
		if(actionType=='结算'){
			url="hrReport!balacePieceSalary.action";
		}
		
		$.ajax({
			url:url,
			dataType : "json",
			async:false,
			type : "get",
			data : {
				"conditions":conditions
			},
			success : function(response) {					
				$(".divLoading").hide();
				alert(response.message);		
			}
		});
	}
	
});
//----------START bootstrap initTable ----------
function initTable() {
    $table.bootstrapTable({
        height: getHeight(),
        url:data_url,
        striped:true,
        paginationVAlign:'bottom',
        searchOnEnterKey:true,
        fixedColumns: true,
        fixedNumber: 2,
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
            	field: 'MONTH',title: '&nbsp;&nbsp;月份&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                cellStyle:function cellStyle(value, row, index, field) {
	        	return {css: {"padding-left": "3px", "padding-right": "2px"}};
	        	}
            },{
            	field: 'STAFF_NUMBER',title: '&nbsp;&nbsp;员工&nbsp;&nbsp;<br/>&nbsp;&nbsp;工号&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'STAFF_NAME',title: '&nbsp;&nbsp;姓名&nbsp;&nbsp;<br/>',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'WORKSHOP_ORG',title: '&nbsp;&nbsp;车间&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'WORKGROUP_ORG',title: '&nbsp;&nbsp;班组&nbsp;&nbsp;&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'TEAM_ORG',title: '&nbsp;&nbsp;小班组&nbsp;&nbsp;',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'JOB',title: '&nbsp;&nbsp;岗位',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'STAFF_STATUS',title: '&nbsp;&nbsp;在职',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'ATTENDANCE_DAYS',title: '出勤<br/>天数',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'ATTENDANCE_HOURS',title: '出勤<br/>小时数',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'PIECE_TOTAL',title: '计件<br/>产量',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'BONUS_TOTAL',title: '补贴车',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'PIECE_PAY_TOTAL',title: '纯计件<br/>工资',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'ECNWH_TOTAL',title: '技改<br/>工时',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'ECN_PAY_TOTAL',title: '技改<br/>工资',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'TMPWH_TOTAL',title: '额外<br/>工时',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'TMP_PAY_TOTAL',title: '额外<br/>工资',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'WWH_TOTAL',title: '等待<br/>工时',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'WAIT_PAY_TOTAL',title: '等待<br/>工资',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'PIECE_SALARY',title: '计件<br/>工资',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'DEDUCT_PAY_TOTAL',title: '考核<br/>扣款',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter,
                formatter:function(value){
                	return value.toFixed(2);
                }
            },{
            	field: 'id',title: '实发计<br/>件工资',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
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
            	field: 'id',title: '平均<br/>日薪',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: true,footerFormatter: totalTextFormatter,
                formatter:function(value, row, index){
                	var piece_pay_total=row.piece_pay_total==undefined?0:parseFloat(row.piece_pay_total);
                	var ecn_pay_total=row.ecn_pay_total==undefined?0:parseFloat(row.ecn_pay_total);
                	var tmp_pay_total=row.tmp_pay_total==undefined?0:parseFloat(row.tmp_pay_total);
                	var wait_pay_total=row.wait_pay_total==undefined?0:parseFloat(row.wait_pay_total);
                	var deduct_pay_total=row.deduct_pay_total==undefined?0:parseFloat(row.deduct_pay_total);               	
                	var piece_salary=parseFloat(piece_pay_total)+parseFloat(ecn_pay_total)+parseFloat(tmp_pay_total)+parseFloat(wait_pay_total);				                	
                	return avg_salary=isNaN((piece_salary+deduct_pay_total)/row.attendance_days)?"":((piece_salary+deduct_pay_total)/row.attendance_days).toFixed(2);               	
                }
            },{
            	field: 'STATUS',title: '状态',align: 'center',valign: 'middle',align: 'center',
                sortable: true,visible: true,footerFormatter: totalTextFormatter
            },{
            	field: 'CALCULATOR',title: '操作人',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: false,footerFormatter: totalTextFormatter
            },{
            	field: 'CALCULATE_DATE',title: '操作时间',align: 'center',valign: 'middle',align: 'center',
                sortable: false,visible: false,footerFormatter: totalTextFormatter
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
