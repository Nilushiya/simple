import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Post = ({post}) => {
  return (
    <div className='post'>
      <Link to={`post/${post.id}`}><h2>{post.title}</h2>
      <p>{post.dateTime}</p>
      </Link>
      <p>{
        (post.body).length <=25
        ? post.body
        :`${(post.body).slice(0,25)}...`
        }</p>
    </div>
  )
}

export default Post