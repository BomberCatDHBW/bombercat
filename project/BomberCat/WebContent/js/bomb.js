function Bomb() {
	this.x = 0;
	this.y = 0;
	this.timer = 100;

	this.set = function(x, y) {
		this.x = x;
		this.y = y;
	}
}

function Bombs() {
	this.bombs = new Array();
	this.timer = 100;
	this.sprite = new Sprite();

	this.load = function(imgSrc) {
		this.sprite.load(imgSrc);
	}

	this.add = function(x, y) {
		console.log("added bomb");
		var bomb = new Bomb();
		bomb.set(x, y);
		this.bombs.push(bomb);
	}

	this.draw = function() {
		for (var i = 0; i < this.bombs.length; i++) {
			if (this.bombs[i].timer > 0) {
				this.bombs[i].timer -= 1;
				this.sprite.draw(this.bombs[i].x, this.bombs[i].y);
			}
		}
	}
}