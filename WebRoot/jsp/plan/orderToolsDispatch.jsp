<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 随车附件</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/plan/orderToolsDispatch.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<style>
	.table th,.table td{
		height:35px
	}
	input[readonly]{
		cursor: not-allowed;
		background-color: white;
	}
</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="margin: 0 auto;">随车附件</legend>
				<!-- <div style="margin: 0 auto;"> -->
				<br />
				<div>
					<ul class="nav nav-pills" style="height: 30px">
						<li id="welding_li"><a href="busDispatch!planListPage.action">发车计划</a></li>
						<li  id="painting_li"><a
							href="busDispatch!busDoDispatch.action">发车交接</a></li>
						<li class="active" id="bottom_li"><a href="busDispatch!orderDispatch.action">随车附件</a></li>
						<li id="assembly_li"><a href="busDispatch!busDispatchQuery.action">发车查询</a></li>
					</ul>
				</div>
				<form id="orderToolsForm" class="well form-search">
					<label>订单编号：</label>
					<input type="text" id="orderNo" class="input-medium"> 
					<input type="button" id="queryBtn" class="btn btn-primary" value="查询">
					<input type="button" id="dispatchBtn" class="btn btn-success" value="交接" >
					<div class="help-inline" id="orderInfo" >
						<span title="订单名称" class="label label-info" rel="tooltip"  id="orderName"></span>
						<span title="车型" class="label label-info" rel="tooltip"  id="busType"></span>
						<span title="订单数量" class="label label-info" rel="tooltip"  id="orderQty"></span>
					</div>
				</form>
				<form action="" method="post" id="dispatchForm" style="display: none">
					<table id="dispatchDetail" class="table table-bordered" >
						<thead>
							<tr>
								<th width='50px'><i class="fa fa-plus" style="cursor: pointer;color:blue"></i></th>
								<th width='220px'>随车附件</th>
								<th>单车数量</th>
								<th>单位</th>
								<th>订单合计</th>
								<th>已发车合计</th>
								<th>交接数量</th>
							</tr>
						</thead>
						<tbody>

						</tbody>
					</table>
				</form>
			<div class="accordion" id="dispatchRecord">
				<div class="">
	                		<div class="accordion-heading " style="background-color: #F1F6FB;border: 1px solid #F7FAFE;height:30px">
	               				<a id="planViewToggle" data-toggle="collapse" data-parent="#dispatchRecord" href="#collapsePlan">交接记录</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	               				附件名称：<input type="text" id="dis_name" placeholder="附件名称..." class="input-medium"> 
	               				交接人：<input type="text" id="dis_receiver" placeholder="交接人..." class="input-medium">
	               				交接时间：<input type="text" id="dis_date_start" placeholder="开始时间..."  onclick="WdatePicker({el:'dis_date_start',dateFmt:'yyyy-MM-dd'});" class="input-medium"> 
	               				-<input type="text" id="dis_date_end" placeholder="结束时间..." onclick="WdatePicker({el:'dis_date_end',dateFmt:'yyyy-MM-dd'});" class="input-medium">
	               				<input type="button" id="querydisBtn" style="height:28px;margin-top:-11px" class="btn btn-primary" value="查询">
	               			</div>
	                		<div id="collapsePlan" class="accordion-body collapse in">
	                			<div class="accordion-inner" id="planDiv">
	                				<table id="dipatchRecord" class="table table-condensed">
	                					<thead>
	                    					<tr>
	                    						<th >随车附件</th >
												<th >单车数量</th >
												<th >单位</th >
												<th >交接数量</th >
												<th >操作人</th >
												<th >交接人</th >
												<th >交接时间</th >
	                  						</tr>
	                    				</thead>
	                    				<tbody>
	 					                   		
	         			         		</tbody>
	             				  	</table>
	                			</div>
	                		</div>
	                	</div>
			</div>
				<!-- 刷厂牌modal -->
				<div class="modal fade" id="dispatchModal" tabindex="-1"
					role="dialog" aria-hidden="true"
					style="display: none; width: 400px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>请刷厂牌</h3>
					</div>
					<div class="modal-body">
						<form class="form-horizontal">
						<div class="control-group ">
							<label class="control-label" style="width: 120px">工号：</label>
							<div class="controls" style="margin-left: 80px">
								<input type="text" class="input-medium" id="workcardid"/>
							</div>
							<label class="control-label" style="width: 120px">姓名：</label>
							<div class="controls" style="margin-left: 80px">
								<input type="text" class="input-medium" id="receiver"/>
							</div>
							<label class="control-label" style="width: 120px">部门：</label>
							<div class="controls" style="margin-left: 80px">
								<input type="text" class="input-medium" id="department"/>
							</div>
						</div>
						</form>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnDispatchConfirm">确定</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>