import { Link } from 'react-router-dom';
const PostItems = ({posts}) => {
  return (
    <div className="post-items-container">
      {posts.edges.map((p, index) =>
      <Link to={`/post/${p.node.id}`}>  
        <div className="has-background-light card post-items" key={p.node.id} style={{animationDelay: `${index*0.2}s`}}>
          <p class="has-text-link is-capitalized is-size-5">
            {p.node.title}  
          </p>
          <p class="has-text-black is-capitalized is-size-7">
            {p.node.body}
          </p>         
        </div> 
      </Link>
      )}
    </div>
  )
}

export default PostItems