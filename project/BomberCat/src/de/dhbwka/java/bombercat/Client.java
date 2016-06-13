package de.dhbwka.java.bombercat;

import java.nio.charset.Charset;
import java.util.Set;

import javax.websocket.Session;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Client {

	private static final Logger LOGGER = LoggerFactory.getLogger(Client.class);
	private Session session;
	private Lobby lobby = null;
	private String username;

	public Client(Session session) {
		this.session = session;
	}

	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}

	public Lobby getLobby() {
		if (lobby != null) {
			return lobby;
		} else {
			LOGGER.info("Client not in a lobby");
			sendError("0", "Client not in a lobby");
			return null;
		}
	}

	public void setLobby(Lobby lobby) {
		this.lobby = lobby;
	}

	private void sendMessage(String type, String prefix, String message) {
		String string = type + " " + prefix + " " + message;
		try {
			if (session.isOpen()) {
				session.getBasicRemote().sendBinary(Charset.forName("UTF-8").encode(string));
			} else {
				LOGGER.info("Session is not open");
				throw new Exception();
			}
		} catch (Exception e) {
			LOGGER.info("Could not send message: {}", message);
		}
	}

	public void sendError(String prefix, String errorMessage) {
		sendMessage("error", prefix, errorMessage);
	}

	public void sendInfo(String prefix, String infoMessage) {
		sendMessage("info", prefix, infoMessage);
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username, Set<Client> clients) {
		boolean found = false;
		for (Client client : clients) {
			if (client.getUsername().equals(username)) {
				found = true;
				if (username.matches(".+\\([0-9]+\\)")) {
					int i = Integer.parseInt(username.substring(username.indexOf("(") + 1, username.indexOf(")"))) + 1;
					username = username.replaceFirst("\\([0-9]+\\)", "(" + i + ")");
					setUsername(username, clients);
				} else {
					setUsername(username + "(2)", clients);
				}
			}
		}
		if (!found) {
			LOGGER.info("Client with id {} changed his name to {}", session.getId(), username);
			this.username = username;
		}
	}
}
