package com.expense.app.repo;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.expense.app.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Integer>
{
	
	@Query("select e from Expense e where e.user.id  = :id")
	public Page<Expense> findAllByUserId(@Param("id") int id,Pageable pageable);
	
	@Query("select e from Expense e where e.id = :id")
	public Expense findExpenseById(@Param("id") int id);
	
	@Query(value = "SELECT SUM(CAST(amount AS UNSIGNED)) FROM expense WHERE user_id = :id", nativeQuery = true)
	public Integer getSumOfAmountOfUser(@Param("id") int id);

	

}
