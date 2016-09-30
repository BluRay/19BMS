<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>生产报表</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/highcharts.js"></script>
<script type="text/javascript" src="js/exporting.js"></script>
<script type="text/javascript" src="js/report/productionReport.js"></script>
<style type="text/css">
.table th, .table td {
	text-align:center
}
</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_report_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<legend style="margin: 0 auto;">生产报表</legend>
				<ul class="nav nav-pills" role="tablist" style="height: 30px">
					<li role="presentation" class="active" id="chartReport_li"><a href="#chartReport"
						aria-controls="chartReport" role="tab" data-toggle="tab">图形报表</a></li>
					<li role="presentation"  id="dailyReport_li"><a
						href="#dailyReport" aria-controls="dailyReport" role="tab"
						data-toggle="tab">生产日报表</a></li>					
				</ul>
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane" id="dailyReport">
						<form id="form" class="form-search">
							<table>
								<tr>
									<td>工厂: <select id="q_factory" class="input-medium"></select></td>
									<td>车间: <select id="q_workshop" class="input-medium"></select></td>
									<td>日期: <input id="q_date" class="input-medium"
										onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text"></td>
									<td><input type="button" class="btn btn-primary"
										id="btnDailyQuery" value="查询" style="margin-left: 2px;"></input></td>
								</tr>
							<%-- 	<tr>
									<td><select id="q_factory" class="input-medium"></select></td>
									<td><select id="q_workshop" class="input-medium"></select></td>
									<td><input id="q_date" class="input-medium"
										onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">
									</td>
									<td><input type="button" class="btn btn-primary"
										id="btnDailyQuery" value="查询" style="margin-left: 2px;"></input></td>
								</tr> --%>
							</table>
						</form>
						<table id="tableContainer" class="table table-bordered" style="display:none">
							<thead>
								<tr>
									<th>现有人数</th>
									<th>实到人数</th>
									<th>总计上线</th>
									<th>总计下线</th>
									<th>计划达成率</th>
									<th>投入工时</th>
									<th>异常反馈</th>
									<th>生产订单</th>
									<th>累计上线</th>
									<th>累计下线</th>
									<th>总计返修</th>
									<th>生产线别</th>
									<th>上线数量</th>
									<th>下线数量</th>
									<th>返修上线</th>
									<th>返修下线</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					
					<div role="tabpanel" class="tab-pane active" id="chartReport" >
						<form  class="form-search">
							<table >
								<tr>
									<td>工厂: <select id="c_factory" class="input-medium"></select></td>
									<td>日期: <input id="c_date" class="input-medium"
										onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text"></td>
									<td><input type="button" class="btn btn-primary"
										id="btnChartQuery" value="查询" style="margin-left: 2px;"></input></td>
								</tr>
				<%-- 				<tr>
									<td><select id="c_factory" class="input-medium"></select></td>
									<td><input id="c_date" class="input-medium"
										onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">
									</td>
									<td><input type="button" class="btn btn-primary"
										id="btnChartQuery" value="查询" style="margin-left: 2px;"></input></td>
								</tr> --%>
							</table>
						</form>
		
						<div id="chartContainer1" class="span7" style="height:300px"></div>
						<div id="chartContainer2" class="span4" style="height:300px"></div>
						
						<table id="tableChartContainer" class="table table-bordered" style="display:none">
							<thead>
							<tr>
								<th>车间</th>
								<th>上线数</th>
								<th>下线数</th>
								<th>计划达成率</th>
								<th>返修上线数</th>
								<th>返修下线数</th>
							</tr>	
							</thead>
							<tbody>
							
							</tbody>
						</table>
					</div>
				</div>
				<input type="hidden" id="factory_self" value="<s:property value='user.factory'></s:property>" />
				<input type="hidden" id="factory_id_self" value="<s:property value='user.factory_id'></s:property>" />
				<input type="hidden" id="department_self" value="<s:property value='user.department'></s:property>" />
			</div>
		</div>
	</div>
</body>
</html>