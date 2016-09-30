var initflag=0;
var allParents;
var leaveflag=0;

var total=0;
var high=0;
var middle=0;
var low=0;
var apprentice=0;

function checkAllParents(treeNode){
	if(treeNode==null){
		return;
	}else{
		allParents = treeNode.name + "->" + allParents;
		checkAllParents(treeNode.getParentNode());
	}
}

function zTreeOnClick(event, treeId, treeNode) {
	
};

function zTreeBeforeClick(treeId, treeNode, clickFlag) {
	allParents = '';
    checkAllParents(treeNode);
    $('#allParents').html(allParents.substring(0,allParents.length-2));
    if(treeNode.org_kind==0){
    	$('#countTable').css('display','none');
    }else if(treeNode.org_kind==1){
    	$('#countTable').css('display','');
    }
    $("#humanDetailTable tbody").html('');
    $("#countTable tbody").html('');
    
    //alert(treeNode.org_kind);
    //$('#positionModal').data('org_id',treeNode.id);
    //$("#standardHumanTable tbody").html("");
    ajaxQueryStandardHumanTabs(/*treeNode.id*/allParents.split('->')[0]);
    if(treeNode.org_kind==0){
    	$("#busTypeTab").css('display','none');
    	$("#humanConfigurationDiv").css('width','510px');
    	//$("#standardHumanTable thead th").eq(0).before('<th>部门</th>');
    	var thead = '<tr style="background-color: #f1f6fb;"><th>部门</th><th>科室</th><th>岗位编号</th><th>岗位名称</th><th>岗位类别</th><th>岗位级别</th><th>标准人力</th><th>现有人力</th></tr>';
    	$("#standardHumanTable thead").html('').html(thead);
    }else if(treeNode.org_kind==1){
    	$("#busTypeTab").css('display','');
    	$("#humanConfigurationDiv").css('width','450px');
    	ajaxQueryBusTypeTabs(treeNode.id);
    	var thead = '<tr style="background-color: #f1f6fb;"><th>岗位编号</th><th>岗位名称</th><th>岗位类别</th><th>岗位级别</th><th>标准人力</th><th>现有人力</th></tr>';
    	$("#standardHumanTable thead").html('').html(thead);
    }
    var d = $("#new_tab .active").find('a').eq(0);
    //if(d.find("input").length>0){
    //	ajaxQueryStandardHumans(treeNode.id,d.find("input").eq(0).val().replace(/[^\d]/g,''),$("#busTypeTab .active").find('a').eq(0).attr('bus_id'));
    //}else{
    if(treeNode.org_kind==0){
    	ajaxQueryStandardHumans1(treeNode.id,d.text().replace(/[^\d]/g,''));
    }else if(treeNode.org_kind==1){
    	ajaxQueryStandardHumans(treeNode.id,d.text().replace(/[^\d]/g,''),$("#busTypeTab .active").find('a').eq(0).attr('bus_id'));
    }
    //}
}
/*var zNodes=[];
var zTreeObj;
// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var setting = {
	data: {
		simpleData: {   // 简单的数据源，一般开发中都是从数据库里读取，API有介绍，这里只是本地的
		    enable: true,  
		    idKey: "id",  // id和pid，这里不用多说了吧，树的目录级别
		    pIdKey: "pId",  
		    rootPId: null   // 根节点
		}
	},
	callback: {
		beforeClick: zTreeBeforeClick
	}
};*/

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
		$('.left-sidebar li ul').eq(0).addClass("in");
		$('.treemenu').eq(0).removeClass("collapsed");
		//ajaxQuery();
		getOrgAuthTree($("#treeDemo"));
		allParents = zTreeObj.getSelectedNodes()[0].name+"->";
		$('#allParents').html(zTreeObj.getSelectedNodes()[0].name);
		ajaxQueryStandardHumanTabs(/*zTreeObj.getSelectedNodes()[0].id*/allParents.split('->')[0]);
		if(zTreeObj.getSelectedNodes()[0].org_kind==0){
	    	$("#busTypeTab").css('display','none');
	    	$("#humanConfigurationDiv").css('width','510px');
	    	//$("#standardHumanTable thead th").eq(0).before('<th>部门</th>');
	    	var thead = '<tr style="background-color: #f1f6fb;"><th>部门</th><th>科室</th><th>岗位编号</th><th>岗位名称</th><th>岗位类别</th><th>岗位级别</th><th>标准人力</th><th>现有人力</th></tr>';
	    	$("#standardHumanTable thead").html('').html(thead);
	    }else if(zTreeObj.getSelectedNodes()[0].org_kind==1){
	    	$("#busTypeTab").css('display','');
	    	$("#humanConfigurationDiv").css('width','450px');
	    	ajaxQueryBusTypeTabs(zTreeObj.getSelectedNodes()[0].id);
	    	var thead = '<tr style="background-color: #f1f6fb;"><th>岗位编号</th><th>岗位名称</th><th>岗位类别</th><th>岗位级别</th><th>标准人力</th><th>现有人力</th></tr>';
	    	$("#standardHumanTable thead").html('').html(thead);
	    }
		var d = $("#new_tab .active").find('a').eq(0);
	    //if(d.find("input").length>0){
	    //	ajaxQueryStandardHumans(1,d.find("input").eq(0).val().replace(/[^\d]/g,''),$("#busTypeTab .active").find('a').eq(0).attr('bus_id'));
	    //}else{
		if(zTreeObj.getSelectedNodes()[0].org_kind==0){
	    	ajaxQueryStandardHumans1(zTreeObj.getSelectedNodes()[0].id,d.text().replace(/[^\d]/g,''));
	    }else if(zTreeObj.getSelectedNodes()[0].org_kind==1){
	    	ajaxQueryStandardHumans(zTreeObj.getSelectedNodes()[0].id,d.text().replace(/[^\d]/g,''),$("#busTypeTab .active").find('a').eq(0).attr('bus_id'));
	    }
	    //}
		/*ajaxQueryStandardPosition($('#positionModal').data('org_id'));
    	$('#job_no').val('');
        $('#positionModal').modal('hide');
		getStandardPositionFuzzySelect();*/
	}
	
	
	/*$("#btnAdd").click(function(){ 
		addStandardPosition($('#positionModal').data('org_id'),$('#job_no').attr('av'));
	});*/ 
	
	/*$("#btnStandardPositionSave").click(function(){ 
		$("#positionModal table input[type='checkbox']").each(function(){
		    //alert($(this).val());
			if($(this).is(':checked')){
				//alert($(this).val());
				addStandardPosition($('#positionModal').data('org_id'),$(this).val());		
			}
		});
		$('#positionModal').modal('hide');
	});
	
	// 手工增加
	$("#addParm").click(function() {
	    //$('#positionModal').val(data.context.id);
    	
	    initPositionModal();
        $('#positionModal').modal('show');
	});
	
	$(document).on("click", ".close", function(e) {
        //alert(e.target);
        //$(e.target).closest("tr").remove();
        removeStandardPosition($(e.target).closest("tr").attr('rowid'));
    });
	
	// 全选、反选
	$(document).on("click",".checkall" ,function(e) {
		// alert($(e.target).is(':checked'));
		var modal=($(e.target).attr("id").split("_"))[2];
		// alert(modal);
		if ($(e.target).is(':checked')) {
			// check_All_unAll("#grade_"+modal+"_table", true);
			$("#grade_"+modal+"_table" + " input[type='checkbox']").prop("checked",true);
		} else {
			// check_All_unAll("#grade_"+modal+"_table", false);
			$("#grade_"+modal+"_table" + " input[type='checkbox']").removeAttr("checked");
		}

	});*/
	
	$("input").change(function() {
    	leaveflag=1;
    });
	
	$("#btnImport").click (function () {
		//$("#divImportFromFile").show();
	});
	
	$("#btnExport").click (function () {
		window.open("orgData!exportHumanConfiguration.action?allParents="+allParents+"&org_id="+zTreeObj.getSelectedNodes()[0].id+"&capacity="+$("#new_tab .active").find('a').eq(0).text().replace(/[^\d]/g,'')+"&bus_type_id="+$("#busTypeTab .active").find('a').eq(0).attr('bus_id')+"&bus_type_name="+$("#busTypeTab .active").find('a').eq(0).text()+"&org_kind="+zTreeObj.getSelectedNodes()[0].org_kind);
		return false;
	});
	
	$("#btnSave").click (function () {
		if($("#new_tab .active").find('input').eq(0).length>0){
			alert('产能必须确定！');
			return;
		}
		if(!confirm("确认保存？")){
			return;
		}
		$('#standardHumanTable tbody tr').each(function(index){
			//alert($(this).attr('job_id'));
			if($(this).attr('rowid')==''){
				//alert($(this).attr('job_id'));
				var org_id = zTreeObj.getSelectedNodes()[0].id;
				var job_id = $(this).attr('job_id');
				var capacity = $("#new_tab .active").find('a').eq(0).text().replace(/[^\d]/g,'');
				var standard_humans = $(this).find('input').val();
				var bus_type_id = $("#busTypeTab .active").find('a').eq(0).attr('bus_id');
				var type = zTreeObj.getSelectedNodes()[0].org_kind;
				addStandardHumanData(type,org_id,job_id,capacity,bus_type_id,standard_humans);
			}else{
				editStandardHumanData($(this).attr('rowid'),$(this).find('input').val());
			}
		});
		alert('保存成功！');
		leaveflag=0;
	});
});

//没用到
/*function ajaxQueryGrade(job_grade_id){
	$.ajax({
	    url: "orgData!getPositionData.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	'job_grade_id':job_grade_id,
	    },
	    success:function(response){
	    	if(response.success) {
                $.each(response.data, function (index, value) {
                	var tr=$("<tr />");
    				var checkInput="";
    				// var factory=value.factory==undefined?"":value.factory;
    				
    				// if(value.auth_flag=="authed"){
    				// checkedarr[value.model_flag]+=1;
    				// checkarr[value.model_flag]+=1;
    					// alert(checkedarr[value.model_flag]);
    					checkInput="<label class=\"checkbox\"><input value=\""+
    					value.id+"\" type=\"checkbox\">"+value.job_name+"</label>";
    				// }else{
    					// checkarr[value.model_flag]+=1;
    					// checkInput="<label class=\"checkbox\"><input
						// value=\""+
    					// value.id+"\"
						// type=\"checkbox\">"+value.role_name+"</label>";
    				// }
    				$("<td />").html(checkInput).appendTo(tr);
    				// $("<td />").html("<input type='text' class='input-large'
					// placeholder='输入工厂,多个工厂以逗号隔开!'value='"
    				// +factory+"'>").appendTo(tr);
    				$("#grade_"+job_grade_id+"_table").append(tr);
    				
    				// if(checkedarr[value.model_flag]==checkarr[value.model_flag]){
    					 alert(checkedarr[value.model_flag]+"/"+checkarr[value.model_flag]); 
    				// $("#cbox_"+value.model_flag).attr("checked",true);
    				// }else{
    				// $("#cbox_"+value.model_flag).attr("checked",false);
    				// }
                });
                
                if(response.data.length!=0) $("a[data-parent='#grade_"+job_grade_id+"_table']").append('('+response.data.length+')');
            } 
	    }
	});
}*/

function ajaxQuery(){
	$.ajax({
	    url: "orgData!getOrgData.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	// parentId:"1",
	    },
	    success:function(response){
	    	if(response.success) {
                /*var options = new primitives.orgdiagram.Config(),
                    items = [],
                    colors = ['#428bca', '#f0ad4e', '#5cb85c', '#5bc0de', '#999999'];*/
                $.each(response.data, function (index, dept) {
                    /*items.push(
                        new primitives.orgdiagram.ItemConfig({
                            id: dept.id,
                            parent: dept.parent,
                            title: dept.short_name,
                            short_name: dept.short_name,
                            name: dept.name,
                            display_name: dept.display_name,
                            itemTitleColor: colors[dept.level],
                            templateName: dept.templateName,
                            manager_name: dept.manager_name,
                        })
                    );*/
                    zNodes.push(
                    	{id:dept.id,pId:dept.parent,name:dept.display_name,org_kind:dept.org_kind}
                    );
                });

                /*options.hasSelectorCheckbox = primitives.common.Enabled.False;
                options.leavesPlacementType = primitives.common.ChildrenPlacementType.Vertical;
                options.hasButtons = primitives.common.Enabled.False;

                options.templates = [getorgStructureTpl()];
                options.onItemRender = onTemplateRender;
                options.onMouseClick = onMouseClick;
                options.defaultTemplateName = "orgStructureTpl";

                options.items = items;
                options.cursorItem = 0;
                $("#orgDiagram").orgDiagram(options);
                $("#orgDiagram").orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);*/
                
                zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                var node = zTreeObj.getNodeByParam("id",1);
                zTreeObj.selectNode(node);
                allParents = node.name+"->";
                $('#allParents').html(allParents.substring(0,allParents.length-2));
                if(node.org_kind==0){
                	$('#countTable').css('display','none');
                }else if(node.org_kind==1){
                	$('#countTable').css('display','');
                }
                $('#positionModal').data('org_id',1);
                zTreeObj.expandNode(node,true,false);
            } 
	    }
	});
}

function ajaxQueryStandardHumanTabs(/*org_id*/factory){
	var returnvalue=true;
	$.ajax({
	    url: /*"orgData!getHumanConfigurationData.action"*/"orgData!getFactoryCapacityData.action",
	    dataType: "json",
	    async: false,
	    type: "get",
	    data: {
	    	/*'org_id' : org_id,
	    	'isTab' : 1*/
	    	factory: factory,
	    },
	    success:function(response){
	    	if(response.success) {
	    		$("#new_tab").html('');
	    		var flag=0;
                $.each(response.data, function (index, value) {
                	if(value.capacity!=null){
                		var paramHtml = "<li><a href=\"#new_capacity1\" data-toggle=\"tab\" style=\"font-size: 14px; color: #333\">"+value.capacity+"台/天</a></li>";
                		$(paramHtml).appendTo("#new_tab");
                		flag++;
                	}
                });
                //tab数据为空
                if(flag==0){
                	returnvalue=false;
                }else{
                	//添加li的click事件
                    $("#new_tab li").click (function () {
                    	if($(this).hasClass("active")){
                    		//
                    	}else{
                    		$("#humanDetailTable tbody").html('');
                    	    $("#countTable tbody").html('');
                    		//alert($(this).text());
                    		/*$(this).parent().find('li').removeClass('active');
                    		$(this).addClass('active');*/
                    		//ajaxQueryStandardHumans(zTreeObj.getSelectedNodes()[0].id,$(this).text().replace(/[^\d]/g,''),$("#busTypeTab .active").find('a').eq(0).attr('bus_id'));
                    		if(zTreeObj.getSelectedNodes()[0].org_kind==0){
                    			ajaxQueryStandardHumans1(zTreeObj.getSelectedNodes()[0].id,$(this).text().replace(/[^\d]/g,''));
                    		}else if(zTreeObj.getSelectedNodes()[0].org_kind==1){
                    			ajaxQueryStandardHumans(zTreeObj.getSelectedNodes()[0].id,$(this).text().replace(/[^\d]/g,''),$("#busTypeTab .active").find('a').eq(0).attr('bus_id'));
                    		}
                    	}
                	});
                }
                $("#new_tab li").eq(0).addClass('active');
            } 
	    }
	});
	return returnvalue;
}

//生产型
function ajaxQueryStandardHumans(org_id,capacity,bus_type_id){
	$.ajax({
	    url: "orgData!getHumanConfigurationData.action",
	    dataType: "json",
	    async: false,
		type: "get",
	    data: {
	    	'org_id' : org_id,
	    	'capacity' : capacity,
	    	'bus_type_id' : bus_type_id,
	    },
	    success:function(response){
	    	if(response.success) {
	    		$("#standardHumanTable tbody").html('');
	    		
                $.each(response.data, function (index, value) {
                	var paramHtml = "<tr rowid='"+(value.id==null?'':value.id)+"' job_id='"+(value.job_id==null?'':value.job_id)+"'>" +
        	        "<td>"+value.job_no+"</td> " +
        	        "<td>"+value.job_name+"</td> " +
        	        "<td>"+value.job_grade_name+"</td> " +
        	        "<td>"+value.job_level+"</td> " +
        	        "<td>"+(value.standard_humans==null?'':value.standard_humans)+"</td> "+
        	        "<td>"+ajaxQueryRealHumans(value.job_name,allParents)+"</td></tr>";
        	        
        	        // $("#parameters").after(paramHtml);
        	        $(paramHtml).appendTo("#standardHumanTable tbody");
                });
                $("input").change(function() {
                	leaveflag=1;
                });
                $("#standardHumanTable tbody tr").click (function (e) {
                	//alert($(this).html());
                	$("#standardHumanTable tbody tr").css('background-color','');
                	$(this).css('background-color','#F5F5F5');
                	ajaxQueryHumanDetail($(this).find('td').eq(1).text(),allParents);
                });
            } 
	    }
	});
}

//管理型
function ajaxQueryStandardHumans1(org_id,capacity){
	$.ajax({
	    url: "orgData!getHumanConfigurationData.action",
	    dataType: "json",
	    async: false,
		type: "get",
	    data: {
	    	'org_id' : org_id,
	    	'capacity' : capacity,
	    },
	    success:function(response){
	    	if(response.success) {
	    		$("#standardHumanTable tbody").html('');
	    		
                $.each(response.data, function (index, value) {
                	var paramHtml = "<tr rowid='"+(value.id==null?'':value.id)+"' job_id='"+(value.job_id==null?'':value.job_id)+"'>" +
                	"<td>"+(allParents.split("->")[0])+"</td> " +
                	"<td>"+(allParents.split("->")[1]==undefined?"":allParents.split("->")[1])+"</td> " +
                	"<td>"+value.job_no+"</td> " +
        	        "<td>"+value.job_name+"</td> " +
        	        "<td>"+value.job_grade_name+"</td> " +
        	        "<td>"+value.job_level+"</td> " +
        	        "<td>"+(value.standard_humans==null?'':value.standard_humans)+"</td> "+
        	        "<td>"+ajaxQueryRealHumans(value.job_name,allParents)+"</td></tr>";
        	        
        	        // $("#parameters").after(paramHtml);
        	        $(paramHtml).appendTo("#standardHumanTable tbody");
                });
                $("input").change(function() {
                	leaveflag=1;
                });
                $("#standardHumanTable tbody tr").click (function (e) {
                	//alert($(this).html());
                	$("#standardHumanTable tbody tr").css('background-color','');
                	$(this).css('background-color','#F5F5F5');
                	ajaxQueryHumanDetail($(this).find('td').eq(3).text(),allParents);
                });
            } 
	    }
	});
}

function ajaxQueryRealHumans(job,allParents){
	var result;
	$.ajax({
	    url: "orgData!getRealHumanData.action",
	    dataType: "json",
	    async: false,
		type: "get",
	    data: {
	    	'job' : job,
	    	'allParents' : allParents,
	    },
	    success:function(response){
	    	if(response.success) {
	    		//$("#standardHumanTable tbody").html('');
	    		
                $.each(response.data, function (index, value) {
                	/*var paramHtml = "<tr rowid='"+(value.id==null?'':value.id)+"' job_id='"+(value.job_id==null?'':value.job_id)+"'>" +
                	"<td>"+value.org_name+"</td> " +
                	"<td>"+''+"</td> " +
                	"<td>"+value.job_no+"</td> " +
        	        "<td>"+value.job_name+"</td> " +
        	        "<td>"+value.job_grade_name+"</td> " +
        	        "<td>"+value.job_level+"</td> " +
        	        "<td>"+(value.standard_humans==null?'':value.standard_humans)+"</td> ";
        	        
        	        // $("#parameters").after(paramHtml);
        	        $(paramHtml).appendTo("#standardHumanTable tbody");*/
                	result = value.realHuman;
                });
                /*$("input").change(function() {
                	leaveflag=1;
                });
                */
            } 
	    }
	});
	return result;
}

//员工明细
function ajaxQueryHumanDetail(job,allParents){
	total=0;
	high=0;
	middle=0;
	low=0;
	apprentice=0;
	$("#countTable tbody").html('');
	
	$.ajax({
	    url: "orgData!getHumanDetailData.action",
	    dataType: "json",
	    async: false,
		type: "get",
	    data: {
	    	'job' : job,
	    	'allParents' : allParents,
	    },
	    success:function(response){
	    	if(response.success) {
	    		$("#humanDetailTable tbody").html('');
	    		
                $.each(response.data, function (index, value) {
                	var paramHtml = "<tr>" +
        	        "<td>"+value.staff_number+"</td> " +
        	        "<td>"+value.name+"</td> " +
        	        "<td>"+(value.skill_parameter==null?'/':value.skill_parameter)+"</td></tr>";
                	var param = parseFloat(value.skill_parameter==null?'0':value.skill_parameter);
                	if(param>=1.4 && param<=1.5){
                		high++;
                	}
                	if(param<=1.3 && param>=1.2){
                		middle++;
                	}
                	if(param<=1.1 && param>=1.0){
                		low++;apprentice
                	}
                	if(param<1.0){
                		apprentice++;
                	}
                	total++;
        	        // $("#parameters").after(paramHtml);
        	        $(paramHtml).appendTo("#humanDetailTable tbody");
                	
                });
                /*$("input").change(function() {
                	leaveflag=1;
                });
                */
            } 
	    }
	});
	var paramHtml1 = "<tr>" +
    "<td>"+total+"</td> " +
    "<td>"+high+"</td> " +
    "<td>"+middle+"</td> " +
    "<td>"+low+"</td> " +
    "<td>"+apprentice+"</td></tr>";
	$(paramHtml1).appendTo("#countTable tbody");
}

function ajaxQueryBusTypeTabs(org_id){
	$.ajax({
	    url: "orgData!getBusTypeData.action",
	    dataType: "json",
	    async: false,
		type: "get",
	    data: {
	    	'org_id' : org_id,
	    	'capacity' : $("#new_tab .active").find('a').eq(0).text().replace(/[^\d]/g,''),
	    },
	    success:function(response){
	    	if(response.success) {
	    		$("#busTypeTab").html('');
	    		//var flag=0;
                $.each(response.data, function (index, value) {
                	//if(value.capacity!=null){
                		var paramHtml = "<li id=\"busType_li\" style=\"float: none;\"><a href=\"javascript:;\" bus_id='"+value.id+"'>"+value.internal_name+"</a></li>";
                		$(paramHtml).appendTo("#busTypeTab");
                		//flag++;
                	//}
                });
                //为li添加click事件
                $('#busTypeTab li').click (function () {
                	$("#humanDetailTable tbody").html('');
                    $("#countTable tbody").html('');
                	
        			$('#busTypeTab li').removeClass('active');
        			$(this).addClass('active');
        			
        			var d = $("#new_tab .active").find('a').eq(0);
                    //if(d.find("input").length>0){
                    //	ajaxQueryStandardHumans(zTreeObj.getSelectedNodes()[0].id,d.find("input").eq(0).val().replace(/[^\d]/g,''),$("#busTypeTab .active").find('a').eq(0).attr('bus_id'));
                    //}else{
                    	//ajaxQueryStandardHumans(zTreeObj.getSelectedNodes()[0].id,d.text().replace(/[^\d]/g,''),$("#busTypeTab .active").find('a').eq(0).attr('bus_id'));
                    	if(zTreeObj.getSelectedNodes()[0].org_kind==0){
                			ajaxQueryStandardHumans1(zTreeObj.getSelectedNodes()[0].id,d.text().replace(/[^\d]/g,''));
                		}else if(zTreeObj.getSelectedNodes()[0].org_kind==1){
                			ajaxQueryStandardHumans(zTreeObj.getSelectedNodes()[0].id,d.text().replace(/[^\d]/g,''),$("#busTypeTab .active").find('a').eq(0).attr('bus_id'));
                		}
                    //}
        		});
                
                $("#busTypeTab li").eq(0).addClass('active');
            } 
	    }
	});
}

/*function onTemplateRender(event, data) {
    switch (data.renderingMode) {
        case primitives.common.RenderingMode.Create:
             Initialize widgets here 
            break;
        case primitives.common.RenderingMode.Update:
             Update widgets here 
            break;
    }

    var itemConfig = data.context;

    if (data.templateName == "orgStructureTpl") {
        data.element.find("[name=titleBackground]")
            .css({
                "background": itemConfig.itemTitleColor
            });
        data.element.attr('title', itemConfig.name);

        var fields = ["title", "display_name", "manager_name"];
        for (var index = 0; index < fields.length; index++) {
            var field = fields[index];

            var element = data.element.find("[name=" + field + "]");
            if (element.text() != itemConfig[field]) {
                element.text(itemConfig[field]);
            }
        }
    }
}

function getorgStructureTpl() {
    var result = new primitives.orgdiagram.TemplateConfig();
    result.name = "orgStructureTpl";

    result.itemSize = new primitives.common.Size(120, 65);
    result.minimizedItemSize = new primitives.common.Size(10, 10);
    result.highlightPadding = new primitives.common.Thickness(3, 3, 2, 2);
    if(1==1) {
        result.cursorPadding = new primitives.common.Thickness(2, 2, 50, 2);
    } else {
        result.cursorPadding = new primitives.common.Thickness(0, 0, 0, 0);
    }

    var itemTemplate = $(
        '<div class="bp-item bp-corner-all bt-item-frame" rel="tooltip">'+
            '<div class="bp-item-wrap">' +
                '<div name="titleBackground" class="bp-item bp-corner-all bp-title-frame">' +
                    '<div class="bp-item bp-title">' +
                        '<span name="title" class="pull-left"></span>'+
                        '<span class="pull-right" name="manager_name"></span>'+
                    '</div>' +
                '</div>' +
                '<div name="display_name" class="bp-item bp-item-dispname"></div>'+
            '</div>' +
        '</div>'
    );

    result.itemTemplate = itemTemplate.wrap('<div>').parent().html();
    if(1==1) {
        var cursorTemplate = $("<div></div>")
        .css({
            position: "absolute",
            overflow: "hidden",
            width: (result.itemSize.width + result.cursorPadding.left + result.cursorPadding.right) + "px",
            height: (result.itemSize.height + result.cursorPadding.top + result.cursorPadding.bottom) + "px"
        });

        var cursorBorder = $("<div></div>")
        .css({
            width: (result.itemSize.width + result.cursorPadding.left + 1) + "px",
            height: (result.itemSize.height + result.cursorPadding.top + 1) + "px"
        }).addClass("bp-item bp-corner-all bp-cursor-frame");
        cursorTemplate.append(cursorBorder);

        var bootStrapVerticalButtonsGroup = $("<div></div>")
        .css({
            position: "absolute",
            overflow: "hidden",
            top: result.cursorPadding.top + "px",
            left: (result.itemSize.width + result.cursorPadding.left + 10) + "px",
            width: "35px",
            height: (result.itemSize.height + 1) + "px"
        }).addClass("btn-group-vertical btn-group-xs");

        
        bootStrapVerticalButtonsGroup.append('<button class="btn btn-default" data-buttonname="edit" type="button"><span class="fa fa-edit fa-lg" style="font-size:14px"></span></button>');
        bootStrapVerticalButtonsGroup.append('<button class="btn btn-default" data-buttonname="new" type="button"><span class="fa fa-plus fa-lg" style="font-size:14px"></span></button>');
        bootStrapVerticalButtonsGroup.append('<button class="btn btn-default" data-toggle="confirmation" data-buttonname="remove" type="button"><span class="fa fa-trash-o fa-lg" style="font-size:14px"></span></button>');
        bootStrapVerticalButtonsGroup.append('<button class="btn btn-default" data-buttonname="copy" type="button"><span class="fa fa-share-square-o fa-lg" style="font-size:14px"></span></button>');
		
        
        cursorTemplate.append(bootStrapVerticalButtonsGroup);

        result.cursorTemplate = cursorTemplate.wrap('<div>').parent().html();
    }

    return result;
}
*/
function onMouseClick(event, data) {
    var target = $(event.originalEvent.target);
    if (target.hasClass("btn") || target.parent(".btn").length > 0) {
        var button = target.hasClass("btn") ? target : target.parent(".btn");
        var buttonname = button.data("buttonname");
        // alert(data.context.id);
        // alert(data.parentItem.title)
        
        initEditModel();
        fillDepartmentSelect(data.context.id);

        $editModal = $('#editModal');
        switch (buttonname) {
            case 'new' :
                // $titleSuffix.html('新增');
            	$editModal.find('h3').eq(0).html('新增');
                // $selectParentDept.val(data.context.id).attr('disabled',
				// 'disabled');
                // $liChildrenSort.hide();
            	$('#parent_id').val(data.context.id);
            	$('#parent_id').attr('disabled', 'disabled');
                $editModal.modal('show');
                break;
            case 'edit' :
            	$editModal.find('h3').eq(0).html('修改');
            	
            	$.ajax({
                    url: 'orgData!getOrgData.action',
                    dataType: 'json',
                    data: {
                        'id' : data.context.id,
                    },
                    error: function () {
                        // common.alertError();
                    },
                    success: function (response) {
                        if(response.success) {
                        	// alert(response.data[0].parent);
                        	if(response.data[0].parent==null){
                        		$('#parent_id').html('');
                        		$('#parent_id').attr('disabled', 'disabled');
                        	}else{
                        		$('#parent_id').val(response.data[0].parent);
                        	}
                        	$('#org_type').val(response.data[0].org_type);
                        	$('#org_kind').val(response.data[0].org_kind);
                        	$('#name').val(response.data[0].display_name);
                        	$('#name_en').val(response.data[0].name);
                        	$('#org_code').val(response.data[0].short_name);
                        	$('#manager').val(response.data[0].manager);
                        	$('#responsibilities').val(response.data[0].responsibilities);
                        } else {
                            alert(response.message);
                        }
                    }
                });
            	$editModal.data('id',data.context.id);
            	$editModal.modal('show');
            	
                // $titleSuffix.html('编辑');
                // $selectParentDept.val(data.context.parent).removeAttr('disabled');
               // $inputDisplayName.val(data.context.display_name);
               // $inputName.val(data.context.name);
                // $inputShortName.val(data.context.title);
                // $liChildrenSort.show();
                // $editModal.data('dept_id', data.context.id).modal('show');
                // getChildren(data.context.id);
                break;
            case 'remove' :
                var msg = '是否移除[' + data.context.display_name +']？将会同时删除其所有子节点！';
                 if(confirm(msg)) {
                     remove(data.context.id);
                     ajaxQuery();
                 }
                break;
            case 'copy' :
            	$editModal.find('h3').eq(0).html('复制');
            	
            	$.ajax({
                    url: 'orgData!getOrgData.action',
                    dataType: 'json',
                    data: {
                        'id' : data.context.id,
                    },
                    error: function () {
                        // common.alertError();
                    },
                    success: function (response) {
                        if(response.success) {
                        	$('#parent_id').val(response.data[0].parent);
                        	$('#org_type').val(response.data[0].org_type);
                        	$('#org_kind').val(response.data[0].org_kind);
                        	$('#name').val(response.data[0].display_name);
                        	$('#name_en').val(response.data[0].name);
                        	$('#org_code').val(response.data[0].short_name);
                        	$('#manager').val(response.data[0].manager);
                        	$('#responsibilities').val(response.data[0].responsibilities);
                        } else {
                            alert(response.message);
                        }
                    }
                });
            	// $editModal.data('id',data.context.id);
            	$editModal.modal('show');
                break;
        }
        data.cancel = true;
    }
}

// modify by wuxiao
function add() {
    $.ajax({
        url: 'orgData!addOrgData.action',
        dataType: 'json',
        data: {
            // 'deptId' : $editModal.data('dept_id'),
            // 'deptData' : packEditData(),
            // 'managerNumber': $managerNumber.val()
        	'parent_id' : $('#parent_id').val(),
        	'org_type' : $('#org_type').val(),
        	'org_kind' : $('#org_kind').val(),
        	'name' : $('#name').val(),
        	'name_en' : $('#name_en').val(),
        	'org_code' : $('#org_code').val(),
        	'manager' : $('#manager').val(),
        	'responsibilities' : $('#responsibilities').val(),
        },
        error: function () {
            // common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	ajaxQuery();
                $('#editModal').modal('hide');
            } else {
                alert(response.message);
            }
        }
    });
}

function addStandardHumanData(type,org_id,job_id,capacity,bus_type_id,standard_humans) {
    $.ajax({
        url: 'orgData!addStandardHumanData.action',
        dataType: 'json',
        data: {
            'type':type,
            'org_id':org_id,
            'job_id':job_id,
            'capacity':capacity,
            'bus_type_id':(type==0?null:bus_type_id),
            'standard_humans':standard_humans,
        },
        error: function () {
            // common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	//ajaxQuery();
                //$('#editModal').modal('hide');
            } else {
                alert(response.message);
            }
        }
    });
}

//modify by wuxiao
function addStandardPosition(org_id,job_id) {
    $.ajax({
        url: 'orgData!addStandardPositionData.action',
        dataType: 'json',
        data: {
            // 'deptId' : $editModal.data('dept_id'),
            // 'deptData' : packEditData(),
            // 'managerNumber': $managerNumber.val()
        	'org_id' : org_id,
        	'job_id' : job_id,
        },
        error: function () {
            // common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	ajaxQueryStandardPosition($('#positionModal').data('org_id'));
            	$('#job_no').val('');
                $('#positionModal').modal('hide');
            } else {
                alert(response.message);
            }
        }
    });
}

// modify by wuxiao
function edit() {
    $.ajax({
        url: 'orgData!editOrgData.action',
        dataType: 'json',
        data: {
            // 'deptId' : $editModal.data('dept_id'),
            // 'deptData' : packEditData(),
            // 'managerNumber': $managerNumber.val()
        	'parent_id' : $('#parent_id').val(),
        	'org_type' : $('#org_type').val(),
        	'org_kind' : $('#org_kind').val(),
        	'name' : $('#name').val(),
        	'name_en' : $('#name_en').val(),
        	'org_code' : $('#org_code').val(),
        	'manager' : $('#manager').val(),
        	'responsibilities' : $('#responsibilities').val(),
        	'id':$('#editModal').data('id')
        },
        error: function () {
            // common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	ajaxQuery();
                $('#editModal').modal('hide');
            } else {
                alert(response.message);
            }
        }
    });
}

function editStandardHumanData(id,standard_humans) {
    $.ajax({
        url: 'orgData!editStandardHumanData.action',
        dataType: 'json',
        data: {
        	'standard_humans' : standard_humans,
        	'id':id,
        },
        error: function () {
            // common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	/*ajaxQuery();
                $('#editModal').modal('hide');*/
            } else {
                alert(response.message);
            }
        }
    });
}

function removeStandardPosition (id) {
    $.ajax({
        url: 'orgData!deleteStandardPositionData.action',
        dataType: 'json',
        data: {
            'id' : id
        },
        error: function () {
            // common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	ajaxQueryStandardPosition($('#positionModal').data('org_id'));
            	$('#job_no').val('');
                //$('#positionModal').modal('hide');
            } else {
                alert(response.message);
            }
        }
    });
}
/*
function sortUp (deptId) {
    $.ajax({
        url: service.SORT_UP_ORG_DEPT,
        dataType: 'json',
        data: {
            'deptId' : deptId
        },
        error: function () {
            common.alertError();
        },
        success: function (response) {
            if(response.success) {
            } else {
                bootbox.alert(response.message);
            }
        }
    });
}
function sortDown (deptId) {
    $.ajax({
        url: service.SORT_DOWN_ORG_DEPT,
        dataType: 'json',
        data: {
            'deptId' : deptId
        },
        error: function () {
            alertError();
        },
        success: function (response) {
            if(response.success) {
            } else {
                bootbox.alert(response.message);
            }
        }
    });
}

function packEditData () {
    var packData = {};
    packData.name = $inputName.val();
    packData.display_name = $inputDisplayName.val();
    packData.short_name = $inputShortName.val();
    packData.parent_id = $selectParentDept.val();

    retData = JSON.stringify(packData);

    return retData;
}
*/
// modify by wuxiao
function fillDepartmentSelect (deptId) {
    $.ajax({
        url: 'orgData!getOrgDeptList.action',
        dataType: 'json',
        data: {
            'id': deptId
        },
        async: false,
        error: function () {
            // common.alertError();
        },
        success: function (response) {
            if(response.success) {
                $allOpts = $('<div />');
                // $.each(response.data, function (level, depts) {
                    // $options = $('<option />').attr('disabled',
					// 'disabled').val('').html(level).appendTo($allOpts);
                    $.each(response.data/* depts */, function (index, dept) {
                        $opt = $('<option />').val(dept.id).html(dept.name).appendTo($allOpts);
                    });
                // });
                $('#parent_id').html('').html($allOpts.html());
            } else {
                alert(response.message);
            }
        }
    });
}

/*function getChildren (deptId) {
    $.ajax({
        url: service.GET_ORG_CHILDREN,
        dataType: 'json',
        data: {
            'deptId': deptId
        },
        async: false,
        error: function () {
            common.alertError();
        },
        success: function (response) {
            if(response.success) {
                $tbodyChildren.html('');
                $.each(response.data, function (index, dept) {
                    $tr = $('<tr />');
                    $btnUp = $('<button />').data('btn_name', 'sortUp').addClass('btn  btn-default btn-xs').append('<i class="fa fa-arrow-up"></i>');
                    if( index === 0 ) {
                        $btnUp.attr('disabled', 'disabled');
                    }
                    $btnDown = $('<button />').data('btn_name', 'sortDown').addClass('btn  btn-default btn-xs').append('<i class="fa fa-arrow-down"></i>');
                    if( index === response.data.length - 1 ) {
                        $btnDown.attr('disabled', 'disabled');
                    }
                    $btnGroup = $('<div />').addClass('btn-group btn-group-xs').append($btnUp).append($btnDown);
                    $('<td />').append($btnGroup).appendTo($tr);
                    $('<td />').html(dept.sort_number).appendTo($tr);
                    $('<td />').html(dept.short_name).appendTo($tr);
                    $('<td />').html(dept.display_name).appendTo($tr);

                    $tr.data('dept_id', dept.id);
                    $tbodyChildren.append($tr);
                });
            } else {
                bootbox.alert(response.message);
            }
        }
    });
}*/

function initPositionModal () {
	if(initflag==0){
		for(var i=1; i<=14; i++){
			ajaxQueryGrade(i);
		}
		initflag=1;
	}
	$('#positionModal').find('.in').css("height","0px");
	$('#positionModal').find('.in').removeClass("in");
	
    $("#positionModal input[type='checkbox']").removeAttr("checked");
    //$('#parent_id').removeAttr('disabled');
    // $('#editModal').data('dept_id', 0);
    // $paneChildrenSort.removeClass('active in');
    // $liChildrenSort.removeClass('active');
    // $paneDetailEdit.addClass('active in');
    // $liDetailEdit.addClass('active');
}

/*
 * 部门标准岗位编号模糊查询、弹出下拉列表
 */
function getStandardPositionFuzzySelect() {
	var slist;
    $(".sequence").typeahead({
        source: function(input, process) {
            $.get('orgData!getStandardPositionFuzzySelect.action', {
                "job_no": input,
            }, function(data) {
                //alert(data.data.job_no);
            	slist = data.data;
            	var results = new Array();
            	$.each(data.data, function(index, value) {
					results.push(value.job_no);
				});
                return process(results);
            }, 'json');
        },
        matcher : function(item) {
			// alert(this.query);
			return true;
		},
		items : 10,
		updater : function(item) {
			$.each(slist, function(index, value) {
				if (value.job_no == item) {
					$('#job_no').attr('av', value.id);
					addStandardPosition($('#positionModal').data('org_id'),$('#job_no').attr('av'));
				}
			})
			return item;
		}
    });
}

extArray = new Array(".csv");
function LimitAttach(form, file) {
	if ($("#file").val() == "") {
		alert("请选择文件！");
		return false;
	}
	allowSubmit = false;
	if (!file)
		return;
	while (file.indexOf("\\") != -1)
		file = file.slice(file.indexOf("\\") + 1);
	ext = file.slice(file.indexOf(".")).toLowerCase();
	for (var i = 0; i < extArray.length; i++) {
		if (extArray[i] == ext) {
			allowSubmit = true;
			break;
		}
	}
	if (allowSubmit) {
		form.submit();
		//$('#btn_upload').val("上传中...");
		//$('#btn_upload').attr('disabled', "true");
	} else {
		alert("对不起，只能上传csv格式的文件!\n请重新选择符合条件的文件再上传.");
		return false;
	}
}