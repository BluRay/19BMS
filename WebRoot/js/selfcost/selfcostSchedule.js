$(document).ready(function () {
	initPage();
	function initPage(){
		getFactorySelect();
		if(GetQueryString("factory_id") != null){
			$("#search_factory").val(GetQueryString("factory_id"));
			ajaxQuery();
		}else{
			getUserFactory();
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
		ajaxQuery();
		return false;
	});
	
})

function ajaxDelete(schedule_id){
	if (confirm("确认要删除？")) {
		//alert("delete!");
		$.ajax({
		    url: "selfcost!deleteSchedule.action",
    	    dataType: "json",
			type: "get",
		    data: {
		    	"schedule_id": schedule_id,
		    },
		    success:function(response){		    		
		    	alert("删除成功!");
		    	ajaxQuery();
		    }
		});
    }
}

function ajaxQuery(targetPage){
		$("#divBulkAdd").hide();
		$.ajax({
		    url: "selfcost!showSchedule.action",
    	    dataType: "json",
			type: "get",
		    data: {
		    	"factory_id": $('#search_factory').val(),
		    	"pager.pageSize":10,
				"pager.curPage":targetPage || 1
		    },
		    success:function(response){		    		
	    		$("#tableSchedule tbody").html("");
	    		$.each(response.data,function (index,value) {
	    			var tr = $("<tr/>");
	    			$("<td />").html(index+1).appendTo(tr);
	    			$("<td />").html(value.factory_name).appendTo(tr);
	    			$("<td />").html(value.cost_month).appendTo(tr);
	    			$("<td />").html("<a target='blank' href='images/upload/planSchedule/"+value.cost_detail_file+"'>"+value.cost_detail_file+"</a>").appendTo(tr);
	    			$("<td />").html("<button onclick = 'ajaxDelete("+value.id+");' class='btn-link'>删除</>").appendTo(tr);
	    			$("#tableSchedule tbody").append(tr);
	    			
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
			getSelects_empty(response, "", "#schedule_factory");
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