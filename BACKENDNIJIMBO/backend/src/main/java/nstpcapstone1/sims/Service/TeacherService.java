package nstpcapstone1.sims.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import nstpcapstone1.sims.Entity.AnnouncementEntity;
import nstpcapstone1.sims.Entity.TeacherEntity;
import nstpcapstone1.sims.Repository.AnnouncementRepository;
import nstpcapstone1.sims.Repository.TeacherRepository;

@Service

public class TeacherService {
	  private final TeacherRepository teacherRepository;

	    @Autowired
	    public TeacherService(TeacherRepository teacherRepository) {
	        this.teacherRepository = teacherRepository;
	    }


	    public List<TeacherEntity> getAllAnnouncements() {
	        return teacherRepository.findAll();
	    }
	   
	   
    
}
