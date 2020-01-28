import React, {useContext, useEffect} from 'react'
import StatusContext from '../../context/status/StatusContext';
import setHeaderToken from '../../utils/setHeaderToken'
import FeedItem from '../helpers/FeedItem';



function Feed(props) {
  const { feed, feedUpdated, clearFeedUpdate } = useContext(StatusContext);
  
  if(localStorage.getItem('token') ){
    // check if token is in local storage, and set it in axios global token header
    setHeaderToken(localStorage.getItem('token'));
  }

  useEffect(() => {
    setTimeout(() => {
      clearFeedUpdate()
    }, 1000);
    console.log('Feed use effect');
  }, [feedUpdated])

  const createFeed = () => {
    return feed.map(status => <FeedItem key={status._id} {...status}/>)

  }
  
  return (
    <div className="container">
      {createFeed()}
    </div>
  )
}

export default Feed

