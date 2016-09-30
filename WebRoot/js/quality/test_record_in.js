$(document).ready(function() {
	initPage();
	$("#btnQuery").click(function() {
		ajaxQuery();
	});
	$("#btnAdd").click(function() {
		window.open("testRecordIn!showRecordInPage.action", "_self");
	});
	$(".fa-search").live("click",function(e){
		var headerId=$(e.target).parent("td").parent("tr").data("headerId")
		//alert(headerId);
		window.open("testRecordIn!showDetail.action?header.id="+headerId,"_self");
	})
	$(".fa-pencil").live("click",function(e){
		var headerId=$(e.target).parent("td").parent("tr").data("headerId");
		window.open("testRecordIn!showEditPage.action?header.id="+headerId,"_self");
	});

});
function initPage() {
	pageSize=20;
	getPartsSelect("#input_parts");
	
	getFactorySelect();
	getOrderNoSelect("#search_order_no","#orderId");
	$("#qc_record_in").addClass("in");
}
function ajaxQuery(targetPage) {
	var parts = $("#input_parts").val();
	var partsChartNo = $("#input_partsChart").val();
	var version = $("#input_version").val();
	var prodStart = $("#prod_start").val();
	var prodEnd = $("#prod_end").val();
	
	var factory_id = $("#search_factory").val();
	var order_no = $("#search_order_no").val();
	
	var testResult = [];
	$('input[name="test_result"]:checked').each(function() {
		testResult.push($(this).val());
	});
	var conditions = {
		'factory_id' : factory_id,	
		'order_no' : order_no,
		'parts' : parts,
		'partsChartNo' : partsChartNo,
		'prodDateStart' : prodStart,
		'prodDateEnd' : prodEnd,
		'testResult' : testResult
	};
	$
			.ajax({
				type : "get",// 使用get方法访问后台
				dataType : "json",// 返回json格式的数据
				url : "testRecordIn!getRecordList.action",
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
										
										var testResult="";
										if(value.testResult=='0'){
											testResult='一次交检合格'
										}
										if(value.testResult=='1'){
											testResult='返工/返修合格'
										}
										if(value.testResult=='2'){
											testResult='让步放行'
										}
										var tr = $("<tr />");
										$("<td />").html(value.factory)
										.appendTo(tr);
										$("<td />").html(value.partsChartNo)
												.appendTo(tr);
										$("<td />").html(value.parts).appendTo(
												tr);
										$("<td />").html(value.busType)
												.appendTo(tr);
										$("<td />").html(value.order)
												.appendTo(tr);
										$("<td />").html(value.orderConfig)
												.appendTo(tr);
										$("<td />").html(value.version)
												.appendTo(tr);
										$("<td />").html(value.partsNo)
												.appendTo(tr);
										$("<td />").html(value.prodDate)
												.appendTo(tr);										
										$("<td />").html(value.tester)
												.appendTo(tr);
										$("<td />").html(testResult)
										.appendTo(tr);
										$("<td />").html(value.editor)
										.appendTo(tr);
										$("<td />").html(value.editDate)
										.appendTo(tr);
										var editTd = $("<td />")
												.html(
														"<i name='edit' class=\"fa fa-search\" rel=\"tooltip\" title='查看'  style=\"cursor: pointer\"></i>&nbsp;&nbsp;<i name='edit' class=\"fa fa-pencil\" rel=\"tooltip\" title='编辑' style=\"cursor: pointer\"></i>");
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