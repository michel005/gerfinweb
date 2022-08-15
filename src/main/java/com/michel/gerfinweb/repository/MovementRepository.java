package com.michel.gerfinweb.repository;

import com.michel.gerfinweb.entity.Movement;
import com.michel.gerfinweb.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;

@Repository
public interface MovementRepository extends JpaRepository<Movement, Long> {

    @Query("select m from Movement m where user = :user and dueDate between :startDate and :finishDate")
    Page<Movement> findByUser(Pageable pageable, LocalDate startDate, LocalDate finishDate, User user);

    @Query("select coalesce(sum(m.value), 0) from Movement m where user = :user and dueDate <= :finalDate")
    BigDecimal futureBalance(LocalDate finalDate, User user);

    @Query("select coalesce(sum(m.value), 0) from Movement m where user = :user and dueDate <= :finalDate and status = 'APPROVED'")
    BigDecimal currentBalance(LocalDate finalDate, User user);

}
