<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%long _systime= new java.util.Date().getTime();%>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 技改任务分配</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="js/jquery-ui-timepicker-addon.zh-CN.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/techtrans/taskAssign.js?timestamp=<%=_systime%>"></script>
<script type="text/javascript" src="js/jsrender.min.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<link type="text/css" rel="stylesheet" href="js/datePicker/skin/WdatePicker.css">
<style type="text/css">
.section-head {
  border-left: 7px solid #000;
  padding-left: 10px;
  margin-top: 25px;
  margin-bottom: 20px;
}
.glyphicon{
	position:relative;
	top:1px;
	display:inline-block;
	font-family:'Glyphicons Halflings';
	font-style:normal;
	font-weight:400;
	line-height:1;
	-webkit-font-smoothing:antialiased;
	-moz-osx-font-smoothing:grayscale
}
.glyphicon-plus:before{
	content:"\2b"
}
*::before, *::after {
    box-sizing: border-box;
}
.btn-xs, .btn-group-xs > .btn {
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
.offlineFont{
	color:red
}
.input[type="text"]{
	height: 30px;
}
.modal-body .control-group {
	margin-bottom: 10px;
}
.form-horizontal .control-label{
	width:100px;
	padding-top: 0px;
}
.form-horizontal .controls{
	margin-left: 110px;
}
</style>
</head>
<body  >
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_techtrans_left.jsp"%>
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead"><!-- Main -->
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<div>
				<legend >技改任务分配</legend>
				<div >
					<form id="form" class="well form-search">
						<table>
							<tr>								
								<td>订单</td>
								<td>工厂</td>
								<td>技改单编号</td>
								<td>技改任务</td>
								<td>技改单日期</td>
								<td>状态</td>
							</tr>
							<tr>
								<td><input type="text" style="height: 30px;width:90px" class="input-medium revise" placeholder="请输入订单..." id="order_no" /></td>
								<td>
									<select name="" id="search_factory" style="width:100px" class="input-medium carType"></select>
								</td>
								<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入技改单编号..."  id="tech_order_no" /></td>
								<td><input type="text" style="height: 30px;" class="input-medium revise"  id="tech_task_content" /></td>
								<td><input name="startDate" id="startDate" class="Wdate" style="height: 30px; background-color: white; width: 120px" onfocus="javascript:WdatePicker()"  type="text"> 至 
									<input name="endDate" id="endDate" class="Wdate" onfocus="javascript:WdatePicker()" style="height: 30px; background-color: white; width: 120px"  type="text">										
								</td>
								<td>
									<select  class="input-medium carType" id="status" style="width:80px">
										<option value="全部">全部</option>
										<option value="已创建" selected>已创建</option>
										<option value="已分配">已分配</option>
										<option value="已评估">已评估</option>
										<option value="已完成">已完成</option>
									</select>
									&nbsp;&nbsp;
									<input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
								</td>
							</tr>
						</table>
					</form>
					<div id="pagination" class="pagination pagination-small pagination-right" style="display: none">
						<ul>
							<li id="export">
								<a href="">总共<span total="" id="total"></span>条记录</a>
							</li>
						</ul>
						<ul>
							<li id="first"><a href="#">«</a></li>
							<li id="pre" class="prePage"><a href="#">&lt;</a></li>
							<li id="cur" class="active curPage" page=""><a href="#"></a></li>
							<li id="next" class="nextPage"><a href="#">&gt;</a></li>
							<li id="last"><a href="#">»</a></li>
						</ul>
					</div>	
					<table id="techTaskList" class="table table-bordered table-striped" style="font-size: 12px;">
						<thead>
							<tr>
								<th width=250px;>技改任务</th>
								<th >技改单编号</th>
								<th>技改日期</th>
								<th>切换方式</th>
								<th width=100px;>订单</th>
								<th>工厂</th>
								<th>切换节点</th>
								<th width=200px;>技改台数</th>
								<th width=40px;></th>
							</tr>
						</thead>
						<tbody >
						</tbody>
					</table>
								
				</div>
			</div>
			
		<div class="modal" id="assessModal" tabindex="-1" role="dialog"
			style="display: none; width: 650px; left: 48%; height: 600px; top: 20px">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h4 id="modal_title">技改任务分配</h4>
			</div>
			<div class="modal-body" style="height: 550px;max-height: 500px;">
				<form id="task_assess" class="form-horizontal" >
					<div class="control-group">
						<label class="control-label" for="" style="font-weight:bold">技改任务：</label>
						<div class="controls">
							<span id="v_task_content"></span>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="" style="font-weight:bold">技改单编号：</label>
						<div class="controls" >
							<span id="v_tech_order_no" ></span>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="" style="font-weight:bold">切换方式：</label>
						<div class="controls">
							<input checked name="switch_mode" value="全部切换" type="radio"><span>全部切换&nbsp;&nbsp;</span>
							<input name="switch_mode" value="节点前切换" type="radio"><span>节点前切换&nbsp;&nbsp;</span>
							<input name="switch_mode" value="节点间切换" type="radio"><span>节点间切换&nbsp;&nbsp;</span>
						</div>
					</div>
					<div id="div_switch_node" class="control-group" style="display:none">
						<label class="control-label" for="" style="font-weight:bold">切换节点：</label>
						<div class="controls">
							<select id="switch_node" class="input-medium">
<!-- 								<option value='自制件'>自制件</option>
								<option value='部件'>部件</option> -->
								<option value='焊装'>焊装</option>
								<option value='玻璃钢'>玻璃钢</option>
								<option value='涂装'>涂装</option>
								<option value='底盘'>底盘</option>
								<option value='总装'>总装</option>
								<option value='检测线'>检测线</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="" style="font-weight:bold">技改实施范围：</label>
						<div class="controls">
							<div style="width: 100%">
							<ul class="nav nav-tabs" id="new_tab" role="tablist">
								<li class="active"><a href="#new_task1" data-toggle="tab"
								style="font-size: 14px; color: #333">订单1</a></li>
								<li><i id="add_tech_detail" class="fa fa-plus"
								style="cursor: pointer; padding-top: 12px; color: blue;"></i></li>							
							</ul>
							</div>
							<div class="tab-content" id="new_accordion">
								<div class="tab-pane active" role="tabpanel" id="new_task1">
								<div class="panel panel-default">
								<div id="collapseTask1" class="panel-collapse collapse in" role="tabpanel">
									<div class="panel-body">
									<div>
										<span>订单：</span>
										<input type="text" class="assess_order_no" class="input-medium">
									</div>
									<div>
										<span>长沙工厂</span>
										<input style="height:30px" name="new_tecn_flag" class="input-medium" id="new_tecn_flag" type="checkbox">
									</div>
									<div>
									<table id="tb_factory_1" class="table table-bordered table-striped" style="margin-bottom: 0px;">
										<tr>
										<td>自制件</td>
										<td>部件</td>
										<td>焊装</td>
										<td>玻璃钢</td>
										<td>涂装</td>
										<td>底盘</td>
										<td>总装</td>
										<td>检测线</td>
										</tr>									
										<tr>
										<td></td>
										<td></td>
										<td>100</td>
										<td>80</td>
										<td>50</td>
										<td>50</td>
										<td>50</td>
										<td>20</td>
										</tr>	
									</table>
									</div>
									
									</div>									
								</div>	
								</div>
								</div>
							</div>
							
						</div>
					</div>
					
				</form>				
			</div>
			<div class="modal-footer" style="margin-bottom:0px">
				<button class="btn" data-dismiss="modal" id="btnClose"
					aria-hidden="true">关闭</button>
				<button class="btn btn-primary" id="btnEditConfirm">确认</button>
			</div>			
		</div>
			
		</div>
	</div>
	
</div>
</body>
</html>