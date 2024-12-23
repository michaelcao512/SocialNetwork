package dev.michaelcao512.socialmedia.UnitTesting;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Friendship;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Repositories.FriendshipRepository;
import dev.michaelcao512.socialmedia.Services.FriendshipService;
import dev.michaelcao512.socialmedia.dto.Requests.FriendshipRequest;

public class FriendshipTest {
    @Mock
    private FriendshipRepository friendshipRepository;
    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private FriendshipService friendshipService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddFriend_Success() {

        Account account = mock(Account.class);
        Account friend = mock(Account.class);

        when(friendshipRepository.existsByAccountAndFriend(account, friend)).thenReturn(false);
        when(friendshipRepository.save(any(Friendship.class))).thenAnswer(i -> i.getArguments()[0]);
        // when(account.getFollowing()).thenReturn(new ArrayList<>());
        // when(friend.getFollowers()).thenReturn(new ArrayList<>());

        FriendshipRequest friendshipRequest = new FriendshipRequest();
        friendshipRequest.setAccount(account);
        friendshipRequest.setFriend(friend);

        Friendship friendship = friendshipService.addFriend(friendshipRequest);

        assertNotNull(friendship);
        assertEquals(account, friendship.getAccount());
        assertEquals(friend, friendship.getFriend());

        verify(friendshipRepository, times(1)).save(friendship);
    }

    @Test
    public void testAddFriend_AlreadyExists() {
        Account account = mock(Account.class);
        Account friend = mock(Account.class);

        when(friendshipRepository.existsByAccountAndFriend(account, friend)).thenReturn(true);

        FriendshipRequest friendshipRequest = new FriendshipRequest();
        friendshipRequest.setAccount(account);
        friendshipRequest.setFriend(friend);

        assertThrows(IllegalArgumentException.class, () -> friendshipService.addFriend(friendshipRequest));

        verify(friendshipRepository, times(0)).save(any(Friendship.class));
    }

    @Test
    public void testAddFriend_NullAccount() {
        Account friend = mock(Account.class);

        FriendshipRequest friendshipRequest = new FriendshipRequest();
        friendshipRequest.setFriend(friend);

        assertThrows(IllegalArgumentException.class, () -> friendshipService.addFriend(friendshipRequest));

        verify(friendshipRepository, times(0)).save(any(Friendship.class));
    }

    @Test
    public void testAddFriend_NullFriend() {
        Account account = mock(Account.class);

        FriendshipRequest friendshipRequest = new FriendshipRequest();
        friendshipRequest.setAccount(account);

        assertThrows(IllegalArgumentException.class, () -> friendshipService.addFriend(friendshipRequest));

        verify(friendshipRepository, times(0)).save(any(Friendship.class));
    }

    @Test
    public void testAddFriend_Self() {
        Account account = mock(Account.class);

        FriendshipRequest friendshipRequest = new FriendshipRequest();
        friendshipRequest.setAccount(account);

        assertThrows(IllegalArgumentException.class, () -> friendshipService.addFriend(friendshipRequest));

        verify(friendshipRepository, times(0)).save(any(Friendship.class));
    }

    @Test
    public void testRemoveFriend_Success() {
        Account account = mock(Account.class);
        Account friend = mock(Account.class);

        Friendship friendship = new Friendship();
        friendship.setFriendshipId(1L);
        friendship.setAccount(account);
        friendship.setFriend(friend);

        when(friendshipRepository.findByAccountAndFriend(account, friend)).thenReturn(Optional.of(friendship));

        FriendshipRequest friendshipRequest = new FriendshipRequest();
        friendshipRequest.setAccount(account);
        friendshipRequest.setFriend(friend);

        friendshipService.removeFriend(friendshipRequest);

        verify(friendshipRepository, times(1)).delete(friendship);
    }

    @Test
    public void testRemoveFriend_NullAccount() {
        Account friend = mock(Account.class);

        when(friendshipRepository.findByAccountAndFriend(null, friend)).thenReturn(Optional.empty());

        FriendshipRequest friendshipRequest = new FriendshipRequest();
        friendshipRequest.setFriend(friend);

        assertThrows(IllegalArgumentException.class, () -> friendshipService.removeFriend(friendshipRequest));

        verify(friendshipRepository, times(0)).delete(any(Friendship.class));
    }

    @Test
    public void testRemoveFriend_NullFriend() {
        Account account = mock(Account.class);

        FriendshipRequest friendshipRequest = new FriendshipRequest();
        friendshipRequest.setAccount(account);

        when(friendshipRepository.findByAccountAndFriend(account, null)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> friendshipService.removeFriend(friendshipRequest));

        verify(friendshipRepository, times(0)).delete(any(Friendship.class));
    }

    @Test
    public void testRemoveFriend_FriendshipNotFound() {
        Account account = mock(Account.class);
        Account friend = mock(Account.class);

        FriendshipRequest friendshipRequest = new FriendshipRequest();
        friendshipRequest.setAccount(account);
        friendshipRequest.setFriend(friend);

        when(friendshipRepository.findByAccountAndFriend(account, friend)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> friendshipService.removeFriend(friendshipRequest));

        verify(friendshipRepository, times(0)).delete(any(Friendship.class));
    }

    @Test
    public void testGetAllFriends() {
        Account account = mock(Account.class);

        Friendship friendship1 = new Friendship();
        friendship1.setFriendshipId(1L);
        friendship1.setAccount(account);
        Friendship friendship2 = new Friendship();
        friendship2.setFriendshipId(2L);
        friendship2.setAccount(account);

        when(accountRepository.findById(account.getAccountId())).thenReturn(Optional.of(account));
        when(friendshipRepository.findAllByAccount(account)).thenReturn(List.of(friendship1, friendship2));

        List<Friendship> friends = friendshipService.getAllFriends(account.getAccountId());

        assertNotNull(friends);
        assertEquals(2, friends.size());
        assertEquals(friendship1, friends.get(0));
        assertEquals(friendship2, friends.get(1));
    }

}