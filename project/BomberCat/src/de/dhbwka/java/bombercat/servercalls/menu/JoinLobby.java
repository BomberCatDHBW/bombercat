package de.dhbwka.java.bombercat.servercalls.menu;

import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class JoinLobby implements MenuCall {

	private static final Logger LOGGER = LoggerFactory.getLogger(JoinLobby.class);

	@Override
	public void run(String[] para, Map<String, Lobby> lobbies, Client client, Set<Client> clients) {
		String lobbyName = para[0];
		if (lobbies.containsKey(lobbyName)) {
			if (lobbies.get(lobbyName).addClient(client)) {
				client.sendInfo("joinedLobby", String.format("Joined lobby %s", lobbyName));
				LOGGER.info(String.format("Joined lobby %s", lobbyName));
			} else {
				client.sendError("5", "Lobby is full");
				LOGGER.error("Client with id {} could not leave the lobby", client.getSession().getId());
			}
		}
	}

}
