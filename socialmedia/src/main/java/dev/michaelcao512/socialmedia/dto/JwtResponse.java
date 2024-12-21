package dev.michaelcao512.socialmedia.dto;

public record JwtResponse(String accessToken, Long id, String username, String email) {
}