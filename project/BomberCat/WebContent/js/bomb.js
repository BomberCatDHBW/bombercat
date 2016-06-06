function Bomb() {
	this.x = 0;
	this.y = 0;
	this.timer = 100;

	this.set = function(x, y) {
		this.x = x;
		this.y = y;
	}
}

function Explosion() {
	this.x = 0;
	this.y = 0;
	this.timer = 50;

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

	this.load = function(bombSrc, explosionSrc) {
		this.bombSprite.load(bombSrc);
		this.explosionSprite.load(explosionSrc);
	}

	this.add = function(x, y) {
		console.log("added bomb");
		var bomb = new Bomb();
		bomb.set(x, y);
		this.bombs.push(bomb);
	}

	this.draw = function() {
		for (var i = 0; i < this.explosions.length; i++) {
			if (this.explosions[i].timer > 0) {
				this.explosions[i].timer -= 1;
				this.explosionSprite.draw(this.explosions[i].x, this.explosions[i].y);
			}
		}
		for (var i = 0; i < this.bombs.length; i++) {
			if (this.bombs[i].timer > 0) {
				this.bombs[i].timer -= 1;
				this.bombSprite.draw(this.bombs[i].x, this.bombs[i].y);
			} else {
				this.bombMsg.send("ingame explodeBomb " + (this.bombs[i].x/32.0) + ";" + (this.bombs[i].y/32.0));
				this.bombMsg.gotSent = false;
				var explosion = new Explosion();
				explosion.set(this.bombs[i].x, this.bombs[i].y);
				this.explosions.push(explosion);
				sendMsg("")
				this.bombs.splice(i,1);
			}
		}
	}
}