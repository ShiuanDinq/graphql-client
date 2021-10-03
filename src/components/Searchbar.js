

const SearchBar = (props) => (
  <div class="search-bar-container">
  <form className="columns search-bar is-centered" >
    <input className="column is-one-fifth" type="text" id="name" placeholder="name" value={props.name? props.name: ""} onChange={props.handleName}/>
    <input className="column is-one-fifth" type="text" id="email" placeholder="email" value={props.email? props.email: ""} onChange={props.handleEmail}/>
    <input className="column is-one-fifth" type="text" id="body" placeholder="body" value={props.body? props.body: ""} onChange={props.handleBody}/>
    <button className="column is-2" style={{borderRadius:"0.5rem"}} onClick={() => props.handleClear()}>Clear</button>
    <button className="column is-2" style={{borderRadius:"0.5rem"}} onClick={() => props.handleSearch(props.id)}>Search</button>
  </form>
  </div>
);

export default SearchBar;