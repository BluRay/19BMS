<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 生产·节点扫描</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/production/productionExecution.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">节点扫描
					<span class="pull-right">
	            		<a id="rightlink" href="#"><i class="fa fa-link"></i>&nbsp;异常登记</a>
	            	</span>
            	</legend>
			<br/>
			<div ><!-- 内容主体 -->
				<form id="form" class="well form-search">
					<label><b>车号：</b></label>
					<input type="text" class="span3" placeholder="请扫描/输入车号..." id="vinText">
					<input type="text" style="display:none" class="span3" placeholder="请扫描/输入车号..." id="vinText2">
					<select name="exec_type" id="exec_type" class="input-small">
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
				<!-- 	<label><b>关键零部件：</b></label><input type="text" placeholder="请扫描关键零部件" style="padding-top:5px;" /> -->
					
					<div class="help-inline" id="carInfo">
						<span class="label label-info" rel="tooltip" title="VIN" id="infoVIN"></span>
						<span class="label label-info" rel="tooltip" title="订单" id="infoOrder"></span>
						<span class="label label-info" rel="tooltip" title="当前车间" id="infoWorkShop"></span>
						<span class="label label-info" rel="tooltip" title="当前线别" id="infoLine"></span>
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
				<span style="font-size:14px;height:24px;width:100%;background-color:#f1f6fb" class="help-inline">节点信息： &nbsp;&nbsp;&nbsp;&nbsp;</span>
				<br/>
				<div style="height:90px" class="accordion-inner" id="TodayMiddlePlanDiv">
					<table id="TodayWaxPlanTable" style="width: 700px" class="table-condensed">
						<thead>
							<tr>
								<th align="left" >&nbsp;生产工厂</th>
								<th align="left">&nbsp;生产车间</th>
								<th align="left">&nbsp;生产线别</th>
								<th align="left">&nbsp;监控点</th>
								<th align="left">&nbsp;监控名</th>
								<th align="left">&nbsp;操作员</th>
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
			</div>
			<br/>
			<div class="accordion-group" id="partsListDiv" style="display:none">
				<span style="font-size:14px;height:24px;width:100%;background-color:#f1f6fb" class="help-inline">零部件信息： &nbsp;&nbsp;&nbsp;&nbsp;</span> 
				
				<br/>
				<div class="accordion-inner" >
					<table id="partsListTable" style="width: 700px;" class="table-condensed">
						<thead>
							<tr>
								<th align="left" width=180px>&nbsp;零部件名称</th>
								<th align="left" width=180px>&nbsp;零部件编号</th>
								<th align="left" width=150px>&nbsp;批次</th>
								<th align="left" width=80px>&nbsp;状态</th>
							</tr>
						</thead>
						<tbody>
							
						</tbody>	
					</table>
				</div>
			</div>
			

			<!-- new order start -->
			<div class="modal" id="newModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
			    <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			        <h3>校验</h3>
			    </div>
			    <div class="modal-body">
			        <form id="  " class="form-horizontal">
			            <div class="control-group">
			                <label class="control-label" for="vin">*&nbsp;vin号</label>
			                <div class="controls">
			                    <input type="text" id="vin" placeholder="vin号..." class="input-medium" />
			                </div>
			            </div>
			            <div class="control-group">
			                <label class="control-label" for="left_motor_number">*&nbsp;左电机号</label>
			                <div class="controls">
			                    <input type="text" id="left_motor_number" placeholder="左电机号..." class="input-medium"  />
			                </div>
			            </div>
			            <div class="control-group">
			                <label class="control-label" for="right_motor_number">*&nbsp;右电机号</label>
			                <div class="controls">
			                    <input type="text" id="right_motor_number" placeholder="右电机号..." class="input-medium" />
			                </div>
			            </div>
			        </form>
			    </div>
			    <div class="modal-footer">
			        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
			        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
			        <button class="btn btn-primary" id="btnAddConfirm">确认</button>
			    </div>
			</div>
			<!-- new order End -->
			
			<div class="modal" id="gpsModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
			    <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			        <h3>校验</h3>
			    </div>
			    <div class="modal-body">
			        <form id="  " class="form-horizontal">
			            <div class="control-group">
			                <label class="control-label" for="vin">*&nbsp;vin号</label>
			                <div class="controls">
			                    <input type="text" id="clientVin" placeholder="vin号..." class="input-medium" disabled/>
			                </div>
			            </div>
			            <div class="control-group">
			                <label class="control-label" for="left_motor_number">*&nbsp;车载版本</label>
			                <div class="controls">
			                    <select id="clientFlag">
			                    	<option value='1'>1代</option>
			                    	<option value='2'>2代</option>
			                    </select>
			                </div>
			            </div>
			        </form>
			    </div>
			    <div class="modal-footer">
			        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
			        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
			        <button class="btn btn-primary" id="clientValidate">确认</button>
			    </div>
			</div>
			</div>
		</div>
	</div>
</body>
</html>