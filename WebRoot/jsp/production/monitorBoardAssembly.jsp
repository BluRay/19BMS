<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
  <head>
  	<meta charset="UTF-8">
    <title>总装车间板</title>
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="css/workshopBoard_assembly.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript" src="js/production/mornitorBoardAssembly.js"></script>
  </head>
  <body>
    <div class="main">
    	<div class="div_head">
    		<div id="board_logo"><img id="byd_logo" src="images/byd_logo.png" alt="BYD AUTO"></img></div>
    		<div id="board_title">长沙工厂欢迎您 </div>
    		<div id="board_time">&nbsp;</div>
    	</div>
    	<div class="board_work" id="production_info">
    		总装B线停线 技术资料-变更
    	</div>
    	<div class="div_board">
    		<div id="board_left" class="board_main2" style="margin-left:5px;"><img src="images/assembly_left.png" style="margin-top:60px;margin-left:60px"/></div>
    		<div id="board_main" class="board_main" style="background:#ff9900">
    			<table class="board_table" id="welding_board">
    				<tr><td>焊装</td></tr>
    				<tr><td id="welding_left"></td></tr>
    			</table>
    		</div>
    		<div id="board_assemble" class="board_main" style="background: #00ccff">
    			<table class="board_table" id="welding_board">
    				<tr><td>涂装</td></tr>
    				<tr><td id="painting_left"></td></tr>
    			</table>
    		</div>
    		<div id="board_main" class="board_main" style="background: #ffcc00">
				<table class="board_table" id="welding_board">
    				<tr><td>底盘</td></tr>
    				<tr><td id="bottom_left"></td></tr>
    			</table>
			</div>
    		<div id="board_assemble" class="board_main" style="background: #00ffff">
    			<table class="board_table" id="welding_board">
    				<tr><td>总装</td></tr>
    				<tr><td id="assembly_left"></td></tr>
    			</table>
    		</div>
    		<div id="board_right" class="board_main2"><img src="images/assembly_right.png" style="margin-top:60px;margin-right:65px"/></div>
    	</div>
    	<div class="div_board">
    		<div id="board_left" class="board_main2" style="background:#00ffff;margin-left:5px">
				<table class="board_table" id="welding_board">
    				<tr><td>部件</td></tr>
    				<tr><td id="parts_balance"></td></tr>
    			</table>
			</div>
    		<div id="board_main" class="board_production" >
    			<table class="board_table2" id="welding_board">
    				<tr >
    					<td width="100px" style="text-align:right;font-size:36px">上线:</td>
    					<td width="150px" id="online_welding" style="font-size:55px"><span style="color:green;font-size:55px">1</span>/<span style="color:blue;font-size:55px">8</span></td>
    					<td width="250px" id="online_painting" style="font-size:55px"><span style="color:green;font-size:55px">1</span>/<span style="color:blue;font-size:55px">8</span></td>
    					<td width="250px" id="online_bottom" style="font-size:55px"><span style="color:green;font-size:55px">1</span>/<span style="color:blue;font-size:55px">8</span></td>
    					<td width="250px" id="online_assembly" style="font-size:55px"><span style="color:green;font-size:55px">1</span>/<span style="color:blue;font-size:55px">8</span></td>
    				</tr>
    				<tr>
    					<td width="100px" style="text-align:right;font-size:36px">下线:</td>
    					<td width="150px" id="offline_welding" style="font-size:55px"><span style="color:green;font-size:55px">1</span>/<span style="color:blue;font-size:55px">8</span></td>
    					<td width="250px" id="offline_painting" style="font-size:55px"><span style="color:green;font-size:55px">1</span>/<span style="color:blue;font-size:55px">8</span></td>
    					<td width="250px" id="offline_bottom" style="font-size:55px"><span style="color:green;font-size:55px">1</span>/<span style="color:blue;font-size:55px">8</span></td>
    					<td width="250px" id="offline_assembly" style="font-size:55px"><span style="color:green;font-size:55px">1</span>/<span style="color:blue;font-size:55px">8</span></td>
    				</tr>
    			</table>
    		</div>   		
    		<div id="board_right" class="board_main2" style="background:#ff9900">
				<table class="board_table" id="welding_board">
    				<tr><td>检测线</td></tr>
    				<tr><td id="check_left"></td></tr>
    			</table>
			</div>
    	</div>
    	
    	<div class="div_board" style="padding-top: 0px">
    		<div id="board_left" class="board_main2" style="width:150px">				
			</div>
    		<div id="board_main" class="board_production" >
    			<table class="board_table2" id="welding_board">
    				<tr >
    					<td width="105px" style="text-align:right;font-size:36px">DPU:</td>
    					<td width="150px" style="color:green;font-size:55px" id="dpu_welding"></td>
    					<td width="250px" style="color:green;font-size:55px" id="dpu_painting"></td>
    					<td width="250px" style="color:green;font-size:55px" id="dpu_bottom"></td>
    					<td width="250px" style="color:green;font-size:55px" id="dpu_assembly"></td>
    				</tr>
    				<tr>
    					<td width="125px" style="text-align:right;font-size:36px">合格率:</td>
    					<td width="150px" style="color:green;font-size:48px" id="rate_welding"></td>
    					<td width="250px" style="color:green;font-size:48px" id="rate_painting"></td>
    					<td width="250px" style="color:green;font-size:48px" id="rate_bottom"></td>
    					<td width="250px" style="color:green;font-size:48px" id="rate_assembly"></td>
    				</tr>
    			</table>
    		</div>   		
    		<div id="board_right" class="board_main2">
				<table class="board_table" id="welding_board">
    				<tr><td style="font-size:36px">上线:</td><td style="color:green;font-size:55px" id="online_testline"></td></tr>
    				<tr><td style="font-size:36px">下线:</td><td style="color:green;font-size:55px" id="offline_testline"></td></tr>
    			</table>
			</div>
    	</div>
    	<div class="div_foot" id="board_exception">
    		暂无异常信息
    	</div>
    </div>
  </body>
</html>
