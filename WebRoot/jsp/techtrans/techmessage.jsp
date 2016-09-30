<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<script type="text/javascript">
	alert('${message}');	
</script>
<s:if test="#request.result=='success'">
	<script type="text/javascript">
		window.open("ecnDocumentTask!maintain.action","_self");
	</script>
</s:if>
<s:if test="#request.result=='successes'">
	<script type="text/javascript">
		window.open("ecnDocumentTask!taskFollowUpMaintain.action","_self");
	</script>
</s:if>
<s:elseif test="#request.result=='fail'">
	<script type="text/javascript">
		history.go(-1);
	</script>
</s:elseif>
</body>
</html>
