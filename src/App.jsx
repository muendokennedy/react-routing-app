import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import PostPage from './PostPage';
import Missing from './Missing';
import NewPost from './NewPost';
import Footer from './Footer';
import About from './About';
import EditPost from './EditPost';
import { Route, Switch} from 'react-router-dom';
import { DataProvider } from './context/DataContext';


function App() {
  return (
    <div className="App">
      <Header title='React JS Blog'/>
      <DataProvider>
        <Nav/>
        <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/post' component={NewPost}/>
              <Route exact path='/edit/:id' component={EditPost}/>
              <Route exact path='/post/:id' component={PostPage}/>
              <Route exact path='/about' component={About}/>
              <Route exact path='*' component={Missing}/>
        </Switch>
      </DataProvider>
      <Footer/>
    </div>
  );
}

export default App;
