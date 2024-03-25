import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AdminCreateEvent() {
  const { adminID } = useParams(); // Extract adminID from URL params

  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  const [description, setDescription] = useState('');
  
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEventTitleChange = (event) => {
    setEventTitle(event.target.value);
  };

  const handleEventStartChange = (event) => {
    const date = new Date(event.target.value);
    const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    console.log(formattedDate)
    setEventStart(formattedDate);
    
  };

  const handleEventEndChange = (event) => {
    const date = new Date(event.target.value);
    const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    console.log(formattedDate)

    setEventEnd(formattedDate);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('eventTitle', eventTitle);
      formData.append('eventStart', eventStart);
      formData.append('eventEnd', eventEnd);
      formData.append('image', image);
      formData.append('description', description);
     

      const response = await axios.post(
        'http://localhost:8080/events',
        formData,
      );

      console.log(response.data);
      setEventTitle('');
      setEventStart('');
      setEventEnd('');
      setDescription('');
      setImage(null);
      setErrorMessage('');
    } catch (error) {
        console.error('Error creating event:', error);
        
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      }
  };

  return (
    <div>
      <h1>Create Event</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Title:</label>
          <input type="text" value={eventTitle} onChange={handleEventTitleChange} required />
        </div>
        <div>
          <label>Event Start:</label>
          <input type="date" value={eventStart} onChange={handleEventStartChange} required />
        </div>
        <div>
          <label>Event End:</label>
          <input type="date" value={eventEnd} onChange={handleEventEndChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/png, image/jpeg"  onChange={handleImageChange} />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default AdminCreateEvent;
