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
			<a href="ecnDocument!index.action" class="js-sub-menu-toggle">
				<i class="fa fa-dashboard fa-fw"></i><span class="text">技改模块菜单</span>
			</a>
		</li>
		<li id="techtransMaintain">
			<a href="techTask!taskMaintainPage.action" class="js-sub-menu-toggle">
				<i class="fa fa-edit fa-fw"></i><span class="text">技改任务维护</span>
			</a>
		</li>
		<li id="techtransConfig">
			<a href="techTask!taskAssignPage.action" class="js-sub-menu-toggle">
				<i class="fa fa-share-alt fw"></i><span class="text">技改任务分配</span>
			</a>
		</li>
		<li id="techtransConfig">
			<a href="techTask!taskAssignPrePage.action" class="js-sub-menu-toggle">
				<i class="fa fa-share-alt fw"></i><span class="text">技改任务分配-前段</span>
			</a>
		</li>
		<li id="techtransTime">
			<a href="techTask!techTaskMaterialCheck" class="js-sub-menu-toggle">
				<i class="fa fa-share-alt fw"></i><span class="text">技改物料确认</span>
			</a>
		</li>
		<li id="techtransFollow">
			<a href="techTask!workHourEstimatePage.action" class="js-sub-menu-toggle">
				<i class="fa fa-check-square-o fw"></i><span class="text">工时评估</span>
			</a>
		</li>
		<li id="techtransWorkTime">
			<a href="techTask!followingUpPage.action" class="js-sub-menu-toggle">
				<i class="fa fa-calculator fw"></i><span class="text">技改跟进</span>
			</a>
		</li>
		<li id="techtransWorkTime">
			<a href="techTask!worktimeMaintain.action" class="js-sub-menu-toggle">
				<i class="fa fa-user fw"></i><span class="text">技改工时维护</span>
			</a>
		</li>
		<li id="techtransSerach">
			<a href="techTask!worktimeVerify.action" class="js-sub-menu-toggle">
				<i class="fa fa-search fw"></i><span class="text">技改工时审核</span>
			</a>
		</li>
		<li id="SWRMaintain">
			<a href="techTask!taskSearch.action" class="js-sub-menu-toggle">
				<i class="fa fa-file-text-o fa-fw"></i><span class="text">技改查询</span>
			</a>
		</li>
		<li id="techtransReport">
			<a href="">
				<i class="fa fa-line-chart fa-fw"></i><span class="text">技改成本</span>
			</a>
		</li>
		<li id="techtransReport">
			<a href="">
				<i class="fa fa-line-chart fa-fw"></i><span class="text">技改情况汇总</span>
			</a>
		</li>
		<li id="techtransReport">
			<a href="">
				<i class="fa fa-line-chart fa-fw"></i><span class="text">分类型变更汇总</span>
			</a>
		</li>
	</ul>
	<div class="sidebar-minified js-toggle-minified">
		<i class="fa fa-angle-left"></i>
	</div>
</div>
<!-- end left sidebar -->