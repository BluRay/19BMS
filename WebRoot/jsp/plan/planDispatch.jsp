<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 发车计划</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/plan/planDispatch.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="margin: 0 auto;">发车计划</legend>
				<!-- <div style="margin: 0 auto;"> -->
				<br />
				<div >
					<ul class="nav nav-pills"  style="height: 30px">
						<li class="active" id="welding_li"><a href="busDispatch!planListPage.action"
							>发车计划</a></li>
						<li  id="painting_li"><a href="busDispatch!busDoDispatch.action"
							 >发车交接</a></li>
						<li id="bottom_li"><a href="busDispatch!orderDispatch.action">随车附件</a></li>
						<li id="assembly_li"><a href="busDispatch!busDispatchQuery.action">发车查询</a></li>
					</ul>
				</div>
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>工厂</td>
							<td>车型</td>
							<td>订单</td>
							<td>发车时间</td>
							<td></td>
						</tr>
						<tr>
							<td><select name="" id="search_factory"
								class="input-medium carType">
							</select></td>
							<td><select name="" id="search_bus_type"
								class="input-medium carType">
							</select></td>
							<td><input type="text" id="search_order" placeholder="订单编号/订单名称"
								class="input-medium carType" /></td>
							<td><input class="input-small" style="width: 98px" placeholder="开始日期..."
								id="dispatch_date_start"
								onClick="WdatePicker({el:'dispatch_date_start',dateFmt:'yyyy-MM-dd'})" 
								type="text"> - <input class="input-small" style="width: 98px"
								placeholder="截止日期..." id="dispatch_date_end"
								onclick="WdatePicker({el:'dispatch_date_end',dateFmt:'yyyy-MM-dd'});"
								type="text"></td>
							<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;"></input> <input
								type="button" class="btn btn-success" id="btnAdd" value="新增"
								style="margin-left: 2px;"></input></td>

						</tr>
					</table>
				</form>
				<table id="tableResult" class="table table-condensed" style="display:none">
					<thead>
						<tr>
							<th>订单编号</th>
							<th>订单描述</th>
							<th>工厂</th>
							<th>车型</th>
							<th>订单数量</th>
							<th>计划发车数量</th>
							<th>预计发车日期</th>
							<th>计划已发车数量</th>
							<th>计划剩余数量</th>
							<th>有无自编号</th>
							<th>状态</th>
							<th></th>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
				<div id="pagination"
					class="pagination pagination-small pagination-right"
					style="display: none">
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
		
		<!-- NEW MODAL -->
		<div class="modal fade" id="newModal" tabindex="-1" role="dialog" 
			aria-hidden="true" style="display: none;width:650px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>新增发车计划</h3>
			</div>
			<div class="modal-body" >
				<form id="newPlanForm" class="form-horizontal" method="post" action="busDispatch!addPlan.action">
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;工厂</label>
						<div class="controls">
							<select class="input-medium" id="new_factory" name="plan.factory_id">
								<option value="">请选择</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;订单编号</label>
						<div class="controls">
							<input class="input-medium" type="text" id="new_orderNo" name="plan.order_no">
							<span class="text-info" id="new_ordeDesc"></span>
							<input type="hidden" id="new_orderId" name="plan.order_id">
						</div>
					</div>
					<div class="control-group" id="new_order_dispatch" style="display:none">
						<label class="control-label" for=""></label>
						<div class="controls">
							订单数量：<span class="text-info" id="new_order_qty"></span>&nbsp;&nbsp;
							已计划发车数量：<span class="text-info" id="new_plan_done_qty"></span>&nbsp;&nbsp;
							剩余数量：<span class="text-info" id="new_plan_left_qty"></span>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;计划发车数量</label>
						<div class="controls">
							<input type="text" class="input-medium" id="new_plan_num" name="plan.plan_dispatch_qty" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;计划发车时间</label>
						<div class="controls">
							<input type="text" class="input-medium" id="new_plan_date" name="plan.dispatch_date" onClick="WdatePicker({el:'new_plan_date',dateFmt:'yyyy-MM-dd'})"></input>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;自编号</label>
						<div class="controls">
							<input  name="plan.customer_number_flag" type="radio" value=1>有&nbsp;&nbsp;
							<input  name="plan.customer_number_flag" type="radio" value=0 checked/>无
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;邮件通知</label>
						<div class="controls">
							<textarea class="input-xlarge" rows=1  name="plan.email_addrs" id="new_email_addrs"></textarea>

						</div>
					</div>
					
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
				<button class="btn btn-primary" id="btnAddConfirm">保存</button>
			</div>
		</div>
		
			<!-- EDIT MODAL -->
		<div class="modal fade" id="editModal" tabindex="-1" role="dialog" 
			aria-hidden="true" style="display: none;width:650px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>编辑发车计划</h3>
			</div>
			<div class="modal-body" >
				<form id="editPlanForm" class="form-horizontal" method="post" action="busDispatch!updatePlan.action">
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;工厂</label>
						<div class="controls">
							<select class="input-medium" id="edit_factory" name="plan.factory_id" >
								<option value="">请选择</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;订单编号</label>
						<div class="controls">
							<input class="input-medium" type="text" id="edit_orderNo" name="plan.order_no">
							<span class="text-info" id="edit_ordeDesc"></span>
							<input type="hidden" id="edit_orderId" name="plan.order_id">
						</div>
					</div>
					<div class="control-group" id="edit_order_dispatch" style="display:none">
						<label class="control-label" for=""></label>
						<div class="controls">
							订单数量：<span class="text-info" id="edit_order_qty"></span>&nbsp;&nbsp;
							已计划发车数量：<span class="text-info" id="edit_plan_done_qty"></span>&nbsp;&nbsp;
							剩余数量：<span class="text-info" id="edit_plan_left_qty"></span>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;计划发车数量</label>
						<div class="controls">
							<input type="text" class="input-medium" id="edit_plan_num" name="plan.plan_dispatch_qty" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;计划发车时间</label>
						<div class="controls">
							<input type="text" class="input-medium" id="edit_plan_date" name="plan.dispatch_date" onClick="WdatePicker({el:'new_plan_date',dateFmt:'yyyy-MM-dd'})"></input>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;自编号</label>
						<div class="controls">
							<input name="plan.customer_number_flag" type="radio" value=1>有&nbsp;&nbsp;
							<input name="plan.customer_number_flag" type="radio" value=0 checked/>无
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;邮件通知</label>
						<div class="controls">
							<textarea class="input-xlarge" rows=1  name="plan.email_addrs" id="edit_email_addrs"></textarea>

						</div>
					</div>
					<input type="hidden" id="plan_id" name="plan.id">
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
				<button class="btn btn-primary" id="btnEditConfirm">保存</button>
			</div>
		</div>
</div>
</body>
</html>