package de.dhbwka.java.bombercat.servercalls.lobby;

import java.io.IOException;
import java.util.Map;

import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.dhbwka.java.bombercat.BomberCatMap;
import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class SetLobbyMap implements LobbyCall {

	private static final Logger LOGGER = LoggerFactory.getLogger(SetLobbyMap.class);

	@Override
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client) {
		if (client.getLobby() != null) {
			if (client.equals(client.getLobby().getLobbyLeader())) {
				try {
					client.getLobby().setMap(BomberCatMap.getMap(parameter[0]));
					LOGGER.info("{} set lobby to {}", client.getLobby().getLobbyName(),
							client.getLobby().getMap().getName());
				} catch (IOException | ParseException e) {
					e.printStackTrace();
				}
			}
		}
	}

}
