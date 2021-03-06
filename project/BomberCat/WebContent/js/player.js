function Player() {
	this.x = -32;
	this.y = -32;
	this.speed = 16;
	this.name = "";
	this.sendPosMsg = new Message();
	this.sendBombDropMsg = new Message();
	this.ready = false;
	this.alive = true;
	this.canMove = true;
	this.velX = 0;
	this.velY = 0;
	
	this.goLeft = function() {
		this.sendPosition(parseInt(this.x) - parseInt(32), this.y);
	}

	this.goRight = function() {
		this.sendPosition(parseInt(this.x) + parseInt(32), this.y);
	}

	this.goUp = function() {
		this.sendPosition(this.x, parseInt(this.y)- parseInt(32));
	}

	this.goDown = function() {
		this.sendPosition(this.x, parseInt(this.y) + parseInt(32));
	}
	
	this.sendPosition = function(x, y) {
		if (this.canMove) {	
			this.sendPosMsg.send("ingame moveToPosition " + (x/32.0) + ";" + (y/32.0));
			this.sendPosMsg.gotSent = false;
		}
	}

	this.dropBomb = function() {
		if (this.canMove) {
			var canPlace = true;
			for (var i = 0; i < bombs.bombs.length; i++) {
				if (bombs.bombs[i].x == this.x && bombs.bombs[i].y == this.y) {
					canPlace = false;
					break;
				}
			}
			if (canPlace) {
				console.log("canPlace");
				this.sendBombDropMsg.send("ingame placeBomb " + (this.x/32.0) + ";" + (this.y/32.0));
				this.sendBombDropMsg.gotSent = false;
			} else {
				console.log("nooo !!! cantPlace");
			}
		}
	}
	
	this.move = function() {
		if (this.velX > 0) {
			this.x += 32/parseInt(this.speed);
			this.velX -= 32/parseFloat(this.speed);
		}
		if (this.velX < 0) {
			this.x -= 32/parseInt(this.speed);
			this.velX += 32/parseFloat(this.speed);
		}
		if (this.velY > 0) {
			this.y += 32/parseInt(this.speed);
			this.velY -= 32/parseFloat(this.speed);
		}
		if (this.velY < 0) {
			this.y -= 32/parseInt(this.speed);
			this.velY += 32/parseFloat(this.speed);
		}
		if (this.velX == 0 && this.velY == 0) {
			this.canMove = true;
		}
	};
}


function Players() {
	this.players = new Array();
	this.playerSprite = new Sprite();
	this.getPosMsg = new Message();
	this.dieMsg = new Message();

	this.load = function(playerImgSrc) {
		this.playerSprite.load(playerImgSrc);
	}

	this.add = function() {
		var player = new Player();
		console.log("adding player");
		this.players.push(player);
	}

	this.draw = function() {
		for (var i = 0; i < this.players.length; i++) {
			if (i == 0) {
				if (players.players[0].ready) {		
					if (65 in keysDown) {
						// Left key
						players.players[0].goLeft();
					}
					if (87 in keysDown) {
						// Up key
						players.players[0].goUp();
					}
					if (68 in keysDown) {
						// Right key
						players.players[0].goRight();
					}
					if (83 in keysDown) {
						// Down key
						players.players[0].goDown();
					}
					if (32 in keysDown) {
						// Spacebar
						players.players[0].dropBomb();
					}
				}
			}
			if (this.getPosMsg.get("info", "setPosition")) {
				var position = this.getPosMsg.content.split(";");
				var username = position[0];
				var x = position[1]*32.0;
				var y = position[2]*32.0;
				for (var j = 0; j < this.players.length; j++) {
					if (username == this.players[j].name) {
						this.players[j].velX = x-this.players[j].x;
						this.players[j].velY = y-this.players[j].y;
						this.players[j].canMove = false;
						break;
					}
				}
			}
			if (this.dieMsg.get("info", "playerDied")) {
				for (var j = 0; j < this.players.length; j++) {
					if (this.dieMsg.content == this.players[j].name) {
						this.players[j].alive = false;
						break;
					}
				}
			}
			if (this.players[i].alive) {
				context.font = "16px Arial";
				context.fillText(this.players[i].name, this.players[i].x+5, this.players[i].y+5);
				this.players[i].move();
				this.playerSprite.draw(this.players[i].x, this.players[i].y);
			}
		}
	}
}