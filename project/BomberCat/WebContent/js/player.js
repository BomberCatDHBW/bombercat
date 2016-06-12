function Player() {
	this.x = -32;
	this.y = -32;
	this.speed = 32;
	this.name = "";
	this.sendPosMsg = new Message();
	this.sendBombDropMsg = new Message();
	this.ready = false;
	this.alive = true;
	
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
		this.sendPosMsg.gotSent = false;
	}

	this.dropBomb = function() {
		//bombs.add(this.x, this.y);
		this.sendBombDropMsg.send("ingame placeBomb " + (this.x/32.0) + ";" + (this.y/32.0));
		this.sendBombDropMsg.gotSent = false;
	}
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
			if (this.getPosMsg.get("info", "setPosition")) {
				var position = this.getPosMsg.content.split(";");
				var username = position[0];
				var x = position[1]*32.0;
				var y = position[2]*32.0;
				for (var j = 0; j < this.players.length; j++) {
					if (username == this.players[j].name) {
						this.players[j].x = x;
						this.players[j].y = y;
						break;
					}
				}
			}
			if (this.dieMsg.get("info", "playerDied")) {
				this.players[0].alive = false;
			}
			if (this.players[i].alive) {
				context.font = "16px Arial";
				context.fillText(this.players[i].name, this.players[i].x+5, this.players[i].y+5);
				this.playerSprite.draw(this.players[i].x, this.players[i].y);
			}
		}
	}
}