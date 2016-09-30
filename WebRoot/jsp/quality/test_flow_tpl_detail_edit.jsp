<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>检验流程卡模板预览</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<%-- <script type="text/javascript" src="js/bootstrap-popover-check.js"></script> --%>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/quality/test_flow_tpl_detail_edit.js"></script>
<style type="text/css">
@media only screen and (min-device-width : 320px) and (max-device-width : 1024px) { select:focus, textarea:focus, input:focus { font-size: 16px !important; } }
</style>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="/jsp/common/general_quality_left.jsp"%>
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<div style=" margin: 0 auto;">
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td width="50px"><strong>车型:</strong></td>
							<td ><s:property value="tplHeader.busType" />&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td width="50px"><strong>订单:</strong></td>
							<td ><s:property value="tplHeader.order" />&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td width="50px"><strong>配置:</strong></td>
							<td ><s:property value="tplHeader.config" />&nbsp;&nbsp;&nbsp;&nbsp;</td>
							<td width="50px"><strong>车间:</strong></td>
							<td><s:property value="tplHeader.workshop" /></td>
							<td >&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="btn btn-success"
								id="btnSaveTplDetail" value="保存" style="margin-left: 2px;"></input></td>
							<td><label class="checkbox" style="margin-left: 10px;">
							<s:if test="tplHeader.isDraft==0"><input type="checkbox" id="isDraft" checked/></s:if>
							<s:else><input type="checkbox" id="isDraft" disabled/></s:else>
							保存为草稿</label></td>	
						</tr>
					</table>
				</form>
				<input type="hidden" id="tplHeaderId"
					value="<s:property value="tplHeader.id" />">
				<table id="tableResult" class="table table-bordered"
					style="font-size: 12px;">
					<thead>
						<tr>
							<th>节点</th>
							<th>工序</th>
							<th>检测内容</th>
							<th>质控点</th>
							<th>技术要求</th>
							<th>检验频次</th>
							<th>检测工具</th>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
					<div class="modal" id="editModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none;min-height:200px;-moz-user-select: none;-webkit-user-select:none;">
					<div class="modal-header" style="cursor:move">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
					<h5>模板维护</h5>
					</div>
					<div class="modal-body" style="overflow-y:visible">						
							<div class="control-group">
								<div class="controls" id="text_input">
									<textarea   id="edit_content" style="width:500px;height:45px"></textarea>			
								</div>
								<div class="controls" style="display:none" id="select_input">
									<select name="" id="edit_select" class="input-medium carType"></select>			
								</div>
								<input type="button" class="btn btn-primary"
								id="btnSave" value="保存" style="margin-left: 2px;"></input>
							</div>							
					</div>
				</div>
				<div class="modal" id="editDraftModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none;-moz-user-select: none;-webkit-user-select:none;">
					<div class="modal-header" style="cursor:move">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
					<h5>模板维护</h5>
					</div>
					<div class="modal-body" style="overflow-y:visible">						
							<div class="control-group">
								<div class="controls" id="text_draft_input">
									<textarea   id="edit_draft_content" style="width:500px;height:45px"></textarea>			
								</div>
								<div class="controls" style="display:none" id="select_draft_input">
									<select name="" id="edit_draft_select" class="input-large carType"></select>			
								</div>
								<input type="button" class="btn btn-success"
								id="btnDraftAdd" value="新增" style="margin-left: 2px;"></input>
								<input type="button" class="btn btn-danger"
								id="btnDraftDelete" value="删除" style="margin-left: 2px;"></input>
									<input type="button" class="btn btn-primary"
								id="btnDraftSave" value="保存" style="margin-left: 2px;"></input>
							</div>							
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</body>
</html>