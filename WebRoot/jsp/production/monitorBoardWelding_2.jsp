<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
  <head>
  	<meta charset="UTF-8">
    <title>焊装车间板</title>
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="css/workshopBoard_assembly.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
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
    	<div class="div_board">
    		<div id="board_left" class="board_main2" style="margin-left:5px;"><img src="images/assembly_left.png" style="margin-top:60px;margin-left:60px"/></div>
    		<div id="board_main" class="board_main" style="background:rgb(116, 184, 242);width:333px">
    			<table class="board_table" id="welding_board">
    				<tr><td>焊装上线</td></tr>
<!--     				<tr><td id="welding_left"></td></tr> -->
    			</table>
    		</div>
    		<div id="board_main" class="board_main" style="background: rgb(33, 213, 61);width:333px">
				<table class="board_table" id="welding_board">
    				<tr><td>焊装下线</td></tr>
<!--     				<tr><td id="bottom_left"></td></tr> -->
    			</table>
			</div>
    		<div id="board_assemble" class="board_main" style="background: #00ffff;width:333px">
    			<table class="board_table" id="welding_board">
    				<tr><td>玻璃钢下线</td></tr>
    	<!-- 			<tr><td id="assembly_left"></td></tr> -->
    			</table>
    		</div>
    		<div id="board_right" class="board_main2"><img src="images/assembly_right.png" style="margin-top:60px;margin-right:65px"/></div>
    	</div>
    	<div class="div_board">
    		<div id="board_left" class="board_main2" style="background:#00ffff;margin-left:5px">
				<table class="board_table" id="welding_board">
    				<tr><td>部件</td></tr>
    				<!-- <tr><td id="parts_balance"></td></tr> -->
    			</table>
			</div>
    		<div id="board_main" class="board_production" >
    			<table class="board_table" id="welding_board">
    				<tr >
    					<td width="333px" style="text-align:center;font-size:44px">生产完成</td>
    					<td width="333px" style="text-align:center;font-size:44px">生产完成</td>
    					<td width="333px" style="text-align:center;font-size:44px">生产完成</td>
    				</tr>
    				<tr>
    					<td width="333px" id="online_welding" style="font-size:55px"></td>
    					<td width="333px" id="offline_welding" style="font-size:55px"></td>
    					<td width="333px" id="offline_glass" style="font-size:55px"></td>
    				</tr>
    			</table>
    		</div>   		
    		<div id="board_right" class="board_main2" style="background:rgb(116, 184, 242)">
				<table class="board_table" id="welding_board">
    				<tr><td>涂装</td></tr>
    			<!-- 	<tr><td id="check_left"></td></tr> -->
    			</table>
			</div>
    	</div>
    	
    	<div class="div_board" style="padding-top: 0px">
    		<div id="board_left" class="board_main2" style="width:172px">				
			</div>
    		<div id="board_main" class="board_production" >
    			<table class="board_table2" id="welding_board">
    				<tr >
    					<td width="333px" style="text-align:center;font-size:44px">车辆总数</td>
    					<td width="333px" style="text-align:center;font-size:44px">DPU</td>
    					<td width="333px" style="text-align:center;font-size:44px">合格率</td>
    				</tr>
    				<tr>
    					<td width="333px" id="welding_left" style="font-size:55px"></td>
    					<td width="333px" id="dpu_welding" style="font-size:55px"></td>
    					<td width="333px" id="rate_welding" style="font-size:55px"></td>
    				</tr>
    			</table>
    		</div>   		
    		<!-- <div id="board_right" class="board_main2">
				<table class="board_table" id="welding_board">
    				<tr><td style="font-size:36px">上线:</td><td style="color:green;font-size:55px" id="online_testline"></td></tr>
    				<tr><td style="font-size:36px">下线:</td><td style="color:green;font-size:55px" id="offline_testline"></td></tr>
    			</table>
			</div> -->
    	</div>
    	<div class="div_foot" id="board_exception">
    		暂无异常信息
    	</div>
    </div>
  </body>
</html>
