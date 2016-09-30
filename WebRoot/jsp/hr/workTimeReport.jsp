<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>工时统计报表</title>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<link href="js/datatables/css/jquery.dataTables.min.css"
	rel="stylesheet">
<link rel="stylesheet"
	href="js/jquery/ui-lightness/jquery-ui-1.10.2.custom.css" />
<link href="js/primitives/primitives.latest.css" media="screen"
	rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="css/zTreeStyle/metro.css" type="text/css">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript"
	src="js/jquery/jquery-ui-1.10.2.custom.min.js"></script>
<script type="text/javascript"
	src="js/ztree/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/json2.js"></script>
<script type="text/javascript" src="js/velocity.min.js"></script>
<script type="text/javascript" src="js/velocity.ui.min.js"></script>
<script type="text/javascript" src="js/exportTable2Excel.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/hr/workTimeReport.js"></script>
<style type="text/css">
.bp-title {
	padding: 2px 0px 0px 5px;
}

.btn {
	padding: 1px 12px 3px 11px;
}

input[type="text"] {
	margin-bottom: 0px;
}

.well {
	margin-bottom: 10px;
}

.section-head {
	border-left: 7px solid #000;
	padding-left: 10px;
	margin-bottom: 20px;
}
</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>

	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="margin: 0 auto;">
					<span id="staffListTitle"
						style="font-size: 17px; margin-left: -2px;">工时统计报表：第十九事业部</span>
				</legend>
				<br />

				<div style="margin-right: 5px; margin-top: -25px;">
					<br />
					<!-- 	<form id="form" class="well form-search"> -->
					<div class="control-group">
						<table>
							<tr>
								<td width="60px" style="text-align: right">工厂：</td>
								<td width="160px"><select id="factory" class="input-medium">
								</select></td>
								<td width="80px" style="text-align: right">车间：</td>
								<td width="160px"><select id="workshop"
									class="input-medium">
								</select></td>
								<td width="60px" style="text-align: right">班组：</td>
								<td width="160px"><select id="group" class="input-medium">
										<!-- <option value=''>请选择</option> -->
								</select></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td width="80px" style="text-align: right">小班组：</td>
								<td width="160px"><select id="subgroup"
									class="input-medium">
										<!-- 	<option value=''>请选择</option> -->
								</select></td>
								<td width="60px" style="text-align: right">姓名/工号：</td>
								<td width="160px"><input type="text" id="staff_number"
									class="input-medium" placeholder="姓名/工号" /></td>
								<td width="80px" style="text-align: right">统计月份：</td>
								<td><input type="text" id="waitmanhourdate"
									class="input-medium" onclick="WdatePicker({dateFmt:'yyyy-MM'})" />
								</td>
								<td><input type="button" class="btn btn-success"
									id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
							</tr>
						</table>
					</div>
					<!-- 	</form> -->

					<div id="tableDiv">
						<div id="pagination"
							style="display: none; padding-top: 0px; padding-bottom: 1px;"
							class="pagination pagination-small pagination-right">
							<ul>
								<li id="export"><a href="">导出总共<span total=""
										id="total"></span>条记录
								</a></li>
							</ul>
							<ul>
								<li id="first"><a href="#">«</a></li>
								<li id="pre" class="prePage"><a href="#">&lt;</a></li>
								<li id="cur" class="active curPage" page=""><a href="#">-</a></li>
								<li id="next" class="nextPage"><a href="#">&gt;</a></li>
								<li id="last"><a href="#">»</a></li>
							</ul>
						</div>
						<div style="word-break: break-all; height: 370px;">
							<div
								style="display: none; position: fixed; z-index: 999; margin-top: 140px; margin-left: 400px"
								class="divLoading">
								<span><i class="fa fa-spinner fa-spin fa-4x"
									style="height: 1em;"></i></span>
							</div>
							<table id="attendanceTable"
								style="text-align: center; font-size: 12px; table-layout: fixed;"
								class="table table-bordered table-striped">
								<!--  -->
								<thead>
									<tr id="">
										<th
											style="text-align: center; width: 20px; padding-left: 0px; padding-right: 0px">序号</th>
										<th
											style="text-align: center; width: 40px; padding-left: 0px; padding-right: 0px">工号</th>
										<th
											style="text-align: center; width: 30px; padding-left: 0px; padding-right: 0px">姓名</th>
										<th
											style="text-align: center; width: 35px; padding-left: 0px; padding-right: 0px">技能系数</th>
										<th
											style="text-align: center; width: 30px; padding-left: 0px; padding-right: 0px">工时类型</th>
										<th id="D1"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">01</th>
										<th id="D2"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">02</th>
										<th id="D3"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">03</th>
										<th id="D4"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">04</th>
										<th id="D5"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">05</th>
										<th id="D6"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">06</th>
										<th id="D7"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">07</th>
										<th id="D8"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">08</th>
										<th id="D9"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">09</th>
										<th id="D10"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">10</th>
										<th id="D11"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">11</th>
										<th id="D12"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">12</th>
										<th id="D13"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">13</th>
										<th id="D14"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">14</th>
										<th id="D15"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">15</th>
										<th id="D16"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">16</th>
										<th id="D17"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">17</th>
										<th id="D18"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">18</th>
										<th id="D19"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">19</th>
										<th id="D20"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">20</th>
										<th id="D21"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">21</th>
										<th id="D22"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">22</th>
										<th id="D23"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">23</th>
										<th id="D24"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">24</th>
										<th id="D25"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">25</th>
										<th id="D26"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">26</th>
										<th id="D27"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">27</th>
										<th id="D28"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">28</th>
										<th id="D29"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">29</th>
										<th id="D30"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">30</th>
										<th id="D31"
											style="align: center; width: 14px; padding-left: 0px; padding-right: 0px">31</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
							<br />
						</div>
						<div style="display:none">
								<table id="attendanceTableAll"
								style="text-align: center; font-size: 12px; table-layout: fixed;"
								class="table table-bordered table-striped">
								<!--  -->
								<thead>
									<tr id="">
										<th
											style="text-align: center;  padding-left: 0px; padding-right: 0px">序号</th>
										<th
											style="text-align: center;  padding-left: 0px; padding-right: 0px">工号</th>
										<th
											style="text-align: center;  padding-left: 0px; padding-right: 0px">姓名</th>
										<th
											style="text-align: center;  padding-left: 0px; padding-right: 0px">技能系数</th>
										<th
											style="text-align: center;  padding-left: 0px; padding-right: 0px">工时类型</th>
										<th id="D1_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">01</th>
										<th id="D2_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">02</th>
										<th id="D3_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">03</th>
										<th id="D4_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">04</th>
										<th id="D5_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">05</th>
										<th id="D6_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">06</th>
										<th id="D7_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">07</th>
										<th id="D8_all"
											style="align: center; padding-left: 0px; padding-right: 0px">08</th>
										<th id="D9_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">09</th>
										<th id="D10_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">10</th>
										<th id="D11_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">11</th>
										<th id="D12_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">12</th>
										<th id="D13_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">13</th>
										<th id="D14_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">14</th>
										<th id="D15_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">15</th>
										<th id="D16_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">16</th>
										<th id="D17_all"
											style="align: center; padding-left: 0px; padding-right: 0px">17</th>
										<th id="D18_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">18</th>
										<th id="D19_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">19</th>
										<th id="D20_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">20</th>
										<th id="D21_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">21</th>
										<th id="D22_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">22</th>
										<th id="D23_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">23</th>
										<th id="D24_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">24</th>
										<th id="D25_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">25</th>
										<th id="D26_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">26</th>
										<th id="D27_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">27</th>
										<th id="D28_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">28</th>
										<th id="D29_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">29</th>
										<th id="D30_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">30</th>
										<th id="D31_all"
											style="align: center;  padding-left: 0px; padding-right: 0px">31</th>
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