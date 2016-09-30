<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 技改单维护</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript"
	src="js/jquery-ui-timepicker-addon.zh-CN.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/techtrans/techtransMaintain.js"></script>
<script type="text/javascript" src="js/jsrender.min.js"></script>
<script type="text/javascript" src="js/json2.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<style type="text/css">
.section-head {
	border-left: 7px solid #000;
	padding-left: 10px;
	margin-top: 25px;
	margin-bottom: 20px;
}

.glyphicon {
	position: relative;
	top: 1px;
	display: inline-block;
	font-family: 'Glyphicons Halflings';
	font-style: normal;
	font-weight: 400;
	line-height: 1;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale
}

.glyphicon-plus:before {
	content: "\2b"
}

*::before, *::after {
	box-sizing: border-box;
}

.btn-xs, .btn-group-xs>.btn {
	padding: 1px 5px;
	font-size: 14px;
	line-height: 2.5;
	border-radius: 3px;
}

.btn-success {
	color: #FFF;
	background-color: #5CB85C;
	border-color: #4CAE4C;
}

.offlineFont {
	color: red
}

.input[type="text"] {
	height: 30px;
}
.modal-body .control-group {
	margin-bottom: 10px;
}
</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_techtrans_left.jsp"%>
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<div>
					<legend style="font-size:17px">技改单维护</legend>
					<div>
						<form id="form" class="well form-search">
							<table>
								<tr>
									<td>技改单编号</td>
									<td>主题</td>
									<td>技改单状态</td>
									<td>下单时间</td>
									<td>临时技改单</td>
								</tr>
								<tr>
									<td><input type="text" style="height: 30px;"
										class="input-medium revise" placeholder="请输入技改单编号..."
										id="ecn_document_number" /></td>
									<td><input type="text" style="height: 30px;"
										class="input-medium revise" placeholder="请输入主题..."
										id="subject" /></td>
									<td><select class="input-medium carType" id="status">
											<option></option>
											<option value="1">已完成</option>
											<option value="0">未完成</option>
									</select></td>
									<td><input type="text" type="text" name="startDate"
										id="startDate" class="Wdate"
										style="height: 30px; background-color: white; width: 120px"
										onfocus="javascript:WdatePicker()" readonly="readonly" /> 至 <input
										type="text" type="text" name="endDate" id="endDate"
										class="Wdate" onfocus="javascript:WdatePicker()"
										style="height: 30px; background-color: white; width: 120px"
										readonly="readonly" /></td>
									<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox"
										id="techflagselect">是 <input type="hidden"
										id="tecn_flag" name="tecn_flag" />
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="button"
										class="btn btn-primary" id="btnQuery" value="查询"
										style="margin-left: 2px;"></input> <input id="btnAdd"
										type="button" class="btn btn-success" value="新增"></input>
									</td>
								</tr>
							</table>
						</form>
						<table id="tableEcnDocument" class="table table-condensed"
							style="font-size: 12px;">
							<thead>
							<thead>
								<tr>
									<!-- 								<th>技改单ID</th> -->
									<th style="max-width: 120px; min-width: 80px;">技改类型</th>
									<th style="max-width: 150px; min-width: 120px;">技改单编号</th>
									<th style="max-width: 200px; min-width: 120px;">主题</th>
									<th style="max-width: 100px; min-width: 80px;">技改单日期</th>
									<th style="max-width: 100px; min-width: 30px;">责任单位</th>
									<th>技改单附件</th>
									<th>变更物料清单</th>
									<th>工程院联系人</th>
									<th>工艺联系人</th>
									<th>临时技改单</th>
									<th style="max-width: 50px; min-width: 50px;">状态</th>
									<th style="width: 55px;">操作</th>
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
		<div style="display: none;position:fixed;z-index:999;margin-top:150px;margin-left:500px" class="divLoading" >
              <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
        </div> 
		<!-- new order start -->
		<div class="modal" id="newModal" tabindex="-1" role="dialog"
			style="display: none; width: 880px; left: 38%; height: 600px; top: 20px">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3 id="editModal_title">技改单新增</h3>
			</div>
			<div class="modal-body" style="max-height: 500px">
				<form id="addECN" enctype="multipart/form-data" method="post"
					action="ecnDocument!addECN.action" class="form-horizontal">
					<div style="height: 200px">
						<input name="new_allEcnTask" type="hidden" id="new_allEcnTask" />
						<input name="new_tecn_flagValue" type="hidden"
							id="new_tecn_flagValue" />
						<div style="float: left; width: 50%; height: 200px">
							<div class="control-group">
								<label class="control-label" for="new_ecn_type">*&nbsp;技改类型</label>
								<div class="controls">
									<select name="new_ecn_type" id="new_ecn_type"
										class="input-medium carType">
										<option>请选择</option>
									</select>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="new_subject">*&nbsp;主题</label>
								<div class="controls">
									<input type="text" name="new_subject" style="width: 220px;"
										class="input-medium" id="new_subject" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_vehicle_type">*&nbsp;技改单附件</label>
								<div class="controls">
									<input type="file" name="ecndocumentfile"
										id="new_ecn_document_file" style="height: 30px; width: 180px">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="new_ecn_document_file">*&nbsp;变更物料清单</label>
								<div class="controls">
									<input type="file" name="changedbom" id="new_changed_bom"
										style="height: 30px; width: 180px">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="new_responsible_organization">&nbsp;责任单位</label>
								<div class="controls">
									<input type="text" name="new_responsible_organization"
										style="width: 220px;" class="input-medium"
										id="new_responsible_organization" />
								</div>
							</div>
						</div>
						<div style="float: right; width: 50%; height: 200px">
							<div class="control-group">
								<label class="control-label" for="new_ecn_document_number">*&nbsp;技改编号</label>
								<div class="controls">
									<input type="text" name="new_ecn_document_number"
										style="width: 220px;" class="input-medium"
										id="new_ecn_document_number" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="new_ecn_document_date">*&nbsp;技改单日期</label>
								<div class="controls">
									<input type="text" type="text" name="new_ecn_document_date"
										id="new_ecn_document_date" class="Wdate"
										style="height: 30px; background-color: white; width: 150px"
										onClick="WdatePicker({el:'new_ecn_document_date',dateFmt:'yyyy-MM-dd'});" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="new_gcy_contacts">&nbsp;工程院联系人</label>
								<div class="controls">
									<input type="text" name="new_gcy_contacts" class="input-medium"
										id="new_gcy_contacts" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="new_gy_contacts">&nbsp;工艺联系人</label>
								<div class="controls">
									<input type="text" name="new_gy_contacts" class="input-medium"
										id="new_gy_contacts" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="new_tecn_flag">&nbsp;临时技改单</label>
								<div class="controls">
									<input type="checkbox" name="new_tecn_flag"
										class="input-medium" id="new_tecn_flag" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_vehicle_model">&nbsp;</label>
								<div class="controls">&nbsp;</div>
							</div>
						</div>
					</div>
				</form>
				<div class="container">
					<div style="width: 100%">
						<ul class="nav nav-tabs" id="new_tab" role="tablist"
							style="height: 38px;">
							<li class="active"><a href="#new_task1" data-toggle="tab"
								style="font-size: 14px; color: #333">任务1</a></li>
							<li><i id="new_addTask" class="fa fa-plus"
								style="cursor: pointer; padding-top: 12px; color: blue;"></i></li>
						</ul>
					</div>
					<div class="tab-content" id="new_accordion">
						<div class="tab-pane active" role="tabpanel" id="new_task1">
							<div class="panel panel-default">

								<div id="collapseTask1" class="panel-collapse collapse in"
									role="tabpanel" aria-labelledby="headingTask1"
									style="overflow-y: scroll">
									<div class="panel-body">
										<table style="width: 100%; margin-left: 20px;">
											<tbody>
												<tr>
													<td style="width: 120px;"><label class="control-label"
														for="">*&nbsp;&nbsp;技改项内容</label></td>
													<td><textarea style="width: 88%;" class="input-small"
															placeholder="请输入技改任务..." id="seats" rows=1></textarea></td>
												</tr>
												<tr>
													<td style="width: 120px;"><label class="control-label"
														for="">*&nbsp;&nbsp;切换方式</label></td>
													<td><label><input value='0' checked="checked"
														class="radio changeRadio" type="radio"
														name="switch_mode_1" title="全部切换" />全部切换 </label><label><input value='1'
														class="radio changeRadio" type="radio"
														name="switch_mode_1" title="立即切换" />立即切换</label></td>
												</tr>
												<tr>
													<td style="width: 120px;"><label class="control-label"
														for="">&nbsp;&nbsp;单车总工时</label></td>
													<td><input type="text" style="width: 80px;" />&nbsp;&nbsp;小时</td>
												</tr>
												<tr>
													<td
														style="vertical-align: top; padding-top: 10px; width: 120px;">技改车间/工时</td>
													<td>
														<table
															style="margin-left: 0px; margin-top: 5px; width: 60%;"
															class="exp-table table">
															<thead>
																<tr>
																	<th class="col-sm-2">车间</th>
																	<th class="col-sm-7">单车工时</th>
																	<th></th>
																</tr>
															</thead>
															<tbody class="exp-table">

															</tbody>
														</table>
													</td>

												</tr>
												<tr>
													<td style="vertical-align: top; width: 120px;">技改实施范围</td>
													<td style="vertical-align: top;">
														<table
															style="margin-left: 0px; margin-top: -5px; width: 80%;"
															class="exp-table table">
															<thead>
																<tr>
																	<th style="width: 30px;"><i
																		class="fa fa-plus addFactoryOrder"
																		style="cursor: pointer; color: blue;"></i> <%-- <button
																			style="height: 24px"
																			class="btn btn-success btn-xs addFactoryOrder">
																			<span class="glyphicon glyphicon-plus"></span>
																		</button> --%></th>
																	<th class="col-sm-5">订单</th>
																	<th style="width: 120px;" class="col-sm-7">技改工厂</th>
																	<th style="width: 80px;" class="col-sm-7">技改台数</th>
																	<th></th>
																</tr>
															</thead>
															<tbody class="exp-table">

															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" id="btnClose"
					aria-hidden="true">关闭</button>
				<button class="btn btn-primary" id="btnAddConfirm">确认新增</button>
			</div>
		</div>

		<div class="modal" id="editModal" tabindex="-1" role="dialog"
			style="display: none; width: 880px; left: 38%;height: 600px; top: 20px">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3 id="editModal_title">技改单维护</h3>
			</div>
			<div class="modal-body" style="max-height: 500px">
				<div style="height: 200px">
					<form id="editECN" enctype="multipart/form-data" method="post"
						action="ecnDocument!eidtECN.action" class="form-horizontal">
						<input name="edit_id" type="hidden" id="edit_id" /> <input
							name="edit_allEcnTask" type="hidden" id="edit_allEcnTask" /> <input
							name="edit_tecn_flagValue" type="hidden" id="edit_tecn_flagValue" />
						<input name="edit_deleteTaskId" type="hidden"
							id="edit_deleteTaskId" />
						<div style="float: left; width: 50%; height: 200px">
							<div class="control-group">
								<label class="control-label" for="edit_ecn_type">*&nbsp;技改类型</label>
								<div class="controls">
									<select name="edit_ecn_type" id="edit_ecn_type"
										class="input-medium carType">
										<option>请选择</option>
									</select>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_subject">*&nbsp;主题</label>
								<div class="controls">
									<input type="text" name="edit_subject" style="width: 220px;"
										class="input-medium" id="edit_subject" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_vehicle_type">*&nbsp;技改单附件</label>
								<div class="controls">
									<input type="file" name="ecndocumentfile"
										id="edit_ecn_document_file" style="height: 30px; width: 180px"><a
										id="editecndocumentfile" href="#" target="_blank"></a>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_ecn_document_file">*&nbsp;变更物料清单</label>
								<div class="controls">
									<input type="file" name="changedbom" id="edit_changed_bom"
										style="height: 30px; width: 180px"><a
										id="editchangedbom" href="#" target="_blank"></a>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_responsible_organization">&nbsp;责任单位</label>
								<div class="controls">
									<input type="text" name="edit_responsible_organization"
										style="width: 220px;" class="input-medium"
										id="edit_responsible_organization" />
								</div>
							</div>
							<!-- 			<div class="control-group">
								<label class="control-label" for="edit_drive_motor">&nbsp;技改单任务</label>
								<div class="controls">
									<i id="edit_addTask" class="fa fa-plus"
										style="cursor: pointer; padding-top: 8px; color: blue;"></i>
								</div>
							</div> -->
						</div>
						<div style="float: right; width: 50%; height: 200px">
							<div class="control-group">
								<label class="control-label" for="edit_ecn_document_number">*&nbsp;技改编号</label>
								<div class="controls">
									<input type="text" name="edit_ecn_document_number"
										style="width: 220px;" class="input-medium"
										id="edit_ecn_document_number" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_ecn_document_date">*&nbsp;技改单日期</label>
								<div class="controls">
									<input type="text" type="text" name="edit_ecn_document_date"
										id="edit_ecn_document_date" class="Wdate"
										style="height: 30px; background-color: white; width: 150px"
										onClick="WdatePicker({el:'edit_ecn_document_date',dateFmt:'yyyy-MM-dd'});" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_gcy_contacts">&nbsp;工程院联系人</label>
								<div class="controls">
									<input type="text" name="edit_gcy_contacts"
										class="input-medium" id="edit_gcy_contacts" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_gy_contacts">&nbsp;工艺联系人</label>
								<div class="controls">
									<input type="text" name="edit_gy_contacts" class="input-medium"
										id="edit_gy_contacts" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_tecn_flag">&nbsp;临时技改单</label>
								<div class="controls">
									<input type="checkbox" name="edit_tecn_flag"
										class="input-medium" id="edit_tecn_flag" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_vehicle_model">&nbsp;</label>
								<div class="controls">&nbsp;</div>
							</div>
						</div>
					</form>
				</div>
				<div style="width: 100%">
					<ul class="nav nav-tabs" id="edit_tab" role="tablist"
						style="height: 38px;">
						<li><i id="edit_addTask" class="fa fa-plus"
							style="cursor: pointer; padding-top: 12px; color: blue;"></i></li>
					</ul>
				</div>
				<div class="tab-content" id="edit_accordion">
					<div id="allEditTasks" style="width: 100%; padding-left: 160px;">
						<div class="panel-group" id="edit_accordion" role="tablist"
							aria-multiselectable="true"></div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" id="btnClose"
					aria-hidden="true">关闭</button>
				<button class="btn btn-primary" id="btnEditConfirm">确认</button>
			</div>
		</div>

		<div class="modal" id="viewModal" tabindex="-1" role="dialog"
			style="display: none; width: 880px; left: 38%;height: 600px; top: 20px">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3 id="editModal_title">技改单</h3>
			</div>
			<div class="modal-body" style="max-height: 500px">
				<div style="height: 200px">
					<form id="editECN" enctype="multipart/form-data" method="post"
						action="ecnDocument!eidtECN.action" class="form-horizontal">
						<div style="float: left; width: 50%; height: 200px">
							<div class="control-group">
								<label class="control-label" for="edit_ecn_type">*&nbsp;技改类型</label>
								<div class="controls">
									<select disabled="disabled" name="edit_ecn_type"
										id="view_ecn_type" class="input-medium carType">
										<option>请选择</option>
									</select>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_subject">*&nbsp;主题</label>
								<div class="controls">
									<input disabled="disabled" type="text" name="edit_subject"
										style="width: 220px;" class="input-medium" id="view_subject" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_vehicle_type">*&nbsp;技改单附件</label>
								<div class="controls">
									<a id="viewecndocumentfile" href="#" target="_blank"></a>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_ecn_document_file">*&nbsp;变更物料清单</label>
								<div class="controls">
									<a id="viewchangedbom" href="#" target="_blank"></a>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_responsible_organization">&nbsp;责任单位</label>
								<div class="controls">
									<input disabled="disabled" type="text"
										name="view_responsible_organization" style="width: 220px;"
										class="input-medium" id="view_responsible_organization" />
								</div>
							</div>
	<!-- 						<div class="control-group">
								<label class="control-label" for="edit_drive_motor">&nbsp;技改单任务</label>
											<div class="controls">
								<i id="edit_addTask" class="fa fa-plus" style="cursor: pointer;padding-top: 8px;color: blue;"></i>
							</div>
							</div> -->
						</div>
						<div style="float: right; width: 50%; height: 200px">
							<div class="control-group">
								<label class="control-label" for="edit_ecn_document_number">*&nbsp;技改编号</label>
								<div class="controls">
									<input disabled="disabled" type="text"
										name="edit_ecn_document_number" style="width: 220px;"
										class="input-medium" id="view_ecn_document_number" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_ecn_document_date">*&nbsp;技改单日期</label>
								<div class="controls">
									<input disabled="disabled" type="text" type="text"
										name="edit_ecn_document_date" id="view_ecn_document_date"
										class="Wdate"
										style="height: 30px; background-color: white; width: 150px"
										onClick="WdatePicker({el:'edit_ecn_document_date',dateFmt:'yyyy-MM-dd'});" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_gcy_contacts">&nbsp;工程院联系人</label>
								<div class="controls">
									<input disabled="disabled" type="text" name="view_gcy_contacts"
										class="input-medium" id="view_gcy_contacts" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_gy_contacts">&nbsp;工艺联系人</label>
								<div class="controls">
									<input disabled="disabled" type="text" name="edit_gy_contacts"
										class="input-medium" id="view_gy_contacts" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_tecn_flag">&nbsp;临时技改单</label>
								<div class="controls">
									<input disabled="disabled" type="checkbox"
										name="edit_tecn_flag" class="input-medium" id="view_tecn_flag" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="edit_vehicle_model">&nbsp;</label>
								<div class="controls">&nbsp;</div>
							</div>
						</div>
					</form>
				</div>
				<div style="width: 100%">
					<ul class="nav nav-tabs" id="view_tab" role="tablist"
						style="height: 38px;">
						<li><!-- <i id="view_addTask" class="fa fa-plus"
							style="cursor: pointer; padding-top: 12px; color: blue;"></i> --></li>
					</ul>
				</div>
				<div class="tab-content" id="view_accordion">
					<div id="allViewTasks" style="width: 100%; padding-left: 160px;">
						<div class="panel-group"  role="tablist"
							aria-multiselectable="true"></div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" id="btnClose"
					aria-hidden="true">关闭</button>
			</div>
		</div>

	</div>
</body>
</html>

