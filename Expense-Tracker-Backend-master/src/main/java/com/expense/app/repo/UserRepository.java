package com.expense.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.expense.app.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>
{
	@Query("select u from User u where u.email =:e")
	public User getUserByEmail(@Param("e") String email);

}
