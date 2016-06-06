function Player() {
	this.x = 0;
	this.y = 0;
	this.speed = 32;
	this.name = "";
	this.sprite = new Sprite();
	this.sendPosMsg = new Message();
	this.ready = false;

	this.load = function(imgSrc) {
		this.sprite.load(imgSrc);
		this.ready = true;
	}
	
	this.goLeft = function() {
		this.x = parseInt(this.x)- parseInt(this.speed);
		this.sendPosition();
	}

	this.goRight = function() {
		this.x = parseInt(this.x) + parseInt(this.speed);
		this.sendPosition();
	}

	this.goUp = function() {
		this.y = parseInt(this.y)- parseInt(this.speed);
		this.sendPosition();
	}

	this.goDown = function() {
		this.y = parseInt(this.y) + parseInt(this.speed);
		this.sendPosition();
	}
	
	this.sendPosition = function() {
		this.sendPosMsg.send("ingame moveToPosition " + this.x + ";" + this.y);
	}
	
	this.draw = function() {
		this.sprite.draw(this.x, this.y);
		if (this.sendPosMsg.get("info", "moveToPosition")) {
			console.log("pos: " + this.sendPosMsg.content);
			var position = this.sendPosMsg.content.split(" ");
			var username = position[0];
			if (username != name) {
				this.x = position[1];
				this.y = position[2];
			}
		}
	}

	this.dropBomb = function() {
		bombs.add(this.x, this.y);
	}
}