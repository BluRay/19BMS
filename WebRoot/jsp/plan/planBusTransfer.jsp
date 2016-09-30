<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 半成品调出/接收</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/plan/planBusTransfer.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">半成品调出/接收</legend>
			<ul id="tabUl" style="height:15px" class="nav nav-pills">
	          <li id="transferOut"><a class="queryUse" href="#transferOut" data-toggle="tab">&nbsp;&nbsp;调出&nbsp;&nbsp;</a></li>
	          <li id="transferIn" class="active"><a href="#transferIn" data-toggle="tab">&nbsp;&nbsp;调入&nbsp;&nbsp;</a></li>
	          <li id="transferHis"><a class="queryUse" href="#transferHis" data-toggle="tab">调动记录</a></li>
          	</ul>
          	<div id="transferIndiv">
          		<form id="form" class="well form-search">
				<table>
					<tr>
						<td>车号(多个车号请换行，每行一个车号)</td>
						<td></td><td></td><td></td>
					</tr>
					<tr>
						<td><textarea style="width: 450px;" class="input-xlarge" onkeyup="this.value = this.value.slice(0, 1000)" id="transfer_in_busnumber" rows="3"></textarea></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td></td>
						<td></td><td></td><td></td>
					</tr>
					<tr>
						<td>调出工厂 ：<select name="" id="transfer_in_factory" class="input-small carType"></select>
						调入工厂 ：<select name="" id="transfer_in_factory2" class="input-small carType"></select>
						<input type="button" class="btn btn-primary" id="btn_transfer_in_query" value="查询" style="margin-left: 2px;"></input>
						<input type="button" class="btn btn-success" id="btn_transfer_in" value="调入" style="margin-left: 2px;"></input>
						<input type="text" style="display:none;width:300px" class="input-large revise" id="bus_tra_in_str"></td>
						<td></td><td></td><td></td>
					</tr>
				</table>
				</form>
				<table id="tableBusInfoIn" style="text-align:center;table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
				<thead>
					<tr id="0">
						<th style="text-align:center;" width="15px"><input type="checkbox" id="checkall_in"></th>			
						<th style="text-align:center;" width="50px">车号</th>					
						<th style="text-align:center;" width="35px">订单</th>					
						<th style="text-align:center;" width="15px">车型</th>					
						<th style="text-align:center;" width="25px">年份</th>					
						<th style="text-align:center;" width="35px">客户</th>					
						<th style="text-align:center;" width="35px">配置</th>					
						<th style="text-align:center;" width="50px">VIN</th>					
						<th style="text-align:center;" width="35px">生产工厂</th>					
						<th style="text-align:center;" width="35px">当前工序</th>					
						<th style="text-align:center;" width="15px">状态</th>					
						<!-- <th style="text-align:center;" width="25px">操作</th> -->
					</tr>
				</thead>
				<tbody>	
				</tbody>
			</table>
          	</div>
          	
          	<div id="transferOutdiv">
          		<form id="form" class="well form-search">
				<table>
					<tr>
						<td>车号(多个车号请换行，每行一个车号)</td>
						<td></td><td></td><td></td>
					</tr>
					<tr>
						<!-- <td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="请输入车号..." id="transfer_out_busnumber" /></td> -->
						<td><textarea style="width: 450px;" class="input-xlarge" onkeyup="this.value = this.value.slice(0, 1000)" id="transfer_out_busnumber" rows="3"></textarea></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td></td>
						<td></td><td></td><td></td>
					</tr>
					<tr>
						<td>调入工厂 ：<select name="" id="transfer_out_factory" class="input-medium carType"></select>
						<input type="button" class="btn btn-primary" id="btn_transfer_query" value="查询" style="margin-left: 2px;"></input>
						<input type="button" class="btn btn-success" id="btn_transfer_out" value="调出" style="margin-left: 2px;"></input>
						<input type="text" style="display:none;width:300px" class="input-large revise" id="bus_tra_out_str"></td>
						<td></td><td></td><td></td>
					</tr>
				</table>
				</form>
				<table id="tableBusInfo" style="text-align:center;table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
				<thead>
					<tr id="0">
						<th style="text-align:center;" width="15px"><input type="checkbox" id="checkall"></th>			
						<th style="text-align:center;" width="50px">车号</th>					
						<th style="text-align:center;" width="35px">订单</th>					
						<th style="text-align:center;" width="15px">车型</th>					
						<th style="text-align:center;" width="25px">年份</th>					
						<th style="text-align:center;" width="35px">客户</th>					
						<th style="text-align:center;" width="35px">配置</th>					
						<th style="text-align:center;" width="50px">VIN</th>					
						<th style="text-align:center;" width="35px">生产工厂</th>					
						<th style="text-align:center;" width="35px">当前工序</th>					
						<th style="text-align:center;" width="15px">状态</th>					
						<!-- <th style="text-align:center;" width="25px">操作</th> -->
					</tr>
				</thead>
				<tbody>	
				</tbody>
			</table>
          	</div>
          	
          	<div id="transferHisdiv">
          		<form id="form" style="height:140px" class="well form-search">
				<table>
					<tr>
						<td>车号</td><td>VIN号</td><td>订单编号</td><td></td><td></td>
					</tr>
					<tr>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="请输入车号..." id="transfer_his_busnumber" /></td>
						<td><input style="height: 30px;" type="text" class="input-large revise" placeholder="请输入VIN号..." id="transfer_his_vin" /></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="请输入订单编号..." id="transfer_his_orderno" /></td>						
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td>调出工厂</td><td>调出时间</td><td>调入工厂</td><td>调入时间</td><td></td>
					</tr>
					<tr>
						<td><select name="" id="transfer_his_out_factory" class="input-medium carType"></select></td>
						<td><input class="input-small" placeholder="开始日期..." id="transfer_his_out_date_start" onclick="WdatePicker({el:'transfer_his_out_date_start',dateFmt:'yyyy-MM-dd'});" type="text">
						- <input class="input-small" placeholder="截止日期..." id="transfer_his_out_date_end" onclick="WdatePicker({el:'transfer_his_out_date_end',dateFmt:'yyyy-MM-dd'});" type="text">
						</td>
						<td><select name="" id="transfer_his_in_factory" class="input-medium carType"></select></td>
						<td><input class="input-small" placeholder="开始日期..." id="transfer_his_in_date_start" onclick="WdatePicker({el:'transfer_his_in_date_start',dateFmt:'yyyy-MM-dd'});" type="text">
						- <input class="input-small" placeholder="截止日期..." id="transfer_his_in_date_end" onclick="WdatePicker({el:'transfer_his_in_date_end',dateFmt:'yyyy-MM-dd'});" type="text">
						</td>
						<td><input type="button" class="btn btn-primary" id="btn_transfer_his" value="查询" style="margin-left: 2px;"></input></td>
					</tr>
				</table>
				</form>
				<table id="tableBusHisInfo" style="text-align:center;table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
				<thead>
					<tr id="0">
						<th style="text-align:center;" width="50px">车号</th>					
						<th style="text-align:center;" width="20px">订单</th>					
						<th style="text-align:center;" width="20px">车型</th>					
						<th style="text-align:center;" width="20px">年份</th>					
						<th style="text-align:center;" width="30px">客户</th>					
						<th style="text-align:center;" width="30px">配置</th>					
						<th style="text-align:center;" width="50px">VIN</th>					
						<!-- <th style="text-align:center;" width="30px">左电机号</th>					
						<th style="text-align:center;" width="30px">右电机号</th> -->					
						<th style="text-align:center;" width="30px">调出工厂</th>					
						<th style="text-align:center;" width="30px">调入工厂</th>			
						<th style="text-align:center;" width="40px">调出时间</th>			
						<th style="text-align:center;" width="25px">调出人</th>			
						<th style="text-align:center;" width="40px">接收时间</th>			
						<th style="text-align:center;" width="25px">调收人</th>
					</tr>
				</thead>
				<tbody>	
				</tbody>
			</table>
          	</div>
          	
			</div>
		</div>
	</div>
</body>
</html>