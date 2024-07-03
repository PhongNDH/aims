package org.example.aims.security;

import lombok.Getter;
import org.example.aims.entities.User;
import org.example.aims.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.management.relation.Role;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), mapRoleToGrantedAuthority(user.getRole(), user.getEmail(), user.getId()));

    }

    private Collection<GrantedAuthority> mapRoleToGrantedAuthority(String role, String email, int id) {
        return role == null
                ? Collections.emptyList()
                : Collections.singletonList(new CustomGrantedAuthority(role, email, id));
    }

    @Getter
    private static class CustomGrantedAuthority implements GrantedAuthority {

        private final String role;
        private final String email;

        private final int id;

        public CustomGrantedAuthority(String role, String email, int id) {
            this.role = role;
            this.email = email;
            this.id = id;
        }

        @Override
        public String getAuthority() {
            return role + "|" + email + "|" + id;
        }

    }

}
