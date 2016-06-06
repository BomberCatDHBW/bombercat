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

function check(e) {
	var code = e.keyCode;
	if (player.ready) {		
		if (code == 37 || code == 65) {
			// Left key
			player.goLeft();
		}
		if (code == 38 || code == 87) {
			// Up key
			player.goUp();
		}
		if (code == 39 || code == 68) {
			// Right key
			player.goRight();
		}
		if (code == 40 || code == 83) {
			// Down key
			player.goDown();
		}
		if (code ==  32) {
			// Spacebar
			player.dropBomb();
		}
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