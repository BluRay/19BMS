<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 临时派工单</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/production/tempOrderInfo.js"></script>
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
				<legend style="font-size:17px">临时派工单查看</legend>
				<div role="tabpanel" >
					<ul class="nav nav-pills" role="tablist" style="height: 30px">
						<li role="presentation" class="active"><a href="#base_info"
							aria-controls="welding" role="tab" data-toggle="tab" onclick="generateBaseInfoTb()">基本信息</a></li>
						<li role="presentation" ><a href="#prdo_qty_detail"
							aria-controls="welding" role="tab" data-toggle="tab" onclick="generateProdDetailTb()">产量维护明细</a></li>
						<li role="presentation"><a href="#workhour_detail"
							aria-controls="painting" role="tab" data-toggle="tab" onclick="generateWhDetailTb()">工时明细</a></li>
						<li role="presentation"><a href="#workhour_assess"
							aria-controls="bottom" role="tab" data-toggle="tab" onclick="generateAssignDetailTb()">工时分配</a></li>
					</ul>
					<input type="hidden" id="tempOrderId" value="<s:property value='tempOrderId' />">
					<!-- Tab panes -->
					<div class="tab-content" style="height:500px;overflow:auto">
						<div role="tabpanel" class="tab-pane active" id="base_info">
							<table class="table table-bordered table-striped" style="width:98%;line-height:30px">
								<tr>
								<td width=120px>派工单号:</td>
								<td id="order_num"></td>
								<td width=120px>工单号:</td>
								<td id="sap_num"></td>
								</tr>
								<tr>
								<td>总数量:</td>
								<td id="total_qty"></td>
								<td>已完成数量:</td>
								<td id="ready_qty"></td>
								</tr>
								<tr>
								<td>单个工时:</td>
								<td id="single_hour"></td>
								<td>所需人力:</td>
								<td id="labors"></td>
								</tr>
								<tr>
								<td>总工时</td>
								<td id="total_hour" colspan=3></td>
								<!-- <td>已分配工时:</td>
								<td id="ready_workhour"></td> -->								
								</tr>
								<tr>
								<td>作业原因/内容</td>
								<td colspan=3 id="reason"> </td>
								</tr>
								<tr>
								<td>申请人:</td>
								<td id="applier"></td>
								<td>申请时间:</td>
								<td id="apply_date"></td>
								</tr>
							<!-- 	<tr>
								<td>审批人:</td>
								<td id="approver"></td>
								<td>审批时间:</td>
								<td id="approve_date"></td>
								</tr> -->
								<tr>
								<td>分配人:</td>
								<td id="assigner"></td>
								<td>分配时间:</td>
								<td id="assign_date"></td>
								</tr>
								<tr>
								<td>工时评估人:</td>
								<td id="assessor"></td>
								<td>评估时间:</td>
								<td id="assess_date"></td>
								</tr>
								<tr>
								<td>评估审核人:</td>
								<td id="assessVerifier"></td>
								<td>评估审核时间:</td>
								<td id="assess_verify_date"></td>
								</tr>
						<!-- 		<tr>
								<td>验收人:</td>
								<td id="acceptor"></td>
								<td>验收时间:</td>
								<td id="accept_date"></td>
								</tr> -->
								<tr>
								<td>工时审核人:</td>
								<td id="auditor"></td>
								<td>审核时间:</td>
								<td id="audit_date"></td>
								</tr>
								<tr>
								<td>制作工厂:</td>
								<td id="factory"></td>
								<td>制作车间:</td>
								<td id="workshop"></td>
								</tr>
								<tr>
								<td>责任部门:</td>
								<td colspan=3 id="dutyUnit"></td>
								</tr>
							</table>
						</div>
						<div role="tabpanel" class="tab-pane" id="prdo_qty_detail">
							<table id="prodtable" class="table table-bordered" style="text-align: center; font-size: 12px;">
								<thead>
									<tr>
									<th>产量</th>
									<th>维护人</th>
									<th>维护时间</th>
									</tr>
								</thead>
								<tbody>
								
								</tbody>
							</table>
						</div>
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
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>