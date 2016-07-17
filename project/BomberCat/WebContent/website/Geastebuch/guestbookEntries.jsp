<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<div id="kopf">
		<a href="../index.jsp"><img src="../Medien/Catlogo.jpg"
			width="444" height="167" id="logo" style="margin-left:30%" style="margin-right:30%" /></a>
			

	</div>


	<div id="index">
		<ul id="MenuBar1" class="MenuBarHorizontal">
			<li><a href="../index.jsp" >Back to Main</a></li>
			<li><a href="../openpage.html">Openpage</a></li>
			<li><a href="../refresh.html">Refresh</a></li>
		


		</ul>
	</div>




	
	<br></br> <br></br> <br></br>
	<script type="text/javascript">
		var MenuBar1 = new Spry.Widget.MenuBar("MenuBar1", {
			imgDown : "../SpryAssets/SpryMenuBarDownHover.gif",
			imgRight : "../SpryAssets/SpryMenuBarRightHover.gif"});
	</script>
	
<div>
	<div class="header-content" >

	<h1><b> Bombercat Guestbook</b></h1>
	<jsp:useBean id="GuestBook" class="de.dhbwka.java.bombercat.website.GuestBook" />
	
	<jsp:getProperty property="entry" name="GuestBook" />
	
	<hr>
	Tim commented: Bombercat rulez! I stink</br>
	<hr>
	Fappi commented: To the Fapmobile! You stink</br>
	<hr>
	
	</div>
</div>
	
</body>
</html>