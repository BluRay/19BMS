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
<script type="text/javascript" src="js/hr/pieceSalary.js"></script>
<link rel="stylesheet" href="css/bootstrap.3.2.css">
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/bootstrap-table.css">
<link rel="stylesheet" href="css/bootstrap-table-fixed-columns.css">
<link rel="stylesheet" href="css/bootstrap-editable.css">
<title>BMS - 计件工资提交</title>
</head>
<body style="font-family: 'Microsoft YaHei';">
<%@ include file="../common/head.jsp"%>
<%@ include file="../common/general_hr_left.jsp"%> 
<div class="content-wrapper container">
	<div id="bodyright" class="offset2" style="margin-left:10px">
		<legend style="margin: -5px auto;font-size:17px;line-height:2.3">计件工资提交</legend>
		<div style="margin-top: -5px;margin-bottom:-15px">
			<div class="control-group" style="padding-top:10px;padding-bottom:2px">
				<table >
					<tr>
					<td width="60px" style="text-align:right">工厂：</td>
					<td width="160px"><select id="factory" class="input-medium"></select>
					</td>
					<td width="80px" style="text-align:right">车间：</td>
					<td width="160px"><select id="workshop" class="input-medium"></select>
					</td>
					<td width="60px" style="text-align:right">班组：</td>
					<td width="160px"><select id="group" class="input-medium"></select></td>
					<td width="50px"></td>
					<td></td>
					</tr>
					<tr>
					<td width="60px" style="text-align:right">小班组：</td>
					<td width="160px"><select id="subgroup" class="input-medium"></select></td>
					<td width="80px" style="text-align:right">工号/姓名：</td>
					<td width="160px"><input type="text" id="staff" class="input-medium" placeholder="请输入工号/姓名"/></td>
					<td width="60px" style="text-align:right">月份：</td>
					<td colspan=2><input type="text" id="month_start" class="input-small" onclick="WdatePicker({dateFmt:'yyyy-MM',onpicked:function(){changeMonth();},minDate:wDate,maxDate:cDate})"/>
						<span>-</span><input type="text" id="month_end" class="input-small" onclick="WdatePicker({dateFmt:'yyyy-MM',maxDate:llDate})"/>
					</td>
					<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;margin-top: -10px;"></input>
						<input type="button" class="btn btn-success" id="btnSave" value="提交" style="margin-left: 2px;margin-top: -10px;"></input>
					</td>
					</tr>
				</table>
			</div>
		</div>
		<div style="display: none;position:fixed;z-index:999;margin-top:150px;margin-left:500px" class="divLoading" >
            <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
        </div>
        <div class="container" style="height:200px;padding-left:0px;padding-right:0px;padding-top:0px">
        <div id="toolbar"></div>
		<table style="font-weight:normal" id="table" data-toolbar="#toolbar" data-search="false" data-show-refresh="true"
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