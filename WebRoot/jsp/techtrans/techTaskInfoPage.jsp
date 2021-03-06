<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 技改明细</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/techtrans/techTaskInfoPage.js"></script>
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
				<legend style="margin: 0 auto;">技改工时查看</legend>
				<div role="tabpanel" >
					<ul class="nav nav-pills" role="tablist" style="height: 30px">
						<li role="presentation"  class="active">
							<a href="#workhour_BaseInfo" aria-controls="bottom" role="tab" data-toggle="tab" onclick="">基本信息</a>
						</li>
						<li role="presentation">
							<a href="#workhour_MaterielInfo" aria-controls="bottom" role="tab" data-toggle="tab" onclick="">物料信息</a>
						</li>
						<li role="presentation">
							<a href="#workhour_Range" aria-controls="bottom" role="tab" data-toggle="tab" onclick="">技改范围</a>
						</li>
						<li role="presentation">
							<a href="#workhour_detail" aria-controls="painting" role="tab" data-toggle="tab" onclick="">工时明细</a>
						</li>
						<li role="presentation">
							<a href="#workhour_assess" aria-controls="bottom" role="tab" data-toggle="tab" onclick="">工时分配</a>
						</li>
					</ul>
					<!-- Tab panes -->
					<div class="tab-content" style="height:500px;overflow:auto">
						<div role="tabpanel" class="tab-pane" id="workhour_detail">
							<table id="whtable" class="table table-bordered" style="text-align: center; font-size: 12px;">
								<thead>
									<tr>
									<th>操作日期</th>
									<th>工号</th>
									<th>姓名</th>
									<th>岗位</th>
									<th>工时</th>
									<th>记录人</th>
									<th>记录时间</th>
									<th>审核人</th>
									<th>审核时间</th>
									</tr>
								</thead>
								<tbody>
								
								</tbody>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane " id="workhour_assess">
							<table id="assigntable" class="table table-bordered table-striped" style="text-align: center; font-size: 12px;">
								<thead>
									<tr>
									<th>工号</th>
									<th>姓名</th>
									<th>车间</th>
									<th>班组</th>
									<th>岗位</th>
									<th>个人总工时</th>
									<th>技能系数</th>
									<th>工时分配</th>
									</tr>
								</thead>
								<tbody>
								
								</tbody>
							</table>
						</div>
						
						<div role="tabpanel" class="tab-pane active" id="workhour_BaseInfo">
							<div class="control-group">
							<table>
							<tr>
								<td>技改任务：</td><td colspan=3><input id="task_content" type="text" style="width:410px;height:18px"></input></td>
							</tr>
							<tr>
								<td>技改单号：</td><td><input id="tech_order_no" type="text" style="width:150px;height:18px"></input></td>
								<td>技改点数：</td><td><input id="tech_point_num" type="text" style="width:150px;height:18px"></input></td>
							</tr>
							<tr>
								<td>变更单类型：</td><td><input id="tech_order_type" type="text" style="width:150px;height:18px"></input></td>
								<td>技改类型：</td><td><input id="tech_type" type="text" style="width:150px;height:18px"></input></td>
							</tr>
							<tr>
								<td>技改单日期：</td><td><input id="tech_date" type="text" style="width:150px;height:18px"></input></td>
								<td>责任单位：</td><td><input id="duty_unit" type="text" style="width:150px;height:18px"></input></td>
							</tr>
							<tr>
								<td>重大变更：</td><td><input id="major_change" type="checkbox"></td>
								<td>重复变更：</td><td><input id="repeat_change" type="checkbox"></td>
							</tr>
							<tr>
								<td>顾客变更：</td><td><input id="custom_change" type="checkbox"></input></td>
								<td>顾客变更单号：</td><td><input id="custom_change_no" type="text" style="width:150px;height:18px"></input></td>
							</tr>
							<tr>
								<td>技改单附件：</td><td id="td_tech_order_file"><a href="#" target="view_window" id="tech_order_file">查看</a></td>
								<td>顾客变更单附件：</td><td id="td_custom_change_file"><a href="#" target="view_window" id="custom_change_file">查看</a></td>
							</tr>
							<tr>
								<td>任务创建时间：</td><td><input id="tech_date" type="text" style="width:150px;height:18px"></input></td>
								<td>任务分配时间：</td><td><input id="assign_date" type="text" style="width:150px;height:18px"></input></td>
							</tr>
							<tr>
								<td>物料确认时间：</td><td><input id="material_check_date" type="text" style="width:150px;height:18px"></input></td>
								<td>工时评估时间：</td><td><input id="assess_date" type="text" style="width:150px;height:18px"></input></td>
							</tr>
							<tr>
								<td>前段分配人：</td><td><input id="preassigner_id" type="text" style="width:150px;height:18px"></input></td>
								<td>前段分配时间：</td><td><input id="preassign_date" type="text" style="width:150px;height:18px"></input></td>
							</tr>
							<tr>
								<td>完成时间</td><td><input id="finish_date" type="text" style="width:150px;height:18px"></input></td>
								<td></td><td></td>
							</tr>
							</table>
							
							</div>
						</div>
						
						<div role="tabpanel" class="tab-pane " id="workhour_MaterielInfo">
						<table id="MaterielInfoTable" class="table table-bordered table-striped" style="text-align: center;margin-left:17px; font-size: 12px;width:96%;max-width:96%">
							<thead>
								<tr>
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
						</div>
						
						<div role="tabpanel" class="tab-pane " id="workhour_Range">
							<div class="control-group">
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
							
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>