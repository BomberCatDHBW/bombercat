package de.dhbwka.java.bombercat.servercalls.lobby;

import java.util.Map;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class SetPosition implements LobbyCall {

	@Override
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client) {
		Lobby lobby = client.getLobby();
		String[] para = parameter[0].split(",");
		String x = para[0];
		String y = para[1];
		client.getLobby().sendMessageToAll("setPosition", client.getUsername() + " " + x + " " + y);
		//client.sendInfo("setPosition", x + " " + y);
		//TODO: unfinished, because tired
	}

}
