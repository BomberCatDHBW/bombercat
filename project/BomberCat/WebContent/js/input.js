function mouse() {
	this.x = 0;
	this.y = 0;
	this.clicked = false;
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
	if (code == 37 || code == 65)
	{
		 //Left key
		player.goLeft();
	}
	if (code == 38 || code == 87)
	{
		 //Up key
		player.goUp();
	}
	if (code == 39 || code == 68)
	{
		//Right key
		player.goRight();
	}
	if (code == 40 || code == 83)
	{
		 //Down key
		player.goDown();
	}
}