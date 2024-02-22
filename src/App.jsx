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


function App() {
  return (
    <div className="App">
       <Header/>
       <Nav/>
       <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>
            <Route exact path='/post'>
                <NewPost/>
            </Route>
            <Route exact path='/post/:id'>
                <PostPage/>
            </Route>
            <Route exact path='/about' component={About}/>
            <Route exact path='*' component={Missing}/>
       </Switch>
       <Footer/>
    </div>
  );
}

export default App;
