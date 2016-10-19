<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
  <head>
  	<meta charset="UTF-8">
    <title>焊装车间板</title>
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="css/workshopBoard_assembly.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript" src="js/production/mornitorBoardWelding.js"></script>
  </head>
  <body>
    <div class="main">
    	<div class="div_head">
    		<div id="board_logo"><img id="byd_logo" src="images/byd_logo.png" alt="BYD AUTO"></img></div>
    		<div id="board_title">焊装车间欢迎您 </div>
    		<div id="board_time">&nbsp;</div>
    	</div>
    	<div class="board_work" id="production_info">
    		正常生产中
    	</div>
    	<div class="div_board_welding">
    		<div class="parts_data" style="top: 10px; left: 110px;"><span style="color:green">1</span>/<span style="color:blue">8</span></div>
    		<div class="parts_data" style="top: 22px; left: 110px;"><span style="color:green">1</span>/<span style="color:blue">8</span></div>
    		<div class="parts_data" style="top: 34px; left: 110px;"><span style="color:green">1</span>/<span style="color:blue">8</span></div>
    		<div class="parts_data" style="top: 46px; left: 110px;"><span style="color:green">1</span>/<span style="color:blue">8</span></div>
    		<div class="parts_data" style="top: 58px; left: 110px;"><span style="color:green">1</span>/<span style="color:blue">8</span></div>
    		<div class="parts_data" style="top: 70px; left: 110px;"><span style="color:green">1</span>/<span style="color:blue">8</span></div>
    		<!-- A工序 -->
    		<div class="process_name" style="top: -263px;left: 288px;background-color:yellow"><span style="color:black;font-weight:bold">HA2</span></div>
    		<div class="process_name" style="top: -343px;left: 452px;background-color:red"><span style="color:black;font-weight:bold">HA2</span></div>
    		<div class="process_name" style="top: -423px; left: 618px;background-color:red"><span style="color:black;font-weight:bold">HA2</span></div>
    		<div class="process_name" style="top: -503px;left: 785px;background-color:red"><span style="color:black;font-weight:bold">HA2</span></div>
    		<div class="process_name" style="top: -583px;left: 949px;background-color:red"><span style="color:black;font-weight:bold">HA2</span></div>
    		<div class="process_name" style="top: -663px;left: 1184px;background-color:red"><span style="color:black;font-weight:bold">HA2</span></div>
    		
    		<!-- B工序 -->
    		<div class="process_name" style="top: -558px;left: 288px;background-color:red"><span style="color:black;font-weight:bold">HA2</span></div>
    		<div class="process_name" style="top: -638px;left: 452px;background-color:red"><span style="color:black;font-weight:bold">HA2</span></div>
    		<div class="process_name" style="top: -718px; left: 618px;background-color:red"><span style="color:black;font-weight:bold">HA2</span></div>
    		<div class="process_name" style="top: -798px;left: 785px;background-color:red"><span style="color:black;font-weight:bold">HA2</span></div>
    		<div class="process_name" style="top: -878px;left: 949px;background-color:red"><span style="color:black;font-weight:bold">HA2</span></div>
    		<div class="process_name" style="top: -958px;left: 1184px;background-color:red"><span style="color:black;font-weight:bold">HA2</span></div>
    		
    		
    		<div class="process_name" style="top: -1162px;left: 288px;"><span style="color:green;font-weight:bold">4</span></div>
    		<div class="process_name" style="top: -1242px;left: 452px;"><span style="color:green;font-weight:bold">4</span></div>
    		<div class="process_name" style="top: -1322px; left: 618px;"><span style="color:green;font-weight:bold">4</span></div>
    		<div class="process_name" style="top: -1402px;left: 785px;"><span style="color:green;font-weight:bold">4</span></div>
    		<div class="process_name" style="top: -1482px;left: 949px;"><span style="color:green;font-weight:bold">4</span></div>
    		<div class="process_name" style="top: -1562px;left: 1183px;"><span style="color:green;font-weight:bold">4</span></div>
    		
    		<div class="process_name" style="top: -1457px;left: 288px;"><span style="color:green;font-weight:bold">4</span></div>
    		<div class="process_name" style="top: -1537px;left: 452px;"><span style="color:green;font-weight:bold">4</span></div>
    		<div class="process_name" style="top: -1617px; left: 618px;"><span style="color:green;font-weight:bold">4</span></div>
    		<div class="process_name" style="top: -1697px;left: 785px;"><span style="color:green;font-weight:bold">4</span></div>
    		<div class="process_name" style="top: -1777px;left: 949px;"><span style="color:green;font-weight:bold">4</span></div>
    		<div class="process_name" style="top: -1857px;left: 1183px;"><span style="color:green;font-weight:bold">4</span></div>
    		
    	</div>
		<div style="height:80px;margin-top:15px">
			<table style="height:80px;line-weight:80px;font-size:46px;font-weight:bold;color:black;text-align:left">
				<tr>
					<td width="15%">车辆总数:</td>
					<td width="10%" ><span style="color:green">24</span>台</td>
					<td width="8%">上线:</td>
					<td width="12%"><span style="color:green">18</span>/<span style="color:blue">18</span></td>
					<td width="8%">下线:</td>
					<td width="12%"><span style="color:green">10</span>/<span style="color:blue">18</span></td>
					<td width="8%">DPU:</td>
					<td width="5%"><span style="color:green">3</span></td>
					<td width="12%">合格率:</td>
					<td width="8%"><span style="color:green">90%</span></td>
				</tr>
			</table>
		</div>
    	<div class="div_foot_w" id="board_exception" style="overflow: hidden;">
    		暂无异常信息
    	</div>
    </div>
  </body>
</html>
