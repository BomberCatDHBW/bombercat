package de.dhbwka.java.bombercat.servercalls.lobby;

import java.io.IOException;

import de.dhbwka.java.bombercat.BomberCatMap;
import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class GetMap implements LobbyCall {
	@Override
	public void run(String[] parameter, java.util.Map<String, Lobby> lobbies, Client client) {
		try {
			client.sendInfo("map", BomberCatMap.getJSON(parameter[0]));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}