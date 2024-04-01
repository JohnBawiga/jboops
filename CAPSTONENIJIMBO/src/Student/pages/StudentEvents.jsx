import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './StudentEvents.css'; // Import CSS file for styling

function TeacherEvents() {
  const { studentID } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch events based on teacher's user ID
  const fetchEvents = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/teacherevents/${userId}`);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message); // Assuming the error message is returned from the backend
      setLoading(false);
    }
  };

  useEffect(() => {
    // Make API call to get teacher's user ID based on student ID
    const fetchTeacherUserId = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/teacherstudent/${studentID}`);
        console.log(response)
        const teacherUserId = response.data[0].teacher.userid; // Accessing nested property
        fetchEvents(teacherUserId);
      } catch (error) {
        setError(error.response.data.message); // Assuming the error message is returned from the backend
        setLoading(false);
      }
    };

    fetchTeacherUserId();
  }, [studentID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="teacher-events-container"> {/* Apply container styling */}
      <h1>Events</h1>
      <ul className="events-list"> {/* Apply list styling */}
        {events.map((event) => (
          <li key={event.id} className="event-item"> {/* Apply item styling */}
            <p><strong>Event ID:</strong> {event.event.eventID}</p> {/* Accessing nested property */}
            <p><strong>Event Title:</strong> {event.event.eventTitle}</p>
            <p><strong>Event Start:</strong> {event.event.eventStart}</p>
            <p><strong>Event End:</strong> {event.event.eventEnd}</p>
            {event.event.image && <p><img src={`data:image/png;base64,${event.event.image}`} alt={event.eventTitle} /></p>}
            <p><strong>Description:</strong> {event.event.description}</p>
            <p><strong>Teacher ID:</strong> {event.teacher.teacherID}</p> {/* Accessing nested property */}
            <p><strong>Teacher Name:</strong> {event.teacher.firstName} {event.teacher.lastName}</p>
            {/* Add more event and teacher details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherEvents;
