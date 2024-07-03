package org.example.aims.entities;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String username;
    String email;
    String role;
    String password;

    public User(String email, String username, String role, String password) {
        this.email = email;
        this.username = username;
        this.role = role;
        this.password = password;
    }

}
