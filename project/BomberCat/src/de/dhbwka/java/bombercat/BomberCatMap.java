package de.dhbwka.java.bombercat;

import java.awt.Point;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
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

public class BomberCatMap {

	private static final Logger LOGGER = LoggerFactory.getLogger(BomberCatMap.class);
	private File mapFile;
	private String name;
	private int width;
	private int height;
	private List<Point> spawns;
	private HashMap<Integer, FieldType> fieldTypes;
	private HashMap<Integer, String> fieldRefs;
	private int[][] field;

	public BomberCatMap(File file) throws FileNotFoundException, IOException {
		mapFile = file;
	}

	public void saveMap() throws IOException {
		name = "TestMap";
		field = new int[32][32];
		for (int i = 0; i < field.length; i++) {
			for (int j = 0; j < field[i].length; j++) {
				field[i][j] = 0;
			}
		}
		width = 32;
		height = 32;
		spawns = new ArrayList();
		spawns.add(new Point(0, 0));
		spawns.add(new Point(0, 31));
		spawns.add(new Point(31, 0));
		spawns.add(new Point(31, 31));
		fieldRefs = new HashMap<Integer, String>();
		fieldRefs.put(0, "www.img.de/1");
		fieldRefs.put(1, "www.img.de/2");
		fieldRefs.put(2, "www.img.de/3");
		fieldTypes = new HashMap<Integer, FieldType>();
		fieldTypes.put(0, FieldType.Empty);
		fieldTypes.put(1, FieldType.Destructible);
		fieldTypes.put(2, FieldType.Indestructible);
		JSONObject obj = new JSONObject();
		obj.put("name", name);
		obj.put("width", width);
		obj.put("height", height);
		JSONObject points = new JSONObject();
		int p = 0;
		for (Point point : spawns) {
			JSONObject spawnPoints = new JSONObject();
			spawnPoints.put("x", point.getX());
			spawnPoints.put("y", point.getY());
			points.put(p, spawnPoints);
			p++;
		}
		obj.put("spawns", points);
		JSONObject fieldJson = new JSONObject();
		for (int i = 0; i < field.length; i++) {
			JSONArray line = new JSONArray();
			for (int j = 0; j < field[i].length; j++) {
				line.add(field[i][j]);
			}
			fieldJson.put(i, line);
		}
		obj.put("field", fieldJson);
		obj.put("fieldTypes", new JSONObject(fieldTypes));
		obj.put("fieldRefs", new JSONObject(fieldRefs));

		FileWriter fr = new FileWriter(mapFile);
		obj.writeJSONString(fr);
		fr.close();
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

	public File getMapFile() {
		return mapFile;
	}

	public void setMapFile(File mapFile) {
		this.mapFile = mapFile;
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
