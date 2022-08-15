package com.michel.gerfinweb.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import java.util.Map;

@Getter
@Setter
@ToString(callSuper = true)
@MappedSuperclass
public abstract class UserAbstractEntity extends AbstractEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    abstract Map<String, Object> blurEntity();

}
