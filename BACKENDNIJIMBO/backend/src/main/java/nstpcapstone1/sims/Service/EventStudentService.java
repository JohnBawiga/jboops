package nstpcapstone1.sims.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import nstpcapstone1.sims.Entity.EventStudentEntity;
import nstpcapstone1.sims.Entity.EventTeacherEntity;
import nstpcapstone1.sims.Repository.EventStudentRepository;
import nstpcapstone1.sims.Repository.EventTeacherRepository;

@Service
public class EventStudentService {

    private final EventStudentRepository eventStudentRepository;

    @Autowired
    public EventStudentService(EventStudentRepository eventStudentRepository) {
        this.eventStudentRepository = eventStudentRepository;
    }

    public void assignStudentToEvent(EventStudentEntity eventStudentEntity) {
        eventStudentRepository.save(eventStudentEntity);
    }
    
}
