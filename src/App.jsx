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



function App() {

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My First Post',
      datetime: 'July 01 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, repellendus. Atque neque iste laudantium tenetur!'
    },
    {
      id: 2,
      title: 'My Second Post',
      datetime: 'July 01 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, repellendus. Atque neque iste laudantium tenetur!'
    },
    {
      id: 3,
      title: 'My Third Post',
      datetime: 'July 01 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, repellendus. Atque neque iste laudantium tenetur!'
    },
    {
      id: 4,
      title: 'My Fourth Post',
      datetime: 'July 01 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, repellendus. Atque neque iste laudantium tenetur!'
    },
    {
      id: 5,
      title: 'My Fifth Post',
      datetime: 'July 01 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, repellendus. Atque neque iste laudantium tenetur!'
    }
  ]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const history = useHistory();

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
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    history.push('/');
  }

  const handleDelete = (id) => {

    const postList = posts.filter(post => post.id !== id)
    setPosts(postList);
    history.push('/');
  }

  return (
    <div className="App">
       <Header title='React JS Blog'/>
       <Nav search={search} setSearch={setSearch}/>
       <Switch>
            <Route exact path='/'>
                <Home posts={searchResults}/>
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
