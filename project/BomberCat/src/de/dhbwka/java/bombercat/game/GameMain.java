package de.dhbwka.java.bombercat.game;

import java.awt.Point;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
}
