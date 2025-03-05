import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const [emailId, setEmailId] = useState(" ")
    const [password, setPassword] = useState(" ")

    const handleLogin = (e) => {
       e.preventDefault(); // Prevent default form submission
       
       // Directly navigate to home page
       navigate('/homepage');
    }

  return (
    <div className='flex justify-center my-10'>
    <div className="card bg-base-300 w-96 shadow-sm py-4">
      <form onSubmit={handleLogin}>
        <div className="card-body">
          <h2 className="card-title justify-center">Login </h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Address</legend>
              <input 
                type="text" 
                value={emailId}
                className="input" placeholder="Type here" 
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input 
                type="password" 
                value={password}
                className="input" placeholder="Type here" 
                onChange={(e)=> setPassword(e.target.value)}
                required
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login