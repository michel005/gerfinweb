package com.michel.gerfinweb.entity;

import java.math.BigDecimal;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.michel.gerfinweb.type.TemplateRecurrency;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@ToString(callSuper = true)
@Table(name = "gf_template")
public class Template extends UserAbstractEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User user;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @Column(name = "description", length = 100)
    private String description;

    @Column(name = "due_day", length = 100)
    private Integer dueDay;

    private BigDecimal value;

    @Enumerated(EnumType.STRING)
    private TemplateRecurrency recurrency;
	
	@Override
	public Map<String, Object> blurEntity() {
		return null;
	}
}
