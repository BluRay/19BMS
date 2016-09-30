<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 总计划导入</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="js/plan/planImportMaster.js"></script>
</head>
<body >
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2"><!-- Main -->
			<legend style="margin:0 auto;">总计划导入</legend>
			<div style="margin: 0 auto;"><br/>
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<td>订单编号</td>
						<!-- <td>月份</td> -->
						<td></td><td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-medium carType">
						</select></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="请输入订单名称..." id="search_order_name" /></td>
						<!-- <td><input type="text" name="plan_month" id="plan_month" class="Wdate" style="height:30px;background-color: white;width:120px" onClick="WdatePicker({el:'plan_month',dateFmt:'yyyy-MM'});"/></td> -->
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
						<td><input id="btnBulkAdd" class="btn btn-info" value="批量导入" type="button"></td>
					</tr>
				</table>
			</form>
			<div id="divBulkAdd" class="thumbnail" style="display:none;height: 95px;">
				<h5 align="left">总计划批量导入</h5>
				<!-- <form action="PlanImport.action" enctype="multipart/form-data" method="post" class="form-horizontal"> -->
				<form action="plan!upload.action" enctype="multipart/form-data" method="post" class="form-horizontal">
					<input id="file" type="file" class="btn btn-info btn-small" name="file" accept="*.csv"/>
					<input id="btn_upload" type="submit" class="btn btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/> &nbsp;&nbsp;&nbsp;&nbsp;
					<a href="download/masterPlan.csv">下载批导模板</a>
				</form>
            </div>
	        <table id="tableOrder" style="font-size:12px" class="table table-bordered table-striped">
				<thead>
	                <tr>
	                	<th>序号</th>
	                	<th>计划版本</th>
	                    <th>生产工厂</th>
	                    <th>订单编号</th>
	                    <th>导入人</th>
	                    <th>导入时间</th>
	                    <th>查看详情</th>
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