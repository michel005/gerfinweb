package com.michel.gerfinweb.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.michel.gerfinweb.entity.Movement;
import com.michel.gerfinweb.entity.Template;
import com.michel.gerfinweb.entity.User;

@Repository
public interface MovementRepository extends JpaRepository<Movement, Long> {

    @Query("select m from Movement m where user = :user and dueDate between :startDate and :finishDate")
    Page<Movement> findByUser(Pageable pageable, LocalDate startDate, LocalDate finishDate, User user);

    @Query("select m from Movement m where user = :user and dueDate between :startDate and :finishDate and status = 'PENDENT'")
    Page<Movement> findPendentByUser(Pageable pageable, LocalDate startDate, LocalDate finishDate, User user);

    @Query("select coalesce(sum(m.value), 0) from Movement m where user = :user and dueDate <= :finalDate")
    BigDecimal futureBalance(LocalDate finalDate, User user);

    @Query("select coalesce(sum(m.value), 0) from Movement m where user = :user and dueDate <= :finalDate and status = 'APPROVED'")
    BigDecimal currentBalance(LocalDate finalDate, User user);

    @Query("select m from Movement m where user = :user and dueDate between :startDate and :finishDate and m.template = :template")
    List<Movement> hasMovementWithTemplate(LocalDate startDate, LocalDate finishDate, User user, Template template);
}
