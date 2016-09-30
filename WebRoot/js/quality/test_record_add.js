var bustype;
$(document).ready(function() {
	initPage();
	$("#q_bustype").change(function(){
		$("#q_orderno").val("");
		$("#q_config").empty();
		bustype=$("#q_bustype option:selected").text();
	});
	$("#q_orderno").live("click",function(){
		var orderlist;
		$("#q_orderno").typeahead({
			source: function (input, process) {			
		        $.get("common!getOrderFuzzySelect.action", {"conditionMap.busType":bustype,"conditionMap.orderNo":input}, function (data) {
		        	orderlist=data;
		        	var results=new Array();
		        	$.each(data,function(index,value){
		        		results.push(value.orderNo);
		        	})	        	
		        	return process(results);
		        },'json');
		    },
		    highlighter: function (item) {    	
		    	var order_name="";
		    	var bus_type="";
		    	var order_qty="";
		    	$.each(orderlist,function(index,value){
	        		if(value.orderNo==item){
	        			order_name=value.name;
	        			bus_type=value.busType;
	        			order_qty=value.orderQty+"辆";
	        		}
	        	})	
	            return  item + "  "+order_name+" "+bus_type+order_qty;
	        },
	        matcher:function(item){
		    	//alert(this.query);
		    	return true;
		    },
		    updater:function(item){
		    	$.each(orderlist,function(index,value){
	        		if(value.orderNo==item){
	        			selectId=value.id;			
	        			getOrderConfigSelect("#q_config", "", "empty",value.orderNo);        			
	        		}
	        	})	        	
		    	//alert(submitId);
		    	$("#q_orderno").attr("order_id",selectId);
		    	$("#orderId").val(selectId);    		    	
		    	return item;
		    }
	    });	
	});
	
	//点击确定显示记录明细表格
	$("#btnShowDetail").click(function() {
		var busType = $("#q_bustype").val();
		var parts = $("#q_parts").val();
		var partsId=getPartsId($("#q_parts").val());
		var config = isNaN(parseInt($("#q_config").val()))?0:parseInt($("#q_config").val());
		var orderNo = $("#q_orderno").val();
		var factory = $("#q_factory").val();
		$("#busType").val(busType);
		$("#factoryId").val(factory);
		$("#orderConfigId").val(config);
		if (factory.trim().length == 0) {
			alert("请选择工厂！");
			return false;
		} else if (parts.trim().length == 0) {
			alert("请输入零部件名称！");
			return false;
		}else if(partsId=="0"){
			alert("请输入有效零部件！");
			return false;
		} 
		/*else if (orderNo.trim().length == 0) {
			alert("请输入订单编号！");
			return false;
		} */else if (busType.trim().length == 0) {
			alert("请选择车型！");
			return false;
		} else {
			$("#partsId").val(partsId);
			$("#parts_name").val($("#q_parts").val());
			ajaxGetDetail();			
		}
	});
	//点击保存，提交明细数据
	$("#btnAddTplDetail").click(function(){
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
		$(".testResult").each(function(){
			var result=$(this).val();
	/*		if(result.trim().length==0){
				alert("请填写检验结果！");
				$(this).focus();
				flag= false;
				return false;
			}*/
		});
	/*	$(".workshop").each(function(){
			var result=$(this).val();
			if(result.trim().length==0){
				alert("请选择责任车间！");
				$(this).focus();
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
		
	/*	if(typeof(result)=='undefined'||result.trim().length==0){
			alert("请选择检验结论！");
			flag= false;
			return false;
		}*/
		if(flag){
			$DisSelects = $("select[disabled]");//获取所有被禁用的select
		    $DisSelects.attr("disabled", false); 
			$("#saveForm").ajaxSubmit({
				url:"testRecordIn!addRecord.action",
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
		/*var siblings=$(this).siblings();
		var testResultEleId=$(siblings[0]).attr("id");*/
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
		 /*if(selectLibIds.trim().length==0){
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
function initPage() {
	getBusTypeSelect("#q_bustype", "", "empty");
	getPartsSelect("#q_parts","#partsId");
	getFactorySelect("#q_factory", "", "empty")
	
}
function ajaxGetDetail() {
	var config = isNaN(parseInt($("#q_config").val()))? 0 : $("#q_config").val();
	var conditions = "{";
	conditions += "orderNo:'" + $("#q_orderno").val() + "',";
	conditions += "config:" + config + ",";
	conditions += "busType:" + $("#q_bustype").val() + ",";
	conditions += "parts:'" + $("#q_parts").val();
	conditions += "'}";
	//alert(conditions);
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "testRecordIn!getRecordTplDetail.action",
		data : {
			"conditions" : conditions
		},
		success : function(response) {
			var tplarray = response.dataList;
			detaillist = tplarray;	
			if(typeof(detaillist)=='undefined'||detaillist.length<=0){
				alert("未查询到匹配模板！");
				$("#saveForm").css("display", "none");
			}else{
				$("#btnShowDetail").attr("disabled",true);
				$("#q_bustype").attr("disabled",true);
				$("#q_orderno").attr("disabled",true);
				$("#q_config").attr("disabled",true);
				$("#q_parts").attr("disabled",true);
				generateTable(tplarray);//动态生成表格
				var factoryId=$("#q_factory").val();
				getWorkshopSelect(".workshop","部件",factoryId,"empty");
				var workshopId=$(".workshop :eq(0)").val();
				//alert(workshopId);
				getWorkgroupSelect(".workgroup","",workshopId,"empty");
				$("#saveForm").css("display", "");
			}
			
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
		$(tr).data("tplDetailId", value.id);
		var process_id = "#process_" + value.processNo;
		var item_id = "#item_" + value.testItemNo;
		//工序合并
		if (value.processNo == last_processNo) {

			var prorowspan = parseInt($(process_id).attr("rowspan"));
			$(process_id).attr("rowspan", prorowspan + 1);
			if((value.processName).trim().length>0){
				$(process_id).html(value.processName);
			}
		} else {
			$("<td id='process_" + value.processNo + "' rowspan='1' " + "/>")
					.html(value.processName).appendTo(tr);
		}
		//检测项目合并
		if (value.testItemNo == last_itemNo&&value.processNo == last_processNo) {
			var itemrowspan = parseInt($(item_id).attr("rowspan"));
			var recordid = $(item_id).attr("recordid") + "," + index;
			$(item_id).attr("rowspan", itemrowspan + 1);
			if((value.testItemName).trim().length>0){
				$(item_id).html(value.testItemName);
			}
		} else {
			$("<td id='item_" + value.testItemNo + "' rowspan='1'" + "/>")
					.html(value.testItemName).appendTo(tr);
		}

		$("<td />").attr("id", "std_" + index).attr("recordid", index).attr(
				"item_no", value.testItemNo)
				.attr("process_no", value.processNo).html(value.testStdName)
				.appendTo(tr);
		$("<td />").attr("id", "freq_" + index).attr("recordid", index).attr(
				"item_no", item_id).attr("process_no", value.processNo).html(
				value.frequency).appendTo(tr);
		$("<td />").attr("id", "tools_" + index).attr("recordid", index).attr(
				"item_no", item_id).attr("process_no", value.processNo).html(
				value.testTools).appendTo(tr);
		$("<td width='150px' />").html(
				"<input id='testResult_"+index+"' class='testResult' style='width:120px' >").appendTo(tr);
		$("<td />").html(
				"<select name='detailList["+ index + "].resultJudge' style='width:80px'>"
				+"<option value='合格'>合格</option><option value='不合格'>不合格</option></select>"
				).appendTo(tr);
		$("<td />").html(
				"<input class='reworkResult' name='detailList["
						+ index + "].reworkResult' style='width:80px'>").appendTo(tr);
		$("<td width='80px' />").html(
				"<select id='workshop_"+index+"' class='workshop' name='detailList["+ index + "].workshopId' disabled style='width:80px'>"
				+"<option value='0'>请选择</option></select>")
				.appendTo(tr);
		$("<td />").html(
				"<select id='workgroup_"+index+"' class='workgroup' name='detailList["+ index + "].workgroupId' value=0 style='width:100px'>"
				+"<option value='0'>请选择</option></select>").appendTo(tr);
		$("<td />").html(
				"<input  name='detailList["
						+ index + "].memo' style='width:80px'>").appendTo(tr);
		$("<input id='testResultId_"+index+"' type='hidden' name='detailList["
						+ index + "].result' >").appendTo(tr);
		$("<input type='hidden' name='detailList["
						+ index + "].tplDetailId' value='"+value.id+"' style='width:80px'>").appendTo(tr);
		last_processNo = value.processNo;
		last_itemNo = value.testItemNo;
		tr.appendTo("#tableResult tbody");
		
		
	});
}
//清空标准故障库查询窗口
function emptyModal(){
	$("#faultLibResult").css("display","none");
	$("#faultLibResult tbody").html("");
	$("#input_parts").val();
	$("#input_faultLevel").val();
	$("#input_bug").val();
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
			var conditions="{'parts':'"+$("#q_parts").val()+"','bug':'"+input+"'}";
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
        	var factoryId=$("#q_factory").val();
        	getWorkshopSelect(workshopId,workshop,factoryId,"empty");
        	getWorkgroupSelect(workgroupId,workgroup,$(".workshop :eq(0)").val(),"empty");
	    	$(faultLevelId).val(faultLevel);
	    	return item;
	    }
    });	
}