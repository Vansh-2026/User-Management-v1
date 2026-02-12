package com.in28minutes.rest.webservices.restful_webservices.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.in28minutes.rest.webservices.restful_webservices.model.UserModel;
import com.in28minutes.rest.webservices.restful_webservices.service.userimpl.UserService;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("/user")
	public List<UserModel> getAllUser() {
		List<UserModel> UserModels = userService.getAllUser();
		System.out.println("users : " + UserModels);
		return UserModels;
	}

	@GetMapping("/{userId}")
	public Optional<UserModel> getUserById(@PathVariable Long userId) {
		Optional<UserModel> user = userService.getUserById(userId);
		System.out.println("userId : " + userId + " : user : " + user);
		return user;
	}

	@DeleteMapping("/{userId}")
	public String deleteUseryId(@PathVariable Long userId) {
		userService.deleteUserById(userId);
		return "user deleted successfully.";
	}

	@PutMapping("/{userId}")
	public String updateUser(@RequestBody UserModel user, @PathVariable Long userId) {
		userService.updateUser(user, userId);
		return "user updated successfully.";
	}

	@PostMapping("/user")
	public String saveUser(@RequestBody UserModel user) {
		userService.saveUser(user);
		return "user saved successfully.";
	}

//	@Autowired
//	private UserService userService;

//	@GetMapping("/user/{name}/user")
//	public List<user> getAllUser(@PathVariable String name) {
//		return userService.findAll();
//	}
//
//	@GetMapping("/user/{name}/user/{id}")
//	public user getUser(@PathVariable String name, @PathVariable Long id) {
//		return userService.findById(id);
//	}
//
//	@DeleteMapping("/user/{name}/user/{id}")
//	public ResponseEntity<Void> deleteUser(@PathVariable String name, @PathVariable Long id) {
//		user user = userService.deleteUser(id);
//		if (user != null) {
//			return ResponseEntity.noContent().build();
//		}
//		return ResponseEntity.notFound().build();
//	}
//
//	@PutMapping("/user/{name}/user/{id}")
//	public ResponseEntity<user> updateUser(@PathVariable String name, @PathVariable Long id, @RequestBody user todo) {
//
//		// Set the ID from the path onto the object to ensure it's not null
//		todo.setId(id);
//
//		user todoUpdated = userService.save(todo);
//		return new ResponseEntity<user>(todoUpdated, HttpStatus.OK);
//	}
//	@PostMapping("/user/create")
//	public ResponseEntity<Void> postUser(@RequestBody user todo){
//	   
//	    user todoCreated = userService.save(todo);
//	    
//	    
//	    URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
//	                .path("/{id}") // Changed "/id" to "/{id}" to make it a template
//	                .buildAndExpand(todoCreated.getId())
//	                .toUri();
//
//	    return ResponseEntity.created(uri).build();
//	}

}
