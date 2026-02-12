package com.in28minutes.rest.webservices.restful_webservices.service.userimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.in28minutes.rest.webservices.restful_webservices.model.UserModel;
import com.in28minutes.rest.webservices.restful_webservices.repository.UserRepository;

@Service
public class userimpl implements UserService {

	@Autowired
	private UserRepository repository;

	@Override
	public List<UserModel> getAllUser() {
		return repository.findAll();
	}

	@Override
	public Optional<UserModel> getUserById(Long userId) {
		Optional<UserModel> user = repository.findById(userId);
		return user;
	}

	@Override
	public void saveUser(@RequestBody UserModel user) {
		repository.save(user);
		System.out.println("user saved to db with userId : " + user.getId());

	}

	@Override
	public void updateUser(UserModel user, Long userId) {
		Optional<UserModel> userDetailOpt = repository.findById(userId);
		if (userDetailOpt.isPresent()) {
			UserModel userDetail = userDetailOpt.get();
			if (user.getName() != null || user.getName().isEmpty())
				userDetail.setName(user.getName());
			if (user.getEmail() != null || user.getEmail().isEmpty())
				userDetail.setEmail(user.getEmail());
			if (user.getCity() != null || user.getCity().isEmpty())
				userDetail.setCity(user.getCity());
			repository.save(userDetail);
		} else {
			throw new RuntimeException("user not found.");
		}
	}

	@Override
	public void deleteUserById(Long userId) {
		repository.deleteById(userId);

	}

}
