import '../styles/App.css';
import Posts from './Posts'
import Post from './Post';
import {useEffect} from 'react';

import 'bulma/css/bulma.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";





const App = () => {
 return(
  <Switch>
    <Route exact path="/" component={Posts} />
    <Route exact path="/post/:id" component={Post} />
  </Switch>

 )

}



export default App;




