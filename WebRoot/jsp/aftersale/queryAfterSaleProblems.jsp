<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 售后问题</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
	<script type="text/javascript" src="js/jquery.form.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/aftersale/queryAfterSaleProblems.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
</head>
<body style="overflow-x:hidden;">
<%@ include file="../common/head.jsp"%>
<%@ include file="../common/general_aftersale_left.jsp"%>
<div class="content-wrapper ">
<div id="bodymain" class="offhead">
<div id="bodyright" class="offset2"><!-- Main -->
	<legend style="margin:0 auto;">售后问题</legend>
	<div style="margin: 0 auto;"><br/>
		<form id="form" class="well form-search">
			<table>
				<tr>
					<td>工厂：</td>
					<td><select name="" id="seach_factory" style="width: 120px;" class="input-medium carType">
						</select></td>
					<td>VIN码：</td>	
					<td><input style="height: 30px;width: 160px;" type="text" class="input-medium carType" id="search_VIN" /></td>
					<td>故障零部件：</td>
					<td><input style="height: 30px;" type="text" class="input-medium revise" id="search_parts_name" /></td>
					<td>故障日期：</td>
					<td>
						<input type="text"   type="text" name="startDate" id="startDate"  class="Wdate" style="height:30px;background-color: white;width:120px" onClick="WdatePicker({el:'startDate',dateFmt:'yyyy-MM-dd'});"/>
					</td>
					<td>
						至 &nbsp;<input type="text" type="text" name="endDate" id="endDate" class="Wdate" onClick="WdatePicker({el:'endDate',dateFmt:'yyyy-MM-dd'});" style="height:30px;background-color: white;width:120px" />
					</td>
				</tr>

				<tr>
					<td>客户：</td>
					<td><input style="height: 30px;width: 120px;" type="text" class="input-medium carType" id="search_customer_name" /></td>
					<td>车号：</td>
					<td><input style="height: 30px;width: 160px;" type="text" class="input-medium carType" id="search_bus_number" /></td>
					<td>故障现象：</td>
					<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="请输入故障现象..." id="search_fault_phenomenon" /></td>
					<td>报告状态：</td>
					<td><select name="" id="status" style="width:78px;" class="input-medium carType">
						<option value="">全部</option>
						<option value="0">未编写</option>
						<option value="2">已编写</option>
						</select></td>	
					<td><input type="button" style="margin-left:-30px" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
						<input type="button" disabled="disabled" class="btn btn-info" id="btnExport" value="导出" style="margin-left: 2px;"></input>	</td>		
				</tr>
			</table>
		</form>
		<table id="tableAfterSaleProblems" class="table table-condensed" style="font-size:12px;">
            <thead>
                <tr>
                <!--	<th>序号</th> -->
                	<th>工厂</th>
                    <th>VIN号</th>
                    <th>车号</th>
                    <th>订单</th>
                    <th>客户</th>
                <!--    <th>车牌号</th> -->
                <!--      <th>车辆自编号</th> -->
                    <th>出厂日期</th>
                    <th>故障类型</th>
                    <th>严重等级</th>                    
                    <th>故障日期</th>
                 <!--   <th>故障里程</th> -->
                    <th>故障零部件</th>
                    <th>故障现象</th>
                    <th>问题明细</th>
                    <th>改善报告</th>
                    <th></th>
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

<!-- NEW MODAL -->
		<div class="modal" id="newModal" tabindex="-1" role="dialog"
			aria-hidden="true" style="display: none;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>改善报告</h3>
			</div>
			<div class="modal-body">
				<form id="editImproveSalesProblems" enctype="multipart/form-data" method="post" action="afterSale!editImproveSalesProblems.action" class="form-horizontal">
					<input type="hidden" name="improveSalesProblems.id" class="input-medium" id="new_id" />
					<input type="hidden" name="improveSalesProblems.problem_id" class="input-medium" id="new_problem_id" />
					<div class="control-group">
						<label class="control-label" for="improveSalesProblems.fault_phenomenon">*&nbsp;问题描述</label>
						<div class="controls">
							<textarea disabled="disabled" class="input-xlarge"  name="improveSalesProblems.fault_phenomenon" id="new_fault_phenomenon" rows="3"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="new_severity_level">*&nbsp;严重等级</label>
						<div class="controls">
							<select disabled="disabled" name="improveSalesProblems.severity_level" id="new_severity_level" class="input-medium carType">
								<option value="">请选择</option>
								<option value="S">S</option>
								<option value="A">A</option>
								<option value="B">B</option>
								<option value="C">C</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="new_provisional_measures">&nbsp;临时措施</label>
						<div class="controls">
							<textarea disabled="disabled" class="input-xlarge"  name="improveSalesProblems.provisional_measures" id="new_provisional_measures" rows="3"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="new_reason">&nbsp;根本原因</label>
						<div class="controls">
							<textarea disabled="disabled" class="input-xlarge"  name="improveSalesProblems.reason" id="new_reason" rows="4"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="new_improved_measure">&nbsp;改进措施</label>
						<div class="controls">
							<textarea disabled="disabled" class="input-xlarge"  name="improveSalesProblems.improved_measure" id="new_improved_measure" rows="3"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="new_verify">&nbsp;执行和验证</label>
						<div class="controls">
							<textarea disabled="disabled" class="input-xlarge"  name="improveSalesProblems.verify" id="new_verify" rows="3"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="new_standard">&nbsp;预防和标准化</label>
						<div class="controls">
							<textarea disabled="disabled" class="input-xlarge"  name="improveSalesProblems.standard" id="new_standard" rows="4"></textarea>
						</div>
					</div>				
					<div class="control-group">
						<label class="control-label" for="view_before_photo">&nbsp;改善前</label>
						<div class="controls">
							<img id="view_before_photo" name="view_before_photo" style="width: 300px;height: 200px;" src="" alt="..." class="img-rounded img-responsive">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_after_photo">&nbsp;改善后</label>
						<div class="controls">
							<img id="view_after_photo" name="view_after_photo" style="width: 300px;height: 200px;" src="" alt="..." class="img-rounded img-responsive">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_attachment">&nbsp;附件</label>
						<div style="padding-top: 3px;" class="controls">
							<a id="attachment" target="_blank" style="height: 30px;width:180px"></a>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
			</div>
		</div>
		<!-- EDIT MODAL -->
		<div class="modal" id="viewModal" tabindex="-1" role="dialog"
			aria-hidden="true" style="display: none;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>售后问题详情</h3>
			</div>
			<div class="modal-body">
			<form  class="form-horizontal">
					<div class="control-group">
						<label class="control-label" for="viewFactory">*&nbsp;生产工厂</label>
						<div class="controls">
							<select name="view_factory" disabled="disabled" id="view_factory" class="input-medium carType">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_customer_name">*&nbsp;客户名称</label>
						<div class="controls">
							<input disabled="disabled" style="width: 250px;" type="text" name="view_customer_name" class="input-medium" id="view_customer_name" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_vin">*&nbsp;VIN号</label>
						<div class="controls">
							<input disabled="disabled" style="width: 250px;" type="text" name="view_vin" class="input-medium" id="view_vin" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_vin">*&nbsp;车号</label>
						<div class="controls">
							<input disabled="disabled" style="width: 250px;" type="text" name="view_bus_number" class="input-medium" id="view_bus_number" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_factory_date">&nbsp;出厂日期</label>
						<div class="controls">
						<input disabled="disabled" style='height: 30px;width: 250px;' name="view_factory_date" type="text" class="input-medium revise"  id="view_factory_date" onClick="WdatePicker({el:'view_factory_date',dateFmt:'yyyy-MM-dd'});"/>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_order">&nbsp;订单描述</label><input name="view_order_id" type="hidden" id="view_order_id" /><input name="view_order_desc" type="hidden" id="view_order_desc" />
						<div class="controls" id="view_order">
						</div>
					</div>		
					<div class="control-group">
						<label class="control-label" for="view_customer_bus_number">&nbsp;客户车辆自编号</label>
						<div class="controls">
							<input disabled="disabled" style="width: 250px;" type="text" name="view_customer_bus_number" class="input-medium" id="view_customer_bus_number" />
						</div>
					</div>			
					<div class="control-group">
						<label class="control-label" for="view_license_number">*&nbsp;车牌号</label>
						<div class="controls">
							<input disabled="disabled" style="width: 250px;" type="text" name="view_license_number" class="input-medium" id="view_license_number" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_fault_type">*&nbsp;故障类别</label>
						<div class="controls" id ="view_fault_type">
							
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_fault_level_id">*&nbsp;故障等级</label>
						<div class="controls">
							<select disabled="disabled" name="view_fault_level_id" id="view_fault_level_id" class="input-medium carType">
							</select>
						</div>
					</div>		
					<div class="control-group">
						<label class="control-label" for="view_fault_date">*&nbsp;故障日期</label>
						<div class="controls">
							<input disabled="disabled" style='height: 30px;width: 250px;' name="view_fault_date" type="text" class="input-medium revise" placeholder="故障日期..." id="view_fault_date" onClick="WdatePicker({el:'view_fault_date',dateFmt:'yyyy-MM-dd'});"/>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_fault_mils">*&nbsp;故障里程</label>
						<div class="controls">
							<input disabled="disabled" style="width: 250px;" type="text" name="view_fault_mils" class="input-medium" id="view_fault_mils" />&nbsp;公里
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_fault_components">*&nbsp;故障零部件</label>
						<div class="controls">
							<input disabled="disabled" style="width: 250px;" type="text" name="view_fault_components" class="input-medium" id="view_fault_components" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_fault_phenomenon">*&nbsp;故障现象</label>
						<div class="controls">
							<textarea disabled="disabled" class="input-xlarge" name="view_fault_phenomenon" id="view_fault_phenomenon" rows="2"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_fault_photo">&nbsp;故障图片</label>
						<div class="controls">
							<img id="view_fault_photo" src="" alt="..." class="img-rounded img-responsive">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_fault_reason">*&nbsp;故障原因</label>
						<div class="controls">
							<textarea disabled="disabled" class="input-xlarge"  name="view_fault_reason" id="view_fault_reason" rows="3"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="view_memo">&nbsp;备注</label>
						<div class="controls">
							<textarea disabled="disabled" class="input-xlarge"  name="view_memo" id="view_memo" rows="2"></textarea>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
			</div>
		</div>
	</div>
	</div>
</body>
</html>