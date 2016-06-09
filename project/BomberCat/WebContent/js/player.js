function Player() {
	this.x = 0;
	this.y = 0;
	this.speed = 32;
	this.name = "";
	this.sprite = new Sprite();
	this.sendPosMsg = new Message();
	this.sendBombDropMsg = new Message();
	this.ready = false;

	this.load = function(imgSrc) {
		this.sprite.load(imgSrc);
		this.ready = true;
	}
	
	this.goLeft = function() {
		this.sendPosition(parseInt(this.x) - parseInt(this.speed), this.y);
	}

	this.goRight = function() {
		this.sendPosition(parseInt(this.x) + parseInt(this.speed), this.y);
	}

	this.goUp = function() {
		this.sendPosition(this.x, parseInt(this.y)- parseInt(this.speed));
	}

	this.goDown = function() {
		this.sendPosition(this.x, parseInt(this.y) + parseInt(this.speed));
	}
	
	this.sendPosition = function(x, y) {
		this.sendPosMsg.send("ingame moveToPosition " + (x/32.0) + ";" + (y/32.0));
	}
	
	this.draw = function() {
		this.sprite.draw(this.x, this.y);
		if (this.sendPosMsg.get("info", "setPosition")) {
			var position = this.sendPosMsg.content.split(";");
			var username = position[0];
			this.x = position[1]*32.0;
			this.y = position[2]*32.0;
		} else if (this.sendPosMsg.get("error", "6")) {
			this.sendPosMsg.gotSent = false;
		}
	}

	this.dropBomb = function() {
		//bombs.add(this.x, this.y);
		this.sendBombDropMsg.send("ingame placeBomb " + (this.x/32.0) + ";" + (this.y/32.0));
		this.sendBombDropMsg.gotSent = false;
	}
}