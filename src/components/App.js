import '../styles/App.css';
import {gql, useQuery} from '@apollo/client';
import Posts from './Posts';

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
    <div>
      <Posts posts={result.data.posts}/>
    </div>
  )

}

export default App;
