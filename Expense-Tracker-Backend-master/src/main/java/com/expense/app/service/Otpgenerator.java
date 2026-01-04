package com.expense.app.service;

import java.util.LinkedHashMap;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.expense.app.entity.Otprequest;
import com.expense.app.entity.User;
import com.expense.app.repo.UserRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class Otpgenerator 
{
//	@Autowired
//	private JavaMailSender javaMailSender;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	private LinkedHashMap<String, String> map= new LinkedHashMap<>();
	private LinkedHashMap<String, User> usermap = new LinkedHashMap<>();
	
	public void registertempuser(User user)
	{
		String email = user.getEmail();
		usermap.put(email,user);
		
	}
	
	public String  sendotp(String email) 
	{
	
		StringBuffer stringBuffer = new StringBuffer();
		for(int i=0;i<6;i++)
		{
			int nu = new Random().nextInt(10);
			stringBuffer.append(nu);
		}
		String otpString = stringBuffer.toString();
		System.out.println("Request for otp is sent and generated otp");
		System.out.println("otp is "+otpString);
		
		// After generating otp add it into Map for Validation purpose;
		
			map.put(email, otpString);
		
		
//		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
//		simpleMailMessage.setTo(email);
//		simpleMailMessage.setSubject("Expense Tracker App Registration");
//		simpleMailMessage.setText("Your otp is "+""+otpString);
//		this.javaMailSender.send(simpleMailMessage);
		return otpString;
	}

	public boolean validate(Otprequest otprequest, String otp)
	{
		String email = otprequest.getEmail();
		if(map.containsKey(email))
		{
		String storedotp = map.get(email);
			if(storedotp.equals(otp))
			{
				User permanentUser = usermap.get(email);
				permanentUser.setPassword(bCryptPasswordEncoder.encode(permanentUser.getPassword()));
				if("udaychandchoulla@gmail.com".equals(permanentUser.getEmail()))
				{
					permanentUser.setRole("ROLE_ADMIN");
				}
				else {
					permanentUser.setRole("ROLE_USER");
				}
			System.out.println("ROle is "+permanentUser.getRole());
			User U=	this.userRepository.save(permanentUser);
			usermap.remove(email);
			map.remove(email);
			System.out.println("Store user is "+U.toString());
				return true;
			}
		}
		return  false;
	}

	

	
	
}
