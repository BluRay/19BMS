var detaillist;
var cworkshop;
var cworkshopId;
var tplType='';
$(document).ready(function(){
	tplType=getQueryString("tplHeader.tplType")||"";
	modalMove("#editModal");
	$("#qc_tmpl_in").addClass("in");
	getDetail();
	$(".fa-arrow-up").live("click",function(e){
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
		//alert("c_recordId = " + c_recordId + "|c_partsId = " + c_partsId);
		if(c_sequence>1){
			var temp_id = detaillist[c_recordId].partsId;
			detaillist[c_recordId].partsId=detaillist[c_recordId-1].partsId;
			detaillist[c_recordId].parts=detaillist[c_recordId-1].parts;
			detaillist[c_recordId].processNo=""/*detaillist[c_recordId-1].processNo*/;
			detaillist[c_recordId].processName=detaillist[c_recordId-1].processName;
			detaillist[c_recordId].keyParts=detaillist[c_recordId-1].keyParts;
			//detaillist[c_recordId].sequence=detaillist[c_recordId-1].sequence;
			detaillist[c_recordId-1].partsId=temp_id;	//c_partsId;
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
			
			$("#parts_"+index).val(parts_last);
			$("#processName_"+index).val(processName_last);
			$("#td2_"+index).html(processNo_last);
			$("#"+trId_cur).find(".key_parts").val(key_parts_last);
			
			$("#parts_"+index_last).val(c_parts);
			$("#td2_"+index_last).html(c_processNo);
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
		var next_sequence=detaillist[c_recordId+1].sequence;
		var c_key_parts=$(tds[3]).find("select").val();
		
		//alert(next_sequence);
		if(next_sequence!=1){
			var temp_id = detaillist[c_recordId].partsId;
			detaillist[c_recordId].partsId=detaillist[c_recordId+1].partsId;
			detaillist[c_recordId].parts=detaillist[c_recordId+1].parts;
			detaillist[c_recordId].processNo=""/*detaillist[c_recordId+1].processNo*/;
			detaillist[c_recordId].processName=detaillist[c_recordId+1].processName;
			detaillist[c_recordId].keyParts=detaillist[c_recordId+1].keyParts;
			
			//detaillist[c_recordId].sequence=detaillist[c_recordId-1].sequence;
			detaillist[c_recordId+1].partsId=temp_id;		//c_partsId;
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
			var processNo_next=$("#td2_"+index_next).html();
			var processName_next=$("#processName_"+index_next).val();
			var key_parts_next=$("#"+trId_next).find(".key_parts").val();
			
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
			//alert(obj.name);
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
			//alert(obj.id);
			var tds=$(e.target).parent("td").siblings();
			var c_recordId=parseInt($(tds[1]).attr("recordId"));
			//alert($(tds[0]).html());
			/*$(tds[1]).html(obj.process_code);*/
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
			if(detail.partsId==''||detail.partsId=='0'){
				$("#parts_"+index).val("").attr("placeholder","请输入有效零部件！").css("color","red");
				flag=false;
			}
			/*if(detail.processNo==''){
				$("#processName_"+index).val("").attr("placeholder","请输入有效工序！").css("color","red");
				flag=false;
			}*/
		});
		if(flag)
		$.ajax({
			url: "trackTpl!updateTplDetail.action",
			type:"post",
			dataType: "json",
			data: {
				"detailList":JSON.stringify(detaillist)
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
	});
})
function generateTable(workshop){
		cworkshop=workshop;
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
		//$("#welding_tab").removeClass("active");
		$(tableId+" tbody").html("");
		$.each(detaillist,function(index,value){
			if(value.workshop.indexOf(workshop)>=0){
				var tr = $("<tr id='tr_"+index+"'/>");
				$("<td id='td0_"+index+"'/>").attr("recordId",index)
				.html(value.sequence).appendTo(tr);
				var processName=value.processName==null?'':value.processName;
				$("<td />").attr("recordId",index)
				.attr("processName",processName)
				.html("<input style='border:0;width:100%;text-align:center'class='process' value='"+processName+"' id='processName_"+index+"'>").appendTo(tr);
				/*$("<td id='td2_"+index+"'/>").attr("recordId",index)
				.attr("processNo",value.processNo)
				.html(value.processNo).appendTo(tr);*/
				
				$("<td />").attr("recordId",index)
				.attr("partsId",value.partsId)
				.html("<input style='border:0;width:100%;text-align:center'class='parts' value='"+value.parts+"' id='parts_"+index+"'>").appendTo(tr);
				
			/*	$("<td />").html("<i name='edit' class=\"fa fa-arrow-up\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+
						"<i name='edit' class=\"fa fa-arrow-down\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;")
				.appendTo(tr);*/
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
			}
				
		});
		$(tableId+"_tab").addClass("active").css("display","");
		$(tableId).addClass("active");
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
	function emptyEditModal(){
		$("#edit_select").val("");
		$("#editModal").modal("hide");
	}