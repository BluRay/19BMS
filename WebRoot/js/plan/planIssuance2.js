var issTotal =  new Array(0,0,0,0,0,0,0,0,0,0,0,0);
var issTotalBak=new Array(0,0,0,0,0,0,0,0,0,0,0,0);
var issed = "0";	//标记已发布
//var plan_code=new Array("部件上线","部件下线","焊装上线","焊装下线","涂装上线","涂装下线","玻璃钢下线","底盘上线","底盘下线","总装上线","总装下线");
var plan_code=new Array("自制件下线","部件上线","部件下线","焊装上线","焊装下线","涂装上线","涂装下线","底盘上线","底盘下线","总装上线","总装下线","入库");
$(document).ready(function () {	
	initPage();
	
	function initPage(){
		getFactorySelect();
		getOrderNoSelect("#search_order_no","#orderId");
		$("#btnSave").attr("disabled","disabled");
	};
	
	$("#btnSave").click (function () {
		issTotal =  new Array(0,0,0,0,0,0,0,0,0,0,0,0);
		$("#btnSave").attr("disabled","disabled");
		//校验数据
		/**
		var arr1 = $("#configs").val().substring(0,$("#configs").val().length-1).split(",");
		for(j=1;j<13;j++){
			issTotal[j-1] = issTotalBak[j-1];
		}
		for(i in arr1) 
		{
			for(j=1;j<13;j++){
				if ($("#"+arr1[i] + "_" + j).val() == null){
					issTotal[j-1] =0;
				}else{
					issTotal[j-1] -= $("#"+arr1[i] + "_" + j).val();
				}
				
			}
		}
		for(i in issTotal){
			if (issTotal[i]!=0){
				alert(plan_code[i]+"计划数量有误，配置计划数之和需等于总计划数，请重新输入。");
				$("#btnSave").removeAttr("disabled");
				return false;
			}
		}
		**/
		var sum_plan = 0;
		var sum_iss = 0;
		var tableData=new Array();
		var plan_count = 0;
		var check = 0;
        $("#tablePlan tr").each(function(trindex,tritem){
            if(trindex >0){
            	tableData[trindex]=new Array();
                if($(tritem).text().substring(1,2)=='D'){
                	if(plan_count != 0){
                		if(issTotal.toString()!="0,0,0,0,0,0,0,0,0,0,0,0"){
                			alert("发布计划数量有误，配置计划数之和需等于总计划数，请检查后重新输入");
                			$("#btnSave").removeAttr("disabled");
                			check = 1;
                    		issTotal =  new Array(0,0,0,0,0,0,0,0,0,0,0,0);
            				return false;
                		}
                	}
                	var i = 0;
                	$(tritem).find("td").each(function(tdindex,tditem){
                		sum_plan += parseInt((tdindex < 2)?0:$(tditem).find(".cell").val());
                		if(tdindex >= 2){
                    		issTotal[i] += parseInt($(tditem).find(".cell").val());
                    		i++;
                		}
                	})
                	plan_count++;
                }else{
                	var i = 0;
                	$(tritem).find("td").each(function(tdindex,tditem){
                		sum_iss += parseInt((tdindex < 2)?0:$(tditem).find(".cell").val());
                		if(tdindex >= 2){
                    		issTotal[i] -= parseInt($(tditem).find(".cell").val());
                    		i++;
                		}
                	})
                }
            }
        	
        });
        //alert(sum_plan + "|" + sum_iss);
        if(check == 1){
        	return false;
        }
        if(issTotal.toString()!="0,0,0,0,0,0,0,0,0,0,0,0"){
        	alert("发布计划数量有误，配置计划数之和需等于总计划数，请检查后重新输入");
        	$("#btnSave").removeAttr("disabled");
			return false;
		}

		$.ajax({
		    url: "plan!issuancePlanSubmit.action",
    	    dataType: "json",
			type: "get",
		    data: {
		    	"factory_id": $('#search_factory').val(),
		    	"order_no": $('#search_order_no').val(),
		    	"issuance_date": $('#issuance_date').val(),
		    	"issuance_str": $('#issuance_str').val(),
		    },
		    success:function(response){
		    	alert("发布成功，生成车号数量：" + response.message);
		    	ajaxQuery();
		    	//$("#btnSave").removeAttr("disabled");
				return false;
		    }
		});
		
        $("#btnSave").removeAttr("disabled");
		return false;
	});
	
	function ajaxQuery(targetPage){
		$("#divBulkAdd").hide();
		$.ajax({
		    url: "plan!issuancePlan2.action",
    	    dataType: "json",
			type: "get",
		    data: {
		    	"factory_id": $('#search_factory').val(),
		    	"order_no": $('#search_order_no').val(),
		    	"issuance_date": $('#issuance_date').val(),
		    	"pager.pageSize":10,
				"pager.curPage":targetPage || 1
		    },
		    success:function(response){	
		    	$("#tablePlan tbody").html("");
		    	if(response.success){
		    		if(response.message != '查询成功')alert(response.message);
		    		$("#btnSave").removeAttr("disabled");
		    		var input_disable_total = "<input name = 'total' title=\"总计划\" disabled=\"disabled\" class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=";
		    		var input_disable = "<input title=\"计划已发布\" disabled=\"disabled\" class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=";
		    		var issStr = "";var configsStr = "";
		    		$.each(response.data,function (index,value) {
		    			if((value.order_config_name.substring(0,1)!='D')) {
		    				issStr += value.order_config_id + ":," + value.plan_code_4 + "," + value.plan_code_9 + "," + value.plan_code_10 + "," 
		    				+ value.plan_code_11 + "," + value.plan_code_12 + "," + value.plan_code_15 
			    			+ "," + value.plan_code_16 + "," + value.plan_code_17 + "," + value.plan_code_18 + "," + value.plan_code_19 
			    			+ "," + value.plan_code_20 + "," + value.plan_code_70 + ";";
		    				configsStr += value.order_config_id + ",";
		    			}else{
		    				/**
		    				issTotal[0]= value.plan_code_4; //计划总数
		    				issTotal[1]= value.plan_code_9; //计划总数
		    				issTotal[2]= value.plan_code_10;
		    				issTotal[3]= value.plan_code_11;
		    				issTotal[4]= value.plan_code_12;
		    				//issTotal[4]= value.plan_code_13;
		    				issTotal[5]= value.plan_code_15;
		    				issTotal[6]= value.plan_code_16;
		    				issTotal[7]= value.plan_code_17;
		    				issTotal[8]= value.plan_code_18;
		    				issTotal[9]= value.plan_code_19;
		    				issTotal[10]= value.plan_code_20;
		    				issTotal[11]= value.plan_code_70;**/
				    		//issTotalBak=issTotal;
		    				issTotalBak[0]= value.plan_code_4; //计划总数
		    				issTotalBak[1]= value.plan_code_9;
		    				issTotalBak[2]= value.plan_code_10;
		    				issTotalBak[3]= value.plan_code_11;
		    				issTotalBak[4]= value.plan_code_12;
		    				//issTotalBak[4]= value.plan_code_13;
		    				issTotalBak[5]= value.plan_code_15;
		    				issTotalBak[6]= value.plan_code_16;
		    				issTotalBak[7]= value.plan_code_17;
		    				issTotalBak[8]= value.plan_code_18;
		    				issTotalBak[9]= value.plan_code_19;
		    				issTotalBak[10]= value.plan_code_20;
		    				issTotalBak[11]= value.plan_code_70;
		    			}
		    			
		    			var tr = (value.order_config_name.substring(0,1)=='D')?$("<tr style='background:Silver'/>"):$("<tr />");
		    			$("<td />").html(index).appendTo(tr);
		    			$("<td />").html(value.order_config_name).appendTo(tr);
		    			if(value.order_config_name.substring(0,1)=='D'){
		    				$("<td />").html(input_disable_total + value.plan_code_4 + ">").appendTo(tr);
		    				$("<td />").html(input_disable_total + value.plan_code_9 + ">").appendTo(tr);
		    				$("<td />").html(input_disable_total + value.plan_code_10 + ">").appendTo(tr);
		    				$("<td />").html(input_disable_total + value.plan_code_11 + ">").appendTo(tr);
		    				$("<td />").html(input_disable_total + value.plan_code_12 + ">").appendTo(tr);
		    				$("<td />").html(input_disable_total + value.plan_code_15 + ">").appendTo(tr);
		    				$("<td />").html(input_disable_total + value.plan_code_16 + ">").appendTo(tr);
		    				$("<td />").html(input_disable_total + value.plan_code_17 + ">").appendTo(tr);
		    				$("<td />").html(input_disable_total + value.plan_code_18 + ">").appendTo(tr);
		    				$("<td />").html(input_disable_total + value.plan_code_19 + ">").appendTo(tr);
		    				$("<td />").html(input_disable_total + value.plan_code_20 + ">").appendTo(tr);
		    				$("<td />").html(input_disable_total + value.plan_code_70 + ">").appendTo(tr);
		    			}else{
		    				$("<td />").html((value.plan_code_issed_4_done==0)?"<input id='"+ value.order_config_id + '_1' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_4 + ">":input_disable + value.plan_code_issed_4 + ">").appendTo(tr);
		    				$("<td />").html((value.plan_code_issed_9_done==0)?"<input id='"+ value.order_config_id + '_2' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_9 + ">":input_disable + value.plan_code_issed_9 + ">").appendTo(tr);
		    				$("<td />").html((value.plan_code_issed_10_done==0)?"<input id='"+ value.order_config_id + '_3' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_10 + ">":input_disable + value.plan_code_issed_10 + ">").appendTo(tr);
		    				$("<td />").html((value.plan_code_issed_11_done==0)?"<input id='"+ value.order_config_id + '_4' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_11 + ">":input_disable + value.plan_code_issed_11 + ">").appendTo(tr);
		    				$("<td />").html((value.plan_code_issed_12_done==0)?"<input id='"+ value.order_config_id + '_5' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_12 + ">":input_disable + value.plan_code_issed_12 + ">").appendTo(tr);
		    				$("<td />").html((value.plan_code_issed_15_done==0)?"<input id='"+ value.order_config_id + '_6' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_15 + ">":input_disable + value.plan_code_issed_15 + ">").appendTo(tr);
		    				$("<td />").html((value.plan_code_issed_16_done==0)?"<input id='"+ value.order_config_id + '_7' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_16 + ">":input_disable + value.plan_code_issed_16 + ">").appendTo(tr);
		    				$("<td />").html((value.plan_code_issed_17_done==0)?"<input id='"+ value.order_config_id + '_8' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_17 + ">":input_disable + value.plan_code_issed_17 + ">").appendTo(tr);
		    				$("<td />").html((value.plan_code_issed_18_done==0)?"<input id='"+ value.order_config_id + '_9' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_18 + ">":input_disable + value.plan_code_issed_18 + ">").appendTo(tr);
		    				$("<td />").html((value.plan_code_issed_19_done==0)?"<input id='"+ value.order_config_id + '_10' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_19 + ">":input_disable + value.plan_code_issed_19 + ">").appendTo(tr);
		    				$("<td />").html((value.plan_code_issed_20_done==0)?"<input id='"+ value.order_config_id + '_11' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_20 + ">":input_disable + value.plan_code_issed_20 + ">").appendTo(tr);
		    				$("<td />").html((value.plan_code_issed_70_done==0)?"<input id='"+ value.order_config_id + '_12' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_70 + ">":input_disable + value.plan_code_issed_70 + ">").appendTo(tr);
		    			}
		    			/**
		    			$("<td />").html((index>0)?((value.plan_code_issed_4_done==0)?"<input id='"+ value.order_config_id + '_1' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_4 + ">":input_disable + value.plan_code_issed_4 + ">"):input_disable_total + value.plan_code_4 + ">").appendTo(tr);
		    			$("<td />").html((index>0)?((value.plan_code_issed_9_done==0)?"<input id='"+ value.order_config_id + '_2' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_9 + ">":input_disable + value.plan_code_issed_9 + ">"):input_disable_total + value.plan_code_9 + ">").appendTo(tr);
		    			$("<td />").html((index>0)?((value.plan_code_issed_10_done==0)?"<input id='"+ value.order_config_id + '_3' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_10 + ">":input_disable + value.plan_code_issed_10 + ">"):input_disable_total + value.plan_code_10 + ">").appendTo(tr);
		    			$("<td />").html((index>0)?((value.plan_code_issed_11_done==0)?"<input id='"+ value.order_config_id + '_4' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_11 + ">":input_disable + value.plan_code_issed_11 + ">"):input_disable_total + value.plan_code_11 + ">").appendTo(tr);
		    			$("<td />").html((index>0)?((value.plan_code_issed_12_done==0)?"<input id='"+ value.order_config_id + '_5' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_12 + ">":input_disable + value.plan_code_issed_12 + ">"):input_disable_total + value.plan_code_12 + ">").appendTo(tr);
		    			//$("<td />").html((index>0)?((value.plan_code_issed_13_done==0)?"<input id='"+ value.order_config_id + '_5' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_13 + ">":input_disable + value.plan_code_issed_13 + ">"):input_disable_total + value.plan_code_13 + ">").appendTo(tr);
		    			$("<td />").html((index>0)?((value.plan_code_issed_15_done==0)?"<input id='"+ value.order_config_id + '_6' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_15 + ">":input_disable + value.plan_code_issed_15 + ">"):input_disable_total + value.plan_code_15 + ">").appendTo(tr);
		    			$("<td />").html((index>0)?((value.plan_code_issed_16_done==0)?"<input id='"+ value.order_config_id + '_7' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_16 + ">":input_disable + value.plan_code_issed_16 + ">"):input_disable_total + value.plan_code_16 + ">").appendTo(tr);
		    			$("<td />").html((index>0)?((value.plan_code_issed_17_done==0)?"<input id='"+ value.order_config_id + '_8' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_17 + ">":input_disable + value.plan_code_issed_17 + ">"):input_disable_total + value.plan_code_17 + ">").appendTo(tr);
		    			$("<td />").html((index>0)?((value.plan_code_issed_18_done==0)?"<input id='"+ value.order_config_id + '_9' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_18 + ">":input_disable + value.plan_code_issed_18 + ">"):input_disable_total + value.plan_code_18 + ">").appendTo(tr);
		    			$("<td />").html((index>0)?((value.plan_code_issed_19_done==0)?"<input id='"+ value.order_config_id + '_10' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_19 + ">":input_disable + value.plan_code_issed_19 + ">"):input_disable_total + value.plan_code_19 + ">").appendTo(tr);
		    			$("<td />").html((index>0)?((value.plan_code_issed_20_done==0)?"<input id='"+ value.order_config_id + '_11' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_20 + ">":input_disable + value.plan_code_issed_20 + ">"):input_disable_total + value.plan_code_20 + ">").appendTo(tr);
		    			$("<td />").html((index>0)?((value.plan_code_issed_70_done==0)?"<input id='"+ value.order_config_id + '_12' +"' class=\"cell\" style=\"border:0;width:45px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=" + value.plan_code_70 + ">":input_disable + value.plan_code_issed_70 + ">"):input_disable_total + value.plan_code_70 + ">").appendTo(tr);
		    			**/
		    			
		    			$("#tablePlan tbody").append(tr);
		    			
		    		});
		    		$("#issuance_str").val(issStr);
		    		$("#configs").val(configsStr);
		    		
		    		getIssStr();
		    		
		    	}else{
		    		alert(response.message);
		    	}
		    }
		});
	}
	
	$("#btnQuery").click (function () {
		if($('#search_factory').val() == ""){
			alert("请选择工厂！");
			return false;
		}
		/**if($('#search_order_no').val() == ""){
			alert("请输入订单号！");
			$('#search_order_no').focus();
			return false;
		}**/
		if($('#issuance_date').val() == ""){
			alert("请输入发布日期！");
			$('#issuance_date').focus();
			return false;
		}
		$('#revision_str').val("");
		ajaxQuery();
		return false;
	});
	
});

$(".cell").live("change",function(e){
	if(isNaN($(e.target).val())){
		alert("请输入数字！");
		$(e.target).val(0);
		return false;
	}
	getIssStr();
});

function getIssStr(){
	var arr1 = $("#configs").val().substring(0,$("#configs").val().length-1).split(",");
	var newstr="";
	for(i in arr1) 
	{
		newstr += arr1[i] + ":";
		for(j=1;j<13;j++){
			if($("#"+arr1[i] + "_" + j).val() == null){
				newstr += "," + "0";
			}else{
				newstr += "," + $("#"+arr1[i] + "_" + j).val();
				issed = "1";
			}
		}
		newstr += ";"
	}
	$("#issuance_str").val(newstr);
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
		}
	});
}