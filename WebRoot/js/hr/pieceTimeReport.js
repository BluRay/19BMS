var curTab = "1";
$(document).ready(function(){
	initPage();
	
	function initPage(){
		pageSize=5;
		getAuthorityFactorySelect("#factory", "", "noall");
		getBusNumberSelect('#bus_number');
		var selectFactory = $("#factory :selected").text();
		var defaultWorkshop=$("#d_workshop").val();
		var defaultWorkgourp=$("#d_workgroup").val();
		var defaultTeam=$("#d_team").val();
		
		getWorkshopSelect_Auth("#workshop", defaultWorkshop, selectFactory, "");
		var workshop = $("#workshop").val();
		//getChildGroupSelect("#group", workshop, defaultWorkgourp, "",$('#date_start').val(),$('#date_end').val(),$('#factory').find("option:selected").text(),$('#workshop').find("option:selected").text(),null);
		getChildOrgSelect("#group", workshop, "", "");
		var group = $("#group").val();
		//getChildGroupSelect("#subgroup", group, defaultTeam, "",$('#date_start').val(),$('#date_end').val(),$('#factory').find("option:selected").text(),$('#workshop').find("option:selected").text(),$('#group').find("option:selected").text());
		getChildOrgSelect("#subgroup", group, "", "");
		
		var LSTR_ndate=new Date(); 
		var LSTR_MM=LSTR_ndate.getMonth()+1;
		var LSTR_MM=LSTR_MM > 10?LSTR_MM:("0"+LSTR_MM)
		$("#waitmanhourdate").val(getPreMonth(LSTR_ndate.getFullYear() + "-" + LSTR_MM + "-01"));
		$("#hr_pecie").addClass("in");
		
		$("#tableDiv").show();
		$("#tableDiv2").hide();
	}
	
	$("#btnQuery").live("click",function(e){
		if(($("#date_start").val()=="")||($("#date_end").val()=="")){
			alert("请先输入统计日期！");
		}else{
			ajaxQuery();
		}
	});
	
	// 工厂切换事件
	$("#factory").change(function() {
		var selectFactory = $("#factory :selected").text();
		getWorkshopSelect_Auth("#workshop", null,selectFactory, "");
		//getChildGroupSelect("#group", workshop, "","",$('#date_start').val(),$('#date_end').val(),$('#factory').find("option:selected").text(),$('#workshop').find("option:selected").text(),null);
		getChildOrgSelect("#group", workshop, "", "");
		$("#subgroup").html("<option value=''>全部</option>");
	});
	// 车间切换事件
	$("#workshop").change(function() {
		var workshop = $("#workshop").val();
		//getChildGroupSelect("#group", workshop, "","",$('#date_start').val(),$('#date_end').val(),$('#factory').find("option:selected").text(),$('#workshop').find("option:selected").text(),null);
		getChildOrgSelect("#group", workshop, "", "");
		$("#subgroup").html("<option value=''>全部</option>");
	});
	// 班组切换事件
	$("#group").change(function() {
		var group = $("#group").val();
		//getChildGroupSelect("#subgroup", group, "", "",$('#date_start').val(),$('#date_end').val(),$('#factory').find("option:selected").text(),$('#workshop').find("option:selected").text(),$('#group').find("option:selected").text());
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
	
	$("li").live('click',function(e){
		if(this.id == "li_busNumber"){
			curTab = "1";
			$("#tableDiv").show();
			$("#tableDiv2").hide();
			ajaxQuery();
		}else if(this.id == "li_staffNumber"){
			curTab = "2";
			$("#tableDiv").hide();
			$("#tableDiv2").show();
			ajaxQuery();
		}
	});
		
	//导出功能
	$("#export").click(function(){
		ajaxQuery(0,'all');
		if(curTab=="1"){
			htmlToExcel("attendanceTableAll", "", "","计件工时统计","计件工时统计");
		}else
		htmlToExcel("attendanceTable2All", "", "","计件工时统计","计件工时统计");
		return false;
	});
})

// 日期切换事件
function startdatechange(){
		var workshop = $("#workshop").val();
		getChildOrgSelect("#group", workshop, "", "");
		//getChildGroupSelect("#group", workshop, "","",$('#date_start').val(),$('#date_end').val(),$('#factory').find("option:selected").text(),$('#workshop').find("option:selected").text(),null);
		$("#subgroup").html("<option value=''>全部</option>");
}	
function enddatechange(){
		var workshop = $("#workshop").val();
		getChildOrgSelect("#group", workshop, "", "");
		//getChildGroupSelect("#group", workshop, "","",$('#date_start').val(),$('#date_end').val(),$('#factory').find("option:selected").text(),$('#workshop').find("option:selected").text(),null);
		$("#subgroup").html("<option value=''>全部</option>");
}	

function ajaxQuery(targetPage,queryAll){
	var workshopAll="";
	$("#workshop option").each(function(){
		workshopAll+=$(this).text()+",";
	});
	//alert(workshopAll);
	var workshop=$("#workshop :selected").text()=="全部"?workshopAll:$("#workshop :selected").text();
	
	$(".divLoading").addClass("fade in").show();
	if(curTab=="1"){
		var date= new Date(Date.parse($("#waitmanhourdate").val() + "-01"));      //转换成Data();
		var data={};
		if(queryAll=='all'){
			data={
			    	"factory":$("#factory").find("option:selected").text(),
			    	"workshop":workshop,
			    	"group":$("#group").find("option:selected").text(),
			    	"subgroup":$("#subgroup").find("option:selected").text(),
			    	"staff_number":$("#staff_number").val(),
			    	"bus_number":$("#bus_number").val(),
			    	"date_start":$("#date_start").val(),
			    	"date_end":$("#date_end").val()
			    };
		}else{
			data={
		    	"factory":$("#factory").find("option:selected").text(),
		    	"workshop":workshop,
		    	"group":$("#group").find("option:selected").text(),
		    	"subgroup":$("#subgroup").find("option:selected").text(),
		    	"staff_number":$("#staff_number").val(),
		    	"bus_number":$("#bus_number").val(),
		    	"date_start":$("#date_start").val(),
		    	"date_end":$("#date_end").val(),
		       	"pager.pageSize":5,
				"pager.curPage":targetPage || 1
		    }
		}
		$.ajax({
			url: "hrReport!getPieceTimeReport.action",
		    dataType: "json",
		    async: false,
		    type: "get",
		    data: data,
		    success:function(response){
		    	if(response.success) {
		    		var tablebody;
		    		if(queryAll=='all'){
		    			tablebody=$("#attendanceTableAll tbody");
		    		}else{
		    			tablebody=$("#attendanceTable tbody");
		    		}
		    		$(tablebody).html("");
		    		
		    		var count = 1;
		    		var warp = document.createDocumentFragment();//创建文档碎片节点,最后渲染该碎片节点，减少浏览器渲染消耗的资源
	                $.each(response.data, function (index, staff_info) {
	                	var piece_str = staff_info.piece_str;	//"1688377,肖松辉,电器调试组,1,1.5,0.00|2106731,熊明然,电器调试组,1,1.4,0.00|"; //
	    	    		var piece_Arr = piece_str.split("|");
	                	//获取当前车号的参与人数，统计‘|’次数
	    	    		for (var i=0;i<piece_Arr.length-1;i++){
	    	    			var tr = $("<tr />");
		    				if(i==0){
		    					$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(count).appendTo(tr);
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.bus_number).appendTo(tr);
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.standard_price).appendTo(tr);
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.bonus).appendTo(tr);
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.plant_org).appendTo(tr);	
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.workshop_org).appendTo(tr);
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.workgroup_org).appendTo(tr);
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.team_org).appendTo(tr);
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.work_date).appendTo(tr);
		    				}
		    				var piece_info = piece_Arr[i];	//"1688377,肖松辉,电器调试组,1,1.5,0.00"
		    				var piece_info_arr = piece_info.split(",");
		    				//$("<td style=\"padding-left:0px;padding-right:0px\" />").html(piece_info).appendTo(tr);
		    				for(var j=0;j<piece_info_arr.length;j++){		    				
		    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html(piece_info_arr[j]).appendTo(tr);
		    				}
		    				$(warp).append(tr);
	                	}	    	    		
	    	    		
	                	count++;
	                });      
	                
	                $(tablebody).append($(warp));
	                if(queryAll!='all'){
	                	$("#total_type").html("台车辆记录");
	  	        		$("#total").html(response.pager.totalCount);
	  	        		$("#total").attr("total",response.pager.totalCount);
	  	        		$("#cur").attr("page",response.pager.curPage);
	  	        		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
	  	        		$("#pagination").show();
	                }
	              
	            } 
		    }
		});
	}else if(curTab=="2"){
		var data={};
		if(queryAll=='all'){
			data={
			    	"factory":$("#factory").find("option:selected").text(),
			    	"workshop":workshop,
			    	"group":$("#group").find("option:selected").text(),
			    	"subgroup":$("#subgroup").find("option:selected").text(),
			    	"staff_number":$("#staff_number").val(),
			    	"bus_number":$("#bus_number").val(),
			    	"date_start":$("#date_start").val(),
			    	"date_end":$("#date_end").val()
			    }
		}else{
			data={
			    	"factory":$("#factory").find("option:selected").text(),
			    	"workshop":workshop,
			    	"group":$("#group").find("option:selected").text(),
			    	"subgroup":$("#subgroup").find("option:selected").text(),
			    	"staff_number":$("#staff_number").val(),
			    	"bus_number":$("#bus_number").val(),
			    	"date_start":$("#date_start").val(),
			    	"date_end":$("#date_end").val(),
			       	"pager.pageSize":5,
					"pager.curPage":targetPage || 1
			    }
		}
		$.ajax({
			url: "hrReport!getPieceTimeReport2.action",
		    dataType: "json",
		    async: false,
		    type: "get",
		    data: data,
		    success:function(response){
		    	if(response.success) {
		    		
		    		if(queryAll=='all'){
		    			$("#attendanceTable2All tbody").html("");
		    		}else
		    			$("#attendanceTable2 tbody").html("");
		    		var count = 1;
		    		var warp = document.createDocumentFragment();//创建文档碎片节点,最后渲染该碎片节点，减少浏览器渲染消耗的资源
	                $.each(response.data, function (index, staff_info) {
	                	var piece_str = staff_info.piece_str;	//"K8-SB-2015-2457,2016-01-04,1,0|K8-SB-2015-2458,2016-01-04,1,0|K8-SB-2015-2459,2016-01-04,1,0|K8-SB-2015-2456,2016-01-04,1,0|"; //
	    	    		var piece_Arr = piece_str.split("|");
	                	//获取当前车号的参与人数，统计‘|’次数
	    	    		var sum_ppay=0;
	    	    		var bus_count = 0;	
	    	    		var bonus_count=0;
	    	    		for (var i=0;i<piece_Arr.length-1;i++){
	    	    			var tr = $("<tr />");
		    				if(i==0){
		    					$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(count).appendTo(tr);
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.staff_number).appendTo(tr);
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.staff_name).appendTo(tr);
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.plant_org).appendTo(tr);
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.workshop_org).appendTo(tr);		
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.workgroup_org).appendTo(tr);
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.team_org).appendTo(tr);
			    				$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.job).appendTo(tr);
			    				/*$("<td rowspan="+(piece_Arr.length-1)+" style=\"padding-left:0px;padding-right:0px\" />").html(staff_info.distribution).appendTo(tr);*/
		    				}
		    				var piece_info = piece_Arr[i];	//"K8-SB-2015-2457,2016-01-04,1,0,bus_count"
		    				var piece_info_arr = piece_info.split(",");
		    				//$("<td style=\"padding-left:0px;padding-right:0px\" />").html(piece_info).appendTo(tr);
		    				for(var j=0;j<piece_info_arr.length;j++){
		    					if(j==4){
		    						$("<td style=\"padding-left:0px;padding-right:0px\" />").html(changeTwoDecimal(piece_info_arr[j])).appendTo(tr);
		    						sum_ppay+=parseFloat(piece_info_arr[j]);
		    					}else if(j==6){
		    						bonus_count += parseFloat(piece_info_arr[j]);
		    						$("<td style=\"padding-left:0px;padding-right:0px\" />").html(piece_info_arr[j]).appendTo(tr);
		    					}
		    					else if(j==7){
		    						bus_count += parseFloat(piece_info_arr[j]);
		    					}else{
		    						$("<td style=\"padding-left:0px;padding-right:0px\" />").html(piece_info_arr[j]).appendTo(tr);
		    					}
		    				}
		    				 
		    				if(queryAll=='all'){
		    					$(warp).append(tr);
				    		}else
				    			$("#attendanceTable2 tbody").append(tr);
		    				
		    				if(i==piece_Arr.length-2){	//增加合计栏
		    					var tr = $("<tr />");
		    					$("<td style=\"padding-left:0px;padding-right:0px;font-weight:bold\" />").html("合计").appendTo(tr);
		    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html("").appendTo(tr);
		    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html("").appendTo(tr);
		    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html("").appendTo(tr);
		    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html("").appendTo(tr);
		    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html("").appendTo(tr);
		    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html("").appendTo(tr);
		    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html("").appendTo(tr);	    					
		    					$("<td style=\"padding-left:0px;padding-right:0px;font-weight:bold\" />").html(bus_count).appendTo(tr);
		    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html("").appendTo(tr);
		    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html("").appendTo(tr);
		    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html("").appendTo(tr);
		    					$("<td style=\"padding-left:0px;padding-right:0px;font-weight:bold\" />").html(changeTwoDecimal(sum_ppay)).appendTo(tr);
		    					$("<td style=\"padding-left:0px;padding-right:0px\" />").html("").appendTo(tr);
		    					$("<td style=\"padding-left:0px;padding-right:0px;font-weight:bold\" />").html(bonus_count).appendTo(tr);
		    					if(queryAll=='all'){
		    						$(warp).append(tr);					    			
					    		}else
					    			$("#attendanceTable2 tbody").append(tr);
		    				}
	                	}
	                	count++;
	                });     
	                if(queryAll=='all'){
	                	$("#attendanceTable2All tbody").append($(warp));
	                }else{
	                	 $("#total_type").html("条人员记录");
	 	        		$("#total").html(response.pager.totalCount);
	 	        		$("#total").attr("total",response.pager.totalCount);
	 	        		$("#cur").attr("page",response.pager.curPage);
	 	        		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
	 	        		$("#pagination").show();
	                }
	               
	            } 
		    }
		});
		
	}
	$(".divLoading").hide();
}

changeTwoDecimal = function changeTwoDecimal(floatvar) {
	var f_x = parseFloat(floatvar);
	if (isNaN(f_x)) {
		return false;
	}
	var f_x = Math.round(floatvar * 100) / 100;
	return f_x;
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