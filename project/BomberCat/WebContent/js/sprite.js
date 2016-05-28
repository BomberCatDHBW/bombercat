function Sprite() {
	this.loaded = false;
	this.image = new Image();

	this.load = function(imgSrc) {
		this.loaded = true;
		this.image.src = imgSrc;
	}

	this.draw = function(x, y) {
		this.image.onload = function() {
			this.loaded = true;
		};
		
		if (this.loaded) {
			context.drawImage(this.image, x, y);
		}
	}
}