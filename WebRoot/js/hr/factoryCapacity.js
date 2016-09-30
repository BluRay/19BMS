$(document).ready(function(){
	initPage();
	
	function initPage(){
		getAuthorityFactorySelect("#factory", "", "noall");
		getAuthorityFactorySelect("#newFactory", "", "noall");
		/*getAuthorityFactorySelect("#editFactory", "", "noall");
		$("#workTimeType").val("");
		$("#newWorkTimeType").val("1");
		$("#factory").attr('disabled', 'disabled');
		$("#newFactory").attr('disabled', 'disabled');
		$("#skillParameter").attr('disabled', 'disabled');
		$("#newSkillParameter").attr('disabled', 'disabled');*/
		$("#hr_plan").addClass("in");
	}
	
	$("#btnAdd").click( function (argument) {
		initEditModel();
		$("#newModal").modal("show");		
	});
	
	$("#btnAddConfirm").click( function (argument) {
		ajaxAdd();
		return false;
	});
	
	/*$("#btnEditConfirm").click( function (argument) {
		ajaxSave();
		return false;
	});*/
	
	function ajaxAdd (argument) {
		/*var newWorkTimeType = $("#newWorkTimeType").val();*/
		var newFactory = $("#newFactory :selected").text();
		var newCapacity = $("#newCapacity").val();
		/*var newPrice = $("#newPrice").val();
		var newStartDate = $("#newStartDate").val();
		var newEndDate = $("#newEndDate").val();*/
		
		if(newCapacity == "" || newCapacity == null){
			alert("请输入产能！");
			$("#newCapacity").focus();
			return false;
		}
		
		if(parseInt(newCapacity)==0){
			alert("产能必须大于0！");
			$("#newCapacity").focus();
			return false;
		}
		/*if(newWorkTimeType == "4"){
			if(newSkillParameter == ""){
				alert("请输入技能系数！");
				$("#newSkillParameter").focus();
				return false;
			}
		}*/
		
		$.ajax({
			type: "get",
			dataType: "json",
			url: "orgData!addFactoryCapacityData.action",
		    data: {
				"factory":newFactory,
				"capacity":newCapacity,
				/*"newSkillParameter":newSkillParameter,
				"newPrice":newPrice,
				"newStartDate":newStartDate,
				"newEndDate":newEndDate,*/
			},
			async: false,
		    success:function (response) {
		    	if (response.success) {
		    		$('#newModal').modal('hide');
		    		
		    		ajaxQuery();
		    	} else {
		    		alert(response.message);
		    	}
		    },
		    error:function(){ }
		});
	}
	
	/*function ajaxSave (argument) {
		var editPrice_id = $("#editPriceID").val();
		var editWorkTimeType = $("#editWorkTimeType").val();
		var editFactory = $("#editFactory :selected").text();
		var editSkillParameter = $("#editSkillParameter").val();
		var editPrice = $("#editPrice").val();
		var editStartDate = $("#editStartDate").val();
		var editEndDate = $("#editEndDate").val();
		
		$.ajax({
			type: "get",
			dataType: "json",
			url: "hr!editWorkTimePrice.action",
		    data: {
		    	"editPrice_id":editPrice_id,
				"editWorkTimeType":editWorkTimeType,
				"editFactory":editFactory,
				"editSkillParameter":editSkillParameter,
				"editPrice":editPrice,
				"editStartDate":editStartDate,
				"editEndDate":editEndDate,
			},
			async: false,
		    success:function (response) {
		    	if (response.success) {
		    		$('#editModal').modal('hide');		    		
		    		ajaxQuery();
		    	} else {
		    		alert(response.message);
		    	}
		    },
		    error:function(){alertError();}
		});
	}*/
	
	$("#btnQuery").live("click",function(e){
		/*if(($("#stratDate").val()=="")||($("#endDate").val()=="")){
			alert("请选择开始日期和结束日期！");
			return false;
		}*/
		ajaxQuery();
	});
	
	
	

	
	/*$("#workTimeType").change(function() {
		if(($("#workTimeType").val()=="1")||($("#workTimeType").val()=="0")){
			$("#factory").attr('disabled', 'disabled');
		}else{
			$("#factory").removeAttr('disabled');
		}
		
		if($("#workTimeType").val()=="4"){
			$("#skillParameter").removeAttr('disabled');
		}else{
			$("#skillParameter").attr('disabled', 'disabled');
		}
	});
	$("#editWorkTimeType").change(function() {
		if(($("#editWorkTimeType").val()=="1")||($("#editWorkTimeType").val()=="0")){
			$("#editFactory").attr('disabled', 'disabled');
		}else{
			$("#editFactory").removeAttr('disabled');
		}
		
		if($("#editWorkTimeType").val()=="4"){
			$("#editSkillParameter").removeAttr('disabled');
		}else{
			$("#editSkillParameter").attr('disabled', 'disabled');
		}
	});
	
	$("#newWorkTimeType").change(function() {
		if(($("#newWorkTimeType").val()=="1")||($("#newWorkTimeType").val()=="0")){
			$("#newFactory").attr('disabled', 'disabled');
		}else{
			$("#newFactory").removeAttr('disabled');
		}
		
		if($("#newWorkTimeType").val()=="4"){
			$("#newSkillParameter").removeAttr('disabled');
		}else{
			$("#newSkillParameter").attr('disabled', 'disabled');
		}
	});*/
	
});

function ajaxQuery(targetPage){		
	$.ajax({
		url: "orgData!getFactoryCapacityData.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	/*"workTimeType":$("#workTimeType").val(),*/
	    	"factory":$("#factory :selected").text(),
	    	/*"skillParameter":$("#skillParameter").val(),
	    	"stratDate":$("#stratDate").val(),
	    	"endDate":$("#endDate").val(),
	       	"pager.pageSize":pageSize,
			"pager.curPage":targetPage || 1*/
	    },
	    success:function(response){
	    	if(response.success) {
	    		$("#tableWorkTimePrice tbody").html("");
	    		var count = 1
                $.each(response.data, function (index, value) {
                	/*var workTimeType = "";
                	if(price.type=="0")workTimeType = "节拍";
                	if(price.type=="1")workTimeType = "奖惩";
                	if(price.type=="2")workTimeType = "额外";
                	if(price.type=="3")workTimeType = "技改";
                	if(price.type=="4")workTimeType = "等待";*/
    				var tr = $("<tr />");
    				$("<td style=\"padding-left:0px;padding-right:0px\"/>").html(value.factory).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\"/>").html(value.capacity).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(value.edit_date).appendTo(tr);
    				/*$("<td style=\"padding-left:0px;padding-right:0px\" />").html(price.skill_parameter).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(price.price).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(price.start_date).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(price.end_date).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(price.username).appendTo(tr);
    				$("<td style=\"padding-left:0px;padding-right:0px\" />").html(price.edit_date).appendTo(tr);
    				$("<td style=\"text-align:center;padding:3px\" />").html("<button onclick = 'ajaxEdit(\"" + price.id + "\",\"" + 
    						price.type + "\",\"" + price.factory + "\",\"" + price.skill_parameter + "\",\"" + price.price + "\",\"" + price.start_date + "\",\"" +
    						price.end_date + "\");' class='btn-link'>编辑</> <button onclick = 'ajaxDel(\"" + price.id + "\");' class='btn-link'>删除</>").appendTo(tr);
    				
    				//tr.data("id", staff.id==staff?"":staff.id);
*/    				$("#tableWorkTimePrice tbody").append(tr);
    				count++;
                });
                //$("#staffTable").dataTable();
        		/*$("#total").html(response.pager.totalCount);
        		$("#total").attr("total",response.pager.totalCount);
        		$("#cur").attr("page",response.pager.curPage);
        		$("#cur").html("<a href=\"#\">"+response.pager.curPage+"</a>");
        		$("#pagination").show();*/
            } 
	    }
	});		    				
};

/*function ajaxEdit(price_id,type,factory,skill_parameter,price,start_date,end_date){
	$("#editPriceID").val(price_id);
	$("#editWorkTimeType").val(type);
	$("#editFactory").find("option[text='"+factory+"']").attr("selected",true);
	$("#editSkillParameter").val(skill_parameter);
	$("#editPrice").val(price);
	$("#editStartDate").val(start_date);
	$("#editEndDate").val(end_date);
	
	if($("#editWorkTimeType").val()=="0"){
		$("#editFactory").attr('disabled', 'disabled');
	}else if($("#editWorkTimeType").val()=="1"){
		$("#editFactory").attr('disabled', 'disabled');
	}else{
		$("#editFactory").removeAttr('disabled');
	}
	
	if($("#editWorkTimeType").val()=="4"){
		$("#editSkillParameter").removeAttr('disabled');
	}else{
		$("#editSkillParameter").attr('disabled', 'disabled');
	}
	
	$("#editModal").modal("show");	
}*/

/*function ajaxDel(price_id){
	if(confirm("确认删除吗")){
		$.ajax({
			url: "hr!delWorkTimePrice.action",
		    dataType: "json",
		    async: false,
		    type: "get",
		    data: {
		    	"price_id":price_id,
		    },
		    success:function(response){
		    	if(response.success) {
		    		ajaxQuery();
		    		alert("删除成功！");
		    	}
		    }
		});
	}
}*/

function initEditModel() {
    $('#newFactory').val('');
    $('#newCapacity').val('');
}