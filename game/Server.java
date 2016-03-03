package server;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/websocket")
@WebServlet("/Server")
public class Server extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Set<Session> sessions = Collections.synchronizedSet(new HashSet<Session>());

	public Server() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter writer = response.getWriter();
		writer.println("<html>");
		writer.println("<head><title>Hello World Servlet</title></head>");
		writer.println("<body>");
		writer.println("<h1>Server</h1>");
		writer.println("<p>Server is running</p>");
		writer.println("<body>");
		writer.println("</html>");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	private void sendMessageToAll(String message) {
		for (Session s : sessions) {
			try {
				s.getBasicRemote().sendText(message);
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
	}

	@OnMessage
	public void onMessage(String message, Session session) throws IOException, InterruptedException {
		System.out.println(session.getId() + " send: " + message);
		// session.getBasicRemote().sendText("You have send me this: " +
		// message);
		if (message.toLowerCase().startsWith("leo")) {
			sendMessageToAll(
					"<img src='http://files.brightside.me/files/news/part_5/50055/preview-650x390-650-1448018399.jpg' alt='leonardo'></img>");
		}
		sendMessageToAll(session.getId() + ": " + message);
	}

	@OnOpen
	public void onOpen(Session session) {
		System.out.println("Client '" + session.getId() + "' connected");
		sendMessageToAll("User " + session.getId() + " has connected");
		sessions.add(session);
	}

	@OnClose
	public void onClose(Session session) {
		sessions.remove(session);
		System.out.println("Client '" + session.getId() + "' closed");
		sendMessageToAll("User " + session.getId() + " has disconnected");
	}
}
