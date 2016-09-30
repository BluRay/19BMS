$(document).ready(function () {	
	initPage();
	function initPage(){
		getFactorySelect();
		getOrderNoSelect("#search_order_no","#orderId");
	};
	
	$("#btnQuery").click (function () {
		$("#divBulkAdd").hide();
		ajaxQuery();
		return false;
	});
	
	
});

function ajaxQuery(targetPage){
	$.ajax({
	    url: "plan!showBusNumberList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"order_no": $('#search_order_no').val(),
	    	"bus_number": $('#search_bus_number').val(),
	    	"bus_vin": $('#search_bus_vin').val(),
	    	"pager.pageSize":10,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableVIN tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr />");
    			$("<td style=\"text-align:center;\" />").html(index+1).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.order_no+'辆').appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.bus_number).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.left_motor_number).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.right_motor_number).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.vin).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.productive_date).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.display_name).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.creat_date==null?"":value.creat_date.substring(0,10)).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html((value.print_sign==1)?"已打印":"未打印").appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html(value.print_date==null?"":value.print_date.substring(0,10)).appendTo(tr);
    			$("<td style=\"text-align:center;\" />").html((value.printer_id==0)?"":value.printer_name).appendTo(tr);
    			$("#tableVIN tbody").append(tr);	    			
    		});	
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();
			$("#btnExport").removeAttr("disabled");
			$("#btnImport").removeAttr("disabled");
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