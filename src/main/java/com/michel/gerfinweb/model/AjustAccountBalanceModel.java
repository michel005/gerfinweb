package com.michel.gerfinweb.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.michel.gerfinweb.entity.Account;

import lombok.Data;

@Data
public class AjustAccountBalanceModel {

    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
	private LocalDate date;
	
	private String description;
	
	private Account account;
	
	private BigDecimal value;
	
}
