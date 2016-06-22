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

window.addEventListener('keydown', this.keydown, false);
window.addEventListener('keyup', this.keyup, false);

var keysDown = {};

function keyup(e) {
	delete keysDown[e.keyCode];
}

function keydown(e) {
	keysDown[e.keyCode] = true;
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