<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>一次交检合格率报表</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/highcharts.src.js"></script>
<script type="text/javascript" src="js/exporting.src.js"></script>
<script type="text/javascript" src="js/report/pass_rate_report.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_report_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<legend style="margin: 0 auto;">一次交检合格率报表</legend>
				<div style="margin-top: 10px">
					<form id="form" class="form-search">
						<table>
							<tr>
								<td>工厂: <select id="q_factory" class="input-small"></select></td>
								<td>车间: <select id="q_workshop" class="input-small"></select></td>
								<td>日期: <input id="q_date_start" class="input-small"
									style="width: 100px"
									onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">
									<span>-</span> <input id="q_date_end" class="input-small"
									style="width: 100px"
									onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">
								</td>
								<td>查询维度: <select id="q_item" class="input-small">
										<option value="day">日</option>
										<option value="week">周</option>
										<option value="month">月</option>
										<option value="order">订单</option>
								</select>
								</td>
								<td><input type="button" class="btn btn-primary"
									id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
							</tr>
						</table>
					</form>
				</div>
				<div id="chartsContainer"
					style="min-width: 400px; max-width: 1080px; height: 300px; margin-top: 10px"></div>
				<table id="tableContainer" class="table table-bordered"
					style="display: none">
					<thead>
						<tr>
							<th>车号/零部件编号</th>
							<th>工厂</th>
							<th>车间</th>
							<th>检验员</th>
							<th>QE</th>
							<th>判定时间</th>
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
			<input type="hidden" id="factory_self"
				value="<s:property value='user.factory'></s:property>" /> <input
				type="hidden" id="factory_id_self"
				value="<s:property value='user.factory_id'></s:property>" /> <input
				type="hidden" id="department_self"
				value="<s:property value='result.department'></s:property>" />
		</div>
	</div>
</body>
</html>