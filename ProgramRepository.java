package com.stepIn.demo.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.stepIn.demo.model.Program;

public interface ProgramRepository extends JpaRepository<Program,Integer>{
	 

}
