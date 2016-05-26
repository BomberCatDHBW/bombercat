package de.dhbwka.java.bombercat;

import java.awt.Point;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Map {

	private static final Logger LOGGER = LoggerFactory.getLogger(Map.class);
	private File mapFile;
	private String name;
	private int width;
	private int height;
	private List<Point> spawns;
	private HashMap<Integer, FieldType> fieldTypes;
	private int[][] field;

	public Map(File file) throws FileNotFoundException, IOException {
		try {
			readMap(file);
		} catch (ParseException e) {
			LOGGER.info(e.getLocalizedMessage());
		}
	}

	@Override
	public String toString() {
		String result = "";
		try {
			FileReader fr = new FileReader(mapFile);
			BufferedReader br = new BufferedReader(fr);
			while (br.ready()) {
				result += br.readLine();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	public void readMap(File file) throws FileNotFoundException, IOException, ParseException {
		mapFile = file;
		JSONParser parser = new JSONParser();
		JSONObject mapJSONObj = (JSONObject) parser.parse(new FileReader(file));
		name = (String) mapJSONObj.get("name");
		width = ((Long) mapJSONObj.get("width")).intValue();
		height = ((Long) mapJSONObj.get("height")).intValue();
		JSONObject fieldObj = (JSONObject) mapJSONObj.get("field");
		field = new int[width][height];
		for (int x = 0; x < width; x++) {
			JSONArray array = (JSONArray) fieldObj.get("" + x);
			for (int y = 0; y < height; y++) {
				field[x][y] = ((Long) array.get(y)).intValue();
			}
		}
		JSONObject spawnsObj = (JSONObject) mapJSONObj.get("spawns");
		spawns = new ArrayList<Point>();
		for (int i = 0; i < spawnsObj.size(); i++) {
			JSONObject spawn = (JSONObject) spawnsObj.get("" + i);
			spawns.add(new Point(((Long) spawn.get("x")).intValue(), ((Long) spawn.get("y")).intValue()));
		}
		JSONObject fieldTypesObj = (JSONObject) mapJSONObj.get("fieldTypes");
		fieldTypes = new HashMap<>();
		for (int i = 0; i < fieldTypesObj.size(); i++) {
			switch ((String) fieldTypesObj.get("" + i)) {
			case "Empty":
				fieldTypes.put(i, FieldType.Empty);
				break;
			case "Destructible":
				fieldTypes.put(i, FieldType.Destructible);
				break;
			case "Indestructible":
				fieldTypes.put(i, FieldType.Indestructible);
				break;
			}
		}

	}
}
