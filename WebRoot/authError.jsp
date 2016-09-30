<%@ page language="java" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<title>没有权限</title>
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<style type="text/css">
         .span9 {
                float: none;
                margin-left:auto;
                margin-right:auto;
                padding: 0
            }

            #emputyHead {
                margin-bottom: 20px;
                margin-top: 30px;
            }
        
</style>
<script type="text/javascript">
	function SendMail(filePath) {
	//alert("send mail");
	var path = location.href.substring(0, location.href.lastIndexOf("/")) + filePath;
	var outlookApp = new ActiveXObject("Outlook.Application");
	var nameSpace = outlookApp.getNameSpace("MAPI");
	var mailfolder = nameSpace.getDefaultFolder(6);
	var mailItem = mailfolder.Items.add('IPM.Note.FormA');
	var mailto = "xiong.jianwu@byd.com ";
	var mailBody= "<HTML><BODY><DIV><FONT color='red'>test this is body html</FONT></DIV></BODY></HTML>";
	mailItem.Subject = "test title";
	mailItem.To = mailto;
	mailItem.HTMLBody = mailBody;
	if (path != "") {
	mailItem.Attachments.Add(path);
	}
	mailItem.Display(0);
 	mailItem = null;
	nameSpace = null;
	outlookApp = null; 
	}
</script>
</head>

<body>
	<div class="span9" id="emputyHead">
		<div class="alert alert-block alert-error">
			<h4 class="alert-heading">抱歉，您的账号无此权操作权限</h4>
			<p style="margin-top: 15px">
				如有工作需要，请联系BMS系统管理员刘红普<a href="mailto:liu.hongpu@byd.com?subject=权限">liu.hongpu@byd.com</a>申请开通权限或获得相关协助。
			</p>
			<p>为此带来的不便，还请见谅。</p>
			<p style="margin-top: 15px">
				<input class="btn btn-danger" value="返回"
					onclick="window.history.back()" type="button">
			</p>
		</div>
	</div>


</body>
</html>
