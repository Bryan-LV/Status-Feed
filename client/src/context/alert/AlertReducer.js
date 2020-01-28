const AlertReducer = (state, action) => {
  const {type, payload} = action;

  if(type === 'SET_ALERT'){
    if(Array.isArray(payload)){
      console.log(payload);
      return {...state}
    } else{
      return {...state, errors:[...state.errors, payload], newError:true}
    }
  }
  if(type === 'CLEAR_ALERT'){
    return {...state, newError:false, errors:[]}
  }
  
}

export default AlertReducer;
