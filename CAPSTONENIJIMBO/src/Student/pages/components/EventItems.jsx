import React from 'react';
import { Link } from 'react-router-dom';

const EventItems = ({ postID, thumbnail, category, title, description, authorID }) => {
    const shortDescription = description.length > 145 ? description.substr(0,145) + '...' : description;
    const postTitle = title.length > 30 ? title.substr(0,30) + '...' : title;
  return (
    <article className='event'>
      <div className='event__thumbnail'>
        <img src={thumbnail} alt={title} />
      </div>

      <div className='event__content'>
        <Link to={`/posts/${postID}`}>
          <h3>{postTitle}</h3>
        </Link>
        <p>{shortDescription}</p>
      </div>
    </article>
  );
};

export default EventItems