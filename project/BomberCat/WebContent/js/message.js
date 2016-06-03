function Message() {
	this.gotSent = false;
	this.type = "";
	this.prefix = "";
	this.content = "";
	
	this.send = function(message) {
		if (this.gotSent == false) {			
			sendMsg(message);
		}
		this.gotSent = true;
	}
	
	this.process = function(message) {
		var type = ""; //info, error
		var prefix = ""; //connection, 
		var content = ""; //json
		var n = message.indexOf(" ");
		type = message.slice(0,n);
		n = message.indexOf(" ", n+1);
		prefix = message.slice(type.length+1, n);
		information = message.slice(n+1, message.length);
		console.log(type);
		console.log(prefix);
		console.log(content);
	}
	
	this.get = function(type, prefix) {
		var message = "";
		for (var i = 0; i < messages.length; i++) {
			var msgType = ""; //info, error
			var msgPrefix = ""; //connection
			var msgContent = ""; //json
			var n = messages[i].indexOf(" ");
			msgType = messages[i].slice(0,n);
			n = messages[i].indexOf(" ", n+1);
			msgPrefix = messages[i].slice(msgType.length+1, n);
			msgContent = messages[i].slice(n+1, messages[i].length);
			if (type == msgType && prefix == msgPrefix) {
				//fill in and delete from messages[]
				this.type = msgType;
				this.prefix = msgPrefix;
				this.content = msgContent;
				messages.splice(i,1); // removes element i from array
				this.gotSent = false;
				return true;
			}
		}
		return false;
	}
}