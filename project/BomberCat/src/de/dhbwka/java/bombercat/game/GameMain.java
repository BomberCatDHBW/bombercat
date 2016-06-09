package de.dhbwka.java.bombercat.game;

import java.awt.Point;
import java.util.ArrayList;
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
		this.lobby = lobby;
		List<Point> spawns = field.getSpawns();
		int i = 0;
		for (Client client : clients) {
			Point spawnPoint = spawns.get(i++);
			players.put(client, new Player(spawnPoint, client));
		}
		map = new IngameMap(field, players);
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

	public void explodeBomb(int x, int y, int size, GameMain game, Client client) {
		List<Point> points = new ArrayList<Point>();
		map.explode(x, y, size, points);
		JSONObject objJSON = new JSONObject();
		JSONObject pointsJSON = new JSONObject();
		JSONObject bonusFieldsJSON = new JSONObject();
		int n = 0;
		for (int i = 0; i < points.size(); i++) {
			JSONArray array = new JSONArray();
			array.add((int) points.get(i).getX());
			array.add((int) points.get(i).getY());
			pointsJSON.put(i + "", array);
			if (map.getBonusFields().containsKey(points.get(i))) {
				JSONArray arrayBonusField = new JSONArray();
				arrayBonusField.add((int) points.get(i).getX());
				arrayBonusField.add((int) points.get(i).getY());
				arrayBonusField.add(map.getBonusFields().get(points.get(i)).toString());
				bonusFieldsJSON.put((n++) + "", arrayBonusField);
			}
		}
		objJSON.put("clearedFields", pointsJSON);
		objJSON.put("bonusFields", bonusFieldsJSON);
		sendToAllPlayers("clearFields", objJSON.toJSONString());
	}
}
