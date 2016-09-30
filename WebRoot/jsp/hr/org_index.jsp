<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>组织结构</title>
<!-- Le styles -->


<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">

<link href="css/orgStructure.css" rel="stylesheet">

<link rel="stylesheet" href="js/jquery/ui-lightness/jquery-ui-1.10.2.custom.css" />
<link href="js/primitives/primitives.latest.css" media="screen" rel="stylesheet" type="text/css" />

 <link rel="stylesheet" href="css/zTreeStyle/metro.css" type="text/css">
 <style type="text/css">
.bp-title {
    padding: 2px 0px 0px 5px;
}
.btn {
    padding: 1px 12px 3px 11px;
}
.bp-item .pull-right {
    margin-top: 0px;
}
#bodyright {
    margin-left: 10px;
}
 </style>

<script type="text/javascript" src="js/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-1.10.2.custom.min.js"></script>
 
<script  type="text/javascript" src="js/primitives/primitives.min.js"></script>

<script type="text/javascript" src="js/ztree/jquery.ztree.core-3.5.min.js"></script>

<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/velocity.min.js"></script>
<script type="text/javascript" src="js/velocity.ui.min.js"></script>

<!-- add by wuxiao -->
<script type="text/javascript" src="js/hr/org_index.js"></script>

</head>
<body id="cbody" style="overflow-y:hidden;overflow-x:hidden;">
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	<!-- main -->
	
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="container">	
			    <!-- <div id="zztree" style="float:left;width:250px;height:530px;border:1px solid #ccebf8">
					<ul id="treeDemo" class="ztree"></ul>
				</div> -->		
                <div class="org-level-label" style="margin-right:10px;">
                  <span class="label label-info" style="background-color: #AA0000">事业部</span>
                  <span class="label label-success" style="background-color: #FFD700">工厂/职能部门</span>
                  <%-- <span class="label label-warning" style="background-color: #FF8800">部门</span> --%>
                  <span class="label label-info" style="background-color: #55AA00">科室</span>
                  <span class="label label-primary" style="background-color: #00BBFF">车间</span>
                  <span class="label label-warning" style="background-color: #66009D">班组</span>
                  <span class="label label-success" style="background-color: #FF3EFF">小班组</span>
                </div>
				<div id="orgDiagram" style="position: relative;width: 100%;height:100%;" ></div>
				
			</div>
		</div>
	</div>
	<!-- Edit order start -->
<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;" >
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>菜单</h3>
    </div>
    <div class="modal-body">
    <div style="margin-top: -10px;">
						<ul class="nav nav-tabs" id="new_tab" role="tablist"
							style="height: 38px;">
							<li class="active"><a href="#new_task1" data-toggle="tab"
								style="font-size: 14px; color: #333">明细</a></li>
							<li><a href="#new_task1" data-toggle="tab"
								style="font-size: 14px; color: #333">子节点排序</a></li>
							<div class="tcdPageCode"></div>
						</ul>
				</div>
        <form id="  " class="form-horizontal">
            <div id="detailDiv">
            <div class="control-group">
                <label class="control-label" for="editFactory">&nbsp;上级部门</label>
                <div class="controls">
                    <select name="" id="parent_id" class="input-large carType">
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editFactory">&nbsp;组织层级</label>
                <div class="controls">
                    <select name="" id="org_type" class="input-large carType">
                    	<option value='0'>事业部</option>
                    	<option value='1'>工厂/职能部门</option>
                    	<!-- <option value='2'>部门</option> -->
                    	<option value='3'>科室</option>
                    	<option value='4'>车间</option>
                    	<option value='5'>班组</option>
                    	<option value='6'>小班组</option>
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editFactory">&nbsp;组织类型</label>
                <div class="controls">
                    <select name="" id="org_kind" class="input-large carType">
                    	<option value='1'>生产型</option>
                    	<option value='0'>管理型</option>
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">&nbsp;组织名称</label>
                <div class="controls">
					<input style="height: 30px;width:280px" type="text" class="input-medium revise carType" id="name" onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')"  onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4E00-\u9FA5]/g,''))"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editprocess">&nbsp;英文名称</label>
                <div class="controls">
                    
					<input style="height: 30px;width:280px" type="text" class="input-medium revise carType" id="name_en" onkeyup="value=value.replace(/[\W]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"/>
                </div>
            </div>
            
            <div class="control-group">
                <label class="control-label" for="newOrderCode">&nbsp;简称</label>
                <div class="controls">
					<input style="height: 30px;width:280px" type="text" class="input-large revise carType" placeholder="" id="org_code" />
                </div>
            </div>           
              
            <div class="control-group">
                <label class="control-label" for="">&nbsp;主管</label>
                <div class="controls">
                    <input style="height: 30px;width:280px" type="text" class="input-large revise carType" placeholder="" id="manager" />
                </div>
            </div>      
            <div class="control-group">
                <label class="control-label" for="">&nbsp;组织职责</label>
                <div class="controls">
                    <textarea style="width:280px" name="" id="responsibilities" class="input-medium carType"></textarea>
                </div>
            </div>
            </div>
            <div id="sortDiv" class="control-group" style="display:none;">
            	<table id='sortTable' class="exp-table table">
            		<thead class='exp-table'>
            			<tr>
            				<td>
            					操作
            				</td>
            				<!-- <td>
            					排序编号
            				</td> -->
            				<td>
            					简称
            				</td>
            				<td>
            					名称
            				</td>
            			</tr>
            		</thead>
            		<tbody class='exp-table'>
            			<!-- <tr>
            				<td>
            					1234
            				</td>
            			</tr> -->
            		</tbody>
            	</table>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btnEditConfirm">确认</button>
    </div>
</div>
<!-- Edit order End -->
	
</body>
</html>