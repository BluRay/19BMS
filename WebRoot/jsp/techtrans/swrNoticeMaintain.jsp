<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - SWR通知单维护</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="js/jquery-ui-timepicker-addon.zh-CN.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/techtrans/swrNoticeMaintain.js"></script>
<script type="text/javascript" src="js/jsrender.min.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<style type="text/css">
.section-head {
  border-left: 7px solid #000;
  padding-left: 10px;
  margin-top: 25px;
  margin-bottom: 20px;
}
.glyphicon{
	position:relative;
	top:1px;
	display:inline-block;
	font-family:'Glyphicons Halflings';
	font-style:normal;
	font-weight:400;
	line-height:1;
	-webkit-font-smoothing:antialiased;
	-moz-osx-font-smoothing:grayscale
}
.glyphicon-plus:before{
	content:"\2b"
}
*::before, *::after {
    box-sizing: border-box;
}
.btn-xs, .btn-group-xs > .btn {
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
.offlineFont{
	color:red
}
</style>
</head>
<body >
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_techtrans_left.jsp"%>
	<div class="content-wrapper ">
	<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<legend style="margin: 0 auto;">SWR通知单维护</legend>
				<div style="margin: 0 auto;">
					<br/><form id="form" class="well form-search">
						<table>
							<tr>
								<td>SWR 单号</td>
								<td>主题</td>
								<td>起始日期 </td>
								<td></td>
							</tr>
							<tr>
								<td> <input type="text" class="input-medium revise" placeholder="SWR 单号..." id="swr_number" /></td>
								<td> <input type="text" class="input-medium revise" placeholder="主题关键字..."  id="search_subject" /></td>
								<td> <input type="text" class="input-medium" name="startDate" placeholder="开始日期..."  onClick="WdatePicker({el:'startDate',dateFmt:'yyyy-MM-dd'});" id="startDate" />
										至
									 <input type="text" class="input-medium" name="endDate" placeholder="结束日期..." id="endDate" onClick="WdatePicker({el:'endDate',dateFmt:'yyyy-MM-dd'});"/>
									</td>
								<td><input type="button" class="btn btn-primary"
									id="btnQuery" value="查询" style="margin-left: 2px;"></input> <input
									id="btnAdd" type="button" class="btn btn-success" value="新增"></input>
									<input id="btnDelete" type="button"
								class="btn btn-danger" value="刪除"></input>
								</td>
							</tr>
							
						</table>
					</form>
					
					<table id="tableSWR" class="table table-condensed" style="font-size:12px;">
                    <thead>
                        <tr>
                        	<th><input type="checkbox" id="checkall"></th>
                            <th>单号</th>
                            <th>主题</th>
                            <th>发起人</th>
                            <th>日期</th>
                            <th>维护者</th>
                            <th>维护时间</th>
                            <th>修改</th>
                            <th>查看</th>
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
		
<!-- new swrNotice start -->
		<div class="modal" id="newModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
		    <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		        <h3>新增SWR通知单</h3>
		    </div>
		    <div class="modal-body">
		    	<form id=" " class="form-horizontal">
		            <div class="control-group">
		                <label class="control-label" for="newSWR_number">*&nbsp;单号</label>
		                <div class="controls">
		                    <input type="text" class="input-medium" placeholder="单号..." id="newSwr_number"/>
		                </div>
		            </div>
		            <div class="control-group">
		                <label class="control-label" for="newSubject">*&nbsp;主题</label>
		                <div class="controls">
		                   <textarea placeholder="主题..."  class="input-xlarge" id="subject" rows="3"></textarea>
		                </div>
		            </div>
		            <div class="control-group">
		                <label class="control-label" for="newInitiator">*&nbsp;发起人</label>
		                <div class="controls">
		                   <input type="text" class="input-medium" placeholder="发起人..." id="initiator"/>
		                </div>
		            </div>
		             <div class="control-group">
		                <label class="control-label" for="newDate">*&nbsp;日期</label>
		                <div class="controls"> 
							<input type="text" class="input-medium"  id="newDate" onClick="WdatePicker({el:'newDate',dateFmt:'yyyy-MM-dd'});"/>
		                </div>
		            </div>
		            <div class="control-group">
		                <label class="control-label" for="newMemo">&nbsp;备注</label>
		                <div class="controls">
		                  <textarea class="input-xlarge" id="memo" rows="3"></textarea>
		                </div>
		            </div>
		            <div class="control-group">
		                <label class="control-label" for="newMemo">&nbsp;邮件通知</label>
		                <div class="controls">
		                   <textarea placeholder="邮件通知..."  class="input-xlarge" id="email_id" rows="2"></textarea>
		                </div>
		            </div>
		          </form>
			</div>
			<div class="modal-footer">
		        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
		         <button class="btn btn-success" id="btnContinue">继续新增</button> 
		        <button class="btn btn-primary" id="btnAddConfirm">确认新增</button>
		    </div>
	</div>
	
	<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
		    <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		        <h3>修改SWR通知单</h3>
		    </div>
		    <div class="modal-body">
		    	<form id=" " class="form-horizontal">
		    		<input type="hidden" id="swr_id" />
		            <div class="control-group">
		                <label class="control-label" for="newSWR_number">*&nbsp;单号</label>
		                <div class="controls">
		                    <input type="text" class="input-medium" placeholder="单号..." id="editSwr_number"/>
		                </div>
		            </div>
		            <div class="control-group">
		                <label class="control-label" for="newSubject">*&nbsp;主题</label>
		                <div class="controls">
		                   <textarea placeholder="主题..."  class="input-xlarge" id="edit_subject" rows="3"></textarea>
		                </div>
		            </div>
		            <div class="control-group">
		                <label class="control-label" for="newInitiator">*&nbsp;发起人</label>
		                <div class="controls">
		                   <input type="text" class="input-medium" placeholder="发起人..." id="edit_initiator"/>
		                </div>
		            </div>
		             <div class="control-group">
		                <label class="control-label" for="newDate">*&nbsp;日期</label>
		                <div class="controls"> 
							<input type="text" class="input-medium"  id="edit_Date" onClick="WdatePicker({el:'newDate',dateFmt:'yyyy-MM-dd'});"/>
		                </div>
		            </div>
		            <div class="control-group">
		                <label class="control-label" for="newMemo">&nbsp;备注</label>
		                <div class="controls">
		                  <textarea class="input-xlarge" id="edit_memo" rows="3"></textarea>
		                </div>
		            </div>
		            <div class="control-group">
		                <label class="control-label" for="newMemo">&nbsp;邮件通知</label>
		                <div class="controls">
		                   <textarea placeholder="邮件通知..."  class="input-xlarge" rows="2"></textarea>
		                </div>
		            </div>
		          </form>
			</div>
			<div class="modal-footer">
		        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
		        <button class="btn btn-primary" id="btneditConfirm">确认</button>
		    </div>
	</div>
	
	
<!-- new swrNotice end -->
<!-- show swrNotice start -->
	<div class="modal" id="viewModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
	    <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	        <h3>查看SWR 通知单</h3>
	    </div>
	    <div class="modal-body">
	    	<form id=" " class="form-horizontal">
	        	<div class="control-group">
	                <label class="control-label" for="showSwr_number">&nbsp;单号</label>
	                <div class="controls">
	                    <input type="text" disabled="disabled" class="input-medium" placeholder="单号..." id="showSwr_number"/>
	                </div>
	            </div>
	            <div class="control-group">
	                <label class="control-label" for="showSubject">&nbsp;主题</label>
	                <div class="controls">
	                	<textarea class="input-xlarge" id="showSubject" rows="3" disabled="disabled"></textarea>
	                </div>
	            </div>
	            <div class="control-group">
	                <label class="control-label" for="showInitiator">&nbsp;发起人</label>
	                <div class="controls">
	                   <input type="text" disabled="disabled" class="input-medium" placeholder="发起人..." id="showInitiator"/>
	                </div>
	            </div>
	           <div class="control-group">
	                <label class="control-label" for="showDate">&nbsp;日期</label>
	                <div class="controls">
	                   <input type="text" disabled="disabled" class="input-medium" placeholder="日期..." id="showDate" />
	                </div>
	            </div>
	            <div class="control-group">
	                <label class="control-label" for="showMemo">&nbsp;备注</label>
	                <div class="controls">
	                    <textarea class="input-xlarge" id="showMemo" rows="3" disabled="disabled"></textarea>
	                </div>
	            </div>
	   
	            <div class="control-group">
	                <label class="control-label" for="showMemo">&nbsp;维护者</label>
	                <div class="controls">
	                   <input type="text" disabled="disabled" class="input-medium" placeholder="维护者..." id="showEditor_id"/>
	                </div>
	            </div>
	             <div class="control-group">
	                <label class="control-label" for="showMemo">&nbsp;维护时间</label>
	                <div class="controls">
	                   <input type="text" disabled="disabled" class="input-medium" placeholder="维护时间..." id="showEditor_date"/>
	                </div>
	            </div>
	          </form>
	    </div>
	    <div class="modal-footer">
	  		<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
		</div>
	</div>
<!-- show swrNotice end -->
	
	</div>	
	</div>
</body>
</html>