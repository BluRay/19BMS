<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户管理</title>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<link href="css/bootstrap-multiselect.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/bootstrap-multiselect.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/account/accountManage.js"></script>
<style>
	.accordion td{
		text-align:left;
	}
	#authModal input[type="text"]{
		padding: 0px 0px;
		margin-bottom: 0px;
	}
</style>
</head>
<body>
	<%@ include file="/jsp/common/head.jsp"%>
	<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2">
			<legend style="font-size:17px">个人中心</legend>
			<form class="well form-horizontal">
				<table class='table table-condense' style="margin-bottom: 0;">
					<thead>
						<tr>
							<th style="width: 80px">账号</th>
							<th style="width: 80px">用户名</th>
							<th style="width: 180px">邮箱</th>
							<th style="width: 120px">手机</th>
							<th style="width: 120px">座机</th>
							<th style="width: 120px">工厂</th>
							<th style="width: 120px">部门</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr id="userInfoTr">
							<td id="userId"><s:property value="user.card_number" /></td>
							<td id="userName"><s:property value="user.display_name" /></td>
							<td id="userEmail"><s:property value="user.email" /></td>
							<td id="userCell"><s:property value="user.cellphone" /></td>
							<td id="userTel"><s:property value="user.telephone" /></td>
							<td id="userFactory"><s:property value="user.factory" /></td>
							<td id="userDepartment"><s:property value="user.department" /></td>
							<td>
								<div class="btn-group">
									<a class='btn btn-small' href="#emailModal" id="modifySelf"
										data-toggle="modal">个人信息</a> <a
										class='btn btn-primary btn-small' href="#passwordModal"
										data-toggle="modal">修改密码</a>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
			<s:if test="user.admin==1">
				<div id='adminThing'>
					<legend style="font-size:17px">账号管理</legend>
					<form class="well form-horizontal">
						<table>
							<tr>
								<td><label>账号</label></td>
								<td><label>用户名</label></td>
								<td><label>邮箱</label></td>
								<td><label>工厂</label></td>
								<td><label>部门</label></td>
								<td></td>
							</tr>
							<tr>
								<td><input style="height: 20px;" id="queryCardNumber" type="text"
									class="input-medium revise" placeholder="账号"></td>
								<td><input style="height: 20px;" id="queryUsername" type="text"
									class="input-medium revise" placeholder="姓名"></td>
								<td><input style="height: 20px;" id="queryEmail" type="text"
									class="input-medium revise" placeholder="邮箱"> <%-- <select class="multiselect" multiple="multiple">
										<option value="0">Cheese</option>
										<option value="1">Tomatoes</option>
										<option value="mozarella">Mozzarella</option>
										<option value="mushrooms">Mushrooms</option>
										<option value="pepperoni">Pepperoni</option>
										<option value="onions">Onions</option>
								</select> --%></td>
								<td><select id="queryFactory" name="account.factory_id" class="input-medium revise">
										<option value="">请选择</option>
									</select></td>
								<td><select id="queryDepart" name="account.department_id" class="input-medium revise">
										<option value="">请选择</option>
								</select></td>
									
								<td><input type="button" class="btn btn-primary"
									id="btnQuery" value="查询" style="margin-left: 2px"></input> <a
									href="#newModal" role="button" class="btn btn-success"
									data-toggle="modal">新增</a></td>
							</tr>
						</table>
					</form>
					
					<table id="resultTable" class="table table-hover table-condensed">
						<thead>
							<tr>
								<th style="width: 80px; padding-left: 30px">账号</th>
								<th style="width: 80px">用户名</th>
								<th style="width: 180px">邮箱</th>
								<th style="width: 120px">手机</th>
								<th style="width: 120px">座机</th>
								<th style="width: 120px">工厂</th>
								<th style="width: 120px">部门</th>
								<th>管理</th>
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
			</s:if>
		</div>
		<!-- END MAIN -->
	</div>
	
	<div class="modal" id="emailModal" tabindex="-1" role="dialog"
		aria-hidden="true" style="display: none;">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">×</button>
			<h3>修改个人信息</h3>
		</div>
		<div class="modal-body">
			<form class="form-horizontal" action="account!updateUserInfo.action"
				method="post" id="selfModifyForm">
				<div class="control-group">
					<label class="control-label" for="inputEmail"> 邮箱</label>
					<div class="controls">
						<input type="text" id="inputEmailChange"
							value="<s:property value='user.email' />" name="account.email"
							placeholder="新的邮箱地址">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="selfCell"> 手机</label>
					<div class="controls">
						<input type="text" id="selfCell"
							value="<s:property value='user.cellphone' />"
							name="account.cellphone" placeholder="手机">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="selfTel"> 座机</label>
					<div class="controls">
						<input type="text" id="selfTel"
							value="<s:property value='user.telephone'/>"
							name="account.telephone" placeholder="座机">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="reviseFactory">工厂</label>
					<div class="controls">
						<select id="reviseFactory" name="account.factory_id" >
							<option value="0">请选择</option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="reviseDepart">部门</label>
					<div class="controls">
						<select id="reviseDepart" name="account.department_id">
							<option value="0">请选择</option>
						</select>
					</div>
				</div>
				<input type="hidden" name="account.id"
					value="<s:property value='user.id'/>">
			</form>
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
			<button class="btn btn-primary" id="btnSelfModify">确认修改</button>
		</div>
	</div>
	
	<div class="modal" id="passwordModal" tabindex="-1" role="dialog"
		aria-hidden="true" style="display: none;">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">×</button>
			<h3>修改密码</h3>
		</div>
		<div class="modal-body">
			<form class="form-horizontal" id="passwordForm"
				action="account!updateAccount.action" method="post">
				<div class="control-group">
					<label class="control-label" for="inputPasswordNew"> 新的密码</label>
					<div class="controls">
						<input type="password" id="inputPasswordNew"
							placeholder="New Password">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="inputPasswordConfirm">
						确认新密码</label>
					<div class="controls">
						<input type="password" id="inputPasswordConfirm"
							name="account.password" placeholder="Confirm Password">
					</div>
				</div>
				<input type="hidden" name="account.id"
					value="<s:property value='user.id'/>">
				<input type="hidden" name="account.factory_id"
					value="<s:property value='user.factory_id'/>">
					<input type="hidden" name="account.department_id"
					value="<s:property value='user.department_id'/>">
			</form>
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
			<button class="btn btn-primary" id="btnPasswordChange">确认修改</button>
		</div>
	</div>
	
	<div class="modal" id="newModal" tabindex="-1" role="dialog"
		aria-labelledby="newModalLabel" aria-hidden="true"
		style="display: none;">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">×</button>
			<h3 id="newModalLabel">添加新用户</h3>
		</div>
		<div class="modal-body">
			<form class="form-horizontal" action="account!addAccount.action"
				method="post" id="newAccountForm">
				<div class="control-group">
					<label class="control-label" for="newCardNumber">*工号</label>
					<div class="controls">
						<input type="text" id="newCardNumber" name="account.card_number"
							placeholder="CardNumber">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="newDisplayName">*用户名</label>
					<div class="controls">
						<input type="text" id="newDisplayName" name="account.username"
							placeholder="DisplayName">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="newCard8H10D">厂牌</label>
					<div class="controls">
						<input type="text" id="newCard8H10D" name="account.card_8H10D"
							placeholder="Card8H10D">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="newEmail">邮箱</label>
					<div class="controls">
						<input type="text" id="newEmail" name="account.email"
							placeholder="Email">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="newCellPhone">手机</label>
					<div class="controls">
						<input type="text" id="newCellPhone" name="account.cellphone"
							placeholder="CellPhone">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="newTelephone">座机</label>
					<div class="controls">
						<input type="text" id="newTelephone" name="account.telephone"
							placeholder="Telephone">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="newFactory">工厂</label>
					<div class="controls">
						<select id="newFactory" name="account.factory_id" >
							<option value="0">请选择</option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="newDepart">部门</label>
					<div class="controls">
						<select id="newDepart" name="account.department_id">
							<option value="0">请选择</option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="newDepart">是否管理员</label>
					<div class="controls">
						<input type="radio" value="1" name="account.admin">是
						<input type="radio" value="0" name="account.admin" checked>否
	
					</div>
				</div>
			</form>
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
			<button class="btn btn-primary" id="btnAdd">确认</button>
		</div>
	</div>

	<div class="modal" id="editModal" tabindex="-1" role="dialog"
		aria-hidden="true" style="display: none;">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">×</button>
			<h3>修改账户信息</h3>
		</div>
		<div class="modal-body">
			<form class="form-horizontal" action="account!updateAccount.action"
				method="post" id="editAccountForm">
				<div class="control-group">
					<label class="control-label" for="editCardNumber">*工号</label>
					<div class="controls">
						<input type="text" id="editCardNumber" placeholder="CardNumber"
							name="account.card_number">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="editDisplayName">*用户名</label>
					<div class="controls">
						<input type="text" id="editDisplayName" placeholder="DisplayName"
							name="account.username">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="editCard8H10D">厂牌</label>
					<div class="controls">
						<input type="text" id="editCard8H10D" name="account.card_8H10D"
							placeholder="8H10D">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="editEmail">邮箱</label>
					<div class="controls">
						<input type="text" id="editEmail" name="account.email"
							placeholder="Email">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="editCellPhone">手机</label>
					<div class="controls">
						<input type="text" id="editCellPhone" name="account.cellphone"
							placeholder="CellPhone">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="editTelephone">座机</label>
					<div class="controls">
						<input type="text" id="editTelephone" name="account.telephone"
							placeholder="Telephone">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="editFactory">工厂</label>
					<div class="controls">
						<select id="editFactory" name="account.factory_id">
							<option value="0">请选择</option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="editDepart">部门</label>
					<div class="controls">
						<select id="editDepart" name="account.department_id">
							<option value="0">请选择</option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="">是否管理员</label>
					<div class="controls">
						<input type="radio" value="1" name="account.admin">是
						<input type="radio" value="0" name="account.admin" >否
	
					</div>
				</div>
				<input type="hidden" id="editUserId" name="account.id">
			</form>
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
			<button class="btn btn-primary" id="btnEdit">确认修改</button>
		</div>
	</div>

	<!-- 权限编辑modal -->
	<div class="modal" id="authModal" tabindex="-1" role="dialog" 
		aria-hidden="true" style="display: none;min-width:1200px;margin-left:-600px">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">×</button>
			<h3 id="auth_user">权限编辑</h3>
		</div>
		<div class="modal-body">
		<form action="account!assignAuth.action" method="post" id="assignForm">
			<div class="accordion">
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#auth_account_table"
						href="#auth_account">账户管理
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_account">全选</label>	
					</div>				
				</div>
				<div id="auth_account" class="accordion-body collapse in">
					<div class="accordion-inner" >
						<table id="auth_account_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading"
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#auth_hr_table"
						href="#auth_hr">人事
						
					</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_hr">全选</label>	
					</div>				
				</div>
				<div id="auth_hr" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="auth_hr_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading "
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a data-toggle="collapse" data-parent="#auth_order_table"
						href="#auth_order">订单</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_order">全选</label>		
					</div>	
				</div>
				<div id="auth_order" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="auth_order_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading "
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a  data-toggle="collapse" data-parent="#auth_plan_table"
						href="#auth_plan">计划</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_plan">全选</label>	
					</div>
				</div>
				<div id="auth_plan" class="accordion-body collapse">
					<div class="accordion-inner" >
						<table id="auth_plan_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading "
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle" >
					<a data-toggle="collapse" data-parent="#auth_execution_table"
						href="#auth_execution">生产</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_execution">全选</label>	
					</div>	
				</div>
				<div id="auth_execution" class="accordion-body collapse">
					<div class="accordion-inner" id="planDiv">
						<table id="auth_execution_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading "
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle" >
					<a  data-toggle="collapse" data-parent="#auth_ecn_table"
						href="#auth_ecn">技改</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_ecn">全选</label>	
					</div>	
				</div>
				<div id="auth_ecn" class="accordion-body collapse">
					<div class="accordion-inner" id="planDiv">
						<table id="auth_ecn_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading "
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a id="planViewToggle" 
						data-toggle="collapse" data-parent="#auth_quality_table"
						href="#auth_quality">品质</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_quality">全选</label>	
					</div>
				</div>
				<div id="auth_quality" class="accordion-body collapse">
					<div class="accordion-inner" id="planDiv">
						<table id="auth_quality_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading "
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a id="planViewToggle" 
						data-toggle="collapse" data-parent="#auth_aftersale_table"
						href="#auth_aftersale">售后</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_aftersale">全选</label>	
					</div>
				</div>
				<div id="auth_aftersale" class="accordion-body collapse">
					<div class="accordion-inner" id="planDiv">
						<table id="auth_aftersale_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading "
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a id="planViewToggle" 
						data-toggle="collapse" data-parent="#auth_cost_table"
						href="#auth_cost">成本</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_cost">全选</label>	
					</div>
				</div>
				<div id="auth_cost" class="accordion-body collapse">
					<div class="accordion-inner" id="planDiv">
						<table id="auth_cost_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading "
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a id="planViewToggle" 
						data-toggle="collapse" data-parent="#auth_report_table"
						href="#auth_report">报表</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_report">全选</label>	
					</div>
				</div>
				<div id="auth_report" class="accordion-body collapse">
					<div class="accordion-inner" id="planDiv">
						<table id="auth_report_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
				
				<div class="accordion-heading "
					style="background-color: #F1F6FB; border: 1px solid #F7FAFE">
					<div class="accordion-toggle">
					<a id="planViewToggle" 
						data-toggle="collapse" data-parent="#auth_setting_table"
						href="#auth_setting">基础数据</a>
					<label class="checkbox" style="float:right">
					<input type="checkbox" class="checkall" id="cbox_setting">全选</label>	
					</div>
				</div>
				<div id="auth_setting" class="accordion-body collapse">
					<div class="accordion-inner" id="planDiv">
						<table id="auth_setting_table" class="table table-condensed">
							
						</table>
					</div>
				</div>
			</div>
			</form>
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
			<button class="btn btn-primary" id="btnAuthSave">确认</button>
		</div>
	</div>
</body>
</html>