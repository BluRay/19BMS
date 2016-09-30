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
<script type="text/javascript" src="js/report/production_pause_report.js"></script>
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
					<div >
						<form  class="form-search">
							<table >
								<tr>
									<td>工厂: <select id="c_factory" class="input-medium"></select></td>
									<td>日期: <input id="q_date_start" class="input-small"
									style="width: 100px"
									onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text">
									<span>-</span> <input id="q_date_end" class="input-small"
									style="width: 100px"
									onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text"></td>
									<td><input type="button" class="btn btn-primary"
										id="btnChartQuery" value="查询" style="margin-left: 2px;"></input></td>
								</tr>				
							</table>
						</form>
		
						<div id="chartContainer1" class="span7" style="height:300px"></div>
						<div id="chartContainer2" class="span4" style="height:300px"></div>
						
						<table id="tableChartContainer" class="table table-bordered" >
							<thead>
							</thead>
							<tbody>
							
							</tbody>
						</table>
					</div>
				<input type="hidden" id="factory_self" value="<s:property value='user.factory'></s:property>" />
				<input type="hidden" id="factory_id_self" value="<s:property value='user.factory_id'></s:property>" />
				<input type="hidden" id="department_self" value="<s:property value='user.department'></s:property>" />
			</div>
		</div>
	</div>
</body>
</html>