package com.michel.gerfinweb.auth;

import com.michel.gerfinweb.entity.User;
import com.michel.gerfinweb.repository.UserRepository;
import com.michel.gerfinweb.utils.SecurityUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Optional;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String name = authentication.getName();
        String password = authentication.getCredentials().toString();
        String returnValue = validateUserPassword(name, password);
        if (returnValue != null) {
            return new UsernamePasswordAuthenticationToken(name, returnValue, new ArrayList<>());
        } else {
            return null;
        }
    }

    private String validateUserPassword(String username, String password) {
        Optional<User> responseUser = userRepository.findByEmail(username);
        if (responseUser.isEmpty()) {
            return null;
        }
        try {
			if (!responseUser.get().getPassword().equals(SecurityUtils.sha256(password))) {
			    return null;
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		}
        return password;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}