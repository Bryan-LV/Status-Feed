import React, {useReducer} from 'react'
import StatusContext from './StatusContext'
import StatusReducer from './StatusReducer'
import axios from 'axios'

const initState = {
  feed:[],
  feedUpdated: false
}

export default function StatusState(props) {
  const [state, dispatch] = useReducer(StatusReducer, initState);

  // @todo put in utils folder
  const getConfig = () => {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    }
    return axiosConfig;
  }
  

  // =Desc Fetch status feed
  // =Details hits api to gather all statuses from db
  const loadFeed = async () => {
    // hit api and dispatch load_feed to state
    try {
      const res = await axios.get('/api/feed', getConfig());
      dispatch({type:'LOAD_FEED', payload: res.data})
    } catch (error) {
      dispatch({type:'FEED_ERROR', payload: error});
    }
  }

  // =Desc Create Status
  // =Details hits api to create status
  const createStatus = async (status) => {
    const text = {text: status};
    try {
      const res = await axios.post('/api/feed', text, getConfig() );
      dispatch({type:'NEW_STATUS', payload:res.data})
    } catch (error) {
      console.log('create status error');
    }
  }

  // =Desc Delete Status
  const deleteStatus = async (id) => {
    try {
      await axios.delete(`/api/feed/${id}`, getConfig() );
      dispatch({type:'DELETE_STATUS'})
    } catch (error) {
      console.log('delete status error');
    }
  }

  const deleteUserStatuses = (id) => {
    dispatch({type:'DELETE_USER_STATUSES', payload: id});
  }

  const updateStatus = async (status) => {
    try {
      axios.put(`/api/feed/${status.id}`, status, getConfig());
      dispatch({type:'UPDATE_STATUS'});
    } catch (error) {
      console.log('update text status error');
    }
  } 

  const updateVote = async (status) => {
    // status param is type and id
    try {
      // see what type it is,
      if(status.type === 'upvote'){
        const payload = {upvote: true}
        const res = await axios.put(`/api/feed/${status.id}/likes`, payload, getConfig());
        dispatch({type:'VOTE_UPDATE'})
      }
      if(status.type === 'downvote'){
        const payload = {downvote: true}
        const res = await axios.put(`/api/feed/${status.id}/likes`, payload, getConfig());
        dispatch({type:'VOTE_UPDATE'})
      }
      } catch (error) {
        console.log('update vote error');
        console.error(error.response);
      }
  }

  const clearFeedUpdate = () => {
    dispatch({type:'CLEAR_UPDATE'})
  }
  
  
  
  

  return (
    <StatusContext.Provider value={{
      feed: state.feed,
      feedUpdated: state.feedUpdated,
      loadFeed,
      createStatus,
      deleteStatus,
      updateVote,
      clearFeedUpdate,
      updateStatus,
      deleteUserStatuses
    }}>
      {props.children}
    </StatusContext.Provider>
  )
}
