package de.dhbwka.java.bombercat.servercalls.lobby;

import java.io.File;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class GetMap implements LobbyCall {
	@Override
	public void run(String[] parameter, java.util.Map<String, Lobby> lobbies, Client client) {
		File f = new File("");
		System.out.println(f.getAbsolutePath());
		// System.out.println(mapFile.getAbsolutePath());
		// try {
		// BomberCatMap map = new BomberCatMap(mapFile);
		// client.sendMessage(map.toString());
		// } catch (IOException e) {
		// e.printStackTrace();
		// }
	}
}