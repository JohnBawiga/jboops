import React, { useState, useEffect } from 'react';
import './AdminEvents.css';
import axios from 'axios';
import Modal from 'react-modal'; // Import modal component

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventTeachers, setSelectedEventTeachers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility
  
  useEffect(() => {
    // Fetch events from backend API
    axios.get('http://localhost:8080/getEvents')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleEventClick = (eventId) => {
    // Open the modal
    setModalIsOpen(true);
    
    // Fetch event teachers for the clicked event
    axios.get(`http://localhost:8080/event/${eventId}`)
      .then(response => {
        setSelectedEventTeachers(response.data);
      })
      .catch(error => {
        console.error('Error fetching event teachers:', error);
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
          </li>
        ))}
      </ul>

      {/* Modal for Assigned Teachers */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Assigned Teachers Modal"
      >
        <div>
          <h2>Assigned Teachers</h2>
          <p>
            {selectedEventTeachers.map(eventTeacher => (
              `${eventTeacher.teacher.firstName} ${eventTeacher.teacher.lastName}`
            )).join(', ')}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default AdminEvents;
