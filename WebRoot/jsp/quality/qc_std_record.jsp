<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>品质</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/quality/qc_std_record.js"></script>
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
			<legend style="margin: 0 auto;">品质标准更新记录</legend>
			<div style=" margin: 0 auto;">
				<br />
				<form id="form" class="well form-search">
					<table>
						<tr>
							<td>记录编号</td>
							<td>标准文件编号/名称</td>
							<td>更新日期</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td><input type="text" class="input-medium revise"
								id="record_no" /></td>
							<td><input type="text" class="input-medium revise"
								id="stdFile_name" /></td>
							<td>
							<input id="update_start"  type="text" class="input-medium" placeholder="开始日期..." onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
							<span class="add-on" style="padding:4px 0">-</span>
							<input id="update_end"  type="text" class="input-medium" placeholder="结束日期..." onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
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
							<th>记录编号</th>
							<th>更新内容摘要</th>
							<th>标准文件编号/名称</th>
							<th>编制人</th>
							<th>编制日期</th>
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
				<h3>品质标准更新记录新增</h3>
			</div>
			<div class="modal-body" >
				<form id="newRecordForm" class="form-horizontal" method="post" enctype="multipart/form-data" action="qcStd!addRecord.action">
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;记录编号</label>
						<div class="controls">
							<input type="text" class="input-medium" id="recordNo" name="stdRecord.recordNo"/>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;标准文件编号/名称</label>
						<div class="controls">
							<input type="text" class="input-medium" id="stdFileName" name="stdRecord.standardfile"/>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;标准更新章节</label>
						<div class="controls">
							<input type="text" class="input-medium" id="updateCpt" name="stdRecord.uchapter"/>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;更新内容摘要</label>
						<div class="controls">
							<textarea class="input-xlarge" id="usynopsis" rows="1" name="stdRecord.usynopsis"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;标准更新原因</label>
						<div class="controls">
							<textarea class="input-xlarge" id="uresason" rows="1" name="stdRecord.ureason"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;发放范围</label>
						<div class="controls">
							<textarea class="input-xlarge" id="uscope" rows="1" name="stdRecord.uscope"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;更替前标准描述</label>
						<div class="controls">
							<textarea class="input-xlarge" id="bdesc" rows="1" name="stdRecord.bdescription"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">&nbsp;更替前附件</label>
						<div class="controls">
							<input class="maintain" type="file" name="bfile" style="width:210px"/>					
							<!-- <input type="submit" value="上传" class="btn btn-primary maintain"/> -->
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;更替后标准描述</label>
						<div class="controls">
							<textarea class="input-xlarge" id="adesc" rows="1" name="stdRecord.adescription"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;更替后附件</label>
						<div class="controls">
							<input class="maintain" type="file" name="afile" style="width:210px"/>					
							<!-- <input type="submit" value="上传" class="btn btn-primary maintain"/> -->
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">&nbsp;备注</label>
						<div class="controls">
							<textarea class="input-xlarge" id="memo" rows="1" name="stdRecord.memo"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">&nbsp;通知邮箱地址</label>
						<div class="controls">
							<textarea class="input-xlarge" id="mailAddrs" rows="1" placeholder="多个邮箱以;隔开" name="stdRecord.mailAddrs"></textarea>
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
		<div class="modal fade" id="showModal" tabindex="-1" role="dialog" 
			aria-hidden="true" style="display: none;width:600px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">×</button>
				<h3>品质标准更新记录预览</h3>
			</div>
			<div class="modal-body" >
				<form id="" class="form-horizontal" >
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;记录编号</label>
						<div class="controls" >
							<p id="recordNo_show" class="text-info"></p>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;标准文件编号/名称</label>
						<div class="controls">
							<p id="stdFileName_show" class="text-info"></p>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;标准更新章节</label>
						<div class="controls" >
							<p id="updateCpt_show" class="text-info"></p>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;更新内容摘要</label>
						<div class="controls" >
							<p id="usynopsis_show" class="text-info"></p>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;标准更新原因</label>
						<div class="controls" >
							<p id="uresason_show" class="text-info"></p>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;发放范围</label>
						<div class="controls" >
							<p id="uscope_show" class="text-info"></p>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;更替前标准描述</label>
						<div class="controls" >
							<p id="bdesc_show" class="text-info"></p>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;更替前附件</label>
						<div class="controls" style="text-align:middle">
							<p><a href="#" class="text-info" id="bfile_path">查看</a></p>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;更替后标准描述</label>
						<div class="controls" >
							<p id="adesc_show" class="text-info"></p>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;更替后附件</label>
						<div class="controls">
							<p><a href="#" class="text-info" id="afile_path">查看</a></p>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;备注</label>
						<div class="controls" >
							<p id="memo_show" class="text-info"></p>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label" for="">*&nbsp;通知邮箱地址</label>
						<div class="controls" >
							<p id="mailAddrs_show" class="text-info"></p>
						</div>
					</div>
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