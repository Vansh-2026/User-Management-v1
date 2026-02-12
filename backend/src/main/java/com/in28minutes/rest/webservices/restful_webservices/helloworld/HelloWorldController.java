package com.in28minutes.rest.webservices.restful_webservices.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

//main Controller Class
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class HelloWorldController {

	@GetMapping(path = "/hello-world")
	public String HelloWorld() {
		return "Hello-World ... ";
	}

	// Beam Method
	@GetMapping(path = "/hello-world-bean")
	public HelloWorldBean HelloWorldBean() {
		return new HelloWorldBean("Hello-world ....");
	}

	// Method With Parameters
	@GetMapping(path = "/hello-world-bean/path-variable/{name}")
	public HelloWorldBean HelloWorldBeanPathVariable(@PathVariable String name) {
		return new HelloWorldBean(String.format("Hello World ... , %s", name));
	}
}
