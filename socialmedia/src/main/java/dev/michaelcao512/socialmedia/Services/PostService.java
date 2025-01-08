package dev.michaelcao512.socialmedia.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import dev.michaelcao512.socialmedia.Entities.Account;
import dev.michaelcao512.socialmedia.Entities.Image;
import dev.michaelcao512.socialmedia.Entities.Post;
import dev.michaelcao512.socialmedia.Entities.Reaction;
import dev.michaelcao512.socialmedia.Entities.Reaction.ReactionType;
import dev.michaelcao512.socialmedia.Repositories.AccountRepository;
import dev.michaelcao512.socialmedia.Repositories.ImageRepository;
import dev.michaelcao512.socialmedia.Repositories.PostRepository;
import dev.michaelcao512.socialmedia.dto.Requests.CreatePostRequest;
import jakarta.transaction.Transactional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final AccountRepository accountRepository;
    private final ImageRepository imageRepository;
    private final ImageService imageService;
    private final AccountService accountService;

    private Logger logger = LoggerFactory.getLogger(PostService.class);

    public PostService(PostRepository postRepository, AccountRepository accountRepository,
            ImageRepository imageRepository, ImageService imageService, AccountService accountService) {
        this.postRepository = postRepository;
        this.accountRepository = accountRepository;
        this.imageRepository = imageRepository;
        this.imageService = imageService;
        this.accountService = accountService;
    }

    @Transactional
    public Post createPost(CreatePostRequest createPostRequest) {
        if (createPostRequest == null || createPostRequest.accountId() == null || createPostRequest.content() == null) {
            throw new IllegalArgumentException("CreatePostRequest cannot be null");
        }

        Long accountId = createPostRequest.accountId();
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found with id: " + accountId));

        Post post = new Post();
        post.setContent(createPostRequest.content());
        post.setAccount(account);

        // Save the post first
        Post savedPost = postRepository.save(post);

        List<Long> imageIds = createPostRequest.imageIds();
        List<Image> images = new ArrayList<>();
        if (imageIds != null) {
            for (Long imageId : imageIds) {
                Image image = imageRepository.findById(imageId)
                        .orElseThrow(() -> new IllegalArgumentException("Image not found with id: " + imageId));
                image.setPost(savedPost); // Set the post reference
                Image savedImage = imageRepository.save(image);
                images.add(savedImage);
            }
        }
        // Update the post with the list of images
        savedPost.setImages(images);
        return postRepository.save(savedPost);

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

    @Transactional
    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + postId));

        // delete all images associated with the post from s3
        List<Image> images = post.getImages();
        if (images != null) {
            for (Image image : images) {
                imageService.deleteImageFromS3(image);
                // imageRepository.delete(image);
                // imageService.deleteImage(image.getImageId());
            }
            post.getImages().clear();
        }

        postRepository.delete(post);
    }

    public Post getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + postId));
        return post;
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

    public List<Post> getPostsFromFollowedAccounts(Long accountId){
        List<Account> followingAccounts = accountService.getFollowing(accountId);

        List<Long> followingIds = followingAccounts.stream()
                .map(Account::getAccountId)
                .toList();
        
        return postRepository.findPostsByFollowingAccounts(followingIds);
    }
}