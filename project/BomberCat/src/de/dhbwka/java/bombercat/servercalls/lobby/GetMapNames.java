package de.dhbwka.java.bombercat.servercalls.lobby;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
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
				new URL("https://github.com/BomberCatDHBW/bombercat/tree/master/project/BomberCat/Maps/")
						.openStream())) {
			ArrayList<String> maps = new ArrayList<String>();
			while (scanner.hasNextLine()) {
				maps.add(scanner.nextLine());
			}
			scanner.close();
			JSONObject obj = new JSONObject();
			JSONArray array = new JSONArray();
			array.add(maps.toArray());
			obj.put("maps", array);
			client.sendMessage(obj.toJSONString());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
