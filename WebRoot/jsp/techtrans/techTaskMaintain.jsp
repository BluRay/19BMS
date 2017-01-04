<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>技改任务维护</title>
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
<script type="text/javascript" src="js/techtrans/techTaskMaintain.js"></script>
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
</style>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_techtrans_left.jsp"%>
	<!-- Tab panes -->
	<div class="content-wrapper " unselectable="on" onselectstart="return false;" style="-moz-user-select:-moz-none;">
	<div id="bodymain" class="offhead">
	<div id="bodyright" class="offset2">
	<legend >技改任务维护</legend>
	<div id="taskFollow">
				<form id="form" class="well form-search">
					<table>
						<thead>
								<tr>
									<td>技改单编号</td>
									<td>任务内容</td>
									<td>技改单日期</td>
									<td>状态</td>
								</tr>
								<tr>
									
									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入技改单编号..."  id="tech_order_no" ></td>
									<td><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入任务内容..."  id="task_content" ></td>
									
									<td><input name="tech_date_start" id="tech_date_start" class="Wdate" style="height: 30px; background-color: white; width: 120px" onfocus="javascript:WdatePicker()"  type="text"> 至 
										<input name="tech_date_end" id="tech_date_end" class="Wdate" onfocus="javascript:WdatePicker()" style="height: 30px; background-color: white; width: 120px"  type="text">										
									</td>
									<td>
										<select  class="input-medium carType" id="status" style="width:80px" >
											<option value="">全部</option>
											<option value="已创建">已创建</option>
											<option value="已分配">已分配</option>
											<option value="已评估">已评估</option>
											<option value="已完成">已完成</option>
										</select>
									    <input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
									    <input type="button" class="btn btn-success" id="btnAdd" value="新增" style="margin-left: 2px;"></input></td>
								</tr>
						</thead>
						<tbody>
						</tbody>
				 </table>
				  </form>
				 <table id="tableTaskFollow" class="table table-condensed" style="font-size: 12px;">
					 <thead>
						<thead>
							<tr>
								
								<th>技改任务</th>
								<th>变更单类型</th>
								<th>技改单号</th>
								<th>变更单附件</th>
								<th>技改单日期</th>
								<th>责任单位</th>
								<th>重大变更</th>
								<th>顾客变更</th>
								<th>顾客变更单附件</th>
								<th>重复变更</th>
								<th>技改类型</th>								
								
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
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
		 </div>  
</div>
</div>
</div>
<div style="display: none;position:fixed;z-index:999;margin-top:150px;margin-left:500px" class="divLoading" >
        <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
</div> 

<!--添加-->
			<div class="modal fade" id="mtaModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none; width: 800px;max-height:600px;left:40%">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>技改工时维护</h3>
					</div>
					<div class="modal-body">
						<div class="control-group" >
							<table style="line-height:30px">
								<tr>
								<td width="140px" style="text-align:right">技改单编号：</td>								
								<td id="orderNo"></td>
								</tr>
								<tr>
								<td width="140px" style="text-align:right">技改任务：</td>								
								<td id="task"></td>	
								</tr>
							</table>
						</div>
						
						<div class="control-group">
							<table >
								<tr>
								<td width="60px" style="text-align:right">工厂：</td>
								<td width="160px">
									<select id="factory" class="input-medium">
									</select>
								</td>
								<td width="80px" style="text-align:right">车间：</td>
								<td width="160px">
									<select id="workshop" class="input-medium">
									</select>
								</td>
								<td></td>
								<td></td>
								</tr>
								<tr>
								<td width="60px" style="text-align:right">班组：</td>
								<td width="160px">
									<select id="group" class="input-medium">
									<option value=''>请选择</option> 
									</select>
								</td>
								<td width="80px" style="text-align:right">小班组：</td>
								<td width="160px">
									<select id="subgroup" class="input-medium">
								 	<option value=''>请选择</option> 
									</select>
								</td>
								<td width="80px" style="text-align:right">操作日期：</td>
								<td>
									<input type="text" id="mta_wdate" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:new Date()})"/>
								</td>
								</tr>
							</table>
						</div>
						<div><div style="width: 200px; display: inline-table;"><h5 class="section-head">技改工时</h5></div><span style="float:right;margin: 10px 20px;color:green" class="read_hours"></span></div>
						<div>
							<table id="table_workhour" style="margin-left:0px;margin-top:0px;width:100%;text-align:left;" class="exp-table table">
							<thead style="background-color: rgb(225, 234, 240)">
							<tr>
							<td style="width: 30px;"><i class="fa fa-plus addWorkhour" style="cursor: pointer;color: blue;"></i></td>
							<td >工号</td>
							<td >姓名</td>
							<td >岗位</td>
							<td >技改工时</td>
							<td >小班组</td>
							<td >班组</td>
							<td >车间</td>
							<td >工厂</td>
							</tr>
							</thead>
							<tbody class="exp-table" id="tb_workhour">
							</tbody>
							</table>
						</div>
						
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnMtaSave">保存</button>
					</div>
				</div>
				
				<div class="modal fade" id="editModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none; width: 800px;max-height:600px;left:40%">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>技改工时修改</h3>
					</div>
					<div class="modal-body">
						<div class="control-group" >
							<table style="line-height:30px" >
								<tr>
								<td width="140px" style="text-align:right">技改单编号：</td>								
								<td id="edit_orderNo"></td>
								</tr>
								<tr>
								<td width="140px" style="text-align:right">技改任务：</td>								
								<td id="edit_task"></td>	
								</tr>
							</table>
						</div>
						
						<div class="control-group">
							<table class="form-search">
								<tr>
								<td width="60px" style="text-align:right">工号：</td>
								<td width="160px">
									<input type="text" class="input-medium" id="edit_cardNumber"/>
								</td>
								<td width="80px" style="text-align:right">操作日期：</td>
								<td width="160px">
									<input type="text" class="input-medium" id="edit_workDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:new Date()})"/>
								</td>
								<td><input type="button" class="btn btn-primary"
									id="btnSwhQuery" value="查询" style="margin-left: 2px;"></input></td>
								<td></td>
								</tr>								
							</table>
						</div>
						<div><div style="width: 200px; display: inline-table;"><h5 class="section-head">技改工时</h5></div><span style="float:right;margin: 10px 20px;color:green" class="read_hours"></span></div>
						<div>
							<table style="margin-left:0px;width: 100%;"class="exp-table table" id="workhour_tb">
							<thead style="background-color: rgb(225, 234, 240)">
							<tr>
							<td ><input type="checkbox" id="checkall"></td>
							<td >工号</td>
							<td >姓名</td>
							<td >岗位</td>
							<td >技改工时</td>
							<td >小班组</td>
							<td >班组</td>
							<td >车间</td>
							<td >工厂</td>
							<td>状态</td>
							<td >操作日期</td>
							</tr>
							</thead>
							<tbody class="exp-table" id="workhour_list">
							</tbody>
							</table>
						</div>
						
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-danger" id="btnSwhDelete">删除</button>
						<button class="btn btn-primary" id="btnEditSave">保存</button>
					</div>
				</div>
</body>
</html>