<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 系统设置</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/setting/process.js"></script>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_setting_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<legend style="margin: 0 auto;">工序</legend>
			<div style="margin: 0 auto;">
				<br />
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>工厂</td>
							<!-- <td>工厂简称</td> -->
							<td>车间</td>
							<td>线别</td>
							<td>工序</td>
							<td>状态</td>
							<td></td>
						</tr>
						<tr>
							<td><select name="" style="width:120px;" id="seach_factory" class="input-medium carType">
								</select></td>
							<td>
								<select name="" id="seach_workshop" style="width:80px;" class="input-medium carType">
									<option value="">全部</option>
								</select></td>
							<td>
								<select name="" id="seach_line" style="width:80px;" class="input-medium carType">
									<option value="">全部</option>
								</select>
							</td>
							<td><input type="text" class="input-medium carType"
								id="input_processName" /></td>
							<td>
							<select name="" style="width:80px;" id="input_deleteFlag" class="input-medium carType">
								<option value="-1">全部</option>
								<option selected="selected" value="0">使用</option>
								<option value="1">删除</option>
							</select>
							</td>
							<td><input type="checkbox" id="input_monitoryPointFlag" ></td>
							<td>生产监控点&nbsp;&nbsp;&nbsp;</td>
							<td><input type="checkbox" id="input_keyProcessFlag" ></td>
							<td>关键工序&nbsp;&nbsp;&nbsp;</td>							
							<td><input type="checkbox" id="input_onlineFlag" ></td>
							<td>上线&nbsp;&nbsp;&nbsp;</td>	
							<td><input type="checkbox" id="input_offlineFlag" ></td>
							<td>下线&nbsp;&nbsp;&nbsp;</td>			
							<td>&nbsp;&nbsp;&nbsp;</td>
							<td><input type="button" class="btn btn-primary"
								id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
							<td><input type="button" class="btn btn-success" id="btnAdd"
								value="新增" style="margin-left: 2px;"></input></td>
							<td><input id="btnDelete" type="button"
								class="btn btn-danger" value="刪除"></input></td>
						</tr>
					</table>
				</form>

				<table id="tableProcess" class="table table-condensed"
					style="display: none" style="font-size: 12px;">
					<thead>
						<tr>
							<th><input type="checkbox" id="checkall"></th>
							<th>工厂</th>
							<th>车间</th>
							<th>线别</th>
							<th>工序编号</th>
							<th>工序</th>
							<th>生产监控点</th>
							<th>关键工序</th>
							<th>计划节点</th>
							<th>备注</th>
							<th>删除</th>
							<th>维护人</th>
							<th>维护时间</th>
							<th></th>
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
		<!-- NEW MODAL -->
		<div class="modal" id="newModal" tabindex="-1" role="dialog"
			aria-hidden="true" style="display: none;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>新增工序</h3>
			</div>
			<div class="modal-body">
				<form id=" " class="form-horizontal">
					<div class="control-group">
						<label class="control-label" for="newFactory">*&nbsp;工厂</label>
						<div class="controls">
							<select name="" id="new_factory" class="input-medium carType">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newWorkshop">*&nbsp;车间</label>
						<div class="controls">
							<select name="" id="new_workshop" class="input-medium carType">
								<option>请选择</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newLine">*&nbsp;线别</label>
						<div class="controls">
							<select name="" id="new_line" class="input-medium carType">
								<option>请选择</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"  for="newProcessCode">*&nbsp;工序编号</label>
						<div class="controls">
							<input type="text" style="width: 60px;" class="input-medium" id="new_process_code" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newProcessName">*&nbsp;工序名称</label>
						<div class="controls">
							<input type="text" style="width: 220px;" class="input-medium" id="new_process_name" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newPlanNode">&nbsp;计划节点</label>
						<div class="controls">
							<select name="" style="width: 100px;" id="new_plan_node" class="input-medium carType">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newMonitoryPointFlag">生产监控点</label>
						<div class="controls">
							<input type="checkbox" class="input-medium" id="new_monitory_point_flag" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="newKeyProcessFlag">关键工序</label>
						<div class="controls">
							<input type="checkbox" class="input-medium" id="new_key_process_flag" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">&nbsp;备注</label>
						<div class="controls">
							<textarea class="input-xlarge" id="new_memo" rows="2"></textarea>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
				<button class="btn btn-primary" id="btnAddConfirm">确认新增</button>
			</div>
		</div>
		<!-- EDIT MODAL -->
		<div class="modal" id="editModal" tabindex="-1" role="dialog"
			aria-hidden="true" style="display: none;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>编辑工序</h3>
			</div>
			<div class="modal-body">
				<form id=" " class="form-horizontal">
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;工厂</label>
						<div class="controls">
							<select name="" id="edit_factory" disabled="disabled" class="input-medium carType">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;车间</label>
						<div class="controls">
							<select name="" id="edit_workshop" disabled="disabled" class="input-medium carType">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="editLine">*&nbsp;线别</label>
						<div class="controls">
							<select name="" id="edit_line" class="input-medium carType">
								<option>请选择</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"  for="editProcessCode">*&nbsp;工序编号</label>
						<div class="controls">
							<input type="text" style="width: 60px;" class="input-medium" id="edit_process_code" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="editProcessName">*&nbsp;工序名称</label>
						<div class="controls">
							<input type="text" style="width: 220px;" class="input-medium" id="edit_process_name" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="editPlanNode">&nbsp;计划节点</label>
						<div class="controls">
							<select name="" style="width: 100px;" id="edit_plan_node" class="input-medium carType">
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="editMonitoryPointFlag">生产监控点</label>
						<div class="controls">
							<input type="checkbox" class="input-medium" id="edit_monitory_point_flag" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="editKeyProcessFlag">关键工序</label>
						<div class="controls">
							<input type="checkbox" class="input-medium" id="edit_key_process_flag" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">&nbsp;备注</label>
						<div class="controls">
							<textarea class="input-xlarge" id="edit_memo" rows="2"></textarea>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
				<button class="btn btn-primary" id="btnEditConfirm">确认编辑</button>
			</div>
		</div>
	</div>
	</div>
</body>
</html>