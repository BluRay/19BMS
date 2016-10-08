<%@ page language="java"  pageEncoding="utf-8"%>
<%@ include file="../common.jsp"%>
<link rel="stylesheet" href="css/font-awesome.min.css">
<style type="text/css" media="screen">
	#headNav>li>a {
	    padding: 10px;
	}
</style>
<script type="text/javascript">
$(document).ready(function(){
	logout_href=$("#a_logout").attr("href");
	if(window.location.href.indexOf("bms.byd.com.cn")>=0){
		//alert("域名访问");
		logout_href="http://websso.byd.com.cn/oam/server/logout?end_url=http://bms.byd.com.cn";		
	}
	$("#a_logout").attr("href",logout_href);
})
function getAccessIp(){
	var href = window.location.href;
	var url = href.substring(0,href.lastIndexOf('/'));
	window.location.href=url+"/";
}
</script>

<div id="divHead">
<div class="navbar navbar-fixed-top" id="bmsHead">
	<div class="navbar-inner">
		<div style="width:1200px" class="container">
			<a class="brand" href="javascript: getAccessIp();">BMS</a>
			<div class="nav-collapse" style="margin-top: 2px;">
				<ul style="margin-left:80px" id="headNav" class="nav">
					<li id="headTechnologyLi">
						<a href="order!ordersearch.action" data-toggle="tooltip" data-placement="bottom" title="<s:text name="order"/>"><i class="fa fa-list-alt"></i>&nbsp;<s:text name="order"></s:text></a>
					</li>
					<li id="headTechnologyLi">
						<a href="plan!index.action" data-toggle="tooltip" data-placement="bottom" title="计划"><i class="fa fa-calendar"></i>&nbsp;计划</a>
					</li>
					<li id="headAssemblyLi">
						<a href="production!index.action" data-toggle="tooltip" data-placement="bottom" title="生产"><i class="fa fa-gears"></i>&nbsp;生产</a>
					</li>
					<li id="headQualityLi">
						<a href="ecnDocumentTask!showEcnInformationList.action"  data-toggle="tooltip" data-placement="bottom" title="技改"><i class="fa fa-retweet"></i>&nbsp;技改</a>
					</li>
					<li class="divider-vertical"></li>
					<!-- added by dkq -->
					<li>
						<a href="testRecordIn!qualityIndex.action" data-toggle="tooltip" data-placement="bottom" title="品质"><i class="fa fa-thumbs-o-up"></i>&nbsp;品质</a>
					</li>
					<li id="headCostLi">
						<a href="afterSale!queryAfterSaleProblems.action" data-toggle="tooltip" data-placement="bottom" title="售后"><i class="fa fa-futbol-o"></i>&nbsp;售后</a>
					</li>
					<li id="headEfficiencyLi">
						<a href="selfcost!index.action" data-toggle="tooltip" data-placement="bottom" title="成本"><i class="fa fa-money"></i>&nbsp;成本</a>
					</li>
					<li id="headManpowerLi">
						<a href="hr!index.action" data-toggle="tooltip" data-placement="bottom" title="人事"><i class="fa fa-user-plus"></i>&nbsp;人事</a>
					</li>
					<li class="divider-vertical"></li>
					<li id="headMonitoringLi">
						<a href="production!monitorindex.action" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="监控"><i class="fa fa-desktop"></i>&nbsp;</a>
					</li>
					<li id="headGeneralInformationLi">
						<a href="baseData!settingIndex.action" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="数据"><i class="fa fa-list-alt"></i>&nbsp;</a>
					</li>
					<li id="headGeneralInformationLi">
						<a href="orderReport!orderIndex.action" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="报表"><i class="fa fa-bar-chart-o"></i>&nbsp;</a>
					</li>
				</ul>
        		<ul class="nav pull-right">
          			<li>
            			<a href="account!accountCenter.action" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="账户管理"><i class="fa fa-user"></i>&nbsp;<%=session.getAttribute("display_name") %></a>
         			 </li>
         			 <li>
            			<a id="a_logout" href="<%=basePath%>logout" rel="tooltip" data-toggle="tooltip" data-placement="bottom" title="注销"><i class="fa fa-sign-out"></i></a>
         			 </li>
        		</ul>
			</div>
		</div>
	</div>
</div>

</div>
