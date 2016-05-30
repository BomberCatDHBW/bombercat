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
		console.log(this.name + " " + this.width + "x" + this.height);

		console.log(object.fieldRefs[0]);

		console.log("Loading ParentBlocks!");
		var parentBlock = new Block();
		//block.load("http://" + object.fieldRefs[0]);
		parentBlock.load("http://vignette3.wikia.nocookie.net/nitromepixellove/images/a/a7/Red_Block.png/revision/latest?cb=20120618214011");
		console.log("Loading Blocks!");

		for (var x = 0; x < this.height; x++) {
			for (var y = 0; y < this.width; y++) {
				console.log(object.field[y][x]);
				if (object.field[y][x] == 0)
				{
					var block = new Block();					
					block.x = y*32;
					block.y = x*32;
					this.blocks.push(block);
				}
			}
		}
		this.parentBlocks.push(parentBlock);

	}

	this.draw = function() {
		for (var i = 0; i < this.blocks.length; i++) {
			this.parentBlocks[0].draw(this.blocks[i].x, this.blocks[i].y);
		}
	}
}