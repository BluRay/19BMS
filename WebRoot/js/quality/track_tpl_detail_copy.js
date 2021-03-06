var detaillist;
var cworkshop;
var cworkshopId;
var busType='';
var tplType='';
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
		var c_partsId=parseInt($(tds[2]).attr("partsId"));
		var c_recordId=parseInt($(tds[1]).attr("recordId"));
		var c_processNo=""/*$(tds[2]).html()*/;
		var c_processName=$("#processName_"+index).val();
		
		var c_key_parts=$(tds[3]).find("select").val();
		//alert(c_key_parts);
		if(c_sequence>1){
			detaillist[c_recordId].partsId=detaillist[c_recordId-1].partsId;
			detaillist[c_recordId].parts=detaillist[c_recordId-1].parts;
			detaillist[c_recordId].processNo=""/*detaillist[c_recordId-1].processNo*/;
			detaillist[c_recordId].processName=detaillist[c_recordId-1].processName;
			detaillist[c_recordId].keyParts=detaillist[c_recordId-1].keyParts;
			//detaillist[c_recordId].sequence=detaillist[c_recordId-1].sequence;
			detaillist[c_recordId-1].partsId=c_partsId;
			detaillist[c_recordId-1].parts=c_parts;
			detaillist[c_recordId-1].processNo=c_processNo;
			detaillist[c_recordId-1].processName=c_processName;
			detaillist[c_recordId-1].keyParts=c_key_parts;
			//detaillist[c_recordId-1].sequence=c_sequence;
			//generateTable(cworkshop);
			var index_last=index-1;
			var trId_last="tr_"+(index-1);
			var parts_last=$("#parts_"+index_last).val();
			var processNo_last=""/*$("#td2_"+index_last).html()*/;
			var processName_last=$("#processName_"+index_last).val();
			var trId_cur="tr_"+index;
			var key_parts_last=$("#"+trId_last).find(".key_parts").val();
			//alert(processNo_last);
			$("#parts_"+index).val(parts_last);
			$("#processName_"+index).val(processName_last);
			$("#"+trId_cur).find(".key_parts").val(key_parts_last);
			/*$("#td2_"+index).html(processNo_last);*/
			$("#parts_"+index_last).val(c_parts);
			/*$("#td2_"+index_last).html(c_processNo);*/
			$("#processName_"+index_last).val(c_processName);
			$("#"+trId_last).find(".key_parts").val(c_key_parts);
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
		var c_processNo=""/*$(tds[2]).html()*/;
		var c_processName=$("#processName_"+index).val();
		
		var c_key_parts=$(tds[3]).find("select").val();
		
		var next_sequence=detaillist[c_recordId+1].sequence;
		//alert(next_sequence);
		if(next_sequence!=1){
			detaillist[c_recordId].partsId=detaillist[c_recordId+1].partsId;
			detaillist[c_recordId].parts=detaillist[c_recordId+1].parts;
			detaillist[c_recordId].processNo=""/*detaillist[c_recordId+1].processNo*/;
			detaillist[c_recordId].processName=detaillist[c_recordId+1].processName;
			detaillist[c_recordId].keyParts=detaillist[c_recordId+1].keyParts;
			//detaillist[c_recordId].sequence=detaillist[c_recordId-1].sequence;
			detaillist[c_recordId+1].partsId=c_partsId;
			detaillist[c_recordId+1].parts=c_parts;
			detaillist[c_recordId+1].processNo=c_processNo;
			detaillist[c_recordId+1].processName=c_processName;
			detaillist[c_recordId+1].keyParts=c_key_parts;
			//detaillist[c_recordId-1].sequence=c_sequence;
			//generateTable(cworkshop);
			var index_next=index+1;
			//alert(index_next);
			var trId_next="tr_"+(index+1);
			var parts_next=$("#parts_"+index_next).val();
			var processNo_next=""/*$("#td2_"+index_next).html()*/;
			var processName_next=$("#processName_"+index_next).val();
			var key_parts_next=$("#"+trId_next).find(".key_parts").val();
			//alert(processNo_next);
			$("#parts_"+index).val(parts_next);
			$("#processName_"+index).val(processName_next);
			var trId_cur="tr_"+index;
			$("#"+trId_cur).find(".key_parts").val(key_parts_next);
			/*$("#td2_"+index).html(processNo_next);*/
			$("#parts_"+index_next).val(c_parts);
			/*$("#td2_"+index_next).html(c_processNo);*/
			$("#processName_"+index_next).val(c_processName);
			$("#"+trId_next).find(".key_parts").val(c_key_parts);
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
				workshopId:cworkshopId,
				keyParts:'否'
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
			detaillist[c_recordId].processNo=""/*obj.process_code*/;
			detaillist[c_recordId].processName=obj.process_name;	
		});
	});
	
	$(".key_parts").live("change",function(e){
		//alert($(e.target).val());
		var recordId=$(this).parent("td").attr("recordid");
		detaillist[recordId].keyParts=$(this).val();
	});
	//保存模板更改
	$("#btnSaveTplDetail").live("click",function(){
		var flag=true;
		$.each(detaillist,function(index,detail){
			if(detail.partsId==''||detail.partsId=='0'||detail.partsId==null){
				$("#parts_"+index).val("").attr("placeholder","请输入有效零部件！").css("color","red");
				flag=false;
			}
			/*if(detail.processNo==''){
				$("#processName_"+index).val("").attr("placeholder","请输入有效工序！").css("color","red");
				flag=false;
			}*/
		});
		var busTypeId=isNaN(parseInt($("#input_busType").val()))?0:parseInt($("#input_busType").val());
		var orderId=isNaN(parseInt($("#input_order").val()))?0:parseInt($("#input_order").val());
		var configId=isNaN(parseInt($("#input_config").val()))?0:parseInt($("#input_config").val());
			
		if(busTypeId==0){
			alert("请选择车型！");
			flag=false;
		}
		if(tplType=='订单'&&orderId==0){
			alert("请选择订单！");
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
							if(tplType=='车型'){
								window.open("trackTpl!carType.action","_self");
							}else
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
				.html("<input style='border:0;width:100%;text-align:center' class='process' value='"+processName+"' id='processName_"+index+"'>").appendTo(tr);
				/*$("<td id='td2_"+index+"'/>").attr("recordId",index)
				.attr("processNo",value.processNo)
				.html(value.processNo).appendTo(tr);*/
				
				$("<td />").attr("recordId",index)
				.attr("partsId",value.partsId)
				.html("<input style='border:0;width:100%;text-align:center'class='parts' value='"+value.parts+"' id='parts_"+index+"'>").appendTo(tr);
				
				var key_readonly="";
				if(tplType=='订单'){
					key_readonly="disabled";
				}
				var key_parts_select="<select class='key_parts' style='border:0;width:100%;text-align:center;margin-bottom:0px;' "+key_readonly+"><option value='否' "
				+(value.keyParts=='否'?"selected":"")+">否</option><option value='是'"+(value.keyParts=='是'?"selected":"")+">是</option></select>";
				$("<td />").attr("recordId",index).html(key_parts_select).appendTo(tr);
				
				$("<td />").html("<i name='edit' class=\"fa fa-arrow-up\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+
						"<i name='edit' class=\"fa fa-arrow-down\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+
						"<i name='edit' class=\"fa fa-plus\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+
						"<i name='edit' class=\"fa fa-times\" style=\"cursor: pointer\"></i>")
				.appendTo(tr);
				tr.appendTo(tableId+" tbody");
				showAddEmpty=false;
			}				
		});
		$(tableId+"_tab").addClass("active").css("display","");
		$(tableId).addClass("active");
		
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
			/*$("<td id='td2_"+detailListSize+"'/>").attr("recordId",detailListSize)
			.attr("processNo","")
			.html("").appendTo(tr);*/
			
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
				"tplHeader.id" : $('#tplHeaderId').val(),
				"tplHeader.workshop" : getQueryString("tplHeader.workshop")
			},
			success : function(response) {
				var tplarray = response.dataList;
				detaillist = tplarray;
				generateTable(getQueryString("tplHeader.workshop"));

			}
		});
	}
	// 页面初始化
	function initPage() {
		busType=getQueryString("tplHeader.busType")||"";
		tplType=getQueryString("tplHeader.tplType")||"";
		getDetail();
		getBusTypeSelect("#input_busType",busType);
		//getOrderConfigSelect("#input_config","");
		//getOrderSelect("#input_order","");
		modalMove("#editModal");
		modalMove("#newModal");
		//getWorkshopSelect_Key("#input_workshop","");
		$("#qc_tmpl_in").addClass("in");
		if(tplType=='车型'){
			$("#input_config").parent("td").hide();
			$("#input_order").parent("td").hide();
			$("#th_order").hide();
			$("#th_config").hide();
		}else{
			$("#input_busType").attr("disabled",true);
			getOrderSelect("#input_order",$("#input_busType").val(),"");
			$("#input_workshop").attr("disabled",true);
		}
	}
	function emptyEditModal(){
		$("#edit_select").val("");
		$("#editModal").modal("hide");
	}
	function emptyNewModal(){
		$("#new_select").val("");
		$("#newModal").modal("hide");
	}