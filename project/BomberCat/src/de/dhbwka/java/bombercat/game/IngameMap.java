package de.dhbwka.java.bombercat.game;

import java.awt.Point;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import de.dhbwka.java.bombercat.BomberCatMap;
import de.dhbwka.java.bombercat.FieldType;

public class IngameMap {
	private FieldType[][] map;

	private Map<Point, BonusType> bonusFields = new HashMap<>();

	public IngameMap(BomberCatMap bomberCatMap) {
		map = new FieldType[25][25];
		for (int x = 0; x < map.length; x++) {
			for (int y = 0; y < map.length; y++) {
				map[x][y] = bomberCatMap.getFieldTypes().get(bomberCatMap.getField()[x][y]);
			}
		}
	}

	public FieldType[][] getMap() {
		return map;
	}

	public FieldType getField(int x, int y) {
		try {
			return map[x][y];
		} catch (ArrayIndexOutOfBoundsException ex) {
			return null;
		}
	}

	public void setField(int x, int y, FieldType fieldType) {
		try {
			map[x][y] = fieldType;
		} catch (ArrayIndexOutOfBoundsException ex) {
		}
	}

	public boolean clearField(int x, int y) {
		boolean result = false;
		if (getField(x, y) == FieldType.Destructible) {
			setField(x, y, FieldType.Empty);
			addRandomBonusField(x, y);
			result = true;
		}
		return result;
	}

	public List<Point> explode(int x, int y, int size) {
		List<Point> points = new ArrayList<>();
		for (int i = 1; i <= size; i++) {
			clearAndAddPoint(x + i, y, points);
			clearAndAddPoint(x - i, y, points);
			clearAndAddPoint(x, y + i, points);
			clearAndAddPoint(x, y - i, points);
		}
		return points;
	}

	public void clearAndAddPoint(int x, int y, List<Point> points) {
		if (clearField(x, y)) {
			points.add(new Point(x, y));
		}
	}

	public Map<Point, BonusType> getBonusFields() {
		return bonusFields;
	}

	public void setBonusFields(Map<Point, BonusType> bonusFields) {
		this.bonusFields = bonusFields;
	}

	public void addRandomBonusField(int x, int y) {
		SecureRandom random = new SecureRandom();
		if (random.nextInt(100) < 50) { // probability of 50%
			bonusFields.put(new Point(x, y), randomEnum(BonusType.class));
		}
	}

	private <T extends Enum<?>> T randomEnum(Class<T> clazz) {
		SecureRandom random = new SecureRandom();
		int x = random.nextInt(clazz.getEnumConstants().length);
		return clazz.getEnumConstants()[x];
	}
}
