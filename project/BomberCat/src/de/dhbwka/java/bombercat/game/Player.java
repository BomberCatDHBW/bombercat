package de.dhbwka.java.bombercat.game;

import java.awt.Point;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.FieldType;

public class Player {
	private static final Logger LOGGER = LoggerFactory.getLogger(Player.class);
	private Point position;
	private Client client;
	private int explosionSize = 1;
	private int speed = 32;
	private int bombAmount = 1;

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
				addBonusToPlayer(p, map);
			}
		}
		return result;
	}

	private void addBonusToPlayer(Point p, IngameMap map) {
		if (map.getBonusFields().containsKey(p)) {
			switch (map.getBonusFields().get(p)) {
			case BombAmount:
				bombAmount++;
				break;
			case ExplosionSize:
				explosionSize++;
				LOGGER.info("explosionSize: " + explosionSize);
				break;
			case SpeedUp:
				speed += 10;
				break;
			}
			map.getBonusFields().remove(p);
		}
	}

	public int getExplosionSize() {
		return explosionSize;
	}

	public void setExplosionSize(int explosionSize) {
		this.explosionSize = explosionSize;
	}

	public int getSpeed() {
		return speed;
	}

	public void setSpeed(int speed) {
		this.speed = speed;
	}

	public int getBombAmount() {
		return bombAmount;
	}

	public void setBombAmount(int bombAmount) {
		this.bombAmount = bombAmount;
	}
}
