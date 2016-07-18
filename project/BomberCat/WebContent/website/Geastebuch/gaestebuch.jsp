<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<!-- InstanceBegin template="/Templates/Vorlage.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- InstanceBeginEditable name="doctitle" -->
<title>Gästebuch</title>
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
			width="444" height="167"class="displayed"  /></a>
			

	</div>


	<div id="index">
		<ul id="MenuBar1" class="MenuBarHorizontal">
			<li><a href="../index.jsp" >Back to Main</a></li>
			<li><a href="../openpage.html">Openpage</a></li>
			<li><a href="../refresh.html">Refresh</a></li>
		


		</ul>
	</div>




	
	<br></br> <br></br> <br></br>
	<script type="text/javascript" >
		var MenuBar1 = new Spry.Widget.MenuBar("MenuBar1", {
			imgDown : "../SpryAssets/SpryMenuBarDownHover.gif",
			imgRight : "../SpryAssets/SpryMenuBarRightHover.gif"});
	</script>
<div>
	<div class="header-content" >
		
		    <center>
		    	<h1> Welcome to the Bombercat Guestbook, leave a comment!</h1>
		    	<p> No time, take me to the <a href="guestbookEntries.jsp">guestbook!</a></p>
				<form method="get" action="guestbookEntries.jsp">

				<b>Name: </b>
				<input type="text" name="username" size="30" />
				</br>
				<p><b>What do you think of Bombercat?</b></p>

				<input type="radio" name=opinion value="great" />
					Bombercat is Great!
				<input type="radio" name=opinion value="stinks" />
					Bombercat stinks!
				<input type="radio" name=opinion value="youStink" />
					You stink!
				</br>
				<input type="radio" name=opinion value="iStink" />
					I stink!
				<input type="radio" name=opinion value="allStink">
					We all stink!
			
				<h1>Make any comment you like:</h1>
			
				<textarea name="comment" rows=6 cols=60></textarea>
				<br><b>Bombercat thanks you for your input! Meow!</b></br>
				<br>
				<input type=submit value="Send it!">
				<input type=reset value="Start over">
				</br>
				</form>
			</center>
			
		</div>
	</div>
	

</body>
<!-- InstanceEnd -->
</html>
