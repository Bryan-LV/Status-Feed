const StatusReducer = (state, action) => {
  const {type, payload} = action;

  if(type === 'LOAD_FEED'){
    return {...state, feed: [...payload]}
  }
  if(type === 'NEW_STATUS'){
    return {...state, feed: [payload, ...state.feed]}
  }
  if(type === 'UPDATE_STATUS'){
    return {...state, feedUpdated:true}
  }
  if(type === 'DELETE_STATUS'){
    return {...state, feedUpdated:true}
  }
  if(type === 'DELETE_USER_STATUSES'){
    const filteredStatuses = state.feed.filter(status => status.user !== payload);
    return {...state, feed: filteredStatuses}
  }
  if(type === 'VOTE_UPDATE'){
    return {...state, feedUpdated: true}
  }
  if(type === 'FEED_ERROR'){
    console.log(payload);
    return {...state}
  }
  if(type === 'CLEAR_UPDATE'){
    return {...state, feedUpdated:false}
  }
}

export default StatusReducer