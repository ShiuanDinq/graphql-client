const Posts = ({ posts }) => {
  return (
    <div>
      <h2>Posts</h2>
      {posts.map(p =>
        <div key={p.id}>
          {p.title} {p.body}
        </div>  
      )}
    </div>
  )
}

export default Posts