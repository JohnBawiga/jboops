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
import org.springframework.web.bind.annotation.RestController;

import nstpcapstone1.sims.Entity.EventStudentEntity;
import nstpcapstone1.sims.Repository.EventStudentRepository;
import nstpcapstone1.sims.Service.EventStudentService;

@RestController
@CrossOrigin(origins="*")
public class EventStudentController{
	 private final EventStudentService eventStudentService;
	    private final EventStudentRepository eventStudentRepository;
	    
	    @Autowired
	    public EventStudentController(EventStudentService eventStudentService, EventStudentRepository eventStudentRepository) {
	        this.eventStudentService = eventStudentService;
	        this.eventStudentRepository = eventStudentRepository;
	    }

	    @PostMapping("/assignStudentToEvent")
	    public String assignStudentToEvent(@RequestBody EventStudentEntity eventStudentEntity) {
	        try {
	            eventStudentService.assignStudentToEvent(eventStudentEntity);
	            return "Student assigned to event successfully";
	        } catch (Exception e) {
	            e.printStackTrace();
	            return "Failed to assign Student to event";
	        }
	    }
	    @GetMapping("/Studentevent/{eventId}")
	    public ResponseEntity<List<EventStudentEntity>> getByEventId(@PathVariable Long eventId) {
	        List<EventStudentEntity> eventStudents = eventStudentRepository.findByEventEventID(eventId);
	        if (eventStudents.isEmpty()) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<>(eventStudents, HttpStatus.OK);
	    }
}
