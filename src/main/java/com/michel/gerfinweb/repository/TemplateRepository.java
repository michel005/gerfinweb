package com.michel.gerfinweb.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.michel.gerfinweb.entity.Template;
import com.michel.gerfinweb.model.SimpleTemplateModel;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {

    @Query("select t from Template t where t.user.id = :userId")
    Page<Template> findByUser(Pageable pageable, Long userId);

    @Query("select new com.michel.gerfinweb.model.SimpleTemplateModel(t) from Template t where t.user.id = :userId order by t.dueDay")
    List<SimpleTemplateModel> findByUser(Long userId);
    
}
