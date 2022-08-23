package com.michel.gerfinweb.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.michel.gerfinweb.type.AccountType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@ToString(callSuper = true)
@Table(name = "gf_account")
public class Account extends UserAbstractEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User user;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "bank", length = 50)
    private String bank;

    @Column(name = "type", length = 20)
    @Enumerated(EnumType.STRING)
    private AccountType type;
}
