package com.in28minutes.rest.webservices.restful_webservices.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.in28minutes.rest.webservices.restful_webservices.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel,Long>{
	
}
