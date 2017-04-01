<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>产品追踪卡模板编辑</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/quality/track_tpl_detail_edit.js"></script>
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
							<td ><s:property value="tplHeader.order" />&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td width="50px"><strong>配置:</strong></td>
							<td><s:property value="tplHeader.config" />&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td>&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="btn btn-success"
								id="btnSaveTplDetail" value="保存" style="margin-left: 2px;"></input></td>
						</tr>
					</table>
				</form>
				<input type="hidden" id="tplHeaderId"
					value="<s:property value="tplHeader.id" />">
				<div role="tabpanel" >
					<!-- Nav tabs -->
					<ul class="nav nav-pills" role="tablist" style="height: 30px">
						<li id="welding_tab" role="presentation" style="display:none"><a href="#welding"
							aria-controls="welding" role="tab" data-toggle="tab" onclick="generateTable('焊装')">焊装</a></li>
						<li id="painting_tab" role="presentation" style="display:none"><a href="#painting"
							aria-controls="painting" role="tab" data-toggle="tab" onclick="generateTable('涂装')">涂装</a></li>
						<li id="bottom_tab" role="presentation" style="display:none"><a href="#bottom"
							aria-controls="bottom" role="tab" data-toggle="tab" onclick="generateTable('底盘')">底盘</a></li>
						<li id="assembly_tab" role="presentation" style="display:none"><a href="#assembly"
							aria-controls="assembly" role="tab" data-toggle="tab" onclick="generateTable('总装')">总装</a></li>
					</ul>
					<!-- Tab panes -->
					<div class="tab-content" >
						<div role="tabpanel" class="tab-pane" id="welding">
							<table class="table table-bordered" style="width: 850px;">
								<thead>
									<tr>
										<th width="80px">序号</th>
										<th width="150px">工序名称</th>
										<!-- <th width="100px">工序编号</th> -->
										<th width="220px">零部件名称</th>
										<th width="100px">关键零部件</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane " id="painting">
						<table class="table table-bordered" style="width: 850px;">
								<thead>
									<tr>
										<th width="80px">序号</th>
										<th width="150px">工序名称</th>
										<!-- <th width="100px">工序编号</th> -->
										<th width="220px">零部件名称</th>
										<th width="100px">关键零部件</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane " id="bottom">
						<table class="table table-bordered" style="width: 850px;">
								<thead>
									<tr>
										<th width="80px">序号</th>
										<th width="150px">工序名称</th>
										<!-- <th width="100px">工序编号</th> -->
										<th width="220px">零部件名称</th>
										<th width="100px">关键零部件</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane " id="assembly">
						<table class="table table-bordered" style="width: 850px;">
								<thead>
									<tr>
										<th width="80px">序号</th>
										<th width="150px">工序名称</th>
									<!-- 	<th width="100px">工序编号</th> -->
										<th width="220px">零部件名称</th>
										<th width="100px">关键零部件</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>
				</div>

			<!--  编辑窗口 -->
				<div class="modal" id="editModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none;-moz-user-select: none;-webkit-user-select:none;max-height:500px">
					<div class="modal-header" style="cursor:move">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h5>模板维护</h5>
					</div>
					<div class="modal-body" style="overflow-y:visible">
						<div class="control-group">						
							<div class="controls" id="select_input">
								零部件：<input type="text" id="edit_select" class="input-large carType"></input>
							<input type="button" class="btn btn-primary" id="btnSave"
							value="保存" style="margin-left: 2px;float:right"></input>
							</div>
							
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>