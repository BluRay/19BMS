<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 异常信息处理</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/exportTable2Excel.js"></script>
	<script type="text/javascript" src="js/plan/planExceptionManager.js"></script>
	<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="js/jsrender.min.js"></script>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_plan_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">异常信息处理</legend>
			
			<div style="margin: 0 auto;">
			<form id="form" class="well form-search">
				<table>
					<tr>
						<td>生产工厂</td>
						<td>生产车间</td>
						<td>线别</td>
						<td>车号</td>
						<td>严重等级</td>
						<td>措施</td>
						<td>状态</td>
						<td>异常日期</td><td></td>
					</tr>
					<tr>
						<td><select name="" id="search_factory" class="input-small carType"></select></td>
						<td><select name="" id="search_workshop" style="width:75px" class="input-small carType"></select></td>
						<td><select name="" id="search_line" style="width:75px" class="input-small carType"><option value=''>全部</option></select></td>
						<td><input style="height: 30px;width:145px" type="text" class="input-medium revise" placeholder="车号..." id="search_busnumber" /></td>
						<td><select name="" id="search_severity_level" class="input-small carType"></select></td>
						<td><select name="" id="search_measures" style="width:75px" class="input-small carType"></select></td>
						<td><select name="" id="search_status" style="width:75px" class="input-small carType"></select></td>
						<td><input class="input-small" placeholder="开始日期..." id="date_start" onclick="WdatePicker({el:'date_start',dateFmt:'yyyy-MM-dd'});" type="text">
						- <input class="input-small" placeholder="截止日期..." id="date_end" onclick="WdatePicker({el:'date_end',dateFmt:'yyyy-MM-dd'});" type="text">
						</td>
						<td><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 1px;"></input>
						<!-- <input type="button" class="btn btn-danger" id="btnAddException" value="新增异常" style="margin-left: 1px;"></input> -->
						<!-- <input type="button" class="btn btn-info" id="btnAddPause" value="新增停线" style="margin-left: 1px;"></input> -->
						<!-- <input type="button" class="btn btn-danger" id="btnDel" value="删除" style="margin-left: 2px;"></input> -->
						<input type="text" style="display:none;" class="input-small revise" id="configs"></input>
						<input type="text" style="display:none;width:350px" class="input-large revise" id="planDone_str"></input>
						</td>
						
					</tr>
				</table>
			</form>
			<div id="pagination" class="pagination pagination-small pagination-right" style="display: none">
				<ul>
					<li id="export"><a href="#">导出总共<span total="" id="total"></span>条记录
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
			<table id="tableException" style="text-align:center;table-layout:fixed;font-size:12px" class="table table-bordered table-striped">
				<thead>
					<tr id="0">
						<!-- <th width="42px" style="text-align:center;">序号</th> -->
						<th width="65px" style="text-align:center;">生产工厂</th>
						<th width="65px" style="text-align:center;">生产车间</th>						
						<th width="65px" style="text-align:center;">当前工序</th>
						<th width="120px" style="text-align:center;" width="140px">车号</th>
						<th width="65px" style="text-align:center;">严重等级</th>
						<th width="55px" style="text-align:center;">记录点</th>
						<th width="85px" style="text-align:center;">异常原因</th>
					 	<th width="150px" style="text-align:center;">详细原因</th>
						<th width="65px" style="text-align:center;">处理措施</th>
						<th width="65px" style="text-align:center;">责任部门</th>
						<th width="65px" style="text-align:center;">登记人</th>
						<th width="75px" style="text-align:center;">开始时间</th>
						<th width="75px" style="text-align:center;">处理时间</th>
						<th style="text-align:center;">状态</th>
						<th style="text-align:center;">操作</th>
					</tr>
				</thead>
				<tbody>	
				</tbody>
			</table>			
		<table id="tableExceptionAll" style="text-align:center;table-layout:fixed;font-size:12px;display:none" class="table table-bordered table-striped">
				<thead>
					<tr id="0">
						<th width="65px" style="text-align:center;">生产工厂</th>
						<th width="65px" style="text-align:center;">生产车间</th>						
						<th width="65px" style="text-align:center;">当前工序</th>
						<th width="120px" style="text-align:center;" width="140px">车号</th>
						<th width="65px" style="text-align:center;">严重等级</th>
						<th width="55px" style="text-align:center;">记录点</th>
						<th width="85px" style="text-align:center;">异常原因</th>
					 	<th width="150px" style="text-align:center;">详细原因</th>
						<th width="65px" style="text-align:center;">处理措施</th>
						<th width="65px" style="text-align:center;">责任部门</th>
						<th width="65px" style="text-align:center;">登记人</th>
						<th width="75px" style="text-align:center;">开始时间</th>
						<th width="75px" style="text-align:center;">处理时间</th>
						<th style="text-align:center;">状态</th>
					</tr>
				</thead>
				<tbody>	
				</tbody>
			</table>
			</div>
			</div>
<!-- newExcepModal order start -->
<div class="modal" id="newExcepModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>新增异常</h3>
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
                <label class="control-label" for="newWorkshop">*&nbsp;生产车间</label>
                <div class="controls">
                    <select name="" id="new_workshop" class="input-medium carType">
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editLine">*&nbsp;生产线别</label>
                <div class="controls">
                    <select name="" id="new_line" class="input-medium carType">
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newprocess">*&nbsp;工序</label>
                <div class="controls">
                    <select name="" id="new_process" class="input-medium carType">
					</select>
					<input style="height: 30px;" disabled="disabled" type="text" class="input-medium revise" id="new_processname" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newBusNumber">*&nbsp;车号</label>
                <div class="controls">
					<input style="height: 30px;" type="text" class="input-medium revise" id="new_bus_number" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;异常原因</label>
                <div class="controls">
                    <select name="" id="new_reason_type" class="input-medium carType"></select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;详细原因</label>
                <div class="controls">
					<input style="height: 30px;width:280px" type="text" class="input-large revise" placeholder="详细原因..." id="new_detailed_reasons" />
                </div>
            </div>           
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;严重等级</label>
                <div class="controls">
                    <select name="" id="new_severity_level" class="input-medium carType"></select>
                </div>
            </div>        
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;责任部门</label>
                <div class="controls">
                    <select name="" id="new_department" class="input-medium carType"></select>
                </div>
            </div>      
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;处理措施</label>
                <div class="controls">
                    <select name="" id="new_measures" class="input-medium carType"></select>
                </div>
            </div>           
            
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
        <button class="btn btn-primary" id="btnNewExcepConfirm">确认</button>
    </div>
</div>
<!-- newExcepModal order End -->
	
			
<!-- manageModal order start display:none-->
<div class="modal" id="manageModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>异常处理</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="manageFactory">*&nbsp;车号</label>
                <div class="controls">
					<input type="text" disabled="disabled" id="manage_bus_number" class="input-medium" />
					<input type="text" style="display:none" id="manage_id" class="input-small" />
					<input type="text" style="display:none" id="is_new" value='0' class="input-small" />
					<input type="text" style="display:none" id="manage_exception_type" class="input-small" />
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
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;异常原因：
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
                	<input type="text" class="input-medium" placeholder="预计线束时间..." id="manage_pfinish_time" onClick="WdatePicker({el:'manage_pfinish_time',dateFmt:'yyyy-MM-dd HH:mm'});"/>
                <input type="text" style="display:none" id="manage_date_end" class="input-small" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;处理时间</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="生产日期..." id="manage_close_date" onClick="WdatePicker({el:'manage_close_date',dateFmt:'yyyy-MM-dd HH:mm'});"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;详细原因</label>
                <div class="controls">
					<input style="height: 30px;width:315px" type="text" class="input-large revise" placeholder="详细原因..." id="manage_detailed_reasons" />
                </div>
            </div>   
            <div class="control-group" id="div_memo">
                <label class="control-label" for="newOrderCode">*&nbsp;备注</label>
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
                <label class="control-label" for="newOrderCode">&nbsp;邮箱地址</label>
                <div class="controls">
					<textarea style="width:315px" class="input-xlarge" id="manage_email_send" rows="2"></textarea>
					多个邮箱地址请用分号分隔
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

<!-- Edit order start -->
<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>编辑异常信息</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="editFactory">*&nbsp;生产工厂</label>
                <div class="controls">
                    <select name="" id="edit_factory" class="input-medium carType">
					</select>
					<input type="text" style="display:none" id="edit_id" class="input-small" />
					<input type="text" style="display:none" id="edit_solution" class="input-small" />
					<input type="text" style="display:none" id="edit_close_date" class="input-small" />
					<input type="text" style="display:none" id="edit_exception_type" value='0' class="input-small" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editFactory">*&nbsp;生产车间</label>
                <div class="controls">
                    <select name="" id="edit_workshop" class="input-medium carType">
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editFactory">*&nbsp;生产线别</label>
                <div class="controls">
                    <select name="" id="edit_line" class="input-medium carType">
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;车号</label>
                <div class="controls">
					<input style="height: 30px;" disabled="disabled" type="text" class="input-medium revise" id="edit_bus_number" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="editprocess">*&nbsp;工序</label>
                <div class="controls">
                    <select name="" id="edit_process" class="input-medium carType">
					</select>
					<input style="height: 30px;" disabled="disabled" type="text" class="input-medium revise" id="edit_processname" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;异常原因</label>
                <div class="controls">
                    <select name="" id="edit_reason_type" class="input-medium carType"></select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;详细原因</label>
                <div class="controls">
					<input style="height: 30px;width:280px" type="text" class="input-large revise" placeholder="详细原因..." id="edit_detailed_reasons" />
                </div>
            </div>           
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;严重等级</label>
                <div class="controls">
                    <select name="" id="edit_severity_level" class="input-medium carType"></select>
                </div>
            </div>        
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;责任部门</label>
                <div class="controls">
                    <select name="" id="edit_department" class="input-medium carType"></select>
                </div>
            </div>      
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;处理措施</label>
                <div class="controls">
                    <select name="" id="edit_measures" class="input-medium carType"></select>
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