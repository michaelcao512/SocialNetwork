package dev.michaelcao512.socialmedia.UnitTesting;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Post;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Repositories.PostRepository;
import dev.michaelcao512.socialmedia.Services.PostService;
import dev.michaelcao512.socialmedia.dto.CreatePostRequest;

public class PostTest {

    @Mock
    private PostRepository postRepository;
    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private PostService postService;

    private Account account;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        account = new Account();
        account.setAccountId(1L);
        account.setUsername("testAccount");
        account.setEmail("testEmail");
        account.setPassword("testPassword");
    }

    @Test
    public void testCreatePost() {
        Post post = new Post();
        post.setPostId(1L);
        post.setContent("Test Post Content");

        CreatePostRequest createPostRequest = new CreatePostRequest(post, 1L);

        when(accountRepository.findById(1L)).thenReturn(Optional.of(account));

        when(postRepository.save(post)).thenReturn(post);

        // checking for illegal argument exception when post is null
        assertThrows(IllegalArgumentException.class, () -> postService.createPost(null));

        Post savedPost = postService.createPost(createPostRequest);

        assertNotNull(savedPost);
        assert (savedPost.getPostId() == 1L);
        assert (savedPost.getAccount().getAccountId() == 1L);
        assert (savedPost.getContent().equals("Test Post Content"));
        verify(postRepository).save(post);
    }

    @Test
    public void testUpdatePost() {
        Post post = new Post();
        post.setPostId(1L);
        post.setAccount(account);
        post.setContent("Original Content");

        Post updatedPost = new Post();
        updatedPost.setPostId(1L);
        updatedPost.setAccount(account);
        updatedPost.setContent("Updated Content");

        // checking for illegal argument exception when post is null
        assertThrows(IllegalArgumentException.class, () -> postService.updatePost(null), "Post cannot be null");

        when(postRepository.existsById(post.getPostId())).thenReturn(true);
        when(postRepository.findById(post.getPostId())).thenReturn(Optional.of(post));
        when(postRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
        Post returnedPost = postService.updatePost(updatedPost);

        assertNotNull(returnedPost);
        assert (returnedPost.getPostId() == 1L);
        assert (returnedPost.getContent().equals("Updated Content"));
        verify(postRepository).save(returnedPost);
    }

    @Test
    public void testDeletePost() {
        Post post = new Post();
        post.setPostId(1L);
        post.setAccount(account);
        post.setContent("Test Post Content");

        when(postRepository.existsById(post.getPostId())).thenReturn(true);
        postService.deletePost(post.getPostId());

        verify(postRepository).deleteById(post.getPostId());

        // throws exception when post does not exist
        assertThrows(IllegalArgumentException.class, () -> postService.deletePost(2L), "Post does not exist");

    }

    @Test
    public void testGetPostById() {
        Post post = new Post();
        post.setPostId(1L);
        post.setAccount(account);
        post.setContent("Test Post Content");

        when(postRepository.findById(post.getPostId())).thenReturn(Optional.of(post));
        Post retrievedPost = postService.getPostById(post.getPostId());

        assertNotNull(retrievedPost);
        assert (retrievedPost.getPostId() == 1L);
        assert (retrievedPost.getContent().equals("Test Post Content"));
        verify(postRepository).findById(post.getPostId());

        // throws exception when post does not exist
        assertThrows(IllegalArgumentException.class, () -> postService.getPostById(2L), "Post does not exist");
    }

    @Test
    public void testGetAllPosts() {
        postService.getAllPosts();
        verify(postRepository).findAll();
    }

    @Test
    public void testGetPostsByAccountId() {
        Post post = new Post();
        post.setPostId(1L);
        post.setAccount(account);
        post.setContent("Test Post Content");

        when(accountRepository.findById(account.getAccountId())).thenReturn(Optional.of(account));
        when(postRepository.findByAccount(account)).thenReturn(List.of(post));
        when(postRepository.existsByAccount(account)).thenReturn(true);
        List<Post> retrievedPosts = postService.getPostsByAccountId(account.getAccountId());

        assertNotNull(retrievedPosts);
        assert (retrievedPosts.get(0).getPostId() == 1L);
        assert (retrievedPosts.get(0).getContent().equals("Test Post Content"));
        verify(accountRepository).findById(account.getAccountId());
        verify(postRepository).findByAccount(account);
    }
}