<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 成本</title>
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
	<script type="text/javascript" src="js/report/total_cost_report.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_selfcost_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">各工厂总共制造费用</legend>
				
			</div>
			<div style="max-width: 1200px;min-width: 600px;padding-left: 20px;text-align: center;" ><br/>
				<table align="center">
					<tr>
						<!-- <td>工厂：<select name="" id="factory_id" class="input-medium carType">
						</select></td> -->
						<td >
							<input type="text"   type="text" name="cost_month" id="cost_month"  class="Wdate" style="height:30px;background-color: white;width:120px" onClick="WdatePicker({el:'cost_month',dateFmt:'yyyy-MM'});"/>
						</td>
						<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;margin-top: -10px;"></input></td>	
					</tr>
				</table>
			</div>
			<div id="containerReport" style="max-width: 100%;min-width: 500px;margin: auto;" align="center">
				
			</div>
			<table id="tableContainer" class="table table-bordered" style="max-width: 90%;min-width: 500px;margin: auto;" align="center" >
				<thead>
					<tr>
						<th>机器费用</th>
						<th>其他材料消耗</th>
						<th>其他费用</th>
						<th>模具费用</th>
						<th>燃料动力</th>
						<th>人工费用</th>
						<th>工厂</th>
					</tr>	
				</thead>
				<tbody>
				
				</tbody>
			</table>
			
		</div>
	</div>
</body>
</html>