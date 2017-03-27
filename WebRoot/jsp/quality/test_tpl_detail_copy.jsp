<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%long _systime= new java.util.Date().getTime();%>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>检验记录表模板复制</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<%-- <script type="text/javascript" src="js/bootstrap-typeahead.js"></script> --%>
<script type="text/javascript" src="js/json2.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/quality/test_tpl_detail_copy.js?timestamp=<%=_systime%>"></script>
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
							<td>车型</td>
							<td id='th_order'>订单</td>
							<td id='th_config'>配置</td>
							<td>零部件</td>
							<td>备注</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td><select name="" id="input_busType"
								class="input-medium carType">
								<option value=0></option>
							</select></td>
							<td><select name="" id="input_order"
								class="input-medium carType">
							</select></td>
							<td><select name="" id="input_config"
								class="input-medium carType">
							</select></td>
							<td><input type="text" class="input-medium revise"
								id="input_parts" /></td>
							<td><input type="text" class="input-medium revise"
								id="input_memo" /></td>
							<td><input type="button" class="btn btn-success"
								id="btnSaveTplDetail" value="保存" style="margin-left: 2px;"></input></td>	
							<td><label class="checkbox" style="margin-left: 10px;"><input type="checkbox" id="isDraft" />保存为草稿</label></td>						
						</tr>
					</table>
				</form>
				<input type="hidden" id="tplHeaderId"
					value="<s:property value="testTplHeader.id" />">
				<table id="tableResult" class="table table-bordered"
					style="font-size: 12px;">
					<thead>
						<tr>
							<th>工序/节点名称</th>
							<th>检测内容</th>
							<th>技术要求</th>
							<th>检验频次</th>
							<th>检测工具</th>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
				<div class="modal" id="editModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none;-moz-user-select: none;-webkit-user-select:none;">
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
									<select name="" id="edit_select" class="input-large carType"></select>			
								</div>
								<input type="button" class="btn btn-success"
								id="btnAdd" value="新增" style="margin-left: 2px;"></input>
								<input type="button" class="btn btn-danger"
								id="btnDelete" value="删除" style="margin-left: 2px;"></input>
									<input type="button" class="btn btn-primary"
								id="btnSave" value="保存" style="margin-left: 2px;"></input>
							</div>							
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</body>
</html>