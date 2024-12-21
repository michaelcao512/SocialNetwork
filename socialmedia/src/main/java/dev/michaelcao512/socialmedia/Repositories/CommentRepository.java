package dev.michaelcao512.socialmedia.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.michaelcao512.socialmedia.Entities.Comment;
import dev.michaelcao512.socialmedia.Entities.Post;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    boolean existsByPost(Post post);

    List<Comment> findByPost(Post post);

}
