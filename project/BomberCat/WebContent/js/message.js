function Message() {
	this.type = "";
	this.prefix = "";
	this.content = "";
	
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
		console.log("getting");
		var message = "";
		for (var i = 0; i < messages.length; i++) {
			var msgType = ""; //info, error
			var msgPrefix = ""; //connection
			var msgContent = ""; //json
			var n = messages[i].indexOf(" ");
			msgType = messages[i].slice(0,n);
			n = message.indexOf(" ", n+1);
			msgPrefix = messages[i].slice(msgType.length+1, n);
			msgContent = messages[i].slice(n+1, messages[i].length);
			console.log(msgType);
			console.log(msgPrefix);
			console.log(msgContent);
			if (type == msgType && prefix == msgPrefix) {
				//fill in and delete from messages[]
				this.type = msgType;
				this.prefix = msgPrefix;
				this.content = msgContent;
				messages.remove(i);
				return true;
			}
		}
		console.log("not found");
		return false;
	}
}