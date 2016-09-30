<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 计划完成</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/plan/planDone.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">计划完成</legend>
			<div style="margin: 0 auto;">
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<td>订单编号</td>
						<td>生产日期</td>
						<td>生产车间</td><td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-medium carType">
						</select></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
						<td><input class="input-small" placeholder="开始日期..." id="amend_date" onclick="WdatePicker({el:'amend_date',dateFmt:'yyyyMMdd'});" type="text">
						</td>
						<td><select name="" id="search_workshop" class="input-medium carType">						
						</select></td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
						<input type="button" disabled="disabled" class="btn btn-info" id="btnSave" value="修正" style="margin-left: 2px;"></input>
						<input type="text" style="display:none;" class="input-small revise" id="configs"></input>
						<input type="text" style="display:none;width:350px" class="input-large revise" id="planDone_str"></input>
						</td>
						
					</tr>
				</table>
			</form>
			<table id="tablePlanAmend" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
				<thead>
	                <tr id='0'>
	                	<th style="text-align:center;">日期</th>
	                	<th style="text-align:center;">订单编号</th>
	                    <th style="text-align:center;">车间</th>
	                    <th style="text-align:center;">计划节点</th>
	                    <th style="text-align:center;">计划数量</th>
	                    <th style="text-align:center;">实际数量</th>
	                    <th style="text-align:center;">修正数量</th>
	                    <th style="text-align:center;width:250px">修正原因</th>
	                    <th style="text-align:center;">维护人</th>
	                    <th style="text-align:center;width:150px"">维护时间</th>
	                    <!-- <th style="text-align:center;">操作</th> -->
	                </tr>
	            </thead>
	            <tbody>
	                
	            </tbody>
	        </table>
			</div>
		</div>
	</div>
</body>
</html>