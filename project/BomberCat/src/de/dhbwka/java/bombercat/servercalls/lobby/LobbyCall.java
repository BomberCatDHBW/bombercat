package de.dhbwka.java.bombercat.servercalls.lobby;

import java.util.Map;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public interface LobbyCall {
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client);

}
