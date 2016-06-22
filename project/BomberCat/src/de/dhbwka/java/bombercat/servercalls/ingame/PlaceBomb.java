package de.dhbwka.java.bombercat.servercalls.ingame;

import java.awt.Point;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.game.GameMain;
import de.dhbwka.java.bombercat.game.Player;

public class PlaceBomb implements IngameCall {

	private static final Logger LOGGER = LoggerFactory.getLogger(PlaceBomb.class);

	@Override
	public void run(String[] parameter, GameMain game, Client client) {
		new Thread() {
			@Override
			public void run() {
				try {
					int x = (int) Math.round(Double.parseDouble(parameter[0]));
					int y = (int) Math.round(Double.parseDouble(parameter[1]));
					Player player = game.getPlayer(client);
					if (player.getAmountPlacedBombs() < player.getBombAmount()) {
						player.setAmountPlacedBombs(player.getAmountPlacedBombs() + 1);
						game.getMap().addBomb(x, y, game.getPlayer(client));
						game.sendToAllPlayers("bombPlaced",
								x + ";" + y + ";" + game.getPlayer(client).getExplosionSize());
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
				} catch (Exception ex) {
					LOGGER.error("Could not place bomb");
				}
			}
		}.start();

	}

}
