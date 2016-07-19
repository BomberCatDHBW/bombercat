package de.dhbwka.java.bombercat.website;

import java.io.Serializable;

public class RandomBean implements Serializable{
	private static final long serialVersionUID = 2192698649129904738L;

	public RandomBean(){
	}
	
	private String randomSlogan = "emptyTest";
	
	public void setRandomSlogan(String randomSlogan) {
		this.randomSlogan = randomSlogan;
	}
	
	public String getRandomSlogan() {
		int random = (int) (Math.random() * 10);
		if (random == 1) {
			return "BE Fast Be Clever";
		}
		if (random == 2) {
			return "In 2016 123.000 cats died";
		}
		if (random == 3) {
			return "Whiskass is the best for cats";
		}
		if (random == 4) {
			return "You might love Perisan Cats";
		}
		if (random == 5) {
			return "Cats are made to rule";
		}
		if (random == 6) {
			return "Cats should coup the government";
		}
		if (random == 7) {
			return "My cat is the BEST!";
		} else {
			return "Cats are Ninjas";
		}
	}
}