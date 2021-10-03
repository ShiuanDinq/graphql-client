import '../styles/App.css';
import Posts from './Posts'
import Post from './Post';
import 'bulma/css/bulma.min.css';
import {
  Switch,
  Route,
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




