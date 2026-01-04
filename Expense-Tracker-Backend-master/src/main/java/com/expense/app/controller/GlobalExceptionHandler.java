package com.expense.app.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.expense.app.exception.UserAlreadyExistsException;
import com.expense.app.exception.UserNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler 
{
	@ExceptionHandler(UserAlreadyExistsException.class)
	public ResponseEntity<?> userAlreadyExistsException(UserAlreadyExistsException ex)
	{
		return ResponseEntity.badRequest().body(ex.getMessage());
	}
	
	@ExceptionHandler
	public ResponseEntity<?> userNotFoundException(UserNotFoundException ex)
	{
		return ResponseEntity.badRequest().body(ex.getMessage());
	}

}
