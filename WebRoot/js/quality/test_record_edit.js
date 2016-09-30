var workgrouplist;
var workshoplist;
var workshopId_default;
$(document).ready(function() {
	var selectFactory=$("#factoryId").val();
	//alert(selectFactory);	
	workshopId_default=getWorkshopList(selectFactory);
	getWorkgroupList(workshopId_default);
	
	ajaxGetDetail();
	//点击保存，提交明细数据
	$("#btnEditDetail").click(function(){
		//alert($("#parts_id").val());
		var flag=true;
		var result=$("input[name='header.testResult']:checked").val();
		var partsChartNo=$("#parts_chart_no").val();
		if(partsChartNo.trim().length==0){
			alert("请输入零部件图号！");
			flag= false;
			$("#parts_chart_no").focus();
			return false;
		}
/*		$(".testResult").each(function(){
			var result=$(this).val();
			if(result.trim().length==0){
				alert("请填写检验结果！");
				$(this).focus();
				flag= false;	
				return false;
			}
			
		});*/
/*		$(".workshop").each(function(){
			var result=$(this).val();
			if(result.trim().length==0){
				alert("请选择责任车间！");
				$(this).focus();
				flag= false;
				return false;
			}
		});*/
		if(result==undefined||result.trim().length==0){
			alert("请选择检验结论！");
			flag=false;
			return false;
		}
		$(".workgroup").each(function() {
			var result = $(this).val();
			var tds=$(this).parent("td").siblings();
			var judgeResult=$(tds).find("select").eq(0).val();
			//alert(judgeResult);
			
			if (result.trim().length == 0 && judgeResult =='不合格') {
				alert("请选择责任班组！");
				flag= false;
				return false;
			}
		});
/*		
		if(typeof(result)=='undefined'||result.trim().length==0){
			alert("请选择检验结论！");
			flag= false;
			
		}*/
		if(flag){
			 $DisSelects = $("select[disabled]");//获取所有被禁用的select
		     $DisSelects.attr("disabled", false); 
			$("#saveForm").ajaxSubmit({
				url:"testRecordIn!updateRecord.action",
				type: "post",
				dataType:"json",
				success:function(response){
					alert(response.message);
					if(response.success){
						window.open("testRecordIn!index.action","_self");
					}						
				}			
			});
		}
		
	});
	//切换车间获取班组下拉列表
	$(".workshop").live("change",function(){
		//alert($(this).val());
		var index=$(this).attr("id").split("_")[1];
		getWorkgroupSelect("#workgroup_"+index,"",$(this).val(),"empty");
	});
	//检验结果点击事件绑定
	$('.testResult').live("click",function(){
		var testResultEleId=$(this).attr("id");
		getPartsSelect("#input_parts");
		emptyModal();
		$("#faultLibQuery").data("testResultId",testResultEleId);
		$("#faultLibQuery").modal("show");
	});
	//标准故障库查询
	$("#btnLibQuery").click(function(){
		var conditions="{'parts':'"+$("#input_parts").val()+"',bugType:'"+$("#input_bug_type").val()+"','bug':'"+$("#input_bug").val()+"','seriousLevel':'"+$("#input_faultLevel").val()+ "'}";
        $.get("stdFaultlib!getFaultLibFuzzyList.action", {"conditions":conditions}, function (data) {
        	var resultList=data.dataList;
        	$("#faultLibResult tbody").html("");
        	$.each(resultList,function(index,value){
        		var tr = $("<tr />");
        		$("<td />").html("<input type='checkbox' name='libFlag'>").appendTo(tr);
        		$("<td />").html(value.parts).appendTo(tr);
        		$("<td />").html(value.bugType).appendTo(tr);
        		$("<td />").html(value.bug).appendTo(tr);
        		$("<td />").html(value.faultLevel).appendTo(tr);
        		$("<td />").html(value.faultType=='0'?'非尺寸':'尺寸').appendTo(tr);
        		tr.data("libId",value.id);
        		tr.appendTo("#faultLibResult tbody");
        	})	        	   	
        },'json');
        $("#faultLibResult").css("display","");
	});
	
	//确认选择故障
	 $("#btnLibConfirm").click(function(){
		 var selectLibIds="";
		 var selectBugs="";
		 var testResultEleId=$("#faultLibQuery").data("testResultId");
		 var i=testResultEleId.split("_")[1];
		 var checkeles=$("#faultLibResult tbody :checkbox");
		 $.each(checkeles,function(index,value){
			// alert($(checkeles[index]).parent("td").parent("tr").data("libId"));
			 var libId=$(checkeles[index]).parent("td").parent("tr").data("libId");
			 var tds=$(checkeles[index]).parent("td").siblings();
			 var bug=$(tds[2]).html();
			 //alert(bug);
			 if($(checkeles[index]).attr("checked")=="checked"){
				 selectLibIds+=libId+",";
				 selectBugs+=bug+",";
			 }
		 });
		 selectLibIds=selectLibIds.substring(0,selectLibIds.length-1);
		 selectBugs=selectBugs.substring(0,selectBugs.length-1);
		 //alert(selectBugs);
		/* if(selectLibIds.trim().length==0){
			 alert("请至少选中一个故障！");
			 return false;
		 }else{
			 $("#"+testResultEleId).val(selectBugs);
			 $("#testResultId_"+i).val(selectLibIds);
			 $("#faultLibQuery").modal("hide");
		 }*/
		 $("#"+testResultEleId).val(selectBugs);
		 $("#testResultId_"+i).val(selectLibIds);
		 $("#faultLibQuery").modal("hide");
	 });	
})
/*
 * 查询车间下拉列表
 */
function getWorkshopList(selectFactory){
	var selectWorkshopId="";
	$.ajax({
		url: "common!getWorkshopSelect.action",
		dataType: "json",
		data: {"factoryId":selectFactory},
		async: false,
		error: function () {alertError();},
		success: function (response) {	
			workshoplist=response;
			$.each(workshoplist, function(index, value) {
		        if ("部件" == value.name) {
		        	selectWorkshopId=value.id; 
		        } 
		    });
		}
	})
	return selectWorkshopId;
}
/*
 * 查询班组下拉列表
 */
function getWorkgroupList(selectWorkshop){
	$.ajax({
		url: "common!getWorkgroupSelect.action",
		dataType: "json",
		data: {"conditionMap.workshop":selectWorkshop},
		async: false,
		error: function () {alertError();},
		success: function (response) {	
			workgrouplist=response;		
		}
	})
}
/*
 * 获取记录明细
 */
function ajaxGetDetail() {
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "testRecordIn!getRecordDetail.action",
		data : {
			"header.id" : $("#headerId").val()
		},
		success : function(response) {
			var tplarray = response.dataList;
			detaillist = tplarray;			
			generateTable(tplarray);//动态生成表格
			
			//检验结果模糊查询事件绑定
		/*	$.each(detaillist,function(index,value){
				getTestResult("#testResult_"+index);
			});*/
			
		}
	});
}
function generateTable(dataList) {
	$("#tableResult tbody").html("");
	var last_processNo = null;
	var last_itemNo = null;

	$.each(dataList, function(index, value) {
		var tr = $("<tr />");
		$(tr).data("id", value.id);
		var process_id = "#process_" + value.processNo;
		var item_id = "#item_" + value.testItemNo;
		//工序合并
		if (value.processNo == last_processNo) {

			var prorowspan = parseInt($(process_id).attr("rowspan"));
			$(process_id).attr("rowspan", prorowspan + 1);
			if((value.process).trim().length>0){
				$(process_id).html(value.process);
			}
		} else {
			$("<td id='process_" + value.processNo + "' rowspan='1' " + "/>")
					.html(value.process).appendTo(tr);
		}
		//检测项目合并
		if (value.testItemNo == last_itemNo&&value.processNo == last_processNo) {
			var itemrowspan = parseInt($(item_id).attr("rowspan"));
			var recordid = $(item_id).attr("recordid") + "," + index;
			$(item_id).attr("rowspan", itemrowspan + 1);
			if((value.testItem).trim().length>0){
				$(item_id).html(value.testItem);
			}
		} else {
			$("<td id='item_" + value.testItemNo + "' rowspan='1'" + "/>")
					.html(value.testItem).appendTo(tr);
		}
		//alert(value.resultJudge);
		var ok_checked=value.resultJudge=="合格"?"selected":"";
		var ng_checked=value.resultJudge=="不合格"?"selected":"";
		var testResult=value.result==null?'':value.result ; 
		var memo=value.memo==null?"":value.memo;
		var reworkResult=value.reworkResult==null?"":value.reworkResult;
		
		$("<td />").attr("id", "std_" + index).attr("recordid", index).attr(
				"item_no", value.testItemNo)
				.attr("process_no", value.processNo).html(value.standard)
				.appendTo(tr);
		$("<td />").attr("id", "freq_" + index).attr("recordid", index).attr(
				"item_no", item_id).attr("process_no", value.processNo).html(
				value.frequency).appendTo(tr);
		$("<td />").attr("id", "tools_" + index).attr("recordid", index).attr(
				"item_no", item_id).attr("process_no", value.processNo).html(
				value.testTools).appendTo(tr);
		$("<td width='120px' />").html(
				"<input id='testResult_"+index+"' class='testResult' value='"+testResult +"'style='width:120px' >").appendTo(tr);
		$("<td />").html(
				"<select name='detailList["+ index + "].resultJudge' style='width:80px'>"
				+"<option value='合格'"+ok_checked+">合格</option>"
				+"<option value='不合格'"+ng_checked+">不合格</option></select>"
				).appendTo(tr);
		$("<td />").html(
				"<input class='reworkResult' name='detailList["
						+ index + "].reworkResult' value='"+reworkResult +"'style='width:80px'>").appendTo(tr);
		$("<td width='80px' />").html(
				"<select id='workshop_"+index+"' class='workshop' name='detailList["+ index + "].workshopId' disabled style='width:80px'>"
				+"<option value='0'>请选择</option></select>")
				.appendTo(tr);
		$("<td />").html(
				"<select id='workgroup_"+index+"' class='workgroup' name='detailList["+ index + "].workgroupId' value=0 style='width:100px'>"
				+"<option value='0'>请选择</option></select>").appendTo(tr);
		$("<td />").html(
				"<input  name='detailList["
						+ index + "].memo' style='width:80px' value='"+memo+"'>").appendTo(tr);
		$("<input id='testResultId_"+index+"' type='hidden' name='detailList["
				+ index + "].result' value='"+ value.faultIds+"' style='width:80px'>").appendTo(tr);
		$("<input type='hidden' name='detailList["
						+ index + "].id' value='"+value.id+"' style='width:80px'>").appendTo(tr);
		last_processNo = value.processNo;
		last_itemNo = value.testItemNo;
		tr.appendTo("#tableResult tbody");
		getSelects_empty(workgrouplist,value.workgroup,"#workgroup_"+index,"0");
		getSelects_empty(workshoplist,"部件","#workshop_"+index,"0");
	});
}
//清空标准故障库查询窗口
function emptyModal(){
	$("#faultLibResult").css("display","none");
	$("#faultLibResult tbody").html("");
	$("#input_parts").val("");
	$("#input_faultLevel").val("");
	$("#input_bug").val("");
}
//检验结果模糊查询
function getTestResult(element){
	//alert($(element).attr("id"));
	var index=$(element).attr("id").split("_")[1];
	var workshopId="#workshop_"+index;
	var workgroupId="#workgroup_"+index;
	var faultLevelId="#seriousLevel_"+index;
	var resultList;
	$(element).typeahead({
		source: function (input, process) {
			var conditions="{'parts':'"+$("#parts_name").val()+"','bug':'"+input+"'}";
	        $.get("stdFaultlib!getFaultLibFuzzyList.action", {"conditions":conditions}, function (data) {
	        	resultList=data.dataList;
	        	var results=new Array();
	        	$.each(resultList,function(index,value){
	        		results.push(value.bug);
	        	})	        	
	        	return process(results);
	        },'json');
	    },
	    highlighter: function (item) {
	    	var workshop="";
	    	var workgroup="";
	    	var faultLevel="";
	    	$.each(resultList,function(index,value){
        		if(value.bug==item){
        			workshop=value.workshop;
        			workgroup=value.workgroup;
        			faultLevel=value.faultLevel;
        		}
        	})	
            return  item + "  "+faultLevel+"  "+workshop+"  "+workgroup;
        },
	    updater:function(item){
	    	var workshop="";
	    	var workgroup="";
	    	var faultLevel="";
	    	$.each(resultList,function(index,value){
        		if(value.bug==item){
        			workshop=value.workshop;
        			workgroup=value.workgroup;
        			faultLevel=value.faultLevel;
        		}
        	})			        	
	    	//$(elementId).attr("parts_id",selectId);
        	var factoryId=$("#factoryId").val();
	    	//alert(factoryId);
        	getWorkshopSelect(workshopId,workshop,factoryId,"empty");
        	getWorkgroupSelect(workgroupId,workgroup,$(".workshop :eq(0)").val(),"empty");
	    	$(faultLevelId).val(faultLevel);
	    	return item;
	    }
    });	
}