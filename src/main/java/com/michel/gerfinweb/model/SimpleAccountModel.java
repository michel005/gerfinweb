package com.michel.gerfinweb.model;

import com.michel.gerfinweb.entity.Account;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class SimpleAccountModel {

    private Long id;

    private String name;

    public SimpleAccountModel(Account account) {
        this.id = account.getId();
        this.name = account.getName();
    }
}
