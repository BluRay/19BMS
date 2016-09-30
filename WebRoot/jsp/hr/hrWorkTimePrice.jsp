<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 标准工时单价维护</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/hr/hrWorkTimePrice.js"></script>
<style type="text/css">
.section-head {
	border-left: 7px solid #000;
	padding-left: 10px;
	margin-bottom: 20px;
}

.table td {
	padding: 5px;
}
</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2">
				<!-- Main -->
				<legend style="margin: 0 auto;">标准工时单价维护</legend>
				<div class="control-group">
				<form id="form" class="well form-search" style="margin: 0px;padding: 8px;">
					<table>
						<tr>
							<td width="80px" style="text-align: right">工时类型：</td>
							<td width="60px">
								<select id="workTimeType" class="input-small">
								<option value=''>全部</option>
								<option value='1'>奖惩</option>
								<option value='2'>额外</option>
								<option value='3'>技改</option>
								<option value='4'>等待</option>
								<option value='5'>节拍</option>
								</select>
							</td>
							<td width="80px" style="text-align: right">工厂：</td>
							<td width="100px"><select id="factory" class="input-small"></select></td>
							<td width="80px" style="text-align: right">技能系数：</td>
							<td width="100px"><input type="text" id="skillParameter" placeholder="技能系数..." class="input-small"></input></td>
							<td width="80px" style="text-align: right">开始日期：</td>
							<td><input type="text" id="stratDate" class="input-small" placeholder="请选择日期..." onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /></td>
							<td width="80px" style="text-align: right">结束日期：</td>
							<td><input type="text" id="endDate" class="input-small" placeholder="请选择日期..." onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" /></td>
							<td>
								<input type="button" class="btn btn-success" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
								<input type="button" class="btn btn-info" id="btnAdd" value="增加" style="margin-left: 2px;"></input>
							</td>
						</tr>
					</table>
				</form>
				</div>
				<%-- <input type="hidden" id="d_workshop" value="<s:property value='user.workshop_org' />"> 
				<input type="hidden" id="d_workgroup" value="<s:property value='user.workgroup_org' />"> 
				<input type="hidden" id="d_team" value="<s:property value='user.team_org' />"> --%>
				
				<div>
					<div id="pagination" style="padding-top: 6px;padding-bottom: 1px;" class="pagination pagination-small pagination-right">
						<ul>
							<li id="downloadStaffInfo"><a href="#">总共<span total="" id="total">0</span>条记录
							</a></li>
						</ul>
						<ul>
							<li id="first"><a href="#">«</a></li>
							<li id="pre" class="prePage"><a href="#">&lt;</a></li>
							<li id="cur" class="active curPage" page=""><a href="#">-</a></li>
							<li id="next" class="nextPage"><a href="#">&gt;</a></li>
							<li id="last"><a href="#">»</a></li>
						</ul>
					</div>
					<table id="tableWorkTimePrice" style="text-align:center;font-size:12px;table-layout:fixed;" class="table table-bordered table-striped" > <!--  -->
						<thead>
							<tr id="">
								<th style="width:60px">序号</th>
								<td>工时类型</td>
								<td>生产工厂</td>
								<td>技能系数</td>
								<td>工时单价</td>
								<td>开始日期</td>
								<td>结束日期</td>
								<td>维护人</td>
								<td style="width:140px">维护时间</td>
								<td>操作</td>
							</tr>
						</thead>
						<tbody>	
						</tbody>
					</table>
				</div>
			</div>
			
			<!-- new order start -->
			<div class="modal" id="newModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
			    <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			        <h3>新增标准工时单价</h3>
			    </div>
			    <div class="modal-body">
			        <form id="  " class="form-horizontal">
			            <div class="control-group">
			                <label class="control-label" for="newWorkTimeType">*&nbsp;工时类型</label>
			                <div class="controls">
			                    <select name="" id="newWorkTimeType" class="input-medium carType">
								<option value='1'>奖惩</option>
								<option value='2'>额外</option>
								<option value='3'>技改</option>
								<option value='4'>等待</option>
								<option value='5'>节拍</option>
								</select>
			                </div>
			            </div>
			            <div class="control-group">
			                <label class="control-label" for="newFactory">*&nbsp;生产工厂</label>
			                <div class="controls">
			                    <select name="" id="newFactory" class="input-medium carType">
								</select>
			                </div>
			            </div>
			            <div class="control-group">
			                <label class="control-label" for="newSkillParameter">*&nbsp;技能系数</label>
			                <div class="controls">
			                    <input type="text" id="newSkillParameter" placeholder="技能系数..." class="input-medium" />
			                </div>
			            </div>
			            <div class="control-group">
			                <label class="control-label" for="newPrice">*&nbsp;工时单价/节拍</label>
			                <div class="controls">
			                    <input type="text" id="newPrice" placeholder="工时单价 /节拍..." class="input-medium" />
			                </div>
			            </div>
			            <div class="control-group">
			                <label class="control-label" for="newStartDate">*&nbsp;开始时间</label>
			                <div class="controls">
			                    <input type="text" id="newStartDate" placeholder="开始时间..." onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" class="input-medium" />
			                </div>
			            </div>
			            <div class="control-group">
			                <label class="control-label" for="newEndDate">*&nbsp;结束时间</label>
			                <div class="controls">
			                    <input type="text" id="newEndDate" placeholder="结束时间..." onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" class="input-medium" />
			                </div>
			            </div>
			        </form>
			    </div>
			    <div class="modal-footer">
			        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
			        <!-- <button class="btn btn-success" id="btnTest">TEST</button> -->
			        <button class="btn btn-primary" id="btnAddConfirm">确认</button>
			    </div>
			</div>
			<!-- new order End -->
			
			<!-- edit order start -->
			<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
			    <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			        <h3>编辑标准工时单价</h3>
			    </div>
			    <div class="modal-body">
			        <form id="  " class="form-horizontal">
			            <div class="control-group">
			                <label class="control-label" for="newWorkTimeType">*&nbsp;工时类型</label>
			                <div class="controls">
			                    <select name="" id="editWorkTimeType" class="input-medium carType">
								<option value='0'>节拍</option>
								<option value='1'>奖惩</option>
								<option value='2'>额外</option>
								<option value='3'>技改</option>
								<option value='4'>等待</option>
								</select>
								<input type="text" style="display:none" id="editPriceID" class="input-medium" />
			                </div>
			            </div>
			            <div class="control-group">
			                <label class="control-label" for="newFactory">*&nbsp;生产工厂</label>
			                <div class="controls">
			                    <select name="" id="editFactory" class="input-medium carType">
								</select>
			                </div>
			            </div>
			            <div class="control-group">
			                <label class="control-label" for="newSkillParameter">*&nbsp;技能系数</label>
			                <div class="controls">
			                    <input type="text" id="editSkillParameter" placeholder="技能系数..." class="input-medium" />
			                </div>
			            </div>
			            <div class="control-group">
			                <label class="control-label" for="newPrice">*&nbsp;工时单价/节拍</label>
			                <div class="controls">
			                    <input type="text" id="editPrice" placeholder="工时单价 /节拍..." class="input-medium" />
			                </div>
			            </div>
			            <div class="control-group">
			                <label class="control-label" for="newStartDate">*&nbsp;开始时间</label>
			                <div class="controls">
			                    <input type="text" id="editStartDate" placeholder="开始时间..." onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" class="input-medium" />
			                </div>
			            </div>
			            <div class="control-group">
			                <label class="control-label" for="newEndDate">*&nbsp;结束时间</label>
			                <div class="controls">
			                    <input type="text" id="editEndDate" placeholder="结束时间..." onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})" class="input-medium" />
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
			<!-- new order End -->
			
		</div>
	</div>
</body>