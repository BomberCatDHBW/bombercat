function mouse() {
	this.x = 0;
	this.y = 0;
	this.clicked = false;
}

function keyboard() {
	this.curLetter = "";
}

canvas.addEventListener("click", onClick, false);
canvas.addEventListener("mousemove", onMove, false);

function onClick(e) {
	var rect = canvas.getBoundingClientRect();
	mouse.x = e.clientX - rect.left;
	mouse.y = e.clientY - rect.top;
	mouse.clicked = true;
}

function onMove(e) {
	var rect = canvas.getBoundingClientRect();
	mouse.x = e.clientX - rect.left;
	mouse.y = e.clientY - rect.top;
}

window.addEventListener('keydown', this.check, false);
window.addEventListener('keyup', this.keyup, false);

var keyAllowed = {};
for (var i = 0; i < 256; i++) {
	keyAllowed[i] = true;
}

function keyup(e) {
	keyAllowed[e.keyCode] = true;
}

function check(e) {
	var code = e.keyCode;
	if (players.players[0].ready) {		
		if (code == 37 || code == 65) {
			// Left key
			if (keyAllowed[37] && keyAllowed[65])
			{
				players.players[0].goLeft();
			}
		}
		if (code == 38 || code == 87) {
			// Up key
			if (keyAllowed[38] && keyAllowed[87])
			{
				players.players[0].goUp();
			}
		}
		if (code == 39 || code == 68) {
			// Right key
			if (keyAllowed[39] && keyAllowed[68])
			{
				players.players[0].goRight();
			}
		}
		if (code == 40 || code == 83) {
			// Down key
			if (keyAllowed[40] && keyAllowed[83])
			{
				players.players[0].goDown();
			}
		}
		if (code ==  32) {
			// Spacebar
			if (keyAllowed[32])
			{
				players.players[0].dropBomb();
			}
		}
		keyAllowed[code] = false;
	}
}

window.addEventListener('keypress', this.keyPress, false);

function keyPress(e) {
	var code = e.keyCode;
	keyboard.curLetter = String.fromCharCode(code);
}

//Prevent page-back if backspace and send backspace to keyboard.curLetter
function onBackspace(e, callback) {
	var key;
	if (typeof e.keyIdentifier !== "undefined") {
		key = e.keyIdentifier;

	} else if (typeof e.keyCode !== "undefined") {
		key = e.keyCode;
	}
	if (key === 'U+0008' || key === 'Backspace' || key === 8) {
		if (typeof callback === "function") {
			callback();
			keyboard.curLetter = "delete";
		}
		return true;
	}
	return false;
}

window.addEventListener('keydown', function(e) {
	switch (e.target.tagName.toLowerCase()) {
	case "input":
	case "textarea":
		break;
	case "body":
		onBackspace(e, function() {
			e.preventDefault();
		});

		break;
	}
}, true);