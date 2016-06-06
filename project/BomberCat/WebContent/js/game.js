var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// var soundtrack = new
// Audio('https://raw.githubusercontent.com/BomberCatDHBW/bombercat/master/Soundtrack/BomberCatSoundtrackPrototype001.mp3');

bombs = new Bombs();

var gameState = "mainMenuState";// mainMenuState, playState, preGameLobbyState
// createLobbyState
var playButton = new Button();
var backButton = new Button();
var nameField = new TextField();
var joinLobbyButton = new Button();
var createLobbyButton = new Button();
var createButton = new Button();
var lobbyNameField = new TextField();
var nextButton = new Button();
var previousButton = new Button();
var startGameButton = new Button();
var map = new Map();
var player = new Player();
setup();

function setup() {
	bombs.load("img/bomb.png", "img/explosion.png");
	playButton.setText("Play Game!", 50);
	nameField.setLabelText("Name: ", 30);
	backButton.setText("Back", 40);
	joinLobbyButton.setText("Join Lobby", 40);
	createLobbyButton.setText("Create Lobby", 45);
	createButton.setText("Create", 45);
	lobbyNameField.setLabelText("Lobby Name: ", 30);
	nextButton.setText(">", 30);
	previousButton.setText("<", 30);
	startGameButton.setText("Start Game", 40);
}

function drawStroked(text, fontSize, x, y) {
	context.font = fontSize + "px Sans-serif";
	context.strokeStyle = 'black';
	context.lineWidth = 3;
	context.strokeText(text, x, y);
	context.fillStyle = 'white';
	context.fillText(text, x, y);
}

function mainMenuState() {
	playButton.draw(50, 200, canvas.width - 100, 80);
	nameField.draw(50, 140, canvas.width - 100, 50);

	if (playButton.isClicked() && nameField.text.length >= 3) {
		if (connected) {
			gameState = "preLobbyState";
			sendMsg("menu setName " + nameField.text);
			player.name = nameField.text;
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

var lobby = new Lobby();
var lobbyButtons = new Array();
var getLobbyMsg = new Message();

var isLobbyListStateLoaded = false;
function loadLobbyListState() {
	lobbyButtons.length = 0;
	getLobbyMsg.send("menu getLobbies");
	if (getLobbyMsg.get("info", "lobbies")) {
		isLobbyListStateLoaded = true;
		// console.log(getLobbyMsg.content);
		var jsonLobbies = JSON.parse(getLobbyMsg.content);
		for (var i = 0; i < Object.keys(jsonLobbies.lobbies).length; i++) {
			var lobbyInfo = jsonLobbies.lobbies[i].name;
			var tmpButton = new Button();
			tmpButton.setText(lobbyInfo, 16);
			lobbyButtons.push(tmpButton);
		}
	}
}

function lobbyListState() {
	if (!isLobbyListStateLoaded) {
		loadLobbyListState()
	}
	for (var i = 0; i < lobbyButtons.length; i++) {
		lobbyButtons[i].draw(50, 50 + i * 35, canvas.width - 100, 30);
		if (lobbyButtons[i].isClicked()) {
			lobby.name = lobbyButtons[i].text;
			lobby.players.length = 0;
			sendMsg("menu joinLobby " + lobbyButtons[i].text);
			gameState = "preGameLobbyState";
		}
	}
	backButton.draw(50, 700, 100, 60);
	if (backButton.isClicked()) {
		gameState = "preLobbyState";
		isLobbyListStateLoaded = false;
	}
}

var createLobbyLoaded = false;
var mapsObject;
var curMap = 0;
var getMapNamesMsg = new Message();
function loadCreateLobby() {
	getMapNamesMsg.send("lobby getMapNames");
	if (getMapNamesMsg.get("info", "mapNames")) {
		mapsObject = JSON.parse(getMapNamesMsg.content);
		// for (var i = 0; i < Object.keys(mapsObject.maps).length; i++) {
		// console.log(mapsObject.maps[i]);
		// }
		createLobbyLoaded = true;
	}
}

var getMapMsg = new Message();
function createLobbyState() {
	if (!createLobbyLoaded) {
		loadCreateLobby();
	} else {
		if (!map.loaded) {
			getMapMsg.send("lobby getMap " + mapsObject.maps[curMap]);
			if (getMapMsg.get("info", "map")) {
				map.jsonMap = getMapMsg.content;
				map.parse();
			}
		} else {
			map.drawMini(200, 200, 0.5);
		}
		if (curMap != 0) {
			previousButton.draw(50, 400, 50, 50);
			if (previousButton.isClicked()) {
				curMap--;
				map.loaded = false;
			}
		}
		if (map.loaded) {
			if (curMap < Object.keys(mapsObject.maps).length - 1) {
				nextButton.draw(660, 400, 50, 50);
				if (nextButton.isClicked()) {
					curMap++;
					map.loaded = false;
				}
			}
		}
	}
	backButton.draw(50, 700, 100, 60);
	lobbyNameField.draw(50, 140, canvas.width - 100, 50);

	if (createButton.isClicked() && lobbyNameField.text.length >= 3) {
		lobby.name = lobbyNameField.text
		sendMsg("menu createLobby " + lobbyNameField.text);
		sendMsg("lobby setLobbyMap " + mapsObject.maps[curMap]);
		gameState = "preGameLobbyState";
		lobby.players.length = 0;
	}

	if (backButton.isClicked()) {
		gameState = "preLobbyState";
	}
	createButton.draw(canvas.width - 200, 700, 150, 60);
}

var getPlayersMsg = new Message();
function loadPreGameLobbyState() {
	lobby.players.length = 0;
	lobby.leader = 0;
	getPlayersMsg.send("lobby getLobbyPlayers");
	if (getPlayersMsg.get("info", "players")) {
		preGameLobbyLoaded = true;
	}
}

var gameStartedMsg = new Message();
var lobbyClosedMsg = new Message();
var preGameLobbyLoaded = false;
function preGameLobbyState() {
	if (!preGameLobbyLoaded) {
		loadPreGameLobbyState();
	} else {
		if (map.loaded) {
			map.drawMini(50, 200, 0.5);
		} else {
			getMapMsg.send("lobby getLobbyMap");
			if (getMapMsg.get("info", "map")) {
				map.jsonMap = getMapMsg.content;
				map.parse();
			}
		}
		if (getPlayersMsg.get("info", "players")) {
			lobby.players.length = 0;
			var playersObject = JSON.parse(getPlayersMsg.content);
			lobby.leader = playersObject.leader;
			for (var i = 0; i < Object.keys(playersObject.players).length; i++) {
				lobby.players.push(playersObject.players[i]);
			}
		}
		if (gameStartedMsg.get("info", "gameStarted")) {
			gameState = "playState";
		}
		drawStroked((lobby.players.length + 1) + "/8" + " Players: ", 26, 600,
				50 + 35);
		if (lobby.leader != null && lobby.leader != "") {
			drawStroked("* [" + lobby.leader + "]", 24, 630, 50 + (2) * 35);
		}
		if (lobby.players.length > 0) {
			for (var i = 0; i < lobby.players.length; i++) {
				drawStroked("- " + lobby.players[i], 22, 630, 55 + (i + 3) * 35);
			}
		}
	}
	drawStroked("LOBBY: " + lobby.name, 60, 60, 60);
	drawStroked("waiting for host to start the game", 30, 60, 90);
	backButton.draw(50, 700, 100, 60);

	if (lobbyClosedMsg.get("info", "lobby")) {
		gameState = "preLobbyState";
		isLobbyListStateLoaded = false;
		map.loaded = false;
		preGameLobbyLoaded = false;
	}

	if (backButton.isClicked()) {
		isLobbyListStateLoaded = false;
		gameState = "preLobbyState";
		sendMsg("lobby leaveLobby");
		map.loaded = false;
		preGameLobbyLoaded = false;
	}

	if (lobby.leader == player.name) {
		startGameButton.draw(300, 700, 240, 60);
		if (startGameButton.isClicked()) {
			gameState = "playState";
			sendMsg("lobby startGame");
		}
	}
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
	} else if (gameState == "preGameLobbyState") {
		preGameLobbyState();
	} else {
		playState();
	}
	mouse.clicked = false;
}

var FPS = 60;
setInterval(function() {
	draw();
}, 1000 / FPS);

var isPlayStateLoaded = false;
function loadPlayState() {
	player.load("img/player.png");
	isPlayStateLoaded = true;
}

function playState() {
	if (!isPlayStateLoaded) {
		loadPlayState();
	} else {
		// map.drawMini(100,100, 0.5);
		map.draw();
		player.draw();
		bombs.draw();
	}

	if (mouse.clicked) {
		// player.x = mouse.x;
		// player.y = mouse.y;
		// var jsonString = JSON.stringify(player);
		// sendMsg(jsonString);
	}

	// if (curMsg) {
	// if (curMsg[0] == '{') {
	// var jsObject = JSON.parse(curMsg);
	// var jsonString = JSON.stringify(player);
	// otherPlayer.x = jsObject.x;
	// otherPlayer.y = jsObject.y;
	// }
	// }
}