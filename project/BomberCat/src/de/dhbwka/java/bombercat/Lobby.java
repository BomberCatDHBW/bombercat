package de.dhbwka.java.bombercat;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Lobby {

	private static final Logger LOGGER = LoggerFactory.getLogger(Lobby.class);
	private Client lobbyLeader;
	private Set<Client> clients = new HashSet<Client>(8);
	private String lobbyName;
	private Map map;

	public Lobby(Client leader, String name) {
		setLobbyLeader(leader);
		setLobbyName(name);
		addClient(leader);
	}

	public boolean addClient(Client client) {
		boolean result = false;
		if (clients.size() <= 8) {
			clients.add(client);
			client.setLobby(this);
			result = true;
		} else {
			LOGGER.info("Lobby {}", lobbyName);
		}
		return result;
	}

	public boolean removeClient(Client client, java.util.Map<String, Lobby> lobbies) {
		boolean result = false;
		if (lobbyLeader.equals(client)) {
			deleteLobby();
			lobbies.remove(getLobbyName());
			result = true;
		} else {
			result = clients.remove(client);
			client.setLobby(null);
			result = true;
		}
		return result;
	}

	public int getClientNumber() {
		return clients.size();
	}

	public void setLobbyName(String lobbyName) {
		this.lobbyName = lobbyName;
	}

	public String getLobbyName() {
		return lobbyName;
	}

	public Client getLobbyLeader() {
		return lobbyLeader;
	}

	public void setLobbyLeader(Client lobbyLeader) {
		this.lobbyLeader = lobbyLeader;
	}

	private void deleteLobby() {
		for (Client client : clients) {
			client.setLobby(null);
			client.sendMessage("Lobby closed");
		}
	}

	public void startGame() {

	}

	public Map getMap() {
		return map;
	}

	public void setMap(Map map) {
		this.map = map;
	}
}
