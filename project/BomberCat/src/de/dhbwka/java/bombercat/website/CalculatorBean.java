package de.dhbwka.java.bombercat.website;

public class CalculatorBean {
	public CalculatorBean(){
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
			return "You might love Perisan Pussys";
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
			return "Hello World!!";
		}
	}
}