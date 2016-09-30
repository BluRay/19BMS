var initflag=0;
var saveFlag = false;

var zNodes=[];
var zTreeObj=null;
// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var setting = {
	data: {
		simpleData: {   // 简单的数据源，一般开发中都是从数据库里读取，API有介绍，这里只是本地的
		    enable: true,  
		    idKey: "id",  // id和pid，这里不用多说了吧，树的目录级别
		    pIdKey: "pId",  
		    rootPId: 0   // 根节点
		}
	},
	view: {
		fontCss : {
		}
	},
	callback: {
		beforeClick: zTreeBeforeClick,
		onClick: zTreeOnClick
	}
};

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
	if(saveFlag){
		//数据有变动提示用户保存
	    if (confirm("是否保存当前信息？")) {
	    	saveData();
	    	saveFlag = false;
	    	return false;
	    }
	}
	saveFlag = false;
	
    if(treeNode.level >1){
    	return false;
    }
    ajaxQuery(treeNode.id);
}

function zTreeOnClick(event, treeId, treeNode) {
	var str = '标准班组';
	var strArr = [];
	strArr.push(treeNode.name);
	var parentNode = treeNode.getParentNode();
	while (parentNode!=null){
		strArr.push(parentNode.name);
		parentNode = parentNode.getParentNode();
	}
	strArr.reverse();
	for(var i=0;i<strArr.length;i++){
		str += '->'+strArr[i];
	}
	$("#workgroupTitle").html(str);
    //alert(treeNode.id + ", "+ treeNode.id + "，" + treeNode.name);
};

$(document).ready(function () {
	initPage();
	function initPage(){
		/*$('#dt').dataTable({
			"language": {
			    "sProcessing":   "处理中...",
			    "sLengthMenu":   "显示 _MENU_ 项结果",
			    "sZeroRecords":  "没有匹配结果",
			    "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
			    "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
			    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
			    "sInfoPostFix":  "",
			    "sSearch":       "搜索:",
			    "sUrl":          "",
			    "sEmptyTable":     "表中数据为空",
			    "sLoadingRecords": "载入中...",
			    "sInfoThousands":  ",",
			    "oPaginate": {
			        "sFirst":    "首页",
			        "sPrevious": "上页",
			        "sNext":     "下页",
			        "sLast":     "末页"
			    },
			    "oAria": {
			        "sSortAscending":  ": 以升序排列此列",
			        "sSortDescending": ": 以降序排列此列"
			    }
			}
        });*/
		$("#hrPlan").find(".treemenu").addClass("collapsed");
		$("#hr_plan").addClass("in");
		ajaxTree();
		ajaxQuery();
	}
	
	// 手工增加
	$("#addWorkgroup").click( function (argument) {
		var tr = $("<tr />");
		var deleteTd = $("<td />").html('<button type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button>');
		deleteTd.appendTo(tr);
		var workgroupNoTd = $("<td />").html("<input type='text' style='width:100%' class='input-small workgroupNo' />");
		workgroupNoTd.appendTo(tr);	
		var workgroupNameTd = $("<td />").html("<input type='text' style='width:100%' class='input-small workgroupName' />");
		workgroupNameTd.appendTo(tr);	
		var responsibilityTd = $("<td />").html("<input type='text' style='width:100%' class='input-small' />");
		responsibilityTd.appendTo(tr);	
		var memoTd = $("<td />").html("<input type='text' style='width:100%' class='input-small' />");
		memoTd.appendTo(tr);	
		tr.data("valueChanged", '1');
		$("#workgroupTable tbody").append(tr);
		
	});
	
	/**
	 * 输入框数据改变后记录标示
	 */
	$(".workgroupNo").live("change",function(e){
		var reg=/(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,7}/;  
		if(!reg.test($(e.target).val().trim())){
			alert('请输入类似ZZ01或者ZZ01-01格式数据！');
			$(e.target).val("");
			return;
		}
		var tr = $(e.target).closest("tr");
		//alert($(e.target).attr("oldValue"));
		if(!($(e.target).val().trim() === $(e.target).attr("oldValue"))){
			tr.data("valueChanged", '1');
			saveFlag = true;
		}
	});
	
	$(".workgroupName").live("change",function(e){
/*		var reg=/^[0-9\u2E80-\uFE4F]+$/;  
		if(!reg.test($(e.target).val().trim())){
			alert('只能输入汉字或数字！');
			$(e.target).val("");
			return;
		}*/
		var tr = $(e.target).closest("tr");
		//alert($(e.target).attr("oldValue"));
		if(!($(e.target).val().trim() === $(e.target).attr("oldValue"))){
			tr.data("valueChanged", '1');
			saveFlag = true;
		}
	});
	
	$(".process").live("change",function(e){
		var tr = $(e.target).closest("tr");
		//alert($(e.target).attr("oldValue"));
		if(!($(e.target).val().trim() === $(e.target).attr("oldValue"))){
			tr.data("valueChanged", '1');
			saveFlag = true;
		}
	});
	
	/**
	 * 删除行数据
	 */
	$(".close").live("click",function(e){
		var tr = $(e.target).closest("tr");
		var workgroupId = tr.data("id")+'';
		if( workgroupId != 'undefined' && workgroupId !=null && workgroupId.trim().length >0){
		    if (!confirm("确认要删除已维护的标准班组吗？")) {
		    	window.event.returnValue = false;
		    }else{
				//删除已维护的标准班组
				deleteWorkGroup(tr,tr.data("id"));
		    }
		}else{
			tr.remove();
		}
	});
	//保存
	$("#btnSave").live("click",function(e){
		saveData();
	});
	
});

function ajaxTree(){
	zNodes=[];
	zTreeObj=null;
	$.ajax({
	    url: "standardWorkGroup!getWorkGroupTree.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    },
	    success:function(response){
	    	if(response.success) {
	    		//zNodes.push({id:0,pId:null,name:'标准班组'});
                $.each(response.data, function (index, workgroup) {
                    zNodes.push(
                    	{id:workgroup.id,pId:workgroup.parentId,name:workgroup.display_name,wgType:workgroup.type,workshop_id:workgroup.workshop_id,workgroup_name:workgroup.workgroup_name}
                    );
                });
                zTreeObj = $.fn.zTree.init($("#workGroupTree"), setting, zNodes);
                var nodes = zTreeObj.getNodes();
                if (nodes.length>0) {
                	zTreeObj.selectNode(nodes[0]);
                }
                
                zTreeObj.expandNode(nodes[0], true, false, true);
                
               // zTreeObj.expandAll(true);
                ajaxQuery(nodes[0].id);
            } 
	    }
	});
}

function ajaxQuery(id){
	if(id==null || id == '0'){
		return;
	}
	$.ajax({
		url: "standardWorkGroup!getWorkGroupList.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	 pId:id,
	    },
	    success:function(response){
	    	if(response.success) {
	    		$("#workgroupTable tbody").html("");
                $.each(response.data, function (index, workgroup) {
    				var tr = $("<tr />");
    				var deleteTd = $("<td />").html('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>');
    				deleteTd.appendTo(tr);
    				var workgroupNoTd = $("<td />").html('<input style="border:0;width:100%" class="process workgroupNo" oldValue="'+(workgroup.workgroup_no==undefined?"":workgroup.workgroup_no)+'" value="'+(workgroup.workgroup_no==undefined?"":workgroup.workgroup_no)+'" >');
    				workgroupNoTd.appendTo(tr);	
    				var workgroupNameTd = $("<td />").html('<input style="border:0;width:100%" class="process workgroupName" oldValue="'+(workgroup.workgroup_name==undefined?"":workgroup.workgroup_name)+'" value="'+(workgroup.workgroup_name==undefined?"":workgroup.workgroup_name)+'" >');
    				workgroupNameTd.appendTo(tr);	
    				var responsibilityTd = $("<td />").html('<input style="border:0;width:100%" class="process" oldValue="'+(workgroup.responsibility==undefined?"":workgroup.responsibility)+'" value="'+(workgroup.responsibility==undefined?"":workgroup.responsibility)+'" >');
    				responsibilityTd.appendTo(tr);	
    				var memoTd = $("<td />").html("<input style='border:0;width:100%' class='process' oldValue='"+(workgroup.memo==undefined?"":workgroup.memo)+"' value='"+(workgroup.memo==undefined?"":workgroup.memo)+"' >");
    				memoTd.appendTo(tr);	
    				
    				tr.data("id", workgroup.id);
    				tr.data("id", workgroup.id);
    				$("#workgroupTable tbody").append(tr);
                });
            } 
	    }
	});
}
/**
 * 删除已维护的标准班组
 * @param workgroupId
 */
function deleteWorkGroup(tr,workgroupId){
	if(workgroupId==null){
		return;
	}
	$.ajax({
		url: "standardWorkGroup!deleteWorkGroup.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	workgroupId:workgroupId
	    },
	    success:function(response){
	    	if(response.success) {
	    		alert(response.message);
	    		tr.remove();
            }else{
            	alert(response.message);
            }
	    }
	});
}

function saveData(){
	var flag = true;
	var updateDataArr = [];
	var addDataArr = [];
	//数据校验
	var workgroupTable_tbody = $("#workgroupTable tbody").find("tr");
	if(workgroupTable_tbody.length<1){
		flag = false;
		alert("没有修改任何数据，无需保存!");
		return;
	}else{
		var valueChanged = 0;
		var nodes = zTreeObj.getSelectedNodes();
		var selectedNode = nodes[0];
		workgroupTable_tbody.each(function(x){
			var tr = $(this);
			var workgroupNo = $(this).children('td').eq(1).children('input').val().trim();
			var workgroupName = $(this).children('td').eq(2).children('input').val().trim();
			var responsibility = $(this).children('td').eq(3).children('input').val().trim();
			var memo = $(this).children('td').eq(4).children('input').val().trim();
			if(workgroupNo.trim()=='' || workgroupName.trim()==''){
				flag = false;
				alert("第"+(x+1)+"行数据，班组编号和班组名称不能为空!");
			}else{
				var xx = tr.data("valueChanged");
				if(xx != undefined && xx=='1'){
					valueChanged = valueChanged + 1;
					//已改变的数据
					var workgroupId = tr.data("id")+'';
					if( workgroupId != 'undefined' && workgroupId !=null && workgroupId.trim().length >0){
						//已维护的数据
						var workshop_id,parent_id,type,parent_name;
						workshop_id = selectedNode.workshop_id;
						if(selectedNode.level == 0){
							parent_id = selectedNode.id;
							type = '0';
						}else if(selectedNode.level == 1){
							parent_id = selectedNode.id;
							type = '1';
						}
						parent_name = selectedNode.workgroup_name;
						var data={'id':workgroupId,'workshop_id':workshop_id,'parent_id':parent_id,'type':type,'workgroup_no':workgroupNo,'workgroup_name':workgroupName,'responsibility':responsibility,'memo':memo,'parent_name':parent_name};
						updateDataArr.push(data);
					}else{
						//新增数据
						var workshop_id,parent_id,type;
						workshop_id = selectedNode.workshop_id;
						if(selectedNode.level == 0){
							parent_id = selectedNode.id;
							type = '0';
						}else if(selectedNode.level == 1){
							parent_id = selectedNode.id;
							type = '1';
						}
						var data={'workshop_id':workshop_id,'parent_id':parent_id,'type':type,'workgroup_no':workgroupNo,'workgroup_name':workgroupName,'responsibility':responsibility,'memo':memo};
						addDataArr.push(data);
					}
				}
			}
		});
		if(flag==true && valueChanged <=0){
			alert("没有修改任何数据，无需保存!");
			return;
		}
		if(flag){
			updateWorkshop(addDataArr,updateDataArr,selectedNode.id);
		}
	}
}

/**
 * 新增修改标准班组
 * @param addDataArr
 * @param updateDataArr
 */
function updateWorkshop(addDataArr,updateDataArr,treeId){
	$.ajax({
	    url: "standardWorkGroup!updateWorkGroup.action",
	    dataType: "json",
	    async: true,
	    type: "get",
	    data: {
	    	'addDataArr':JSON.stringify(addDataArr),
	    	'updateDataArr':JSON.stringify(updateDataArr)
	    },
	    success:function(response){
	    	saveFlag = false;
	    	if(response.success) {
	    		alert(response.message);
	    		ajaxTree();
	    		var node = zTreeObj.getNodeByParam('id',treeId,null);
	    		zTreeObj.selectNode(node);
	    		ajaxQuery(treeId);
            }else{
            	alert(response.message);
            }
	    }
	});
}

