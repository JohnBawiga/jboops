import React from 'react'
import Content from './components/Content';
import './page.css';

function StudentHomepage() {
  return (
    <div>
      <div className='title'>
      <h1> ANNOUNCEMENTS</h1>
      </div>
      <div>
      <Content/>
      </div>
    </div>

  )
}

export default StudentHomepage