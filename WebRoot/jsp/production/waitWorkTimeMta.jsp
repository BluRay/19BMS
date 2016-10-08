<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 等待工时</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/zTreeStyle/metro.css" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/ztree/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/production/waitWorkTimeMta.js"></script>
<style type="text/css">
.section-head {
	border-left: 7px solid #000;
	padding-left: 10px;
	margin-bottom: 20px;
}

.table td {
	padding: 5px;
}
</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper " unselectable="on" onselectstart="return false;" style="-moz-user-select:-moz-none;">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend >等待工时维护</legend>
				<div id="zztree" style="position:relative;left:0; float:left; width:230px; height:500px;border:1px solid #ccebf8;overflow: auto;">
					<ul id="workGroupTree" class="ztree"></ul>
				</div>
				<br>	
				<div style="margin-left: 235px;margin-right: -5px;margin-top: -20px;">
				<form id="form" class="well form-search" style="margin: 0px;padding: 8px;">
					<table>
						<tr>
							<td width="80px" style="text-align: right">等待日期：</td>
							<td><input type="text" style="background-color:#ffffff;cursor:initial" id="mta_wdate" class="input-small"
								onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:new Date(),onpicked:function(){ajaxGetDist();}})" readonly/></td>
							<td></td>
							<td rowspan=2><textarea class="input-xlarge"
									style="resize: none" name="reason_detail" id="reason_detail"
									rows="2"></textarea></td>
							<td style="text-align: right" width="80px">责任部门：</td>
							<td><input type="text" class="input-small" id="duty_unit"></td>		
							<td><input type="button" class="btn btn-success"
								id="btnSave" value="保存"
								style="margin-left: 2px; "></input></td>
						</tr>
						<tr>
							<td width="80px" style="text-align: right">等待原因：</td>
							<td width="100px"><select id="waitReason"
								class="input-small">
									<option value=''>请选择</option>
									<option value='停线'>停线</option>
									<option value='其他'>其他</option>
							</select></td>
							<td width="80px" style="text-align: right">具体原因：</td>
							<td style="text-align: right;width:80px">已录工时：</td>			
							<td style="text-align: left;width:80px"><span id="record_hour"></span></td>				
							
						</tr>
					</table>
				</form>
				<input type="hidden" id="d_workshop"
					value="<s:property value='user.workshop_org' />"> <input
					type="hidden" id="d_workgroup"
					value="<s:property value='user.workgroup_org' />"> <input
					type="hidden" id="d_team"
					value="<s:property value='user.team_org' />">
				<br>
				<div style="position: relative;height:390px;overflow: auto;">
					<div style="display: none;position:fixed;z-index:999;margin-top:150px;margin-left:500px" class="divLoading" >
                                <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
                            </div>  
					<table id="table_workhour"
						style="margin-left: 0px; margin-top: 0px; width: 100%;text-align: left;"
						class="exp-table table">
						<thead style="background-color: rgb(225, 234, 240);height:30px">
							<tr>
								<td style="width: 30px;"><i class="fa fa-plus addWorkhour"
									style="cursor: pointer; color: blue; margin-left: 5px"></i></td>
								<td>工号</td>
								<td>姓名</td>
								<td>岗位</td>
								<td>等待<br/>工时</td>
								<!-- <td>分配<br/>比例</td> -->
								<td>人员去向</td>
								<td>小班组</td>
								<td>班组</td>
								<td>车间</td>
								<td>工厂</td>
							</tr>
						</thead>
						<tbody class="exp-table" id="tb_workhour">
						</tbody>
					</table>
				</div>

				<div class="modal fade" id="waitReasonModal" tabindex="-1"
					role="dialog" aria-hidden="true"
					style="display: none; width: 900px; max-height: 500px; left: 500px">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>选择停线原因</h3>
					</div>
					<div class="modal-body" style="min-height: 400px;">
						<form id="newRecordForm" class="form-horizontal" method="post">
							<table>
								<tr>
									<td width='80px'>生产订单：</td>
									<td width='160px'><input style="height: 30px;"
										class="input-medium" placeholder="订单..." id="search_order_no"
										type="text"></td>
									<td width='80px'>停线时间：</td>
									<td><input style="width: 130px" class="input-medium"
										placeholder="开始日期..." id="pause_date_start"
										onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'});"
										type="text"> -<input style="width: 130px"
										class="input-medium" placeholder="截止日期..." id="pause_date_end"
										onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'});"
										type="text"></td>
								</tr>
								<tr>
									<td width='80px'>停线原因：</td>
									<td width='160px'><select name="" id="search_reason_type"
										class="input-medium">
											<!-- <option
												value="">全部</option>
											<option value="40">缺料</option>
											<option value="41">品质问题</option>
											<option value="42">技术资料-变更</option>
											<option value="43">设备故障</option> -->
									</select></td>
									<td width='80px'>恢复时间：</td>
									<td><input style="width: 130px" class="input-medium"
										placeholder="开始日期..." id="ok_date_start"
										onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'});"
										type="text"> -<input style="width: 130px"
										class="input-medium" placeholder="截止日期..." id="ok_date_end"
										onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'});"
										type="text"> <input type="button"
										class="btn btn btn-primary" id="btnQueryReason" value="查询"
										style="margin-left: 2px;"></input></td>

								</tr>
							</table>

						</form>
						<table id="tableException"
							style="margin-left: 0px; margin-top: 0px; width: 100%; text-align: left;"
							class="exp-table table">
							<thead style="background-color: rgb(225, 234, 240)">
								<tr>
									<td style="width: 30px;"></td>
									<td>生产订单</td>
									<td>停线时间</td>
									<td>预计恢复时间</td>
									<td>实际恢复时间</td>
									<td>严重等级</td>
									<td>异常原因</td>
									<td>详细原因</td>
									<td>责任部门</td>
								</tr>
							</thead>
							<tbody class="exp-table" id="tb_exception">
							</tbody>
						</table>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnConfirm">确定</button>
					</div>
				</div>
			</div>
			</div>
		</div>
	</div>
</body>