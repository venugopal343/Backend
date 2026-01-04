package com.expense.app.controller;

import com.expense.app.entity.LoginRequest;
import com.expense.app.entity.LoginResponse;
import com.expense.app.entity.Otprequest;
import com.expense.app.entity.User;
import com.expense.app.repo.UserRepository;
import com.expense.app.service.Otpgenerator;
import com.expense.app.service.UserService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exp")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private Otpgenerator otpgenerator;
    
    @Autowired
    private UserRepository userRepository;

    public UserController() {
        System.out.println("✅ Controller is initialized");
    }
    

    // ✅ Register Endpoint
    @PostMapping("/reg")
    public ResponseEntity<String> registerUser(@RequestBody User user) throws Exception {
        if (user == null) {
            System.out.println("❌ User object is null");
            return ResponseEntity.badRequest().body("Invalid request");
        }

        System.out.println("🚀 /exp/register CALLED");
        System.out.println("📧 Email received: " + user.getEmail());
        System.out.println("👤 Full User object: " + user.toString());

        User newUser = this.userService.registernewuser(user);
        this.otpgenerator.registertempuser(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully. OTP sent.");
    }

    // ✅ Send OTP
    @PostMapping("/otp")
    public ResponseEntity<String> generateOtp(@RequestBody Otprequest otprequest) {
    	System.out.println("Otp method is called");
        String otp = this.otpgenerator.sendotp(otprequest.getEmail());
        System.out.println("📤 OTP sent to: " + otprequest.getEmail() + " → OTP: " + otp);
        return ResponseEntity.ok("OTP sent to email.");
    }

    // ✅ Validate OTP
    @PostMapping("/otp/validate")
    public ResponseEntity<String> validateOtp(
            @RequestBody Otprequest otprequest,
            @RequestParam(value = "otp") String otp) {
    			System.out.println("it is called ");
        boolean isValid = this.otpgenerator.validate(otprequest, otp);
        if (isValid == true) {
            return ResponseEntity.status(HttpStatus.OK).body("Valid Otp");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP.");
        }
    }

    // ✅ Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> userLogin(@RequestBody LoginRequest loginRequest) throws Exception {
    	 LoginResponse loginResponse = new LoginResponse();
		    	 User user  = this.userRepository.getUserByEmail(loginRequest.getEmail());
		        String token = this.userService.LoginUser(loginRequest);
		        System.out.println("🔐 Login successful for " + loginRequest.getEmail());
        loginResponse.setEmail(user.getEmail());
        loginResponse.setRole(user.getRole());
        loginResponse.setToken(token);
        return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
    }
}
