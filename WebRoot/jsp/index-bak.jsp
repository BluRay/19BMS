<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>BMS</title>
<link href="<%=basePath%>/css/bootstrap.css" rel="stylesheet">
<link rel="stylesheet" href="<%=basePath%>/css/font-awesome.min.css">
<link href="<%=basePath%>/css/home.css" rel="stylesheet">
<script type="text/javascript" src="<%=basePath%>/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		$(".overlink").hover(function(){
			$(this).css("font-size","23pt");
			$(".overlink").css("width","80px");
			$(".overlink").css("height","50px");
		},function(){
			//alert("aa");
			$(this).css("font-size","18pt");
		});
	});
</script>
<style type="text/css">
	a:hover{color:black;text-decoration:none}
	.overlink{color:black}
</style>
</head>
<body style="background:url(<%=basePath%>/images/home-background.png) No-Repeat; Background-Size: 100% Auto;">
	<div id="maintContainer" class="container" style="width: 98%">
		<div class="row">
			<div class="span9" style="width: 98%">
				<div style="width: 100px; display: inline; margin-top: 15px;">
					<img src="<%=basePath%>/images/byd_logo.png" width="80px" height="80px">
				</div>
				<div style="width: 200px;display: inline; margin-left: 10px; text-align: center">
					<img src="<%=basePath%>/images/welcomeBMS.png" width="180px" height="180px">
				</div>
				<div class="pull-right"
					style="width: 500px; font-size: 20px; margin-top: 5px; margin-align: right; display: inline; text-align: right;">
					<div
						style="width: 10%; font-size: 20px; display: inline; margin-left: 60%; margin-top: 30px;">
						<%-- <s:property value="username"></s:property> --%>
						<%=session.getAttribute("user_name") %>
					</div>
					<div style="display: inline;">
						<img src="<%=basePath%>/images/power.png" style="width: 35px;height:35px">
					</div>
				</div>
				<div style="width: 1180px; margin-left: auto; margin-right: auto;margin-top:50px;">
					<ul class="thumbnails">
						<li style="width:280px;margin-bottom:10px;">
					<div id="planMaintain" class="thumbnail"
						style="border-radius:9px;border:0px;height: 163px; Background: Url('<%=basePath%>/images/home-1.png') No-Repeat Center Center; Background-Size: 100% Auto;Filter:Alpha(Opacity=10)">
						<div>
							<h4 align="left" style="color:white">我的任务</h4>
						</div>
						<div style="height: 20px"></div>
					</div>
				</li>
				<li style="width:580px;margin-bottom:10px;">
					<div id="planMaintain" class="thumbnail"
						style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-3.png') no-repeat ; background-size: 100% auto;filter:alpha(opacity=10)">
						<ul class="thumbnails">
						<li style="width:55px;">
							<h4 align="left" style="color:white">计划</h4>
						</li>
						<li style="width:480px;margin-top:20px;">
							<table style="text-align:center;color:white;font-size:15px;border:0;" height="120px">
								<tr>
									<td width="180px">订单</td>
									<td width="100px">计划产量</td>
									<td width="100px">完成产量</td>
									<td width="100px">状况</td>
								</tr>
								<tr>
									<td width="180px">K9A-DL-2015001</td>
									<td width="100px">100</td>
									<td width="100px">80</td>
									<td width="100px">正常</td>
								</tr>
								<tr>
									<td width="180px">K9B-HZ-2015001</td>
									<td width="100px">80</td>
									<td width="100px">50</td>
									<td width="100px">正常</td>
								</tr>
								<tr style="color:red">
									<td width="180px">K9B-HZ-2015011</td>
									<td width="100px">80</td>
									<td width="100px">50</td>
									<td width="100px">异常</td>
								</tr>
							</table>
						</li>
						</ul>
					</div>
				</li>
				<li style="width:280px;margin-bottom:10px;">
					<div id="planMaintain" class="thumbnail"
						style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-2.png') no-repeat center center; background-size: 100% auto;filter:alpha(opacity=10)">
						<div>
							<h4 align="left" style="color:white">异常</h4>
						</div>
						<div style="height: 20px"></div>
					</div>
				</li>
				<li style="width:280px;margin-bottom:10px;">
					<div id="planMaintain" class="thumbnail"
						style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-4.png') no-repeat center center; background-size: 100% auto;filter:alpha(opacity=10)">
						<div>
							<h4 align="left" style="color:white">焊装</h4>
						</div>
						<div style="height: 20px"></div>
					</div>
				</li>
				<li style="width:280px;margin-bottom:10px;">
					<div id="planMaintain" class="thumbnail"
						style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-5.png') no-repeat ; background-size: 100% auto;filter:alpha(opacity=10)">
						<div>
							<h4 align="left" style="color:white">涂装</h4>
						</div>
						<div style="height: 20px"></div>
					</div>
				</li>
				<li style="width:280px;margin-bottom:10px;">
					<div id="planMaintain" class="thumbnail"
						style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-6.png') no-repeat ; background-size: 100% auto;filter:alpha(opacity=10)">
						<div>
							<h4 align="left" style="color:white">底盘</h4>
						</div>
						<div style="height: 20px"></div>
					</div>
				</li>
				<li style="width:280px;margin-bottom:10px;">
					<div id="planMaintain" class="thumbnail"
						style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-7.png') no-repeat center center; background-size: 100% auto;filter:alpha(opacity=10)">
						<div>
							<h4 align="left" style="color:white">总装</h4>
						</div>
						<div style="height: 20px"></div>
					</div>
				</li>
					</ul>
				</div>
			</div>	
		</div>
		<div style="margin-top:50px;position:relative">
			<!-- <img src="images/home-8.png" style="width:120%;z-index:-1;"> -->
			<div style="height:125px;background: url('<%=basePath%>/images/home-8.png') no-repeat ; background-size: 100% auto;vertical-align:middle">
				<div style="height:30px;"></div>
				<div style="display:inline-block;width:100%;">
		
					<div style="width:80%;display:inline;margin-left:30px;">
						<table style="margin:0px auto;width:78%;text-align:center;font-size:18pt;">
						<tr>
							<td style="width:80px;height:50px"><a href="order!index.action" class="overlink">订单</a></td>
							<td style="width:80px;height:50px"><a href="plan!index.action" class="overlink">计划</a></td>
							<td style="width:80px;height:50px"><a href="production!index.action" class="overlink">生产</a></td>
							<td style="width:80px;height:50px"><a href="ecnDocument!index.action" class="overlink">技改</a></td>
							<td style="width:80px;height:50px"><a href="testTpl!index.action" class="overlink">品质</a></td>
							<td style="width:80px;height:50px"><a href="afterSale!index.action" class="overlink">售后</a></td>
							<td style="width:80px;height:50px"><a href="#" class="overlink">仓储</a></td>
							<td style="width:80px;height:50px"><a href="personnel!index.action" class="overlink">人事</a></td>
							<td style="width:80px;height:50px"><a href="#" class="overlink">报表</a></td>
							<td style="width:80px;height:50px"><a href="baseData!index.action" class="overlink">设置</a></td>
						</tr>
					</table>
					</div>

				</div>
			</div>
		</div>
	</div>
</body>
</html>
