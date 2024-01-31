import React from 'react'
import {Link, Outlet, useParams} from 'react-router-dom'
import PostLayout from './PostLayout'

const Postpage = ({posts, handleDelete}) => {
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id)
  return (
    <div className='PostPage'>
      <>
        <h2>{post.title}</h2>
        <p>{post.datetime}</p>
        <p>{post.body}</p>
        <Link to={`/edit/${id}`}><button>Edit Post</button></Link>
        <button onClick={() => handleDelete(post.id)}>Delete Post</button>
      </>
    </div>
  )
}

export default Postpage