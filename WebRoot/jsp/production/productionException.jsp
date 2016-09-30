<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 生产·异常登记</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/production/productionException.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">异常登记
					<span class="pull-right">
	            		<a id="rightlink" href="#"><i class="fa fa-link"></i>&nbsp;节点扫描</a>
	            	</span>
            	</legend>
			<br/>
			<div ><!-- 内容主体 -->
				<form id="form" class="well form-search">
					<label><b>车号：</b></label>
					<input type="text" class="span3" placeholder="请扫描/输入车号..." id="vinText">
					<input type="text" style="display:none" class="span3" placeholder="请扫描/输入车号..." id="vinText2">
					<select name="exec_type" style="display:none" id="exec_type" class="input-small">
		                <option value="正常">正常</option>
		                <option value="返修">返修</option>
		                <option value="技改">技改</option>
		            </select>
		            <select name="exec_onoff" id="exec_onoff" class="input-small">
		                <option value="上线">上线</option>
		                <option value="下线">下线</option>
		            </select>
					<input type="button" class="btn btn-primary" disabled="disabled" id ="btnSubmit" value ="确定"></input>
					<input type="button" class="btn" id ="reset" value ="清空"></input>
					<input type="hidden" id='currentNode' name='currentNode' value='485'></input>		<!-- 修改为对应的NodeID -->	
					<input type="hidden" id='line' name='currentLine' value='涂装工厂I线'></input>
					<span class="help-inline" id="vinHint">请输入车号后回车</span>
					<div class="help-inline" id="carInfo">
						<span class="label label-info" rel="tooltip" title="VIN" id="infoVIN"></span>
						<span class="label label-info" rel="tooltip" title="订单" id="infoOrder"></span>
						<span class="label label-info" rel="tooltip" title="当前车间" id="infoWorkShop"></span>
						<span class="label label-info" rel="tooltip" title="当前工位" id="infoProcess"></span>
						<span class="label label-info" rel="tooltip" title="配置" id="infoConf"></span>
						<span class="label label-info" rel="tooltip" title="状态" id="infoStatus"></span>
						<span class="label label-info" rel="tooltip" title="颜色" id="infoColor"></span>
						<span class="label label-info" rel="tooltip" title="座位数" id="infoSeats"></span>
					</div>
				</form>
			</div><!-- end 主体 --> 
			
			<div>
				<div id="messageAlert" class="alert"></div>    
			</div> <!-- end 提示信息 -->


			<div class="accordion-group">
			<table width="100%">
			<tr>
				<td width="760px">
				
				<span  style="font-size:14px;height:24px" class="help-inline">节点信息： &nbsp;&nbsp;&nbsp;&nbsp;</span>
				<br/>
				<div style="height:90px;width:720px" class="accordion-inner" id="TodayMiddlePlanDiv">
					<table id="TodayWaxPlanTable" style="width: 700px" class="table-condensed">
						<thead>
							<tr>
								<th align="left">生产工厂</th>
								<th align="left">生产车间</th>
								<th align="left">生产线别</th>
								<th align="left">监控点</th>
								<th align="left">监控名</th>
								<th align="left">操作员</th>
							</tr>
							<tr>
								<th>
									<select disabled="disabled" name="exec_factory" id="exec_factory" class="input-small">
						            </select>
					            </th>
								<th>
									<select disabled="disabled" name="exec_workshop" id="exec_workshop" class="input-small">
						            </select>
					            </th>
								<th>
									<select name="exec_line" id="exec_line" class="input-small">
						            </select>
					            </th>
								<th>
									<select name="exec_process" id="exec_process" class="input-small">
						            </select>
					            </th>       
								<th>
									<input type="text" disabled="disabled" name="exec_processname" id="exec_processname" class="input-medium">
						            </input>
					            </th>
								<th>
									<select name="exec_user" id="exec_user" class="input-small">
						                <option value="<%=session.getAttribute("user_id") %>"><%=session.getAttribute("display_name") %></option>
						            </select>
					            </th>
							</tr>
					</table>
				</div>
				
				<div style="height:250px;width:720px" class="accordion-inner" id="TodayMiddlePlanDiv">
				<table id="TodayWaxPlanTable2" style="width: 700px;margin-bottom:0px" class="table table-condensed">
					<thead>
						<tr>
							<th align="left">异常类别</th>
							<th class="">缺料原因</th>
							<th class="">开始时间</th>
							<th class="">严重等级</th>
						</tr>
						<tr>
							<th>
								<select name="reason_type" id="reason_type" class="input-medium">
					            </select>
				            </th>
							<th>
								<select name="lack_reason" id="lack_reason" class="input-medium">
					            </select>
				            </th>
							<th>
								<input type="text" class="input-medium" placeholder="选择开始时间..." id="start_time" onClick="WdatePicker({el:'start_time',dateFmt:'yyyy-MM-dd HH:mm'});"/>
				            </th>
							<th>
								<select name="severity_level" id="severity_level" class="input-medium">
								<option value="0">不影响</option>
								<option value="1">普通</option>
								<option value="2">严重</option>
					            </select>
				            </th>
						</tr>
					</table>
					<div style="padding-top:-10px">&nbsp;&nbsp;详细原因：<br/>&nbsp;&nbsp;<textarea style="width:650px" class="input-xlarge" id="detailed_reasons" rows="2"></textarea></div>
				</div>
				
				</td>
				<td  valign="top">
				<div style="width:200px;" class="accordion-group" >
				<table id="dispatchDetail" class="table table-bordered">
				<thead>
				<tr>
					<td>已登记车号</td>
					<td>删除</td>
				</tr>
				</thead>
					<tbody>
	
					</tbody>
				</table>

				</div>
				</td>
			</tr>
			</table>
				
			</div>
			</div>
		</div>
	</div>
</body>
</html>