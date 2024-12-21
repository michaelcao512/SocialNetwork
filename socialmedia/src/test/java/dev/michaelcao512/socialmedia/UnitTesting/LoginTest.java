package dev.michaelcao512.socialmedia.UnitTesting;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Exceptions.InvalidCredentialsException;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Services.AccountService;
import dev.michaelcao512.socialmedia.Services.UserInfoService;

public class LoginTest {
    @Mock
    private AccountRepository accountRepository;

    @Mock
    private UserInfoService userInfoService;

    @InjectMocks
    private AccountService accountService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Tests the login of an account with the correct password.
     * 
     * This test verifies that when an account is provided with the correct
     * password, the method returns the account. It ensures that the account
     * returned is the same as the one provided.
     */
    @Test
    public void testLoginAccount_Success() {
        Account account = new Account();
        account.setEmail("test@example.com");
        account.setPassword("password");

        when(accountRepository.findByEmail(account.getEmail())).thenReturn(account);

        Account result = accountService.loginAccount(account);

        assertNotNull(result);
        assertEquals(account.getEmail(), result.getEmail());
        assertEquals(account.getPassword(), result.getPassword());
    }

    /**
     * Tests the login of an account with an incorrect email.
     * 
     * This test verifies that when an account is provided with an email
     * that does not exist in the repository, the method throws an
     * InvalidCredentialsException. It ensures that an exception is thrown
     * when the email is incorrect.
     */
    @Test
    public void testLoginAccount_Failure_EmailNotFound() {
        Account request = new Account();
        request.setEmail("test@example.com");
        request.setPassword("password");

        when(accountRepository.findByEmail(request.getEmail())).thenReturn(null);

        assertThrows(InvalidCredentialsException.class, () -> accountService.loginAccount(request));
    }

    /**
     * Tests the login of an account with a null email.
     * 
     * This test verifies that when an account is provided with a null email,
     * the method throws an IllegalArgumentException. It ensures that an
     * exception is thrown when the email is null.
     */
    @Test
    public void testLoginAccount_NullEmail() {
        Account account = new Account();
        account.setEmail(null);
        account.setPassword("password");

        assertThrows(IllegalArgumentException.class, () -> accountService.loginAccount(account));
    }

    /**
     * Tests the login of an account with a null password.
     * 
     * This test verifies that when an account is provided with a null password,
     * the method throws an IllegalArgumentException. It ensures that an
     * exception is thrown when the password is null.
     */
    @Test
    public void testLoginAccount_NullPassword() {
        Account account = new Account();
        account.setEmail("test@example.com");
        account.setPassword(null);

        assertThrows(IllegalArgumentException.class, () -> accountService.loginAccount(account));
    }

    /**
     * Tests the login of an account with an incorrect password.
     * 
     * This test verifies that when an account is provided with an incorrect
     * password, the method throws an InvalidCredentialsException. It ensures
     * that an exception is thrown when the password is incorrect.
     */
    @Test
    public void testLoginAccount_Failure_WrongPassword() {
        Account storedAccount = new Account();
        storedAccount.setEmail("test@example.com");
        storedAccount.setPassword("password");

        Account account = new Account();
        account.setEmail("test@example.com");
        account.setPassword("wrongPassword");

        when(accountRepository.findByEmail(account.getEmail())).thenReturn(storedAccount);

        assertThrows(InvalidCredentialsException.class, () -> accountService.loginAccount(account));
    }
}