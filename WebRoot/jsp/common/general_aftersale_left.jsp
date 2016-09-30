
<%@ page language="java"  pageEncoding="utf-8"%>
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="css/leftsidebar.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/leftsidebar.js"></script>
<style type="text/css">
*{box-sizing: border-box;}
.main-menu > li > a > .text{
opacity:0
}
</style>
<%@ include file="../common/foot.jsp"%>
<!-- left sidebar -->
<div class="left-sidebar" >
	<ul class="main-menu" style="padding-left: 0px;padding-top: 0px;padding-right: 0px;margin-top: 0px;margin-left: 0px;margin-bottom: 10px;" >
		<li class="active">
			<a href="afterSale!index.action" class="js-sub-menu-toggle">
				<i class="fa fa-dashboard fa-fw"></i><span class="text">售后模块菜单</span>
			</a>
		</li>
		<li id="orderMaintain">
			<a href="afterSale!afterSaleProblem.action" class="js-sub-menu-toggle">
				<i class="fa fa-edit fa-fw"></i><span class="text">售后问题登记</span>
			</a>
		</li>
		<li id="orderReview">
			<a href="afterSale!improveReport.action" class="js-sub-menu-toggle">
				<i class="fa fa-book fw"></i><span class="text">问题改善报告</span>
			</a>
		</li>
		<li id="orderConfig">
			<a href="afterSale!queryAfterSaleProblems.action" class="js-sub-menu-toggle">
				<i class="fa fa-search fw"></i><span class="text">售后问题查询</span>
			</a>
		</li>
		<li id="orderConfig">
			<a href="afterSaleReport!afterSaleIndex.action" class="js-sub-menu-toggle">
				<i class="fa fa-line-chart fw"></i><span class="text">报表</span>
			</a>
		</li>
	</ul>
	<div class="sidebar-minified js-toggle-minified">
		<i class="fa fa-angle-left"></i>
	</div>
</div>
<!-- end left sidebar -->