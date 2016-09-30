var cDate="";//当前月份
var wDate="";//上一月份
var llDate="";//上上个月份
var month_start= null;
var month_end = null;
$(document).ready(function(){
	month_start=document.getElementById("month_start");
	month_end = document.getElementById("month_end");
	initPage();
	// 工厂切换事件
	$("#factory").change(
			function() {
				var selectFactory = $("#factory :selected").text();
				getWorkshopSelect_Auth("#workshop", null,
						selectFactory, "");
				getChildOrgSelect("#group", workshop, "",
				"");
				$("#subgroup").html(
						"<option value=''>全部</option>");
			});
	// 车间切换事件
	$("#workshop").change(
			function() {
				var workshop = $("#workshop").val();
				getChildOrgSelect("#group", workshop, "",
						"");
				$("#subgroup").html(
						"<option value=''>全部</option>");
			});
	// 班组切换事件
	$("#group").change(function() {
		var group = $("#group").val();
		getChildOrgSelect("#subgroup", group, "", "noall");
	});
	
	$("#btnQuery").click(function(){
		ajaxQuery(1);
	});
	
	$("#export").click(function(){
		//ajaxQuery(0,"all")
		htmlToExcel("tableResult", "", "","计件工资明细","计件工资明细");
		return false;
	});
	
	/**
	 * 月份开始input change事件：当起始月份不等于上月或当月时，隐藏驳回和结算按钮
	 */
	$("#month_start").live("onchange",function(){
		
	})
	
	//驳回工资
	$("#btnReject").click(function(){	
		ajaxUpdateSalaryHistory("驳回");	
	})	

	//结算工资
	$("#btnSave").click(function(){	
		ajaxUpdateSalaryHistory("结算");	
	})	
})
function initPage(){
	pageSize=1000;
	getAuthorityFactorySelect("#factory", "", "noall");
	var selectFactory = $("#factory :selected").text();
	var defaultWorkshop=$("#d_workshop").val();
	var defaultWorkgourp=$("#d_workgroup").val();
	var defaultTeam=$("#d_team").val();
	getWorkshopSelect_Auth("#workshop", defaultWorkshop, selectFactory, "");
/*	 $('#workshop').multiselect({
         buttonWidth: '150px',
         buttonContainer: '<div class="btn-group input-medium btn-select " />'
     });*/
	//$("#workshop").attr("disabled",true);
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

	 //ajaxQuery(1);
}

function changeMonth(){
	if($(month_start).val()==wDate ){
		$("#month_end").val(wDate).attr("disabled",true);
	}else if($(month_start).val()==cDate ){
		$("#month_end").val(cDate).attr("disabled",true);
	}else{
		WdatePicker({'dateFmt':'yyyy-MM','maxDate':llDate,'el':'month_end'});
		//$("#month_end").click();
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

function ajaxQuery(targetPage,queryAll){
	$(".divLoading").addClass("fade in").show();
	var workshopAll="";
	$("#workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	//alert(workshopAll);
	var workshop=$("#workshop :selected").text()=="全部"?workshopAll:$("#workshop :selected").text();
	var workgroup=$("#group :selected").text()=="全部"?"":$("#group :selected").text();
	var team=$("#subgroup :selected").text()=="全部"?"":$("#subgroup :selected").text();
	var conditions="{factory:'"+$("#factory :selected").text()+"',workshop:'"+workshop
		+"',workgroup:'"+workgroup+"',staff:'"+$("#staff").val()+
		"',team:'"+team+ "',monthStart:'"+$("#month_start").val()+"',monthEnd:'"+$("#month_end").val()+"'}";
	if(queryAll=="all"){
	    data={
			 "conditions" : conditions,
			 "pager":null
	    }	
	    table=$("#tableResultAll tbody");
	}else{
		data={
			  "conditions" : conditions,
			  "pager.pageSize" : 1000,
			  "pager.curPage" : targetPage || 1	
		}
		table=$("#tableResult tbody");
	}
	$.ajax({
		url:"hrReport!getSubmitSalaryList.action",
		dataType : "json",
		async:false,
		type : "get",
		data : data,
		success : function(response) {
			
			$(table).html("");
			$.each(response.salaryList,function(index,salary){
				var tr=$("<tr />");
				$("<td />").html(salary.month).appendTo(tr);
				$("<td />").html(salary.staff_number).appendTo(tr);
				$("<td />").html(salary.staff_name).appendTo(tr);
				$("<td />").html(salary.workshop_org).appendTo(tr);
				$("<td />").html(salary.workgroup_org).appendTo(tr);
				$("<td />").html(salary.team_org).appendTo(tr);
				$("<td />").html(salary.job).appendTo(tr);
				$("<td />").html(salary.staff_status).appendTo(tr);
			/*	$("<td />").html(salary.skill_parameter).appendTo(tr);*/
				$("<td />").html(salary.attendance_days).appendTo(tr);
				$("<td />").html(salary.attendance_hours).appendTo(tr);
				var piece_total=salary.piece_total==undefined?0:parseFloat(salary.piece_total);
				var piece_pay_total=salary.piece_pay_total==undefined?0:parseFloat(salary.piece_pay_total);
				var ecnwh_total=salary.ecnwh_total==undefined?0:parseFloat(salary.ecnwh_total);
				var ecn_pay_total=salary.ecn_pay_total==undefined?0:parseFloat(salary.ecn_pay_total);
				var tmpwh_total=salary.tmpwh_total==undefined?0:parseFloat(salary.tmpwh_total);
				var tmp_pay_total=salary.tmp_pay_total==undefined?0:parseFloat(salary.tmp_pay_total);
				var wwh_total=salary.wwh_total==undefined?0:parseFloat(salary.wwh_total);
				var wait_pay_total=salary.wait_pay_total==undefined?0:parseFloat(salary.wait_pay_total);
				var deduct_pay_total=salary.deduct_pay_total==undefined?0:parseFloat(salary.deduct_pay_total);
				$("<td />").html(piece_total.toFixed(2)).appendTo(tr);
				$("<td />").html(parseInt(salary.bonus_total).toFixed(2)).appendTo(tr);
				$("<td />").html(piece_pay_total.toFixed(2)).appendTo(tr);
				$("<td />").html(ecnwh_total.toFixed(2)).appendTo(tr);
				$("<td />").html(ecn_pay_total.toFixed(2)).appendTo(tr);
				$("<td />").html(tmpwh_total.toFixed(2)).appendTo(tr);
				$("<td />").html(tmp_pay_total.toFixed(2)).appendTo(tr);
				$("<td />").html(wwh_total.toFixed(2)).appendTo(tr);
				$("<td />").html(wait_pay_total.toFixed(2)).appendTo(tr);
				var piece_salary=parseFloat(piece_pay_total)+parseFloat(ecn_pay_total)+parseFloat(tmp_pay_total)+parseFloat(wait_pay_total);				
				$("<td />").html(piece_salary.toFixed(2)).appendTo(tr);
				$("<td />").html(deduct_pay_total.toFixed(2)).appendTo(tr);
				$("<td />").html((parseFloat(piece_salary)+parseFloat(deduct_pay_total)).toFixed(2)).appendTo(tr);
				var avg_salary=isNaN((piece_salary+deduct_pay_total)/salary.attendance_days)?"":((piece_salary+deduct_pay_total)/salary.attendance_days).toFixed(2);
				$("<td />").html(avg_salary).appendTo(tr);
				$("<td />").html(salary.status).appendTo(tr);
				if(queryAll =='all'){
					$("<td />").html(salary.calculator).appendTo(tr);
					$("<td />").html(salary.calculate_date).appendTo(tr);
				}
				$(table).append(tr);
			});
			if(queryAll!="all"){
				$("#total").html(response.pager.totalCount);
				$("#total").attr("total", response.pager.totalCount);
				$("#cur").attr("page", response.pager.curPage);
				$("#cur").html(
						"<a href=\"#\">" + response.pager.curPage + "</a>");
				$("#pagination").show();
			}
			$(".divLoading").hide();
		}
		
	})
}

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

