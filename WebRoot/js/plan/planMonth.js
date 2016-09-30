$(document).ready(function () {	
	initPage();
	function initPage(){
		$("#search_plan_version").val(GetQueryString("version"));
		getFactorySelect();
		$('#revision_str').val("");
		$("#btnSave").attr("disabled","disabled");
		cur_year = new Date().getFullYear();
		$("#search_year").html('<option value="'+cur_year+'">'+cur_year+'</option><option value="'+(cur_year-1)+'">'+(cur_year-1)+'</option><option value="'+(cur_year+1)+'">'+(cur_year+1)+'</option><option value="'+(cur_year+2)+'">'+(cur_year+2)+'</option>');	
		if(new Date().getMonth()+1 <10){
			$("#search_month").val("0"+(new Date().getMonth()+1));
		}else{
			$("#search_month").val(new Date().getMonth()+1);
		}
		getOrderNoSelect("#search_order_no","#orderId");
		getUserFactory();
	};
	
	$("#btnQuery").click (function () {
		if($('#search_order_no').val() == ""){
			alert("请输入订单号！");
			$('#search_order_no').focus();
			return false;
		}else if($('#search_factory').val() == ""){
			alert("请选择工厂！");
		}
		$('#revision_str').val("");
		ajaxQuery();
		return false;
	});
	
	$(".cell").live("change",function(e){
		//alert("012;345;6".indexOf(";"));
		//判断是否已经修改过此单元格数据
		
		var start = String($('#revision_str').val()).indexOf(String($("#order_id").val()) + "," + String($("#factory_id").val()) + "," 
				+ String($(e.target).closest("tr").attr("id"))+ "," 
				+ String($(e.target).closest("td").prevAll().length-2));
		var revision_str = String($('#revision_str').val());
		if(start>=0){
			str2 = revision_str.substring(start,revision_str.length);
			revision_str.replace(revision_str.substr(start,str2.indexOf(";")+1),"");
			$("#revision_str").val(revision_str.replace(revision_str.substr(start,str2.indexOf(";")+1),""));
		}
		var chang_num = "0";
		if($(e.target).val() == ""){
			chang_num = "0";
		}else{
			chang_num = $(e.target).val();
		}
		
		$("#revision_str").val(String($('#revision_str').val()) + String($("#order_id").val()) 
				+ "," + String($("#factory_id").val()) + "," 
				+ String($(e.target).closest("tr").attr("id")) + "," 
				+ String($(e.target).closest("td").prevAll().length-2) + "," 
				+ String(chang_num) + ",0;");
	});
	
	$("#btnSave").click (function () {
		//alert($('#revision_str').val());
		$("#btnSave").attr("disabled","disabled");
		$.ajax({
		    url: "plan!reVisionPlan.action",
    	    dataType: "json",
			type: "get",
		    data: {
		    	"factory_id": $('#search_factory').val(),
		    	"order_no": $('#search_order_no').val(),
		    	"revision_str": $('#revision_str').val(),
		    	"plan_month": $("#search_year").val() + $("#search_month").val(),
		    },
		    success:function(response){		
		    	alert("计划调整成功");
		    	ajaxQuery();
		    	$("#btnSave").removeAttr("disabled");
				return false;
		    }
		});
		return false;
	});
	
	function ajaxQuery(targetPage){
		$("#divBulkAdd").hide();
		$.ajax({
		    url: "plan!showPlanMasterList.action",
    	    dataType: "json",
			type: "get",
		    data: {
		    	"version":"",
		    	"factory_id": $('#search_factory').val(),
		    	"order_no": $('#search_order_no').val(),
		    	"plan_month": $("#search_year").val() + $("#search_month").val(),
		    	"pager.pageSize":10,
				"pager.curPage":targetPage || 1
		    },
		    success:function(response){			    	
	    		$("#MyTable tbody").html("");
	    		$("#btnSave").removeAttr("disabled");
	    		var stock = new Array(0,0,0,0,0,0,0,0,0,0,0,0);		//库存
	    		var day = new Array("日", "一", "二", "三", "四", "五", "六"); 
	    		var input = "<input class=\"cell\" style=\"border:0;width:18px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=";
	    		
	    		$.each(response.data,function (index,value) {
	    			if(index%12 == 0){
	    				//var firstDay = new Date(value.plan_month.substring(0,4) + "-" + value.plan_month.substring(4,6) + "-01");
	    				//var strTime="2011-04-16";    //字符串日期格式           
	    				var date= new Date(Date.parse((value.plan_month.substring(0,4) + "-" + value.plan_month.substring(4,6) + "-01").replace(/-/g,  "/")));      //转换成Data();
	    				//alert(day[date.getDay()]);
	    				$("#order_id").val(value.order_id);
	    				$("#factory_id").val(value.factory_id);
	    				var tr = $("<tr/>");
	    				var i = 0; var fday = date.getDay();
	    	    		$("<td style=\" line-height:12px;\" />").html("<b>&nbsp;&nbsp;&nbsp;&nbsp;节点</b>").appendTo(tr);
	    	    		$("<td style=\"line-height:12px;\" />").html("<b>&nbsp;&nbsp;月份</b>").appendTo(tr);
	    	    		$("<td style=\"width:20px;line-height:12px;\" />").html("<b>库存</b>").appendTo(tr);
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;

	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;

	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;

	    	    		$("<td style=\"line-height:12px;\" />").html(day[(date.getDay()+i%7)%7]).appendTo(tr);i++;
	    	    		$("<td style=\"line-height:12px;\" />").html("").appendTo(tr);
	    	    		$("<td style=\"line-height:12px;\" />").html("").appendTo(tr);
	    	    		$("#MyTable tbody").append(tr);
	    			}
	    			tr = $("<tr id=\""+ index + "," +value.plan_month+"\"/>");
	    			$("<td style=\"line-height:12px;\" />").html(value.plan_code_keyname).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html(value.plan_month).appendTo(tr);
	    			$("<td style=\"line-height:12px;\" />").html(stock[index%12]).appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d1==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"01'>":input + value.d1 + " id='" + value.plan_code_id + "_"+value.plan_month+"01'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d2==0)?input +"'' id='"+value.plan_code_id + "_" +value.plan_month+"02'>":input + value.d2 + " id='" + value.plan_code_id + "_"+value.plan_month+"02'>").appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d3==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"03'>":input + value.d3 + " id='" + value.plan_code_id + "_"+value.plan_month+"03'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d4==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"04'>":input + value.d4 + " id='" + value.plan_code_id + "_"+value.plan_month+"04'>").appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d5==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"05'>":input + value.d5 + " id='" + value.plan_code_id + "_"+value.plan_month+"05'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d6==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"06'>":input + value.d6 + " id='" + value.plan_code_id + "_"+value.plan_month+"06'>").appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d7==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"07'>":input + value.d7 + " id='" + value.plan_code_id + "_"+value.plan_month+"07'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d8==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"08'>":input + value.d8 + " id='" + value.plan_code_id + "_"+value.plan_month+"08'>").appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d9==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"09'>":input + value.d9 + " id='" + value.plan_code_id + "_"+value.plan_month+"09'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d10==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"10'>":input + value.d10 + " id='" + value.plan_code_id + "_"+value.plan_month+"10'>").appendTo(tr);
	    			
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d11==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"11'>":input + value.d11 + " id='" + value.plan_code_id + "_"+value.plan_month+"11'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d12==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"12'>":input + value.d12 + " id='" + value.plan_code_id + "_"+value.plan_month+"12'>").appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d13==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"13'>":input + value.d13 + " id='" + value.plan_code_id + "_"+value.plan_month+"13'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d14==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"14'>":input + value.d14 + " id='" + value.plan_code_id + "_"+value.plan_month+"14'>").appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d15==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"15'>":input + value.d15 + " id='" + value.plan_code_id + "_"+value.plan_month+"15'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d16==0)?input +"'' id='"+value.plan_code_id + "_" +value.plan_month+"16'>":input + value.d16 + " id='" + value.plan_code_id + "_"+value.plan_month+"16'>").appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d17==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"17'>":input + value.d17 + " id='" + value.plan_code_id + "_"+value.plan_month+"17'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d18==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"18'>":input + value.d18 + " id='" + value.plan_code_id + "_"+value.plan_month+"18'>").appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d19==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"19'>":input + value.d19 + " id='" + value.plan_code_id + "_"+value.plan_month+"19'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d20==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"20'>":input + value.d20 + " id='" + value.plan_code_id + "_"+value.plan_month+"20'>").appendTo(tr);

	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d21==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"21'>":input + value.d21 + " id='" + value.plan_code_id + "_"+value.plan_month+"21'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d22==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"22'>":input + value.d22 + " id='" + value.plan_code_id + "_"+value.plan_month+"22'>").appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d23==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"23'>":input + value.d23 + " id='" + value.plan_code_id + "_"+value.plan_month+"23'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d24==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"24'>":input + value.d24 + " id='" + value.plan_code_id + "_"+value.plan_month+"24'>").appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d25==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"25'>":input + value.d25 + " id='" + value.plan_code_id + "_"+value.plan_month+"25'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d26==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"26'>":input + value.d26 + " id='" + value.plan_code_id + "_"+value.plan_month+"26'>").appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d27==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"27'>":input + value.d27 + " id='" + value.plan_code_id + "_"+value.plan_month+"27'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d28==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"28'>":input + value.d28 + " id='" + value.plan_code_id + "_"+value.plan_month+"28'>").appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d29==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"29'>":input + value.d29 + " id='" + value.plan_code_id + "_"+value.plan_month+"29'>").appendTo(tr);$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d30==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"30'>":input + value.d30 + " id='" + value.plan_code_id + "_"+value.plan_month+"30'>").appendTo(tr);

	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html((value.d31==0)?input +"'' id='" + value.plan_code_id + "_"+value.plan_month+"31'>":input + value.d31 + " id='" + value.plan_code_id + "_"+value.plan_month+"31'>").appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html(value.sumQty).appendTo(tr);
	    			$("<td style=\"line-height:12px; padding-bottom:0px;padding-top:0px;padding-left:5px\" />").html(value.sumQty + stock[index%12]).appendTo(tr);
	    			stock[index]+=value.sumQty;
	    			$("#MyTable tbody").append(tr);
	    			
	    			
	    			
	    		});
	    		
	    		/*$("#total").html(response.pager.totalCount);
	    		$("#total").attr("total",response.pager.totalCount);
	    		$("#cur").attr("page",response.pager.curPage);
	    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
	    		$("#pagination").show();*/
	    		//---->
    			$.ajax({
    			    url: "plan!getPlanIssed.action",
    	    	    dataType: "json",
    				type: "get",
    			    data: {
    			    	"order_no": $('#search_order_no').val(),
    			    	"factory_id": $('#search_factory').val(),   			    	
    			    },
    			    success:function(response){
    			    	// TODO 已发布的计划不能调整
    			    	$.each(response.data,function (index,value) {
    			    		//alert(value.PLAN_CODE_ID + "_" + value.PLAN_DATE)
    			    		$("#"+value.PLAN_CODE_ID + "_" + value.PLAN_DATE).attr("disabled","disabled")
    			    	})
    			    }
    			});
	    		/*$("#MyTable tr:gt(0) td").find("input").each(function(i){
	    		    $(this).attr("disabled","disabled");
	    		});*/
    			return false;
		    }
		});
	}
	
	
})

function getFactorySelect() {
	$.ajax({
		url : "common!getFactorySelect.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects_empty(response, "", "#search_factory");			
		}
	});
}

function getUserFactory(){
	$.ajax({
		url : "common!getFactoryInfoByUserId.action",
		dataType : "json",
		data : {},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			$.each(response.data,function (index,value) {
				$("#search_factory").val(value.FACTORY_ID)
			})
			
		}
	});
	
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}