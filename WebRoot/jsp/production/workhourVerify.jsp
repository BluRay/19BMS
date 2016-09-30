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
<script type="text/javascript" src="js/production/workHoursVerify.js"></script>
<style type="text/css">
.section-head {
	border-left: 7px solid #000;
	padding-left: 10px;
	margin-bottom: 20px;
}

.table td {
	padding: 5px;
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
				<legend style="font-size: 17px">临时派工单工时审核</legend>

				<div style="margin: 0 auto;">
					<br />
					<form id="form" class="well form-search">
						<table>
							<tr>
								<td>派工单号</td>
								<td>申请日期</td>
								<td>工时状态</td>
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
								<td><select name="" id="status" class="input-small carType">
										<option value='未审批' selected>未审批</option>
										<option value='已审批'>已审批</option>
									<!-- 	<option value='all'>全部</option>
										<option value='0'>已创建</option>
										<option value='2'>已分配</option>
										<option value='3'>已评估</option>
										<option value='5'>已完成</option>
										<option value='6'>已驳回</option> -->
								</select></td>
								<td><select id="q_factory" class="input-small"></select></td>
								<td><select id="q_workshop" class="input-small"></select></td>
								<td><input type="button" class="btn btn-primary"
									id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>

							</tr>
						</table>
					</form>
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
					<table id="tableResult"
						style="text-align: center; font-size: 12px; display: none;"
						;
						class="table table-bordered ">
						<thead>
							<tr>
								<th>派工单号</th>
								<th>工单号</th>
								<th width='300px'>作业原因/内容</th>
								<th>总数<br />量
								</th>
								<th >
								已完成<br/>
								数量
								</th>
								<th>单工<br />时
								</th>
								<th>所需<br />人力
								</th>
								<th>总工<br />时
								</th>
								<th>录入<br />总工时
								</th>
								<th>申请人</th>
								<th>申请时间</th>
						<!-- 		<th>审批人</th>
								<th>审批时间</th> -->
								<!-- <th>状态</th> -->
								<th>工时审核</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>

				</div>

				<div class="modal fade" id="editModal" tabindex="-1" role="dialog"
					aria-hidden="true"
					style="display: none; width: 800px; max-height: 600px; left: 40%">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>工时审核</h3>
					</div>
					<div class="modal-body">
						<div class="control-group">
							<table style="line-height: 30px">
								<tr>
									<td width="140px" style="text-align: right">派工单号：</td>
									<td id="edit_orderNo" colspan="2"></td>
								</tr>
								<tr>
									<td width="140px" style="text-align: right">作业原因/内容：</td>
									<td id="edit_reason" colspan="7"></td>
								</tr>
								<tr>
									<td width="140px" style="text-align: right">总数量：</td>
									<td id="edit_totalQty" width="50px">30</td>
									<td width="80px" style="text-align: right">单工时：</td>
									<td id="edit_singleHour" width="50px">1.5</td>
									<td width="80px" style="text-align: right">所需人力：</td>
									<td id="edit_labors" width="50px">10</td>
									<td width="80px" style="text-align: right">总工时：</td>
									<td id="edit_totalHour">20</td>
								</tr>

							</table>
						</div>

						<div class="control-group">
							<table class="form-search">
								<tr>
									<td width="60px" style="text-align: right">工号：</td>
									<td width="160px"><input type="text" class="input-medium"
										id="edit_cardNumber" /></td>
									<td width="80px" style="text-align: right">操作月份：</td>
									<td width="160px"><input type="text" class="input-medium"
										id="edit_workDate"
										onclick="WdatePicker({dateFmt:'yyyy-MM'})" /></td>
									<td><input type="button" class="btn btn-primary"
										id="btnSwhQuery" value="查询" style="margin-left: 2px;"></input></td>
									<td></td>
								</tr>
							</table>
						</div>
						<div>
							<h5 class="section-head">额外工时</h5>
						</div>
						<div>
							<table id="work_hour_tb"
								style="margin-left: 0px; margin-top: 15px; width: 100%;"
								class="exp-table table">
								<thead style="background-color: rgb(225, 234, 240)">
									<tr>
										<td><input type="checkbox" id="checkall"></td>
										<td>工号</td>
										<td>姓名</td>
										<td>岗位</td>
										<td>额外工时</td>
										<td>小班组</td>
										<td>班组</td>
										<td>车间</td>
										<td>工厂</td>
										<td>状态</td>
										<td>操作日期</td>
									</tr>
								</thead>
								<tbody class="exp-table" id="workhour_list">
								</tbody>
							</table>
						</div>

					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true"
							id="btnReject">驳回</button>
						<button class="btn btn-primary" id="btnVerify">批准</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>