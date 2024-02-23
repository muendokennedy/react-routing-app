import React from 'react'
import { useContext } from 'react';
import DataContext from './context/DataContext';

const NewPost = () => {
  const { handleSubmit, postTitle, setPostTitle, postBody, setPostBody } = useContext(DataContext);
  return (
    <main className='NewPost'>
      <h2>NewPost</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title: </label>
        <input type='text' id='postTitle' value={postTitle} required onChange={(e) => setPostTitle(e.target.value)}/>
        <label htmlFor='postBody'>Body: </label>
        <textarea id='postBody' required onChange={(e) => setPostBody(e.target.value)}>{postBody}</textarea>
        <button type='submit'>Publish Post</button>
      </form>
    </main>
  )
}

export default NewPost