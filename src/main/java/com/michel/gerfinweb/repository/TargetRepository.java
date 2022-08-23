package com.michel.gerfinweb.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.michel.gerfinweb.entity.Target;
import com.michel.gerfinweb.entity.User;

@Repository
public interface TargetRepository extends JpaRepository<Target, Long> {

    @Query("select t from Target t where user = :user")
    Page<Target> findByUser(Pageable pageable, User user);

    @Query("select t from Target t where user = :user")
    List<Target> findByUser(User user);

}