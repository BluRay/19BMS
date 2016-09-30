<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta http-equiv="expires" content="0" />
<title>品质</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<!-- <link href="css/jquery.mobile-1.4.5.min.css" rel="stylesheet" type="text/css"> -->
<link href="css/common.css" rel="stylesheet">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<%-- <script type="text/javascript" src="js/jquery.mobile-1.4.5.min.js"></script> --%>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/quality/test_record_in.js"></script>
</head>
<body id="testRecordIn">
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_quality_left.jsp"%>
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<legend style="margin: 0 auto;">检验记录</legend>
			<div style=" margin: 0 auto;">
				<br />
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>生产工厂</td>
							<td>订单编号</td>
							<td>零部件名称</td>
							<td>零部件图号</td>
							<td>版本号</td>
							<td>生产日期</td>
							<td>检验结论</td>
							<td></td>
						</tr>
						<tr>
							<td><select style="width:90px;" name="" id="search_factory" class="input-medium carType"></select></td>
							<td><input style="width:90px;height: 30px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
							<td><input style="width:100px;" name="" id="input_parts" type="text"
								class="input-medium revise" />
							</td>
							<td><input type="text" class="input-small revise"
								id="input_partsChart" />
							</td>
							<td><input style="width:50px;" name="" id="input_version" type="text"
								class="input-small revise"/>
							</td>
							<td><input id="prod_start" type="text"
									class="input-small" style="width: 98px" placeholder="开始日期..."
									onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /> <span
									class="add-on" style="padding: 4px 0">至</span> <input
									id="prod_end" type="text" class="input-small"
									style="width: 98px" placeholder="结束日期..."
									onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /> <span>&nbsp;</span>
							</td>
							<td>
								<label class="checkbox"> <input type="checkbox"
										name="test_result" value="0" />一次检验合格
								</label> <label class="checkbox"> <input type="checkbox"
										name="test_result" value="1" />返工/返修合格
								</label> <label class="checkbox"> <input type="checkbox"
										name="test_result" value="2" />让步放行
								</label>
							</td>
							<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>	
							<td><input type="button" class="btn btn-success"
									id="btnAdd" value="新增" style="margin-left: 2px;"></input></td>							
						</tr>
					</table>
				</form>

				<table id="tableResult" class="table table-condensed"
					style="display: none" style="font-size: 12px;">
					<thead>
						<tr>
							<th width="70px">生产工厂</th>
							<th>零部件图号</th>
							<th width="80px">零部件名称</th>
							<th width="40px">车型</th>
							<th width="60px">订单</th>
							<th width="40px">配置</th>
							<th width="60px">版本号</th>
							<th>零部件编号</th>
							<th>生产日期</th>
							<th width="60px">专检员</th>
							<th>检验结论</th>
							<th width="60px">录入人</th>
							<th>录入时间</th>
							<th></th>
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
</body>
</html>