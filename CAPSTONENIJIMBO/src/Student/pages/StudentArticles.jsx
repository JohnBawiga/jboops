import React from 'react'
import Article from './components/Article';
import './page.css';

function StudentArticles() {
  return (
    <div>
    <div className='title'>
    <h1> ARTICLES</h1>
    </div>
    <div>
    <Article/>
    </div>
  </div>
    
    )
}

export default StudentArticles