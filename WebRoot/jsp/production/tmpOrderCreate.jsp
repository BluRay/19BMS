<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 临时派工单</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<link href="css/bootstrap-multiselect.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.validate.min.js"></script>
<script type="text/javascript" src="js/messages_zh.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/bootstrap-multiselect.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/production/tmpOrderCreate.js"></script>
<style  type="text/css">
	.btn-nocolor{
		background-color:#ffffff
	}
	.form-horizontal .control-label{
		width: 140px
	}
	.form-horizontal .controls{
		margin-left: 150px
	}
</style>

</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="font-size:17px">创建临时工单</legend>

				<div style="margin: 0 auto;">
					<br />
					<form id="form" class="well form-search">
						<table>
							<tr>
								<td>派工流水号</td>
								<td>申请日期</td>
								<td>状态</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td><input style="height: 30px;" type="text"
									class="input-medium revise" placeholder="派工单号"
									id="tmp_order_no" /></td>
								<td><input id="create_start" type="text"
									class="input-small" style="width: 98px" placeholder="开始日期..."
									onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /> <span
									class="add-on" style="padding: 4px 0">至</span> <input
									id="create_end" type="text" class="input-small"
									style="width: 98px" placeholder="结束日期..."
									onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /> <span>&nbsp;</span></td>
								<td><select name="" id="status"
									class="input-small carType">
										<option value='all'>全部</option>
										<!-- <option value='0'>已创建</option>
										<option value='1'>已审批</option>
										<option value='2'>已分配</option> -->
										<option value='3'>已评估</option>
										<option value='5'>已完成</option>
										<option value='6'>已驳回</option>
								</select></td>

								<td><input type="button" class="btn btn-primary"
									id="btnQuery" value="查询" style="margin-left: 2px;"></input> <input
									type="button" class="btn btn-success" id="btnAdd" value="新增"
									style="margin-left: 2px;"></input></td>

							</tr>
						</table>
					</form>

					<table id="tableResult"
						style="text-align: center; font-size: 12px;display:none;"
						class="table table-bordered ">
						<thead>
							<tr>
								<th >派工流水号</th>
								<th>接收<br />工厂</th>
								<th>接收<br/>车间</th>
								<th>发起人</th>
								<th>工单号</th>
								<th width='200px'>派工描述</th>
								<th >总数<br/>量</th>
								<th >工<br/>时</th>
								<th >所需<br/>人力</th>
								<th >总工<br/>时</th>
								<th >工时评估人</th>
								<th>工时评估<br />负责人</th>
								<th >指定<br/>验收人</th>
								<th>派工类型</th>
								<th >责任<br/>部门</th>							
								<th >操作</th>
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

				<div class="modal fade" id="newModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none; width: 900px;left:38%;top:20px">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>创建临时派工单</h3>
					</div>
					<div class="modal-body" style="max-height:500px">
						<form id="newRecordForm" class="form-horizontal" method="post" action="tempOrder!createOrder.action">
						<div style="height:30px;background-color:#f5f5f5;margin: 10px 0px;">
						<h5 style="line-height:30px">工单内容</h5>
						</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;派工发起人：</label>
								<div class="controls">
									<input class="input-small required" id="launcher" name="tempOrder.order_launcher" type="text" style="width:120px">
								</div>
								</div>
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;派工接收工厂：</label>
								<div class="controls">
									<select id='new_factory' name="tempOrder.factory" class="input-medium required" style="width:120px">
									</select>
								</div>
								</div>
								<div style="float: right; width: 33%; ">
								<label class="control-label" for="">*&nbsp;派工接收车间：</label>
								<div class="controls">
									<select id='new_workshop' name="tempOrder.workshop" class="input-medium required" style="width:120px">
									</select>
								</div>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;作业原因/内容：</label>
								<div class="controls">
									<textarea class="input-xlarge required"  style="width:690px" id="reason" name="tempOrder.reason_content" rows="3"></textarea>
								</div>
							</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;总数量：</label>
								<div class="controls">
									<input class="input-medium required digits" id="totalQty" name="tempOrder.total_qty" type="text" style="width:120px">
								</div>
								</div>
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;派工类型：</label>
								<div class="controls">
									<select id='new_order_type' name="tempOrder.order_type" class="input-medium required" style="width:120px">
										<option value="">请选择</option>
										<option value="工装制作类">工装制作类</option>
										<option value="工位器具类">工位器具类</option>
										<option value="工艺类">工艺类</option>
										<option value="综合类">综合类</option>
										<option value="售后类">售后类</option>
										<option value="计划类">计划类</option>
										<option value="品质类">品质类</option>
										<option value="设备制作类">设备制作类</option>
										<option value="其他类型">其他类型</option>
									</select>
								</div>
								</div>
								<div style="float: right; width: 33%; ">
								<label class="control-label" for="">*&nbsp;责任部门：</label>
								<div class="controls">
									<input class="input-medium required" id="new_duty_unit" name="tempOrder.duty_unit" type="text" style="width:120px" readonly>
								</div>
								</div>								
							</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;发起部门主管：</label>
								<div class="controls">
									<input class="input-medium required" id="new_head_launch" name="tempOrder.head_launch_unit" type="text" style="width:120px">
								</div>
								</div>
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;验收人：</label>
								<div class="controls">
									<input class="input-medium required" id="new_acceptor" name="tempOrder.acceptor" type="text" style="width:120px">
								</div>
								</div>
							</div>

							<div style="height:30px;background-color:#f5f5f5;margin: 10px 0px;">
								<h5 style="line-height:30px">工时评估内容</h5>
							</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;所需人力：</label>
								<div class="controls">
									<input class="input-medium required digits" id="new_labor" name="tempOrder.labors" type="text" style="width:120px">
								</div>
								</div>
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;单工时：</label>
								<div class="controls">
									<input class="input-medium required number" id="new_singlehour" name="tempOrder.single_hour" type="text" style="width:120px">
								</div>
								</div>
								<div style="float: right; width: 33%; ">
								<label class="control-label" for="">*&nbsp;工时评估人：</label>
								<div class="controls">
									<input class="input-medium required" id="new_assesor" name="tempOrder.assesor" type="text" style="width:120px">
								</div>
								</div>
							</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;工时评估负责人：</label>
								<div class="controls">
									<input class="input-medium required" id="new_assessVerifier" name="tempOrder.assess_verifier" type="text" style="width:120px">
								</div>
								</div>
							</div>
							
							<div style="height:30px;background-color:#f5f5f5;margin: 10px 0px;">
								<h5 style="line-height:30px">签批信息</h5>
							</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;成本是否可转移：</label>
								<div class="controls">
									<select id='new_cost_transfer' name="tempOrder.is_cost_transfer" class="input-medium" style="width:120px">
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
								</div>
								</div>
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;成本科签字：</label>
								<div class="controls">
									<input class="input-medium required" id="new_cost_signer" name="tempOrder.cost_unit_signer" type="text" style="width:120px">
								</div>
								</div>
								<div style="float: right; width: 33%; ">
								<label class="control-label" for="">*&nbsp;工单号：</label>
								<div class="controls">
									<input class="input-medium required" id="new_sap_order" name="tempOrder.sap_order" type="text" style="width:120px">
								</div>
								</div>
							</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;派工流水号：</label>
								<div class="controls">
									<input type="text" class="input-medium required" style="width:120px" id="new_order_serial" name="tempOrder.order_serial_no">
								</div>
								</div>
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;验收人签字：</label>
								<div class="controls">
									<input type="text" class="input-medium" style="width:120px" id="new_acceptor_sign">
								</div>
								</div>
								
							</div>
						<%-- 	<div class="control-group">
								<label class="control-label"> *&nbsp;责任单位：</label>
								<div class="controls">
									<select id='duty_unit' class="form-control" multiple="multiple" >
										
									</select>
								</div>
							</div> --%>
						</form>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnConfirm">确定</button>
					</div>
				</div>
				
				<div class="modal fade" id="editModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none; width: 900px;left:38%;top:20px">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>修改临时派工单</h3>
					</div>
					<div class="modal-body" style="max-height:500px">
						<form id="editRecordForm" class="form-horizontal" method="post" action="">
							<input type="hidden" name="tempOrder.id" id="orderId">
						<div style="height:30px;background-color:#f5f5f5;margin: 10px 0px;">
						<h5 style="line-height:30px">工单内容</h5>
						</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="" style="width: 140px;">*&nbsp;派工发起人：</label>
								<div class="controls" style="margin-left: 150px;">
									<input class="input-small required" id="edit_launcher" name="tempOrder.order_launcher" type="text" style="width:120px">
								</div>
								</div>
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;派工接收工厂：</label>
								<div class="controls">
									<select id='edit_factory' name="tempOrder.factory" class="input-medium required" style="width:120px">
									</select>
								</div>
								</div>
								<div style="float: right; width: 33%; ">
								<label class="control-label" for="">*&nbsp;派工接收车间：</label>
								<div class="controls">
									<select id='edit_workshop' name="tempOrder.workshop" class="input-medium required" style="width:120px">
									</select>
								</div>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;作业原因/内容：</label>
								<div class="controls">
									<textarea class="input-xlarge required"  style="width:690px" id="edit_reason" name="tempOrder.reason_content" rows="3"></textarea>
								</div>
							</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;总数量：</label>
								<div class="controls">
									<input class="input-medium required digits" id="edit_totalQty" name="tempOrder.total_qty" type="text" style="width:120px">
								</div>
								</div>
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;派工类型：</label>
								<div class="controls">
									<select id='edit_order_type' name="tempOrder.order_type" class="input-medium required" style="width:120px">
										<option value="">请选择</option>
										<option value="工装制作类">工装制作类</option>
										<option value="工位器具类">工位器具类</option>
										<option value="工艺类">工艺类</option>
										<option value="综合类">综合类</option>
										<option value="售后类">售后类</option>
										<option value="计划类">计划类</option>
										<option value="品质类">品质类</option>
										<option value="设备制作类">设备制作类</option>
										<option value="其他类型">其他类型</option>
									</select>
								</div>
								</div>
								<div style="float: right; width: 33%; ">
								<label class="control-label" for="">*&nbsp;责任部门：</label>
								<div class="controls">
									<input class="input-medium required" id="edit_duty_unit" name="tempOrder.duty_unit" type="text" style="width:120px" readonly>
								</div>
								</div>								
							</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;发起部门主管：</label>
								<div class="controls">
									<input class="input-medium required" id="edit_head_launch" name="tempOrder.head_launch_unit" type="text" style="width:120px">
								</div>
								</div>
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;验收人：</label>
								<div class="controls">
									<input class="input-medium required" id="edit_acceptor" name="tempOrder.acceptor" type="text" style="width:120px">
								</div>
								</div>
							</div>

							<div style="height:30px;background-color:#f5f5f5;margin: 10px 0px;">
								<h5 style="line-height:30px">工时评估内容</h5>
							</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;所需人力：</label>
								<div class="controls">
									<input class="input-medium required digits" id="edit_labor" name="tempOrder.labors" type="text" style="width:120px">
								</div>
								</div>
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;单工时：</label>
								<div class="controls">
									<input class="input-medium required number" id="edit_singlehour" name="tempOrder.single_hour" type="text" style="width:120px">
								</div>
								</div>
								<div style="float: right; width: 33%; ">
								<label class="control-label" for="">*&nbsp;工时评估人：</label>
								<div class="controls">
									<input class="input-medium required" id="edit_assesor" name="tempOrder.assesor" type="text" style="width:120px">
								</div>
								</div>
							</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;工时评估负责人：</label>
								<div class="controls">
									<input class="input-medium required" id="edit_assessVerifier" name="tempOrder.assess_verifier" type="text" style="width:120px">
								</div>
								</div>
							</div>
							
							<div style="height:30px;background-color:#f5f5f5;margin: 10px 0px;">
								<h5 style="line-height:30px">签批信息</h5>
							</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;成本是否可转移：</label>
								<div class="controls">
									<select id='edit_cost_transfer' name="tempOrder.is_cost_transfer" class="input-medium" style="width:120px">
										<option value="是">是</option>
										<option value="否">否</option>
									</select>
								</div>
								</div>
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;成本科签字：</label>
								<div class="controls">
									<input class="input-medium required" id="edit_cost_signer" name="tempOrder.cost_unit_signer" type="text" style="width:120px">
								</div>
								</div>
								<div style="float: right; width: 33%; ">
								<label class="control-label" for="">*&nbsp;工单号：</label>
								<div class="controls">
									<input class="input-medium required" id="edit_sap_order" name="tempOrder.sap_order" type="text" style="width:120px">
								</div>
								</div>
							</div>
							<div class="control-group">
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;派工流水号：</label>
								<div class="controls">
									<input type="text" class="input-medium required" style="width:120px" id="edit_order_serial" name="tempOrder.order_serial_no">
								</div>
								</div>
								<div style="float: left; width: 33%; ">
								<label class="control-label" for="">*&nbsp;验收人签字：</label>
								<div class="controls">
									<input type="text" class="input-medium" style="width:120px" id="edit_acceptor_sign">
								</div>
								</div>
								
							</div>
						<%-- 	<div class="control-group">
								<label class="control-label"> *&nbsp;责任单位：</label>
								<div class="controls">
									<select id='duty_unit' class="form-control" multiple="multiple" >
										
									</select>
								</div>
							</div> --%>
						</form>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnEditConfirm">确定</button>
					</div>
				</div>
				
<%-- 				<div class="modal fade" id="editModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none; width: 600px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>修改临时派工单</h3>
					</div>
					<div class="modal-body" style="max-height:500px">
						<form id="newRecordForm" class="form-horizontal" method="post">
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;申请人：</label>
								<div class="controls">
									<span id="applier" class="text-info" style="line-height: 30px"><s:property value='result.applier'/></span>
									<input type="hidden" id="edit_applierId" value="<s:property value='result.applierId'/>">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;作业原因/内容：</label>
								<div class="controls">
									<textarea class="input-xlarge" style="width:300px" id="edit_reason" rows="3"></textarea>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;总数量：</label>
								<div class="controls">
									<input class="input-medium" id="edit_totalQty" type="text">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;工单分配人：</label>
								<div class="controls">
									<input class="input-medium" id="edit_assignerCardNo" type="text" >
									<span id="edit_assigner" style='line-height:30px'></span>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"> *&nbsp;制作工厂：</label>
								<div class="controls">
									<select id='edit_factory' class="input-medium">
									</select>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"> *&nbsp;制作车间：</label>
								<div class="controls">
									<select id='edit_workshop' class="input-medium">
									</select>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"> *&nbsp;责任单位：</label>
								<div class="controls">
									<select id='edit_duty_unit' class="form-control" multiple="multiple" >
										
									</select>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnEditConfirm">确定</button>
					</div>
				</div> --%>
			</div>
		</div>
	</div>
</body>
</html>