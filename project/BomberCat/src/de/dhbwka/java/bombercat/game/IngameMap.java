package de.dhbwka.java.bombercat.game;

import java.awt.Point;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import de.dhbwka.java.bombercat.BomberCatMap;
import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.FieldType;

public class IngameMap {
	private FieldType[][] map;
	private Map<Point, BonusType> bonusFields = new HashMap<>();
	private Set<Point> bombs = new HashSet<>();

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

	private void explodePossibleOtherBombs(int x, int y, GameMain game, Client client) {
		if (bombs.contains(new Point(x, y))) {
			// game.sendToAllPlayers("b", message);
		}
	}

	public List<Point> explode(int x, int y, int size, GameMain game, Client client) {
		List<Point> points = new ArrayList<>();
		boolean left = true;
		boolean right = true;
		boolean up = true;
		boolean down = true;
		for (int i = 1; i <= size; i++) {
			down = clearAndAddPoint(x + i, y, points, down, game, client);
			up = clearAndAddPoint(x - i, y, points, up, game, client);
			right = clearAndAddPoint(x, y + i, points, right, game, client);
			left = clearAndAddPoint(x, y - i, points, left, game, client);
		}
		return points;
	}

	public boolean clearAndAddPoint(int x, int y, List<Point> points, boolean b, GameMain game, Client client) {
		if (b) {
			if (getField(x, y) == FieldType.Destructible) {
				setField(x, y, FieldType.Empty);
				addRandomBonusField(x, y);
				explodePossibleOtherBombs(x, y, game, client);
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
		if (random.nextInt(100) < 50) {
			bonusFields.put(new Point(x, y), randomEnum(BonusType.class));
		}
	}

	private <T extends Enum<?>> T randomEnum(Class<T> clazz) {
		SecureRandom random = new SecureRandom();
		int x = random.nextInt(clazz.getEnumConstants().length);
		return clazz.getEnumConstants()[x];
	}

	public Set<Point> getBombs() {
		return bombs;
	}

	public void setBombs(Set<Point> bombs) {
		this.bombs = bombs;
	}

	public void addBomb(int x, int y) {
		bombs.add(new Point(x, y));
	}

	public void removeBomb(int x, int y) {
		bombs.remove(new Point(x, y));
	}
}
