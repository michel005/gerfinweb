package com.michel.gerfinweb.repository;

import com.michel.gerfinweb.entity.Account;
import com.michel.gerfinweb.model.AccountBalanceModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByName(String name);

    @Query("select new com.michel.gerfinweb.model.AccountBalanceModel(a, sum(case when m.dueDate <= :dataBase then coalesce(m.value, 0) else 0 end), sum(coalesce(m.value, 0))) from Account a left join Movement m on m.account.id = a.id and m.user.id = a.user.id where a.user.id = :userId group by a.id")
    Page<AccountBalanceModel> findByUser(Pageable pageable, LocalDate dataBase, Long userId);

}
