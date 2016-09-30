$(document).ready(function(){
	pageSize=20;
	$("#btnAdd").click(function(){
		$("#newModal").modal("show");
	});
	$("#btnAddConfirm").click(function(){
		$("#newRecordForm").ajaxSubmit({
			url:"qcStd!addRecord.action",
			type: "post",
			dataType:"json",
			success:function(response){
				alert(response.message);
				if(response.success){
					var mailaddrs=$("#mailAddrs").val();
					/*var body="<table><tr><td>更新前</td><td>更新后</td></tr></table>";*/
					window.location="mailto:"+mailaddrs+"?subject=品质标准更新";
					window.open("qcStd!index.action","_self");
				}							
			}			
		});
	});
	$("#btnQuery").click(function(){
		ajaxQuery(1);
	});
	$(".fa-search").live("click",function(e){
		var recordId=$(e.target).parent("td").parent("tr").data("id");
		//alert(recordId);
		$.ajax({
			url:"qcStd!showStdRecord.action",
			type: "post",
			data:{
				"recordId":recordId
			},
			dataType:"json",
			success:function(response){
				$("#recordNo_show").html(response.stdRecord.recordNo);
				$("#stdFileName_show").html(response.stdRecord.standardfile);
				$("#updateCpt_show").html(response.stdRecord.uchapter);
				$("#usynopsis_show").html(response.stdRecord.usynopsis);
				$("#uresason_show").html(response.stdRecord.uresason);
				$("#uscope_show").html(response.stdRecord.uscope);
				$("#bdesc_show").html(response.stdRecord.bdescription);
				$("#adesc_show").html(response.stdRecord.adescription);
				$("#memo_show").html(response.stdRecord.memo);
				$("#mailAddrs_show").html(response.stdRecord.mailAddrs);
				$("#afile_path").attr("href",response.stdRecord.afilePath);
				$("#bfile_path").attr("href",response.stdRecord.bfilePath);
				$("#showModal").modal("show");
			}
		})
	});
});
function ajaxQuery(targetPage){
	var recordNo=isNaN(parseInt($("#record_no").val()))?0:parseInt($("#record_no").val());
	//alert(recordNo);
	$.ajax({
		url:"qcStd!showRecordList.action",
		type: "post",
		data:{
			"recordNo":recordNo,
			"stdFileName":$("#stdFile_name").val(),
			"update_start":$("#update_start").val(),
			"update_end":$("#update_end").val(),
			"pager.pageSize" : 20,
			"pager.curPage" : targetPage || 1
		},
		dataType:"json",
		success:function(response){
			$("#tableResult tbody").html("");
			$.each(
							response.dataList,
							function(index, value) {
								var tr = $("<tr />");
								$("<td />").html(value.recordNo)
										.appendTo(tr);
								$("<td />").html(value.usynopsis).appendTo(
										tr);
								$("<td />").html(value.standardfile)
										.appendTo(tr);
								$("<td />").html(value.editor)
										.appendTo(tr);
								$("<td />").html(value.editDate).appendTo(
										tr);
								var editTd = $("<td />")
										.html(
											"<i name='edit' class=\"fa fa-search\" rel=\"tooltip\" title='查看' style=\"cursor: pointer\"></i>");
								editTd.appendTo(tr);
								tr.data("id", value.id);
	
								$("#tableResult tbody").append(tr);
							});
			$("#tableResult").show();
			$("#total").html(response.pager.totalCount);
			$("#total").attr("total", response.pager.totalCount);
			$("#cur").attr("page", response.pager.curPage);
			$("#cur").html(
					"<a href=\"#\">" + response.pager.curPage + "</a>");
			$("#pagination").show();
		}
	});
}