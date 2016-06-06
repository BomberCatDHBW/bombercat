package de.dhbwka.java.bombercat.servercalls.ingame;

import java.awt.Point;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.game.GameMain;

public class MoveToPosition implements IngameCall {

	@Override
	public void run(String[] parameter, GameMain game, Client client) {
		int x = Integer.parseInt(parameter[0]);
		int y = Integer.parseInt(parameter[1]);
		game.getPlayer(client).moveToPosition(new Point(x, y), game.getMap());
		game.sendToAllPlayers("setPosition", x + ";" + y);
	}
}
