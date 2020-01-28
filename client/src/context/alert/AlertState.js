import React, {useReducer} from 'react'
import AlertContext from './AlertContext'
import AlertReducer from './AlertReducer';

const initialState = {
  errors:[],
  newError: false
}

export default function AlertState(props) {
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg) => {

    dispatch({type: 'SET_ALERT', payload: msg})
  }
  
  const clearAlert = () => {
    dispatch({type:'CLEAR_ALERT'});
  }
  

  return (
    <AlertContext.Provider value={{
      errors: state.errors,
      newError: state.newError,
      setAlert,
      clearAlert
    }}>
      {props.children}
    </AlertContext.Provider>
  )
}
