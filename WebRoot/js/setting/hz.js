var pageSize = 10;
$(document).ready(function() {
	initPage();
	//查询
	$("#btnQuery").click(function() {
		ajaxQuery(1);
	});
	//点击新增按钮，弹出新增窗口
	$("#btnAdd").click(function() {
		getKeysSelect("HZ_TYPE", "", "#new_hz_type_id");
		getFactorySelect("#new_factory", "","empty");
		var mydate = new Date().format("yyyy-MM-dd");
		$("#new_effecDateStart").val(mydate);
		$("#new_effecDateEnd").val('2099-12-31');
		$("#newModal").modal("show");
	});
	$("#btnAddConfirm").click(function(){
		
		if ($("#new_factory").val() == '') {
			alert('工厂不能为空');
			return false;
		}
		if ($("#new_workshop").val() == '') {
			$("#new_workshop").val(0);
//			return false;
		}
		if ($("#new_type_name").val() == '') {
			alert('参数名称不能为空');
			return false;
		}
		if ($("#new_value").val() == '') {
			alert('值不能为空');
			return false;
		}
		if ($("#new_unit").val() == '') {
			alert('单位不能为空');
			return false;
		}
		ajaxAdd();
		$("#newModal").modal("hide");
		return false;
	});
	//切换工厂，获取车间下拉列表
	$("#input_factory,#new_factory,#edit_factory").live("change", function(e) {		
		if($(e.target).attr("id")=='input_factory'){
			getWorkshopSelect("#input_workshop", "", $("#input_factory").val(),"");
		}if($(e.target).attr("id")=='new_factory'){
			getWorkshopSelect("#new_workshop", "", $("#new_factory").val(),"empty");
		}else{
			getWorkshopSelect("#edit_workshop", "", $("#edit_factory").val(),"empty");
		}
				
	});
	//弹出编辑窗口
	$(".fa-pencil").live("click", function(e) {
		var tr=$(e.target).parent("td").parent(tr);
		getKeysSelect("HZ_TYPE", $(tr).data("hz_type_id"), "#edit_hz_type_id");
		getFactorySelect("#edit_factory", $(tr).data("factory_id"),"empty");
		var workshop_id = $(tr).data("workshop_id");
		if(workshop_id!='' && workshop_id !=0){
			getWorkshopSelect("#edit_workshop", $(tr).data("workshop_id"), $(tr).data("factory_id"),"empty");
		}else{
			getWorkshopSelect("#edit_workshop", '', $(tr).data("factory_id"),"empty");
		}
		$("#edit_id").val($(tr).data("id"))
		if($(tr).data("status")=='0'){
			$("#edit_status").attr("checked",false);
			$("#edit_status").val("0");
		}else{
			$("#edit_status").attr("checked",true);
			$("#edit_status").val("1");
		}
		$("#edit_value").val($(tr).data("value"));
		$("#edit_unit").val($(tr).data("unit"));
		$("#edit_effecDateStart").val($(tr).data("effecDateStart"));
		$("#edit_effecDateEnd").val($(tr).data("effecDateEnd"));
		$("#editModal").modal("show");
	});
	//编辑保存
	$("#btnEditConfirm").click(function(){
		if ($("#edit_factory").val() == '') {
			alert('工厂不能为空');
			return false;
		}
		if ($("#edit_workshop").val() == '') {
			$("#edit_workshop").val(0);
//			return false;
		}
		if ($("#edit_type_name").val() == '') {
			alert('参数名称不能为空');
			return false;
		}
		if ($("#edit_value").val() == '') {
			alert('值不能为空');
			return false;
		}
		if ($("#edit_unit").val() == '') {
			alert('单位不能为空');
			return false;
		}
		if ($("#edit_effecDateStart").val() == '') {
			alert('有效开始日期不能为空');
			return false;
		}
		if ($("#edit_effecDateEnd").val() == '') {
			alert('有效结束日期不能为空');
			return false;
		}
		$("#editRecordForm").ajaxSubmit({
			url:"hz!updateHZ.action",
			type: "post",
			dataType:"json",
			data : {
				"id" : parseInt($("#edit_id").val()),
				"factory_id" : $("#edit_factory").val(),
				"workshop_id" : $("#edit_workshop").val()==''?0:$("#new_workshop").val(),
				"hz_type_id" : $("#edit_hz_type_id").val(),
				"value" : $("#edit_value").val(),
				"unit" : $("#edit_unit").val(),
				"effecDateStart" : $("#edit_effecDateStart").val(),
				"effecDateEnd" : $("#edit_effecDateEnd").val(),
				"status" : $("#edit_status").val()
			},
			success:function(response){
				alert(response.message);
				if(response.success){
					$("#editModal").modal("hide");
					ajaxQuery($(".curPage").attr("page"));
				}							
			}			
		});
	});
});
function initPage() {
	getKeysSelect_Q("QUALITY_TARGET_PARAM", "", "#input_targetType");
	getFactorySelect("#input_factory", "","");
	getKeysSelect_Q("HZ_TYPE", "", "#input_hz_type_id");
}
function changeStatus(){
	if($("#edit_status").is(":checked")){
		//alert("1");
		$("#edit_status").val("1");
	}else{
		$("#edit_status").val("0");
		//alert("0");
	}
}

function ajaxQuery(targetPage) {
	var factory_id=isNaN(parseInt($("#input_factory").val()))?0:parseInt($("#input_factory").val());
	var workshop_id=isNaN(parseInt($("#input_workshop").val()))?0:parseInt($("#input_workshop").val());
	var hz_type_id=isNaN(parseInt($("#input_hz_type_id").val()))?0:parseInt($("#input_hz_type_id").val());
	var conditions="{factory_id:"+factory_id+",workshop_id:"+workshop_id+",hz_type_id:"+hz_type_id+
		",effecDateStart:'"+$("#input_effec_start").val()+"',effecDateEnd:'"+$("#input_effec_end").val()+"'}";
	$.ajax({
				type : "get",// 使用get方法访问后台
				dataType : "json",// 返回json格式的数据
				url : "hz!getParamRecordList.action",
				data : {
					"conditions":conditions,
					"pager.pageSize" : pageSize,
					"pager.curPage" : targetPage || 1
				},
				success : function(response) {
					$("#tableResult tbody").html("");
					$.each(response.dataList,function(index, value) {
										// alert(value.id);
										var tr = $("<tr />");
										$("<td />").html(value.factory).appendTo(tr);
										$("<td />").html(value.workshop).appendTo(tr);
										$("<td />").html(value.typeName).appendTo(tr);
										$("<td />").html(value.value).appendTo(tr);
										if(value.unit ==0){
											$("<td />").html('小时').appendTo(tr);
										}else if(value.unit ==1){
												$("<td />").html('分钟').appendTo(tr);
										}
										else if(value.unit ==2){
											$("<td />").html('秒').appendTo(tr);
										}else{
											$("<td />").html('元（RMB）').appendTo(tr);
										}
										$("<td />").html(value.effecDateStart).appendTo(tr);
										$("<td />").html(value.effecDateEnd).appendTo(tr);
										$("<td />").html(value.editor).appendTo(tr);
										$("<td />").html(value.edit_date).appendTo(tr);
										var editTd = $("<td />").html(
														"<i name='edit' class=\"fa fa-pencil\" style=\"cursor: pointer\"></i>");
										editTd.appendTo(tr);
										tr.data("id", value.id);
										tr.data("factory_id", value.factory_id);
										tr.data("workshop_id", value.workshop_id);
										tr.data("hz_type_id", value.hz_type_id);
										tr.data("value", value.value);
										tr.data("unit", value.unit);
										tr.data("effecDateStart", value.effecDateStart);
										tr.data("effecDateEnd", value.effecDateEnd);
										tr.data("status", value.status);
										$("#tableResult tbody").append(tr);
									});
					$("#tableResult").show();
					$("#total").html(response.pager.totalCount);
					$("#total").attr("total", response.pager.totalCount);
					$("#cur").attr("page", response.pager.curPage);
					$("#cur").html(
							"<a href=\"#\">" + response.pager.curPage + "</a>");
					$("#pagination").show();
				}
			})
}
//新增工序 ajax方法
function ajaxAdd() {
	$.ajax({
		type : "get",
		dataType : "json",
		url : "hz!addHZ.action",
		data : {
			"factory_id" : $("#new_factory").val(),
			"workshop_id" : $("#new_workshop").val()==''?0:$("#new_workshop").val(),
			"hz_type_id" : $("#new_hz_type_id").val(),
			"value" : $("#new_value").val(),
			"unit" : $("#new_unit").val(),
			"effecDateStart" : $("#new_effecDateStart").val(),
			"effecDateEnd" : $("#new_effecDateEnd").val()
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

Date.prototype.format = function(format){ 
	var o = { 
	"M+" : this.getMonth()+1, //month 
	"d+" : this.getDate(), //day 
	"h+" : this.getHours(), //hour 
	"m+" : this.getMinutes(), //minute 
	"s+" : this.getSeconds(), //second 
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
	"S" : this.getMilliseconds() //millisecond 
	} 

	if(/(y+)/.test(format)) { 
	format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
	if(new RegExp("("+ k +")").test(format)) { 
	format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
	} 
	} 
	return format; 
}