import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext'
import setHeaderToken from '../../utils/setHeaderToken'
import {Button} from '../../styles'
import StatusContext from '../../context/status/StatusContext'


export default function Profile(props) {
  const {loadUser, isAuth, user, deleteUser} = useContext(AuthContext);
  const {deleteUserStatuses} = useContext(StatusContext);
  
  useEffect(() => {
    console.log('Profile page refresh');
    if(isAuth){
      // check if token is in local storage, and set it in axios global header
      setHeaderToken(localStorage.getItem('token'));
      loadUser();
    } else{
      props.history.push('/login');
    }
  },[isAuth])

  const handleDelete = () => {
    deleteUser(user._id);
    deleteUserStatuses(user._id);
  }
  

  return (
    <div className="container">
      <h2>Username: <span>{ user && user.username}</span></h2>
      <h2>Email: <span>{user && user.email}</span></h2>
      <Button onClick={handleDelete}>Delete Profile</Button>
    </div>
  )
}
