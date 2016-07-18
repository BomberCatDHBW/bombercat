package de.dhbwka.java.bombercat.website;

import java.io.Serializable;
import java.util.ArrayList;

public class GuestBook implements Serializable {

	private static final long serialVersionUID = 1L;
	private String username;
	private String opinion;
	private String comment;
	private ArrayList<Comment> comments = new ArrayList<>();

	public ArrayList<Comment> getComments() {
		System.out.println(comments.size());
		return comments;
	}

	public void setComments(ArrayList<Comment> comments) {
		this.comments = comments;
	}

	public GuestBook() {
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
		System.out.println(username + " " + opinion + " " + comment);
		Comment tmpComment = new Comment("User", "very good!", comment);
		comments.add(tmpComment);
		this.comment = comment;
	}

	public void setEntry(String entry) {
	}

	public String getEntry() {
		return username + " commented: " + comment + " " + opinion;
	}

}
