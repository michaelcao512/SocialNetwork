package dev.michaelcao512.socialmedia.dto.Requests;

public record CreateCommentRequest(Long postId, Long accountId, String content) {
}