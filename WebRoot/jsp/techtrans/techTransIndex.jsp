<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 技改单维护</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/highcharts.js"></script>
	<script type="text/javascript" src="js/exporting.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="js/report/ecn_time_report.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_techtrans_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">技改单</legend>
			</div>
						<div style="max-width: 1200px;min-width: 600px;padding-left: 20px;text-align: center;" ><br/>
				<table align="center">
					<tr>
						<td>工厂：<select name="" id="factory_id" class="input-medium carType">
						</select></td>
						<td >
							<input type="text"   type="text" name="start_date" id="start_date"  class="Wdate" style="height:30px;background-color: white;width:120px" onClick="WdatePicker({el:'start_date',dateFmt:'yyyy-MM-dd'});"/>
							至&nbsp;<input type="text" type="text" name="end_date" id="end_date" class="Wdate" onClick="WdatePicker({el:'end_date',dateFmt:'yyyy-MM-dd'});" style="height:30px;background-color: white;width:120px" />
						</td>
						<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;margin-top: -10px;"></input></td>	
						<td>&nbsp;&nbsp;<input type="radio" name="xx" class="radio" id="week" checked="checked" value="W" style="margin-left: 2px;">本周</input>
						&nbsp;&nbsp;<input type="radio" name="xx" class="radio" id="month" value="M" style="margin-left: 2px;">本月</input>
						&nbsp;&nbsp;<input type="radio" name="xx" class="radio" id="year" value="Y" style="margin-left: 2px;">本年</input>
						</td>
					</tr>
				</table>
			</div>
			<div id="containerReport" style="max-width: 1000px;min-width: 500px;margin: auto;" align="center">
				
			</div>
			<table id="tableChartContainer" class="table table-bordered" style="max-width: 1000px;min-width: 500px;margin: auto;" align="center" >
				<thead>
					<tr>
						<th style="width: 130px;">车间</th>
						<th>自制件</th>
						<th>部件</th>
						<th>焊装</th>
						<th>玻璃钢</th>
						<th>涂装</th>
						<th>底盘</th>
						<th>总装</th>
						<th>合计</th>
					</tr>	
				</thead>
				<tbody>
				
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>