package dev.michaelcao512.socialmedia.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Post;
import dev.michaelcao512.socialmedia.Entities.Reaction;
import dev.michaelcao512.socialmedia.Entities.Reaction.ReactionType;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Repositories.PostRepository;
import dev.michaelcao512.socialmedia.Repositories.ReactionRepository;
import dev.michaelcao512.socialmedia.dto.Requests.CreateReactionRequest;

@Service
public class ReactionService {
    private final ReactionRepository reactionRepository;
    private final PostRepository postRepository;
    private final AccountRepository accountRepository;
    private final AccountService accountService;
    private final PostService postService;

    public ReactionService(ReactionRepository reactionRepository, PostRepository postRepository,
            AccountRepository accountRepository, AccountService accountService, PostService postService) {
        this.reactionRepository = reactionRepository;
        this.postRepository = postRepository;
        this.accountRepository = accountRepository;
        this.accountService = accountService;
        this.postService = postService;
    }

    // creates a new reaction or updates an existing one
    public Reaction createReaction(CreateReactionRequest createReactionRequest) {
        ReactionType reactionType = createReactionRequest.reactionType();
        Account account = accountRepository.findById(createReactionRequest.accountId()).orElse(null);
        Post post = postRepository.findById(createReactionRequest.postId()).orElse(null);
        if (reactionType == null || account == null || post == null) {
            throw new IllegalArgumentException("Request body contents cannot be null");
        }

        // in case users already liked a post
        Reaction existingReaction = reactionRepository.getUserReactionByPostId(post.getPostId(),
                account.getAccountId());
        if (existingReaction != null) {

            // DELETE REACTION if the reaction type is the same
            if (existingReaction.getReactionType() == reactionType) {
                deleteReaction(existingReaction.getReactionId());
                return null;
            }
            // UPDATE REACTION if the reaction type is different
            existingReaction.setReactionType(reactionType);
            // postService.updateReaction(post, existingReaction, reactionType);
            return reactionRepository.save(existingReaction);
        }
        Reaction reaction = new Reaction();
        reaction.setPost(post);
        reaction.setReactionType(reactionType);
        reaction.setAccount(account);

        Reaction r = reactionRepository.save(reaction);

        // postService.addReaction(post, r);

        return r;
    }

    public void deleteReaction(Long reactionId) {
        Optional<Reaction> reaction = reactionRepository.findById(reactionId);
        if (reaction.isEmpty()) {
            throw new IllegalArgumentException("Reaction does not exist");
        }
        Post post = reaction.get().getPost();

        // postService.removeReaction(post, reaction.get());
        reactionRepository.deleteById(reactionId);
    }

    public List<Reaction> getReactionsByPostId(long postId) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isEmpty()) {
            throw new IllegalArgumentException("Post does not exist");
        }
        if (!reactionRepository.existsByPost(post.get())) {
            return List.of();
        }
        return reactionRepository.findByPost(post.get());

    }

    public Reaction getReactionById(long l) {
        Optional<Reaction> reaction = reactionRepository.findById(l);
        if (reaction.isEmpty()) {
            throw new IllegalArgumentException("Reaction does not exist");
        }
        return reaction.get();
    }

    public int getLikeCount(long postId) {
        return reactionRepository.getLikeCount(postId);
    }

    public int getDislikeCount(long postId) {
        return reactionRepository.getDislikeCount(postId);
    }

    public Reaction getUserReactionByPostId(long postId, long accountId) {
        return reactionRepository.getUserReactionByPostId(postId, accountId);
    }
}
