package com.michel.gerfinweb.model;

import java.util.List;

import org.springframework.data.domain.Page;

import com.michel.gerfinweb.entity.Movement;
import com.michel.gerfinweb.entity.Target;

import lombok.Data;

@Data
public class DashboardModel {

	private List<Target> targets;
	private List<AccountBalanceModel> accounts;
	private Page<Movement> pendentMovements;
	private BalanceByDayModel balancePerDay;
	
}
