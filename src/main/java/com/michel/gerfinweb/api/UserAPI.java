package com.michel.gerfinweb.api;

import com.michel.gerfinweb.entity.User;
import com.michel.gerfinweb.model.PasswordChangeModel;
import com.michel.gerfinweb.model.UserModel;
import com.michel.gerfinweb.repository.UserRepository;
import com.michel.gerfinweb.utils.FileUploadUtil;
import com.michel.gerfinweb.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserAPI {

    @Value("${gerfinweb.user.imageFolder}")
    private String userImageFolder;

    @Autowired
    private UserRepository userRepository;

    private byte[] getUserImage(User user) {
        try {
            return Files.readAllBytes(new File(new File(userImageFolder, user.getId().toString()), "profile_image.png").toPath());
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

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
        userFinded.get().setProfileImage(getUserImage(userFinded.get()));
        return ResponseEntity.ok(userFinded.get());
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
        try {
            user.setPassword(SecurityUtils.sha256(userModel.getPassword()));
        } catch (NoSuchAlgorithmException e) {
            return ResponseEntity.internalServerError().body(e);
        }

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

        savedUser.setProfileImage(getUserImage(savedUser));
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/update/image")
    public ResponseEntity<?> updateImage(Authentication authentication, @RequestParam("image") MultipartFile multipartFile) {
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));

        String uploadDir = userImageFolder + userFinded.get().getId();

        try {
            FileUploadUtil.saveFile(uploadDir, "profile_image.png", multipartFile);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }

        userFinded.get().setProfileImage(getUserImage(userFinded.get()));

        return ResponseEntity.ok(userFinded.get());
    }

    @PostMapping("/remove/image")
    public ResponseEntity<?> removeImage(Authentication authentication) {
        Optional<User> userFinded = userRepository.findByEmail(authentication.getPrincipal().toString());
        if (userFinded.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        String uploadDir = userImageFolder + userFinded.get().getId();

        File file = new File(uploadDir, "profile_image.png");
        file.delete();
        userFinded.get().setProfileImage(null);

        return ResponseEntity.ok(userFinded.get());
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
        } else {
            try {
                if (!userOptional.get().getPassword().equals(SecurityUtils.sha256(passwordChangeModel.getOldPassword()))) {
                    errors.add("The old password was not valid!");
                }
            } catch (NoSuchAlgorithmException e) {
                return ResponseEntity.internalServerError().body(e);
            }
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
        try {
            user.setPassword(SecurityUtils.sha256(passwordChangeModel.getNewPassword()));
        } catch (NoSuchAlgorithmException e) {
            return ResponseEntity.internalServerError().body(e);
        }
        userRepository.save(user);

        try {
			return ResponseEntity.ok(SecurityUtils.sha256(passwordChangeModel.getNewPassword()));
		} catch (NoSuchAlgorithmException e) {
            return ResponseEntity.internalServerError().body(e);
		}
    }

}
