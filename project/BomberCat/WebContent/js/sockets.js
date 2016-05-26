openSocket();

var webSocket;
var messages = document.getElementById("messages");
var curMsg;
var messages = [];

function openSocket() {
	if (webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED) {
		writeResponse("WebSocket is already opened.");
		return;
	}

	webSocket = new WebSocket("ws://localhost:8080/BomberCat/echo");
	// webSocket = new WebSocket("ws://172.16.53.248:8080/BomberCat/echo");

	webSocket.onopen = function(event) {
		if (event.data === undefined)
			return;

		writeResponse(event.data);
	};

	webSocket.onmessage = function(event) {
		messages.push(event.data);
		writeResponse(event.data);
	};

	webSocket.onclose = function(event) {
		writeResponse("Connection closed");
	};
}

function send() {
	var text = document.getElementById("messageinput").value;
	webSocket.send(text);
}

function sendMsg(text) {
	webSocket.send(text);
}

function closeSocket() {
	webSocket.close();
}