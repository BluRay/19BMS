<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>品质</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/quality/material_abnormal.js"></script>
<style type="text/css">
.controls p {
	line-height: 30px;
	margin: 0;
}
</style>
</head>
<body >
	<%@ include file="/jsp/common/head.jsp"%>
	<%@ include file="../common/general_quality_left.jsp"%>
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">

			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="margin: 0 auto;">物料异常记录</legend>
				<div style="margin: 0 auto;">
					<br />
					<form id="form" class="well form-search">
						<table>
							<tr>
								<td>工厂</td>
								<td>车间</td>
								<td>车型</td>
								<td>订单</td>
								<td>物料名称</td>
								<td>发生日期</td>
								<td>严重等级</td>
								<td></td>
							</tr>
							<tr>
								<td><select name="" id="input_factory"
									class="input-small carType">
								</select></td>
								<td><select name="" id="input_workshop"
									class="input-small carType">
									<option value=''>全部</option>
								</select></td>
								<td><select name="" id="input_bustype"
									class="input-small carType">
								</select></td>
								<td><input type="text" class="input-small revise"
									id="input_order" /></td>
								<td><input type="text" class="input-medium revise"
									id="input_material" /></td>
								<td><input id="occur_start" type="text"
									class="input-small" style="width: 98px" placeholder="开始日期..."
									onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /> <span
									class="add-on" style="padding: 4px 0">-</span> <input
									id="occur_end" type="text" class="input-small"
									style="width: 98px" placeholder="结束日期..."
									onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /> <span>&nbsp;</span>
								</td>
								<td><label class="checkbox"> <input type="checkbox"
										name="buglevel" value="S" />S
								</label> <label class="checkbox"> <input type="checkbox"
										name="buglevel" value="A" />A
								</label> <label class="checkbox"> <input type="checkbox"
										name="buglevel" value="B" />B
								</label> <label class="checkbox"> <input type="checkbox"
										name="buglevel" value="C" />C
								</label> <span>&nbsp;&nbsp;</span></td>
								<td><input type="button" class="btn btn-primary"
									id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
								<td><input type="button" class="btn btn-success"
									id="btnAdd" value="新增" style="margin-left: 2px;"></input></td>
							</tr>
						</table>
					</form>

					<table id="tableResult" class="table table-condensed"
						style="display:none" style="font-size: 12px;">
						<thead>
							<tr>
								<th>工厂</th>
								<th>车间</th>
								<th>车型</th>
								<th>订单</th>
								<th>物料名称</th>
								<th>缺陷等级</th>
								<th>责任单位</th>
								<th>责任人</th>
								<th>预计完成时间</th>
								<th>验证结果</th>
								<th>验证人</th>
								<th>发生日期</th>
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
					aria-hidden="true" style="display: none; width: 780px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>品质物料异常新增</h3>
					</div>
					<div class="modal-body">
						<form id="newRecordForm" class="form-horizontal" method="post"
							enctype="multipart/form-data" action="materialAbnormal!saveRecord.action">
							<div class="control-group">
								<div class="span3" style="margin-left: 0px;width:300px">
									<label class="control-label">*&nbsp;发生日期</label>
									<div class="controls">
										<input type="text" class="input-medium" id="new_occur_date"
											name="materialAbnormal.occurDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
									</div>
								</div>
								<div class="span3" >
									<label class="control-label">*&nbsp;物料名称</label>
									<div class="controls">
										<input type="text" class="input-medium" id="new_material"
											name="materialAbnormal.material" />
									</div>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px;width:300px">
									<label class="control-label">*&nbsp;发生工厂</label>
									<div class="controls">
										<select  class="input-medium" id="new_factory"
											name="materialAbnormal.factoryId" >
									    </select>		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">*&nbsp;发生车间</label>
									<div class="controls">
										<select class="input-medium" id="new_workshop"
											name="materialAbnormal.workshopId">
											<option value="">请选择</option>
										</select>
									</div>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px;width:300px">
									<label class="control-label">*&nbsp;车型</label>
									<div class="controls">
										<select  class="input-medium" id="new_bus_type"
											name="materialAbnormal.busTypeId" >
									    </select>		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">*&nbsp;订单编号</label>
									<div class="controls">
										<input type="text" class="input-medium" id="new_order"/>
										<input type="hidden" name="materialAbnormal.orderId" id="new_orderId">	
									</div>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;异常描述</label>
								<div class="controls">
									<textarea class="input-xlarge" id="new_desc" rows="1" style="width:480px"
										name="materialAbnormal.bugDesc"></textarea>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;异常图片</label>
								<div class="controls">
									<input class="maintain" type="file" name="bugPhoto"
										style="width: 210px" />
									<!-- <input type="submit" value="上传" class="btn btn-primary maintain"/> -->
								</div>
							</div>
							<div class="control-group" >
								<label class="control-label" for="">*&nbsp;临时措施</label>
								<div class="controls">
									<textarea class="input-xlarge" id="new_tmp_measures" rows="1" style="width:480px"
										name="materialAbnormal.tmpMeasure"></textarea>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;原因分析</label>
								<div class="controls">
									<textarea class="input-xlarge" id="new_reson" rows="1" style="width:480px"
										name="materialAbnormal.faultReason"></textarea>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;改善/预防措施</label>
								<div class="controls">
									<textarea class="input-xlarge" id="new_imp_measures" rows="1" style="width:480px"
										name="materialAbnormal.impMeasure"></textarea>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px;width:300px">
									<label class="control-label">*&nbsp;缺陷等级</label>
									<div class="controls">
										<select  class="input-medium" id="new_bug_level"
											name="materialAbnormal.bugLevel" >
											<option value="S">S</option>
											<option value="A">A</option>
											<option value="B">B</option>
											<option value="C">C</option>
									    </select>		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">预计完成时间</label>
									<div class="controls">
										<input type="text" class="input-medium" id="new_finish_time"
											name="materialAbnormal.expcFinishDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>	
									</div>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px;width:300px">
									<label class="control-label">责任单位</label>
									<div class="controls">
										<input type="text" class="input-medium" id="new_resp_unit"
											name="materialAbnormal.respUnit" />
									   		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">责任人</label>
									<div class="controls">
										<input type="text" class="input-medium" id="new_resp_person"
											name="materialAbnormal.respPerson" />	
									</div>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px;width:300px">
									<label class="control-label">验证结果</label>
									<div class="controls">
										<select  class="input-medium" id="new_result"
											name="materialAbnormal.verifyResult" >
											<option value="NG">NG</option>
											<option value="OK">OK</option>
									    </select>		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">验证人</label>
									<div class="controls">
										<input type="text" class="input-medium" id="new_verifier"
											name="materialAbnormal.verifier" />	
									</div>
								</div>
							</div>
						
							<div class="control-group">
								<label class="control-label" for="">改善后图片</label>
								<div class="controls">
									<input class="maintain" type="file" name="imPhoto"
										style="width: 210px" />
									<!-- <input type="submit" value="上传" class="btn btn-primary maintain"/> -->
								</div>
							</div>					
							<div class="control-group">
								<label class="control-label" for="">备注</label>
								<div class="controls">
									<textarea class="input-xlarge" id="memo" rows="1" style="width:480px"
										name="materialAbnormal.memo"></textarea>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnAddConfirm">保存</button>
					</div>
				</div>
				<!-- edit modal -->
				<div class="modal fade" id="editModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none; width: 780px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>品质物料异常编辑</h3>
					</div>
					<div class="modal-body">
						<form id="editRecordForm" class="form-horizontal" method="post"
							enctype="multipart/form-data" action="materialAbnormal!saveRecord.action">
							<div class="control-group">
								<div class="span3" style="margin-left: 0px;width:300px">
									<label class="control-label">*&nbsp;发生日期</label>
									<div class="controls">
										<input type="text" class="input-medium" id="edit_occur_date"
											name="materialAbnormal.occurDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
									</div>
								</div>
								<div class="span3">
									<label class="control-label">*&nbsp;物料名称</label>
									<div class="controls">
										<input type="text" class="input-medium" id="edit_material"
											name="materialAbnormal.material" />
									</div>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px;width:300px">
									<label class="control-label">*&nbsp;发生工厂</label>
									<div class="controls">
										<select  class="input-medium" id="edit_factory"
											name="materialAbnormal.factoryId" >
									    </select>		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">*&nbsp;发生车间</label>
									<div class="controls">
										<select class="input-medium" id="edit_workshop"
											name="materialAbnormal.workshopId">
											<option value="">请选择</option>
										</select>
									</div>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px;width:300px">
									<label class="control-label">*&nbsp;车型</label>
									<div class="controls">
										<select  class="input-medium" id="edit_bus_type"
											name="materialAbnormal.busTypeId" >
									    </select>		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">*&nbsp;订单编号</label>
									<div class="controls">
										<input type="text" class="input-medium" id="edit_order" />
										<input type="hidden" name="materialAbnormal.orderId" id="edit_orderId">	
									</div>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;异常描述</label>
								<div class="controls">
									<textarea class="input-xlarge" id="edit_bug_desc" rows="1" style="width:480px"
										name="materialAbnormal.bugDesc"></textarea>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;异常图片</label>
								<div class="controls">
									<input class="maintain" type="file" name="bugPhoto"
										style="width: 210px" />
									<input type="hidden" name="materialAbnormal.bugPhotoPath" id="bug_photo_path">
									<!-- <input type="submit" value="上传" class="btn btn-primary maintain"/> -->
								</div>
							</div>
							<div class="control-group" >
								<label class="control-label" for="">*&nbsp;临时措施</label>
								<div class="controls">
									<textarea class="input-xlarge" id="edit_tmp_measures" rows="1" style="width:480px"
										name="materialAbnormal.tmpMeasure"></textarea>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;原因分析</label>
								<div class="controls">
									<textarea class="input-xlarge" id="edit_reson" rows="1" style="width:480px"
										name="materialAbnormal.faultReason"></textarea>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;改善/预防措施</label>
								<div class="controls">
									<textarea class="input-xlarge" id="edit_imp_measures" rows="1" style="width:480px"
										name="materialAbnormal.impMeasure"></textarea>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px;width:300px">
									<label class="control-label">*&nbsp;缺陷等级</label>
									<div class="controls">
										<select  class="input-medium" id="edit_bug_level"
											name="materialAbnormal.bugLevel" >
											<option value="S">S</option>
											<option value="A">A</option>
											<option value="B">B</option>
											<option value="C">C</option>
									    </select>		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">预计完成时间</label>
									<div class="controls">
										<input type="text" class="input-medium" id="edit_finish_time"
											name="materialAbnormal.expcFinishDate" onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>	
									</div>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px;width:300px">
									<label class="control-label">责任单位</label>
									<div class="controls">
										<input type="text" class="input-medium" id="edit_resp_unit"
											name="materialAbnormal.respUnit" />
									   		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">责任人</label>
									<div class="controls">
										<input type="text" class="input-medium" id="edit_resp_person"
											name="materialAbnormal.respPerson" />	
									</div>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px;width:300px">
									<label class="control-label">验证结果</label>
									<div class="controls">
										<select  class="input-medium" id="edit_result"
											name="materialAbnormal.verifyResult" >
											<option value="NG">NG</option>
											<option value="OK">OK</option>
									    </select>		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">验证人</label>
									<div class="controls">
										<input type="text" class="input-medium" id="edit_verifier"
											name="materialAbnormal.verifier" />	
									</div>
								</div>
							</div>
						
							<div class="control-group">
								<label class="control-label" for="">改善后图片</label>
								<div class="controls">
									<input class="maintain" type="file" name="imPhoto"
										style="width: 210px" />
									<input type="hidden" name="materialAbnormal.imPhotoPath" id="imphoto_path">	
									<!-- <input type="submit" value="上传" class="btn btn-primary maintain"/> -->
								</div>
							</div>					
							<div class="control-group">
								<label class="control-label" for="">备注</label>
								<div class="controls">
									<textarea class="input-xlarge" id="edit_memo" rows="1" style="width:480px"
										name="materialAbnormal.memo"></textarea>
								</div>
							</div>
							<input type="hidden" name="materialAbnormal.id" id="record_id">
						</form>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
						<button class="btn btn-primary" id="btnEditConfirm">保存</button>
					</div>
				</div>
				<!-- show MODAL -->
				<div class="modal fade" id="showModal" tabindex="-1" role="dialog"
					aria-hidden="true" style="display: none; width: 780px;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">×</button>
						<h3>品质物料异常预览</h3>
					</div>
					<div class="modal-body">
						<form id="editRecordForm" class="form-horizontal" method="post"
							enctype="multipart/form-data" action="materialAbnormal!saveRecord.action">
							<div class="control-group">
								<div class="span3" style="margin-left: 0px">
									<label class="control-label">*&nbsp;发生日期</label>
									<div class="controls">
										<p class="text-info" id="occur_date"></p>
									</div>
								</div>
								<div class="span3">
									<label class="control-label">*&nbsp;物料名称</label>
									<div class="controls">
										<p class="text-info" id="material"></p>
									</div>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px">
									<label class="control-label">*&nbsp;发生工厂</label>
									<div class="controls">
										<p class="text-info" id="factory"></p>		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">*&nbsp;发生车间</label>
									<div class="controls">
										<p class="text-info" id="workshop"></p>	
									</div>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px">
									<label class="control-label">*&nbsp;车型</label>
									<div class="controls">
										<p class="text-info" id="bus_type"></p>		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">*&nbsp;订单编号</label>
									<div class="controls">
										<p class="text-info" id="order"></p>
									</div>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;异常描述</label>
								<div class="controls">
									<p class="text-info" id="bug_desc"></p>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;异常图片</label>
								<div class="controls">
									<p><img src="" id="bug_photo"></p>
								</div>
							</div>
							<div class="control-group" >
								<label class="control-label" for="">*&nbsp;临时措施</label>
								<div class="controls">
									<p class="text-info" id="tmp_measures"></p>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;原因分析</label>
								<div class="controls">
									<p class="text-info" id="reason"></p>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label" for="">*&nbsp;改善/预防措施</label>
								<div class="controls">
									<p class="text-info" id="imp_measures"></p>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px">
									<label class="control-label">*&nbsp;缺陷等级</label>
									<div class="controls">
										<p class="text-info" id="bug_level"></p>		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">预计完成时间</label>
									<div class="controls">
										<p class="text-info" id="finish_time"></p>
									</div>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px">
									<label class="control-label">责任单位</label>
									<div class="controls">
										<p class="text-info" id="resp_unit"></p>
									   		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">责任人</label>
									<div class="controls">
										<p class="text-info" id="resp_person"></p>	
									</div>
								</div>
							</div>
							<div class="control-group">
								<div class="span3" style="margin-left: 0px">
									<label class="control-label">验证结果</label>
									<div class="controls">
										<p class="text-info" id="verify_result"></p>		
									</div>
								</div>
								<div class="span3">
									<label class="control-label">验证人</label>
									<div class="controls">
										<p class="text-info" id="verifier"></p>
									</div>
								</div>
							</div>
						
							<div class="control-group">
								<label class="control-label" for="">改善后图片</label>
								<div class="controls">
									<p><img src="" id="imp_photo"></p>
								</div>
							</div>					
							<div class="control-group">
								<label class="control-label" for="">备注</label>
								<div class="controls">
									<p class="text-info" id="memo"></p>
								</div>
							</div>
							<input type="hidden" name="materialAbnormal.id" id="record_id">
						</form>
					</div>
					<div class="modal-footer">
						<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>