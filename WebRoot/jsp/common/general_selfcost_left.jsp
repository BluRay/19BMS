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
			<a href="selfcost!index.action" class="js-sub-menu-toggle">
				<i class="fa fa-dashboard fa-fw"></i><span class="text">成本模块菜单</span>
			</a>
		</li>
		<li id="orderMaintain">
			<a href="selfcost!singlebusmanufacturing.action" class="js-sub-menu-toggle">
				<i class="fa fa-file-excel-o fa-fw"></i><span class="text">单车制造月费用</span>
			</a>
		</li>
		<li id="orderReview">
			<a href="selfcost!classification.action" class="js-sub-menu-toggle">
				<i class="fa fa-file-image-o fw"></i><span class="text">成本要素分类</span>
			</a>
		</li>
		<li id="orderConfig">
			<a href="selfcost!schedule.action" class="js-sub-menu-toggle">
				<i class="fa fa-file-pdf-o fw"></i><span class="text">成本明细</span>
			</a>
		</li>
		<li id="orderConfig">
			<a href="costReport!costIndex.action" class="js-sub-menu-toggle">
				<i class="fa fa-line-chart fw"></i><span class="text">成本报表</span>
			</a>
		</li>
	</ul>
	<div class="sidebar-minified js-toggle-minified">
		<i class="fa fa-angle-left"></i>
	</div>
</div>
<!-- end left sidebar -->