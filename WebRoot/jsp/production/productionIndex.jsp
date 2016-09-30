<%@ page language="java"  pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
	<meta http-equiv="expires" content="0" />
	<title>BMS - 生产</title>
	<!-- Le styles -->
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="css/common.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/head.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	<script type="text/javascript" src="js/production/productionIndex.js"></script>
	<style type="text/css" media="screen">
	.node-rgl {
		position:relative;z-index:20;height:35px;width:35px;line-height:11px;
		font-size: 10px;cursor:pointer;border-radius: 20px;
	}  
	.node-rgl:hover {
		background: #9966FF;opacity: 1;
	}
	.node-welding-HA0{
		top:25px;left:70px;
	}
	.node-welding-HA1{
		top:-10px;left:119px;
	}
	.node-welding-HA2{
		top:-45px;left:169px;
	}
	.node-welding-HA3{
		top:-80px;left:214px;
	}
	.node-welding-HA4{
		top:-115px;left:262px;
	}
	.node-welding-HA5{
		top:-150px;left:307px;
	}
	.node-welding-HA6{
		top:-185px;left:357px;
	}
	.node-welding-HA7{
		top:-220px;left:405px;
	}
	.node-welding-HB0{
		top:-207px;left:70px;
	}
	.node-welding-HB1{
		top:-242px;left:119px;
	}
	.node-welding-HB2{
		top:-278px;left:169px;
	}
	.node-welding-HB3{
		top:-313px;left:214px;
	}
	.node-welding-HB4{
		top:-348px;left:262px;
	}
	.node-welding-HB5{
		top:-384px;left:307px;
	}
	.node-welding-HB6{
		top:-418px;left:357px;
	}
	.node-welding-HB7{
		top:-453px;left:406px;
	}
	.node-fiberglass-HA0{
		top:17px;left:35px;
	}
	.node-fiberglass-HA1{
		top:34px;left:35px;
	}
	.node-painting-HA0{
		top:42px;left:71px;
	}
	.node-painting-HA1{
		top:7px;left:154px;
	}
	.node-painting-HA2{
		top:-28px;left:238px;
	}
	.node-painting-HA3{
		top:-63px;left:325px;
	}
	.node-painting-HA4{
		top:-98px;left:405px;
	}
	.node-chassis-HA0{
		top:35px;left:72px;
	}
	.node-chassis-HA1{
		top:-1px;left:121px;
	}
	.node-chassis-HA2{
		top:-36px;left:171px;
	}
	.node-chassis-HA3{
		top:-71px;left:215px;
	}
	.node-chassis-HA4{
		top:-105px;left:264px;
	}
	.node-chassis-HA5{
		top:-140px;left:309px;
	}
	.node-chassis-HA6{
		top:-175px;left:359px;
	}
	.node-chassis-HA7{
		top:-211px;left:407px;
	}
	.node-chassis-HB0{
		top:-202px;left:72px;
	}
	.node-chassis-HB1{
		top:-237px;left:121px;
	}
	.node-chassis-HB2{
		top:-272px;left:170px;
	}
	.node-chassis-HB3{
		top:-307px;left:216px;
	}
	.node-chassis-HB4{
		top:-342px;left:264px;
	}
	.node-chassis-HB5{
		top:-377px;left:309px;
	}
	.node-chassis-HB6{
		top:-412px;left:359px;
	}
	.node-chassis-HB7{
		top:-447px;left:408px;
	}
	.node-assembly-HA0{
		top:-139px;left:72px;
	}
	.node-assembly-HA1{
		top:-175px;left:121px;
	}
	.node-assembly-HA2{
		top:-210px;left:171px;
	}
	.node-assembly-HA3{
		top:-245px;left:216px;
	}
	.node-assembly-HA4{
		top:-280px;left:264px;
	}
	.node-assembly-HA5{
		top:-315px;left:309px;
	}
	.node-assembly-HA6{
		top:-350px;left:359px;
	}
	.node-assembly-HA7{
		top:-385px;left:407px;
	}
	.node-assembly-HB0{
		top:-372px;left:72px;
	}
	.node-assembly-HB1{
		top:-407px;left:120px;
	}
	.node-assembly-HB2{
		top:-442px;left:169px;
	}
	.node-assembly-HB3{
		top:-478px;left:216px;
	}
	.node-assembly-HB4{
		top:-513px;left:264px;
	}
	.node-assembly-HB5{
		top:-548px;left:309px;
	}
	.node-assembly-HB6{
		top:-583px;left:359px;
	}
	.node-assembly-HB7{
		top:-618px;left:407px;
	}
	.node-shakedowntest-HA0{
		top:-702px;left:627px;
	}
	.node-shakedowntest-HA1{
		top:-689px;left:627px;
	}
	.node-testline-HA0{
		top:-772px;left:746px;
	}
	.node-testline-HA1{
		top:-758px;left:746px;
	}
	.node-warehouse-HA0{
		top:-841px;left:882px;
	}
	.node-warehouse-HA1{
		top:-829px;left:882px;
	}
	.bus-number{
		top:-543px;left:465px;width:50px;font-size:16px;position:relative;
	}
	.key-component-welding{
		top:-517px;left:459px;width:90px;font-size:16px;position:relative;
	}
	.key-component-painting{
		top:-144px;left:459px;width:90px;font-size:16px;position:relative;
	}
	.key-vin-chassis{
		top:-534px;left:440px;width:90px;font-size:16px;position:relative;
	}
	.key-component-chassis{
		top:-512px;left:459px;width:90px;font-size:16px;position:relative;
	}
	.key-component-warehouse{
		top:-870px;left:459px;width:90px;font-size:16px;position:relative;
	}
	.key-nameplate-warehouse{
		top:-918px;left:785px;width:90px;font-size:16px;position:relative;
	}
	.key-certification-warehouse{
		top:-957px;left:957px;width:90px;font-size:16px;position:relative;
	}
	.key-sentbus-warehouse{
		top:-953px;left:957px;width:90px;font-size:16px;position:relative;
	}
	.welding{
		background-image:url('images/production_welding.png');background-repeat:no-repeat;
		width:900px;height:120px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
	}
	.fiberglass{
		background-image:url('images/production_fiberglass.png');background-repeat:no-repeat;
		width:250px;height:120px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
	}
	.painting{
		background-image:url('images/production_painting.png');background-repeat:no-repeat;
		width:600px;height:120px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
	}
	.chassis{
		background-image:url('images/production_chassis.png');background-repeat:no-repeat;
		width:600px;height:150px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
	}
	.assembly{
		background-image:url('images/production_assembly.png');background-repeat:no-repeat;
		width:1200px;height:140px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
	}
	.shakedowntest{
		background-image:url('images/production_shakedowntest.png');background-repeat:no-repeat;
		width:150px;height:122px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
	}
	.testline{
		background-image:url('images/production_testline.png');background-repeat:no-repeat;
		width:150px;height:152px;color: #FFF;font-weight:bold;font-size:9px;text-align:center;overflow-y: hidden; 
	}
	.warehouse{
		background-image:url('images/production_warehouse.png');background-repeat:no-repeat;
		width:150px;height:168px;color: #FFF;font-weight:bold;font-size:9px;text-align:center; overflow-y: hidden; 
	}
	
	</style>
</head>
<body>
	<%@ include file="../common/head.jsp"%>
	<%@ include file="../common/general_production_left.jsp"%>
	<!-- main -->
	<div class="content-wrapper ">
		<div id="bodymain" class="offhead">
			<div id="bodyright" class="offset2"><!-- Main -->
				<legend style="margin:0 auto;">生产执行</legend>
				<br/>
				生产工厂：<select name="" id="search_factory" class="input-medium carType">
				</select>
				<div id="execution" class="thumbnail" style="height:148px">
                  <span>焊装</span><span id="span_fiberglass" style="padding-left:596px">玻璃钢</span>
                  <div class="welding tab-pane active" style="margin-left:10px">
	                  <div id="node-welding-HA0" class="node-rgl node-welding-HA0" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HA1" class="node-rgl node-welding-HA1" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HA2" class="node-rgl node-welding-HA2" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HA3" class="node-rgl node-welding-HA3" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HA4" class="node-rgl node-welding-HA4" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HA5" class="node-rgl node-welding-HA5" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HA6" class="node-rgl node-welding-HA6" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HA7" class="node-rgl node-welding-HA7" onclick="alert('没有扫描权限！')"> </div>
					  
					  <div id="node-welding-HB0" class="node-rgl node-welding-HB0" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HB1" class="node-rgl node-welding-HB1" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HB2" class="node-rgl node-welding-HB2" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HB3" class="node-rgl node-welding-HB3" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HB4" class="node-rgl node-welding-HB4" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HB5" class="node-rgl node-welding-HB5" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HB6" class="node-rgl node-welding-HB6" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-welding-HB7" class="node-rgl node-welding-HB7" onclick="alert('没有扫描权限！')"> </div>
                  	
                  	  <div class="bus-number"><a href="production!showBusNoPrint.action">车身号</a></div>
                  	  <!-- <div class="key-component-welding"><a href="#">关键零部件</a></div> -->
                  </div>
                  
				  <div class="fiberglass tab-pane active" style="margin-left:595px;margin-top:-121px">
				  	<div id="node-fiberglass-HA0" class="node-rgl node-fiberglass-HA0" onclick="alert('没有扫描权限！')"> </div>
					<div id="node-fiberglass-HA1" class="node-rgl node-fiberglass-HA1" onclick="alert('没有扫描权限！')"> </div>
				  </div>
                </div>
                <div id="execution" class="thumbnail" style="height:125px">
                  <span>涂装</span>
                  <div class="painting tab-pane active" style="margin-left:10px;margin-top:-10px">
                      <div id="node-painting-HA0" class="node-rgl node-painting-HA0" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-painting-HA1" class="node-rgl node-painting-HA1" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-painting-HA2" class="node-rgl node-painting-HA2" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-painting-HA3" class="node-rgl node-painting-HA3" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-painting-HA4" class="node-rgl node-painting-HA4" onclick="alert('没有扫描权限！')"> </div>
					  
					  <!-- <div class="key-component-painting"><a href="#">关键零部件</a></div> -->
                  </div>
                </div>
                <div id="execution" class="thumbnail" style="height:150px">
                  <span>底盘</span>
                  <div class="chassis tab-pane active" style="margin-left:10px;margin-top:-10px">
                      <div id="node-chassis-HA0" class="node-rgl node-chassis-HA0" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HA1" class="node-rgl node-chassis-HA1" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HA2" class="node-rgl node-chassis-HA2" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HA3" class="node-rgl node-chassis-HA3" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HA4" class="node-rgl node-chassis-HA4" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HA5" class="node-rgl node-chassis-HA5" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HA6" class="node-rgl node-chassis-HA6" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HA7" class="node-rgl node-chassis-HA7" onclick="alert('没有扫描权限！')"> </div>
					  
					  <div id="node-chassis-HB0" class="node-rgl node-chassis-HB0" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HB1" class="node-rgl node-chassis-HB1" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HB2" class="node-rgl node-chassis-HB2" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HB3" class="node-rgl node-chassis-HB3" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HB4" class="node-rgl node-chassis-HB4" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HB5" class="node-rgl node-chassis-HB5" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HB6" class="node-rgl node-chassis-HB6" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-chassis-HB7" class="node-rgl node-chassis-HB7" onclick="alert('没有扫描权限！')"> </div>
					  
					  <div class="key-vin-chassis"><a href="production!showVinPrint.action">VIN</a></div>
					  <!-- <div class="key-component-chassis"><a href="#">关键零部件</a></div> -->
                  </div>
                </div>
                <div id="execution" class="thumbnail" style="height:160px">
                  <span>总装</span>
                  <span style="padding-left:596px">调试区 &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 检测线
                  	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 成品库</span>
                  <div class="assembly tab-pane active" style="margin-left:10px">
                      <div class="shakedowntest tab-pane active" style="margin-left:585px;margin-top:4px"></div>
                      <div class="testline tab-pane active" style="margin-left:705px;margin-top:-122px"></div>
                      <div class="warehouse tab-pane active" style="margin-left:838px;margin-top:-152px"></div>
                      
                      <div id="node-assembly-HA0" class="node-rgl node-assembly-HA0" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HA1" class="node-rgl node-assembly-HA1" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HA2" class="node-rgl node-assembly-HA2" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HA3" class="node-rgl node-assembly-HA3" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HA4" class="node-rgl node-assembly-HA4" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HA5" class="node-rgl node-assembly-HA5" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HA6" class="node-rgl node-assembly-HA6" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HA7" class="node-rgl node-assembly-HA7" onclick="alert('没有扫描权限！')"> </div>
					  
					  <div id="node-assembly-HB0" class="node-rgl node-assembly-HB0" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HB1" class="node-rgl node-assembly-HB1" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HB2" class="node-rgl node-assembly-HB2" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HB3" class="node-rgl node-assembly-HB3" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HB4" class="node-rgl node-assembly-HB4" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HB5" class="node-rgl node-assembly-HB5" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HB6" class="node-rgl node-assembly-HB6" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-assembly-HB7" class="node-rgl node-assembly-HB7" onclick="alert('没有扫描权限！')"> </div>
					  
					  <div id="node-shakedowntest-HA0" class="node-rgl node-shakedowntest-HA0" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-shakedowntest-HA1" class="node-rgl node-shakedowntest-HA1" onclick="alert('没有扫描权限！')"> </div>
					  
					  <div id="node-testline-HA0" class="node-rgl node-testline-HA0" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-testline-HA1" class="node-rgl node-testline-HA1" onclick="alert('没有扫描权限！')"> </div>
					  
					  <div id="node-warehouse-HA0" class="node-rgl node-warehouse-HA0" onclick="alert('没有扫描权限！')"> </div>
					  <div id="node-warehouse-HA1" class="node-rgl node-warehouse-HA1" onclick="alert('没有扫描权限！')"> </div>
					  
					  <div style="visibility:hidden" class="key-component-warehouse"><a href="#">关键零部件</a></div>
					  <div class="key-nameplate-warehouse"><a href="production!showNameplatePrint.action">铭牌</a></div>
					  <div class="key-certification-warehouse"><a href="production!certification.action">合格证</a></div>
					  <div class="key-sentbus-warehouse"><a href="busDispatch!planListPage.action">发车</a></div>
                  </div>
                </div>
				
			</div>
		</div>
	</div>
</body>
</html>