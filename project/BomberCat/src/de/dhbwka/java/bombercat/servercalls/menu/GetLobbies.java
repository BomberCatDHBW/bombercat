package de.dhbwka.java.bombercat.servercalls.menu;

import java.util.Map;
import java.util.Set;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class GetLobbies implements MenuCall {

	private static final Logger LOGGER = LoggerFactory.getLogger(GetLobbies.class);

	@Override
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client, Set<Client> clients) {

		JSONObject obj = new JSONObject();
		JSONArray array = new JSONArray();
		System.out.println(lobbies.values().size());
		for (Lobby lobby : lobbies.values()) {
			JSONObject tmp = new JSONObject();
			tmp.put("name", lobby.getLobbyName());
			tmp.put("user", lobby.getClientNumber());
			array.add(tmp);
		}
		obj.put("lobbies", array);
		client.sendInfo("lobbies", obj.toJSONString());
		LOGGER.info(obj.toJSONString());
	}
}
