package dev.michaelcao512.socialmedia.Entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;


    @ManyToOne
    @JoinColumn(name = "accountId", nullable = false)
    @JsonBackReference (value = "account-comments")
    private Account account;


    @ManyToOne
    @JoinColumn(name = "postId", nullable = false)
    @JsonBackReference (value = "post-comments")
    private Post post;

    private String content;

    private LocalDateTime dateCreated = LocalDateTime.now();

}
