<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>技改工时评估</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<link type="text/css" rel="stylesheet" href="js/datePicker/skin/WdatePicker.css">
<script type="text/javascript" src="js/techtrans/techWorkHourEstimate.js"></script>
<style type="text/css">
.section-head {
	border-left: 7px solid #000;
	padding-left: 10px;
	margin-top: 25px;
	margin-bottom: 20px;
}

.glyphicon {
	position: relative;
	top: 1px;
	display: inline-block;
	font-family: 'Glyphicons Halflings';
	font-style: normal;
	font-weight: 400;
	line-height: 1;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale
}

.glyphicon-plus:before {
	content: "\2b"
}

*::before, *::after {
	box-sizing: border-box;
}

.btn-xs, .btn-group-xs>.btn {
	padding: 1px 5px;
	font-size: 14px;
	line-height: 2.5;
	border-radius: 3px;
}

.btn-success {
	color: #FFF;
	background-color: #5CB85C;
	border-color: #4CAE4C;
}

.offlineFont {
	color: red
}

.input[type="text"] {
	height: 30px;
}

.newTable td {
	height: 40px;
}
.editTable td {
	height: 40px;
}
</style>
</head>
<body>
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_techtask_left.jsp"%>
	<!-- Tab panes -->
	<div class="content-wrapper " unselectable="on" onselectstart="return false;" style="-moz-user-select: -moz-none;">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<legend>技改工时评估</legend>
				<div id="taskFollow">
					<form id="form" class="form-search">
						<table>
							<thead>
								<tr>
									<td>订单</td>
									<td>工厂</td>
									<td>技改单编号</td>
									<td>任务内容</td>
									<td>技改单日期</td>
									<td>状态</td>
								</tr>
								<tr>
									<td><input type="text" style="height: 30px;width:90px" class="input-medium revise" placeholder="请输入订单..." id="order_no" /></td>
									<td>
									<select name="" id="factory" style="width:100px" class="input-medium carType"></select>
									</td>
									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入技改单编号..." id="tech_order_no"></td>
									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入任务内容..." id="task_content"></td>

									<td><input name="tech_date_start" id="tech_date_start" class="Wdate" style="height: 30px; background-color: white; width: 120px" onfocus="javascript:WdatePicker()" type="text"> 至 <input name="tech_date_end" id="tech_date_end" class="Wdate" onfocus="javascript:WdatePicker()" style="height: 30px; background-color: white; width: 120px" type="text"></td>
									<td><select class="input-medium carType" id="status" style="width: 80px">
											<option value="">全部</option>
											<option value="已创建">已创建</option>
											<option value="已分配">已分配</option>
											<option value="已评估">已评估</option>
											<option value="已完成">已完成</option>
									</select> <input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input> 
									</td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</form>
					<table id="tableTaskFollow" class="table table-bordered table-striped" style="font-size: 12px;">
						
						<thead>
							<tr>
								<th>技改任务</th>
								<th>变更单类型</th>
								<th>技改单号</th>
								<th>技改单日期</th>
								<th>订单</th>
								<th>工厂</th>
								
								<th>单车总工时</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
					<div id="pagination" class="pagination pagination-small pagination-right" style="display: none">
						<ul>
							<li id="export"><a href="">总共<span total="" id="total"></span>条记录
							</a></li>
						</ul>
						<ul>
							<li id="first"><a href="#">«</a></li>
							<li id="pre" class="prePage"><a href="#">&lt;</a></li>
							<li id="cur" class="active curPage" page=""><a href="#"></a></li>
							<li id="next" class="nextPage"><a href="#">&gt;</a></li>
							<li id="last"><a href="#">»</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div style="display: none; position: fixed; z-index: 999; margin-top: 150px; margin-left: 500px" class="divLoading">
		<span><i class="fa fa-spinner fa-spin fa-4x" style="height: 1em;"></i></span>
	</div>

<div class="modal" id="configModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:600px;display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 id="editModal_title">技改任务工时分配</h4>
    </div>
    <div class="modal-body">
    <form id="configForm"  method="post" class="form-horizontal" action="techTask!editTechWorkHourEstimate.action">
    	<table id="tableDepartment" class="table table-condensed" >
            <thead>
                <tr>
                	<!-- <th>技改工厂</th> -->
                    <th>车间</th>
                    <th align="center">单车工时</th>
                    <th>单位</th>
                </tr>
            </thead>
            <tbody id="techTimeConfig_parameters">
            </tbody>
        </table>
        <input type="text" style="display:none;" id="id" name="id"></input>
        <input type="text" style="display:none;" id="tech_task_id" name="tech_task_id"></input>
        <input type="text" style="display:none;" id="tech_list" name="tech_list"></input>
    </form>
    </div>
    <div class="modal-footer">
    	<div style="margin-left: 200px; display: inline;font-weight:bold;float:left">总工时：<span id="config_totalhour"></span><span>H</span></div>
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btnConfigConfirm" >保存</button> 
        <!-- <button class="btn btn-primary" id="btnConfigCancel" >取消</button>  -->
    </div>
</div>
</body>
</html>