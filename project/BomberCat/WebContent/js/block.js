function Block() {
	this.x = 0;
	this.y = 0;
	this.type = 0;
	this.sprite = new Sprite();

	this.load = function(imgSrc) {
		this.sprite.load(imgSrc);
	}

	this.draw = function(x, y) {
		this.sprite.draw(x, y);
	}
	
	this.drawMini = function(x, y, size) {
		this.sprite.drawMini(x, y, size);
	}
}