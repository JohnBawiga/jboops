import React, { useState, useEffect } from 'react';
import axios from 'axios';

// CSS for the modal
const modalStyles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent background
    zIndex: 1
  },
  modalContent: {
    backgroundColor: '#fefefe',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    maxHeight: '80%',
    overflowY: 'auto',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer'
  }
};

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedAnnouncement, setEditedAnnouncement] = useState({
    announcementID: null,
    title: '',
    description: '',
    date: null,
    image: null,
    adminID: null
  });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:8080/announcements/getall');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();

    // Clean up function
    return () => {
      setAnnouncements([]); // Clear announcements data when component unmounts
    };
  }, []);

  const handleDelete = async (announcementID) => {
    try {
      await axios.delete(`http://localhost:8080/announcements/deleteann/${announcementID}`);
      setAnnouncements(announcements.filter(announcement => announcement.announcementID !== announcementID));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const handleEdit = (announcement) => {
    setEditMode(true);
    setEditedAnnouncement(announcement);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAnnouncement(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedAnnouncement(prevState => ({
        ...prevState,
        image: reader.result // Store the image as base64 string
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      // Encode the image data before sending the update request
      const updatedAnnouncementWithEncodedImage = {
        ...editedAnnouncement,
        image: editedAnnouncement.image.split(',')[1] // Extract base64 data part
      };

      await axios.put(`http://localhost:8080/announcements/updateann/${editedAnnouncement.announcementID}`, updatedAnnouncementWithEncodedImage);
      setEditMode(false);
      // Optionally, you can update the announcements list here after successful update
    } catch (error) {
      console.error('Error updating announcement:', error);
    }
  };

  return (
    <div className="admin-announcements">
      <h2>All Announcements</h2>
      {announcements.map((announcement) => (
        <div key={announcement.announcementID} className="announcement">
          {announcement.image ? (
            <div className="announcement-with-image">
              <h3>{announcement.title}</h3>
              <img src={`data:image/png;base64,${announcement.image}`} alt="Announcement" />
              <p>{announcement.description}</p>
              <p>Date: {new Date(announcement.date).toLocaleDateString()}</p>
              <p>Admin ID: {announcement.adminID}</p>
              <button onClick={() => handleDelete(announcement.announcementID)}>Delete</button>
              <button onClick={() => handleEdit(announcement)}>Edit</button>
            </div>
          ) : (
            <div className="announcement-without-image">
              <h3>{announcement.title}</h3>
              <p>{announcement.description}</p>
              <p>Date: {new Date(announcement.date).toLocaleDateString()}</p>
              <p>Admin ID: {announcement.adminID}</p>
              <button onClick={() => handleDelete(announcement.announcementID)}>Delete</button>
              <button onClick={() => handleEdit(announcement)}>Edit</button>
            </div>
          )}
        </div>
      ))}

      {editMode && (
        <div style={modalStyles.modal}>
          <div style={modalStyles.modalContent}>
            <span style={modalStyles.closeButton} onClick={() => setEditMode(false)}>&times;</span>
            <h2>Edit Announcement</h2>
            <input type="text" name="title" value={editedAnnouncement.title || ''} onChange={handleChange} />
            <input type="text" name="description" value={editedAnnouncement.description || ''} onChange={handleChange} />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;
