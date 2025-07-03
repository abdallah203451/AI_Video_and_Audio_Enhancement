package com.example.demo.controller;

import com.example.demo.dto.PaymentRequest;
import com.example.demo.service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*") // ✅ Allow CORS for frontend
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-session")
    public Map<String, String> createCheckoutSession(@RequestBody PaymentRequest request) { // ✅ Use @RequestBody
        Map<String, String> response = new HashMap<>();
        try {
            String sessionUrl = paymentService.createCheckoutSession(request.getAmount(), request.getCurrency());
            response.put("url", sessionUrl);
        } catch (StripeException e) {
            response.put("error", e.getMessage());
        }
        return response;
    }
}
