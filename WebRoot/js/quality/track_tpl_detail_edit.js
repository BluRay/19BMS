var detaillist;
var cworkshop;
$(document).ready(function(){
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
		var c_processNo=$(tds[2]).html();
		var c_processName=$("#processName_"+index).val();
		//alert("c_recordId = " + c_recordId + "|c_partsId = " + c_partsId);
		if(c_sequence>1){
			var temp_id = detaillist[c_recordId].partsId;
			detaillist[c_recordId].partsId=detaillist[c_recordId-1].partsId;
			detaillist[c_recordId].parts=detaillist[c_recordId-1].parts;
			detaillist[c_recordId].processNo=detaillist[c_recordId-1].processNo;
			detaillist[c_recordId].processName=detaillist[c_recordId-1].processName;
			//detaillist[c_recordId].sequence=detaillist[c_recordId-1].sequence;
			detaillist[c_recordId-1].partsId=temp_id;	//c_partsId;
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
			var temp_id = detaillist[c_recordId].partsId;
			detaillist[c_recordId].partsId=detaillist[c_recordId+1].partsId;
			detaillist[c_recordId].parts=detaillist[c_recordId+1].parts;
			detaillist[c_recordId].processNo=detaillist[c_recordId+1].processNo;
			detaillist[c_recordId].processName=detaillist[c_recordId+1].processName;
			//detaillist[c_recordId].sequence=detaillist[c_recordId-1].sequence;
			detaillist[c_recordId+1].partsId=temp_id;		//c_partsId;
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
			$("#parts_"+index).val(parts_next);
			$("#processName_"+index).val(processName_next);
			$("#td2_"+index).html(processNo_next);
			$("#parts_"+index_next).val(c_parts);
			$("#td2_"+index_next).html(c_processNo);
			$("#processName_"+index_next).val(c_processName);
		}		
	});
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
			detaillist[c_recordId].parts=obj.parts;	
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
			$(tds[1]).html(obj.process_code);
			detaillist[c_recordId].processNo=obj.process_code;
			detaillist[c_recordId].processName=obj.process_name;	
		});
	});
	//保存模板更改
	$("#btnSaveTplDetail").live("click",function(){

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
						window.open("trackTpl!index.action","_self");
					}
			}
		})
	});
})
function generateTable(workshop){
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
				.html("<input style='border:0;width:100%'class='process' value='"+processName+"' id='processName_"+index+"'>").appendTo(tr);
				$("<td id='td2_"+index+"'/>").attr("recordId",index)
				.attr("processNo",value.processNo)
				.html(value.processNo).appendTo(tr);
				
				$("<td />").attr("recordId",index)
				.attr("partsId",value.partsId)
				.html("<input style='border:0;width:100%'class='parts' value='"+value.parts+"' id='parts_"+index+"'>").appendTo(tr);
				
				$("<td />").html("<i name='edit' class=\"fa fa-arrow-up\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+
						"<i name='edit' class=\"fa fa-arrow-down\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;")
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