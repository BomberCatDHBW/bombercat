function Map() {
	this.x = 0;
	this.y = 0;
	this.jsonMap;
	
	this.getMap = function() {
		sendAndGetResponse("lobby getMap TestMap.map");
		if (curMsg != "") {
			this.jsonMap = curMsg;
		}
	}
	
	this.draw = function() {
		
	}
}