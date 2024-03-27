import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './AdminEvents.css';
import axios from 'axios';

const AdminEvents = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [events, setEvents] = useState([]);
  const [selectedEventTeachers, setSelectedEventTeachers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  useEffect(() => {
    // Fetch events from backend API
    axios.get('http://localhost:8080/getEvents')  
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });

    // Fetch students from backend API
    axios.get('http://localhost:8080/getAllStudents')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleEventClick = (eventId) => {
    // Fetch event teachers for the clicked event
    axios.get(`http://localhost:8080/event/${eventId}`)
      .then(response => {
        setSelectedEventTeachers(response.data);
        setModalVisible(true);
      })
      .catch(error => {
        console.error('Error fetching event teachers:', error);
      });
  };

  const handleAddStudentClick = (eventId) => {
    // Set selected event id and open modal
    setSelectedEventId(eventId);
    setModalVisible(true);
  };

  const handleAddStudentSubmit = () => {
    // Send POST request to assign student to event
    axios.post('http://localhost:8080/assignStudentToEvent', {
      eventId: selectedEventId,
      studentId: selectedStudentId
    })
    .then(response => {
      // Handle success, you may want to update state or show a success message
      console.log('Student assigned to event successfully');
    })
    .catch(error => {
      console.error('Failed to assign Student to event:', error);
      // Handle error, you may want to show an error message
    });
  };

  return (
    <div>
      <h1>Event List</h1>
      <ul>
        {events.slice().reverse().map(event => (
          <li key={event.eventID} onClick={() => handleEventClick(event.eventID)}>
            <h2>{event.eventTitle}</h2>
            <p>Start Date: {event.eventStart}</p>
            <p>End Date: {event.eventEnd}</p>
            <p>Description: {event.description}</p>
            <img src={`data:image/png;base64,${event.image}`} alt={event.eventTitle} />
            <button onClick={(e) => { e.stopPropagation(); handleAddStudentClick(event.eventID); }}>Add Student</button>
          </li>
        ))}
      </ul>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
            <h2>Add Student to Event</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddStudentSubmit();
            }}>
            
              <select id="userid" name="userid" value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)}>
                <option value="userid">Select Student</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>
                ))}
              </select>
              <button type="submit">Add Student</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
