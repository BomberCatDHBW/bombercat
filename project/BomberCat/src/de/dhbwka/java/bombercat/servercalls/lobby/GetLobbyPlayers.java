package de.dhbwka.java.bombercat.servercalls.lobby;

import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class GetLobbyPlayers implements LobbyCall {
	@Override
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client) {
		if (client.getLobby() != null) {
			JSONObject obj = new JSONObject();
			JSONArray array = new JSONArray();
			for (Client player : client.getLobby().getClients()) {
				array.add(player.getUsername());
			}
			obj.put("players", array);
			obj.put("leader", client.getLobby().getLobbyLeader().getUsername());
			client.sendMessage(obj.toJSONString());
		}
	}
}
