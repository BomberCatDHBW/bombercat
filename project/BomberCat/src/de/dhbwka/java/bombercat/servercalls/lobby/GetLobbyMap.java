package de.dhbwka.java.bombercat.servercalls.lobby;

import java.io.IOException;
import java.util.Map;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class GetLobbyMap implements LobbyCall {
	@Override
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client) {
		try {
			if (client.getLobby() != null) {
				if (client.getLobby().getMap() != null) {
					client.sendMessage(client.getLobby().getMap().getJSON());
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
