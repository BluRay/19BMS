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
<script type="text/javascript" src="js/production/tmpOrderApprove.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="font-size:17px">审批临时工单</legend>

				<div style="margin: 0 auto;">
					<br />
					<form id="form" class="well form-search">
						<table>
							<tr>
								<td>派工单号</td>
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
										<option value='0'>已创建</option>
										<option value='1'>已审批</option>
										<option value='2'>已分配</option>
										<option value='3'>已评估</option>
										<option value='4'>已验收</option>
										<option value='5'>已完成</option>
								</select></td>

								<td><input type="button" class="btn btn-primary"
									id="btnQuery" value="查询" style="margin-left: 2px;"></input> <input
									type="button" class="btn btn-success" id="btnApprove" value="批准"
									style="margin-left: 2px;"></input></td>

							</tr>
						</table>
					</form>

					<table id="tableResult"
						style="text-align: center; font-size: 12px;display:none;";
						class="table table-bordered ">
						<thead>
							<tr>
								<th ><input type="checkbox" id="checkall"></th>
								<th >派工单号</th>
								<th width='400px'>作业原因/内容</th>
								<th >总数量</th>
								<th >申请人</th>
								<th >申请时间</th>
								<th >状态</th>						
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
		</div>
	</div>
</body>
</html>