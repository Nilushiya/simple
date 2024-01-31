import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditPost = ({posts ,handleEdit , editBody , setEditBody , editTitle , setEditTitle}) => {
    const {id} = useParams()
    const post = posts.find(post => (post.id).toString()=== id)
    useEffect(() => {
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post, setEditTitle,setEditBody])
  return (
    <div>
        {/* {editTitle && */}
        <>
            <h2>Edit Post</h2>
            <form onSubmit={(e) => { e.preventDefault()}}>
                <label htmlFor='PostTitle'>Title:</label>
                <input 
                    type='text'
                    id='postTitle'
                    value={editTitle}
                    onChange={(e) =>{setEditTitle(e.target.value)}}
                />
                 <label htmlFor='PostBody'>Body:</label>
                <textarea 
                    type='text'
                    id='PostBody'
                    value={editBody}
                    onChange={(e) =>{setEditBody(e.target.value)}}
                />
            </form>
        </>
        {/* {!editTitle && */}
    </div>
  )
}

export default EditPost