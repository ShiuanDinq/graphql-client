import {gql, useLazyQuery} from '@apollo/client';
import { useState, useEffect } from 'react';
import SearchBar from './Searchbar';


const FIND_POST = gql`
  query findPostById($idToSearch: ID!, $email: String, $name: String, $body: String) {
    post(id: $idToSearch) {
      id
      title
      body 
      comments(email: $email, name: $name, body: $body){
        name
        body
        email
      }
    }
  }
`

const Posts = ({ posts }) => {
  const [getPost, result] = useLazyQuery(FIND_POST) 
  const [post, setPost] = useState(null)
  const [name, setName] = useState(null)
  const [body, setBody] = useState(null)
  const [email, setEmail] = useState(null)

  const showPost = (id) => {

      getPost({ variables: { idToSearch: id, name: name, body: body, email: email} })

  }

  useEffect(() => {
    if (result.data) {
      setPost(result.data.post)
    }
  }, [result])



  const handleSearch = (id) => {
      getPost({ variables: { idToSearch: id, name: name, body: body, email: email} })
  }

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleBody = (e) => {
    setBody(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleClose = () => {
    setPost(null)
    setName(null)
    setBody(null)
    setEmail(null)
  }


  if (post) {

    const comments = post.comments.map(comment =>  
      <div class="has-background-warning">
        <p>{comment.name}</p>
        <p>{comment.body}</p>
        <p>{comment.email}</p>
      </div>)
    
    return(
      <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
          {comments}
        <button onClick={() => handleClose()}>close</button>
        <button onClick={() => handleSearch(post.id)}>Search</button>
        <SearchBar handleName={handleName} handleBody={handleBody} handleEmail={handleEmail}/>
      </div>
    )
  }

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(p =>
        <div className="has-background-danger" style={{margin:"1rem"}}key={p.id} onClick={() => showPost(p.id)} >
          <p class="has-text-warning">
            {p.title} 
          </p>
          <p class="has-text-white">
            {p.body}
          </p>         
        </div>  
      )}
    </div>
  )
}

export default Posts