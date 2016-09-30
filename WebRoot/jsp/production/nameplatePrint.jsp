<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>铭牌打印</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<link href="css/printable.css" rel="stylesheet" type="text/css"
	media="print">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery-barcode.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/production/nameplatePrint.js"></script>
<style type="text/css" media="screen">
.printable {
	display: none;
}
</style>
</head>
<body>
	<div class="notPrintable">
		<%@ include file="../common/head.jsp"%>
		<%@ include file="../common/general_plan_left.jsp"%>
		<div class="content-wrapper ">
			<div id="bodymain" class="offhead">

				<div id="bodyright" class="offset2">
					<!-- Main -->
					<legend style="margin: 0 auto;">铭牌打印</legend>
					<br />
					<form id="form" class="well form-search">
						<table>
							<tr>
								<td>订单编号</td>
								<td>车号范围</td>
								<td></td>
							</tr>
							<tr>
								<td><input type="text" class="input-medium revise"
									id="input_order_no" /></td>
								<td><input type="text" class="input-medium revise"
									id="input_busno_start" /> <span class="add-on"
									style="padding: 4px 0">-</span> <input type="text"
									class="input-medium revise" id="input_busno_end" /></td>
								<td><input type="button" class="btn btn-primary"
									id="btnQuery" value="查询" style="margin-left: 2px;"></input>&nbsp;&nbsp;
									<input type="button" class="btn btn-success" id="btnPrint"
									value="打印" style="margin-left: 2px;"></input>&nbsp;&nbsp;
								<!-- 	<input type="text" class="input-medium revise" placeholder="请输入生产日期" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"
									id="input_product_date" /> -->
									</td>
							</tr>
						</table>
					</form>
					<table id="tableResult" class="table table-condensed"
						style="display: none" >
						<thead>
							<tr>
								<th><input type="checkbox" id="checkall"></th>
								<th>车身号</th>
								<th>VIN</th>
								<th>品牌</th>
								<th>电机型号</th>
								<th>底盘型号</th>
								<th>电机最大功率</th>
								<th>最大允许总质量</th>
								<th>电池型号</th>
								<th>电池容量</th>
								<th>额定电压</th>
								<th>整车生产日期</th>
								<th>打印人</th>
								<th>打印日期</th>
								<th>是否已打印</th>
							</tr>
						</thead>
						<tbody>

						</tbody>
					</table>
					<div id="pagination"
						class="pagination pagination-small pagination-right"
						style="display: none">
						<ul>
							<li id="export"><a href="">总共<span total="" id="total"></span>条记录
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
				</div>
			</div>
		</div>
	</div>
	<div id="printarea" class="printConfigure printable toPrint">
		<table id="tablePrint" class="table table-bordered">
		
		</table>
	</div>
</body>
</html>