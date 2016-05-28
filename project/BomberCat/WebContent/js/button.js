function Button() {
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.r = 0;
	this.g = 0;
	this.b = 0;
	this.text;
	this.fontSize = 20;
	this.selected = false;

	this.create = function(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
	
	this.setText = function(text, fontSize) {
		this.text = text;
		this.fontSize = fontSize;
	}

	this.draw = function(x, y, w, h) {
		this.selected = false;
		if (this.isSelected()) {
			this.selected = true;
			context.fillStyle = "rgb(" + (this.b+50) + "," + (this.g+50) + "," + (this.b+50) + ")";
		} else {
			context.fillStyle = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
		}
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		context.fillRect(x, y, w, h);
		if (this.text != null) {
			context.font=this.fontSize+"px Arial";
			context.fillStyle = "white";
			context.fillText(this.text,x+5,y+this.fontSize+5);
		}
	}

	this.isSelected = function() {
		if (mouse.x > this.x && mouse.x < this.x+this.w) {
			if (mouse.y > this.y && mouse.y < this.y+this.h) {
				return true;
			}
		}
		return false;
	}
	
	this.isClicked = function() {
		if (this.selected && mouse.clicked) {
			return true;
		}
		return false;
	}
}