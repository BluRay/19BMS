var job_id;
$(document).ready(function () {
	initPage();
	function initPage(){
		/*$('.left-sidebar li ul').eq(0).addClass("in");
		$('.treemenu').eq(0).removeClass("collapsed");*/
		/*ajaxQuery();
		ajaxQueryStandardPosition($('#positionModal').data('org_id'));
    	$('#job_no').val('');
        $('#positionModal').modal('hide');
		getStandardPositionFuzzySelect();
		for(var i=1; i<=14; i++){
			ajaxQueryGrade(i);
		}*/
		job_id = getUrlParam('job_id');
		getPositionDetail(job_id);
	}
	
	function getPositionDetail (id) {
        $.ajax({
            url: 'orgData!getStandardPositionData.action',
            dataType: 'json',
            data: {
                'id' : id
            },
            error: function () {
                //common.alertError();
            },
            success: function (response) {
                if(response.success) {
                	var d = response.data[0];
                    $.each(d, function (key, value) {
                        var text = value.toString().replace(/\n/g, '<br>');
                        $(document).find('[position-detail='+ key +']').html('').html(text);
                    });
                    ajaxQuery(d.job_id);
                } else {
                    alert(response.message);
                }
            }
        });
    }
	
	$('#btnPrint').click( function () {
        window.print();
    });
});

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function ajaxQuery(id){
	$.ajax({
	    url: "orgData!getWorkRelationshipChart.action",
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
                    colors = ['#AA0000', '#FFD700', '#FF8800', '#55AA00', '#00BBFF', '#66009D', '#FF3EFF', '#D2B48C'];
                var parent_id;
                $.each(response.data, function (index, dept) {
                    /*items.push(
                        new primitives.orgdiagram.ItemConfig({
                            id: dept.id,
                            parent: dept.parent_job_id,
                            title: dept.job_grade_name,
                            short_name: dept.job_level,
                            name: dept.job_grade_name,
                            display_name: dept.job_name,
                            itemTitleColor: colors[parseInt(7*Math.random())],
                            //templateName: dept.templateName,
                            //manager_name: dept.manager,
                            //org_type: dept.org_type,
                            //org_kind: dept.org_kind,
                        })
                    );*/
                    if(dept.id==id){
                    	parent_id = dept.parent_job_id;
                    }
                });
                if(parent_id!=null){
                $.each(response.data, function (index, dept) {
                    if(dept.parent_job_id==parent_id){
                    	items.push(
                                new primitives.orgdiagram.ItemConfig({
                                    id: dept.id,
                                    parent: dept.parent_job_id,
                                    title: dept.job_grade_name,
                                    short_name: dept.job_level,
                                    name: dept.job_grade_name,
                                    display_name: dept.job_name,
                                    itemTitleColor: colors[setLevelColor(dept.job_level)],
                                    //templateName: dept.templateName,
                                    //manager_name: dept.manager,
                                    //org_type: dept.org_type,
                                    //org_kind: dept.org_kind,
                                })
                            );
                    }
                    
                    if(dept.id==parent_id){
                    	items.push(
                                new primitives.orgdiagram.ItemConfig({
                                    id: dept.id,
                                    parent: null,
                                    title: dept.job_grade_name,
                                    short_name: dept.job_level,
                                    name: dept.job_grade_name,
                                    display_name: dept.job_name,
                                    itemTitleColor: colors[setLevelColor(dept.job_level)],
                                    //templateName: dept.templateName,
                                    //manager_name: dept.manager,
                                    //org_type: dept.org_type,
                                    //org_kind: dept.org_kind,
                                })
                            );
                    }
                });
                
                /*while(parent_id!=null){
                	$.each(response.data, function (index, dept) {
                		if(dept.id==parent_id){
                			items.push(
                                    new primitives.orgdiagram.ItemConfig({
                                        id: dept.id,
                                        parent: dept.parent_job_id,
                                        title: dept.job_grade_name,
                                        short_name: dept.job_level,
                                        name: dept.job_grade_name,
                                        display_name: dept.job_name,
                                        itemTitleColor: colors[setLevelColor(dept.job_level)],
                                        //templateName: dept.templateName,
                                        //manager_name: dept.manager,
                                        //org_type: dept.org_type,
                                        //org_kind: dept.org_kind,
                                    })
                                );
                			parent_id=dept.parent_job_id;
                		}
                	});
                }*/
                
                }else{
                	$.each(response.data, function (index, dept) {
                        if(dept.id==id){
                        	items.push(
                                    new primitives.orgdiagram.ItemConfig({
                                        id: dept.id,
                                        parent: null,
                                        title: dept.job_grade_name,
                                        short_name: dept.job_level,
                                        name: dept.job_grade_name,
                                        display_name: dept.job_name,
                                        itemTitleColor: colors[setLevelColor(dept.job_level)],
                                        //templateName: dept.templateName,
                                        //manager_name: dept.manager,
                                        //org_type: dept.org_type,
                                        //org_kind: dept.org_kind,
                                    })
                                );
                        }
                    });
                }
                
                $.each(response.data, function (index, dept) {
                    if(dept.parent_job_id==id){
                    	items.push(
                                new primitives.orgdiagram.ItemConfig({
                                    id: dept.id,
                                    parent: dept.parent_job_id,
                                    title: dept.job_grade_name,
                                    short_name: dept.job_level,
                                    name: dept.job_grade_name,
                                    display_name: dept.job_name,
                                    itemTitleColor: colors[setLevelColor(dept.job_level)],
                                    //templateName: dept.templateName,
                                    //manager_name: dept.manager,
                                    //org_type: dept.org_type,
                                    //org_kind: dept.org_kind,
                                })
                            );
                    }
                });
                
                options.hasSelectorCheckbox = primitives.common.Enabled.False;
                options.leavesPlacementType = primitives.common.ChildrenPlacementType.Horizontal;
                options.hasButtons = primitives.common.Enabled.False;

                options.templates = [getorgStructureTpl()];
                options.onItemRender = onTemplateRender;
                options.onCursorRender = onCursorRender;
                //options.onMouseClick = onMouseClick;
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

function onCursorRender(event, data) {
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
    	//alert(data.element.html());
        data.element.css({"overflow":"visible"});
    }
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

        var fields = ["title", "display_name", "short_name"];
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
    result.highlightPadding = new primitives.common.Thickness(0, 0, 0, 0);
    if(1==1) {
        result.cursorPadding = new primitives.common.Thickness(4, 4, 1, 1);
    } else {
        result.cursorPadding = new primitives.common.Thickness(0, 0, 0, 0);
    }

    var itemTemplate = $(
        '<div  class="bp-item bp-corner-all bt-item-frame" rel="tooltip">'+
            '<div class="bp-item-wrap">' +
                '<div name="titleBackground" class="bp-item bp-corner-all bp-title-frame">' +
                    '<div class="bp-item bp-title" style="padding:5px">' +
                        '<span name="title" class="pull-left"></span>'+
                        '<span class="pull-right" name="short_name"></span>'+
                    '</div>' +
                '</div>' +
                '<div name="display_name" class="bp-item bp-item-dispname" style="padding:5px"></div>'+
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

        
        /*bootStrapVerticalButtonsGroup.append('<button title="修改" class="btn btn-default" data-buttonname="edit" type="button"><span class="fa fa-edit fa-lg" style="font-size:14px;"></span></button>');
        bootStrapVerticalButtonsGroup.append('<button title="新增" class="btn btn-default" data-buttonname="new" type="button"><span class="fa fa-plus fa-lg" style="font-size:14px;"></span></button>');
        bootStrapVerticalButtonsGroup.append('<button title="删除" class="btn btn-default" data-toggle="confirmation" data-buttonname="remove" type="button"><span class="fa fa-trash-o fa-lg" style="font-size:14px;"></span></button>');
        bootStrapVerticalButtonsGroup.append('<button title="复制" class="btn btn-default" data-buttonname="copy" type="button"><span class="fa fa-share-square-o fa-lg" style="font-size:14px;"></span></button>');*/
		
        
        cursorTemplate.append(bootStrapVerticalButtonsGroup);

        result.cursorTemplate = cursorTemplate.wrap('<div>').parent().html();
    }

    return result;
}

function setLevelColor(input){
	switch(input){
	case 'B':
		return 0;
		break;
	case 'C':
		return 1;
		break;
	case 'D':
		return 2;
		break;
	case 'E':
		return 3;
		break;
	case 'F':
		return 4;
		break;
	case 'G':
		return 5;
		break;
	case 'H':
		return 6;
		break;
	case 'I':
		return 7;
		break;
	}
}