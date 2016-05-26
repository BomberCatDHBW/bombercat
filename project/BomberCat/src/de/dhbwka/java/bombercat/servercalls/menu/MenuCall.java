package de.dhbwka.java.bombercat.servercalls.menu;

import java.util.Map;
import java.util.Set;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public interface MenuCall {
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client, Set<Client> clients);
}
