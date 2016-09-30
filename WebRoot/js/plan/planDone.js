$(document).ready(function () {
	initPage();
	
	function initPage(){
		//获取系统时间 
		var LSTR_ndate=new Date(); 
		var LSTR_Year=LSTR_ndate.getYear(); 
		var LSTR_Month=LSTR_ndate.getMonth(); 
		var LSTR_Date=LSTR_ndate.getDate(); 
		//处理 
		var uom = new Date(LSTR_Year,LSTR_Month,LSTR_Date); 
		uom.setDate(uom.getDate()-1);//取得系统时间的前一天,重点在这里,负数是前几天,正数是后几天 
		var LINT_MM=uom.getMonth(); 
		LINT_MM++; 
		var LSTR_MM=LINT_MM > 10?LINT_MM:("0"+LINT_MM) 
		var LINT_DD=uom.getDate(); 
		var LSTR_DD=LINT_DD > 10?LINT_DD:("0"+LINT_DD) 
		//得到最终结果 
		//alert(LSTR_ndate.getFullYear() + LSTR_MM + LSTR_DD) 
		$("#amend_date").val(LSTR_ndate.getFullYear()+"" + LSTR_MM+"" + LSTR_DD);
		
		getFactorySelect();
		getOrderNoSelect("#search_order_no","#orderId");
		$("#search_order_no").focus();
		$("#btnSave").attr("disabled","disabled");
	};
	
	$('#search_factory').change(function(){ 
		getWorkshopSelect();
	})
	
	$("#btnSave").click (function () {
		var planDone_str = "";
		$('#tablePlanAmend tr').each(function(e){
			var id = $(this).attr("id");
			if(id != "0"){
				if($('#amendqty_'+id).val()!=""){
					planDone_str += id + "," + $('#realqty_'+id).val() + "," + $('#amendqty_'+id).val() + "," + $('#reason_'+id).val() + ";";
				}
			}			
		});
		$("#planDone_str").val(planDone_str);
		if(planDone_str == ""){
			alert("请输入修正值！");
			return false;
		}
		
		$.ajax({
			url : "plan!planAmend.action",
			dataType : "json",
			data : {
		    	"planDone_str": $('#planDone_str').val(),
			},
			async : false,
			error : function(response) {
				alert(response.message)
			},
			success : function(response) {
				alert(response.message)	
				ajaxQuery();
			}
		});
		
	})
	
	$("#btnQuery").click (function () {
		if($("#search_factory").val()==""){
			alert("请选择生产工厂！");
			return false;
		}
		if($("#search_order_no").val()==""){
			alert("请输入订单编号！");
			$("#search_order_no").focus();
			return false;
		}
		if($("#amend_date").val()==""){
			alert("请输入日期！");
			return false;
		}
		ajaxQuery();
		return false;
	});
	
})

function ajaxQuery(targetPage){
	var workshop_name = "";
	if ($('#search_workshop').find("option:selected").text()!="全部")workshop_name = $('#search_workshop').find("option:selected").text();
	$.ajax({
	    url: "plan!showPlanAmend.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"order_no": $('#search_order_no').val(),
	    	"amend_date": $('#amend_date').val(),
	    	"workshop_name": workshop_name,
	    },
	    success:function(response){		    		
    		$("#tablePlanAmend tbody").html("");
    		var input = "<input class=\"cell\" style=\"border:0;width:30px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=";
    		var input1 = "<input class=\"cell\" disabled=\"disabled\" style=\"border:0;width:30px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=";
    		var input2 = "<input class=\"cell\" style=\"border:0;width:240px;BACKGROUND: none transparent scroll repeat 0% 0%;\" onclick=\"javascript:$(this).select();\" value=";
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr id= '"+value.id+"'/>");
    			$("<td style=\"text-align:center;\" />").html(value.plan_date).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.order_no).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.key_name.replace("上线","").replace("下线","")).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.key_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.plan_qty).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(input1 + value.real_qty + " id= 'realqty_"+value.id+"'>").appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html((value.amend_qty ==null)?input +"'' id= 'amendqty_"+value.id+"'>":input +"'"+value.amend_qty+"' id= 'amendqty_"+value.id+"'>").appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html((value.amend_reason ==null)?input2 +"' ' id= 'reason_"+value.id+"'>":input2 +"'"+value.amend_reason+"' id= 'reason_"+value.id+"'>").appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.display_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.revise_date).appendTo(tr);
    			//$("<td style=\"text-align:center;\" />").html("").appendTo(tr);
    			$("#tablePlanAmend tbody").append(tr);	    			
    		});
			$("#btnSave").removeAttr("disabled");
	    }
	});
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

