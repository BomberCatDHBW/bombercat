package de.dhbwka.java.bombercat;

import java.awt.Point;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BomberCatMap {

	private static final Logger LOGGER = LoggerFactory.getLogger(BomberCatMap.class);
	private String name;
	private int width;
	private int height;
	private List<Point> spawns;
	private HashMap<Integer, FieldType> fieldTypes;
	private HashMap<Integer, String> fieldRefs;
	private int[][] field;

	protected BomberCatMap() {

	}

	public String getJSON() throws IOException {
		return getJSON(name + ".map");
	}

	public static String getJSON(String mapName) throws IOException {
		URL url = new URL(
				"https://raw.githubusercontent.com/BomberCatDHBW/bombercat/master/project/BomberCat/Maps/" + mapName);
		Scanner scanner = new Scanner(url.openStream());
		String jsonString = "";
		while (scanner.hasNextLine()) {
			jsonString += scanner.nextLine();
		}
		scanner.close();
		return jsonString;
	}

	public static BomberCatMap getMap(String mapName) throws FileNotFoundException, IOException, ParseException {
		BomberCatMap map = new BomberCatMap();
		URL url = new URL(
				"https://raw.githubusercontent.com/BomberCatDHBW/bombercat/master/project/BomberCat/Maps/" + mapName);
		Scanner scanner = new Scanner(url.openStream());
		String jsonString = "";
		while (scanner.hasNextLine()) {
			jsonString += scanner.nextLine();
		}
		JSONParser parser = new JSONParser();
		JSONObject mapJSONObj = (JSONObject) parser.parse(jsonString);
		map.setName((String) mapJSONObj.get("name"));
		map.setWidth(((Long) mapJSONObj.get("width")).intValue());
		map.setHeight(((Long) mapJSONObj.get("height")).intValue());
		JSONObject fieldObj = (JSONObject) mapJSONObj.get("field");
		int[][] fieldTmp = new int[map.getWidth()][map.getHeight()];
		for (int x = 0; x < map.getWidth(); x++) {
			JSONArray array = (JSONArray) fieldObj.get("" + x);
			for (int y = 0; y < map.getHeight(); y++) {
				fieldTmp[x][y] = ((Long) array.get(y)).intValue();
			}
		}
		map.setField(fieldTmp);
		JSONObject spawnsObj = (JSONObject) mapJSONObj.get("spawns");
		ArrayList spawnsTmp = new ArrayList<Point>();
		for (int i = 0; i < spawnsObj.size(); i++) {
			JSONObject spawn = (JSONObject) spawnsObj.get("" + i);
			if (spawn.get("x") instanceof Long && spawn.get("y") instanceof Long) {
				Double x = ((Long) spawn.get("x")).doubleValue();
				int iX = x.intValue();
				Double y = ((Long) spawn.get("y")).doubleValue();
				int iY = y.intValue();
				spawnsTmp.add(new Point(iX, iY));
			} else {
				LOGGER.error("No instance of long. Instance of {}", spawn.get("x").getClass());
			}
		}
		JSONObject fieldTypesObj = (JSONObject) mapJSONObj.get("fieldTypes");
		map.setSpawns(spawnsTmp);
		HashMap fieldTypesTmp = new HashMap<>();
		for (int i = 0; i < fieldTypesObj.size(); i++) {
			switch ((String) fieldTypesObj.get("" + i)) {
			case "Empty":
				fieldTypesTmp.put(i, FieldType.Empty);
				break;
			case "Destructible":
				fieldTypesTmp.put(i, FieldType.Destructible);
				break;
			case "Indestructible":
				fieldTypesTmp.put(i, FieldType.Indestructible);
				break;
			}
		}
		map.setFieldTypes(fieldTypesTmp);
		scanner.close();
		return map;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public List<Point> getSpawns() {
		return spawns;
	}

	public void setSpawns(List<Point> spawns) {
		this.spawns = spawns;
	}

	public HashMap<Integer, FieldType> getFieldTypes() {
		return fieldTypes;
	}

	public void setFieldTypes(HashMap<Integer, FieldType> fieldTypes) {
		this.fieldTypes = fieldTypes;
	}

	public void setField(int[][] field) {
		this.field = field;
	}

	public int[][] getField() {
		return field;
	}

	public HashMap<Integer, String> getFieldRefs() {
		return fieldRefs;
	}

	public void setFieldRefs(HashMap<Integer, String> fieldRefs) {
		this.fieldRefs = fieldRefs;
	}
}
