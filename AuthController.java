package com.stepIn.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stepIn.demo.service.RegService;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private RegService userService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (userService.sendResetPasswordEmail(email)) {
            return ResponseEntity.ok("Password reset link sent to your email.");
        }
        return ResponseEntity.badRequest().body("User not found.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        if (userService.resetPassword(token, newPassword)) {
            return ResponseEntity.ok("Password reset successfully.");
        }
        return ResponseEntity.badRequest().body("Invalid or expired token.");
    }
}

