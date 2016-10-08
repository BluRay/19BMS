<%@ page language="java" pageEncoding="utf-8"%>
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="css/leftsidebar.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/leftsidebar.js"></script>
<style type="text/css">
* {
	box-sizing: border-box;
}

.main-menu>li>a>.text {
	opacity: 0
}
</style>
<%@ include file="../common/foot_hr.jsp"%>
<!-- left sidebar -->
<div class="left-sidebar ">
	<ul class="main-menu"
		style="padding-left: 0px; padding-top: 0px; padding-right: 0px; margin-top: 0px; margin-left: 0px; margin-bottom: 10px;">
		<li class="active"><a href="personnel!index.action"
			class="js-sub-menu-toggle"> <i class="fa fa-dashboard fa-fw"></i><span
				class="text">人事模块菜单</span>
		</a></li>
		<li id='hrPlan'><a href="#hr_plan" data-toggle="collapse" class="treemenu">
				<i class="fa fa-file-text-o fa-fw"></i><span class="text">人力资源规划</span>
				<span class="pull-right fa fa-angle-down fa-lg"></span>
		</a>
			<ul id="hr_plan" class="collapse">
				<li><a href="orgData!index.action"><i
						class="fa fa-sitemap"></i>&nbsp;组织结构</a></li>
				<li><a href="orgData!positionSystem.action"
					class="js-sub-menu-toggle"> <i class="fa fa-caret-up fa-2x"></i><span
						class="text">发展渠道/标准岗位库</span>
				</a></li>
				<li id="orderReview"><a href="orgData!standardPosition.action"
					class="js-sub-menu-toggle"> <i class="fa fa-list-ul"></i><span
						class="text">部门标准岗位</span>
				</a></li>
				<li><a href="standardWorkGroup!index.action" class="js-sub-menu-toggle">
						<i class="fa fa-group"></i><span class="text">标准班组</span>
				</a></li>
				<li><a href="hr!workgroupPrice.action" class="js-sub-menu-toggle">
						<i class="fa fa-calendar"></i><span class="text">班组承包单价</span>
				</a></li>
				<li><a href="staff!staffDistribution.action" class="js-sub-menu-toggle">
						<i class="fa fa-user-md fw"></i><span class="text">班组成员承包单价</span>
				</a></li>
	<!-- 			<li><a href="standardTimeAndPrice!queryIndex.action" class="js-sub-menu-toggle">
						<i class="fa fa-search"></i><span class="text">计件工时单价查询</span>
				</a></li> -->
				<li><a href="hr!workTimePrice.action" class="js-sub-menu-toggle">
						<i class="fa fa-tasks"></i><span class="text">标准工时单价维护</span>
				</a></li>
				<li><a href="orgData!standardHuman.action" class="js-sub-menu-toggle">
						<i class="fa fa-list-ul"></i><span class="text">标准人力</span>
				</a></li>
				<li><a href="orgData!humanConfiguration.action" class="js-sub-menu-toggle">
						<i class="fa fa-table fw"></i><span class="text">人力配置</span>
				</a></li>
				<li id=""><a href="orgData!factoryCapacity.action" class="js-sub-menu-toggle">
						<i class="fa fa-bell-o"></i><span class="text">工厂产能维护</span></a></li>
				<li><a href="staff!staffManager.action" class="js-sub-menu-toggle">
						<i class="fa fa-user-md fw"></i><span class="text">员工库</span>
				</a></li>
				<li><a href="orgData!isCustomer.action" class="js-sub-menu-toggle">
						<!-- <i class="fa fa-user-md fw"></i> --><span class="text">自编号维护</span>
				</a></li>
			</ul></li>
			
		<li id="hrPiece"><a href="#hr_pecie" data-toggle="collapse" class="treemenu">
				<i class="fa fa-file-text-o fa-fw"></i><span class="text">计件工资</span>
				<span class="pull-right fa fa-angle-down fa-lg"></span>
		</a>
			<ul id="hr_pecie" class="collapse">
				<!-- <li id=""><a href="staff!queryStaffSkillParameterIndex.action" class="js-sub-menu-toggle">
						<i class="fa fa-stethoscope"></i><span class="text">员工技能系数</span></a></li> -->
				<li><a href="hr!attendance.action?model=hr"><i
						class="fa fa-bar-chart-o fw"></i>&nbsp;考勤查询</a></li>
				<li><a href="hr!rewardsCollect.action"
					class="js-sub-menu-toggle"> <i class="fa fa-th fa-fw"></i><span
						class="text">奖惩汇总</span>
				</a></li>
				<!--<li id="orderReview"><a href="hr!rewardspunishment.action"
					class="js-sub-menu-toggle"> <i class="fa fa-qrcode"></i><span
						class="text">车间奖惩维护</span>
				</a></li>
				 <li><a href="ocIn!index.action" class="js-sub-menu-toggle">
						<i class="fa fa-edit fw"></i><span class="text">车间奖惩明细</span>
				</a></li> -->
				<li><a href="hr!waitmanhourStatistic.action" class="js-sub-menu-toggle">
						<i class="fa fa-bars"></i><span class="text">等待工时统计</span>
				</a></li>
				<li><a href="hrReport!ecnReport.action" class="js-sub-menu-toggle">
						<i class="fa fa-tasks"></i><span class="text">技改工时统计</span>
				</a></li>
				<li><a href="hrReport!tmpReport.action" class="js-sub-menu-toggle">
						<i class="fa fa-th-large"></i><span class="text">额外工时统计</span>
				</a></li>
				<li><a href="hrReport!pieceTimeReport.action" class="js-sub-menu-toggle">
						<i class="fa fa-list-alt"></i><span class="text">计件工时统计</span>
				</a></li>
				<li><a href="hrReport!workTimeReport.action" class="js-sub-menu-toggle">
						<i class="fa fa-th-list"></i><span class="text">工时统计报表</span>
				</a></li>
				<li><a href="hrReport!pieceSalaryPage.action" class="js-sub-menu-toggle">
						<i class="fa fa-jpy"></i><span class="text">计件工资提交</span>
				</a></li>
				<li><a href="hrReport!pieceSalaryBalancePage.action" class="js-sub-menu-toggle">
						<i class="fa fa-jpy"></i><span class="text">计件工资结算</span>
				</a></li>
			</ul></li>
			
	</ul>
	<div class="sidebar-minified js-toggle-minified">
		<i class="fa fa-angle-left"></i>
	</div>
</div>
<!-- end left sidebar -->