package dev.michaelcao512.socialmedia.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userInfoId;

    @OneToOne
    @JoinColumn(name = "accountId", nullable = false)
    @JsonBackReference(value = "userinfo")
    private Account account;

    private String firstName;
    private String lastName;
    private String biography;
    private String gender;
    @Column(columnDefinition = "TEXT", nullable = true)
    private String avatarUrl;

}
