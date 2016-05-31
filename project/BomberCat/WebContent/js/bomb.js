function Bomb() {
	this.x = 0;
	this.y = 0;
	this.timer = 100;

	this.load = function(imgSrc) {
		this.sprite.load(imgSrc);
	}
}

function Bombs() {
	this.bombs = new Array();
	this.timer = 100;
	this.sprite = new Sprite();

	this.load = function(imgSrc) {
		this.sprite.load(imgSrc);
	}

	this.draw = function() {
		for (var i = 0; i < bombs.length; i++) {
			if (bombs[i].timer > 0) {
				bombs[i].timer -= 1;
				this.sprite.draw(x, y);
			}
		}
	}
}