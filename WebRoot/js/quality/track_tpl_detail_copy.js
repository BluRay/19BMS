var detaillist;
var cworkshop;
var cworkshopId;
$(document).ready(function(){
	initPage();
	$("#input_busType").change(function(){
		getOrderSelect("#input_order",$("#input_busType").val(),"");
	});
	$("#input_order").change(function(){
		var orderNo=($("#input_order option:selected").text().split(" "))[0];
		//alert(orderNo);
		getOrderConfigSelect("#input_config","","noall",orderNo);
	});
	//往上移
	$(".fa-arrow-up").live("click",function(e){
		var tds=$(e.target).parent("td").siblings();
		var trId=$(e.target).parent("td").parent("tr").attr("id");
		var index=parseInt((trId.split("_"))[1]);
		var c_sequence=parseInt($(tds[0]).html());
		var c_parts=$("#parts_"+index).val();
		var c_partsId=parseInt($(tds[1]).attr("partsId"));
		var c_recordId=parseInt($(tds[1]).attr("recordId"));
		var c_processNo=$(tds[2]).html();
		var c_processName=$("#processName_"+index).val();
		//alert(c_recordId);
		if(c_sequence>1){
			detaillist[c_recordId].partsId=detaillist[c_recordId-1].partsId;
			detaillist[c_recordId].parts=detaillist[c_recordId-1].parts;
			detaillist[c_recordId].processNo=detaillist[c_recordId-1].processNo;
			detaillist[c_recordId].processName=detaillist[c_recordId-1].processName;
			//detaillist[c_recordId].sequence=detaillist[c_recordId-1].sequence;
			detaillist[c_recordId-1].partsId=c_partsId;
			detaillist[c_recordId-1].parts=c_parts;
			detaillist[c_recordId-1].processNo=c_processNo;
			detaillist[c_recordId-1].processName=c_processName;
			//detaillist[c_recordId-1].sequence=c_sequence;
			//generateTable(cworkshop);
			var index_last=index-1;
			var trId_last="tr_"+(index-1);
			var parts_last=$("#parts_"+index_last).val();
			var processNo_last=$("#td2_"+index_last).html();
			var processName_last=$("#processName_"+index_last).val();
			//alert(processNo_last);
			$("#parts_"+index).val(parts_last);
			$("#processName_"+index).val(processName_last);
			$("#td2_"+index).html(processNo_last);
			$("#parts_"+index_last).val(c_parts);
			$("#td2_"+index_last).html(c_processNo);
			$("#processName_"+index_last).val(c_processName);
			
		}		
	});
	$(".fa-arrow-down").live("click",function(e){
		var tds=$(e.target).parent("td").siblings();
		var trId=$(e.target).parent("td").parent("tr").attr("id");
		var index=parseInt((trId.split("_"))[1]);
		var c_sequence=parseInt($(tds[0]).html());
		var c_parts=$("#parts_"+index).val();
		var c_partsId=parseInt($(tds[1]).attr("partsId"));
		var c_recordId=parseInt($(tds[1]).attr("recordId"));
		var c_processNo=$(tds[2]).html();
		var c_processName=$("#processName_"+index).val();
		var next_sequence=detaillist[c_recordId+1].sequence;
		//alert(next_sequence);
		if(next_sequence!=1){
			detaillist[c_recordId].partsId=detaillist[c_recordId+1].partsId;
			detaillist[c_recordId].parts=detaillist[c_recordId+1].parts;
			detaillist[c_recordId].processNo=detaillist[c_recordId+1].processNo;
			detaillist[c_recordId].processName=detaillist[c_recordId+1].processName;
			//detaillist[c_recordId].sequence=detaillist[c_recordId-1].sequence;
			detaillist[c_recordId+1].partsId=c_partsId;
			detaillist[c_recordId+1].parts=c_parts;
			detaillist[c_recordId+1].processNo=c_processNo;
			detaillist[c_recordId+1].processName=c_processName;
			//detaillist[c_recordId-1].sequence=c_sequence;
			//generateTable(cworkshop);
			var index_next=index+1;
			//alert(index_next);
			var trId_next="tr_"+(index+1);
			var parts_next=$("#parts_"+index_next).val();
			var processNo_next=$("#td2_"+index_next).html();
			var processName_next=$("#processName_"+index_next).val();
			//alert(processNo_next);
			$("#parts_"+index).val(parts_next);
			$("#processName_"+index).val(processName_next);
			$("#td2_"+index).html(processNo_next);
			$("#parts_"+index_next).val(c_parts);
			$("#td2_"+index_next).html(c_processNo);
			$("#processName_"+index_next).val(c_processName);
		}		
	});
	/*//弹出新增窗口
	$(".fa-plus").live("click",function(e){
		var tds=$(e.target).parent("td").siblings();
		var c_recordId=parseInt($(tds[1]).attr("recordId"));
		$("#newModal").data("recordId",c_recordId);
		getPartsSelect("#new_select");
		$("#newModal").modal("show");
	})
	//增加一行
	$("#btnNew").live("click",function(){
		var c_recordId=$("#newModal").data("recordId");
		var insertData={
				parts:$("#new_select").val(),
				partsId:parseInt($("#new_select").attr("parts_id")),
				sequence:detaillist[c_recordId].sequence+1,
				tplRecordId:detaillist[c_recordId].tplRecordId,
				workshop:cworkshop,
				workshopId:cworkshopId
		};
		//alert(insert_recordid);		
		detaillist.splice(c_recordId+1,0,insertData);
		$.each(detaillist,function(index,value){
			if(index>c_recordId+1&&value.workshop.indexOf(cworkshop)>=0){
				detaillist[index].sequence+=1;
			}
		});
		generateTable(cworkshop);
		emptyNewModal();
	});*/
	//新增一行
	$(".fa-plus").live("click",function(e){
		var tds=$(e.target).parent("td").siblings();
		var c_recordId=parseInt($(tds[1]).attr("recordId"));
		var insertData={
				parts:'',
				partsId:'',
				processNo:'',
				processName:'',
				sequence:detaillist[c_recordId].sequence+1,
				tplRecordId:detaillist[c_recordId].tplRecordId,
				workshop:cworkshop,
				workshopId:cworkshopId
		};
		detaillist.splice(c_recordId+1,0,insertData);
		$.each(detaillist,function(index,value){
			if(index>c_recordId+1&&value.workshop.indexOf(cworkshop)>=0){
				detaillist[index].sequence+=1;
			}
		});
		generateTable(cworkshop);
	})
	//删除一行
	$(".fa-times").live("click",function(e){
		var tds=$(e.target).parent("td").siblings();
		var c_recordId=parseInt($(tds[1]).attr("recordId"));
		var c_sequence=parseInt($(tds[0]).html());
		//alert(c_recordId);
		$.each(detaillist,function(index,value){
			if(value.sequence>c_sequence&&value.workshop.indexOf(cworkshop)>=0){
				detaillist[index].sequence-=1;
			}
		});
		detaillist.splice(c_recordId,1);
		generateTable(cworkshop);
	})
/*	//编辑
	$(".fa-pencil").live("click",function(e){
		var tds=$(e.target).parent("td").siblings();
		var c_recordId=parseInt($(tds[1]).attr("recordId"));
		$("#editModal").data("recordId",c_recordId);
		getPartsSelect("#edit_select");
		$("#editModal").modal("show");
	})
	//编辑保存
	$("#btnSave").live("click",function(){
		var c_recordId=$("#editModal").data("recordId");
		detaillist[c_recordId].partsId=parseInt($("#edit_select").attr("parts_id"));
		detaillist[c_recordId].parts=$("#edit_select").val();		
		generateTable(cworkshop);
		emptyEditModal();
	});*/
		//零部件输入事件绑定，更新detaillist对应数据
	$(".parts").live("click",function(e){
		var c_elementId=$(this).attr("id");
		getPartsSelect("#"+c_elementId,"",function(obj){
			//alert(obj.id);
			var tds=$(e.target).parent("td").siblings();
			var c_recordId=parseInt($(tds[1]).attr("recordId"));
			detaillist[c_recordId].partsId=parseInt(obj.id);
			detaillist[c_recordId].parts=obj.name;	
		});
	});
	//供应商输入事件绑定，更新detaillist对应数据
	$(".process").live("click",function(e){
		//alert($(this).val());
		var c_elementId=$(this).attr("id");
		getProcessSelect("#"+c_elementId,cworkshop,function(obj){
			var tds=$(e.target).parent("td").siblings();
			var c_recordId=parseInt($(tds[1]).attr("recordId"));
			//alert($(tds[0]).html());
			$(tds[1]).html(obj.process_code);
			detaillist[c_recordId].processNo=obj.process_code;
			detaillist[c_recordId].processName=obj.process_name;	
		});
	});
	//保存模板更改
	$("#btnSaveTplDetail").live("click",function(){
		var busTypeId=isNaN(parseInt($("#input_busType").val()))?0:parseInt($("#input_busType").val());
		var orderId=isNaN(parseInt($("#input_order").val()))?0:parseInt($("#input_order").val());
		var configId=isNaN(parseInt($("#input_config").val()))?0:parseInt($("#input_config").val());
		var flag=true;	
		if(busTypeId==0){
			alert("必须选择车型！");
			flag=false;
		}
		if(flag){
			$.ajax({
				url: "trackTpl!addTplDetailCopy.action",
				type:"post",
				dataType: "json",
				data: {
					"detailList":JSON.stringify(detaillist),
					"tplHeader.busTypeId":busTypeId,
					"tplHeader.orderId":orderId,
					"tplHeader.configId":configId,
					"tplHeader.memo":$("#input_memo").val()
				},
				async: false,
				error: function () {alertError();},
				success: function (response) {	
					alert(response.message);
						if(response.success){
							window.open("trackTpl!index.action","_self");
						}
				}
			})
		}
	
	});
})
function generateTable(workshop){
		var showAddEmpty=true;//当没有数据时，显示表头"+"符号，方便新增一行
		cworkshop=workshop;
		var tableId="";
		if(workshop.indexOf("焊装")>=0){
			tableId="#welding";
		}
		if(workshop.indexOf("涂装")>=0){
			tableId="#painting";
		}
		if(workshop.indexOf("底盘")>=0){
			tableId="#bottom";
		}
		if(workshop.indexOf("总装")>=0){
			tableId="#assembly";
		}
		$(tableId+" tbody").html("");
		$.each(detaillist,function(index,value){
			if(value.workshop.indexOf(workshop)>=0){
				cworkshopId=value.workshopId;
				var tr = $("<tr id='tr_"+index+"'/>");
				$("<td id='td0_"+index+"'/>").attr("recordId",index)
				.html(value.sequence).appendTo(tr);
				var processName=value.processName==null?'':value.processName;
				$("<td />").attr("recordId",index)
				.attr("processName",processName)
				.html("<input style='border:0;width:100%' class='process' value='"+processName+"' id='processName_"+index+"'>").appendTo(tr);
				$("<td id='td2_"+index+"'/>").attr("recordId",index)
				.attr("processNo",value.processNo)
				.html(value.processNo).appendTo(tr);
				
				$("<td />").attr("recordId",index)
				.attr("partsId",value.partsId)
				.html("<input style='border:0;width:100%'class='parts' value='"+value.parts+"' id='parts_"+index+"'>").appendTo(tr);
				
				$("<td />").html("<i name='edit' class=\"fa fa-arrow-up\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+
						"<i name='edit' class=\"fa fa-arrow-down\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+
						"<i name='edit' class=\"fa fa-plus\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+
						"<i name='edit' class=\"fa fa-times\" style=\"cursor: pointer\"></i>")
				.appendTo(tr);
				tr.appendTo(tableId+" tbody");
				showAddEmpty=false;
			}				
		});
		
		if(showAddEmpty){
			if(cworkshop=="焊装"){
				cworkshopId=25;
			}
			if(cworkshop=="涂装"){
				cworkshopId=27;
			}
			if(cworkshop=="底盘"){
				cworkshopId=28;
			}
			if(cworkshop=="总装"){
				cworkshopId=29;
			}
			var detailListSize=detaillist.length;
			//alert(detailListSize);
			var tr = $("<tr id='tr_"+detailListSize+"'/>");
			$("<td id='td0_"+detailListSize+"'/>").attr("recordId",detailListSize)
			.html(1).appendTo(tr);			
			$("<td />").attr("recordId",detailListSize)
			.attr("processName","")
			.html("<input style='border:0;width:100%'class='process' value='"+"' id='processName_"+detailListSize+"'>").appendTo(tr);
			$("<td id='td2_"+detailListSize+"'/>").attr("recordId",detailListSize)
			.attr("processNo","")
			.html("").appendTo(tr);
			
			$("<td />").attr("recordId",detailListSize)
			.attr("partsId",0)
			.html("<input style='border:0;width:100%'class='parts' value='"+"' id='parts_"+detailListSize+"'>").appendTo(tr);
			
			$("<td />").html("<i name='edit' class=\"fa fa-arrow-up\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+
					"<i name='edit' class=\"fa fa-arrow-down\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+
					"<i name='edit' class=\"fa fa-plus\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+
					"<i name='edit' class=\"fa fa-times\" style=\"cursor: pointer\"></i>")
			.appendTo(tr);
			tr.appendTo(tableId+" tbody");
			detaillist.push({"recordId":detailListSize,"workshopId":cworkshopId,"workshop":cworkshop,"sequence":1,"processName":"","parts":""});
		}
	}
	function getDetail() {
		$.ajax({
			type : "get",// 使用get方法访问后台
			dataType : "json",// 返回json格式的数据
			url : "trackTpl!getTplDetail.action",
			data : {
				"tplHeader.id" : $('#tplHeaderId').val()
			},
			success : function(response) {
				var tplarray = response.dataList;
				detaillist = tplarray;
				generateTable("焊装");

			}
		});
	}
	// 页面初始化
	function initPage() {
		getDetail();
		getBusTypeSelect("#input_busType","");
		//getOrderConfigSelect("#input_config","");
		//getOrderSelect("#input_order","");
		modalMove("#editModal");
		modalMove("#newModal");
		//getWorkshopSelect_Key("#input_workshop","");
		$("#qc_tmpl_in").addClass("in");
	}
	function emptyEditModal(){
		$("#edit_select").val("");
		$("#editModal").modal("hide");
	}
	function emptyNewModal(){
		$("#new_select").val("");
		$("#newModal").modal("hide");
	}