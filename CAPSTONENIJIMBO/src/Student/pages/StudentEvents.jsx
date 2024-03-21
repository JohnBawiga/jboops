import React from 'react'
import Event from './components/Event';
import './page.css';

function StudentEvents() {
  return (
    <div>
      <div className='title'>
      <h1> EVENTS</h1>
      <div>
        <button className='yellow__btn'>UpComing Events</button>
        <button className='green__btn'>OnGoing Events</button>
        <button className='blue__btn'>Completed Events</button>
      </div>
      </div>
      
      <div>
      <Event/>
      </div>
    </div>
  )
}

export default StudentEvents