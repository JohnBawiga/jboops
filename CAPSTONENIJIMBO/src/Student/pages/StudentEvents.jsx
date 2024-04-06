import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './StudentEvents.css'; // Import CSS file for styling

function TeacherEvents() {
  const { studentID } = useParams();
  const [student, setStudent]=useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // State to store selected event
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

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

  useEffect(() => {
    // Function to fetch student data by student ID
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getByStudentID/${studentID}`);
        setStudent(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message); // Assuming the error message is returned from the backend
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentID]);

  // Function to open modal and set selected event
  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  // Function to register for the event
  const registerForEvent = async () => {
    try {
      // Prepare data for registration
      const registrationData = {
        event: {
          eventID: selectedEvent.event.eventID,
          eventTitle: selectedEvent.event.eventTitle,
          eventStart: selectedEvent.event.eventStart,
          eventEnd: selectedEvent.event.eventEnd,
          image: selectedEvent.event.image,
          description: selectedEvent.event.description
        },
        student: {
          userid: student.userid, 
          studentID: student.studentID, 
          firstName: student.firstName, 
          lastName:student.lastName, 
          course: student.course, 
          email: student.email, 
          password: student.password,
          profile: student.profile
        },
        timeIN: null,
        timeOUT: null,
        registered: true
      };
  
      console.log(registrationData);
      // Make POST request to register for the event
      const response = await axios.post('http://localhost:8080/createStudentEvent', registrationData);
      
      // Handle successful registration
      console.log('Successfully registered for the event:', response.data);
      // You can add further actions after successful registration, such as updating UI or showing a success message
    } catch (error) {
      // Handle error
      console.error('Error registering for the event:', error.response.data.message);
      // You can add further error handling, such as showing an error message to the user
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="teacher-events-container"> {/* Apply container styling */}
      <h1>Events</h1>
      <ul className="events-list"> {/* Apply list styling */}
        {events.map((event) => (
          <li key={event.id} className="event-item" onClick={() => openModal(event)}> {/* Apply item styling */}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedEvent.event.eventTitle}</h2>
            <p><strong>Event ID:</strong> {selectedEvent.event.eventID}</p>
            <p><strong>Event Start:</strong> {selectedEvent.event.eventStart}</p>
            <p><strong>Event End:</strong> {selectedEvent.event.eventEnd}</p>
            {selectedEvent.event.image && <p><img src={`data:image/png;base64,${selectedEvent.event.image}`} alt={selectedEvent.event.eventTitle} /></p>}
            <p><strong>Description:</strong> {selectedEvent.event.description}</p>
            <p><strong>Teacher Name:</strong> {selectedEvent.teacher.firstName} {selectedEvent.teacher.lastName}</p>
            {/* Add more event and teacher details as needed */}
            <button onClick={registerForEvent}>Register</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherEvents;
