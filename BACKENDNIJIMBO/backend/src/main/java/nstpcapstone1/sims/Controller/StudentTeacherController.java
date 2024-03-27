package nstpcapstone1.sims.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import nstpcapstone1.sims.Entity.StudentTeacherEntity;
import nstpcapstone1.sims.Repository.StudentTeacherRepository;

import java.util.List;

@RestController
@CrossOrigin(origins="*")
public class StudentTeacherController {

    private final StudentTeacherRepository studentTeacherRepository;

    public StudentTeacherController(StudentTeacherRepository studentTeacherRepository) {
        this.studentTeacherRepository = studentTeacherRepository;
    }

    @GetMapping("/teacherstudent/{studentID}")
    public ResponseEntity<List<StudentTeacherEntity>> getByStudentID(@PathVariable String studentID) {
        List<StudentTeacherEntity> studentTeachers = studentTeacherRepository.findByStudentStudentID(studentID);
        if (studentTeachers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(studentTeachers, HttpStatus.OK);
    }
}
