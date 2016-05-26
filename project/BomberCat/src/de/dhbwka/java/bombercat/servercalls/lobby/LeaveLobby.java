package de.dhbwka.java.bombercat.servercalls.lobby;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class LeaveLobby implements LobbyCall {
	private static final Logger LOGGER = LoggerFactory.getLogger(LeaveLobby.class);

	@Override
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client) {
		Lobby lobby = client.getLobby();
		if (lobby.removeClient(client, lobbies)) {
			client.sendMessage("Left lobby");
			LOGGER.info("Client {} left the lobby", client.getSession().getId());
		} else {
			client.sendError("Could not leave lobby");
			LOGGER.error("Client with id {} could not leave the lobby", client.getSession().getId());
		}

	}

}
