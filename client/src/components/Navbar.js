import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar >
      <Toolbar className="flex justify-center">
        <h1 className="font-bold cursor-pointer text-2xl" onClick={()=>{navigate('/')}}>GATEWAY MANAGAMENT SYSTEM </h1>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar