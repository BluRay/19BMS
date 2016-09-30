<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 计划停线</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/plan/planPauseManager.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="js/jsrender.min.js"></script>
	<style type="text/css">
	.chosen-container {
    position: relative;
    display: inline-block;
    font-size: 13px;
    vertical-align: middle;
    zoom: 1;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    *display: inline;
	}
.chosen-container-multi .chosen-choices {
    position: relative;
    width: 100%;
    min-height: 30px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    overflow: hidden;
    cursor: text;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.chosen-container-multi .chosen-choices li {
    display: block;
    float: left;
    padding: 0 0px;
    margin: 5px 0 0 6px;
    list-style: none;
}
.chosen-container-multi .chosen-choices li.search-choice {
    position: relative;
    padding-right: 0px;
    cursor: default;
    -webkit-transition: all .4s cubic-bezier(.175,.885,.32,1);
    transition: all .4s cubic-bezier(.175,.885,.32,1);
}
.chosen-container-multi .chosen-choices li.search-choice .search-choice-close {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 20px;
    height: 20px;
    font-size: 15.6px;
    font-weight: 700;
    line-height: 14px;
    color: #000;
    text-align: center;
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=20);
    opacity: .2;
}
	</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">停线明细</legend>
			<div style="margin: 0 auto;">
			<form id="form" class="well form-search">
				<table style="margin-left: -10px;marginright: 0px;">
					<tr>
						<td>工厂</td>
						<td>车间</td>
						<td>线别</td>
						<td>订单</td>
						<td>停线原因</td>
						<td>停线时间</td>
						<td>恢复时间</td>
						<td></td><td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-small carType"></select></td>
						<td><select style="width:75px" name="" id="search_workshop" class="input-small carType"></select></td>
						<td><select style="width:75px" name="" id="search_line" class="input-small carType"><option value=''>请选择</option></select></td>
						<td><input style="height: 30px;width:85px" type="text" class="input-small revise" placeholder="订单..." id="search_order_no" /></td>
						<td><select style="width:75px" name="" id="search_reason_type" class="input-small carType"></select></td>
						<td><input style="width:130px" class="input-medium" placeholder="开始日期..." id="date_start" onclick="WdatePicker({el:'date_start',dateFmt:'yyyy-MM-dd HH:mm'});" type="text">
						-<input style="width:130px" class="input-medium" placeholder="截止日期..." id="date_end" onclick="WdatePicker({el:'date_end',dateFmt:'yyyy-MM-dd HH:mm'});" type="text">
						</td>
						<td><input style="width:120px" class="input-medium" placeholder="开始日期..." id="date_start2" onclick="WdatePicker({el:'date_start2',dateFmt:'yyyy-MM-dd'});" type="text">
						-<input style="width:120px" class="input-medium" placeholder="截止日期..." id="date_end2" onclick="WdatePicker({el:'date_end2',dateFmt:'yyyy-MM-dd'});" type="text">
						</td>
						<td></td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
						<input type="button" class="btn btn-success" id="btnAdd" value="新增" style="margin-left: 2px;"></input>
						<!-- <input type="button" class="btn btn-danger" id="btnDel" value="删除" style="margin-left: 2px;"></input> -->
						<input type="text" style="display:none;" class="input-small revise" id="configs"></input>
						<input type="text" style="display:none;width:350px" class="input-large revise" id="planDone_str"></input>
						</td>
						
					</tr>
				</table>
			</form>
			<div id="pagination" class="pagination pagination-small pagination-right" style="display: none">
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
			<table id="tableException" style="text-align:center;table-layout:fixed;word-wrap:break-word;word-break:break-all;white-space:normal;font-size:12px" class="table table-bordered table-striped">
				<thead>
					<tr id="0">
						<!-- <th style="text-align:center;width:45px">序号</th> -->
						<th style="text-align:center;width:65px">生产工厂</th>
						<th style="text-align:center;width:45px">车间</th>
						<th style="text-align:center;">线别</th>
						<th style="text-align:center;">生产订单</th>
						<th style="text-align:center;">停线<br>时间</th>
						<th style="text-align:center;width:65px">预计<br>恢复时间</th>
						<th style="text-align:center;width:65px">实际<br>恢复时间</th>
						<th style="text-align:center;width:65px">累计<br>停线时长</th>
						
						<!-- <th style="text-align:center;width:65px">严重等级</th> -->
						<!-- <th style="text-align:center;width:80px">异常记录点</th> -->
						<th style="text-align:center;">停线<br>原因</th>
						<th style="text-align:center;width:120px">详细<br>原因</th>
						<th style="text-align:center;">责任<br>部门</th>
						<th style="text-align:center;">损失<br>人数</th>
						<th style="text-align:center;">损失<br>工时</th>
						<th style="text-align:center;">产能<br>损失</th>
						<th style="text-align:center;width:55px">状态</th>
						<th style="text-align:center;width:60px">录入人</th>
						<th style="text-align:center;width:55px">操作</th>
					</tr>
				</thead>
				<tbody>	
				</tbody>
			</table>			
	
			</div>	
				
			</div>
			
<!-- manageModal order start display:none-->
<div class="modal" id="manageModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>编辑停线信息</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
            <!-- <div class="control-group">
                <label class="control-label" for="manageFactory">*&nbsp;车号</label>
                <div class="controls">
					<input type="text" disabled="disabled" id="manage_bus_number" class="input-medium" />
					<input type="text" style="display:none" id="manage_id" class="input-small" />
					<input type="text" style="display:none" id="is_new" value='0' class="input-small" />
					<input type="text" style="display:none" id="manage_exception_type" class="input-small" />
                </div>
            </div> -->
            <input type="text" style="display:none" id="manage_id" class="input-small" />
			<input type="text" style="display:none" id="is_new" value='0' class="input-small" />
			<input type="text" style="display:none" id="manage_exception_type" class="input-small" />
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;订单范围</label>
                <div class="controls">
					<input id="manage_order" readonly type="text"/>
                </div>
            </div> 
            <div class="control-group">
                <label class="control-label" for="editLine">*&nbsp;车辆类型</label>
                <div class="controls">
					<select name="" id="manage_bus_type" class="input-small busType">
                    </select>
                    <script id="tmplBusTypeSelect" type="text/x-jsrander">
                    	<option value='{{:id}}'>{{:bus_type_code}}</option>
                    </script>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;停线原因：
                    <select name="" id="manage_reason_type" class="input-small carType"></select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;责任部门</label>
                <div class="controls">
                    <select name="" id="manage_department" class="input-small carType"></select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;浪费人数：
                    <input style="height: 30px;" id="manage_waste_num" type="text" class="input-small revise" placeholder="浪费人数..." />
                </div>
            </div>
            
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;处理方案</label>
                <div class="controls">
					<input style="height: 30px;width:280px" type="text" class="input-large revise" placeholder="处理方案..." id="manage_solution" />
                </div>
            </div>
            <div class="control-group" id="newPause_date">
                <label class="control-label" for="">*&nbsp;停线时间</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="开始时间..." id="manage_date_start" onClick="WdatePicker({el:'manage_date_start',dateFmt:'yyyy-MM-dd HH:mm'});"/> - 
                	<input type="text" class="input-medium" placeholder="实际结束时间..." id="manage_date_end" onClick="WdatePicker({el:'manage_date_end',dateFmt:'yyyy-MM-dd HH:mm'});"/>
               		<input type="text" style="display:none" id="manage_pfinish_time" class="input-small" />
                </div>
            </div>
          <!--   <div class="control-group">
                <label class="control-label" for="">*&nbsp;处理时间</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="处理日期..." id="manage_close_date" onClick="WdatePicker({el:'manage_close_date',dateFmt:'yyyy-MM-dd HH:mm'});"/>
                </div>
            </div> -->
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;停线时长</label>
                <div class="controls">
                    <input type="text" class="input-medium"  id="manage_pause_time" />H
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;损失产能</label>
                <div class="controls">
                    <input type="text" class="input-medium"  id="capacityLoss" />台
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;详细原因</label>
                <div class="controls">
					<input style="height: 30px;width:315px" type="text" class="input-large revise" placeholder="详细原因..." id="manage_detailed_reasons" />
                </div>
            </div>   
            <div class="control-group" id="div_memo">
                <label class="control-label" for="newOrderCode">&nbsp;备注</label>
                <div class="controls">
					<input style="height: 30px;width:315px" type="text" class="input-large revise" placeholder="备注..." id="manage_memo" />
                </div>
            </div>  
            <div class="control-group" id="div_mail_id">
                <label class="control-label" for="newOrderCode">*&nbsp;邮件通知</label>
                <div class="controls">
					<input style="height: 30px;" class="input-medium revise" id="manage_email_id" type="checkbox">
                </div>
            </div>
            <div class="control-group" id="div_email_send">
                <label class="control-label" for="newOrderCode">&nbsp;收件人</label>
                <div class="controls">
					<textarea style="width:315px" class="input-xlarge" id="manage_email_send" rows="2" placeholder="多个邮箱地址请用分号分隔"></textarea>				
                </div>
            </div>
            <div class="control-group" id="div_email_send">
                <label class="control-label" for="newOrderCode">&nbsp;CC</label>
                <div class="controls">
					<textarea style="width:315px" class="input-xlarge" id="manage_email_cc" rows="2" placeholder="多个邮箱地址请用分号分隔"></textarea>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btnManageConfirm">确认</button>
    </div>
</div>
<!-- manageModal order End -->				
<!-- newPauseModal order start -->
<div class="modal" id="newPauseModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>新增停线</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="newPauseFactory">*&nbsp;生产工厂</label>
                <div class="controls">
                    <select name="" id="newPause_factory" class="input-medium carType">
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newPauseWorkshop">*&nbsp;生产车间</label>
                <div class="controls">
                    <select name="" id="newPause_workshop" class="input-medium carType">
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editLine">*&nbsp;生产线别</label>
                <div id="line_check" class="controls">
                    <select name="" id="newPause_line" class="input-medium carType">
					</select>
                </div>
                <input style="height: 30px;display:none" id="line_str" type="text" class="input-small revise"/>
            </div>
            <div class="control-group">
                <label class="control-label" for="editLine">*&nbsp;车型</label>
                <div class="controls">
					<select name="" id="newPause_bus_type" class="input-small busType">
                    </select>
                    <script id="tmplBusTypeSelect" type="text/x-jsrander">
                    	<option value='{{:id}}'>{{:bus_type_code}}</option>
                    </script>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;停线原因：
                    <select name="" id="newPause_reason_type" class="input-small carType"></select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;责任部门</label>
                <div class="controls">
                    <select name="" id="newPause_department" class="input-small carType"></select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;浪费人数：
                    <input style="height: 30px;" id="new_pause_waste_num" type="text" class="input-small revise" placeholder="浪费人数..." />
                </div>
            </div>
            
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;停线时间</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="开始时间..." id="newPause_date_start" onClick="WdatePicker({el:'newPause_date_start',dateFmt:'yyyy-MM-dd HH:mm'});"/> - 
                	<input type="text" class="input-medium" placeholder="预计结束时间..." id="newPause_pfinish_time" onClick="WdatePicker({el:'newPause_pfinish_time',dateFmt:'yyyy-MM-dd HH:mm'});"/>
                </div>
            </div>
             <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;订单范围</label>
                
                <div class="controls">
                	<div id="order_area" style="width: 315px;" class="chosen-container chosen-container-multi">
					<ul class="chosen-choices">					
					<!-- <li class="search-field" style="margin:0px">
					<input tabindex="2" id="order_no_list" class="default" style="width: 150px; height: 30px; border: 0px none;" type="text" ></li> -->
					</ul>
                	</div>
                	<input tabindex="2" id="order_no_list" class="input-large revise" style="width:315px; height: 30px;display:none" type="text" >
                </div>               
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;预计停线时长</label>
                <div class="controls">
                    <input type="text" class="input-medium"  id="new_ppause_time" />H
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;详细原因</label>
                <div class="controls">
					<input style="height: 30px;width:315px" type="text" class="input-large revise" placeholder="详细原因..." id="new_pause_detailed_reasons" />
                </div>
            </div>   
            <div class="control-group">
                <label class="control-label" for="newOrderCode">&nbsp;备注</label>
                <div class="controls">
					<input style="height: 30px;width:315px" type="text" class="input-large revise" placeholder="备注..." id="new_pause_memo" />
                </div>
            </div>  
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;邮件通知</label>
                <div class="controls">
					<input style="height: 30px;" class="input-medium revise" id="new_pause_email_id" type="checkbox">
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">&nbsp;收件人</label>
                <div class="controls">
					<textarea style="width:315px" class="input-xlarge" id="new_pause_email_send" rows="2" placeholder="多个邮箱地址请用分号分隔"></textarea>			
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">&nbsp;CC</label>
                <div class="controls">
					<textarea style="width:315px" class="input-xlarge" id="new_pause_email_cc" rows="2" placeholder="多个邮箱地址请用分号分隔"></textarea>			
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btnNewPauseConfirm">确认</button>
    </div>
</div>
<!-- newPauseModal order End -->				
		</div>
		<input type="hidden" id="userName" value="<%=session.getAttribute("display_name") %>"/>
	</div>
</body>
</html>