package com.michel.gerfinweb.model;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class FutureCurrentBalanceByDay {

    private LocalDate date;
    private BigDecimal currentBalance;
    private BigDecimal futureBalance;

    public FutureCurrentBalanceByDay(LocalDate date, BigDecimal currentBalance, BigDecimal futureBalance) {
        this.date = date;
        this.currentBalance = currentBalance;
        this.futureBalance = futureBalance;
    }

}
