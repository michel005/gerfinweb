package com.michel.gerfinweb.model;

import lombok.Data;

@Data
public class PasswordChangeModel {

    private String oldPassword;
    private String newPassword;
    private String passwordConfirm;

}
