$(document).ready(function() {
	initPage();
	$("#btnQuery").click(function() {
		ajaxQuery();
	});
	$("#btnAdd").click(function() {
		window.open("testFlowCardIn!showRecordInPage.action", "_self");
	});
	$(".fa-search").live("click",function(e){
		var headerId=$(e.target).parent("td").parent("tr").data("headerId")
		//alert(headerId);
		window.open("testFlowCardIn!showDetail.action?header.id="+headerId,"_self");
	})
	$(".fa-pencil").live("click",function(e){
		var headerId=$(e.target).parent("td").parent("tr").data("headerId");
		window.open("testFlowCardIn!showEditPage.action?header.id="+headerId,"_self");
	});
	// 切换工厂获取车间下拉列表
	$("#q_factory").live(
			"change",
			function() {
				var factoryId=$(this).val();
				getWorkshopSelect("#q_workshop", "",factoryId, "empty");
			});
});
function initPage() {
	pageSize=20;
	getFactorySelect("#q_factory", "", "empty");
	$("#qc_record_in").addClass("in");
}
function ajaxQuery(targetPage) {
	var order = $("#q_order").val();
	var factoryId = $("#q_factory").val();
	var workshopId = $("#q_workshop").val();
	var busNo = $("#q_busNo").val();
	var tester = $("#q_tester").val();
	var qe= $("#q_qe").val();
	var testResult = [];
	$('input[name="test_result"]:checked').each(function() {
		testResult.push($(this).val());
	});
	var conditions = {
		'order' : order,
		'factoryId' : isNaN(parseInt(factoryId))?0:parseInt(factoryId),
		'workshopId' : isNaN(parseInt(workshopId))?0:parseInt(workshopId),
		'busNo' : busNo,
		'tester':tester,
		'qe':qe,
		'testResult' : testResult
	};
	$
			.ajax({
				type : "get",// 使用get方法访问后台
				dataType : "json",// 返回json格式的数据
				url : "testFlowCardIn!getRecordList.action",
				data : {
					"conditions" : JSON.stringify(conditions),
					"pager.pageSize" : 20,
					"pager.curPage" : targetPage || 1
				},
				success : function(response) {
					$("#tableResult tbody").html("");
					$
							.each(
									response.dataList,
									function(index, value) {
										// alert(value.id);
										var tr = $("<tr />");
										$("<td />").html(value.factory)
												.appendTo(tr);
										$("<td />").html(value.workshop).appendTo(
												tr);
										$("<td />").html(value.bus_number)
												.appendTo(tr);
										$("<td />").html(value.order_name)
												.appendTo(tr);
										$("<td />").html(value.tester)
												.appendTo(tr);
										$("<td />").html(value.qe)
												.appendTo(tr);										
										var testResult="";
										if(value.test_result=='0'){
											testResult='一次交检合格'
										}
										if(value.test_result=='1'){
											testResult='返工/返修合格'
										}
										if(value.test_result=='2'){
											testResult='让步放行'
										}
										
										//alert(testResult)
										$("<td />").html(testResult)
										.appendTo(tr);
										$("<td />").html(value.editor)
										.appendTo(tr);	
										$("<td />").html(value.edit_date)
										.appendTo(tr);
										var editTd = $("<td />")
												.html(
														"<i name='edit' class=\"fa fa-search\" rel=\"tooltip\" title='查看' style=\"cursor: pointer\"></i>&nbsp;&nbsp;<i name='edit' rel=\"tooltip\" title='编辑' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>");
										editTd.appendTo(tr);
										tr.data("headerId", value.id);
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
			})
}