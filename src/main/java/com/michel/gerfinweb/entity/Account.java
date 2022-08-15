package com.michel.gerfinweb.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.michel.gerfinweb.type.AccountType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

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

    @Override
    public Map<String, Object> blurEntity() {
        Map<String, Object> entity = new HashMap<>();
        entity.put("name", name);
        entity.put("bank", bank);
        entity.put("type", type.toString());
        return entity;
    }
}
