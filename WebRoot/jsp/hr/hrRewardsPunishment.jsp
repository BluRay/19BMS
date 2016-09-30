<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>车间奖惩</title>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/common.css" rel="stylesheet">
<link href="js/datatables/css/jquery.dataTables.min.css" rel="stylesheet">
<link rel="stylesheet" href="js/jquery/ui-lightness/jquery-ui-1.10.2.custom.css" />
<link href="js/primitives/primitives.latest.css" media="screen" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="css/zTreeStyle/metro.css" type="text/css">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery/jquery-ui-1.10.2.custom.min.js"></script>
<script type="text/javascript" src="js/ztree/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/velocity.min.js"></script>
<script type="text/javascript" src="js/velocity.ui.min.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/hr/rewards.js"></script>
<style type="text/css">
	.bp-title {
	    padding: 2px 0px 0px 5px;
	}
	.btn {
	    padding: 1px 12px 3px 11px;
	}
	input[type="text"] {
	    margin-bottom: 0px;
	}
	.well {
	    margin-bottom: 10px;
	}
	.section-head {
	    border-left: 7px solid #000;
	    padding-left: 10px;
	    margin-bottom: 20px;
	}
</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;"><span id="staffListTitle" style="font-size: 17px;">奖惩：第十九事业部</span></legend><br/>	
			    <div id="zztree" style="position:relative;left:0; float:left; width:230px; height:500px;border:1px solid #ccebf8;overflow:auto;">
					<ul id="staffTree" class="ztree"></ul>
				</div>
			
			<div style="margin-left: 235px;margin-top: -20px;"><br/>
				<form id="form" class="well form-search" style="margin: 0px;padding: 8px;">
					<table style="width: 100%;margin: 0px;">
						<tr>
							<td style="padding-top: 8px;width: 50px;">工号：</td>
							<td style="padding-top: 8px;width: 120px;"><input id="staff_number" placeholder="工号或姓名..." style="height: 30px;width: 120px;" type="text" class="input-small carSeries" /></td>
							<td style="padding-top: 8px;width: 50px;">月份：</td>
							<td style="padding-top: 8px;width: 120px;"><input id="staff_date" placeholder="月份..." 
								onclick="WdatePicker({el:'staff_date',dateFmt:'yyyy-MM'});" style="height: 30px;width: 100px;" type="text" class="input-small carSeries" /></td>
							<td style="padding-top: 8px;">
								<input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input>
								<input id="btnAdd" type="button" class="btn btn-info" value="新增"></input>
								<input type="button" class="btn btn-success" id="btnBulkAdd" value="导入" style="margin-left: 2px;"></input>
							</td>
						</tr>
					</table>
				</form>
				<div id="divBulkAdd" class="thumbnail" style="display:none;height: 95px;margin-top: 10px;">
					<h5 align="left">奖惩数据导入</h5>
					<form id="rewardUploadForm" enctype="multipart/form-data" method="post" class="form-horizontal">
						<input id="file" type="file" class="btn btn-info btn-small" name="file" accept="*.xlsx"/>
						<input id="btn_upload" type="submit" class="btn btn-primary" value="上传并导入" onclick="javascript:return LimitAttach(this.form, this.form.file.value)"/> &nbsp;&nbsp;&nbsp;&nbsp;
						<a href="download/reward_upload.xlsx">下载批导模板</a>
					</form>
	            </div>
	            
	            <div id="tableDiv">
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
					<div style="overflow-x:scroll;word-break:break-all;height: 390px;">
						<div style="display: none;position:fixed;z-index:999;margin-top:140px;margin-left:400px" class="divLoading" >
                          	<span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
                    	</div>  
						<table id="attendanceTable" style="text-align:center;font-size:12px;table-layout:fixed;" class="table table-bordered table-striped" > <!--  -->
							<thead>
								<tr id="">
									<th style="text-align:center;width:25px;padding-left:0px;padding-right:0px;">序号</th>
									<th style="text-align:center;width:40px">工号</th>
									<th style="text-align:center;width:40px;">姓名</th>
									<th style="text-align:center;width:40px;padding-left:0px;padding-right:0px;">奖惩工厂</th>
									<th style="text-align:center;width:40px;padding-left:0px;padding-right:0px;">奖惩车间</th>
									<th style="text-align:center;width:50px;">日期</th>
									<th style="text-align:center;width:130px;">事由</th>
									<th style="text-align:center;width:30px;">奖励</th>
									<th style="text-align:center;width:30px;">扣分</th>
									<th style="text-align:center;width:40px;">班组长</th>
									<th style="text-align:center;width:30px;">领班</th>
									<th style="text-align:center;width:50px;padding-left:0px;padding-right:0px;">处罚建议人</th>
									<th style="text-align:center;width:30px;">操作</th>
								</tr>
							</thead>
							<tbody>	
							</tbody>
						</table>
					</div>
				</div>
	           
				
			</div>
			
		</div>
		
<!-- new order start -->
<div class="modal" id="newModal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>新增奖惩数据</h3>
    </div>
    <div class="modal-body">
        <form id="  " class="form-horizontal">
            <div class="control-group">
                <label class="control-label" for="newOrderName">*&nbsp;工号</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="工号..." id="new_staff_number"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;姓名</label>
                <div class="controls">
                   <input type="text" disabled="disabled" class="input-medium"  placeholder="姓名..." id="new_staff_name"/> 输入工号后自动获取
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;奖惩工厂</label>
                <div class="controls">
                   	<select id="new_staff_Factory" name="new_staff_Factory" class="input-medium revise">
						<option value="">请选择</option>
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="newOrderCode">*&nbsp;奖惩车间</label>
                <div class="controls">
                	<select id="new_staff_Workshop" name="new_staff_Workshop" class="input-medium revise">
						<option value="">请选择</option>
					</select>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="order_qty">*&nbsp;奖惩日期</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="奖惩日期..." id="new_rewards_date" onClick="WdatePicker({el:'new_rewards_date',dateFmt:'yyyy-MM-dd'});"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="productive_year">*&nbsp;奖惩事由</label>
                <div class="controls">
                    <textarea class="input-xlarge" id="new_reasons" rows="1"></textarea>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">&nbsp;奖励</label>
                <div class="controls">
                    <input type="text" class="input-small" id="new_add"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">&nbsp;扣分</label>
                <div class="controls">
                    <input type="text" class="input-small" id="new_deduct"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">*&nbsp;班组长</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="班组长..." id="new_group_leader"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">&nbsp;领班</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="领班..." id="new_gaffer"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="">&nbsp;处罚建议人</label>
                <div class="controls">
                    <input type="text" class="input-medium" placeholder="处罚建议人..." id="new_proposer"/>
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
<!-- new order end -->
		
		
	</div>
	</div>
</body>
</html>