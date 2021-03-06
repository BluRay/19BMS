<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>技改工时统计</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/exportTable2Excel.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/hr/pieceSalary.js"></script>
<style type="text/css">
.section-head {
    border-left: 7px solid #000;
    padding-left: 10px;
    margin-bottom: 20px;
}
.table td{
	padding:5px;
}
</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="margin: 0 auto;">技改工时统计</legend>
			<div class="control-group">
							<table >
								<tr>
								<td width="60px" style="text-align:right">工厂：</td>
								<td width="160px">
									<select id="factory" class="input-medium">
									</select>
								</td>
								<td width="80px" style="text-align:right">车间：</td>
								<td width="160px">
									<select id="workshop" class="input-medium">
									</select>
								</td>
								<td width="80px" style="text-align:right">班组：</td>
								<td width="160px">
									<select id="group" class="input-medium">
									<!-- <option value=''>请选择</option> -->
									</select>
								</td>
								<td></td>
								<td></td>
								</tr>
								<tr>
								<td width="60px" style="text-align:right">小班组：</td>
								<td width="160px">
									<select id="subgroup" class="input-medium">
								<!-- 	<option value=''>请选择</option> -->
									</select>
								</td>
								<td width="80px" style="text-align:right">工号/姓名：</td>
								<td width="160px">
									<input type="text" id="bus_number" class="input-medium" placeholder="请输入车号/自编号"/>
								</td>
								<td width="80px" style="text-align:right">月份：</td>
								<td colspan=2>
									<!-- <input type="text" id="mta_wdate" class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM'})"/> -->
									<input type="text" id="month_start" class="input-small" onclick="WdatePicker({dateFmt:'yyyy-MM'})"/>
									<span>-</span><input type="text" id="month_end" class="input-small" onclick="WdatePicker({dateFmt:'yyyy-MM'})"/>
								</td>
								<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;margin-top: -10px;"></input>
									<input type="button" class="btn btn-success" id="btnSave" value="存档" style="margin-left: 2px;margin-top: -10px;"></input>
								</td>
								</tr>
							</table>
						</div>
					<div id="pagination"
					class="pagination pagination-small pagination-right"
					style="display: none">
					<ul>
						<li id="export"><a href="">导出总共<span total="" id="total"></span>条记录
						</a></li>
					</ul>
					<ul>
						<li id="first"><a href="#">«</a></li>
						<li id="pre" class="prePage"><a href="#">&lt;</a></li>
						<li id="cur" class="active curPage" page=""><a href="#"></a></li>
						<li id="next" class="nextPage"><a href="#">&gt;</a></li>
						<li id="last"><a href="#">»</a></li>
					</ul>
				</div>
						<div>
							<table id="tableResult" style="margin-left:0px;margin-top:0px;width:100%;text-align:left;" class="exp-table table">
							<thead style="background-color: rgb(225, 234, 240)">
							<tr>
							<td >月份</td>
							<td >工号</td>
							<td >姓名</td>
							<td >车间</td>
							<td >班组</td>
							<td >岗位</td>
							<td >技能<br/>系数</td>
							<td >出勤<br/>天数</td>
							<td >出勤<br/>小时数</td>
							<td >计件<br/>产量</td>
							<td >纯计件<br/>工资</td>
							<td >技改<br/>工时</td>
							<td >技改<br/>工资</td>
							<td >额外<br/>工时</td>
							<td >额外<br/>工资</td>
							<td >等待<br/>工时</td>
							<td >等待<br/>工资</td>
							<td >计件<br/>工资</td>
							<td >考核<br/>扣款</td>
							<td >实发计<br/>件工资</td>
							<td >平均<br/>日薪</td>
							</tr>
							</thead>
							<tbody class="exp-table" >
							</tbody>
							</table>
						</div>
						<div style="display:none">
							<table id="tableResultAll" style="margin-left:0px;margin-top:0px;width:100%;text-align:left;" class="exp-table table">
							<thead style="background-color: rgb(225, 234, 240)">
							<tr>
							<td >月份</td>
							<td >工号</td>
							<td >姓名</td>
							<td >车间</td>
							<td >班组</td>
							<td >岗位</td>
							<td >技能<br/>系数</td>
							<td >出勤<br/>天数</td>
							<td >出勤<br/>小时数</td>
							<td >计件<br/>产量</td>
							<td >纯计件<br/>工资</td>
							<td >技改<br/>工时</td>
							<td >技改<br/>工资</td>
							<td >额外<br/>工时</td>
							<td >额外<br/>工资</td>
							<td >等待<br/>工时</td>
							<td >等待<br/>工资</td>
							<td >计件<br/>工资</td>
							<td >考核<br/>扣款</td>
							<td >实发计<br/>件工资</td>
							<td >平均<br/>日薪</td>
							</tr>
							</thead>
							<tbody class="exp-table" >
							</tbody>
							</table>
						</div>
						
			</div>				
		</div>
	</div>
</body>				