const AuthReducer = (state, action) => {
  const {type, payload} = action;

  if(type === 'CREATE_USER' || type === 'LOGIN_USER'){
    localStorage.setItem('token', payload);
    return {...state, token: payload, isAuth: true }
  }
  if(type === 'LOAD_USER'){
      return {...state, isAuth:true, user: payload, token: localStorage.getItem('token')}
  }
  if(type === 'LOGOUT_USER'){
    localStorage.removeItem('token');
    return {...state, isAuth:false, user:{}, token:''}
  }
  if(type === 'DELETE_USER'){
    localStorage.removeItem('token');
    return {...state, isAuth:false, user:{}, token:''}
  }
  if(type === 'USER_ERROR'){
    if(Array.isArray(payload.error)){
      // const payloadErr = payload.error.map(item => {error: item.msg})
      let errorObj = {error: payload.error[0].msg}
      return {...state, error: errorObj}
     } else{
      return {...state, error: payload}
     }

  }
  if(type === 'CLEAR_ERROR'){
    return {...state, error:null}
  }
}

export default AuthReducer;