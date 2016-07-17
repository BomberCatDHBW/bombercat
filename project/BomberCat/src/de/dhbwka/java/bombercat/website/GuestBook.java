package de.dhbwka.java.bombercat.website;

import java.io.Serializable;

public class GuestBook implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String username;
	private String opinion;
	private String comment;
	public GuestBook() {
	}
	
	public void setUsername (String name){
		username = name;
	}
	
	public void setOpinion (String opinion1){
		opinion = opinion1;
	}
	
	public void setComment (String input) {
		comment = input;
	}
	
	public String getUsername(){
		return username;
	}
	public String getOpinion(){
		return opinion;
	}
	public String getComment(){
		return comment;
	}
	
	public void setEntry (String entry){
	}
	
	public String getEntry (){
		return username + " commented: " + comment + opinion;
	}
	
}
