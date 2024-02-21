import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import PostPage from './PostPage';
import Missing from './Missing';
import NewPost from './NewPost';
import Footer from './Footer';
import About from './About';
import { BrowserRouter as Router, Routes, Route,useHistory} from 'react-router-dom';



function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path='/' element={
            <>
            <Header/>
            <Nav/>
            <Home/>
            <Footer/>
            </>
            }/>
            <Route exact path='/post' element={
              <>
              <Header/>
              <Nav/>
              <NewPost/>
              <Footer/>
              </>
            }/>
            <Route exact path='/post/:id' element={
              <>
              <Header/>
              <Nav/>
              <PostPage/>
              <Footer/>
              </>
            }/>
            <Route exact path='/about' element={
              <>
              <Header/>
              <Nav/>
              <About/>
              <Footer/>
              </>
            }/>
            <Route exact path='*' element={
              <>
              <Header/>
              <Nav/>
              <Missing/>
              <Footer/>
              </>
            }/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
