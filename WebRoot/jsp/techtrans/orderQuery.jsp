<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>BMS - 订单维护</title>
<!-- Le styles -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/common.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-timepicker-addon.js"></script>
<script type="text/javascript" src="js/jquery-ui-timepicker-addon.zh-CN.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/head.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/jsrender.min.js"></script>
<script type="text/javascript" src="js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/techtrans/techtransMaintain.js"></script>
<style type="text/css">
.section-head {
  border-left: 7px solid #000;
  padding-left: 10px;
  margin-top: 25px;
  margin-bottom: 20px;
}
.glyphicon{
	position:relative;
	top:1px;
	display:inline-block;
	font-family:'Glyphicons Halflings';
	font-style:normal;
	font-weight:400;
	line-height:1;
	-webkit-font-smoothing:antialiased;
	-moz-osx-font-smoothing:grayscale
}
.glyphicon-plus:before{
	content:"\2b"
}
*::before, *::after {
    box-sizing: border-box;
}
.btn-xs, .btn-group-xs > .btn {
    padding: 1px 5px;
    font-size: 14px;
    line-height: 2.5;
    border-radius: 3px;
}
.btn-success {
    color: #FFF;
    background-color: #5CB85C;
    border-color: #4CAE4C;
}
.offlineFont{
	color:red
}
.input[type="text"]{
	height: 30px;
}
</style>
</head>
<body>
<div class="content-wrapper " >
	<div id="bodymain" class="offhead">
		<div id="bodyright" class="offset2">
			<!-- Main -->
			<div>
				<legend style="margin: 0 auto;">订单查询</legend>
				<div style="margin: 0 auto;">
					<br/><form id="form" class="well form-search">
						<table >
							<tr>
								<td>订单编号</td>
								<td>订单名称</td>
								<td>生产年份</td>
								<td>生产工厂</td>
								<td></td>
							</tr>
							<tr>
								<td><input type="text" style="height: 20px;" class="input-medium revise" placeholder="请输入订单编号..." value="<s:property value="#request.test"/>" id="search_order_no" /></td>
								<td><input type="text" style="height: 20px;" class="input-medium revise" placeholder="请输入订单名称..." id="search_order_name" /></td>
								<td><select name="" id="search_productive_year" class="input-small carSeries">
								</select></td>
								<td><select name="" id="search_factory" class="input-medium carType">
								</select></td>
								<td><input type="button" class="btn btn-primary"
									id="btntaskQuery" value="查询" style="margin-left: 2px;"></input> 
								</td>
							</tr>
						</table>
					</form>
					
					<table id="tableOrder" class="table table-condensed" style="font-size:12px;">
                    <thead>
                        <tr>
                        	<th>订单编号</th>
                            <th>订单描述</th>
                            <th>车型</th>
                            <th>订单数量</th>
                            <th>生产年份</th>
                            <th>生产工厂</th>
                            <th>生产数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
				</div>
			</div>
		</div>
	</div>
</div>
</body>
</html>