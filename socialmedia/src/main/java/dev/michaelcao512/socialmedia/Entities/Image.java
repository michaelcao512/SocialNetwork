package dev.michaelcao512.socialmedia.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    private String fileName;
    private String eTag;
    private String bucketKey;

    @ManyToOne
    @JoinColumn(name = "accountId")
    @JsonBackReference(value = "account-images")
    private Account account;

    @ManyToOne // (cascade = CascadeType.ALL)
    @JoinColumn(name = "postId")
    @JsonBackReference(value = "post-images")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "commentId")
    @JsonBackReference(value = "comment-images")
    private Comment comment;

    @Enumerated(EnumType.STRING)
    private ImageType imageType;

    public enum ImageType {
        PROFILE, POST, COMMENT
    }

}
