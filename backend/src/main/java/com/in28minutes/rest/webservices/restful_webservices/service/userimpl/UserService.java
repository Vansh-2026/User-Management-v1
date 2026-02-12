package com.in28minutes.rest.webservices.restful_webservices.service.userimpl;

import java.util.List;
import java.util.Optional;

import com.in28minutes.rest.webservices.restful_webservices.model.UserModel;

public interface UserService {
	void updateUser(UserModel user, Long userId);
	 
	List<UserModel> getAllUser();
 
	Optional<UserModel> getUserById(Long userId);
 
	void saveUser(UserModel user);
 
	void deleteUserById(Long userId);

}
