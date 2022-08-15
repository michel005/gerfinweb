package com.michel.gerfinweb.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@Slf4j
@ToString(callSuper = true)
@MappedSuperclass
public abstract class AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Map<String, Object> toMap() {
        Map<String, Object> values = new HashMap<>();
        for (Field declaredField : this.getClass().getDeclaredFields()) {
            declaredField.setAccessible(true);
            try {
                values.put(declaredField.getName(), declaredField.get(this));
            } catch (IllegalAccessException e) {
                log.error("ERROR: ", e);
            }
        }
        values.put("id", id);
        return values;
    }

}