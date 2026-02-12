package com.in28minutes.rest.webservices.restful_webservices.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="user", schema = "public")
public class UserModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String pid;
	
	@Column
	private String name;
	@Column
	private String email;
	@Column
	private String city;

	
	//GettersDatabase
	public Long getId() {
		return id;
	}

	public String getPid() {
		return pid;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getCity() {
		return city;
	}
	//SettersDatabase
	public void setId(Long id) {
		this.id = id;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setCity(String city) {
		this.city = city;
	}
	//Constructor
	public UserModel(Long id, String pid, String name, String email, String city) {
		super();
		this.id = id;
		this.pid = pid;
		this.name = name;
		this.email = email;
		this.city = city;
	}
	public UserModel() {
		super();
	}
	

	// Constructor
//	public user(Long id, String pid, String name, String email, String city) {
//		super();
//		this.id = id;
//		this.pid = pid;
//		this.name = name;
//		this.email = email;
//		this.city = city;
//	}
//
//	public user(String pid, String name, String email, String city) {
//		super();
//		this.pid = pid;
//		this.name = name;
//		this.email = email;
//		this.city = city;
//	}
//
//	// Setters
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public void setPid(String pid) {
//		this.pid = pid;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//	public void setCity(String city) {
//		this.city = city;
//	}
//
//	// Getters
//	public Long getId() {
//		return id;
//	}
//
//	public String getPid() {
//		return pid;
//	}
//
//	public String getName() {
//		return name;
//	}
//
//	public String getEmail() {
//		return email;
//	}
//
//	public String getCity() {
//		return city;
//	}
//
//	@Override
//	public int hashCode() {
//		return Objects.hash(id);
//	}
//
//	@Override
//	public boolean equals(Object obj) {
//		if (this == obj)
//			return true;
//		if (obj == null)
//			return false;
//		if (getClass() != obj.getClass())
//			return false;
//		user other = (user) obj;
//		return id == other.id;
//	}
//
//	public void remove(user user) {
//		// TODO Auto-generated method stub
//
//	}

}
