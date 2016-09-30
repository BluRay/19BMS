var pageSize = 20;
$(document).ready(function(){
	initPage();
	
	function initPage(){
		getAuthorityFactorySelect("#factory", "", "noall");
		var selectFactory = $("#factory :selected").text();
		var defaultWorkshop=$("#d_workshop").val();
		var defaultWorkgourp=$("#d_workgroup").val();
		var defaultTeam=$("#d_team").val();
		
		//getWorkshopSelect_Auth("#workshop", defaultWorkshop, selectFactory, "noall");
		getWorkshopSelect_Auth("#workshop", defaultWorkshop, selectFactory, "");
		var workshop = $("#workshop").val();
		getChildOrgSelect("#group", workshop, defaultWorkgourp, "");
		var group = $("#group").val();
		getChildOrgSelect("#subgroup", group, defaultTeam, "");
		
		var LSTR_ndate=new Date(); 
		var LSTR_MM=LSTR_ndate.getMonth()+1;
		var LSTR_MM=LSTR_MM > 10?LSTR_MM:("0"+LSTR_MM)
		$("#waitmanhourdate").val(getPreMonth(LSTR_ndate.getFullYear() + "-" + LSTR_MM + "-01"));
		$("#hr_pecie").addClass("in");
	}
	
	$("#btnQuery").live("click",function(e){
		for(var i=0;i<=31;i++){
			$("#D"+(i+1)).css('background-color','');
		}
		ajaxQuery();
	});
	
	// 工厂切换事件
	$("#factory").change(function() {
		var selectFactory = $("#factory :selected").text();
		getWorkshopSelect_Auth("#workshop", null,selectFactory, "noall");
		getChildOrgSelect("#group", workshop, "","");
		$("#subgroup").html("<option value=''>全部</option>");
	});
	// 车间切换事件
	$("#workshop").change(function() {
		var workshop = $("#workshop").val();
		getChildOrgSelect("#group", workshop, "","");
		$("#subgroup").html("<option value=''>全部</option>");
	});
	// 班组切换事件
	$("#group").change(function() {
		var group = $("#group").val();
		getChildOrgSelect("#subgroup", group, "", "");
	});
	// 选定小班组查询人员列表
	$("#subgroup").change(function() {
		var factory = $("#factory").find("option:selected").text();
		var workshop = $("#workshop").find("option:selected").text();
		var workgroup = $("#group").find("option:selected").text();
		var subgroup = $(this).find("option:selected").text();
		//ajaxGetStaffList(factory,workshop,workgroup,subgroup);
		
	});
	$("#export").click(function(){
/*		ajaxQuery(0,"all")*/
		htmlToExcel("attendanceTable", "", "","等待工时统计报表","等待工时统计报表");
		return false;
	});
		
})

function ajaxQuery(targetPage,queryAll){
	$(".divLoading").addClass("fade in").show();
	$.ajax({
		url: "hr!getWaitManHourList.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	"factory":$("#factory").find("option:selected").text(),
	    	"workshop":$("#workshop").find("option:selected").text(),
	    	"group":$("#group").find("option:selected").text(),
	    	"subgroup":$("#subgroup").find("option:selected").text(),
	    	"staff_number":$("#staff_number").val(),
	    	"waitmanhourdate":$("#waitmanhourdate").val(),
	       	"pager.pageSize":pageSize,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){
	    	if(response.success) {
	    		$("#attendanceTable tbody").html("");
	    		var date= new Date(Date.parse($("#waitmanhourdate").val() + "-01"));      //转换成Data();
                var count = 1;
                var last_factory="";
                var last_workshop="";
                var last_workgroup="";
                var last_team="";
                var last_workdate="";
                var team_count=0;
                var date_count=0;
                var teamTd="";
                var dateTd="";
                var priceTd="";
                var waitReasonTd="";
                var detailReasonTd="";

                $.each(response.data, function (index, staff) {
                	//if(undefined != time.smallGroupId){
                		teamTd=".team_"+team_count;
                		dateTd="#date_"+date_count;
                		priceTd="#price_"+date_count;
                		waitReasonTd="#wr_"+date_count;
                		detailReasonTd="#dr_"+date_count;
	    				var tr = $("<tr />");
	    				if(last_team==staff.team){
	    					//alert($(teamTd).eq(0).attr("rowspan"));
	    					var rowspan=parseInt($(teamTd).eq(0).attr("rowspan"));
	    					$(teamTd).attr("rowspan",rowspan+1);
	    				}else{	
	    					team_count++;
	    					$("<td class='team_"+team_count+"' rowspan=1/>").html(staff.factory).appendTo(tr);
	    					$("<td class='team_"+team_count+"' rowspan=1/>").html(staff.workshop).appendTo(tr);
	    					$("<td class='team_"+team_count+"' rowspan=1/>").html(staff.workgroup).appendTo(tr);
	    					$("<td class='team_"+team_count+"' rowspan=1/>").html(staff.team).appendTo(tr);					
	    					
	    				}
	    				if(last_team==staff.team&&last_workdate==staff.work_date){
	    					var rowspan=parseInt($(dateTd).attr("rowspan"));
	    					$(dateTd).attr("rowspan",rowspan+1);
	    					$(priceTd).attr("rowspan",rowspan+1);
	    					$(waitReasonTd).attr("rowspan",rowspan+1);
	    					$(detailReasonTd).attr("rowspan",rowspan+1);	  
	    				}else{
	    					date_count++;
	    					$("<td id='date_"+date_count+"' rowspan=1/>").html(staff.work_date).appendTo(tr);			
	    					$("<td id='wr_"+date_count+"' rowspan=1/>").html(staff.wait_reason).appendTo(tr);
	    					$("<td id='dr_"+date_count+"' rowspan=1/>").html(staff.detail_reason).appendTo(tr);
	    					$("<td id='price_"+date_count+"' rowspan=1/>").html(staff.price).appendTo(tr);
	    				}
	    				
	    				$("<td />").html(staff.staff_number).appendTo(tr);
	    				$("<td />").html(staff.staff_name).appendTo(tr);
	    				$("<td />").html(staff.job).appendTo(tr);
	    				$("<td />").html(staff.work_hour).appendTo(tr);
	    				$("<td />").html(staff.distribution).appendTo(tr);
	    				$("<td />").html(staff.whereabouts).appendTo(tr);
	    				$("<td />").html(parseFloat(staff.wpay).toFixed(2)).appendTo(tr);
	
	    				last_team=staff.team;
	    				last_workdate=staff.work_date;
	    				tr.data("id", staff.id==staff?"":staff.id);
	    				$("#attendanceTable tbody").append(tr);
                });
                $("#total").html(response.pager.totalCount);
        		$("#total").attr("total",response.pager.totalCount);
        		$("#cur").attr("page",response.pager.curPage);
        		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
        		$("#pagination").show();
            } 
	    }
	});
	$(".divLoading").hide();
}

/**
 * 获取上一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    //var t2 = year2 + '-' + month2 + '-' + day2;
    var t2 = year2 + '-' + month2;
    return t2;
}