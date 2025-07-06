package edu.icet.controller;

import edu.icet.dto.Student;
import edu.icet.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin

public class StudentController {

    @Autowired
    StudentService stdService;

    @GetMapping("/get-students")
    public List<Student> getStudent() {
        return stdService.getStudents(); // List return
    }

    @GetMapping("/find-by-name/{name}")
    public List<Student> findByName(@PathVariable String name) {
        return stdService.findByName(name); // List return
    }

    @GetMapping("/find-by-address/{address}")
    public List<Student> findByAddress(@PathVariable String address) {
        return stdService.findByAddress(address); // List return
    }

    @PostMapping("/add-student")
    public void addStudent(@RequestBody Student student) {
        stdService.addStudent(student);
    }

    @PutMapping("/update-student")
    public void updateStudent(@RequestBody Student student) {
        stdService.updateStudent(student);
    }

    @DeleteMapping("/delete-student/{id}")
    public void deleteStudentByID(@PathVariable String id){
        System.out.println(id);
        stdService.deleteStudentByID(id);
    }

}

//            |  1 | Tangalle  | Gaveesha |
//            |  2 | Gampaha   | Nimal    |
//            |  3 | Panadura  | Kamal    |
//            |  4 | hikkaduwa | Saman    |
//            |  5 | Kandy     | Vimal    |
//            |  6 | Tangalle  | Sandun   |
//            |  7 | Tangalle  | Manoj    |



