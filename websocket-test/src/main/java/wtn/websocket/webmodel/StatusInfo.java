package wtn.websocket.webmodel;

import wtn.websocket.domain.UserState;

/**
 * Se envía al resto de usuarios cuando uno nuevo se conecta.
 */
public class StatusInfo {

    private String user;

    private UserState state;

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public UserState getState() {
        return state;
    }

    public void setState(UserState state) {
        this.state = state;
    }

}
