import React from 'react'
import Navbar from './Navbar';
import NotFound from './NotFound';
import Home from './Home';
import Edit from './Edit';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import './App.css';
export default function App(){
  return(
    <Router>    
    <div className='App'>
    <Navbar/>
    <div className='content'>
    <Switch>
    <Route path="/blogs/:id/edit">
              <Edit />
            </Route>
      <Route exact path="/">
      <Home/>
      </Route>
      <Route  path='/create'>
      <Create/>
      </Route>
      <Route  path='/blogs/:id'>
      <BlogDetails/>
      </Route>
      <Route path='*'>
        <NotFound/>
      </Route>
    </Switch>
    </div>
    </div>
    </Router>
  );
}