package com.expense.app.entity;

public class LoginResponse
{
	private String email;
	private String role;
	private String token;
	public LoginResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public LoginResponse(String email, String role, String token) {
		super();
		this.email = email;
		this.role = role;
		this.token = token;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	@Override
	public String toString() {
		return "LoginResponse [email=" + email + ", role=" + role + ", token=" + token + "]";
	}
	

}
