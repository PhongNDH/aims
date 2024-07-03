package org.example.aims.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;

public abstract class PaymentDTO {
    @AllArgsConstructor
    @Builder
    public static class VNPayResponse {
        public String code;
        public String message;
        public String paymentUrl;
    }
}
