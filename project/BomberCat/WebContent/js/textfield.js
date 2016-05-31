function TextField() {
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.r = 0;
	this.g = 0;
	this.b = 0;
	this.label = "";
	this.text = "";
	this.fontSize = 20;
	this.selected = false;
	this.blink = 0;

	this.create = function(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
	
	this.setLabelText = function(label, fontSize) {
		this.label = label;
		this.fontSize = fontSize;
	}

	this.draw = function(x, y, w, h) {
		if (keyboard.curLetter != "" && keyboard.curLetter != null) {
			if (keyboard.curLetter == "delete") {
				this.text = this.text.slice(0, -1);
			} else {
				this.text += keyboard.curLetter;
			}
			keyboard.curLetter = "";
		}
		this.selected = false;
		context.fillStyle = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		context.fillRect(x, y, w, h);
		var blinkchar = "";
		if (this.text != null) {
			if (this.blink < 20) {
				this.blink++;
				blinkchar = "_";
			} else if (this.blink < 40) {
				this.blink++;
				blinkchar = "";
			} else {
				this.blink = 0;
			}
			context.font=this.fontSize+"px Arial";
			context.fillStyle = "white";
			context.fillText(this.label + this.text + blinkchar,x+5,y+this.fontSize+5);
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