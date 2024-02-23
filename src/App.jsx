import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import PostPage from './PostPage';
import Missing from './Missing';
import NewPost from './NewPost';
import Footer from './Footer';
import About from './About';
import { Route, useHistory, Switch} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/Post';
import EditPost from './EditPost';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';


function App() {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const history = useHistory();
  const { width } = useWindowSize();
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
    <div className="App">
       <Header title='React JS Blog' width={width}/>
       <Nav search={search} setSearch={setSearch}/>
       <Switch>
            <Route exact path='/'>
                <Home posts={searchResults} fetchError={fetchError} isLoading={isLoading}/>
            </Route>
            <Route exact path='/post'>
                <NewPost
                  handleSubmit={handleSubmit}
                  postTitle={postTitle}
                  setPostTitle={setPostTitle}
                  postBody={postBody}
                  setPostBody={setPostBody}
                />
            </Route>
            <Route exact path='/edit/:id'>
                <EditPost
                posts={posts}
                  handleEdit={handleEdit}
                  editTitle={editTitle}
                  setEditTitle={setEditTitle}
                  editBody={editBody}
                  setEditBody={setEditBody}
                />
            </Route>
            <Route exact path='/post/:id'>
                <PostPage posts={posts} handleDelete={handleDelete}/>
            </Route>
            <Route exact path='/about' component={About}/>
            <Route exact path='*' component={Missing}/>
       </Switch>
       <Footer/>
    </div>
  );
}

export default App;
