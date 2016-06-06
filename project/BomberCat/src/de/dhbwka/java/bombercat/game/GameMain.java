package de.dhbwka.java.bombercat.game;

import java.awt.Point;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import de.dhbwka.java.bombercat.BomberCatMap;
import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class GameMain {
	private IngameMap map;
	private Map<Client, Player> players = new HashMap<>();
	private Lobby lobby;

	public GameMain(BomberCatMap field, Set<Client> clients, Lobby lobby) {
		map = new IngameMap(field);
		List<Point> spawns = field.getSpawns();
		Random r = new Random();
		for (Client client : clients) {
			Point spawnPoint = spawns.get(r.nextInt(spawns.size() - 1));
			players.put(client, new Player(spawnPoint, client));
			spawns.remove(spawnPoint);
		}
	}

	public Player getPlayer(Client client) {
		return players.get(client);
	}

	public IngameMap getMap() {
		return map;
	}

	public void sendToAllPlayers(String message) {
		lobby.sendMessageToAll("setPosition", message);
	}
}
