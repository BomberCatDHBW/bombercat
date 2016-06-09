package de.dhbwka.java.bombercat.servercalls.ingame;

import java.awt.Point;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.game.GameMain;
import de.dhbwka.java.bombercat.game.Player;

public class PlaceBomb implements IngameCall {

	@Override
	public void run(String[] parameter, GameMain game, Client client) {
		new Thread() {
			@Override
			public void run() {
				int x = Integer.parseInt(parameter[0]);
				int y = Integer.parseInt(parameter[1]);
				Player player = game.getPlayer(client);
				if (player.getAmountPlacedBombs() < player.getBombAmount()) {
					player.setAmountPlacedBombs(player.getAmountPlacedBombs() + 1);
					game.getMap().addBomb(x, y, game.getPlayer(client));
					game.sendToAllPlayers("bombPlaced", x + ";" + y + ";" + game.getPlayer(client).getExplosionSize());
					try {
						Thread.sleep(2000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					if (game.getMap().getBombs().containsKey(new Point(x, y))) {
						game.explodeBomb(x, y, game.getPlayer(client).getExplosionSize(), game, client);
					}
					player.setAmountPlacedBombs(player.getAmountPlacedBombs() - 1);
				}
			}
		}.start();

	}

}
