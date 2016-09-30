<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>计划</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/plan/busDispatchDesc.js"></script>
</head>
<body >
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<legend style="margin: 0 auto;">发车详情</legend>
				<br />
			<!-- 	<div>
					<ul class="nav nav-pills" style="height: 30px">
						<li id="welding_li"><a href="busDispatch!planListPage.action">发车计划</a></li>
						<li  id="painting_li"><a
							href="busDispatch!busDoDispatch.action">发车交接</a></li>
						<li id="bottom_li"><a href="busDispatch!orderDispatch.action">随车附件</a></li>
						<li id="assembly_li" class="active"><a href="busDispatch!busDispatchQuery.action">发车查询</a></li>
					</ul>
				</div> -->
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>订单编号</td>
							<td>车号/VIN号</td>
							<td>发车时间</td>
							<td></td>
						</tr>
						<tr>
							<td><input type="text" class="input-medium revise"
								id="input_order_no" value="<s:property value='result.orderNo' />"/></td>
							<td><input type="text" class="input-medium revise"
								id="input_bus_no" /></td>
							<td><input id="dispatch_start" class="input-medium" placeholder="发车开始日期..." onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">
							<span class="add-on" style="padding:4px 0">-</span>
							<input id="dispatch_end" class="input-medium" placeholder="发车结束日期..." onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">
							</td>
							<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>							
						</tr>
					</table>
				</form>

				<table id="tableResult" class="table table-condensed"
					style="display: none" style="font-size: 12px;">
					<thead>
						<tr>
							<th>车号</th>
							<th>VIN</th>
							<th>电机号</th>
							<th>3C认证标贴</th>
							<th width="300px">随车附件清单</th>
							<th>自编号</th>
							<th>发车人</th>
							<th>接收人</th>
							<th>发车日期</th>
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
</body>
</html>