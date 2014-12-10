<html>
<head>

	<title>Cycle the Game</title>
	<script src="js/jquery-2.0.3.min.js"></script>
	<script src="util/control.js"></script>
	<link href="css/login.css" rel="stylesheet" type="text/css">
</head>
<body>
	<img src="img/logo.png" class="logo">
	<p id="add_err"></p>
	<div class="account">
		<div class="login">
			<h1>User Login</h1>
			<form action="./" method="post">
				<label for="user">Username </label>
				<input type="text" size="30"  name="user" id="user"  />
				<label for="pass">Password</label>
				<input type="password" size="30"  name="pass" id="pass"  />
				<input type="submit" id="login" name="login" value="Login" class="loginbutton" >
			</form>	
		</div>
		<div class="register">
			<h1>User register</h1>
			<form action="./" method="post">
				<label for="name">Username </label>
				<input type="text" size="30"  name="name" id="name" />
				<label for="word">Password</label>
				<input type="password" size="30"  name="word" id="word" />
				<input type="submit" id="register" name="register" value="Register" class="registerbutton" >
			</form>	
		</div>
	</div>
</body>
</html>