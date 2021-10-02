const SearchBar = (props) => (
  
  <form>
    <input type="text" id="name" placeholder="name" value={props.name} onChange={props.handleName}/>
    <input type="text" id="email" placeholder="email" value={props.email} onChange={props.handleEmail}/>
    <input type="text" id="body" placeholder="body" value={props.body} onChange={props.handleBody}/>
  </form>
);

export default SearchBar;