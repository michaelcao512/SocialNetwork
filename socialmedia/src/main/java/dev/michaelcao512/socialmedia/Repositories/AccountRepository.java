package dev.michaelcao512.socialmedia.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Post;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByUsername(String username);

    Account findByEmail(String email);

    Account findByUsernameOrEmail(String username, String email);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    Optional<Account> findByCommentsCommentId(Long commentId);

    @Query("SELECT a FROM Account a JOIN a.posts p WHERE p.postId = ?1")
    Optional<Account> findAccountOfPost(Long postId);


}
