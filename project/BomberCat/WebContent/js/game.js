var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var background = new Sprite();
var hero = new Sprite();

hero.load("img/player.png");
background.load("img/background.png");

var gameState = "mainMenuState";
var player = new Player();
var otherPlayer = new Player();
var playButton = new Button();
setup();

function setup() {
	playButton.create(100, 200, 150);
	playButton.setText("Play Game!", 50);
}

function mainMenuState() {
	background.draw(0, 0);
	playButton.draw(50, 200, canvas.width - 100, 80);

	if (playButton.isClicked()) {
		gameState = "lobbyListState";
	}
}

var lobbyButtons = [];

var isLobbyListStateLoaded = false;
function loadLobbyListState() {
	if (!gotResponse) {
		sendAndGetMessages("menu getLobbies", "lobbylist end");
	} else {
		for (var i = 0; i < messages.length; i++) {
			console.log(messages[i]);
			if (messages[i] != "lobbylist begin"
					&& messages[i] != "lobbylist end") {
				var lobbyInfo = JSON.parse(messages[i]);
				var tmpButton = new Button();
				tmpButton.create(100, 200, 150);
				tmpButton.setText(lobbyInfo.name, 16);
				lobbyButtons.push(tmpButton);
			}
		}
		gotResponse = false;
		isLobbyListStateLoaded = true;
	}
}

function lobbyListState() {
	if (!isLobbyListStateLoaded) {
		loadLobbyListState()
	}
	background.draw(0, 0);
	for (var i = 0; i < lobbyButtons.length; i++) {
		lobbyButtons[i].draw(50, 50 + i * 35, canvas.width - 100, 30);
		if (lobbyButtons[i].isClicked()) {
			gameState = "playState";
		}
	}
}

var isPlayStateLoaded = false;
var map = new Map();
function loadPlayState() {
	if (!gotResponse) {
		map.getMap();
	} else {
		console.log(map.jsonMap);
		gotResponse = false;
		isPlayStateLoaded = true;
	}
}

function playState() {
	if (!isPlayStateLoaded) {
		loadPlayState();
	}
	background.draw(0, 0);
	hero.draw(player.x, player.y);

	if (mouse.clicked) {
		player.x = mouse.x;
		player.y = mouse.y;
		// var jsonString = JSON.stringify(player);
		// sendMsg(jsonString);
	}

	if (curMsg) {
		if (curMsg[0] == '{') {
			// var jsObject = JSON.parse(curMsg);
			// var jsonString = JSON.stringify(player);
			// otherPlayer.x = jsObject.x;
			// otherPlayer.y = jsObject.y;
		}
	}
	hero.draw(otherPlayer.x, otherPlayer.y);
}

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
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
