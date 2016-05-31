package de.dhbwka.java.bombercat.servercalls.lobby;

import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class GetLobbyPlayers implements LobbyCall {
	@Override
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client) {
		JSONObject obj = new JSONObject();
		JSONArray array = new JSONArray();
		for (Client player : client.getLobby().getClients()) {
			array.add(player.getUsername());
		}
		obj.put("players", array);
		client.sendMessage(obj.toJSONString());
	}
}
