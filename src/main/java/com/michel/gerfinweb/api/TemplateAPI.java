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
import com.michel.gerfinweb.entity.Template;
import com.michel.gerfinweb.entity.User;
import com.michel.gerfinweb.model.PaginationModel;
import com.michel.gerfinweb.model.SimpleTemplateModel;
import com.michel.gerfinweb.repository.MovementRepository;
import com.michel.gerfinweb.repository.TemplateRepository;
import com.michel.gerfinweb.repository.UserRepository;
import com.michel.gerfinweb.type.TemplateRecurrency;
import com.michel.gerfinweb.utils.DateUtils;

@RestController
@RequestMapping("/template")
public class TemplateAPI {

    @Autowired
    private TemplateRepository templateRepository;
    @Autowired
    private MovementRepository movementRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    private ResponseEntity<?> create(Authentication authentication, @RequestBody Template template) {
        List<String> errors = new ArrayList<>();
        if (template.getDescription() == null || template.getDescription().trim().isEmpty()) {
            errors.add("Template description was not informed!");
        }
        if (template.getDueDay() != null && (template.getDueDay() > 31 || template.getDueDay() < 1)) {
            errors.add("Template due day need to be between 1 and 31!");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        template.setUser(userFinded.get());
        Template templateSaved = templateRepository.save(template);

        return ResponseEntity.ok(templateSaved);
    }

    @PostMapping("/update")
    private ResponseEntity<?> update(Authentication authentication, @RequestBody Template template) {
    	List<String> errors = new ArrayList<>();
        if (template.getDescription() == null || template.getDescription().trim().isEmpty()) {
            errors.add("Template description was not informed!");
        }
        if (template.getDueDay() != null && (template.getDueDay() > 31 || template.getDueDay() < 1)) {
            errors.add("Template due day need to be between 1 and 31!");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        Optional<Template> originalTemplate = templateRepository.findById(template.getId());
        if (originalTemplate.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if (!originalTemplate.get().getUser().getId().equals(userFinded.get().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Template original = originalTemplate.get();
        original.setAccount(template.getAccount());
        original.setDescription(template.getDescription());
        original.setValue(template.getValue());
        original.setRecurrency(template.getRecurrency());
        original.setDueDay(template.getDueDay());
        Template templateSaved = templateRepository.save(original);

        return ResponseEntity.ok(templateSaved);
    }

    @PostMapping("/delete")
    private ResponseEntity<?> delete(Authentication authentication, @RequestParam Long id) {
        Optional<Template> templateFinded = templateRepository.findById(id);
        if (templateFinded.isEmpty()) {
            return ResponseEntity.badRequest().body("Account was not found!");
        }
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        if (!templateFinded.get().getUser().getId().equals(userFinded.get().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        templateRepository.delete(templateFinded.get());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/findAll")
    private ResponseEntity<?> findAll(Authentication authentication, @RequestBody PaginationModel paginationModel) {
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        PageRequest pageable = PageRequest.of(paginationModel.getPage(), paginationModel.getSize(), Sort.by(Sort.Direction.valueOf(paginationModel.getSortDirection()), paginationModel.getSortField()));
        Page<Template> templates = templateRepository.findByUser(pageable, userFinded.get().getId());
        return ResponseEntity.ok(templates);
    }

    @GetMapping("/findAllSimple")
    private ResponseEntity<?> findAllSimple(Authentication authentication, @RequestParam String dataBase) {
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        LocalDate finalDataBase = DateUtils.lastDay(DateUtils.toLocalDate(dataBase, "ddMMyyyy"));
        List<SimpleTemplateModel> templates = templateRepository.findByUser(userFinded.get().getId());
        List<SimpleTemplateModel> finalTemplates = templates.stream().filter(e -> {
        	Template fullTemplate = templateRepository.findById(e.getId()).get();
        	List<Movement> movements = movementRepository.hasMovementWithTemplate(DateUtils.firstDay(finalDataBase), DateUtils.lastDay(finalDataBase), userFinded.get(), fullTemplate);
        	return movements.size() == 0 || fullTemplate.getRecurrency().equals(TemplateRecurrency.MANY_PER_MONTH);
        }).collect(Collectors.toList());
        return ResponseEntity.ok(finalTemplates);
    }

}
