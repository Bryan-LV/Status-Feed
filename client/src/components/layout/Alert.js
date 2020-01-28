import React, {useEffect, useContext} from 'react'
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

export default function Alert() {
  const {clearError} = useContext(AuthContext);
  const {newError, clearAlert, errors} = useContext(AlertContext);
  
  const createAlert = () => {
    const list = errors.map(error => <h1>{error.error}</h1>)
    return list;
  }
  

  useEffect(() => {
    // create primitive to check if new errors in auth state or alert state
    // call set alert if login error
    if(newError){
      createAlert()
      setTimeout(() => {
        clearAlert()
        clearError();
      }, 3000);
      
    }
  }, [newError])

  return (
    <div>
      {createAlert()}
    </div>
  )
}
