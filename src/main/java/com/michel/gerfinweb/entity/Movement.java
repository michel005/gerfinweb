package com.michel.gerfinweb.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.michel.gerfinweb.type.MovementStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@Entity
@ToString(callSuper = true)
@Table(name = "gf_movement")
public class Movement extends UserAbstractEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User user;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "template_id")
    private Template template;

    @Column(name = "description", length = 100)
    private String description;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "due_date", length = 100)
    private LocalDate dueDate;

    private BigDecimal value;

    @Enumerated(EnumType.STRING)
    private MovementStatus status;

    @Override
    public Map<String, Object> blurEntity() {
        Map<String, Object> entity = new HashMap<>();
        entity.put("account", account.getId());
        entity.put("description", description);
        entity.put("dueDate", dueDate);
        entity.put("value", value);
        entity.put("status", status);
        return entity;
    }
}
