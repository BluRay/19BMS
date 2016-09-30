$(document).ready(function () {	
	initPage();
	function initPage(){
		pageSize=20;
		getFactorySelect();
		getOrderNoSelect("#search_order_name","#orderId");
		ajaxQuery();
	};
	
	$("#btnQuery").click (function () {
		ajaxQuery();
		return false;
	});
	
	$("#btnBulkAdd").click (function () {
		$("#divBulkAdd").show();
	});
	
	/*$("#btn_upload").click (function () {
		if(LimitAttach(this.form, this.form.file.value)){

		}else{
			return false;
		}
	});*/
});

function ajaxQuery(targetPage){
	$("#divBulkAdd").hide();
	$.ajax({
	    url: "plan!showPlanMasterIndex.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"factory_id": $('#search_factory').val(),
	    	"order_no": $('#search_order_name').val(),
	    	//"plan_month":$('#plan_month').val(),
	    	"pager.pageSize":20,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableOrder tbody").html("");
    		$.each(response.data,function (index,value) {
    			var tr = $("<tr />");
    			$("<td />").html(index+1).appendTo(tr);
    			$("<td />").html(value.version).appendTo(tr);
    			$("<td />").html(value.factory_name).appendTo(tr);
    			$("<td />").html(value.order_no).appendTo(tr);
    			$("<td />").html(value.display_name).appendTo(tr);
    			$("<td />").html(value.create_date).appendTo(tr);
    			$("<td />").html("<a href='plan!preview.action?version="+value.version+"'>查看</a>").appendTo(tr);
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
			getSelects(response, "", "#search_factory");
			
		}
	});
}

extArray = new Array(".csv");
function LimitAttach(form, file) {
	if ($("#file").val() == "") {
		alert("请选择文件！");
		return false;
	}
	allowSubmit = false;
	if (!file)
		return;
	while (file.indexOf("\\") != -1)
		file = file.slice(file.indexOf("\\") + 1);
	ext = file.slice(file.indexOf(".")).toLowerCase();
	for (var i = 0; i < extArray.length; i++) {
		if (extArray[i] == ext) {
			allowSubmit = true;
			break;
		}
	}
	if (allowSubmit) {
		form.submit();
		//$('#btn_upload').val("上传中...");
		//$('#btn_upload').attr('disabled', "true");
	} else {
		alert("对不起，只能上传csv格式的文件!\n请重新选择符合条件的文件再上传.");
		return false;
	}
}