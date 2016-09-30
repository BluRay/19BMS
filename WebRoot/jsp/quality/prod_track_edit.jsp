<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>产品追踪卡编辑</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/quality/prod_track_edit.js"></script>
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
							<td width="50px"><strong>车号:</strong></td>
							<td ><span id="busNo"></span>&nbsp;&nbsp;</td>
							<td width="50px"><strong>工厂:</strong></td>
							<td ><span id="factory"></span>&nbsp;&nbsp;</td>
							<td width="50px"><strong>车型:</strong></td>
							<td ><span id="busType"></span>&nbsp;&nbsp;</td>
							<td width="50px"><strong>订单:</strong></td>
							<td ><span id="order"></span>&nbsp;&nbsp;</td>
							<td width="50px"><strong>配置:</strong></td>
							<td ><span id="orderConfig"></span>&nbsp;&nbsp;</td>
							<td><input type="button" class="btn btn-success"
								id="btnSave" value="保存" style="margin-left: 2px;"></input></td>
						</tr>
					</table>
				</form>
				<input type="hidden" id="q_factoryId"
					value="<s:property value="trackHeader.factoryId"/>">
				<input type="hidden" id="q_busNo"
					value="<s:property value="trackHeader.busNo"/>">
			
				<div role="tabpanel" >
					<!-- Nav tabs -->
					<ul class="nav nav-pills" role="tablist" style="height: 30px">
						<li role="presentation" style="display:none"  id="welding_li"><a href="#welding"
							aria-controls="welding" role="tab" data-toggle="tab" onclick="generateTable('焊装')">焊装</a></li>
						<li role="presentation" style="display:none"  id="painting_li"><a href="#painting"
							aria-controls="painting" role="tab" data-toggle="tab" onclick="generateTable('涂装')">涂装</a></li>
						<li role="presentation" style="display:none" id="bottom_li"><a href="#bottom"
							aria-controls="bottom" role="tab" data-toggle="tab" onclick="generateTable('底盘')">底盘</a></li>
						<li role="presentation" style="display:none" id="assembly_li"><a href="#assembly"
							aria-controls="assembly" role="tab" data-toggle="tab" onclick="generateTable('总装')">总装</a></li>
					</ul>
					<!-- Tab panes -->
					<form action="prodTrackIn!updateRecord.action" method="post" id="saveForm">
					<div class="tab-content" >
					
						<div role="tabpanel" class="tab-pane" id="welding">							
							<table class="table table-bordered">
								<thead>
									<tr>
										<th>序号</th>
										<th>工序编号</th>
										<th>工序名称</th>
										<th >零部件名称</th>
										<th>零部件编号</th>
										<th >批次</th>
										
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane " id="painting">
						<table class="table table-bordered">
								<thead>
									<tr>
										<th>序号</th>
										<th>工序编号</th>
										<th>工序名称</th>
										<th >零部件名称</th>
										<th>零部件编号</th>
										<th >批次</th>
										
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane " id="bottom">
						<table class="table table-bordered">
								<thead>
									<tr>
										<th>序号</th>
										<th>工序编号</th>
										<th>工序名称</th>
										<th >零部件名称</th>
										<th>零部件编号</th>
										<th >批次</th>
										
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane " id="assembly">
						<table class="table table-bordered">
								<thead>
									<tr>
										<th>序号</th>
										<th>工序编号</th>
										<th>工序名称</th>
										<th >零部件名称</th>
										<th>零部件编号</th>
										<th >批次</th>
								
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						
					</div>
					</form>
				</div>


			</div>
		</div>
	</div>
</body>
</html>