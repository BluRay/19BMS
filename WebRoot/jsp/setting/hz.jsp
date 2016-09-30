<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>频率</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/setting/hz.js"></script>
<style type="text/css">
.controls p {
	line-height: 30px;
	margin: 0;
}
</style>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_setting_left.jsp"%>
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<legend style="margin: 0 auto;">频率</legend>
			<div style=" margin: 0 auto;">
				<br />
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>工厂</td>
							<td>车间</td>
							<td>参数类别</td>
							<td>有效期</td>
							<td></td>
						</tr>
						<tr>
							<td><select name="" id="input_factory" class="input-medium carType">
								<option value="">全部</option>
								</select>
							</td>
							<td><select name="" id="input_workshop" class="input-medium carType">
								<option value="">全部</option>
								</select>
							</td>
							<td>
								<select name="" id="input_hz_type_id" class="input-medium carType">
									<option value="">全部</option>
								</select>
							</td>
							<td>
							<input id="input_effec_start"  type="text" class="input-medium" placeholder="开始日期..." onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
							<span class="add-on" style="padding:4px 0">-</span>
							<input id="input_effec_end"  type="text" class="input-medium" placeholder="结束日期..." onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
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
							<th>工厂</th>
							<th>车间</th>
							<th>参数名称</th>
							<th>参数值</th>
							<th>单位</th>
							<th>有效起始日</th>
							<th>有效结束日</th>
							<th>维护人</th>
							<th>维护时间</th>
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
<!-- NEW MODAL -->
		<div class="modal fade" id="newModal" tabindex="-1" role="dialog" 
			aria-hidden="true" style="display: none;width:600px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>频率参数新增</h3>
			</div>
			<div class="modal-body" >
				<form id="newRecordForm" class="form-horizontal" method="post" >
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;工厂</label>
						<div class="controls">
							<select class="input-medium" id="new_factory" >
								<option value="">请选择</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">&nbsp;车间</label>
						<div class="controls">
							<select class="input-medium" id="new_workshop" >
								<option value="0">请选择</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;参数类别</label>
						<div class="controls">
							<select  id="new_hz_type_id" class="input-medium carType">
								<option value="">请选择</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;目标值</label>
						<div class="controls">
							<input type="text" class="input-medium" id="new_value" ></input>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;单位</label>
						<div class="controls">
							<select class="input-medium" id="new_unit">
								<option value="">请选择</option>
								<option value="0">小时</option>
								<option value="1">分钟</option>
								<option value="2">秒</option>
								<option value="3">元（RMB）</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;有效期</label>
						<div class="controls">
							<input id="new_effecDateStart" type="text" class="input-medium"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
							<span class="add-on" style="padding:4px 0">-</span>
							<input id="new_effecDateEnd"  type="text" class="input-medium"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
						</div>
					</div>
					
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
				<button class="btn btn-primary" id="btnAddConfirm">保存</button>
			</div>
		</div>
		
		<!-- edit MODAL -->
		<div class="modal fade" id="editModal" tabindex="-1" role="dialog" 
			aria-hidden="true" style="display: none;width:600px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>频率参数维护</h3>
			</div>
			<div class="modal-body" >
				<form id="editRecordForm" class="form-horizontal" method="post" >
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;工厂</label>
						<div class="controls">
							<select class="input-medium" id="edit_factory">
								<option value="">请选择</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;车间</label>
						<div class="controls">
							<select class="input-medium" id="edit_workshop">
								<option value="">请选择</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;参数类别</label>
						<div class="controls">
							<select class="input-medium" id="edit_hz_type_id"></select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;目标值</label>
						<div class="controls">
							<input type="text" class="input-medium" id="edit_value" ></input>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;单位</label>
						<div class="controls">
							<select class="input-medium" id="edit_unit">
								<option value="">请选择</option>
								<option value="0">小时</option>
								<option value="1">分钟</option>
								<option value="2">秒</option>
								<option value="3">元（RMB）</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;有效期</label>
						<div class="controls">
							<input id="edit_effecDateStart"  type="text" class="input-medium"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
							<span class="add-on" style="padding:4px 0">-</span>
							<input id="edit_effecDateEnd"  type="text" class="input-medium"  onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;删除</label>
						<div class="controls">
							<input type="checkbox" class="input-medium" id="edit_status" onclick="changeStatus()"></input>
						</div>
					</div>
					<input type="hidden" id="edit_id"></input>
				</form>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
				<button class="btn btn-primary" id="btnEditConfirm">保存</button>
			</div>
		</div>
		</div>
	</div>
</div>
</body>
</html>