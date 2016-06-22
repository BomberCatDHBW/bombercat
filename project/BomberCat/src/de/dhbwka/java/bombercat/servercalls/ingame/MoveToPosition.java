package de.dhbwka.java.bombercat.servercalls.ingame;

import java.awt.Point;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.game.GameMain;

public class MoveToPosition implements IngameCall {

	@Override
	public void run(String[] parameter, GameMain game, Client client) {
		new Thread() {
			@Override
			public void run() {
				int x = (int) Math.round(Double.parseDouble(parameter[0]));
				int y = (int) Math.round(Double.parseDouble(parameter[1]));
				if (game.getPlayer(client).moveToPosition(new Point(x, y), game.getMap())) {
					game.sendToAllPlayers("setPosition", client.getUsername() + ";" + x + ";" + y);
				} else {
					client.sendError("6", "move not valid");
				}
			}
		}.start();
	}
}
