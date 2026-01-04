package com.expense.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expense.app.entity.User;
import com.expense.app.service.UserService;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class ProfileController
{
	
	@Autowired
	public UserService userService;
	
	
	@GetMapping("/profile/{email}")
	public ResponseEntity<User> getUserInfo(@PathVariable("email") String email) throws Exception
	{
		System.out.println("Invokde profile controller");
		User user = this.userService.getUserInfo(email);
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}

}
