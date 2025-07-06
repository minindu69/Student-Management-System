package edu.icet.service;

import edu.icet.dto.Student;
import org.springframework.stereotype.Service;

import java.util.List;


public interface StudentService {
     void addStudent(Student student);
     List<Student> getStudents();
     void deleteStudentByID(String id);

     void updateStudent(Student student);

     List<Student> findByAddress(String address);

     List<Student> findByName(String name);
}
