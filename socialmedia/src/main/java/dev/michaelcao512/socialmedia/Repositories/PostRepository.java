package dev.michaelcao512.socialmedia.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByAccount(Account account);

    boolean existsByAccount(Account account);

}
