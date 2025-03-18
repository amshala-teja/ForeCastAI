import Body from './components/Body';
import './App.css'
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import CreateProject from './components/CreateProject';
import ViewPlot from "./components/ViewPlot.jsx";


function App() {

  return (
    <>
      <BrowserRouter basename="/">
      <Routes>
      <Route path="/" element = {<Body/>}> 
        <Route path="/login" element = {<Login/>} /> 
        <Route path="/homepage" element = {<HomePage/>} /> 
        <Route path = "/createProject" element = {<CreateProject/>}/>
        <Route path = "/view-plot/:imageKey" element={<ViewPlot/>}/>
      </Route>
      
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
