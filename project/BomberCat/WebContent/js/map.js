function Map() {
	this.x = 0;
	this.y = 0;
	this.jsonMap;
	this.name;
	this.width;
	this.height;
	this.spawns = new Array();
	this.fieldRefs;
	this.parentBlocks = new Array();
	this.blocks = new Array();
	this.loaded = false;

	this.getMap = function(name) {
		this.loaded = false;
		sendAndGetResponse("lobby getMap " + name);
		if (curMsg != "") {
			this.jsonMap = curMsg;
		}
	}
	
	this.getLobbyMap = function() {
		this.loaded = false;
		sendAndGetResponse("lobby getLobbyMap");
		if (curMsg != "") {
			this.jsonMap = curMsg;
		}
	}

	this.parse = function() {
		this.parentBlocks.length = 0;
		this.blocks.length = 0;
		var object = JSON.parse(this.jsonMap);
		this.name = object.name;
		this.width = Object.keys(object.field[0]).length;
		this.height = Object.keys(object.field).length;
		this.fieldRefs = object.fieldRefs;
		this.spawns = object.spawns;
		for (var i = 0; i < Object.keys(object.fieldRefs).length; i++) {
			var parentBlock = new Block();
			parentBlock.load(object.fieldRefs[i]);
			this.parentBlocks.push(parentBlock);
		}
		for (var x = 0; x < this.height; x++) {
			for (var y = 0; y < this.width; y++) {
				// console.log(object.field[y][x]);
				var block = new Block();
				block.x = x * 32;
				block.y = y * 32;
				block.type = object.field[y][x];
				this.blocks.push(block);
			}
		}
		player.x = this.spawns[0].x * 32;
		player.y = this.spawns[0].y * 32;
		this.loaded = true;
	}

	this.drawMini = function(x, y, scale) {
		for (var i = 0; i < this.blocks.length; i++) {
			this.parentBlocks[this.blocks[i].type].drawMini(x
					+ this.blocks[i].x * scale, y + this.blocks[i].y * scale,
					32 * scale);
		}
	}

	this.draw = function() {
		for (var i = 0; i < this.blocks.length; i++) {
			this.parentBlocks[this.blocks[i].type].draw(this.blocks[i].x,
					this.blocks[i].y);
		}
	}
}