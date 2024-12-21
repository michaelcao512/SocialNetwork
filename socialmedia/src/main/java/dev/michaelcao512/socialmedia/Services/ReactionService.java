package dev.michaelcao512.socialmedia.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import dev.michaelcao512.socialmedia.Entities.Post;
import dev.michaelcao512.socialmedia.Entities.Reaction;
import dev.michaelcao512.socialmedia.Repositories.PostRepository;
import dev.michaelcao512.socialmedia.Repositories.ReactionRepository;

@Service
public class ReactionService {
    private final ReactionRepository reactionRepository;
    private final PostRepository postRepository;

    public ReactionService(ReactionRepository reactionRepository, PostRepository postRepository) {
        this.reactionRepository = reactionRepository;
        this.postRepository = postRepository;
    }

    public Reaction createReaction(Reaction reaction) {
        if (reaction == null || reaction.getAccount() == null || reaction.getPost() == null) {
            throw new IllegalArgumentException("Reaction cannot be null");
        }
        return reactionRepository.save(reaction);
    }

    public Reaction updateReaction(Reaction updatedReaction) {
        if (updatedReaction == null) {
            throw new IllegalArgumentException("Reaction cannot be null");
        }
        if (!reactionRepository.existsById(updatedReaction.getReactionId())) {
            throw new IllegalArgumentException("Reaction does not exist");
        }
        Reaction existingReaction = reactionRepository.findById(updatedReaction.getReactionId()).get();
        existingReaction.setReactionType(updatedReaction.getReactionType());

        return reactionRepository.save(existingReaction);
    }

    public void deleteReaction(Long reactionId) {
        if (!reactionRepository.existsById(reactionId)) {
            throw new IllegalArgumentException("Reaction does not exist");
        }
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
}
