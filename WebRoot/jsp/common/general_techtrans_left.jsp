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
			<a href="ecnDocument!maintain.action" class="js-sub-menu-toggle">
				<i class="fa fa-edit fa-fw"></i><span class="text">技改单维护</span>
			</a>
		</li>
		<li id="techtransConfig">
			<a href="ecnDocumentTask!maintain.action" class="js-sub-menu-toggle">
				<i class="fa fa-share-alt fw"></i><span class="text">技改任务分配</span>
			</a>
		</li>
		<li id="techtransFollow">
			<a href="ecnDocumentTask!taskFollowUpMaintain.action" class="js-sub-menu-toggle">
				<i class="fa fa-check-square-o fw"></i><span class="text">技改跟进</span>
			</a>
		</li>
		<li id="techtransWorkTime">
			<a href="ecnDocumentTask!worktimeMaintain.action" class="js-sub-menu-toggle">
				<i class="fa fa-calculator fw"></i><span class="text">技改工时维护</span>
			</a>
		</li>
		<li id="techtransWorkTime">
			<a href="ecnDocumentTask!worktimeVerify.action" class="js-sub-menu-toggle">
				<i class="fa fa-user fw"></i><span class="text">技改工时审核</span>
			</a>
		</li>
		<li id="techtransSerach">
			<a href="ecnDocumentTask!showEcnInformationList.action" class="js-sub-menu-toggle">
				<i class="fa fa-search fw"></i><span class="text">技改查询</span>
			</a>
		</li>
<!-- 		<li id="techtransSerach">
			<a href="swrNotice!showTechTransList.action" class="js-sub-menu-toggle">
				<i class="fa fa-search fw"></i><span class="text">技改工时查询</span>
			</a>
		</li> -->
		<li id="SWRMaintain">
			<a href="swrNotice!maintain.action" class="js-sub-menu-toggle">
				<i class="fa fa-file-text-o fa-fw"></i><span class="text">SWR通知单</span>
			</a>
		</li>
		<li id="techtransReport">
			<a href="ecnReport!ecnIndex.action">
				<i class="fa fa-line-chart fa-fw"></i><span class="text">技改报表</span>
			</a>
		</li>
	</ul>
	<div class="sidebar-minified js-toggle-minified">
		<i class="fa fa-angle-left"></i>
	</div>
</div>
<!-- end left sidebar -->