package mytask.controller;
import mytask.service.*;
import mytask.repository.*;
import mytask.entity.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Register endpoint
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }
    
    
    
    
    
 // Login endpoint stores user in session
    @PostMapping("/login")
    public String loginUser(@RequestBody User loginRequest, HttpSession session) {
        String result = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());

        if (result.equals("Login successful!")) {
            // Fetch full user object and store in session
            User user = userService.getUserByUsername(loginRequest.getUsername());
            session.setAttribute("loggedInUser", user);
        }

        return result;
    }
}
