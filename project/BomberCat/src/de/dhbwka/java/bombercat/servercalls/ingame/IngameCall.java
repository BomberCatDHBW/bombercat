package de.dhbwka.java.bombercat.servercalls.ingame;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.game.GameMain;

public interface IngameCall {
	public void run(String[] parameter, GameMain game, Client client);

}
