package com.michel.gerfinweb.api;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
import com.michel.gerfinweb.entity.Target;
import com.michel.gerfinweb.entity.Template;
import com.michel.gerfinweb.entity.User;
import com.michel.gerfinweb.model.PaginationModel;
import com.michel.gerfinweb.model.SimpleTemplateModel;
import com.michel.gerfinweb.repository.TargetRepository;
import com.michel.gerfinweb.repository.UserRepository;
import com.michel.gerfinweb.type.TemplateRecurrency;
import com.michel.gerfinweb.utils.DateUtils;

@RestController
@RequestMapping("/target")
public class TargetAPI {

    @Autowired
    private TargetRepository targetRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    private ResponseEntity<?> create(Authentication authentication, @RequestBody Target target) {
        List<String> errors = new ArrayList<>();
        if (target.getTargetValue() == null) {
            errors.add("Target value was not informed!");
        }
        if (target.getDescription() == null || target.getDescription().trim().isEmpty()) {
            errors.add("Target description was not informed!");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        target.setUser(userFinded.get());
        Target targetSaved = targetRepository.save(target);

        return ResponseEntity.ok(targetSaved);
    }

    @PostMapping("/update")
    private ResponseEntity<?> update(Authentication authentication, @RequestBody Target target) {
        List<String> errors = new ArrayList<>();
        if (target.getTargetValue() == null) {
            errors.add("Target value was not informed!");
        }
        if (target.getDescription() == null || target.getDescription().trim().isEmpty()) {
            errors.add("Target description was not informed!");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        Optional<Target> originalTarget = targetRepository.findById(target.getId());
        if (originalTarget.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if (!originalTarget.get().getUser().getId().equals(userFinded.get().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Target original = originalTarget.get();
        original.setAccount(target.getAccount());
        original.setDescription(target.getDescription());
        original.setTargetValue(target.getTargetValue());
        original.setTargetDate(target.getTargetDate());

        Target targetSaved = targetRepository.save(original);
        return ResponseEntity.ok(targetSaved);
    }

    @PostMapping("/delete")
    private ResponseEntity<?> delete(Authentication authentication, @RequestParam Long id) {
        Optional<Target> targetFinded = targetRepository.findById(id);
        if (targetFinded.isEmpty()) {
            return ResponseEntity.badRequest().body("Target was not found!");
        }
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        if (!targetFinded.get().getUser().getId().equals(userFinded.get().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        targetRepository.delete(targetFinded.get());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/findAll")
    private ResponseEntity<?> findAll(Authentication authentication, @RequestParam String dataBase, @RequestBody PaginationModel paginationModel) {
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        PageRequest pageable = PageRequest.of(paginationModel.getPage(), paginationModel.getSize(), Sort.by(Sort.Direction.valueOf(paginationModel.getSortDirection()), paginationModel.getSortField()));
        Page<Target> targets = targetRepository.findByUser(pageable, userFinded.get());
        return ResponseEntity.ok(targets);
    }

    @GetMapping("/findAllWihtoutPagination")
    private ResponseEntity<?> findAllSimple(Authentication authentication) {
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        List<Target> templates = targetRepository.findByUser(userFinded.get());
        return ResponseEntity.ok(templates);
    }

}
