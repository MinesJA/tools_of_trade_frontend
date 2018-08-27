
const getToken = () => (localStorage.getItem('token'));


export default class Adapter{

  static fetchCurrentUser(options){
    return fetch(`${process.env.REACT_APP_BACKEND_API}/current_user`, {headers: {Authorization: getToken()}})
      .then(resp => resp.json())
  }

  static fetchUser(user_id){
    return fetch(`${process.env.REACT_APP_BACKEND_API}/user/${user_id}`)
      .then(resp => resp.json())
  }

  static fetchTools(filterTags, searchTerm){
    return fetch(`${process.env.REACT_APP_BACKEND_API}/tools?tags=${filterTags}&searchTerm=${searchTerm}`)
      .then(resp => resp.json())
  }

  static fetchTags(){
    return fetch(`${process.env.REACT_APP_BACKEND_API}/tags`)
      .then(resp => resp.json())
  }

  static addTool({author_id, name, description, url, tags}){
    let options = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: getToken()
       },
      body:
        JSON.stringify({
          name: name,
          description: description,
          url: url,
          tag_strings: tags
        })
    }

    return fetch(`${process.env.REACT_APP_BACKEND_API}/users/${author_id}/tools/`, options)
      .then(resp => resp.json())
  }

  static saveTool(tool_id){
    let options = {
      method: 'PATCH',
      headers: {
          Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: getToken()
       },
      body: JSON.stringify({tool: {id: tool_id}})
    }

    return fetch(`${process.env.REACT_APP_BACKEND_API}/tools/${tool_id}`, options)
      .then(resp => resp.json())
  }

  static voteTool(tool_id, upDown){

    let options = {
      method: 'PATCH',
      headers: {
          Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: getToken()
       },
      body: JSON.stringify({tool: {upDown}})
    }

    return fetch(`${process.env.REACT_APP_BACKEND_API}/tool/${tool_id}`, options)
  }


  static getQueryParams(){
    const query = window.location.search.substring(1);

    if(!!query){
      const pairs = query.split('&').map((str) => str.split('='));

      return pairs.reduce((memo, pair) => {
        memo[pair[0]] = pair[1];
        return memo;
      }, {});
    } else {
      return null
    }
  }

}
