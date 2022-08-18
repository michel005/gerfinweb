package com.michel.gerfinweb.repository;

import com.michel.gerfinweb.entity.Account;
import com.michel.gerfinweb.model.AccountBalanceModel;
import com.michel.gerfinweb.model.SimpleAccountModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByName(String name);

    @Query("select new com.michel.gerfinweb.model.AccountBalanceModel(a, sum(case when m.dueDate >= :firstDay and m.dueDate <= : lastDay then coalesce(m.value, 0) else 0 end), sum(case when m.dueDate <= :lastDay and m.status = 'APPROVED' then coalesce(m.value, 0) else 0 end), sum(coalesce(m.value, 0))) from Account a left join Movement m on m.account.id = a.id and m.user.id = a.user.id and m.dueDate <= :lastDay where a.user.id = :userId group by a.id")
    Page<AccountBalanceModel> findByUser(Pageable pageable, LocalDate firstDay, LocalDate lastDay, Long userId);

    @Query("select new com.michel.gerfinweb.model.SimpleAccountModel(a) from Account a where a.user.id = :userId")
    List<SimpleAccountModel> findByUser(Long userId);
}
