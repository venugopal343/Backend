package com.expense.app.controller;


import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.expense.app.entity.Expense;
import com.expense.app.service.ExpenseService;

@RestController
@RequestMapping("/et")
@CrossOrigin(origins = "*")
public class ExpenseController 
{
	@Autowired
	public ExpenseService expenseService;

	public ExpenseController() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	@PostMapping("/add")
	public ResponseEntity<String> addExpense(@RequestBody Expense expense,Principal principal)
	{
		Expense expense2 = this.expenseService.ExpenseAdd(expense,principal);
		if(expense2 !=null)
		{
			return ResponseEntity.status(HttpStatus.OK).body("Stored Successfully");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong!!!");
	}
	
	@GetMapping("/getall")
	public ResponseEntity<Page<Expense>> getAllExpenses(@RequestParam(value="page",defaultValue ="0",required =false) int page,
														@RequestParam(value="size",defaultValue ="4",required =false) int size,
														Principal principal)
	{
		       Page<Expense> page2=      this.expenseService.AllExpenses(page,size,principal);
		if(page2.hasContent())
		{
			return ResponseEntity.status(HttpStatus.OK).body(page2);
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		
	}
	@GetMapping("/get/{id}")
	public ResponseEntity<Expense> getExpense(@PathVariable("id") int id,Principal principal)
	{
		    Expense expense =   this.expenseService.getExpenseById(id,principal);
		    if(expense !=null)
		    {
		    	//System.out.println("Expense is "+expense.toString());
		    	return ResponseEntity.status(HttpStatus.OK).body(expense);
		    }
		    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Expense> updateExpense(@PathVariable("id") int id, @RequestBody Expense expense,Principal principal)
	{
		Expense expense2 = this.expenseService.UpdateYourExpense(expense,principal,id);
		if(expense2.equals(expense))
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.status(HttpStatus.OK).body(expense2);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteExpenseById(@PathVariable("id") int id,Principal principal)
	{
		  boolean res =this.expenseService.deleteExpense(id,principal);
		  if(res==true) {
			  return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully");
		  }
		  return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id is not present");
	}
	
	
	@GetMapping("/gettotal")
	public ResponseEntity<Integer> getTotalAmount(Principal principal)
	{
		int total = this.expenseService.getTotalAmountOfUser(principal);
		if(total == -1)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.status(HttpStatus.OK).body(total);
	}

}
