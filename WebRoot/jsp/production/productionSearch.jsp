<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 生产查询</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="js/production/productionSearch.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">生产查询</legend>
			
			<div style="margin: 0 auto;">
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<td>生产车间</td>
						<td>生产线别</td>
						<td id="onoff_lable">上/下线</td>
						<td id="exce_lable">异常信息</td>
						<td id='date_lable' style="display:none">日期范围</td>
						<td>订单编号</td>
						<td>车号</td><td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-medium carType" style="width:100px">
						</select></td>
						<td><select name="" id="search_workshop" class="input-medium carType" style="width:100px">						
						</select></td>
						<td><select name="" id="search_line" class="input-small carType"><option value=''>全部</option></select></td>
						<td id="onoff_td"><select name="" id="on_offline" class="input-small">
							<option value=''>全部</option>
							<option value='上线'>上线</option>
							<option value='下线'>下线</option>
							</select>
						</td>
						<td id="exce_td"><select name="" id="search_exception" class="input-small carType"><option value='0'>全部</option><option value='1'>正常</option><option value='2'>异常已处理</option><option value='3'>异常未处理</option></select></td>
						<td style="display:none" id="date_td">
							<input type="text" id="date_start" style="width:100px" class="input-small" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
							<span>-</span>
							<input type="text" id="date_end" style="width:100px" class="input-small" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
						</td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
						<td><input class="input-medium" placeholder="车号..." id="search_busnumber" type="text">
						</td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
						
						<!-- <input type="button" class="btn btn-danger" id="btnDel" value="删除" style="margin-left: 2px;"></input> -->
						<input type="text" style="display:none;" class="input-small revise" id="configs"></input>
						<input type="text" style="display:none;width:350px" class="input-large revise" id="planDone_str"></input>
						</td>
						
					</tr>
				</table>
			</form>
			<p id='count_info' style="display:none;">当前车辆数量统计：</p>
			<table id="tableWorkshopCount" style="display:none;text-align:center;table-layout:fixed;font-size:12px;border-collapse: collapse" class="table table-bordered table-striped">
				<thead id="th_count_cs">
					<tr id="0">
						<th style="text-align:center;">车间</th>
						<th style="text-align:center;">焊装</th>
						<th style="text-align:center;">玻璃钢</th>
						<th style="text-align:center;">WIP</th>
						<th style="text-align:center;">涂装</th>
						<th style="text-align:center;">WIP</th>
						<th style="text-align:center;">底盘</th>
						<th style="text-align:center;">WIP</th>
						<th style="text-align:center;">总装</th>
						<th style="text-align:center;">调试区</th>
						<th style="text-align:center;">检测线</th>
						<th style="text-align:center;">成品库</th>
					</tr>
				</thead>
				<thead id="th_count_other" style="display:none">
					<tr id="0">
						<th style="text-align:center;">车间</th>
						<th style="text-align:center;">焊装</th>
						<th style="text-align:center;">WIP</th>
						<th style="text-align:center;">涂装</th>
						<th style="text-align:center;">WIP</th>
						<th style="text-align:center;">底盘</th>
						<th style="text-align:center;">WIP</th>
						<th style="text-align:center;">总装</th>
						<th style="text-align:center;">调试区</th>
						<th style="text-align:center;">检测线</th>
						<th style="text-align:center;">成品库</th>
					</tr>
				</thead>
				<thead id="th_count_onoff" style="display:none">
					<tr id="0">
						<th style="text-align:center;">车间</th>
						<th style="text-align:center;">焊装</th>
						<th style="text-align:center;">涂装</th>
						<th style="text-align:center;">底盘</th>
						<th style="text-align:center;">总装</th>
						<th style="text-align:center;">调试区</th>
						<th style="text-align:center;">检测线</th>
					</tr>
				</thead>
				<tbody>	
				</tbody>
			</table>
			<p id="detail_info" style="display:none;">当前车辆位置：</p>
			<table id="tableWorkshopCarinfo" style="display:none;text-align:center;table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
				<thead>
					<tr id="0">
						<th style="width:60px;text-align:center;">序号</th>
						<th style="text-align:center;">生产订单</th>
						<th style="text-align:center;">车辆车号</th>
						<th style="text-align:center;width:100px">生产车间</th>
						<th style="text-align:center;width:100px">生产线别</th>
						<th style="text-align:center;">当前工序</th>
						<th style="text-align:center;width:150px"">进入时间</th>
						<th style="text-align:center;width:100px">车辆状态</th>
					</tr>
				</thead>
				<tbody>	
				</tbody>
			</table>
			</div>
			</div>
			
<!-- new order start -->

<!-- new order End -->		
	
		</div>
	</div>
</body>
</html>