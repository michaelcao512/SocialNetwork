package dev.michaelcao512.socialmedia.Entities;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    
    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "comment-reactions")
    private List<Reaction> reactions;

    private String content;

    private LocalDateTime dateCreated = LocalDateTime.now();

}
