<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 生产监控·车间</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/production/productionMonitorWorkshop.js"></script>
	<style type="text/css" media="screen">
		#scrollText{
			width: 400px;margin-right: auto;margin-left: auto;
		}
		.welding{
			background-image:url('images/production_welding.png');background-repeat:no-repeat;
			width:900px;height:120px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
		}
		.fiberglass{
			background-image:url('images/production_fiberglass.png');background-repeat:no-repeat;
			width:250px;height:120px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
		}
		.painting{
			background-image:url('images/production_painting.png');background-repeat:no-repeat;
			width:600px;height:120px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
		}
		.chassis{
			background-image:url('images/production_chassis.png');background-repeat:no-repeat;
			width:600px;height:150px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
		}
		.assembly{
			background-image:url('images/production_assembly.png');background-repeat:no-repeat;
			width:1200px;height:140px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
		}
		.shakedowntest{
			background-image:url('images/production_shakedowntest.png');background-repeat:no-repeat;
			width:150px;height:122px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
		}
		.testline{
			background-image:url('images/production_testline.png');background-repeat:no-repeat;
			width:150px;height:152px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
		}
		.warehouse{
			background-image:url('images/production_warehouse.png');background-repeat:no-repeat;
			width:150px;height:168px;color: #FFF;font-weight:bold;font-size:9px;text-align:center; overflow-y: hidden; 
		}
	</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2"><!-- Main -->
			<legend style="margin:0 auto;">
			<select name="" id="search_factory" class="input-medium carType">
			</select>生产监控</legend>
			
			<div id="execution_welding" class="thumbnail" style="height:148px">
                <div class="welding tab-pane active" style="margin-left:10px">
	              
	            </div>
	            <div class="fiberglass tab-pane active" style="margin-left:595px;margin-top:-121px">
	            </div>
            </div>
            <table id="table_welding" style="text-align:center;table-layout:fixed;font-size:12px;width:600px" class="table table-bordered table-striped">
			<tr>
				<td width="80px">上线/计划:</td><td id="table_welding_online">0/0</td><td width="80px">下线/计划:</td><td id="table_welding_offline">0/0</td><td width="80px">车辆总数:</td><td id="table_welding_count">-</td>
			</tr>
			<tr>
				<td height="20px">异常信息：</td><td height="20px" colspan="5"><div style="height:20px;margin:-5px; padinng:0;" id="table_welding_info"></div></td>
			</tr>
			</table>
			
			<div id="execution_painting" class="thumbnail" style="height:125px">
				<div class="painting tab-pane active" style="margin-left:10px;margin-top:0px">
				</div>
			</div>
            <table id="table_painting" style="text-align:center;table-layout:fixed;font-size:12px;width:600px" class="table table-bordered table-striped">
			<tr>
				<td width="80px">上线/计划:</td><td id="table_painting_online">0/0</td><td width="80px">下线/计划:</td><td id="table_painting_offline">0/0</td><td width="80px">车辆总数:</td><td id="table_painting_count">-</td>
			</tr>
			<tr>
				<td height="20px">异常信息：</td><td height="20px" colspan="5"><div style="height:20px;margin:-5px; padinng:0;" id="table_painting_info"></div></td>
			</tr>
			</table>
			
			<div id="execution_chassis" class="thumbnail" style="height:150px">
				<div class="chassis tab-pane active" style="margin-left:10px;margin-top:0px">
				</div>
			</div>
            <table id="table_chassis" style="text-align:center;table-layout:fixed;font-size:12px;width:600px" class="table table-bordered table-striped">
			<tr>
				<td width="80px">上线/计划:</td><td id="table_chassis_online">0/0</td><td width="80px">下线/计划:</td><td id="table_chassis_offline">0/0</td><td width="80px">车辆总数:</td><td id="table_chassis_count">-</td>
			</tr>
			<tr>
				<td height="20px">异常信息：</td><td height="20px" colspan="5"><div style="height:20px;margin:-5px; padinng:0;" id="table_chassis_info"></div></td>
			</tr>
			</table>
			
			<div id="execution_assembly" class="thumbnail" style="height:160px">
				<div class="assembly tab-pane active" style="margin-left:10px">
				</div>
			</div>
            <table id="table_assembly" style="text-align:center;table-layout:fixed;font-size:12px;width:600px" class="table table-bordered table-striped">
			<tr>
				<td width="80px">上线/计划:</td><td id="table_assembly_online">0/0</td><td width="80px">下线/计划:</td><td id="table_assembly_offline">0/0</td><td width="80px">车辆总数:</td><td id="table_assembly_count">-</td>
			</tr>
			<tr>
				<td height="20px">异常信息：</td><td height="20px" colspan="5"><div style="height:20px;margin:-5px; padinng:0;" id="table_assembly_info"></div></td>
			</tr>
			</table>
			
		</div>	
		</div>
	</div>
</body>
</html>