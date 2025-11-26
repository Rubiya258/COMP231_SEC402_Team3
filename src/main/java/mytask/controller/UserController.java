package mytask.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import mytask.entity.User;
import mytask.repository.UserRepository;
import mytask.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins= "*")
public class UserController {

	 @Autowired
	    private UserService userService;
	 @Autowired
	    private UserRepository userRepository;
	    @PostMapping("/register")
	    public ResponseEntity<Map<String, String>> registerUser(@Valid @RequestBody User user) {
	        String msg = userService.registerUser(user);
	        if (msg.toLowerCase().contains("success")) {
	            return ResponseEntity.ok(Map.of("message", msg));
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", msg));
	        }
	    }
	    
	    @PutMapping("/update/{id}")
	    public User updateUser(@PathVariable int id, @RequestBody User u) {
	        User user = userRepository.findById(id).orElseThrow();
	        user.setUsername(u.getUsername());
	        user.setEmail(u.getEmail());
	        user.setPhone_number(u.getPhone_number());
	        return userRepository.save(user);
	    }

	    
	    @GetMapping("/{id}")
	    public User getUser(@PathVariable int id) {
	        return userRepository.findById(id).orElseThrow();
	    }

	    @DeleteMapping("/delete/{id}")
	    public ResponseEntity<String> deleteUser(@PathVariable int id) {
	        userRepository.deleteById(id);
	        return ResponseEntity.ok("User deleted");
	    }

	    @PostMapping("/login")
	    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User loginRequest) {
	        Optional<User> userOpt = userRepository.findByUsernameAndPassword(
	            loginRequest.getUsername(),
	            loginRequest.getPassword()
	        );

	        if (userOpt.isPresent()) {
	            User user = userOpt.get();
	            Map<String, Object> response = new HashMap<>();
	            response.put("userId", user.getUserId());
	            response.put("username", user.getUsername());
	            response.put("message", "Login successful");
	            return ResponseEntity.ok(response);
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                                 .body(Map.of("message", "Invalid credentials"));
	        }
	    }
	}
