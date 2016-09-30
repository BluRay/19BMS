<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>生产分析报表</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/velocity.min.js"></script>
<script type="text/javascript" src="js/velocity.ui.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$.Velocity.RegisterEffect('img.bigger',{
		defaultDuration:50,
		calls:[[{scaleX:1.05,scaleY:1.05}]]
	});
	$.Velocity.RegisterEffect('img.smaller',{
		defaultDuration:10,
		calls:[[{scaleX:1,scaleY:1}]]
	});
	
	$("img").on("mouseover",function(){
		$(this).velocity('img.bigger');
	});
	$("img").on("mouseout",function(){
		$(this).velocity('img.smaller');
	});
});
</script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_report_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="container">
				<div class="row-fluid" style="margin:auto;width:1000px;height:240px;margin-top:10px">
					<div class="span12" >
						<ul class="thumbnails">
							<li class="span6">
							  	<div class="thumbnail" style="width:100%;height:240px">
							  		<a href="productionReport!dailyReport.action">
							  		<img alt="" src="<%=basePath%>/images/production_report_1.png" style="width:100%;height:230px"></a>
							  	</div>
							</li>
							<li class="span6">
								<div class="thumbnail" style="width:100%;height:240px;color:pink">
								<a href="productionReport!exceptionReport.action">
							  		<img alt="" src="<%=basePath%>/images/production_report_2.png" style="width:100%;height:230px">
							  	</a>
							  	</div>
							</li>							
						</ul>
				</div>
			</div>
			<div class="row-fluid" style="margin:auto;width:1000px;height:240px;">
					<div class="span12" >
						<ul class="thumbnails">
							<li class="span6">
							  	<div class="thumbnail" style="width:100%;height:240px;color:pink">
							  	<a href="productionReport!pauseReport.action">
							  		<img alt="" src="<%=basePath%>/images/production_report_3.png" style="width:100%;height:230px">
							  	</a>
							  	</div>
							</li>
			<%-- 				<li class="span6">
								<div class="thumbnail" style="width:100%;height:240px;color:pink">
							  		<img alt="" src="<%=basePath%>/images/order_report_2.png" style="width:100%;height:230px">
							  	</div>
							</li>	 --%>						
						</ul>
				</div>
			</div>
			</div>
		</div>
	</div>
</body>
</html>