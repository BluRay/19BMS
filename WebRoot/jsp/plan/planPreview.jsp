<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 计划预览</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/plan/planPreview.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">总计划预览
				<span class="pull-right">
                	<a class="notPrintable" href="#"><i class="fa fa-link"></i>&nbsp;工厂月计划</a>
                &nbsp;&nbsp;
                	<a class="notPrintable" href="#"><i class="fa fa-link"></i>&nbsp;计划调整记录</a>
                &nbsp;&nbsp;
                	<a class="notPrintable" href="#"><i class="fa fa-link"></i>&nbsp;计划达成情况</a>
                </span>
                </legend>
			<div style="margin: 0 auto;"><br/>
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<td>订单编号</td>
						<td>计划版本</td><td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-medium carType">
						</select></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="计划版本..." id="search_plan_version" /></td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
						
					</tr>
				</table>
			</form>
		
		<div id="maindiv" height:auto;overflow:auto; border:0px solid #000000;"><!-- 主体 --> 	   	   		   	   	
	   	   	<table id="MyTable" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
				<thead>
					<tr>
						<th rowspan="2" style="text-align:center;" width="60px">计划预览</th>
						<th id="th_order_no" style="text-align:center;padding-left:0px;padding-right:0px;" width="55px">2016</th>
						<th style="text-align:center;" width="35px">日期</th>
						<th width="23px">1</th><th width="23px">2</th><th width="23px">3</th>
						<th width="23px">4</th><th width="23px">5</th><th width="23px">6</th>
						<th width="23px">7</th><th width="23px">8</th><th width="23px">9</th>
						<th width="23px">10</th><th width="23px">11</th><th width="23px">12</th>
						<th width="23px">13</th><th width="23px">14</th><th width="23px">15</th>
						
						<th width="23px">16</th><th width="23px">17</th><th width="23px">18</th>
						<th width="23px">19</th><th width="23px">20</th><th width="23px">21</th>
						<th width="23px">22</th><th width="23px">23</th><th width="23px">24</th>
						<th width="23px">25</th><th width="23px">26</th><th width="23px">27</th>
						<th width="23px">28</th><th width="23px">29</th><th width="23px">30</th>
						
						<th width="23px">31</th><th width="38px">合计</th><th width="38px">总计</th>				
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
</body>
</html>