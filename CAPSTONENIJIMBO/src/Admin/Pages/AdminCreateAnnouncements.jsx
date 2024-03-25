import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function AdminCreateAnnouncements() {
  const { adminID } = useParams(); // Extract studentID from URL params

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [date, setDate] = useState('');
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDate = (event) =>{
    const date = new Date(event.target.value);
    const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    console.log(formattedDate)
    setDate(formattedDate);
  }
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
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('date', date);
      formData.append('adminID', adminID); // Static adminID

      const response = await axios.post(
        'http://localhost:8080/announcements/createann',
        formData,
        
      );

      console.log(response.data);
      // Reset form fields
      setTitle('');
      setDescription('');
      setImage(null);
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating announcement:', error);
      // Access specific properties of the error object to render error message
      setErrorMessage(error.response.data.message); // Assuming 'message' holds the error message
    }
  };

  return (
    <div>
      <h1>Create Announcement</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={handleDate} required/>
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
        </div>
        <button type="submit">Create Announcement</button>
      </form>
    </div>
  );
}

export default AdminCreateAnnouncements;
