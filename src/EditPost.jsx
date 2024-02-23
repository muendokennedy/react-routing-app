import React from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from './context/DataContext';

const EditPost = () => {
  
  const { posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody} = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);

  useEffect(() => {
    if(post){
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody])
  return (
    <main className='NewPost'>
      {editTitle && 
      <>
        <h2>Editpost</h2>
        <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
          <label htmlFor='postTitle'>Title: </label>
          <input type='text' id='postTitle' value={editTitle} required onChange={(e) => setEditTitle(e.target.value)}/>
          <label htmlFor='postBody'>Body: </label>
          <textarea id='postBody' required onChange={(e) => setEditBody(e.target.value)}>{editBody}</textarea>
          <button type='submit' onClick={() => handleEdit(post.id)}>Edit Post</button>
        </form>
      </>
      }
      {!editTitle && 
        <>
          <h2>Post Not Found!</h2>
          <p>Well, that's is disappointing</p>
          <p>
            <Link to='/'>Visit Our Homepage</Link>
          </p>
        </>
        }
  </main>
  )
}

export default EditPost