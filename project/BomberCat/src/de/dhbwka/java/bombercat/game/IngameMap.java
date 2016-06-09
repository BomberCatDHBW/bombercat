package de.dhbwka.java.bombercat.game;

import java.awt.Point;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import de.dhbwka.java.bombercat.BomberCatMap;
import de.dhbwka.java.bombercat.FieldType;

public class IngameMap {
	private FieldType[][] map;
	private Map<Point, BonusType> bonusFields = new HashMap<>();
	private Map<Point, Player> bombs = new HashMap<>();

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
			result = true;
		}
		return result;
	}

	private void explodePossibleOtherBombs(int x, int y, List<Point> points) {
		if (bombs.containsKey(new Point(x, y))) {
			explode(x, y, bombs.get(new Point(x, y)).getExplosionSize(), points);
		}
	}

	public void explode(int x, int y, int size, List<Point> points) {
		boolean left = true;
		boolean right = true;
		boolean up = true;
		boolean down = true;
		for (int i = 1; i <= size; i++) {
			down = clearAndAddPoint(x + i, y, points, down);
			up = clearAndAddPoint(x - i, y, points, up);
			right = clearAndAddPoint(x, y + i, points, right);
			left = clearAndAddPoint(x, y - i, points, left);
		}
	}

	public boolean clearAndAddPoint(int x, int y, List<Point> points, boolean b) {
		if (b) {
			if (getField(x, y) == FieldType.Destructible) {
				setField(x, y, FieldType.Empty);
				addRandomBonusField(x, y);
			} else if (getField(x, y) != FieldType.Indestructible) {
				explodePossibleOtherBombs(x, y, points);
				points.add(new Point(x, y));
			} else if (getField(x, y) == FieldType.Indestructible) {
				b = false;
			}
		}
		return b;

	}

	public Map<Point, BonusType> getBonusFields() {
		return bonusFields;
	}

	public void setBonusFields(Map<Point, BonusType> bonusFields) {
		this.bonusFields = bonusFields;
	}

	public void addRandomBonusField(int x, int y) {
		SecureRandom random = new SecureRandom();
		if (random.nextInt(100) < 10) {
			bonusFields.put(new Point(x, y), randomEnum(BonusType.class));
		}
	}

	private <T extends Enum<?>> T randomEnum(Class<T> clazz) {
		SecureRandom random = new SecureRandom();
		int x = random.nextInt(clazz.getEnumConstants().length);
		return clazz.getEnumConstants()[x];
	}

	public Map<Point, Player> getBombs() {
		return bombs;
	}

	public void setBombs(Map<Point, Player> bombs) {
		this.bombs = bombs;
	}

	public void addBomb(int x, int y, Player player) {
		bombs.put(new Point(x, y), player);
	}

	public void removeBomb(int x, int y) {
		bombs.remove(new Point(x, y));
	}
}
