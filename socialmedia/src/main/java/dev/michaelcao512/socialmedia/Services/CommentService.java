package dev.michaelcao512.socialmedia.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import dev.michaelcao512.socialmedia.Entities.Comment;
import dev.michaelcao512.socialmedia.Entities.Post;
import dev.michaelcao512.socialmedia.Repositories.CommentRepository;
import dev.michaelcao512.socialmedia.Repositories.PostRepository;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    public Comment createComment(Comment comment) {
        if (comment == null || comment.getAccount() == null || comment.getPost() == null) {
            throw new IllegalArgumentException("Comment cannot be null");
        }

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment updates) {
        if (updates == null) {
            throw new IllegalArgumentException("Comment cannot be null");
        }
        if (!commentRepository.existsById(updates.getCommentId())) {
            throw new IllegalArgumentException("Comment does not exist");
        }

        Comment existingComment = commentRepository.findById(updates.getCommentId()).get();
        existingComment.setContent(updates.getContent());

        return commentRepository.save(existingComment);

    }

    public void deleteComment(Long commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new IllegalArgumentException("Comment does not exist");
        }

        commentRepository.deleteById(commentId);
    }

    public Comment getCommentById(Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isEmpty()) {
            throw new IllegalArgumentException("Comment does not exist");
        }
        return comment.get();
    }

    public List<Comment> getCommentsByPostId(long postId) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isEmpty()) {
            throw new IllegalArgumentException("Post does not exist");
        }
        if (!commentRepository.existsByPost(post.get())) {
            return List.of();
        }
        return commentRepository.findByPost(post.get());

    }
}
