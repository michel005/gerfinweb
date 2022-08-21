package com.michel.gerfinweb.api;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

import com.michel.gerfinweb.entity.Movement;
import com.michel.gerfinweb.entity.Template;
import com.michel.gerfinweb.entity.User;
import com.michel.gerfinweb.model.PaginationModel;
import com.michel.gerfinweb.model.SimpleAccountModel;
import com.michel.gerfinweb.repository.AccountRepository;
import com.michel.gerfinweb.repository.MovementRepository;
import com.michel.gerfinweb.repository.TemplateRepository;
import com.michel.gerfinweb.repository.UserRepository;
import com.michel.gerfinweb.type.MovementStatus;
import com.michel.gerfinweb.utils.DateUtils;

@RestController
@RequestMapping("/movement")
public class MovementAPI {

    @Autowired
    private MovementRepository movementRepository;

    @Autowired
    private TemplateRepository templateRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    private ResponseEntity<?> create(Authentication authentication, @RequestBody Movement movement) {
        List<String> errors = new ArrayList<>();
        if (movement.getAccount() == null) {
            errors.add("Movement account was not informed!");
        }
        if (movement.getDueDate() == null) {
            errors.add("Movement due date was not informed!");
        }
        if (movement.getStatus() == null) {
            errors.add("Movement status was not informed!");
        }
        if (movement.getValue() == null || movement.getValue().equals(BigDecimal.ZERO)) {
            errors.add("Movement value was not informed!");
        }
        if (movement.getDescription() == null || movement.getDescription().trim().isEmpty()) {
            errors.add("Movement description was not informed!");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        movement.setUser(userFinded.get());
        Movement movementSaved = movementRepository.save(movement);

        return ResponseEntity.ok(movementSaved);
    }

    @PostMapping("/createBasedOnTemplate")
    private ResponseEntity<?> createBasedOnTemplate(Authentication authentication, @RequestParam Long id, @RequestParam String dataBase) {
    	Optional<Template> template = templateRepository.findById(id);
    	
    	if (template.isEmpty()) {
            return ResponseEntity.notFound().build();
    	}
    	
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        
        if (!template.get().getUser().getId().equals(userFinded.get().getId())) {
            return ResponseEntity.notFound().build();
        }
        
        List<SimpleAccountModel> accounts = accountRepository.findByUser(userFinded.get().getId());
        if (accounts.size() == 0) {
        	return ResponseEntity.badRequest().body("User dont have accounts created!");
        }

        LocalDate dtBase = DateUtils.toLocalDate(dataBase, "ddMMyyyy");
        int lastDay = dtBase.getMonth().length(dtBase.isLeapYear());
        Movement movement = new Movement();
        movement.setUser(userFinded.get());
        movement.setDueDate(LocalDate.of(dtBase.getYear(), dtBase.getMonth(), (template.get().getDueDay() == null ? dtBase.getDayOfMonth() : (template.get().getDueDay() > lastDay ? lastDay : template.get().getDueDay()))));
        movement.setDescription(template.get().getDescription());
        movement.setStatus(MovementStatus.PENDENT);
        movement.setValue(template.get().getValue() == null ? BigDecimal.ZERO : template.get().getValue());
        movement.setAccount(template.get().getAccount() == null ? accountRepository.findById(accounts.get(0).getId()).get() : template.get().getAccount());
        movement.setTemplate(template.get());
        
        Movement savedMovement = movementRepository.save(movement);

        return ResponseEntity.ok(savedMovement);
    }

    @PostMapping("/update")
    private ResponseEntity<?> update(Authentication authentication, @RequestBody Movement movement) {
        List<String> errors = new ArrayList<>();
        if (movement.getAccount() == null) {
            errors.add("Movement account was not informed!");
        }
        if (movement.getDueDate() == null) {
            errors.add("Movement due date was not informed!");
        }
        if (movement.getStatus() == null) {
            errors.add("Movement status was not informed!");
        }
        if (movement.getValue() == null || movement.getValue().equals(BigDecimal.ZERO)) {
            errors.add("Movement value was not informed!");
        }
        if (movement.getDescription() == null || movement.getDescription().trim().isEmpty()) {
            errors.add("Movement description was not informed!");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        Optional<Movement> originalMovement = movementRepository.findById(movement.getId());
        if (originalMovement.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if (!originalMovement.get().getUser().getId().equals(userFinded.get().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Movement original = originalMovement.get();
        original.setAccount(movement.getAccount());
        original.setDescription(movement.getDescription());
        original.setValue(movement.getValue());
        original.setStatus(movement.getStatus());
        original.setDueDate(movement.getDueDate());

        Movement movementSaved = movementRepository.save(original);
        return ResponseEntity.ok(movementSaved.blurEntity());
    }

    @PostMapping("/delete")
    private ResponseEntity<?> delete(Authentication authentication, @RequestParam Long id) {
        Optional<Movement> movementFinded = movementRepository.findById(id);
        if (movementFinded.isEmpty()) {
            return ResponseEntity.badRequest().body("Movement was not found!");
        }
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        if (!movementFinded.get().getUser().getId().equals(userFinded.get().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        movementRepository.delete(movementFinded.get());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/balance")
    private ResponseEntity<?> delete(Authentication authentication, @RequestParam String dataBase) {
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        LocalDate finalDataBase = DateUtils.lastDay(DateUtils.toLocalDate(dataBase, "ddMMyyyy"));
        Map<String, BigDecimal> balances = new HashMap<>();
        balances.put("current", movementRepository.currentBalance(finalDataBase, userFinded.get()));
        balances.put("future", movementRepository.futureBalance(finalDataBase, userFinded.get()));

        return ResponseEntity.ok(balances);
    }

    @PostMapping("/findAll")
    private ResponseEntity<?> findAll(Authentication authentication, @RequestParam String dataBase, @RequestBody PaginationModel paginationModel) {
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        PageRequest pageable = PageRequest.of(paginationModel.getPage(), paginationModel.getSize(), Sort.by(Sort.Direction.valueOf(paginationModel.getSortDirection()), paginationModel.getSortField()));
        Page<Movement> movements = movementRepository.findByUser(pageable, DateUtils.firstDay(DateUtils.toLocalDate(dataBase, "ddMMyyyy")), DateUtils.lastDay(DateUtils.toLocalDate(dataBase, "ddMMyyyy")), userFinded.get());
        return ResponseEntity.ok(movements);
    }

}
