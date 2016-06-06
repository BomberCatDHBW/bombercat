package de.dhbwka.java.bombercat.game;

import java.awt.Point;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.FieldType;

public class Player {
	private Point position;
	private Client client;
	private int explosionSize = 1;

	public Player(Point point, Client client) {
		this.position = point;
		this.client = client;
	}

	public boolean moveToPosition(Point p, IngameMap map) {
		boolean result = false;
		if (position.distance(p) == 1) {
			if (map.getField((int) p.getX(), (int) p.getY()) == FieldType.Empty) {
				position = p;
				result = true;
			}
		}
		return result;
	}

	public int getExplosionSize() {
		return explosionSize;
	}

	public void setExplosionSize(int explosionSize) {
		this.explosionSize = explosionSize;
	}
}
