package dev.michaelcao512.socialmedia.dto;

import dev.michaelcao512.socialmedia.Entities.Post;

public record CreatePostRequest(Post post, Long accountId) {

}