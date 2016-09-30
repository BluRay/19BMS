var initflag=0;
var allParents;
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
    //alert(treeNode.id);
    $('#positionModal').data('org_id',treeNode.id);
    $("#standardPositionTable tbody").html("");
    ajaxQueryStandardPosition(treeNode.id);
    allParents = ''
    checkAllParents(treeNode);
    $('#allParents').html(allParents.substring(0,allParents.length-2));
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
		$('#allParents').html(zTreeObj.getSelectedNodes()[0].name);
		$('#positionModal').data('org_id',zTreeObj.getSelectedNodes()[0].id);
		ajaxQueryStandardPosition(zTreeObj.getSelectedNodes()[0].id);
    	$('#job_no').val('');
        $('#positionModal').modal('hide');
		getStandardPositionFuzzySelect();
	}
	
	
	/*$("#btnAdd").click(function(){ 
		addStandardPosition($('#positionModal').data('org_id'),$('#job_no').attr('av'));
	});*/ 
	
	$("#btnStandardPositionSave").click(function(){ 
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
	
	$('#standardPositionTable').on("click", ".close", function(e) {
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

	});
	
	$("#btnImport").click (function () {
		$("#tablediv").css("max-height","305px");
		$("#divImportFromFile").show();
	});
	
	$("#btnExport").click (function () {
		window.open("orgData!exportStandardPosition.action?orgpath="+encodeURIComponent($('#allParents').html())+"&org_id="+zTreeObj.getSelectedNodes()[0].id);
		return false;
	});
});


function ajaxQueryGrade(job_grade_id){
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
    					/* alert(checkedarr[value.model_flag]+"/"+checkarr[value.model_flag]); */
    				// $("#cbox_"+value.model_flag).attr("checked",true);
    				// }else{
    				// $("#cbox_"+value.model_flag).attr("checked",false);
    				// }
                });
                
                if(response.data.length!=0) $("a[data-parent='#grade_"+job_grade_id+"_table']").append('('+response.data.length+')');
            } 
	    }
	});
}

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
                    	{id:dept.id,pId:dept.parent,name:dept.display_name}
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
                $('#allParents').html(node.name);
                $('#positionModal').data('org_id',1);
                zTreeObj.expandNode(node,true,false);
            } 
	    }
	});
}

function ajaxQueryStandardPosition(org_id){
	$.ajax({
	    url: "orgData!getStandardPositionData.action",
	    dataType: "json",
		type: "get",
	    data: {
	    	'org_id':org_id,
	    },
	    success:function(response){
	    	if(response.success) {
	    		$("#standardPositionTable tbody").html('');
                $.each(response.data, function (index, value) {
                	var paramHtml = "<tr rowid='"+value.id+"'><td ><button type=\"button\" class=\"close\" aria-label=\"Close\" ><span aria-hidden=\"true\">&times;</span></button></td>" +
        	        "<td>"+value.job_no+"</td> " +
        	        "<td>"+value.job_name+"</td> " +
        	        "<td>"+value.job_grade_name+"</td> " +
        	        "<td>"+value.job_level+"</td> " +
        	        "<td style='text-overflow: ellipsis; white-space: nowrap; overflow: hidden;' title='"+value.basic_besponsibilit+"' >"+value.basic_besponsibilit+"</td> " +
        	        "<td>"+"<input type='button' class='btn' value='打印' onclick='window.open(\"orgData!positionDescription.action?job_id="+value.id+"\")'>"+"</td></tr>"
        	        // $("#parameters").after(paramHtml);
        	        $(paramHtml).appendTo("#standardPositionTable");
                });
                
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
					results.push(value.job_no+" "+value.job_name);
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
				if (value.job_no == item.split(' ')[0]) {
					$('#job_no').attr('av', value.id);
					addStandardPosition($('#positionModal').data('org_id'),$('#job_no').attr('av'));
				}
			})
			return item;
		}
    });
}

extArray = new Array(".xlsx");
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
		alert("对不起，只能上传xlsx格式的文件!\n请重新选择符合条件的文件再上传.");
		return false;
	}
}