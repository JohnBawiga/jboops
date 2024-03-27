package nstpcapstone1.sims.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import nstpcapstone1.sims.Entity.StudentEntity;
import nstpcapstone1.sims.Entity.TeacherEntity;
import nstpcapstone1.sims.Repository.StudentRepository;
import nstpcapstone1.sims.Service.StudentService;

@RestController
@CrossOrigin(origins="*")
public class StudentController {
	
	@Autowired
	private StudentService studentService;
	
	@Autowired
	private StudentRepository studentRepository;
	@PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody StudentEntity user) {
        // Check if the studentID already exists
        if (studentService.existsByStudentID(user.getStudentID())) {
            return new ResponseEntity<>("StudentID already exists", HttpStatus.BAD_REQUEST);
        }

        // Save the user if studentID is unique
        studentService.createUser(user);
        return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
    }
	
	@GetMapping("/getByUserid")
    public ResponseEntity findByUserid(
            @RequestParam(name = "studentID", required = false, defaultValue = "0") String studentID,
            @RequestParam(name = "password", required = false, defaultValue = "0") String password) {

        StudentEntity user = studentService.findByStudentID(studentID);

        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Log-in invalid");
        }
    }
	   @GetMapping("/getByStudentID/{studentID}")
	    public ResponseEntity<StudentEntity> getStudentByStudentID(@PathVariable String studentID) {
	        StudentEntity student = studentRepository.getByStudentID(studentID);
	        if (student != null) {
	            return new ResponseEntity<>(student, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	   @GetMapping("/getAllStudents")
	    public List<StudentEntity> getAllStudents() {
	        return studentService.getAllStudents();
	    }
}
