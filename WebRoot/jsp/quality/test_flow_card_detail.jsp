<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>检验流程卡录入</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/quality/test_flow_card_detail.js"></script>
</head>
<body>
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="/jsp/common/general_quality_left.jsp"%>
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<form id="form" class="well form-search">
				<table>
						<tr>
							<td><b>工厂:&nbsp;</b></td>
							<td ><s:property value="header.factory" />&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><b>车间:&nbsp;</b></td>
							<td ><s:property value="header.workshop" />&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td><b>车号:&nbsp;</b></td>
							<td ><s:property value="header.bus_number" /></td>
						</tr>
					</table>

				</form>
				<input type="hidden" id="headerId" value="<s:property value='header.id'/>">
				<form id="saveForm" action="" method="post" class="form-search" style="display: none">
					<table style="text-align: left; width: 100%;">
						<tr>
							<td width="240px"><b>车身号:</b> <s:property value="header.bus_number" /></td>
							<td colspan="2"><b>检验结论:</b> <span>
									<s:if test="header.test_result==0">一次检验合格</s:if>
									<s:if test="header.test_result==1">返工/返修合格</s:if>
									<s:if test="header.test_result==2">让步放行</s:if></span></td>							
						</tr>
						<tr>
							<td width="240px">				
							<span class="text-info" id="order-info">
							订单：<s:property value="header.order_name" />    车型：<s:property value="header.bus_type" /> 
								</span>
							</td>
							<td width="170px"><b>检验员:</b> <s:property value="header.tester" /></td>
							<td width="170px" ><b>QE:</b> <s:property value="header.qe" /></td>					
							<td></td>
						</tr>
					</table>
	
					<table id="tableResult" class="table table-bordered"
						style="font-size: 12px;">
						<thead>
							<tr>
								<th>节点</th>
								<th>工序</th>
								<th>检测内容</th>
								<th>质控点</th>
								<th>技术要求</th>
								<th>检验频次</th>
								<th>检验工具</th>
								<th>检验结果</th>
								<th>结果判定</th>
								<th>返工/返修</th>
								<th>责任车间</th>
								<th>责任班组</th>
								<th>备注</th>
							</tr>
						</thead>
						<tbody>

						</tbody>
					</table>
				</form>

			</div>
		</div>
	</div>
</body>
</html>