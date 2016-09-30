<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 订单配置分配</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/order/orderConfigAllot.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_order_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">订单配置分配</legend>
				<div style="margin: 0 auto;">
		<br/><form id="form" class="well form-search">
			<table>
				<tr>
					<td>订单编号</td>
					<td>订单名称</td>
					<td>生产年份</td>
					<td>生产工厂</td>
					<td></td>
				</tr>
				<tr>
					<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="请输入订单编号..." value="<s:property value="#request.test"/>" id="search_order_no" /></td>
					<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="请输入订单名称..." id="search_order_name" /></td>
					<td><select name="" id="search_productive_year" class="input-small carSeries">
					</select></td>
					<td><select name="" id="search_factory" class="input-medium carType">
					</select></td>
					<td><input type="button" class="btn btn-primary"
						id="btnQuery" value="查询" style="margin-left: 2px;"></input>
					</td>
				</tr>
			</table>
		</form>
		
		<table id="tableOrder" class="table table-condensed" style="font-size:12px;">
                 <thead>
                     <tr>
                         <th>订单编号</th>
                         <th>订单描述</th>
                         <th>订单交期</th>
                         <th>生产工厂</th>
                         <th>生产数量</th>
                         <th>生产配置</th>
                         <th>配置数量</th>
                         <th>生产序号</th>
                         <th>客户</th>
                         <th>&nbsp;&nbsp;操作</th>
                     </tr>
                 </thead>
                 <tbody>
                     
                 </tbody>
             </table>
        
        
        <div id="pagination" class="pagination pagination-small pagination-right" style="display: none">
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
			
<!-- edit order start -->
<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:600px;display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="editModal_title">订单配置分配</h3>
    </div>
    <div class="modal-body">
        <form id="configForm" action="OrderConfigAllot.action" enctype="multipart/form-data" method="post" class="form-horizontal">
        <input type="text" style="display:none;" class="input-small revise" id="Review_factory_order_id" />
        <input type="text" style="display:none;" class="input-small revise" id="Review_id" />
        
        <div style="width: 550px; margin: 0 auto;" class="well">
        <table style="margin-top:-10px;margin-bottom:-10px">
			<tr height="40px">
				<td width="10px"></td>
				<td>订单编号:&nbsp;&nbsp;<input type="text" readonly = "readonly" class="input-small revise" placeholder="订单编号..." id="ConfigOrderNo" name="ConfigOrderNo"/></td>
				<td>生产工厂:&nbsp;&nbsp;<input type="text" readonly = "readonly" class="input-small revise" placeholder="生产工厂..." id="ConfigOrderfactory" /></td>
				<td>生产数量:&nbsp;&nbsp;<input type="text" readonly = "readonly" class="input-small revise" placeholder="生产数量..." id="ConfigOrderfactoryQty" /></td>
				<td>订单描述:&nbsp;&nbsp;<input type="text" readonly = "readonly" class="input-medium revise" placeholder="订单描述..." id="ConfigOrderDescriptive" /></td>
			</tr>
		</table>
		
        </div>
        <legend style="width:550px;margin:0 auto;">&nbsp;&nbsp;配置信息</legend>
        <br/>
		<table style="margin-top:-10px;margin-bottom:-10px">
			<tr height="40px">
				<td width="60px"></td>
				<td width="80px">配置编号</td>
				<td width="160px">配置简称</td>
				<td width="100px">生产序号</td>
				<td width="100px">生产数量</td>
				<td width="100px">已上线数量</td>
			</tr>
			<!-- <tr height="40px">
				<td width="40px"></td>
				<td width="100px"><input type="text" class="input-medium revise" placeholder="配置简称..." id="order_config_name_0" /></td>
				<td width="100px"><input type="text" class="input-small revise" value="0" id="config_qty_0" /></td>
				<td width="100px"><input type="text" class="input-small revise" value="0" id="config_qty_0" /></td>
				<td width="50px"><input type="text" style="width:45px" class="input-small revise" value="0" id="config_qty_0" /></td>
				<td width="50px"><input type="text" style="width:45px" class="input-small revise" value="0" id="config_qty_0" /></td>
			</tr> -->
			<tbody id="editOrderConfig_parameters" class="exp-table">
			</tbody>
		</table>	
		<br/><input type="text" style="display:none;" id="configStr" name="configStr"></input>
		<input type="text" style="display:none;" id="order_id" name="order_id">
		<input type="text" style="display:none;" id="factory_id" name="factory_id">
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <button class="btn btn-primary" id="btnConfigConfirm">确认</button>
    </div>
</div>
<!-- edit order end -->
			
		</div>
	</div>
</body>
</html>