var label = new Label();

function Label() {
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.r = mainColorR;
	this.g = mainColorG;
	this.b = mainColorB;
	this.text;
	this.fontSize = 20;

	this.setColor = function(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
	
	this.setText = function(text, fontSize) {
		this.text = text;
		this.fontSize = fontSize;
	}

	this.draw = function(x, y, w, h) {
		context.fillStyle = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
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
}