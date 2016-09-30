<%@ page language="java" pageEncoding="utf-8"%>
<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
<link href="css/leftsidebar.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/leftsidebar.js"></script>
<style type="text/css">
* {
	box-sizing: border-box;
}

/* background-color: #f1f6fb; */
</style>
<%@ include file="../common/foot.jsp"%>
<!-- left sidebar -->
<div class="left-sidebar">
	<ul class="main-menu"
		style="padding-left: 0px; padding-top: 0px; padding-right: 0px; margin-top: 0px; margin-left: 0px; margin-bottom: 10px;">
		<li class="active"><a href="#" class="js-sub-menu-toggle"> <i
				class="fa fa-dashboard fa-fw"></i><span class="text">品质模块菜单</span>
		</a></li>
		<li id="qc_in"><a href="#qc_record_in" data-toggle="collapse" class="treemenu"> <i
				class="fa fa-file-text-o fa-fw"></i><span class="text">品质数据录入</span> <span
				class="pull-right fa fa-angle-down fa-lg"></span>
		</a>
			<ul id="qc_record_in" class="collapse">
				<li><a href="testRecordIn!index.action"><i
						class="fa fa-bar-chart-o fw"></i>&nbsp;检验记录录入</a></li>
				<li><a href="testFlowCardIn!index.action"
					class="js-sub-menu-toggle"> <i class="fa fa-th fa-fw"></i><span
						class="text">检验流程卡录入</span>
				</a></li>
				<li id="orderReview"><a href="prodTrackIn!index.action"
					class="js-sub-menu-toggle"> <i class="fa fa-bar-chart-o fw"></i><span
						class="text">产品追踪卡录入</span>
				</a></li>
				<li><a href="ocIn!index.action" class="js-sub-menu-toggle">
						<i class="fa fa-edit fw"></i><span class="text">订单配置与一致性录入</span>
				</a></li>
			</ul></li>

		<li><a href="qcStd!index.action" class="js-sub-menu-toggle">
				<i class="fa fa-list-alt fw"></i><span class="text">品质标准更新记录</span>
		</a></li>
		<li><a href="materialAbnormal!index.action"> <i
				class="fa fa-puzzle-piece fa-fw"></i><span class="text">物料异常记录</span>
		</a></li>
		<li id="tpl_mta"><a href="#qc_tmpl_in" data-toggle="collapse" class="treemenu"> <i
				class="fa fa-file-excel-o fa-fw"></i><span class="text">品质模板维护</span><span
				class="pull-right fa fa-angle-down fa-lg "></span>
		</a>
			<ul id="qc_tmpl_in" class="collapse">
				<li><a href="testTpl!index.action"> <i
						class="fa fa-pencil-square-o"></i><span class="text">检验记录表维护</span>
				</a></li>
				<li><a href="testFlowTpl!index.action"> <i
						class="fa fa-pencil"></i><span class="text">检验流程卡维护</span>
				</a></li>
				<li><a href="trackTpl!index.action"> <i
						class="fa fa-retweet"></i><span class="text">产品追踪卡维护</span>
				</a></li>
				<li><a href="ocTpl!index.action"> <i class="fa fa-road"></i><span
						class="text">订单配置与一致性维护</span>
				</a></li>
			</ul></li>

		<li><a href="stdFaultlib!index.action"> <i
				class="fa fa-money"></i><span class="text">标准故障库</span>
		</a></li>
		<li><a href="qaTargert!index.action"> <i
				class="fa fa-tachometer"></i><span class="text">质量目标参数</span>
		</a></li>
		<li><a href="qualityReport!qualityIndex.action"> <i
				class="fa fa-picture-o"></i><span class="text">品质报表</span>
		</a></li>
	</ul>
	<div class="sidebar-minified js-toggle-minified">
		<i class="fa fa-angle-left"></i>
	</div>
</div>
<!-- end left sidebar -->
