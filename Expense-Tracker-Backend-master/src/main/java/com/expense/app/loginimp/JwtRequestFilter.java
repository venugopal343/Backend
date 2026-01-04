package com.expense.app.loginimp;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class JwtRequestFilter extends OncePerRequestFilter
{
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException 
	{
		String authorizationHeader = request.getHeader("Authorization");

		String jwttoken =null;
		String username =null;
		if(authorizationHeader !=null && authorizationHeader.startsWith("Bearer "))
		{
			jwttoken = authorizationHeader.substring(7);
			try {
				username = jwtUtil.extractUsername(jwttoken);
				
			} catch (Exception e) {
			System.out.println("Exception occured "+e.getMessage());
			}
		}
		if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null)
		{
			UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);
			if(jwtUtil.validateToken(jwttoken, userDetails))
			{				
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
					usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
		}
		
		
		
		}
		filterChain.doFilter(request, response);
		
	

}
}
