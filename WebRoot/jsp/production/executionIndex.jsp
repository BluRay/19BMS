<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 生产扫描</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/production/executionIndex.js"></script>
	<style type="text/css">
		.myselect {
		border: 0px none;
		-moz-appearance: none;
		-webkit-appearance: none;
		font-size: 100%;
		margin-bottom: 3px;
		color: #598af0;
		width: 80px;
		padding: 0px;
		height:27px
		}
	</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="margin: 0 auto;">
				<span style="font-size:100%;">生产扫描&nbsp;&nbsp;</span>
				<span style="font-size:100%;">></span>
				<select name="" id="search_factory" class="myselect">
				</select>
				<span style="font-size:100%;">></span>
				<select name="" id="search_workshop" class="myselect">				
				</select>
				</legend>
				
			</div>
			
			<div style="margin-left: 30px;">
				 <canvas id="first_canvas" width=1100 height=80
					style="border: solid 0px;"> 
					
				</canvas> 
			</div>

		</div>
	</div>
</body>
</html>	