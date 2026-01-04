package com.expense.app.entity;


import java.time.LocalDate;
import java.util.Locale.Category;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;



@Entity
@Table(name="Expense")
public class Expense 
{
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	private String amount;
	
	@Column(length = 20)
	@Enumerated(EnumType.STRING)
	private ExpenseCategory  category;
	private LocalDate localDate;
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="user_id")
	private User user;
	public Expense() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Expense(int id, String amount, ExpenseCategory category, LocalDate localDate, User user) {
		super();
		this.id = id;
		this.amount = amount;
		this.category = category;
		this.localDate = localDate;
		this.user = user;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public ExpenseCategory getCategory() {
		return category;
	}
	public void setCategory(ExpenseCategory category) {
		this.category = category;
	}
	public LocalDate getLocalDate() {
		return localDate;
	}
	public void setLocalDate(LocalDate localDate) {
		this.localDate = localDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Expense [id=" + id + ", amount=" + amount + ", category=" + category + ", localDate=" + localDate
				+  "]";
	}
	
	

}
