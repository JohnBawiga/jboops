import React, {useState}from 'react'
import ContentItems from './ContentItems'

import Thumbnail1 from '../components/blog1.jpg'
import Thumbnail2 from '../components/blog2.jpg'
import Thumbnail3 from '../components/blog3.jpg'

export const DUMMY_POSTS = [
    {
        id: '1',
        thumbnail: Thumbnail1,
        category: 'education',
        title: 'NSTP',
        desc: 'qwertyuiasdfghxcvbnm',
    },
    {
        id: '2',
        thumbnail: Thumbnail2,
        category: 'education',
        title: 'ROTC',
        desc: 'qwertyuiasdfghxcvbnm',
    },
    {
        id: '3',
        thumbnail: Thumbnail3,
        category: 'education',
        title: 'CSTPS',
        desc: 'qwertyuiasdfghxcvbnm',
    },
]

const Article = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS)
  return (
    <section className='posts'>
        {posts.length > 0 ? <div className='container posts__container'>
        {
            posts.map(({id, thumbnail, category, title, desc, authorID}) => 
            <ContentItems
            key={id} 
            postID={id} 
            thumbnail={thumbnail} 
            category={category} 
            title={title} 
            description={desc} 
            authorID={authorID}/>)
        }
        </div> : <h2 className='center'>No Posts founds</h2>}
    </section>
  )
}

export default Article