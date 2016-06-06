package de.dhbwka.java.bombercat.game;

import java.awt.Point;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import de.dhbwka.java.bombercat.BomberCatMap;
import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class GameMain {
	private IngameMap map;
	private Map<Client, Player> players = new HashMap<>();
	private Lobby lobby;

	public GameMain(BomberCatMap field, Set<Client> clients, Lobby lobby) {
		map = new IngameMap(field);
		this.lobby = lobby;
		List<Point> spawns = field.getSpawns();
		int i = 0;
		for (Client client : clients) {
			Point spawnPoint = spawns.get(i++);
			players.put(client, new Player(spawnPoint, client));
		}
	}

	public Player getPlayer(Client client) {
		return players.get(client);
	}

	public IngameMap getMap() {
		return map;
	}

	public void sendToAllPlayers(String prefix, String message) {
		lobby.sendMessageToAll(prefix, message);
	}

	public void explodeBomb(int x, int y, int size) {
		List<Point> points = map.explode(x, y, size);
		JSONObject obj = new JSONObject();
		System.out.println(points.size());
		for (int i = 0; i < points.size(); i++) {
			JSONArray array = new JSONArray();
			array.add((int) points.get(i).getX());
			array.add((int) points.get(i).getY());
			obj.put(i + "", array);
		}
		sendToAllPlayers("clearFields", obj.toJSONString());
	}
}
