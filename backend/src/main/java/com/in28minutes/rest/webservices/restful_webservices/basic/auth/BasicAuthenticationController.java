package com.in28minutes.rest.webservices.restful_webservices.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//main Controller Class
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BasicAuthenticationController {

	
	// Beam Method
	@GetMapping(path = "/basicauth")
	public AuthenticationBean HelloWorldBean() {
		return new AuthenticationBean("Hello-world Authenticated User ....");
	}

	
}
