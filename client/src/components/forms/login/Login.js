import React, { useState, useContext, useEffect} from 'react'
import AuthContext from '../../../context/auth/AuthContext';
import AlertContext from '../../../context/alert/AlertContext';
import {Button, Input, Label} from '../../../styles'

function Login(props) {
  const [user, setUser] = useState({email: '', password: ''});
  const {loginUser, isAuth, error} = useContext(AuthContext);
  const {setAlert} = useContext(AlertContext);

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(isAuth){
      props.history.push('/')
    }
    if(error){
      setAlert(error)
    }
  }, [isAuth, error])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // validate password
    if(user.password.length < 6){
      return console.log('Password must be more than 6 characters long');
    }
    else {
      loginUser(user);
    }
  }
  

  return (
    <form onSubmit={handleSubmit} className="container max-container-5">
      <div className="form-group">
        <Label htmlFor="email">Email</Label>
        <Input type="text" name="email" value={user.email} onChange={handleChange} required/>
      </div>
      <div className="form-group">
        <Label htmlFor="password">Password</Label>
        <Input type="text" name="password" value={user.password} onChange={handleChange} required/>
      </div>
      <Button type="submit">Log in</Button>
    </form>
  )
}


export default Login

