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
	this.explodeMsg = new Message();
	this.defaultEmptyBock = 0;

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
		var object = JSON.parse(decodeURIComponent(this.jsonMap));
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
		players.players[0].x = this.spawns[0].x * 32;
		players.players[0].y = this.spawns[0].y * 32;
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
		if (this.explodeMsg.get("info", "clearFields")) {
			var object = JSON.parse(this.explodeMsg.content);
			for (var i = 0; i < Object.keys(object.clearedFields).length; i++) {
				var x = object.clearedFields[i][0];
				var y = object.clearedFields[i][1];
				bombs.addExplosion(x * 32, y * 32);
				for (var j = 0; j < this.blocks.length; j++) {
					if (this.blocks[j].x / 32 == x
							&& this.blocks[j].y / 32 == y) {
						this.blocks[j].type = this.defaultEmptyBock;
					}
				}
			}
			for (var i = 0; i < Object.keys(object.bonusFields).length; i++) {
				var x = object.bonusFields[i][0];
				var y = object.bonusFields[i][1];
				var type = object.bonusFields[i][2];
				console.log("spawned: " + type);
				powerups.add(x * 32, y * 32, type);
			}
		}
	}
}