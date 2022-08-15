package com.michel.gerfinweb.api;

import com.michel.gerfinweb.entity.User;
import com.michel.gerfinweb.model.PasswordChangeModel;
import com.michel.gerfinweb.model.UserModel;
import com.michel.gerfinweb.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserAPI {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/verify")
    public ResponseEntity<?> verify(Authentication authentication) {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok(userFinded.get().blurUser());
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody UserModel userModel) {
        List<String> errors = new ArrayList<>();
        if (userModel.getFullName() == null || userModel.getFullName().trim().isEmpty()) {
            errors.add("Full name was not informed!");
        }
        if (userModel.getEmail() == null || userModel.getEmail().trim().isEmpty()) {
            errors.add("Email was not informed!");
        } else {
            Optional<User> userOptional = userRepository.findByEmail(userModel.getEmail());
            if (userOptional.isPresent()) {
                errors.add("Email '" + userModel.getEmail() + "' is already in use!");
            }
        }
        if (userModel.getPassword() == null || userModel.getPassword().trim().isEmpty()) {
            errors.add("Password was not informed!");
        } else
        if (userModel.getPasswordConfirm() == null || userModel.getPasswordConfirm().trim().isEmpty()) {
            errors.add("Password confirmation was not informed!");
        } else
        if (!userModel.getPassword().equals(userModel.getPasswordConfirm())) {
            errors.add("Password don't math with confirmation!");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }

        User user = new User();
        user.setFullName(userModel.getFullName());
        user.setEmail(userModel.getEmail());
        user.setPassword("{" + userModel.getPassword().hashCode() + "}");

        userRepository.save(user);

        return ResponseEntity.ok(userModel);
    }

    @PostMapping("/update/fullName")
    public ResponseEntity<?> updateFullName(Authentication authentication, @RequestParam String fullName) {
        if (fullName == null || fullName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Full name was not informed!");
        }
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        User user = userFinded.get();
        user.setFullName(fullName);
        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(savedUser.blurUser());
    }

    @PostMapping("/update/password")
    public ResponseEntity<?> updatePassword(Authentication authentication, @RequestBody PasswordChangeModel passwordChangeModel) {
        List<String> errors = new ArrayList<>();
        Optional<User> userOptional = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userOptional.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        if (passwordChangeModel.getOldPassword() == null || passwordChangeModel.getOldPassword().trim().isEmpty()) {
            errors.add("The old password was not informed!");
        } else
        if (!userOptional.get().getPassword().equals("{" + passwordChangeModel.getOldPassword().hashCode() + "}")) {
            errors.add("The old password was not valid!");
        }
        if (passwordChangeModel.getNewPassword() == null || passwordChangeModel.getNewPassword().trim().isEmpty()) {
            errors.add("the new password was not informed!");
        } else
        if (passwordChangeModel.getPasswordConfirm() == null || passwordChangeModel.getPasswordConfirm().trim().isEmpty()) {
            errors.add("Password confirmation was not informed!");
        } else
        if (!passwordChangeModel.getNewPassword().equals(passwordChangeModel.getPasswordConfirm())) {
            errors.add("Password don't math with confirmation!");
        }
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }

        User user = userOptional.get();
        user.setPassword("{" + passwordChangeModel.getNewPassword().hashCode() + "}");
        User savedUser = userRepository.save(user);

        return ResponseEntity.ok().build();
    }

}
