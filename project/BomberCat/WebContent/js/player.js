function Player() {
	this.x = 0;
	this.y = 0;
	this.speed = 32;
	this.name = "";

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

	this.dropBomb = function() {
		bombs.add(this.x, this.y);
	}
}