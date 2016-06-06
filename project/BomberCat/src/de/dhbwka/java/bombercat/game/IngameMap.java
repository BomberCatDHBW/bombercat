package de.dhbwka.java.bombercat.game;

import java.awt.Point;
import java.util.ArrayList;
import java.util.List;

import de.dhbwka.java.bombercat.BomberCatMap;
import de.dhbwka.java.bombercat.FieldType;

public class IngameMap {
	private FieldType[][] map;

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
		return map[x][y];
	}

	public void setField(int x, int y, FieldType fieldType) {
		map[x][y] = fieldType;
	}

	public boolean clearField(int x, int y) {
		boolean result = false;
		if (map[x][y] != FieldType.Indestructible) {
			map[x][y] = FieldType.Empty;
		}
		return result;
	}

	public List<Point> explode(int x, int y, int size) {
		List<Point> points = new ArrayList<>();
		int i = 0;
		if (x - size > 0) {
			i = x - size;
		}
		for (; i < size * 2 + 1; i++) {
			if (clearField(i, y)) {
				points.add(new Point(i, y));
			}
			if (clearField(x, i)) {
				points.add(new Point(x, i));
			}
		}
		return points;
	}
}
