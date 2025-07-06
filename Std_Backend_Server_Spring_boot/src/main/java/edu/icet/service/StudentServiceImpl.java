package edu.icet.service;

import edu.icet.dto.Student;
import edu.icet.repository.StudentRepository;
import edu.icet.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    StudentRepository stdRepo;
    List<Student> studentList = new ArrayList<>();

    @Override
    public void addStudent(Student student) {
//        studentList.add(student);
        //generate ID and set
        student.setId(IdGenerator.generateID());
        //save record
        stdRepo.save(student);
    }

    @Override
    public List<Student> getStudents() {
//        if (studentList.isEmpty()){
//            addStudent(new Student(1,"Kamal", "Panadura"));
//            addStudent(new Student(1,"Sandun", "Tangalle"));
//            addStudent(new Student(1,"Gaveesha", "Tangalle"));
//        }
        //get all students from DB
        List<Student> allStudents = stdRepo.findAll();
        allStudents.forEach(obj->{
            System.out.println(obj);
        });

        return allStudents;
    }

    @Override
    public void deleteStudentByID(String id) {
        stdRepo.deleteById(id);
    }

    @Override
    public void updateStudent(Student student) {
        stdRepo.save(student);
    }

    @Override
    public List<Student> findByAddress(String address) {
        return stdRepo.findByAddress(address);
    }

    @Override
    public List<Student> findByName(String name) {
        return stdRepo.findByName(name);
    }

}
