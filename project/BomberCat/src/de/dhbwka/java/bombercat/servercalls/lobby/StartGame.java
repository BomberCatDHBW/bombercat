package de.dhbwka.java.bombercat.servercalls.lobby;

import java.util.Map;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;
import de.dhbwka.java.bombercat.servercalls.Server;

public class StartGame implements LobbyCall {
	Server server;

	public StartGame(Server server) {
		this.server = server;
	}

	@Override
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client) {
		Lobby lobby = client.getLobby();
		lobby.startGame(server);
	}

}
