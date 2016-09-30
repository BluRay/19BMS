<%@ page language="java"  pageEncoding="utf-8"%>
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="css/leftsidebar.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/leftsidebar.js"></script>
<style type="text/css">
*{box-sizing: border-box;}
.main-menu > li > a > .text{
opacity:0
</style>
<%@ include file="../common/foot.jsp"%>
<!-- left sidebar -->
<div class="left-sidebar " >
	<ul class="main-menu" style="padding-left: 0px;padding-top: 0px;padding-right: 0px;margin-top: 0px;margin-left: 0px;margin-bottom: 10px;" >
		<li class="active">
			<a href="plan!index.action" class="js-sub-menu-toggle">
				<i class="fa fa-dashboard fa-fw"></i><span class="text">计划模块菜单</span>
			</a>
		</li>
		<li id="orderMaintain">
			<a href="plan!importMaster.action" class="js-sub-menu-toggle">
				<i class="fa fa-file-excel-o fa-fw"></i><span class="text">总计划导入</span>
			</a>
		</li>
		<li id="orderReview">
			<a href="plan!revision.action" class="js-sub-menu-toggle">
				<i class="fa fa-calendar-o fw"></i><span class="text">计划调整</span>
			</a>
		</li>
		<li id="orderConfig">
			<a href="plan!issuance.action" class="js-sub-menu-toggle">
				<i class="fa fa-calendar fw"></i><span class="text">计划发布</span>
			</a>
		</li>
		<li id="orderConfig">
			<a href="plan!plansearch.action" class="js-sub-menu-toggle">
				<i class="fa fa-list-alt fw"></i><span class="text">计划完成</span>
			</a>
		</li>
		<li id="orderSerach">
			<a href="plan!month.action">
				<i class="fa fa-search fa-fw"></i><span class="text">计划查询</span>
			</a>
		</li>
		<li id="orderSerach">
			<a href="plan!generatevin.action">
				<i class="fa fa-vine"></i><span class="text">生成VIN号</span>
			</a>
		</li>
		<li id="orderSerach">
			<a href="plan!busnumbersearch.action">
				<i class="fa fa-bold"></i><span class="text">车号查询</span>
			</a>
		</li>
		<li id="orderSerach">
			<a href="busDispatch!planListPage.action">
				<i class="fa fa-bus"></i><span class="text">发车</span>
			</a>
		</li>
		<li id="orderSerach">
			<a href="plan!bustransfer.action">
				<i class="fa fa-sign-out"></i><span class="text">半成品车调入/调出</span>
			</a>
		</li>
		<li id="orderSerach">
			<a href="plan!pausemanager.action">
				<i class="fa fa-step-forward"></i><span class="text">计划停线</span>
			</a>
		</li>
		<li id="orderSerach">
			<a href="plan!exceptionmanager.action">
				<i class="fa fa-exclamation-circle"></i><span class="text">生产异常处理</span>
			</a>
		</li>
		<li id="orderSerach">
			<a href="orderReport!orderIndex.action">
				<i class="fa fa-line-chart"></i><span class="text">计划报表</span>
			</a>
		</li>
	</ul>
	<div class="sidebar-minified js-toggle-minified">
		<i class="fa fa-angle-left"></i>
	</div>
</div>
<!-- end left sidebar -->
