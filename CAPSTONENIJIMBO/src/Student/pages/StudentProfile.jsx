import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './StudentProfile.css'; // Import your CSS file for styling

const StudentProfile = () => {
  const { studentID } = useParams(); // Get studentID from URL params
  const [student, setStudent] = useState('');
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch student and teacher data by studentID
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`http://localhost:8080/teacherstudent/${studentID}`);
        setTeachers(response.data.map(item => item.teacher)); // Extract teacher objects from the response
      } catch (error) {
        console.error('Error fetching student or teacher data:', error);
      }
    };

    fetchData(); // Call the fetch function
  }, [studentID]); // Fetch data whenever studentID changes

  useEffect(() => {
    // Fetch student data by studentID
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getByStudentID/${studentID}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData(); // Call the fetch function
  }, [studentID]); // Fetch data whenever studentID changes
  return (
    <div className="student-profile">
      <h2 className="profile-heading">Student Profile</h2>
      <div className="profile-details">
        <p><strong>Student ID:</strong> {student.studentID}</p>
        <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>
        {/* Render other student details as needed */}
        <div className="teachers-list">
        <p><strong>Teacher Assigned:</strong></p>
          {teachers.length > 0 ? (
            <ul>
              {teachers.map((teacher, index) => (
                <li key={index}>{teacher.firstName} {teacher.lastName}</li>
              ))}
            </ul>
          ) : (
            <p>No assigned teacher</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
