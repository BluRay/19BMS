<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 车号查询</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/plan/planBusNumberSearch.js"></script>
<style type="text/css">
.section-head {
  border-left: 7px solid #000;
  padding-left: 10px;
  margin-top: 25px;
  margin-bottom: 20px;
}
.glyphicon{
	position:relative;
	top:1px;
	display:inline-block;
	font-family:'Glyphicons Halflings';
	font-style:normal;
	font-weight:400;
	line-height:1;
	-webkit-font-smoothing:antialiased;
	-moz-osx-font-smoothing:grayscale
}
.glyphicon-plus:before{
	content:"\2b"
}
*::before, *::after {
    box-sizing: border-box;
}
.btn-xs, .btn-group-xs > .btn {
    padding: 1px 5px;
    font-size: 14px;
    line-height: 2.5;
    border-radius: 3px;
}
.btn-success {
    color: #FFF;
    background-color: #5CB85C;
    border-color: #4CAE4C;
}
.offlineFont{
	color:red
}
.input[type="text"]{
	height: 30px;
}
</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">车号查询</legend>
			<div style="margin: 0 auto;">
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<td>订单编号</td>
						<td>车号</td>
						<td>VIN号</td>
						<td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-medium carType">
						</select></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="车号..." id="search_bus_number" /></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="VIN号..." id="search_bus_vin" /></td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
						<input type="text" style="display:none" class="input-small revise" id="order_id"></input>
						<input type="text" style="display:none" class="input-small revise" id="factory_id"></input>
						<input type="text" style="display:none;width:400px" class="input-large revise" id="revision_str"></input>
						</td>
						
					</tr>
				</table>
			</form>
			
			<div id="maindiv" height:auto;overflow:auto; border:0px solid #000000;"><!-- 主体 --> 	   	   		   	   	
	   	   	<table id="tableVIN" style="text-align:center;table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
				<thead>
					<tr>
						<th style="text-align:center;" width="20px">序号</th>
						<th style="text-align:center;" width="60px">生产订单</th>
						<th style="text-align:center;" width="60px">车号</th>
						<th style="text-align:center;" width="35px">左电机号</th>						
						<th style="text-align:center;" width="35px">右电机号</th>					
						<th style="text-align:center;" width="60px">VIN号</th>					
						<th style="text-align:center;" width="50px">整车生产日期</th>					
						<th style="text-align:center;" width="35px">生成者</th>					
						<th style="text-align:center;" width="55px">生成日期</th>					
						<th style="text-align:center;" width="35px">打印标志</th>					
						<th style="text-align:center;" width="35px">打印时间</th>					
						<th style="text-align:center;" width="35px">打印者</th>
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