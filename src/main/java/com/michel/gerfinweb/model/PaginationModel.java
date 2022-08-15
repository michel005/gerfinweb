package com.michel.gerfinweb.model;

import lombok.Data;

@Data
public class PaginationModel {

    private int page;
    private int size;
    private String sortField;
    private String sortDirection;

}
