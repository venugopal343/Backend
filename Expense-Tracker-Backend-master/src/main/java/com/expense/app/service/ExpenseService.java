package com.expense.app.service;





import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.expense.app.entity.Expense;
import com.expense.app.entity.ExpenseCategory;
import com.expense.app.entity.User;
import com.expense.app.repo.ExpenseRepository;
import com.expense.app.repo.UserRepository;

@Service
public class ExpenseService
{
	@Autowired
	public ExpenseRepository expenseRepository;
	@Autowired
	public UserRepository userRepository;
	

	public ExpenseService() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Expense ExpenseAdd(Expense expense,Principal principal)
	{
		String email = principal.getName();
		User user=  this.userRepository.getUserByEmail(email);
		expense.setUser(user);
		user.getExpenses().add(expense);
		this.userRepository.save(user);
		//Expense expense2 = this.expenseRepository.save(expense);
		return expense;
	}


	public Page<Expense> AllExpenses(int page,int size,Principal principal)
	{
		User user = this.userRepository.getUserByEmail(principal.getName());
		PageRequest pageable =  PageRequest.of(page,size);
		return this.expenseRepository.findAllByUserId(user.getId(),pageable);
		
	}


	public  boolean  deleteExpense(int id,Principal principal) 
	{
		System.out.println("Data is deleing");
		Optional<Expense> optional = this.expenseRepository.findById(id);
		if(optional.isPresent())
		{
			Expense expense = optional.get();
			String string = principal.getName();
			User user = this.userRepository.getUserByEmail(string);
			List<Expense> list = user.getExpenses();
			if(list.contains(expense))
			{
				list.remove(expense);
			}
			user.setExpenses(list);
			this.userRepository.save(user);
			this.expenseRepository.delete(expense);
			return true;
		}
		return false;
	}


	public Expense getExpenseById(int id, Principal principal) 
	{
		Expense expense= this.expenseRepository.findExpenseById(id);
		if(expense!=null)
		{
			return expense;
		}
		
		return null;
	}


	public Expense UpdateYourExpense(Expense expense, Principal principal,int id) 
	{
		Expense expense2 = this.expenseRepository.findExpenseById(id);
		String email= principal.getName();
		if(expense2.getUser().getEmail().equals(email))
		{
			expense2.setAmount(expense.getAmount());
			expense2.setCategory(expense.getCategory());
			expense2.setLocalDate(expense.getLocalDate());
			this.expenseRepository.save(expense2);
			return expense2;
		}
		return expense;
	}


	public int getTotalAmountOfUser(Principal principal) 
	{
		String email=principal.getName();
		User user = this.userRepository.getUserByEmail(email);
		int id = user.getId();
		int sum = this.expenseRepository.getSumOfAmountOfUser(id);
		if(sum>=0)
		{
			return sum;
		}
		return -1;
	}

}
