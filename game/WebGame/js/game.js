var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

var bombReady = false;
var bombImage = new Image();
bombImage.onload = function () {
	bombReady = true;
};
bombImage.src = "images/bomb.png";

var blockReady = false;
var blockImage = new Image();
blockImage.onload = function () {
	blockReady = true;
};
blockImage.src = "images/block.png";

var fireReady = false;
var fireImage = new Image();
fireImage.onload = function () {
	fireReady = true;
};
fireImage.src = "images/explosion.png";

var modifier = 0;

var hero = {
speed: 2,
x: 32,
y: 32,
canMove: false,
velX: 0,
velY: 0
};
var monster = {};
var monstersCaught = 0;

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var bombs = [];
var blocks = [];
var fire = [];

var addBlock = function (xPos, yPos, isDestructable) {
	blocks.push({ x: xPos, y: yPos, destructable: isDestructable});
}

var reset = function () {
	hero.x = 64;
	hero.y = 64;
		monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
	
	addBlock(0, 0, false);
	addBlock(32, 0, false);
	addBlock(32*2, 0, false);
	addBlock(32*3, 0, false);
	addBlock(32*4, 0, false);
	addBlock(32*5, 0, false);
	addBlock(32*6, 0, false);
	addBlock(32*7, 0, false);
	addBlock(32*8, 0, false);
	addBlock(32*9, 0, false);
	addBlock(32*10, 0, false);
	addBlock(32*11, 0, false);
	addBlock(32*12, 0, false);
	addBlock(32*13, 0, false);
	addBlock(32*14, 0, false);
	addBlock(32*15, 0, false);

	addBlock(0, 32*14, false);
	addBlock(32, 32*14, false);
	addBlock(32*2, 32*14, false);
	addBlock(32*3, 32*14, false);
	addBlock(32*4, 32*14, false);
	addBlock(32*5, 32*14, false);
	addBlock(32*6, 32*14, false);
	addBlock(32*7, 32*14, false);
	addBlock(32*8, 32*14, false);
	addBlock(32*9, 32*14, false);
	addBlock(32*10, 32*14, false);
	addBlock(32*11, 32*14, false);
	addBlock(32*12, 32*14, false);
	addBlock(32*13, 32*14, false);
	addBlock(32*14, 32*14, false);
	addBlock(32*15, 32*14, false);

	addBlock(32*5, 32*5, false);
	addBlock(32*6, 32*5, false);
	addBlock(32*6, 32*6, false);
};

var moveplayerto = function (toX, toY) {
	hero.x += hero.speed * modifier;
};

var isWalkable = function (x, y) {
	var walkable = true;
	for (i=0;i<bombs.length;i++) {
		if (bombs[i].x == x && bombs[i].y == y) {
			walkable = false;
			break;
		}
	}
	for (i=0;i<blocks.length;i++) {
		if (blocks[i].x == x && blocks[i].y == y) {
			walkable = false;
			break;
		}
	}
	return walkable;
}

var update = function () {
	if (32 in keysDown && hero.canMove) {
		var alreadyUsed = false;
		for (i=0;i<bombs.length;i++) {
			if (bombs[i].x == hero.x && bombs[i].y == hero.y) {
				alreadyUsed = true;
				break;
			}
		}
		if (!alreadyUsed) {
			bombs.push({ x: hero.x, y: hero.y, timer: 100});
		}
	}
	if (38 in keysDown && hero.canMove) {
		if (isWalkable(hero.x,hero.y-32)) {
			hero.velY = -32;
			hero.canMove = false;
		}
		//hero.y -= hero.speed * modifier;
		//hero.y -= hero.speed * modifier;
		//moveplayerto(32*3,32*2);
	}
	if (40 in keysDown && hero.canMove) {
		if (isWalkable(hero.x,hero.y+32)) {
			hero.velY = 32;
			hero.canMove = false;
		}
		//hero.y += hero.speed * modifier;
	}
	if (37 in keysDown && hero.canMove) {
		if (isWalkable(hero.x-32,hero.y)) {
			hero.velX = -32;
			hero.canMove = false;
		}
		//hero.x -= hero.speed * modifier;
		//moveplayerto(0,0);
	}
	if (39 in keysDown && hero.canMove) {
		if (isWalkable(hero.x+32,hero.y)) {
			hero.velX = 32;
			hero.canMove = false;
		}
		//moveplayerto();
		//hero.x += hero.speed * modifier;
	}
	
	if (hero.velX > 0) {
		hero.x += hero.speed;
		hero.velX -= 2;
	}
	if (hero.velX < 0) {
		hero.x -= hero.speed;
		hero.velX += hero.speed;
	}
	if (hero.velY > 0) {
		hero.y += hero.speed;
		hero.velY -= hero.speed;
	}
	if (hero.velY < 0) {
		hero.y -= hero.speed;
		hero.velY += hero.speed;
	}
	if (hero.velX == 0 && hero.velY == 0) {
		hero.canMove = true;
	}
	//console.log("x: " + hero.x);
	//console.log("y: " + hero.y);
	//console.log("canMove: " + hero.canMove);
	//console.log("--");
	
	for (i=0;i<bombs.length;i++) {
		if (bombs[i].timer > 0) {
			bombs[i].timer -= 50*modifier;
		} else {
			fire.push({ x: bombs[i].x+32, y: bombs[i].y, timer: 100});
			fire.push({ x: bombs[i].x-32, y: bombs[i].y, timer: 100});
			fire.push({ x: bombs[i].x, y: bombs[i].y, timer: 100});
			fire.push({ x: bombs[i].x, y: bombs[i].y+32, timer: 100});
			fire.push({ x: bombs[i].x, y: bombs[i].y-32, timer: 100});
			bombs.splice(i, 1);
		}
	}
	for (i=0;i<fire.length;i++) {
		if (fire[i].timer > 0) {
			fire[i].timer -= 150*modifier;
		} else {
			fire.splice(i, 1);
		}
	}

	if (
			hero.x <= (monster.x + 16)
			&& monster.x <= (hero.x + 16)
			&& hero.y <= (monster.y + 16)
			&& monster.y <= (hero.y + 16)
			) {
		monstersCaught++;
		monster.x = 32 + (Math.random() * (canvas.width - 64));
		monster.y = 32 + (Math.random() * (canvas.height - 64));
	}
};

var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y, 32, 32);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	
	if (bombReady) {
		//console.log("bombs: " + bombs.length);
		for (i=0;i<bombs.length;i++) {
			ctx.drawImage(bombImage, bombs[i].x, bombs[i].y);
			//console.log("x: " + bombs[i].x);
			//console.log("y: " + bombs[i].y);
		}
	}
	if (fireReady) {
		//console.log("blocks: " + blocks.length);
		for (i=0;i<fire.length;i++) {
			ctx.drawImage(fireImage, fire[i].x, fire[i].y, 32 ,32);
			//console.log("x: " + blocks[i].x);
			//console.log("y: " + blocks[i].y);
		}
	}
	if (blockReady) {
		//console.log("blocks: " + blocks.length);
		for (i=0;i<blocks.length;i++) {
			ctx.drawImage(blockImage, blocks[i].x, blocks[i].y, 32 ,32);
			//console.log("x: " + blocks[i].x);
			//console.log("y: " + blocks[i].y);
		}
	}
	ctx.font = "14px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.fillText("Bombercat", 5, 5+32);
};

var main = function () {
	var now = Date.now();
	var delta = now - then;

	modifier = delta/1000;
	update();
	render();

	then = now;
	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame
		|| w.webkitRequestAnimationFrame || w.msRequestAnimationFrame
		|| w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();
