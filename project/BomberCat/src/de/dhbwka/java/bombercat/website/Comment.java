package de.dhbwka.java.bombercat.website;

public class Comment {

	private String username;
	private String opinion;
	private String comment;

	Comment(String username, String opinion, String comment) {
		this.username = username;
		this.opinion = opinion;
		this.comment = comment;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getOpinion() {
		return opinion;
	}

	public void setOpinion(String opinion) {
		this.opinion = opinion;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
}
