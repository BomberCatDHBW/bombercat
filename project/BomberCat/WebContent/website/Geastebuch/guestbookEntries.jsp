<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<!-- InstanceBegin template="/Templates/Vorlage.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- InstanceBeginEditable name="doctitle" -->
<title>Guestbook</title>
<!-- InstanceEndEditable -->
<!-- InstanceBeginEditable name="head" -->
<!-- InstanceEndEditable -->

<link href="../css/creative.css" rel="stylesheet" type="text/css" />
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="../stylesheed/Vorlage.css" rel="stylesheet" type="text/css" />
<link href="../SpryAssets/SpryMenuBarHorizontal.css" rel="stylesheet"
	type="text/css" />
<script src="../SpryAssets/SpryMenuBar.js" type="text/javascript"></script>
</head>
<body>
	<div id="kopf">
		<a href="../index.jsp"><img src="../Medien/Catlogo.jpg"
			width="444" height="167" id="logo" style="margin-left: 30%"
			style="margin-right:30%" /></a>


	</div>


	<div id="index">
		<ul id="MenuBar1" class="MenuBarHorizontal">
			<li><a href="../index.jsp">Back to Main</a></li>
			<li><a href="../openpage.html">Openpage</a></li>
			<li><a href="../refresh.html">Refresh</a></li>




		</ul>
	</div>





	<br></br>
	<br></br>
	<br></br>
	<script type="text/javascript">
		var MenuBar1 = new Spry.Widget.MenuBar("MenuBar1", {
			imgDown : "../SpryAssets/SpryMenuBarDownHover.gif",
			imgRight : "../SpryAssets/SpryMenuBarRightHover.gif"
		});
	</script>

	<div>
		<div class="header-content">

			<h1>
				<b> Bombercat Guestbook</b>
			</h1>
			<jsp:useBean id="GuestBook"
				class="de.dhbwka.java.bombercat.website.GuestBook" />
<%-- 			<jsp:setProperty name="GuestBook" property="username" --%>
<%-- 				value="${param['username']}"></jsp:setProperty> --%>
<%-- 			<jsp:setProperty name="GuestBook" property="comment" --%>
<%-- 				value="${param['comment']}"></jsp:setProperty> --%>
<%-- 			<jsp:setProperty name="GuestBook" property="opinion" --%>
<%-- 				value="${param['opinion']}"></jsp:setProperty> --%>

			<jsp:getProperty property="entry" name="GuestBook" />

			<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
			<c:forEach var="entries" items="${GuestBook.comments}">
				<h1>
					<c:out value="${entries.comment}" />
				</h1>
				</br>
			</c:forEach>
			<hr>
		</div>
	</div>

</body>
</html>