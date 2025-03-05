import Body from './components/Body';
import './App.css'
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';


function App() {

  return (
    <>
      <BrowserRouter basename="/">
      <Routes>
      <Route path="/" element = {<Body/>}> 
        <Route path="/login" element = {<Login/>} /> 
        <Route path="/homepage" element = {<HomePage/>} /> 
      </Route>
      
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
