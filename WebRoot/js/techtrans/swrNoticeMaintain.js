var pageSize = 20;
$(document).ready(function () {	
	initPage();
	function initPage(){
		
		var d = new Date();
		var vYear = d.getFullYear();
		var vMon = d.getMonth() + 1;
		var vMonBefore= d.getMonth();
		var vDay = d.getDate();
		var h = d.getHours(); 
		var m = d.getMinutes(); 
		var se = d.getSeconds(); 
		s1=vYear+"-"+(vMon<10 ? "0" + vMonBefore : vMonBefore)+"-"+(vDay<10 ? "0"+ vDay : vDay);
		s=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay);
		$("#startDate").val(s1);
		$("#endDate").val(s);
		$("#newDate").val(s);
		
		ajaxQuery();
	};
	
	
	$("#btnQuery").click (function () {
		
		ajaxQuery();
		return false;
	});
	//新增页面
	$("#btnAdd").click( function (argument) {
		$("#newModal").modal("show");
		$("#swr_number").focus();
		initPage();
	});
	// 删除
	$("#btnDelete").live("click", function() {
		if (confirm("是否确定删除！")) {
			ajaxDelete();
		}
	});
	//新增页面的确认新增
	$("#btnAddConfirm").click (function () {
		ajaxAdd();
		return false;
	});
	//新增页面的确认新增
	$("#btneditConfirm").click (function () {
		ajaxEdit();
		return false;
	});
	//继续新增
	$("#btnContinue").click(function()
			{
				ajaxAdd();
				$("#newModal").modal("show");
				document.getElementById("newSwr_number").value = '';
				document.getElementById("subject").value = '';
				document.getElementById("initiator").value = '';
				document.getElementById("newDate").value = '';
				document.getElementById("memo").value = '';
				
				initPage();
				$("#swr_number").focus();
				return false;
			});
	
	//新增保存
	function ajaxAdd (argument) {
		//数据验证
		 if($("#newSwr_number").val() == '')
		{
			alert('请输入单号！');
			return false;
		}
		else if($("#subject").val() == '')
			{
				alert('请输入主题！');
				return false;
			}
		else if($("#initiator").val() == '')
		{
			alert('请输入发起人！');
			return false;
		}
		else if($("#date").val() == '')
		{
			alert('请输入日期！');
			return false;
		}
		$.ajax({
			type: "post",
			dataType: "json",
			url: "swrNotice!addSWRNotice.action",
		    data: {
				"data_swr_number":$("#newSwr_number").val(),
				"data_subject":$("#subject").val(),
				"data_initiator":$("#initiator").val(),
				"data_date":$("#newDate").val(),
				"data_memo":$("#memo").val(),
				"swr_id":$("#swr_id").val()
			},
			async: false,
		    success:function (response) {
		    	if (response.success) {
		    		alert(response.message);
		    		$('#newModal').modal('hide');
		    		ajaxQuery();
		    	} else {
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
		
	}
	
	function ajaxEdit (argument) {
		//数据验证
		 if($("#editSwr_number").val() == '')
		{
			alert('请输入单号！');
			return false;
		}
		else if($("#edit_subject").val() == '')
			{
				alert('请输入主题！');
				return false;
			}
		else if($("#edit_initiator").val() == '')
		{
			alert('请输入发起人！');
			return false;
		}
		else if($("#edit_date").val() == '')
		{
			alert('请输入日期！');
			return false;
		}
		$.ajax({
			type: "post",
			dataType: "json",
			url: "swrNotice!addSWRNotice.action",
		    data: {
				"data_swr_number":$("#editSwr_number").val(),
				"data_subject":$("#edit_subject").val(),
				"data_initiator":$("#edit_initiator").val(),
				"data_date":$("#edit_Date").val(),
				"data_memo":$("#edit_memo").val(),
				"swr_id":$("#swr_id").val()
			},
			async: false,
		    success:function (response) {
		    	if (response.success) {
		    		alert(response.message);
		    		$('#editModal').modal('hide');
		    		ajaxQuery();
		    	} else {
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
		
	}

});
//函数：删除操作
function ajaxDelete() {
	var idlist="";
	var cboxlist=$("#tableSWR tbody :checked");
	$.each(cboxlist,function(index,cbox){
		idlist+=$(cbox).closest("tr").data("id")+",";	
	});
	idlist=idlist.substring(0,idlist.length-1);
	$.ajax({
		type : "get",
		dataType : "json",
		url : "swrNotice!deleteSWRNotice.action",
		data : {
			"idlist" : idlist
		},
		success : function(response) {
			if (response.success) {
			ajaxQuery($(".curPage").attr("page"));
			}
			else {
	    		alert(response.message);}
		},
		error : function() {
			alertError();
		}

	});
}
//修改
function modifySWR(swr_id){
	//查询信息
	$.ajax({
		url: "swrNotice!showSWRNoticeList.action",
		dataType: "json",
		data: {"swr_id" : swr_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$.each(response.data,function(index,value){
					if(index == 0){
						//填充基本信息
						$("#editSwr_number").val(value.swr_number);
						$("#edit_subject").val(value.subject);
						$("#edit_initiator").val(value.initiator);
						$("#edit_Date").val(value.date);
						$("#edit_memo").val(value.memo);
						$("#swr_id").val(value.id);
					}
				});
				$("#editModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	});
}

//显示页面
function showReview(swr_id){
	//查询信息
	$.ajax({
		url: "swrNotice!showSWRNoticeList.action",
		dataType: "json",
		data: {"swr_id" : swr_id},
		async: false,
		error: function () {alertError();},
		success: function (response) {
			if(response.success){
				$.each(response.data,function(index,value){
					if(index == 0){
						//填充基本信息
						$("#showSwr_number").val(value.swr_number);
						$("#showSubject").val(value.subject);
						$("#showInitiator").val(value.initiator);
						$("#showDate").val(value.date);
						$("#showMemo").val(value.memo);
						$("#showEditor_id").val(value.editor_id);
						$("#showEditor_date").val(value.edit_date);
					}
				});
				$("#viewModal").modal("show");
			} else {
				alert(response.message);
			}
		}
	});
}
//查询页面赋值
function ajaxQuery(targetPage){
	$.ajax({
	    url: "swrNotice!showSWRNoticeList.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	"swr_number": $('#swr_number').val(),
	    	"subject": $('#search_subject').val(),
	    	"startDate": $('#startDate').val(),
	    	"endDate": $('#endDate').val(),
	    	"pager.pageSize":pageSize||20,
			"pager.curPage":targetPage || 1
	    },
	    success:function(response){		    		
    		$("#tableSWR tbody").html("");
    		$.each(response.data,function(index,value){
    			var tr=$("<tr />");
    			$("<td />").html("<input type=\"checkbox\">").appendTo(tr);
    			$("<td />").html(value.swr_number).appendTo(tr);
    			$("<td />").html(value.subject).appendTo(tr);
    			$("<td />").html(value.initiator).appendTo(tr);
    			$("<td />").html(value.date).appendTo(tr);
    			$("<td />").html(value.username).appendTo(tr);
    			$("<td />").html(value.edit_date).appendTo(tr);
    			
    			var editTd = $("<td />").html("<i name='edit' onclick = 'modifySWR(" + value.id + ");' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>");
    			editTd.appendTo(tr);
    			var viewTd = $("<td />").html("<i name='view' onclick = 'showReview(" + value.id + ");' class=\"fa fa-search\" style=\"cursor: pointer\"></i>");
    			viewTd.appendTo(tr);
    			tr.data("id", value.id);
	    		$("#tableSWR tbody").append(tr);
    		});	
    		$("#total").html(response.pager.totalCount);
    		$("#total").attr("total",response.pager.totalCount);
    		$("#cur").attr("page",response.pager.curPage);
    		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
    		$("#pagination").show();
	    }
	});
}




	
	
