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
<div class="left-sidebar" >
	<ul class="main-menu" style="padding-left: 0px;padding-top: 0px;padding-right: 0px;margin-top: 0px;margin-left: 0px;margin-bottom: 10px;" >
		<li class="active">
			<a href="#" class="js-sub-menu-toggle">
				<i class="fa fa-dashboard fa-fw"></i><span class="text">报表模块</span>
			</a>
		</li>
		<li >
			<a href="orderReport!orderIndex.action" class="js-sub-menu-toggle">
				<i class="fa fa-clipboard fa-fw"></i><span class="text">订单&计划分析报表</span>
			</a>
		</li>
		<li >
			<a href="productionReport!productionIndex.action" class="js-sub-menu-toggle">
				<i class="fa fa-clipboard fa-fw"></i><span class="text">生产分析报表</span>
			</a>
		</li>
		<li >
			<a href="ecnReport!ecnIndex.action" class="js-sub-menu-toggle">
				<i class="fa fa-clipboard fa-fw"></i><span class="text">技改分析报表</span>
			</a>
		</li>
		<li >
			<a href="qualityReport!qualityIndex.action" class="js-sub-menu-toggle">
				<i class="fa fa-clipboard fa-fw"></i><span class="text">品质分析报表</span>
			</a>
		</li>
		<li >
			<a href="costReport!costIndex.action" class="js-sub-menu-toggle">
				<i class="fa fa-clipboard fa-fw"></i><span class="text">成本分析报表</span>
			</a>
		</li>
		<li >
			<a href="afterSaleReport!afterSaleIndex.action" class="js-sub-menu-toggle">
				<i class="fa fa-clipboard fa-fw"></i><span class="text">售后分析报表</span>
			</a>
		</li>
	</ul>
	<div class="sidebar-minified js-toggle-minified">
		<i class="fa fa-angle-left"></i>
	</div>
</div>
<!-- end left sidebar -->
