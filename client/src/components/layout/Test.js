import React, {useState} from 'react'

export default function Test() {
  const [developer, setDeveloper] = useState({
    name: 'Bryan',
    isEmployed: false,
    yearsOfExp: 1
  })

  const handleClick = (state) => {
    
    setDeveloper(prevState => {
      return {...prevState, isEmployed: !prevState.isEmployed}
    })

  }
  

  return (
    <div>
      <h1>{developer.name}</h1>
      <h3>Employement Status: {developer.isEmployed}</h3>
      <button onClick={handleClick}>Toggle employment</button>
    </div>
  )
}
