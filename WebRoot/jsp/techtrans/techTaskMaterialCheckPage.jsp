<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 技改物料确认</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/techtrans/techTaskMaterialCheckPage.js"></script>
<style type="text/css">
.section-head {
    border-left: 7px solid #000;
    padding-left: 10px;
    margin-bottom: 20px;
}
.table td{
	padding:8px;
}

</style>
</head>
<body>
<%-- 	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%> --%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="margin: 0 auto;">技改物料确认</legend>
				<div role="tabpanel" >
					<!-- Tab panes -->
					<div class="tab-content" style="height:98%;overflow:auto">
						
						<div role="tabpanel" class="tab-pane active" id="workhour_Range">
							<div class="control-group">
							<label class="control-label" style="padding-top:5px"><b>&nbsp;&nbsp;&nbsp;&nbsp;技改任务：</b>
								<input id="task_content" type="text" style="width:410px;height:18px"></input>
							</label>
							<label class="control-label" style="padding-top:5px"><b>&nbsp;&nbsp;&nbsp;&nbsp;技改单号：</b>
								<input id="tech_order_no" type="text" style="width:410px;height:18px"></input>
							</label>
							<label class="control-label" for=""><b>&nbsp;&nbsp;&nbsp;&nbsp;切换方式：</b>
								<input style="vertical-align:middle;margin-top:-2px;" name="switch_type" id="type1" type="radio">全部切换&nbsp;&nbsp;
								<input style="vertical-align:middle;margin-top:-2px;" name="switch_type" id="type2" type="radio">节点前切换&nbsp;&nbsp;
								<input style="vertical-align:middle;margin-top:-2px;" name="switch_type" id="type3" type="radio">节点后切换&nbsp;&nbsp;
							</label>
							<label class="control-label" for=""><b>&nbsp;&nbsp;&nbsp;&nbsp;切换节点：</b>
								<input id="switch_node" type="text" style="width:150px;height:18px"></input>
							</label>
							<label class="control-label" for=""><b>&nbsp;&nbsp;&nbsp;&nbsp;实施范围：</b>
								<ul class="nav nav-tabs" id="new_tab" role="tablist" style="height: 38px;margin-left:17px;">
									<li class="active"><a href="#new_task1" data-toggle="tab" style="font-size: 14px; color: #333">订单1</a></li>
									<li><a href="#new_task1" data-toggle="tab" style="font-size: 14px; color: #333">订单2</a></li>
								</ul>
							</label>
							<table id="RangeTable" class="table table-bordered table-striped" style="text-align: center;margin-left:17px; font-size: 12px;width:96%;max-width:96%;margin-top:-21px">
								<thead>
									<tr>
									<th>车间</th><th>自制件</th><th>部件</th><th>焊装</th>
									<th>玻璃钢</th><th>涂装</th><th>底盘</th><th>总装</th>
									</tr>
								</thead>
								<tbody>
									<tr>
									<td>技改台数</td><td id="tech_zzj"></td><td id="tech_bj"></td><td id="tech_hz"></td>
									<td id="tech_blg"></td><td id="tech_tz"></td><td id="tech_dp"></td><td id="tech_zz"></td>
									</tr>
									<tr>
									<td>完成台数</td><td id="finish_zzj"></td><td id="finish_bj"></td><td id="finish_hz"></td>
									<td id="finish_blg"></td><td id="finish_tz"></td><td id="finish_dp"></td><td id="finish_zz"></td>
									</tr>
									<tr>
									<td>技改工时</td><td id="time_zzj"></td><td id="time_bj"></td><td id="time_hz"></td>
									<td id="time_blg"></td><td id="time_tz"></td><td id="time_dp"></td><td id="time_zz"></td>
									</tr>
								</tbody>
							</table>
							
							<table id="MaterielInfoTable" class="table table-bordered table-striped" style="text-align: center;margin-left:17px; font-size: 12px;width:96%;max-width:96%">
							<thead>
								<tr>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">确认</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">SAP料号</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">物料描述</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">物料类型</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">材料/规格</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">单位</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">供应商<br>代码</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">单车损耗<br>（%）</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">层级用量</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">单重</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">单车用量<br>含损耗</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">使用车间</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">工序</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">装备位置</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">备注</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">确认人</th>
								<th style="padding-left:1px;padding-right:1px;vertical-align:middle">确认时间</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						<center><input type="button" class="btn btn-primary" id="btnCheck" value="确认" style="margin-left: 2px;"></input></center>	
						<input id="check_id"  type="text" style="display: none;width:410px;height:18px"></input>
						</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>