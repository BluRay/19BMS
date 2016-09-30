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
			<a href="#" class="js-sub-menu-toggle">
				<i class="fa fa-dashboard fa-fw"></i><span class="text">系统设置模块菜单</span>
			</a>
		</li>
		<li id="orderMaintain">
			<a href="baseData!index.action" class="js-sub-menu-toggle">
				<i class="fa fa-clipboard fa-fw"></i><span class="text">工厂</span>
			</a>
		</li>
		<li id="orderReview">
			<a href="workshop!workshop.action" class="js-sub-menu-toggle">
				<i class="fa fa-bar-chart-o fw"></i><span class="text">车间</span>
			</a>
		</li>
		<li id="orderConfig">
			<a href="workgroup!workgroup.action" class="js-sub-menu-toggle">
				<i class="fa fa-edit fw"></i><span class="text">班组</span>
			</a>
		</li>
		<li id="orderReview">
			<a href="line!line.action" class="js-sub-menu-toggle">
				<i class="fa fa-bar-chart-o fw"></i><span class="text">线别</span>
			</a>
		</li>
		<li id="orderConfig">
			<a href="process!process.action" class="js-sub-menu-toggle">
				<i class="fa fa-edit fw"></i><span class="text">工序</span>
			</a>
		</li>
		<li id="orderConfig">
			<a href="hz!hz.action" class="js-sub-menu-toggle">
				<i class="fa fa-list-alt fw"></i><span class="text">频率</span>
			</a>
		</li>
		<li id="orderSerach">
			<a href="busType!busType.action" class="js-sub-menu-toggle" >
				<i class="fa fa-puzzle-piece fa-fw"></i><span class="text">车型</span>
			</a>
		</li>
		<li id="orderSerach">
			<a href="parts!parts.action" class="js-sub-menu-toggle" >
				<i class="fa fa-money"></i><span class="text">零部件</span>
			</a>
		</li>
		<li id="orderSerach">
			<a href="keys!keys.action" class="js-sub-menu-toggle" >
				<i class="fa fa-tachometer"></i><span class="text">弹性键</span>
			</a>
		</li>
	</ul>
	<div class="sidebar-minified js-toggle-minified">
		<i class="fa fa-angle-left"></i>
	</div>
</div>
<!-- end left sidebar -->