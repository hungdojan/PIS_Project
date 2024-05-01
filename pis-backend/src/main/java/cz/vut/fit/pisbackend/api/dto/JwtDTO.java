package cz.vut.fit.pisbackend.api.dto;

public class JwtDTO {
    private String message;

    public JwtDTO(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
