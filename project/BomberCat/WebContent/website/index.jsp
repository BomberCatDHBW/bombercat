<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<link rel="shortcut icon" href="Medien/favicon.ico" type="image/x-icon" />
<title>Bombercat</title>

<!-- Bootstrap Core CSS -->
<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">

<!-- Custom Fonts -->
<link
	href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'
	rel='stylesheet' type='text/css'>
<link
	href='http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic'
	rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="font-awesome/css/font-awesome.min.css"
	type="text/css">

<!-- Plugin CSS -->
<link rel="stylesheet" href="css/animate.min.css" type="text/css">

<!-- Custom CSS -->
<link rel="stylesheet" href="css/creative.css" type="text/css">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>


<body id="page-top">

	<nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand page-scroll" href="#page-top">Back To The
					Top</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse"
				id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
					<li><a class="page-scroll" href="impresssum.html">Imprint</a>
					</li>
					<li><a class="page-scroll" href="#game">Game</a></li>
					<li><a class="page-scroll" href="#instructions">Instruction</a></li>
					<li><a class="page-scroll" href="#about">About</a></li>
					<li><a class="page-scroll" href="#features">Features</a></li>
					<li><a class="page-scroll" href="#pictures">Pictures</a></li>
					<li><a class="page-scroll" href="#contact">Contact</a></li>
						<li><a class="page-scroll" href="guestbook/guestbook.jsp">Guestbook</a></li>

				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>

	<header>
		<div class="header-content">
			<div class="header-content-inner">
				<h1>
					<jsp:useBean id="Bean"
						class="de.dhbwka.java.bombercat.website.RandomBean" />
					<jsp:getProperty property="randomSlogan" name="Bean" />
					<br> <input type='button' Value="Press ME"
						onclick="location.reload()"
						class="btn btn-primary btn-xl page-scroll" />
				</h1>
				<hr>
				<a href="openpage.html" class="btn btn-primary btn-xl page-scroll">SEE THE BIG CAT</a>
			</div>
		</div>
	</header>
	<section id="game">

		<div>

			<div align="center">
				<div class="cat-text">	BOMBERCAT	</div>
				<div class="header-game">

					<iframe class="frame" border="0" frameborder="0"
						src="../client.html" width="800" height="800" name="Frame"
						scrolling="no" >
						<!-- IFrame einbettung von der Client.HTML -->
						<p>Your Browser Doesn't Support This Frame</p>

					</iframe>

				</div>
			</div>
		</div>
	</section>

	<section id="instructions" >
		<div  class="container">
			<img src="Medien/keybindingsfun.jpg" align="middle" style="margin-left: 6em">
			<br>
			<div class="textarea"  align="center" style="font-size:25px">
			The Game begins! Like Batman begins! <br>
			And you can <b>MOVE</b> your own cat with pressing the Buttons W,A,S,D <br>
			W move up, S move down, A move left,D move right. <br>
			You can place bombs with space... <br>
			Some <b>POWERUPS</b> will drop during the game. <br>
			Power ups like Fireup,Bombup and Speedup...<br>
			With Fireup you gain more Firepower and so fire range <br>
			Bombup will give you a every time you get a drop an extra bomb <br>
			The Speedup drop will increase you Speed everytime you get one <br>
			<br>
			But now to the game <br>
			you have to destroy with your bombs the walls and get to your <b>ENEMIES</b><br>
			then you have to catch them<br>
			
			
			
			
			</div>
		</div>



	</section>

	<section class="bg-primary" id="about">
		<div class="container">
			<div class="row">
				<div class="col-lg-8 col-lg-offset-2 text-center">
					<h2 class="section-heading">Something about us!</h2>
					<hr class="light">
					<p class="text-faded">We are German computer science students
						and love Cats !</p>
					<p class="text-faded">We create this game and website for an
						Exam. This will be graded.</p>
					<p class="text-faded">Computer science is the scientific and
						practical approach to computation and its applications. It is the
						systematic study of the feasibility, structure, expression, and
						mechanization of the methodical procedures (or algorithms) that
						underlie the acquisition, representation, processing, storage,
						communication of, and access to information. An alternate, more
						succinct definition of computer science is the study of automating
						algorithmic processes that scale. A computer scientist specializes
						in the theory of computation and the design of computational
						systems.</p>
				</div>
			</div>
		</div>
	</section>



	<section id="features">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 text-center">
					<h2 class="section-heading">Upcoming Features</h2>
					<hr class="primary">
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-lg-3 col-md-6 text-center">
					<div class="service-box">
						<img src="Medien/pictogramm1.jpg" class="center" alt="">
						<h3>Server Performance</h3>
						<p class="text-muted">We want increase our Performance so YOU
							can play much smother.</p>
					</div>
				</div>
				<div class="col-lg-3 col-md-6 text-center">
					<div class="service-box">
						<img src="Medien/pictogramm2.jpg" class="center" alt="">
						<h3>Effecienty</h3>
						<p class="text-muted">We want to make our working steps more
							efficient.</p>
					</div>
				</div>
				<div class="col-lg-3 col-md-6 text-center">
					<div class="service-box">
						<img src="Medien/pictogramm3.jpg" class="center" alt="">
						<h3>Daily Updates</h3>
						<p class="text-muted">Our social media team do daily uupdates
							on Twitter and Facebook.</p>
					</div>
				</div>
				<div class="col-lg-3 col-md-6 text-center">
					<div class="service-box">
						<img src="Medien/pictogramm4.jpg" class="center" alt="">
						<h3>Fun</h3>
						<p class="text-muted">And we want that Cats have the most fun
							on this game.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="no-padding" id="pictures">
		<div class="container-fluid" class="a:hover">
			<div class="row no-gutter">
				<div class="col-lg-4 col-sm-6">
					<a href="#" class="portfolio-box"> <img src="Medien/bild1.jpg"
						class="img-responsive" alt="">
						<div class="portfolio-box-caption">
							<div class="portfolio-box-caption-content">
								<div class="project-category text-faded">DHBW</div>
								<div class="project-name">Karlsruhe</div>
							</div>
						</div>
					</a>
				</div>
				<div class="col-lg-4 col-sm-6">
					<a href="#" class="portfolio-box"> <img src="Medien/bild2.jpg"
						class="img-responsive" alt="">
						<div class="portfolio-box-caption">
							<div class="portfolio-box-caption-content">
								<div class="project-category text-faded">Our</div>
								<div class="project-name">Studio</div>
							</div>
						</div>
					</a>
				</div>
				<div class="col-lg-4 col-sm-6">
					<a href="#" class="portfolio-box"> <img src="Medien/bild3.jpg"
						class="img-responsive" alt="">
						<div class="portfolio-box-caption">
							<div class="portfolio-box-caption-content">
								<div class="project-category text-faded">Bombercat</div>
								<div class="project-name">Wallpaper</div>
							</div>
						</div>
					</a>
				</div>

			</div>
		</div>
	</section>

	<aside class="bg-dark">
		<div class="container text-center">
			<div class="call-to-action">
				<h2>THE GAME IS STILL IN PROGRESS</h2>

			</div>
		</div>
	</aside>

	<section id="contact">
		<div class="container">
			<div class="row">
				<div class="col-lg-8 col-lg-offset-2 text-center">
					<h2 class="section-heading">Contact</h2>
					<hr class="primary">
					<p>Please! Join our Steam Group or send us any suggestion if you have one ! </p>
				</div>
				<div class="col-lg-4 col-lg-offset-2 text-center">
					<img src="Medien/steam.png" class="center" alt=""
						href="www.steam.de">
					<p>Join Our Steam Group</p>
				</div>
				<div class="col-lg-4 text-center">
					<img src="Medien/mail.png" class="center" alt="">
					<p>
						<a href="mailto:Bombercat@googlemail.com">BombercatTeam@bombercat.de</a>
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- jQuery -->
	<script src="js/jquery.js"></script>

	<!-- Bootstrap Core JavaScript -->
	<script src="js/bootstrap.min.js"></script>

	<!-- Plugin JavaScript -->
	<script src="js/jquery.easing.min.js"></script>
	<script src="js/jquery.fittext.js"></script>
	<script src="js/wow.min.js"></script>

	<!-- Custom Theme JavaScript -->
	<script src="js/creative.js"></script>
	<!-- Unser Canvas -->
	<script src="js/canvas.js"></script>

</body>

</html>
