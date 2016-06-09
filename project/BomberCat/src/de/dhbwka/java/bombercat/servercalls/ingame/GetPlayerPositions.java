package de.dhbwka.java.bombercat.servercalls.ingame;

import java.awt.Point;
import java.util.Map.Entry;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.game.GameMain;
import de.dhbwka.java.bombercat.game.Player;

public class GetPlayerPositions implements IngameCall {

	@Override
	public void run(String[] parameter, GameMain game, Client client) {
		JSONObject obj = new JSONObject();
		for (Entry<Point, Player> entry : game.getMap().getPlayers().entrySet()) {
			JSONArray spawn = new JSONArray();
			spawn.add(entry.getKey().getX());
			spawn.add(entry.getKey().getY());
			obj.put(entry.getValue().getClient().getUsername(), spawn);
		}
		game.sendToAllPlayers("spawns", obj.toJSONString());
	}

}
