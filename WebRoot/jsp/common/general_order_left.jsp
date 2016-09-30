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
<div class="left-sidebar " >
	<ul class="main-menu" style="padding-left: 0px;padding-top: 0px;padding-right: 0px;margin-top: 0px;margin-left: 0px;margin-bottom: 10px;" >
		<li class="active">
			<a href="order!index.action" class="js-sub-menu-toggle">
				<i class="fa fa-dashboard fa-fw"></i><span class="text">订单模块菜单</span>
			</a>
		</li>
		<li id="orderMaintain">
			<a href="order!maintain.action" class="js-sub-menu-toggle">
				<i class="fa fa-edit fa-fw"></i><span class="text">订单维护</span>
			</a>
		</li>
		<li id="orderReview">
			<a href="order!review.action" class="js-sub-menu-toggle">
				<i class="fa fa-user fw"></i><span class="text">订单评审</span>
			</a>
		</li>
		<li id="orderConfig">
			<a href="order!config.action" class="js-sub-menu-toggle">
				<i class="fa fa-cog fw"></i><span class="text">订单配置</span>
			</a>
		</li>
		<li id="orderConfig">
			<a href="order!configAllot.action" class="js-sub-menu-toggle">
				<i class="fa fa-share-alt fw"></i><span class="text">订单配置分配</span>
			</a>
		</li>
		<li id="orderSerach">
			<a href="order!ordersearch.action">
				<i class="fa fa-search fa-fw"></i><span class="text">订单查询</span>
			</a>
		</li>
	</ul>
	<div class="sidebar-minified js-toggle-minified">
		<i class="fa fa-angle-left"></i>
	</div>
</div>
<!-- end left sidebar -->