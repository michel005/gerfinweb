package com.michel.gerfinweb.model;

import com.michel.gerfinweb.entity.Account;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AccountBalanceModel {

    private Account account;

    private BigDecimal balance;

    private BigDecimal currentBalance;

    private BigDecimal futureBalance;

    public AccountBalanceModel(Account account, BigDecimal balance, BigDecimal currentBalance, BigDecimal futureBalance) {
        this.account = account;
        this.balance = balance;
        this.currentBalance = currentBalance;
        this.futureBalance = futureBalance;
    }
}
