package com.michel.gerfinweb.model;

import com.michel.gerfinweb.type.AccountType;
import lombok.Data;

@Data
public class AccountFindAllPaginationModel extends PaginationModel {

    private AccountType type;

}
