import {gql, useLazyQuery} from '@apollo/client';
import { useState, useEffect } from 'react';
import SearchBar from './Searchbar';
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';

const Post = () => {
  const params = useParams()
  const [post, setPost] = useState(null)
  const [name, setName] = useState(null)
  const [body, setBody] = useState(null)
  const [email, setEmail] = useState(null)

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

  const id = params.id
  const [getPost, { loading, error, data }] = useLazyQuery(FIND_POST);

  useEffect(() => {
    if (data) {
      setPost(data.post)
    }
  }, [data])

  useEffect(() => {
    getPost({ variables: { idToSearch: id} })
  },[])

  const handleSearch = () => {
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

  const handleClear = () => {
    setName(null)
    setBody(null)
    setEmail(null)
  }


  if (loading) return '';
  if (error) return `Error! ${error.message}`;
  if (post) {
    const comments = post.comments.map((comment, index) =>  
      <div class="post-comment" style={{animationDelay:`${index*0.1}s`}}>
        <p className="is-size-7 has-text-white"><span className="comment-name-shadow">{comment.name}</span></p>
        <p className="is-size-6">{comment.body}</p>
        <p className="is-size-7 has-text-weight-bold">{comment.email}</p>
      </div>)
    
    return(
      <div className="has-background-light" style={{minHeight:"120vh"}}>
        <div class="post-container">
          <Link to={`/`}>
            <p class="is-size-3">Home</p>
          </Link>
          <h2 className="is-size-2 is-capitalized has-text-danger">{post.title}</h2>
          <p className="is-size-5 is-capitalized">{post.body}</p>
          {comments}
        </div>
        <SearchBar name={name} body={body} email={email} handleName={handleName} handleBody={handleBody} handleEmail={handleEmail} handleSearch={handleSearch} handleClear={handleClear} id={id}/>
      </div>
    )
  }

  return(
    <div>
    </div>
  )
}

export default Post