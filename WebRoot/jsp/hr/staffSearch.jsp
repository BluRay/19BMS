<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<title>员工库查询</title>
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/bootstrap-responsive.css" rel="stylesheet">
	<link href="css/common.css" rel="stylesheet">
	
	<link href="js/datatables/css/jquery.dataTables.min.css" rel="stylesheet">
	
	<link href="css/orgStructure.css" rel="stylesheet">
	
	<link rel="stylesheet" href="js/jquery/ui-lightness/jquery-ui-1.10.2.custom.css" />
	<link href="js/primitives/primitives.latest.css" media="screen" rel="stylesheet" type="text/css" />
	
	 <link rel="stylesheet" href="css/zTreeStyle/metro.css" type="text/css">
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
	 </style>
	
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/jquery/jquery-ui-1.10.2.custom.min.js"></script>
	 
	<script type="text/javascript" src="js/ztree/jquery.ztree.core-3.5.min.js"></script>
	
	<script type="text/javascript" src="js/jquery.form.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/velocity.min.js"></script>
	<script type="text/javascript" src="js/velocity.ui.min.js"></script>
	
	<!-- 测试 -->
	<!--<script type="text/javascript" src="js/hr/standardPosition.js"></script>-->
	<!--<script type="text/javascript" src="js/hr/staffSearch.js"></script>-->
	
	<script type="text/javascript" src="js/hr/staffSearch.js"></script>

	
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_hr_left.jsp"%>
	
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="container">
			<legend id="leg">员工库
				<span class="pull-right"><a class="" href=""><i class="fa fa-link"></i>&nbsp;员工库修改</a>&nbsp;&nbsp;</span>
			</legend>	
			    <div id="zztree" style="position:relative;left:0; float:left; width:230px; height:500px;border:1px solid #ccebf8;">
					<ul id="treeDemo" class="ztree"></ul>
				</div>
				
			<div class="" style="margin-left:235px;">
					<form id="form" class="well form-search">
					<table  cellpadding="5" >
						<tr>
							<td>部门/科室/班组</td>
							<td colspan="2"><input style="height: 30px;" type="text" class="input-medium revise" placeholder="" id="" /></td>
							<td>工号</td>
							<td><input style="height: 30px;" type="text" class="input-small carSeries" placeholder="" id="" /></td>
							<td>姓名</td>
							<td><input style="height: 30px;" type="text" class="input-small carSeries" placeholder="" id="" /></td>
							<td>在职</td>
							<td><select name="" id="" class="input-small carSeries">
								<option value="">全部</option><option value="">在职</option><option value="">离职</option>
							</select></td>
							<td rowspan="2"><input type="button" class="btn btn-primary" id="btnQuery" value="查询" style="margin-left: 2px;"></input></td>
						</tr>
						<tr>
							<td>岗位</td>
							<td><select name="" id="" class="input-small carSeries">
								<option value="">全部</option><option value="">管理类</option><option value="">技术专家</option><option value="">技能型</option><option value="">操作型</option>
							</select></td>
							<td><select name="" id="" class="input-small carSeries">
								<option value="">全部</option><option value="">总经理</option><option value="">经理</option><option value="">厂长</option><option value="">科长</option>
								<option value="">车间主任</option><option value="">主任科员</option><option value="">高级工程师</option><option value="">工程师</option><option value="">科员</option>
								<option value="">助理工程师</option><option value="">管理员</option><option value="">技工</option><option value="">辅助工</option><option value="">车间辅助工</option>
							</select></td>
							<td colspan="2"><input style="height: 30px; width:130px;" type="text" class="input-medium revise" placeholder="--岗位名称--" id="" /></td>
							<td>计资方式</td>
							<td><select name="" id="" class="input-small carSeries">
								<option value="">全部</option><option value="">计件</option><option value="">计时</option>
							</select></td>
							<td>级别</td>
							<td><select name="" id="" class="input-small carSeries">
								<option value="">全部</option><option value="">B</option><option value="">C</option><option value="">D</option><option value="">E</option>
								<option value="">F</option><option value="">G</option><option value="">H</option><option value="">I</option>
							</select></td>
						</tr>
					</table>
					</form>
					
				<div id="pagination" class="pagination pagination-small pagination-right" style=" margin-bottom:10px;">
					<ul style="margin-right:550px">
						<li id=""><a href="">共计<span total="" id=""></span>人</a></li>
					</ul>
					<ul>
						<li id="export"><a href="">导出全部<span total="" id="total"></span>条记录
						</a></li>
					</ul>
					<ul>
						<li id="first"><a href="#">«</a></li>
						<li id="pre" class="prePage"><a href="#">&lt;</a></li>
						<li id="cur1" class="active curPage" page=""><a href="#"></a></li>
						<li id="cur2" class="active curPage" page=""><a href="#"></a></li>
						<li id="cur3" class="active curPage" page=""><a href="#"></a></li>
						<li id="cur4" class="active curPage" page=""><a href="#"></a></li>
						<li id="cur5" class="active curPage" page=""><a href="#"></a></li>
						<li id="cur6" class="active curPage" page=""><a href="#"></a></li>
						<li id="next" class="nextPage"><a href="#">&gt;</a></li>
						<li id="last"><a href="#">»</a></li>
					</ul>
					<ul>
						<li id="" class=""><span style="padding:0px;"><input style="height:24px; width:30px; border-width:0px;" type="text" class="input-medium revise" id="" /></span></li>
						<li id="" class=""><span >页</span></li>
						<li id="" class=""><span style="padding:0px;"><select name="" id="" style="height:24px; width:70px; margin:0px; border-width:0px;" class="input-medium revise"></span></li>
					</ul>
				</div>
				
				<div style="overflow:scroll;word-break:break-all; width:1110px;">
				<table id="" style="text-align:center;font-size:12px;table-layout:fixed;" class="table table-bordered table-striped" >
					<thead>
						<tr id="">
							<th style="text-align:center;width:100px" >工号</th>
							<th style="text-align:center;width:100px">姓名</th>
							<th style="text-align:center;width:80px">性别</th>
							<th style="text-align:center;width:140px">出生日期</th>
							<th style="text-align:center;width:80px">年龄</th>
							<th style="text-align:center;width:80px">最高学历</th>
							<th style="text-align:center;width:140px">应届生届别</th>
							<th style="text-align:center;width:80px">政治面貌</th>
							<th style="text-align:center;width:140px">身份证</th>
							<th style="text-align:center;width:140px">入厂时间</th>
							<th style="text-align:center;width:80px">级别</th>
							<th style="text-align:center;width:140px">技能系数</th>
							<th style="text-align:center;width:100px">计资方式</th>
							<th style="text-align:center;width:140px">事业部</th>
							<th style="text-align:center;width:140px">工厂/所/中心</th>
							<th style="text-align:center;width:140px">部门</th>
							<th style="text-align:center;width:100px">车间/科室</th>
							<th style="text-align:center;width:100px">班组</th>
							<th style="text-align:center;width:100px">小班组</th>
							<th style="text-align:center;width:100px">岗位名称</th>
							<th style="text-align:center;width:110px">员工在离职状态</th>
							<th style="text-align:center;width:100px">离职方式</th>
							<th style="text-align:center;width:140px">离职日期</th>
							<th style="text-align:center;width:140px">离职原因</th>
							<th style="text-align:center;width:140px">入职渠道</th>
							<th style="text-align:center;width:140px">原公司</th>
							<th style="text-align:center;width:140px">原公司离职原因</th>
							<th style="text-align:center;width:140px">联系方式</th>
							<th style="text-align:center;width:140px">家庭住址</th>
							<th style="text-align:center;width:100px">员工组</th>
							<th style="text-align:center;width:80px">岗位级别</th>
							<th style="text-align:center;width:80px">民族</th>
							<th style="text-align:center;width:140px">法人</th>
							<th style="text-align:center;width:140px">工作地点编码</th>
						</tr>
					</thead>
					<tbody>	
					</tbody>
				</table>
				</div>
					
			</div>
				
				
				
			</div>
		</div>
	</div>
	
	
	
</body>
</html>