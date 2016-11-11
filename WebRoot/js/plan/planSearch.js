var li_flag = "1";
$(document).ready(function () {
	initPage();
	
	function initPage(){
		getFactorySelect();
		getOrderNoSelect("#search_order_no","#orderId");
		$("#search_factory").val(16);
		$("#start_date").val(getMonthStartDate());
		$("#end_date").val(getMonthEndDate());
		$("#planSearchResultdiv").show();
		$("#planSearchDetaildiv").hide();
		$("#btnQuery").removeAttr("disabled");
		$("#tablePlanDetail tbody").css('height',parseInt($(window).height())-355);
		getWorkshopSelect();
		//add by wuxiao 2015/9/30
		ajaxQuery(1);
		
	}
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect();
	})
	
	$("#btnQuery").click (function () {
		if($("#search_factory").val()==""){
			alert("请选择生产工厂！");
			return false;
		}
		/*if($("#search_order_no").val()==""){
			alert("请输入生产订单！");
			$("#search_order_no").focus()
			return false;
		}*/
		if($("#start_date").val()==""){
			alert("请选择生产开始日期！");
			$("#start_date").focus();
			return false;
		}
		if($("#end_date").val()==""){
			alert("请选择生产结束日期！");
			$("#end_date").focus();
			return false;
		}
		ajaxQuery();
		return false;
	});
	
	$("li").live('click',function(e){
		if(this.id == "planSearchResult"){
			li_flag = "1";
			$("#planSearchResultdiv").show();
			$("#planSearchDetaildiv").hide();
			getSearch();
		}else if(this.id == "planSearchDetail"){
			li_flag = "2";
			$("#planSearchResultdiv").hide();
			$("#planSearchDetaildiv").show();
			getDetail();
		}
	});
	
})

function ajaxQuery(targetPage){	
	if (li_flag =="1"){
		getSearch();
	}else{
		getDetail();
	}
}

function getSearch(){
	$.ajax({
	    url: "plan!showPlanSearch.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"order_no": $('#search_order_no').val().trim(),
	    	"workshop": $('#search_workshop').find("option:selected").text(),
	    	"start_date": $('#start_date').val(),
	    	"end_date": $('#end_date').val(),
	    },
	    success:function(response){		    		
    		$("#tablePlan tbody").html("");
    		var last_order="";
    		var orderTd="";
    		var tplan_zzj=0;
    		var treal_zzj=0;
    		var tplan_bjon=0;
    		var treal_bjon=0;
    		var tplan_bjoff=0;
    		var treal_bjoff=0;
    		
    		var tplan_hzon=0;
    		var treal_hzon=0;
    		var tplan_hzoff=0;
    		var treal_hzoff=0;
    		
    		var tplan_tzon=0;
    		var treal_tzon=0;
    		var tplan_tzoff=0;
    		var treal_tzoff=0;
    		
    		var tplan_dpon=0;
    		var treal_dpon=0;
    		var tplan_dpoff=0;
    		var treal_dpoff=0;
    		
    		var tplan_zzon=0;
    		var treal_zzon=0;
    		var tplan_zzoff=0;
    		var treal_zzoff=0;
    		
    		var tplan_rk=0;
    		var treal_rk=0;
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr id= '"+value.id+"'/>");  			
    			if(last_order==value.order_desc){
    				var rowspan=parseInt($(orderTd).attr("rowspan"));
    				$(orderTd).attr("rowspan",rowspan+1);
    			}else{ 
    				orderTd="#order_"+value.order_id;
    				$("<td style=\"text-align:center;\" rowspan=1 id='order_"+value.order_id+"'/>").html(value.order_desc).appendTo(tr);
    			}
    			
    			$("<td style=\"text-align:center;\" />").html(value.key_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.total_plan_qty).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.real_qty).appendTo(tr);
/*    			$("<td style=\"text-align:center;\" />").html(value.sum_amend_qty).appendTo(tr);*/
    			var rate_qty = "-";var rate_amend_qty = "-";
    			if(value.total_plan_qty != 0){
    				rate_qty = Math.round(value.real_qty / value.total_plan_qty * 10000) / 100.00 + "%";
/*    				rate_amend_qty = Math.round(value.sum_amend_qty / value.total_plan_qty * 10000) / 100.00 + "%";*/
    			}
    			$("<td style=\"text-align:center;\" />").html(rate_qty).appendTo(tr);
/*    			$("<td style=\"text-align:center;\" />").html(rate_amend_qty).appendTo(tr);*/
    			$("<td style=\"text-align:center;\" />").html(value.total_qty).appendTo(tr);
    			last_order=value.order_desc;
    			$("#tablePlan tbody").append(tr);	

        		tplan_zzj+=(value.key_name=='自制件下线'?parseInt(value.total_plan_qty):0);
        		treal_zzj+=(value.key_name=='自制件下线'?parseInt(value.real_qty):0);
        		tplan_bjon+=(value.key_name=='部件上线'?parseInt(value.total_plan_qty):0);
        		treal_bjon+=(value.key_name=='部件上线'?parseInt(value.real_qty):0);
        		tplan_bjoff+=(value.key_name=='部件下线'?parseInt(value.total_plan_qty):0);
        		treal_bjoff+=(value.key_name=='部件下线'?parseInt(value.real_qty):0);       		
        		tplan_hzon+=(value.key_name=='焊装上线'?parseInt(value.total_plan_qty):0);
        		treal_hzon+=(value.key_name=='焊装上线'?parseInt(value.real_qty):0);
        		tplan_hzoff+=(value.key_name=='焊装下线'?parseInt(value.total_plan_qty):0);
        		treal_hzoff+=(value.key_name=='焊装下线'?parseInt(value.real_qty):0);        		
        		tplan_tzon+=(value.key_name=='涂装上线'?parseInt(value.total_plan_qty):0);
        		treal_tzon+=(value.key_name=='涂装上线'?parseInt(value.real_qty):0);
        		tplan_tzoff+=(value.key_name=='涂装下线'?parseInt(value.total_plan_qty):0);
        		treal_tzoff+=(value.key_name=='涂装下线'?parseInt(value.real_qty):0);       		
        		tplan_dpon+=(value.key_name=='底盘上线'?parseInt(value.total_plan_qty):0);
        		treal_dpon+=(value.key_name=='底盘上线'?parseInt(value.real_qty):0);
        		tplan_dpoff+=(value.key_name=='底盘下线'?parseInt(value.total_plan_qty):0);
        		treal_dpoff+=(value.key_name=='底盘下线'?parseInt(value.real_qty):0);
        		tplan_zzon+=(value.key_name=='总装上线'?parseInt(value.total_plan_qty):0);
        		treal_zzon+=(value.key_name=='总装上线'?parseInt(value.real_qty):0);
        		tplan_zzoff+=(value.key_name=='总装下线'?parseInt(value.total_plan_qty):0);
        		treal_zzoff+=(value.key_name=='总装下线'?parseInt(value.real_qty):0);
        		tplan_rk+=(value.key_name=='入库'?parseInt(value.total_plan_qty):0);
        		treal_rk+=(value.key_name=='入库'?parseInt(value.real_qty):0);
    			
    		});
    		$("#tr_plan").find("td").eq("1").html(tplan_zzj);
    		$("#tr_plan").find("td").eq("2").html(tplan_bjoff);
    		$("#tr_plan").find("td").eq("3").html(tplan_hzon);
    		$("#tr_plan").find("td").eq("4").html(tplan_tzon);
    		$("#tr_plan").find("td").eq("5").html(tplan_dpon);
    		$("#tr_plan").find("td").eq("6").html(tplan_zzoff);
    		$("#tr_plan").find("td").eq("7").html(tplan_rk);
    		
    		$("#tr_realDone").find("td").eq("1").html(treal_zzj);
    		$("#tr_realDone").find("td").eq("2").html(treal_bjoff);
    		$("#tr_realDone").find("td").eq("3").html(treal_hzon);
    		$("#tr_realDone").find("td").eq("4").html(treal_tzon);
    		$("#tr_realDone").find("td").eq("5").html(treal_dpon);
    		$("#tr_realDone").find("td").eq("6").html(treal_zzon);
    		$("#tr_realDone").find("td").eq("7").html(treal_rk);
    		
    		$("#tr_doneRate").find("td").eq("1").html(tplan_zzj==0?"-":(Math.round(treal_zzj/tplan_zzj * 10000) / 100.00 + "%"));
    		$("#tr_doneRate").find("td").eq("2").html(tplan_bjoff==0?"-":(Math.round(treal_bjoff/tplan_bjoff * 10000) / 100.00 + "%"));
    		$("#tr_doneRate").find("td").eq("3").html(tplan_hzon==0?"-":(Math.round(treal_hzon/tplan_hzon * 10000) / 100.00 + "%"));
    		$("#tr_doneRate").find("td").eq("4").html(tplan_tzon==0?"-":(Math.round(treal_tzon/tplan_tzon * 10000) / 100.00 + "%"));
    		$("#tr_doneRate").find("td").eq("5").html(tplan_dpon==0?"-":(Math.round(treal_dpon/tplan_dpon * 10000) / 100.00 + "%"));
    		$("#tr_doneRate").find("td").eq("6").html(tplan_zzoff==0?"-":(Math.round(treal_zzoff/tplan_zzoff * 10000) / 100.00 + "%"));
    		$("#tr_doneRate").find("td").eq("7").html(tplan_rk==0?"-":(Math.round(treal_rk/tplan_rk * 10000) / 100.00 + "%"));
    		
    		
    		/*$("#tr_zzj").find("td").eq("1").html(tplan_zzj);
    		$("#tr_zzj").find("td").eq("2").html(treal_zzj);
    		$("#tr_zzj").find("td").eq("3").html(tplan_zzj==0?"-":(Math.round(treal_zzj/tplan_zzj * 10000) / 100.00 + "%"));
    		$("#tr_bjon").find("td").eq("1").html(tplan_bjon);
    		$("#tr_bjon").find("td").eq("2").html(treal_bjon);
    		$("#tr_bjon").find("td").eq("3").html(tplan_bjon==0?"-":(Math.round(treal_bjon/tplan_bjon * 10000) / 100.00 + "%"));
    		$("#tr_bjoff").find("td").eq("1").html(tplan_bjoff);
    		$("#tr_bjoff").find("td").eq("2").html(treal_bjoff);
    		$("#tr_bjoff").find("td").eq("3").html(tplan_bjoff==0?"-":(Math.round(treal_bjoff/tplan_bjoff * 10000) / 100.00 + "%")); 		
    		$("#tr_hzon").find("td").eq("1").html(tplan_hzon);
    		$("#tr_hzon").find("td").eq("2").html(treal_hzon);
    		$("#tr_hzon").find("td").eq("3").html(tplan_hzon==0?"-":(Math.round(treal_hzon/tplan_hzon * 10000) / 100.00 + "%"));
    		$("#tr_hzoff").find("td").eq("1").html(tplan_hzoff);
    		$("#tr_hzoff").find("td").eq("2").html(treal_hzoff);
    		$("#tr_hzoff").find("td").eq("3").html(tplan_hzoff==0?"-":(Math.round(treal_hzoff/tplan_hzoff * 10000) / 100.00 + "%"));
    		$("#tr_tzon").find("td").eq("1").html(tplan_tzon);
    		$("#tr_tzon").find("td").eq("2").html(treal_tzon);
    		$("#tr_tzon").find("td").eq("3").html(tplan_tzon==0?"-":(Math.round(treal_tzon/tplan_tzon * 10000) / 100.00 + "%"));
    		$("#tr_tzoff").find("td").eq("1").html(tplan_tzoff);
    		$("#tr_tzoff").find("td").eq("2").html(treal_tzoff);
    		$("#tr_tzoff").find("td").eq("3").html(tplan_tzoff==0?"-":(Math.round(treal_tzoff/tplan_tzoff * 10000) / 100.00 + "%"));
    		$("#tr_dpon").find("td").eq("1").html(tplan_dpon);
    		$("#tr_dpon").find("td").eq("2").html(treal_dpon);
    		$("#tr_dpon").find("td").eq("3").html(tplan_dpon==0?"-":(Math.round(treal_dpon/tplan_dpon * 10000) / 100.00 + "%"));
    		$("#tr_dpoff").find("td").eq("1").html(tplan_dpoff);
    		$("#tr_dpoff").find("td").eq("2").html(treal_dpoff);
    		$("#tr_dpoff").find("td").eq("3").html(tplan_dpoff==0?"-":(Math.round(treal_dpoff/tplan_dpoff * 10000) / 100.00 + "%"));
    		$("#tr_zzon").find("td").eq("1").html(tplan_zzon);
    		$("#tr_zzon").find("td").eq("2").html(treal_zzon);
    		$("#tr_zzon").find("td").eq("3").html(tplan_zzon==0?"-":(Math.round(treal_zzon/tplan_zzon * 10000) / 100.00 + "%"));
    		$("#tr_zzoff").find("td").eq("1").html(tplan_zzoff);
    		$("#tr_zzoff").find("td").eq("2").html(treal_zzoff);
    		$("#tr_zzoff").find("td").eq("3").html(tplan_zzoff==0?"-":(Math.round(treal_zzoff/tplan_zzoff * 10000) / 100.00 + "%"));
    		$("#tr_rk").find("td").eq("1").html(tplan_rk);
    		$("#tr_rk").find("td").eq("2").html(treal_rk);
    		$("#tr_rk").find("td").eq("3").html(tplan_rk==0?"-":(Math.round(treal_rk/tplan_rk * 10000) / 100.00 + "%"));*/
	    }
	});
}

function getDetail(){
	$("#btnQuery").attr("disabled","disabled");
	$("#btnQuery").html("查询中..");
	$(".divLoading").addClass("fade in").show();
	if($("#search_factory").val()==""){
		alert("请选择生产工厂！");
		return false;
	}
	/*if($("#search_order_no").val()==""){
		alert("请输入生产订单！");
		$("#search_order_no").focus()
		return false;
	}*/
	if($("#start_date").val()==""){
		alert("请选择生产开始日期！");
		$("#start_date").focus();
		return false;
	}
	if($("#end_date").val()==""){
		alert("请选择生产结束日期！");
		$("#end_date").focus();
		return false;
	}
	
	var start_date = StringToDate($('#start_date').val());
	var end_date = StringToDate($('#end_date').val());
	//alert(DateDiff('d',start_date,end_date));
	var dateCount = DateDiff('d',start_date,end_date);
	if(dateCount<0||dateCount>30){
		alert("请输入正确的日期区间，最长不能超过31天！");
		return false;
	}
	//alert(dateCount);
	var searchDateArray="";
	//var curdate = 
	for(var i=0;i<=dateCount;i++){
		 
		searchDateArray += ChangeDateToString(start_date) + ',';
		$("#D"+(i+1)).html(start_date.getDate());
		start_date = StringToDate(nextdate(start_date));
	}
	//alert(searchDateArray);
	for(var i=dateCount+1;i<=31;i++){
		$("#D"+(i+1)).html(" ");
	}
	var workshop = $('#search_workshop').find("option:selected").text();
	$.ajax({
	    url: "plan!showPlanSearchDetail.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"order_no": $('#search_order_no').val(),
	    	"workshop": workshop,
	    	"date_array": searchDateArray,
	    },
	    success:function(response){		    		
    		$("#tablePlanDetail tbody").html("");
    		var order_no = ""
    		$.each(response.data,function (index,value) {
    			if ((workshop == "全部" )||((value.workshop).indexOf(workshop)>=0)){
    				var tr = $("<tr id= '"+value.id+"'/>");
    				/*if(order_no==value.order_no){
    					var rowspan=parseInt($("#order_"+order_no).attr("rowspan"));
    					$("#order_"+order_no).attr("rowspan",rowspan+1);
    				}else
    					*/$("<td id='order_"+value.order_no+"' style=\"text-align:center; width:70px;\" />").html(value.order_no).appendTo(tr);
        			order_no = value.order_no;
        			$("<td style=\"text-align:center; width:105px;\" />").html(value.workshop).appendTo(tr);
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D1).appendTo(tr);
        			((index+1)%2==1)?planQty1 = value.D1:realQty1 = value.D1;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D2).appendTo(tr);
        			((index+1)%2==1)?planQty2 = value.D2:realQty2 = value.D2;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D3).appendTo(tr);
        			((index+1)%2==1)?planQty3 = value.D3:realQty3 = value.D3;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D4).appendTo(tr);
        			((index+1)%2==1)?planQty4 = value.D4:realQty4 = value.D4;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D5).appendTo(tr);
        			((index+1)%2==1)?planQty5 = value.D5:realQty5 = value.D5;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D6).appendTo(tr);
        			((index+1)%2==1)?planQty6 = value.D6:realQty6 = value.D6;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D7).appendTo(tr);
        			((index+1)%2==1)?planQty7 = value.D7:realQty7 = value.D7;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D8).appendTo(tr);
        			((index+1)%2==1)?planQty8 = value.D8:realQty8 = value.D8;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D9).appendTo(tr);
        			((index+1)%2==1)?planQty9 = value.D9:realQty9 = value.D9;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D10).appendTo(tr);
        			((index+1)%2==1)?planQty10 = value.D10:realQty10 = value.D10;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D11).appendTo(tr);
        			((index+1)%2==1)?planQty11 = value.D11:realQty11 = value.D11;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D12).appendTo(tr);
        			((index+1)%2==1)?planQty12 = value.D12:realQty12 = value.D12;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D13).appendTo(tr);
        			((index+1)%2==1)?planQty13 = value.D13:realQty13 = value.D13;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D14).appendTo(tr);
        			((index+1)%2==1)?planQty14 = value.D14:realQty14 = value.D14;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D15).appendTo(tr);
        			((index+1)%2==1)?planQty15 = value.D15:realQty15 = value.D15;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D16).appendTo(tr);
        			((index+1)%2==1)?planQty16 = value.D16:realQty16 = value.D16;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D17).appendTo(tr);
        			((index+1)%2==1)?planQty17 = value.D17:realQty17 = value.D17;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D18).appendTo(tr);
        			((index+1)%2==1)?planQty18 = value.D18:realQty18 = value.D18;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D19).appendTo(tr);
        			((index+1)%2==1)?planQty19 = value.D19:realQty19 = value.D19;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D20).appendTo(tr);
        			((index+1)%2==1)?planQty20 = value.D20:realQty20 = value.D20;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D21).appendTo(tr);
        			((index+1)%2==1)?planQty21 = value.D21:realQty21 = value.D21;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D22).appendTo(tr);
        			((index+1)%2==1)?planQty22 = value.D22:realQty22 = value.D22;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D23).appendTo(tr);
        			((index+1)%2==1)?planQty23 = value.D23:realQty23 = value.D23;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D24).appendTo(tr);
        			((index+1)%2==1)?planQty24 = value.D24:realQty24 = value.D24;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D25).appendTo(tr);
        			((index+1)%2==1)?planQty25 = value.D25:realQty25 = value.D25;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D26).appendTo(tr);
        			((index+1)%2==1)?planQty26 = value.D26:realQty26 = value.D26;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D27).appendTo(tr);
        			((index+1)%2==1)?planQty27 = value.D27:realQty27 = value.D27;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D28).appendTo(tr);
        			((index+1)%2==1)?planQty28 = value.D28:realQty28 = value.D28;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D29).appendTo(tr);
        			((index+1)%2==1)?planQty29 = value.D29:realQty29 = value.D29;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D30).appendTo(tr);
        			((index+1)%2==1)?planQty30 = value.D30:realQty30 = value.D30;
        			$("<td style=\"text-align:center; width:55px;\" />").html(value.D31).appendTo(tr);
        			((index+1)%2==1)?planQty31 = value.D31:realQty31 = value.D31;
        			$("<td style=\"text-align:center; width:65px;\" />").html(value.total).appendTo(tr);
        			((index+1)%2==1)?planQty32 = value.total:realQty32 = value.total;
        			$("<td style=\"text-align:center; width:70px;\" />").html(value.total_month).appendTo(tr);
        			((index+1)%2==1)?planQty33 = value.total_month:realQty33 = value.total_month;
        			$("<td style=\"text-align:center; width:70px;\" />").html(value.total_order).appendTo(tr);
        			((index+1)%2==1)?planQty34 = value.total_order:realQty34 = value.total_order;
        			$("#tablePlanDetail tbody").append(tr);	
        			//增加达成率
        			if((index+1)%2==0){
        				var tr = $("<tr id= '"+value.id+"'/>");
        				/*var rowspan=parseInt($("#order_"+order_no).attr("rowspan"));
    					$("#order_"+order_no).attr("rowspan",rowspan+1);*/
        				$("<td colSpan='1' style=\"text-align:center; text-align:center; width:70px;\" />").html(order_no).appendTo(tr);
            			$("<td colSpan='1' style=\"text-align:center; width:105px;\" />").html("达成率").appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty1,planQty1)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty2,planQty2)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty3,planQty3)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty4,planQty4)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty5,planQty5)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty6,planQty6)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty7,planQty7)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty8,planQty8)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty9,planQty9)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty10,planQty10)).appendTo(tr);

            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty11,planQty11)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty12,planQty12)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty13,planQty13)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty14,planQty14)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty15,planQty15)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty16,planQty16)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty17,planQty17)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty18,planQty18)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty19,planQty19)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty20,planQty20)).appendTo(tr);

            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty21,planQty21)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty22,planQty22)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty23,planQty23)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty24,planQty24)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty25,planQty25)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty26,planQty26)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty27,planQty27)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty28,planQty28)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty29,planQty29)).appendTo(tr);
            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty30,planQty30)).appendTo(tr);

            			$("<td style=\"text-align:center; width:55px;\" />").html(rate(realQty31,planQty31)).appendTo(tr);
            			$("<td style=\"text-align:center; width:65px;\" />").html(rate(realQty32,planQty32)).appendTo(tr);
            			$("<td style=\"text-align:center; width:70px;\" />").html(rate(realQty33,planQty33)).appendTo(tr);
            			$("<td style=\"text-align:center; width:70px;\" />").html(rate(realQty34,planQty34)).appendTo(tr);
            			
            			$("#tablePlanDetail tbody").append(tr);	
        			}
    			}
    			
    		});
    		//隐藏空白列
    		//先恢复显示
    		for(var i=0;i<36;i++){
    			$('#tablePlanDetail tr').find('th:eq('+i+')').show();
    			$('#tablePlanDetail tr').find('td:eq('+i+')').show();
    		}
    		for(var i=0;i<30-dateCount;i++){
    			$('#tablePlanDetail tr').find('th:eq('+(dateCount+3+i)+')').hide();
    			$('#tablePlanDetail tr').find('td:eq('+(dateCount+3+i)+')').hide();
    		}
    		$("#tablePlanDetail tbody tr").css({"width":"100%","display":"table","table-layout":"fixed"});
    		$("#btnQuery").html("查询");
    		$("#btnQuery").removeAttr("disabled");
    		$(".divLoading").hide();
	    }
	});
}

function rate(realQty,planQty){
	if(realQty == null || planQty == null || realQty ==0 || planQty ==0){
		return "0%";
	}else{
		return Math.round(realQty / planQty * 10000) / 100.00 + "%"
	}
}

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
			getSelects(response, "", "#search_factory");
			getWorkshopSelect();
		}
	});
}

function getWorkshopSelect() {
	$.ajax({
		url : "common!getWorkshopSelect.action",
		dataType : "json",
		data : {"factoryId": $('#search_factory').val()},
		async : false,
		error : function(response) {
			alert(response.message)
		},
		success : function(response) {
			getSelects(response, "", "#search_workshop");			
		}
	});
}

function nextdate(date){ 
	var b = date.getDate(); 
	b += 1; 
	date.setDate(b); 
	var year = date.getFullYear(); //取得当前年份命令 
	var month = date.getMonth()+1; 
	var day = date.getDate(); 
	if(month < 10){ month ='0'+ month ; } 
	if(day < 10){ day ='0'+ day ; } 
	return year+ "-"+ month+"-"+day ; 
} 

function DateDiff(strInterval,dtStart,dtEnd){
	switch (strInterval) {   
    case 's' :return parseInt((dtEnd - dtStart) / 1000);  
    case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
    case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
    case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
    case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
    case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
    case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
	}
}

function StringToDate(DateStr){     
    var converted = Date.parse(DateStr);  
    var myDate = new Date(converted);  
    if (isNaN(myDate))  
    {
        var arys= DateStr.split('-');  
        myDate = new Date(arys[0],--arys[1],arys[2]);  
    }  
    return myDate;  
}  



function ChangeDateToString(DateIn)
{
	var Year = 0;
	var Month = 0;
	var Day = 0;
	var CurrentDate = "";
	// 初始化时间
	Year = DateIn.getFullYear();
	Month = DateIn.getMonth() + 1;
	Day = DateIn.getDate();
	CurrentDate = Year + "-";
	if (Month >= 10)
	{
		CurrentDate = CurrentDate + Month + "-";
	}
	else {
		CurrentDate = CurrentDate + "0" + Month + "-";
	}
	if (Day >= 10) {
		CurrentDate = CurrentDate + Day;
	} else {
		CurrentDate = CurrentDate + "0" + Day;
	}
	return CurrentDate;

}

//格局化日期：yyyy-MM-dd 
function formatDate(date) { 
	var myyear = date.getFullYear(); 
	var mymonth = date.getMonth()+1; 
	var myweekday = date.getDate();

	if(mymonth < 10){ 
		mymonth = "0" + mymonth; 
	} 
	if(myweekday < 10){ 
		myweekday = "0" + myweekday; 
	} 
	return (myyear+"-"+mymonth + "-" + myweekday); 
}
//获得本月的开端日期 
function getMonthStartDate(){
	var now = new Date(); //当前日期 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var monthStartDate = new Date(nowYear, nowMonth, 1); 
	return formatDate(monthStartDate); 
}
//获得本月的停止日期 
function getMonthEndDate(){ 
	var now = new Date(); //当前日期 
	var nowMonth = now.getMonth(); //当前月 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth)); 
	return formatDate(monthEndDate); 
}
//获得某月的天数 
function getMonthDays(myMonth){
	var now = new Date(); //当前日期 
	var nowYear = now.getYear(); //当前年 
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var monthStartDate = new Date(nowYear, myMonth, 1); 
	var monthEndDate = new Date(nowYear, myMonth + 1, 1); 
	var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24); 
	return days; 
}