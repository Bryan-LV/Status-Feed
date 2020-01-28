import axios from 'axios'

const setHeaderToken = (token) => {
  // if token is passed in then set token to header
  if(token){
    axios.defaults.headers.common['auth-token'] = token;
  }
  
  // if no token then destroy the header key
  else {
    delete axios.defaults.headers.common['auth-token'];
  }
}


export default setHeaderToken;