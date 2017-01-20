<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="expires" content="0" />
<script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.js"></script>
<script type="text/javascript" src="js/ga.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/techtrans/techTaskReport.js"></script>
<link rel="stylesheet" href="css/bootstrap.3.2.css">
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/bootstrap-table.css">
<link rel="stylesheet" href="css/bootstrap-table-fixed-columns.css">
<link rel="stylesheet" href="css/bootstrap-editable.css">
<title>BMS - 技改报表-技改成本</title>
</head>
<body style="font-family: 'Microsoft YaHei';">
<%@ include file="../common/head.jsp"%>
<%@ include file="../common/general_techtask_left.jsp"%> 
<div class="content-wrapper container">
    <div id="bodyright" class="offset2" style="margin-left:10px">
    <legend style="margin: -5px auto;font-size:17px;line-height:2.3">技改报表-技改成本</legend>
		<div style="margin-top: -5px;margin-bottom:-15px">
			<div class="control-group" style="padding-top:10px;padding-bottom:2px">
				<table>
					<tr>
						<td width="80px" style="text-align: right">技改任务：</td>
						<td width="160px"><input type="text" style="height: 30px;" class="input-medium revise" placeholder="技改任务..." id="task_content"></td>
						<td width="90px" style="text-align: right">技改单编号：</td>
						<td width="160px"><input type="text" style="height: 30px;" class="input-medium revise" placeholder="技改编号..." id="tech_order_no"></td>
						<td width="90px" style="text-align: right">订单号：</td>
						<td width="160px"><input type="text" style="height: 30px;" class="input-medium revise" placeholder="订单号..." id="order_no"></td>
						<td width="50px" style="text-align: right">状态：</td>
						<td><select id="status" class="input-small"><option value="0">全部</option></select></td>
					</tr>
					<tr>
						<td width="80px" style="text-align: right">工厂：</td>
						<td width="160px"><select id="factory" class="input-medium">
						</select></td>
						<td width="90px" style="text-align: right">车间：</td>
						<td width="160px"><select id="workshop" class="input-medium">
						</select></td>
						<td width="90px" style="text-align: right">技改单日期：</td>
						<td colspan=3>
							<input name="tech_date_start" id="tech_date_start" class="Wdate" style="height: 30px; background-color: white; width: 120px" onfocus="javascript:WdatePicker()" type="text"> 至 <input name="tech_date_end" id="tech_date_end" class="Wdate" onfocus="javascript:WdatePicker()" style="height: 30px; background-color: white; width: 120px" type="text">
							<input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px; margin-top: -10px;"></input>
						</td>
					</tr>
				</table>
				<ul class="nav nav-pills" role="tablist" style="height:15px;margin-top:-10px">
					<li role="presentation" class="active" >
						<a id="li_1"  onclick="change_tab(1);" role="tab" data-toggle="tab">费用明细</a>
					</li>
					<li role="presentation" >
						<a id="li_2"  onclick="change_tab(2);" role="tab" data-toggle="tab">物料明细</a>
					</li>
				</ul>
			</div>
			
		</div>
		<div style="display: none;position:fixed;z-index:999;margin-top:150px;margin-left:500px" class="divLoading" >
            <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
        </div>
		<div class="container" style="height:200px;padding-left:0px;padding-right:0px;padding-top:0px">
		<div id="toolbar"></div>
		<table style="font-weight:normal;table-layout:fixed" id="table"  data-toolbar="#toolbar" data-search="false" data-show-refresh="true"
	           data-show-toggle="false" data-show-columns="true" data-show-export="true" data-detail-view="false"
	           data-detail-formatter="detailFormatter" data-minimum-count-columns="2" data-show-pagination-switch="true"
	           data-pagination="true" data-id-field="id" data-page-list="[50, 100, 200, 500, ALL]"
	           data-show-footer="false" data-side-pagination="server" data-response-handler="responseHandler">
	    </table>
		</div>

		<div class="modal fade" id="reasonModal" tabindex="-1" role="dialog" unselectable="on" onselectstart="return false;" 
		aria-hidden="true" style="display: none; -moz-user-select: -moz-none; width: 600px; height: 250px; left: 45%">
			<div class="modal-header"><h3>驳回原因</h3></div>
			<div class="modal-body" style="margin-bottom: -20px;height: 140px;">
				<div class="control-group">
					<table>
						<tr>
							<td width="100px" style="text-align: right">驳回原因：</td>
							<td width="350px"><textarea rows="2" id="reject_reason" style="width: 350px"></textarea></td>
						</tr>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" id="btnMtaSave">确认</button>
				<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
			</div>
		</div>
		</div>
</div>
<script>
var $table = $('#table'),$remove = $('#remove'),selections = [];
</script>
</body>
</html>