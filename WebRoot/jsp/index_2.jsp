<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8;width=device-width, initial-scale=1.0" />
<title>BMS</title>
<link href="<%=basePath%>/css/bootstrap.css" rel="stylesheet">
<link href="<%=basePath%>/css/bootstrap-responsive.css" rel="stylesheet">
<link rel="stylesheet" href="<%=basePath%>/css/font-awesome.min.css">
<link href="<%=basePath%>/css/home.css" rel="stylesheet">
<script type="text/javascript"
	src="<%=basePath%>/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		$(".overlink").hover(function() {
			$(this).css("font-size", "23pt");
			$(".overlink").css("width", "80px");
			$(".overlink").css("height", "50px");
		}, function() {
			//alert("aa");
			$(this).css("font-size", "22px");
		});
	});
</script>
<style type="text/css">
a:hover {
	color: black;
	text-decoration: none
}

.overlink {
	color: black
}
.thumbnail {
    display: block;
    padding: 4px;
    line-height: 20px;
    border: 1px solid #DDD;
    border-radius: 4px;
  /*   box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.055); */
    transition: all 0.2s ease-in-out 0s;
}
</style>
</head>
<body
	style="background:url(<%=basePath%>/images/home-background.png) No-Repeat; Background-Size: 100% Auto;">
	<div id="maintContainer" class="container">
		<div class="row-fluid">
			<div style="width: 10%; display: inline; margin-top: 15px;">
				<img src="<%=basePath%>/images/byd_logo.png"
					style="width: 7%; height: auto">
			</div>
			<div
				style="width: 20%; display: inline; margin-left: 10px; text-align: center">
				<img src="<%=basePath%>/images/welcomeBMS.png" style="width: 18%;">
			</div>
			<div class="pull-right"
				style="width: 45%; margin-top: 5px; margin-align: right; display: inline; text-align: right;">
				<div
					style="width: 10%; font-size: 120%; display: inline; margin-left: 60%; margin-top: 30px;">
					<%-- <s:property value="username"></s:property> --%>
					<%=session.getAttribute("user_name")%>
				</div>
				<div style="display: inline;">
					<img src="<%=basePath%>/images/power.png" style="width: 6%;">
				</div>
			</div>
		</div>
		<div class="row-fluid" style="margin-top:50px">
			<div class="span12">
				<ul class="thumbnails" style="line-heigth:20px">
					<li class="span3">
						<div id="planMaintain" class="thumbnail"
							style="border-radius:9px;border:0px;height: 163px; Background: Url('<%=basePath%>/images/home-1.png') No-Repeat; Background-Size: 100% Auto;Filter:Alpha(Opacity=10)">
							<div>
								<h4 align="left" style="color: white">我的任务</h4>
							</div>
							<div style="height: 20px"></div>
						</div>
					</li>
					<li class="span6">
						<div id="planMaintain" class="thumbnail"
							style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-3.png') no-repeat ; background-size: 100% auto;filter:alpha(opacity=10)">
								<div class="span2">
									<h4 align="left" style="color: white">计划</h4>
								</div>
								<div class="span10">
									<table
										style="text-align: center; color: white; font-size: 100%;margin-top:10px; border: 0;">
										<tr>
											<td width="40%">订单</td>
											<td width="15%">计划产量</td>
											<td width="15%">完成产量</td>
											<td width="15%">状况</td>
										</tr>
										<tr>
											<td width="40%">K9A-DL-2015001</td>
											<td width="15%">100</td>
											<td width="15%">80</td>
											<td width="15%">正常</td>
										</tr>
										<tr>
											<td width="40%">K9B-HZ-2015001</td>
											<td width="15%">80</td>
											<td width="15%">50</td>
											<td width="15%">正常</td>
										</tr>
										<tr style="color: red">
											<td width="40%">K9B-HZ-2015011</td>
											<td width="15%">80</td>
											<td width="15%">50</td>
											<td width="15%">异常</td>
										</tr>
									</table>
								</div>
						</div>
					</li>
					<li class="span3">
						<div id="planMaintain" class="thumbnail"
							style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-2.png') no-repeat; background-size: 100% auto;filter:alpha(opacity=10)">
							<div>
								<h4 align="left" style="color: white">异常</h4>
							</div>
							<div style="height: 20px"></div>
						</div>
					</li>
				</ul>
			</div>
			</div>
			<div class="row-fluid">
			<div class="span12">
				<ul class="thumbnails">
					<li class="span3">
						<div id="planMaintain" class="thumbnail"
							style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-4.png') no-repeat; background-size: 100% auto;filter:alpha(opacity=10)">
							<div class="span3">
								<h4 align="left" style="color: white">焊装</h4>
							</div>
							<div class="span9"></div>
						</div>
					</li>
					<li class="span3">
						<div id="planMaintain" class="thumbnail"
							style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-5.png') no-repeat ; background-size: 100% auto;filter:alpha(opacity=10)">
							<div>
								<h4 align="left" style="color: white">涂装</h4>
							</div>
							<div style="height: 20px"></div>
						</div>
					</li>
					<li class="span3">
						<div id="planMaintain" class="thumbnail"
							style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-6.png') no-repeat ; background-size: 100% auto;filter:alpha(opacity=10)">
							<div>
								<h4 align="left" style="color: white">底盘</h4>
							</div>
							<div style="height: 20px"></div>
						</div>
					</li>
					<li class="span3">
						<div id="planMaintain" class="thumbnail"
							style="border-radius:9px;border:0px;height: 163px; background: url('<%=basePath%>/images/home-7.png') no-repeat; background-size: 100% auto;filter:alpha(opacity=10)">
							<div>
								<h4 align="left" style="color: white">总装</h4>
							</div>
							<div style="height: 20px"></div>
						</div>
					</li>
				</ul>
			</div>
			</div>
		<div style="margin-top: 50px; position: relative">

			<div
				style="height:80px;background: url('<%=basePath%>/images/home-8.png') no-repeat ; background-size: 100% auto;vertical-align:middle">
				
				<div style="display: inline-block; width: 100%;">

					<div style="width: 80%; display: inline; margin-left: 30px;">
						<table
							style="margin: 0px auto; width: 78%; text-align: center; font-size: 22px;">
							<tr>
								<td style="width: 10%; height: 50px"><a
									href="order!index.action" class="overlink">订单</a></td>
								<td style="width: 10%; height: 50px"><a
									href="plan!index.action" class="overlink">计划</a></td>
								<td style="width: 10%; height: 50px"><a
									href="production!index.action" class="overlink">生产</a></td>
								<td style="width: 10%; height: 50px"><a
									href="ecnDocument!index.action" class="overlink">技改</a></td>
								<td style="width: 10%; height: 50px"><a
									href="testTpl!index.action" class="overlink">品质</a></td>
								<td style="width: 10%; height: 50px"><a href="#"
									class="overlink">售后</a></td>
								<td style="width: 10%; height: 50px"><a href="#"
									class="overlink">仓储</a></td>
								<td style="width: 10%; height: 50px"><a href="#"
									class="overlink">人事</a></td>
								<td style="width: 10%; height: 50px"><a href="#"
									class="overlink">报表</a></td>
								<td style="width: 10%; height: 50px"><a
									href="baseData!index.action" class="overlink">设置</a></td>
							</tr>
						</table>
					</div>

				</div>
			</div>
		</div>
	</div>
</body>
</html>
