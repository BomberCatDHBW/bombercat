function Powerup() {
	this.x = 0;
	this.y = 0;
	this.picked = false;

	this.set = function(x, y) {
		this.x = x;
		this.y = y;
	}
}

function Powerups() {
	this.powerups = new Array();
	this.powerupSprite = new Sprite();
	this.powerupMsg = new Message();

	this.load = function(imgSrc) {
		this.powerupSprite.load(imgSrc);
	}

	this.add = function(x, y) {
		var powerup = new Powerup();
		powerup.set(x, y);
		this.powerups.push(powerup);
	}

	this.draw = function() {
		for (var i = 0; i < this.powerups.length; i++) {
			if (this.powerups[i].x == player.x && this.powerups[i].y == player.y) {
				this.powerups[i].picked = true;
			}
			if (!this.powerups[i].picked) {
				this.powerupSprite.draw(this.powerups[i].x, this.powerups[i].y);
			} else {
				this.powerups.splice(i,1);
			}
		}
	}
}