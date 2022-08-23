package com.michel.gerfinweb.model;

import java.math.BigDecimal;
import java.util.Map;

import lombok.Data;

@Data
public class BalanceByDayModel {

	private Map<Integer, BigDecimal> balances;
	private BigDecimal maxValue;
	private BigDecimal minValue;
	
}
