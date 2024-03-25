import React, { useState, useEffect } from 'react';
import './AdminEvents.css';
import axios from 'axios';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventTeachers, setSelectedEventTeachers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
    // Fetch event teachers for the clicked event
    console.log(eventId)
    axios.get(`http://localhost:8080/event/${eventId}`)
      .then(response => {
        setSelectedEventTeachers(response.data);
        setModalVisible(true);
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

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
            <h2>Assigned Teachers</h2>
            <ul>
              {selectedEventTeachers.map(eventTeacher => (
                <li key={eventTeacher.userid}>
                  <p>Teacher Name: {eventTeacher.teacher.firstName} {eventTeacher.teacher.lastName}</p>
                  {/* Add other teacher details as needed */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
