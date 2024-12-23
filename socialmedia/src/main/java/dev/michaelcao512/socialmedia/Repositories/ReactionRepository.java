package dev.michaelcao512.socialmedia.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Post;
import dev.michaelcao512.socialmedia.Entities.Reaction;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    List<Reaction> findByPost(Post post);

    boolean existsByPost(Post post);

    @Query("SELECT COUNT(r) FROM Reaction r WHERE r.post.postId = ?1 AND r.reactionType = 'LIKE'")
    int getLikeCount(long postId);

    @Query("SELECT COUNT(r) FROM Reaction r WHERE r.post.postId = ?1 AND r.reactionType = 'DISLIKE'")
    int getDislikeCount(long postId);

    @Query("SELECT r FROM Reaction r JOIN r.post p JOIN p.account a WHERE p.postId = ?1 AND a.accountId = ?2")
    Reaction getUserReactionByPostId(long postId, long accountId);

}
