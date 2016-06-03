package de.dhbwka.java.bombercat.servercalls.menu;

import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class CreateLobby implements MenuCall {

	private static final Logger LOGGER = LoggerFactory.getLogger(CreateLobby.class);

	@Override
	public void run(String[] para, Map<String, Lobby> lobbies, Client client, Set<Client> clients) {
		if (lobbies.containsKey(para[0])) {
			client.sendError("0", "Please use another lobby name");
		} else {
			Lobby lobby = new Lobby(client, para[0]);
			lobbies.put(para[0], lobby);
			client.sendInfo("createdLobby", String.format("Created lobby %s", para[0]));
			LOGGER.info(String.format("Created lobby %s", para[0]));
		}
	}
}
