<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>车间奖惩汇总</title>
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
<script type="text/javascript" src="js/hr/rewardsCollect.js"></script>
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
	<%@ include file="../common/general_hr_left.jsp"%>
	
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;"><span id="staffListTitle" style="font-size: 17px;">车间奖惩汇总：第十九事业部</span></legend><br/>	
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
							</td>
						</tr>
					</table>
				</form>
	            
	            <div id="tableDiv">
				 <%--    <div id="pagination" style="padding-top: 6px;padding-bottom: 1px;" class="pagination pagination-small pagination-right">
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
					</div> --%>
					<div style="overflow-x:scroll;word-break:break-all;height: 390px;margin-top: 30px;">
						<div style="display: none;position:fixed;z-index:999;margin-top:140px;margin-left:400px" class="divLoading" >
                          <span><i class="fa fa-spinner fa-spin fa-4x" style="height:1em;"></i></span>
                   		</div>  
						<table id="attendanceTable" style="text-align:center;font-size:12px;table-layout:fixed;" class="table table-bordered table-striped" > <!--  -->
							<thead>
								<tr id="">
									<th style="text-align:center;width:20px;padding-left:0px;padding-right:0px">序号</th>
									<th style="text-align:center;width:40px;padding-left:0px;padding-right:0px">工号</th>
									<th style="text-align:center;width:40px;padding-left:0px;padding-right:0px;">姓名</th>
									<th style="text-align:center;width:80px;padding-left:0px;padding-right:0px;">班组</th>
									<th style="text-align:center;width:100px;padding-left:0px;padding-right:0px;">小班组</th>
									<th style="text-align:center;width:50px;padding-left:0px;padding-right:0px;">奖惩工厂</th>
									<th style="text-align:center;width:50px;padding-left:0px;padding-right:0px;">奖惩车间</th>
									<th style="text-align:center;width:50px;padding-left:0px;padding-right:0px;">正常考<br>核分数</th>
									<th style="text-align:center;width:30px;padding-left:0px;padding-right:0px;">加分</th>
									<th style="text-align:center;width:40px;padding-left:0px;padding-right:0px;">扣分</th>
									<th style="text-align:center;width:60px;padding-left:0px;padding-right:0px;">本月车间<br>考核分数</th>
<!-- 									<th style="text-align:center;width:45px;padding-left:0px;padding-right:0px;">奖惩明细</th> -->
					
					<th style="text-align:center;width:130px;">事由</th>
					<th style="text-align:center;width:50px;">日期</th>
					<th style="text-align:center;width:40px;">班组长</th>
					<th style="text-align:center;width:30px;">领班</th>
					<th style="text-align:center;width:50px;">处罚建议人</th>
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
<div class="modal" id="detailModal" tabindex="-1" role="dialog" aria-hidden="true" style="width:800px;margin-left:-400px;display:none;">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3>奖惩详情</h3>
    </div>
    <div class="modal-body">
        <table id="attendanceDetailTable" style="text-align:center;font-size:12px;table-layout:fixed;" class="table table-bordered table-striped" > <!--  -->
			<thead>
				<tr id="">
					<th style="text-align:center;width:25px">序号</th>
					<th style="text-align:center;width:40px">工号</th>
					<th style="text-align:center;width:30px;">姓名</th>
					<th style="text-align:center;width:50px;">日期</th>
					<th style="text-align:center;width:130px;">事由</th>
					<th style="text-align:center;width:30px;">奖励</th>
					<th style="text-align:center;width:30px;">减分</th>
					<th style="text-align:center;width:40px;">班组长</th>
					<th style="text-align:center;width:30px;">领班</th>
					<th style="text-align:center;width:50px;">处罚建议人</th>
				</tr>
			</thead>
			<tbody>	
			</tbody>
		</table>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
    </div>
</div>
<!-- new order end -->
		
	</div>
	</div>
	<script>
var $table = $('#table'),$remove = $('#remove'),selections = [];
</script>
</body>
</html>