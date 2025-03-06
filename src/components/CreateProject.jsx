import React, { use } from 'react'
import { useNavigate } from 'react-router-dom'
import HomePage from './HomePage';

const CreateProject = () => {
    const navigate = useNavigate();

    const handleCreateProject = () =>{
        navigate('/homePage')
    }
  return (
    <div>
    <div className="grid place-content-center border-t border-base-300 h-80">
      <button className="btn btn-primary btn-lg text-xl px-8 py-4"
      onClick={handleCreateProject}>
      👉🏻 Create Project
      </button>
      </div>
    </div>
)
}

export default CreateProject