package com.michel.gerfinweb.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.michel.gerfinweb.entity.Account;
import com.michel.gerfinweb.type.MovementStatus;

import lombok.Data;

@Data
public class TransferModel {

    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
	private LocalDate date;

	private Account accountOrigin;

	private Account accountDestiny;
	
	private String description;
	
	private BigDecimal value;
	
	private MovementStatus status;
	
}
