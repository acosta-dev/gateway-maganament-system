import  Menu  from "./components/Menu";
import { Route, Routes } from "react-router-dom";
import './App.css';
import EditPeripheral from "./components/EditPeripheral";
import Gateway from "./components/Gateway";
import Main from './components/Main';
import NewGateway from "./components/NewGateway";
import NewPeripheral from "./components/NewPeripheral";

function App() {
  return (
      
    <div>
       <Menu/>
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/gateway/:id" element={<Gateway/>} />
      <Route path="/new_gateway" element={<NewGateway/>} />
      <Route path="/new_peripheral/:gateway" element={<NewPeripheral/>} />
      <Route path="/edit_peripheral/:id" element={<EditPeripheral/>} />
      <Route path="*" element={<div className="text-white text-4xl"><h1>404 Not Found</h1></div>} />
      </Routes>
    </div>
    
      
    
  );
}

export default App;
