package de.dhbwka.java.bombercat.servercalls.lobby;

import java.util.Map;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class GetLobbyPlayers implements LobbyCall {
	@Override
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client) {
		if (client.getLobby() != null) {
			client.sendInfo("players", client.getLobby().playersToString());
		}
	}
}
