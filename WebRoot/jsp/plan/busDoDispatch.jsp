<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 发车交接</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<!-- <link rel="stylesheet"
	href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">  -->
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/plan/busDoDispatch.js"></script>
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
				<div>
					<ul class="nav nav-pills" style="height: 30px">
						<li id="welding_li"><a href="busDispatch!planListPage.action">发车计划</a></li>
						<li class="active" id="painting_li"><a
							href="busDispatch!busDoDispatch.action">发车交接</a></li>
						<li id="bottom_li"><a href="busDispatch!orderDispatch.action">随车附件</a></li>
						<li id="assembly_li"><a href="busDispatch!busDispatchQuery.action">发车查询</a></li>
					</ul>
				</div>
				<table id="tableResult" class="table table-condensed">
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

				<form id="busNoForm" class="well form-search" style="display: none">
					<label>车号：</label><input type="text" id="busNo"
						class="input-medium"> <!-- <input type="button" id="reset"
						class="btn" value="清空"> --> <input type="button"
						id="dispatchBtn" class="btn btn-success" value="确认交接" disabled>请输入车号后回车
				</form>
				<form id="kdForm" class="well form-search" style="display: none">
					<label>自编号：</label>
					<input type="text" id="customerType"
						class="input-small" disabled="disabled"> -
					<input type="text" id="customerCode"
						class="input-small" disabled="disabled"> _
					<input type="text" id="customerNoStart"
						class="input-small" onkeyup="value=value.replace(/[^\d]/g,'')" onpaste="return false;" placeholder="起始流水号..."> _
					<input type="text" id="customerNoEnd"
						class="input-small" onkeyup="value=value.replace(/[^\d]/g,'')" onpaste="return false;" placeholder="结束流水号..."> 
						 <input type="button"
						id="dispatchCustomerBtn" class="btn btn-success" value="确认交接" >
				</form>
				<form action="" method="post" id="dispatchForm"
					style="display: none">
					<table id="dispatchDetail" class="table table-bordered">
						<thead>
							<tr>
								<td>车号</td>
								<td>VIN号</td>
								<td>电机号(左/右）</td>
								<td>自编号</td>
								<td><span style="color:red">*</span>3C编号</td>
								<td>随车附件、3C认证标贴</td>
								<td></td>
							</tr>
						</thead>
						<tbody>

						</tbody>
					</table>
				</form>

				<div class="modal fade" id="patchModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none; width: 780px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>单车随车资料</h3>
					</div>
					<div class="modal-body">
						<div><i class="fa fa-plus" style="cursor: pointer"></i></div>
						<table class="table" id="toollist" style="text-align: center">
							<!-- <tr>
								<td ><label><input name="offline_checkbox" type="checkbox">机械钥匙<input style="width:50px;height:25px;text-align:center">份</label></td>
								<td><label><input name="offline_checkbox" type="checkbox">智能钥匙<input style="width:50px;height:25px;text-align:center">份</label></td>
								<td><label><input name="offline_checkbox" type="checkbox">充电器<input style="width:50px;height:25px;text-align:center">份</label></td>
								<td><label><input name="offline_checkbox" type="checkbox">说明书<input style="width:50px;height:25px;text-align:center">份</label></td>
							</tr>
							<tr>
								<td ><label><input name="offline_checkbox" type="checkbox">机械钥匙<input style="width:50px;height:25px;text-align:center">份</label></td>
								<td><label><input name="offline_checkbox" type="checkbox">智能钥匙<input style="width:50px;height:25px;text-align:center">份</label></td>
								<td><label><input name="offline_checkbox" type="checkbox">充电器<input style="width:50px;height:25px;text-align:center">份</label></td>
								<td><label><input name="offline_checkbox" type="checkbox">说明书<input style="width:50px;height:25px;text-align:center">份</label></td>
							</tr> -->
						</table>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnConfirm">确定</button>
					</div>
				</div>

				<!-- 刷厂牌modal -->
				<div class="modal fade" id="dispatchModal" tabindex="-1"
					role="dialog" aria-hidden="true"
					style="display: none; width: 400px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>请刷厂牌</h3>
					</div>
					<div class="modal-body">
						<form class="form-horizontal">
						<div class="control-group ">
							<label class="control-label" style="width: 120px">工号：</label>
							<div class="controls" style="margin-left: 80px">
								<input type="text" class="input-medium" id="workcardid"/>
							</div>
							<label class="control-label" style="width: 120px">姓名：</label>
							<div class="controls" style="margin-left: 80px">
								<input type="text" class="input-medium" id="receiver"/>
							</div>
							<label class="control-label" style="width: 120px">部门：</label>
							<div class="controls" style="margin-left: 80px">
								<input type="text" class="input-medium" id="department"/>
							</div>
						</div>
						</form>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnDispatchConfirm">确定</button>
					</div>
				</div>
				
				<div class="modal fade" id="dispatchKDModal" tabindex="-1"
					role="dialog" aria-hidden="true"
					style="display: none; width: 400px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>请刷厂牌</h3>
					</div>
					<div class="modal-body">
						<form class="form-horizontal">
						<div class="control-group ">
							<label class="control-label" style="width: 120px">工号：</label>
							<div class="controls" style="margin-left: 80px">
								<input type="text" class="input-medium" id="workcardidKD"/>
							</div>
							<label class="control-label" style="width: 120px">姓名：</label>
							<div class="controls" style="margin-left: 80px">
								<input type="text" class="input-medium" id="receiverKD"/>
							</div>
							<label class="control-label" style="width: 120px">部门：</label>
							<div class="controls" style="margin-left: 80px">
								<input type="text" class="input-medium" id="departmentKD"/>
							</div>
						</div>
						</form>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnDispatchKDConfirm">确定</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>