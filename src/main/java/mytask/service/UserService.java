package mytask.service;
import mytask.repository.*;
import mytask.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already registered!";
        }
        if (userRepository.existsByUsername(user.getUsername())) {
            return "Username already taken!";
        }
        userRepository.save(user);
        return "User registered successfully!";
    }

    public String loginUser(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(password)) {
                return "Login successful!";
            } else {
                return "Invalid password!";
            }
        } else {
            return "User not found!";
        }
    }
    
    
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}