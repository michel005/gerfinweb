package com.michel.gerfinweb.model;

import com.michel.gerfinweb.entity.Account;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AccountBalanceModel {

    private Account account;

    private BigDecimal currentBalance;

    private BigDecimal futureBalance;

    public AccountBalanceModel(Account account, BigDecimal currentBalance, BigDecimal futureBalance) {
        this.account = account;
        this.currentBalance = currentBalance;
        this.futureBalance = futureBalance;
    }
}
