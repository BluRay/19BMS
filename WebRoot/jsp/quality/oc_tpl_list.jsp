<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>品质</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/quality/oc_tpl_list.js"></script>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_quality_left.jsp"%>
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<legend style="margin: 0 auto;">订单配置与一致性记录表模板</legend>
			<div style=" margin: 0 auto;">
				<br />
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>车型</td>
							<td>订单</td>
							<td>配置</td>
							<td></td>
						</tr>
						<tr>
							<td><select name="" id="input_busType"
								class="input-medium carType">
							</select></td>
							<td><input type="text" class="input-medium revise"
								id="input_order" /></td>
							<td><select name="" id="input_config" style="clip:rect(0 80 20 0)"
								class="input-medium carType">
							</select></td>
							<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>							
						</tr>
					</table>
				</form>

				<table id="tableResult" class="table table-condensed"
					style="display: none" style="font-size: 12px;">
					<thead>
						<tr>
							<th>车型</th>
							<th>订单</th>
							<th>配置</th>
							<th>版本号</th>
							<th>备注</th>
							<th>维护人</th>
							<th>维护时间</th>
							<th></th>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
				<div id="pagination"
					class="pagination pagination-small pagination-right"
					style="display: none">
					<ul>
						<li id="export"><a href="">总共<span total="" id="total"></span>条记录
						</a></li>
					</ul>
					<ul>
						<li id="first"><a href="#">«</a></li>
						<li id="pre" class="prePage"><a href="#">&lt;</a></li>
						<li id="cur" class="active curPage" page=""><a href="#"></a></li>
						<li id="next" class="nextPage"><a href="#">&gt;</a></li>
						<li id="last"><a href="#">»</a></li>
					</ul>
				</div>
			</div>

		</div>
	</div>
</div>
</body>
</html>