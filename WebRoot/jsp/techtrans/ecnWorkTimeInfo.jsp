<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 技改工时</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/techtrans/ecnWorkTimeInfo.js"></script>
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
						<li role="presentation" class="active"><a href="#workhour_detail"
							aria-controls="painting" role="tab" data-toggle="tab" onclick="generateWhDetailTb()">工时明细</a></li>
						<li role="presentation"><a href="#workhour_assess"
							aria-controls="bottom" role="tab" data-toggle="tab" onclick="generateAssignDetailTb()">工时分配</a></li>
					</ul>
					<input type="hidden" id="ecnTaskId" value="<s:property value='taskid' />">
					<input type="hidden" id="ecnNumber" value="<s:property value='configStr' />">
					<input type="hidden" id="singleHour" value="<s:property value='configStr1' />">
					<!-- Tab panes -->
					<div class="tab-content" style="height:500px;overflow:auto">
						<div role="tabpanel" class="tab-pane active" id="workhour_detail">
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