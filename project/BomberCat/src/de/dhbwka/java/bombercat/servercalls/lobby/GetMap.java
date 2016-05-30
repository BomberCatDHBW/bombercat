package de.dhbwka.java.bombercat.servercalls.lobby;

import java.io.File;
import java.io.IOException;

import de.dhbwka.java.bombercat.BomberCatMap;
import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class GetMap implements LobbyCall {
	@Override
	public void run(String[] parameter, java.util.Map<String, Lobby> lobbies, Client client) {
		ClassLoader classLoader = getClass().getClassLoader();
		File mapFile = new File(classLoader.getResource("Maps/" + parameter[0]).getFile());
		System.out.println(mapFile.getAbsolutePath());
		try {
			BomberCatMap map = new BomberCatMap(mapFile);
			client.sendMessage(map.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}