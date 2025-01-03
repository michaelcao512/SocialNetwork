package dev.michaelcao512.socialmedia.Controllers;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.michaelcao512.socialmedia.Configurations.Security.JwtUtils;
import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Services.AccountService;
import dev.michaelcao512.socialmedia.dto.Requests.LoginRequest;
import dev.michaelcao512.socialmedia.dto.Requests.RegistrationRequest;
import dev.michaelcao512.socialmedia.dto.Responses.JwtResponse;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    AccountService accountService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<Account> register(@RequestBody RegistrationRequest registrationRequest) {
        Logger logger = org.slf4j.LoggerFactory.getLogger(AuthController.class);
        logger.info("Registering account: " + registrationRequest);
        Account account = accountService.registerAccount(registrationRequest);
        return ResponseEntity.ok(account);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.genereateJwtToken(authentication);

        Account account = (Account) authentication.getPrincipal();

        return ResponseEntity.ok(
                new JwtResponse(jwt, account.getAccountId(), account.getUsername(), account.getEmail()));
    }

}