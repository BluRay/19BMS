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
<%@ include file="../common/foot.jsp"%>
<!-- left sidebar -->
<div class="left-sidebar ">
	<ul class="main-menu"
		style="padding-left: 0px; padding-top: 0px; padding-right: 0px; margin-top: 0px; margin-left: 0px; margin-bottom: 10px;">
		<li class="active"><a href="#" class="js-sub-menu-toggle"> <i
				class="fa fa-dashboard fa-fw"></i><span class="text">生产模块菜单</span>
		</a></li>
		<li id="orderMaintain"><a href="production!executionindex.action"
			class="js-sub-menu-toggle"> <i class="fa fa-list-ul fa-fw"></i><span
				class="text">生产扫描</span>
		</a></li>
		<li id="orderReview"><a href="production!exception.action"
			class="js-sub-menu-toggle"> <i
				class="fa fa-exclamation-circle fw"></i><span class="text">异常登记</span>
		</a></li>
		<li id="orderConfig"><a href="production!workshopsupply.action"
			class="js-sub-menu-toggle"> <i class="fa fa-edit fw"></i><span
				class="text">车间供货</span>
		</a></li>
		<li id="orderConfig"><a href="production!partsfinish.action"
			class="js-sub-menu-toggle"> <i class="fa fa-list-alt fw"></i><span
				class="text">部件上下线</span>
		</a></li>
		
		<li id="busInfo"><a href="#bus_info" data-toggle="collapse"
			class="treemenu"> <i class="fa fa-bus"></i><span
				class="text">车辆信息维护</span> <span
				class="pull-right fa fa-angle-down fa-lg"></span>
		</a>
			<ul id="bus_info" class="collapse">
				<li id="orderSerach"><a href="production!bodycolor.action"> <i
						class="fa fa-money"></i><span class="text">车身颜色</span>
				</a></li>
				<li id="orderSerach"><a href="production!busseats.action"> <i
						class="fa fa-wheelchair"></i><span class="text">座位数</span>
				</a></li>
				<li id="orderSerach"><a href="production!customernumber.action">
						<i class="fa fa-sort-numeric-asc fa-fw"></i><span class="text">客户自编号</span>
				</a></li>
				<li id="orderSerach"><a href="production!productionCCC.action">
						<!-- <i class="fa fa-sort-numeric-asc fa-fw"></i> --><span class="text">3C证书、公告生效日期</span>
				</a></li>
				<li id="orderSerach"><a href="production!productionDate.action">
						<!-- <i class="fa fa-sort-numeric-asc fa-fw"></i> --><span class="text">车辆生产日期</span>
				</a></li>
				<li ><a href="production!productionBattery.action">
						<!-- <i class="fa fa-sort-numeric-asc fa-fw"></i> --><span class="text">电池容量</span>
				</a></li>
				<li id="orderSerach"><a href="production!productionVoltage.action">
						<!-- <i class="fa fa-sort-numeric-asc fa-fw"></i> --><span class="text">额定电压</span>
				</a></li>
				<li id="orderSerach"><a href="production!productionSpring.action">
						<!-- <i class="fa fa-sort-numeric-asc fa-fw"></i> --><span class="text">弹簧片数</span>
				</a></li>
			</ul></li>
		
<!-- 		<li id="orderSerach"><a href="production!productionhours.action">
				<i class="fa fa-user-plus"></i><span class="text">人员工时</span>
		</a></li> -->
		<li id="tempOrder"><a href="#tmp_order" data-toggle="collapse"
			class="treemenu"> <i class="fa fa-file-text-o fa-fw"></i><span
				class="text">临时派工单</span> <span
				class="pull-right fa fa-angle-down fa-lg"></span>
		</a>
			<ul id="tmp_order" class="collapse">
				<li><a href="tempOrder!createOrderPage.action"><i
						class="fa fa-plus-square fw"></i>&nbsp;创建临时派工单</a></li>
				<!-- <li><a href="tempOrder!approveOrderPage.action"
					class="js-sub-menu-toggle"> <i
						class="fa fa-check-square-o fa-fw"></i><span class="text">审批临时派工单</span>
				</a></li> -->
				<!-- <li id="orderReview"><a href="tempOrder!assignOrderPage.action"
					class="js-sub-menu-toggle"> <i class="fa fa-bar-chart-o fw"></i><span
						class="text">分配临时派工单</span>
				</a></li>
				<li><a href="tempOrder!assessOrderPage.action"
					class="js-sub-menu-toggle"> <i class="fa fa-edit fw"></i><span
						class="text">工时评估</span>
				</a></li>
				<li><a href="tempOrder!assessOrderVerifyPage.action"
					class="js-sub-menu-toggle"> <i class="fa fa-edit fw"></i><span
						class="text">评估工时审核</span>
				</a></li> -->
				<li><a href="tempOrder!workHoursMtaPage.action"
					class="js-sub-menu-toggle"> <i class="fa fa-edit fw"></i><span
						class="text">额外工时维护</span>
				</a></li>
			<!-- 	<li><a href="tempOrder!acceptOrderPage.action"
					class="js-sub-menu-toggle"> <i class="fa fa-edit fw"></i><span
						class="text">验收临时派工单</span>
				</a></li> -->
				<li><a href="tempOrder!workHoursVerifyPage.action"
					class="js-sub-menu-toggle"> <i class="fa fa-check-square-o fw"></i><span
						class="text">额外工时审核</span>
				</a></li>
				<li><a href="tempOrder!queryOrderPage.action"
					class="js-sub-menu-toggle"> <i class="fa fa-search fw"></i><span
						class="text">临时派工单查询</span>
				</a></li>
			</ul></li>
		<li id="pieceWorkTime"><a href="#piece_work" data-toggle="collapse"
			class="treemenu"> <i class="fa fa-list-ol"></i><span
				class="text">计件工时</span> <span
				class="pull-right fa fa-angle-down fa-lg"></span>
		</a>
			<ul id="piece_work" class="collapse">
				<li><a href="pieceWorkTime!mtaPage.action"><i
						class="fa fa-plus-square fw"></i>&nbsp;计件工时维护</a></li>
				<li><a href="pieceWorkTime!updatePage.action"
					class="js-sub-menu-toggle"> <i
						class="fa fa-edit fa-fw"></i><span class="text">计件工时修改</span>
				</a></li>
				<li id="orderReview"><a href="pieceWorkTime!verifyPage.action"
					class="js-sub-menu-toggle"> <i class="fa fa-check-square-o fw"></i><span
						class="text">计件工时审核</span>
				</a></li>
			</ul></li>
		<li id="waitWorkTime"><a href="#wait_work" data-toggle="collapse"
			class="treemenu"> <i class="fa fa-dashboard"></i><span
				class="text">等待工时</span> <span
				class="pull-right fa fa-angle-down fa-lg"></span>
		</a>
			<ul id="wait_work" class="collapse">
				<li><a href="waitWorkTime!mtaPage.action"><i
						class="fa fa-plus-square fw"></i>&nbsp;等待工时维护</a></li>
				<li><a href="waitWorkTime!updatePage.action"
					class="js-sub-menu-toggle"> <i
						class="fa fa-edit fa-fw"></i><span class="text">等待工时修改</span>
				</a></li>
				<li id="orderReview"><a href="waitWorkTime!verifyPage.action"
					class="js-sub-menu-toggle"> <i class="fa fa-check-square-o fw"></i><span
						class="text">等待工时审核</span>
				</a></li>
			</ul></li>
		<li id="orderReview"><a href="hr!rewardspunishment.action"
			class="js-sub-menu-toggle"> <i class="fa fa-qrcode"></i><span
				class="text">车间奖惩维护</span>
		</a></li>
		<li><a href="hr!attendance.action?model=production"><i
				class="fa fa-bar-chart-o fw"></i><span
				class="text">考勤导入</span></a></li>
		<li id="productionSearch"><a href="#production_search" data-toggle="collapse"
			class="treemenu"> <i class="fa fa-search"></i><span
				class="text">生产查询</span> <span
				class="pull-right fa fa-angle-down fa-lg"></span>
		</a>
			<ul id="production_search" class="collapse">

			<li id="orderSerach"><a href="production!productionsearch.action">
					<i class="fa fa-search"></i><span class="text">生产查询</span>
			</a></li>
			<li id="orderSerach"><a
				href="production!productionsearchbusinfo.action"> <i
					class="fa fa-bus"></i><span class="text">车辆信息查询</span>
			</a></li>
			</ul></li>
		
		<li id="orderSerach"><a
			href="productionReport!dailyReport.action"> <i
				class="fa fa-line-chart"></i><span class="text">生产报表</span>
		</a></li>

	</ul>
	<div class="sidebar-minified js-toggle-minified">
		<i class="fa fa-angle-left"></i>
	</div>
</div>
<!-- end left sidebar -->
