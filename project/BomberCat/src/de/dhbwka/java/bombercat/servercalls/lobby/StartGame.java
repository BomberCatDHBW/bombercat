package de.dhbwka.java.bombercat.servercalls.lobby;

import java.util.Map;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class StartGame implements LobbyCall {

	@Override
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client) {
		Lobby lobby = client.getLobby();
		lobby.startGame();
	}

}
