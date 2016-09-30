<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 订单</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/highcharts.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/report/afterSale_factory_report.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_aftersale_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">售后问题
                </legend>
			</div>
			<div style="max-width: 1200px;min-width: 600px;padding-left: 20px;text-align: center;" ><br/>
				<table align="center">
					<tr>
						<td>工厂：<select style="width:100px;" name="" id="factory_id" class="input-medium carType">
						</select></td>
						<td>车型：<select style="width:80px;" name="" id="bus_type_id" class="input-medium carType">
						</select></td>
						<td>客户：<input type="text" id="customer_name" class="input-medium carType" />
						</td>						
						<td >
							<input type="text"   type="text" name="start_date" id="start_date"  class="Wdate" style="height:30px;background-color: white;width:120px" onClick="WdatePicker({el:'start_date',dateFmt:'yyyy-MM-dd'});"/>
							至&nbsp;<input type="text" type="text" name="end_date" id="end_date" class="Wdate" onClick="WdatePicker({el:'end_date',dateFmt:'yyyy-MM-dd'});" style="height:30px;background-color: white;width:120px" />
						</td>
						<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;margin-top: -10px;"></input></td>	
					</tr>
				</table>
			</div>
			<div id="containerReport" style="max-width: 1000px;min-width: 500px;margin: auto;width: 900px;" align="center">
			
			</div>
			<table id="tableChartContainer" class="table table-bordered" style="max-width: 1000px;min-width: 500px;margin: auto;width: 700px;" align="center" >
				<thead>
					<tr>
						<th style="width: 60px;">序号</th>
						<th>工厂</th>
						<th>S类问题</th>
						<th>A类问题</th>
						<th>B类问题</th>
						<th>C类问题</th>
					</tr>	
				</thead>
				<tbody>
				
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>