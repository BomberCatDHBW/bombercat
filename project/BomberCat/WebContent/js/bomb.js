function Bomb() {
	this.x = 0;
	this.y = 0;
	this.range = 1;

	this.set = function(x, y) {
		this.x = x;
		this.y = y;
	}
}

function Explosion() {
	this.x = 0;
	this.y = 0;
	this.timer = 10;

	this.set = function(x, y) {
		this.x = x;
		this.y = y;
	}
}

function Bombs() {
	this.bombs = new Array();
	this.explosions = new Array();
	this.timer = 100;
	this.bombSprite = new Sprite();
	this.explosionSprite = new Sprite();
	this.bombMsg = new Message();
	this.getBombMsg = new Message();
	this.boomSound = new Audio("sound/pickup.wav");

	this.load = function(bombSrc, explosionSrc) {
		this.bombSprite.load(bombSrc);
		this.explosionSprite.load(explosionSrc);
	}

	this.add = function(x, y, range) {
		var bomb = new Bomb();
		bomb.set(x, y);
		bomb.range = range;
		this.bombs.push(bomb);
	}

	this.addExplosion = function(x, y) {
		var explosion = new Explosion();
		explosion.set(x, y);
		this.explosions.push(explosion);
		for (var i = 0; i < this.bombs.length; i++) {
			if (this.bombs[i].x == x && this.bombs[i].y == y) {
				this.bombs.splice(i, 1);
				if (this.boomSound.paused) {
					console.log("boom");
					this.boomSound.play();
				}
			}
		}
	}

	this.draw = function() {
		for (var i = 0; i < this.explosions.length; i++) {
			if (this.explosions[i].timer > 0) {
				this.explosions[i].timer -= 1;
				this.explosionSprite.draw(this.explosions[i].x,
						this.explosions[i].y);
			}
		}
		for (var i = 0; i < this.bombs.length; i++) {
			this.bombSprite.draw(this.bombs[i].x, this.bombs[i].y);
		}
		if (this.getBombMsg.get("info", "bombPlaced")) {
			var info = this.getBombMsg.content.split(";");
			var x = info[0] * 32.0;
			var y = info[1] * 32.0;
			var range = info[2];
			this.add(x, y, range);
		}
	}
}