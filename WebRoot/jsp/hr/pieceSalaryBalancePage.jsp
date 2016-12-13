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
<script type="text/javascript" src="js/hr/pieceSalaryBalance.js"></script>
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/bootstrap-table.css">
<link rel="stylesheet" href="css/bootstrap-editable.css">
<title>BMS - 计件工资结算</title>
</head>
<body style="font-family: 'Microsoft YaHei';">
<%@ include file="../common/head.jsp"%>
<%@ include file="../common/general_hr_left.jsp"%> 
<div class="content-wrapper container">
    <div id="bodyright" class="offset2" style="margin-left:10px">
    <legend style="margin: 0 auto;font-size:17px;line-height:2.3">计件工资结算</legend>
		<div style="margin-top: -5px;margin-bottom:-25px">
			<div class="control-group well" style="padding-top:10px;padding-bottom:2px">
				<table>
					<tr>
						<td width="60px" style="text-align: right">工厂：</td>
						<td width="160px"><select id="factory" class="input-medium"></select></td>
						<td width="80px" style="text-align: right">车间：</td>
						<td width="160px"><select id="workshop" class="input-medium"></select></td>
						<td width="100px" style="text-align: right">班组：</td>
						<td width="160px"><select id="group" class="input-medium"></select></td>
						<td width="80px"></td>
						<td></td>
					</tr>
					<tr>
						<td width="60px" style="text-align: right">小班组：</td>
						<td width="160px"><select id="subgroup" class="input-medium">
						</select></td>
						<td width="80px" style="text-align: right">工号/姓名：</td>
						<td width="160px" style="padding-top:10px;"><input type="text" id="staff" class="input-medium" placeholder="请输入工号/姓名" /></td>
						<td width="100px" style="text-align: right">月份：</td>
						<td colspan=2  style="padding-top:10px;">
							<!-- <input type="text" id="mta_wdate" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM'})"/> -->
							<input type="text" id="month_start" class="input-small" onclick="WdatePicker({dateFmt:'yyyy-MM',onpicked:function(){changeMonth();},maxDate:cDate})" />
							<span>-</span><input type="text" id="month_end" class="input-small" onclick="WdatePicker({dateFmt:'yyyy-MM',maxDate:llDate})" />
						</td>
						<td>
						<input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px; margin-top: -10px;"></input> 
						<input type="button" class="btn btn-danger" id="btnReject" value="驳回" style="margin-left: 2px; margin-top: -10px;"></input> 
						<input type="button" class="btn btn-success" id="btnSave" value="结算" style="margin-left: 2px; margin-top: -10px;"></input>
						</td>
					</tr>
				</table>
			</div>
		</div>

		<div class="container" style="height:200px;padding-left:0px;padding-right:0px;padding-top:0px">
		<div id="toolbar"></div>
		<table id="table" data-toolbar="#toolbar" data-search="false" data-show-refresh="true"
	           data-show-toggle="false" data-show-columns="true" data-show-export="true" data-detail-view="false"
	           data-detail-formatter="detailFormatter" data-minimum-count-columns="2" data-show-pagination-switch="true"
	           data-pagination="true" data-id-field="id" data-page-list="[50, 100, 200, 500, ALL]"
	           data-show-footer="false" data-side-pagination="server" data-response-handler="responseHandler">
	    </table>
		</div>
	</div>
</div>
<script>
var $table = $('#table'),$remove = $('#remove'),selections = [];
</script>
</body>
</html>