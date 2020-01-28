import React, { useState, useContext, useEffect} from 'react'
import AuthContext from '../../../context/auth/AuthContext'
import AlertContext from '../../../context/alert/AlertContext';
import {Button, Input, Label} from '../../../styles'

function Register(props) {
  const [user, setUser] = useState({
  username:'',
  email:'',
  password:'',
  passwordCheck:''
  })

  const {createUser, isAuth, error} = useContext(AuthContext);
  const {setAlert} = useContext(AlertContext);

  useEffect(() => {
    if(isAuth){
      props.history.push('/');
    }

    if(error){
      setAlert(error)
    }
  }, [isAuth,error])

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(user.password !== user.passwordCheck){
    return console.log('Passwords do not match');
    }
    if(user.password.length < 6){
    return console.log('user password needs to be a min length of 6 characters');
    } 
    else{
    // create user obj
    const userObj = {username: user.username, email: user.email, password: user.password}
    // send user info
    // useEffect will then check if isAuthenticated is true and redirect to home page
    // if there is an error, an alert will show
    createUser(userObj);
    }
  }
   

  return (
    <form onSubmit={handleSubmit} className="container max-container-5">
      <div className="form-group">
        <Label htmlFor="username">Username</Label>
        <Input type="text" value={user.username} name="username" onChange={handleChange} required/>
      </div>
      <div className="form-group">
        <Label htmlFor="email">Email</Label>
        <Input type="text" value={user.email} name="email" onChange={handleChange} required/>
      </div>
      <div className="form-group">
        <Label htmlFor="password">Password</Label>
        <Input type="text" value={user.password} name="password" onChange={handleChange} required/>
      </div>
      <div className="form-group">
        <Label htmlFor="passwordCheck">PasswordCheck</Label>
        <Input type="text" value={user.passwordCheck} name="passwordCheck" onChange={handleChange} required/>
      </div>
      <Button type="submit">Create User Account</Button>
    </form>
  )
}

export default Register;

