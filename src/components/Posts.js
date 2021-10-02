import {gql, useLazyQuery} from '@apollo/client';
import { useState, useEffect } from 'react';


const FIND_POST = gql`
  query findPostById($idToSearch: ID!, $search: String) {
    post(id: $idToSearch) {
      id
      title
      body 
      comments(search: $search){
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
  const [keyword, setKeyword] = useState(null)

  const showPost = (id) => {
    if(!keyword){
      getPost({ variables: { idToSearch: id} }) 
    }else{
      getPost({ variables: { idToSearch: id, search: keyword} })
    }

  }

  useEffect(() => {
    if (result.data) {
      setPost(result.data.post)
    }
  }, [result])


 const handleKeyword = (id) => {
    getPost({ variables: { idToSearch: id, search: ".com"} })
 }





  if (post) {

    const comments = post.comments.map(comment =>  
      <div class="has-background-warning">
        <p>{comment.email}</p>
      </div>)
    
    return(
      <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
          {comments}
        <button onClick={() => setPost(null)}>close</button>
<button onClick={() => handleKeyword(post.id)}>com</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(p =>
        <div className="has-background-danger" style={{margin:"1rem"}}key={p.id}>
          <p class="has-text-warning">
            {p.title} 
          </p>
          <p class="has-text-white">
            {p.body}
          </p>
          <button onClick={() => showPost(p.id)} >
            show post
          </button> 
          
        </div>  
      )}
    </div>
  )
}

export default Posts