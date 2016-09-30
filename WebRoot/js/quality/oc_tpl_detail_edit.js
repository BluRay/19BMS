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
		var c_vendor=$("#vendor_"+index).val();
		var c_partsId=parseInt($(tds[1]).attr("partsId"));
		var c_partsNo=$("#partsNo_"+index).val();
		var c_recordId=parseInt($(tds[1]).attr("recordId"));

		//alert(c_recordId);
		if(c_sequence>1){
			var index_last=index-1;
			var trId_last="tr_"+(index-1);
			var parts_last=$("#parts_"+index_last).val();
			var partsNo_last=$("#partsNo_"+index_last).val();
			var vendor_last=$("#vendor_"+index_last).val();
			detaillist[c_recordId].partsId=detaillist[c_recordId-1].partsId;
			detaillist[c_recordId].parts=detaillist[c_recordId-1].parts;
			detaillist[c_recordId].vendor=detaillist[c_recordId-1].vendor;
			//detaillist[c_recordId].sequence=detaillist[c_recordId-1].sequence;
			detaillist[c_recordId-1].partsId=c_partsId;
			detaillist[c_recordId-1].parts=c_parts;
			detaillist[c_recordId-1].vendor=c_vendor;
			//generateTable(cworkshop);
			
			//$("#td0_"+index).html(sequence_last);
			$("#parts_"+index).val(parts_last);
			$("#partsNo_"+index).val(partsNo_last);
			$("#vendor_"+index).val(vendor_last);
			//$("#td0_"+index_last).html(c_sequence);
			$("#parts_"+index_last).val(c_parts);
			$("#partsNo_"+index_last).val(c_partsNo);
			$("#vendor_"+index_last).val(c_vendor);
		}		
	});
	$(".fa-arrow-down").live("click",function(e){
		var tds=$(e.target).parent("td").siblings();
		var trId=$(e.target).parent("td").parent("tr").attr("id");
		var index=parseInt((trId.split("_"))[1]);
		var c_sequence=parseInt($(tds[0]).html());
		var c_parts=$("#parts_"+index).val();
		var c_vendor=$("#vendor_"+index).val();
		var c_partsId=parseInt($(tds[1]).attr("partsId"));
		var c_partsNo=$("#partsNo_"+index).val();
		var c_recordId=parseInt($(tds[1]).attr("recordId"));
		var next_sequence=detaillist[c_recordId+1].sequence;
		//alert(next_sequence);
		if(next_sequence!=1){
			detaillist[c_recordId].partsId=detaillist[c_recordId+1].partsId;
			detaillist[c_recordId].parts=detaillist[c_recordId+1].parts;
			detaillist[c_recordId].vendor=detaillist[c_recordId+1].vendor;
			//detaillist[c_recordId].sequence=detaillist[c_recordId-1].sequence;
			detaillist[c_recordId+1].partsId=c_partsId;
			detaillist[c_recordId+1].parts=c_parts;
			detaillist[c_recordId+1].vendor=c_vendor;
			//generateTable(cworkshop);
			var index_next=index+1;
			//alert(index_next);
			var trId_next="tr_"+(index+1);
			var parts_next=$("#parts_"+index_next).val();
			var partsNo_next=$("#partsNo_"+index_next).val();
			var vendor_next=$("#vendor_"+index_next).val();
			$("#parts_"+index).val(parts_next);
			$("#partsNo_"+index).val(partsNo_next);
			$("#vendor_"+index).val(vendor_next);
			$("#parts_"+index_next).val(c_parts);
			$("#partsNo_"+index_next).val(c_partsNo);
			$("#vendor_"+index_next).val(c_vendor);
		}		
	});
/*	//编辑
	$(".fa-pencil").live("click",function(e){
		var tds=$(e.target).parent("td").siblings();
		var c_recordId=parseInt($(tds[1]).attr("recordId"));
		$("#editModal").data("recordId",c_recordId);
		getPartsSelect("#edit_select");
		$("#edit_select").val($(tds[1]).html());
		$("#edit_input").val($(tds[2]).html());
		$("#editModal").modal("show");
	})
	//编辑保存
	$("#btnSave").live("click",function(){
		var c_recordId=$("#editModal").data("recordId");
		detaillist[c_recordId].partsId=parseInt($("#edit_select").attr("parts_id"));
		detaillist[c_recordId].parts=$("#edit_select").val();
		detaillist[c_recordId].vendor=$("#edit_input").val();
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
	$(".vendor").live("change",function(e){
		//alert($(this).val());
		var c_elementId=$(this).attr("id");
		var tds=$(e.target).parent("td").siblings();
		var c_recordId=parseInt($(tds[1]).attr("recordId"));
		detaillist[c_recordId].vendor=$(this).val();
		//alert(detaillist[c_recordId].vendor);
	});
	//零部件编号输入事件绑定，更新detaillist对应数据
	$(".partsNo").live("change",function(e){
		//alert($(this).val());
		var c_elementId=$(this).attr("id");
		var tds=$(e.target).parent("td").siblings();
		var c_recordId=parseInt($(tds[1]).attr("recordId"));
		detaillist[c_recordId].partsNo=$(this).val();
		//alert(detaillist[c_recordId].partsNo);
	});	
	//保存模板更改
	$("#btnSaveTplDetail").live("click",function(){
		$.ajax({
			url: "ocTpl!updateTplDetail.action",
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
						window.open("ocTpl!index.action","_self");
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
		$(tableId+" tbody").html("");
		$.each(detaillist,function(index,value){
			if(value.workshop.indexOf(workshop)>=0){
				cworkshopId=value.workshopId;
				var partsNo=value.partsNo==null?'':value.partsNo;
				var vendor=value.vendor==null?'':value.vendor;
				var tr = $("<tr id='tr_"+index+"'/>");
				$("<td id='td0_"+index+"'/>").attr("recordId",index)
				.html(value.sequence).appendTo(tr);
				$("<td />").attr("recordId",index)
				.attr("partsId",value.partsId)
				.html("<input style='border:0;width:100%'class='parts' value='"+(value.parts==undefined?"":value.parts)+"' id='parts_"+index+"'>").appendTo(tr);
				
				$("<td />")
				.attr("recordId",index)
				.attr("partsNo",value.partsNo)
				.html("<input style='border:0;width:100%'class='partsNo' value='"+partsNo+"' id='partsNo_"+index+"'>")
				.appendTo(tr);
				$("<td />").attr("recordId",index)
				.html("<input style='border:0;width:100%' class='vendor' value='"+vendor+"' id='vendor_"+index+"'>").appendTo(tr);
				$("<td />").html("<i name='edit' class=\"fa fa-arrow-up\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+
						"<i name='edit' class=\"fa fa-arrow-down\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"
						/*"<i name='edit' class=\"fa fa-plus\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+*/
						/*"<i name='edit' class=\"fa fa-times\" style=\"cursor: pointer\"></i>&nbsp;&nbsp;"+
						"<i name='edit' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>"*/)
				.appendTo(tr);
				tr.appendTo(tableId+" tbody");
			}
				
		});
	}
	function getDetail() {
		$.ajax({
			type : "get",// 使用get方法访问后台
			dataType : "json",// 返回json格式的数据
			url : "ocTpl!getTplDetail.action",
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
	function emptyEditModal(){
		$("#edit_select").val("");
		$("#edit_input").val("");
		$("#editModal").modal("hide");
	}