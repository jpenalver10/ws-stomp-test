package wtn.websocket.webmodel;

/**
 * Se envía a un usuario cuando se conecta.
 */
public class ConnectionInfo {

    private String user;

    private String[] activeUsers;

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String[] getActiveUsers() {
        return activeUsers;
    }

    public void setActiveUsers(String[] activeUsers) {
        this.activeUsers = activeUsers;
    }

}
