package dev.michaelcao512.socialmedia.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Post;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Repositories.PostRepository;
import dev.michaelcao512.socialmedia.dto.CreatePostRequest;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final AccountRepository accountRepository;
    private final AccountService accountService;

    public PostService(PostRepository postRepository, AccountRepository accountRepository,
            AccountService accountService) {
        this.postRepository = postRepository;
        this.accountRepository = accountRepository;
        this.accountService = accountService;
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

        accountService.addPost(account, p);

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
        accountService.removePost(post.get().getAccount(), post.get());
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
}
