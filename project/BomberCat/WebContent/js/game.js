var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var background = new Sprite();
var hero = new Sprite();

var soundtrack = new Audio(
		'https://raw.githubusercontent.com/BomberCatDHBW/bombercat/master/Soundtrack/BomberCatSoundtrackPrototype001.mp3');

hero.load("img/hero.png");
background.load("img/background.png");

var gameState = "mainMenuState";// mainMenuState, playState
var player = new Player();
var otherPlayer = new Player();
var playButton = new Button();
var backButton = new Button();
var nameField = new TextField();
var joinLobbyButton = new Button();
var createLobbyButton = new Button();
var createButton = new Button();
var lobbyNameField = new TextField();
setup();

function setup() {
	playButton.create(100, 200, 150);
	playButton.setText("Play Game!", 50);

	nameField.create(100, 200, 150);
	nameField.setLabelText("Name: ", 30);

	backButton.create(100, 200, 150);
	backButton.setText("Back", 40);

	joinLobbyButton.create(100, 200, 150);
	joinLobbyButton.setText("Join Lobby", 40);

	createLobbyButton.create(100, 200, 150);
	createLobbyButton.setText("Create Lobby", 45);

	createButton.create(100, 200, 150);
	createButton.setText("Create", 45);

	lobbyNameField.create(100, 200, 150);
	lobbyNameField.setLabelText("Lobby Name: ", 30);
}

function drawStroked(text, fontSize, x, y) {
	context.font = fontSize + "px Sans-serif"
	context.strokeStyle = 'black';
	context.lineWidth = 3;
	context.strokeText(text, x, y);
	context.fillStyle = 'white';
	context.fillText(text, x, y);
}

function mainMenuState() {
	// background.draw(0, 0);

	drawStroked("BOMBERCAT", 60, 60, 90);

	playButton.draw(50, 200, canvas.width - 100, 80);
	nameField.draw(50, 140, canvas.width - 100, 50);

	if (playButton.isClicked() && nameField.text.length >= 3) {
		if (connected) {
			gameState = "preLobbyState";
			sendMsg("menu setName " + nameField.text);
			// soundtrack.play();
		} else {
			playButton.setText("No Connection to Server", 50)
		}
	}
}

function preLobbyState() {

	joinLobbyButton.draw(50, 200, canvas.width - 100, 80);
	createLobbyButton.draw(50, 300, canvas.width - 100, 80);

	if (joinLobbyButton.isClicked()) {
		gameState = "lobbyListState";
	}
	if (createLobbyButton.isClicked()) {
		gameState = "createLobbyState";
	}
}

var lobbyButtons = new Array();

var isLobbyListStateLoaded = false;
function loadLobbyListState() {
	if (!gotResponse) {
		lobbyButtons.length = 0;
		sendAndGetMessages("menu getLobbies", "lobbylist end");
	} else {
		for (var i = 0; i < messages.length; i++) {
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
	// background.draw(0, 0);
	for (var i = 0; i < lobbyButtons.length; i++) {
		lobbyButtons[i].draw(50, 50 + i * 35, canvas.width - 100, 30);
		if (lobbyButtons[i].isClicked()) {
			sendMsg("menu joinLobby " + lobbyButtons[i].text);
			gameState = "playState";
		}
	}
	backButton.draw(50, 700, 100, 60);
	if (backButton.isClicked()) {
		gameState = "preLobbyState";
		isLobbyListStateLoaded = false;
	}
}

function createLobbyState() {
	backButton.draw(50, 700, 100, 60);
	lobbyNameField.draw(50, 140, canvas.width - 100, 50);

	if (createButton.isClicked() && lobbyNameField.text.length >= 3) {
		sendMsg("menu createLobby "+ lobbyNameField.text);
	}

	if (backButton.isClicked()) {
		gameState = "preLobbyState";
	}
	createButton.draw(canvas.width - 200, 700, 150, 60);
	if (backButton.isClicked()) {
		gameState = "preLobbyState";
	}
}

var isPlayStateLoaded = false;
var map = new Map();
function loadPlayState() {
	if (!gotResponse) {
		map.getMap();
	} else {
		gotResponse = false;
		isPlayStateLoaded = true;
		map.parse();
	}
}

function playState() {
	if (!isPlayStateLoaded) {
		loadPlayState();
	} else {
		map.draw();
		hero.draw(player.x, player.y);
	}

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
	// hero.draw(otherPlayer.x, otherPlayer.y);
}

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	if (gameState == "mainMenuState") {
		mainMenuState();
	} else if (gameState == "preLobbyState") {
		preLobbyState();
	} else if (gameState == "createLobbyState") {
		createLobbyState();
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
