import React, {useContext, useEffect} from 'react'
import setHeaderToken from '../../utils/setHeaderToken'
import AuthContext from '../../context/auth/AuthContext'
import Feed from '../layout/Feed';
import CreateStatus from '../forms/statuses/CreateStatus';
import StatusContext from '../../context/status/StatusContext';

function Home(props) {
  const {loadUser, isAuth} = useContext(AuthContext);
  const {loadFeed, feedUpdated } = useContext(StatusContext);

  useEffect(() => {
    if(isAuth){
      // check if token is in local storage, and set it in axios global header
      setHeaderToken(localStorage.getItem('token'));
      loadUser();
      loadFeed();
    } else{
      props.history.push('/login');
    }
  },[isAuth, feedUpdated])
    
  return (
    <div className="container">
      <CreateStatus />
      <Feed />
    </div>
  )
}


export default Home

