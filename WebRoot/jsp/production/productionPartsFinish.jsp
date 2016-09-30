<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 部件上下线</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/production/productionPartsFinish.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">部件上下线</legend>
			
			<div style="margin: 0 auto;">
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<td>订单编号</td>
						<td>生产部件</td>
						<td>生产日期</td><td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-medium carType">
						</select></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="订单编号..." id="search_order_no" /></td>
						<td><input style="height: 30px;" type="text" class="input-medium revise" placeholder="生产部件..." id="search_parts" /></td>
						<td><input class="input-small" placeholder="开始日期..." id="date_start" onclick="WdatePicker({el:'date_start',dateFmt:'yyyyMMdd'});" type="text">
						- <input class="input-small" placeholder="截止日期..." id="date_end" onclick="WdatePicker({el:'date_end',dateFmt:'yyyyMMdd'});" type="text">
						</td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
						<input type="button" class="btn btn-info" id="btnAdd" value="新增" style="margin-left: 2px;"></input>
						<!-- <input type="button" class="btn btn-danger" id="btnDel" value="删除" style="margin-left: 2px;"></input> -->
						<input type="text" style="display:none;" class="input-small revise" id="configs"></input>
						<input type="text" style="display:none;width:350px" class="input-large revise" id="planDone_str"></input>
						</td>
						
					</tr>
				</table>
			</form>
			<table id="tableWorkshopSupply" style="text-align:center;table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
				<thead>
					<tr id="0">
						<th style="text-align:center;width:60px">序号</th>
						<th style="text-align:center;width:80px">工厂</th>
						<th style="text-align:center;">生产订单</th>
						<th style="text-align:center;width:140px">部件</th>
						<th style="text-align:center;width:80px">日期</th>
						<th style="text-align:center;width:75px">上线计划</th>
						<th style="text-align:center;width:75px">上线数量</th>
						<th style="text-align:center;width:75px">上线累计</th>
						<th style="text-align:center;width:75px">下线计划</th>
						<th style="text-align:center;width:75px">下线数量</th>
						<th style="text-align:center;width:75px">下线累计</th>
						<th style="text-align:center;width:60px">操作</th>
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
<div class="modal" id="newModal" tabindex="-1" role="dialog" aria-hidden="true" style="min-width: 600px;display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>新增部件上下线记录</h3>
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
                <label class="control-label" for="newOrderCode">*&nbsp;生产部件</label>
                <div class="controls">
					<input style="height: 30px;" type="text" class="input-medium revise" placeholder="生产部件..." id="new_parts" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;生产日期</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="生产日期..." id="new_date" onClick="WdatePicker({el:'new_date',dateFmt:'yyyyMMdd'});"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;上线数</label>
                <div class="controls">
					<input style="height: 30px;" type="text" class="input-medium revise" placeholder="上线数..." id="new_online_real_qty" />
               		 <span class="prodinfo" style="text-color:green;display:none"></span>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;下线数</label>
                <div class="controls">
					<input style="height: 30px;" type="text" class="input-medium revise" placeholder="上线数..." id="new_offline_real_qty" />
                	<span class="prodinfo" style="text-color:green;display:none"></span>
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
<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="min-width: 600px;display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>编辑部件上下线记录</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="editFactory">*&nbsp;生产工厂</label>
                <div class="controls">
                    <select name="" id="edit_factory" class="input-medium carType">
					</select>
					<input type="text" style="display:none" id="edit_id" class="input-medium" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;订单编号</label>
                <div class="controls">
                    <input type="text" id="edit_order_no" placeholder="订单编号..." class="input-medium" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;生产部件</label>
                <div class="controls">
					<input style="height: 30px;" type="text" class="input-medium revise" placeholder="生产部件..." id="edit_parts" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;生产日期</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="生产日期..." id="edit_date" onClick="WdatePicker({el:'edit_date',dateFmt:'yyyyMMdd'});"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;上线数</label>
                <div class="controls">
					<input style="height: 30px;" type="text" class="input-medium revise" placeholder="上线数..." id="edit_online_real_qty" />
               		 <span class="prodinfo" style="text-color:green;display:none"></span>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;下线数</label>
                <div class="controls">
					<input style="height: 30px;" type="text" class="input-medium revise" placeholder="上线数..." id="edit_offline_real_qty" />
               		 <span class="prodinfo" style="text-color:green;display:none"></span>
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