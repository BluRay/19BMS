<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>检验记录录入</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/quality/test_record_add.js"></script>
</head>
<body>
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="/jsp/common/general_quality_left.jsp"%>
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<form id="form" class="well form-search">
					<label><b>*&nbsp;工厂:</b></label> <select id="q_factory"
						class="input-small">
						<option value="">请选择</option>
					</select> <label><b>*&nbsp;车型:</b></label> <select id="q_bustype"
						class="input-small">
						<option value="">请选择</option>
					</select> <label><b>订单编号:</b></label> <input type="text"
						id="q_orderno" class="input-medium" /> <label><b>配置:</b></label>
					<select id="q_config" class="input-medium">
						<option value="">请选择</option>
					</select> <label><b>*&nbsp;零部件:</b></label> <input type="text" id="q_parts"
						class="input-medium" /> <label></label> <input type="button"
						class="btn btn-primary" id="btnShowDetail" value="确定"
						style="margin-left: 2px;">
				</form>

				<form id="saveForm" action="testRecordIn!addRecord.action"
					method="post" class="form-search" style="display: none">
					<table style="text-align: left; width: 100%;">
						<tr>
							<td width="240px">零部件名称 <input id="parts_name" type="text"
								style="width: 150px;" disabled /></td>
							<td width="240px">零部件图号 <input id="parts_chart_no"
								name="header.partsChartNo" type="text" style="width: 120px" /></td>
							<td width="240px">零部件编号 <input id="parts_no"
								name="header.partsNo" type="text" style="width: 120px" /></td>
							<td width="170px">版本号 <input id="version"
								name="header.version" type="text" style="width: 120px" /></td>
							<td></td>
						</tr>
						<tr>
							<td width="240px">生产日期&nbsp;&nbsp;&nbsp;&nbsp;<input
								id="occur_start" type="text" name="header.prodDate"
								style="width: 150px"
								onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /></td>
							<td width="240px">专检员&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input
								type="text" name="header.tester" style="width: 120px" /></td>
							<td colspan="2">检验结论 
							<label><input type="radio" name="header.testResult" value="0" />一次交检合格 </label>
							<label><input type="radio" name="header.testResult" value="1" />返工/返修合格 </label>
							<label><input type="radio" name="header.testResult" value="2" />让步放行</label></td>
							<td><input type="button" class="btn btn-success"
								id="btnAddTplDetail" value="保存" style="margin-left: 2px;"></td>
						</tr>
					</table>
					<input id="factoryId" name="header.factoryId" type="hidden" /> <input
						id="partsId" name="header.partsId" type="hidden" /> <input
						id="busType" name="header.busTypeId" type="hidden" /> <input
						id="orderId" name="header.orderId" value=0 type="hidden" /> <input
						id="orderConfigId" name="header.orderConfigId" value=0 type="hidden" />
					<table id="tableResult" class="table table-bordered"
						style="font-size: 12px;">
						<thead>
							<tr>
								<th>工序/节点</th>
								<th>检测内容</th>
								<th>技术要求</th>
								<th>检验频次</th>
								<th>检验工具</th>
								<th>检验结果</th>
								<th>结果判定</th>
								<th>返工/返修</th>
								<th>责任车间</th>
								<th>责任班组</th>
								<th>备注</th>
							</tr>
						</thead>
						<tbody>

						</tbody>
					</table>
				</form>

				<div class="modal fade" id="faultLibQuery" tabindex="-1"
					role="dialog" aria-hidden="true"
					style="display: none; width: 780px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>标准故障库查询</h3>
					</div>
					<div class="modal-body">
						<div class="form-horizontal" method="post">
							<div class="control-group">
								<form id="form" class="well form-search">
									<table>
										<tr>
											<td>零部件名称</td>
											<td>严重等级</td>
											<td>缺陷类别</td>
											<td>质量缺陷</td>
											<td></td>
										</tr>
										<tr>
											<td><input type="text" class="input-medium revise"
												id="input_parts" /></td>
											<td><select name="" id="input_faultLevel"
												class="input-medium carType">
													<option value="">请选择</option>
													<option value="S">S</option>
													<option value="A">A</option>
													<option value="B">B</option>
													<option value="C">C</option>
											</select></td>
											<td><input type="text" class="input-medium revise"
												id="input_bug_type" /></td>
											<td><input type="text" class="input-medium revise"
												id="input_bug" /></td>
											<td><input type="button" class="btn btn-primary"
												id="btnLibQuery" value="查询" style="margin-left: 2px;"></input>
											</td>
										</tr>
									</table>
								</form>
								<table id="faultLibResult" class="table table-condensed"
									style="font-size: 12px; display:none">
									<thead>
										<tr>
											<th></th>
											<th>零部件名称</th>
											<th>缺陷类别</th>
											<th>质量缺陷</th>
											<th>严重等级</th>
											<th>缺陷分类</th>
										</tr>
									</thead>
									<tbody>

									</tbody>
								</table>
							</div>

						</div>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnLibConfirm">确定</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>