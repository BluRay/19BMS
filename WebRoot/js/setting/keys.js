var pageSize =10;
var keyValue =1;
var editKeyValue = 0;
$(document).ready(
		function() {
			// alert("工厂维护");
			initPage();
			$("#btnQuery").live("click", function() {
				ajaxQuery(1);
			});
			// 点击新增
			$("#btnAdd").click(function(argument) {
				var paramHtml="<tr><td><button type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
				"<td><input type='text' style='width:180px' class='input-small keyName' id='keyName'/></td>" +
				"<td><input type='text' style='width:50px' class='input-small' disabled='disabled' value='0'  id='value'/></td>" +
				"</tr>";
				$(paramHtml).appendTo("#keyName_parameters");
				$("#newModal").modal("show");
				$("#new_key_type").focus();
			});
			$("#addKeyName").click( function (argument) {
				var paramHtml="<tr><td><button type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
				"<td><input type='text' style='width:180px' class='input-small keyName' id='keyName'/></td>" +
				"<td><input type='text' style='width:50px' class='input-small' disabled='disabled' value='"+keyValue+"'  id='value'/></td>" +
				"</tr>";
				keyValue = keyValue+1;
				$(paramHtml).appendTo("#keyName_parameters");
				return false;
			});
			$("#editKeyName").click( function (argument) {
				editKeyValue = ++editKeyValue;
				var paramHtml="<tr><td><button type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
				"<td><input type='text' style='width:180px' class='input-small keyName' id='keyName'/></td>" +
				"<td><input type='text' style='width:50px' class='input-small' disabled='disabled' value='"+editKeyValue+"'  id='value'/></td>" +
				"<td><select name='' disabled='disabled' width='10px' class='input-small'><option selected='selected' value='0'> 使用</option><option  value='1'> 删除</option></select></td>"+
				"</tr>";
				$(paramHtml).appendTo("#editKeyName_parameters");
				return false;
			});
			// 确定新增
			$("#btnAddConfirm").click(function() {
				if ($("#new_key_type").val() == '') {
					alert('弹性键类型不能为空');
					return false;
				}
				if ($("#new_key_code").val() == '') {
					alert('弹性键代码不能为空');
					return false;
				}
				if ($("#keyName").val() == '') {
					alert('弹性键名称不能为空');
					return false;
				}
				if ($("#value").val() == '') {
					alert('弹性键值不能为空');
					return false;
				}
				ajaxAdd();
				$("#newModal").modal("hide");
				return false;
			});
			// 弹出编辑框
			$("#tableFactory").live(
					"click",
					function(e) {
						//alert($(e.target).html());
						if ($(e.target).attr("name") === "edit") {
							//alert("编辑");
							var siblings = $(e.target).parent("td").siblings();
							$("#edit_factoryCode").val(siblings[1].innerHTML);
							$("#edit_factory").val(siblings[2].innerHTML);
							$("#edit_assembCode").val(siblings[3].innerHTML);
							$("#edit_area").val(
									$(e.target).closest("tr").data("area"));
							$("#edit_memo").val(
									$(e.target).closest("tr").data("memo"));
							$("#editModal").data("id",
									$(e.target).closest("tr").data("id"));
							if ($("#editModal").data(
									"using"
											+ $(e.target).closest("tr").data(
													"id")) == 1) {
								$('#checkboxEditStartUsing').attr("checked",
										"checked");
								// console.log($("#editModal").data("using"+$(e.target).closest("tr").data("id")));
							} else {
								$('#checkboxEditStartUsing').attr("checked",
										false);
							}
							$("#editModal").modal("show");

						}
					});
			// 编辑
			$("#btnEditConfirm").live("click", function() {
				ajaxEditCommit();
			});
			$("#btnClose").live("click", function() {
				emptyNewModal();
			});
		})
// 查询factory列表
function ajaxQuery(targetPage) {
	$.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : "keys!showKeysList.action",
		data : {
			"input_keyType" : $('#input_keyType').val(),
			"input_keyCode" : $('#input_keyCode').val(),
			"pager.pageSize" : pageSize,
			"pager.curPage" : targetPage || 1
		},
		success : function(response) {
			$("#tableKeys tbody").html("");
			var _columns = [
			    			{name:'keyType',idMerge:true},
			    			{name:'keyCode',idMerge:true},
			    			{name:'keyName'},
			    			{name:'value'},
			    			{name:'deleteFlag'},
			    			{name:'editor'},
			    			{name:'editDate'},
			    			];
			    			var list = response.keysList;
			    			_table = document.getElementById("tableKeys");
			    			_table.border = "0px";
			    			
			    			var currMergeTds = [];
			        		for(var i = 0; i < list.length; i++){
			        			var row = document.createElement("tr");
			        			for(var colIdx = 0; colIdx < _columns.length; colIdx++){
			        				var col = _columns[colIdx];
			        				if(col['hidGrid']){
			        					continue;
			        				}
			        				if(col['idMerge']){
			        					if(i > 0 && list[i][col['name']] === currMergeTds[colIdx]['value']){
			        						currMergeTds[colIdx]['cell'].setAttribute('rowspan', ++currMergeTds[colIdx]['cell_count']);
			        					}else{
			        						var cell = document.createElement("TD");
			        						cell.style.paddingTop = "2px";
			        						cell.setAttribute('rowspan',1);
			        						cell.innerHTML = list[i][col['name']];
			        						var mergeTd = {};
			        						mergeTd['value'] = list[i][col['name']];
			        						mergeTd['cell'] = cell;
			        						mergeTd['cell_count'] = 1;
			        						currMergeTds[colIdx] = mergeTd;
			        						row.appendChild(cell);
			        					}
			        				}else{
			        					var cell = document.createElement("TD");
			        					cell.style.paddingTop = "2px";
		        						if(col['name'] == 'deleteFlag'){
		        							if(list[i]["deleteFlag"] ==1){
		        								cell.innerHTML = '删除';
		        							}else{
		        								cell.innerHTML = '使用';
		        							}
		        								
		        						}else{
		        							cell.innerHTML = list[i][col['name']];
		        						}
			        					row.appendChild(cell);
			        				}
			        			}
			        			var cell = document.createElement("TD");
			        			cell.style.paddingTop = "2px";
			        			var keyCode = list[i]['keyCode'];
			    				cell.innerHTML = '<button onclick = "ajaxEdit(\'' +keyCode+ '\');" class="btn-link">编辑</>';
			    				row.appendChild(cell);
			        			$("#tableKeys tbody").append(row);
			        		}
		/*	$.each(response.keysList, function(index, value) {
				// alert(value.id);
				var tr = $("<tr />");
				$("<td />").html("<input type=\"checkbox\">").appendTo(tr);
				$("<td />").html(value.keyType).appendTo(tr);
				$("<td />").html(value.keyCode).appendTo(tr);
				$("<td />").html(value.keyName).appendTo(tr);
				$("<td />").html(value.value).appendTo(tr);
				if(value.deleteFlag !=0){
					$("<td />").html('Y').appendTo(tr);
					}else{
						$("<td />").html('&nbsp;').appendTo(tr);
					}
				$("<td />").html(value.editor).appendTo(tr);
				$("<td />").html(value.editDate).appendTo(tr);
				/*var editTd = $("<td />").html("");
				$("<button />").addClass("btn-link").html("编辑").prependTo(
						editTd);
				var editTd = $("<td />").html("<i name='edit' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>");
				// $("<button
				// />").addClass("btn-link").html("删除").appendTo(editTd);
				editTd.appendTo(tr);
				tr.data("id", value.id);
				tr.data("area", value.area);
				tr.data("memo", value.memo);
				$("#tableKeys tbody").append(tr);
			}); */
			$("#tableKeys").show();
			$("#total").html(response.pager.totalCount);
			$("#total").attr("total", response.pager.totalCount);
			$("#cur").attr("page", response.pager.curPage);
			$("#cur").html("<a href=\"#\">" + response.pager.curPage + "</a>");
			$("#pagination").show();
			$("#checkall").attr("checked",false);
		}
	});
}
function initPage() {
	// getFactorySelect();
	$("#input_keyType").addClass("active");
}

// 新增ajax方法
function ajaxAdd() {
	var keyName_parameters=$("#keyName_parameters").find("tr");
	var keyNameValue = "";
	$.each(keyName_parameters,function(index,param){
		var tds=$(param).children("td");
		keyNameValue += $(tds[1]).find("input").val() + ":" + $(tds[2]).find("input").val() + ",";
	});
	$.ajax({
		type : "get",
		dataType : "json",
		url : "keys!addKey.action",
		data : {
			"new_key_type" : $("#new_key_type").val(),
			"new_key_code" : $("#new_key_code").val(),
			"keyNameValue" : keyNameValue
		},
		success : function(response) {
			ajaxQuery(1);
			emptyNewModal();
		},
		error : function() {
			alertError();
		}
	})
}
// 函数：编辑操作

function ajaxEditCommit() {
	var editKeyName_parameters = $("#editKeyName_parameters").find("tr");
	var editkeys = "";
	var addKeys = "";
	$.each(editKeyName_parameters,function(index,param){
		var tds=$(editKeyName_parameters[index]).children("td");
		
		if($(tds[4]).find("input").val() ===undefined && $(tds[1]).find("input").val()!=''){
			addKeys += $(tds[1]).find("input").val()+ ":" +$(tds[2]).find("input").val()+ ",";
		}else if($(tds[4]).find("input").val() !=undefined){
			editkeys += $(tds[4]).find("input").val()+ ":" +$(tds[3]).find("select").val()+ ",";
		}
	});
	
	$.ajax({
		type : "get",
		dataType : "json",
		url : "keys!updateKey.action",
		data : {
			"edit_key_type" : $("#edit_key_type").val(),
			"edit_key_code" : $("#edit_key_code").val(),
			"editkeys" : editkeys,
			"addKeys" : addKeys
		},
		success : function(response) {
			ajaxQuery($(".curPage").attr("page"));
			emptyEditModel();
		},
		error : function() {
			alertError();
		}
	}) 
}

function emptyNewModal() {
	$("#new_key_type").val("");
	$("#new_key_code").val("");
	var paramHtml="<tr><td><button type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
	"<td><input type='text' style='width:180px' class='input-small keyName' id='keyName'/></td>" +
	"<td><input type='text' style='width:50px' class='input-small' disabled='disabled' value='0'  id='value'/></td>" +
	"</tr>";
	$("#keyName_parameters").html('');
	keyValue =1;
	$("#newModal").modal("hide");
}
function emptyEditModel(){
	$("#new_key_type").val("");
	$("#new_key_code").val("");
	var paramHtml="<tr><td><button type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
	"<td><input type='text' style='width:180px' class='input-small keyName' id='keyName'/></td>" +
	"<td><input type='text' style='width:50px' class='input-small' disabled='disabled' value='0'  id='value'/></td>" +
	"</tr>";
	$("#keyName_parameters").html('');
	keyValue =1;
	$("#editModal").modal("hide");
}
$(".close").live("click",function(e){
	if($(e.target).parent().parent().parent().parent().find("tr").length > 1){
		var td = $(e.target).parent().parent().parent().children("td");
		var index = $(td[2]).find("input").val();
		if($(td[4]).find("input").val() ===undefined){
			var keyName_parameters=$("#keyName_parameters").find("tr");
			var editKeyName_parameters = $("#editKeyName_parameters").find("tr");
			for(index;index<=keyName_parameters.length;index++){
				var tds=$(keyName_parameters[index]).children("td");
				$(tds[2]).find("input").val($(tds[2]).find("input").val()-1);
			}
			--keyValue;
			for(index;index<=editKeyName_parameters.length;index++){
				var tds=$(editKeyName_parameters[index]).children("td");
				$(tds[2]).find("input").val($(tds[2]).find("input").val()-1);
			}
			--editKeyValue;
			$(e.target).closest("tr").remove();	
		}else{
			alert("已保存的弹性键不能直接删除，请设置其状态为删除！");
		}
		//editKeyName_parameters

	}

});

$(".keyName").live("keyup",function(e){
	//更新流水号
/*	var maxOrderNo = 1;
	
	var keyName_parameters=$("#keyName_parameters").find("tr");
	$.each(keyName_parameters,function(index,param){
		var tds=$(param).children("td");
		//$(tds[1]).find("select");
		//alert($(tds[2]).find("input").val());
		//maxOrderNo = $(tds[2]).find("input").val();
		$(tds[3]).find("input").val(maxOrderNo);
		$(tds[4]).find("input").val(Number(maxOrderNo) + Number($(tds[2]).find("input").val()) - 1);
		maxOrderNo = Number(maxOrderNo) + Number($(tds[2]).find("input").val());
	}); */
	//alert(maxOrderNo);
});
function ajaxEdit(keyCode){
	//查询订单信息
	$.ajax({
		url: "keys!getKey.action",
		dataType: "json",
		data: {"keyCode" : keyCode},
		async: false,
		error: function () {alertError();},
		success: function (response) {
				$("#editKeyName_parameters").html("");
				$.each(response.keysList,function(index,value){
					if(index == 0){
						//填充订单基本信息
						$("#edit_key_type").val(value.keyType);
						$("#edit_key_code").val(value.keyCode);
					}
					var deleteSelect = "";
					//填充弹性键名称-值信息
					if(value.deleteFlag ==1){
						deleteSelect = "<td><select name='' width='10px' class='input-small'><option value='0'> 使用</option><option selected='selected' value='1'> 删除</option></select></td>";
					}else{
						deleteSelect = "<td><select name='' width='10px' class='input-small'><option selected='selected' value='0'> 使用</option><option  value='1'> 删除</option></select></td>";
					}
					var paramHtml="<tr><td><button type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
					//"<td>" + select_str + "</td>" +
					"<td><input type='text' style='width:180px' disabled='disabled' class='input-small keyName' value='"+value.keyName+"' /></td>" +
					"<td><input type='text' style='width:50px' disabled='disabled' class='input-small' value='"+value.value+"' /></td>" +
					deleteSelect+
					"<td><input type='hidden' disabled='disabled' style='width:5px' class='input-small' value='"+value.id+"' /></td>" +
					"</tr>";
					$(paramHtml).appendTo("#editKeyName_parameters");
					editKeyValue = value.value;
				})
				$("#editModal").modal("show"); 
		}
	})
}

