package com.expense.app.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.expense.app.entity.LoginRequest;
//import com.expense.app.entity.LoginResponse;
import com.expense.app.entity.User;
import com.expense.app.exception.UserAlreadyExistsException;
import com.expense.app.exception.UserNotFoundException;
import com.expense.app.loginimp.JwtUtil;
import com.expense.app.loginimp.UserDetailsServiceImpl;
import com.expense.app.repo.UserRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class UserService 
{
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	public User registernewuser(User u) throws UserAlreadyExistsException 
	{
			User user  = this.userRepository.getUserByEmail(u.getEmail());
	
			if(user!=null)
			{
				throw new UserAlreadyExistsException("User Already Exists With given Email");
			}
		return u;
	}
	
	public String LoginUser(LoginRequest loginRequest) throws Exception
	{
		authenticate(loginRequest.getEmail(), loginRequest.getPassword());
		UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(loginRequest.getEmail());
		return jwtUtil.generateToken(userDetails);
		
		
	}
	private void authenticate(String username,String password) throws Exception
	{
		try
		{
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (Exception e) 
		{
			System.out.println("Exception occured "+e.getMessage());
		}
	}
	
	public User getUserInfo(String email) throws Exception
	{
		User user = this.userRepository.getUserByEmail(email);
		if(user==null) {
			throw new  UserNotFoundException("User Email Id is not present in Database");
		}
		
		return user;
	}


}
