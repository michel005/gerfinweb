package com.michel.gerfinweb.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.michel.gerfinweb.entity.Account;
import com.michel.gerfinweb.entity.User;
import com.michel.gerfinweb.model.AccountBalanceModel;
import com.michel.gerfinweb.model.AccountFindAllPaginationModel;
import com.michel.gerfinweb.model.SimpleAccountModel;
import com.michel.gerfinweb.repository.AccountRepository;
import com.michel.gerfinweb.repository.UserRepository;
import com.michel.gerfinweb.utils.DateUtils;

@RestController
@RequestMapping("/account")
public class AccountAPI {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    private ResponseEntity<?> create(Authentication authentication, @RequestBody Account account) {
        List<String> errors = new ArrayList<>();
        if (account.getName() == null || account.getName().trim().isEmpty()) {
            errors.add("Account name was not informed!");
        }
        if (account.getType() == null) {
            errors.add("Account type was not informed!");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        account.setUser(userFinded.get());
        Account accountSaved = accountRepository.save(account);

        return ResponseEntity.ok(accountSaved);
    }

    @PostMapping("/update")
    private ResponseEntity<?> update(Authentication authentication, @RequestBody Account account) {
        List<String> errors = new ArrayList<>();
        if (account.getName() == null || account.getName().trim().isEmpty()) {
            errors.add("Account name was not informed!");
        }
        if (account.getType() == null) {
            errors.add("Account type was not informed!");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        Optional<Account> originalAccount = accountRepository.findById(account.getId());
        if (originalAccount.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if (!originalAccount.get().getUser().getId().equals(userFinded.get().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Account original = originalAccount.get();
        original.setName(account.getName());
        original.setBank(account.getBank());
        original.setType(account.getType());
        Account accountSaved = accountRepository.save(original);

        return ResponseEntity.ok(accountSaved);
    }

    @PostMapping("/delete")
    private ResponseEntity<?> delete(Authentication authentication, @RequestParam Long id) {
        Optional<Account> accountFinded = accountRepository.findById(id);
        if (accountFinded.isEmpty()) {
            return ResponseEntity.badRequest().body("Account was not found!");
        }
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        if (!accountFinded.get().getUser().getId().equals(userFinded.get().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        accountRepository.delete(accountFinded.get());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/findAll")
    private ResponseEntity<?> findAll(Authentication authentication, @RequestParam String dataBase, @RequestBody AccountFindAllPaginationModel paginationModel) {
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        PageRequest pageable = PageRequest.of(paginationModel.getPage(), paginationModel.getSize(), Sort.by(Sort.Direction.valueOf(paginationModel.getSortDirection()), paginationModel.getSortField()));
        Page<AccountBalanceModel> accounts = accountRepository.findByUser(pageable, DateUtils.firstDay(DateUtils.toLocalDate(dataBase, "ddMMyyyy")), DateUtils.lastDay(DateUtils.toLocalDate(dataBase, "ddMMyyyy")), userFinded.get().getId(), paginationModel.getType());
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/findAllSimple")
    private ResponseEntity<?> findAllSimple(Authentication authentication) {
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        List<SimpleAccountModel> accounts = accountRepository.findByUser(userFinded.get().getId());
        return ResponseEntity.ok(accounts);
    }

}
