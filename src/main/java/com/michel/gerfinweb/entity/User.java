package com.michel.gerfinweb.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "gf_user")
public class User extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long id;

    @Column(name = "full_name", length = 100)
    private String fullName;

    @Column(name = "email", length = 50)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password", length = 50)
    private String password;

    public Map<String, Object> blurUser() {
        Map<String, Object> bluredUser = new HashMap<>();
        bluredUser.put("fullName", fullName);
        bluredUser.put("email", email);
        return bluredUser;
    }
}
