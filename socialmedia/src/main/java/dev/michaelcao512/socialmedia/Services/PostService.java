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
import dev.michaelcao512.socialmedia.dto.Requests.CreatePostRequest;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final AccountRepository accountRepository;

    public PostService(PostRepository postRepository, AccountRepository accountRepository) {
        this.postRepository = postRepository;
        this.accountRepository = accountRepository;
    }

    public Post createPost(CreatePostRequest createPostRequest) {
        Post post = createPostRequest.post();
        Long accountId = createPostRequest.accountId();
        if (post == null) {
            throw new IllegalArgumentException("Post cannot be null");
        }
        Account account = accountRepository.findById(accountId).get();

        post.setAccount(account);

        Post p = postRepository.save(post);

        // accountService.addPost(account, p);

        return p;
    }

    public Post updatePost(Post post) {
        if (post == null) {
            throw new IllegalArgumentException("Post cannot be null");
        }
        if (!postRepository.existsById(post.getPostId())) {
            throw new IllegalArgumentException("Post does not exist");
        }
        Post existingPost = postRepository.findById(post.getPostId()).get();
        existingPost.setContent(post.getContent());

        return postRepository.save(existingPost);
    }

    public void deletePost(Long postId) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isEmpty()) {
            throw new IllegalArgumentException("Post does not exist");
        }
        // accountService.removePost(post.get().getAccount(), post.get());

        postRepository.delete(post.get());
    }

    public Post getPostById(Long postId) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isEmpty()) {
            throw new IllegalArgumentException("Post does not exist");
        }
        return post.get();
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getPostsByAccountId(Long accountId) {
        Optional<Account> account = accountRepository.findById(accountId);
        if (account.isEmpty()) {
            throw new IllegalArgumentException("Account cannot be null");
        }
        if (!postRepository.existsByAccount(account.get())) {
            return List.of();
        }

        return postRepository.findByAccount(account.get());

    }

    // public Post addReaction(Post post, Reaction reaction) {
    // List<Reaction> reactions = post.getReactions();
    // reactions.add(reaction);
    // post.setReactions(reactions);
    // return postRepository.save(post);
    // }

    public Post updateReaction(Post post, Reaction reaction, ReactionType updatedReactionType) {
        reaction.setReactionType(updatedReactionType);
        return postRepository.save(post);
    }

    public List<Post> getAllPostsBesidesOwn(Long accountId) {
        List<Post> posts = postRepository.findAllPostsBesidesOwn(accountId);
        return posts;
    }

    public List<Post> searchPosts(String query) {
        List<Post> results = postRepository.searchPosts(query);
        return results;
    }

    // public void removeReaction(Post post, Reaction reaction) {
    // List<Reaction> reactions = post.getReactions();
    // reactions.remove(reaction);
    // post.setReactions(reactions);
    // postRepository.save(post);
    // }

    // public Post addComment(Post post, Comment comment) {
    // List<Comment> comments = post.getComments();
    // comments.add(comment);
    // post.setComments(comments);
    // return postRepository.save(post);
    // }

    // public void removeComment(Post post, Comment comment) {
    // List<Comment> comments = post.getComments();
    // comments.remove(comment);
    // post.setComments(comments);
    // postRepository.save(post);
    // }

}
