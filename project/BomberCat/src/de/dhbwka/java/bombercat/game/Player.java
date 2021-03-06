package de.dhbwka.java.bombercat.game;

import java.awt.Point;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.FieldType;

public class Player {
	private static final Logger LOGGER = LoggerFactory.getLogger(Player.class);
	private boolean alive = true;
	private Point position;
	private Client client;
	private int explosionSize = 1;
	private int amountPlacedBombs = 0;
	private int bombAmount = 1;

	public Player(Point point, Client client) {
		this.position = point;
		this.setClient(client);
	}

	public synchronized boolean moveToPosition(Point p, IngameMap map) {
		boolean result = false;
		if (position.distance(p) == 1) {
			if (map.getField((int) p.getX(), (int) p.getY()) == FieldType.Empty) {
				if (!map.getBombs().containsKey(p)) {
					Player player = map.getPlayers().get(position);
					map.getPlayers().remove(position);
					map.getPlayers().put(p, player);
					position = p;
					result = true;
					addBonusToPlayer(p, map);
				}
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
				break;
			case SpeedUp:
				client.sendInfo("speedUp", "");
				break;
			}
			map.getBonusFields().remove(p);
		}
	}

	public void sendMessage(String prefix, String infoMessage) {
		if (client != null) {
			client.sendInfo(prefix, infoMessage);
		}
	}

	public int getExplosionSize() {
		return explosionSize;
	}

	public void setExplosionSize(int explosionSize) {
		this.explosionSize = explosionSize;
	}

	public int getBombAmount() {
		return bombAmount;
	}

	public void setBombAmount(int bombAmount) {
		this.bombAmount = bombAmount;
	}

	public Point getPosition() {
		return position;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	public boolean isAlive() {
		return alive;
	}

	public void setAlive(boolean alive) {
		this.alive = alive;
	}

	public synchronized int getAmountPlacedBombs() {
		return amountPlacedBombs;
	}

	public synchronized void setAmountPlacedBombs(int amountPlacedBombs) {
		this.amountPlacedBombs = amountPlacedBombs;
	}
}
