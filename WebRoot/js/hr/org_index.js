
/*var zNodes=[];
var zTreeObj;
// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var setting = {
		data: {                                    
			  simpleData: {   //简单的数据源，一般开发中都是从数据库里读取，API有介绍，这里只是本地的                           
			   enable: true,  
			   idKey: "id",  //id和pid，这里不用多说了吧，树的目录级别  
			   pIdKey: "pId",  
			   rootPId: null   //根节点  
			  }                            
			 }
};*/

$(document).ready(function () {
	
	initPage();
	function initPage(){
		$('.left-sidebar li ul').eq(0).addClass("in");
		$('.treemenu').eq(0).removeClass("collapsed");
		$('#orgDiagram').css('height',parseInt($(window).height())-120);
		ajaxQuery(1);
	}
	
	$("#org_kind").change(function() {
		var pa = $('#name').parent();
		var tp = parseInt($("#org_type").val());
		if($("#org_kind").val()=='1'){
			switch(tp){
        	case 1 :
        		//var pa = $('#name').parent();
        		pa.html('').html('<select id="name" class="input-large carType"></select>');
        		//获得工厂
        		getFactorySelect("#name", null, "noall",null);
        		break;
        	case 3 :
        		//var pa = $('#name').parent();
        		//科室任意
        		pa.html('').html('<input style="height: 30px;width:280px" type="text" class="input-medium revise carType" id="name" onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,\'\')"  onbeforepaste="clipboardData.setData(\'text\',clipboardData.getData(\'text\').replace(/[^\u4E00-\u9FA5]/g,\'\'))"/>');
        		break;
        	case 4 :
        		//var pa = $('#name').parent();
        		//获得车间
        		pa.html('').html('<select id="name" class="input-large carType"></select>');
        		getWorkshopSelect_Key("#name", null);
        		$("#name option[value='']").remove();
        		break;
        	case 5 :
        		//var pa = $('#name').parent();
        		//获得班组
        		pa.html('').html('<select id="name" class="input-large carType"></select>');
        		fillWorkGroupSelect(0);
        		break;
        	case 6 :
        		//var pa = $('#name').parent();
        		//获得小班组
        		pa.html('').html('<select id="name" class="input-large carType"></select>');
        		fillWorkGroupSelect(1);
        		break;
        	}
		}else{
			pa.html('').html('<input style="height: 30px;width:280px" type="text" class="input-medium revise carType" id="name" onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,\'\')"  onbeforepaste="clipboardData.setData(\'text\',clipboardData.getData(\'text\').replace(/[^\u4E00-\u9FA5]/g,\'\'))"/>');
		}
	});
	
	$("#btnEditConfirm").click(function(){ 
		//alert("aa");
		if($('#editModal').find('h3').eq(0).html()=='新增'){
			add();
		}
		if($('#editModal').find('h3').eq(0).html()=='修改'){
			$("#sortTable tbody").find("tr").each(function(index,value){
				sort($(this).data('dept_id'),index);
			});
			edit();
		}
		if($('#editModal').find('h3').eq(0).html()=='复制'){
			copy();
		}
	}); 
	
	$("#new_tab li").click(function() {
		if ($(this).hasClass("active")) {
			//
		} else {
			/*
			 * $("#humanDetailTable tbody").html(''); $("#countTable
			 * tbody").html(''); //alert($(this).text());
			 * $(this).parent().find('li').removeClass('active');
			 * $(this).addClass('active');
			 * //ajaxQueryStandardHumans(zTreeObj.getSelectedNodes()[0].id,$(this).text().replace(/[^\d]/g,''),$("#busTypeTab
			 * .active").find('a').eq(0).attr('bus_id'));
			 * if(zTreeObj.getSelectedNodes()[0].org_kind==0){
			 * ajaxQueryStandardHumans1(zTreeObj.getSelectedNodes()[0].id,$(this).text().replace(/[^\d]/g,''));
			 * }else if(zTreeObj.getSelectedNodes()[0].org_kind==1){
			 * ajaxQueryStandardHumans(zTreeObj.getSelectedNodes()[0].id,$(this).text().replace(/[^\d]/g,''),$("#busTypeTab
			 * .active").find('a').eq(0).attr('bus_id')); }
			 */
			// alert($(this).text());
			if ($(this).text() == '明细') {
				$('#sortDiv').css('display', 'none');
				$('#detailDiv').css('display', '');
				//ajaxQuery();
			} else if ($(this).text() == '子节点排序') {
				$('#detailDiv').css('display', 'none');
				$('#sortDiv').css('display', '');
				//ajaxQuery1();
			}
		}
	});
});

function ajaxQuery(id){
	$.ajax({
	    url: "orgData!getOrgData.action",
	    async: false,
	    dataType: "json",
		type: "get",
	    data: {
	    	//parentId:"1",
	    },
	    success:function(response){
	    	if(response.success) {
                var options = new primitives.orgdiagram.Config(),
                    items = [],
                    colors = ['#AA0000', '#FFD700', '#FF8800', '#55AA00', '#00BBFF', '#66009D', '#FF3EFF'];
                $.each(response.data, function (index, dept) {
                    items.push(
                        new primitives.orgdiagram.ItemConfig({
                            id: dept.id,
                            parent: dept.parent,
                            title: dept.short_name,
                            short_name: dept.short_name,
                            name: dept.name,
                            display_name: dept.display_name,
                            itemTitleColor: colors[dept.level],
                            //templateName: dept.templateName,
                            manager_name: dept.manager,
                            org_type: dept.org_type,
                            org_kind: dept.org_kind,
                        })
                    );
                    /*zNodes.push(
                    	{id:dept.id,pId:dept.parent,name:dept.display_name}
                    );*/
                });

                options.hasSelectorCheckbox = primitives.common.Enabled.False;
                options.leavesPlacementType = primitives.common.ChildrenPlacementType.Vertical;
                options.hasButtons = primitives.common.Enabled.False;

                options.templates = [getorgStructureTpl()];
                options.onItemRender = onTemplateRender;
                options.onMouseClick = onMouseClick;
                options.defaultTemplateName = "orgStructureTpl";

                options.items = items;
                options.cursorItem = id;
                $("#orgDiagram").orgDiagram(options);
                $("#orgDiagram").orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
                
                /*zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                zTreeObj.expandAll(true);*/
            } 
	    }
	});
}

function onTemplateRender(event, data) {
    switch (data.renderingMode) {
        case primitives.common.RenderingMode.Create:
            /* Initialize widgets here */
            break;
        case primitives.common.RenderingMode.Update:
            /* Update widgets here */
            break;
    }

    var itemConfig = data.context;

    if (data.templateName == "orgStructureTpl") {
        data.element.find("[name=titleBackground]")
            .css({
                "background": itemConfig.itemTitleColor
            });
        //data.element.attr('title', itemConfig.name);

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
    result.minimizedItemSize = new primitives.common.Size(6, 6);
    result.highlightPadding = new primitives.common.Thickness(2, 2, 3, 3);
    if(1==1) {
        result.cursorPadding = new primitives.common.Thickness(2, 2, 50, 2);
    } else {
        result.cursorPadding = new primitives.common.Thickness(0, 0, 0, 0);
    }

    var itemTemplate = $(
        '<div  class="bp-item bp-corner-all bt-item-frame" rel="tooltip">'+
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

        
        bootStrapVerticalButtonsGroup.append('<button title="修改" class="btn btn-default" data-buttonname="edit" type="button"><span class="fa fa-edit fa-lg" style="font-size:14px;"></span></button>');
        bootStrapVerticalButtonsGroup.append('<button title="新增" class="btn btn-default" data-buttonname="new" type="button"><span class="fa fa-plus fa-lg" style="font-size:14px;"></span></button>');
        bootStrapVerticalButtonsGroup.append('<button title="删除" class="btn btn-default" data-toggle="confirmation" data-buttonname="remove" type="button"><span class="fa fa-trash-o fa-lg" style="font-size:14px;"></span></button>');
        bootStrapVerticalButtonsGroup.append('<button title="复制" class="btn btn-default" data-buttonname="copy" type="button"><span class="fa fa-share-square-o fa-lg" style="font-size:14px;"></span></button>');
		
        
        cursorTemplate.append(bootStrapVerticalButtonsGroup);

        result.cursorTemplate = cursorTemplate.wrap('<div>').parent().html();
    }

    return result;
}

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
            	$("#sortTable tbody").html('');
            	//$("#sortTable").hide();
            	var tp = parseInt(data.context.org_type);
            	if(tp==6){
            		alert('不能为小班组增加子节点！');
            		break;
            	}
            	/*if(tp==3 && data.context.org_kind=='0'){
            		alert('不能为管理型科室增加子节点！');
            		break;
            	}*/
                //$titleSuffix.html('新增');
            	$editModal.find('h3').eq(0).html('新增');
                //$selectParentDept.val(data.context.id).attr('disabled', 'disabled');
                //$liChildrenSort.hide();
            	//alert(data.context.org_type);
            	$('#parent_id').val(data.context.id);
            	switch(tp){
            	case 0 :
            		var pa = $('#name').parent();
            		pa.html('').html('<select id="name" class="input-large carType"></select>');
            		//获得工厂
            		getFactorySelect("#name", null, "noall",null);
            		break;
            	case 1 :
            		var pa = $('#name').parent();
            		//科室任意
            		pa.html('').html('<input style="height: 30px;width:280px" type="text" class="input-medium revise carType" id="name" onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,\'\')"  onbeforepaste="clipboardData.setData(\'text\',clipboardData.getData(\'text\').replace(/[^\u4E00-\u9FA5]/g,\'\'))"/>');
            		break;
            	case 3 :
            		var pa = $('#name').parent();
            		//获得车间
            		if(data.context.org_kind=='0'){
            			pa.html('').html('<input style="height: 30px;width:280px" type="text" class="input-medium revise carType" id="name" onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,\'\')"  onbeforepaste="clipboardData.setData(\'text\',clipboardData.getData(\'text\').replace(/[^\u4E00-\u9FA5]/g,\'\'))"/>');
            		}else{
            			pa.html('').html('<select id="name" class="input-large carType"></select>');
            			getWorkshopSelect_Key("#name", null);
            			$("#name option[value='']").remove();
            		}
            		$("#org_kind").attr('disabled','disabled');
            		break;
            	case 4 :
            		var pa = $('#name').parent();
            		//获得班组
            		pa.html('').html('<select id="name" class="input-large carType"></select>');
            		fillWorkGroupSelect(0,$('#parent_id').find("option:selected").text());
            		$("#org_kind").attr('disabled','disabled');
            		break;
            	case 5 :
            		var pa = $('#name').parent();
            		//获得小班组
            		if(data.context.org_kind=='0'){
            			$('#org_kind').val("0");
            			pa.html('').html('<input style="height: 30px;width:280px" type="text" class="input-medium revise carType" id="name" onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,\'\')"  onbeforepaste="clipboardData.setData(\'text\',clipboardData.getData(\'text\').replace(/[^\u4E00-\u9FA5]/g,\'\'))"/>');
            		}else{
            			pa.html('').html('<select id="name" class="input-large carType"></select>');
            			fillWorkGroupSelect(1,$('#parent_id').find("option:selected").text());
            		}
            		$("#org_kind").attr('disabled','disabled');
            		break;
            	}
            	
            	$('#org_type').attr('disabled', 'disabled');
            	if(tp==1){
            		if(data.context.org_kind=='0'){
            			$('#org_type').empty();
            			$('#org_type').append("<option value='3'>科室</option>");
            			$('#org_type').append("<option value='5'>班组</option>");
            			$('#org_type').append("<option value='6'>小班组</option>");
            			$('#org_type').removeAttr('disabled');
            			$('#org_kind').val("0");
            			$('#org_kind').attr('disabled', 'disabled');
            		}else{
            			$('#org_type').val(tp+2);
            		}
            	}else{
            		$('#org_type').val(tp+1);
            	}
            	if(tp==3 && data.context.org_kind=='0'){
            		$('#org_type').val(tp+2);
            		$('#org_kind').val("0");
            	}
            	
            	$('#parent_id').attr('disabled', 'disabled');
                $editModal.modal('show');
                break;
            case 'edit' :
            	$editModal.find('h3').eq(0).html('修改');
            	//$("#sortTable").show();
            	$.ajax({
                    url: 'orgData!getOrgData.action',
                    dataType: 'json',
                    data: {
                        'id' : data.context.id,
                    },
                    error: function () {
                        //common.alertError();
                    },
                    success: function (response) {
                        if(response.success) {
                        	//alert(response.data[0].parent);
                        	if(response.data[0].parent==null){
                        		$('#parent_id').html('');
                        		$('#parent_id').attr('disabled', 'disabled');
                        	}else{
                        		$('#parent_id').val(response.data[0].parent);
                        		$('#parent_id').attr('disabled', 'disabled');
                        	}
                        	$('#org_type').val(response.data[0].org_type).attr('disabled','disabled');
                        	$('#org_kind').val(response.data[0].org_kind).attr('disabled','disabled');
                        	var pa = $('#name').parent();
                        	pa.html('').html('<input style="height: 30px;width:280px" type="text" class="input-medium revise carType" id="name" onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,\'\')"  onbeforepaste="clipboardData.setData(\'text\',clipboardData.getData(\'text\').replace(/[^\u4E00-\u9FA5]/g,\'\'))"/>');
                        	$('#name').val(response.data[0].display_name);
                        	//职能部门放开修改名称
                        	if(response.data[0].org_kind=="1"){
                        		$('#name').attr('disabled','disabled');
                        	}
                        	//科室放开修改名称
                        	if(response.data[0].org_type=="3"){
                        		$('#name').removeAttr('disabled');
                        	}
                        	$('#name_en').val(response.data[0].name);
                        	$('#org_code').val(response.data[0].short_name);
                        	$('#manager').val(response.data[0].manager);
                        	$('#responsibilities').val(response.data[0].responsibilities);
                        } else {
                            alert(response.message);
                        }
                    }
                });
            	//子节点排序
            	$.ajax({
                    url: 'orgData!getOrgData.action',
                    dataType: 'json',
                    data: {
                        'parent_id' : data.context.id,
                    },
                    error: function () {
                        //common.alertError();
                    },
                    success: function (response) {
                        if(response.success) {
                        	$('#sortTable tbody').html('');
                            $.each(response.data, function (index, dept) {
                                $tr = $('<tr />');
                                $btnUp = $('<button type="button"/>').data('btn_name', 'sortUp').addClass('btn btnup btn-default btn-xs').append('<i class="fa fa-arrow-up"></i>');
                                /*if( index === 0 ) {
                                    $btnUp.attr('disabled', 'disabled');
                                }*/
                                $btnDown = $('<button type="button"/>').data('btn_name', 'sortDown').addClass('btn btndown btn-default btn-xs').append('<i class="fa fa-arrow-down"></i>');
                                /*if( index === response.data.length - 1 ) {
                                    $btnDown.attr('disabled', 'disabled');
                                }*/
                                $btnGroup = $('<div />').addClass('btn-group btn-group-xs').append($btnUp).append($btnDown);
                                $('<td />').append($btnGroup).appendTo($tr);
                                /*$('<td />').html(dept.sort_number).appendTo($tr);*/
                                $('<td />').html(dept.short_name).appendTo($tr);
                                $('<td />').html(dept.display_name).appendTo($tr);

                                $tr.data('dept_id', dept.id);
                                //alert($tr.data('dept_id'));
                                $('#sortTable tbody').append($tr);
                            });
                            
                            //上移
                            $("#sortTable tbody .btnup").each(function () {
                            $(this).click(function () {
                            var $tr = $(this).parents("tr");
                            if ($tr.index() != 0) {
                            $tr.prev().before($tr);
                            }
                            });
                            });
                            //下移
                            var trLength = $("#sortTable tbody").find("tr").length; 
                            $("#sortTable tbody .btndown").each(function () {
                            $(this).click(function () {
                            var $tr = $(this).parents("tr"); 
                            if ($tr.index() != trLength - 1) { 
                            $tr.next().after($tr);
                            }
                            });
                            });
                            
                        } else {
                            alert(response.message);
                        }
                    }
                });
            	$editModal.data('id',data.context.id);
            	$editModal.modal('show');
            	
                //$titleSuffix.html('编辑');
                //$selectParentDept.val(data.context.parent).removeAttr('disabled');
               // $inputDisplayName.val(data.context.display_name);
               // $inputName.val(data.context.name);
                //$inputShortName.val(data.context.title);
                //$liChildrenSort.show();
                //$editModal.data('dept_id', data.context.id).modal('show');
                //getChildren(data.context.id);
                break;
            case 'remove' :
                var msg = '是否移除[' + data.context.display_name +']？将会同时删除当前节点的所有子节点！';
                 if(confirm(msg)) {
                     remove(data.context.id);
                     ajaxQuery(data.context.parent);
                 }
                break;
            case 'copy' :
            	/*$editModal.find('h3').eq(0).html('复制');
            	$("#sortTable tbody").html('');
            	//$("#sortTable").hide();
            	$.ajax({
                    url: 'orgData!getOrgData.action',
                    dataType: 'json',
                    data: {
                        'id' : data.context.id,
                    },
                    error: function () {
                        //common.alertError();
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
            	$editModal.data('id',data.context.id);
            	//$('#editModal').find('.carType').attr('disabled','disabled');
            	$editModal.modal('show');*/
                break;
        }
        data.cancel = true;
    }
}

//modify by wuxiao
function add() {
    $.ajax({
        url: 'orgData!addOrgData.action',
        async: true,
        dataType: 'json',
        data: {
            //'deptId' : $editModal.data('dept_id'),
            //'deptData' : packEditData(),
            //'managerNumber': $managerNumber.val()
        	'parent_id' : $('#parent_id').val(),
        	'org_type' : $('#org_type').val(),
        	'org_kind' : $('#org_kind').val(),
        	'name' : $('#name').is('input')?$('#name').val():$('#name').find("option:selected").text(),
        	'name_en' : $('#name_en').val(),
        	'org_code' : $('#org_code').val(),
        	'manager' : $('#manager').val(),
        	'responsibilities' : $('#responsibilities').val(),
        	'sort_number' : '0',
        },
        error: function () {
            //common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	//alert($('#parent_id').val());
            	ajaxQuery($('#parent_id').val());
                $('#editModal').modal('hide');
            } else {
                alert(response.message);
            }
        }
    });
}

function copy() {
    $.ajax({
        url: 'orgData!addOrgData.action',
        async: true,
        dataType: 'json',
        data: {
            //'deptId' : $editModal.data('dept_id'),
            //'deptData' : packEditData(),
            //'managerNumber': $managerNumber.val()
        	'parent_id' : $('#parent_id').val(),
        	'org_type' : $('#org_type').val(),
        	'org_kind' : $('#org_kind').val(),
        	'name' : $('#name').val(),
        	'name_en' : $('#name_en').val(),
        	'org_code' : $('#org_code').val(),
        	'manager' : $('#manager').val(),
        	'responsibilities' : $('#responsibilities').val(),
        	'id':$('#editModal').data('id'),
        	'sort_number' : '0',
        },
        error: function () {
            //common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	ajaxQuery($('#parent_id').val());
                $('#editModal').modal('hide');
            } else {
                alert(response.message);
            }
        }
    });
}

//modify by wuxiao
function edit() {
    $.ajax({
        url: 'orgData!editOrgData.action',
        async: true,
        dataType: 'json',
        data: {
            //'deptId' : $editModal.data('dept_id'),
            //'deptData' : packEditData(),
            //'managerNumber': $managerNumber.val()
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
            //common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	ajaxQuery($('#editModal').data('id'));
                $('#editModal').modal('hide');
            } else {
                alert(response.message);
            }
        }
    });
}

function sort(id,sort_number) {
    $.ajax({
        url: 'orgData!sortOrgData.action',
        async: true,
        dataType: 'json',
        data: {
            'sort_number':sort_number,
        	'id':id
        },
        error: function () {
            //common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	/*ajaxQuery($('#editModal').data('id'));
                $('#editModal').modal('hide');*/
            } else {
                alert(response.message);
            }
        }
    });
}

function remove (deptId) {
    $.ajax({
        url: 'orgData!deleteOrgData.action',
        async: false,
        dataType: 'json',
        data: {
            'id' : deptId
        },
        error: function () {
            //common.alertError();
        },
        success: function (response) {
            if(response.success) {
            	//ajaxQuery(1);
            } else {
                alert(response.message);
            }
        }
    });
}

/*function sortUp (deptId) {
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
}*/

//modify by wuxiao
function fillDepartmentSelect (deptId) {
    $.ajax({
        url: 'orgData!getOrgDeptList.action',
        dataType: 'json',
        data: {
            'id': deptId
        },
        async: false,
        error: function () {
            //common.alertError();
        },
        success: function (response) {
            if(response.success) {
                $allOpts = $('<div />');
                //$.each(response.data, function (level, depts) {
                    //$options = $('<option />').attr('disabled', 'disabled').val('').html(level).appendTo($allOpts);
                    $.each(response.data/*depts*/, function (index, dept) {
                        $opt = $('<option />').val(dept.id).html(dept.name).appendTo($allOpts);
                    });
                //});
                $('#parent_id').html('').html($allOpts.html());
            } else {
                alert(response.message);
            }
        }
    });
}

function fillWorkGroupSelect (type,parent) {
    $.ajax({
        url: 'orgData!getWorkGroupList.action',
        dataType: 'json',
        data: {
            'type': type,
            'parent':parent,
        },
        async: false,
        error: function () {
            //common.alertError();
        },
        success: function (response) {
            if(response.success) {
                $allOpts = $('<div />');
                //$.each(response.data, function (level, depts) {
                    //$options = $('<option />').attr('disabled', 'disabled').val('').html(level).appendTo($allOpts);
                    $.each(response.data/*depts*/, function (index, dept) {
                        $opt = $('<option />').val(dept.id).html(dept.workgroup_name).appendTo($allOpts);
                    });
                //});
                $('#name').html('').html($allOpts.html());
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

function initEditModel () {
    $('#editModal').find('.carType').val('');
    $('#editModal').find('.carType').removeAttr('disabled');
    $('#parent_id').removeAttr('disabled');
    $('#org_type').empty();
    $('#org_type').append("<option value='0'>事业部</option>");
	$('#org_type').append("<option value='1'>工厂/职能部门</option>");
	$('#org_type').append("<option value='3'>科室</option>");
	$('#org_type').append("<option value='4'>车间</option>");
	$('#org_type').append("<option value='5'>班组</option>");
	$('#org_type').append("<option value='6'>小班组</option>");
    //$('#editModal').data('dept_id', 0);
    //$paneChildrenSort.removeClass('active in');
    //$liChildrenSort.removeClass('active');
    //$paneDetailEdit.addClass('active in');
    //$liDetailEdit.addClass('active');
}
