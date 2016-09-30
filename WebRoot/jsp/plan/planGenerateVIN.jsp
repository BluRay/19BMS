<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 生成VIN</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<link href="css/printable.css" rel="stylesheet" type="text/css" media="print">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="js/jquery-barcode.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/exportTable2Excel.js"></script>
<script type="text/javascript" src="js/plan/planGenerateVIN.js"></script>
<style type="text/css" media="screen">
        .printable{
            display: none;
        }
  </style> 
</head>
<body>
<div  class="notPrintable" >
		<%@ include file="../common/head.jsp"%>
		<%@ include file="../common/general_plan_left.jsp"%>
		<!-- main -->
		<div class="content-wrapper ">
			<div id="bodymain" class="offhead">
				<div id="bodyright" class="offset2">
					<!-- Main -->
					<legend style="margin: 0 auto;">生成车辆VIN</legend>
					<div style="margin: 0 auto;">
						<form id="form" class="well form-search">
							<table>
								<tr>
									<td>生产工厂</td>
									<td>订单编号</td>
									<td>车号</td>
									<td>VIN号</td>
									<td></td>
								</tr>
								<tr>
									<td><select name="" id="search_factory"
										class="input-medium carType">
									</select></td>
									<td><input style="height: 30px;" type="text"
										class="input-medium revise" placeholder="订单编号..."
										id="search_order_no" /></td>
									<td><input style="height: 30px;" type="text"
										class="input-medium revise" placeholder="车号..."
										id="search_bus_number" /></td>
									<td><input style="height: 30px;" type="text"
										class="input-medium revise" placeholder="VIN号..."
										id="search_bus_vin" /></td>
									<td><input type="button" class="btn btn-primary"
										id="btnQuery" value="查询" style="margin-left: 2px;"></input> <input
										type="button" class="btn btn-success" id="btnGenVin"
										value="生成VIN号" style="margin-left: 2px;"></input> <!-- <input
										type="button" disabled="disabled" class="btn btn-info"
										id="btnExport" value="导出" style="margin-left: 2px;"></input> --> <input
										type="button" disabled="disabled" class="btn btn-danger"
										id="btnImport" value="导入" style="margin-left: 2px;"></input> 
										<input
										type="button"  class="btn btn-info"
										id="btnPrint" value="打印VIN号" style="margin-left: 2px;"><input
										type="text" style="display: none" class="input-small revise"
										id="order_id"></input> <input type="text"
										style="display: none" class="input-small revise"
										id="factory_id"></input> <input type="text"
										style="display: none; width: 400px" class="input-large revise"
										id="revision_str"></input></td>

								</tr>
							</table>
						</form>
						<div id="divBulkAdd" class="thumbnail"
							style="display: none; height: 95px;">
							<h5 align="left">左右电机号导入</h5>
							<!-- <form action="PlanImport.action" enctype="multipart/form-data" method="post" class="form-horizontal"> -->
							<form action="plan!uploadvin.action"
								enctype="multipart/form-data" method="post"
								class="form-horizontal">
								<input id="file" type="file" class="btn btn-info btn-small"
									name="file" accept="*.csv" /> <input id="btn_upload"
									type="submit" class="btn btn-primary" value="上传并导入"
									onclick="javascript:return LimitAttach(this.form, this.form.file.value)" />
								&nbsp;&nbsp;&nbsp;&nbsp;
							</form>
						</div>
						<div id="maindiv" height:auto;overflow:auto; border:0pxsolid #000000;">
							<div style="display: none;position:fixed;z-index:999;margin-top:150px;margin-left:500px" class="divLoading" >
                                <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
                            </div> 
                            	<div id="pagination"
								class="pagination pagination-small pagination-right"
								style="display: none">
								<ul>
									<li id="btnExport"><a href="">导出总共<span total="" id="total"></span>条记录
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
							<!-- 主体 -->
							<table id="tableVIN"
								style="text-align: center; table-layout: fixed; font-size: 12px;word-wrap:break-word;word-break:break-all;white-space:normal;"
								class="table table-bordered table-striped">
								<thead>
									<tr>
										<th style="text-align: center;" width="40px">序号</th>
										<th style="text-align: center;" width="70px">工厂</th>
										<th style="text-align: center;" width="180px">订单</th>
										<th style="text-align: center;" width="110px">VIN号</th>
										<th style="text-align: center;" width="65px">左电机号</th>
										<th style="text-align: center;" width="65px">右电机号</th>
										<th style="text-align: center;" width="100px">车号</th>
										<!-- <th style="text-align: center;" width="35px">生产日期</th> -->
										<th style="text-align: center;" width="45px">生成者</th>
										<th style="text-align: center;" width="120px">生成日期</th>
										<th style="text-align: center;" width="50px">打印标志</th>
										<!-- <th style="text-align: center;" width="35px">打印时间</th>
										<th style="text-align: center;" width="35px">打印者</th> -->
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						
						</div>
					</div>
				</div>
				<!-- new order start -->
				<div class="modal" id="newModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>生成VIN号</h3>
					</div>
					<div class="modal-body">
						<form id="  " class="form-horizontal">
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;订单编号</label>
								<div class="controls">
									<input type="text" disabled="disabled" id="new_order_no"
										placeholder="订单编号..." class="input-medium" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="newOrderCode">*&nbsp;VIN号工厂</label>
								<div class="controls">
									<select name="" id="vin_factory" class="input-medium carType"></select>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="newOrderCode">*&nbsp;生成数量</label>
								<div class="controls">
									<input style="height: 30px;" type="text"
										class="input-medium revise" placeholder="生成数量..."
										id="new_vinCount" />
								</div>
							</div>

						</form>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
						<!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
						<button class="btn btn-primary" id="btnAddConfirm">确认生成</button>
					</div>
				</div>
				<!-- new order End -->

			</div>
		</div>
		</div>
	<div id="printarea" class="printConfigure printable toPrint">
		<!-- <table id="tableResultAll" style="margin-left:0px;margin-top:0px;width:70%;text-align:left;" class="exp-table table">
							<thead style="background-color: rgb(225, 234, 240)">
							<tr>
							<td >id</td>
							<td >VIN</td>
							<td >左电机号</td>
							<td >右电机号</td>
							<td >车号</td>
							<td >生产日期</td>
							<td >VIN条形码</td>
							</tr>
							</thead>
							<tbody class="exp-table" >
							</tbody>
							</table> -->
	</div>
</body>
</html>