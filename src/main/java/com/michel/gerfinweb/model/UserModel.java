package com.michel.gerfinweb.model;

import lombok.Data;

@Data
public class UserModel {

    private String fullName;
    private String email;
    private String password;
    private String passwordConfirm;

}
