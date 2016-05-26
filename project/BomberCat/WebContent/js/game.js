var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var background = new Sprite();
var hero = new Sprite();

hero.load(ctx, "img/player.png");
background.load(ctx, "img/background.png");

var gameState = "mainMenuState";
var player = new Player();
var otherPlayer = new Player();
var playButton = new Button();
setup();

var receivedLobbies = false;

function writeResponse(text) {
	curMsg = text;
	textX = 0;
	textY = 0;
	document.getElementById("info").innerHTML = text;
	//console.log(text);
	if (text == "lobbylist end") {
		receivedLobbies = true;
	}
}

function setup() {
	playButton.create(ctx, 100, 200, 150);
	playButton.setText("Play Game!", 50);
}

function mainMenuState() {
	background.draw(0, 0);
	playButton.draw(50, 200, canvas.width-100, 80);
	
	if (playButton.isClicked()) {
		gameState = "lobbyListState";
		lobbyListStateSetup();
	}
}

var lobbyButtons = [];

function lobbyListStateSetup() {
	if (receivedLobbies) {
		for (var i = 0; i < messages.length; i++) {
			console.log(messages[i]);
			if (messages[i] != "lobbylist begin" && messages[i] != "lobbylist end") {
				var lobbyInfo = JSON.parse(messages[i]);
				var tmpButton = new Button();
				tmpButton.create(ctx, 100, 200, 150);
				tmpButton.setText(lobbyInfo.name, 16);
				lobbyButtons.push(tmpButton);
			}
		}
		receivedLobbies = false;
	} else {
		messages.length = 0;
		sendMsg("menu getLobbies");
	}
}

function lobbyListState() {
	background.draw(0, 0);
	if (receivedLobbies) {
		lobbyListStateSetup()
	}
	for (var i = 0; i < lobbyButtons.length; i++) {
		lobbyButtons[i].draw(50, 50+i*35, canvas.width-100, 30);
		if (lobbyButtons[i].isClicked()) {
			gameState = "playState";
		}
	}
}

function playState() {
	background.draw(0, 0);
	hero.draw(player.x, player.y);
	
	if (mouse.clicked) {
		player.x = mouse.x;
		player.y = mouse.y;
		var jsonString = JSON.stringify(player);
		sendMsg(jsonString);
	}

	if (curMsg) {
		if (curMsg[0] == '{') {
			var jsObject = JSON.parse(curMsg);
			var jsonString = JSON.stringify(player);
			otherPlayer.x = jsObject.x;
			otherPlayer.y = jsObject.y;
		}
	}
	hero.draw(otherPlayer.x, otherPlayer.y);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (gameState == "mainMenuState") {
		mainMenuState();
	} else if (gameState == "lobbyListState") {
		lobbyListState();
	} else {
		playState();
	}
	mouse.clicked = false;
}

var FPS = 60;
setInterval(function() {
	draw();
}, 1000 / FPS);