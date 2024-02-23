import { createContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/Post';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const history = useHistory();
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');


  useEffect(() => {
    setPosts(data);
  }, [data]);


  useEffect(() => {
    const filteredResults = posts.filter(post => ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format( new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody};

    const createPosts = async () => {
      
      try {
        const response = await api.post('/posts', newPost);
        const allPosts = [...posts, response.data];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        history.push('/');
      } catch (error) {
        console.log(`Error: ${error.message}`);  
      }
    }

    createPosts();
  }
  
  const handleEdit = async (id) => {
    const datetime = format( new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody};

    try {

      const response = await api.put(`/posts/${id}`, updatedPost);

      setPosts(posts.map(post => post.id === id ? {...response.data } : post));
      setEditTitle('');
      setEditBody('');
      history.push('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);  
    }
  }
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter(post => post.id !== id)
      setPosts(postList);
      history.push('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);  
    }

  }

  return (
    <DataContext.Provider value={{ 
      search, setSearch, searchResults, fetchError, isLoading, handleSubmit, postTitle, setPostTitle, postBody, setPostBody, posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody, posts, handleDelete
     }}>

      {children}

    </DataContext.Provider>
  )
}

export default DataContext;