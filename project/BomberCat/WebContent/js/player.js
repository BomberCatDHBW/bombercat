function Player() {
	this.x = 0;
	this.y = 0;
	this.speed = 32;
	
	this.goLeft = function() {
		this.x -= this.speed;
	}

	this.goRight = function() {
		this.x += this.speed;
	}
	
	this.goUp = function() {
		this.y -= this.speed;
	}


	this.goDown = function() {
		this.y += this.speed;
	}
}