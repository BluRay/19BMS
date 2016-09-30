<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 计划发布</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>	
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/plan/planIssuance2.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">生产计划发布</legend>
				
			<div style="margin: 0 auto;"><br/>
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<td>订单编号</td>
						<td>生产日期</td><td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-medium carType">
						</select></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
						<td><input class="input-medium" placeholder="选择发布日期..." id="issuance_date" onclick="WdatePicker({el:'issuance_date',dateFmt:'yyyyMMdd'});" type="text"></td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
						<input type="button" disabled="disabled" class="btn btn-info" id="btnSave" value="发布" style="margin-left: 2px;"></input>
						<input type="text" style="display:none" class="input-small revise" id="configs"></input>
						<input type="text" style="display:none;width:400px" class="input-large revise" id="issuance_str"></input>
						</td>
						
					</tr>
				</table>
			</form>
			
			<table id="tablePlan" class="table table-condensed" style="font-size:12px;">
	            <thead>
	                <tr>
	                	<th>序号</th>
	                	<th>计划配置</th>
	                    <th>自制件下线</th>
	                    <th>部件上线</th>
	                    <th>部件下线</th>
	                    <th>焊装上线</th>
	                    <th>焊装下线</th>
	                    <th>涂装上线</th>
	                    <th>涂装下线</th>
	                    <th>底盘上线</th>
	                    <th>底盘下线</th>
	                    <th>总装上线</th>
	                    <th>总装下线</th>
	                    <th>入库&nbsp;&nbsp;&nbsp;&nbsp;</th>
	                </tr>
	            </thead>
	            <tbody>
	                
	            </tbody>
	        </table>
		    <div id="pagination" class="pagination pagination-small pagination-right" style="display: none">
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