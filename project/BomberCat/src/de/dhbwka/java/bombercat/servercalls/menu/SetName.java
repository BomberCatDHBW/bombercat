package de.dhbwka.java.bombercat.servercalls.menu;

import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class SetName implements MenuCall {

	private static final Logger LOGGER = LoggerFactory.getLogger(SetName.class);

	@Override
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client, Set<Client> clients) {
		String username = parameter[0];
		client.setUsername(username, clients);
		client.sendInfo("usernameSet", "Set username to " + client.getUsername());
		LOGGER.info("{} changed his username to {}", client.getSession().getId(), client.getUsername());
	}
}