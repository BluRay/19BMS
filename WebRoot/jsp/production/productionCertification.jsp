<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 合格证打印</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/production/productionCertification.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">合格证打印</legend>
		<div style="margin: 0 auto;">
		<form id="form" class="well form-search">
			<table>
				<tr>
					<td>生产工厂: </td><td>订单编号: </td><td></td>
				</tr>
				<tr>
					<td><select name="" id="search_factory" class="input-medium carType"></select></td>
					<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
					<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>						
					<!-- <td><input class="input-medium" placeholder="底盘上线日期..." id="cer_chassis_date" onclick="WdatePicker({el:'cer_chassis_date',dateFmt:'yyyy-MM-dd'});" type="text"></td>
					<td> -->
					<!-- <input class="btn btn-info" id="btnExport" value="导出" disabled="disabled" style="margin-left: 2px;" type="button"> -->
					<td>
					<input class="btn btn-danger" id="btnBuslist" value="指定车号" style="margin-left: 2px;" type="button">
					<input class="btn btn-success" id="btnImport" value="传输打印"  style="margin-left: 2px;" type="button">
					<input type="text" style="display:none;width:400px" class="input-large revise" id="bus_number_str"></input>
					</td>
				</tr>
			
			</table>
		</form>
		<!-- <div style="width:165px" class="accordion span4" id="accordionLane">
		<textarea style="width: 160px;" class="input-xlarge" onkeyup="this.value = this.value.slice(0, 1000)" placeholder="请输入车号..." id="search_bus_number" rows="15"></textarea>
		*每行输入一个车号
		</div> -->
		<div class="modal fade" id="busSelectModal" tabindex="-1" role="dialog" unselectable="on" onselectstart="return false;"
			aria-hidden="true" style="display: none; margin-top:120px;-moz-user-select:-moz-none;width: 400px;left:50%">

			<div class="modal-body" style="margin-bottom: -20px;">
				
				<div class="control-group">
					<table >
						<tr>
						<td width="60px" style="text-align:right">车号：</td>
						<td width="280px">
							<textarea rows="4" id="search_bus_number" style="width:280px" placeholder="每行输入一个车号后回车！"></textarea>
						</td>								
						</tr>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" id="btnMtaSave">确认</button>
				<button class="btn" data-dismiss="modal" aria-hidden="true" onclick="$('#search_bus_number').val('')">取消</button>					
			</div>
			</div>
		<div style="overflow: auto;height:400px;">
		<table id="tableCertification" style="width:1360px;table-layout:fixed;text-align:center;font-size:12px" class="table table-bordered table-striped">
			<thead>
				<tr id="0">
				<th style="text-align:center;" width="28px"><input type="checkbox" id="checkall"></th>			
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="120px">车号</th>					
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="130px">VIN</th>					
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="100px">底盘型号</th>					
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="90px">整车型号</th>					
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="90px">电机型号</th>					
				<th style="text-align:center;adding-left:0px;padding-right:0px;" width="90px">底盘生产日期</th> 					
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="90px">整车生产日期</th>
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="140px">电机号（左/右）</th>					
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="90px">颜色</th>	
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="120px">轮胎规格</th>						
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="90px">座位数</th>		
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="90px">核定载<br/>客人数</th>
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="90px">弹簧片数</th>
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="90px">备注项</th>
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="120px">整车资<br/>质地</th>
				<th style="text-align:center;padding-left:0px;padding-right:0px;" width="120px">底盘资<br/>质地</th>
				</tr>
			</thead>
			<tbody>	
			</tbody>
		</table>
		</div>
		<div id="pagination" class="pagination pagination-small pagination-right"
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