<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 订单维护</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="js/jquery-ui-timepicker-addon.zh-CN.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/json2.js"></script>
<script type="text/javascript" src="js/techtrans/techTaskMaterialCheck.js"></script>
<script type="text/javascript" src="js/jsrender.min.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>

</head>
<body >
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_techtask_left.jsp"%>
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<div>
				<legend style="margin: 0 auto;">订单维护</legend>
				<div style="margin: 0 auto;">
				<div class="control-group" style="padding-top:10px;padding-bottom:2px">
				<table>
					<tr>
						<td width="90px" style="text-align: right">技改单编号：</td>
						<td width="160px"><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入技改单编号..." id="tech_order_no"></td>
						<td width="80px" style="text-align: right">任务内容：</td>
						<td width="160px"><input type="text" style="height: 30px;" class="input-medium revise" placeholder="请输入任务内容..." id="task_content"></td>
						<td width="60px" style="text-align: right">状态：</td>
						<td width="160px">
							<select class="input-medium carType" id="status" style="width: 80px">
								<option value="">全部</option>
								<option value="已创建">已创建</option>
								<option value="已分配">已分配</option>
								<option value="已评估">已评估</option>
								<option value="已完成">已完成</option>
							</select>
						</td>
						<td width="50px"></td>
						<td></td>
					</tr>
					<tr>
						<td width="90px" style="text-align: right">技改单日期：</td>
						<td colspan=3 width="160px">
							<input name="tech_date_start" id="tech_date_start" class="Wdate" style="height: 30px; background-color: white; width: 120px" onfocus="javascript:WdatePicker()" type="text"> 至 <input name="tech_date_end" id="tech_date_end" class="Wdate" onfocus="javascript:WdatePicker()" style="height: 30px; background-color: white; width: 120px" type="text">
						</td>
						
						<td width="60px" style="text-align: right"></td>
						<td colspan=2>
							<input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px; margin-top: -10px;"></input>
						</td>
						<td>
						</td>
					</tr>
				</table>
			</div>
			<table id="tableTaskFollow" class="table table-bordered table-striped" style="font-size: 12px;">
			<thead>
				<tr>
					<th width="250px">技改任务</th>
					<th style="padding-left:1px;padding-right:1px;">变更单类型</th>
					<th style="padding-left:1px;padding-right:1px;">技改单号</th>
					<th style="padding-left:1px;padding-right:1px;">变更单附件</th>
					<th style="padding-left:1px;padding-right:1px;">技改单日期</th>
					<th style="padding-left:1px;padding-right:1px;">责任单位</th>
					<th style="padding-left:1px;padding-right:1px;">重大变更</th>
					<th style="padding-left:1px;padding-right:1px;">顾客变更</th>
					<th style="padding-left:1px;padding-right:1px;">顾客变更单附件</th>
					<th style="padding-left:1px;padding-right:1px;">重复变更</th>
					<th style="padding-left:1px;padding-right:1px;">技改类型</th>
					<th style="padding-left:1px;padding-right:1px;">操作</th>
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
		</div>
		
<!-- new order start -->
<div class="modal" id="newModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;min-width:600px">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>新增订单</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="newOrderName">*&nbsp;订单名称</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="订单名称..." id="order_name"/> *城市名称（如：长沙）
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;订单简码</label>
                <div class="controls">
                   <input type="text" class="input-medium" onkeyup="value=value.replace(/[^A-Z]/g,'')" placeholder="订单简码..." id="order_code"/>*简码格式为大写英文
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;订单类型</label>
                <div class="controls">
                    <select name="" id="orderType" class="input-small"></select>                             
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;车型</label>
                <div class="controls">
                    <select name="" id="busType" class="input-small busType">
                                </select>
                                <script id="tmplBusTypeSelect" type="text/x-jsrander">
                                    <option value='{{:id}}'>{{:bus_type_code}}</option>
                                </script>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="order_qty">*&nbsp;订单数量</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="订单数量..." id="order_qty"/>
                </div>
            </div>
            <!-- <div class="control-group">
                <label class="control-label" for="">&nbsp;订单描述</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="订单描述..." id="order_descriptive"/>
                </div>
            </div> -->
            <div class="control-group">
                <label class="control-label" for="productive_year">*&nbsp;生产年份</label>
                <div class="controls">
                    <select name="" id="productive_year" class="input-small">
                    </select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">&nbsp;颜色</label>
                <div class="controls">
                    <input type="text" class="input-small" placeholder="请输入颜色..." id="color"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">座位数</label>
                <div class="controls">
                    <input type="text" class="input-small" placeholder="请输入座位数..." id="seats" onpaste="return false;" onkeyup="value=value.replace(/[^\d]/g,'')"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;订单交期</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="选择订单交期..." id="delivery_date" onClick="WdatePicker({el:'delivery_date',dateFmt:'yyyy-MM-dd'});"/>
                </div>
            </div>

            <div class="control-group">
                <label class="control-label" for="">产地分配</label>
                <div class="controls">
                <!-- <input type="text" class="input-medium" placeholder="选择订单交期..." id="bmsFactoryOrder" /> -->
                    <table style="margin-left:-25px" class="exp-table table">
			          <thead>
			            <tr>
			              <th ><i id="addFactoryOrder" class="fa fa-plus" style="cursor: pointer; padding-top: 25px; color: blue;"></th>
			              <th class="col-sm-5">生产工厂</th>
			              <th class="col-sm-7">数量</th>
			              <th class="col-sm-7">起始号</th>
			              <th class="col-sm-7">结束号</th>
			            </tr>
			          </thead>
			          <tbody id="factoryOrder_parameters" class="exp-table">
			          </tbody>
			        </table>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="memo">备注</label>
                <div class="controls">
                    <textarea class="input-xlarge" style="width:355px" id="memo" rows="2"></textarea>
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
<!-- new order end -->
<!-- edit order start -->
<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;min-width:600px">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>编辑订单</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
        	<div class="control-group">
                <label class="control-label" for="editOrderID">*&nbsp;订单编号</label>
                <div class="controls">
                    <input type="text" disabled="disabled" style="display:none" class="input-medium" placeholder="订单编号..." id="editOrderID"/>
                    <input type="text" disabled="disabled" class="input-medium" placeholder="订单编号..." id="editOrderNo"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editOrderName">*&nbsp;订单名称</label>
                <div class="controls">
                    <input type="text" disabled="disabled" class="input-medium" placeholder="订单名称..." id="editOrderName"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editOrderCode">*&nbsp;订单简码</label>
                <div class="controls">
                   <input type="text" disabled="disabled" class="input-medium" placeholder="订单简码..." id="editOrderCode"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editOrderCode">*&nbsp;订单类型</label>
                <div class="controls">
                   <input type="text" disabled="disabled" class="input-medium" placeholder="订单类型..." id="editOrderType"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;车型</label>
                <div class="controls">
                    <select name="" disabled="disabled" id="editBusType" class="input-small busType">
                                </select>
                                <script id="tmplBusTypeSelect" type="text/x-jsrander">
                                    <option value='{{:id}}'>{{:bus_type_code}}</option>
                                </script>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="edit_order_qty">*&nbsp;订单数量</label>
                <div class="controls">
                    <input type="text" disabled="disabled" class="input-medium" placeholder="订单数量..." id="edit_order_qty"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">&nbsp;订单描述</label>
                <div class="controls">
                    <input type="text" disabled="disabled" class="input-medium" placeholder="订单描述..." id="edit_order_descriptive"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="edit_productive_year">*&nbsp;生产年份</label>
                <div class="controls">
                    <select name="" disabled="disabled" id="edit_productive_year" class="input-small">
                    </select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="edit_color">&nbsp;颜色</label>
                <div class="controls">
                    <input type="text" class="input-small" placeholder="请输入颜色..." id="edit_color"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="edit_seats">座位数</label>
                <div class="controls">
                    <input type="text" class="input-small" placeholder="请输入座位数..." id="edit_seats"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="edit_delivery_date">*&nbsp;订单交期</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="选择订单交期..." id="edit_delivery_date" onClick="WdatePicker({el:'edit_delivery_date',dateFmt:'yyyy-MM-dd'});"/>
                </div>
            </div>

            <div class="control-group">
                <label class="control-label" for="">产地分配</label>
                <div class="controls">
                <!-- <input type="text" class="input-medium" placeholder="选择订单交期..." id="bmsFactoryOrder" /> -->
                    <table style="margin-left:-20px" class="exp-table table">
			          <thead>
			            <tr>
			              <th ><i id="editFactoryOrder" class="fa fa-plus" style="cursor: pointer; padding-top: 25px; color: blue;"></i>
			              <%-- <button style="height:24px" class="btn btn-success btn-xs" id="editFactoryOrder"><span class="glyphicon glyphicon-plus">+</span></button> --%></th>
			              <th class="col-sm-5">生产工厂</th>
			              <th class="col-sm-7">数量</th>
			              <th class="col-sm-7">开始</th>
			              <th class="col-sm-7">结束</th>
			              <!-- <th></th><th></th> -->
			            </tr>
			          </thead>
			          <tbody id="edit_factoryOrder_parameters" class="exp-table">
			          </tbody>
			        </table>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="edit_memo">备注</label>
                <div class="controls">
                    <textarea class="input-xlarge" style="width:355px" id="edit_memo" rows="2"></textarea>
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
<!-- edit order end -->

<!-- busNumber start -->
<div class="modal" id="busNumberModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>订单车号</h3>
    </div>
    <div class="modal-body">
    	<table id="tableBusNumber" style="table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
			<thead>
                <tr>
                	<th style="text-align:center;" width="60px">序号</th>
                	<th style="text-align:center;">车号</th>
                    <th style="text-align:center;">生产工厂</th>
                    <th style="text-align:center;">当前工序</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    
    </div>    
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btnEditConfirm">确认</button>
    </div>
</div>
<!-- busNumber end -->
		
	</div>
</div>
</body>
</html>