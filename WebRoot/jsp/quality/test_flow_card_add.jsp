<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>检验流程卡录入</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/quality/test_flow_card_add.js"></script>
</head>
<body>
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="/jsp/common/general_quality_left.jsp"%>
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<form id="form" class="well form-search">
					 <label><b>&nbsp;车号:</b></label> <input type="text"
						id="q_busno" class="input-medium" onkeypress="if(event.keyCode==13||event.which==13){return false;}"/>
					<label><b>&nbsp;工厂:</b></label> <select id="q_factory"
						class="input-small" disabled>
						<option value="">请选择</option>
					</select> <label><b>&nbsp;车间:</b></label> <select id="q_workshop"
						class="input-small">
						<option value="">请选择</option>
					</select>	
					<label></label> <input type="button"
						class="btn btn-primary" id="btnShowDetail" value="确定"
						style="margin-left: 2px;">
				</form>

				<form id="saveForm" action=""
					method="post" class="form-search" style="display: none">
					<table style="text-align: left; width: 100%;">
						<tr>
							<td width="240px">车身号 <input id="disp_busNo" type="text" 
								style="width: 150px;" disabled/></td>
							<td colspan="2">检验结论 
							<label><input type="radio" name="header.test_result" value="0" />一次交检合格</label> 
							<label><input type="radio" name="header.test_result" value="1" />返工/返修合格</label> 
							<label><input type="radio" name="header.test_result" value="2" />让步放行</label></td>							
						</tr>
						<tr>
							<td width="240px">				
							<span class="text-info" id="order-info">
								</span>
							</td>
							<td width="170px">检验员 <input id="tester"
								name="header.tester" type="text" style="width: 120px" /></td>
							<td width="170px" >QE <input
								type="text" name="header.qe" style="width: 120px" /></td>					
							<td><input type="button" class="btn btn-success"
								id="btnAddTplDetail" value="保存" style="margin-left: 2px;"></td>
						</tr>
					</table>
					<input id="busNo" type="hidden" name="header.bus_number"/>
					<input id="factoryId" name="header.factory_id" type="hidden" /> <input
						id="workshopId" name="header.workshop_id" type="hidden" /> <input
						id="busTypeId" name="header.bus_type_id" type="hidden" /> <input
						id="orderId" name="header.order_id" type="hidden" /> <input
						id="orderConfigId" name="header.order_config_id" type="hidden" />
					<table id="tableResult" class="table table-bordered"
						style="font-size: 12px;">
						<thead>
							<tr>
								<th>节点</th>
								<th>工序</th>
								<th>检测内容</th>
								<th>质控点</th>
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