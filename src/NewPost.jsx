import React from 'react'

const NewPost = ({ handleSubmit, postTitle, setPostTitle, postBody, setPostBody }) => {
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