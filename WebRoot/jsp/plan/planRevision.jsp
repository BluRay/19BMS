<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 计划调整</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/plan/planRevision.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">计划调整
                </legend>
			<div style="margin: 0 auto;"><br/>
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<td>订单编号</td>
						<td>订单年份 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 月份</td>
						<td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-medium carType">
						</select></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
						<td>
						<select name="" id="search_year" class="input-small carSeries"></select>
						<select name="" id="search_month" class="input-small carSeries">
							<option value="01">1月</option><option value="02">2月</option><option value="03">3月</option>
							<option value="04">4月</option><option value="05">5月</option><option value="06">6月</option>
							<option value="07">7月</option><option value="08">8月</option><option value="09">9月</option>
							<option value="10">10月</option><option value="11">11月</option><option value="12">12月</option>
						</select>
						</td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
						<input type="button" disabled="disabled" class="btn btn-info" id="btnSave" value="保存" style="margin-left: 2px;"></input>
						<input type="text" style="display:none" class="input-small revise" id="order_id"></input>
						<input type="text" style="display:none" class="input-small revise" id="factory_id"></input>
						<input type="text" style="display:none;width:400px" class="input-large revise" id="revision_str"></input>
						</td>
						
					</tr>
				</table>
			</form>
		
		<div id="maindiv" height:auto;overflow:auto; border:0px solid #000000;"><!-- 主体 --> 	   	   		   	   	
	   	   	<table id="MyTable" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
				<thead>
					<tr>
						<th rowspan="2" style="text-align:center;" width="70px">计划调整</th>
						<th style="text-align:center;" width="48px">2016</th>
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
	</div>
</body>
</html>