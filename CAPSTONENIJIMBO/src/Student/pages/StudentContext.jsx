// StudentContext.js

import React, { createContext, useState } from 'react';

const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [studentID, setStudentID] = useState('');

  return (
    <StudentContext.Provider value={{ studentID, setStudentID }}>
      {children}
    </StudentContext.Provider>
  );
};

export { StudentContext, StudentProvider };
