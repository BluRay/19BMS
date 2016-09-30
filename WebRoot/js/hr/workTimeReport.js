$(document).ready(function(){
	initPage();
	
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
		var selectFactory =  $("#factory :selected").text();
		getWorkshopSelect_Auth("#workshop", null,selectFactory, "");
		getChildOrgSelect("#group", workshop, "", "");
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
	
	//导出功能
	$("#export").click(function(){
		ajaxQuery(0,'all');
		htmlToExcel("attendanceTableAll", "", "","工时统计报表","工时统计报表");
		return false;
	});
})

function ajaxQuery(targetPage,queryAll){
	$(".divLoading").addClass("fade in").show();
	var date= new Date(Date.parse($("#waitmanhourdate").val() + "-01"));      //转换成Data();
	var tempo = 1;		//节拍
	var workshopAll="";
	$("#workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	var workshop=$("#workshop :selected").text()=="全部"?workshopAll:$("#workshop :selected").text();
	var data={};
	if(queryAll=='all'){
		data={
		    	"factory":$("#factory").find("option:selected").text(),
		    	"workshop":workshop,
		    	"group":$("#group").find("option:selected").text(),
		    	"subgroup":$("#subgroup").find("option:selected").text(),
		    	"staff_number":$("#staff_number").val(),
		    	"work_date":$("#waitmanhourdate").val()
		    };
	}else{
		data={
	    	"factory":$("#factory").find("option:selected").text(),
	    	"workshop":workshop,
	    	"group":$("#group").find("option:selected").text(),
	    	"subgroup":$("#subgroup").find("option:selected").text(),
	    	"staff_number":$("#staff_number").val(),
	    	"work_date":$("#waitmanhourdate").val(),
	       	"pager.pageSize":pageSize,
			"pager.curPage":targetPage || 1
	    }
	}
	
	$.ajax({
		url: "hrReport!getWorkTimeReport.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: data,
	    success:function(response){
	    	if(response.success) {
	    		if(queryAll=='all'){
	    			$("#attendanceTableAll tbody").html("");
	    		}else{
	    			$("#attendanceTable tbody").html("");
	    		}
	    		var daylist=['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
	    		var count = 1;
	    		var pre_generate_time=new Date().getTime();

                $.each(response.data, function (index, staff) {
                	var type = "";
                	var worktime = staff.workhours;	//"计件=01:11.2;02:14;|额外=01:4;02:44;|技改=01:8;02:88;|等待=30:8;31:8;"; //
    	    		var hoursArr = worktime.split("|");
    	    		if(staff.price != undefined)tempo = staff.price;
    	    		
    	    		//工时统计
    	    		/*var S1=0;var S2=0;var S3=0;var S4=0;var S5=0;var S6=0;var S7=0;var S8=0;var S9=0;var S10=0;
    	    		var S11=0;var S12=0;var S13=0;var S14=0;var S15=0;var S16=0;var S17=0;var S18=0;var S19=0;var S20=0;
    	    		var S21=0;var S22=0;var S23=0;var S24=0;var S25=0;var S26=0;var S27=0;var S28=0;var S29=0;var S30=0;var S31=0;
    	    		*/
    	    		var total_hours=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    	    		var piece_list={};
    				var temp_list={};
    				var ecn_list={};
    				var wait_list={};
    				//组合各工时信息json数据
    				$.each(hoursArr,function(i,hours){
    					
    					var hsarr=hours.replace(new RegExp(";",'gm'),",").split("=");
    					var hstype=hsarr[0];//工时类型：计件，额外，技改，等待
    					var hs=hsarr[1];
    					hs=hs.substring(0,hs.length-1);
    					hs='{'+hs+'}';
    					//alert(hs);
    					var hs_json=JSON.parse(hs);
    					if(hstype=='计件'){
    						piece_list=hs_json;
        				}
    					if(hstype=='额外'){
    						temp_list=hs_json;
        				}
    					if(hstype=='技改'){
    						ecn_list=hs_json;
        				}
    					if(hstype=='等待'){
    						wait_list=hs_json;
        				}
    				});
    	    		for (var i=0;i<=4;i++){
    	    			var day_hours=['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''];
    	    			
    	    			var tr= $("<tr />");
    	    			if(i==0){
    	    				//单元格合并部分
    	    	    		$("<td rowspan=5 style=\"padding-left:0px;padding-right:0px\"/>").html(count).appendTo(tr);
    	    				$("<td rowspan=5 style=\"padding-left:0px;padding-right:0px\"/>").html(staff.staff_number).appendTo(tr);
    	    				$("<td rowspan=5 style=\"padding-left:0px;padding-right:0px\" />").html(staff.staff_name).appendTo(tr);
    	    				$("<td rowspan=5 style=\"padding-left:0px;padding-right:0px\" />").html(staff.skill_parameter).appendTo(tr);
    	    			}
        				switch(i){
        					case 0: //计件
        						$("<td style=\"padding-left:0px;padding-right:0px\" />").html("计件").appendTo(tr);
        						$.each(daylist,function(day_index,day){
        							if(piece_list[day]>0){
            							day_hours[day_index]=changeTwoDecimal(piece_list[day]);//转换成2位小数	
            							total_hours[day_index]=parseFloat(total_hours[day_index])+parseFloat(day_hours[day_index])*tempo;
        							}

        							if(isWeekEnd(date,day_index)){
        								$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(day_hours[day_index]).appendTo(tr);
        								$("#D"+(day_index+1)).css('background-color','LightGreen');
        								$("#D"+(day_index+1)+"_all").css('background-color','LightGreen');
        							}else{
        								$("<td style=\"padding-left:0px;padding-right:0px\" />").html(day_hours[day_index]).appendTo(tr);
        							}
        							
        						});
        						break;
        					case 1: //额外
        						$("<td style=\"padding-left:0px;padding-right:0px\" />").html("额外").appendTo(tr);
        						$.each(daylist,function(day_index,day){
        							if(temp_list[day]>0){
        								day_hours[day_index]=changeTwoDecimal(temp_list[day]);//转换成2位小数
            							total_hours[day_index]=parseFloat(total_hours[day_index])+parseFloat(day_hours[day_index]);
        							}
        							
        							if(isWeekEnd(date,day_index)){
        								$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(day_hours[day_index]).appendTo(tr);
        								$("#D"+(day_index+1)).css('background-color','LightGreen');
        								$("#D"+(day_index+1)+"_all").css('background-color','LightGreen');
        							}else{
        								$("<td style=\"padding-left:0px;padding-right:0px\" />").html(day_hours[day_index]).appendTo(tr);
        							}
        							
        						});
        						break;	
        					case 2://技改
        						$("<td style=\"padding-left:0px;padding-right:0px\" />").html("技改").appendTo(tr);
        						$.each(daylist,function(day_index,day){
        							if(ecn_list[day]>0){
        								day_hours[day_index]=changeTwoDecimal(ecn_list[day]);//转换成2位小数
            							total_hours[day_index]=parseFloat(total_hours[day_index])+parseFloat(day_hours[day_index]);
        							}
        							
        							if(isWeekEnd(date,day_index)){
        								$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(day_hours[day_index]).appendTo(tr);
        								$("#D"+(day_index+1)).css('background-color','LightGreen');
        								$("#D"+(day_index+1)+"_all").css('background-color','LightGreen');
        							}else{
        								$("<td style=\"padding-left:0px;padding-right:0px\" />").html(day_hours[day_index]).appendTo(tr);
        							}
        							
        						});
        						break;
        					case 3://等待
        						$("<td style=\"padding-left:0px;padding-right:0px\" />").html("等待").appendTo(tr);
        						$.each(daylist,function(day_index,day){
        							if(wait_list[day]>0){
        								day_hours[day_index]=changeTwoDecimal(wait_list[day]);//转换成2位小数	
            							total_hours[day_index]=parseFloat(total_hours[day_index])+parseFloat(day_hours[day_index]);
        							}
        							
        							if(isWeekEnd(date,day_index)){
        								$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(day_hours[day_index]).appendTo(tr);
        								$("#D"+(day_index+1)).css('background-color','LightGreen');
        								$("#D"+(day_index+1)+"_all").css('background-color','LightGreen');
        							}else{
        								$("<td style=\"padding-left:0px;padding-right:0px\" />").html(day_hours[day_index]).appendTo(tr);
        							}
        							
        						});
        						break;
        					case 4://出勤
        						$("<td style=\"padding-left:0px;padding-right:0px\" />").html("<b>出勤</b>").appendTo(tr);
        						
        						$.each(daylist,function(day_index,day){
        							var attendence_day=staff['D'+(day_index+1)];
        							
        							if((total_hours[day_index] > attendence_day)&&(attendence_day!= undefined)){
        								$("<td style=\"padding-left:0px;padding-right:0px;background-color:Tomato\" />").html(attendence_day).appendTo(tr);
        							}else if(isWeekEnd(date,day_index)){
        								$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(attendence_day).appendTo(tr);
        							}else{
        								$("<td style=\"padding-left:0px;padding-right:0px\" />").html(attendence_day).appendTo(tr);
        							}     							
        						});
        						break;
        				}    
        				
        				tr.data("id", staff.id==staff?"":staff.id);
        				if(queryAll=='all'){
        					$("#attendanceTableAll tbody").append(tr); 
        				}else{
        					$("#attendanceTable tbody").append(tr);
        				}
    	    		}
    	    		
   		
                	count++;
                });
                var aft_generate_time=new Date().getTime();
	    		//alert((aft_generate_time-pre_generate_time)/1000);
                if(queryAll!='all'){
                	$("#total").html(response.pager.totalCount);
            		$("#total").attr("total",response.pager.totalCount);
            		$("#cur").attr("page",response.pager.curPage);
            		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
            		$("#pagination").show();
                }
        	
            } 
	    }
	});
	$(".divLoading").hide();
}

function isWeekEnd(date,day_index){
	if(((date.getDay()+day_index%7)%7 ==6)||(date.getDay()+day_index%7)%7 ==0){
		return true;
		/*$("<td style=\"padding-left:0px;padding-right:0px;background-color:LightGreen\" />").html(changeTwoDecimal(D01)).appendTo(tr);
		$("#D"+(j+1)).css('background-color','LightGreen');*/
	}else{
		return false;
	}
}

changeTwoDecimal = function changeTwoDecimal(floatvar) {
	if (typeof(floatvar) == "undefined"){
		return false;
	}
	var f_x = parseFloat(floatvar);
	if (isNaN(f_x)) {
		alert('function:changeTwoDecimal->parameter error');
		return false;
	}else{
		var f_x = Math.round(floatvar * 100) / 100;
		return f_x;		
	}
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