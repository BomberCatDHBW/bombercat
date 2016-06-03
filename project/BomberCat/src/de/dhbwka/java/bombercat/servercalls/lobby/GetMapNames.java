package de.dhbwka.java.bombercat.servercalls.lobby;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;
import java.util.Scanner;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class GetMapNames implements LobbyCall {

	@Override
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client) {
		try (Scanner scanner = new Scanner(
				new URL("https://raw.githubusercontent.com/BomberCatDHBW/bombercat/master/project/BomberCat/Maps/Mappool")
						.openStream())) {
			JSONArray array = new JSONArray();
			while (scanner.hasNextLine()) {
				array.add(scanner.nextLine());
			}
			scanner.close();
			JSONObject obj = new JSONObject();
			obj.put("maps", array);
			client.sendInfo("mapNames", obj.toJSONString());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
