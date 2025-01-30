package com.stepIn.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stepIn.demo.model.Program;
import com.stepIn.demo.model.User;
//import com.stepIn.demo.model.UserProgram;
import com.stepIn.demo.repository.ProgramRepository;
import com.stepIn.demo.repository.RegRepository;
//import com.stepIn.demo.repository.UserProgramRepository;

@Service
public class ProgramService {

    @Autowired
    private RegRepository userRepository;

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
   // private UserProgramRepository userProgramRepository;

    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    public Program getProgramById(Integer id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with ID: " + id));
    }

    public Program createProgram(Program program) {
        return programRepository.save(program);
    }

    public Program updateProgram(Integer id, Program programDetails) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with ID: " + id));

        program.setTitle(programDetails.getTitle());
        program.setDescription(programDetails.getDescription());
        program.setDate(programDetails.getDate());
        program.setTime(programDetails.getTime());
        program.setVenue(programDetails.getVenue());
        program.setOrganizer(programDetails.getOrganizer());

        return programRepository.save(program);
    }

    public void deleteProgram(Integer id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with ID: " + id));

        programRepository.delete(program);
    }

    public String joinProgram(Integer userId, Integer programId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Program program = programRepository.findById(programId)
                .orElseThrow(() -> new RuntimeException("Program not found with ID: " + programId));
        
       List<Program>userPrograms=user.getJoinedPrograms();
       
      if(userPrograms==null) {
    	  userPrograms= new ArrayList<Program>();
    	  userPrograms.add(program);
    	  
      }
      else  {
    	  for(int i=0;i<userPrograms.size();i++) {
    		  Program prgs=userPrograms.get(i);
    		  if(prgs.getId()==programId ) {
    			 return "Already exists";
    		  }
    	  }
    	  userPrograms.add(program);
      }
       
       user.setJoinedPrograms(userPrograms);
       userRepository.save(user);

        return "Successfully joined the program";
    }
    
    public Program getProgramById(int id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found"));
    }
}
