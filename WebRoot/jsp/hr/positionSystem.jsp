<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>岗位体系</title>
<!-- Le styles -->



<link href="css/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">

<link href="css/org/1/positionSystem.css" rel="stylesheet">

<link rel="stylesheet" href="js/jquery/ui-lightness/jquery-ui-1.10.2.custom.css" />

 <style type="text/css">
.navbar-inverse {
    background-color: #fff;
    border-color: #fff;
}
.navbar {
    min-height: 30px;
}
#positionLevel {
    margin-left: 15px;
    margin-top: 24px;
}
.list-group {
    margin-left: 0;
}
.btn-group{
    float: right;
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

<script type="text/javascript" src="js/jsrender.min.js"></script>

<!-- add by wuxiao -->
<script type="text/javascript" src="js/hr/positionSystem.js"></script>

</head>
<body style="overflow-y:hidden">
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	<!-- main -->
	
	<div id="bodyMain" class="body-main">
        <div class="container" style="margin-top:45px">
<!--             <legend id="leg">岗位体系</legend> -->
            <div class="row">
              <div class="col-sm-8" style="height:560px">
                <div id="PyramidSelection" class="panel panel-default" style="height:560px;margin-top: 5px;">
                  <div class="panel-heading">
                    <span class="current-position-name" style="font-size:17px">发展渠道</span>
                  </div>
                  <div id="panelPositionPyramid" class="panel-body">

                    <div class="row">
                      <div class="col-sm-2">
                        <div id="positionLevel">
                          <div class="position-level" level="1">B</div>
                          <div class="position-level" level="2">C</div>
                          <div class="position-level" level="3">D</div>
                          <div class="position-level" level="4">E</div>
                          <div class="position-level" level="5">F</div>
                          <div class="position-level" level="6">G</div>
                          <div class="position-level" level="7">H</div>
                          <div class="position-level" level="8">I</div>
                        </div>
                      </div>
                      <div class="col-sm-10">
                        <div id="channelLabels" class="pull-right">
                          <h4><span class="label label-primary">管理</span></h4>
                          <h4><span class="label label-success">技术专家</span></h4>
                          <h4><span class="label label-warning">技能</span></h4>
                        </div>
                        <div id="positionPyramid">
                          <a href="javascript:;" class="pyramid-grade grade-mg" level="1" key="1"><span class="pyramid-grade-text">总经理</span></a>
                          <a href="javascript:;" class="pyramid-grade grade-chief" level="2" key="3"><span class="pyramid-grade-text">厂长</span></a>
                          <a href="javascript:;" class="pyramid-grade grade-high-engineer" level="2"  key="2"><span class="pyramid-grade-text line-2">经理</span></a>
                          <a href="javascript:;" class="pyramid-grade grade-engineer" level="3"  key="4"><span class="pyramid-grade-text">科长</span></a>
                          <a href="javascript:;" class="pyramid-grade grade-coach grade-coach-3" level="3"  key="5"><span class="pyramid-grade-text">车间主任</span></a>
                          <a href="javascript:;" class="pyramid-grade grade-engineer-as" level="4"  key="6"><span class="pyramid-grade-text">主任科员</span></a>
                          <a href="javascript:;" class="pyramid-grade grade-coach grade-coach-2" level="4" key="7"><span class="pyramid-grade-text">高级工程师</span></a>
                          <a href="javascript:;" class="pyramid-grade grade-technician" level="5"  key="8"><span class="pyramid-grade-text">科员</span></a>
                          <a href="javascript:;" class="pyramid-grade grade-mechanic" level="5" key="9"><span class="pyramid-grade-text">工程师</span></a>
                           <a href="javascript:;" class="pyramid-grade grade-coach grade-coach-1" level="6" key="10"><span class="pyramid-grade-text">管理员</span></a>
                            <a href="javascript:;" class="pyramid-grade grade-worker" level="6" key="11"><span class="pyramid-grade-text">助理工程师</span></a>
                            <a href="javascript:;" class="pyramid-grade grade-last1" level="7" key="12"><span class="pyramid-grade-text">技工</span></a>
                           <a href="javascript:;" class="pyramid-grade grade-last2" level="7" key="13"><span class="pyramid-grade-text">辅助工</span></a>
                            <a href="javascript:;" class="pyramid-grade grade-last3" level="8" key="14"><span class="pyramid-grade-text">车间辅助工</span></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-2">
                <div class="panel panel-default" style="margin-top: 5px; font-size:12px;">
                  <div class="panel-heading" style="font-size:17px;">
                    <div class="btn-group btn-group-xs" style="margin-top:3px">
                      <button id="btnAdd" class="btn btn-link btn-xs" title="添加岗位" btn-name="add" ><i class="fa fa-plus fa-lg"></i></button>
                    </div>
                    <span class="current-position-name" >岗位</span>
                  </div>
                  <ul id="positionList" class="list-group" style=" max-height: 517px; overflow: auto;">
                  </ul>
                  <script id="tmplPositionList" type="text/x-jsrander">
                    <li class="list-group-item" data-position-id={{:id}}>
                      <div class="btn-group btn-group-xs">
                        <button class="btn btn-link btn-xs" title="编辑" btn-name="edit"><i class="fa fa-edit fa-lg"></i></button>
                        <button class="btn btn-link btn-xs" title="移除" btn-name="remove" data-display-name={{:job_name}}><i class="fa fa-trash-o fa-lg"></i></button>
                      </div>
                      {{:job_name}}
                    </li>
                  </script>
                </div>
              </div>
            </div>
        </div>
    </div>
<!-- Edit order start -->
<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;height:505px;" >
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>菜单</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
            <h4>&nbsp;&nbsp;&nbsp;&nbsp;基本信息</h4>
            <div class="control-group">
                <label class="control-label" for="editFactory">&nbsp;上级岗位</label>
                <div class="controls">
                    <select name="" id="parent_job_id" class="input-large carType">
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editFactory">&nbsp;岗位编号</label>
                <div class="controls">
                    <!--<select name="" id="org_type" class="input-large carType">
                    	<option value='0'>事业部</option>
                    	<option value='1'>部门</option>
                    	<option value='2'>工厂</option>
                    	<option value='3'>科室</option>
                    	<option value='4'>车间</option>
                    	<option value='5'>班组</option>
                    	<option value='6'>小班组</option>
					</select>-->
					<input style="height: 30px;width:280px" type="text" class="input-medium revise carType" id="job_no" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editFactory">&nbsp;岗位等级</label>
                <div class="controls">
                    <select name="" id="job_grade_id" class="input-large carType">
                    	<!-- <option value='0'>管理型</option>
                    	<option value='1'>技术型</option>
                    	<option value='2'>技能型</option>
                    	<option value='3'>操作型</option> -->
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">&nbsp;岗位名称</label>
                <div class="controls">
					<input style="height: 30px;width:280px" type="text" class="input-medium revise carType" id="job_name" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editprocess">&nbsp;岗位级别</label>
                <div class="controls">
                    <select name="" id="job_level" class="input-large carType">
                    	<option value='B'>B</option>
                    	<option value='C'>C</option>
                    	<option value='D'>D</option>
                    	<option value='E'>E</option>
                    	<option value='F'>F</option>
                    	<option value='G'>G</option>
                    	<option value='H'>H</option>
                    	<option value='I'>I</option>
					</select>
                </div>
            </div>
            <h4>&nbsp;&nbsp;&nbsp;&nbsp;岗位说明</h4>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">&nbsp;年龄限制</label>
                <div class="controls">
					<input style="height: 30px;width:280px" type="text" class="input-large revise carType" placeholder="" id="age" />
                </div>
            </div>           
              
            <div class="control-group">
                <label class="control-label" for="">&nbsp;性别要求</label>
                <div class="controls">
                    <select name="" id="sax" class="input-large carType">
                    	<option value='0'>不限</option>
                    	<option value='1'>男</option>
                    	<option value='2'>女</option>
					</select>
                </div>
            </div>   
            <div class="control-group">
                <label class="control-label" for="">&nbsp;级别限制</label>
                <div class="controls">
                    <select name="" id="level_limit_min" class="input-small carType">
                    	<option value='B'>B</option>
                    	<option value='C'>C</option>
                    	<option value='D'>D</option>
                    	<option value='E'>E</option>
                    	<option value='F'>F</option>
                    	<option value='G'>G</option>
                    	<option value='H'>H</option>
                    	<option value='I'>I</option>
					</select>&nbsp;&nbsp;~&nbsp;&nbsp;
					<select name="" id="level_limit_max" class="input-small carType">
                    	<option value='B'>B</option>
                    	<option value='C'>C</option>
                    	<option value='D'>D</option>
                    	<option value='E'>E</option>
                    	<option value='F'>F</option>
                    	<option value='G'>G</option>
                    	<option value='H'>H</option>
                    	<option value='I'>I</option>
					</select>
                </div>
            </div>     
            <div class="control-group">
                <label class="control-label" for="">&nbsp;最低学历</label>
                <div class="controls">
                    <select name="" id="minimum_education" class="input-large carType">
                    	<option value='0'>不限</option>
                    	<option value='1'>小学</option>
                    	<option value='2'>初中</option>
                    	<option value='3'>高中</option>
                    	<option value='4'>中专</option>
                    	<option value='5'>大专</option>
                    	<option value='6'>本科</option>
                    	<option value='7'>硕士</option>
                    	<option value='8'>博士</option>
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">&nbsp;专业要求</label>
                <div class="controls">
                    <input style="height: 30px;width:280px" type="text" class="input-large revise carType" placeholder="" id="specialty" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">&nbsp;外语要求</label>
                <div class="controls">
                    <input style="height: 30px;width:280px" type="text" class="input-large revise carType" placeholder="" id="foreign_language" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">&nbsp;工作经验</label>
                <div class="controls">
                    <select name="" id="work_experience" class="input-large carType">
                    	<option value='0'>不限</option>
                    	<option value='1'>一年</option>
                    	<option value='2'>两年</option>
                    	<option value='3'>三年</option>
                    	<option value='4'>四年</option>
                    	<option value='5'>五年</option>
                    	
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">&nbsp;基本职责</label>
                <div class="controls">
                    <textarea style="width:280px" name="" id="basic_besponsibilit" class="input-medium carType"></textarea>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">&nbsp;任职资格</label>
                <div class="controls">
                    <textarea style="width:280px" name="" id="requirements" class="input-medium carType"></textarea>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">&nbsp;具备技能/能力</label>
                <div class="controls">
                    <textarea style="width:280px" name="" id="skill_and_capability" class="input-medium carType"></textarea>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">&nbsp;上岗所需培训</label>
                <div class="controls">
                    <textarea style="width:280px" name="" id="required_train" class="input-medium carType"></textarea>
                </div>
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