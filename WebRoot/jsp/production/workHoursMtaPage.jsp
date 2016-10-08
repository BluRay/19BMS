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
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/production/workHoursMta.js"></script>
<style type="text/css">
.section-head {
    border-left: 7px solid #000;
    padding-left: 10px;
    margin-bottom: 20px;
}
.table td{
	padding:5px;
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
				<legend style="font-size:17px">额外工时维护</legend>

				<div style="margin: 0 auto;">
					<br />
					<form id="form" class="well form-search">
						<table>
							<tr>
								<td>派工流水号</td>
								<td>申请日期</td>
								<td>状态</td>
								<td>制作工厂</td>
								<td>制作车间</td>
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
										<option value='2'>已分配</option> -->
										<option value='3'>已评估</option>
										<option value='5'>已完成</option>
										<option value='6'>已驳回</option>
								</select></td>
								<td>
									<select id="q_factory" class="input-small"></select>
								</td>
								<td>
									<select id="q_workshop" class="input-small"></select>
								</td>
								<td><input type="button" class="btn btn-primary"
									id="btnQuery" value="查询" style="margin-left: 2px;"></input> </td>

							</tr>
						</table>
					</form>
										
					<table id="tableResult"
						style="text-align: center; font-size: 12px;display:none;";
						class="table table-bordered ">
						<thead>
							<tr>
								<th >派工流水号</th>
								<th >工单号</th>
								<th width='300px'>作业原因/内容</th>
								<th >总数<br/>量</th>
								<th >已完成<br/>数量</th>
								<th >产量</th>
								<th >工<br/>时</th>
								<th >所需<br/>人力</th>
								<th >总工<br/>时</th>
								<th >录入<br/>总工时</th>
								<th >申请人</th>
								<th >申请时间</th>
		<!-- 						<th >审批人</th>
								<th >审批时间</th> -->
								<th >状态</th>
								<th >工时维护</th>
								<th >工时修改</th>
								<!-- <th >进度维护</th> -->
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

			<div class="modal fade" id="mtaModal" tabindex="-1" role="dialog" unselectable="on" onselectstart="return false;"
					aria-hidden="true" style="display: none; -moz-user-select:-moz-none;width: 800px;max-height:600px;left:40%">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>额外工时维护</h3>
					</div>
					<div class="modal-body">
						<div class="control-group" >
							<table style="line-height:30px">
								<tr>
								<td width="140px" style="text-align:right">派工单号：</td>								
								<td id="orderNo"></td>
								</tr>
								<tr>
								<td width="140px" style="text-align:right">作业原因/内容：</td>								
								<td id="reason"></td>	
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
									<!-- <option value=''>请选择</option> -->
									</select>
								</td>
								<td width="80px" style="text-align:right">小班组：</td>
								<td width="160px">
									<select id="subgroup" class="input-medium">
								<!-- 	<option value=''>请选择</option> -->
									</select>
								</td>
								<td width="80px" style="text-align:right">操作日期：</td>
								<td>
									<input type="text" id="mta_wdate" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:new Date()})"/>
								</td>
								</tr>
							</table>
						</div>
						<div><div style="width: 200px; display: inline-table;"><h5 class="section-head">额外工时</h5></div><span style="float:right;margin: 10px 20px;color:green" class="read_hours"></span></div>
						<div>
							<table id="table_workhour" style="margin-left:0px;margin-top:0px;width:100%;text-align:left;" class="exp-table table">
							<thead style="background-color: rgb(225, 234, 240)">
							<tr>
							<td style="width: 30px;"><i class="fa fa-plus addWorkhour" style="cursor: pointer;color: blue;"></i></td>
							<td >工号</td>
							<td >姓名</td>
							<td >岗位</td>
							<td >额外工时</td>
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
				
				<div class="modal fade" id="editModal" tabindex="-1" role="dialog" unselectable="on" onselectstart="return false;"
					aria-hidden="true" style="display: none; -moz-user-select:-moz-none; width: 800px;max-height:600px;left:40%">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>额外工时修改</h3>
					</div>
					<div class="modal-body">
						<div class="control-group" >
							<table style="line-height:30px" >
								<tr>
								<td width="140px" style="text-align:right">派工单号：</td>								
								<td id="edit_orderNo"></td>
								</tr>
								<tr>
								<td width="140px" style="text-align:right">作业原因/内容：</td>								
								<td id="edit_reason"></td>	
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
									<input type="text" class="input-medium" id="edit_workDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
								</td>
								<td><input type="button" class="btn btn-primary"
									id="btnSwhQuery" value="查询" style="margin-left: 2px;"></input>
									</td>
								<td></td>
								</tr>								
							</table>
						</div>
						<div><div style="width: 200px; display: inline-table;"><h5 class="section-head">额外工时</h5></div><span style="float:right;margin: 10px 20px;color:green" class="read_hours"></span></div>
						<div>
							<table style="margin-left:0px;width: 100%;"class="exp-table table" id="workhour_tb">
							<thead style="background-color: rgb(225, 234, 240)">
							<tr>
							<td ><input type="checkbox" id="checkall"></td>
							<td >工号</td>
							<td >姓名</td>
							<td >岗位</td>
							<td >额外工时</td>
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
				
				<div class="modal fade" id="progressModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none; width: 600px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>临时派工单进度维护</h3>
					</div>
					<div class="modal-body">
						<form id="newRecordForm" class="form-horizontal" method="post">
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;派工单号：</label>
								<div class="controls">
									<span id="tempOrderNo" class="text-info" style="line-height: 30px"></span>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;作业原因/内容：</label>
								<div class="controls">
									<span id="reasonContent" class="text-info" style="line-height: 30px"></span>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;总数量：</label>
								<div class="controls">
									<span id="totalQty" class="text-info" style="line-height: 30px"></span>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;已完成数量：</label>
								<div class="controls">
									<span id="readyQty" class="text-info" style="line-height: 30px"></span>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;产量：</label>
								<div class="controls">
									<input class="input-medium" id="productQty" type="text" >
								</div>
							</div>
							
						</form>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnProcConfirm">确定</button>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</body>
</html>