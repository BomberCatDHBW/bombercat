package de.dhbwka.java.bombercat.servercalls.ingame;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.game.GameMain;

public class PlaceBomb implements IngameCall {

	@Override
	public void run(String[] parameter, GameMain game, Client client) {
		new Thread() {
			@Override
			public void run() {
				int x = Integer.parseInt(parameter[0]);
				int y = Integer.parseInt(parameter[1]);
				game.getMap().addBomb(x, y, game.getPlayer(client));
				game.sendToAllPlayers("bombPlaced", x + ";" + y + ";" + game.getPlayer(client).getExplosionSize());
				try {
					Thread.sleep(2000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				new ExplodeBomb().run(new String[] { x + "", y + "" }, game, client);
			}
		}.start();

	}

}
