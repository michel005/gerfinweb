package com.michel.gerfinweb.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CurrentFutureBalance {

    private BigDecimal balance = BigDecimal.ZERO;
    private BigDecimal currentBalance = BigDecimal.ZERO;
    private BigDecimal futureBalance = BigDecimal.ZERO;
}
