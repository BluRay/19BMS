<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 车身颜色</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/production/productionBodyColor.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">车身颜色</legend>
			
			<div style="margin: 0 auto;">
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<td>订单编号</td>
						<td>车型</td>
						<td>车号</td><td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-medium carType"></select></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
						<td><select name="" id="search_bus_type" class="input-medium carType"></select></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="车号..." id="search_bus_number" /></td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
						<input type="button" class="btn btn-info" id="btnAdd" value="新增" style="margin-left: 2px;"></input>
						<!-- <input type="button" class="btn btn-danger" id="btnDel" value="删除" style="margin-left: 2px;"></input> -->
						<input type="text" style="display:none;" class="input-small revise" id="configs"></input>
						<input type="text" style="display:none;width:350px" class="input-large revise" id="planDone_str"></input>
						</td>
						
					</tr>
				</table>
			</form>
			<table id="tableBusColor" style="text-align:center;table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
				<thead>
					<tr id="0">
						<th style="text-align:center;">序号</th>
						<th style="text-align:center;">工厂</th>
						<th style="text-align:center;">生产订单</th>
						<th style="text-align:center;">车型</th>
						<th style="text-align:center;">车号</th>
						<th style="text-align:center;">颜色</th>
						<th style="text-align:center;">操作</th>
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
			
<!-- new order start -->
<div class="modal" id="newModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>新增车身颜色</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="newFactory">*&nbsp;生产工厂</label>
                <div class="controls">
                    <select name="" id="new_factory" class="input-medium carType">
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;订单编号</label>
                <div class="controls">
                    <input type="text" id="new_order_no" placeholder="订单编号..." class="input-medium" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;全部</label>
                <div class="controls">
					<input style="height: 30px;" type="checkbox" class="input-medium revise"  id="new_all_bus" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;车号</label>
                <div class="controls">
					<textarea style="width: 180px;" class="input-xlarge" onkeyup="this.value = this.value.slice(0, 1000)" id="new_bus_number" rows="3"></textarea>
					每行一个车号
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;颜色</label>
                <div class="controls">
					<input style="height: 30px;" type="text" class="input-medium revise" placeholder="颜色..." id="new_bus_color" />
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btnAddConfirm">确认</button>
    </div>
</div>
<!-- new order End -->		

<!-- Edit order start -->
<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>编辑车身颜色</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
           <div class="control-group">
                <label class="control-label" for="editFactory">*&nbsp;生产工厂</label>
                <div class="controls">
                    <select name="" disabled="disabled" id="edit_factory" class="input-medium carType">
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;订单编号</label>
                <div class="controls">
                    <input type="text" disabled="disabled" id="edit_order_no" placeholder="订单编号..." class="input-medium" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;车号</label>
                <div class="controls">
					<input style="height: 30px;" disabled="disabled" type="text" class="input-medium revise" placeholder="车号..." id="edit_bus_number" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;颜色</label>
                <div class="controls">
					<input style="height: 30px;" type="text" class="input-medium revise" placeholder="颜色..." id="edit_bus_color" />
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btnEditConfirm">确认</button>
    </div>
</div>
<!-- Edit order End -->
	
		</div>
	</div>
</body>
</html>