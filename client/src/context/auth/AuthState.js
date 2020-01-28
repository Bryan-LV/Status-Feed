import React, {useReducer} from 'react';
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import axios from 'axios'

const initState = {
  token: '',
  user: null,
  isAuth: !!localStorage.getItem('token'),
  error: null
}

export default function AuthState(props) {
  const [state, dispatch] = useReducer(AuthReducer, initState);

  // @todo put in utils folder
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    }
  }

  // =Desc Creates a user
  // =Details Makes api call to users route, which returns a jwt, then dispatch will add token 
  // and redirect user to homepage which will check if token is in localstorage
  const createUser = async (user) => {
    try {
      // hits create user api, returns a token
      const res = await axios.post('/api/user/create', user, axiosConfig);
      dispatch({type:'CREATE_USER', payload: res.data})
    } catch (error) {
      console.log('create user error');
      dispatch({type:'USER_ERROR', payload: error.response.data})
    }
  }

  // =Desc Login a user
  // =Details Makes api call to users route, which returns a jwt, then dispatch will add token 
  // and redirect user to homepage which will check if token is in localstorage
  const loginUser = async (user) => {
      try {
        // hit login user api, returns token
        const res = await axios.post('/api/user/login', user, axiosConfig);
        dispatch({type:'LOGIN_USER', payload: res.data});
      } catch (error) {
        console.log('login user error');
        dispatch({type:'USER_ERROR', payload: error.response.data})
      }
  }
  
  // =Desc Load user
  // =Details Loads the user, using the token set in local storage
  const loadUser = async () => {
    try {
      const res = await axios.get('/api/user', axiosConfig);
      console.log('load user ');
      dispatch({type:'LOAD_USER', payload: res.data})
    } catch (error) {
      console.log(error.msg);
      console.log('load user error');
      dispatch({type:'USER_ERROR', payload: error})
    }
  }

  // =Desc Logout user
  // =Details Logs out the current user, resets state, and destorys token in localStorage
  const logoutUser = async () => {
      dispatch({type:'LOGOUT_USER'})
  }
  
  // delete a user
  const deleteUser = async (id) => {
    try {
      const res = await axios.delete('/api/user', axiosConfig);
      dispatch({type:'DELETE_USER', payload: res.data});
    } catch (error) {
      console.log('delete user error');
      console.log(error);
    }
  }

  const clearError = () => {
    dispatch({type:'CLEAR_ERROR'})
  }

  // update a user


  return (
    <AuthContext.Provider 
    value={{
      token: state.token,
      user: state.user,
      isAuth: state.isAuth,
      error: state.error,
      createUser,
      loginUser,
      loadUser,
      logoutUser,
      deleteUser,
      clearError
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}
