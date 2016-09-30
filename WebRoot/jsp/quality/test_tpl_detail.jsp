<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>检验记录表模板预览</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<%-- <script type="text/javascript" src="js/bootstrap-popover-check.js"></script> --%>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/quality/test_tpl_detail.js"></script>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="/jsp/common/general_quality_left.jsp"%>
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<div style=" margin: 0 auto;">
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td width="50px"><strong>车型:</strong></td>
							<td ><s:property value="testTplHeader.busType" />&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td width="50px"><strong>订单:</strong></td>
							<td ><s:property value="testTplHeader.order" />&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td width="50px"><strong>配置:</strong></td>
							<td><s:property value="testTplHeader.config" />&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td width="50px"><strong>零部件:</strong></td>
							<td><s:property value="testTplHeader.parts" /></td>
							<td></td>
						</tr>
					</table>
				</form>
				<input type="hidden" id="tplHeaderId"
					value="<s:property value="testTplHeader.id" />">
				<table id="tableResult" class="table table-bordered"
					style="font-size: 12px;">
					<thead>
						<tr>
							<th>工序/节点名称</th>
							<th>检测内容</th>
							<th>技术要求</th>
							<th>检验频次</th>
							<th>检测工具</th>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>

<%-- 				<div id="edit_hover"
					style="position: absolute; display: none; border: 1px solid;">
					<ul class="nav nav-list affix">
						<li><a href="javascript:;"> <i
								class="fa fa-pencil-square-o"></i> <span>编辑</span>
						</a></li>
						<li><a href="javascript:;"> <i class="fa fa-times"></i>
								<span>删除</span>
						</a></li>

					</ul>
				</div> --%>
			</div>
		</div>
	</div>
	</div>
</body>
</html>