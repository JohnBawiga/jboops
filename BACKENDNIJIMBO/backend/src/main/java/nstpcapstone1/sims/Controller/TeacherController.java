package nstpcapstone1.sims.Controller;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import nstpcapstone1.sims.Entity.AnnouncementEntity;
import nstpcapstone1.sims.Entity.TeacherEntity;
import nstpcapstone1.sims.Repository.TeacherRepository;
import nstpcapstone1.sims.Service.TeacherService;

@RestController
@CrossOrigin(origins="*")
public class TeacherController {
	@Autowired
	private TeacherService teacherService;
	
	@GetMapping("getallteachers")
    public ResponseEntity<List<TeacherEntity>> getAllAnnouncements() {
        List<TeacherEntity> announcements = teacherService.getAllAnnouncements();
        return ResponseEntity.ok(announcements);
    }
}
