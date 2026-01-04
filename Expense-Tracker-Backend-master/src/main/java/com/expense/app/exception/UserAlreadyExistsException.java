package com.expense.app.exception;

@SuppressWarnings("serial")
public class UserAlreadyExistsException extends Exception
{
	public UserAlreadyExistsException(String str)
	{
		super(str);
	}

}
