import React, {useContext, useState, memo, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Button, Input} from '../../styles';
import uparrow from '../../img/up-arrow.png'
import downarrow from '../../img/down-arrow.png'
import edit from '../../img/edit.png'
import deleteIcon from '../../img/delete.png'
import StatusContext from '../../context/status/StatusContext'

function FeedItem(props) {
  const {deleteStatus, updateVote, updateStatus, feedUpdated} = useContext(StatusContext)  
  const [newStatus, setNewStatus] = useState('');
  const [open, setOpen] = useState(false);

  const handleDelete = (e) => {
    const id = props._id.toString();
    deleteStatus(id);
  }

  const handleVote = (type) => {
    const status = {type: type, id: props._id}
    updateVote(status)
  }
  
  // update status input
  const handleNewStatus = (e) => {
    setNewStatus(e.target.value);
  }
  
  // update status 
  const handleUpdate = () => {
    const status = {text: newStatus, id: props._id};
    updateStatus(status);
  }
  
  const toggleModal = () => {
    setOpen(!open);
  }

  
  return (  
    <div className="feed-item">
      <div className="action-btns">
        <div className="action__btn" onClick={toggleModal}><img className="action__icon" src={edit} alt=""/></div>
        <div className="action__btn" onClick={handleDelete}><img className="action__icon" src={deleteIcon} alt=""/></div>
      </div>
      <div className="two-col">
        <div className="likes">
          <div className="likes__vote">
            <div className="likes__count">{props.likes.upvotes.number}</div>
            <div className="likes_btn" onClick={() => handleVote('upvote')}>
              <img className="likes__icon" src={uparrow} alt=""/>
            </div>
          </div>
          <div className="likes__vote">
            <div className="likes__btn" onClick={() => handleVote('downvote')}>
              <img className="likes__icon" src={downarrow} alt=""/>
            </div>
            <div className="likes__count">{props.likes.downvotes.number}</div>
          </div>
        </div>
        <p className="feed__status">{props.text}</p>
      </div>
      <div className={open ? 'update__modal open': 'update__modal'}>
        <form>
          <Input type="text" name="newstatus" value={newStatus} placeholder="Update your status..." onChange={handleNewStatus} style={{color:'black'}}/>
          <Button onClick={handleUpdate}>Update Status</Button>
        </form>
      </div>
    </div>
  )
}

FeedItem.propTypes = {
  status: PropTypes.object.isRequired
}

export default FeedItem

