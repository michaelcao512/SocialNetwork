package dev.michaelcao512.socialmedia.dto;

import dev.michaelcao512.socialmedia.Entities.Account;

public class FriendshipRequest {

    private Account account;
    private Account friend;
    public Account getAccount() {
        return account;
    }
    public void setAccount(Account account) {
        this.account = account;
    }
    public Account getFriend() {
        return friend;
    }
    public void setFriend(Account friend) {
        this.friend = friend;
    }
    
}