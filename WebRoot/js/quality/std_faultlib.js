$(document).ready(function(){
	initPage();
	$("#btnQuery").click(function(){
		ajaxQuery(1);
	});
	$("#btnAdd").live("click",function(){
		getKeysSelect("WORKSHOP","","#new_workshop");
		getKeysSelect("WORKGROUP","","#new_workgroup");
		getPartsSelect("#new_parts");
		$("#newModal").modal("show");
	});
	$("#btnAddConfirm").click(function(){
		var partsId=getPartsId($("#new_parts").val());
/*		if($("#new_parts").val()==''||($("#new_parts").val().trim()).length==0){
			alert("零部件不能为空");
			return false;
		}*/
		if($("#new_bug").val()==''||($("#new_bug").val().trim()).length==0){
			alert("质量缺陷不能为空");
			return false;
		}
		/*if($("#new_workshop").val()==''){
			alert("车间不能为空");
			return false;
		}
		if($("#new_workgroup").val()==''){
			alert("班组不能为空");
			return false;
		}*/
	/*	if(partsId=='0'){
			alert("请选择有效的零部件！");
			return false;
		}*/
		$("#newRecordForm").ajaxSubmit({
			url:"stdFaultlib!addParamRecord.action",
			type: "post",
			data:{
				'faultLib.partsId':partsId,
				'faultLib.bug':$("#new_bug").val(),
				'faultLib.bugType':$("#new_bug_type").val(),
				'faultLib.faultLevel':$("#new_faultlevel").val(),
				'faultLib.faultType':$("#new_faulttype").val(),
				'faultLib.workshop':$("#new_workshop option:selected").text(),
				'faultLib.workgroup':$("#new_workgroup option:selected").text()
			},
			dataType:"json",
			success:function(response){
				alert(response.message);
				if(response.success){
					/*window.open("stdFaultlib!index.action","_self");*/
					emptyNewModal();
					var curpage=$("#cur").attr("page");
					if(!curpage){
						curpage=1;
					}
					ajaxQuery(curpage);
				}						
			}			
		});
	});
	
	$(".fa-pencil").live("click",function(e){
		
		var tds=$(e.target).parent("td").siblings();
		var tr=$(e.target).parent("td").parent("tr");
		$("#edit_parts").attr("parts_id",tr.data('partsId'));
		$("#edit_parts").val($(tds[0]).html());
		$("#edit_bug_type").val($(tds[1]).html());
		$("#edit_bug").val($(tds[2]).html());
		$("#edit_faultlevel").val($(tds[3]).html());
		$("#edit_faulttype").val($(tds[4]).html()=="尺寸"?1:0);
		
		getKeysSelect("WORKSHOP",$(tds[5]).html(),"#edit_workshop");
		getKeysSelect("WORKGROUP",$(tds[6]).html(),"#edit_workgroup");
		getPartsSelect("#edit_parts");
		$("#editModal").data("id",$(tr).data("id"));
		$("#editModal").modal("show");
	});
	
	$("#btnEditConfirm").click(function(){
		var partsId=getPartsId($("#edit_parts").val());
		/*if($("#edit_parts").val()==''||($("#edit_parts").val().trim()).length==0){
			alert("零部件不能为空");
			return false;
		}*/
		if($("#edit_bug").val()==''||($("#edit_bug").val().trim()).length==0){
			alert("质量缺陷不能为空");
			return false;
		}
		/*if($("#edit_workshop").val()==''){
			alert("车间不能为空");
			return false;
		}
		if($("#edit_workgroup").val()==''){
			alert("班组不能为空");
			return false;
		}*/
	/*	if(partsId=='0'){
			alert("请选择有效的零部件！");
			return false;
		}*/
		$("#editRecordForm").ajaxSubmit({
			url:"stdFaultlib!updateParamRecord.action",
			type: "post",
			data:{
				'faultLib.id':$("#editModal").data("id"),
				'faultLib.partsId':partsId,
				'faultLib.bugType':$("#edit_bug_type").val(),
				'faultLib.bug':$("#edit_bug").val(),
				'faultLib.faultLevel':$("#edit_faultlevel").val(),
				'faultLib.faultType':$("#edit_faulttype").val(),
				'faultLib.workshop':$("#edit_workshop option:selected").text(),
				'faultLib.workgroup':$("#edit_workgroup option:selected").text()
			},
			dataType:"json",
			success:function(response){
				alert(response.message);
				if(response.success){
					/*window.open("stdFaultlib!index.action","_self");*/
					var curpage=$("#cur").attr("page");
					if(!curpage){
						curpage=1;
					}
					//alert(curpage);
					$("#editModal").modal("hide");
					ajaxQuery(curpage);
				}						
			}			
		});
	});

});
function initPage(){
	pageSize=20;
	getKeysSelect_Q("WORKSHOP","","#input_workshop");
	getKeysSelect_Q("WORKGROUP","","#input_group");
	getPartsSelect("#input_parts");
}
function ajaxQuery(targetPage){
	//var partsId=getPartsId($("#input_parts").val());
	//var partsId=isNaN(parseInt($("#input_parts").attr("parts_id")))?0:parseInt($("#input_parts").attr("parts_id"));
	var parts=$("#input_parts").val();
	var bug=$("#input_bug").val();
	var bugType=$("#input_bug_type").val();
	var workshop=$("#input_workshop option:selected").text();
	var workgroup=$("#input_group option:selected").text();
	if(workshop=='全部'){
		workshop='';
	}
	if(workgroup=='全部'){
		workgroup='';
	}
	var faultLevel=[];
	var faultType=[];
	$('input[name="faultlevel"]:checked').each(function(){
		faultLevel.push($(this).val());
		});
	$('input[name="faulttype"]:checked').each(function(){
		faultType.push($(this).val());
		});	
	/*faultLevel=JSON.stringify(faultLevel);
	faultType=JSON.stringify(faultType);*/
	var conditions={'parts':parts,'bugType':bugType,'bug':bug,'workshop':workshop,
		'workgroup':workgroup,'faultLevel':faultLevel,'faultType':faultType};
	$
			.ajax({
				type : "get",// 使用get方法访问后台
				dataType : "json",// 返回json格式的数据
				url : "stdFaultlib!getFaultLibList.action",
				data : {
					"conditions":JSON.stringify(conditions),
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
										$("<td />").html(value.parts)
												.appendTo(tr);
										$("<td />").html(value.bugType)
										.appendTo(tr);
										$("<td />").html(value.bug)
												.appendTo(tr);
										$("<td />").html(value.faultLevel)
												.appendTo(tr);
										$("<td />").html(value.faultType=='0'?'非尺寸':'尺寸')
												.appendTo(tr);
										/*$("<td />").html(value.workshop)
												.appendTo(tr);
										$("<td />").html(value.workgroup)
												.appendTo(tr);*/
										$("<td />").html(value.editor)
												.appendTo(tr);
										$("<td />").html(value.editDate)
												.appendTo(tr);
										var editTd = $("<td />")
												.html(
														"<i name='edit' rel=\"tooltip\" title='编辑' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>");
										editTd.appendTo(tr);
										tr.data("id", value.id);
										tr.data("partsId", value.partsId);
										$("#tableResult tbody").append(tr);
									});
					$("#tableResult").show();
					$("#total").html(response.pager.totalCount);
					$("#total").attr("total", response.pager.totalCount);
					$("#cur").attr("page", response.pager.curPage);
					$("#cur").html(
							"<a href=\"#\">" + response.pager.curPage + "</a>");
					$("#pagination").show();
					//$("#input_parts").attr("parts_id","0");
				}
			})
}
function emptyNewModal(){
	$("#new_parts").val("");
	$("#new_bug_type").val("");
	$("#new_bug").val("");
	$("#newModal").modal("hide");
}
