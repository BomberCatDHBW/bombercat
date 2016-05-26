package de.dhbwka.java.bombercat.servercalls.lobby;

import java.io.File;
import java.io.IOException;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;
import de.dhbwka.java.bombercat.Map;

public class GetMap implements LobbyCall {
	@Override
	public void run(String[] parameter, java.util.Map<String, Lobby> lobbies, Client client) {
		File mapFile = new File("BomberCat//Maps//" + parameter[0]);
		try {
			Map map = new Map(mapFile);
			client.sendMessage(map.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
