import '../styles/App.css';
import {gql, useQuery} from '@apollo/client';
import Posts from './Posts';
import 'bulma/css/bulma.min.css';
const ALL_POSTS = gql`
  query{
    posts{
      id
      title
      body
    }
  }
`
const App = () => {
  const result = useQuery(ALL_POSTS)

  if(result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="has-background-primary">
      <Posts posts={result.data.posts}/>
    </div>
  )

}

export default App;
