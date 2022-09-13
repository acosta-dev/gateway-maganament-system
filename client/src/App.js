import { Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar.js';
import GatewayDetails from "./pages/GatewayDetails";
import Home from './pages/Home';

function App() {
  return (
    <>
      <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gateway/:id" element={<GatewayDetails />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
