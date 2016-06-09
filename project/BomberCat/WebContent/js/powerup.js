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
			if (this.powerups[i].x == player.x && this.powerups[i].y == player.y) {
				this.powerups[i].picked = true;
			}
			if (!this.powerups[i].picked) {
				if (type = "SpeedUp") {
					this.speedupSprite.draw(this.powerups[i].x, this.powerups[i].y);
				} else if (type = "ExplosionSize") {
					this.rangeupSprite.draw(this.powerups[i].x, this.powerups[i].y);
				} else if (type = "BombAmount") {
					this.plusbombSprite.draw(this.powerups[i].x, this.powerups[i].y);
				}
			} else {
				this.powerups.splice(i,1);
			}
		}
	}
}