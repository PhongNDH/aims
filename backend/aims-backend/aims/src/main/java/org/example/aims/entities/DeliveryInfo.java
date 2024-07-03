package org.example.aims.entities;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@Data
@NoArgsConstructor
@Builder
@Table(name = "delivery_info")
public class DeliveryInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    String phone;
    String address;
    String province;
    String instruction;
    int userId;


    public DeliveryInfo(String name, String phone, String address, String province, String instruction, int user_id) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.province = province;
        this.instruction = instruction;
        this.userId = user_id;
    }

    public DeliveryInfo(int id, String phone, String name, String address, String province, String instruction, int user_id) {
        this.id = id;
        this.phone = phone;
        this.name = name;
        this.address = address;
        this.province = province;
        this.instruction = instruction;
        this.userId = user_id;
    }
}
