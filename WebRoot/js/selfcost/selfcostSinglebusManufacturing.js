$(document).ready(function () {	
	initPage();
	function initPage(){
		getFactorySelect();
		if(GetQueryString("factory_id") != null){
			 $("#search_cost_month").val(GetQueryString("cost_month"));
			 $("#search_factory").val(GetQueryString("factory_id"));
			 //$("#search_factory").find("option[text='"+GetQueryString("factory_name")+"']").attr("selected",true);
			 ajaxQuery();
		}else{
			getUserFactory();
			var now = new Date();//当前时间
			var lastMonth = new Date(now.getFullYear(),now.getMonth()-1,now.getDate());//上个月
			//alert(lastMonth.format("yyyyMM"));
			$("#search_cost_month").val(lastMonth.format("yyyyMM"));
			ajaxQuery();			
		}
	}
	
	
	
	$("#btnBulkAdd").click (function () {
		$("#btn_upload").removeAttr("disabled");	
		$("#divBulkAdd").show();
	});
	$("#btnQuery").click (function () {
		if($('#search_factory').val()==""){
			alert("请选择生产工厂");
			return false;
		}
		if($('#search_cost_month').val()==""){
			alert("请选择生产生产年月");
			return false;
		}
		ajaxQuery();
		return false;
	});
	
})

function ajaxQuery(targetPage){
		$("#divBulkAdd").hide();
		$.ajax({
		    url: "selfcost!showSinglebusManufacturing.action",
    	    dataType: "json",
			type: "get",
		    data: {
		    	"factory_id": $('#search_factory').val(),
		    	"cost_month": $('#search_cost_month').val(),
		    	"pager.pageSize":20,
				"pager.curPage":targetPage || 1
		    },
		    success:function(response){		    		
	    		$("#tableOrder tbody").html("");
	    		$.each(response.data,function (index,value) {
	    			var tr = $("<tr />");
	    			$("<td />").html(index+1).appendTo(tr);
	    			$("<td />").html(value.factory_name).appendTo(tr);
	    			$("<td />").html(value.cost_department_name).appendTo(tr);
	    			$("<td />").html(value.cost_month).appendTo(tr);
	    			$("<td />").html(value.real_offline_qty).appendTo(tr);
	    			$("<td />").html(value.assess_offline_qty).appendTo(tr);
	    			$("<td />").html(value.machine_cost).appendTo(tr);
	    			$("<td />").html(value.tooling_cost).appendTo(tr);
	    			$("<td />").html(value.other_materials_cost).appendTo(tr);
	    			$("<td />").html(value.other_cost).appendTo(tr);
	    			$("<td />").html(value.fuel_power_cost).appendTo(tr);
	    			$("<td />").html(value.labor_cost).appendTo(tr);
	    			$("<td />").html(value.total_cost).appendTo(tr);
	    			$("<td />").html(value.eliminate_abnormal_total).appendTo(tr);
	    			$("#tableOrder tbody").append(tr);
	    			
	    		});
	    		
	    		$("#total").html(response.pager.totalCount);
	    		$("#total").attr("total",response.pager.totalCount);
	    		$("#cur").attr("page",response.pager.curPage);
	    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
	    		$("#pagination").show();
		    	
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
				$("#search_factory").val(value.FACTORY_ID);
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

Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
} 
