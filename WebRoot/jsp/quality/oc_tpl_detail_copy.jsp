<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>订单配置与一致性记录表模板复制</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/quality/oc_tpl_detail_copy.js"></script>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="/jsp/common/general_quality_left.jsp"%>
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>车型</td>
							<td>订单</td>
							<td>配置</td>
							<td>备注</td>
							<td></td>
						</tr>
						<tr>
							<td><select name="" id="input_busType"
								class="input-medium carType">
								<option value=0></option>
							</select></td>
							<td><select name="" id="input_order"
								class="input-medium carType">
							</select></td>
							<td><select name="" id="input_config"
								class="input-medium carType">
							</select></td>
							<td><input type="text" class="input-medium revise"
								id="input_memo" /></td>
							<td><input type="button" class="btn btn-success"
								id="btnSaveTplDetail" value="保存" style="margin-left: 2px;"></input></td>
						</tr>
					</table>
				</form>
				<input type="hidden" id="tplHeaderId"
					value="<s:property value="tplHeader.id" />">
				<div role="tabpanel">
					<!-- Nav tabs -->
					<ul class="nav nav-pills" role="tablist" style="height: 30px">
						<li role="presentation" class="active"><a href="#welding"
							aria-controls="welding" role="tab" data-toggle="tab"
							onclick="generateTable('焊装')">焊装</a></li>
						<li role="presentation"><a href="#painting"
							aria-controls="painting" role="tab" data-toggle="tab"
							onclick="generateTable('涂装')">涂装</a></li>
						<li role="presentation"><a href="#bottom"
							aria-controls="bottom" role="tab" data-toggle="tab"
							onclick="generateTable('底盘')">底盘</a></li>
						<li role="presentation"><a href="#assembly"
							aria-controls="assembly" role="tab" data-toggle="tab"
							onclick="generateTable('总装')">总装</a></li>
					</ul>
					<!-- Tab panes -->
					<div class="tab-content">
						<div role="tabpanel" class="tab-pane active" id="welding">
							<table class="table table-bordered" style="min-width: 680px;">
								<thead>
									<tr>
										<th width="80px">序号</th>
										<th width="320px">零部件名称</th>
										<th width="250px">零部件编号</th>
										<th>供应商</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane " id="painting">
							<table class="table table-bordered" style="min-width: 680px;">
								<thead>
									<tr>
										<th width="80px">序号</th>
										<th width="320px">零部件名称</th>
										<th width="250px">零部件编号</th>
										<th>供应商</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane " id="bottom">
							<table class="table table-bordered" style="min-width: 680px;">
								<thead>
									<tr>
										<th width="80px">序号</th>
										<th width="320px">零部件名称</th>
										<th width="250px">零部件编号</th>
										<th>供应商</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane " id="assembly">
							<table class="table table-bordered" style="min-width: 680px;">
								<thead>
									<tr>
										<th width="80px">序号</th>
										<th width="320px">零部件名称</th>
										<th width="250px">零部件编号</th>
										<th>供应商</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<!--  编辑窗口 -->
				<div class="modal" id="editModal" tabindex="-1" role="dialog"
					aria-hidden="true"
					style="display: none; -moz-user-select: none; -webkit-user-select: none; max-height: 500px">
					<div class="modal-header" style="cursor:move">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h5>模板维护</h5>
					</div>
					<div class="modal-body" style="overflow-y: visible">
						<div class="control-group">
							<div class="controls" id="select_input">
								零部件：<input type="text" id="edit_select"
									class="input-large carType"></input> <br /> 供应商：<input
									type="text" id="edit_input" class="input-large carType"></input>
								<input type="button" class="btn btn-primary" id="btnSave"
									value="保存" style="margin-left: 2px; float: right"></input>
							</div>

						</div>

					</div>
				</div>
				<!--  新增窗口 -->
				<div class="modal" id="newModal" tabindex="-1" role="dialog"
					aria-hidden="true"
					style="display: none; -moz-user-select: none; -webkit-user-select: none; max-height: 500px">
					<div class="modal-header" style="cursor:move">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h5>模板维护</h5>
					</div>
					<div class="modal-body" style="overflow-y: visible">
						<div class="control-group">
							<div class="controls" id="">
								零部件：<input type="text" id="new_select"
									class="input-large carType"></input> <br /> 供应商：<input
									type="text" id="new_input" class="input-large carType"></input>
								<input type="button" class="btn btn-primary" id="btnNew"
									value="保存" style="margin-left: 2px; float: right"></input>
							</div>

						</div>

					</div>
				</div>
			</div>
		</div>
</body>
</html>