package de.dhbwka.java.servlet;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.servercalls.Server;

@ServerEndpoint("/echo")
@WebServlet("/Servlet")
public class Servlet extends HttpServlet {

	private static final Logger LOGGER = LoggerFactory.getLogger(Servlet.class);
	private static final long serialVersionUID = 1L;
	private static Server server = new Server();
	private static Map<String, Client> clients = new HashMap<>();

	public Servlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.getWriter().write("Server is running");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	@OnOpen
	public void onOpen(Session session) {
		LOGGER.info(session.getId() + " has opened a connection");
		try {
			session.getBasicRemote().sendText("Connection Established");
			LOGGER.info("Socket opened!");
			Client client = new Client(session);
			clients.put(session.getId(), client);
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

	@OnMessage
	public void onMessage(String message, Session session) {
		Client client = clients.get(session.getId());
		server.call(message, client);
	}

	@OnClose
	public void onClose(Session session) {
		LOGGER.info("Session {} has ended. Client {} disconnected", session.getId(),
				clients.get(session.getId()).getUsername());
		server.removeClient(clients.get(session.getId()));
		clients.remove(session.getId());
		try {
			session.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
