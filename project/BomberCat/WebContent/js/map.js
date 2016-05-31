function Map() {
	this.x = 0;
	this.y = 0;
	this.jsonMap;
	this.name;
	this.width;
	this.height;
	this.spawns;
	this.fieldRefs;
	this.parentBlocks = new Array();
	this.blocks = new Array();

	this.getMap = function() {
		sendAndGetResponse("lobby getMap TestMap.map");
		if (curMsg != "") {
			this.jsonMap = curMsg;
		}
	}

	this.parse = function() {
		var object = JSON.parse(this.jsonMap);
		this.name = object.name;
		this.width = object.width;
		this.height = object.height;
		this.fieldRefs = object.fieldRefs;
		this.spawns = object.spawns;
		for (var i = 0; i < Object.keys(object.fieldRefs).length; i++) {			
			var parentBlock = new Block();
			parentBlock.load(object.fieldRefs[i]);
			this.parentBlocks.push(parentBlock);
		}
		for (var x = 0; x < this.height; x++) {
			for (var y = 0; y < this.width; y++) {
				//console.log(object.field[y][x]);
				var block = new Block();					
				block.x = x*32;
				block.y = y*32;
				block.type = object.field[y][x];
				this.blocks.push(block);
			}
		}
		player.x = this.spawns[0].x*32;
		player.y = this.spawns[0].y*32;
	}

	this.draw = function() {
		for (var i = 0; i < this.blocks.length; i++) {
			this.parentBlocks[this.blocks[i].type].draw(this.blocks[i].x, this.blocks[i].y);
		}
	}
}