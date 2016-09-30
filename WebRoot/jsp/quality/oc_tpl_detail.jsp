<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>订单配置与一致性记录表模板预览</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/quality/oc_tpl_detail.js"></script>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="/jsp/common/general_quality_left.jsp"%>
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->

				<form id="form" class="well form-search">
					<table>
						<tr>
							<td width="50px"><strong>车型:</strong></td>
							<td ><s:property value="tplHeader.busType" />&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td width="50px"><strong>订单:</strong></td>
							<td><s:property value="tplHeader.order" />&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td width="50px"><strong>配置:</strong></td>
							<td><s:property value="tplHeader.config" /></td>
							<td></td>
						</tr>
					</table>
				</form>
				<input type="hidden" id="tplHeaderId"
					value="<s:property value="tplHeader.id" />">
				<div role="tabpanel" >
					<!-- Nav tabs -->
					<ul class="nav nav-pills" role="tablist" style="height: 30px">
						<li role="presentation" class="active"><a href="#welding"
							aria-controls="welding" role="tab" data-toggle="tab" onclick="generateTable('焊装')">焊装</a></li>
						<li role="presentation"><a href="#painting"
							aria-controls="painting" role="tab" data-toggle="tab" onclick="generateTable('涂装')">涂装</a></li>
						<li role="presentation"><a href="#bottom"
							aria-controls="bottom" role="tab" data-toggle="tab" onclick="generateTable('底盘')">底盘</a></li>
						<li role="presentation"><a href="#assembly"
							aria-controls="assembly" role="tab" data-toggle="tab" onclick="generateTable('总装')">总装</a></li>
					</ul>
					<!-- Tab panes -->
					<div class="tab-content" >
						<div role="tabpanel" class="tab-pane active" id="welding">
							<table class="table table-bordered" style="min-width: 680px;">
								<thead>
									<tr>
										<th width="80px">序号</th>
										<th width="320px">零部件名称</th>
										<th width="250px">零部件编号</th>
										<th>供应商</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane " id="painting">
						<table class="table table-bordered" style="min-width: 680px;">
								<thead>
									<tr>
										<th width="80px">序号</th>
										<th width="320px">零部件名称</th>
										<th width="250px">零部件编号</th>
										<th>供应商</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane " id="bottom">
						<table class="table table-bordered" style="min-width: 680px;">
								<thead>
									<tr>
										<th width="80px">序号</th>
										<th width="320px">零部件名称</th>
										<th width="250px">零部件编号</th>
										<th>供应商</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane " id="assembly">
						<table class="table table-bordered" style="min-width: 680px;">
								<thead>
									<tr>
										<th width="80px">序号</th>
										<th width="320px">零部件名称</th>
										<th width="250px">零部件编号</th>
										<th>供应商</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>
				</div>


			</div>
		</div>
	</div>
</body>
</html>