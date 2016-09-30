<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>产品追踪卡新增</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/quality/prod_track_add.js"></script>
</head>
<body>
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_quality_left.jsp"%>
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<legend style="margin: 0 auto;">产品追踪卡新增</legend>
			<div style=" margin: 0 auto;">
				<br />
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>车号</td>
							<td>工厂</td>
							<td>车间</td>
							<td></td>
							<td></td>

						</tr>
						<tr>
							<td><input type="text" id="input_bus_no"
								class="input-medium carType" onkeypress="if(event.keyCode==13||event.which==13){return false;}"/></td>
							<td><select name="" id="input_factory"
								class="input-medium carType" disabled>
							</select></td>
							<td><select name="" id="input_workshop"class="input-medium carType">
								<option value="">全部</option>
							</select></td>
							<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="确定" style="margin-left: 2px;"></input>
								<input type="button" class="btn btn-success"
								id="btnSave" value="保存" style="margin-left: 2px;"></input></td>
							<td id="td_info" style="display:none">&nbsp;&nbsp;
							<label>订单：</label><span id="order_info"></span>
							&nbsp;&nbsp;
							<label>车型：</label><span id="busType_info"></span>
							&nbsp;&nbsp;
							<label>配置：</label><span id="config_info"></span>
							</td>									
						</tr>
					</table>
				</form>
				<form id="saveForm" method="post" action="prodTrackIn!addRecord.action">
				<table id="tableResult" class="table table-bordered"
					style="display:none" style="font-size: 12px;">
					<thead>
						<tr>
							<th>序号</th>
							<th>工序编号</th>
							<th>工序名称</th>
							<th>零部件名称</th>
							<th>零部件编号</th>
							<th>批次</th>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
				</form>
			</div>

		</div>
	</div>
</div>
</body>
</html>