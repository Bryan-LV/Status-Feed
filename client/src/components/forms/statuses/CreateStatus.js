import React, {useState, useContext} from 'react'
import {Button, Textarea, Label} from '../../../styles'
import StatusContext from '../../../context/status/StatusContext'

export default function CreateStatus(props) {
  const [status, setStatus] = useState('');
  const {createStatus} = useContext(StatusContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(status !== ''){
      // createStatus from context
      createStatus(status);
      setStatus('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container create__status">
      <Label htmlFor="status" className="block text--center">Create Status</Label>
      <Textarea type="text"
       name="status" 
       value={status} 
       onChange={(e) => setStatus(e.target.value)} 
       placeholder="Tell the world something..." 
       rows="20" 
       name="comment[text]" 
       id="comment_text" 
       cols="40" 
       className="ui-autocomplete-input" 
       autocomplete="off" 
       role="textbox" 
       aria-autocomplete="list" 
       aria-haspopup="true">
       </Textarea>
      <Button type="submit">Add Status</Button>
    </form>
  )
}
