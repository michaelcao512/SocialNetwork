package dev.michaelcao512.socialmedia.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Friendship;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Repositories.FriendshipRepository;
import dev.michaelcao512.socialmedia.dto.Requests.FriendshipRequest;

@Service
public class FriendshipService {
    private final FriendshipRepository friendshipRepository;
    private final AccountRepository accountRepository;

    public FriendshipService(FriendshipRepository friendshipRepository, AccountRepository accountRepository) {
        this.friendshipRepository = friendshipRepository;
        this.accountRepository = accountRepository;
    }

    public Friendship addFriend(FriendshipRequest friendshipRequest) {
        Account account = friendshipRequest.getAccount();
        Account friend = friendshipRequest.getFriend();
        if (account == null || friend == null) {
            throw new IllegalArgumentException("Account and friend cannot be null");
        }
        if (friendshipRepository.existsByAccountAndFriend(account, friend)) {
            throw new IllegalArgumentException("Friendship already exists");
        }
        if (account.equals(friend)) {
            throw new IllegalArgumentException("Cannot be friends with yourself");
        }
        Friendship friendship = new Friendship();
        friendship.setAccount(account);
        friendship.setFriend(friend);

        // updates account's following list
        // List<Friendship> accountFollowing = account.getFollowing();
        // accountFollowing.add(friendship);
        // account.setFollowing(accountFollowing);
        // updates friend's follower list
        // List<Friendship> friendFollowers = friend.getFollowers();
        // friendFollowers.add(friendship);
        // friend.setFollowers(friendFollowers);
        // accountRepository.save(account);
        // accountRepository.save(friend);

        return friendshipRepository.save(friendship);
    }

    public void removeFriend(FriendshipRequest friendshipRequest) {
        Account account = friendshipRequest.getAccount();
        Account friend = friendshipRequest.getFriend();
        if (account == null || friend == null) {
            throw new IllegalArgumentException("Account and friend cannot be null");
        }
        Optional<Friendship> friendship = friendshipRepository.findByAccountAndFriend(account, friend);
        if (friendship.isEmpty()) {
            throw new IllegalArgumentException("Friendship does not exist");
        }

        // // updates account's following list
        // List<Friendship> accountFollowing = account.getFollowing();
        // accountFollowing.remove(friendship.get());
        // account.setFollowing(accountFollowing);
        // // updates friend's follower list
        // List<Friendship> friendFollowers = friend.getFollowers();
        // friendFollowers.remove(friendship.get());
        // friend.setFollowers(friendFollowers);
        // accountRepository.save(account);
        // accountRepository.save(friend);

        friendshipRepository.delete(friendship.get());
    }

    public List<Friendship> getAllFriends(Long accountId) {
        Account account = accountRepository.findById(accountId).orElse(null);
        if (account == null) {
            throw new IllegalArgumentException("Account cannot be null");
        }
        return friendshipRepository.findAllByAccount(account);
    }
}
