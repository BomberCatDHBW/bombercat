package de.dhbwka.java.bombercat;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Lobby {

	private static final Logger LOGGER = LoggerFactory.getLogger(Lobby.class);
	private Client lobbyLeader;
	private Set<Client> clients = new HashSet<Client>(8);
	private String lobbyName;
	private BomberCatMap map;

	public Set<Client> getClients() {
		return clients;
	}

	public void setClients(Set<Client> clients) {
		this.clients = clients;
	}

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
			broadcastPlayers();
		} else {
			LOGGER.info("Lobby {}", lobbyName);
		}
		return result;
	}

	public boolean removeClient(Client client, Map<String, Lobby> lobbies) {
		boolean result = false;
		if (lobbyLeader.equals(client)) {
			deleteLobby(lobbies);
			result = true;
		} else {
			result = clients.remove(client);
			client.setLobby(null);
			result = true;
		}
		if (result) {
			broadcastPlayers();
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

	private void deleteLobby(Map<String, Lobby> lobbies) {
		for (Client client : clients) {
			client.setLobby(null);
			if (client != null && client.getSession().isOpen()) {
				client.sendInfo("lobby", "Lobby closed");
			}
		}
		lobbies.remove(getLobbyName());
	}

	public void startGame() {
		if (map != null && clients.size() > 1) {

		} else {
			lobbyLeader.sendError("2", "Can't start game");
		}
	}

	public BomberCatMap getMap() {
		if (map != null) {
			return map;
		} else {
			LOGGER.info("Map not set");
			return null;
		}
	}

	public void setMap(BomberCatMap map) {
		this.map = map;
	}

	public String playersToString() {
		JSONObject obj = new JSONObject();
		JSONArray array = new JSONArray();
		for (Client player : getClients()) {
			if (!player.getLobby().getLobbyLeader().equals(player)) {
				array.add(player.getUsername());
			}
		}
		obj.put("players", array);
		obj.put("leader", getLobbyLeader().getUsername());
		return obj.toJSONString();
	}

	public void sendMessageToAll(String prefix, String message) {
		for (Client client : clients) {
			client.sendInfo(prefix, message);
		}
	}

	public void broadcastPlayers() {
		for (Client client : clients) {
			client.sendInfo("players", playersToString());
		}
	}
}
