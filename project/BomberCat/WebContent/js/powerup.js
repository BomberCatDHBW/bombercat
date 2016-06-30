function Powerup() {
	this.x = 0;
	this.y = 0;
	this.picked = false;
	this.type = 0;

	this.set = function(x, y) {
		this.x = x;
		this.y = y;
	}
}

function Powerups() {
	this.powerups = new Array();
	this.speedupSprite = new Sprite();
	this.rangeupSprite = new Sprite();
	this.plusbombSprite = new Sprite();
	this.powerupMsg = new Message();
	this.pickupSound = new Audio("sound/powerup.wav");

	this.load = function(speedupSpriteSrc, rangeupSpriteSrc, plusbombSpriteSrc) {
		this.speedupSprite.load(speedupSpriteSrc);
		this.rangeupSprite.load(rangeupSpriteSrc);
		this.plusbombSprite.load(plusbombSpriteSrc);
	}

	this.add = function(x, y, type) {
		var powerup = new Powerup();
		powerup.set(x, y);
		powerup.type = type;
		this.powerups.push(powerup);
	}

	this.draw = function() {
		for (var i = 0; i < this.powerups.length; i++) {
			for (var j = 0; j < players.players.length; j++) {
				if (this.powerups[i].x == players.players[j].x && this.powerups[i].y == players.players[j].y) {
					this.powerups[i].picked = true;
					this.pickupSound.play();
					if (this.powerups[i].type == "SpeedUp")
					{
						if (players.players[j].speed < 2) {
							players.players[j].speed /= 2;
						}
					}
				}
			}
			if (!this.powerups[i].picked) {
				if (this.powerups[i].type == "SpeedUp") {
					this.speedupSprite.draw(this.powerups[i].x, this.powerups[i].y);
				} else if (this.powerups[i].type == "ExplosionSize") {
					this.rangeupSprite.draw(this.powerups[i].x, this.powerups[i].y);
				} else if (this.powerups[i].type == "BombAmount") {
					this.plusbombSprite.draw(this.powerups[i].x, this.powerups[i].y);
				}
			} else {
				this.powerups.splice(i,1);
			}
		}
	}
}