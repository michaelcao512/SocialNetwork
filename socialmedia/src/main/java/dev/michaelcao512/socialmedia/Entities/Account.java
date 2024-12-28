package dev.michaelcao512.socialmedia.Entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PreUpdate;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
public class Account implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;

    @Column(updatable = false)
    private LocalDateTime dateCreated = LocalDateTime.now();
    private LocalDateTime dateUpdated = LocalDateTime.now();

  
    @Column()
     private Collection<? extends GrantedAuthority> authorities = List.of(); // Initialize with an empty list


  /*
    @Column()
    private Collection<? extends GrantedAuthority> authorities;
*/
    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "userinfo")
    private UserInfo userInfo;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval =
    true)
    @JsonManagedReference(value = "following")
    private List<Friendship> following;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval =
    true)
    @JsonManagedReference(value = "followers")
    private List<Friendship> followers;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference (value = "account-posts")
    private List<Post> posts;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference (value = "account-comments")
    private List<Comment> comments;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference (value = "account-reactions")
    private List<Reaction> reactions;

    @PreUpdate
    public void onUpdate() {
        this.dateUpdated = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Account [accountId=" + accountId + ", username=" + username + ", email=" + email + ", dateCreated="
                + dateCreated + ", dateUpdated=" + dateUpdated + ", authorities="
                + authorities
        // + ", following=" + following + ", followers=" + followers
        // + ", posts=" + posts + "]"
        ;
    }

    /*
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }
    
    // ===== Implementing UserDetails Methods =====
    */
    
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
