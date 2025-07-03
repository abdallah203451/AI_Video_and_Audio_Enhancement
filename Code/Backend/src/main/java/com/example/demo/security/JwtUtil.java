package com.example.demo.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private static final String SECRET_KEY = "your_secret_key_your_secret_key_123456"; // Must be at least 32 bytes!
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    private final Key key;

    public JwtUtil() {
        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes()); // No need for Base64 encoding
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("Token expired!");
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT!");
        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT format!");
        } catch (SignatureException e) {
            System.out.println("Invalid JWT signature!");
        } catch (IllegalArgumentException e) {
            System.out.println("Token is null or empty!");
        }
        return false;
    }
}
