import Body from './Body';
import './App.css'
import Login from './Login';
import SignUp from './SignUp'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <BrowserRouter basename="/">
      <Routes>
      <Route path="/" element = {<Body/>}> 
        <Route path="/login" element = {<Login/>} /> 
        <Route path="/signup" element = {<SignUp/>} /> 
      </Route>
      
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
