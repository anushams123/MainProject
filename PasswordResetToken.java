package com.stepIn.demo.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;
    private String email;
    private Date expiryDate;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}
	
	 public PasswordResetToken(String email) {
	        this.token = UUID.randomUUID().toString(); // Generate unique token
	        this.email = email;
	        this.expiryDate = new Date(System.currentTimeMillis() + 30 * 60 * 1000); // Valid for 30 minutes
	    }

	@Override
	public String toString() {
		return "PasswordResetToken [id=" + id + ", token=" + token + ", email=" + email + ", expiryDate=" + expiryDate
				+ "]";
	}
	public PasswordResetToken(Long id, String token, String email, Date expiryDate) {
		super();
		this.id = id;
		this.token = token;
		this.email = email;
		this.expiryDate = expiryDate;
	}
	public PasswordResetToken() {
		super();
		// TODO Auto-generated constructor stub
	}

    
}
