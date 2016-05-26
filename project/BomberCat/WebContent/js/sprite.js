function Sprite() {
	this.loaded = false;
	this.image = new Image();
	this.context;
	this.x = 0;
	this.y = 0;

	this.load = function(ctx, imgSrc) {
		loaded = true;
		this.image.src = imgSrc;
		context = ctx;
	}

	this.draw = function(x, y) {
		this.image.onload = function() {
			loaded = true;
		};
		
		if (loaded) {
			context.drawImage(this.image, x, y);
		}
	}
}